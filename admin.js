/* IsraTeam site admin panel. Loaded only on #admin. Content lives in Supabase table site_sections
   (one row per top-level key of window.SITE); anything without a row falls back to content.js. */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const { S, STATIC, CMS } = window.ISRA;
const sb = createClient(CMS.url, CMS.key, { auth: { persistSession: true, detectSessionInUrl: true } });

const SECTIONS = [
  ["pages", "עמודים נוספים", "עמודים חדשים שאתם יוצרים. אפשר להציג אותם בתפריט הראשי."],
  ["home", "דף הבית"],
  ["posts", "פוסטים"],
  ["updates", "עדכונים ואירועים"],
  ["articlesFull", "מאמרים"],
  ["projects", "פרויקטים"],
  ["expertise", "תחומי מומחיות"],
  ["method", "מתודולוגיה (3 שלבים)"],
  ["about", "אודות"],
  ["aboutMore", "אודות – חזון ומטרות"],
  ["team", "צוות"],
  ["clients", "לקוחות"],
  ["contact", "פרטי קשר"],
  ["contactPage", "עמוד צור קשר"],
  ["ui", "טקסטים כלליים", "תפריט, כפתורים, טופס יצירת קשר ותחתית האתר."],
  ["mediaSlots", "סרטוני רקע ווידאו", "החלפת הסרטונים והתמונות שמופיעים ברקע ובכרטיסים."],
  ["covers", "תמונות שער"],
  ["privacy", "מדיניות פרטיות"],
  ["accessibility", "הצהרת נגישות"],
  ["terms", "תנאי שימוש"]
];
const LABELS = {
  title:"כותרת", subtitle:"כותרת משנה", sub:"כותרת משנה", text:"טקסט", body:"תוכן", intro:"פתיח", lead:"פתיח", name:"שם",
  role:"תפקיד", date:"תאריך", place:"מקום", image:"תמונה", images:"תמונות", video:"סרטון", poster:"תמונת פתיחה לסרטון",
  id:"מזהה (אותיות באנגלית, משמש בכתובת העמוד)", en:"English", he:"עברית", items:"פריטים", inNav:"להציג בתפריט הראשי",
  url:"קישור", link:"קישור", links:"קישורים", pdf:"קובץ PDF", email:"דוא״ל", phone:"טלפון", tag:"תגית", tags:"תגיות",
  updated:"תאריך עדכון", eyebrow:"כותרת קטנה", lede:"פתיח", lede2:"פתיח נוסף", introTitle:"כותרת פתיחה", introEyebrow:"כותרת קטנה לפתיחה", cta:"כפתור", more:"קרא עוד", caption:"כיתוב", alt:"תיאור תמונה (לנגישות)", events:"אירועים", topics:"נושאים", list:"רשימה", stages:"שלבים", kind:"סוג", country:"מדינה",
  client:"לקוח", year:"שנה", summary:"תקציר", quote:"ציטוט", label:"תווית", value:"ערך", note:"הערה", event:"אירוע מקושר"
};
const MEDIA_KEY = /^(image|images|img|photo|photos|logo|cover|covers|poster|video|src|pdf|file|thumb|background)$/i;
const MEDIA_VAL = /\.(jpe?g|png|webp|gif|svg|mp4|webm|pdf)(\?.*)?$/i;
const LONG_KEY = /^(body|text|intro|lead|summary|quote|note|desc|description|about)$/i;

const clone = o => JSON.parse(JSON.stringify(o ?? null));
const h = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") e.className = v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (k === "html") e.innerHTML = v; else e.setAttribute(k, v === true ? "" : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) e.append(k.nodeType ? k : String(k));
  return e;
};
const label = k => LABELS[k] || String(k).replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
const isMediaPath = (key, val) => (typeof val === "string" && (MEDIA_KEY.test(String(key)) || MEDIA_VAL.test(val)));
const siteUrl = p => (/^(https?:|data:|blob:)/.test(p) ? p : new URL(p, location.href).href);

