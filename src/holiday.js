const axios = require('axios');
const dayjs = require('dayjs');
const { HOLIDAY_INFO_API, NEXT_HOLIDAY_API} = require('./constant')

async function getNextHoliday() {
  const res = await axios({
    url: NEXT_HOLIDAY_API,
    method: 'get',
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    }
  })
  return res.data?.tts || undefined
}

async function isTodayHoliday() {
  const today = new dayjs().format('YYYY-MM-DD')
  const res = await axios({
    url: `${HOLIDAY_INFO_API}/${today}`,
    method: 'get',
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    }
  })
  const t = res.data.type.type; // enum(0, 1, 2, 3) 节假日类型，分别表示 工作日、周末、节日、调休。
  if (t == 0 || t == 3) {
    return false
  }
  return true
}

module.exports = {
  isTodayHoliday,
  getNextHoliday
}
