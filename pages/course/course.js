var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    coursesList: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    isLoading: true
  },

  onLoad: function (event) {
    
  },
  onReady: function(event) {
    var coursesUrl = app.globalData.apiBase + '/api/jitCourse/list';
    var that = this;
    util.getCourseListData(coursesUrl, "coursesList", "课程列表", function (res) {
      that.setData({ isLoading: false });
      that.setData(res);
    });
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