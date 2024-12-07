import _ from 'lodash';
import puppeteer, { type PDFOptions } from 'puppeteer-core';
import qs from 'qs';
import { v4 as uuid } from 'uuid';
import { type z } from 'zod';

import { PuppeteerLaunchOptionsConfig } from '@/configs/common/PuppeteerLaunchOptionsConfig';
import { QSConfig } from '@/configs/common/QSConfig';
import { redisClient } from '@/configs/redis/redis';

import { downloadSchema } from '../_schema/download.schema';

export const getPdfSchema = downloadSchema;

export type GetPdfInput = z.infer<typeof getPdfSchema>;

const getPdfTestService = async (props: GetPdfInput) => {
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

    const url = new URL(`${process.env.NEXTAUTH_URL}/download/pdf${query}`);

    await page.goto(url.toString());
    await page.waitForSelector("#capture");

    const pdfOption: PDFOptions = {
      printBackground: true,
      landscape: true,
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

export default getPdfTestService;
