const { MVLoaderBase } = require('mvloader')
const Amplitude = require('@amplitude/node')
const ISO6391 = require('iso-639-1')

class Amplitudehandler extends MVLoaderBase {
  constructor (App, ...config) {
    const localDefaults = {}
    super(localDefaults, ...config)
    this.App = App

    this.SYSTEM = 'SYSTEM'

    this.Amplitude = Amplitude.init(this.App.config.ext.configs.semis.mvlAmplitude.apiKey, {
      // debug: true,
      // logLevel: 3
    });
    // console.log('AMPLITUDE OPTIONS:', this.Amplitude.getOptions())
  }

  log (params) {
    // console.log('AMPLITUDE LOG. PARAMS', params)
    if (typeof params.language === 'string' && params.language.length === 2) params.language = ISO6391.getName(params.language.toLowerCase())
    this.Amplitude.logEvent(params)
      .then(async (logged) => {
        // console.log('AMPLITUDE. PARAMS:', params, 'LOGGED:')
        // console.dir(logged, {depth: 5})
      })
  }

  started () {
    this.Amplitude.logEvent({
      event_type: 'botStarted',
      user_id: this.SYSTEM,
      event_properties: {}
    })
      // .then(async (logged) => console.log('AMPLITUDE LOGGED (STARTED):', logged))
    this.Amplitude.flush();
  }

  async init () {
    return super.init()
  }

  async initFinish () {
    super.initFinish()
  }
}

module.exports = Amplitudehandler
