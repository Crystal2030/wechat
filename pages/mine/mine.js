const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    fileTypeList: [
      { type: 'pdf', iconurl: '/images/icon/wx_app_pdf.png', title: 'pdf类型' },
      { type: 'word', iconurl: '/images/icon/wx_app_word.png', title: 'word类型' },
      { type: 'excel', iconurl: '/images/icon/wx_app_exl.png', title: 'excel类型' },
      { type: 'ppt', iconurl: '/images/icon/wx_app_ppt.png', title: 'ppt类型' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------mine------>', app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo })
    } else {
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo);
          this.setData({ userInfo: res.userInfo })
        }
      });
    }
  },

  downloadTap: function(event){
    wx.downloadFile({
      url: app.globalData.apiBase + '/download/ACMUG_2017nianhui/test.pdf',
      success: function(res) {
        console.log('---download--->', res);
        if(res.statusCode == 200) {
          var filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            success: function(res){
              console.log('打开文档成功');
            }
          })
        }
      }
    })
    // wx.navigateTo({
    //   url: './resources/resources',
    // })
  },

  toNoPay: function(event) {
    wx.navigateTo({
      url: './order/order?idx=1',
    });
  },

  toHasPay: function(event) {
    wx.navigateTo({
      url: './order/order?idx=2',
    });
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