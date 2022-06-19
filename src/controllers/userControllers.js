import * as Users from '../data/usersUtils.js';
import * as Utils from '../utils/utils.js';
import * as errors from '../constants/errors-const.js';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(users);
    console.log('Users were got successfully');

  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ERROR: errors.SMTH_WAS_WRONG_ON_SERVER}))
    console.log(err, errors.SMTH_WAS_WRONG_ON_SERVER);
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await Users.findById(id);
    if (!Utils.isValidV4UUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ERROR: errors.USER_ID_ERROR }));
      console.log(errors.USER_ID_ERROR);

    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ERROR: errors.USER_ID_NOT_EXIST }));
      console.log(errors.USER_ID_NOT_EXIST);

    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
      console.log(`User was got:`);
      console.log(user);
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ERROR: errors.SMTH_WAS_WRONG_ON_SERVER}))
    console.log(err, errors.SMTH_WAS_WRONG_ON_SERVER);
  }
}

export const createUser = async (req, res) => {
  const requestBody = await Utils.getUserFromRequest(req);
  const isChecked = Utils.isCheckedFields('username', 'age', 'hobbies', requestBody);
  const { username, age, hobbies } = requestBody;

  try {
    if (typeof isChecked === 'undefined' ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ERROR: errors.REQUEST_BODY_IS_WRONG }));
      console.log(errors.REQUEST_BODY_IS_WRONG);

    } else {
      const user = {username, age, hobbies,};
      const newUser = await Users.create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
      console.log(`User was created successfully: `);
      console.log(newUser);
    }

  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ERROR: errors.SMTH_WAS_WRONG_ON_SERVER}))
    console.log(err, errors.SMTH_WAS_WRONG_ON_SERVER);
  }
};

export const updateUser = async (req, res, id) => {
  const user = await Users.findById(id);
  const requestBody = await Utils.getUserFromRequest(req);
  try {
    if (!Utils.isValidV4UUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ERROR: errors.USER_ID_ERROR}));
      console.log(errors.USER_ID_ERROR);

    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ERROR: errors.USER_ID_NOT_EXIST }));
      console.log(errors.USER_ID_NOT_EXIST);

    } else {
      const { username, age, hobbies } = requestBody;
      const userData = {
        id: id || user.id,
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }

      const updatedUser = await Users.updateAllUsersFile(id, userData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
      console.log(`User was updated successfully:`);
      console.log(updatedUser);
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ERROR: errors.SMTH_WAS_WRONG_ON_SERVER}))
    console.log(err, errors.SMTH_WAS_WRONG_ON_SERVER);
  }
};

export const deleteUser = async (req, res, id) => {
    try {
      const usersData = await Users.findById(id);

      if (!Utils.isValidV4UUID(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ERROR: errors.USER_ID_ERROR}));
        console.log(errors.USER_ID_ERROR);

      } else if (!usersData) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: errors.USER_ID_NOT_EXIST}));
        console.log(errors.USER_ID_NOT_EXIST);

      } else {
        await Users.deleteUserFromFile(id);
        res.writeHead(204, { 'Content-Type': 'text/html, utf-8' });
        res.end('No content');
        console.log(`User with Id DELETED:`);
        console.log(id);

      }

    } catch(err) {
      res.writeHead(500, { 'Content-Type': 'application/json'} );
      res.end(JSON.stringify({ERROR: errors.SMTH_WAS_WRONG_ON_SERVER}))
      console.log(err, errors.SMTH_WAS_WRONG_ON_SERVER);
    }
};
