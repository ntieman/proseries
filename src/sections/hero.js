const image = require('./image')
const skipArrow = require('./skip-arrow')

module.exports = async ({
  alt,
  src,
  srcFile,
  showSkipArrow = true,
  skipArrowText = 'Skip Image',
  skipTarget
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
        showSkipArrow
          ? await skipArrow({ target: skipTarget, text: skipArrowText })
          : ''
      }
    </section>
  `
}
