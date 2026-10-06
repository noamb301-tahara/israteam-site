/* IsraTeam site admin panel. Loaded only on #admin. Content lives in Supabase table site_sections
   (one row per top-level key of window.SITE); anything without a row falls back to content.js.
   The editor is organised like the site itself: page by page, section by section, with each
   section titled by the heading visitors actually see. */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/+esm";

const { S, STATIC, CMS } = window.ISRA;
const HE = window.ISRA.HE_ON !== false; /* Hebrew fields are hidden while the site runs in English only */
const fill = window.fillMissing || (v => v);
const sb = createClient(CMS.url, CMS.key, { auth: { persistSession: true, detectSessionInUrl: true } });

/* Friendly names for each stored block, used in the save bar and the Advanced tab. */
const KEY_NAMES = {
  home: "Home page texts", about: "About page", team: "Management team", expertise: "Expertise topics", method: "Methodology",
  threats: "Threats we prepare for", clients: "Clients", projects: "Projects", updates: "Updates & events", posts: "LinkedIn posts",
  articlesFull: "Articles", pages: "Extra pages", contact: "Contact details", contactPage: "Contact page", ui: "Menu, buttons & footer",
  mediaSlots: "Background videos & images", covers: "Carousel cover texts", privacy: "Privacy policy", terms: "Terms of use",
  accessibility: "Accessibility statement", aboutMore: "About: vision and goals"
};
const LABELS = {
  title: "Title", subtitle: "Subtitle", sub: "Subtitle", text: "Text", body: "Page text", intro: "Intro", lead: "Intro", name: "Name",
  role: "Role", date: "Date", place: "Place", image: "Image", images: "Images", video: "Video", poster: "Still image (shown before the video plays)",
  id: "Page address (English letters, used in the link)", en: "Text", he: "Hebrew", items: "Items", inNav: "Show in the main menu",
  url: "Link", link: "Link", links: "Links", pdf: "PDF file", email: "Email", phone: "Phone", tag: "Tag", tags: "Tags",
  updated: "Last updated (date)", eyebrow: "Small line above the heading", lede: "Intro", short: "Short title (used on the Home page card)",
  teaser: "One-line summary", client: "Client", initials: "Initials (in the round badge)", note: "Note", q: "Question", a: "Answer",
  icon: "Icon", label: "Label", event: "Linked event", article: "Linked article", author: "Author", videos: "Video links", kind: "Type",
  caption: "Caption", alt: "Image description (for accessibility)"
};
const MEDIA_KEY = /^(image|images|img|photo|photos|logo|cover|poster|video|src|pdf|file|thumb|background)$/i;
const MEDIA_VAL = /\.(jpe?g|png|webp|gif|svg|mp4|webm|pdf)(\?.*)?$/i;
const LONG_KEY = /^(body|text|intro|lead|lede|summary|quote|note|desc|description|about|a|global|mgmtIntro|teaser)$/i;

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
const fmtDate = d => new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/* ---------- shell ---------- */
const css = `
#adm{position:fixed;inset:0;z-index:200;background:var(--ground);color:var(--ink);overflow:auto;font-family:var(--body,system-ui),system-ui,sans-serif;font-size:15px;direction:ltr;text-align:left}
#adm *{box-sizing:border-box}
#adm .top{position:sticky;top:0;z-index:6;display:flex;gap:12px;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--deep);color:var(--deep-ink)}
#adm .top b{font-size:17px}#adm .top a,#adm .top button{color:var(--deep-ink)}
#adm .tabs{display:flex;gap:6px;flex-wrap:wrap}
#adm .tabs button{background:none;border:1px solid var(--deep-line);color:var(--deep-ink);padding:7px 12px;border-radius:4px;cursor:pointer;font:inherit}
#adm .tabs button[aria-current="page"]{background:var(--deep-ink);color:var(--deep)}
#adm .wrapa{max-width:1180px;margin:0 auto;padding:22px 20px 110px}
#adm .cols{display:grid;grid-template-columns:230px 1fr;gap:24px;align-items:start}
#adm nav.secs{display:grid;gap:4px;position:sticky;top:70px}
#adm nav.secs .grp{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2);margin:12px 4px 2px}
#adm nav.secs button{text-align:left;background:var(--surface);border:1px solid var(--line);color:var(--ink);padding:9px 12px;border-radius:4px;cursor:pointer;font:inherit;display:flex;justify-content:space-between;gap:6px;align-items:center}
#adm nav.secs button[aria-current="true"]{border-color:var(--teal);box-shadow:inset 3px 0 0 var(--teal);font-weight:600}
#adm nav.secs button i{font-style:normal;width:8px;height:8px;border-radius:50%;background:var(--signal);flex:none}
#adm .card{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:18px}
#adm h1{font-size:24px;margin:0 0 6px}#adm h2{font-size:19px;margin:0 0 10px}
#adm .muted{color:var(--ink-2)}
#adm label{display:block;font-weight:600;font-size:13.5px;margin:12px 0 4px}
#adm input[type=text],#adm input[type=email],#adm input[type=password],#adm textarea,#adm select{width:100%;padding:9px 10px;border:1px solid var(--line);border-radius:4px;background:var(--ground);color:var(--ink);font:inherit}
#adm textarea{min-height:70px;resize:vertical;line-height:1.5}
#adm input:focus,#adm textarea:focus,#adm select:focus,#adm button:focus-visible,#adm summary:focus-visible{outline:3px solid var(--signal);outline-offset:1px}
#adm .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font:inherit;font-weight:600;text-decoration:none}
#adm .btn.pri{background:var(--signal);border-color:var(--signal);color:var(--signal-ink)}
#adm .btn.sm{padding:4px 9px;font-size:13px;font-weight:500}
#adm .btn.danger{color:#B3261E;border-color:#B3261E}
#adm .btn:disabled{opacity:.5;cursor:not-allowed}
#adm .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#adm .savebar{position:fixed;left:0;right:0;bottom:0;z-index:7;padding:12px 20px;background:var(--surface);border-top:2px solid var(--signal);display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:center;box-shadow:0 -6px 18px rgba(0,0,0,.12)}
#adm .savebar[hidden]{display:none}
#adm fieldset{border:1px solid var(--line);border-radius:6px;padding:10px 14px 14px;margin:12px 0;min-width:0}
#adm legend{font-weight:700;padding:0 6px;font-size:14px}
#adm details.item{border:1px solid var(--line);border-radius:6px;margin:8px 0;background:var(--ground)}
#adm details.item>summary{cursor:pointer;padding:10px 12px;display:flex;gap:8px;align-items:center;justify-content:space-between;font-weight:600}
#adm details.item>.in{padding:0 12px 12px}
#adm details.sec{border:1px solid var(--line);border-radius:6px;background:var(--surface);margin:0 0 12px}
#adm details.sec>summary{cursor:pointer;padding:14px 16px;list-style:none;display:grid;gap:2px}
#adm details.sec>summary::-webkit-details-marker{display:none}
#adm details.sec>summary .where{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2)}
#adm details.sec>summary .hd{font-size:19px;font-weight:700;display:flex;justify-content:space-between;gap:10px}
#adm details.sec>summary .hd::after{content:"+";color:var(--ink-2);font-weight:400}
#adm details.sec[open]>summary .hd::after{content:"–"}
#adm details.sec>.in{padding:0 16px 16px;border-top:1px solid var(--line)}
#adm .also{display:inline-block;margin-top:10px;padding:4px 9px;border-radius:4px;background:var(--sunk);font-size:12.5px}
#adm .media{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#adm .media img,#adm .media video{width:140px;height:80px;object-fit:cover;border-radius:4px;background:var(--sunk);border:1px solid var(--line)}
#adm .slot{border:1px dashed var(--line);border-radius:6px;padding:10px 12px;margin:12px 0}
#adm .msg{padding:10px 12px;border-radius:4px;margin:10px 0;background:var(--sunk)}
#adm .msg.ok{background:color-mix(in srgb,var(--wa) 18%,transparent)}
#adm .msg.err{background:color-mix(in srgb,#B3261E 16%,transparent)}
#adm table{width:100%;border-collapse:collapse}#adm td,#adm th{padding:8px;border-bottom:1px solid var(--line);text-align:left}
#adm .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
#adm .grid figure{margin:0;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:var(--surface)}
#adm .grid img,#adm .grid video{width:100%;height:110px;object-fit:cover;display:block;background:var(--sunk)}
#adm .grid figcaption{padding:6px 8px;font-size:12px;word-break:break-all;display:grid;gap:6px}
#adm .auth{max-width:420px;margin:40px auto}
#adm .help{font-size:12.5px;color:var(--ink-2);margin-top:4px}
#adm .check{display:flex;gap:8px;align-items:center;font-weight:600;margin:12px 0}
#adm .pairs .row{display:grid;grid-template-columns:110px 1fr auto;gap:8px;align-items:center;margin:6px 0}
@media(max-width:820px){#adm .cols{grid-template-columns:1fr}#adm nav.secs{position:static;display:flex;overflow-x:auto;gap:6px;padding-bottom:6px}#adm nav.secs .grp{display:none}#adm nav.secs button{white-space:nowrap;flex:none}#adm .top{flex-wrap:wrap;padding:10px 14px}#adm .top .tabs{order:3;width:100%}#adm .tabs button{padding:6px 9px;font-size:13.5px}#adm .wrapa{padding:16px 12px 120px}#adm .pairs .row{grid-template-columns:80px 1fr}#adm .pairs .row .bar{grid-column:1/-1}}

html.editing #main [data-e]{outline:1px dashed color-mix(in srgb,var(--signal) 60%,transparent);outline-offset:2px;cursor:text;border-radius:2px;min-width:1.5em}
html.editing #main [data-e]:hover{outline-style:solid}
html.editing #main [data-e]:focus{outline:2px solid var(--signal);background:color-mix(in srgb,var(--signal) 10%,transparent)}
html.editing #main [data-e][data-md]{cursor:pointer}
html.editing #main [data-e]:empty::before{content:"Click to type";opacity:.5;font-style:italic}
html.editing #main [data-li],html.editing #main [data-img]{cursor:pointer}
html.editing #main .ve-sel{outline:3px solid var(--teal)!important;outline-offset:3px}
html.editing #main{padding-bottom:110px}
html.editing #wa,html.editing .a11yb,html.editing #editbtn{display:none!important}
#adm.ve{position:static;inset:auto;background:none;overflow:visible;z-index:auto;font-size:15px}
#adm .vebar{position:fixed;left:0;right:0;bottom:0;z-index:250;padding:10px 16px;background:var(--surface);color:var(--ink);border-top:3px solid var(--signal);display:flex;gap:10px 16px;flex-wrap:wrap;align-items:center;justify-content:space-between;box-shadow:0 -6px 18px rgba(0,0,0,.15)}
#adm .vebar .velbl{display:grid;gap:2px}
#adm .vesave{display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap}#adm .vesave[hidden]{display:none}
#adm .vesave [role=status]{font-size:12.5px;color:var(--ink-2);max-width:260px}
#adm .vemsg{position:fixed;left:50%;transform:translateX(-50%);bottom:84px;z-index:255;width:min(560px,92vw)}
#adm .vetb{position:fixed;z-index:240;display:flex;flex-wrap:wrap;gap:4px;align-items:center;max-width:calc(100vw - 16px);background:var(--deep);color:var(--deep-ink);padding:5px;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,.3)}
#adm .vetb[hidden]{display:none}
#adm .vetb .tbl{font-size:12px;padding:0 6px;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--deep-ink)}
#adm .vetb .btn{background:var(--surface);color:var(--ink);border-color:transparent}
#adm .vetb .btn.danger{color:#B3261E}
#adm .vedrawer{position:fixed;top:0;right:0;bottom:0;width:min(480px,100vw);z-index:260;background:var(--surface);color:var(--ink);overflow:auto;box-shadow:-8px 0 24px rgba(0,0,0,.2);padding:16px 16px 120px;border-left:1px solid var(--line)}
#adm .vedrawer[hidden]{display:none}
@media(max-width:700px){#adm .vebar .velbl{display:none}#adm .vebar{padding:8px 10px}#adm .vebar>.bar,#adm .vesave{flex-wrap:nowrap}#adm .vebar>.bar{overflow-x:auto;width:100%}#adm .vesave [role=status]{display:none}#adm .vebar .btn{padding:7px 10px;font-size:13.5px;white-space:nowrap;flex:none}#adm .vetb .tbl{display:none}#adm .vemsg{bottom:64px}#adm .vedrawer{top:auto;height:78vh;border-left:0;border-top:3px solid var(--signal);border-radius:12px 12px 0 0}}
`;
document.head.append(h("style", { html: css }));
const root = h("div", { id: "adm", role: "main", dir: "ltr", lang: "en" });
document.body.append(root);
const siteEls = ["header.top", "#main", "#footer", "#wa", "#a11yb", "#skip"].map(s => document.querySelector(s)).filter(Boolean);
function show() { if (editing) leaveEdit(); root.hidden = false; siteEls.forEach(e => e.hidden = true); if (me && me.role !== "pending" && !root.querySelector(".wrapa")) frame(); document.documentElement.lang = "en"; document.documentElement.dir = "ltr"; document.title = "Site admin · IsraTeam"; }
function hide() { if (!editing) root.hidden = true; siteEls.forEach(e => e.hidden = false); }
window.ISRA_ADMIN = { show, hide, edit: r => enterEdit(r), afterRender: r => afterRender(r) };
let editing = false;
let me = null, tab = "content", pageId = "home";
show();
/* Working copies of every stored block, the saved version of each, and who saved it last. */
const W = {}, ORIG = {}, META = {};
const dirtyKeys = () => Object.keys(W).filter(k => JSON.stringify(W[k]) !== ORIG[k]);
window.addEventListener("beforeunload", e => { if (dirtyKeys().length) { e.preventDefault(); e.returnValue = ""; } });

