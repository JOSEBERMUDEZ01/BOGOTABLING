// /api/keepalive.js — VERSIÓN DE DIAGNÓSTICO (muestra el error real)
module.exports = async function handler(req, res) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      res.status(500).json({ ok: false, error: 'Faltan variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY' });
      return;
    }

    const url = `${process.env.SUPABASE_URL}/rest/v1/products`
      + `?select=id&limit=1`;

    const resp = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    });

    if (!resp.ok) {
      const texto = await resp.text();
      res.status(502).json({ ok: false, error: texto, status: resp.status });
      return;
    }

    const data = await resp.json();

    res.status(200).json({
      ok: true,
      message: 'Supabase (Bogotá Bling) activo',
      timestamp: new Date().toISOString(),
      sample: data.length,
    });
  } catch (err) {
    // Temporal: mostramos el error real para diagnosticar
    res.status(500).json({ ok: false, error: err.message, stack: err.stack });
  }
};
