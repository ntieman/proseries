module.exports = async ({ target, text = 'Skip' }) => {
  return `
    <a class="skip-arrow" href="#${target}">
      <span class="skip-arrow-text">${text}</span>
      <i class="fas fa-arrow-down" role="presentation"></i>
    </a>
  `
}
