import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // importing module needs a js extension or error

export const register = (req, res) => {
  // Check user exist
  const q = 'SELECT * FROM users WHERE email = ? OR username = ? ';

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json(' user already exist');

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // Store hash in your password DB.

    // adding a user to the database will
    const q = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)';
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('user has been created!');
    });
  });
};

export const login = (req, res) => {
  //CHECK if user Exists
  const q = 'SELECT * FROM users WHERE username = ? ';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found');

    // CHECK password, plaintext password to hash password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json('Wrong username or password');

    const token = jwt.sign({ id: data[0].id }, 'jwtkey'); //you can generate a random key .env
    const { password, ...other } = data[0];

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};
export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('user has logout');
};