function note(parent, text, kind) { const m = h("div", { class: "msg " + (kind || ""), role: kind === "err" ? "alert" : "status" }, text); parent.prepend(m); if (kind === "ok") setTimeout(() => m.remove(), 4000); return m; }
function errText(e) {
  const m = (e && (e.message || e.error_description)) || String(e);
  if (/Invalid login/i.test(m)) return "Wrong email or password.";
  if (/Email not confirmed/i.test(m)) return "Please confirm your email address first, using the link we sent you.";
  if (/already registered/i.test(m)) return "There is already an account with this email. Try signing in.";
  if (/Password should be/i.test(m)) return "The password needs at least 6 characters.";
  if (/rate limit/i.test(m)) return "Too many attempts. Try again in a few minutes.";
  if (/row-level security|permission/i.test(m)) return "You don't have permission to do this.";
  return m;
}

/* ---------- auth ---------- */
function authView(mode = "login", info) {
  root.replaceChildren();
  const box = h("div", { class: "auth card" });
  const titles = { login: "Sign in to the site admin", signup: "Create an account", forgot: "Forgot password", recover: "Choose a new password" };
  box.append(h("h1", {}, titles[mode]));
  if (info) note(box, info, "ok");
  const f = h("form", { novalidate: true });
  const email = h("input", { type: "email", id: "a-email", autocomplete: "email", required: true });
  const pass = h("input", { type: "password", id: "a-pass", autocomplete: mode === "login" ? "current-password" : "new-password", required: true, minlength: 8 });
  if (mode !== "recover") f.append(h("label", { for: "a-email" }, "Email"), email);
  if (mode !== "forgot") f.append(h("label", { for: "a-pass" }, mode === "login" ? "Password" : "Password (at least 8 characters)"), pass);
  if (mode === "signup") f.append(h("p", { class: "help" }, "After you sign up, the site owner has to approve your account before you can edit. Your details are used only to manage access to the site."));
  const btn = h("button", { class: "btn pri", type: "submit", style: "margin-top:16px;width:100%;justify-content:center" }, { login: "Sign in", signup: "Create account", forgot: "Send reset link", recover: "Save password" }[mode]);
  f.append(btn);
  f.addEventListener("submit", async ev => {
    ev.preventDefault(); btn.disabled = true; box.querySelectorAll(".msg").forEach(m => m.remove());
    try {
      if (mode !== "recover" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) throw new Error("Enter a valid email address.");
      if (mode !== "forgot" && mode !== "login" && pass.value.length < 8) throw new Error("The password needs at least 8 characters.");
      const back = location.origin + location.pathname + "#admin";
      if (mode === "login") { const { error } = await sb.auth.signInWithPassword({ email: email.value.trim(), password: pass.value }); if (error) throw error; await boot(); }
      else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email: email.value.trim(), password: pass.value, options: { emailRedirectTo: back } }); if (error) throw error;
        if (data.session) await boot(); else authView("login", "We sent you an email to confirm your address. After confirming, sign in here.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email.value.trim(), { redirectTo: back }); if (error) throw error;
        note(box, "If this address is registered, a reset link is on its way.", "ok");
      } else if (mode === "recover") {
        const { error } = await sb.auth.updateUser({ password: pass.value }); if (error) throw error;
        history.replaceState(null, "", "#admin"); await boot("Password updated.");
      }
    } catch (e) { note(box, errText(e), "err"); }
    btn.disabled = false;
  });
  box.append(f);
  const links = h("p", { class: "bar", style: "margin-top:14px;justify-content:space-between" });
  if (mode !== "login") links.append(h("button", { class: "btn sm", type: "button", onclick: () => authView("login") }, "I already have an account"));
  if (mode === "login") links.append(h("button", { class: "btn sm", type: "button", onclick: () => authView("signup") }, "Create account"), h("button", { class: "btn sm", type: "button", onclick: () => authView("forgot") }, "Forgot password"));
  links.append(h("a", { class: "btn sm", href: "#home" }, "Back to the site"));
  box.append(links);
  root.append(box);
  (mode === "recover" ? pass : email).focus();
}

