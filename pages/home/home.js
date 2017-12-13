//var postsData = require('../../data/posts-data.js') 
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesList: {},
    activeList: {},
    isLoading: true
  },
  onLoad:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  onReady: function(event) {
    var that = this;
    var coursesUrl = app.globalData.apiBase + '/api/jitCourse/list';
    util.getCourseListData(coursesUrl, "coursesList", "课程列表", 1, 5, function (res) {
      that.setData({ isLoading: false });
      that.setData(res);
    });
  },
  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "../content/content?id=" + postId
    })
  },
  onMoreTap: function(event){
    wx.switchTab({
      url: '../course/course',
    });
  },
  onCourseDetailTap: function(event) {
    var courseId = event.currentTarget.dataset.courseid;
    console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: "../course/course-detail/course-detail?id=" + courseId
    })
  }

}
)