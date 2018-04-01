// pages/home/home.js
var Bmob = require('../../utils/bmob.js')

const app = getApp()
var that

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: {},
    quickIcons: {},
    products: {},

// product list
    userInfo: {},
    hasUserInfo: false,
    verticalProducts: {},
    page: 1,
    pageSize: 5,
    noMoreData: false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    loadBanner()
    loadQuickIcon()
    loadProduct()
    loadVerticalProducts()
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
    // loadBanner()
    // loadQuickIcon()
    // loadProduct()
    // loadVerticalProducts()
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
  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    console.log("onReachBottom")
    console.log("滚动到底部");
    wx.showLoading({
      title: '加载中',
    })

    var page = this.data.page;
    var pageSize = this.data.pageSize;
    var resultOld = this.data.products;
    var _this = this;
    var product = Bmob.Object.extend("product");
    var query = new Bmob.Query(product);
    query.descending("createdAt");
    query.skip(pageSize * page);
    query.limit(pageSize);
    // 查询所有数据
    query.find({
      success: function (results) {
        wx.hideLoading();
        page++;
        console.log("加载更多 " + results.length + " 条记录");
        if (results.length == 0) {
          _this.setData({
            noMoreData: true
          })
        } else {
          _this.setData({
            page: page,
            verticalProducts: resultOld.concat(results)
          })
        }

      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

/**
 * 加载Banner图
 */
function loadBanner() {
  var Banner = Bmob.Object.extend("banner");
  var query = new Bmob.Query(Banner);
  // 查询所有数据
  query.find({
    success: function (results) {
      console.log("共查询Banner图" + results.length + " 条记录");
      // 循环处理查询到的数据
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        console.log(object.id + ' - ' + object.get('title'));
      }
      that.setData({
        banners: results
      })

    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}

/**
 * 加载快捷通道
 */
function loadQuickIcon() {
  var QuickIcon = Bmob.Object.extend("quickIcon");
  var query = new Bmob.Query(QuickIcon);
  // 查询所有数据
  query.find({
    success: function (results) {
      console.log("共查询快捷通道" + results.length + " 条记录");
      // 循环处理查询到的数据
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        console.log(object.id + ' - ' + object.get('title'));
      }
      that.setData({
        quickIcons: results
      })

    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}

/**
 * 加载横向滑动列表
 */
function loadProduct() {
  var Product = Bmob.Object.extend("product");
  var query = new Bmob.Query(Product);
  // 查询所有数据
  query.find({
    success: function (results) {
      console.log("共查询商品" + results.length + " 条记录");
      // 循环处理查询到的数据
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        console.log(object.id + ' - ' + object.get('title'));
      }
      that.setData({
        products: results
      })

    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}

/**
 * 加载垂直商品列表
 */
function loadVerticalProducts() {
  var pageSize = that.data.pageSize;

  var Product = Bmob.Object.extend("product");
  var query = new Bmob.Query(Product);
  query.descending("createdAt");
  query.limit(pageSize);
  // 查询所有数据
  query.find({
    success: function (results) {
      console.log("共查询到商品" + results.length + " 条记录");
      // 循环处理查询到的数据
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        console.log(object.id + ' - ' + object.get('productName'));
      }
      that.setData({
        verticalProducts: results
      })

    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}
