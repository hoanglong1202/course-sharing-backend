const { CreatorService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');

const getCreatorName = async (req, res, next) => {
  try {
    const result = await CreatorService.getCreatorName();
    if (!result) {
      throw new NotFoundError('Creator Name not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCreatorName };
