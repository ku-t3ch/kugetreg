import qs from "qs";
import { v4 as uuid } from "uuid";

import { QSConfig } from "@/configs/common/QSConfig";
import { redisClient } from "@/configs/redis/redis";

import { axiosBrowserLess } from "utils/axiosAPI";
import _ from "lodash";
import { type DownloadCreditManagementPdfInput } from "../creditManagement/download/_schema/download.schema";

const getCreditManagementPdfService = async (
  props: DownloadCreditManagementPdfInput,
) => {
  try {
    const width = 600;

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

    const res = await axiosBrowserLess.post(
      "/chromium/pdf",
      {
        url: url,
        viewport: {
          width: width,
          height: 0,
        },
        gotoOptions: {
          waitUntil: "networkidle2",
        },
        options: {
          printBackground: true,
          landscape: false,
          format: "A4",
          scale: 1,
        },
        waitForTimeout: 0,
      },
      {
        responseType: "arraybuffer",
      },
    );

    await redisClient.del(keyId);

    return (
      "data:application/pdf;base64," + Buffer.from(res.data).toString("base64")
    );
  } catch (error) {
    throw error;
  }
};

export default getCreditManagementPdfService;
