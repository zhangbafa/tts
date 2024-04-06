import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import {nanoid} from 'nanoid'
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

export default defineEventHandler(async (event) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let uploadDir = path.join(__dirname, "../public/mm");
    if (process.env.NODE_ENV === 'development') {
        uploadDir = path.join(__dirname, "../../public/mm");
    }
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    return uploadDir
})
