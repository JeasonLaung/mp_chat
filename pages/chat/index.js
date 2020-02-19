// pages/chat/index.js
import {date} from '../../utils/index.js'
const userList = [
  {
    id: 21,
    name: '赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰赵小兰',
    avatar: 'http://image.biaobaiju.com/uploads/20180803/23/1533308847-sJINRfclxg.jpeg',
    last_content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
    create_time: 1581782400
  },
  {
    id: 22,
    name: '赵匡义',
    avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3029247577,3635495850&fm=26&gp=0.jpg',
    last_content: '你好',
    create_time: 1581782400
  },
  {
    id: 22,
    name: '赵子龙',
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582091407046&di=0af4011ee4e4de91b5bd90c26c190f4d&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F24209047.jpeg',
    last_content: '你好',
    create_time: 1581264000
  }
]
Page({
  data: {
    userList,
    todayTimeStamp: 0
  },

  onLoad(options) {
    let todayTimeStamp = Math.round(new Date(date(new Date(), 'yyyy-MM-dd%00:00:00')).getTime() / 1000)
    this.setData({
      todayTimeStamp
    })
  },


  /// 常用函数
  navigateTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url || e.currentTarget.dataset.path,
      fail(e) {
        console.error(e)
      }
    })
  },
  onShareAppMessage() {
    return {
      url: '/pages/chat/index',
      title: '聊天页大致功能'
    }
  }
})