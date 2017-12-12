//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    // 登录
    var that = this;
    wx.login({
      success: function (res) {

        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://123.206.68.105:4406/api/login',
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: { "js_code": res.code },
            success: res => {
              wx.setStorageSync('session_key', res.data.data.session_key)
              // wx.setStorage({
              //   key: 'session_key',
              //   data: res.data.data.session_key,
              // })
              
              //this.globalData.session_key = res.data.data.data.session_key
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    }),
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      }),


      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
        },
        fail: function () {
          //登录态过期
          wx.login() //重新登录
        }
      })
  },
  globalData: {
    userInfo: {},
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://api.douban.com",
    apiBase: "http://123.206.68.105:4406",
    session_key: '',
  }
})