// pages/mine/address/address.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    telephone: '',
    email: '',
    company: '',
    position: '',
    isLoading: false, //
    isDisabled: true
  },


  bindReceiver: function (e) {
    this.setData({
      username: e.detail.value
    });
    this.setBtn();
  },
  bindTel: function (e) {
    this.setData({
      telephone: e.detail.value
    });
  },
  bindEmail: function (e) {
    this.setData({
      email: e.detail.value
    });
    this.setBtn();
  },
  bindCompany: function (e) {
    this.setData({
      company: e.detail.value
    });
    this.setBtn();
  },
  bindPosition: function (e) {
    this.setData({
      position: e.detail.value
    });
    this.setBtn();
  },

  setBtn: function (event) {
    if (this.data.username && this.data.telephone && this.data.email) {
      this.setData({
        isDisabled: false
      });
    } else {
      this.setData({
        isDisabled: true
      });
    }
  },

  onSaveTap: function (e) {
    var that = this;
    var userInfo = { user_name: that.data.username, tel: that.data.telephone, email: that.data.email, company_name: that.data.company || '', job_name: that.data.position || ''};
    var sessionKey = wx.getStorageSync('session_key');
    var userInfoUrl = app.globalData.apiBase + '/api/jitUser/userInfoUpdate';
    that.setData({
      isDisabled: true,
      isLoading: true
    });
    wx.getUserInfo({
      success: res => {
        Object.assign(userInfo, { 'Session_Key': sessionKey }, res.userInfo);
        console.log(userInfo, '--------');
        util.http(userInfoUrl, userInfo , 'POST', function(res) {
          console.log('-------eeeee-----', res);
          if(res.code == 200) {
            wx.showToast({
              title: res.data,
            });
            that.setData({
              username: '',
              telephone: '',
              email: '',
              company: '',
              position: '',
              isDisabled: true,
              isLoading: false
            });
          } else {
            wx.showToast({
              title: res.msg,
            });
          }
          
        });
        
      }
    })
    
  }
})