const { UserService, CreatorService, AdminService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');

const showUserList = async (req, res, next) => {
  try {
    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { showUserList };
