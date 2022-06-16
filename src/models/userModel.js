import * as module from 'module';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JSON_USERS = path.resolve(__dirname, '../data/users.json');

export const findAll = () => {
  return new Promise((resolve, reject) => {
    const require = module.createRequire(import.meta.url);
    const dataUsers = require(JSON_USERS);
    resolve(dataUsers);
  });
};

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    const require = module.createRequire(import.meta.url);
    const dataUser = require(JSON_USERS).find((u) => u.id === id);
    resolve(dataUser);
  });
};
