// pages/chat/index.js
import {date} from '../../utils/index'
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
    id:3,
    create_time: 15819150022,
    user_id: 21,
    content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好'
  },
  {
    id:3,
    create_time: 15819150022,
    user_id: 21,
    content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好'
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

    // footerHeight: ''
  },
  onLoad(options) {
    let systemInfo = wx.getSystemInfoSync()
    let statusBarHeight = systemInfo.statusBarHeight
    let todayTimeStamp = Math.round(new Date(date(new Date(), 'yyyy-MM-dd')).getTime() / 1000)
    this.setData({
      statusBarHeight,
      todayTimeStamp
    })
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
    this.data.chatList.push({
      create_time: Math.round(new Date(date(new Date(), 'yyyy-MM-dd')).getTime() / 1000),
      user_id: this.data.userInfo['id'],
      content: this.data.text
    })
    this.setData({
      chatList: this.data.chatList,
      text: ''
    })
  }
})