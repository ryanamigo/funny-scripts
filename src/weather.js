const axios = require('axios');
const { GAO_DE_WEATHER_API} = require('./constant')

const WEATHER_EMOJI_MAP = {
  "晴": '🌞',
  "少云": '🌤️',
  "晴间多云": '⛅️',
  "多云": '🌥️',
  "阴": '☁️',
  "有风": '🌬️',
  "平静": '',
  "微风": '🌬️',
  "和风": '🌬️',
  "清风": '🌬️',
  "强风/劲风": '🌬️',
  "疾风": '🌬️',
  "大风": '🌬️',
  "烈风": '🌬️',
  "风暴": '🌬️',
  "狂爆风": '🌬️',
  "飓风": '🌬️',
  "热带风暴": '🌬️',
  "霾": '🌫',
  "中度霾": '🌫🌫',
  "重度霾": '🌫🌫🌫',
  "严重霾": '🌫🌫🌫🌫',
  "阵雨": '🌦',
  "雷阵雨": '⛈️',
  "雷阵雨并伴有冰雹": '⚡️🌧🌨',
  "小雨": '🌧',
  "中雨": '🌧🌧',
  "大雨": '🌧🌧🌧',
  "暴雨": '🌧🌧🌧🌧',
  "大暴雨": '🌧🌧🌧🌧🌧',
  "特大暴雨": '🌧🌧🌧🌧🌧',
  "强阵雨": '🌦🌦',
  "强雷阵雨": '⛈️⛈️',
  "极端降雨": '🌧️',
  "毛毛雨/细雨": '🌧️',
  "雨": '🌧️',
  "小雨-中雨": '🌧️',
  "中雨-大雨": '🌧️🌧️',
  "大雨-暴雨": '🌧️🌧️🌧️',
  "暴雨-大暴雨": '🌧️🌧️🌧️🌧️',
  "大暴雨-特大暴雨": '🌧️🌧️🌧️🌧️🌧️',
  "雨雪天气": '🌧️🌨️',
  "雨夹雪": '🌧️🌨️',
  "阵雨夹雪": '🌧️🌨️',
  "冻雨": '❄️🌧️',
  "雪": '🌨️',
  "阵雪": '🌨️',
  "小雪": '🌨️',
  "中雪": '🌨️🌨️',
  "大雪": '🌨️🌨️🌨️',
  "暴雪": '🌨️🌨️🌨️🌨️',
  "小雪-中雪": '🌨️',
  "中雪-大雪": '🌨️🌨️',
  "大雪-暴雪": '🌨️🌨️🌨️',
  "浮尘": '🏜',
  "扬沙": '🏜🏜',
  "沙尘暴": '🏜🏜🏜',
  "强沙尘暴": '🏜🏜🏜',
  "龙卷风": '🌪️',
  "雾": '🌫',
  "浓雾": '🌫',
  "强浓雾": '🌫',
  "轻雾": '🌫',
  "大雾": '🌫',
  "特强浓雾": '🌫',
  "热": '🥵',
  "冷": '🥶',
  "未知": '',
}

async function getWeather() {
  const addr = GAO_DE_WEATHER_API;
  const res = await axios({
    url: addr,
    method: 'get',
    params: {
      key: 'b3bd9d8e49a9a192451cc6c23097c6bc',
      city: '610113',
      extensions: 'base',
    }
  })
  const weatherData = res.data;
  if (weatherData?.status == 1 && weatherData?.infocode == 10000) {
    const liveWeather = weatherData?.lives?.[0];
    if (liveWeather) {
      const { city, weather, temperature,} = liveWeather
      const weatherEmoji = WEATHER_EMOJI_MAP[weather] || ''
      return `${city}当前,${weather}${weatherEmoji}  🌡 ${temperature}℃。`
    }
  }
}

module.exports = {
  getWeather
}