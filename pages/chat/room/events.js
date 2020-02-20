const voiceReciver = wx.getRecorderManager()
const voicePlayer = wx.createInnerAudioContext()
const fileManager = wx.getFileSystemManager()
const uploadVoice = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1500)
  })
}
export default {
  data: {
    voiceTime: 0,
    voice: null,
    showVoice: false,
    playVoiceTime: 0,
    
    /// 当前voice播放的id
    playVoiceId: 0,

    result: '',
    // 录音按钮大小
    rect: {},
    /// 是否取消录音
    isCancel: false
  },
  methods: {
    soundstart(e) {
      console.log('开始')
      let option = {
        sampleRate: 16000,
        numberOfChannels: 1,
        format: 'mp3', //录音的格式，有aac和mp3两种   
      }
      voiceReciver.start(option); //开始录音   这么写的话，之后录音得到的数据，就是你上面写得数据。
      wx.showToast({
        title: '正在录音',
        icon: 'loading',
        duration: 100000
      })
      /// 振动
      wx.vibrateShort({
        success() { },
        fail(e){ console.error(e)},
      })
      /// 开始录音
      voiceReciver.onStart(() => {
        console.log('录音开始事件') //这个方法是录音开始事件，你可以写录音开始的时候图片或者页面的变化
      })
    },
    soundmove(e) {
      // 离开录音
      if (e.changedTouches[0]['pageY'] < this.data.rect.top) {
        this.data.isCancel = true
        wx.showToast({
          title: '放手取消录音',
          duration: 1000000,
          icon: 'none'
        })
      } else {
        this.data.isCancel = false
        wx.hideToast()
        wx.showToast({
          title: '正在录音',
          icon: 'loading',
          duration: 100000
        })
      }
    },
    soundcancel(e) {
    },
    soundend(e) {
      let _this = this
      wx.hideToast()
      console.log('结束')
      voiceReciver.stop();
      if (this.data.isCancel) {
        this.data.isCancel = false
        return false
      }
      voiceReciver.onStop((res) => {
        // console.log(res) //这里是必须写完成事件的，因为最后的文件，就在这里面；
        let time = parseInt(res.duration / 1000);
        this.setData({
          voice: res,
          voiceTime: time,
          showVoice: true,
        })
        // 其中：
        // res.tempFilePath;//是临时的文件地址
        // res.duration;//录音的时长
        // res.fileSize;//文件的大小

        var soundSrc = res.tempFilePath
        var duration = res.duration
        var fileSize = res.fileSize

        uploadVoice(soundSrc).then(url => {
          _this.sendMsg({
            
          })
        })
      })
    },
    playVoice(e) {
      let _this = this
      let voice = e.currentTarget.dataset.url
      let playVoiceId = e.currentTarget.dataset.id
      /// 如果开始存在的话我会停止之前的
      if (this.data.playVoiceId) {
        voicePlayer.stop()
      }
      this.setData({
        playVoiceId
      })
      
      voicePlayer.src = voice
      voicePlayer.play()
      voicePlayer.onPlay(() => {
        console.log('开始播放')
        // let timer = setInterval(() => {
        //   if (_this.data.playVoiceTime == 1) {
        //     clearInterval(timer)
        //     _this.setData({
        //       playVoiceTime: 0
        //     })
        //     return false
        //   }
        //   _this.setData({
        //     playVoiceTime: _this.data.playVoiceTime != 0 ? (_this.data.playVoiceTime - 1) : _this.data.voiceTime
        //   })
        // })
      })
      /// 结束的话不播放
      voicePlayer.onEnded((res) => {
        this.setData({
          playVoiceId: 0
        })
      })
      voicePlayer.onStop((res) => {
        this.setData({
          playVoiceId: 0
        })
      })
      voicePlayer.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },
  }
}