const { UserService, CreatorService, AdminService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');

const showUserList = async (req, res, next) => {
  try {
    const userList = await UserService.getUserList();
    const creatorList = await CreatorService.getCreatorList();

    const totalActiveUser = userList.filter(item => item.status === 'Hoạt động').length;
    const totalActiveCreator = creatorList.filter(item => item.status === 'Hoạt động').length;

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: {
        totalActiveUser,
        totalActiveCreator,
        userList,
        creatorList,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { showUserList };
