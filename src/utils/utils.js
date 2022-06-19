import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as errors from '../constants/errors-const.js';

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
};

export const isCheckedFields = (field1, field2, field3, namesArray) => {
  const objKeys = Object.keys(namesArray);

  const check = objKeys.map((el) => {
    return el === field1 || el === field2 || el === field3 ? 1 : 0;
  })

  try {
    const result = check.reduce((acc, curr) => acc + curr) === 3;

    if (!result) {
      throw("Value is wrong")
    }
    return result;
  } catch (err) {
    console.log(errors.REQUEST_BODY_IS_WRONG);
  }

};

export const isValidV4UUID = (uuid) => {
  const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

  try {
  const result = uuidV4Regex.test(uuid);
  if (!result) {
    throw("Value is wrong")
  }
  return result;

  } catch (err) {
  console.log(errors.USER_ID_ERROR);
  }
};

