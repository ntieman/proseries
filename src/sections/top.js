const image = require('./image')

module.exports = async () => {
  return `
    <header>
      <h1>
        <a href="/">
          ${await image({
            alt: 'Pro Series',
            srcFile: 'pro-series.png',
            widths: ['2x']
          })}
        </a>
      </h1>
      <nav>
        <ul>
          <li><a href="/protools">ProTools</a></li>
          <li><a href="/distributors">Distributors</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  `
}
