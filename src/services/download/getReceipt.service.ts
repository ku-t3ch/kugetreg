import puppeteer from "puppeteer";
import qs from "qs";
import { v4 as uuid } from "uuid";
import { type z } from "zod";

import { PuppeteerLaunchOptionsConfig } from "@/configs/common/PuppeteerLaunchOptionsConfig";
import { QSConfig } from "@/configs/common/QSConfig";
import { redisClient } from "@/configs/redis/redis";

import { downloadSchema } from "./_schema/download.schema";

export const getReceiptSchema = downloadSchema;

export type GetReceiptInput = z.infer<typeof getReceiptSchema>;

const getReceiptService = async (props: GetReceiptInput) => {
  try {
    const width = 600;

    const browser = await puppeteer.launch(PuppeteerLaunchOptionsConfig);
    const page = await browser.newPage();
    await page.setViewport({
      width: width,
      height: 0,
      deviceScaleFactor: 3,
    });

    const keyId = uuid();
    await redisClient.set(keyId, JSON.stringify(props.courseData), {
      EX: 60, // 1 minute
    });

    const query = qs.stringify(
      {
        screenType: props.screenType,
        major: props.major,
        id: keyId,
      },
      QSConfig,
    );

    const url = new URL(`${process.env.NEXTAUTH_URL}/download/receipt${query}`);
    await page.goto(url.toString(), {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("#capture");
    const logo = await page.$("#capture");
    const result = await logo?.screenshot({ type: "png" });
    await page.close();
    await browser.close();
    return "data:image/png;base64," + result?.toString();
  } catch (error) {
    throw error;
  }
};

export default getReceiptService;
