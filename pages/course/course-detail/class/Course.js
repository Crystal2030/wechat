var util = require('../../../../utils/util.js')
class Course {
  constructor(url) {
    this.url = url;
  }

  getCourseData(cb) {
    this.cb = cb;
    util.http(this.url, this.processDoubanData.bind(this));
  }

  processDoubanData(data) {
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var course = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary,
      capters: [
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