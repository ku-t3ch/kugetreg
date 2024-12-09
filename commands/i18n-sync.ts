import { promises, readFileSync } from 'fs';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import _ from 'lodash';
import path from 'path';

// same index in column
const langs = ["th", "en"];

type DynamicObject = Record<string, any>;

function createNestedObject(path: string, value: any): DynamicObject {
  const keys = path.split(".");
  return keys.reduceRight((acc, key, index) => {
    if (index === keys.length - 1) {
      return { [key]: value };
    }
    return { [key]: acc };
  }, {});
}

async function getObjectValue(doc: GoogleSpreadsheet, position: number) {
  const resultAll = [];
  for (let index = 0; index < doc.sheetCount; index++) {
    const sheet = doc.sheetsByIndex[index];
    const rows = await sheet?.getCellsInRange("A2:C1000");
    const resultSheet = [];
    for (const row of rows) {
      const result = createNestedObject(row[0], row[position]);
      resultSheet.push(result);
    }
    const mergedResult = _.merge({}, ...resultSheet);
    resultAll.push(mergedResult);
  }
  return _.merge({}, ...resultAll);
}

void (async function () {
  const serviceAccountPath = path.join(path.resolve(), "/google_service_account.json");
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

  const serviceAccountAuth = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    "1igZmE94mhNROKNFzvscaQMFm9OUyZJEGGBb1cTdBLb0",
    serviceAccountAuth,
  );

  await doc.loadInfo();

  for (const lang of langs) {
    const result = await getObjectValue(doc, langs.indexOf(lang) + 1);
    await promises.writeFile(
      path.join(path.resolve(), `messages/${lang}.json`),
      JSON.stringify(result),
    );
  }
})();
