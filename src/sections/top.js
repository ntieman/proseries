const image = require('./image')

module.exports = async () => {
  return `
    <header class="top-header">
      <h1 class="top-header-title">
        <a href="/">
          ${await image({
            alt: 'Pro Series',
            srcFile: 'pro-series.png'
          })}
        </a>
      </h1>
      <nav class="top-header-nav">
        <ul class="top-header-list">
          <div class="top-header-list-section top-header-list-left">
            <li><a href="/protools">ProTools</a></li>
            <li><a href="/distributors">Distributors</a></li>
          </div>
          <div class="top-header-list-section top-header-list-right">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </div>
        </ul>
      </nav>
    </header>
  `
}
