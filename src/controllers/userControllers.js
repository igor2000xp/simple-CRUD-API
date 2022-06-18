import * as Users from '../models/userModel.js';
import * as Utils from '../utils/utils.js';

const WRONG_USER = "User with such ID doesn't exist";
const WRONG_USERS_ID = 'ID is wrong';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(users);

  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: WRONG_USER }));

    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
}

export const createUser = async (req, res) => {
  const requestBody = await Utils.getUserFromRequest(req);
  const { username, age, hobbies } = requestBody;

  try {
      const user = { username, age, hobbies, };
      const newUser = Users.create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));

  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res, id) => {
  const user = await Users.findById(id);
  const requestBody = await Utils.getUserFromRequest(req);
  try {
    if (!user) {
      res.writeHead(404, { 'Content=Type': 'application/json' });
      res.end(JSON.stringify({ message: WRONG_USER }));
    } else {
      const { username, age, hobbies } = requestBody;
      const userData = {
        id: id || user.id,
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }

      const updatedUser = await Users.updateAllUsersFile(id, userData);
      res.writeHead(201, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(updatedUser));
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res, id) => {
    try {
      const usersData = await Users.findById(id);

      if  (!usersData) {
        res.writeHead(404, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: WRONG_USER }));

      } else {
        await Users.deleteUserFromFile(id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `User with id ${id} DELETED` }));

        return usersData;
      }

    } catch(err) {
      console.log(err);
    }
};
