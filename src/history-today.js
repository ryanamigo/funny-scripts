const axios = require('axios');
const { HISTORY_TODAY_API} = require('./constant')
/**
 * 
 * @param {*} str yyyy年mm月dd日
 */
function getYearFromString(str) {
  const year = str.match(/\d{4}/);
  return year[0];
}

async function getHistoryToday() {
  const { data } = await axios({
    url: HISTORY_TODAY_API,
    method: 'get',
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    }
  });
  const histories = data?.data;
  if (!histories) {
    return ''
  }
  const latestHistory = histories[0];
  if (!latestHistory) {
    return ''
  }
  const year = getYearFromString(latestHistory.data);
  const message = latestHistory?.message;
  return `${year}年的今天，${message}。`

}

module.exports = {
  getHistoryToday
}