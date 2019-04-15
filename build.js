const fs = require('fs')
const path = require('path')

const glob = require('glob')
const html = require('html')
const { mkdir } = require('mkdir-recursive')
const rimraf = require('rimraf')

const srcDir = path.join(__dirname, 'src/')
const distDir = path.join(__dirname, 'dist/')

console.log('distribution directory:', distDir)
console.log('source directory:', srcDir)

console.log('cleaning distribution directory:', distDir)
rimraf.sync(distDir)

const pagesSrcDir = srcDir + 'pages/'
const pagesDistDir = distDir
const pagesSrcGlob = pagesSrcDir + '**/*.js'

console.log('reading pages from:', pagesSrcDir)
console.log('page file query:', pagesSrcGlob)
console.log('destination directory:', pagesDistDir)

glob(pagesSrcGlob, (error, pages) => {
  console.log(pages.length + ' page(s) read')

  if (error) {
    console.error('could not read pages', error)
  } else {
    pages.forEach(async (srcFile) => {
      console.log('generating page from:', srcFile)

      const generator = require(srcFile)
      const text = await generator()

      const formattedText = html.prettyPrint(text, {
        indent_size: 2,
        indent_char: ' ',
        max_char: 80
      })

      const distFile = srcFile
        .replace(pagesSrcDir, pagesDistDir)
        .replace(/\.js$/, '.html')
      const distFileDir = path.dirname(distFile)

      console.log('ensuring existence of directory:', distFileDir)

      mkdir(distFileDir, (mkdirError) => {
        if (mkdirError && mkdirError.code !== 'EEXIST') {
          console.error('could not create directory:', distFileDir, mkdirError)
        } else {
          fs.writeFile(distFile, formattedText, (fileError) => {
            if (fileError) {
              console.error('could not save page:', distFileDir, fileError)
            } else {
              console.log('page saved:', distFile)
            }
          })
        }
      })
    })
  }
})
