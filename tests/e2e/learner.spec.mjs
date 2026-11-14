import {test,expect} from "@playwright/test";
import {mkdirSync} from "node:fs";
import AxeBuilder from "@axe-core/playwright";

async function startGrade(page,grade=6){
  await page.goto("/#/welcome");
  await expect(page.locator("#main-title")).toContainText("Think bigger");
  await page.locator('[data-action="pick-grade"][data-pick="'+grade+'"]').click();
  await page.locator('[data-action="guest"]').click();
  await expect(page.locator(".course-intro")).toBeVisible();
}
async function assertNoOverflow(page,label){
  const metrics=await page.evaluate(()=>({
    viewport:document.documentElement.clientWidth,
    scroll:document.documentElement.scrollWidth
  }));
  expect(metrics.scroll, "Horizontal overflow on "+label+" ("+JSON.stringify(metrics)+")").toBeLessThanOrEqual(metrics.viewport+2);
}
test("welcome, courses, home, learning, about, profile and lessons fit the screen",async({page},info)=>{
  mkdirSync("visual-review",{recursive:true});
  await startGrade(page);
  for(const [route,label] of [
    ["#/home","Home"],["#/grade/6","Courses"],["#/grade/6/snapshot","My learning"],
    ["#/about","The idea"],["#/profile","Profile"],["#/lesson/6-A1","Lesson"]
  ]){
    await page.goto("/"+route);
    await expect(page.locator("#main-title")).toBeVisible();
    await assertNoOverflow(page,label);
    await page.evaluate(()=>{document.activeElement?.blur?.();document.documentElement.style.scrollBehavior="auto";window.scrollTo(0,0)});
    const headerY=await page.locator(".topbar").evaluate(el=>el.getBoundingClientRect().top);
    expect(Math.abs(headerY),"Sticky header should start at the top on "+label).toBeLessThanOrEqual(3);
    if(label==="Home")await page.screenshot({path:"visual-review/"+info.project.name+"-first-screen.png",fullPage:false,animations:"disabled"});
    await page.screenshot({path:"visual-review/"+info.project.name+"-"+label.toLowerCase().replace(/\s+/g,"-")+".png",fullPage:true,animations:"disabled"});
  }
});
test("the first learning action and journey card both work",async({page})=>{
  await startGrade(page);
  await page.goto("/#/home");
  await expect(page.locator(".dashboard-hero")).toContainText("Build your");
  await expect(page.locator(".dashboard-hero")).toContainText("Sharpen your");
  const journey=page.locator(".dashboard-meter--action");
  await expect(journey).toHaveAttribute("href",/#\/lesson\/6-A1/);
  await expect(journey).toHaveAccessibleName(/Start your first lesson/);
  await journey.click();
  await expect(page).toHaveURL(/#\/lesson\/6-A1/);
  await expect(page.locator(".lesson-panel")).toContainText("Stage 1 of 5");
});
test("shared lessons keep the intended destination through grade confirmation",async({page})=>{
  await page.goto("/#/lesson/8-A2");
  await expect(page.locator(".welcome-deeplink")).toBeVisible();
  await page.locator('[data-action="pick-grade"][data-pick="8"]').click();
  await page.locator('[data-action="guest"]').click();
  await expect(page).toHaveURL(/#\/lesson\/8-A2/);
  await expect(page.locator(".lesson-panel")).toBeVisible();
});
test("keyboard skip navigation does not damage the lesson route",async({page})=>{
  await startGrade(page);
  await page.goto("/#/lesson/6-A1");
  await page.locator('[data-action="skip-main"]').focus();
  await expect(page.locator('[data-action="skip-main"]')).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page).toHaveURL(/#\/lesson\/6-A1/);
});
test("mobile navigation and reading comfort are available",async({page},info)=>{
  if(info.project.use.viewport.width>650)test.skip();
  await startGrade(page);
  await page.goto("/#/home");
  await page.locator(".mobile-menu summary").click();
  await expect(page.locator(".mobile-menu-links")).toBeVisible();
  await page.locator(".mobile-menu-links [data-action='reading']").click();
  await expect(page.locator("html")).toHaveAttribute("data-reading","comfortable");
  await assertNoOverflow(page,"Comfortable reading on mobile");
});
test("complete an authentic lesson, download work and resume the final stage",async({page})=>{
  await startGrade(page);
  await page.goto("/#/lesson/6-A1");
  await page.locator('[data-action="concept-next"]').click();
  await page.locator('[data-action="concept-next"]').click();
  await page.locator('input[name="knowledge-choice"][value="0"]').check();
  await page.locator('[data-action="knowledge-check"]').click();
  await page.locator('[data-action="next"]').click();
  await page.locator('[data-action="model-reveal"]').click();
  await page.locator('[data-action="next"]').click();
  for(const [i,value] of [0,1,0,1].entries()){
    await page.locator("#sort-"+i).selectOption(String(value));
  }
  await page.locator('[data-action="check"]').click();
  await expect(page.locator("#activity-feedback")).toContainText(/passed/i);
  await page.locator('[data-action="next"]').click();
  await page.locator('[data-action="apply-next"]').click();
  const first={
    purpose:"I want to help another student understand the difference between AI and an ordinary program.",
    decision:"I will use examples and choose an AI tool only if it helps me explain or explore something.",
    evidence:"I will compare the descriptions with two reliable sources and ask a student for feedback."
  };
  for(const [field,value] of Object.entries(first))await page.locator("#plan-"+field).fill(value);
  await page.locator('[data-action="apply-next"]').click();
  await page.locator("#plan-work").fill("I prepared two descriptions and a simple diagram, then asked another student which was clearer.");
  await page.locator("#plan-revision").fill("Their feedback showed confusion about predictions, so I added a concrete model example.");
  await page.locator("#project-confirm").check();
  const pending=page.waitForEvent("download");
  await page.locator('[data-action="download-notes"]').click();
  const download=await pending;
  expect(download.suggestedFilename()).toBe("AI-CJ-6-A1-learning-notes.txt");
  await page.locator('[data-action="record"]').click();
  await expect(page.locator(".lesson-panel")).toContainText("Stage 5 of 5");
  await expect(page.locator('[data-action="finish-reflection"]')).toBeDisabled();
  await expect(page.locator(".lesson-progress-heading")).toContainText("80% completed");
  await page.locator("#reflection-learning").fill("I used to trust confident explanations. Comparing evidence and testing examples made me look for what is supported.");
  await page.locator("#reflection-transfer").fill("Next time in science, I will check an AI explanation against a reliable source before sharing it.");
  await page.locator("#reflection-confirm").check();
  await expect(page.locator('[data-action="finish-reflection"]')).toBeEnabled();
  await page.locator('[data-action="finish-reflection"]').click();
  await expect(page.locator(".lesson-progress-heading")).toContainText("100% completed");
  await expect(page.locator(".reflection-save")).toBeVisible();
  const finalNotes=page.waitForEvent("download");
  await page.locator(".reflection-save [data-action='download-notes']").click();
  await finalNotes;
  const stageVisible=await page.evaluate(()=>{
    const track=document.querySelector(".step-track"),active=track?.querySelector(".step-dot.active");
    if(!track||!active)return false;
    const container=track.getBoundingClientRect(),item=active.getBoundingClientRect();
    return item.left>=container.left-3&&item.right<=container.right+3;
  });
  expect(stageVisible,"Active lesson stage must remain visible inside the mobile stage navigation").toBe(true);
  await page.reload();
  await expect(page.locator(".lesson-panel")).toContainText("Stage 5 of 5");
});
test("critical accessibility defects are caught on the student learning pages",async({page})=>{
  await startGrade(page);
  for(const route of ["#/home","#/grade/6","#/grade/6/snapshot","#/lesson/6-A1"]){
    await page.goto("/"+route);
    await expect(page.locator("#main-title")).toBeVisible();
    const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
    const important=result.violations.filter(v=>["serious","critical"].includes(v.impact));
    const readable=important.map(v=>v.id+": "+v.nodes.slice(0,2).map(n=>n.target.join(",")).join(";")).join("\n");
    expect(readable,"Axe serious/critical findings on "+route).toBe("");
  }
});


test("specific mistakes open learner-controlled support, model review and optional stretch",async({page})=>{
  await startGrade(page);
  await page.goto("/#/lesson/6-A1");
  await page.locator('[data-action="concept-next"]').click();
  await page.locator('[data-action="concept-next"]').click();
  await page.locator('input[name="knowledge-choice"][value="0"]').check();
  await page.locator('[data-action="knowledge-check"]').click();
  await page.locator('[data-action="next"]').click();
  await page.locator('[data-action="model-reveal"]').click();
  await page.locator('[data-action="next"]').click();
  await expect(page.locator(".learning-coach")).toContainText("Choose your next learning step");
  for(const [i,answer] of [1,1,0,1].entries())await page.locator("#sort-"+i).selectOption(String(answer));
  await page.locator('[data-action="check"]').click();
  await expect(page.locator("#activity-feedback")).toContainText("Example 1:");
  await expect(page.locator("#coach-recommendation")).toContainText("smaller step");
  await page.locator('[data-action="coach-route"][data-route="support"]').click();
  await expect(page.locator("#coach-panel")).toContainText("Check your thinking against this goal");
  await page.locator('[data-action="coach-revisit"]').click();
  await expect(page.locator(".lesson-panel")).toContainText("Stage 2 of 5");
  await page.locator('[data-action="next"]').click();
  await page.locator("#sort-0").selectOption("0");
  await page.locator('[data-action="check"]').click();
  await expect(page.locator("#activity-feedback")).toContainText("Challenge passed");
  await expect(page.locator("#coach-recommendation")).toContainText("harder situation");
  await page.locator('[data-action="coach-route"][data-route="stretch"]').click();
  await expect(page.locator("#coach-panel")).toContainText("Make a connection elsewhere");
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("aicj-studio-v2")).records["6-A1"]);
  expect(saved.practicePassed).toBe(true);
  expect(saved.completed).toBe(false);
});
