// pages/admin/quickicon/quickicon.js

var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
var app = getApp();
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    writeDiary: false,
    loading: true,
    windowHeight: 0,
    windowWidth: 0,
    limit: 10,
    quickIconList: [],
    modifyDiarys: false,
    urlArr: [],
    video: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log("onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
    /**
     * 获取系统的宽和高
     */
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    loadQuickIcons(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toAddDiary: function () {
    that.setData({
      writeDiary: true,
      video: ""
    })
    wx.navigateTo({
      url: 'add',
    })
  },

  /**
   * 删除QuickIcon
   */
  deleteQuickIcon: function (event) {
    var that = this;
    var objectId = event.target.dataset.id;
    wx.showModal({
      title: '操作提示',
      content: '确定要删除要日记？',
      success: function (res) {
        if (res.confirm) {
          //删除日记
          var Diary = Bmob.Object.extend("quickIcon");
          // var query = new Bmob.Query('diary');
          // query.find().then(function (todos) {
          //   return Bmob.Object.destroyAll(todos);
          // }).then(function (todos) {
          //   console.log(todos);
          //   // 更新成功
          // }, function (error) {
          //   // 异常处理
          // });

          //创建查询对象，入口参数是对象类的实例
          var query = new Bmob.Query(Diary);
          query.get(objectId, {
            success: function (object) {
              // The object was retrieved successfully.
              object.destroy({
                success: function (deleteObject) {
                  console.log('删除快捷通道成功');
                  loadQuickIcons(that)
                },
                error: function (object, error) {
                  console.log('删除快捷通道失败');
                }
              });
            },
            error: function (object, error) {
              console.log("query object fail");
            }
          });
        }
      }
    })
  },

  /**
   * 更新QuickIcon
   */
  toModifyQuickIcon: function (event) {
    var title = event.target.dataset.title;
    var imageUrl = event.target.dataset.content;
    var objectId = event.target.dataset.id;
    // that.setData({
    //   modifyDiarys: true,
    //   nowTitle: nowTile,
    //   nowContent: nowContent,
    //   nowId: nowId
    // })

    wx.navigateTo({
      url: 'modify?objectId=' + objectId + '&title=' + title + '&imageUrl=' + imageUrl,
    })
  },


    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
        loadQuickIcons(this);
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
        loadQuickIcons(this);
    },
    inputTyping: function (e) {
        //搜索数据
        loadQuickIcons(this, e.detail.value);
        this.setData({
            inputVal: e.detail.value
        });
    },
})

/*
* 加载QuickIcon列表
*/
function loadQuickIcons(t, k) {
  that = t;
  var Diary = Bmob.Object.extend("quickIcon");
  var query = new Bmob.Query(Diary);
  var query1 = new Bmob.Query(Diary);

  //会员模糊查询
  // if (k) {
  //     query.equalTo("title", {"$regex": "" + k + ".*"});
      // query1.equalTo("content", {"$regex": "" + k + ".*"});
  // }

  //普通会员匹配查询
  query.equalTo("title", k);

  query.descending('createdAt');
  // query.include("own")
  // 查询所有数据
  query.limit(that.data.limit);

  // var mainQuery = Bmob.Query.or(query, query1);
    query.find({
    success: function (results) {
      // 循环处理查询到的数据
      console.log(results);
      that.setData({
        quickIconList: results
      })
    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}