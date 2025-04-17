import { PlaywrightLaunchOptionsConfig } from "@/configs/common/PlaywrightLaunchOptionsConfig";
import { type ISignInServiceResponse } from "@/types/responses/ISignInServiceResponse";
import playwright from "playwright-core";

interface ISignInKUAllLoinProps {
  username: string;
  password: string;
  otp: string;
}

const SignInKUAllLoinService = async (props: ISignInKUAllLoinProps) => {
  let browser;
  let context;
  let page;
  try {
    browser = await playwright.chromium.launch(PlaywrightLaunchOptionsConfig);
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://my.ku.th/myku/myku?intent=/");
    await page.waitForSelector(
      "#form-login > div.d-flex.col-sm-7.col-md-5.col-lg-12.px-0.v4loginform > div > form > div:nth-child(5) > button",
    );
    await page
      .getByRole("button", { name: "เข้าสู่ระบบด้วย KU ALL-Login" })
      .click();
    await page.locator("#username").fill(props.username);
    await page.locator("#password").click();
    await page.locator("#password").fill(props.password);
    await page.getByRole("button", { name: "Sign In" }).click();

    const loginErrorElement = page.locator("#input-error");
    if (await loginErrorElement.isVisible()) {
      const errorText = await loginErrorElement.innerText();
      if (errorText) {
        throw new Error(errorText);
      }
    }

    await page.locator("#otp").click();
    await page.locator("#otp").fill(props.otp);
    await page.getByRole("button", { name: "Sign In" }).click();

    const otpErrorElement = page.locator("#input-error-otp-code");
    if (await otpErrorElement.isVisible()) {
      const errorText = await otpErrorElement.innerText();
      if (errorText) {
        throw new Error(errorText);
      }
    }

    const responsePromise = await page.waitForResponse(
      "https://my.ku.th/myku/api/security/myadmin-user/login-profile",
      {
        timeout: 60000, // 6 seconds
      },
    );
    const response = await responsePromise.json();
    await page.close();
    await context.close();
    await browser.close();
    return response as ISignInServiceResponse;
  } catch (error) {
    if (page) {
      await page.close();
    }
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
    throw error;
  }
};

export default SignInKUAllLoinService;
