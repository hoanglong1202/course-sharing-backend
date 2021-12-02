const { AuthService, UserService } = require('../services');
const { BadRequestError } = require('../helper/errors');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../services/utils');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValidUsername = await UserService.findUserByEmail(email);

    if (isValidUsername) {
      res.status(400).send({
        success: false,
        message: 'Username is already taken',
      });
      // throw new BadRequestError('Username is already taken');
    }

    const temp = req.body;
    delete temp.password;

    const user = {
      ...temp,
      password: await bcrypt.hash(password, 10),
    };

    await AuthService.register(user);
    const result = await UserService.findUserByEmail(email);
    const mappingResult = {
      id: result.id,
      username: result.username,
      email: result.email,
      role: result.role,
      profile_picture: result.profile_picture,
      status: result.status,
      user_types_id: result.user_types_id,
    };

    const token = generateJWT({ username: result.username, role: result.role });

    res.status(200).send({
      success: true,
      message: 'Register successfullyy',
      user: mappingResult,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValidUser = await UserService.findUserByEmail(email);

    if (!isValidUser) {
      res.status(400).send({
        success: false,
        message: 'Account doesnt exist',
      });
      // throw new BadRequestError('Account doesnt exist');
    }

    const isValidPassword = await bcrypt.compare(password, isValidUser.pass);

    if (!isValidPassword) {
      res.status(400).send({
        success: false,
        message: 'Password is incorrect',
      });
      // throw new BadRequestError('Password is incorrect');
    }

    const user = {
      id: isValidUser.id,
      username: isValidUser.username,
      email: isValidUser.email,
      role: isValidUser.role,
      profile_picture: isValidUser.profile_picture,
      status: isValidUser.status,
      user_types_id: isValidUser.user_types_id,
    };

    const token = generateJWT({ username: user.username, role: user.role });

    res.status(200).send({
      success: true,
      message: 'Signin successfully',
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, signin };
