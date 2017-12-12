var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    coursesList: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    isLoading: true,
    totalCount: 1,
  },

  onLoad: function (event) {

  },
  onReady: function (event) {
    var coursesUrl = app.globalData.apiBase + '/api/jitCourse/list';
    var that = this;
    var totalCount = that.data.totalCount;
    util.getCourseListData(coursesUrl, "coursesList", "课程列表", 1, 20, function (res) {
      that.data.totalCount += 2;
      that.setData({ isLoading: false });
      that.setData(res);
      // wx.hideNavigationBarLoading();
      // wx.stopPullDownRefresh();
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

  onScrollLower: function (event) {
    console.log(event);
    console.log('======>',this.data.totalCount)
    // util.getCourseListData(coursesUrl, "coursesList", "课程列表", this.data.totalCount, 2, function (res) {
    //   wx.hideNavigationBarLoading();
    //   wx.stopPullDownRefresh();
    // });
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh: function (event) {
    // util.getCourseListData(coursesUrl, "coursesList", "课程列表", 1, 2, function (res) {
    //   this.data.totalCount += 2;
    //   that.setData({ isLoading: false });
    //   that.setData(res);
    //   wx.hideNavigationBarLoading();
    //   wx.stopPullDownRefresh();
    // });
    wx.showNavigationBarLoading();
  }
})