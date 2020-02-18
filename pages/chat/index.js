// pages/chat/index.js
import {date} from '../../utils/index'
import {otherList} from './expandList.js'
const data = [
  {
    id:1,
    create_time: 1581915722,
    user_id: 20,
    content: '你好呀'
  },
  {
    id:2,
    create_time: 1581915722,
    user_id: 21,
    content: '你好'
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
    content: '[e:12]'
  },
]
Page({
  data: {
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
    expandShow: 1,

    /// 更多列表
    otherList,


    /// 到达某个id
    scrollIntoView: ''
  },
  onLoad(options) {
    let systemInfo = wx.getSystemInfoSync()
    let statusBarHeight = systemInfo.statusBarHeight
    let todayTimeStamp = Math.round(new Date(date(new Date(), 'yyyy-MM-dd')).getTime() / 1000)
    this.setData({
      statusBarHeight,
      todayTimeStamp,
      scrollIntoView: `chat-id-${this.data.chatList.length - 1}`
    })
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
      create_time: Math.round(new Date(date(new Date(), 'yyyy-MM-dd')).getTime() / 1000),
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
      expandShow: false,
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

  /// 表情切换
  toggleEmoji() {
    /// 如果第二次点击表情,切换为键盘模式
    if(this.data.expandShow == 1) {
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
    
  },
  /// 文件切换
  toggleOther() {
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
  },
  bindblur(e) {
    this.setData({
      footerHeight: 50,
      expandShow: 0
    })
  },



  /// 常用函数

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