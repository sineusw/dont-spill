// Leaderboard API: GET ?board=all|daily&day=YYYY-MM-DD  ·  POST {board,name,score,day,v}
// Stores top-50 lists as JSON in Vercel Blob. Needs a Blob store connected to this project (BLOB_READ_WRITE_TOKEN).
import { put, list } from '@vercel/blob';

const BAD = ['fuck','fuk','shit','bitch','cunt','dick','cock','pussy','nigg','fag','slut','whore','rape','porn','penis','vagina','cum','sex','nazi','hitler','kkk','retard','twat','wank','tits','boob','anal','jizz','ass'];
function cleanName(n) {
  n = String(n || '').replace(/[^A-Za-z0-9 _-]/g, '').trim().slice(0, 12);
  const f = n.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s');
  return n.length >= 2 && !BAD.some(b => f.includes(b)) ? n : '';
}
const sig = (n, s) => { let h = 2166136261; for (const c of n + '|' + s + '|ds') h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return h.toString(36); };
const okDay = d => /^\d{4}-\d{2}-\d{2}$/.test(d || '');
const path = (board, day) => board === 'daily' ? `lb/daily-${day}.json` : 'lb/all.json';

async function load(p) {
  const { blobs } = await list({ prefix: p, limit: 1 });
  const b = blobs.find(x => x.pathname === p);
  if (!b) return [];
  const r = await fetch(b.url + '?t=' + Date.now(), { cache: 'no-store' });
  return r.ok ? r.json() : [];
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'leaderboard storage not connected' });
  try {
    if (req.method === 'GET') {
      const board = req.query.board === 'daily' ? 'daily' : 'all', day = okDay(req.query.day) ? req.query.day : new Date().toISOString().slice(0, 10);
      return res.status(200).json({ list: (await load(path(board, day))).slice(0, 50) });
    }
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const board = b.board === 'daily' ? 'daily' : 'all', name = cleanName(b.name), score = Math.floor(+b.score);
      if (!name || !(score > 0 && score < 500000) || b.v !== sig(String(b.name), b.score) || (board === 'daily' && !okDay(b.day)))
        return res.status(400).json({ error: 'invalid' });
      const p = path(board, b.day);
      const cur = await load(p);
      const i = cur.findIndex(e => e.name.toLowerCase() === name.toLowerCase());
      if (i >= 0) { if (cur[i].score >= score) return res.status(200).json({ ok: 1, kept: 1 }); cur.splice(i, 1); }
      cur.push({ name, score, t: Date.now() });
      cur.sort((a, c) => c.score - a.score);
      await put(p, JSON.stringify(cur.slice(0, 50)), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
      return res.status(200).json({ ok: 1 });
    }
    res.status(405).end();
  } catch (e) { res.status(500).json({ error: 'server' }); }
}
