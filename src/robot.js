const axios = require('axios');
const { DINGTALK_ROBOT_API } = require('./constant')
async function sendTextToDingtalkRobot(text) {
  axios({
    method: 'post',
    url: DINGTALK_ROBOT_API,
    data: {
      msgtype: 'markdown',
      "markdown": {
        "title":"来自章鱼哥的程序",
        text: text + "###### -来自章鱼哥的程序 \n",
      },
    },
    headers: {
      'Content-Type': 'application/json', 
      'Accept': '*/*', 
      'Host': 'oapi.dingtalk.com', 
      'Connection': 'keep-alive'
   },
  })
}

module.exports = {
  sendTextToDingtalkRobot
}