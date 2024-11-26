import { type ConnectOptions } from "puppeteer-core";

export const PuppeteerLaunchOptionsConfig: ConnectOptions = {
  browserWSEndpoint: "ws://localhost:3000",
};
