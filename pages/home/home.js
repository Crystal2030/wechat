//var postsData = require('../../data/posts-data.js') 
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesList: {},
    activeList: {}
  },
  onLoad:function(){
    
  },
  onReady: function(event){
    var coursesUrl = app.globalData.apiBase + '/api/jitCourse/list';
    var that = this;
    util.getCourseListData(coursesUrl, "coursesList", "课程列表", function (res) {
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