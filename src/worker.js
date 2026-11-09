const WEBSITE_HOSTS = new Set(['mkotas.cz', 'www.mkotas.cz']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (WEBSITE_HOSTS.has(url.hostname) && (url.protocol !== 'https:' || url.hostname !== 'mkotas.cz')) {
      url.protocol = 'https:';
      url.hostname = 'mkotas.cz';
      url.port = '';
      return Response.redirect(url.href, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
