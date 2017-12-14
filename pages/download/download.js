// pages/mine/resources/resources.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resources: {url: 'https://pan.baidu.com/s/1pLwZaND'}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let downloadUrl = app.globalData.apiBase + '/api/jitDownLoadCenter/downLoadCenterListQuery';
    let sessionKey = wx.getStorageSync('session_key');
    console.log(sessionKey)
    let pageIndex = 1;
    let pageSize = 20;
    let data = {
      "Session_Key": sessionKey, "page_index": pageIndex, "page_size": pageSize};
    util.http(downloadUrl, {data}, 'POST', function(resources) {
      console.log('resorces----->', resources);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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