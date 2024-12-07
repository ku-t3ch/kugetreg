import qs from "qs";
import { v4 as uuid } from "uuid";
import { type z } from "zod";

import { QSConfig } from "@/configs/common/QSConfig";
import { redisClient } from "@/configs/redis/redis";

import { downloadSchema } from "./_schema/download.schema";
import { axiosBrowserLess } from "utils/axiosAPI";
import _ from "lodash";

export const getReceiptSchema = downloadSchema;

export type GetReceiptInput = z.infer<typeof getReceiptSchema>;

const getReceiptService = async (props: GetReceiptInput) => {
  try {
    const width = 600;
    const selector = "#capture";
    
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

    const url = new URL(`${process.env.NEXTAUTH_URL}/download/receipt${query}`);

    const res = await axiosBrowserLess.post(
      "/chromium/screenshot",
      {
        url: url,
        viewport: {
          width: width,
          height: 0,
          deviceScaleFactor: 3,
        },
        selector: selector,
        waitForSelector: {
          selector: selector,
        },
        gotoOptions: {
          waitUntil: "networkidle2",
        },
        waitForTimeout: 0,
      },
      {
        responseType: "arraybuffer",
      },
    );

    await redisClient.del(keyId);

    return "data:image/png;base64," + Buffer.from(res.data).toString("base64");
  } catch (error) {
    throw error;
  }
};

export default getReceiptService;