/* ---------- shell ---------- */
const css = `
#adm{position:fixed;inset:0;z-index:200;background:var(--ground);color:var(--ink);overflow:auto;font-family:"IBM Plex Sans Hebrew",system-ui,sans-serif;font-size:15px}
#adm *{box-sizing:border-box}
#adm .top{position:sticky;top:0;z-index:5;display:flex;gap:12px;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--deep);color:var(--deep-ink)}
#adm .top b{font-size:17px}#adm .top a,#adm .top button{color:var(--deep-ink)}
#adm .tabs{display:flex;gap:6px;flex-wrap:wrap}
#adm .tabs button{background:none;border:1px solid var(--deep-line);color:var(--deep-ink);padding:7px 12px;border-radius:4px;cursor:pointer;font:inherit}
#adm .tabs button[aria-current="page"]{background:var(--deep-ink);color:var(--deep)}
#adm .wrapa{max-width:1180px;margin:0 auto;padding:22px 20px 80px}
#adm .cols{display:grid;grid-template-columns:240px 1fr;gap:24px;align-items:start}
#adm nav.secs{display:grid;gap:4px;position:sticky;top:70px}
#adm nav.secs button{text-align:start;background:var(--surface);border:1px solid var(--line);color:var(--ink);padding:9px 12px;border-radius:4px;cursor:pointer;font:inherit}
#adm nav.secs button[aria-current="true"]{border-color:var(--teal);box-shadow:inset 3px 0 0 var(--teal);font-weight:600}
#adm nav.secs small{display:block;color:var(--ink-2);font-size:12px}
#adm .card{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:18px}
#adm h1{font-size:24px;margin:0 0 6px}#adm h2{font-size:19px;margin:0 0 10px}
#adm .muted{color:var(--ink-2)}
#adm label{display:block;font-weight:600;font-size:13.5px;margin:12px 0 4px}
#adm input[type=text],#adm input[type=email],#adm input[type=password],#adm textarea,#adm select{width:100%;padding:9px 10px;border:1px solid var(--line);border-radius:4px;background:var(--ground);color:var(--ink);font:inherit}
#adm textarea{min-height:70px;resize:vertical;line-height:1.5}
#adm input:focus,#adm textarea:focus,#adm select:focus,#adm button:focus-visible{outline:3px solid var(--signal);outline-offset:1px}
#adm .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font:inherit;font-weight:600;text-decoration:none}
#adm .btn.pri{background:var(--signal);border-color:var(--signal);color:var(--signal-ink)}
#adm .btn.sm{padding:4px 9px;font-size:13px;font-weight:500}
#adm .btn.danger{color:#B3261E;border-color:#B3261E}
#adm .btn:disabled{opacity:.5;cursor:not-allowed}
#adm .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#adm .savebar{position:sticky;bottom:0;margin-top:18px;padding:12px;background:var(--surface);border:1px solid var(--line);border-radius:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;box-shadow:0 -6px 18px rgba(0,0,0,.08)}
#adm fieldset{border:1px solid var(--line);border-radius:6px;padding:10px 14px 14px;margin:12px 0}
#adm legend{font-weight:700;padding:0 6px;font-size:14px}
#adm .bi{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:700px){#adm .bi{grid-template-columns:1fr}}
#adm details.item{border:1px solid var(--line);border-radius:6px;margin:8px 0;background:var(--ground)}
#adm details.item>summary{cursor:pointer;padding:10px 12px;display:flex;gap:8px;align-items:center;justify-content:space-between;font-weight:600}
#adm details.item>.in{padding:0 12px 12px}
#adm .media{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#adm .media img,#adm .media video{width:120px;height:72px;object-fit:cover;border-radius:4px;background:var(--sunk);border:1px solid var(--line)}
#adm .msg{padding:10px 12px;border-radius:4px;margin:10px 0;background:var(--sunk)}
#adm .msg.ok{background:color-mix(in srgb,var(--wa) 18%,transparent)}
#adm .msg.err{background:color-mix(in srgb,#B3261E 16%,transparent)}
#adm table{width:100%;border-collapse:collapse}#adm td,#adm th{padding:8px;border-bottom:1px solid var(--line);text-align:start}
#adm .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
#adm .grid figure{margin:0;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:var(--surface)}
#adm .grid img,#adm .grid video{width:100%;height:110px;object-fit:cover;display:block;background:var(--sunk)}
#adm .grid figcaption{padding:6px 8px;font-size:12px;word-break:break-all;display:grid;gap:6px}
#adm .auth{max-width:420px;margin:40px auto}
#adm .help{font-size:12.5px;color:var(--ink-2);margin-top:4px}
#adm .check{display:flex;gap:8px;align-items:center;font-weight:600;margin:12px 0}
@media(max-width:820px){#adm .cols{grid-template-columns:1fr}#adm nav.secs{position:static;grid-template-columns:1fr 1fr}#adm nav.secs small{display:none}#adm .top{flex-wrap:wrap;padding:10px 14px}#adm .top .tabs{order:3;width:100%}#adm .tabs button{padding:6px 9px;font-size:13.5px}#adm .wrapa{padding:16px 12px 80px}}
`;
document.head.append(h("style", { html: css }));
const root = h("div", { id: "adm", role: "main" });
document.body.append(root);
const siteEls = ["header.top", "#main", "#footer", "#wa", "#a11yb", "#skip"].map(s => document.querySelector(s)).filter(Boolean);
function show() { root.hidden = false; siteEls.forEach(e => e.hidden = true); document.title = "ניהול האתר · IsraTeam"; }
function hide() { root.hidden = true; siteEls.forEach(e => e.hidden = false); }
window.ISRA_ADMIN = { show, hide };
show();

let me = null, tab = "content", current = null, work = null, dirty = false;
window.addEventListener("beforeunload", e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });

function note(parent, text, kind) { const m = h("div", { class: "msg " + (kind || ""), role: kind === "err" ? "alert" : "status" }, text); parent.prepend(m); if (kind === "ok") setTimeout(() => m.remove(), 3500); return m; }
function errText(e) {
  const m = (e && (e.message || e.error_description)) || String(e);
  if (/Invalid login/i.test(m)) return "מייל או סיסמה שגויים.";
  if (/Email not confirmed/i.test(m)) return "צריך קודם לאשר את כתובת המייל דרך הקישור שנשלח אליך.";
  if (/already registered/i.test(m)) return "כבר קיים משתמש עם המייל הזה. נסו להתחבר.";
  if (/Password should be/i.test(m)) return "הסיסמה צריכה להכיל לפחות 6 תווים.";
  if (/rate limit/i.test(m)) return "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.";
  if (/row-level security|permission/i.test(m)) return "אין לך הרשאה לפעולה הזו.";
  return m;
}

