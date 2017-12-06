var postsData = require('../../data/posts-data.js') 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: {},
    activeList: {}
  },
  onLoad:function(){
    this.setData(
      {
        courseList:{lists:postsData.courseList, category: '近期课程'},
        activeList:{lists:postsData.activeList, category: '近期活动'}
      }
    );
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    //console.log("onPostTap:"+postId)  将postId传入定向到指定文章详情页
    wx.navigateTo({
      url: '../content/content?id=' + postId
    })
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
  onCourseTap: function(event) {
    var courseId = event.currentTarget.dataset.courseid;
    console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: "course-detail/course-detail?id=" + courseId
    })
  }

}
)