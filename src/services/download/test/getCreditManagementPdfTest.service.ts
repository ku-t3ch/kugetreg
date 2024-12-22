import _ from "lodash";
import puppeteer, { type PDFOptions } from "puppeteer-core";
import qs from "qs";
import { v4 as uuid } from "uuid";

import { PuppeteerLaunchOptionsConfig } from "@/configs/common/PuppeteerLaunchOptionsConfig";
import { QSConfig } from "@/configs/common/QSConfig";
import { redisClient } from "@/configs/redis/redis";
import { type DownloadCreditManagementPdfInput } from "@/services/creditManagement/download/_schema/download.schema";

const getCreditManagementPdfTestService = async (
  props: DownloadCreditManagementPdfInput,
) => {
  try {
    const width = 600;

    const browser = await puppeteer.launch(PuppeteerLaunchOptionsConfig);
    const page = await browser.newPage();
    await page.setViewport({
      width: width,
      height: 0,
    });

    const keyId = uuid();
    await redisClient.set(
      keyId,
      JSON.stringify(props.payload),
      "EX",
      60, // 1 minute
    );

    const queryProps = _.omit(props, ["payload"]);

    const query = qs.stringify(
      {
        ...queryProps,
        id: keyId,
      },
      QSConfig,
    );

    const url = new URL(
      `${process.env.NEXTAUTH_URL}/download/credit-management${query}`,
    );

    await page.goto(url.toString(), {
      waitUntil: "networkidle2",
    });

    const pdfOption: PDFOptions = {
      printBackground: true,
      landscape: false,
      scale: 0.8,
      format: "A4",
    };

    const pdf = await page.pdf(pdfOption);

    await page.close();
    await redisClient.del(keyId);
    await browser.close();
    const base64 = Buffer.from(pdf).toString("base64");
    return "data:application/pdf;base64," + base64.toString();
  } catch (error) {
    throw error;
  }
};

export default getCreditManagementPdfTestService;