/* ---------- auth ---------- */
function authView(mode = "login", info) {
  root.replaceChildren();
  const box = h("div", { class: "auth card" });
  const titles = { login: "כניסה לניהול האתר", signup: "הרשמה", forgot: "שכחתי סיסמה", recover: "בחירת סיסמה חדשה" };
  box.append(h("h1", {}, titles[mode]));
  if (info) note(box, info, "ok");
  const f = h("form", { novalidate: true });
  const email = h("input", { type: "email", id: "a-email", autocomplete: "email", required: true, dir: "ltr" });
  const pass = h("input", { type: "password", id: "a-pass", autocomplete: mode === "login" ? "current-password" : "new-password", required: true, dir: "ltr", minlength: 8 });
  if (mode !== "recover") f.append(h("label", { for: "a-email" }, "דוא״ל"), email);
  if (mode !== "forgot") f.append(h("label", { for: "a-pass" }, mode === "login" ? "סיסמה" : "סיסמה (לפחות 8 תווים)"), pass);
  if (mode === "signup") f.append(h("p", { class: "help" }, "אחרי ההרשמה בעל האתר צריך לאשר את החשבון שלך לפני שתוכל/י לערוך. הפרטים משמשים רק לניהול הגישה לאתר."));
  const btn = h("button", { class: "btn pri", type: "submit", style: "margin-top:16px;width:100%;justify-content:center" }, { login: "כניסה", signup: "הרשמה", forgot: "שליחת קישור לאיפוס", recover: "שמירת סיסמה" }[mode]);
  f.append(btn);
  f.addEventListener("submit", async ev => {
    ev.preventDefault(); btn.disabled = true; box.querySelectorAll(".msg").forEach(m => m.remove());
    try {
      if (mode !== "recover" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) throw new Error("הזינו כתובת מייל תקינה.");
      if (mode !== "forgot" && mode !== "login" && pass.value.length < 8) throw new Error("הסיסמה צריכה להכיל לפחות 8 תווים.");
      const back = location.origin + location.pathname + "#admin";
      if (mode === "login") { const { error } = await sb.auth.signInWithPassword({ email: email.value.trim(), password: pass.value }); if (error) throw error; await boot(); }
      else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email: email.value.trim(), password: pass.value, options: { emailRedirectTo: back } }); if (error) throw error;
        if (data.session) await boot(); else authView("login", "נשלח אליך מייל לאישור הכתובת. אחרי האישור אפשר להתחבר כאן.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email.value.trim(), { redirectTo: back }); if (error) throw error;
        note(box, "אם הכתובת רשומה, נשלח אליה קישור לאיפוס הסיסמה.", "ok");
      } else if (mode === "recover") {
        const { error } = await sb.auth.updateUser({ password: pass.value }); if (error) throw error;
        history.replaceState(null, "", "#admin"); await boot("הסיסמה עודכנה.");
      }
    } catch (e) { note(box, errText(e), "err"); }
    btn.disabled = false;
  });
  box.append(f);
  const links = h("p", { class: "bar", style: "margin-top:14px;justify-content:space-between" });
  if (mode !== "login") links.append(h("button", { class: "btn sm", type: "button", onclick: () => authView("login") }, "כבר יש לי חשבון"));
  if (mode === "login") links.append(h("button", { class: "btn sm", type: "button", onclick: () => authView("signup") }, "הרשמה"), h("button", { class: "btn sm", type: "button", onclick: () => authView("forgot") }, "שכחתי סיסמה"));
  links.append(h("a", { class: "btn sm", href: "#he.home" }, "חזרה לאתר"));
  box.append(links);
  root.append(box);
  (mode === "recover" ? pass : email).focus();
}

async function boot(info) {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return authView("login", info);
  const { data, error } = await sb.from("members").select("user_id,email,role").eq("user_id", session.user.id).maybeSingle();
  if (error && /fetch|network|Failed/i.test(error.message || "")) throw new Error("אין חיבור לשרת הניהול. הניהול עובד רק בכתובת הקבועה של האתר.");
  me = data || { email: session.user.email, role: "pending" };
  if (error || me.role === "pending") {
    root.replaceChildren(h("div", { class: "auth card" }, h("h1", {}, "החשבון ממתין לאישור"),
      h("p", {}, "נרשמת בהצלחה עם ", h("b", { dir: "ltr" }, me.email), ". בעל האתר צריך לאשר את החשבון שלך בלשונית ״משתמשים״. אחרי האישור, רעננו את העמוד."),
      h("p", { class: "bar" }, h("button", { class: "btn", onclick: () => boot() }, "בדיקה שוב"), h("button", { class: "btn", onclick: signOut }, "התנתקות"), h("a", { class: "btn", href: "#he.home" }, "חזרה לאתר"))));
    return;
  }
  frame(info);
}
async function signOut() { await sb.auth.signOut(); me = null; authView("login"); }

