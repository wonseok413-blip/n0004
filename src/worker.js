const HEADER_HTML = `<div class="sub-header">
  <p>Join now and receive 20% off your first payment <a href="https://noteracker.com/en/pricing/#MonthlyCarePlan"><strong>Click!</strong></a></p>
</div>
<header class="header">
  <nav class="nav-container">
    <a href="/index.html" class="logo">
      <img src="/images/noteracker-logo-02.webp" alt="Noteracker Ltd." style="height: 40px; width: auto;">
    </a>

    <ul class="nav-menu">
      <li><a href="/about" class="nav-link">About Us</a></li>
      <li><a href="/services" class="nav-link">Services</a></li>
      <li><a href="/malware-care" class="nav-link">Malware Care</a></li>
      <li><a href="/contact" class="nav-link">Contact</a></li>
    </ul>

    <div class="nav-cta">
      <button class="cta-button" onclick="window.location.href='https://noteracker.com/en/pricing/#MonthlyCarePlan'">Get Started</button>
    </div>

    <div class="mobile-toggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
</header>`;

const FOOTER_HTML = `<footer class="footer" id="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/index.html" class="footer-logo">
            <img src="/images/noteracker-logo-02.webp" alt="Noteracker Ltd." style="height: 40px; width: auto; filter: brightness(1.2);">
          </a>
          <p>We cherish the value of genuine communication as we continue shaping our digital world. And if you ever wish to know more about Noteracker..</p>
          <div class="footer-email-label">Channel of communication</div>
          <div class="footer-email">
            <i class="fa-solid fa-envelope"></i>
            <a href="mailto:support@noteracker.com">support@noteracker.com</a>
          </div>
        </div>

        <div class="footer-cols">
          <div class="footer-col">
          <h4>Products</h4>
          <ul>
            <li><a href="/services#design">Website Design &amp; Build</a></li>
            <li><a href="/services#rebuild">WP Complete Rebuild</a></li>
            <li><a href="/services#security">WP Performance &amp; Security</a></li>
            <li><a href="/services#monthly-care">Monthly WP Care Plans</a></li>
            <li><a href="/services">Digital file</a></li>
            <li><a href="/services" class="footer-note">Other products besides our monthly subscription management services are currently being prepared for launch.</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="/contact">Order Process</a></li>
            <li><a href="/contact">Subscription Process</a></li>
            <li><a href="/contact">FAQs</a></li>
            <li><a href="/contact">User Guide</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>SNS</h4>
          <ul>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://www.youtube.com/" target="_blank" rel="noopener">YouTube</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Service</a></li>
            <li><a href="/about#story">Our story</a></li>
            <li><a href="https://noteracker.com">Blog</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Compliance</h4>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#gdpr">GDPR &amp; ePrivacy</a></li>
            <li><a href="#cookies">Cookie Policy</a></li>
            <li><a href="#refund">Refund Guide</a></li>
          </ul>
        </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copy">
          <strong>&copy; 2026 Noteracker Ltd.</strong><br />
          Incorporated in England &amp; Wales No.17030247<br />
          Registered Office : 71-75 Shelton Street, Covent Garden, London UK / WC2H 9JQ
        </div>
      </div>
      <div class="footer-trademark">
        The WordPress&reg; and WooCommerce&reg; trademarks belong to the WordPress Foundation and WooCommerce, Inc. Reference to these trademarks, along with Breakdance Builder, WP Rocket, Wordfence, Perfmatters, Rank Math, and Object Cache Pro, is strictly for identification purposes. Noteracker is an independent agency specializing in website optimization and management. These professional software tools are utilized solely to provide premium performance and security as part of our management services; they are not for individual resale. Noteracker is not endorsed by, affiliated with, or owned by the owners of these respective trademarks.
      </div>
    </div>
  </footer>`;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    const transformed = new HTMLRewriter()
      .on('#header-one', {
        element(el) {
          el.replace(HEADER_HTML, { html: true });
        },
      })
      .on('#footer-one', {
        element(el) {
          el.replace(FOOTER_HTML, { html: true });
        },
      })
      .transform(response);

    const newHeaders = new Headers(transformed.headers);
    newHeaders.set('Cache-Control', 'no-store');
    return new Response(transformed.body, {
      status: transformed.status,
      headers: newHeaders,
    });
  },
};
