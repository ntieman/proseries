const foot = require('../sections/foot')
const head = require('../sections/head')
const hero = require('../sections/hero')
const top = require('../sections/top')

module.exports = async () => {
  return `
    ${await head({ title: 'Pro Series' })}
    ${await top()}
    ${await hero({
      alt:
        'White-gloved hand holding red embossed Pro Series card over white background.',
      skipTarget: 'intro',
      srcFile: 'pro-series-card-glove.png'
    })}
    <div style="height: 1000px;"></div>
    ${await foot()}
  `
}