async function boot(info) {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return authView("login", info);
  const { data, error } = await sb.from("members").select("user_id,email,role").eq("user_id", session.user.id).maybeSingle();
  if (error && /fetch|network|Failed/i.test(error.message || "")) throw new Error("Can't reach the admin server. The admin only works on the site's own address.");
  me = data || { email: session.user.email, role: "pending" };
  if (error || me.role === "pending") {
    root.replaceChildren(h("div", { class: "auth card" }, h("h1", {}, "Your account is waiting for approval"),
      h("p", {}, "You signed up as ", h("b", {}, me.email), ". The site owner needs to approve you in the Users tab. After that, refresh this page."),
      h("p", { class: "bar" }, h("button", { class: "btn", onclick: () => boot() }, "Check again"), h("button", { class: "btn", onclick: signOut }, "Sign out"), h("a", { class: "btn", href: "#home" }, "Back to the site"))));
    return;
  }
  await loadAll();
  const r = window.ISRA.editRoute; window.ISRA.editRoute = null;
  if (r !== undefined && r !== null) return enterEdit(r);
  if (!info && /^#admin$/.test(location.hash)) return enterEdit("home"); /* the editor opens on the site itself; "Admin tools" leads here */
  frame(info);
}
async function signOut() { await sb.auth.signOut(); me = null; authView("login"); }

/* Load every stored block once, so a heading edited in one place updates everywhere it appears. */
async function loadAll() {
  const { data, error } = await sb.from("site_sections").select("key,data,updated_at,updated_by");
  if (error) throw error;
  const rows = Object.fromEntries((data || []).map(r => [r.key, r]));
  const keys = new Set([...Object.keys(KEY_NAMES), ...Object.keys(rows)].filter(k => k !== "videos" && (rows[k] || STATIC[k] !== undefined || k === "mediaSlots" || k === "pages")));
  for (const k of keys) {
    const r = rows[k];
    const def = STATIC[k] ?? (k === "pages" ? [] : {});
    W[k] = r ? fill(clone(r.data), def) : clone(def);
    ORIG[k] = JSON.stringify(W[k]);
    META[k] = r ? { at: r.updated_at, by: r.updated_by } : null;
  }
  if (!W.mediaSlots || Array.isArray(W.mediaSlots)) { W.mediaSlots = {}; ORIG.mediaSlots = "{}"; }
}

/* ---------- main frame ---------- */
let saveBar = null;
function frame(info) {
  root.replaceChildren();
  const tabs = [["content", "Edit the site"], ["media", "Media library"], ["advanced", "Advanced"], ...(me.role === "owner" ? [["users", "Users"]] : []), ["account", "My account"]];
  const top = h("div", { class: "top" },
    h("b", {}, "IsraTeam · Site admin"),
    h("div", { class: "tabs", role: "navigation", "aria-label": "Admin tabs" }, tabs.map(([k, t]) => h("button", { type: "button", "aria-current": tab === k ? "page" : null, onclick: () => { tab = k; frame(); } }, t))),
    h("div", { class: "bar" }, h("button", { class: "btn sm pri", type: "button", onclick: () => enterEdit(((pagesList().find(p => p.id === pageId) || {}).route) || "home") }, "✎ Edit on the page"), h("span", { class: "muted", style: "color:var(--deep-2);font-size:13px" }, me.email), h("a", { href: "#home", target: "_blank", rel: "noopener" }, "View site ↗")));
  const body = h("div", { class: "wrapa" });
  saveBar = buildSaveBar();
  root.append(top, body, saveBar);
  if (info) note(body, info, "ok");
  ({ content: contentTab, media: mediaTab, advanced: advancedTab, users: usersTab, account: accountTab })[tab](body);
  refreshDirty();
}

/* ---------- save bar (shared by every page) ---------- */
function buildSaveBar() {
  const status = h("span", { role: "status" });
  const saveBtn = h("button", { class: "btn pri", type: "button", onclick: () => saveAll(saveBtn) }, "Save & publish");
  const undo = h("button", { class: "btn", type: "button", onclick: () => { if (!confirm("Discard all unsaved changes?")) return; for (const k of dirtyKeys()) { W[k] = JSON.parse(ORIG[k]); if (editing) S[k] = W[k]; } if (editing) { undoStack.length = 0; closeDrawer(); window.ISRA.rerender(); refreshDirty(); } else frame(); } }, "Discard changes");
  const bar = h("div", { class: "savebar", hidden: true }, status, saveBtn, undo);
  bar.status = status;
  return bar;
}
let dirtyT = 0;
function refreshDirty() {
  const d = dirtyKeys();
  if (!saveBar) return;
  saveBar.hidden = !d.length;
  saveBar.status.textContent = d.length ? (editing ? "Unsaved: " : "Unsaved changes: ") + d.map(k => KEY_NAMES[k] || k).join(", ") : "";
  document.querySelectorAll("#adm nav.secs button[data-keys]").forEach(b => { const ks = b.dataset.keys.split(","); const on = ks.some(k => d.includes(k)); const dot = b.querySelector("i"); if (on && !dot) b.append(h("i", { title: "Unsaved changes" })); if (!on && dot) dot.remove(); });
  document.querySelectorAll("#adm [data-head]").forEach(el => { try { el.textContent = el.headFn() || "(no heading)"; } catch (e) {} });
}
root.addEventListener("input", () => { clearTimeout(dirtyT); dirtyT = setTimeout(refreshDirty, 120); });
root.addEventListener("click", () => { clearTimeout(dirtyT); dirtyT = setTimeout(refreshDirty, 120); });

async function saveAll(btn) {
  const keys = dirtyKeys(); if (!keys.length) return;
  for (const k of keys) { const bad = findDupIds(W[k]); if (bad) return alert("Two items in “" + (KEY_NAMES[k] || k) + "” have the same page address: " + bad + ". Change one of them."); }
  btn.disabled = true; saveBar.status.textContent = "Saving…";
  /* Warn before overwriting something another editor saved after this page was opened. */
  const { data: now } = await sb.from("site_sections").select("key,updated_at,updated_by").in("key", keys);
  const clash = (now || []).filter(r => r.updated_by && r.updated_by !== me.email && (!META[r.key] || r.updated_at !== META[r.key].at));
  if (clash.length && !confirm(clash.map(r => r.updated_by + " saved “" + (KEY_NAMES[r.key] || r.key) + "” at " + fmtDate(r.updated_at)).join("\n") + "\n\nSaving now will replace their version of that part. Continue?")) { btn.disabled = false; refreshDirty(); return; }
  const failed = [];
  for (const k of keys) {
    const { data, error } = await sb.from("site_sections").upsert({ key: k, data: W[k] }).select("updated_at,updated_by").maybeSingle();
    if (error) { failed.push((KEY_NAMES[k] || k) + ": " + errText(error)); continue; }
    ORIG[k] = JSON.stringify(W[k]); S[k] = editing ? W[k] : clone(W[k]);
    META[k] = data ? { at: data.updated_at, by: data.updated_by } : META[k];
  }
  btn.disabled = false; refreshDirty();
  const body = root.querySelector(".wrapa") || root.querySelector(".vemsg");
  if (failed.length) note(body, "Some changes were not saved. " + failed.join(" · "), "err");
  else note(body, editing ? "Saved. The changes are live on the site now." : "Saved. The changes are live on the site now (refresh the site tab to see them).", "ok");
  if (!editing) body.scrollIntoView({ block: "start" });
}

function findDupIds(v) {
  let bad = null;
  (function walk(x) {
    if (Array.isArray(x)) { const seen = new Set(); x.forEach(i => { if (i && typeof i === "object" && i.id) { if (seen.has(i.id)) bad = i.id; seen.add(i.id); } walk(i); }); }
    else if (x && typeof x === "object") Object.values(x).forEach(walk);
  })(v);
  return bad;
}

/* ---------- path helpers ---------- */
function getP(k, p) { let o = W[k]; for (const s of p) { if (o == null) return undefined; o = o[s]; } return o; }
function setP(k, p, v) {
  if (!p.length) { W[k] = v; return; }
  if (W[k] == null || typeof W[k] !== "object") W[k] = {};
  let o = W[k];
  for (let i = 0; i < p.length - 1; i++) { if (o[p[i]] == null || typeof o[p[i]] !== "object") o[p[i]] = typeof p[i + 1] === "number" ? [] : {}; o = o[p[i]]; }
  o[p[p.length - 1]] = v;
}
const E = k => (W[k] && W[k].en) || {};
const UI = () => E("ui");

/* ---------- page map: what visitors see, top to bottom ---------- */
/* A field is F(block, path, label, type, help); types: text, long, md, list, items, pairs, object. M(name, label) is a background video slot. */
const F = (k, p, lbl, type, help) => ({ k, p, lbl, type, help });
const M = (name, lbl, help) => ({ slot: name, lbl, help });
const MD_HELP = "Formatting: a line starting with ## is a sub-heading, ### a smaller one, “- ” a bullet, “1. ” a numbered item, **text** is bold. An empty line starts a new paragraph.";
const TOPIC_VIDS = { "national-civil-defense": "topic-civil-defense", population: "topic-population", "mass-casualty": "topic-mci", infrastructure: "topic-infrastructure", drp: "topic-drp", training: "topic-training", shelters: "topic-shelters" };

const SEC = {
  core: () => ({ head: () => E("home").coreTitle, where: "List of core areas (numbered 01–08)", also: "Shown on the Home page and the Expertise page", fields: [
    F("home", ["en", "coreEyebrow"], "Small line above the heading"), F("home", ["en", "coreTitle"], "Heading"), F("home", ["en", "core"], "Core areas", "list")] }),
  method: () => ({ head: () => E("method").title, where: "Methodology (three stages)", also: "Shown on the Home page and the Expertise page", fields: [
    F("method", ["en", "eyebrow"], "Small line above the heading"), F("method", ["en", "title"], "Heading"), F("method", ["en", "motto"], "Line next to the heading", "long"),
    F("method", ["en", "intro"], "Intro paragraph", "long"), F("method", ["en", "stages"], "The stages", "items", "Empty stages are not shown on the site."),
    F("method", ["en", "loop"], "Line under the stages (↻)", "long"), F("method", ["en", "note"], "Note at the bottom", "long"),
    F("method", ["en", "intl"], "International line", "long"), F("method", ["en", "support"], "Support line", "long"),
    F("method", ["en", "whyTitle"], "Heading of the box on the right"), F("method", ["en", "why"], "Points in the box", "list"),
    F("method", ["morePage"], "“Continue reading” button opens this page", "pagepick", "Pick one of your pages. “Automatic” picks the page whose title contains “Methodology”."),
    F("method", ["en", "moreText"], "Text on the button", "text", "Leave empty to hide the button."),
    M("stage-a-assessment", "Stage A video"), M("stage-b-integration", "Stage B video"), M("stage-c-readiness", "Stage C video")] }),
  contactBox: () => ({ head: () => E("home").contactTitle, where: "Contact box on the side of inner pages", also: "Same box on About, Expertise, Clients, Projects and other inner pages", fields: [
    F("home", ["en", "contactTitle"], "Box heading"), F("home", ["en", "contactName"], "Name"), F("home", ["en", "contactRole"], "Role"), F("ui", ["en", "contactUs"], "Button text", "text", "Leave empty to hide the button (also in the dark strip at the bottom).")] }),
  bottom: () => ({ head: () => UI().talk, where: "Dark strip at the bottom of every page", also: "Appears at the bottom of every page", fields: [
    F("ui", ["en", "talk"], "Heading (also the main button in the Home banner)"), F("ui", ["en", "contactUs"], "First button"), F("ui", ["en", "whatsapp"], "Second button (WhatsApp)"),
    { info: "The name and role under the heading come from “Box with your name” on the Home page." }] })
};

const PAGES = [
  { id: "home", group: "Pages", name: "Home", route: "home", sections: () => [
    { head: () => E("home").title, where: "Top banner (first thing visitors see)", open: true, fields: [
      F("home", ["en", "eyebrow"], "Small line above the headline", "text", "Leave empty to hide it. The same text is the subtitle of the About page."),
      F("home", ["en", "title"], "Headline"),
      F("home", ["en", "lede"], "Text under the headline", "long", "Each line becomes its own paragraph."),
      F("home", ["en", "lede2"], "Extra line in smaller text (optional)", "long"),
      F("ui", ["en", "talk"], "Main button"),
      M("hero-situation-room", "Background behind the banner", "This is the picture/video behind the headline. Replace it with a video or with a still image.")] },
    { head: () => E("home").contactName, where: "Box with your name, next to the headline", fields: [
      F("home", ["en", "contactRole"], "Role", "text", "The part before “–” is the small orange line above the name. The full role appears in the contact boxes on other pages."),
      F("home", ["en", "contactName"], "Name"),
      F("home", ["en", "dossierOrg"], "Line under the name"),
      F("home", ["en", "dossier"], "Lines under the name", "items", "Each line has a short label on the left (for example “Former” or “2007–2009”) and the text.")] },
    { head: () => "Numbers strip", where: "Strip with key numbers, under the banner", fields: [F("home", ["en", "stats"], "Numbers", "pairs")] },
    { head: () => E("home").introTitle, where: "Introduction", fields: [
      F("home", ["en", "introEyebrow"], "Small line above the heading"), F("home", ["en", "introTitle"], "Heading"), F("home", ["en", "intro"], "Paragraph", "long"),
      F("home", ["en", "whyTitle"], "Heading of the box on the right"), F("home", ["en", "why"], "Points in the box", "list")] },
    SEC.core(),
    SEC.method(),
    { head: () => E("home").expertiseTitle, where: "Expertise cards", also: "The heading is also the subtitle of the Expertise page", fields: [
      F("home", ["en", "expertiseTitle"], "Heading"),
      F("expertise", ["en", "title"], "Small line above the heading", "text", "Same text is the title of the Expertise page and its link in the footer."),
      ...(W.expertise && W.expertise.topics || []).map((t, i) => F("expertise", ["topics", i, "en", "short"], "Card " + (i + 1) + " title (" + ((t.en && t.en.title) || t.id) + ")")),
      { info: "The text on each card and its “Learn more” page are edited on the Expertise page, one section per topic." }] },
    { head: () => E("home").clientsTitle || E("home").globalTitle || "(no heading)", where: "Clients band with the world map", fields: [
      F("home", ["en", "globalTitle"], "Small line above the heading"), F("home", ["en", "clientsTitle"], "Heading"), F("home", ["en", "global"], "Paragraph", "long"),
      F("home", ["en", "regions"], "Regions (small tags)", "list"),
      F("ui", ["en", "allClients"], "Button text"),
      M("clients-world-map", "Background video (world map)"),
      { info: "The client list on the right is edited on the Clients page, under Featured clients." }] },
    { head: () => E("home").updatesTitle, where: "Updates carousel", fields: [
      F("home", ["en", "updatesEyebrow"], "Small line above the heading"), F("home", ["en", "updatesTitle"], "Heading"),
      { info: "The cards come from LinkedIn posts, events, projects and PDF articles. Edit them on those pages." }] },
    SEC.bottom()
  ] },
  { id: "about", group: "Pages", name: "About", route: "about", sections: () => [
    { head: () => E("about").title, where: "Page banner", open: true, fields: [
      F("about", ["en", "title"], "Page title", "text", "Also used in the footer."),
      F("home", ["en", "eyebrow"], "Line under the title", "text", "Same text as the small line above the Home headline."),
      M("bg-about", "Background behind the banner")] },
    { head: () => "Main text", where: "Text of the About page, left column", fields: [F("about", ["en", "body"], "Text", "md", MD_HELP)] },
    SEC.contactBox(),
    { head: () => E("about").mgmtTitle, where: "Management team", fields: [
      F("about", ["en", "mgmtEyebrow"], "Small line above the heading", "text", "Leave empty to hide it."), F("about", ["en", "mgmtTitle"], "Heading"), F("about", ["en", "mgmtIntro"], "Text next to the heading", "long", "Leave empty to hide it."),
      F("team", [], "People", "items", "Each person gets a card here and a page of their own. An entry with no name is shown as a note card.")] },
    SEC.bottom()
  ] },
  { id: "expertise", group: "Pages", name: "Expertise", route: "expertise", sections: () => [
    { head: () => E("expertise").title, where: "Page banner", open: true, fields: [
      F("expertise", ["en", "title"], "Page title", "text", "Also the small line above the topic cards, and the footer link."),
      F("home", ["en", "expertiseTitle"], "Line under the title", "text", "Same text is the heading above the topic cards (Home and this page). Leave empty to hide it.")] },
    { head: () => "Bullet list", where: "List under the banner (hidden while it is empty)", fields: [F("expertise", ["en", "list"], "Bullets", "list")] },
    SEC.method(),
    ...(W.expertise && W.expertise.topics || []).map((t, i) => ({ head: () => (((W.expertise.topics[i] || {}).en) || {}).title, where: "Topic card " + (i + 1) + " and its “" + (UI().learnMore || "Learn more") + "” page", fields: [
      F("expertise", ["topics", i, "en", "title"], "Title (on this card and at the top of the topic page)"),
      F("expertise", ["topics", i, "en", "short"], "Title on the Home page card"),
      F("expertise", ["topics", i, "en", "card"], "Text on the card", "long", "Leave empty to show the first “- ” line of the page text."),
      F("expertise", ["topics", i, "en", "body"], "Page text (what opens from “" + (UI().learnMore || "Learn more") + "”)", "md", MD_HELP),
      F("expertise", ["topics", i, "image"], "Picture on the side of the topic page", "media"),
      ...(TOPIC_VIDS[t.id] ? [M(TOPIC_VIDS[t.id], "Video on the card and the topic page", "Cards show videos only while every topic has one.")] : []),
      ...(t.id === "national-civil-defense" ? [M("bg-civil-defense", "Banner background of this topic page")] : []),
      F("ui", ["en", "learnMore"], "Link text on every card", "text")] })),
    { head: () => "Add, remove or reorder topics", where: "All topic cards", fields: [
      { info: "After adding or removing a topic, open another page here and come back to see it as its own section." },
      F("expertise", ["topics"], "Topics", "items")] },
    { head: () => E("threats").title, where: "Threats we prepare for (tiles with videos)", fields: [
      F("threats", ["en", "eyebrow"], "Small line above the heading"), F("threats", ["en", "title"], "Heading"), F("threats", ["en", "text"], "Line next to the heading", "long"),
      F("threats", ["items"], "Threats", "items", "Each threat has a name and an optional video and still image. Without a video it shows as a plain tile.")] },
    SEC.bottom()
  ] },
  { id: "clients", group: "Pages", name: "Clients", route: "clients", sections: () => [
    { head: () => E("clients").title, where: "Page banner", open: true, fields: [F("clients", ["en", "title"], "Page title"), F("clients", ["en", "intro"], "Line under the title", "long")] },
    { head: () => "Featured clients", where: "Client rows with logos (also on Home)", fields: [F("clients", ["featured"], "Clients", "items", "Clients with page text get their own page.")] },
    { head: () => E("clients").othersTitle, where: "Other clients (logo grid)", fields: [F("clients", ["en", "othersTitle"], "Heading"), F("clients", ["others"], "Clients", "items")] },
    SEC.bottom()
  ] },
  { id: "projects", group: "Pages", name: "Projects", route: "projects", sections: () => [
    { head: () => E("projects").title, where: "Page banner", open: true, fields: [F("projects", ["en", "title"], "Page title"), F("projects", ["en", "sub"], "Line under the title"), M("bg-projects", "Background behind the banner")] },
    { head: () => "Projects", where: "Project list and project pages", fields: [F("projects", ["items"], "Projects", "items"), M("project-mci", "Banner background of the hospital MCI project page")] },
    SEC.bottom()
  ] },
  { id: "updates", group: "Pages", name: "Updates", route: "updates", sections: () => [
    { head: () => E("updates").title, where: "Page banner", open: true, fields: [F("updates", ["en", "title"], "Page title"), F("updates", ["en", "intro"], "Line under the title", "long"), M("bg-updates", "Background behind the banner")] },
    { head: () => E("updates").galleryTitle || "Activity gallery", where: "Activity carousel", fields: [F("updates", ["en", "galleryTitle"], "Heading"), { info: "The cards come from LinkedIn posts, events, projects and PDFs." }] },
    { head: () => UI().eventsTitle, where: "Events", fields: [F("ui", ["en", "eventsTitle"], "Heading"), F("updates", ["events"], "Events", "items")] },
    { head: () => UI().articlesTitle, where: "Articles and PDFs", fields: [F("ui", ["en", "articlesTitle"], "Heading"), F("articlesFull", [], "Articles", "items"), F("updates", ["articles"], "PDF files", "items")] },
    { head: () => UI().faqTitle, where: "Questions and answers", fields: [F("ui", ["en", "faqTitle"], "Heading"), F("updates", ["faq"], "Questions", "items")] },
    SEC.bottom()
  ] },
  { id: "posts", group: "Pages", name: "LinkedIn posts", route: "updates", sections: () => [
    { head: () => "LinkedIn posts", where: "Posts in the carousels and their pages", open: true, fields: [F("posts", [], "Posts", "items", "To add a post press “+ Add item”.")] }
  ] },
  { id: "contact", group: "Pages", name: "Contact", route: "contact", sections: () => [
    { head: () => E("contactPage").title, where: "Page banner", open: true, fields: [F("contactPage", ["en", "title"], "Page title"), F("contactPage", ["en", "intro"], "Line under the title", "long"), M("bg-contact", "Background behind the banner")] },
    { head: () => (UI().form || {}).title, where: "Contact form", fields: [F("ui", ["en", "form"], "Form texts", "object")] },
    { head: () => UI().reachDirect, where: "Direct contact details (also in the footer)", fields: [
      F("ui", ["en", "reachDirect"], "Heading"), F("contact", ["phone"], "Phone as shown"), F("contact", ["phoneRaw"], "Phone for calls and WhatsApp (digits only, with country code)"),
      F("contact", ["email"], "Email"), F("contact", ["linkedin"], "LinkedIn link"), F("ui", ["en", "address"], "Address")] }
  ] },
  { id: "pages", group: "Pages", name: "+ New page", route: "home", sections: () => [
    { head: () => "Your pages", where: "Create, remove or reorder your own pages", open: true, fields: [
      { info: "Each page you create appears in the list on the left under its own title. Press “+ Add item” to create one, then open it from the list." },
      F("pages", [], "Pages", "items", MD_HELP)] }
  ] },
  { id: "legal", group: "Every page", name: "Legal pages", route: "privacy", sections: () => [
    { head: () => E("privacy").title, where: "Privacy policy page", fields: [F("privacy", ["updated"], "Last updated"), F("privacy", ["en", "title"], "Title"), F("privacy", ["en", "body"], "Text", "md", MD_HELP)] },
    { head: () => E("terms").title, where: "Terms of use page", fields: [F("terms", ["updated"], "Last updated"), F("terms", ["en", "title"], "Title"), F("terms", ["en", "body"], "Text", "md", MD_HELP)] },
    { head: () => E("accessibility").title, where: "Accessibility statement page", fields: [F("accessibility", ["updated"], "Last updated"), F("accessibility", ["en", "title"], "Title"), F("accessibility", ["en", "body"], "Text", "md", MD_HELP)] }
  ] },
  { id: "chrome", group: "Every page", name: "Menu & footer", route: "home", sections: () => [
    { head: () => "Main menu", where: "Links at the top of every page", open: true, fields: [F("ui", ["en", "nav"], "Menu links", "object")] },
    { head: () => "Footer", where: "Bottom of every page", fields: [
      F("ui", ["en", "tagline"], "Line under the logo", "long"), F("ui", ["en", "footerAbout"], "First column heading"), F("ui", ["en", "footerExpertise"], "Second column heading"),
      F("ui", ["en", "footerLegal"], "Third column heading"), F("ui", ["en", "privacy"], "Privacy link"), F("ui", ["en", "accessibility"], "Accessibility link"), F("ui", ["en", "terms"], "Terms link"), F("ui", ["en", "rights"], "Copyright line")] },
    SEC.bottom(),
    { head: () => "Buttons and small labels", where: "Texts used across the site", fields: [
      F("ui", ["en", "learnMore"], "“Learn more” links"), F("ui", ["en", "readMore"], "“Read more” links"), F("ui", ["en", "allExpertise"], "Link to all expertise"),
      F("ui", ["en", "videos"], "Videos box heading (project pages)"), F("ui", ["en", "pdf"], "PDF label"), F("ui", ["en", "date"], "“Date” label"), F("ui", ["en", "place"], "“Place” label")] }
  ] }
];

/* Each page you created gets its own entry, listed under its own title. */
function customPage(i) {
  const P = () => W.pages[i] || {};
  const T = () => (P().en && P().en.title) || "Untitled page";
  return { id: "page:" + i, group: "Pages", name: T(), route: "page-" + P().id, sections: () => [
    { head: T, where: "Page banner", open: true, fields: [
      F("pages", [i, "en", "title"], "Page title (also in the main menu)"), F("pages", [i, "en", "intro"], "Line under the title", "long"),
      F("pages", [i, "inNav"], "Show in the main menu", "bool"),
      F("pages", [i, "image"], "Picture or PDF at the top of the page", "media", "A PDF shows as a download button."),
      F("pages", [i, "en", "fileText"], "Text on the PDF button", "text", "Leave empty for “Download the PDF”.")] },
    { head: () => "Page text", where: "Main text", open: true, fields: [F("pages", [i, "en", "body"], "Text", "md", MD_HELP)] }
  ] };
}
const pagesList = () => PAGES.flatMap(p => p.id === "pages" ? [...(W.pages || []).map((_, i) => customPage(i)), p] : [p]);

/* ---------- content tab ---------- */
function blocksOf(page) {
  const ks = new Set();
  page.sections().forEach(s => s.fields.forEach(f => { if (f.k) ks.add(f.k); if (f.slot) ks.add("mediaSlots"); }));
  return [...ks];
}
function contentTab(body) {
  const nav = h("nav", { class: "secs", "aria-label": "Site pages" });
  const pane = h("div");
  body.append(h("div", { class: "cols" }, nav, pane));
  let grp = "";
  pagesList().forEach(p => {
    if (p.group !== grp) { grp = p.group; nav.append(h("div", { class: "grp" }, grp)); }
    nav.append(h("button", { type: "button", "data-p": p.id, "data-keys": blocksOf(p).join(","), "aria-current": String(pageId === p.id), onclick: () => {
      pageId = p.id; nav.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", String(b.dataset.p === p.id)));
      renderPage(pane); refreshDirty(); if (innerWidth <= 820) pane.scrollIntoView({ block: "start" }); } }, h("span", {}, p.name)));
  });
  renderPage(pane);
}

function renderPage(pane) {
  const page = pagesList().find(p => p.id === pageId) || PAGES[0];
  const keys = blocksOf(page).filter(k => META[k]);
  const last = keys.map(k => META[k]).sort((a, b) => (a.at < b.at ? 1 : -1))[0];
  pane.replaceChildren(
    h("div", { class: "bar", style: "justify-content:space-between;margin-bottom:12px" },
      h("div", {}, h("h1", {}, page.name), h("p", { class: "help", style: "margin:0" }, "Sections are listed in the order they appear on the page, under the heading visitors see." + (last ? " Last saved " + fmtDate(last.at) + (last.by ? " by " + last.by : "") + "." : ""))),
      h("span", { class: "bar" }, h("button", { class: "btn sm pri", type: "button", onclick: () => enterEdit(page.route) }, "✎ Edit on the page"), h("a", { class: "btn sm", href: "#" + page.route, target: "_blank", rel: "noopener" }, "Open this page ↗"))));
  page.sections().forEach((s, i) => pane.append(sectionCard(s, i)));
}

function sectionCard(s, i) {
  const hd = h("span", { "data-head": "" });
  hd.headFn = s.head; hd.textContent = s.head() || "(no heading)";
  const d = h("details", { class: "sec", open: s.open || null },
    h("summary", {}, h("span", { class: "where" }, (i + 1) + " · " + s.where), h("span", { class: "hd" }, hd)));
  const inner = h("div", { class: "in" });
  const build = () => {
    if (inner.firstChild) return;
    if (s.also) inner.append(h("span", { class: "also" }, "↔ " + s.also + ". A change here changes it everywhere."));
    s.fields.forEach(f => inner.append(f.info ? h("p", { class: "help", style: "margin-top:12px" }, f.info) : f.slot ? slotEditor(f.slot, f.lbl, f.help) : fieldEditor(f)));
  };
  d.addEventListener("toggle", () => { if (d.open) build(); });
  if (s.open) build();
  d.append(inner);
  return d;
}

function fieldEditor(f) {
  const val = getP(f.k, f.p);
  const set = v => setP(f.k, f.p, v);
  const id = "f-" + f.k + "-" + f.p.join("-");
  const wrap = h("div");
  const help = f.help ? h("p", { class: "help" }, f.help) : "";
  if (f.type === "bool") { const cb = h("input", { type: "checkbox", id, checked: val ? true : null, onchange: e => set(e.target.checked) }); wrap.append(h("div", { class: "check" }, cb, h("label", { for: id, style: "margin:0" }, f.lbl)), help); return wrap; }
  if (f.type === "media") { const el = renderString(val || "", [f.k, ...f.p], "image", set); const l = el.querySelector("label"); if (l) l.textContent = f.lbl; wrap.append(el, help); return wrap; }
  if (f.type === "pagepick") {
    const sel = h("select", { id, onchange: e => set(e.target.value) }, h("option", { value: "" }, "Automatic"), ...(W.pages || []).map(p => h("option", { value: p.id, selected: p.id === val ? true : null }, (p.en && p.en.title) || p.id)));
    wrap.append(h("label", { for: id }, f.lbl), sel, help); return wrap;
  }
  if (f.type === "pairs") { if (!Array.isArray(val)) set([]); wrap.append(h("label", {}, f.lbl), pairsEditor(getP(f.k, f.p)), help); return wrap; }
  if (f.type === "list" || f.type === "items" || f.type === "object") {
    let v = val;
    if (v == null) { v = f.type === "object" ? {} : []; set(v); }
    const el = renderValue(v, [f.k, ...f.p], f.lbl, set);
    const lg = el.tagName === "FIELDSET" && el.querySelector(":scope > legend");
    if (lg) lg.textContent = f.lbl + (Array.isArray(v) ? " (" + v.length + ")" : "");
    else wrap.append(h("label", {}, f.lbl));
    wrap.append(el, help); return wrap;
  }
  const long = f.type === "long" || f.type === "md" || (typeof val === "string" && (val.length > 80 || val.includes("\n")));
  const inp = long ? h("textarea", { id, rows: f.type === "md" ? 16 : Math.min(12, Math.max(3, Math.ceil(String(val || "").length / 90) + (String(val || "").match(/\n/g) || []).length)) }) : h("input", { type: "text", id });
  inp.value = val ?? "";
  inp.addEventListener("input", e => set(e.target.value));
  wrap.append(h("label", { for: id }, f.lbl), inp, help);
  return wrap;
}

function pairsEditor(arr) {
  const box = h("div", { class: "pairs" });
  const draw = () => {
    box.replaceChildren(h("div", { class: "row help" }, h("span", {}, "Number"), h("span", {}, "Text under it"), h("span")));
    arr.forEach((p, i) => {
      const a = h("input", { type: "text", "aria-label": "Number " + (i + 1) }); a.value = p[0] ?? ""; a.oninput = () => { p[0] = a.value; };
      const b = h("input", { type: "text", "aria-label": "Text " + (i + 1) }); b.value = p[1] ?? ""; b.oninput = () => { p[1] = b.value; };
      box.append(h("div", { class: "row" }, a, b, h("span", { class: "bar" },
        h("button", { class: "btn sm", type: "button", "aria-label": "Move up", disabled: i === 0 || null, onclick: () => { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; draw(); } }, "↑"),
        h("button", { class: "btn sm danger", type: "button", onclick: () => { if (confirm("Remove “" + (p[0] || "") + " " + (p[1] || "") + "”?")) { arr.splice(i, 1); draw(); } } }, "Remove"))));
    });
    box.append(h("button", { class: "btn sm", type: "button", style: "margin-top:6px", onclick: () => { arr.push(["", ""]); draw(); } }, "+ Add number"));
    box.dispatchEvent(new Event("input", { bubbles: true }));
  };
  draw();
  return box;
}

/* ---------- background videos / images ---------- */
function slotEditor(name, lbl, help) {
  const box = h("div", { class: "slot" });
  const draw = () => {
    const c = W.mediaSlots[name] || {};
    const still = c.video === "none";
    const poster = c.poster || "images/" + name + ".jpg";
    const pv = still || !(c.video || (S.videos || []).includes(name)) ? h("img", { src: siteUrl(poster), alt: "" }) : h("video", { src: siteUrl(c.video || "images/" + name + ".mp4"), poster: siteUrl(poster), muted: true, loop: true, playsinline: true, preload: "metadata", onmouseenter: e => e.target.play().catch(() => {}), onmouseleave: e => e.target.pause() });
    const upd = v => { if (v) W.mediaSlots[name] = v; else delete W.mediaSlots[name]; draw(); box.dispatchEvent(new Event("input", { bubbles: true })); };
    const asVideo = url => upd({ video: url, poster: still ? "" : (c.poster || "") });
    const asStill = url => upd({ video: "none", poster: url });
    box.replaceChildren(
      h("label", { style: "margin-top:0" }, lbl),
      h("div", { class: "media" }, pv, h("div", { style: "flex:1;min-width:200px;display:grid;gap:6px" },
        h("span", { class: "help", style: "margin:0" }, still ? "Showing a still image (no video)." : c.video ? "Showing your uploaded video." : "Showing the original video."),
        h("div", { class: "bar" }, uploadButton(asVideo, "video/mp4,video/webm", "Upload a video"), uploadButton(asStill, "image/*", "Use a still image instead"),
          h("button", { class: "btn sm", type: "button", onclick: () => pickFromLibrary(url => (/\.(mp4|webm)(\?|$)/i.test(url) ? asVideo : asStill)(url)) }, "Choose from library"),
          (c.video || c.poster) ? h("button", { class: "btn sm danger", type: "button", onclick: () => upd(null) }, "Restore original") : null))),
      help ? h("p", { class: "help" }, help) : "");
  };
  draw();
  return box;
}

/* ---------- generic editor for lists and nested items ---------- */
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
    const en = typeof it.en === "string" ? it.en : it.en && (it.en.title || it.en.name || it.en.q);
    const t = en || it.title || it.name || it.text || it.tag || (Array.isArray(it) ? it.join(" · ") : "") || it.id;
    if (t) return String(t).slice(0, 80);
  }
  if (typeof it === "string") return it.slice(0, 80);
  return "Item " + (i + 1);
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

