const connect = require('../sections/connect')
const foot = require('../sections/foot')
const footer = require('../sections/footer')
const head = require('../sections/head')
const hero = require('../sections/hero')
const image = require('../sections/image')
const intro = require('../sections/intro')
const showcase = require('../sections/showcase')
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
    ${await showcase({
      header: 'Our Products',
      items: [
        `
        <a href="/products/prosqueegee" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Squeegee',
            class: 'showcase-list-item-image',
            srcFile: 'pro-squeegee.png'
          })}
        </a>
      `,
        `
        <a href="/products/proglove" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Glove',
            class: 'showcase-list-item-image',
            srcFile: 'pro-glove.png'
          })}
        </a>
      `,
        `
        <a href="/products/prosqueegee" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Squeegee',
            class: 'showcase-list-item-image',
            srcFile: 'pro-squeegee.png'
          })}
        </a>
      `,
        `
        <a href="/products/prosqueegee" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Squeegee',
            class: 'showcase-list-item-image',
            srcFile: 'pro-squeegee.png'
          })}
        </a>
      `,
        `
        <a href="/products/proglove" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Glove',
            class: 'showcase-list-item-image',
            srcFile: 'pro-glove.png'
          })}
        </a>
      `,
        `
        <a href="/products/prosqueegee" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Squeegee',
            class: 'showcase-list-item-image',
            srcFile: 'pro-squeegee.png'
          })}
        </a>
      `,
        `
        <a href="/products/prosqueegee" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Squeegee',
            class: 'showcase-list-item-image',
            srcFile: 'pro-squeegee.png'
          })}
        </a>
      `,
        `
        <a href="/products/proglove" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Glove',
            class: 'showcase-list-item-image',
            srcFile: 'pro-glove.png'
          })}
        </a>
      `,
        `
        <a href="/products/prosqueegee" class="showcase-list-item-link">
          ${await image({
            alt: 'Pro Squeegee',
            class: 'showcase-list-item-image',
            srcFile: 'pro-squeegee.png'
          })}
        </a>
      `
      ]
    })}
    ${await connect()}
    ${await footer()}
    ${await foot()}
  `
}
