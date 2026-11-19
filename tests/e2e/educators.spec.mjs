import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openEducators(page){
 await page.goto("/#/educators");
 await expect(page.locator("#main-title")).toHaveText("Educator learning");
 await expect(page.locator("textarea")).toHaveCount(0);
 await expect(page.locator('input[type="text"]')).toHaveCount(0);
}

test("educator learning is available without choosing a student grade",async({page})=>{
 await openEducators(page);
 await expect(page.locator('[data-educator-open]')).toHaveCount(12);
 await expect(page.locator(".educator-course-card")).toHaveCount(2);
});

test("educator single-choice module completes with immediate feedback",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="literacy-0"]').click();
 await expect(page.locator(".educator-reading")).toBeVisible();
 await page.locator('[data-edu-single="1"]').click();
 await page.locator('[data-edu-check]').click();
 await expect(page.locator(".educator-feedback")).toContainText("Understanding checked");
 await expect(page.locator(".educator-finish")).toContainText("Module completed");
 await expect(page.locator("textarea")).toHaveCount(0);
});

test("educator multi-select and classification checks work without text entry",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="literacy-1"]').click();
 for(const i of [0,2,3])await page.locator('[data-edu-multi="'+i+'"]').check();
 await page.locator('[data-edu-check]').click();
 await expect(page.locator(".educator-feedback")).toContainText("Understanding checked");

 await page.locator('[data-educator-back]').click();
 await page.locator('[data-educator-open="literacy-2"]').click();
 for(const [i,value] of [0,1,0,1].entries())await page.locator('[data-edu-classify="'+i+'"]').selectOption(String(value));
 await page.locator('[data-edu-check]').click();
 await expect(page.locator(".educator-feedback")).toContainText("Understanding checked");
});

test("educator ordering is keyboard operable without dragging",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="literacy-3"]').click();
 await expect(page.locator('[data-edu-move]')).toHaveCount(8);
 await expect(page.locator('[draggable="true"]')).toHaveCount(0);
 const firstMovable=page.locator('[data-edu-move][data-dir="-1"]:not([disabled])').first();
 await firstMovable.focus();
 await expect(firstMovable).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(page.locator(".sequence-list")).toBeVisible();
});


test("educator pedagogy course uses authentic redesign decisions without writing",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="pedagogy-0"]').click();
 await expect(page.locator(".educator-task")).toContainText("Where did the thinking disappear?");
 for(const [i,value] of [0,1,0,1].entries())await page.locator('[data-edu-classify="'+i+'"]').selectOption(String(value));
 await page.locator('[data-edu-check]').click();
 await expect(page.locator(".educator-feedback")).toContainText("Understanding checked");
 await page.locator('[data-educator-back]').click();
 await page.locator('[data-educator-open="pedagogy-5"]').click();
 await expect(page.locator(".educator-task")).toContainText("Redesign studio");
 await expect(page.locator('[data-edu-move]')).toHaveCount(8);
 await expect(page.locator("textarea")).toHaveCount(0);
});
test("educator core route has no automated WCAG A/AA violations",async({page})=>{
 await openEducators(page);
 const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
 const readable=result.violations.map(v=>v.id+" ["+v.impact+"]: "+v.nodes.slice(0,2).map(n=>n.target.join(",")).join(";")).join("\n");
 expect(readable).toBe("");
});
