import { db } from "../utils/db.utils";

import * as fs from "fs";
import * as path from "path";

async function main() {
  const reportData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "reportData.json"), "utf-8")
  );

  for (const data of reportData) {
    await db.user.upsert({
      where: { email: data.email },
      update:{},
      create: {
        email: data.email,
        name: data.name,
      Report: {
        create: data.Report.map((report: any)=>({
            title: report.title,
            content: report.content,
            published: report.published,
        })),
    }
      }
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async () => {
    await db.$disconnect();
    process.exit(1);
  });
