import { qqmapsdk } from "./map"
import store from "../store"
import {GlobalLocation} from "../core/global_location"


export const Auth  = {
  errModal: false,
  
  scopes: {
    location: {
      scope: 'scope.userLocation',
      title: '位置信息'
    },
  },

  chooseLocation() {
    let {
      success,
      fail,
      complete,
      latitude,
      longitude
    } = config
    let _this = this
    return new Promise((resolve, reject) => {
      wx.chooseLocation({
        latitude,
        longitude,
        complete,
        success(data) {
          if (success) {
            success(data)
          }
          resolve(data)
        },
        fail(e) {
          console.error(e)

          /// 没有开启GPS
          if (e.errMsg == "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
            wx.showModal({
              title: '请确保开启GPS',
              success({ confirm }) {
              }
            })
          }
          if (e.errMsg == "getLocation:fail auth deny") {
            /// 权限获取失败
            _this.auth(_this.scopes['location']).then(() => {
              _this.getLocation()
            }).catch(e => {
              if (fail) {
                fail(e)
              }
              reject(e)
            })
          }
          if (e.errMsg.toLowerCase().indexOf('timeout') > -1) {
            wx.showToast({
              title: '获取位置超时',
              icon: 'none'
            })
          }
        }
      })
    })
  },

  getLocation(config = {}) {
    let {
      success, 
      fail, 
      complete,
      type,
      isHighAccuracy,
      altitude,
      highAccuracyExpireTime,
      needAddress
    } = config
    let _this = this
    return new Promise((resolve,reject) => {
      wx.getLocation({
        isHighAccuracy,
        highAccuracyExpireTime: highAccuracyExpireTime || 5000,
        altitude,
        type: type || 'gcj02',
        complete,
        success(data) {
          if (success) {
            success(data)
          }
          resolve(data)
        },
        fail(e) {
          console.error(e)

          /// 没有开启GPS
          if (e.errMsg == "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
            wx.showModal({
              title: '请确保开启GPS',
              success({confirm}) {
              }
            })
          }
          if (e.errMsg == "getLocation:fail auth deny") {
            /// 权限获取失败
            _this.auth(_this.scopes['location']).then(() => {
              _this.getLocation()
            }).catch(e => {
              if (fail) {
                fail(e)
              }
              reject(e)
            })
          }
          if (e.errMsg.toLowerCase().indexOf('timeout') > -1) {
            wx.showToast({
              title: '获取位置超时',
              icon: 'none'
            })
          }
        }
      })
    })
  },




  /// 调起统一按钮
  auth (config) {
    let {scope, content, title, strict} = config

    let _this = this
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success({authSetting}) {
          console.log(authSetting)
          if (Array.isArray(scope)) {
          } else {
            if (false === authSetting[scope]) {
              if (_this.errModal == false) {
                _this.errModal = true
                wx.showModal({
                  title: '需要获取您的' + title + '权限',
                  content: content || '',
                  cancelText: '放弃授权',
                  confirmText: '前往授权',
                  cancelColor: 'red',
                  success (res) {
                    _this.errModal = false
                    if (res.confirm) {
                      wx.openSetting({
                        success ({authSetting}) {
                          if (authSetting[scope]) {
                            resolve(authSetting)
                          } else {
                            reject(authSetting)
                          }
                        },
                        fail (res) {
                          reject(res)
                        }
                      })
                    } else {
                      reject(res)
                    }
                  }
                })
              }
              
            } else {
              /// 初次要确定
              resolve()
            }
          }
        },
        fail(e) {
          console.error(e)
          reject(e)
        }
      })
      
    })
  }
}