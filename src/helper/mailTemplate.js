const newLesson = () => {
  const template = `
  <div style="padding: 0; color: #000000; font-family: 'Proxima Nova', sans-serif; font-weight: 400;">
    <div style="border: 1px solid #6415FF; box-sizing: border-box; border-radius: 30px; width: 850px; height: 330px; margin: 0 auto;">
      <div style=" font-style: normal; font-weight: bold; font-weight: bold; font-size: 30px; line-height: 39px;  width: 600px; margin: auto; color: #000000; padding-top: 24px; padding-bottom: 12px;">
        Hi {{name}}, You have been invited to the Trailer2You Admin Panel
      </div>
      <div style="width: 60px; height: 15px; background: #6415FF; border-radius: 100px; margin: 8px auto;"></div>
      <div style="font-size: 17px; line-height: 19px; text-align: center; width: 490px; margin: auto; color: #6b6464; margin-top: 34px; margin-bottom: 40px;">
          Accept the invite then set a password in the panel to get access.
      </div>
      <a href="{{url}}" style="font-style: normal; font-weight: 500; font-size: 16px; line-height: 19px; text-align: center; color: #ffffff !important; 
                              text-decoration: none; width: 315px; padding: 18px 0; background: #6415FF; border-radius: 4px; display: block;
                              margin: 0 auto;">
        Học ngay
      </a>
    </div>
  </div>`;
  const subject = `Có bài học mới ✔`;
  return { template, subject };
};

const approvedCourse = () => {};

module.exports = {
  newLesson,
  approvedCourse,
};