/* ---------- main frame ---------- */
function frame(info) {
  root.replaceChildren();
  const tabs = [["content", "תוכן האתר"], ["media", "ספריית מדיה"], ...(me.role === "owner" ? [["users", "משתמשים"]] : []), ["account", "החשבון שלי"]];
  const top = h("div", { class: "top" },
    h("b", {}, "ניהול האתר"),
    h("div", { class: "tabs", role: "navigation", "aria-label": "לשוניות ניהול" }, tabs.map(([k, t]) => h("button", { type: "button", "aria-current": tab === k ? "page" : null, onclick: () => { if (dirty && !confirm("יש שינויים שלא נשמרו. לעבור בכל זאת?")) return; dirty = false; tab = k; frame(); } }, t))),
    h("div", { class: "bar" }, h("span", { dir: "ltr", class: "muted", style: "color:var(--deep-2);font-size:13px" }, me.email), h("a", { href: "#he.home", target: "_blank", rel: "noopener" }, "צפייה באתר ↗")));
  const body = h("div", { class: "wrapa" });
  root.append(top, body);
  if (info) note(body, info, "ok");
  ({ content: contentTab, media: mediaTab, users: usersTab, account: accountTab })[tab](body);
}

/* ---------- content tab ---------- */
function contentTab(body) {
  const nav = h("nav", { class: "secs", "aria-label": "חלקי האתר" });
  const pane = h("div");
  body.append(h("div", { class: "cols" }, nav, pane));
  const pick = key => { if (dirty && !confirm("יש שינויים שלא נשמרו. לעבור בכל זאת?")) return; dirty = false; current = key; nav.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", String(b.dataset.k === key))); editSection(pane, key).then(() => { if (innerWidth <= 820) pane.scrollIntoView({ block: "start" }); }); };
  SECTIONS.forEach(([k, t, d]) => nav.append(h("button", { type: "button", "data-k": k, "aria-current": String(current === k), onclick: () => pick(k) }, t, d ? h("small", {}, d) : null)));
  if (current) editSection(pane, current);
  else pane.append(h("div", { class: "card" }, h("h1", {}, "שלום!"), h("p", {}, "בחרו בצד את החלק באתר שתרצו לערוך. כל שינוי נשמר רק אחרי לחיצה על ״שמירה ופרסום״, ומופיע באתר מיד."),
    h("ul", {}, h("li", {}, "פוסט חדש: ״פוסטים״ ← ״הוספת פריט״."), h("li", {}, "עמוד חדש: ״עמודים נוספים״ ← ״הוספת פריט״, ואז סמנו ״להציג בתפריט הראשי״."), h("li", {}, "החלפת תמונה או סרטון: לחצו ״העלאת קובץ״ ליד השדה."), h("li", {}, "כל שמירה נשמרת בהיסטוריה, ואפשר לשחזר גרסה קודמת."))));
}

async function editSection(pane, key) {
  pane.replaceChildren(h("p", { class: "muted" }, "טוען…"));
  const { data: row } = await sb.from("site_sections").select("data,updated_at,updated_by").eq("key", key).maybeSingle();
  const [_, title, desc] = SECTIONS.find(s => s[0] === key);
  work = clone(row ? row.data : (STATIC[key] ?? (key === "pages" ? [] : {})));
  dirty = false;
  const card = h("div", { class: "card" });
  card.append(h("h1", {}, title), desc ? h("p", { class: "muted" }, desc) : null,
    h("p", { class: "help" }, row ? "עודכן לאחרונה " + new Date(row.updated_at).toLocaleString("he-IL") + (row.updated_by ? " על ידי " + row.updated_by : "") : "מציג את התוכן המקורי של האתר. עדיין לא נערך."),
    LONG_HELP);
  const form = h("div");
  if (key === "mediaSlots") mediaSlotsEditor(form); else form.append(renderValue(work, [], key, v => { work = v; }));
  card.append(form); card.formEl = form;
  const status = h("span", { class: "muted", role: "status" });
  const saveBtn = h("button", { class: "btn pri", type: "button", onclick: save }, "שמירה ופרסום");
  const bar = h("div", { class: "savebar" }, saveBtn,
    h("button", { class: "btn", type: "button", onclick: () => showHistory(card, key) }, "היסטוריית גרסאות"),
    row ? h("button", { class: "btn danger", type: "button", onclick: resetToOriginal }, "חזרה לתוכן המקורי") : null, status);
  card.append(bar);
  pane.replaceChildren(card);
  card.addEventListener("input", () => { dirty = true; status.textContent = "יש שינויים שלא נשמרו"; });
  async function save() {
    saveBtn.disabled = true; status.textContent = "שומר…";
    const ids = findDupIds(work); if (ids) { status.textContent = ""; note(card, "יש שני פריטים עם אותו מזהה: " + ids + ". שנו אחד מהם.", "err"); saveBtn.disabled = false; return; }
    const { error } = await sb.from("site_sections").upsert({ key, data: work });
    saveBtn.disabled = false;
    if (error) { status.textContent = ""; note(card, errText(error), "err"); return; }
    S[key] = clone(work); dirty = false; status.textContent = "";
    editSection(pane, key).then(() => note(pane.firstChild, "נשמר ופורסם באתר.", "ok"));
  }
  async function resetToOriginal() {
    if (!confirm("למחוק את כל העריכות בחלק הזה ולחזור לתוכן המקורי? הגרסה הנוכחית תישמר בהיסטוריה.")) return;
    const { error: e1 } = await sb.from("site_sections").update({ data: work }).eq("key", key); // logs current version to history
    const { error } = e1 ? { error: e1 } : await sb.from("site_sections").delete().eq("key", key);
    if (error) return note(card, errText(error), "err");
    S[key] = clone(STATIC[key]); dirty = false; editSection(pane, key);
  }
}
const LONG_HELP = h("p", { class: "help" }, "בשדות טקסט ארוכים: שורה שמתחילה ב־## היא כותרת, שורה שמתחילה ב־- היא פריט ברשימה, ו־**טקסט** מודגש. שורה ריקה מתחילה פסקה חדשה.");

function findDupIds(v) {
  let bad = null;
  (function walk(x) {
    if (Array.isArray(x)) { const seen = new Set(); x.forEach(i => { if (i && typeof i === "object" && i.id) { if (seen.has(i.id)) bad = i.id; seen.add(i.id); } walk(i); }); }
    else if (x && typeof x === "object") Object.values(x).forEach(walk);
  })(v);
  return bad;
}

async function showHistory(card, key) {
  const { data, error } = await sb.from("section_history").select("id,saved_at,saved_by,data").eq("key", key).order("saved_at", { ascending: false }).limit(20);
  const box = h("fieldset", {}, h("legend", {}, "גרסאות קודמות"));
  if (error) box.append(errText(error));
  else if (!data.length) box.append(h("p", { class: "muted" }, "אין עדיין גרסאות קודמות."));
  else data.forEach(r => box.append(h("div", { class: "bar", style: "justify-content:space-between;border-bottom:1px solid var(--line);padding:6px 0" },
    h("span", {}, new Date(r.saved_at).toLocaleString("he-IL") + (r.saved_by ? " · " + r.saved_by : "")),
    h("button", { class: "btn sm", type: "button", onclick: () => { work = clone(r.data); const form = card.formEl; form.replaceChildren(); if (key === "mediaSlots") mediaSlotsEditor(form); else form.append(renderValue(work, [], key, v => { work = v; })); form.dispatchEvent(new Event("input", { bubbles: true })); note(card, "הגרסה נטענה לעריכה. לחצו ״שמירה ופרסום״ כדי לשחזר אותה.", "ok"); box.remove(); } }, "שחזור"))));
  card.querySelector(".savebar").before(box);
}

/* ---------- generic JSON form ---------- */
function blank(v) {
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") { const o = {}; for (const [k, x] of Object.entries(v)) o[k] = k === "id" ? "new-" + Date.now().toString(36) : blank(x); return o; }
  if (typeof v === "boolean") return false;
  if (typeof v === "number") return 0;
  return "";
}
const PAGE_TEMPLATE = () => ({ id: "page-" + Date.now().toString(36), inNav: false, image: "", en: { title: "", intro: "", body: "" }, he: { title: "", intro: "", body: "" } });
function itemTitle(it, i) {
  if (it && typeof it === "object") {
    const t = (it.he && (it.he.title || it.he.name)) || (it.en && (it.en.title || it.en.name)) || it.title || it.name || it.id;
    if (t) return String(t).slice(0, 80);
  }
  if (typeof it === "string") return it.slice(0, 80);
  return "פריט " + (i + 1);
}

function renderValue(val, path, key, set) {
  if (Array.isArray(val)) return renderArray(val, path, key, set);
  if (val && typeof val === "object") return renderObject(val, path, key);
  if (typeof val === "boolean") {
    const id = "f-" + path.join("-");
    const cb = h("input", { type: "checkbox", id, checked: val || null, onchange: e => set(e.target.checked) });
    return h("div", { class: "check" }, cb, h("label", { for: id, style: "margin:0" }, label(key)));
  }
  if (typeof val === "number") {
    const id = "f-" + path.join("-");
    return h("div", {}, h("label", { for: id }, label(key)), h("input", { type: "text", inputmode: "numeric", id, value: String(val), oninput: e => set(Number(e.target.value) || 0) }));
  }
  return renderString(val ?? "", path, key, set);
}

function langDir(path) { return path.includes("en") ? "ltr" : path.includes("he") ? "rtl" : "auto"; }

function renderString(val, path, key, set) {
  const id = "f-" + path.join("-");
  const wrap = h("div");
  const lbl = typeof key === "number" ? null : h("label", { for: id }, label(key));
  if (isMediaPath(key, val) || (typeof key === "string" && MEDIA_KEY.test(key))) {
    const inp = h("input", { type: "text", id, value: val, dir: "ltr", placeholder: "קישור לקובץ או העלאה", oninput: e => { set(e.target.value); prev(); } });
    const pv = h("span");
    const prev = () => { const v = inp.value.trim(); pv.replaceChildren(!v ? "" : /\.(mp4|webm)(\?|$)/i.test(v) ? h("video", { src: siteUrl(v), muted: true, preload: "metadata" }) : /\.pdf(\?|$)/i.test(v) ? h("a", { href: siteUrl(v), target: "_blank" }, "PDF") : h("img", { src: siteUrl(v), alt: "" })); };
    prev();
    const up = uploadButton(url => { inp.value = url; set(url); prev(); inp.dispatchEvent(new Event("input", { bubbles: true })); });
    wrap.append(lbl || "", h("div", { class: "media" }, pv, h("div", { style: "flex:1;min-width:200px;display:grid;gap:6px" }, inp, h("div", { class: "bar" }, up, h("button", { class: "btn sm", type: "button", onclick: () => pickFromLibrary(url => { inp.value = url; set(url); prev(); inp.dispatchEvent(new Event("input", { bubbles: true })); }) }, "בחירה מהספרייה")))));
    return wrap;
  }
  const long = val.length > 70 || val.includes("\n") || LONG_KEY.test(String(key));
  const inp = long ? h("textarea", { id, dir: langDir(path), rows: Math.min(18, Math.max(3, Math.ceil(val.length / 90) + (val.match(/\n/g) || []).length)) }) : h("input", { type: "text", id, dir: langDir(path) });
  inp.value = val;
  inp.addEventListener("input", e => set(e.target.value));
  if (key === "id") wrap.append(lbl, inp, h("p", { class: "help" }, "שינוי המזהה משנה את כתובת העמוד. אם קישרתם אליו ממקום אחר, עדכנו גם שם."));
  else wrap.append(lbl || "", inp);
  return wrap;
}

function renderObject(obj, path, key) {
  const box = path.length ? h("fieldset", {}, h("legend", {}, label(key))) : h("div");
  const keys = Object.keys(obj);
  const field = k => renderValue(obj[k], [...path, k], k, v => { obj[k] = v; });
  const rest = keys.filter(k => k !== "en" && k !== "he");
  rest.filter(k => typeof obj[k] !== "object" || obj[k] === null).forEach(k => box.append(field(k)));
  if (keys.includes("en") && keys.includes("he")) box.append(h("div", { class: "bi" }, h("div", { dir: "rtl" }, field("he")), h("div", { dir: "ltr" }, field("en"))));
  else ["en", "he"].filter(k => keys.includes(k)).forEach(k => box.append(field(k)));
  rest.filter(k => obj[k] && typeof obj[k] === "object").forEach(k => box.append(field(k)));
  return box;
}

function renderArray(arr, path, key, set) {
  const box = h("fieldset", {}, h("legend", {}, (typeof key === "number" ? "" : label(key)) + " (" + arr.length + ")"));
  const list = h("div");
  const rerender = openIdx => { const n = renderArray(arr, path, key, set); box.replaceWith(n); n.dispatchEvent(new Event("input", { bubbles: true }));
    if (openIdx != null) { const d = n.querySelectorAll(":scope > div > details.item")[openIdx]; if (d) { d.open = true; d.scrollIntoView({ block: "center" }); const f = d.querySelector("input,textarea"); if (f) f.focus(); } } };
  arr.forEach((it, i) => {
    const ctrls = h("span", { class: "bar", onclick: e => e.stopPropagation() },
      h("button", { class: "btn sm", type: "button", "aria-label": "הזזה למעלה", disabled: i === 0 || null, onclick: e => { e.preventDefault(); [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; rerender(); } }, "↑"),
      h("button", { class: "btn sm", type: "button", "aria-label": "הזזה למטה", disabled: i === arr.length - 1 || null, onclick: e => { e.preventDefault(); [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; rerender(); } }, "↓"),
      h("button", { class: "btn sm", type: "button", onclick: e => { e.preventDefault(); const c = clone(it); if (c && typeof c === "object" && c.id) c.id = c.id + "-copy"; arr.splice(i + 1, 0, c); rerender(i + 1); } }, "שכפול"),
      h("button", { class: "btn sm danger", type: "button", onclick: e => { e.preventDefault(); if (confirm("למחוק את \"" + itemTitle(it, i) + "\"?")) { arr.splice(i, 1); rerender(); } } }, "מחיקה"));
    if (it && typeof it === "object") {
      const d = h("details", { class: "item" }, h("summary", {}, h("span", {}, itemTitle(it, i)), ctrls));
      const inner = h("div", { class: "in" });
      d.addEventListener("toggle", () => { if (d.open && !inner.firstChild) inner.append(renderValue(it, [...path, i], i, v => { arr[i] = v; })); }, { once: false });
      d.append(inner);
      list.append(d);
    } else {
      const row = h("div", { class: "bar", style: "align-items:flex-start;margin:6px 0" }, h("div", { style: "flex:1;min-width:220px" }, renderValue(it, [...path, i], MEDIA_KEY.test(String(key)) ? key : i, v => { arr[i] = v; })), ctrls);
      list.append(row);
    }
  });
  box.append(list);
  box.append(h("button", { class: "btn sm", type: "button", style: "margin-top:8px", onclick: () => {
    const tpl = path.length === 0 && current === "pages" ? PAGE_TEMPLATE() : arr.length ? blank(arr[0]) : "";
    arr.push(tpl); rerender(arr.length - 1);
  } }, "+ הוספת פריט"));
  return box;
}

/* ---------- media ---------- */
function safeName(n) { const m = n.match(/\.([a-z0-9]+)$/i); const ext = m ? m[1].toLowerCase() : "bin"; return Date.now().toString(36) + "-" + n.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) + "." + ext; }
async function uploadFile(file) {
  if (file.size > 50 * 1024 * 1024) throw new Error("הקובץ גדול מ־50MB. דחסו אותו ונסו שוב.");
  const path = safeName(file.name || "file");
  const { error } = await sb.storage.from("media").upload(path, file, { cacheControl: "31536000", contentType: file.type || undefined });
  if (error) throw error;
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}
function uploadButton(onDone, accept = "image/*,video/mp4,video/webm,application/pdf") {
  const inp = h("input", { type: "file", accept, hidden: true });
  const b = h("button", { class: "btn sm", type: "button", onclick: () => inp.click() }, "העלאת קובץ");
  inp.addEventListener("change", async () => {
    const f = inp.files[0]; if (!f) return;
    b.disabled = true; b.textContent = "מעלה…";
    try { onDone(await uploadFile(f)); b.textContent = "הועלה ✓"; }
    catch (e) { alert(errText(e)); b.textContent = "העלאת קובץ"; }
    b.disabled = false; inp.value = "";
  });
  return h("span", {}, b, inp);
}
async function listMedia() {
  const { data, error } = await sb.storage.from("media").list("", { limit: 500, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  return data.filter(f => f.id).map(f => ({ name: f.name, url: sb.storage.from("media").getPublicUrl(f.name).data.publicUrl, size: f.metadata && f.metadata.size }));
}
function thumb(url) { return /\.(mp4|webm)(\?|$)/i.test(url) ? h("video", { src: url, muted: true, preload: "metadata" }) : /\.pdf(\?|$)/i.test(url) ? h("div", { style: "height:110px;display:grid;place-items:center;background:var(--sunk)" }, "PDF") : h("img", { src: url, alt: "", loading: "lazy" }); }
async function pickFromLibrary(onPick) {
  const dlg = h("dialog", { style: "max-width:900px;width:92vw;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);padding:18px" });
  dlg.append(h("div", { class: "bar", style: "justify-content:space-between" }, h("h2", {}, "בחירה מספריית המדיה"), h("button", { class: "btn sm", type: "button", onclick: () => dlg.close() }, "סגירה")));
  const grid = h("div", { class: "grid" }, "טוען…"); dlg.append(grid);
  root.append(dlg); dlg.addEventListener("close", () => dlg.remove()); dlg.showModal();
  try {
    const files = await listMedia();
    grid.replaceChildren(...(files.length ? files.map(f => h("figure", {}, thumb(f.url), h("figcaption", {}, f.name, h("button", { class: "btn sm pri", type: "button", onclick: () => { onPick(f.url); dlg.close(); } }, "בחירה")))) : [h("p", { class: "muted" }, "הספרייה ריקה. העלו קבצים בלשונית ״ספריית מדיה״ או ישירות בשדה.")]));
  } catch (e) { grid.replaceChildren(errText(e)); }
}
async function mediaTab(body) {
  const card = h("div", { class: "card" }, h("h1", {}, "ספריית מדיה"), h("p", { class: "muted" }, "תמונות, סרטונים וקבצי PDF שהועלו לאתר. עד 50MB לקובץ. מומלץ לדחוס סרטונים ל־MP4 ברזולוציה של עד 1280 פיקסלים."));
  const grid = h("div", { class: "grid", style: "margin-top:14px" }, "טוען…");
  card.append(h("div", { class: "bar" }, uploadButton(() => mediaTab(body.replaceChildren() || body))), grid);
  body.replaceChildren(card);
  try {
    const files = await listMedia();
    grid.replaceChildren(...(files.length ? files.map(f => h("figure", {}, thumb(f.url), h("figcaption", {}, h("span", { dir: "ltr" }, f.name), h("span", { class: "bar" },
      h("button", { class: "btn sm", type: "button", onclick: e => { navigator.clipboard && navigator.clipboard.writeText(f.url); e.target.textContent = "הועתק"; } }, "העתקת קישור"),
      h("button", { class: "btn sm danger", type: "button", onclick: async () => { if (!confirm("למחוק את הקובץ? אם הוא מופיע באתר, הוא יפסיק להופיע.")) return; const { error } = await sb.storage.from("media").remove([f.name]); if (error) alert(errText(error)); else mediaTab(body); } }, "מחיקה"))))) : [h("p", { class: "muted" }, "עדיין לא הועלו קבצים.")]));
  } catch (e) { grid.replaceChildren(errText(e)); }
}

function mediaSlotsEditor(form) {
  if (!work || Array.isArray(work) || typeof work !== "object") work = {};
  const NAMES = { "hero-situation-room": "דף הבית – רקע עליון", "clients-world-map": "דף הבית – מפת לקוחות", "stage-a-assessment": "מתודולוגיה – שלב א׳", "stage-b-integration": "מתודולוגיה – שלב ב׳", "stage-c-readiness": "מתודולוגיה – שלב ג׳", "post-grid-attack": "פוסט – מתקפה על רשת החשמל", "bg-about": "רקע כותרת – אודות", "bg-projects": "רקע כותרת – פרויקטים", "bg-updates": "רקע כותרת – עדכונים", "bg-contact": "רקע כותרת – צור קשר", "project-mci": "פרויקט אר״ן בבית חולים" };
  const names = [...new Set([...(STATIC.videos || []), ...Object.keys(work)])];
  form.append(h("p", { class: "help" }, "לכל מקום אפשר להעלות סרטון MP4 שקט (עד 10 שניות, עד 1280 פיקסלים) ותמונת פתיחה. אם לא מעלים, נשאר הקובץ המקורי."));
  names.forEach(n => {
    const title = NAMES[n] || (n.startsWith("topic-") ? "תחום מומחיות – " + n.slice(6) : n.startsWith("threat-") ? "איומים – " + n.slice(7) : n);
    const upd = (k, url) => { work[n] = Object.assign({}, work[n], { [k]: url }); form.dispatchEvent(new Event("input", { bubbles: true })); mediaRow.replaceWith(renderRow()); };
    const renderRow = () => {
      const c = work[n] || {};
      mediaRow = h("div", { class: "bar", style: "border-bottom:1px solid var(--line);padding:10px 0;justify-content:space-between" },
        h("span", { class: "media" }, h("img", { src: siteUrl(c.poster || "images/" + n + ".jpg"), alt: "" }), h("span", {}, h("b", {}, title), h("br"), h("small", { class: "muted" }, c.video ? "סרטון הוחלף" : "סרטון מקורי"))),
        h("span", { class: "bar" }, uploadButton(u => upd("video", u), "video/mp4,video/webm"), h("span", { class: "muted", style: "font-size:12px" }, "סרטון"), uploadButton(u => upd("poster", u), "image/*"), h("span", { class: "muted", style: "font-size:12px" }, "תמונה"),
          (c.video || c.poster) ? h("button", { class: "btn sm danger", type: "button", onclick: () => { delete work[n]; form.dispatchEvent(new Event("input", { bubbles: true })); mediaRow.replaceWith(renderRow()); } }, "חזרה למקור") : null));
      return mediaRow;
    };
    let mediaRow; form.append(renderRow());
  });
}

/* ---------- users ---------- */
async function usersTab(body) {
  const card = h("div", { class: "card" }, h("h1", {}, "משתמשים והרשאות"),
    h("p", {}, "כדי לתת למישהו גישה: שלחו לו את הקישור לעמוד הניהול (הכתובת של האתר עם ", h("b", { dir: "ltr" }, "#admin"), " בסוף). אחרי שהוא נרשם עם מייל וסיסמה, הוא יופיע כאן כ״ממתין״, ואתם בוחרים לו הרשאה."),
    h("ul", { class: "muted" }, h("li", {}, "עורך: יכול לערוך את כל התוכן והמדיה."), h("li", {}, "בעלים: כמו עורך, ובנוסף מנהל משתמשים."), h("li", {}, "ממתין: אין לו גישה לעריכה.")));
  const tbl = h("table", {}, h("thead", {}, h("tr", {}, h("th", {}, "דוא״ל"), h("th", {}, "נרשם"), h("th", {}, "הרשאה"), h("th", {}, ""))));
  const tb = h("tbody"); tbl.append(tb); card.append(tbl); body.replaceChildren(card);
  const { data, error } = await sb.from("members").select("user_id,email,role,created_at").order("created_at");
  if (error) return note(card, errText(error), "err");
  data.forEach(m => {
    const sel = h("select", { "aria-label": "הרשאה עבור " + m.email }, [["pending", "ממתין"], ["editor", "עורך"], ["owner", "בעלים"]].map(([v, t]) => h("option", { value: v, selected: m.role === v || null }, t)));
    sel.addEventListener("change", async () => { const { error } = await sb.from("members").update({ role: sel.value }).eq("user_id", m.user_id); if (error) { note(card, /last owner/.test(error.message) ? "חייב להישאר לפחות בעלים אחד." : errText(error), "err"); sel.value = m.role; } else { m.role = sel.value; note(card, "ההרשאה של " + m.email + " עודכנה.", "ok"); } });
    tb.append(h("tr", {}, h("td", { dir: "ltr", style: "text-align:end" }, m.email), h("td", {}, new Date(m.created_at).toLocaleDateString("he-IL")), h("td", {}, m.user_id === (me && me.user_id) ? h("b", {}, "בעלים (את/ה)") : sel),
      h("td", {}, m.user_id === (me && me.user_id) ? "" : h("button", { class: "btn sm danger", type: "button", onclick: async () => { if (!confirm("להסיר את הגישה של " + m.email + "?")) return; const { error } = await sb.from("members").delete().eq("user_id", m.user_id); if (error) note(card, errText(error), "err"); else usersTab(body); } }, "הסרה"))));
  });
}

/* ---------- account ---------- */
function accountTab(body) {
  const pass = h("input", { type: "password", id: "np", autocomplete: "new-password", dir: "ltr" });
  const card = h("div", { class: "card", style: "max-width:520px" }, h("h1", {}, "החשבון שלי"), h("p", {}, "מחובר/ת כ־", h("b", { dir: "ltr" }, me.email), " · הרשאה: ", me.role === "owner" ? "בעלים" : "עורך"),
    h("label", { for: "np" }, "סיסמה חדשה (לפחות 8 תווים)"), pass,
    h("div", { class: "bar", style: "margin-top:12px" },
      h("button", { class: "btn pri", type: "button", onclick: async () => { if (pass.value.length < 8) return note(card, "הסיסמה צריכה להכיל לפחות 8 תווים.", "err"); const { error } = await sb.auth.updateUser({ password: pass.value }); if (error) note(card, errText(error), "err"); else { pass.value = ""; note(card, "הסיסמה עודכנה.", "ok"); } } }, "עדכון סיסמה"),
      h("button", { class: "btn", type: "button", onclick: signOut }, "התנתקות")));
  body.replaceChildren(card);
}

/* ---------- start ---------- */
sb.auth.onAuthStateChange(ev => { if (ev === "PASSWORD_RECOVERY") setTimeout(() => authView("recover"), 0); });
if (/type=recovery/.test(location.hash)) authView("recover");
else boot().catch(e => { root.replaceChildren(h("div", { class: "auth card" }, h("h1", {}, "לא ניתן להתחבר לשרת הניהול"), h("p", {}, errText(e)), h("a", { class: "btn", href: "#he.home" }, "חזרה לאתר"))); });
