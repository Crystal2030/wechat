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
    console.log('---------Course------->', data)
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
      chapters: [
        {
          title: '第1章 课程介绍',
          sections: ['1-1 介绍课程目标和学习内容']
        },
        {
          title: '第2章 什么影响了MySQL性能',
          sections: ['2-1 影响性能的几个方面', '2-2 CPU资源和可用内存大小', '2-3 磁盘的配置和选择', '2-4 使用RAID增加传统机器硬盘的性能', '2-5 使用固态存储SSD或PCIe卡','2-6 使用网络存储SAN和NAS']
        },
        {
          title: '第3章 MySQL基准测试',
          sections: ['3-1 什么是基准测试', '3-2 如何进行基准测试', '3-3 基准测试演示实例', '3-4 Mysql基准测试工具之mysqlslap', '3-5 Mysql基准测试工具之sysbench', '3-6 sysbench基准测试演示实例']
        }
      ]
    }
    this.cb(course);
  }
}

export { Course }