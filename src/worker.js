import headerHTML from '../public/components/header.html';
import footerHTML from '../public/components/footer.html';

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    return new HTMLRewriter()
      .on('#header-one', {
        element(el) {
          el.replace(headerHTML, { html: true });
        },
      })
      .on('#footer-one', {
        element(el) {
          el.replace(footerHTML, { html: true });
        },
      })
      .transform(response);
  },
};
