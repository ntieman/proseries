const fs = require('fs')
const path = require('path')

const copy = require('recursive-copy')
const jimp = require('jimp')
const { mkdir } = require('mkdir-recursive')

const breakpoints = require('../config/breakpoints')

const srcDir = path.resolve(__dirname, '../')
const distDir = path.resolve(srcDir, '../dist/')
const imagesSrcDir = path.join(srcDir, 'images/')
const imagesDistDir = path.join(distDir, 'images/')
const webSrcDir = '/images/'

module.exports = async ({ srcFile, widths, ...attributes }) => {
  if (!attributes) {
    attributes = {}
  }

  if (srcFile) {
    if (!srcFile.includes(imagesSrcDir)) {
      srcFile = path.join(imagesSrcDir, srcFile)
    }

    if (!widths) {
      widths = breakpoints
        .filter((breakpoint) => breakpoint.max)
        .map((breakpoint) => breakpoint.max + 'w')
    }
  }

  const src = srcFile
    ? srcFile.replace(imagesSrcDir, webSrcDir)
    : attributes['src']

  attributes['src'] = src

  if (widths) {
    const sources = [src]
    const srcDirname = path.dirname(srcFile)
    const srcExtname = path.extname(srcFile)
    const srcBasename = path.basename(srcFile, srcExtname)
    let sourceImage

    fs.copyFile(
      srcFile,
      srcFile.replace(imagesSrcDir, imagesDistDir),
      (error) => {
        if (error) {
          console.error(error)
        } else {
          console.log(
            'copied image:',
            srcFile,
            ' => ',
            srcFile.replace(imagesSrcDir, imagesDistDir)
          )
        }
      }
    )

    const getSourceImage = async function() {
      if (!sourceImage) {
        await jimp.read(srcFile).then((image) => {
          sourceImage = image
        })
      }

      return sourceImage
    }

    widths.forEach((width) => {
      const widthSrcFile = path.join(
        srcDirname,
        '/' + srcBasename + '@' + width + srcExtname
      )
      const widthSrc = widthSrcFile.replace(imagesSrcDir, webSrcDir)
      const widthDistFile = widthSrcFile.replace(imagesSrcDir, imagesDistDir)
      const widthDistDir = path.dirname(widthDistFile)
      console.log('checking for image:', widthSrcFile)

      if (fs.existsSync(widthSrcFile)) {
        console.log('copying image:', widthSrcFile, ' => ', widthDistFile)
        sources.push(widthSrc + ' ' + width)

        copy(widthSrcFile, widthDistFile, (error) => {
          if (error) {
            console.error('Could not copy image:', error)
          } else {
            'copied image:', widthSrcFile
          }
        })
      } else {
        if (width.includes('w')) {
          console.log('ensuring existence of directory:', widthDistDir)

          mkdir(widthDistDir, (mkdirError) => {
            if (mkdirError && mkdirError.code !== 'EEXIST') {
              console.error(
                'could not create directory:',
                widthDistDir,
                mkdirError
              )
            } else {
              console.log('Generating resized image:', widthDistFile)

              const size = parseInt(width.match(/\d+/))

              getSourceImage()
                .then((image) => {
                  if (image.bitmap.width > size) {
                    sources.push(widthSrc + ' ' + width)

                    return image
                      .clone()
                      .resize(size, jimp.AUTO)
                      .write(widthDistFile)
                      .then(() => {
                        console.log('resized image:', widthDistFile)
                      })
                  } else {
                    console.log('Skipping resize for:', widthDistFile)
                  }
                })
                .catch((error) => {
                  console.error(
                    'Could not generate image:',
                    widthDistFile,
                    error
                  )
                })
            }
          })
        }
      }
    })

    attributes['srcset'] = sources.join(', ')
  }

  const attributeAssignments = []

  for (let name in attributes) {
    const value = attributes[name]

    if (value) {
      attributeAssignments.push(name + '="' + value + '"')
    }
  }

  return `<img ${attributeAssignments.join(' ')} />`
}
