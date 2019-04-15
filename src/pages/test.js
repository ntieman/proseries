const head = require('../sections/head')
const foot = require('../sections/foot')

module.exports = async () => {
  return `
    ${await head({ title: 'Test' })}
    ${await foot()}
  `
}
