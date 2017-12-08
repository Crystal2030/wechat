// pages/mine/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiver: '',
    telephone: '',
    email: '',
    company: '',
    position: '',
    isLoading: false, //
    isDisabled: true
  },


  bindReceiver: function (e) {
    this.setData({
      receiver: e.detail.value
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
    if (this.data.receiver && this.data.telephone && this.data.email) {
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
    that.setData({
      isDisabled: true,
      isLoading: true
    });
  }
})