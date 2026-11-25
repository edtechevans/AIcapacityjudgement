import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("public curriculum can be shared and reloaded without choosing a grade",async({page})=>{
 await page.goto("/#/curriculum");
 await expect(page).toHaveURL(/#\/curriculum$/);
 await expect(page.locator("#main-title")).toContainText("One connected journey.");
 await expect(page.locator(".curriculum-year-tab")).toHaveCount(9);
 await expect(page.locator(".curriculum-strand-tab")).toHaveCount(6);
 await expect(page.locator(".catalogue-module")).toHaveCount(4);
 await expect(page.locator(".curriculum-counts")).toContainText("50");
 await expect(page.locator(".curriculum-counts")).toContainText("8 elementary");
 await expect(page.locator('[data-action="copy-curriculum"]')).toHaveCount(2);
 const saved=await page.evaluate(()=>Object.keys(localStorage));
 expect(saved).toEqual([]);
 await page.reload();
 await expect(page.locator("#main-title")).toContainText("One connected journey.");
 await expect(page.locator(".grade-entry-card")).toHaveCount(0);
 const title=await page.title();
 expect(title).toContain("Curriculum and progression");
});

test("grade explorer shows all six modules and a contextual performance task",async({page})=>{
 await page.goto("/#/curriculum");
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="6"]').click();
 await expect(page.locator(".curriculum-year-heading")).toContainText("Explore & Question");
 await expect(page.locator(".curriculum-annual-challenge")).toContainText("trustworthy garden");
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="11"]').click();
 await expect(page.locator(".curriculum-year-heading")).toContainText("Investigate & Architect");
 await expect(page.locator(".curriculum-year-kicker")).toContainText("DP1");
 await expect(page.locator(".catalogue-module")).toHaveCount(6);
 await expect(page.locator(".curriculum-annual-challenge")).toContainText("accountable community");
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="12"]').click();
 await expect(page.locator(".curriculum-year-kicker")).toContainText("DP2");
 await expect(page.locator(".catalogue-module").filter({hasText:"The Impact Project"})).toHaveCount(1);
 await expect(page.locator(".curriculum-annual-challenge")).toContainText("impact portfolio");
 expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);
});

test("strand explorer follows a competency across nine grades without resetting the grade view",async({page})=>{
 await page.goto("/#/curriculum");
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="9"]').click();
 await page.locator('[data-action="curriculum-strand"][data-cur-strand="B3"]').click();
 await expect(page.locator("#curriculum-selected-strand")).toContainText("Ethics & Consequences");
 await expect(page.locator(".curriculum-progression-step")).toHaveCount(9);
 await expect(page.locator('.curriculum-strand-tab[data-cur-strand="B3"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator('.curriculum-year-tab[data-cur-grade="9"]')).toHaveAttribute("aria-pressed","true");
 await page.locator('[data-action="curriculum-strand"][data-cur-strand="A1"]').click();
 await expect(page.locator("#curriculum-selected-strand")).toContainText("Understanding AI");
 await expect(page.locator(".curriculum-spiral-detail")).toContainText("training");
});

test("public curriculum link is available from welcome; selecting a course is an explicit action",async({page})=>{
 await page.goto("/#/welcome");
 await page.locator(".grade-curriculum-link").click();
 await expect(page).toHaveURL(/#\/curriculum$/);
 await expect(page.locator(".catalogue-module")).toHaveCount(4);
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="10"]').click();
 await page.locator('[data-action="curriculum-open-grade"]').click();
 await expect(page).toHaveURL(/#\/grade\/10$/);
 const desktopLink=page.locator('.top-actions [data-action="curriculum"]');
 if(await desktopLink.isVisible()){await desktopLink.click();}
 else{await page.locator(".mobile-menu summary").click();await page.locator('.mobile-menu-links [data-action="curriculum"]').click();}
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="11"]').click();
 await page.locator('[data-action="curriculum-open-grade"]').click();
 await expect(page).toHaveURL(/#\/grade\/11$/);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("aicj-studio-v2")));
 expect(saved.grade).toBe(11);
});

test("curriculum works without horizontal overflow or serious automated accessibility findings",async({page})=>{
 await page.goto("/#/curriculum");
 await page.locator('[data-action="curriculum-grade"][data-cur-grade="12"]').click();
 await page.locator('[data-action="curriculum-strand"][data-cur-strand="B2"]').click();
 const size=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
 expect(size.body).toBeLessThanOrEqual(size.viewport+2);
 const scan=await new AxeBuilder({page}).include(".curriculum-page")
  .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
 expect(scan.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.slice(0,3).map(n=>n.target)}))).toEqual([]);
});

test("elementary grades are integrated with four modules, six strand connections and an isolated preview",async({page})=>{
 await page.goto("/#/curriculum");
 await expect(page.locator(".curriculum-year-tab")).toHaveCount(9);
 for(const grade of [4,5]){
  await page.locator('[data-action="curriculum-grade"][data-cur-grade="'+grade+'"]').click();
  await expect(page.locator(".catalogue-module")).toHaveCount(4);
  await expect(page.locator(".catalogue-module--capacity")).toHaveCount(2);
  await expect(page.locator(".catalogue-module--judgement")).toHaveCount(2);
  await expect(page.locator(".curriculum-foundation-note")).toContainText("A2 combines");
  await expect(page.locator(".curriculum-annual-challenge")).toHaveAttribute("aria-label","Suggested classroom connection");
  await expect(page.locator(".curriculum-year-kicker")).toContainText("ELEMENTARY");
  for(const strand of ["A3","B3"]){
   await page.locator('[data-action="curriculum-strand"][data-cur-strand="'+strand+'"]').click();
   await expect(page.locator(".curriculum-progression-step")).toHaveCount(9);
   await expect(page.locator(".curriculum-embedded-strand")).toHaveCount(2);
   await expect(page.locator(".curriculum-embedded-strand").first()).toContainText(strand==="A3"?"A2":"B2");
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
 }
 const keys=await page.evaluate(()=>Object.keys(localStorage));expect(keys).toEqual([]);
 await page.locator('.catalogue-module[data-module-id="5-A1"] a').filter({hasText:"Preview module"}).click();
 await expect(page.locator(".lesson-banner")).toContainText("Grade 5");
 await expect(page.locator(".grade")).toContainText("Preview");
 await page.getByRole("link",{name:"Exit preview"}).click();
 await expect(page).toHaveURL(/curriculumGrade=5#\/curriculum$/);
 await expect(page.locator('[data-cur-grade="5"].curriculum-year-tab')).toHaveAttribute("aria-pressed","true");
 expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);
});
