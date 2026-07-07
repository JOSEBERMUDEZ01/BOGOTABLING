// /api/keepalive.js
//
// Bot de "mantenimiento" para Bogotá Bling: hace una consulta mínima
// a Supabase para evitar que el proyecto se pause por inactividad
// (los proyectos gratuitos de Supabase se pausan tras ~7 días sin uso).
//
// Sin dependencias: usa fetch() nativo, no requiere @supabase/supabase-js
// ni package.json — Vercel detecta esto solo como función serverless.
//
// Variables de entorno necesarias (Vercel → Project Settings →
// Environment Variables). Usa las MISMAS que ya tienes en el frontend:
//   SUPABASE_URL       -> https://xulggoovlclvyzkbyhiq.supabase.co
//   SUPABASE_ANON_KEY  -> tu sb_publishable_... (nunca la sb_secret_...)

module.exports = async function handler(req, res) {
  try {
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
      res.status(502).json({ ok: false, error: texto });
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
    res.status(500).json({ ok: false, error: 'Error interno en keepalive' });
  }
};
