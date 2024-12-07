import puppeteer from "puppeteer-core";
import qs from "qs";
import { v4 as uuid } from "uuid";
import { type z } from "zod";

import { PuppeteerLaunchOptionsConfig } from "@/configs/common/PuppeteerLaunchOptionsConfig";
import { QSConfig } from "@/configs/common/QSConfig";
import { redisClient } from "@/configs/redis/redis";

import { downloadSchema } from "../_schema/download.schema";
import _ from "lodash";

export const getCaptureSchema = downloadSchema;

export type GetCaptureInput = z.infer<typeof getCaptureSchema>;

const getCaptureTestService = async (props: GetCaptureInput) => {
  try {
    const width = 700;
    const selector = "#capture";

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

    const queryProps = _.omit(props, ["courseData"]);

    const query = qs.stringify(
      {
        ...queryProps,
        id: keyId,
      },
      QSConfig,
    );

    const url = new URL(`${process.env.NEXTAUTH_URL}/download/capture${query}`);

    await page.goto(url.toString(), {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector(selector);
    const logo = await page.$(selector);
    const result = await logo?.screenshot({ type: "png" });
    await redisClient.del(keyId);
    await page.close();
    await browser.close();
    const base64 = Buffer.from(result as Buffer).toString("base64");
    return "data:image/png;base64," + base64?.toString();
  } catch (error) {
    throw error;
  }
};

export default getCaptureTestService;
