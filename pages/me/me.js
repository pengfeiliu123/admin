// pages/me/me.js
var Bmob = require('../../utils/bmob.js')

const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  checkAdmin: function () {
    console.log("check admin");
    var _this = this;

    var currentUser = Bmob.User.current();
    var objectId = currentUser.id;

    var Diary = Bmob.Object.extend("_User");
    var query = new Bmob.Query(Diary);
    query.get(objectId, {
      success: function (result) {
        // The object was retrieved successfully.
        console.log("是否为管理员" + result.get("isAdmin"));
        _this.setData({
          result: result
        })
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
  },

  goAdmin: function () {
    wx.navigateTo({
      url: '../admin/admin'
    })
  }
})