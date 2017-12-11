var app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function http(url, data, method, callBack) {
  data = data || {};
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      "Content-Type": "json",
      "Session_key": wx.getStorageSync('session_key')
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

function randomStr(len) {
  var len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var charNum = chars.length;
  var randomStr = '';
  for (var i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * charNum));
  }
  return randomStr;

}

function getCourseListData(url, settedKey, categoryTitle, cb) {
  // var that = this;
  wx.request({
    url: url,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    data: {
      "page_index": 1,
      "page_size": 20
    },
    header: {
      "Content-Type": "json",
      "Session_key": wx.getStorageSync('session_key')
    },
    success: function (res) {
      var readyData = processCoursesData(res.data, settedKey, categoryTitle);
      cb&&cb(readyData);
    },
    fail: function (error) {
      // fail
      console.log(error)
    }
  })
}

function processCoursesData(courses, settedKey, categoryTitle) {
  var coursesRes = [];
  for (var idx in courses.data.list) {
    var course = courses.data.list[idx];
    var title = course.title;
    // if (title.length >= 18) {
    //   title = title.substring(0, 18) + "...";
    // }
    // [1,1,1,1,1] [1,1,1,0,0]
    var temp = {
      stars: [1, 1, 1, 1, 1],//util.convertToStarsArray(subject.rating.stars)
      title: title,
      coverageUrl: app.apiBase + course.course_img,
      courseId: course.post_id,
      startTime: course.update_time.split(' ')[0],
      price: course.price,
      average: course.rating, //course.rating.average暂无此字段
      summary: course.summary, //course.sumary 暂无此字段
      enrollNum: course.enroll_num // course.enroll_num 暂无此字段
    }
    coursesRes.push(temp)
  }
  var readyData = {};
  readyData[settedKey] = {
    categoryTitle: categoryTitle,
    allCourses: coursesRes
  }

  return readyData;

  // cb && cb(readyData);
  // this.setData({ isLoading: false });
  // this.setData(readyData);
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  randomStr: randomStr,
  getCourseListData: getCourseListData
}