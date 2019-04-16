const foot = require('../sections/foot')
const head = require('../sections/head')
const hero = require('../sections/hero')
const intro = require('../sections/intro')
const top = require('../sections/top')

const loremIpsum =
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru'

module.exports = async () => {
  return `
    ${await head({ title: 'Pro Series' })}
    ${await top()}
    ${await hero({
      alt:
        'White-gloved hand holding red embossed Pro Series card over white background.',
      skipArrowTarget: 'intro',
      srcFile: 'pro-series-card-glove.png'
    })}
    ${await intro({
      items: [
        {
          header: 'Innovative',
          text: loremIpsum
        },
        {
          header: 'Tried &amp; True',
          text: loremIpsum
        },
        {
          header: 'For The Pros',
          text: loremIpsum
        }
      ]
    })}
    ${await foot()}
  `
}
