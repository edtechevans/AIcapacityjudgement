import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openEducators(page){
 await page.goto("/#/educators");
 await expect(page.locator("#main-title")).toHaveText("Educator learning");
 await expect(page.locator('textarea, input[type="text"]')).toHaveCount(0);
}
async function moduleData(page,id){
 return await page.evaluate(id=>window.EDUCATOR_V4.courses.flatMap(c=>c.modules).find(m=>m.id===id),id);
}
async function answer(page,key,task){
 if(task.kind==="single"){
  const correct=task.options.findIndex(x=>x[1]===1);
  await page.locator('[data-edu-single="'+correct+'"][data-edu-task="'+key+'"]').click();
 }else if(task.kind==="multi"){
  for(let i=0;i<task.options.length;i++)if(task.options[i][1]===1){
   await page.locator('[data-edu-multi="'+i+'"][data-edu-task="'+key+'"]').check();
  }
 }else if(task.kind==="classify"){
  for(let i=0;i<task.items.length;i++){
   await page.locator('[data-edu-classify="'+i+'"][data-edu-task="'+key+'"]').selectOption(String(task.items[i][1]));
  }
 }else if(task.kind==="order"){
  for(let desired=0;desired<task.steps.length;desired++){
   for(let attempt=0;attempt<8;attempt++){
    const texts=await page.locator(".sequence-item .sequence-text").allTextContents();
    const position=texts.indexOf(task.steps[desired]);
    expect(position).toBeGreaterThanOrEqual(desired);
    if(position===desired)break;
    await page.locator(".sequence-item").nth(position).locator('[data-dir="-1"]').click();
   }
  }
 }
 await page.locator('[data-edu-check="'+key+'"]').click();
 await expect(page.locator(".educator-check").filter({has:page.locator('[data-edu-check="'+key+'"]')})).toContainText("Understanding checked");
}
async function completeModule(page,id){
 await page.locator('[data-educator-open="'+id+'"]').click();
 const m=await moduleData(page,id);
 await expect(page.locator(".educator-stage-pill")).toHaveCount(5);
 await answer(page,"learn",m.tasks.learn);
 await page.locator('[data-edu-next]').click();
 await answer(page,"model",m.tasks.model);
 await page.locator('[data-edu-next]').click();
 for(let i=0;i<m.tasks.practice.length;i++)await answer(page,"p"+i,m.tasks.practice[i]);
 await page.locator('[data-edu-next]').click();
 await expect(page.locator('[data-edu-check="followup"]')).toHaveCount(0);
 await answer(page,"apply",m.tasks.apply);
 await expect(page.locator('[data-edu-check="followup"]')).toBeVisible();
 await answer(page,"followup",m.tasks.followup);
 await page.locator('[data-edu-next]').click();
 await answer(page,"transfer",m.tasks.transfer);
 await expect(page.locator(".educator-finish")).toContainText("Module completed");
}
test("educator learning is four modules per pathway with accessible plain-English support",async({page})=>{
 await openEducators(page);
 await expect(page.locator(".educator-course-card")).toHaveCount(2);
 await expect(page.locator('[data-educator-open]')).toHaveCount(8);
 await expect(page.locator(".educator-course-card").first()).toContainText("AI Capacity");
 await expect(page.locator(".educator-course-card").last()).toContainText("AI Judgement");
 await expect(page.locator(".educator-pathway-summary")).toContainText("4 hours planned");
 await expect(page.locator(".educator-module-time")).toHaveCount(8);
 await expect(page.locator(".educator-finish")).toContainText("0 / 8 modules completed");
 await page.locator('[data-educator-open="c2"]').click();
 await expect(page.locator(".educator-glossary")).toBeVisible();
 await page.locator(".educator-glossary summary").click();
 await expect(page.locator(".educator-glossary")).toContainText("Universal Design for Learning");
 await expect(page.locator(".educator-glossary")).toContainText("Multi-Tiered System of Supports");
 await expect(page.locator('textarea, input[type="text"]')).toHaveCount(0);
});
test("Capacity pathway supports all five stages, seven checks and changing evidence",async({page})=>{
 test.setTimeout(60000);
 await openEducators(page);
 await completeModule(page,"c1");
 await page.locator('[data-educator-back]').click();
 await expect(page.locator(".educator-finish")).toContainText("1 / 8 modules completed");
});
test("Judgement pathway includes authentic MTSS decisions and accessibility support",async({page})=>{
 test.setTimeout(60000);
 await openEducators(page);
 await page.locator('[data-educator-open="j2"]').click();
 await expect(page.locator("#main-title")).toContainText("MTSS");
 await expect(page.locator(".educator-ideas")).toContainText("Tier 1");
 await expect(page.locator(".educator-ideas")).toContainText("Tier 2");
 await page.locator(".educator-glossary summary").click();
 await expect(page.locator(".educator-glossary")).toContainText("Tier 3");
 await page.locator('[data-educator-back]').click();
 await completeModule(page,"j2");
});
test("old pilot completion cannot mark the revised modules as completed",async({page})=>{
 await page.goto("/");
 await page.evaluate(()=>{
  localStorage.setItem("aicj-educator-progress-v3",JSON.stringify({"literacy-0":{completed:true}}));
  localStorage.setItem("aicj-educator-progress-v4",JSON.stringify({"c1":{stage:4,tasks:{learn:{passed:true},model:{passed:true},p0:{passed:true},p1:{passed:true},apply:{passed:true},transfer:{passed:true}}}}));
 });
 await openEducators(page);
 await expect(page.locator(".educator-finish")).toContainText("0 / 8 modules completed");
});
test("ordering can be completed using keyboard-operable buttons without dragging",async({page})=>{
 await openEducators(page);
 await page.locator('[data-educator-open="c2"]').click();
 const m=await moduleData(page,"c2");
 await answer(page,"learn",m.tasks.learn);
 await page.locator('[data-edu-next]').click();
 await answer(page,"model",m.tasks.model);
 await page.locator('[data-edu-next]').click();
 for(let i=0;i<m.tasks.practice.length;i++)await answer(page,"p"+i,m.tasks.practice[i]);
 await page.locator('[data-edu-next]').click();
 const firstMovable=page.locator('[data-edu-move][data-dir="-1"]:not([disabled])').first();
 await firstMovable.focus();
 await expect(firstMovable).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(page.locator(".sequence-list")).toBeVisible();
 await expect(page.locator('[draggable="true"]')).toHaveCount(0);
});
test("educator overview, teaching, and glossary have no automated WCAG A/AA violations",async({page})=>{
 await openEducators(page);
 for(const location of ["overview","teaching"]){
  if(location==="teaching"){await page.locator('[data-educator-open="c1"]').click();await page.locator(".educator-glossary summary").click();}
  const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
  const readable=result.violations.map(v=>v.id+" ["+v.impact+"]: "+v.nodes.slice(0,2).map(n=>n.target.join(",")).join(";")).join("\n");
  expect(readable).toBe("");
 }
});