Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toOrder: function(event) {
    wx.navigateTo({
      url: './order/order',
    })
  },
  toAddress: function (event) {
    wx.navigateTo({
      url: './address/address',
    })
  }

 
})