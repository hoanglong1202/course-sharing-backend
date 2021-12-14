const {
  AuthService,
  UserService,
  CreatorService,
  AdminService,
} = require('../services');
const { BadRequestError } = require('../helper/errors');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../services/utils');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
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

    const token = generateJWT({
      id: result.id,
      email: result.email,
      role: result.role,
    });

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
    const isValidCreator = await CreatorService.findCreatorByEmail(email);
    const isValidAdmin = await AdminService.findAdminByEmail(email);

    if (!isValidUser && !isValidCreator && !isValidAdmin) {
      throw new BadRequestError('Account doesnt exist');
    }

    let user = {};

    if (isValidUser && !isValidCreator && !isValidAdmin) {
      const isValidPassword = await bcrypt.compare(password, isValidUser.pass);

      if (!isValidPassword) {
        throw new BadRequestError('Password is incorrect');
      }

      user = {
        id: isValidUser.id,
        username: isValidUser.username,
        email: isValidUser.email,
        role: isValidUser.role,
        profile_picture: isValidUser.profile_picture,
        status: isValidUser.status,
        user_types_id: isValidUser.user_types_id,
      };
    }

    if (!isValidUser && isValidCreator && !isValidAdmin) {
      const isValidPassword = await bcrypt.compare(password, isValidCreator.pass);

      if (!isValidPassword) {
        throw new BadRequestError('Password is incorrect');
      }

      user = {
        id: isValidCreator.id,
        username: isValidCreator.username,
        email: isValidCreator.email,
        role: isValidCreator.role,
        profile_picture: isValidCreator.profile_picture,
        description: isValidCreator.description,
      };
    }

    if (!isValidUser && !isValidCreator && isValidAdmin) {
      const isValidPassword = await bcrypt.compare(password, isValidAdmin.pass);

      if (!isValidPassword) {
        throw new BadRequestError('Password is incorrect');
      }

      user = {
        id: isValidAdmin.id,
        username: isValidAdmin.username,
        email: isValidAdmin.email,
        role: isValidAdmin.role,
        profile_picture: isValidAdmin.profile_picture,
      };
    }

    const token = generateJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    });

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
