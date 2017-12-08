var util = require('../../utils/util.js');
var app = getApp();
Page({
  // RESTFul API JSON
  // SOAP XML
  //粒度 不是 力度
  data: {
    coursesList: {},
    // inTheaters: {},
    // comingSoon: {},
    // top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    isLoading: true
  },

  onLoad: function (event) {
    // var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=30";
    var coursesUrl = app.globalData.apiBase + '/api/jitCourse/list';
    // this.getCourseListData(inTheatersUrl, "inTheaters", "课程列表");
    this.getCourseListData(coursesUrl, "coursesList", "课程列表");
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  toCourseDetail: function (event) {
    var courseId = event.currentTarget.dataset.courseid;
    wx.navigateTo({
      url: "course-detail/course-detail?id=" + courseId
    })
  },

  getCourseListData: function (url, settedKey, categoryTitle) {
    var that = this;
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
        that.processCoursesData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },

  processCoursesData: function (courses, settedKey, categoryTitle) {
    var coursesRes = [];
    for (var idx in courses.data.list) {
      var course = courses.data.list[idx];
      var title = course.title;
      // if (title.length >= 18) {
      //   title = title.substring(0, 18) + "...";
      // }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: [1,1,1,1,0],//util.convertToStarsArray(subject.rating.stars)
        title: title,
        coverageUrl: app.apiBase + course.course_img,
        courseId: course.post_id,
        price: '250',
        average: '8.7', //course.rating.average暂无此字段
        summary: '我是课程简介，暂无此字段', //course.sumary 暂无此字段
        enrollNum: '3306' // course.enroll_num 暂无此字段
      }
      coursesRes.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      allCourses: coursesRes
    }
    this.setData({isLoading: false});
    this.setData(readyData);
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    }
    )
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
})