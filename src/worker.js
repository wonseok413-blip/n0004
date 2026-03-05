export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Fetch the requested asset
    const response = await env.ASSETS.fetch(request);

    // Only transform HTML responses
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    // Fetch header and footer in parallel
    const [headerRes, footerRes] = await Promise.all([
      env.ASSETS.fetch(new Request(`${url.origin}/components/header.html`)),
      env.ASSETS.fetch(new Request(`${url.origin}/components/footer.html`)),
    ]);

    const [headerHTML, footerHTML] = await Promise.all([
      headerRes.text(),
      footerRes.text(),
    ]);

    // Inject header and footer server-side via HTMLRewriter
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
