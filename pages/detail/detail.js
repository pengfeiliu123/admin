// pages/detail/detail.js
var Bmob = require('../../utils/bmob.js')

const app = getApp()
var that;
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId: "",
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
    that = this;
    that.setData({
      objectId:id
    })
    console.log("id--->" + id);
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
    loadProductDetail()
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

/**
 * 加载商品列表
 */
function loadProductDetail() {
  var Product = Bmob.Object.extend("product");
  var query = new Bmob.Query(Product);
  var objectId = that.data.objectId;
  console.log("objectId"+objectId)
  // 查询所有数据
  query.get(objectId, {
    success: function (result) {
      // 查询成功，调用get方法获取对应属性的值
      // var title = result.get("title");
      // var content = result.get("content");
      that.setData({
        product: result
      })
    },
    error: function (object, error) {
      // 查询失败
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}