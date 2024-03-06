const { getNextHoliday } = require('./holiday');
const { getWeather } = require('./weather');
const { getTodaySoul } = require('./today-soul');
const { sendTextToDingtalkRobot} = require('./robot')

async function run() {
  const nextHoliday = await getNextHoliday();
  const weather = await getWeather();
  const soulText = getTodaySoul();
  const msg = `
  ##### ${nextHoliday}
  ---
##### ${weather}
---
##### ${soulText}
---
  `;
  await sendTextToDingtalkRobot(msg)
}

run();