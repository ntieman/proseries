const foot = require('../sections/foot')
const head = require('../sections/head')
const top = require('../sections/top')

module.exports = async () => {
  return `
    ${await head({ title: 'Pro Series' })}
    ${await top()}
    ${await foot()}
  `
}