function renderString(val, path, key, set) {
  const id = "f-" + path.join("-");
  const wrap = h("div");
  const lbl = typeof key === "number" ? null : h("label", { for: id }, label(key));
  if (isMediaPath(key, val) || (typeof key === "string" && MEDIA_KEY.test(key))) {
    const inp = h("input", { type: "text", id, value: val, placeholder: "Link to a file, or upload", oninput: e => { set(e.target.value); prev(); } });
    const pv = h("span");
    const prev = () => { const v = inp.value.trim(); pv.replaceChildren(!v ? "" : /\.(mp4|webm)(\?|$)/i.test(v) ? h("video", { src: siteUrl(v), muted: true, preload: "metadata" }) : /\.pdf(\?|$)/i.test(v) ? h("a", { href: siteUrl(v), target: "_blank" }, "PDF") : h("img", { src: siteUrl(v), alt: "" })); };
    prev();
    const pick = url => { inp.value = url; set(url); prev(); inp.dispatchEvent(new Event("input", { bubbles: true })); };
    wrap.append(lbl || "", h("div", { class: "media" }, pv, h("div", { style: "flex:1;min-width:200px;display:grid;gap:6px" }, inp, h("div", { class: "bar" }, uploadButton(pick), h("button", { class: "btn sm", type: "button", onclick: () => pickFromLibrary(pick) }, "Choose from library")))));
    return wrap;
  }
  const long = val.length > 70 || val.includes("\n") || LONG_KEY.test(String(key));
  const inp = long ? h("textarea", { id, rows: Math.min(18, Math.max(3, Math.ceil(val.length / 90) + (val.match(/\n/g) || []).length)) }) : h("input", { type: "text", id });
  inp.value = val;
  inp.addEventListener("input", e => set(e.target.value));
  if (key === "id") wrap.append(lbl, inp, h("p", { class: "help" }, "Changing this changes the page's link. If you linked to it from somewhere else, update that too."));
  else if (key === "body") wrap.append(lbl, inp, h("p", { class: "help" }, MD_HELP));
  else wrap.append(lbl || "", inp);
  return wrap;
}

