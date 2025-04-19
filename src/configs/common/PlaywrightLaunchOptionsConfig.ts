import { type LaunchOptions } from "playwright-core";

export const PlaywrightLaunchOptionsConfig: LaunchOptions = {
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  executablePath:
    process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : process.platform === "linux"
        ? "/usr/bin/chromium-browser"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: process.env.IS_LOCAL ? false : true,
};
