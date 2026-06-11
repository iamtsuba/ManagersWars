import{s as m,e as h,R as q,r as O,g as G}from"./card-CoW7FVRn.js";async function V(e){const[{count:n},{count:t},{count:a},{count:l},{count:i}]=await Promise.all([m.from("players").select("*",{count:"exact",head:!0}),m.from("clubs").select("*",{count:"exact",head:!0}),m.from("users").select("*",{count:"exact",head:!0}),m.from("cards").select("*",{count:"exact",head:!0}),m.from("matches").select("*",{count:"exact",head:!0})]);e.innerHTML=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px">
      ${f("🃏","Joueurs (cartes)",n??"–","#1A6B3C")}
      ${f("🏟️","Clubs",t??"–","#D4A017")}
      ${f("👥","Managers",a??"–","#7a28b8")}
      ${f("📦","Cartes possédées",l??"–","#2a8f52")}
      ${f("⚽","Matchs joués",i??"–","#bb2020")}
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
          <div>Formations: 4-4-2, 4-3-3, 3-4-3, 3-5-2, 5-3-2</div>
          <div>Encodage voyelles: A→E, E→I, I→O, O→U, U→A</div>
        </div>
      </div>
    </div>
  `,window.adminNav=s=>{var o;(o=document.querySelector(`[data-page="${s}"]`))==null||o.click()}}function f(e,n,t,a){return`<div class="card-panel" style="text-align:center">
    <div style="font-size:28px;margin-bottom:4px">${e}</div>
    <div style="font-size:28px;font-weight:700;color:${a}">${t}</div>
    <div style="font-size:11px;color:var(--gray-600)">${n}</div>
  </div>`}const j={normal:"Normal",pepite:"Pépite",papyte:"Papyte",legende:"Légende"},K={normal:"#aaa",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function J(e,n){await E(e,n)}async function E(e,n){const{toast:t,openModal:a,closeModal:l}=n,[{data:i,error:s},{data:o}]=await Promise.all([m.from("players").select("*, clubs(encoded_name,logo_url)").order("surname_encoded"),m.from("clubs").select("id,encoded_name").order("encoded_name")]);if(s){e.innerHTML=`<p style="color:red">${s.message}</p>`;return}const r={};(o||[]).forEach(b=>{r[b.id]=b.encoded_name}),e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input id="search-players" placeholder="🔍 Nom, prénom…" style="width:220px">
        <select id="filter-rarity" style="width:130px">
          <option value="">Toutes raretés</option>
          ${Object.entries(j).map(([b,c])=>`<option value="${b}">${c}</option>`).join("")}
        </select>
        <select id="filter-job" style="width:120px">
          <option value="">Tous postes</option>
          <option value="GK">GK</option><option value="DEF">DEF</option>
          <option value="MIL">MIL</option><option value="ATT">ATT</option>
        </select>
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-size:13px;color:var(--gray-600);align-self:center" id="count-label">${i.length} joueur(s)</span>
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
  `,d(i);function d(b){document.getElementById("count-label").textContent=`${b.length} joueur(s)`,document.getElementById("players-tbody").innerHTML=b.map(c=>{var v;return`
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
          <span style="background:${K[c.rarity]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
            ${j[c.rarity]||c.rarity}
          </span>
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${c.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${c.id}">🗑️</button>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll("[data-edit]").forEach(c=>{c.addEventListener("click",()=>{const v=i.find(g=>g.id===c.dataset.edit);C(v,o||[],{toast:t,openModal:a,closeModal:l,reload:()=>E(e,n)})})}),document.querySelectorAll("[data-del]").forEach(c=>{c.addEventListener("click",async()=>{if(!confirm("Supprimer ce joueur ? Les cartes associées resteront en jeu."))return;const{error:v}=await m.from("players").delete().eq("id",c.dataset.del);v?t(v.message,"error"):(t("Joueur supprimé","success"),E(e,n))})})}function p(){const b=document.getElementById("search-players").value.toLowerCase(),c=document.getElementById("filter-rarity").value,v=document.getElementById("filter-job").value;d(i.filter(g=>(!b||`${g.firstname} ${g.surname_encoded} ${g.surname_real}`.toLowerCase().includes(b))&&(!c||g.rarity===c)&&(!v||g.job===v)))}document.getElementById("search-players").addEventListener("input",p),document.getElementById("filter-rarity").addEventListener("change",p),document.getElementById("filter-job").addEventListener("change",p),document.getElementById("add-player-btn").addEventListener("click",()=>{C(null,o||[],{toast:t,openModal:a,closeModal:l,reload:()=>E(e,n)})})}function C(e,n,{toast:t,openModal:a,closeModal:l,reload:i}){const s=!!e,o='<option value="">— Club —</option>'+n.map(r=>`<option value="${r.id}" ${(e==null?void 0:e.club_id)===r.id?"selected":""}>${r.encoded_name}</option>`).join("");a(s?`Modifier ${e.firstname} ${e.surname_encoded}`:"Nouveau joueur",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
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
          ${["MA","FR","AR","PT","BR","ES","DE","GB","IT","CM","SN","NG","DK","NL","BE","CI","AL","HR","RS","TR"].map(r=>`<option value="${r}" ${(e==null?void 0:e.country_code)===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div><label>Club</label><select id="pm-club">${o}</select></div>
      <div><label>Poste principal</label>
        <select id="pm-job">
          ${["GK","DEF","MIL","ATT"].map(r=>`<option value="${r}" ${(e==null?void 0:e.job)===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div><label>Poste 2</label>
        <select id="pm-job2">
          <option value="">Aucun</option>
          ${["GK","DEF","MIL","ATT"].map(r=>`<option value="${r}" ${(e==null?void 0:e.job2)===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div><label>Rareté</label>
        <select id="pm-rarity">
          ${["normal","pepite","papyte","legende"].map(r=>`<option value="${r}" ${(e==null?void 0:e.rarity)===r?"selected":""}>${r}</option>`).join("")}
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
          ${["blanc","metisse","typ","noir"].map(r=>`<option value="${r}" ${(e==null?void 0:e.skin)===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div><label>Cheveux</label>
        <select id="pm-hair">
          ${["blond","marron","noir","chauve"].map(r=>`<option value="${r}" ${(e==null?void 0:e.hair)===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div><label>Longueur</label>
        <select id="pm-hlen">
          ${["rase","court","milong","long"].map(r=>`<option value="${r}" ${(e==null?void 0:e.hair_length)===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div><label>Prix vente (crédits)</label><input id="pm-price" type="number" min="0" value="${(e==null?void 0:e.sell_price)||0}"></div>
    </div>`,`<button class="btn btn-ghost" id="pm-cancel">Annuler</button>
     <button class="btn btn-primary" id="pm-save">${s?"Enregistrer":"Créer"}</button>`),document.getElementById("pm-cancel").addEventListener("click",l),document.getElementById("pm-encode-btn").addEventListener("click",()=>{document.getElementById("pm-enc").value=h(document.getElementById("pm-real").value)}),document.getElementById("pm-save").addEventListener("click",async()=>{const r={firstname:document.getElementById("pm-fn").value.trim(),surname_real:document.getElementById("pm-real").value.trim(),surname_encoded:document.getElementById("pm-enc").value.trim(),country_code:document.getElementById("pm-country").value,club_id:document.getElementById("pm-club").value||null,job:document.getElementById("pm-job").value,job2:document.getElementById("pm-job2").value||null,rarity:document.getElementById("pm-rarity").value,note_g:parseInt(document.getElementById("pm-g").value)||0,note_d:parseInt(document.getElementById("pm-d").value)||0,note_m:parseInt(document.getElementById("pm-m").value)||0,note_a:parseInt(document.getElementById("pm-a").value)||0,note_min:parseInt(document.getElementById("pm-nmin").value)||null,note_max:parseInt(document.getElementById("pm-nmax").value)||null,skin:document.getElementById("pm-skin").value,hair:document.getElementById("pm-hair").value,hair_length:document.getElementById("pm-hlen").value,sell_price:parseInt(document.getElementById("pm-price").value)||0};if(!r.firstname||!r.surname_real||!r.surname_encoded){t("Remplissez les champs obligatoires","error");return}const{error:d}=s?await m.from("players").update({...r,updated_at:new Date().toISOString()}).eq("id",e.id):await m.from("players").insert(r);if(d){t(d.message,"error");return}t(s?"Joueur modifié ✅":"Joueur créé ✅","success"),l(),i()})}let $=[];async function Y(e,{toast:n,openModal:t,closeModal:a}){await I(e,{toast:n,openModal:t,closeModal:a})}async function I(e,n){const{data:t,error:a}=await m.from("clubs").select("*").order("encoded_name");if(a){e.innerHTML=`<p style="color:red">${a.message}</p>`;return}$=t||[],W(e,n)}function W(e,{toast:n,openModal:t,closeModal:a}){e.innerHTML=`
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
  `,l($),document.getElementById("search-clubs").addEventListener("input",i=>{const s=i.target.value.toLowerCase();l($.filter(o=>o.encoded_name.toLowerCase().includes(s)||o.real_name.toLowerCase().includes(s)))}),document.getElementById("add-club-btn").addEventListener("click",()=>{A(null,{toast:n,openModal:t,closeModal:a,reload:()=>I(e,{toast:n,openModal:t,closeModal:a})})});function l(i){document.getElementById("clubs-tbody").innerHTML=i.map(s=>`
      <tr>
        <td>
          ${s.logo_url?`<img src="${s.logo_url}" style="width:32px;height:32px;object-fit:contain;border-radius:4px">`:`<div style="width:32px;height:32px;background:#1a3a7a;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">${s.encoded_name.slice(0,3)}</div>`}
        </td>
        <td><b>${s.encoded_name}</b></td>
        <td style="color:var(--gray-600);font-size:13px">${s.real_name}</td>
        <td><img src="https://flagsapi.com/${s.country_code}/flat/32.png" alt="${s.country_code}" style="height:18px;vertical-align:middle"> ${s.country_code}</td>
        <td>
          <button class="btn btn-ghost btn-sm" data-edit="${s.id}">✏️</button>
          <button class="btn btn-danger btn-sm" data-del="${s.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll("[data-edit]").forEach(s=>{s.addEventListener("click",()=>{const o=$.find(r=>r.id===s.dataset.edit);A(o,{toast:n,openModal:t,closeModal:a,reload:()=>I(e,{toast:n,openModal:t,closeModal:a})})})}),document.querySelectorAll("[data-del]").forEach(s=>{s.addEventListener("click",async()=>{if(!confirm("Supprimer ce club ?"))return;const{error:o}=await m.from("clubs").delete().eq("id",s.dataset.del);o?n(o.message,"error"):(n("Club supprimé","success"),I(e,{toast:n,openModal:t,closeModal:a}))})})}}function A(e,{toast:n,openModal:t,closeModal:a,reload:l}){const i=!!e;t(i?"Modifier le club":"Nouveau club",`<div style="display:flex;flex-direction:column;gap:12px">
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
     <button class="btn btn-primary" id="m-save">${i?"Enregistrer":"Créer"}</button>`),document.getElementById("m-cancel").addEventListener("click",a),document.getElementById("auto-encode").addEventListener("click",()=>{const s=document.getElementById("m-real").value,o=s.split(" ")[0]||s;document.getElementById("m-encoded").value=o.toUpperCase()+" FC"}),document.getElementById("m-real").addEventListener("input",()=>{const s=document.getElementById("m-real").value;if(!document.getElementById("m-encoded").value){const o=s.split(" ")[0]||s;document.getElementById("m-encoded").value=o.toUpperCase()+" FC"}}),document.getElementById("m-save").addEventListener("click",async()=>{const s={real_name:document.getElementById("m-real").value.trim(),encoded_name:document.getElementById("m-encoded").value.trim().toUpperCase(),country_code:document.getElementById("m-country").value.trim().toUpperCase(),logo_url:document.getElementById("m-logo").value.trim()||null};if(!s.real_name||!s.encoded_name||!s.country_code){n("Remplissez tous les champs obligatoires","error");return}const{error:o}=i?await m.from("clubs").update(s).eq("id",e.id):await m.from("clubs").insert(s);if(o){n(o.message,"error");return}n(i?"Club modifié":"Club créé","success"),a(),l()})}const Q=["blanc","metisse","typ","noir"],X=["blond","marron","noir","chauve"],Z=["rase","court","milong","long"],ee=["normal","pepite","papyte","legende"],S=["GK","DEF","MIL","ATT"],te=[["MA","Maroc"],["FR","France"],["AR","Argentine"],["PT","Portugal"],["BR","Brésil"],["ES","Espagne"],["DE","Allemagne"],["GB","Angleterre"],["IT","Italie"],["CM","Cameroun"],["SN","Sénégal"],["NG","Nigéria"],["DK","Danemark"],["NL","Pays-Bas"],["BE","Belgique"],["CI","Côte d'Ivoire"],["AL","Albanie"],["HR","Croatie"],["RS","Serbie"],["TR","Turquie"],["MW","Malawi"]];async function ne(e,{toast:n}){const{data:t}=await m.from("clubs").select("id,encoded_name,logo_url").order("encoded_name");e.innerHTML=ie(t||[]),oe(e,t||[],n),y()}function T(){var a;const e=((a=document.getElementById("cb-surname-real"))==null?void 0:a.value)||"",n=h(e),t=document.getElementById("cb-surname-enc");t&&(t.value=n)}function y(){var p,b,c,v;const e=g=>{var _;return((_=document.getElementById(g))==null?void 0:_.value)||""},n={firstname:e("cb-firstname"),surname_encoded:e("cb-surname-enc")||h(e("cb-surname-real")),country_code:e("cb-country"),club_encoded_name:((b=(p=document.getElementById("cb-club"))==null?void 0:p.selectedOptions[0])==null?void 0:b.text)||"",job:e("cb-job"),job2:e("cb-job2")||null,note_g:parseInt(e("cb-note-g"))||0,note_d:parseInt(e("cb-note-d"))||0,note_m:parseInt(e("cb-note-m"))||0,note_a:parseInt(e("cb-note-a"))||0,rarity:e("cb-rarity"),skin:e("cb-skin"),hair:e("cb-hair"),hair_length:e("cb-hair-length")},t=G(n.skin,n.hair,n.hair_length);e("cb-club");const a=document.getElementById("cb-club"),l=((v=(c=a==null?void 0:a.selectedOptions[0])==null?void 0:c.dataset)==null?void 0:v.logo)||null,i=O(n,{portraitUrl:t,clubLogoUrl:l,showNotes:!0}),s=document.getElementById("card-preview");s&&(s.innerHTML=i);const o=e("cb-surname-real"),r=n.surname_encoded,d=document.getElementById("encode-summary");d&&o&&(d.textContent=`${e("cb-firstname")} ${o} → ${e("cb-firstname")} ${r}`)}function oe(e,n,t){var a,l,i,s;e.querySelectorAll("input,select").forEach(o=>{o.addEventListener("input",y),o.addEventListener("change",y)}),(a=document.getElementById("cb-surname-real"))==null||a.addEventListener("input",()=>{T(),y()}),(l=document.getElementById("btn-encode"))==null||l.addEventListener("click",()=>{T(),y()}),(i=document.getElementById("btn-save-player"))==null||i.addEventListener("click",async()=>{await ae(n,t)}),(s=document.getElementById("btn-reset"))==null||s.addEventListener("click",()=>{e.querySelectorAll("input").forEach(o=>o.value=""),e.querySelectorAll("select").forEach(o=>o.selectedIndex=0),y()})}async function ae(e,n){const t=r=>{var d;return((d=document.getElementById(r))==null?void 0:d.value)||""},a=t("cb-surname-real").trim(),l=t("cb-surname-enc").trim()||h(a);if(!t("cb-firstname")||!a||!t("cb-country")||!t("cb-job")){n("Remplissez les champs obligatoires (prénom, nom, pays, poste)","error");return}const i=t("cb-club")||null,s={firstname:t("cb-firstname").trim(),surname_real:a,surname_encoded:l,country_code:t("cb-country"),club_id:i||null,job:t("cb-job"),job2:t("cb-job2")||null,note_g:parseInt(t("cb-note-g"))||0,note_d:parseInt(t("cb-note-d"))||0,note_m:parseInt(t("cb-note-m"))||0,note_a:parseInt(t("cb-note-a"))||0,rarity:t("cb-rarity")||"normal",note_min:parseInt(t("cb-note-min"))||null,note_max:parseInt(t("cb-note-max"))||null,skin:t("cb-skin")||"blanc",hair:t("cb-hair")||"noir",hair_length:t("cb-hair-length")||"court",sell_price:parseInt(t("cb-price"))||0},{error:o}=await m.from("players").insert(s);if(o){n("Erreur: "+o.message,"error");return}n(`✅ Joueur "${s.firstname} ${s.surname_encoded}" enregistré !`,"success")}function ie(e){const n=te.map(([d,p])=>`<option value="${d}">${p} (${d})</option>`).join(""),t='<option value="">— Sélectionner un club —</option>'+e.map(d=>`<option value="${d.id}" data-logo="${d.logo_url||""}">${d.encoded_name}</option>`).join(""),a=S.map(d=>`<option value="${d}">${d}</option>`).join(""),l='<option value="">Aucun</option>'+S.map(d=>`<option value="${d}">${d}</option>`).join(""),i=ee.map(d=>`<option value="${d}">${d.charAt(0).toUpperCase()+d.slice(1)}</option>`).join(""),s=Q.map(d=>`<option value="${d}">${d.charAt(0).toUpperCase()+d.slice(1)}</option>`).join(""),o=X.map(d=>`<option value="${d}">${d.charAt(0).toUpperCase()+d.slice(1)}</option>`).join(""),r=Z.map(d=>`<option value="${d}">${d.charAt(0).toUpperCase()+d.slice(1)}</option>`).join("");return`
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
          <div><label>Poste secondaire</label><select id="cb-job2">${l}</select></div>
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
          <div><label>Rareté</label><select id="cb-rarity">${i}</select></div>
          <div><label>Note min (Pépite/Papyte)</label><input id="cb-note-min" type="number" min="0" max="10" placeholder="—"></div>
          <div><label>Note max (Pépite seulement)</label><input id="cb-note-max" type="number" min="0" max="10" placeholder="—"></div>
        </div>
        <div style="margin-top:8px;display:flex;gap:8px">
          ${["normal","pepite","papyte","legende"].map(d=>`
            <div style="background:${q[d]};color:#fff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700">
              ${d.toUpperCase()}
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
          <div><label>Peau</label><select id="cb-skin">${s}</select></div>
          <div><label>Cheveux</label><select id="cb-hair">${o}</select></div>
          <div><label>Longueur</label><select id="cb-hair-length">${r}</select></div>
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
  `}async function N(e,{toast:n}){const{data:t,error:a}=await m.from("users").select("id,pseudo,club_name,credits,level,wins,draws,losses,trophies_top1,trophies_top2,trophies_top3,is_admin,created_at").order("created_at",{ascending:!1});if(a){e.innerHTML=`<p style="color:red">${a.message}</p>`;return}e.innerHTML=`
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
  `;const l=t||[];i(l),document.getElementById("search-users").addEventListener("input",s=>{const o=s.target.value.toLowerCase();i(l.filter(r=>{var d;return r.pseudo.toLowerCase().includes(o)||((d=r.club_name)==null?void 0:d.toLowerCase().includes(o))}))});function i(s){document.getElementById("users-tbody").innerHTML=s.map(o=>`
      <tr>
        <td><b>${o.pseudo}</b></td>
        <td style="font-size:12px">${o.club_name||"—"}</td>
        <td style="font-size:12px">${(o.credits||0).toLocaleString("fr")} cr.</td>
        <td><b>${o.level}</b></td>
        <td style="font-size:12px">${o.wins}/${o.draws}/${o.losses}</td>
        <td style="font-size:12px">🥇${o.trophies_top1} 🥈${o.trophies_top2} 🥉${o.trophies_top3}</td>
        <td>
          ${o.is_admin?'<span style="color:#1A6B3C;font-weight:700;font-size:12px">✅ Admin</span>':'<span style="color:#aaa;font-size:12px">Manager</span>'}
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" data-toggle-admin="${o.id}" data-is-admin="${o.is_admin}">
            ${o.is_admin?"🔒 Retirer admin":"🔓 Rendre admin"}
          </button>
        </td>
      </tr>
    `).join(""),document.querySelectorAll("[data-toggle-admin]").forEach(o=>{o.addEventListener("click",async()=>{const r=o.dataset.isAdmin!=="true";if(!confirm(`Voulez-vous ${r?"rendre admin":"retirer le rôle admin"} de ce Manager ?`))return;const{error:p}=await m.from("users").update({is_admin:r}).eq("id",o.dataset.toggleAdmin);p?n(p.message,"error"):(n("Rôle mis à jour ✅","success"),N(e,{toast:n}))})})}}async function D(e,{toast:n}){const{data:t,error:a}=await m.from("market_listings").select(`
      id, price, status, listed_at, sold_at,
      seller:users!seller_id(pseudo),
      buyer:users!buyer_id(pseudo),
      card:cards(
        card_type,
        player:players(firstname, surname_encoded, rarity, job)
      )
    `).order("listed_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<p style="color:red">${a.message}</p>`;return}const l=t||[],i=l.filter(o=>o.status==="active").length,s=l.filter(o=>o.status==="sold").length;e.innerHTML=`
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#1A6B3C">${i}</div>
        <div style="font-size:11px;color:#666">Annonces actives</div>
      </div>
      <div class="card-panel" style="min-width:120px;text-align:center">
        <div style="font-size:22px;font-weight:700;color:#D4A017">${s}</div>
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
            ${l.map(o=>{var b,c,v,g;const r=(b=o.card)==null?void 0:b.player,d=r?`${r.firstname} ${r.surname_encoded}`:((c=o.card)==null?void 0:c.card_type)||"—",p={active:"#1A6B3C",sold:"#D4A017",cancelled:"#aaa"};return`<tr>
                <td><b>${d}</b>${r?`<div style="font-size:10px;color:#999">${r.rarity} · ${r.job}</div>`:""}</td>
                <td style="font-size:12px">${((v=o.seller)==null?void 0:v.pseudo)||"—"}</td>
                <td style="font-size:12px">${((g=o.buyer)==null?void 0:g.pseudo)||"—"}</td>
                <td style="font-size:13px;font-weight:600">${(o.price||0).toLocaleString("fr")} cr.</td>
                <td>
                  <span style="background:${p[o.status]};color:#fff;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700">
                    ${o.status.toUpperCase()}
                  </span>
                </td>
                <td style="font-size:11px;color:#aaa">${new Date(o.listed_at).toLocaleDateString("fr")}</td>
                <td>
                  ${o.status==="active"?`<button class="btn btn-danger btn-sm" data-cancel="${o.id}">Annuler</button>`:""}
                </td>
              </tr>`}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.querySelectorAll("[data-cancel]").forEach(o=>{o.addEventListener("click",async()=>{if(!confirm("Annuler cette annonce ?"))return;const{error:r}=await m.from("market_listings").update({status:"cancelled"}).eq("id",o.dataset.cancel);r?n(r.message,"error"):(n("Annonce annulée","success"),D(e,{toast:n}))})})}async function re(e,{toast:n}){e.innerHTML=`
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
  `,document.getElementById("export-clubs-template").addEventListener("click",()=>{x("clubs_template.csv",`real_name,encoded_name,country_code,logo_url
Paris Saint-Germain,PARIS FC,FR,
Real Madrid,MADRID FC,ES,
`)}),document.getElementById("export-players-template").addEventListener("click",()=>{x("players_template.csv",`firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price
Kylian,Mbappe,,FR,PARIS FC,ATT,,0,0,2,9,legende,,,blanc,noir,court,50000
Achraf,Hakimi,,MA,PARIS FC,DEF,MIL,0,7,5,3,pepite,5,9,metisse,noir,court,20000
`)}),document.getElementById("export-clubs").addEventListener("click",async()=>{const{data:t,error:a}=await m.from("clubs").select("real_name,encoded_name,country_code,logo_url").order("encoded_name");if(a){n(a.message,"error");return}if(!t||t.length===0){n("Aucun club à exporter","info");return}let l=`real_name,encoded_name,country_code,logo_url
`;t.forEach(i=>{l+=[i.real_name,i.encoded_name,i.country_code,i.logo_url||""].map(k).join(",")+`
`}),x("clubs_export.csv",l),n(`${t.length} clubs exportés`,"success")}),document.getElementById("export-players").addEventListener("click",async()=>{const{data:t,error:a}=await m.from("players").select("firstname,surname_real,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name)").order("surname_encoded");if(a){n(a.message,"error");return}if(!t||t.length===0){n("Aucun joueur à exporter","info");return}let l=`firstname,surname_real,surname_encoded,country_code,club_encoded_name,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price
`;t.forEach(i=>{var s;l+=[i.firstname,i.surname_real,i.surname_encoded,i.country_code,((s=i.clubs)==null?void 0:s.encoded_name)||"",i.job,i.job2||"",i.note_g,i.note_d,i.note_m,i.note_a,i.rarity,i.note_min??"",i.note_max??"",i.skin,i.hair,i.hair_length,i.sell_price].map(k).join(",")+`
`}),x("players_export.csv",l),n(`${t.length} joueurs exportés`,"success")}),document.getElementById("import-clubs").addEventListener("change",async t=>{const a=t.target.files[0];if(!a)return;const l=document.getElementById("clubs-import-result");l.innerHTML='<span style="color:var(--gray-600)">Import en cours...</span>';try{const i=await a.text(),s=R(i);if(s.length===0){l.innerHTML='<span style="color:#c0392b">Fichier vide</span>';return}let o=0,r=0;const d=[];for(const p of s){if(!p.real_name||!p.encoded_name||!p.country_code){r++,d.push(`Ligne ignorée (champs manquants): ${p.real_name||"?"}`);continue}const b={real_name:p.real_name,encoded_name:p.encoded_name.toUpperCase(),country_code:p.country_code.toUpperCase().slice(0,2),logo_url:p.logo_url||null},{error:c}=await m.from("clubs").upsert(b,{onConflict:"encoded_name"});c?(r++,d.push(`${p.encoded_name}: ${c.message}`)):o++}l.innerHTML=`<div style="color:var(--green)">✅ ${o} clubs importés</div>
        ${r>0?`<div style="color:#c0392b">❌ ${r} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${d.slice(0,10).join("<br>")}</div>`:""}`,n(`${o} clubs importés`,"success")}catch(i){l.innerHTML=`<span style="color:#c0392b">Erreur : ${i.message}</span>`}t.target.value=""}),document.getElementById("import-players").addEventListener("change",async t=>{const a=t.target.files[0];if(!a)return;const l=document.getElementById("players-import-result");l.innerHTML='<span style="color:var(--gray-600)">Import en cours...</span>';try{const i=await a.text(),s=R(i);if(s.length===0){l.innerHTML='<span style="color:#c0392b">Fichier vide</span>';return}const{data:o}=await m.from("clubs").select("id,encoded_name"),r={};(o||[]).forEach(u=>{r[u.encoded_name.toUpperCase()]=u.id});let d=0,p=0;const b=[],c=["GK","DEF","MIL","ATT"],v=["normal","pepite","papyte","legende"],g=["blanc","metisse","typ","noir"],_=["blond","marron","noir","chauve"],U=["rase","court","milong","long"];for(const u of s){if(!u.firstname||!u.surname_real||!u.country_code||!u.job){p++,b.push(`Ligne ignorée (champs requis manquants): ${u.firstname||"?"}`);continue}if(!c.includes(u.job)){p++,b.push(`${u.firstname}: job invalide "${u.job}"`);continue}const H=u.club_encoded_name&&r[u.club_encoded_name.toUpperCase()]||null,F={firstname:u.firstname,surname_real:u.surname_real,surname_encoded:u.surname_encoded||h(u.surname_real),country_code:u.country_code.toUpperCase().slice(0,2),club_id:H,job:u.job,job2:c.includes(u.job2)?u.job2:null,note_g:parseInt(u.note_g)||0,note_d:parseInt(u.note_d)||0,note_m:parseInt(u.note_m)||0,note_a:parseInt(u.note_a)||0,rarity:v.includes(u.rarity)?u.rarity:"normal",note_min:u.note_min!==""&&u.note_min!=null?parseInt(u.note_min):null,note_max:u.note_max!==""&&u.note_max!=null?parseInt(u.note_max):null,skin:g.includes(u.skin)?u.skin:"blanc",hair:_.includes(u.hair)?u.hair:"noir",hair_length:U.includes(u.hair_length)?u.hair_length:"court",sell_price:parseInt(u.sell_price)||0},{error:B}=await m.from("players").insert(F);B?(p++,b.push(`${u.firstname} ${u.surname_real}: ${B.message}`)):d++}l.innerHTML=`<div style="color:var(--green)">✅ ${d} joueurs importés</div>
        ${p>0?`<div style="color:#c0392b">❌ ${p} erreurs</div><div style="font-size:11px;color:var(--gray-600);max-height:100px;overflow-y:auto">${b.slice(0,10).join("<br>")}</div>`:""}`,n(`${d} joueurs importés`,"success")}catch(i){l.innerHTML=`<span style="color:#c0392b">Erreur : ${i.message}</span>`}t.target.value=""})}function k(e){const n=String(e??"");return n.includes(",")||n.includes('"')||n.includes(`
`)?'"'+n.replace(/"/g,'""')+'"':n}function x(e,n){const t=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(t),l=document.createElement("a");l.href=a,l.download=e,l.click(),URL.revokeObjectURL(a)}function R(e){const n=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).filter(l=>l.trim());if(n.length<2)return[];const t=M(n[0]).map(l=>l.trim()),a=[];for(let l=1;l<n.length;l++){const i=M(n[l]),s={};t.forEach((o,r)=>{s[o]=(i[r]||"").trim()}),a.push(s)}return a}function M(e){const n=[];let t="",a=!1;for(let l=0;l<e.length;l++){const i=e[l];a?i==='"'?e[l+1]==='"'?(t+='"',l++):a=!1:t+=i:i==='"'?a=!0:i===","?(n.push(t),t=""):t+=i}return n.push(t),n}function se(e,n="info"){const t=document.getElementById("toast");t.textContent=e,t.className=`show ${n}`,clearTimeout(t._t),t._t=setTimeout(()=>{t.className=""},3e3)}function le(e,n,t=""){document.getElementById("modal-title").textContent=e,document.getElementById("modal-body").innerHTML=n,document.getElementById("modal-footer").innerHTML=t,document.getElementById("modal-overlay").classList.remove("hidden")}function w(){document.getElementById("modal-overlay").classList.add("hidden")}const z={dashboard:{title:"Dashboard",fn:V},players:{title:"Joueurs & Cartes",fn:J},clubs:{title:"Clubs",fn:Y},"card-builder":{title:"Card Builder",fn:ne},users:{title:"Managers",fn:N},market:{title:"Marché des transferts",fn:D},"import-export":{title:"Import / Export CSV",fn:re}};async function L(e){document.querySelectorAll(".admin-sidebar nav a").forEach(a=>{a.classList.toggle("active",a.dataset.page===e)});const n=z[e]||z.dashboard;document.getElementById("page-title").textContent=n.title;const t=document.getElementById("page-content");t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">Chargement…</div>';try{await n.fn(t,{toast:se,openModal:le,closeModal:w,navigate:L})}catch(a){t.innerHTML=`<div style="padding:40px;color:#c0392b">Erreur: ${a.message}</div>`,console.error(a)}}async function de(){const{data:{session:e}}=await m.auth.getSession();e&&await P(e.user),document.getElementById("auth-btn").addEventListener("click",async()=>{const n=document.getElementById("auth-email").value.trim(),t=document.getElementById("auth-password").value,a=document.getElementById("auth-error");if(a.textContent="",!n||!t){a.textContent="Remplissez tous les champs.";return}const{data:l,error:i}=await m.auth.signInWithPassword({email:n,password:t});if(i){a.textContent=i.message;return}await P(l.user)}),document.getElementById("auth-password").addEventListener("keydown",n=>{n.key==="Enter"&&document.getElementById("auth-btn").click()}),document.getElementById("logout-btn").addEventListener("click",async()=>{await m.auth.signOut(),document.getElementById("auth-screen").style.display="flex",document.getElementById("admin-app").style.display="none"}),document.getElementById("modal-close").addEventListener("click",w),document.getElementById("modal-overlay").addEventListener("click",n=>{n.target===n.currentTarget&&w()}),document.querySelectorAll(".admin-sidebar nav a").forEach(n=>{n.addEventListener("click",t=>{t.preventDefault(),L(n.dataset.page)})})}async function P(e){const{data:n,error:t}=await m.from("users").select("*").eq("id",e.id).single(),a=document.getElementById("auth-error");if(t||!n){a.textContent="Profil introuvable.";return}if(!n.is_admin){a.textContent="Accès refusé. Vous n'êtes pas administrateur.",await m.auth.signOut();return}document.getElementById("auth-screen").style.display="none",document.getElementById("admin-app").style.display="flex",document.getElementById("admin-user").textContent=`Admin: ${n.pseudo}`,L("dashboard")}de();
