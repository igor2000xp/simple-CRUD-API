import * as Users from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));

  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "User doesn't exist" }));

    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
}

export const createUser = async (req, res) => {
  try {
    const user = {
      username: 'Igor',
      age: 35,
      hobbies:'diving',
    };
    const newUser = Users.create(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));

    // const users = await Users.findAll();
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};
