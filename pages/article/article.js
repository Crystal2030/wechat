var postsData = require('../../data/posts-data.js') 

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(){
    this.setData(
      {
        postList:postsData.postList
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
  }


}
)