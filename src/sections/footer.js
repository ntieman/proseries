const image = require('./image')

module.exports = async () => {
  return `
    <footer class="footer">
      <section class="footer-intro">
        <h3>
          <a href="/">
            ${await image({
              alt: 'Pro Series',
              srcFile: 'pro-series.png'
            })}
          </a>
        </h3>
        <p>PROSeries was created to bring life to the world of wrap tools.  Our name explains it all—this is a PROFESSIONAL SERIES tool line for the wrap industry.</p>
      </section>
      <section class="footer-links">
        <h3>Helpful Links</h3>
        <ul>
          <li><a href="/products">Products</a></li>
          <li><a href="/distributors">Distributors</a></li>
          <li><a href="/faqs">FAQs</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/contact">Contact us</a></li>
        </ul>
      </section>
      <section class="footer-contact">
        <h3>Contact Us</h3>
        <address>3030 Hartley Rd #300<br>
        Jacksonville, FL 32257<br>
        contact@pidproseries.com</address>
        <a href="tel:9043749100">(904) 374-9100</a>
        <ul class="footer-contact-social">
          <li>
            <a href="https://www.facebook.com/pidproseries/" target="_blank">
              <i class="fab fa-facebook-square" role="presentation"></i>
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/pidproseries/" target="_blank">
              <i class="fab fa-instagram" role="presentation"></i>
              <span>Instagram</span>
            </a>
          </li>
        </ul>
      </section>
    </footer>
    <footer class="copyright">
      &copy; 2019 <span class="red">PROSERIES</span>. All Rights Reserved. <a href="/terms">Terms & Privacy</a>.
    </footer>
  `
}
