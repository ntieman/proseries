const fse = require('fs-extra')
const path = require('path')

const glob = require('glob')
const html = require('html')
const sass = require('node-sass')
const uglify = require('uglify-js')

const breakpoints = require('./src/config/breakpoints')

const srcDir = path.join(__dirname, 'src/')
const distDir = path.join(__dirname, 'dist/')

const pagesSrcDir = path.join(srcDir, 'pages/')
const pagesDistDir = distDir

const stylesSrcDir = path.join(srcDir, 'styles/')
const stylesDistDir = path.join(distDir, 'styles/')

const scriptsSrcDir = path.join(srcDir, 'scripts/')
const scriptsDistDir = path.join(distDir, 'scripts/')

fse.remove(distDir, (error) => {
  if (error) {
    console.error('could not clear dist directory:', error)
  } else {
    console.log('dist directory cleared')

    glob(pagesSrcDir + '**/*.js', (error, pages) => {
      if (error) {
        console.error(error)
      } else {
        console.log(pages.length + ' page(s) read')

        pages.forEach(async (pageSrc) => {
          const generator = require(pageSrc)
          const text = await generator()
          const formattedText = html.prettyPrint(text, { indent_size: 2 })
          const pageDist = pageSrc
            .replace(pagesSrcDir, pagesDistDir)
            .replace(/\.js$/, '.html')
          const pageDistDir = path.dirname(pageDist)

          fse.ensureDir(pageDistDir, (error) => {
            if (error) {
              console.error(error)
            } else {
              fse.writeFile(pageDist, formattedText, (error) => {
                if (error) {
                  console.log('could not write page:', pageDist, error)
                } else {
                  console.log('wrote page:', pageDist)
                }
              })
            }
          })
        })
      }
    })

    glob(stylesSrcDir + '**/*.scss', (error, styles) => {
      if (error) {
        console.log('could not read styles:', error)
      } else {
        styles.forEach((styleSrc) => {
          if (!styleSrc.match(/_[a-z-]+\.scss$/i)) {
            const styleDist = styleSrc
              .replace(stylesSrcDir, stylesDistDir)
              .replace(/\.scss$/, '.css')
            const styleDistDir = path.dirname(styleDist)
            const sourceMapDist = styleDist + '.map'

            sass.render(
              {
                file: styleSrc,
                outFile: styleDist,
                sourceMap: sourceMapDist,
                sourceMapContents: true,
                functions: {
                  'breakpointMin($name)': (name) => {
                    name = name.getValue()

                    return sass.types.Number(
                      breakpoints.find((breakpoint) => breakpoint.name === name)
                        .min || 0,
                      'px'
                    )
                  },
                  'breakpointMax($name)': (name) => {
                    name = name.getValue()

                    return sass.types.Number(
                      breakpoints.find((breakpoint) => breakpoint.name === name)
                        .max || Infinity,
                      'px'
                    )
                  }
                }
              },
              (error, { css, map }) => {
                if (error) {
                  console.error('could not render style:', styleSrc, error)
                } else {
                  fse.ensureDir(styleDistDir, (error) => {
                    if (error) {
                      console.log(error)
                    } else {
                      fse.writeFile(styleDist, css, (error) => {
                        if (error) {
                          console.error('could not write style:', styleDist)
                        } else {
                          console.log('wrote style:', styleDist)
                        }
                      })

                      fse.writeFile(sourceMapDist, map, (error) => {
                        if (error) {
                          console.error(
                            'could not write source map:',
                            sourceMapDist
                          )
                        } else {
                          console.log('wrote source map:', sourceMapDist)
                        }
                      })
                    }
                  })
                }
              }
            )
          }
        })
      }
    })

    const scripts = [
      scriptsSrcDir + 'jquery.js',
      scriptsSrcDir + 'skip-arrow.js'
    ]

    const scriptsDistFile = scriptsDistDir + 'general.min.js'
    const sources = {}

    scripts.forEach((scriptSrc) => {
      sources[
        scriptSrc.replace(scriptsSrcDir, '../src/scripts/')
      ] = fse.readFileSync(scriptSrc).toString()
    })

    const compilerResult = uglify.minify(sources, {
      sourceMap: {
        filename: 'general.min.js.map',
        url: 'general.min.js.map'
      }
    })

    if (compilerResult.code) {
      fse.ensureDirSync(scriptsDistDir)

      fse.writeFile(scriptsDistFile, compilerResult.code, 'utf8', (error) => {
        if (error) {
          console.error('could not compile scripts:', error)
        } else {
          console.log('compiled scripts:', scriptsDistFile)
        }
      })

      fse.writeFile(
        scriptsDistFile + '.map',
        compilerResult.map,
        'utf8',
        (error) => {
          if (error) {
            console.error('could not compile source map:', error)
          } else {
            console.log('compiled source map:', scriptsDistFile + '.map')
          }
        }
      )
    } else {
      console.error('could not write scripts:', compilerResult.error)
    }
  }
})
