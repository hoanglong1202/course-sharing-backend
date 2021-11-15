const { AuthService, UserService } = require('../services');

const register = async (req, res, next) => {
  const { username } = req.body;
  const isValidUsername = await UserService.findUserByUsername(username);

  if (isValidUsername) {
    res.status(500).send({
      success: false,
      message: 'Username is already taken',
    });
    return;
  }

  await AuthService.register(req.body);
  const registerResult = await UserService.findUserByUsername(username);

  res.status(200).send({
    success: true,
    message: 'Register successfully',
    dataObj: registerResult,
  });
};

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  const isValidUser = await AuthService.signin(username, password);

  if (!isValidUser) {
    res.status(500).send({
      success: false,
      message: 'Account doesnt exist',
    });
    return;
  }

  res.status(200).send({
    success: true,
    message: 'Signin successfully',
    dataObj: isValidUser,
  });
};

module.exports = { register, signin };
