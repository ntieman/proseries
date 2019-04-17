module.exports = async ({ header, id, items }) => {
  return `
    <section class="showcase" ${id ? `id="${id}"` : ''}>
      ${header ? `<h2 class="showcase-header">${header}</h2>` : ''}
      <ul class="showcase-list">
        ${items.map((content) => {
          return `
            <li class="showcase-list-item">
              ${content}
            </li>
          `
        })}
      </ul>
    </section>
  `
}
