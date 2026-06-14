import{s as b,g as oe,F as M,a as P,b as ie}from"./formation-links-Dqc5Z8Uj.js";async function ae(e){const[{count:n},{count:t},{count:o},{count:d},{count:r}]=await Promise.all([b.from("players").select("*",{count:"exact",head:!0}),b.from("clubs").select("*",{count:"exact",head:!0}),b.from("users").select("*",{count:"exact",head:!0}),b.from("cards").select("*",{count:"exact",head:!0}),b.from("matches").select("*",{count:"exact",head:!0})]);e.innerHTML=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      ${A("🃏","Joueurs (cartes)",n??"–","#1A6B3C")}
      ${A("🏟️","Clubs",t??"–","#D4A017")}
      ${A("👥","Managers",o??"–","#7a28b8")}
      ${A("📦","Cartes possédées",d??"–","#2a8f52")}
      ${A("⚽","Matchs joués",r??"–","#bb2020")}
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
  `,window.adminNav=i=>{var a;(a=document.querySelector(`[data-page="${i}"]`))==null||a.click()}}function A(e,n,t,o){return`<div class="card-panel" style="text-align:center">
    <div style="font-size:28px;margin-bottom:4px">${e}</div>
    <div style="font-size:28px;font-weight:700;color:${o}">${t}</div>
    <div style="font-size:11px;color:var(--gray-600)">${n}</div>
  </div>`}const D={ATT:"#1A6B3C",MIL:"#D4A017",DEF:"#bb2020",GK:"#111111"},W={normal:"#cccccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},se={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",MA:"MAROC",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE",MA:"MAROC"};function F(e,n,t=52){const o=t===52,d=o?"26,3 31.5,18 48,18 35,29 39.5,46 26,36 12.5,46 17,29 4,18 20.5,18":"16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11",r=o?26:16,i=o?32:20,a=o?16:9,s=o?50:31;return`<svg width="${t}" height="${s}" viewBox="0 0 ${t} ${s}" style="display:block">
    <polygon points="${d}" fill="${e}" stroke="#0005" stroke-width="${o?2:1.5}"/>
    <text x="${r}" y="${i}" text-anchor="middle" font-size="${a}" font-weight="900"
      fill="white" font-family="Arial Black,Arial">${n}</text>
  </svg>`}function re(e,n={}){const{size:t="md",showNotes:o=!1,portraitUrl:d=null,clubLogoUrl:r=null}=n,i=e.rarity||"normal",a=W[i],s=e.job||"ATT",l=e.job2,u=e.current_note??(s==="ATT"?e.note_a:s==="MIL"?e.note_m:s==="DEF"?e.note_d:e.note_g),p=l?l==="ATT"?e.note_a:l==="MIL"?e.note_m:l==="DEF"?e.note_d:e.note_g:null,c=D[s],g=l?D[l]:null,f=e.country_code||"",_=se[f]||f,h=t==="sm"?120:160,m=d?`<img src="${d}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block">`:'<div style="width:100%;height:100%;background:#c5d8ec;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>',$=r?`<img src="${r}" alt="" class="mw-club-logo">`:`<div class="mw-club-badge">${e.club_encoded_name||"CLUB"}</div>`,E=i==="legende"?'<div style="background:#f5c518;color:#7a5800;border-radius:3px;padding:1px 5px;font-size:6px;font-weight:800;font-family:Arial">LÉGENDE</div>':i==="pepite"?'<div style="background:#D4A017;color:#fff;border-radius:3px;padding:1px 5px;font-size:6px;font-weight:800;font-family:Arial">PÉPITE</div>':i==="papyte"?'<div style="background:#909090;color:#fff;border-radius:3px;padding:1px 5px;font-size:6px;font-weight:800;font-family:Arial">PAPYTE</div>':$;return`<div class="mw-card" style="background:${a};width:${h}px;${t==="sm"?"transform:scale(0.75);transform-origin:top left;":""}">
    <div class="mw-inner" style="${i!=="normal"?`border:3px solid ${a};border-radius:8px`:""}">
      <div class="mw-name">
        <div class="mw-firstname">${e.firstname||""}</div>
        <div class="mw-lastname" style="font-size:${h===120?"13px":"16px"}">${(e.surname_encoded||"").toUpperCase()}</div>
      </div>
      <div class="mw-stars">
        <div class="mw-band" style="background:${c}"></div>
        ${F(c,u,52)}
        ${l&&g?F(g,p,32):""}
      </div>
      <div class="mw-portrait" style="height:${h===120?"88px":"116px"}">
        ${m}
      </div>
      <div class="mw-footer">
        <div class="mw-flag">
          <img src="https://flagsapi.com/${f}/flat/64.png" alt="${_}">
        </div>
        <div class="mw-country">${_}</div>
        ${i==="normal"?$:E}
      </div>
      ${o?`<div style="background:#e8e0cc;padding:4px 8px;display:grid;grid-template-columns:1fr 1fr;gap:2px;font-size:9px">
        <div style="color:#555">GK <b style="color:#111">${e.note_g}</b></div>
        <div style="color:#555">DEF <b style="color:#111">${e.note_d}</b></div>
        <div style="color:#555">MIL <b style="color:#111">${e.note_m}</b></div>
        <div style="color:#555">ATT <b style="color:#111">${e.note_a}</b></div>
      </div>`:""}
    </div>
  </div>`}function B(e){const n={A:"E",E:"I",I:"O",O:"U",U:"A",a:"e",e:"i",i:"o",o:"u",u:"a"};return(e||"").replace(/[AEIOUaeiou]/g,t=>n[t]||t)}const O={normal:"Normal",pepite:"Pépite",papyte:"Papyte",legende:"Légende"},le={normal:"#aaa",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function de(e,n){await C(e,n)}async function C(e,n){const{toast:t,openModal:o,closeModal:d}=n,[{data:r,error:i},{data:a}]=await Promise.all([b.from("players").select("*, clubs(encoded_name,logo_url)").order("surname_encoded"),b.from("clubs").select("id,encoded_name").order("encoded_name")]);if(i){e.innerHTML=`<p style="color:red">${i.message}</p>`;return}const s={};(a||[]).forEach(p=>{s[p.id]=p.encoded_name}),e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input id="search-players" placeholder="🔍 Nom, prénom…" style="width:220px">
        <select id="filter-rarity" style="width:130px">
          <option value="">Toutes raretés</option>
          ${Object.entries(O).map(([p,c])=>`<option value="${p}">${c}</option>`).join("")}
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
  `,l(r);function l(p){document.getElementById("count-label").textContent=`${p.length} joueur(s)`,document.getElementById("players-tbody").innerHTML=p.map(c=>{var g;return`
      <tr>
        <td>
          <div style="font-weight:600">${c.firstname} ${c.surname_encoded}</div>
          <div style="font-size:11px;color:var(--gray-600)">${c.firstname} ${c.surname_real}</div>
        </td>
        <td>
          <img src="https://flagsapi.com/${c.country_code}/flat/32.png" alt="${c.country_code}" style="height:16px;vertical-align:middle"> ${c.country_code}
        </td>
        <td style="font-size:12px">${((g=c.clubs)==null?void 0:g.encoded_name)||"—"}</td>
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
          <span style="background:${le[c.rarity]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
            ${O[c.rarity]||c.rarity}
          </span>
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${c.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${c.id}">🗑️</button>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll("[data-edit]").forEach(c=>{c.addEventListener("click",()=>{const g=r.find(f=>f.id===c.dataset.edit);U(g,a||[],{toast:t,openModal:o,closeModal:d,reload:()=>C(e,n)})})}),document.querySelectorAll("[data-del]").forEach(c=>{c.addEventListener("click",async()=>{if(!confirm("Supprimer ce joueur ? Les cartes associées resteront en jeu."))return;const{error:g}=await b.from("players").delete().eq("id",c.dataset.del);g?t(g.message,"error"):(t("Joueur supprimé","success"),C(e,n))})})}function u(){const p=document.getElementById("search-players").value.toLowerCase(),c=document.getElementById("filter-rarity").value,g=document.getElementById("filter-job").value;l(r.filter(f=>(!p||`${f.firstname} ${f.surname_encoded} ${f.surname_real}`.toLowerCase().includes(p))&&(!c||f.rarity===c)&&(!g||f.job===g)))}document.getElementById("search-players").addEventListener("input",u),document.getElementById("filter-rarity").addEventListener("change",u),document.getElementById("filter-job").addEventListener("change",u),document.getElementById("add-player-btn").addEventListener("click",()=>{U(null,a||[],{toast:t,openModal:o,closeModal:d,reload:()=>C(e,n)})})}function U(e,n,{toast:t,openModal:o,closeModal:d,reload:r}){const i=!!e,a='<option value="">— Club —</option>'+n.map(s=>`<option value="${s.id}" ${(e==null?void 0:e.club_id)===s.id?"selected":""}>${s.encoded_name}</option>`).join("");o(i?`Modifier ${e.firstname} ${e.surname_encoded}`:"Nouveau joueur",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
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
      <div><label>Club</label><select id="pm-club">${a}</select></div>
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
     <button class="btn btn-primary" id="pm-save">${i?"Enregistrer":"Créer"}</button>`),document.getElementById("pm-cancel").addEventListener("click",d),document.getElementById("pm-encode-btn").addEventListener("click",()=>{document.getElementById("pm-enc").value=B(document.getElementById("pm-real").value)}),document.getElementById("pm-save").addEventListener("click",async()=>{const s={firstname:document.getElementById("pm-fn").value.trim(),surname_real:document.getElementById("pm-real").value.trim(),surname_encoded:document.getElementById("pm-enc").value.trim(),country_code:document.getElementById("pm-country").value,club_id:document.getElementById("pm-club").value||null,job:document.getElementById("pm-job").value,job2:document.getElementById("pm-job2").value||null,rarity:document.getElementById("pm-rarity").value,note_g:parseInt(document.getElementById("pm-g").value)||0,note_d:parseInt(document.getElementById("pm-d").value)||0,note_m:parseInt(document.getElementById("pm-m").value)||0,note_a:parseInt(document.getElementById("pm-a").value)||0,note_min:parseInt(document.getElementById("pm-nmin").value)||null,note_max:parseInt(document.getElementById("pm-nmax").value)||null,skin:document.getElementById("pm-skin").value,hair:document.getElementById("pm-hair").value,hair_length:document.getElementById("pm-hlen").value,sell_price:parseInt(document.getElementById("pm-price").value)||0};if(!s.firstname||!s.surname_real||!s.surname_encoded){t("Remplissez les champs obligatoires","error");return}const{error:l}=i?await b.from("players").update({...s,updated_at:new Date().toISOString()}).eq("id",e.id):await b.from("players").insert(s);if(l){t(l.message,"error");return}t(i?"Joueur modifié ✅":"Joueur créé ✅","success"),d(),r()})}let T=[];async function ce(e,{toast:n,openModal:t,closeModal:o}){await S(e,{toast:n,openModal:t,closeModal:o})}async function S(e,n){const{data:t,error:o}=await b.from("clubs").select("*").order("encoded_name");if(o){e.innerHTML=`<p style="color:red">${o.message}</p>`;return}T=t||[],ue(e,n)}function ue(e,{toast:n,openModal:t,closeModal:o}){e.innerHTML=`
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
  `,d(T),document.getElementById("search-clubs").addEventListener("input",r=>{const i=r.target.value.toLowerCase();d(T.filter(a=>a.encoded_name.toLowerCase().includes(i)||a.real_name.toLowerCase().includes(i)))}),document.getElementById("add-club-btn").addEventListener("click",()=>{H(null,{toast:n,openModal:t,closeModal:o,reload:()=>S(e,{toast:n,openModal:t,closeModal:o})})});function d(r){document.getElementById("clubs-tbody").innerHTML=r.map(i=>`
      <tr>
        <td>
          ${i.logo_url?`<img src="${i.logo_url}" style="width:32px;height:32px;object-fit:contain;border-radius:4px">`:`<div style="width:32px;height:32px;background:#1a3a7a;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">${i.encoded_name.slice(0,3)}</div>`}
        </td>
        <td><b>${i.encoded_name}</b></td>
        <td style="color:var(--gray-600);font-size:13px">${i.real_name}</td>
        <td><img src="https://flagsapi.com/${i.country_code}/flat/32.png" alt="${i.country_code}" style="height:18px;vertical-align:middle"> ${i.country_code}</td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${i.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${i.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll("[data-edit]").forEach(i=>{i.addEventListener("click",()=>{const a=T.find(s=>s.id===i.dataset.edit);H(a,{toast:n,openModal:t,closeModal:o,reload:()=>S(e,{toast:n,openModal:t,closeModal:o})})})}),document.querySelectorAll("[data-del]").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Supprimer ce club ?"))return;const{error:a}=await b.from("clubs").delete().eq("id",i.dataset.del);a?n(a.message,"error"):(n("Club supprimé","success"),S(e,{toast:n,openModal:t,closeModal:o}))})})}}function H(e,{toast:n,openModal:t,closeModal:o,reload:d}){const r=!!e;t(r?"Modifier le club":"Nouveau club",`<div style="display:flex;flex-direction:column;gap:12px">
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
     <button class="btn btn-primary" id="m-save">${r?"Enregistrer":"Créer"}</button>`),document.getElementById("m-cancel").addEventListener("click",o),document.getElementById("auto-encode").addEventListener("click",()=>{const i=document.getElementById("m-real").value,a=i.split(" ")[0]||i;document.getElementById("m-encoded").value=a.toUpperCase()+" FC"}),document.getElementById("m-real").addEventListener("input",()=>{const i=document.getElementById("m-real").value;if(!document.getElementById("m-encoded").value){const a=i.split(" ")[0]||i;document.getElementById("m-encoded").value=a.toUpperCase()+" FC"}}),document.getElementById("m-save").addEventListener("click",async()=>{const i={real_name:document.getElementById("m-real").value.trim(),encoded_name:document.getElementById("m-encoded").value.trim().toUpperCase(),country_code:document.getElementById("m-country").value.trim().toUpperCase(),logo_url:document.getElementById("m-logo").value.trim()||null};if(!i.real_name||!i.encoded_name||!i.country_code){n("Remplissez tous les champs obligatoires","error");return}const{error:a}=r?await b.from("clubs").update(i).eq("id",e.id):await b.from("clubs").insert(i);if(a){n(a.message,"error");return}n(r?"Club modifié":"Club créé","success"),o(),d()})}const me=["blanc","metisse","typ","noir"],pe=["blond","marron","noir","chauve"],be=["rase","court","milong","long"],ge=["normal","pepite","papyte","legende"],G=["GK","DEF","MIL","ATT"],ve=[["MA","Maroc"],["FR","France"],["AR","Argentine"],["PT","Portugal"],["BR","Brésil"],["ES","Espagne"],["DE","Allemagne"],["GB","Angleterre"],["IT","Italie"],["CM","Cameroun"],["SN","Sénégal"],["NG","Nigéria"],["DK","Danemark"],["NL","Pays-Bas"],["BE","Belgique"],["CI","Côte d'Ivoire"],["AL","Albanie"],["HR","Croatie"],["RS","Serbie"],["TR","Turquie"],["MW","Malawi"]];async function fe(e,{toast:n}){const{data:t}=await b.from("clubs").select("id,encoded_name,logo_url").order("encoded_name");e.innerHTML=xe(t||[]),ye(e,t||[],n),I()}function q(){var o;const e=((o=document.getElementById("cb-surname-real"))==null?void 0:o.value)||"",n=B(e),t=document.getElementById("cb-surname-enc");t&&(t.value=n)}function I(){var u,p,c,g;const e=f=>{var _;return((_=document.getElementById(f))==null?void 0:_.value)||""},n={firstname:e("cb-firstname"),surname_encoded:e("cb-surname-enc")||B(e("cb-surname-real")),country_code:e("cb-country"),club_encoded_name:((p=(u=document.getElementById("cb-club"))==null?void 0:u.selectedOptions[0])==null?void 0:p.text)||"",job:e("cb-job"),job2:e("cb-job2")||null,note_g:parseInt(e("cb-note-g"))||0,note_d:parseInt(e("cb-note-d"))||0,note_m:parseInt(e("cb-note-m"))||0,note_a:parseInt(e("cb-note-a"))||0,rarity:e("cb-rarity"),skin:e("cb-skin"),hair:e("cb-hair"),hair_length:e("cb-hair-length")},t=oe(n.skin,n.hair,n.hair_length);e("cb-club");const o=document.getElementById("cb-club"),d=((g=(c=o==null?void 0:o.selectedOptions[0])==null?void 0:c.dataset)==null?void 0:g.logo)||null,r=re(n,{portraitUrl:t,clubLogoUrl:d,showNotes:!0}),i=document.getElementById("card-preview");i&&(i.innerHTML=r);const a=e("cb-surname-real"),s=n.surname_encoded,l=document.getElementById("encode-summary");l&&a&&(l.textContent=`${e("cb-firstname")} ${a} → ${e("cb-firstname")} ${s}`)}function ye(e,n,t){var o,d,r,i;e.querySelectorAll("input,select").forEach(a=>{a.addEventListener("input",I),a.addEventListener("change",I)}),(o=document.getElementById("cb-surname-real"))==null||o.addEventListener("input",()=>{q(),I()}),(d=document.getElementById("btn-encode"))==null||d.addEventListener("click",()=>{q(),I()}),(r=document.getElementById("btn-save-player"))==null||r.addEventListener("click",async()=>{await he(n,t)}),(i=document.getElementById("btn-reset"))==null||i.addEventListener("click",()=>{e.querySelectorAll("input").forEach(a=>a.value=""),e.querySelectorAll("select").forEach(a=>a.selectedIndex=0),I()})}async function he(e,n){const t=s=>{var l;return((l=document.getElementById(s))==null?void 0:l.value)||""},o=t("cb-surname-real").trim(),d=t("cb-surname-enc").trim()||B(o);if(!t("cb-firstname")||!o||!t("cb-country")||!t("cb-job")){n("Remplissez les champs obligatoires (prénom, nom, pays, poste)","error");return}const r=t("cb-club")||null,i={firstname:t("cb-firstname").trim(),surname_real:o,surname_encoded:d,country_code:t("cb-country"),club_id:r||null,job:t("cb-job"),job2:t("cb-job2")||null,note_g:parseInt(t("cb-note-g"))||0,note_d:parseInt(t("cb-note-d"))||0,note_m:parseInt(t("cb-note-m"))||0,note_a:parseInt(t("cb-note-a"))||0,rarity:t("cb-rarity")||"normal",note_min:parseInt(t("cb-note-min"))||null,note_max:parseInt(t("cb-note-max"))||null,skin:t("cb-skin")||"blanc",hair:t("cb-hair")||"noir",hair_length:t("cb-hair-length")||"court",sell_price:parseInt(t("cb-price"))||0},{error:a}=await b.from("players").insert(i);if(a){n("Erreur: "+a.message,"error");return}n(`✅ Joueur "${i.firstname} ${i.surname_encoded}" enregistré !`,"success")}function xe(e){const n=ve.map(([l,u])=>`<option value="${l}">${u} (${l})</option>`).join(""),t='<option value="">— Sélectionner un club —</option>'+e.map(l=>`<option value="${l.id}" data-logo="${l.logo_url||""}">${l.encoded_name}</option>`).join(""),o=G.map(l=>`<option value="${l}">${l}</option>`).join(""),d='<option value="">Aucun</option>'+G.map(l=>`<option value="${l}">${l}</option>`).join(""),r=ge.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join(""),i=me.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join(""),a=pe.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join(""),s=be.map(l=>`<option value="${l}">${l.charAt(0).toUpperCase()+l.slice(1)}</option>`).join("");return`
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
          <div><label>Poste principal *</label><select id="cb-job">${o}</select></div>
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
            <div style="background:${W[l]};color:#fff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700">
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
          <div><label>Peau</label><select id="cb-skin">${i}</select></div>
          <div><label>Cheveux</label><select id="cb-hair">${a}</select></div>
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
  `}async function X(e,{toast:n}){const{data:t,error:o}=await b.from("users").select("id,pseudo,club_name,credits,level,wins,draws,losses,trophies_top1,trophies_top2,trophies_top3,is_admin,created_at").order("created_at",{ascending:!1});if(o){e.innerHTML=`<p style="color:red">${o.message}</p>`;return}e.innerHTML=`
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
  `;const d=t||[];r(d),document.getElementById("search-users").addEventListener("input",i=>{const a=i.target.value.toLowerCase();r(d.filter(s=>{var l;return s.pseudo.toLowerCase().includes(a)||((l=s.club_name)==null?void 0:l.toLowerCase().includes(a))}))});function r(i){document.getElementById("users-tbody").innerHTML=i.map(a=>`
      <tr>
        <td><b>${a.pseudo}</b></td>
        <td style="font-size:12px">${a.club_name||"—"}</td>
        <td style="font-size:12px">${(a.credits||0).toLocaleString("fr")} cr.</td>
        <td><b>${a.level}</b></td>
        <td style="font-size:12px">${a.wins}/${a.draws}/${a.losses}</td>
        <td style="font-size:12px">🥇${a.trophies_top1} 🥈${a.trophies_top2} 🥉${a.trophies_top3}</td>
        <td>
          ${a.is_admin?'<span style="color:#1A6B3C;font-weight:700;font-size:12px">✅ Admin</span>':'<span style="color:#aaa;font-size:12px">Manager</span>'}
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-toggle-admin="${a.id}" data-is-admin="${a.is_admin}">
            ${a.is_admin?"🔒 Retirer admin":"🔓 Rendre admin"}
          </button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll("[data-toggle-admin]").forEach(a=>{a.addEventListener("click",async()=>{const s=a.dataset.isAdmin!=="true";if(!confirm(`Voulez-vous ${s?"rendre admin":"retirer le rôle admin"} de ce Manager ?`))return;const{error:u}=await b.from("users").update({is_admin:s}).eq("id",a.dataset.toggleAdmin);u?n(u.message,"error"):(n("Rôle mis à jour ✅","success"),X(e,{toast:n}))})})}}async function Z(e,{toast:n}){const{data:t,error:o}=await b.from("market_listings").select(`
      id, price, status, listed_at, sold_at,
      seller:users!seller_id(pseudo),
      buyer:users!buyer_id(pseudo),
      card:cards(
        card_type,
        player:players(firstname, surname_encoded, rarity, job)
      )
    `).order("listed_at",{ascending:!1}).limit(100);if(o){e.innerHTML=`<p style="color:red">${o.message}</p>`;return}const d=t||[],r=d.filter(a=>a.status==="active").length,i=d.filter(a=>a.status==="sold").length;e.innerHTML=`
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#1A6B3C">${r}</div>
        <div style="font-size:11px;color:#666">Annonces actives</div>
      </div>
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#D4A017">${i}</div>
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
            ${d.map(a=>{var p,c,g,f;const s=(p=a.card)==null?void 0:p.player,l=s?`${s.firstname} ${s.surname_encoded}`:((c=a.card)==null?void 0:c.card_type)||"—",u={active:"#1A6B3C",sold:"#D4A017",cancelled:"#aaa"};return`<tr>
                <td><b>${l}</b>${s?`<div style="font-size:10px;color:#999">${s.rarity} · ${s.job}</div>`:""}</td>
                <td style="font-size:12px">${((g=a.seller)==null?void 0:g.pseudo)||"—"}</td>
                <td style="font-size:12px">${((f=a.buyer)==null?void 0:f.pseudo)||"—"}</td>
                <td style="font-size:13px;font-weight:600">${(a.price||0).toLocaleString("fr")} cr.</td>
                <td>
                  <span style="background:${u[a.status]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
                    ${a.status.toUpperCase()}
                  </span>
                </td>
                <td style="font-size:11px;color:#aaa">${new Date(a.listed_at).toLocaleDateString("fr")}</td>
                <td>
                  ${a.status==="active"?`<button class="btn btn-danger btn-sm" data-cancel="${a.id}">Annuler</button>`:""}
                </td>
              </tr>`}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.querySelectorAll("[data-cancel]").forEach(a=>{a.addEventListener("click",async()=>{if(!confirm("Annuler cette annonce ?"))return;const{error:s}=await b.from("market_listings").update({status:"cancelled"}).eq("id",a.dataset.cancel);s?n(s.message,"error"):(n("Annonce annulée","success"),Z(e,{toast:n}))})})}async function _e(e,{toast:n}){e.innerHTML=`
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
  `,document.getElementById("export-clubs-template").addEventListener("click",()=>{j("clubs_template.csv",`real_name,encoded_name,country_code,logo_url
Paris Saint-Germain,PARIS FC,FR,
Real Madrid,MADRID FC,ES,
`)}),document.getElementById("export-players-template").addEventListener("click",()=>{j("players_template.csv",`firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price
Kylian,Mbappe,,FR,PARIS FC,ATT,,0,0,2,9,legende,,,blanc,noir,court,50000
Achraf,Hakimi,,MA,PARIS FC,DEF,MIL,0,7,5,3,pepite,5,9,metisse,noir,court,20000
`)}),document.getElementById("export-clubs").addEventListener("click",async()=>{const{data:t,error:o}=await b.from("clubs").select("real_name,encoded_name,country_code,logo_url").order("encoded_name");if(o){n(o.message,"error");return}if(!t||t.length===0){n("Aucun club à exporter","info");return}let d=`real_name,encoded_name,country_code,logo_url
`;t.forEach(r=>{d+=[r.real_name,r.encoded_name,r.country_code,r.logo_url||""].map(V).join(",")+`
`}),j("clubs_export.csv",d),n(`${t.length} clubs exportés`,"success")}),document.getElementById("export-players").addEventListener("click",async()=>{const{data:t,error:o}=await b.from("players").select("firstname,surname_real,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name)").order("surname_encoded");if(o){n(o.message,"error");return}if(!t||t.length===0){n("Aucun joueur à exporter","info");return}let d=`firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price
`;t.forEach(r=>{var i;d+=[r.firstname,r.surname_real,r.surname_encoded,r.country_code,((i=r.clubs)==null?void 0:i.encoded_name)||"",r.job,r.job2||"",r.note_g,r.note_d,r.note_m,r.note_a,r.rarity,r.note_min??"",r.note_max??"",r.skin,r.hair,r.hair_length,r.sell_price].map(V).join(",")+`
`}),j("players_export.csv",d),n(`${t.length} joueurs exportés`,"success")}),document.getElementById("import-clubs").addEventListener("change",async t=>{const o=t.target.files[0];if(!o)return;const d=document.getElementById("clubs-import-result");d.innerHTML='<span style="color:var(--gray-600)">Import en cours...</span>';try{const r=await o.text(),i=K(r);if(i.length===0){d.innerHTML='<span style="color:#c0392b">Fichier vide</span>';return}let a=0,s=0;const l=[];for(const u of i){if(!u.real_name||!u.encoded_name||!u.country_code){s++,l.push(`Ligne ignorée (champs manquants): ${u.real_name||"?"}`);continue}const p={real_name:u.real_name,encoded_name:u.encoded_name.toUpperCase(),country_code:u.country_code.toUpperCase().slice(0,2),logo_url:u.logo_url||null},{error:c}=await b.from("clubs").upsert(p,{onConflict:"encoded_name"});c?(s++,l.push(`${u.encoded_name}: ${c.message}`)):a++}d.innerHTML=`<div style="color:var(--green)">✅ ${a} clubs importés</div>
        ${s>0?`<div style="color:#c0392b">❌ ${s} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${l.slice(0,10).join("<br>")}</div>`:""}`,n(`${a} clubs importés`,"success")}catch(r){d.innerHTML=`<span style="color:#c0392b">Erreur : ${r.message}</span>`}t.target.value=""}),document.getElementById("import-players").addEventListener("change",async t=>{const o=t.target.files[0];if(!o)return;const d=document.getElementById("players-import-result");d.innerHTML='<span style="color:var(--gray-600)">Import en cours...</span>';try{const r=await o.text(),i=K(r);if(i.length===0){d.innerHTML='<span style="color:#c0392b">Fichier vide</span>';return}const{data:a}=await b.from("clubs").select("id,encoded_name"),s={};(a||[]).forEach(m=>{s[m.encoded_name.toUpperCase()]=m.id});let l=0,u=0;const p=[],c=["GK","DEF","MIL","ATT"],g=["normal","pepite","papyte","legende"],f=["blanc","metisse","typ","noir"],_=["blond","marron","noir","chauve"],h=["rase","court","milong","long"];for(const m of i){if(!m.firstname||!m.surname_real||!m.country_code||!m.job){u++,p.push(`Ligne ignorée (champs requis manquants): ${m.firstname||"?"}`);continue}if(!c.includes(m.job)){u++,p.push(`${m.firstname}: job invalide "${m.job}"`);continue}const $=m.club_encoded_name&&s[m.club_encoded_name.toUpperCase()]||null,E={firstname:m.firstname,surname_real:m.surname_real,surname_encoded:m.surname_encoded||B(m.surname_real),country_code:m.country_code.toUpperCase().slice(0,2),club_id:$,job:m.job,job2:c.includes(m.job2)?m.job2:null,note_g:parseInt(m.note_g)||0,note_d:parseInt(m.note_d)||0,note_m:parseInt(m.note_m)||0,note_a:parseInt(m.note_a)||0,rarity:g.includes(m.rarity)?m.rarity:"normal",note_min:m.note_min!==""&&m.note_min!=null?parseInt(m.note_min):null,note_max:m.note_max!==""&&m.note_max!=null?parseInt(m.note_max):null,skin:f.includes(m.skin)?m.skin:"blanc",hair:_.includes(m.hair)?m.hair:"noir",hair_length:h.includes(m.hair_length)?m.hair_length:"court",sell_price:parseInt(m.sell_price)||0},{error:v}=await b.from("players").insert(E);v?(u++,p.push(`${m.firstname} ${m.surname_real}: ${v.message}`)):l++}d.innerHTML=`<div style="color:var(--green)">✅ ${l} joueurs importés</div>
        ${u>0?`<div style="color:#c0392b">❌ ${u} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${p.slice(0,10).join("<br>")}</div>`:""}`,n(`${l} joueurs importés`,"success")}catch(r){d.innerHTML=`<span style="color:#c0392b">Erreur : ${r.message}</span>`}t.target.value=""})}function V(e){const n=String(e??"");return n.includes(",")||n.includes('"')||n.includes(`
`)?'"'+n.replace(/"/g,'""')+'"':n}function j(e,n){const t=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(t),d=document.createElement("a");d.href=o,d.download=e,d.click(),URL.revokeObjectURL(o)}function K(e){e=e.replace(/^\uFEFF/,"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);const n=e.split(`
`).filter(i=>i.trim());if(n.length<2)return[];const t=n[0],o=t.split(";").length>t.split(",").length?";":",",d=J(t,o).map(i=>i.trim().replace(/^\uFEFF/,"").toLowerCase()),r=[];for(let i=1;i<n.length;i++){if(!n[i].trim())continue;const a=J(n[i],o),s={};d.forEach((l,u)=>{s[l]=(a[u]||"").trim()}),!Object.values(s).every(l=>!l)&&r.push(s)}return r}function J(e,n=","){const t=[];let o="",d=!1;for(let r=0;r<e.length;r++){const i=e[r];d?i==='"'?e[r+1]==='"'?(o+='"',r++):d=!1:o+=i:i==='"'?d=!0:i===n?(t.push(o),o=""):o+=i}return t.push(o),t}const $e={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};async function Ee(e,{toast:n}){const t=Object.keys(M);let o=t[0];const{data:d}=await b.from("formation_links_overrides").select("formation, links"),r={};(d||[]).forEach(u=>{r[u.formation]=u.links});let i=new Set;function a(u,p){return[u,p].sort().join("-")}function s(u){const p=r[u]||M[u]||[];i=new Set(p.map(([c,g])=>a(c,g)))}s(o),e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:10px">
        <label style="font-weight:700;font-size:13px">Formation :</label>
        <select id="formation-select" style="padding:6px 10px;font-size:14px;border-radius:8px;border:1.5px solid #ccc">
          ${t.map(u=>`<option value="${u}" ${u===o?"selected":""}>${u}</option>`).join("")}
        </select>
        <button class="btn btn-ghost btn-sm" id="reset-btn">↺ Réinitialiser (défaut)</button>
      </div>
      <button class="btn btn-primary" id="save-btn">💾 Enregistrer les liens</button>
    </div>

    <div class="card-panel" style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
      <div style="flex-shrink:0">
        <div id="field-wrap" style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px"></div>
        <div style="margin-top:10px;font-size:12px;color:var(--gray-600);line-height:1.6">
          <div><span style="display:inline-block;width:18px;height:3px;background:#3b82f6;vertical-align:middle;margin-right:6px"></span> Lien actif (cliquer pour désactiver)</div>
          <div><span style="display:inline-block;width:18px;height:3px;background:#999;vertical-align:middle;margin-right:6px;opacity:0.5"></span> Lien inactif (cliquer pour activer)</div>
        </div>
      </div>
      <div style="flex:1;min-width:240px">
        <div style="font-weight:700;font-size:13px;margin-bottom:8px">Liens (${i.size}/? actifs)</div>
        <div id="links-list" style="display:flex;flex-direction:column;gap:4px;max-height:520px;overflow-y:auto"></div>
      </div>
    </div>
  `;function l(){const u=ie[o]||{},p=P(o),c=320,g=400,f=22;function _(v){const y=u[v];return y?{x:y.x*c,y:y.y*g}:null}let h=`<svg width="${c}" height="${g}" viewBox="0 0 ${c} ${g}" xmlns="http://www.w3.org/2000/svg" style="display:block">`;p.forEach(([v,y],w)=>{const x=_(v),L=_(y);if(!x||!L)return;const R=a(v,y),k=i.has(R),ee=k?"#3b82f6":"#999",te=k?.95:.35,ne=k?4:3;h+=`<line x1="${x.x}" y1="${x.y}" x2="${L.x}" y2="${L.y}"
        stroke="transparent" stroke-width="14" class="link-hit" data-key="${R}" style="cursor:pointer"/>`,h+=`<line x1="${x.x}" y1="${x.y}" x2="${L.x}" y2="${L.y}"
        stroke="${ee}" stroke-width="${ne}" stroke-dasharray="${k?"none":"4,3"}"
        opacity="${te}" pointer-events="none" data-line-key="${R}"/>`});for(const v of Object.keys(u)){const y=_(v);if(!y)continue;const w=v.replace(/\d+/,""),x=$e[w]||"#555";h+=`<circle cx="${y.x}" cy="${y.y}" r="${f}" fill="${x}" stroke="rgba(255,255,255,0.7)" stroke-width="2" pointer-events="none"/>`,h+=`<text x="${y.x}" y="${y.y+4}" text-anchor="middle" font-size="10" font-weight="900" fill="white" font-family="Arial Black,Arial" pointer-events="none">${v}</text>`}h+="</svg>",document.getElementById("field-wrap").innerHTML=h;const m=document.getElementById("links-list");m.innerHTML=p.map(([v,y])=>{const w=a(v,y),x=i.has(w);return`
        <button class="link-toggle" data-key="${w}" style="
          display:flex;justify-content:space-between;align-items:center;
          padding:6px 10px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;
          border:1.5px solid ${x?"#3b82f6":"#ddd"};
          background:${x?"#eaf2ff":"#fafafa"};
          color:${x?"#1d4ed8":"#888"}">
          <span>${v} ↔ ${y}</span>
          <span>${x?"● Actif":"○ Inactif"}</span>
        </button>`}).join("");const $=e.querySelector('div[style*="font-weight:700;font-size:13px;margin-bottom:8px"]');$&&($.textContent=`Liens (${i.size}/${p.length} actifs)`);function E(v){i.has(v)?i.delete(v):i.add(v),l()}e.querySelectorAll(".link-hit").forEach(v=>{v.addEventListener("click",()=>E(v.dataset.key))}),e.querySelectorAll(".link-toggle").forEach(v=>{v.addEventListener("click",()=>E(v.dataset.key))})}l(),document.getElementById("formation-select").addEventListener("change",u=>{o=u.target.value,s(o),l()}),document.getElementById("reset-btn").addEventListener("click",()=>{const u=M[o]||[];i=new Set(u.map(([p,c])=>a(p,c))),l(),n("Liens réinitialisés aux valeurs par défaut (non sauvegardé)","info")}),document.getElementById("save-btn").addEventListener("click",async()=>{const p=P(o).filter(([g,f])=>i.has(a(g,f))),{error:c}=await b.from("formation_links_overrides").upsert({formation:o,links:p,updated_at:new Date().toISOString()});if(c){n(c.message,"error");return}r[o]=p,n(`Liens enregistrés pour ${o} (${p.length} actifs)`,"success")})}function Ie(e,n="info"){const t=document.getElementById("toast");t.textContent=e,t.className=`show ${n}`,clearTimeout(t._t),t._t=setTimeout(()=>{t.className=""},3e3)}function we(e,n,t=""){document.getElementById("modal-title").textContent=e,document.getElementById("modal-body").innerHTML=n,document.getElementById("modal-footer").innerHTML=t,document.getElementById("modal-overlay").classList.remove("hidden")}function N(){document.getElementById("modal-overlay").classList.add("hidden")}const Y={dashboard:{title:"Dashboard",fn:ae},players:{title:"Joueurs & Cartes",fn:de},clubs:{title:"Clubs",fn:ce},"card-builder":{title:"Card Builder",fn:fe},users:{title:"Managers",fn:X},market:{title:"Marché des transferts",fn:Z},"import-export":{title:"Import / Export CSV",fn:_e},formations:{title:"Formations & Liens",fn:Ee}};async function z(e){document.querySelectorAll(".admin-sidebar nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===e)});const n=Y[e]||Y.dashboard;document.getElementById("page-title").textContent=n.title;const t=document.getElementById("page-content");t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">Chargement…</div>';try{await n.fn(t,{toast:Ie,openModal:we,closeModal:N,navigate:z})}catch(o){t.innerHTML=`<div style="padding:40px;color:#c0392b">Erreur: ${o.message}</div>`,console.error(o)}}async function Le(){const{data:{session:e}}=await b.auth.getSession();e&&await Q(e.user),document.getElementById("auth-btn").addEventListener("click",async()=>{const n=document.getElementById("auth-email").value.trim(),t=document.getElementById("auth-password").value,o=document.getElementById("auth-error");if(o.textContent="",!n||!t){o.textContent="Remplissez tous les champs.";return}const{data:d,error:r}=await b.auth.signInWithPassword({email:n,password:t});if(r){o.textContent=r.message;return}await Q(d.user)}),document.getElementById("auth-password").addEventListener("keydown",n=>{n.key==="Enter"&&document.getElementById("auth-btn").click()}),document.getElementById("logout-btn").addEventListener("click",async()=>{await b.auth.signOut(),document.getElementById("auth-screen").style.display="flex",document.getElementById("admin-app").style.display="none"}),document.getElementById("modal-close").addEventListener("click",N),document.getElementById("modal-overlay").addEventListener("click",n=>{n.target===n.currentTarget&&N()}),document.querySelectorAll(".admin-sidebar nav a").forEach(n=>{n.addEventListener("click",t=>{t.preventDefault(),z(n.dataset.page)})})}async function Q(e){const{data:n,error:t}=await b.from("users").select("*").eq("id",e.id).single(),o=document.getElementById("auth-error");if(t||!n){o.textContent="Profil introuvable.";return}if(!n.is_admin){o.textContent="Accès refusé. Vous n'êtes pas administrateur.",await b.auth.signOut();return}document.getElementById("auth-screen").style.display="none",document.getElementById("admin-app").style.display="flex",document.getElementById("admin-user").textContent=`Admin: ${n.pseudo}`,z("dashboard")}Le();
