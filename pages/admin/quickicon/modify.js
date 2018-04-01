// pages/admin/quickicon/modify.js
var that;
var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: {},
    loading: true,
    urlArr: {},
    objectId: {},
    changeImage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.objectId)
    var objectId = options.objectId;
    var that = this;
    // if (!e.objectId) {
    //   common.showTip("请重新进入", "loading");
    //   return false;
    // }

    var Diary = Bmob.Object.extend("quickIcon");
    var query = new Bmob.Query(Diary);

    var url;
    query.get(objectId, {
      success: function (result) {
        that.setData({
          rows: result,
          urlArr: result.imageUrl,
          objectId: objectId
        })
        // The object was retrieved successfully.
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
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
  /**
     * 图片上传
     */
  upImg: function () {
    var that = this;

    // 注释这块是上传视频代码
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showNavigationBarLoading()
        that.setData({
          loading: false,
          src: res.tempFilePath
        })
        var urlArr = {};
        // var urlArr={};
        console.log("res= " + res)
        var tempFilePath = res.tempFilePaths;
        console.log("tempFilePath= " + tempFilePath)

        var newDate = new Date();
        var newDateStr = newDate.toLocaleDateString();

        var extension = /\.([^.]*)$/.exec(tempFilePath);
        if (extension) {
          extension = extension[1].toLowerCase();
        }
        var name = "test." + extension;//上传的图片的别名
        console.log(tempFilePath)
        var file = new Bmob.File(name, tempFilePath);
        console.log("name= " + name)
        file.save().then(function (res) {

          wx.hideNavigationBarLoading()
          var url = res.url();
          console.log("第1张Url  " + url);

          urlArr = url;

          // if (imgLength == j) {
          //   console.log(imgLength, urlArr);
          //如果担心网络延时问题，可以去掉这几行注释，就是全部上传完成后显示。
          showPic(urlArr, that)
          // }

        }, function (error) {
          console.log(error)
        });

        console.log(file);

        //如果你突然发现这个文件传了又想立即删了，可以直接执行
        // file.destroy();
      }
    })
  },

  /**
   * 图片删除
   */
  delImg: function () {
    var path;
    //删除第一张
    path = this.data.urlArr;
    var s = new Bmob.Files.del(path).then(function (res) {
      if (res.msg == "ok") {
        console.log('删除成功');
        common.showModal("删除成功");
      }
      console.log(res);
    }, function (error) {
      console.log(error)
    }
    );


  },

  /**
   * 修改QuickIcon
   */
  addQuickIcon: function (event) {
    that = this
    var title = event.detail.value.title;
    var imageUrl = this.data.urlArr;
    var objectId = this.data.objectId;
    // console.log("event", event)
    if (!title) {
      common.showTip("名称不能为空", "loading");
    }
    else {
      that.setData({
        loading: true
      })
      var currentUser = Bmob.User.current();

      var User = Bmob.Object.extend("_User");
      var UserModel = new User();

      var Diary = Bmob.Object.extend("quickIcon");
      var query = new Bmob.Query(Diary);

      //增加日记
      var Diary = Bmob.Object.extend("quickIcon");
      var query = new Bmob.Query(Diary);
      // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
      query.get(objectId, {
        success: function (result) {

          //回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
          result.set('title', title);
          result.set('imageUrl', imageUrl);
          if (currentUser) {
            UserModel.id = currentUser.id;
            result.set("publisher", UserModel);
          }
          result.save();
          that.setData({
            rows:result
          })
          common.showTip('快捷通道修改成功', 'success', function () {
            that.onShow();
          });
          //The object was retrieved successfully.
        },
        error: function (object, error) {
          console.log("error-> "+"value->"+error.value+" message->"+ error.message)
        }
      });
    }
  }
})

//上传完成后显示图片
function showPic(urlArr, t) {
  t.setData({
    loading: true,
    urlArr: urlArr,
    changeImage:true
  })
}