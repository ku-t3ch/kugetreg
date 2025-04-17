import { PlaywrightLaunchOptionsConfig } from "@/configs/common/PlaywrightLaunchOptionsConfig";
import { ISignInServiceResponse } from "@/types/responses/ISignInServiceResponse";
import playwright from "playwright-core";

interface ISignInKUAllLoinProps {
  username: string;
  password: string;
  otp: string;
}

const SignInKUAllLoinService = async (props: ISignInKUAllLoinProps) => {
  try {
    const browser = await playwright.chromium.launch(
      PlaywrightLaunchOptionsConfig,
    );
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(
      "https://alllogin.ku.ac.th/realms/KU-Alllogin/protocol/openid-connect/auth?response_type=code&scope=basic%20openid&client_id=registrar-my-ku&redirect_uri=https://my.ku.th/myku/oauth/authorize-callback&code_challenge_method=S256&code_challenge=dDGEJk_QhxSESNTTPjjrtzUDmBUU8Ov0psVwOHbpZ-o",
    );
  } catch (error) {
    throw error;
  }
};

export default SignInKUAllLoinService;
