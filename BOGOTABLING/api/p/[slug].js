// api/p/[slug].js
//
// Qué hace:
//   Cuando alguien COMPARTE el link de un producto (por WhatsApp, etc.),
//   la app que genera la vista previa (WhatsApp, Facebook, etc.) visita
//   esta URL antes que la persona. Como esos robots no ejecutan el
//   JavaScript del sitio, hasta ahora siempre veían el logo genérico.
//
//   Esta función busca el producto real en Supabase y le devuelve al
//   robot una página con SU foto, SU nombre y SU precio en las
//   etiquetas Open Graph. Si quien entra es una persona real (no un
//   robot de vista previa), la manda directo al producto en el sitio
//   de siempre, sin que note nada raro.
//
// No toca ni reemplaza el link con #producto/slug que ya usas dentro
// del sitio — este es un link nuevo, pensado solo para compartir.

export default async function handler(req, res) {
  const { slug } = req.query;
  const SUPABASE_URL = "https://xulggoovlclvyzkbyhiq.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_5rytTB3bbrAgwW4rHisMzQ_Zaubtuow";
  const SITE_URL = "https://martineztimeco.vercel.app";
  const targetUrl = `${SITE_URL}/#producto/${encodeURIComponent(slug || '')}`;

  const escapeHtml = (s) =>
    String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  let product = null;
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/products?slug=eq.${encodeURIComponent(slug || '')}&select=name,price_current,product_images(image_url)&limit=1`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const data = await r.json();
    product = Array.isArray(data) && data[0] ? data[0] : null;
  } catch (e) {
    product = null;
  }

  // Si no encontramos el producto (link viejo, borrado, o error de red),
  // mandamos directo al sitio sin más vueltas.
  if (!product) {
    res.writeHead(302, { Location: targetUrl });
    res.end();
    return;
  }

  const priceText =
    Number(product.price_current) > 0
      ? `$${Number(product.price_current).toLocaleString('es-CO')} COP`
      : 'Consultar precio';

  const title = `${product.name} — Martinez Time Co`;
  const description = `${priceText} · Relojería y joyería de lujo en Colombia. Escríbenos por WhatsApp.`;
  const image =
    (product.product_images && product.product_images[0] && product.product_images[0].image_url) ||
    `${SITE_URL}/og-image.png`;

  // Solo a los robots de vista previa (WhatsApp, Facebook, etc.) les
  // mostramos la página con las etiquetas; a las personas reales las
  // mandamos directo al sitio.
  const ua = req.headers['user-agent'] || '';
  const isPreviewBot = /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Discordbot|Pinterest|Googlebot|SkypeUriPreview|redditbot/i.test(ua);

  if (!isPreviewBot) {
    res.writeHead(302, { Location: targetUrl });
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>${escapeHtml(title)}</title>
<meta property="og:type" content="product"/>
<meta property="og:title" content="${escapeHtml(title)}"/>
<meta property="og:description" content="${escapeHtml(description)}"/>
<meta property="og:image" content="${escapeHtml(image)}"/>
<meta property="og:url" content="${escapeHtml(targetUrl)}"/>
<meta property="og:site_name" content="Martinez Time Co"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${escapeHtml(title)}"/>
<meta name="twitter:description" content="${escapeHtml(description)}"/>
<meta name="twitter:image" content="${escapeHtml(image)}"/>
<meta http-equiv="refresh" content="0;url=${escapeHtml(targetUrl)}"/>
</head>
<body>
<p>Redirigiendo a <a href="${escapeHtml(targetUrl)}">${escapeHtml(title)}</a>…</p>
</body>
</html>`);
}
