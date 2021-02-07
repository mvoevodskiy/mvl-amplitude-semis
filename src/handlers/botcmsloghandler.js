const { MVLoaderBase } = require('mvloader')
const { Logger } = require('botcms')

class BotCMSLogHandler extends MVLoaderBase {
  Amplitude

  constructor (App, ...config) {
    const localDefaults = {}
    super(localDefaults, ...config)
    this.App = App
  }

  async init () {
    return super.init()
  }

  async initFinish () {
    super.initFinish()
    this.Amplitude = this.App.ext.handlers.mvlAmplitude
  }

  /**
   *
   * @param {Object<import(Logger).normLogData>} data
   */
  handle (data) {
    return this.App.ext.handlers.mvlAmplitude.log({
      event_type: data.event,
      user_id: String(data.user.id),
      os_name: data.driver,
      os_version: data.bridge,
      user_properties: data.user,
      session_id: isNaN(data.sid) ? data.requestStartTime : data.sid,
      language: data.language,
      event_properties: this.MT.mergeRecursive(
        {
          fromMethod: data.fromMethod,
          method: data.method,
          methodResult: data.methodResult,
          outbound: data.outbound,
          path: data.path,
          chat: data.chat,
        },
        (data.additional || {})
      )
    })
  }
}

module.exports = BotCMSLogHandler
