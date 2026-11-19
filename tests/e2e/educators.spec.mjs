import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openEducators(page){
 await page.goto("/#/educators");
 await expect(page.locator("#main-title")).toHaveText("Educator learning");
 await expect(page.locator('textarea, input[type="text"]')).toHaveCount(0);
}
async function chooseSingle(page,index){
 await page.locator('[data-edu-single="'+index+'"]').click();
 await page.locator('[data-edu-check]').click();
 await expect(page.locator(".educator-feedback")).toContainText("Understanding checked");
}
async function next(page){
 await page.locator('[data-edu-next]').click();
}
test("published educator pathway has exactly four Capacity and four Judgement modules",async({page})=>{
 await openEducators(page);
 await expect(page.locator(".educator-course-card")).toHaveCount(2);
 await expect(page.locator('[data-educator-open]')).toHaveCount(8);
 await expect(page.locator(".educator-course-card").first()).toContainText("AI Capacity");
 await expect(page.locator(".educator-course-card").last()).toContainText("AI Judgement");
 await expect(page.locator(".educator-pathway-summary")).toContainText("4 hours total");
 await expect(page.locator(".educator-module-time")).toHaveCount(8);
 await expect(page.locator(".educator-finish")).toContainText("0 / 8 modules completed");
});
test("Capacity module has real teaching, modelling, practice, application and transfer",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="c1"]').click();
 await expect(page.locator(".educator-idea")).toHaveCount(3);
 await expect(page.locator(".educator-stage-pill")).toHaveCount(5);
 await expect(page.locator('.educator-stage-pill[data-edu-stage="1"]')).toBeDisabled();
 await chooseSingle(page,1);
 await next(page);
 await expect(page.locator(".educator-example")).toHaveCount(2);
 await chooseSingle(page,1);
 await next(page);
 await expect(page.locator(".educator-check")).toHaveCount(2);
 for(const i of [0,1,3])await page.locator('[data-edu-multi="'+i+'"][data-edu-task="p0"]').check();
 await page.locator('[data-edu-check="p0"]').click();
 await expect(page.locator(".educator-check").first()).toContainText("Understanding checked");
 for(const [i,value] of [0,1,0,1].entries())await page.locator('[data-edu-classify="'+i+'"][data-edu-task="p1"]').selectOption(String(value));
 await page.locator('[data-edu-check="p1"]').click();
 await expect(page.locator(".educator-check").last()).toContainText("Understanding checked");
 await next(page);
 await expect(page.locator(".sequence-list")).toBeVisible();
 await expect(page.locator('[draggable="true"]')).toHaveCount(0);
 const expected=[
 "Define the learning goal",
 "Request a draft",
 "Verify factual claims",
 "Revise or discard inaccuracies"
 ];
 for(let target=0;target<expected.length;target++){
  for(let tries=0;tries<5;tries++){
   const items=await page.locator(".sequence-list .sequence-text").allTextContents();
   const at=items.findIndex(x=>x.includes(expected[target]));
   expect(at).toBeGreaterThanOrEqual(target);
   if(at===target)break;
   await page.locator(".sequence-item").nth(at).locator('[data-dir="-1"]').click();
  }
 }
 await page.locator('[data-edu-check="apply"]').click();
 await expect(page.locator(".educator-feedback")).toContainText("Understanding checked");
 await next(page);
 await chooseSingle(page,1);
 await expect(page.locator(".educator-finish")).toContainText("Module completed");
 await page.locator('[data-educator-back]').click();
 await expect(page.locator(".educator-finish")).toContainText("1 / 8 modules completed");
});
test("Judgement modules include MTSS and integrated action without writing",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="j2"]').click();
 await expect(page.locator("#main-title")).toContainText("MTSS");
 await expect(page.locator(".educator-ideas")).toContainText("Tier 1");
 await expect(page.locator(".educator-ideas")).toContainText("Tier 2");
 await expect(page.locator('textarea, input[type="text"]')).toHaveCount(0);
 await page.locator('[data-educator-back]').click();
 await page.locator('[data-educator-open="j4"]').click();
 await expect(page.locator("#main-title")).toContainText("Taking Action");
 await expect(page.locator(".educator-ideas")).toContainText("Engagement for All");
});
test("old twelve-module completion data does not claim completion of new modules",async({page})=>{
 await page.goto("/");
 await page.evaluate(()=>localStorage.setItem("aicj-educator-progress-v3",JSON.stringify({"literacy-0":{completed:true},"pedagogy-0":{completed:true}})));
 await openEducators(page);
 await expect(page.locator(".educator-finish")).toContainText("0 / 8 modules completed");
});
test("ordering uses keyboard-operable buttons, not dragging",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="c2"]').click();
 await chooseSingle(page,1);
 await next(page);
 await chooseSingle(page,0);
 await next(page);
 for(const [i,value] of [0,1,0,1].entries())await page.locator('[data-edu-classify="'+i+'"][data-edu-task="p0"]').selectOption(String(value));
 await page.locator('[data-edu-check="p0"]').click();
 for(const i of [0,1,3])await page.locator('[data-edu-multi="'+i+'"][data-edu-task="p1"]').check();
 await page.locator('[data-edu-check="p1"]').click();
 await next(page);
 const firstMovable=page.locator('[data-edu-move][data-dir="-1"]:not([disabled])').first();
 await firstMovable.focus();
 await expect(firstMovable).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(page.locator(".sequence-list")).toBeVisible();
});
test("educator overview and module have no automated WCAG A/AA violations",async({page})=>{
 await openEducators(page);
 for(const visit of ["overview","module"]){
  if(visit==="module")await page.locator('[data-educator-open="c1"]').click();
  const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
  const readable=result.violations.map(v=>v.id+" ["+v.impact+"]: "+v.nodes.slice(0,2).map(n=>n.target.join(",")).join(";")).join("\n");
  expect(readable).toBe("");
 }
});