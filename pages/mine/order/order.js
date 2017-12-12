// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["全部订单", "未支付", "已支付"],
    currentTab: 0,
    hidden: false,
    newList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab: options.idx
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      hidden: true
    })
  },

  switchTab: function(event){
    var idx = event.currentTarget.dataset.idx;
    this.setData({
      currentTab: idx
    })
    console.log(event);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})