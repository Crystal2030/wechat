import { Course } from 'class/Course.js';
var app = getApp();
Page({
  data: {
    course: {}
  },
  onLoad: function (options) {
    var courseId = options.id;
    var url = app.globalData.doubanBase +
      "/v2/movie/subject/" + courseId;
    var movie = new Course(url);
    // var movieData = movie.getMovieData();
    // var that = this;
    // movie.getMovieData(function (movie) {
    //   that.setData({
    //     movie: movie
    //   })
    // })
    //C#、Java、Python lambda
    movie.getCourseData((course) => {
      this.setData({
        course: course
      })
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