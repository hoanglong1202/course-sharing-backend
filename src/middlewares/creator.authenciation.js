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
    const isValidCreator = await CreatorService.findCreatorByEmail(email);
    const isValidAdmin = await AdminService.findAdminByEmail(email);

    if (!isValidCreator && !isValidAdmin) {
      throw new NotFoundError('Not Found user');
    }

    if (role !== 'creator' && role !== 'admin') {
      throw new UnauthorizedError('Invalid jwt token send in request');
    }

    if (isValidCreator && !isValidAdmin) {
      req.requestFrom = {
        creatorId: isValidCreator.id,
        isValidAdmin: null,
      };
    }

    if (!isValidCreator && isValidAdmin) {
      req.requestFrom = {
        creatorId: null,
        isValidAdmin: isValidAdmin.id,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = CreatorAuthenciation;
