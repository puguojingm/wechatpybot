import {
  WechatyBuilder,
  ScanStatus,

}     from 'wechaty';

import qrTerm from 'qrcode-terminal'
import { FileBox } from 'file-box'
const options = {
  name : 'my-bot',
  // puppet: 'wechaty-puppet-service'

}

const bot = WechatyBuilder.build(options)


bot
  .on('logout', onLogout)
  .on('login',  onLogin)
  .on('scan',   onScan)
  .on('error',  onError)
  .on('message', onMessage)
  .start()
  .catch(async e => {
    console.error('Bot start() fail:', e)
    await bot.stop()
    process.exit(-1)
  })



  function onScan (qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      qrTerm.generate(qrcode)
  
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
  
      console.info('onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
      console.info('onScan: %s(%s)', ScanStatus[status], status)
    }
  
   
  }
  
  function onLogin (user) {
    console.info(`${user.name()} login`)
  }
  
  function onLogout (user) {
    console.info(`${user.name()} logged out`)
  }
  
  function onError (e) {
    console.error('Bot error:', e)
    /*
    if (bot.isLoggedIn) {
      bot.say('Wechaty error: ' + e.message).catch(console.error)
    }
    */
  }
  
  /**
   *
   * 6. The most important handler is for:
   *    dealing with Messages.
   *
   */
  async function onMessage (msg) {
    console.info(msg.toString())
  
    if (msg.self()) {
      console.info('Self Message ')
      return
    }
  
    if (msg.age() > 2 * 60) {
      console.info('Message discarded because its TOO OLD(than 2 minutes)')
      return
    }
  

    // /**
    //  * 2. reply image(qrcode image)
    //  */
    // const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
  
    // await msg.say(fileBox)
    // console.info('REPLY: %s', fileBox.toString())
  
    // /**
    //  * 3. reply 'scan now!'
    //  */
    // await msg.say([
    //   'Join Wechaty Developers Community\n\n',
    //   'Scan now, because other Wechaty developers want to talk with you too!\n\n',
    //   '(secret code: wechaty)',
    // ].join(''))
  }
  