function renderObject(obj, path, key) {
  const box = path.length > 2 || typeof key === "number" ? h("div") : h("fieldset", {}, h("legend", {}, label(key)));
  const keys = Object.keys(obj);
  const field = k => renderValue(obj[k], [...path, k], k, v => { obj[k] = v; });
  const rest = keys.filter(k => k !== "en" && k !== "he");
  rest.filter(k => typeof obj[k] !== "object" || obj[k] === null).forEach(k => box.append(field(k)));
  if (!HE) {
    if (keys.includes("en")) {
      if (obj.en && typeof obj.en === "object" && !Array.isArray(obj.en)) Object.keys(obj.en).forEach(k => box.append(renderValue(obj.en[k], [...path, "en", k], k, v => { obj.en[k] = v; })));
      else box.append(renderValue(obj.en, [...path, "en"], typeof obj.en === "string" ? "Name" : "en", v => { obj.en = v; }));
    }
  } else ["en", "he"].filter(k => keys.includes(k)).forEach(k => box.append(field(k)));
  rest.filter(k => obj[k] && typeof obj[k] === "object").forEach(k => box.append(field(k)));
  return box;
}

function renderArray(arr, path, key, set) {
  const box = h("fieldset", {}, h("legend", {}, (typeof key === "number" ? "" : label(key)) + " (" + arr.length + ")"));
  const list = h("div");
  const rerender = openIdx => { const lg = box.querySelector(":scope > legend").textContent.replace(/ \(\d+\)$/, ""); const n = renderArray(arr, path, key, set); n.querySelector(":scope > legend").textContent = lg + " (" + arr.length + ")"; box.replaceWith(n); n.dispatchEvent(new Event("input", { bubbles: true }));
    if (openIdx != null) { const d = n.querySelectorAll(":scope > div > details.item")[openIdx]; if (d) { d.open = true; d.scrollIntoView({ block: "center" }); const f = d.querySelector("input,textarea"); if (f) f.focus(); } } };
  arr.forEach((it, i) => {
    const ctrls = h("span", { class: "bar", onclick: e => e.stopPropagation() },
      h("button", { class: "btn sm", type: "button", "aria-label": "Move up", disabled: i === 0 || null, onclick: e => { e.preventDefault(); [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; rerender(); } }, "↑"),
      h("button", { class: "btn sm", type: "button", "aria-label": "Move down", disabled: i === arr.length - 1 || null, onclick: e => { e.preventDefault(); [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; rerender(); } }, "↓"),
      h("button", { class: "btn sm", type: "button", onclick: e => { e.preventDefault(); const c = clone(it); if (c && typeof c === "object" && c.id) c.id = c.id + "-copy"; arr.splice(i + 1, 0, c); rerender(i + 1); } }, "Duplicate"),
      h("button", { class: "btn sm danger", type: "button", onclick: e => { e.preventDefault(); if (confirm("Delete “" + itemTitle(it, i) + "”?")) { arr.splice(i, 1); rerender(); } } }, "Delete"));
    if (it && typeof it === "object") {
      const d = h("details", { class: "item" }, h("summary", {}, h("span", {}, itemTitle(it, i)), ctrls));
      const inner = h("div", { class: "in" });
      d.addEventListener("toggle", () => { if (d.open && !inner.firstChild) inner.append(renderValue(it, [...path, i], i, v => { arr[i] = v; })); });
      d.addEventListener("input", () => { d.querySelector(":scope > summary > span").textContent = itemTitle(it, i); });
      d.append(inner);
      list.append(d);
    } else {
      const row = h("div", { class: "bar", style: "align-items:flex-start;margin:6px 0" }, h("div", { style: "flex:1;min-width:220px" }, renderValue(it, [...path, i], MEDIA_KEY.test(String(key)) ? key : i, v => { arr[i] = v; })), ctrls);
      list.append(row);
    }
  });
  box.append(list);
  box.append(h("button", { class: "btn sm", type: "button", style: "margin-top:8px", onclick: () => {
    const tpl = path.length === 1 && path[0] === "pages" ? PAGE_TEMPLATE() : arr.length ? blank(arr[0]) : "";
    arr.push(tpl); rerender(arr.length - 1);
  } }, "+ Add item"));
  return box;
}

/* ---------- media ---------- */
function safeName(n) { const m = n.match(/\.([a-z0-9]+)$/i); const ext = m ? m[1].toLowerCase() : "bin"; return Date.now().toString(36) + "-" + n.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) + "." + ext; }
async function uploadFile(file) {
  if (file.size > 50 * 1024 * 1024) throw new Error("The file is larger than 50MB. Compress it and try again.");
  const path = safeName(file.name || "file");
  const { error } = await sb.storage.from("media").upload(path, file, { cacheControl: "31536000", contentType: file.type || undefined });
  if (error) throw error;
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}
function uploadButton(onDone, accept = "image/*,video/mp4,video/webm,application/pdf", text = "Upload file") {
  const inp = h("input", { type: "file", accept, hidden: true });
  const b = h("button", { class: "btn sm", type: "button", onclick: () => inp.click() }, text);
  inp.addEventListener("change", async () => {
    const f = inp.files[0]; if (!f) return;
    b.disabled = true; b.textContent = "Uploading…";
    try { onDone(await uploadFile(f)); b.textContent = "Uploaded ✓"; }
    catch (e) { alert(errText(e)); b.textContent = text; }
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
  dlg.append(h("div", { class: "bar", style: "justify-content:space-between" }, h("h2", {}, "Choose from the media library"), h("button", { class: "btn sm", type: "button", onclick: () => dlg.close() }, "Close")));
  const grid = h("div", { class: "grid" }, "Loading…"); dlg.append(grid);
  root.append(dlg); dlg.addEventListener("close", () => dlg.remove()); dlg.showModal();
  try {
    const files = await listMedia();
    grid.replaceChildren(...(files.length ? files.map(f => h("figure", {}, thumb(f.url), h("figcaption", {}, f.name, h("button", { class: "btn sm pri", type: "button", onclick: () => { onPick(f.url); dlg.close(); } }, "Choose")))) : [h("p", { class: "muted" }, "The library is empty. Upload files in the Media library tab or straight from a field.")]));
  } catch (e) { grid.replaceChildren(errText(e)); }
}
async function mediaTab(body) {
  const card = h("div", { class: "card" }, h("h1", {}, "Media library"), h("p", { class: "muted" }, "Images, videos and PDFs uploaded to the site. Up to 50MB per file. For videos, MP4 up to 1280 pixels wide works best."));
  const grid = h("div", { class: "grid", style: "margin-top:14px" }, "Loading…");
  card.append(h("div", { class: "bar" }, uploadButton(() => mediaTab(body))), grid);
  body.replaceChildren(card);
  try {
    const files = await listMedia();
    grid.replaceChildren(...(files.length ? files.map(f => h("figure", {}, thumb(f.url), h("figcaption", {}, h("span", {}, f.name), h("span", { class: "bar" },
      h("button", { class: "btn sm", type: "button", onclick: e => { navigator.clipboard && navigator.clipboard.writeText(f.url); e.target.textContent = "Copied"; } }, "Copy link"),
      h("button", { class: "btn sm danger", type: "button", onclick: async () => { if (!confirm("Delete this file? If it is used on the site, it will stop showing there.")) return; const { error } = await sb.storage.from("media").remove([f.name]); if (error) alert(errText(error)); else mediaTab(body); } }, "Delete"))))) : [h("p", { class: "muted" }, "No files uploaded yet.")]));
  } catch (e) { grid.replaceChildren(errText(e)); }
}

/* ---------- advanced: every stored block as raw fields, with history ---------- */
let advKey = "home";
function advancedTab(body) {
  const nav = h("nav", { class: "secs", "aria-label": "Stored blocks" });
  const pane = h("div");
  body.append(h("p", { class: "help", style: "margin-top:0" }, "Everything the site stores, block by block. Use this for version history, restoring an older version, or anything not listed under “Edit the site”. Saving uses the same button at the bottom."), h("div", { class: "cols" }, nav, pane));
  const ks = Object.keys(W).sort((a, b) => (KEY_NAMES[a] || a).localeCompare(KEY_NAMES[b] || b));
  ks.forEach(k => nav.append(h("button", { type: "button", "data-k": k, "data-keys": k, "aria-current": String(advKey === k), onclick: () => { advKey = k; nav.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", String(b.dataset.k === k))); drawAdv(pane); refreshDirty(); } }, h("span", {}, KEY_NAMES[k] || k))));
  drawAdv(pane);
}
function drawAdv(pane) {
  const k = advKey, m = META[k];
  const card = h("div", { class: "card" }, h("h1", {}, KEY_NAMES[k] || k),
    h("p", { class: "help" }, m ? "Last saved " + fmtDate(m.at) + (m.by ? " by " + m.by : "") : "Showing the site's original content. Not edited yet."));
  const form = h("div");
  const draw = () => form.replaceChildren(k === "mediaSlots" ? h("p", { class: "muted" }, "Background videos are edited on each page under “Edit the site”.") : renderValue(W[k], [k], KEY_NAMES[k] || k, v => { W[k] = v; }));
  draw();
  card.append(form, h("div", { class: "bar", style: "margin-top:14px" },
    h("button", { class: "btn", type: "button", onclick: () => showHistory(card, k, draw) }, "Version history"),
    m ? h("button", { class: "btn danger", type: "button", onclick: () => resetToOriginal(k) }, "Back to the original content") : null));
  pane.replaceChildren(card);
}
async function showHistory(card, key, redraw) {
  const { data, error } = await sb.from("section_history").select("id,saved_at,saved_by,data").eq("key", key).order("saved_at", { ascending: false }).limit(20);
  const box = h("fieldset", {}, h("legend", {}, "Earlier versions"));
  if (error) box.append(errText(error));
  else if (!data.length) box.append(h("p", { class: "muted" }, "No earlier versions yet."));
  else data.forEach(r => box.append(h("div", { class: "bar", style: "justify-content:space-between;border-bottom:1px solid var(--line);padding:6px 0" },
    h("span", {}, fmtDate(r.saved_at) + (r.saved_by ? " · " + r.saved_by : "")),
    h("button", { class: "btn sm", type: "button", onclick: () => { W[key] = fill(clone(r.data), STATIC[key] ?? {}); redraw(); refreshDirty(); note(card, "That version is loaded. Press “Save & publish” to restore it.", "ok"); box.remove(); } }, "Restore"))));
  card.append(box);
}
async function resetToOriginal(key) {
  if (!confirm("Remove every edit in “" + (KEY_NAMES[key] || key) + "” and go back to the original content? The current version is kept in the history.")) return;
  const { error: e1 } = await sb.from("site_sections").update({ data: W[key] }).eq("key", key); // logs the current version to history
  const { error } = e1 ? { error: e1 } : await sb.from("site_sections").delete().eq("key", key);
  if (error) return alert(errText(error));
  W[key] = clone(STATIC[key] ?? {}); ORIG[key] = JSON.stringify(W[key]); META[key] = null; S[key] = clone(W[key]); frame();
}

/* ---------- users ---------- */
async function usersTab(body) {
  const card = h("div", { class: "card" }, h("h1", {}, "Users and permissions"),
    h("p", {}, "To give someone access, send them the admin link (the site address with ", h("b", {}, "#admin"), " at the end). After they sign up with email and password they appear here as “Waiting”, and you choose their permission."),
    h("ul", { class: "muted" }, h("li", {}, "Editor: can edit all content and media."), h("li", {}, "Owner: same as editor, and also manages users."), h("li", {}, "Waiting: no editing access.")));
  const tbl = h("table", {}, h("thead", {}, h("tr", {}, h("th", {}, "Email"), h("th", {}, "Signed up"), h("th", {}, "Permission"), h("th", {}, ""))));
  const tb = h("tbody"); tbl.append(tb); card.append(tbl); body.replaceChildren(card);
  const { data, error } = await sb.from("members").select("user_id,email,role,created_at").order("created_at");
  if (error) return note(card, errText(error), "err");
  data.forEach(m => {
    const sel = h("select", { "aria-label": "Permission for " + m.email }, [["pending", "Waiting"], ["editor", "Editor"], ["owner", "Owner"]].map(([v, t]) => h("option", { value: v, selected: m.role === v || null }, t)));
    sel.addEventListener("change", async () => { const { error } = await sb.from("members").update({ role: sel.value }).eq("user_id", m.user_id); if (error) { note(card, /last owner/.test(error.message) ? "There must always be at least one owner." : errText(error), "err"); sel.value = m.role; } else { m.role = sel.value; note(card, "Permission for " + m.email + " updated.", "ok"); } });
    tb.append(h("tr", {}, h("td", {}, m.email), h("td", {}, new Date(m.created_at).toLocaleDateString("en-GB")), h("td", {}, m.user_id === (me && me.user_id) ? h("b", {}, "Owner (you)") : sel),
      h("td", {}, m.user_id === (me && me.user_id) ? "" : h("button", { class: "btn sm danger", type: "button", onclick: async () => { if (!confirm("Remove access for " + m.email + "?")) return; const { error } = await sb.from("members").delete().eq("user_id", m.user_id); if (error) note(card, errText(error), "err"); else usersTab(body); } }, "Remove"))));
  });
}

/* ---------- account ---------- */
function accountTab(body) {
  const pass = h("input", { type: "password", id: "np", autocomplete: "new-password" });
  const card = h("div", { class: "card", style: "max-width:520px" }, h("h1", {}, "My account"), h("p", {}, "Signed in as ", h("b", {}, me.email), " · Permission: ", me.role === "owner" ? "Owner" : "Editor"),
    h("label", { for: "np" }, "New password (at least 8 characters)"), pass,
    h("div", { class: "bar", style: "margin-top:12px" },
      h("button", { class: "btn pri", type: "button", onclick: async () => { if (pass.value.length < 8) return note(card, "The password needs at least 8 characters.", "err"); const { error } = await sb.auth.updateUser({ password: pass.value }); if (error) note(card, errText(error), "err"); else { pass.value = ""; note(card, "Password updated.", "ok"); } } }, "Update password"),
      h("button", { class: "btn", type: "button", onclick: signOut }, "Sign out")));
  body.replaceChildren(card);
}

/* ---------- editing on the page itself ----------
   The site renders as visitors see it, with data-e (text), data-li/data-i (list item) and data-img (picture) marks that name the stored
   field. Short texts are typed in place; long texts open a box; list items get a small toolbar: edit all fields, duplicate, add new,
   move, delete. While editing, the site reads the working copies directly (S[k] === W[k]), so every change shows at once. */
const undoStack = [];
let sel = null, tb = null, drawer = null, veBar = null, veTimer = 0;
const splitPath = p => p.split(".").map(x => (/^\d+$/.test(x) ? Number(x) : x));
const getPath = p => { const [k, ...r] = splitPath(p); return r.length ? getP(k, r) : W[k]; };
const setPath = (p, v) => { const [k, ...r] = splitPath(p); setP(k, r, v); S[k] = W[k]; };
const keyOf = p => p.split(".")[0];
function pushUndo(k) { undoStack.push({ k, v: JSON.stringify(W[k] ?? null) }); if (undoStack.length > 200) undoStack.shift(); updateBar(); }
function rerender() { const y = scrollY; window.ISRA.rerender(); scrollTo(0, y); refreshDirty(); }
const later = () => { clearTimeout(veTimer); veTimer = setTimeout(rerender, 250); };

function enterEdit(route) {
  if (!me || me.role === "pending") { window.ISRA.editRoute = route; location.hash = "#admin"; return; }
  if (typeof window.ISRA.setEdit !== "function") { /* the browser still has the previous version of the site page: load the fresh one once */
    let tried = false; try { tried = sessionStorage.getItem("it-fresh") === "1"; sessionStorage.setItem("it-fresh", "1"); } catch (e) {}
    if (!tried) { location.replace(location.pathname + "?fresh=" + Date.now() + "#admin"); return; }
    return frame("Refresh the page to use editing on the page.");
  }
  editing = true; window.ISRA.setEdit(true);
  for (const k of Object.keys(W)) S[k] = W[k];
  root.hidden = false; root.classList.add("ve"); siteEls.forEach(e => e.hidden = false);
  tb = h("div", { class: "vetb", hidden: true, role: "toolbar", "aria-label": "Item actions" });
  drawer = h("aside", { class: "vedrawer", hidden: true, "aria-label": "Edit item" });
  veBar = buildEditBar();
  root.replaceChildren(h("div", { class: "vemsg" }), tb, drawer, veBar);
  document.documentElement.lang = "en"; document.documentElement.dir = "ltr";
  const target = "#" + (route || "home");
  if (location.hash !== target) location.hash = target; else window.ISRA.rerender();
  refreshDirty();
}
function leaveEdit() {
  editing = false; window.ISRA.setEdit(false); sel = null;
  root.classList.remove("ve"); root.replaceChildren(); saveBar = null;
}
function doneEditing() {
  if (dirtyKeys().length && !confirm("You have changes that are not published yet. Leave and discard them?")) return;
  for (const k of dirtyKeys()) W[k] = JSON.parse(ORIG[k]);
  for (const k of Object.keys(W)) S[k] = clone(W[k]);
  undoStack.length = 0; leaveEdit(); root.hidden = true; window.ISRA.rerender();
}
function buildEditBar() {
  saveBar = buildSaveBar();
  saveBar.classList.remove("savebar"); saveBar.classList.add("vesave");
  const undoBtn = h("button", { class: "btn", type: "button", onclick: undoLast, title: "Undo the last change" }, "↶ Undo");
  const bar = h("div", { class: "vebar" },
    h("span", { class: "velbl" }, h("b", {}, "✎ Editing"), h("span", { class: "help", style: "margin:0" }, "Click any text to change it. Click a card or picture for more options.")),
    h("span", { class: "bar" }, undoBtn, saveBar,
      h("button", { class: "btn", type: "button", onclick: doneEditing, title: "Stop editing and return to the site" }, "Done"),
      h("button", { class: "btn", type: "button", onclick: newPage }, "+ New page"),
      h("a", { class: "btn", href: "#admin" }, "⚙ Admin tools")));
  bar.undoBtn = undoBtn;
  return bar;
}
function updateBar() { if (veBar) veBar.undoBtn.disabled = !undoStack.length; }
function undoLast() {
  const u = undoStack.pop(); if (!u) return;
  W[u.k] = JSON.parse(u.v); S[u.k] = W[u.k]; closeDrawer(); rerender(); updateBar();
}
function newPage() {
  pushUndo("pages");
  const pg = PAGE_TEMPLATE(); pg.en.title = "New page";
  if (!Array.isArray(W.pages)) W.pages = [];
  W.pages.push(pg); S.pages = W.pages;
  location.hash = "#page-" + pg.id;
  setTimeout(() => openItemDrawer("pages", W.pages.length - 1), 50);
}
function afterRender() {
  if (!editing) return;
  closeDrawerIfStale();
  const el = sel && findItem(sel);
  if (el) select(el, sel.img); else { sel = null; tb.hidden = true; }
}
function findItem(s) {
  if (s.img && !s.li) return document.querySelector('#main [data-img="' + s.img + '"]');
  return [...document.querySelectorAll('#main [data-li="' + s.li + '"]')].find(e => +e.dataset.i === s.i) || null;
}

/* ----- text ----- */
let before = "";
document.addEventListener("focusin", e => { const el = e.target.closest && e.target.closest("#main [data-e]:not([data-md])"); if (editing && el) before = el.textContent; });
document.addEventListener("focusout", e => {
  if (!editing) return;
  const el = e.target.closest && e.target.closest("#main [data-e]:not([data-md])"); if (!el) return;
  const v = el.textContent.replace(/\u00a0/g, " ").replace(/\s*\n\s*/g, " ").trim(), p = el.dataset.e;
  if (v === String(getPath(p) ?? "").trim()) return;
  pushUndo(keyOf(p)); setPath(p, v);
  if (p === "contact.phone") setPath("contact.phoneRaw", v);
  document.querySelectorAll('#main [data-e="' + p + '"]').forEach(o => { if (o !== el) o.textContent = v; });
  refreshDirty();
  if (!(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("[data-e]"))) later();
});
document.addEventListener("keydown", e => {
  if (!editing) return;
  const el = e.target.closest && e.target.closest("#main [data-e]:not([data-md])"); if (!el) return;
  if (e.key === "Enter") { e.preventDefault(); el.blur(); }
  if (e.key === "Escape") { el.textContent = before; el.blur(); }
});
function openTextBox(el) {
  const p = el.dataset.e, val = String(getPath(p) ?? "");
  const ta = h("textarea", { rows: 16, style: "min-height:50vh" }); ta.value = val;
  const isMd = /\.(body)$/.test(p);
  showDrawer("Edit text", [h("label", {}, "Text"), ta, isMd ? h("p", { class: "help" }, MD_HELP) : "",
    h("div", { class: "bar", style: "margin-top:12px" },
      h("button", { class: "btn pri", type: "button", onclick: () => { if (ta.value !== val) { pushUndo(keyOf(p)); setPath(p, ta.value); rerender(); } closeDrawer(); } }, "Apply"),
      h("button", { class: "btn", type: "button", onclick: closeDrawer }, "Cancel"))]);
  ta.focus();
}

/* ----- items ----- */
function select(el, img) {
  document.querySelectorAll("#main .ve-sel").forEach(e => e.classList.remove("ve-sel"));
  const li = el.closest("[data-li]");
  const imgEl = img ? el.closest("[data-img]") || el.querySelector("[data-img]") : el.matches("[data-img]") ? el : null;
  sel = { li: li && li.dataset.li, i: li ? +li.dataset.i : null, img: imgEl && imgEl.dataset.img };
  (li || imgEl).classList.add("ve-sel");
  drawToolbar(li, imgEl);
}
function drawToolbar(li, imgEl) {
  const b = (txt, title, fn, cls) => h("button", { class: "btn sm" + (cls ? " " + cls : ""), type: "button", title, onclick: e => { e.preventDefault(); e.stopPropagation(); fn(); } }, txt);
  const kids = [];
  if (li) {
    const arr = getPath(li.dataset.li), i = +li.dataset.i, it = arr && arr[i];
    if (!Array.isArray(arr)) { tb.hidden = true; return; }
    const obj = it && typeof it === "object" && !Array.isArray(it);
    const link = li.matches("a[href]") ? li.getAttribute("href") : null;
    kids.push(h("span", { class: "tbl" }, (obj ? itemTitle(it, i) : "Item") + " · " + (i + 1) + "/" + arr.length));
    if (obj) kids.push(b("✎ Edit", "Edit all the details of this item", () => openItemDrawer(li.dataset.li, i)));
    kids.push(b("⧉ Duplicate", "Make a copy right after this one", () => duplicateItem(li.dataset.li, i)));
    kids.push(b("+ New", "Add a new empty item after this one", () => addItem(li.dataset.li, i)));
    kids.push(b("↑", "Move earlier", () => moveItem(li.dataset.li, i, -1)), b("↓", "Move later", () => moveItem(li.dataset.li, i, 1)));
    if (link && link.startsWith("#") && !li.classList.contains("pagehead")) kids.push(b("Open ↗", "Go to this item's page", () => { location.hash = link; }));
    kids.push(b("🗑 Delete", "Delete this item", () => deleteItem(li.dataset.li, i), "danger"));
  }
  if (imgEl) {
    const p = imgEl.dataset.img;
    const set = url => { pushUndo(keyOf(p)); setPath(p, url); rerender(); };
    kids.push(h("span", { class: "tbl" }, "Picture"), uploadButton(set, "image/*,application/pdf", "⇪ Upload new"), b("Library", "Choose a file already uploaded", () => pickFromLibrary(set)));
    if (!(li && li.dataset.li.endsWith(".images"))) kids.push(b("Remove", "Remove the picture", () => set(""), "danger"));
  }
  kids.push(b("✕", "Close", () => { sel = null; tb.hidden = true; document.querySelectorAll("#main .ve-sel").forEach(e => e.classList.remove("ve-sel")); }));
  tb.replaceChildren(...kids); tb.hidden = false; placeToolbar();
}
function placeToolbar() {
  if (!tb || tb.hidden || !sel) return;
  const el = findItem(sel); if (!el) { tb.hidden = true; return; }
  const r = el.getBoundingClientRect(), w = tb.offsetWidth, ht = tb.offsetHeight;
  let top = r.top - ht - 6; if (top < 8) top = Math.min(Math.max(r.top + 6, 8), innerHeight - ht - 90);
  tb.style.top = top + "px"; tb.style.left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)) + "px";
}
addEventListener("scroll", () => requestAnimationFrame(placeToolbar), { passive: true, capture: true });
addEventListener("resize", () => requestAnimationFrame(placeToolbar));

const isPageItem = (p, i) => { const el = findItem({ li: p, i }); return el && el.classList.contains("pagehead"); };
function uniqueId(arr, base) { base = String(base).replace(/-copy\d*$/, ""); let n = 1, id = base + "-copy"; while (arr.some(x => x && x.id === id)) id = base + "-copy" + (++n); return id; }
const routeFor = id => location.hash.replace(/^#/, "").replace(/-[^]*$/, "") + "-" + id;
function duplicateItem(p, i) {
  const arr = getPath(p), c = clone(arr[i]), page = isPageItem(p, i);
  pushUndo(keyOf(p));
  if (c && typeof c === "object" && c.id) c.id = uniqueId(arr, c.id);
  arr.splice(i + 1, 0, c); sel = { li: p, i: i + 1 };
  if (page && c.id) location.hash = "#" + routeFor(c.id); else rerender();
}
function addItem(p, i) {
  const arr = getPath(p), it = arr[i], page = isPageItem(p, i);
  pushUndo(keyOf(p));
  let n;
  if (p === "pages") { n = PAGE_TEMPLATE(); n.en.title = "New page"; }
  else if (Array.isArray(it)) n = it.map(() => "");
  else if (it && typeof it === "object") {
    n = blank(it);
    if (n.id !== undefined) n.id = uniqueId(arr, "new");
    const t = n.en && typeof n.en === "object" ? n.en : n;
    if (typeof n.en === "string") n.en = "New item";
    else for (const k of ["title", "name", "q"]) if (k in t) { t[k] = "New item"; break; }
  } else n = "New item";
  arr.splice(i + 1, 0, n); sel = { li: p, i: i + 1 };
  if (page && n.id) { location.hash = "#" + routeFor(n.id); setTimeout(() => openItemDrawer(p, i + 1), 50); return; }
  rerender();
  if (n && typeof n === "object" && !Array.isArray(n)) openItemDrawer(p, i + 1);
  else { const el = findItem(sel); const t = el && (el.matches("[data-e]") ? el : el.querySelector("[data-e]")); if (t) { t.focus(); document.getSelection().selectAllChildren(t); } }
}
function moveItem(p, i, d) {
  const arr = getPath(p), j = i + d; if (j < 0 || j >= arr.length) return;
  pushUndo(keyOf(p)); [arr[i], arr[j]] = [arr[j], arr[i]]; sel = { li: p, i: j }; rerender();
}
function deleteItem(p, i) {
  const arr = getPath(p), page = isPageItem(p, i);
  if (!confirm("Delete “" + itemTitle(arr[i], i) + "”? You can bring it back with Undo until you leave this screen.")) return;
  pushUndo(keyOf(p)); arr.splice(i, 1); sel = null; tb.hidden = true; closeDrawer();
  if (page) { const up = document.querySelectorAll("#main .crumbs a"); location.hash = up.length ? up[up.length - 1].getAttribute("href") : "#home"; }
  else rerender();
}
function openItemDrawer(p, i) {
  const arr = getPath(p), it = arr && arr[i]; if (!it || typeof it !== "object") return;
  pushUndo(keyOf(p));
  /* Offer fields that other items in the same list have (a picture, a card text...) even when this one has none yet. */
  const added = [];
  const addMissing = (o, path) => arr.forEach(sib => { const src = path.reduce((x, k) => x && x[k], sib); if (!src || typeof src !== "object" || Array.isArray(src)) return;
    for (const [key, v] of Object.entries(src)) if (!(key in o) && (typeof v === "string" || typeof v === "boolean")) { o[key] = typeof v === "boolean" ? false : ""; added.push([o, key]); } });
  addMissing(it, []); if (it.en && typeof it.en === "object") addMissing(it.en, ["en"]);
  const [k, ...r] = splitPath(p);
  const form = renderValue(it, [k, ...r, i], i, v => { arr[i] = v; });
  form.addEventListener("input", later); form.addEventListener("change", later);
  showDrawer(itemTitle(it, i), [h("p", { class: "help" }, "Changes show on the page as you type. Use Undo to go back."), form,
    h("div", { class: "bar", style: "margin-top:14px" }, h("button", { class: "btn pri", type: "button", onclick: () => { closeDrawer(); rerender(); } }, "Done"))]);
  drawer.item = { p, it, added };
}
function showDrawer(title, kids) {
  drawer.replaceChildren(h("div", { class: "bar", style: "justify-content:space-between;margin-bottom:8px" }, h("h2", { style: "margin:0" }, title), h("button", { class: "btn sm", type: "button", onclick: closeDrawer }, "Close")), ...kids);
  drawer.hidden = false; drawer.item = null; drawer.scrollTop = 0;
}
function closeDrawer() {
  if (!drawer) return;
  if (drawer.item && drawer.item.added) drawer.item.added.forEach(([o, key]) => { if (o[key] === "" || o[key] === false) delete o[key]; });
  drawer.hidden = true; drawer.replaceChildren(); drawer.item = null; refreshDirty();
}
function closeDrawerIfStale() { if (drawer && drawer.item && !(getPath(drawer.item.p) || []).includes(drawer.item.it)) closeDrawer(); }

/* ----- clicks: edit instead of following links ----- */
document.addEventListener("click", e => {
  if (!editing || !e.target.closest || !e.target.closest("#main")) return;
  const t = e.target.closest("[data-e]"), im = e.target.closest("[data-img]"), li = e.target.closest("[data-li]");
  if (!t && !im && !li) return;
  e.preventDefault(); e.stopPropagation();
  if (t && t.hasAttribute("data-md")) return openTextBox(t);
  if (t) { if (li || im) select(t, !!im && !li); return; }
  select(im || li, !!im);
}, true);
document.addEventListener("submit", e => { if (editing && e.target.closest("#main")) e.preventDefault(); }, true);

/* ---------- start ---------- */
sb.auth.onAuthStateChange(ev => { if (ev === "PASSWORD_RECOVERY") setTimeout(() => authView("recover"), 0); });
if (/type=recovery/.test(location.hash)) authView("recover");
else boot().catch(e => { root.replaceChildren(h("div", { class: "auth card" }, h("h1", {}, "Can't connect to the admin server"), h("p", {}, errText(e)), h("a", { class: "btn", href: "#home" }, "Back to the site"))); });
