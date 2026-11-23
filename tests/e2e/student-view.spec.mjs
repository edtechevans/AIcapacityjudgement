import {test,expect} from "@playwright/test";

test("teacher can preview a Grade 6 student-only My Learning page without changing faculty progress",async({page})=>{
  await page.goto("/#/welcome");
  await page.locator('[data-action="pick-grade"][data-pick="9"]').click();
  await expect(page.locator(".course-intro")).toBeVisible();
  const before=await page.evaluate(()=>localStorage.getItem("aicj-studio-v2"));
  await page.locator('[data-action="student-preview"]').click();
  await expect(page).toHaveURL(/#\/student$/);
  await expect(page.locator("#main-title")).toHaveText("My Learning");
  await expect(page.locator(".student-work-card")).toHaveCount(6);
  await expect(page.locator(".topbar")).toHaveCount(0);
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await expect(page.locator(".student-grade-pill")).toContainText("Grade 6");

  await page.locator(".student-next-button").click();
  await expect(page.locator(".lesson-panel")).toContainText("What is AI, really?");
  await expect(page).toHaveURL(/#\/student$/);
  await page.locator('.lesson-layout [data-action="courses"]').first().click();
  await expect(page.locator("#main-title")).toHaveText("My Learning");
  await expect(page.locator(".student-work-card")).toHaveCount(6);
  await page.locator('[data-action="student-exit"]').click();
  await expect(page).toHaveURL(/#\/grade\/9$/);
  await expect(page.locator(".course-intro")).toBeVisible();
  const after=await page.evaluate(()=>localStorage.getItem("aicj-studio-v2"));
  expect(after).toBe(before);
});

test("direct student link has a single learning destination without other site navigation",async({page})=>{
  await page.goto("/#/student");
  await expect(page.locator("#main-title")).toHaveText("My Learning");
  await expect(page.locator(".student-work-card")).toHaveCount(6);
  await expect(page.locator(".topbar")).toHaveCount(0);
  await expect(page.locator('[data-action="student-exit"]')).toHaveCount(0);
  await page.locator('.student-work-card[data-lesson="6-A1"]').click();
  await expect(page.locator(".lesson-panel")).toBeVisible();
  await expect(page).toHaveURL(/#\/student$/);
  await page.locator('.lesson-layout [data-action="courses"]').first().click();
  await expect(page.locator("#main-title")).toHaveText("My Learning");
});


test("completed Grade 6 modules remain marked complete and are not suggested again",async({page})=>{
 const finished=id=>({attempts:1,knowledgePassed:true,modelSeen:true,practicePassed:true,applied:true,completed:true,lastStage:4});
 await page.addInitScript(({key})=>{
   localStorage.setItem(key,JSON.stringify({grade:6,recommendedGrade:6,gradeChosen:true,name:"Learner",records:{"6-A1":{attempts:1,knowledgePassed:true,modelSeen:true,practicePassed:true,applied:true,completed:true,lastStage:4},"6-B1":{attempts:1,knowledgePassed:true,modelSeen:true,practicePassed:true,applied:true,completed:true,lastStage:4}}}));
 },{key:"aicj-studio-v2"});
 await page.goto("/#/student");
 await expect(page.locator(".student-view-count")).toContainText("2 / 6");
 await expect(page.locator(".student-work-grid").first().locator(".student-work-card")).toHaveCount(4);
 await expect(page.locator(".student-completed")).toContainText("Completed");
 await expect(page.locator(".student-completed .student-work-card")).toHaveCount(2);
 await expect(page.locator(".student-next-button")).toHaveAttribute("data-lesson","6-A2");
 await page.locator(".student-completed summary").click();
 await expect(page.locator('.student-work-complete[data-lesson="6-A1"]')).toContainText("Review only");
});

test("when all Grade 6 modules are complete there is no repeated next lesson",async({page})=>{
 await page.addInitScript(()=>{
  const records={};for(const strand of ["A1","A2","A3","B1","B2","B3"])records["6-"+strand]={knowledgePassed:true,practicePassed:true,modelSeen:true,applied:true,completed:true,lastStage:4};
  localStorage.setItem("aicj-studio-v2",JSON.stringify({grade:6,recommendedGrade:6,gradeChosen:true,name:"Learner",records}));
 });
 await page.goto("/#/student");
 await expect(page.locator(".student-view-count")).toContainText("6 / 6");
 await expect(page.locator(".student-next-button")).toHaveCount(0);
 await expect(page.locator(".student-finished")).toContainText("You've completed all six modules.");
 await expect(page.locator(".student-completed .student-work-card")).toHaveCount(6);
});
