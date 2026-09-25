// api/notify-account-change.js
//
// Envía un correo de aviso de seguridad cada vez que se cambia algo en la
// cuenta del admin (contraseña, correo, o se restablece por el link de
// recuperación). Usa Resend (resend.com) — plan gratis, 100 correos/día.
//
// Requiere una variable de entorno en Vercel llamada RESEND_API_KEY.
// Instrucciones abajo del todo de este archivo.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    // No tumbamos nada por esto — el cambio de contraseña/correo ya se
    // guardó en Supabase de todas formas, solo no se pudo avisar.
    res.status(200).json({ ok: false, reason: 'RESEND_API_KEY no configurada' });
    return;
  }

  let body = {};
  try { body = req.body || {}; } catch (e) {}
  const { to, changeType } = body;
  if (!to || !changeType) {
    res.status(400).json({ error: 'Faltan datos (to, changeType)' });
    return;
  }

  const labels = {
    password: 'Se cambió la contraseña de tu panel admin',
    email: 'Se cambió el correo de tu panel admin',
    both: 'Se cambió el correo y la contraseña de tu panel admin',
    recovery: 'Se restableció la contraseña con el link de recuperación',
  };
  const title = labels[changeType] || 'Se hizo un cambio en tu cuenta';
  const when = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'long', timeStyle: 'short' });

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Martinez Time Co <onboarding@resend.dev>',
        to: [to],
        subject: `Martinez Time Co — ${title}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#111">
            <h2 style="color:#C8102E;margin-bottom:4px">${title}</h2>
            <p style="color:#555;font-size:14px">${when} (hora de Colombia)</p>
            <p style="font-size:14px;line-height:1.6">
              Te avisamos porque se hizo un cambio en tu cuenta del panel administrativo de Martinez Time Co.
            </p>
            <p style="font-size:14px;line-height:1.6;background:#fff5f5;border-left:3px solid #C8102E;padding:12px 14px;border-radius:6px">
              Si fuiste tú, no necesitas hacer nada. Si <b>no reconoces este cambio</b>,
              entra al panel y cambia tu contraseña de inmediato.
            </p>
          </div>
        `,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      res.status(200).json({ ok: false, reason: 'Resend error', detail });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: false, reason: String(e) });
  }
}

// ============================================================
// CÓMO CONECTARLO (una sola vez):
// 1) Crea una cuenta gratis en https://resend.com
// 2) En su panel, ve a "API Keys" y crea una nueva (cópiala, solo se
//    muestra una vez).
// 3) En Vercel: entra a tu proyecto → Settings → Environment Variables.
//    Agrega una nueva variable:
//      Nombre:  RESEND_API_KEY
//      Valor:   (la clave que copiaste de Resend)
//    Guarda y vuelve a desplegar el proyecto (Vercel → Deployments →
//    "..." → Redeploy) para que la variable quede activa.
// Con eso, no hay que tocar nada más — los avisos empiezan a salir solos.
// ============================================================
