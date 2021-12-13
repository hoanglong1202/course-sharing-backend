const { AdminService, UserService } = require('../services');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../helper/errors');
const { veiryJWT } = require('../services/utils');

async function UserAuthenciation(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError('Invalid jwt token send in request');
    }

    const { id, email, role } = veiryJWT(token);
    const isValidUser = await UserService.findUserByEmail(email);
    const isValidAdmin = await AdminService.findAdminByEmail(email);

    if (!isValidUser && !isValidAdmin) {
      throw new NotFoundError('Not Found user');
    }

    if (role !== 'user' && role !== 'admin') {
      throw new UnauthorizedError('Invalid jwt token send in request');
    }

    if (isValidUser && !isValidAdmin) {
      req.requestFrom = {
        userId: isValidUser.id,
        isValidAdmin: null,
      };
    }

    if (!isValidUser && isValidAdmin) {
      req.requestFrom = {
        userId: null,
        isValidAdmin: isValidAdmin.id,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = UserAuthenciation;
