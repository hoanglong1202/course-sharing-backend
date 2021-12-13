const { UserService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserService.findUserById(id);
    if (!result) {
      throw new NotFoundError('User not found!');
    }

    delete result.pass;

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const result = await UserService.findUserById(user_id);
    if (!result) {
      throw new NotFoundError('User not found!');
    }

    await UserService.updateUser(req.body);

    res.status(200).send({
      success: true,
      message: 'Update user successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, updateUser };
