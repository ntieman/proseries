module.exports = async ({ header, id, items }) => {
  return `
    <section ${id ? `id="${id}"` : ''} class="intro">
      ${header ? `<h2 class="intro-header">${header}</h2>` : ''}
      <ul class="intro-list">
        ${items
          .map(({ header, text }) => {
            return `
            <li class="intro-list-item">
              <h3 class="intro-list-item-header">${header}</h3>
              <div class="intro-list-item-text">${text}</div>
            </li>
          `
          })
          .join(' ')}
      </ul>
    </section>
  `
}
