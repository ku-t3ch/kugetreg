import { type PuppeteerLaunchOptions } from "puppeteer";

export const PuppeteerLaunchOptionsConfig: PuppeteerLaunchOptions = {
  headless: false,
  //   executablePath:
  //     process.platform === "win32"
  //       ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  //       : process.platform === "linux"
  //         ? "/usr/bin/chromium-browser"
  //         : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  executablePath: "/usr/bin/chromium-browser",
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
};
