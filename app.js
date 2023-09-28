import express from 'express'
import { WechatyBuilder, ScanStatus } from 'wechaty';
import qrTerm from 'qrcode-terminal'
import { FileBox } from 'file-box'

const app = express()
const port = 3000

// 获取机器人实例
function getBot(options) {
  const bot = WechatyBuilder.build(options)
  bot
    .on('logout', onLogout)
    .on('login', onLogin)
    .on('scan', onScan)
    .on('error', onError)
    .on('message', onMessage)
    .start()
  return bot
}

// 创建机器人
app.get('/createBot', (req, res) => {
  const options = {   
    name : 'my-bot',
  }

  const bot = getBot(options)
  // 存储bot实例以备后用，在实际运用中可能需要结合session或者其他存储方式
  req.session.bot = bot
 
  res.send(qrTerm.generate(bot.qrcode))
})

// 停止机器人
app.get('/stopBot', async (req, res) => {
  try {
    await req.session.bot.stop()
    res.send("Bot Stopped")
  } catch (error) {
    res.send(`Error: ${error.message}`);
  }  
})

// 省略了其他的bot的event处理函数

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
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
  if (bot.isLoggedIn) {
    bot.say('Wechaty error: ' + e.message).catch(console.error)
  }
}


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

  if (msg.type() !== bot.Message.Type.Text
    || !/^(ding|ping|bing|code)$/i.test(msg.text())
  ) {
    console.info('Message discarded because it does not match ding/ping/bing/code')
    return
  }



  /**
   * 2. reply image(qrcode image)
   */
  const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')

  await msg.say(fileBox)
  console.info('REPLY: %s', fileBox.toString())


}

