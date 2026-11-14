import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function enter(page,grade){
 await page.goto("/#/welcome");
 await expect(page.locator('[data-action="pick-grade"]')).toHaveCount(7);
 await page.locator('[data-action="pick-grade"][data-pick="'+grade+'"]').click();
 await expect(page).toHaveURL(new RegExp("#/grade/"+grade+"$"));
 await expect(page.locator(".course-intro")).toContainText("Grade "+grade+":");
 await expect(page.locator(".senior-studio")).toContainText("DP"+(grade-10));
}
async function practice(page,grade,id,correct){
 await enter(page,grade);
 await page.goto("/#/lesson/"+id);
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('input[name="knowledge-choice"][value="'+correct+'"]').check();
 await page.locator('[data-action="knowledge-check"]').click();
 await page.locator('[data-action="next"]').click();
 await page.locator('[data-action="model-reveal"]').click();
 await page.locator('[data-action="next"]').click();
 await expect(page.locator(".learning-lab")).toBeVisible();
 await expect(page.locator('[data-action="check"]')).toBeDisabled();
}
async function checkAxe(page){
 const scan=await new AxeBuilder({page}).include(".learning-lab")
  .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
 expect(scan.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
 const result=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(result.scroll).toBeLessThanOrEqual(result.viewport+2);
}

for(const grade of [11,12]){
 test("Grade "+grade+" enters its own independent inquiry studio and six modules",async({page})=>{
  await enter(page,grade);
  await expect(page.locator(".senior-studio h2")).toContainText(grade===11?"Investigate & Architect":"Create & Steward");
  await expect(page.locator(".senior-milestone-chip")).toHaveCount(5);
  await expect(page.locator(".lesson-card")).toHaveCount(6);
  await expect(page.locator(".course-intro")).toContainText("DP"+(grade-10));
  await page.goto("/#/home");
  await expect(page.locator(".senior-studio")).toBeVisible();
  await expect(page.locator(".senior-bridge summary")).toContainText("Start with the foundations");
  await page.goto("/#/grade/"+(grade===11?12:11));
  await expect(page).toHaveURL(new RegExp("#/grade/"+grade+"$"));
 });
}

test("G11 system evaluation lab changes synthetic outcomes and remains accessible",async({page})=>{
 await practice(page,11,"11-A1",1);
 await page.locator('[data-action="lab-mode"][data-mode="routine"]').click();
 await expect(page.locator("#lab-result")).toContainText("4/4 cases matched");
 await page.locator('[data-action="lab-mode"][data-mode="shifted"]').click();
 await expect(page.locator("#lab-result")).toContainText("2/4 cases matched");
 await page.locator('[data-action="lab-adjust"][data-setting="threshold"][data-value="80"]').click();
 await expect(page.locator("#lab-result")).toContainText("Threshold 80 / 100");
 await expect(page.locator("#lab-result")).toContainText("2 false exclusions");
 await page.locator('[data-action="lab-adjust"][data-setting="severity"][data-value="5"]').click();
 await expect(page.locator("#lab-result")).toContainText("false exclusion weight 5");
 await expect(page.locator('[data-action="check"]')).toBeEnabled();
 await checkAxe(page);
});

test("G11 provenance laboratory differentiates copied and independent sources",async({page})=>{
 await practice(page,11,"11-B2",2);
 await page.locator('[data-action="lab-mode"][data-mode="echo"]').click();
 await expect(page.locator("#lab-result")).toContainText("0 separately verifiable origins");
 await page.locator('[data-action="lab-mode"][data-mode="independent"]').click();
 await expect(page.locator("#lab-result")).toContainText("3 separately verifiable origins");
 await page.locator('[data-action="lab-adjust"][data-setting="standard"][data-value="headlines"]').click();
 await expect(page.locator("#lab-result")).toContainText("Counting headlines");
 await checkAxe(page);
});

test("G12 orchestration lab safely responds to different failures",async({page})=>{
 await practice(page,12,"12-A2",0);
 await page.locator('[data-action="lab-mode"][data-mode="autonomous"]').click();
 await expect(page.locator("#lab-result")).toContainText("Publishes unsupported statement");
 await page.locator('[data-action="lab-mode"][data-mode="bounded"]').click();
 await expect(page.locator("#lab-result")).toContainText("Pauses for source verification");
 await page.locator('[data-action="lab-adjust"][data-setting="incident"][data-value="privacy"]').click();
 await expect(page.locator("#lab-result")).toContainText("Blocks restricted data");
 await expect(page.locator('[data-action="check"]')).toBeEnabled();
 await checkAxe(page);
});

test("G12 governance lab reveals need for accessible appeal and remedy",async({page})=>{
 await practice(page,12,"12-B3",2);
 await page.locator('[data-action="lab-mode"][data-mode="conceal"]').click();
 await expect(page.locator("#lab-result")).toContainText("No accessible appeal");
 await page.locator('[data-action="lab-mode"][data-mode="redress"]').click();
 await page.locator('[data-action="lab-adjust"][data-setting="access"][data-value="assistive"]').click();
 await expect(page.locator("#lab-result")).toContainText("Needs assistive-technology access");
 await expect(page.locator("#lab-result")).toContainText("accessible appeal");
 await checkAxe(page);
});

test("G12 Impact Project has real multi-session pacing, milestone planning and no automatic mastery",async({page})=>{
 await enter(page,12);
 await page.goto("/#/lesson/12-A3");
 await expect(page.locator(".classroom-support")).toContainText("6–8 weekly studio blocks");
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('[data-action="concept-next"]').click();
 await page.locator('input[name="knowledge-choice"][value="2"]').check();
 await page.locator('[data-action="knowledge-check"]').click();
 await page.locator('[data-action="next"]').click();
 await page.locator('[data-action="model-reveal"]').click();
 await page.locator('[data-action="next"]').click();
 const answers=[0,1,2,0];
 for(let i=0;i<answers.length;i++)await page.locator('[data-sort="'+i+'"]').selectOption(String(answers[i]));
 await page.locator('[data-action="check"]').click();
 await expect(page.locator("#activity-feedback")).toContainText("Challenge passed");
 await page.locator('[data-action="next"]').click();
 await expect(page.locator(".senior-portfolio")).toContainText("Build a defensible record");
 await expect(page.locator('[data-senior-milestone]')).toHaveCount(6);
 await page.locator('[data-senior-milestone="0"]').check();
 await expect(page.locator(".senior-portfolio-progress")).toContainText("1 of 6 planning milestones marked");
 const saved=await page.evaluate(()=>JSON.stringify(localStorage));
 expect(saved).not.toContain("seniorMilestones");
 await expect(page.locator(".performance-evidence")).toContainText("Teacher-reviewed learning evidence");
});
