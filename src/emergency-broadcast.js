const axios = require('axios');
const dayjs = require('dayjs');
const fs = require('fs/promises');
const path = require('path');
const { sendTextToDingtalkRobot} = require('./robot')

async function getSendedTodayDocIds() {
  let todaySendedDocId = []
  // 读取文件 是所有发送过的docId
  const sendedDocIdsJson = await fs.readFile(path.resolve(__dirname, './emergency-data.json'));
  if (sendedDocIdsJson) {
    const sendedDocIds = JSON.parse(sendedDocIdsJson)
    const today = dayjs().format('YYYY-MM-DD')
    if (sendedDocIds[today]) {
      todaySendedDocId = sendedDocIds[today]
    }
  }
  return todaySendedDocId;
}

async function saveSendedDocIds(docIds) {
  const today = dayjs().format('YYYY-MM-DD')
  const sendedDocIds = await getSendedTodayDocIds();
  const newSendedDocIds = [...sendedDocIds, ...docIds]
  const sendedDocIdsJson = await fs.readFile(path.resolve(__dirname, './emergency-data.json'));
  const sendedDocIdsObj = JSON.parse(sendedDocIdsJson);
  sendedDocIdsObj[today] = newSendedDocIds;
  await fs.writeFile(path.resolve(__dirname, './emergency-data.json'), JSON.stringify(sendedDocIdsObj));
}

async function getEmergencyBroadcast(starttime, endtime) {
  const { data } = await axios({
    url: 'https://gdapi.cnr.cn/yjwnews',
    method: 'post',
    headers: {
      "DNT": "1", 
      "Pragma": "no-cache", 
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      "from": "",
      "keyword": "",
      "province": "陕西省",
      "city": "西安市",
      "level": "",
      starttime,
      endtime,
      "page": 1,
      "size": "15"
   }),
  });

  const emergencyBroadcasts = data?.datas;
  if (!emergencyBroadcasts || emergencyBroadcasts.length === 0) {
    return ''
  }
  const todaySendedDocIds = await getSendedTodayDocIds();
  const waitingSaveDocIds = [];
  let sendText = ''
  emergencyBroadcasts.forEach((item) => {
    if (!todaySendedDocIds.includes(item.docid)) {
      waitingSaveDocIds.push(item.docid);
      sendText += `### ${item.doctitle}\n\n #### ${item.docabstract}\n\n ##### [点击查看详情](${item.docpuburl})\n\n  ###### ${item.chnlname} ${item.docpubtime} \n\n --- \n\n`
    }
  })
  if (waitingSaveDocIds.length > 0) {
    saveSendedDocIds(waitingSaveDocIds);
  }

  if (sendText) {
    await sendTextToDingtalkRobot(sendText)
  }

}

module.exports = {
  getEmergencyBroadcast
}

getEmergencyBroadcast('2023-02-24 00:00:00', '2023-02-25 23:59:59')
