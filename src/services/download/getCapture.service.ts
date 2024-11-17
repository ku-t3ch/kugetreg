import puppeteer from "puppeteer";
import qs from "qs";
import { v4 as uuid } from "uuid";
import { type z } from "zod";

import { PuppeteerLaunchOptionsConfig } from "@/configs/common/PuppeteerLaunchOptionsConfig";
import { QSConfig } from "@/configs/common/QSConfig";
import { redisClient } from "@/configs/redis/redis";

import { downloadSchema } from "./_schema/download.schema";

export const getCaptureSchema = downloadSchema;

export type GetCaptureInput = z.infer<typeof getCaptureSchema>;

const getCaptureService = async (props: GetCaptureInput) => {
  try {
    const width = 700;

    const browser = await puppeteer.launch(PuppeteerLaunchOptionsConfig);
    const page = await browser.newPage();
    await page.setViewport({
      width: width,
      height: 0,
      deviceScaleFactor: 3,
    });

    const keyId = uuid();
    await redisClient.set(
      keyId,
      JSON.stringify(props.courseData),
      "EX",
      60, // 1 minute
    );

    const query = qs.stringify(
      {
        screenType: props.screenType,
        major: props.major,
        id: keyId,
      },
      QSConfig,
    );

    const url = new URL(`${process.env.NEXTAUTH_URL}/download/capture${query}`);
    await page.goto(url.toString());
    await page.waitForSelector("#capture");
    const logo = await page.$("#capture");
    const result = await logo?.screenshot({ type: "png" });
    await page.close();
    await browser.close();
    const base64 = Buffer.from(result as Buffer).toString("base64");
    return "data:image/png;base64," + base64?.toString();
  } catch (error) {
    throw error;
  }
};

export default getCaptureService;
