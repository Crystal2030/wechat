import { Course } from 'class/Course.js';
import util from '../../../utils/util.js';
var app = getApp();
Page({
  data: {
    course: {},
    teacher: {}
  },
  onLoad: function (options) {
    var courseId = options.id;
    var url = app.globalData.apiBase +
      "/api/jitCourse/info";
    var teacherUrl = app.globalData.apiBase + "/api/jitTeacher/info";
    var course = new Course(url);
    var that = this;
    course.getCourseData(courseId, (course) => {
      util.http(teacherUrl, { "teacher_id": course.teacherId}, 'POST', function(res) {
        console.log(res.data);
        that.setData({
          teacher: res.data
        });
      });
      this.setData({
        course: course
      })
    })
  },

  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  onBuyTap: function(event) {
    var courseId = event.currentTarget.dataset.courseid;
    console.log(courseId);
  },

  onColletionTap: function(event){
    this.getPostsCollectedAsy();
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },

  /*查看图片*/
  viewCoursePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
})