import {defineConfig} from "@playwright/test";
export default defineConfig({
  testDir:"./tests/e2e",
  timeout:30000,
  expect:{timeout:9000},
  retries:process.env.CI?1:0,
  workers:process.env.CI?2:undefined,
  reporter:process.env.CI?[["list"],["html",{open:"never"}]]:[["list"]],
  use:{
    baseURL:"http://127.0.0.1:4173",
    screenshot:"only-on-failure",
    trace:"retain-on-failure",
    actionTimeout:8000
  },
  projects:[
    {name:"desktop-chromium",use:{browserName:"chromium",viewport:{width:1440,height:900}}},
    {name:"tablet-chromium",use:{browserName:"chromium",viewport:{width:768,height:1024}}},
    {name:"phone-chromium",use:{browserName:"chromium",viewport:{width:375,height:812},isMobile:true,hasTouch:true}},
    {name:"small-phone-chromium",use:{browserName:"chromium",viewport:{width:320,height:640},isMobile:true,hasTouch:true}},
    {name:"desktop-firefox",testMatch:"**/cross-browser.spec.mjs",use:{browserName:"firefox",viewport:{width:1280,height:800}}},
    {name:"desktop-webkit",testMatch:"**/cross-browser.spec.mjs",use:{browserName:"webkit",viewport:{width:1280,height:800}}}
  ],
  webServer:{
    command:"python3 -m http.server 4173 --bind 127.0.0.1",
    url:"http://127.0.0.1:4173",
    reuseExistingServer:!process.env.CI,
    timeout:30000
  }
});
