const { AuthService, UserService } = require('../services');
const { BadRequestError } = require('../helper/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateJWT } = require('../services/utils');

const register = async (req, res, next) => {
  const { email, username, password } = req.body;
  const isValidUsername = await UserService.findUserByEmail(email);

  if (isValidUsername) {
    throw new BadRequestError('Username is already taken');
  }

  const temp = req.body;
  delete temp.password;

  const user = {
    ...temp,
    password: await bcrypt.hash(password, 10),
  };

  await AuthService.register(user);
  const registerResult = await UserService.findUserByEmail(username);

  res.status(200).send({
    success: true,
    message: 'Register successfully',
    user: registerResult,
  });
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const isValidUser = await UserService.findUserByEmail(email);

  if (!isValidUser) {
    throw new BadRequestError('Account doesnt exist');
  }

  await bcrypt.compare(password, isValidUser.pass, function (err, result) {
    if (!result) {
      throw new BadRequestError('Password is incorrect');
    }
  });

  const user = {
    username: isValidUser?.username,
    email: isValidUser?.email,
    role: isValidUser?.role,
    profile_picture: isValidUser?.profile_picture,
    status: isValidUser?.status,
    user_types_id: isValidUser?.user_types_id,
  };

  const token = generateJWT({ username: user.username, role: user.role });

  console.log('test');
  console.log(user?.username);
  console.log(user?.role);

  res.status(200).send({
    success: true,
    message: 'Signin successfully',
    user: user,
    token,
  });
};

module.exports = { register, signin };
