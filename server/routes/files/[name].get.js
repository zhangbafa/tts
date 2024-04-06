import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
export default defineEventHandler(async (event) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let uploadDir = path.join(__dirname, "../public");
  if (process.env.NODE_ENV === 'development') {
      uploadDir = path.join(__dirname, "../../public");
  }
  if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
  }
  // console.log("uploadDir:", uploadDir);
  const filePath = path.join(uploadDir, event.context.params.name);

  return sendStream(event, fs.createReadStream(filePath));
});