import * as module from 'module';
import { fileURLToPath } from 'url';
import * as path from 'path';
import {v4 as uuidV4} from 'uuid';
import { writeDataToFile } from '../utils/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JSON_USERS = path.resolve(__dirname, '../data/users.json');

const getDataUsers = () => {
  const require = module.createRequire(import.meta.url);
  return require(JSON_USERS);
}

export const findAll = () => {
  return new Promise((resolve, reject) => {
    // const require = module.createRequire(import.meta.url);
    // const dataUsers = require(JSON_USERS);
    const dataUsers = getDataUsers();
    resolve(dataUsers);
  });
};

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    const dataUser = getDataUsers().find((u) => u.id === id.toString());
    resolve(dataUser);
  });
};

export const create = async (user) => {
  return new Promise((resolve, reject) => {
    const dataUsers = getDataUsers();
    const newUser = { id: uuidV4(), ...user };
    dataUsers.push(newUser);

    writeDataToFile(path.resolve(__dirname, '../data/users.json'), dataUsers);
    resolve(dataUsers);
  });
};
