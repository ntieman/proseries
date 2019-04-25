module.exports = async () => {
  return `
    <form class="connect">
      <h2 class="connect-header">Stay connected</h2>
      <p class="connect-description">Stay updated on new products, events, and more.</p>
      <input class="connect-email" name="email" type="email" required="required" placeholder="Enter your email address">
      <button class="connect-submit" name="submit" type="submit">Join</button>
    </form>
  `
}
