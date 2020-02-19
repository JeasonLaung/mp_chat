// pages/chat/index.js
import {date} from '../../../utils/index'
import {otherList} from './expandList.js'
import events from './events.js'
const data = [
  {
    id:1,
    create_time: 1581915722,
    user_id: 20,
    content: '你好呀[e: 12]'
  },
  {
    id:2,
    create_time: 1581915722,
    user_id: 21,
    content: '你好'
  },
  {
    id: 2,
    create_time: 1581915722,
    user_id: 21,
    type: 'image',
    content: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1582044961&di=114556faf956ff2a8c1e298840038d8f&src=http://b-ssl.duitang.com/uploads/item/201612/11/20161211183919_kQizH.thumb.700_0.png'
  },
  {
    id: 3,
    create_time: 1581915722,
    user_id: 20,
    type: 'location',
    address: '巨盛花园',
    latitude: '22.0002',
    longitude: '113.0000'
  },
  {
    id: 4,
    create_time: 1581915722,
    user_id: 20,
    type: 'voice',
    content: 'http://jeason2020.xyz/static/mp3/1.mp3'
  },
]
Page({
  ...events.methods,
  data: {
    ...events.data,
    statusBarHeight: 22,
    userInfo: {
      id: 20
    },
    chatList: data,
    todayTimeStamp: 0,

    text: '',

    footerHeight: 50,
    /// 表情和加号的拓展高度
    expandHeight: 220,
    /// 输入框是否焦点
    focus: false,
    /// 表情管理1和文件弹出2
    expandShow: 0,
    /// 是否语音输入
    soundShow: 1,

    /// 更多列表
    otherList,


    /// 到达某个id
    scrollIntoView: ''
  },
  onLoad(options) {
    let systemInfo = wx.getSystemInfoSync()
    let statusBarHeight = systemInfo.statusBarHeight
    let todayTimeStamp = Math.round(new Date(date(new Date(), 'yyyy-MM-dd%00:00:00')).getTime() / 1000)
    this.setData({
      statusBarHeight,
      todayTimeStamp,
      scrollIntoView: `chat-id-${this.data.chatList.length - 1}`
    })
    /**
     * 开始的时候获取录音按钮位置，以便判断是否超出按钮，超出按钮则取消
     */
    var query = wx.createSelectorQuery()
    //选择id
    var that = this;
    query.select('#speech').boundingClientRect(function (rect) {
      // console.log(rect.width)
      that.setData({
        rect: rect
      })
    }).exec()
  },
  otherBindTap(e) {
    // console.log(e)
    let {index} = e.currentTarget.dataset
    if (otherList[index] && otherList[index]['func']) {
      otherList[index]['func'](this)
    }
  },
  bindinput(e) {
    this.setData({
      text: e.detail.value
    })
  },
  bindlinechange(e) {
    // console.log(e.detail.lineCount * 30 + 20 * 2 + 20 * 2)
    // this.setData({
    //   footerHeight: (e.detail.lineCount * 30 + 20 * 2 + 20 * 2) + 'rpx'
    // })
    // console.log(e)
  },

  bindsend() {
    const msg = {
      create_time: Math.round(Date.now() / 1000),
      user_id: this.data.userInfo['id'],
      content: this.data.text
    }
    
    this.sendMsg(msg)
    this.setData({
      text: '',
    })
    
  },

  ///发送消息
  sendMsg(msg, add = true) {
    /// 是否新增一个
    if(add) {
      this.data.chatList.push(msg)
    }
    this.setData({
      chatList: this.data.chatList
    })
    this.toBottom()

    
    // websocket发送
    // JSON.stringify(obj)
    
  },

  toBottom() {
    this.setData({
      scrollIntoView: `chat-id-${this.data.chatList.length - 1}`
    })
  },

  bindkeyboardheightchange(e) {
    let { duration, height} = e.detail
    console.log(e)
    this.setData({
      expandShow: 0,
      footerHeight: height + 50
    })
    this.toBottom()
  },

  /// 点击表情
  addEmoji(e) {
    let index = e.currentTarget.dataset.index
    let text = this.data.text
    
    this.setData({
      text: text + `[e:${index}]`
    })
  },
  /// 切换为语音聊天
  toggleSound() {
    /// 切换为键盘
    if (this.data.soundShow) {
      this.setData({
        focus: true
      })
    } else {
      this.setData({
        expandShow: 0
      })
    }
    this.setData({
      soundShow: !this.data.soundShow
    })
  },
  /// 表情切换
  toggleEmoji() {
    /// 点击表情或加号都直接切换到键盘
    this.setData({
      soundShow: false
    })
    setTimeout(() => {
      /// 如果第二次点击表情,切换为键盘模式
      if (this.data.expandShow == 1) {
        this.setData({
          expandShow: 0,
          focus: true
        })
      } else {
        this.setData({
          expandShow: 1,
          focus: false
        })
      }
      this.toBottom()
    }, 100)
  },
  /// 文件切换
  toggleOther() {
    /// 点击表情或加号都直接切换到键盘
    this.setData({
      soundShow: false
    })
    setTimeout(() => {
      if (this.data.expandShow == 2) {
        this.setData({
          expandShow: 0,
          focus: true
        })
      } else {
        this.setData({
          expandShow: 2,
          focus: false
        })
      }
      this.toBottom()
    }, 100)
  },
  bindblur(e) {
    this.setData({
      footerHeight: 50,
      expandShow: 0
    })
  },
  



  /// 常用函数
  navigateBack() {
    wx.navigateBack({
      delta: 1,
    })
  },


  /// 展示位置
  openLocation(e) {
    console.log(e)
    let {latitude, longitude, name, address} = e.currentTarget.dataset
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      scale: 16,
      name,
      address,
      success: function(res) {},
      fail: function(res) {
        console.error(res)
      },
      complete: function(res) {},
    })
  },
  /// 展示图片
  previewImage(e) {
    let imgUrls = []
    this.data.chatList.forEach((item) => {
     if(item.type == 'image') {
       imgUrls.push(item.content)
     }
    })
    wx.previewImage({
      current: e.currentTarget.dataset.current,
      urls: imgUrls,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})