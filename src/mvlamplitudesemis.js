const { MVLoaderBase } = require('mvloader')
const BotCMSLogHandler = require('./handlers/botcmsloghandler')

class mvlAmplitudeSemis extends MVLoaderBase {
  constructor (App, ...config) {
    const localDefaults = {
      toBotCMS: true,
      apiKey: '',
      // project: '',
      botcmsLogHandler: {}
    }
    super(localDefaults, ...config)
    this.App = App
    if (this.config.toBotCMS) this.appendBotCMSConfig()
  }

  async init () {
    return super.init()
  }

  async initFinish () {
    super.initFinish()
    this.App.ext.handlers.mvlAmplitude.started()
  }

  appendBotCMSConfig () {
    const handler = new BotCMSLogHandler(this.App, this.config.botcmsLogHandler)
    if (this.App.config.ext.configs.handlers.BotHandler) {
      this.App.config.ext.configs.handlers.BotHandler.botcms = this.App.config.ext.configs.handlers.BotHandler.botcms || {}
      this.App.config.ext.configs.handlers.BotHandler.botcms.Logger = this.App.config.ext.configs.handlers.BotHandler.botcms.Logger || {}
      this.App.config.ext.configs.handlers.BotHandler.botcms.Logger.handlers = this.App.config.ext.configs.handlers.BotHandler.botcms.Logger.handlers || []
      this.App.config.ext.configs.handlers.BotHandler.botcms.Logger.handlers.push(handler)
    }
  }
}

mvlAmplitudeSemis.exportConfig = {
  ext: {
    classes: {
      semis: {},
      controllers: {},
      handlers: {
        mvlAmplitude: require('./handlers/amplitudehandler')
      }
    },
    configs: {
      controllers: {},
      handlers: {
        DBHandler: {
          sequelize: {},
          models: {
            // MVLExampleModel: require('./models/mvlblankexample'),
          }
        }
      },
      semis: {}
    }
  },
  db: {}
}

module.exports = mvlAmplitudeSemis
