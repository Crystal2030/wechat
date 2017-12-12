var util = require('../../../../utils/util.js');
var app = getApp();
class Course {
  constructor(url) {
    this.url = url;
  }

  getCourseData(courseId, cb) {
    this.cb = cb;
    util.http(this.url,{"post_id": courseId},  'POST', this.processCoursesData.bind(this));
  }

  processCoursesData(data) {
    data = data.data;
    if (!data) {
      return;
    }
    var course = {
      courseId: data.courseId,
      courseTitle: data.title,
      teacherId: data.teacher_id,
      courseImg: app.globalData.apiBase + data.course_img,
      stars: [1, 1, 1, 1, 0],//util.convertToStarsArray(subject.rating.stars)
      price: data.price,
      average: data.rating, //course.rating.average暂无此字段
      summary: data.summary, //course.sumary 暂无此字段
      enrollNum: data.enroll_num, // course.enroll_num 暂无此字段
      chapters: JSON.parse(data.chapters)
    }
    this.cb(course);
  }
}

export { Course }