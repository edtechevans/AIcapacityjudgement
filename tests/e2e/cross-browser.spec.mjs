import {test,expect} from "@playwright/test";

// Cross-engine smoke tests intentionally use simple learner actions.
// They run in Chromium, Firefox and WebKit; the deeper suite runs in Chromium.
async function enter(page,grade=6){
  await page.goto("/#/welcome");
  await expect(page.locator("#main-title")).toContainText("Your grade. Your learning.");
  await page.locator('[data-action="pick-grade"][data-pick="'+grade+'"]').click();
  await expect(page.locator(".course-intro")).toBeVisible();
}

test("learning navigation works without horizontal overflow",async({page})=>{
  await enter(page,8);
  for(const route of ["#/home","#/grade/8","#/grade/8/snapshot","#/about","#/profile","#/lesson/8-B1"]){
    await page.goto("/"+route);
    await expect(page.locator("#main-title")).toBeVisible();
    const d=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    expect(d.scroll,"Unexpected horizontal overflow on "+route).toBeLessThanOrEqual(d.width+2);
  }
});

test("deep links preserve destination and basic lesson steps work",async({page})=>{
  await page.goto("/#/lesson/9-B2");
  await expect(page.locator(".welcome-deeplink")).toBeVisible();
  await page.locator('[data-action="pick-grade"][data-pick="9"]').click();
  await expect(page).toHaveURL(/#\/lesson\/9-B2$/);
  await expect(page.locator(".lesson-panel")).toContainText("Stage 1 of 5");
  await page.locator('[data-action="concept-next"]').click();
  await expect(page.locator(".lesson-panel")).toContainText("Stage 1 of 5");
  await page.reload();
  await expect(page.locator(".lesson-panel")).toBeVisible();
});

test("no learner-written work is sent to a remote service",async({page})=>{
  const external=[];
  page.on("request",request=>{
    const url=new URL(request.url());
    if(url.hostname!=="127.0.0.1"&&url.hostname!=="localhost")external.push(url.href);
  });
  await enter(page);
  await page.goto("/#/lesson/6-A1");
  await expect(page.locator(".lesson-panel")).toBeVisible();
  expect(external,"Unexpected external network requests").toEqual([]);
});


test("an already-selected grade cannot be switched by URL navigation",async({page})=>{
  await enter(page,7);
  await page.goto("/#/grade/10");
  await expect(page).toHaveURL(/#\/grade\/7$/);
  await expect(page.locator(".course-intro")).toContainText("Grade 7:");
});
