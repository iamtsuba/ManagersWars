import{s as p,g as V}from"./supabase-B22JUf_T.js";async function K(e){const[{count:n},{count:t},{count:a},{count:d},{count:r}]=await Promise.all([p.from("players").select("*",{count:"exact",head:!0}),p.from("clubs").select("*",{count:"exact",head:!0}),p.from("users").select("*",{count:"exact",head:!0}),p.from("cards").select("*",{count:"exact",head:!0}),p.from("matches").select("*",{count:"exact",head:!0})]);e.innerHTML=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      ${x("🃏","Joueurs (cartes)",n??"–","#1A6B3C")}
      ${x("🏟️","Clubs",t??"–","#D4A017")}
      ${x("👥","Managers",a??"–","#7a28b8")}
      ${x("📦","Cartes possédées",d??"–","#2a8f52")}
      ${x("⚽","Matchs joués",r??"–","#bb2020")}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="card-panel">
        <h3 style="font-size:14px;margin-bottom:12px;font-weight:600">🎯 Actions rapides</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-primary" onclick="window.adminNav('players')">+ Ajouter un joueur</button>
          <button class="btn btn-yellow" onclick="window.adminNav('clubs')">+ Ajouter un club</button>
          <button class="btn btn-ghost" onclick="window.adminNav('card-builder')">🎨 Ouvrir Card Builder</button>
        </div>
      </div>
      <div class="card-panel">
        <h3 style="font-size:14px;margin-bottom:12px;font-weight:600">📋 Infos GDD</h3>
        <div style="font-size:12px;color:var(--gray-600);line-height:1.7">
          <div>Rarités: Normal / Pépite (or) / Papyte (argent) / Légende (violet)</div>
          <div>Postes: GK (noir) / DEF (rouge) / MIL (jaune) / ATT (vert)</div>
          <div>Formations: 25/25 schémas FUT17 (toutes les formations officielles)</div>
          <div>Encodage voyelles: A→E, E→I, I→O, O→U, U→A</div>
        </div>
      </div>
    </div>
  `,window.adminNav=o=>{var i;(i=document.querySelector(`[data-page="${o}"]`))==null||i.click()}}function x(e,n,t,a){return`<div class="card-panel" style="text-align:center">
    <div style="font-size:28px;margin-bottom:4px">${e}</div>
    <div style="font-size:28px;font-weight:700;color:${a}">${t}</div>
    <div style="font-size:11px;color:var(--gray-600)">${n}</div>
  </div>`}const T={ATT:"#1A6B3C",MIL:"#D4A017",DEF:"#bb2020",GK:"#111111"},H={normal:"#cccccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},J={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",MA:"MAROC",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE",MA:"MAROC"};function S(e,n,t=52){const a=t===52,d=a?"26,3 31.5,18 48,18 35,29 39.5,46 26,36 12.5,46 17,29 4,18 20.5,18":"16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11",r=a?26:16,o=a?32:20,i=a?16:9,s=a?50:31;return`<svg width="${t}" height="${s}" viewBox="0 0 ${t} ${s}" style="display:block">
    <polygon points="${d}" fill="${e}" stroke="#0005" stroke-width="${a?2:1.5}"/>
    <text x="${r}" y="${o}" text-anchor="middle" font-size="${i}" font-weight="900"
      fill="white" font-family="Arial Black,Arial">${n}</text>
  </svg>`}function Y(e,n={}){const{size:t="md",showNotes:a=!1,portraitUrl:d=null,clubLogoUrl:r=null}=n,o=e.rarity||"normal",i=H[o],s=e.job||"ATT",l=e.job2,m=e.current_note??(s==="ATT"?e.note_a:s==="MIL"?e.note_m:s==="DEF"?e.note_d:e.note_g),b=l?l==="ATT"?e.note_a:l==="MIL"?e.note_m:l==="DEF"?e.note_d:e.note_g:null,c=T[s],v=l?T[l]:null,g=e.country_code||"",y=J[g]||g,h=t==="sm"?120:160,u=d?`<img src="${d}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block">`:'<div style="width:100%;height:100%;background:#c5d8ec;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>',E=r?`<img src="${r}" alt="" class="mw-club-logo">`:`<div class="mw-club-badge">${e.club_encoded_name||"CLUB"}</div>`,A=o==="legende"?'<div style="background:#f5c518;color:#7a5800;border-radius:3px;padding:1px 5px;font-size:6px;font-weight:800;font-family:Arial">LÉGENDE</div>':o==="pepite"?'<div style="background:#D4A017;color:#fff;border-radius:3px;padding:1px 5px;font-size:6px;font-weight:800;font-family:Arial">PÉPITE</div>':o==="papyte"?'<div style="background:#909090;color:#fff;border-radius:3px;padding:1px 5px;font-size:6px;font-weight:800;font-family:Arial">PAPYTE</div>':E;return`<div class="mw-card" style="background:${i};width:${h}px;${t==="sm"?"transform:scale(0.75);transform-origin:top left;":""}">
    <div class="mw-inner" style="${o!=="normal"?`border:3px solid ${i};border-radius:8px`:""}">
      <div class="mw-name">
        <div class="mw-firstname">${e.firstname||""}</div>
        <div class="mw-lastname" style="font-size:${h===120?"13px":"16px"}">${(e.surname_encoded||"").toUpperCase()}</div>
      </div>
      <div class="mw-stars">
        <div class="mw-band" style="background:${c}"></div>
        ${S(c,m,52)}
        ${l&&v?S(v,b,32):""}
      </div>
      <div class="mw-portrait" style="height:${h===120?"88px":"116px"}">
        ${u}
      </div>
      <div class="mw-footer">
        <div class="mw-flag">
          <img src="https://flagsapi.com/${g}/flat/64.png" alt="${y}">
        </div>
        <div class="mw-country">${y}</div>
        ${o==="normal"?E:A}
      </div>
      ${a?`<div style="background:#e8e0cc;padding:4px 8px;display:grid;grid-template-columns:1fr 1fr;gap:2px;font-size:9px">
        <div style="color:#555">GK <b style="color:#111">${e.note_g}</b></div>
        <div style="color:#555">DEF <b style="color:#111">${e.note_d}</b></div>
        <div style="color:#555">MIL <b style="color:#111">${e.note_m}</b></div>
        <div style="color:#555">ATT <b style="color:#111">${e.note_a}</b></div>
      </div>`:""}
    </div>
  </div>`}function _(e){const n={A:"E",E:"I",I:"O",O:"U",U:"A",a:"e",e:"i",i:"o",o:"u",u:"a"};return(e||"").replace(/[AEIOUaeiou]/g,t=>n[t]||t)}const R={normal:"Normal",pepite:"Pépite",papyte:"Papyte",legende:"Légende"},Q={normal:"#aaa",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function W(e,n){await I(e,n)}async function I(e,n){const{toast:t,openModal:a,closeModal:d}=n,[{data:r,error:o},{data:i}]=await Promise.all([p.from("players").select("*, clubs(encoded_name,logo_url)").order("surname_encoded"),p.from("clubs").select("id,encoded_name").order("encoded_name")]);if(o){e.innerHTML=`<p style="color:red">${o.message}</p>`;return}const s={};(i||[]).forEach(b=>{s[b.id]=b.encoded_name}),e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input id="search-players" placeholder="🔍 Nom, prénom…" style="width:220px">
        <select id="filter-rarity" style="width:130px">
          <option value="">Toutes raretés</option>
          ${Object.entries(R).map(([b,c])=>`<option value="${b}">${c}</option>`).join("")}
        </select>
        <select id="filter-job" style="width:120px">
          <option value="">Tous postes</option>
          <option value="GK">GK</option><option value="DEF">DEF</option>
          <option value="MIL">MIL</option><option value="ATT">ATT</option>
        </select>
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-size:13px;color:var(--gray-600);align-self:center" id="count-label">${r.length} joueur(s)</span>
        <button class="btn btn-primary" id="add-player-btn">+ Nouveau joueur</button>
      </div>
    </div>

    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Pays</th>
              <th>Club</th>
              <th>Poste</th>
              <th>Notes G/D/M/A</th>
              <th>Rareté</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="players-tbody"></tbody>
        </table>
      </div>
    </div>
  `,l(r);function l(b){document.getElementById("count-label").textContent=`${b.length} joueur(s)`,document.getElementById("players-tbody").innerHTML=b.map(c=>{var v;return`
      <tr>
        <td>
          <div style="font-weight:600">${c.firstname} ${c.surname_encoded}</div>
          <div style="font-size:11px;color:var(--gray-600)">${c.firstname} ${c.surname_real}</div>
        </td>
        <td>
          <img src="https://flagsapi.com/${c.country_code}/flat/32.png" alt="${c.country_code}" style="height:16px;vertical-align:middle"> ${c.country_code}
        </td>
        <td style="font-size:12px">${((v=c.clubs)==null?void 0:v.encoded_name)||"—"}</td>
        <td>
          <span style="font-weight:700;color:${c.job==="ATT"?"#1A6B3C":c.job==="MIL"?"#D4A017":c.job==="DEF"?"#bb2020":"#111"}">
            ${c.job}
          </span>
          ${c.job2?`<span style="font-size:11px;color:#aaa"> / ${c.job2}</span>`:""}
        </td>
        <td style="font-size:12px;font-family:monospace">
          ${c.note_g} / ${c.note_d} / ${c.note_m} / ${c.note_a}
        </td>
        <td>
          <span style="background:${Q[c.rarity]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
            ${R[c.rarity]||c.rarity}
          </span>
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${c.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${c.id}">🗑️</button>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll("[data-edit]").forEach(c=>{c.addEventListener("click",()=>{const v=r.find(g=>g.id===c.dataset.edit);k(v,i||[],{toast:t,openModal:a,closeModal:d,reload:()=>I(e,n)})})}),document.querySelectorAll("[data-del]").forEach(c=>{c.addEventListener("click",async()=>{if(!confirm("Supprimer ce joueur ? Les cartes associées resteront en jeu."))return;const{error:v}=await p.from("players").delete().eq("id",c.dataset.del);v?t(v.message,"error"):(t("Joueur supprimé","success"),I(e,n))})})}function m(){const b=document.getElementById("search-players").value.toLowerCase(),c=document.getElementById("filter-rarity").value,v=document.getElementById("filter-job").value;l(r.filter(g=>(!b||`${g.firstname} ${g.surname_encoded} ${g.surname_real}`.toLowerCase().includes(b))&&(!c||g.rarity===c)&&(!v||g.job===v)))}document.getElementById("search-players").addEventListener("input",m),document.getElementById("filter-rarity").addEventListener("change",m),document.getElementById("filter-job").addEventListener("change",m),document.getElementById("add-player-btn").addEventListener("click",()=>{k(null,i||[],{toast:t,openModal:a,closeModal:d,reload:()=>I(e,n)})})}function k(e,n,{toast:t,openModal:a,closeModal:d,reload:r}){const o=!!e,i='<option value="">— Club —</option>'+n.map(s=>`<option value="${s.id}" ${(e==null?void 0:e.club_id)===s.id?"selected":""}>${s.encoded_name}</option>`).join("");a(o?`Modifier ${e.firstname} ${e.surname_encoded}`:"Nouveau joueur",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div><label>Prénom</label><input id="pm-fn" value="${(e==null?void 0:e.firstname)||""}"></div>
      <div>
        <label>Nom réel</label>
        <div style="display:flex;gap:4px">
          <input id="pm-real" value="${(e==null?void 0:e.surname_real)||""}" style="flex:1">
          <button class="btn btn-ghost btn-sm" id="pm-encode-btn" title="Encoder">↻</button>
        </div>
      </div>
      <div><label>Nom encodé</label><input id="pm-enc" value="${(e==null?void 0:e.surname_encoded)||""}"></div>
      <div><label>Pays (ISO)</label>
        <select id="pm-country">
          ${["MA","FR","AR","PT","BR","ES","DE","GB","IT","CM","SN","NG","DK","NL","BE","CI","AL","HR","RS","TR"].map(s=>`<option value="${s}" ${(e==null?void 0:e.country_code)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Club</label><select id="pm-club">${i}</select></div>
      <div><label>Poste principal</label>
        <select id="pm-job">
          ${["GK","DEF","MIL","ATT"].map(s=>`<option value="${s}" ${(e==null?void 0:e.job)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Poste 2</label>
        <select id="pm-job2">
          <option value="">Aucun</option>
          ${["GK","DEF","MIL","ATT"].map(s=>`<option value="${s}" ${(e==null?void 0:e.job2)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Rareté</label>
        <select id="pm-rarity">
          ${["normal","pepite","papyte","legende"].map(s=>`<option value="${s}" ${(e==null?void 0:e.rarity)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Note GK</label><input id="pm-g" type="number" min="0" max="10" value="${(e==null?void 0:e.note_g)||0}"></div>
      <div><label>Note DEF</label><input id="pm-d" type="number" min="0" max="10" value="${(e==null?void 0:e.note_d)||0}"></div>
      <div><label>Note MIL</label><input id="pm-m" type="number" min="0" max="10" value="${(e==null?void 0:e.note_m)||0}"></div>
      <div><label>Note ATT</label><input id="pm-a" type="number" min="0" max="10" value="${(e==null?void 0:e.note_a)||0}"></div>
      <div><label>Note min</label><input id="pm-nmin" type="number" min="0" max="10" value="${(e==null?void 0:e.note_min)||""}"></div>
      <div><label>Note max</label><input id="pm-nmax" type="number" min="0" max="10" value="${(e==null?void 0:e.note_max)||""}"></div>
      <div><label>Peau</label>
        <select id="pm-skin">
          ${["blanc","metisse","typ","noir"].map(s=>`<option value="${s}" ${(e==null?void 0:e.skin)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Cheveux</label>
        <select id="pm-hair">
          ${["blond","marron","noir","chauve"].map(s=>`<option value="${s}" ${(e==null?void 0:e.hair)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Longueur</label>
        <select id="pm-hlen">
          ${["rase","court","milong","long"].map(s=>`<option value="${s}" ${(e==null?void 0:e.hair_length)===s?"selected":""}>${s}</option>`).join("")}
        </select>
      </div>
      <div><label>Prix vente (crédits)</label><input id="pm-price" type="number" min="0" value="${(e==null?void 0:e.sell_price)||0}"></div>
    </div>`,`<button class="btn btn-ghost" id="pm-cancel">Annuler</button>
     <button class="btn btn-primary" id="pm-save">${o?"Enregistrer":"Créer"}</button>`),document.getElementById("pm-cancel").addEventListener("click",d),document.getElementById("pm-encode-btn").addEventListener("click",()=>{document.getElementById("pm-enc").value=_(document.getElementById("pm-real").value)}),document.getElementById("pm-save").addEventListener("click",async()=>{const s={firstname:document.getElementById("pm-fn").value.trim(),surname_real:document.getElementById("pm-real").value.trim(),surname_encoded:document.getElementById("pm-enc").value.trim(),country_code:document.getElementById("pm-country").value,club_id:document.getElementById("pm-club").value||null,job:document.getElementById("pm-job").value,job2:document.getElementById("pm-job2").value||null,rarity:document.getElementById("pm-rarity").value,note_g:parseInt(document.getElementById("pm-g").value)||0,note_d:parseInt(document.getElementById("pm-d").value)||0,note_m:parseInt(document.getElementById("pm-m").value)||0,note_a:parseInt(document.getElementById("pm-a").value)||0,note_min:parseInt(document.getElementById("pm-nmin").value)||null,note_max:parseInt(document.getElementById("pm-nmax").value)||null,skin:document.getElementById("pm-skin").value,hair:document.getElementById("pm-hair").value,hair_length:document.getElementById("pm-hlen").value,sell_price:parseInt(document.getElementById("pm-price").value)||0};if(!s.firstname||!s.surname_real||!s.surname_encoded){t("Remplissez les champs obligatoires","error");return}const{error:l}=o?await p.from("players").update({...s,updated_at:new Date().toISOString()}).eq("id",e.id):await p.from("players").insert(s);if(l){t(l.message,"error");return}t(o?"Joueur modifié ✅":"Joueur créé ✅","success"),d(),r()})}let w=[];async function X(e,{toast:n,openModal:t,closeModal:a}){await L(e,{toast:n,openModal:t,closeModal:a})}async function L(e,n){const{data:t,error:a}=await p.from("clubs").select("*").order("encoded_name");if(a){e.innerHTML=`<p style="color:red">${a.message}</p>`;return}w=t||[],Z(e,n)}function Z(e,{toast:n,openModal:t,closeModal:a}){e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <div>
        <input id="search-clubs" placeholder="🔍 Rechercher un club…" style="width:280px">
      </div>
      <button class="btn btn-primary" id="add-club-btn">+ Nouveau club</button>
    </div>

    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom encodé</th>
              <th>Nom réel</th>
              <th>Pays</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="clubs-tbody"></tbody>
        </table>
      </div>
    </div>
  `,d(w),document.getElementById("search-clubs").addEventListener("input",r=>{const o=r.target.value.toLowerCase();d(w.filter(i=>i.encoded_name.toLowerCase().includes(o)||i.real_name.toLowerCase().includes(o)))}),document.getElementById("add-club-btn").addEventListener("click",()=>{M(null,{toast:n,openModal:t,closeModal:a,reload:()=>L(e,{toast:n,openModal:t,closeModal:a})})});function d(r){document.getElementById("clubs-tbody").innerHTML=r.map(o=>`
      <tr>
        <td>
          ${o.logo_url?`<img src="${o.logo_url}" style="width:32px;height:32px;object-fit:contain;border-radius:4px">`:`<div style="width:32px;height:32px;background:#1a3a7a;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">${o.encoded_name.slice(0,3)}</div>`}
        </td>
        <td><b>${o.encoded_name}</b></td>
        <td style="color:var(--gray-600);font-size:13px">${o.real_name}</td>
        <td><img src="https://flagsapi.com/${o.country_code}/flat/32.png" alt="${o.country_code}" style="height:18px;vertical-align:middle"> ${o.country_code}</td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${o.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${o.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll("[data-edit]").forEach(o=>{o.addEventListener("click",()=>{const i=w.find(s=>s.id===o.dataset.edit);M(i,{toast:n,openModal:t,closeModal:a,reload:()=>L(e,{toast:n,openModal:t,closeModal:a})})})}),document.querySelectorAll("[data-del]").forEach(o=>{o.addEventListener("click",async()=>{if(!confirm("Supprimer ce club ?"))return;const{error:i}=await p.from("clubs").delete().eq("id",o.dataset.del);i?n(i.message,"error"):(n("Club supprimé","success"),L(e,{toast:n,openModal:t,closeModal:a}))})})}}function M(e,{toast:n,openModal:t,closeModal:a,reload:d}){const r=!!e;t(r?"Modifier le club":"Nouveau club",`<div style="display:flex;flex-direction:column;gap:12px">
      <div>
        <label>Nom réel (ex: Paris Saint-Germain)</label>
        <input id="m-real" value="${(e==null?void 0:e.real_name)||""}">
      </div>
      <div>
        <label>Nom encodé (ex: PARIS FC) — auto-calculé ou personnalisé</label>
        <input id="m-encoded" value="${(e==null?void 0:e.encoded_name)||""}" placeholder="Ville + FC">
        <button class="btn btn-ghost btn-sm" id="auto-encode" style="margin-top:4px">↻ Auto-encoder</button>
      </div>
      <div>
        <label>Code pays (ISO 2 lettres, ex: FR)</label>
        <input id="m-country" value="${(e==null?void 0:e.country_code)||""}" maxlength="2" style="text-transform:uppercase">
      </div>
      <div>
        <label>Logo (URL Supabase Storage ou upload)</label>
        <input id="m-logo" value="${(e==null?void 0:e.logo_url)||""}" placeholder="https://...">
        <div style="font-size:11px;color:var(--gray-600);margin-top:2px">
          Uploader d'abord dans Supabase Storage > assets/clubs/ puis coller l'URL publique
        </div>
      </div>
      ${e!=null&&e.logo_url?`<div><img src="${e.logo_url}" style="max-height:60px"></div>`:""}
    </div>`,`<button class="btn btn-ghost" id="m-cancel">Annuler</button>
     <button class="btn btn-primary" id="m-save">${r?"Enregistrer":"Créer"}</button>`),document.getElementById("m-cancel").addEventListener("click",a),document.getElementById("auto-encode").addEventListener("click",()=>{const o=document.getElementById("m-real").value,i=o.split(" ")[0]||o;document.getElementById("m-encoded").value=i.toUpperCase()+" FC"}),document.getElementById("m-real").addEventListener("input",()=>{const o=document.getElementById("m-real").value;if(!document.getElementById("m-encoded").value){const i=o.split(" ")[0]||o;document.getElementById("m-encoded").value=i.toUpperCase()+" FC"}}),document.getElementById("m-save").addEventListener("click",async()=>{const o={real_name:document.getElementById("m-real").value.trim(),encoded_name:document.getElementById("m-encoded").value.trim().toUpperCase(),country_code:document.getElementById("m-country").value.trim().toUpperCase(),logo_url:document.getElementById("m-logo").value.trim()||null};if(!o.real_name||!o.encoded_name||!o.country_code){n("Remplissez tous les champs obligatoires","error");return}const{error:i}=r?await p.from("clubs").update(o).eq("id",e.id):await p.from("clubs").insert(o);if(i){n(i.message,"error");return}n(r?"Club modifié":"Club créé","success"),a(),d()})}const ee=["blanc","metisse","typ","noir"],te=["blond","marron","noir","chauve"],ne=["rase","court","milong","long"],oe=["normal","pepite","papyte","legende"],N=["GK","DEF","MIL","ATT"],ae=[["MA","Maroc"],["FR","France"],["AR","Argentine"],["PT","Portugal"],["BR","Brésil"],["ES","Espagne"],["DE","Allemagne"],["GB","Angleterre"],["IT","Italie"],["CM","Cameroun"],["SN","Sénégal"],["NG","Nigéria"],["DK","Danemark"],["NL","Pays-Bas"],["BE","Belgique"],["CI","Côte d'Ivoire"],["AL","Albanie"],["HR","Croatie"],["RS","Serbie"],["TR","Turquie"],["MW","Malawi"]];async function ie(e,{toast:n}){const{data:t}=await p.from("clubs").select("id,encoded_name,logo_url").order("encoded_name");e.innerHTML=le(t||[]),se(e,t||[],n),f()}function P(){var a;const e=((a=document.getElementById("cb-surname-real"))==null?void 0:a.value)||"",n=_(e),t=document.getElementById("cb-surname-enc");t&&(t.value=n)}function f(){var m,b,c,v;const e=g=>{var y;return((y=document.getElementById(g))==null?void 0:y.value)||""},n={firstname:e("cb-firstname"),surname_encoded:e("cb-surname-enc")||_(e("cb-surname-real")),country_code:e("cb-country"),club_encoded_name:((b=(m=document.getElementById("cb-club"))==null?void 0:m.selectedOptions[0])==null?void 0:b.text)||"",job:e("cb-job"),job2:e("cb-job2")||null,note_g:parseInt(e("cb-note-g"))||0,note_d:parseInt(e("cb-note-d"))||0,note_m:parseInt(e("cb-note-m"))||0,note_a:parseInt(e("cb-note-a"))||0,rarity:e("cb-rarity"),skin:e("cb-skin"),hair:e("cb-hair"),hair_length:e("cb-hair-length")},t=V(n.skin,n.hair,n.hair_length);e("cb-club");const a=document.getElementById("cb-club"),d=((v=(c=a==null?void 0:a.selectedOptions[0])==null?void 0:c.dataset)==null?void 0:v.logo)||null,r=Y(n,{portraitUrl:t,clubLogoUrl:d,showNotes:!0}),o=document.getElementById("card-preview");o&&(o.innerHTML=r);const i=e("cb-surname-real"),s=n.surname_encoded,l=document.getElementById("encode-summary");l&&i&&(l.textContent=`${e("cb-firstname")} ${i} → ${e("cb-firstname")} ${s}`)}function se(e,n,t){var a,d,r,o;e.querySelectorAll("input,select").forEach(i=>{i.addEventListener("input",f),i.addEventListener("change",f)}),(a=document.getElementById("cb-surname-real"))==null||a.addEventListener("input",()=>{P(),f()}),(d=document.getElementById("btn-encode"))==null||d.addEventListener("click",()=>{P(),f()}),(r=document.getElementById("btn-save-player"))==null||r.addEventListener("click",async()=>{await re(n,t)}),(o=document.getElementById("btn-reset"))==null||o.addEventListener("click",()=>{e.querySelectorAll("input").forEach(i=>i.value=""),e.querySelectorAll("select").forEach(i=>i.selectedIndex=0),f()})}async function re(e,n){const t=s=>{var l;return((l=document.getElementById(s))==null?void 0:l.value)||""},a=t("cb-surname-real").trim(),d=t("cb-surname-enc").trim()||_(a);if(!t("cb-firstname")||!a||!t("cb-country")||!t("cb-job")){n("Remplissez les champs obligatoires (prénom, nom, pays, poste)","error");return}const r=t("cb-club")||null,o={firstname:t("cb-firstname").trim(),surname_real:a,surname_encoded:d,country_code:t("cb-country"),club_id:r||null,job:t("cb-job"),job2:t("cb-job2")||null,note_g:parseInt(t("cb-note-g"))||0,note_d:parseInt(t("cb-note-d"))||0,note_m:parseInt(t("cb-note-m"))||0,note_a:parseInt(t("cb-note-a"))||0,rarity:t("cb-rarity")||"normal",note_min:parseInt(t("cb-note-min"))||null,note_max:parseInt(t("cb-note-max"))||null,skin:t("cb-skin")||"blanc",hair:t("cb-hair")||"noir",hair_length:t("cb-hair-length")||"court",sell_price:parseInt(t("cb-price"))||0},{error:i}=await p.from("players").insert(o);if(i){n("Erreur: "+i.message,"error");return}n(`✅ Joueur "${o.firstname} ${o.surname_encoded}" enregistré !`,"success")}function le(e){const n=ae.map(([l,m])=>`<option value="${l}">${m} (${l})</option>`).join(""),t='<option value="">— Sélectionner un club —</option>'+e.map(l=>`<option value="${l.id}" data-logo="${l.logo_url||""}">${l.encoded_name}</option>`).join(""),a=N.map(l=>`<option value="${l}">${l}</option>`).join(""),d='<option value="">Aucun</option>'+N.map(l=>`<option value="${l}">${l}</option>`).join(""),r=oe.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join(""),o=ee.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join(""),i=te.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join(""),s=ne.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join("");return`
  <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start">

    <!-- ── Formulaire gauche ── -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <!-- Identité -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">👤 Identité du joueur</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><label>Prénom *</label><input id="cb-firstname" placeholder="Osame"></div>
          <div>
            <label>Nom réel * <span style="font-weight:400;color:#999">(non affiché en jeu)</span></label>
            <div style="display:flex;gap:6px">
              <input id="cb-surname-real" placeholder="Sahraoui" style="flex:1">
              <button class="btn btn-ghost btn-sm" id="btn-encode" title="Encoder les voyelles">↻</button>
            </div>
          </div>
          <div>
            <label>Nom encodé * <span style="font-weight:400;color:#999">(GDD §4.5 — voyelles +1)</span></label>
            <input id="cb-surname-enc" placeholder="Sehreuao">
          </div>
          <div id="encode-summary-wrap" style="display:flex;align-items:flex-end">
            <div id="encode-summary" style="font-size:11px;color:var(--gray-600);padding-bottom:8px;font-style:italic"></div>
          </div>
          <div><label>Pays *</label><select id="cb-country">${n}</select></div>
          <div><label>Club</label><select id="cb-club">${t}</select></div>
        </div>
      </div>

      <!-- Poste & Notes -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">⭐ Poste & Notes</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><label>Poste principal *</label><select id="cb-job">${a}</select></div>
          <div><label>Poste secondaire</label><select id="cb-job2">${d}</select></div>
          <div><label>Note GK (0-10)</label><input id="cb-note-g" type="number" min="0" max="10" value="0"></div>
          <div><label>Note DEF (0-10)</label><input id="cb-note-d" type="number" min="0" max="10" value="0"></div>
          <div><label>Note MIL (0-10)</label><input id="cb-note-m" type="number" min="0" max="10" value="0"></div>
          <div><label>Note ATT (0-10)</label><input id="cb-note-a" type="number" min="0" max="10" value="0"></div>
        </div>
        <div style="font-size:11px;color:var(--gray-600);margin-top:8px">
          La note principale affichée est celle du poste principal. Ex: poste ATT → note_a est mise en avant.
        </div>
      </div>

      <!-- Rareté -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">💎 Rareté (GDD §4.4)</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <div><label>Rareté</label><select id="cb-rarity">${r}</select></div>
          <div><label>Note min (Pépite/Papyte)</label><input id="cb-note-min" type="number" min="0" max="10" placeholder="—"></div>
          <div><label>Note max (Pépite seulement)</label><input id="cb-note-max" type="number" min="0" max="10" placeholder="—"></div>
        </div>
        <div style="margin-top:8px;display:flex;gap:8px">
          ${["normal","pepite","papyte","legende"].map(l=>`
            <div style="background:${H[l]};color:#fff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700">
              ${l.toUpperCase()}
            </div>`).join("")}
        </div>
      </div>

      <!-- Portrait -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:4px">🎨 Portrait joueur</h3>
        <p style="font-size:12px;color:var(--gray-600);margin-bottom:12px">
          Sélectionne les paramètres → l'image est chargée depuis Supabase Storage<br>
          Convention: <code style="background:#f0f0f0;padding:1px 4px;border-radius:3px">{peau}-{cheveux}-{longueur}.jpg</code>
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <div><label>Peau</label><select id="cb-skin">${o}</select></div>
          <div><label>Cheveux</label><select id="cb-hair">${i}</select></div>
          <div><label>Longueur</label><select id="cb-hair-length">${s}</select></div>
        </div>
        <div style="font-size:11px;color:var(--gray-600);margin-top:6px">
          📂 Uploader les images dans Supabase Storage > <code>assets/tetes/</code>
        </div>
      </div>

      <!-- Prix & Actions -->
      <div class="card-panel">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:12px">💰 Prix & Enregistrement</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
          <div><label>Prix de vente directe (crédits)</label><input id="cb-price" type="number" min="0" value="30000"></div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" id="btn-save-player">💾 Enregistrer en BDD</button>
          <button class="btn btn-ghost" id="btn-reset">↺ Réinitialiser</button>
        </div>
      </div>
    </div>

    <!-- ── Preview droite ── -->
    <div style="position:sticky;top:16px">
      <div class="card-panel" style="text-align:center">
        <h3 style="font-size:13px;font-weight:600;margin-bottom:12px;color:var(--gray-600)">APERÇU EN TEMPS RÉEL</h3>
        <div id="card-preview" style="display:inline-block"></div>
        <div style="margin-top:12px;font-size:11px;color:var(--gray-600)">
          La carte se met à jour automatiquement<br>selon tes saisies.
        </div>
      </div>
    </div>
  </div>
  `}async function G(e,{toast:n}){const{data:t,error:a}=await p.from("users").select("id,pseudo,club_name,credits,level,wins,draws,losses,trophies_top1,trophies_top2,trophies_top3,is_admin,created_at").order("created_at",{ascending:!1});if(a){e.innerHTML=`<p style="color:red">${a.message}</p>`;return}e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <input id="search-users" placeholder="🔍 Rechercher un manager…" style="width:260px">
      <span style="font-size:13px;color:var(--gray-600)">${(t||[]).length} manager(s)</span>
    </div>
    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pseudo</th><th>Club</th><th>Crédits</th><th>Niv.</th>
              <th>V/N/D</th><th>TOP1/2/3</th><th>Admin</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="users-tbody"></tbody>
        </table>
      </div>
    </div>
  `;const d=t||[];r(d),document.getElementById("search-users").addEventListener("input",o=>{const i=o.target.value.toLowerCase();r(d.filter(s=>{var l;return s.pseudo.toLowerCase().includes(i)||((l=s.club_name)==null?void 0:l.toLowerCase().includes(i))}))});function r(o){document.getElementById("users-tbody").innerHTML=o.map(i=>`
      <tr>
        <td><b>${i.pseudo}</b></td>
        <td style="font-size:12px">${i.club_name||"—"}</td>
        <td style="font-size:12px">${(i.credits||0).toLocaleString("fr")} cr.</td>
        <td><b>${i.level}</b></td>
        <td style="font-size:12px">${i.wins}/${i.draws}/${i.losses}</td>
        <td style="font-size:12px">🥇${i.trophies_top1} 🥈${i.trophies_top2} 🥉${i.trophies_top3}</td>
        <td>
          ${i.is_admin?'<span style="color:#1A6B3C;font-weight:700;font-size:12px">✅ Admin</span>':'<span style="color:#aaa;font-size:12px">Manager</span>'}
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-toggle-admin="${i.id}" data-is-admin="${i.is_admin}">
            ${i.is_admin?"🔒 Retirer admin":"🔓 Rendre admin"}
          </button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll("[data-toggle-admin]").forEach(i=>{i.addEventListener("click",async()=>{const s=i.dataset.isAdmin!=="true";if(!confirm(`Voulez-vous ${s?"rendre admin":"retirer le rôle admin"} de ce Manager ?`))return;const{error:m}=await p.from("users").update({is_admin:s}).eq("id",i.dataset.toggleAdmin);m?n(m.message,"error"):(n("Rôle mis à jour ✅","success"),G(e,{toast:n}))})})}}async function q(e,{toast:n}){const{data:t,error:a}=await p.from("market_listings").select(`
      id, price, status, listed_at, sold_at,
      seller:users!seller_id(pseudo),
      buyer:users!buyer_id(pseudo),
      card:cards(
        card_type,
        player:players(firstname, surname_encoded, rarity, job)
      )
    `).order("listed_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<p style="color:red">${a.message}</p>`;return}const d=t||[],r=d.filter(i=>i.status==="active").length,o=d.filter(i=>i.status==="sold").length;e.innerHTML=`
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#1A6B3C">${r}</div>
        <div style="font-size:11px;color:#666">Annonces actives</div>
      </div>
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#D4A017">${o}</div>
        <div style="font-size:11px;color:#666">Vendues</div>
      </div>
    </div>
    <div class="card-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Carte</th><th>Vendeur</th><th>Acheteur</th>
              <th>Prix</th><th>Statut</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${d.map(i=>{var b,c,v,g;const s=(b=i.card)==null?void 0:b.player,l=s?`${s.firstname} ${s.surname_encoded}`:((c=i.card)==null?void 0:c.card_type)||"—",m={active:"#1A6B3C",sold:"#D4A017",cancelled:"#aaa"};return`<tr>
                <td><b>${l}</b>${s?`<div style="font-size:10px;color:#999">${s.rarity} · ${s.job}</div>`:""}</td>
                <td style="font-size:12px">${((v=i.seller)==null?void 0:v.pseudo)||"—"}</td>
                <td style="font-size:12px">${((g=i.buyer)==null?void 0:g.pseudo)||"—"}</td>
                <td style="font-size:13px;font-weight:600">${(i.price||0).toLocaleString("fr")} cr.</td>
                <td>
                  <span style="background:${m[i.status]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
                    ${i.status.toUpperCase()}
                  </span>
                </td>
                <td style="font-size:11px;color:#aaa">${new Date(i.listed_at).toLocaleDateString("fr")}</td>
                <td>
                  ${i.status==="active"?`<button class="btn btn-danger btn-sm" data-cancel="${i.id}">Annuler</button>`:""}
                </td>
              </tr>`}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.querySelectorAll("[data-cancel]").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Annuler cette annonce ?"))return;const{error:s}=await p.from("market_listings").update({status:"cancelled"}).eq("id",i.dataset.cancel);s?n(s.message,"error"):(n("Annonce annulée","success"),q(e,{toast:n}))})})}async function de(e,{toast:n}){e.innerHTML=`
  <div style="display:flex;flex-direction:column;gap:20px">

    <!-- CLUBS -->
    <div class="card-panel">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:4px">🏟️ Clubs</h3>
      <p style="font-size:12px;color:var(--gray-600);margin-bottom:16px">Exporter/importer les clubs en masse via CSV.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost" id="export-clubs-template">📄 Template CSV vide</button>
        <button class="btn btn-primary" id="export-clubs">⬇️ Exporter les clubs</button>
        <label class="btn btn-yellow" style="cursor:pointer;margin:0">
          ⬆️ Importer clubs
          <input type="file" id="import-clubs" accept=".csv" style="display:none">
        </label>
      </div>
      <div id="clubs-import-result" style="margin-top:12px;font-size:13px"></div>
    </div>

    <!-- JOUEURS -->
    <div class="card-panel">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:4px">🃏 Joueurs</h3>
      <p style="font-size:12px;color:var(--gray-600);margin-bottom:16px">Exporter/importer les joueurs en masse via CSV. L'encodage des noms est automatique si la colonne surname_encoded est vide.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost" id="export-players-template">📄 Template CSV vide</button>
        <button class="btn btn-primary" id="export-players">⬇️ Exporter les joueurs</button>
        <label class="btn btn-yellow" style="cursor:pointer;margin:0">
          ⬆️ Importer joueurs
          <input type="file" id="import-players" accept=".csv" style="display:none">
        </label>
      </div>
      <div id="players-import-result" style="margin-top:12px;font-size:13px"></div>
    </div>

    <!-- AIDE -->
    <div class="card-panel" style="background:#f9f9f9">
      <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">📋 Format CSV</h4>
      <div style="font-size:12px;color:var(--gray-600);line-height:1.8">
        <b>Clubs :</b> real_name, encoded_name, country_code, logo_url<br>
        <b>Joueurs :</b> firstname, surname_real, surname_encoded, country_code, club_encoded_name, job, job2, note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price<br><br>
        <b>Valeurs autorisées :</b><br>
        • job/job2 : GK, DEF, MIL, ATT<br>
        • rarity : normal, pepite, papyte, legende<br>
        • skin : blanc, metisse, typ, noir<br>
        • hair : blond, marron, noir, chauve<br>
        • hair_length : rase, court, milong, long<br><br>
        💡 Le séparateur est la virgule. Première ligne = en-têtes. Si surname_encoded est vide, il est calculé automatiquement.
      </div>
    </div>
  </div>
  `,document.getElementById("export-clubs-template").addEventListener("click",()=>{$("clubs_template.csv",`real_name,encoded_name,country_code,logo_url
Paris Saint-Germain,PARIS FC,FR,
Real Madrid,MADRID FC,ES,
`)}),document.getElementById("export-players-template").addEventListener("click",()=>{$("players_template.csv",`firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price
Kylian,Mbappe,,FR,PARIS FC,ATT,,0,0,2,9,legende,,,blanc,noir,court,50000
Achraf,Hakimi,,MA,PARIS FC,DEF,MIL,0,7,5,3,pepite,5,9,metisse,noir,court,20000
`)}),document.getElementById("export-clubs").addEventListener("click",async()=>{const{data:t,error:a}=await p.from("clubs").select("real_name,encoded_name,country_code,logo_url").order("encoded_name");if(a){n(a.message,"error");return}if(!t||t.length===0){n("Aucun club à exporter","info");return}let d=`real_name,encoded_name,country_code,logo_url
`;t.forEach(r=>{d+=[r.real_name,r.encoded_name,r.country_code,r.logo_url||""].map(z).join(",")+`
`}),$("clubs_export.csv",d),n(`${t.length} clubs exportés`,"success")}),document.getElementById("export-players").addEventListener("click",async()=>{const{data:t,error:a}=await p.from("players").select("firstname,surname_real,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name)").order("surname_encoded");if(a){n(a.message,"error");return}if(!t||t.length===0){n("Aucun joueur à exporter","info");return}let d=`firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price
`;t.forEach(r=>{var o;d+=[r.firstname,r.surname_real,r.surname_encoded,r.country_code,((o=r.clubs)==null?void 0:o.encoded_name)||"",r.job,r.job2||"",r.note_g,r.note_d,r.note_m,r.note_a,r.rarity,r.note_min??"",r.note_max??"",r.skin,r.hair,r.hair_length,r.sell_price].map(z).join(",")+`
`}),$("players_export.csv",d),n(`${t.length} joueurs exportés`,"success")}),document.getElementById("import-clubs").addEventListener("change",async t=>{const a=t.target.files[0];if(!a)return;const d=document.getElementById("clubs-import-result");d.innerHTML='<span style="color:var(--gray-600)">Import en cours...</span>';try{const r=await a.text(),o=D(r);if(o.length===0){d.innerHTML='<span style="color:#c0392b">Fichier vide</span>';return}let i=0,s=0;const l=[];for(const m of o){if(!m.real_name||!m.encoded_name||!m.country_code){s++,l.push(`Ligne ignorée (champs manquants): ${m.real_name||"?"}`);continue}const b={real_name:m.real_name,encoded_name:m.encoded_name.toUpperCase(),country_code:m.country_code.toUpperCase().slice(0,2),logo_url:m.logo_url||null},{error:c}=await p.from("clubs").upsert(b,{onConflict:"encoded_name"});c?(s++,l.push(`${m.encoded_name}: ${c.message}`)):i++}d.innerHTML=`<div style="color:var(--green)">✅ ${i} clubs importés</div>
        ${s>0?`<div style="color:#c0392b">❌ ${s} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${l.slice(0,10).join("<br>")}</div>`:""}`,n(`${i} clubs importés`,"success")}catch(r){d.innerHTML=`<span style="color:#c0392b">Erreur : ${r.message}</span>`}t.target.value=""}),document.getElementById("import-players").addEventListener("change",async t=>{const a=t.target.files[0];if(!a)return;const d=document.getElementById("players-import-result");d.innerHTML='<span style="color:var(--gray-600)">Import en cours...</span>';try{const r=await a.text(),o=D(r);if(o.length===0){d.innerHTML='<span style="color:#c0392b">Fichier vide</span>';return}const{data:i}=await p.from("clubs").select("id,encoded_name"),s={};(i||[]).forEach(u=>{s[u.encoded_name.toUpperCase()]=u.id});let l=0,m=0;const b=[],c=["GK","DEF","MIL","ATT"],v=["normal","pepite","papyte","legende"],g=["blanc","metisse","typ","noir"],y=["blond","marron","noir","chauve"],h=["rase","court","milong","long"];for(const u of o){if(!u.firstname||!u.surname_real||!u.country_code||!u.job){m++,b.push(`Ligne ignorée (champs requis manquants): ${u.firstname||"?"}`);continue}if(!c.includes(u.job)){m++,b.push(`${u.firstname}: job invalide "${u.job}"`);continue}const E=u.club_encoded_name&&s[u.club_encoded_name.toUpperCase()]||null,A={firstname:u.firstname,surname_real:u.surname_real,surname_encoded:u.surname_encoded||_(u.surname_real),country_code:u.country_code.toUpperCase().slice(0,2),club_id:E,job:u.job,job2:c.includes(u.job2)?u.job2:null,note_g:parseInt(u.note_g)||0,note_d:parseInt(u.note_d)||0,note_m:parseInt(u.note_m)||0,note_a:parseInt(u.note_a)||0,rarity:v.includes(u.rarity)?u.rarity:"normal",note_min:u.note_min!==""&&u.note_min!=null?parseInt(u.note_min):null,note_max:u.note_max!==""&&u.note_max!=null?parseInt(u.note_max):null,skin:g.includes(u.skin)?u.skin:"blanc",hair:y.includes(u.hair)?u.hair:"noir",hair_length:h.includes(u.hair_length)?u.hair_length:"court",sell_price:parseInt(u.sell_price)||0},{error:B}=await p.from("players").insert(A);B?(m++,b.push(`${u.firstname} ${u.surname_real}: ${B.message}`)):l++}d.innerHTML=`<div style="color:var(--green)">✅ ${l} joueurs importés</div>
        ${m>0?`<div style="color:#c0392b">❌ ${m} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${b.slice(0,10).join("<br>")}</div>`:""}`,n(`${l} joueurs importés`,"success")}catch(r){d.innerHTML=`<span style="color:#c0392b">Erreur : ${r.message}</span>`}t.target.value=""})}function z(e){const n=String(e??"");return n.includes(",")||n.includes('"')||n.includes(`
`)?'"'+n.replace(/"/g,'""')+'"':n}function $(e,n){const t=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(t),d=document.createElement("a");d.href=a,d.download=e,d.click(),URL.revokeObjectURL(a)}function D(e){e=e.replace(/^\uFEFF/,"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);const n=e.split(`
`).filter(o=>o.trim());if(n.length<2)return[];const t=n[0],a=t.split(";").length>t.split(",").length?";":",",d=U(t,a).map(o=>o.trim().replace(/^\uFEFF/,"").toLowerCase()),r=[];for(let o=1;o<n.length;o++){if(!n[o].trim())continue;const i=U(n[o],a),s={};d.forEach((l,m)=>{s[l]=(i[m]||"").trim()}),!Object.values(s).every(l=>!l)&&r.push(s)}return r}function U(e,n=","){const t=[];let a="",d=!1;for(let r=0;r<e.length;r++){const o=e[r];d?o==='"'?e[r+1]==='"'?(a+='"',r++):d=!1:a+=o:o==='"'?d=!0:o===n?(t.push(a),a=""):a+=o}return t.push(a),t}function ce(e,n="info"){const t=document.getElementById("toast");t.textContent=e,t.className=`show ${n}`,clearTimeout(t._t),t._t=setTimeout(()=>{t.className=""},3e3)}function ue(e,n,t=""){document.getElementById("modal-title").textContent=e,document.getElementById("modal-body").innerHTML=n,document.getElementById("modal-footer").innerHTML=t,document.getElementById("modal-overlay").classList.remove("hidden")}function C(){document.getElementById("modal-overlay").classList.add("hidden")}const F={dashboard:{title:"Dashboard",fn:K},players:{title:"Joueurs & Cartes",fn:W},clubs:{title:"Clubs",fn:X},"card-builder":{title:"Card Builder",fn:ie},users:{title:"Managers",fn:G},market:{title:"Marché des transferts",fn:q},"import-export":{title:"Import / Export CSV",fn:de}};async function j(e){document.querySelectorAll(".admin-sidebar nav a").forEach(a=>{a.classList.toggle("active",a.dataset.page===e)});const n=F[e]||F.dashboard;document.getElementById("page-title").textContent=n.title;const t=document.getElementById("page-content");t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">Chargement…</div>';try{await n.fn(t,{toast:ce,openModal:ue,closeModal:C,navigate:j})}catch(a){t.innerHTML=`<div style="padding:40px;color:#c0392b">Erreur: ${a.message}</div>`,console.error(a)}}async function me(){const{data:{session:e}}=await p.auth.getSession();e&&await O(e.user),document.getElementById("auth-btn").addEventListener("click",async()=>{const n=document.getElementById("auth-email").value.trim(),t=document.getElementById("auth-password").value,a=document.getElementById("auth-error");if(a.textContent="",!n||!t){a.textContent="Remplissez tous les champs.";return}const{data:d,error:r}=await p.auth.signInWithPassword({email:n,password:t});if(r){a.textContent=r.message;return}await O(d.user)}),document.getElementById("auth-password").addEventListener("keydown",n=>{n.key==="Enter"&&document.getElementById("auth-btn").click()}),document.getElementById("logout-btn").addEventListener("click",async()=>{await p.auth.signOut(),document.getElementById("auth-screen").style.display="flex",document.getElementById("admin-app").style.display="none"}),document.getElementById("modal-close").addEventListener("click",C),document.getElementById("modal-overlay").addEventListener("click",n=>{n.target===n.currentTarget&&C()}),document.querySelectorAll(".admin-sidebar nav a").forEach(n=>{n.addEventListener("click",t=>{t.preventDefault(),j(n.dataset.page)})})}async function O(e){const{data:n,error:t}=await p.from("users").select("*").eq("id",e.id).single(),a=document.getElementById("auth-error");if(t||!n){a.textContent="Profil introuvable.";return}if(!n.is_admin){a.textContent="Accès refusé. Vous n'êtes pas administrateur.",await p.auth.signOut();return}document.getElementById("auth-screen").style.display="none",document.getElementById("admin-app").style.display="flex",document.getElementById("admin-user").textContent=`Admin: ${n.pseudo}`,j("dashboard")}me();
