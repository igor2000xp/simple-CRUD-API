import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JSON_USERS = path.resolve(__dirname, '../data/users.json');

export const getDataUsers = async () => {
  return  await fs.readFile(JSON_USERS, {encoding: "utf-8"});
}

export const writeDataToFile = async (content) => {
  try {
    await fs.writeFile(JSON_USERS, JSON.stringify(content), { encoding:'utf8', flag:'w' });

  } catch (err) {
    console.log(err);
  }
};

export const getUserFromRequest = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let requestBody = '';

      req.on('data', (chunk) => {
        requestBody += chunk.toString();
      })
      req.on('end', () => {
        const result = JSON.parse(requestBody.toString().trim());
        resolve(result);
      })

    } catch (err) {
      reject(err);
    }
  })

}
