import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const lessons=[
 {grade:6,id:"6-A1",check:0,choices:["timer","classifier"]},
 {grade:7,id:"7-A1",check:0,choices:["skewed","balanced"]},
 {grade:8,id:"8-B2",check:1,choices:["attention","evidence"]},
 {grade:9,id:"9-A1",check:0,choices:["easy","mixed"]},
 {grade:9,id:"9-B1",check:1,choices:["verify","share"]},
 {grade:10,id:"10-A3",check:1,choices:["human","blended"]}
];
async function toPractice(page,{grade,id,check}){
 await page.goto("/#/welcome");
 await page.locator('[data-action="pick-grade"][data-pick="'+grade+'"]').click();
 await page.goto("/#/lesson/"+id);
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('input[name="knowledge-choice"][value="'+check+'"]').check();
 await page.locator('[data-action="knowledge-check"]').click();
 await page.locator('[data-action="next"]').click();
 await page.locator('[data-action="model-reveal"]').click();
 await page.locator('[data-action="next"]').click();
 await expect(page.locator(".learning-lab")).toBeVisible();
}

for(const entry of lessons){
 test("inclusive and keyboard-operable investigation "+entry.id,async({page})=>{
  await toPractice(page,entry);
  const check=page.locator('[data-action="check"]');
  await expect(check).toBeDisabled();
  const first=page.locator('[data-action="lab-mode"][data-mode="'+entry.choices[0]+'"]');
  await first.focus();
  await expect(first).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#lab-result")).toBeVisible();
  await expect(first).toHaveAttribute("aria-pressed","true");
  await expect(check).toBeDisabled();
  const second=page.locator('[data-action="lab-mode"][data-mode="'+entry.choices[1]+'"]');
  await second.click();
  await expect(check).toBeEnabled();
  await expect(page.locator(".lab-observation-field textarea")).toBeVisible();
  await expect(page.locator(".lab-offline summary")).toBeVisible();
  const axe=await new AxeBuilder({page}).include(".learning-lab")
   .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
  const serious=axe.violations.filter(v=>["serious","critical"].includes(v.impact));
  expect(serious.map(v=>({id:v.id,targets:v.nodes.slice(0,2).map(n=>n.target)}))).toEqual([]);
  const widths=await page.evaluate(()=>({
    viewport:document.documentElement.clientWidth,
    scroll:document.documentElement.scrollWidth
  }));
  expect(widths.scroll,"Horizontal overflow on "+entry.id).toBeLessThanOrEqual(widths.viewport+2);
 });
}

test("200-percent text and keyboard focus preserve entry, lab choices and safe alternatives",async({page},testInfo)=>{
 if(testInfo.project.name!=="desktop-chromium")test.skip();
 await toPractice(page,lessons[1]);
 await page.evaluate(()=>{document.documentElement.style.fontSize="200%";});
 const width=await page.evaluate(()=>({
  viewport:document.documentElement.clientWidth,
  scroll:document.documentElement.scrollWidth
 }));
 expect(width.scroll,"2x text should not cause global horizontal overflow").toBeLessThanOrEqual(width.viewport+2);
 await page.locator('[data-action="lab-mode"][data-mode="skewed"]').click();
 await page.locator('[data-action="lab-adjust"][data-setting="oakShade"][data-value="1"]').focus();
 await page.keyboard.press("Enter");
 await expect(page.locator("#lab-result")).toContainText("3 training examples");
 await page.locator(".lab-offline summary").click();
 await expect(page.locator(".lab-offline")).toContainText("labelled leaf-feature cards");
});
