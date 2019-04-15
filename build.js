const fse = require('fs-extra')
const path = require('path')

const glob = require('glob')
const html = require('html')

const srcDir = path.join(__dirname, 'src/')
const distDir = path.join(__dirname, 'dist/')

const pagesSrcDir = path.join(srcDir, 'pages/')
const pagesDistDir = distDir

fse.remove(distDir, (error) => {
  if(error) {
    console.error('could not clear dist directory:', error)
  } else {
    console.log('dist directory cleared')

    glob(pagesSrcDir + '**/*.js', (error, pages) => {
      if(error) {
        console.error(error)
      } else {
        console.log(pages.length + ' page(s) read')
    
        pages.forEach(async pageSrc => {
          const generator = require(pageSrc)
          const text = await generator()
          const formattedText = html.prettyPrint(text, { indent_size: 2 })
          const pageDist = pageSrc.replace(pagesSrcDir, pagesDistDir).replace(/\.js$/, '.html')
          const pageDistDir = path.dirname(pageDist)
    
          fse.ensureDir(pageDistDir, (error) => {
            if(error) {
              console.error(error)
            } else {
              fse.writeFile(pageDist, formattedText, (error) => {
                if(error) {
                  console.log('Could not write page:', pageDist, error)
                } else {
                  console.log('wrote page:', pageDist)
                }
              })
            }
          })
        })
      }
    })
  }
})
