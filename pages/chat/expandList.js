import {date } from '../../utils/index.js'
const upload = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    },1500)
  })
}

export const otherList = [
  // {
  //   icon: 'write',
  //   title: '编辑',
  //   func(obj) {
  //     obj.toggleEmoji()
  //   }
  // },
  {
    icon: 'photo',
    title: '图片',
    func(obj) {
      let timestamp = Math.round(new Date(date(new Date(), 'yyyy-MM-dd')).getTime() / 1000)
      wx.chooseImage({
        count: 9,
        success({ tempFilePaths }) {
          for (let i in tempFilePaths) {
            // 直接添加到对话中,返回当前length
            let len = obj.data.chatList.push({
              create_time: timestamp,
              type: 'image',
              user_id: obj.data.userInfo['id'],
              content: tempFilePaths[i],
              uploaded: false
            })
            upload(tempFilePaths[i]).then((url) => {

              obj.data.chatList[len - 1]['uploaded'] = true
              obj.data.chatList[len - 1]['content'] = url
              obj.sendMsg(obj.data.chatList[len - 1], false)
            })
          }
          /// 刷新
          obj.setData({
            chatList: obj.data.chatList
          })
          ///到底部
          obj.toBottom()
        }
      })
    }
  },
  // {
  //   icon: 'file',
  //   title: '文件',
  //   func(obj) {
  //     wx.chooseMessageFile({
  //       count: 2,
  //       type: 'file',
  //       success({ tempFilePaths }) {
  //         for (var i in tempFilePaths) {
  //           tempFilePaths[i]
  //         }
  //       }
  //     })
  //   }
  // },
  {
    icon: 'locationfill',
    title: '位置',
    func(obj) {
      wx.chooseLocation({
        success: function(res) {
          const msg = {
            type: 'location',
            address: res.address,
            name: res.name,
            user_id: obj.data.userInfo['id'],
            latitude: res.latitude,
            longitude: res.longitude,
          }
          obj.sendMsg(msg)
        },
      })
    }
  }
]

