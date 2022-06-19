import {v4 as uuidV4} from 'uuid';
import * as Utils from '../utils/utils.js';

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    const users = Utils.getDataUsers();

    resolve(users);
  });
};

export const findAllToArray = async () => {
  const users = await findAll();
  const newUser = users.toString().trim();

  return  JSON.parse(newUser);
};

export const findById = async (id) => {
  const users = await findAll();
  return new Promise((resolve, reject) => {
    let newUsers = users.toString().trim();
    newUsers = JSON.parse(newUsers).find((el) => el.id === id.trim());

    resolve(newUsers);
  });
};

export const create = async (user) => {
  let users = await findAllToArray();
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidV4(), ...user };
    users.push(newUser);
    Utils.writeDataToFile(users);

    resolve(newUser);
  });
};

export const updateAllUsersFile = async (id, user) => {
  let users = await findAllToArray();
  return new Promise((resolve, reject) => {
    let usersToWrite = users.filter((el) => el.id !== id.trim());
    usersToWrite.push(user);
    Utils.writeDataToFile(usersToWrite);

    resolve(user);
  })
}

export const deleteUserFromFile = async (id) => {
  const users = await findAllToArray();
  return new Promise( async (resolve, reject) => {
    const newUsers = users.filter((u) => u.id !== id);
    await Utils.writeDataToFile(newUsers);

    resolve(newUsers);
  })
}
