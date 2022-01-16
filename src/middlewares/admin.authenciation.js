const { CreatorService, AdminService } = require('../services');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../helper/errors');
const { veiryJWT } = require('../services/utils');

async function CreatorAuthenciation(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError('Invalid jwt token send in request');
    }

    const { id, email, role } = veiryJWT(token);
    const isValidAdmin = await AdminService.findAdminByEmail(email);

    if (!isValidAdmin) {
      throw new UnauthorizedError('Not Found user');
    }

    if (role !== 'admin') {
      throw new UnauthorizedError('Invalid jwt token send in request');
    }

    if (isValidAdmin) {
      req.requestFrom = {
        adminId: isValidAdmin.id,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = CreatorAuthenciation;
