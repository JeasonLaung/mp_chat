// pages/chat/index.js
import {date} from '../../utils/index.js'
const userList = [
  {
    user_id: 21,
    user_name: '赵小兰',
    avatar: 'http://image.biaobaiju.com/uploads/20180803/23/1533308847-sJINRfclxg.jpeg',
    last_content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
    create_time: 1581782400
  },
  {
    user_id: 22,
    user_name: '赵匡义',
    avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3029247577,3635495850&fm=26&gp=0.jpg',
    last_content: '你好',
    create_time: 1581782400
  },
  {
    user_id: 22,
    user_name: '赵子龙',
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
  personActionSheet(e) {
    let {index} = e.currentTarget.dataset
    let userId = this.data.userList[index]['user_id']
    let userName = this.data.userList[index]['user_name']
    wx.showActionSheet({
      itemList: [
        '查看个人资料',
        '删除所有聊天',
      ],
      success({tapIndex}) {
        switch (tapIndex) {
          case 0:
            wx.navigateTo({
              url: '/pages/chat/person/index?id=' + userId,
            })
            break
          case 1:
            wx.showModal({
              title: '是否删除与' + userName + '的聊天记录',
              content: '删除聊天记录后将不再显示，此操作不可逆，其谨慎操作',
              confirmText: '确认删除',
              confirmColor: 'red',
              cancelText: '取消',
              success({confirm}) {
                if(confirm) {
                  /// 确认删除
                }
              }
            })
            break
        }
      }
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