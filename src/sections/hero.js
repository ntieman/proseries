const image = require('./image')
const skipArrow = require('./skip-arrow')

module.exports = async ({
  alt,
  src,
  srcFile,
  skipTarget,
  skipArrowText = 'Skip Image'
}) => {
  return `
    <section class="hero">
      ${await image({
        alt,
        class: 'hero-image',
        src,
        srcFile
      })}
      ${
        skipTarget
          ? await skipArrow({ target: skipTarget, text: skipArrowText })
          : ''
      }
    </section>
  `
}
