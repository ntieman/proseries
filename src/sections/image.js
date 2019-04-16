const path = require('path')

const fse = require('fs-extra')
const glob = require('glob')
const jimp = require('jimp')

const breakpoints = require('../config/breakpoints')

const imagesSrcDir = path.resolve(__dirname, '../images/')
const imagesDistDir = path.resolve(__dirname, '../../dist/images/')

const defaultWidths = breakpoints
  .filter((breakpoint) => breakpoint.max)
  .map((breakpoint) => breakpoint.max + 'w')

module.exports = async ({ srcFile, widths, ...attributes }) => {
  if (!attributes) {
    attributes = {}
  }

  if (srcFile) {
    if (!srcFile.includes(imagesSrcDir)) {
      srcFile = path.join(imagesSrcDir, srcFile)
    }

    const distFile = srcFile.replace(imagesSrcDir, imagesDistDir)
    const srcFileDir = path.dirname(srcFile)
    const distFileDir = srcFileDir.replace(imagesSrcDir, imagesDistDir)
    const srcFileExtname = path.extname(srcFile)
    const srcFileBasename = path.basename(srcFile, srcFileExtname)

    fse.ensureDir(distFileDir, (error) => {
      if (error) {
        console.error(error)
      } else {
        fse.copyFile(srcFile, distFile, (error) => {
          if (error) {
            console.log('could not copy image:', distFile, error)
          } else {
            console.log('copied image:', distFile)
          }
        })
      }
    })

    if (!widths) {
      const srcVariationFiles = glob.sync(
        srcFileDir + '/' + srcFileBasename + '@*' + srcFileExtname
      )

      if (srcVariationFiles && srcVariationFiles.length) {
        widths = srcVariationFiles.map(
          (srcVariationFile) =>
            srcVariationFile.match(/@(\d+[wx]?)\.[a-z]+$/)[1]
        )
      } else {
        widths = defaultWidths.slice(0)
      }
    }

    if (!attributes['src']) {
      attributes['src'] = srcFile.replace(imagesSrcDir, '/images')
    }

    const src = attributes['src']
    const wSizes = widths.indexOf((width) => width.match(w)) !== -1
    const sources = []

    if (wSizes) {
    } else {
      sources.push(src)

      widths.forEach((width) => {
        const srcWidthFile = path.join(
          imagesSrcDir + '/' + srcFileBasename + '@' + width + srcFileExtname
        )
        const widthSrc = srcWidthFile.replace(imagesSrcDir, '/images')

        sources.push(widthSrc + ' ' + width)

        if (fse.existsSync(srcWidthFile)) {
          const distWidthFile = srcWidthFile.replace(
            imagesSrcDir,
            imagesDistDir
          )
          const distWidthDir = path.dirname(distWidthFile)

          fse.ensureDir(distWidthDir, (error) => {
            if (error) {
              console.error(error)
            } else {
              fse.copyFile(srcWidthFile, distWidthFile, (error) => {
                if (error) {
                  console.error('could not copy image:', distWidthFile, error)
                } else {
                  console.log('copied image:', distWidthFile)
                }
              })
            }
          })
        } else {
          console.error('image does not exist:', srcWidthFile)
        }
      })
    }

    attributes['srcset'] = sources.join(', ')
  }

  const pairs = []

  for (let name in attributes) {
    const value = attributes[name]

    if (value) {
      pairs.push(name + '="' + value + '"')
    }
  }

  return `<img ${pairs.join(' ')} />`
}
