// /api/keepalive.js — VERSIÓN DE DIAGNÓSTICO v2
module.exports = async function handler(req, res) {
  const rawUrl = process.env.SUPABASE_URL || '';
  const rawKey = process.env.SUPABASE_ANON_KEY || '';

  try {
    const url = `${rawUrl}/rest/v1/products?select=id&limit=1`;

    const resp = await fetch(url, {
      headers: {
        apikey: rawKey,
        Authorization: `Bearer ${rawKey}`,
      },
    });

    if (!resp.ok) {
      const texto = await resp.text();
      res.status(502).json({ ok: false, error: texto, status: resp.status, urlUsada: url });
      return;
    }

    const data = await resp.json();
    res.status(200).json({ ok: true, message: 'Supabase activo', sample: data.length });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      cause: err.cause ? String(err.cause) : null,
      // Mostramos la URL construida (sin la key) para revisar el formato
      urlConstruida: `${rawUrl}/rest/v1/products?select=id&limit=1`,
      urlLength: rawUrl.length,
      urlStartsWithHttps: rawUrl.startsWith('https://'),
    });
  }
};
