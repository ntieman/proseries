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
  return new Promise((resolve, reject) => {
    if (!attributes) {
      attributes = {}
    }

    if (srcFile) {
      if (!srcFile.includes(imagesSrcDir)) {
        srcFile = path.join(imagesSrcDir, srcFile)
      }

      if (!fse.existsSync(srcFile)) {
        return reject('Image not found: ' + srcFile)
      }

      const srcFileDir = path.dirname(srcFile)
      const srcFileExtname = path.extname(srcFile)
      const srcFileBasename = path.basename(srcFile, srcFileExtname)

      const distFile = srcFile.replace(imagesSrcDir, imagesDistDir)
      const distFileDir = path.dirname(distFile)

      const src = srcFile.replace(imagesSrcDir, 'images')

      attributes['src'] = src

      fse.ensureDir(distFileDir, (error) => {
        if (error) {
          console.error('Image distribution directory not found')
        } else {
          fse.copyFile(srcFile, distFile)
        }
      })

      if (!widths) {
        const variants = glob.sync(
          path.join(srcFileDir, srcFileBasename + '@*' + srcFileExtname)
        )

        if (variants && variants.length) {
          widths = variants.map(
            (variant) => variant.match(/(\d+[wx])\.[a-z]+$/i)[1]
          )
        } else {
          widths = defaultWidths.slice(0)
        }
      }

      const wSizes = widths.findIndex((width) => width.includes('w')) !== -1
      const sources = []

      if (wSizes) {
        return jimp.read(srcFile).then((srcImage) => {
          const srcImageWidth = srcImage.bitmap.width

          widths = widths.filter(
            (width) => parseInt(width.match(/\d+/)[0]) < srcImageWidth
          )

          widths.forEach((width) => {
            const size = parseInt(width.match(/\d+/)[0])
            const widthSrcFile = path.join(
              srcFileDir,
              srcFileBasename + '@' + width + srcFileExtname
            )
            const widthDistFile = widthSrcFile.replace(
              imagesSrcDir,
              imagesDistDir
            )
            const widthSrc = widthSrcFile.replace(imagesSrcDir, 'images')

            sources.push(widthSrc + ' ' + width)

            fse.exists(widthSrcFile).then((exists) => {
              if (exists) {
                fse.copyFile(widthSrcFile, widthDistFile, (error) => {
                  if (error) {
                    console.error('Could not copy image:', widthDistFile, error)
                  } else {
                    console.log('Copied image:', widthDistFile)
                  }
                })
              } else {
                srcImage
                  .clone()
                  .resize(size, jimp.AUTO)
                  .write(widthDistFile, (error) => {
                    if (error) {
                      console.error(
                        'Could not resize image:',
                        widthDistFile,
                        error
                      )
                    } else {
                      console.log('Resized image:', widthDistFile)
                    }
                  })
              }
            })
          })

          sources.sort((a, b) => {
            const aSize = parseInt(a.match(/\d+/)[0])
            const bSize = parseInt(b.match(/\d+/)[0])

            return aSize - bSize
          })

          sources.push(src + ' ' + srcImageWidth + 'w')
          attributes['srcset'] = sources.join(', ')
          resolve(attributes)
        })
      } else {
        fse.ensureDirSync(distFileDir)

        widths.forEach((width) => {
          const widthSrcFile = path.join(
            srcFileDir,
            srcFileBasename + '@' + width + srcFileExtname
          )
          const widthDistFile = widthSrcFile.replace(
            imagesSrcDir,
            imagesDistDir
          )
          const widthSrc = widthSrcFile.replace(imagesSrcDir, 'images')

          sources.push(widthSrc + ' ' + width)

          fse.copyFile(widthSrcFile, widthDistFile, (error) => {
            if (error) {
              console.error('Could not copy image:', widthDistFile, error)
            } else {
              console.log('Copied image:', widthDistFile)
            }
          })

          sources.push(src)
          sources.sort()
          attributes['srcset'] = sources.join(', ')
          resolve(attributes)
        })
      }
    } else {
      return resolve(attributes)
    }
  }).then((attributes) => {
    const pairs = []

    for (let name in attributes) {
      const value = attributes[name]

      if (value) {
        pairs.push(name + '="' + value + '"')
      }
    }

    return `<img ${pairs.join(' ')} />`
  })
}
