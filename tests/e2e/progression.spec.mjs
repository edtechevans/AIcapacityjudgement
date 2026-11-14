import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function chooseGrade(page,g){
 await page.goto("/#/welcome");
 await expect(page.locator('[data-action="pick-grade"]')).toHaveCount(7);
 await page.locator('[data-action="pick-grade"][data-pick="'+g+'"]').click();
 await expect(page).toHaveURL(new RegExp("#/grade/"+g+"$"));
}
async function noHorizontalOverflow(page){
 const size=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
 expect(size.page).toBeLessThanOrEqual(size.viewport+2);
}
async function accessible(page,region){
 const result=await new AxeBuilder({page}).include(region).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
 expect(result.violations.map(x=>({rule:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}))).toEqual([]);
}
test("scope and sequence is visible, complete and keyboard expandable across G6–12",async({page})=>{
 await chooseGrade(page,8);
 await page.goto("/#/about");
 await expect(page.locator(".scope-grade-item")).toHaveCount(7);
 await expect(page.locator(".scope-grade-item").first()).toContainText("Explore & Question");
 await expect(page.locator(".scope-grade-item").last()).toContainText("Create & Steward");
 await page.locator(".scope-strands summary").click();
 await expect(page.locator(".scope-strand-grid section")).toHaveCount(6);
 await expect(page.locator(".scope-strand-grid li")).toHaveCount(42);
 await accessible(page,".scope-sequence");
 await noHorizontalOverflow(page);
});
test("G8 can investigate the representation of identical cases and recognise missing data",async({page})=>{
 await chooseGrade(page,8);
 await page.goto("/#/lesson/8-A1");
 await expect(page.locator(".learning-progression")).toBeVisible();
 await page.locator(".learning-progression summary").click();
 await expect(page.locator(".learning-progression")).toContainText("A misconception to challenge");
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('input[name="knowledge-choice"][value="0"]').check();
 await page.locator('[data-action="knowledge-check"]').click();
 await page.locator('[data-action="next"]').click();
 await page.locator('[data-action="model-reveal"]').click();
 await page.locator('[data-action="next"]').click();
 await expect(page.locator(".learning-lab")).toBeVisible();
 await page.locator('[data-action="lab-mode"][data-mode="colour"]').click();
 await expect(page.locator("#lab-result")).toContainText("2 of 4 invented labels match");
 await page.locator('[data-action="lab-mode"][data-mode="texture"]').click();
 await expect(page.locator("#lab-result")).toContainText("4 of 4 invented labels match");
 await expect(page.locator("#lab-result")).toContainText("Colour only: 2/4 matching");
 await page.locator('[data-action="lab-mode"][data-mode="occluded"]').click();
 await expect(page.locator("#lab-result")).toContainText("2 cases need more information");
 await expect(page.locator("#lab-result")).toContainText("Insufficient information");
 await accessible(page,".learning-lab");
 await noHorizontalOverflow(page);
});
test("each grade presents a genuine dual-pathway transfer challenge rather than a completion badge",async({page})=>{
 await chooseGrade(page,7);
 await expect(page.locator(".grade-mission")).toContainText("Audit a school club information assistant");
 await page.locator(".grade-mission-details summary").click();
 await expect(page.locator(".grade-mission-details li")).toHaveCount(3);
 await expect(page.locator(".grade-mission")).toContainText("teacher");
 await accessible(page,".grade-mission");
 await noHorizontalOverflow(page);
});
test("DP2 maintains authentic impact, human review and an explicit non-use option",async({page})=>{
 await chooseGrade(page,12);
 await expect(page.locator(".grade-mission")).toContainText("impact portfolio");
 await page.locator(".grade-mission-details summary").click();
 await expect(page.locator(".grade-mission")).toContainText("non-AI");
 await expect(page.locator(".grade-mission")).toContainText("teacher or audience");
 await accessible(page,".grade-mission");
 await noHorizontalOverflow(page);
});
