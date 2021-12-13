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

const getCreator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CreatorService.findCreatorById(id);
    if (!result) {
      throw new NotFoundError('Creator not found!');
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

const updateCreator = async (req, res, next) => {
  try {
    const { creator_id } = req.body;

    const result = await CreatorService.findCreatorById(creator_id);
    if (!result) {
      throw new NotFoundError('Creator not found!');
    }

    await CreatorService.updateCreator(req.body);

    res.status(200).send({
      success: true,
      message: 'Update creator successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCreatorName, getCreator, updateCreator };
