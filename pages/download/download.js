// pages/mine/resources/resources.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resources: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const downloadUrl = app.globalData.apiBase + '/api/jitDownLoadCenter/downLoadCenterListQuery';
    let Session_Key = wx.getStorageSync('session_key');
    let page_index = 1;
    let page_size = 20;
    let data = { Session_Key, page_index, page_size};
    util.http(downloadUrl, data, 'POST', function(resources) {
      if(resources.code == 200){
        that.setData({ resources: resources.data.list });
        console.log(that.data.resources);
      }
    })
  },

  goDownloadDetail: function(event) {
    let categoryId = event.currentTarget.dataset.categoryid;
    wx.navigateTo({
      url: 'download-detail/download-detail?id=' + categoryId
    });
    
  }
})