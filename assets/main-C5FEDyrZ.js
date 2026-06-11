import{s as f,r as R}from"./card-CoW7FVRn.js";function N(t,{navigate:e,toast:i}){t.innerHTML=`
  <div class="auth-screen" style="animation:fadeIn 0.4s ease">
    <div class="auth-box">
      <div class="logo">⚽</div>
      <h1>Manager Wars</h1>
      <p class="subtitle">Le jeu de cartes football stratégique</p>

      <div class="auth-tabs">
        <div class="auth-tab active" data-tab="login">Connexion</div>
        <div class="auth-tab" data-tab="register">Inscription</div>
      </div>

      <!-- Login -->
      <div id="tab-login">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="login-email" placeholder="manager@example.com" autocomplete="email">
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" id="login-password" placeholder="••••••••" autocomplete="current-password">
        </div>
        <div id="login-error" class="form-error"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:8px" id="login-btn">
          Se connecter
        </button>
      </div>

      <!-- Register -->
      <div id="tab-register" style="display:none">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="reg-email" placeholder="manager@example.com" autocomplete="email">
        </div>
        <div class="form-group">
          <label>Mot de passe (min. 6 caractères)</label>
          <input type="password" id="reg-password" placeholder="••••••••" autocomplete="new-password">
        </div>
        <div class="form-group">
          <label>Confirmer le mot de passe</label>
          <input type="password" id="reg-confirm" placeholder="••••••••" autocomplete="new-password">
        </div>
        <div id="reg-error" class="form-error"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:8px" id="reg-btn">
          Créer mon compte
        </button>
        <p style="font-size:11px;color:var(--gray-600);text-align:center;margin-top:10px">
          Un compte = un Manager. Gratuit, sans CB.
        </p>
      </div>
    </div>
  </div>

  <style>
    @keyframes fadeIn { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
  </style>
  `,t.querySelectorAll(".auth-tab").forEach(n=>{n.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),n.classList.add("active"),document.getElementById("tab-login").style.display=n.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=n.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const n=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,o=document.getElementById("login-error");if(o.textContent="",!n||!a){o.textContent="Remplissez tous les champs.";return}const d=document.getElementById("login-btn");d.textContent="Connexion…",d.disabled=!0;const{error:s}=await f.auth.signInWithPassword({email:n,password:a});if(d.textContent="Se connecter",d.disabled=!1,s){o.textContent=s.message.includes("Invalid")?"Email ou mot de passe incorrect.":s.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",n=>{n.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const n=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,o=document.getElementById("reg-confirm").value,d=document.getElementById("reg-error");if(d.textContent="",!n||!a||!o){d.textContent="Remplissez tous les champs.";return}if(a.length<6){d.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==o){d.textContent="Les mots de passe ne correspondent pas.";return}const s=document.getElementById("reg-btn");s.textContent="Création…",s.disabled=!0;const{error:r}=await f.auth.signUp({email:n,password:a});if(s.textContent="Créer mon compte",s.disabled=!1,r){d.textContent=r.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=n})}function fe(t,{state:e,navigate:i,toast:n,refreshProfile:a}){let o="#1A6B3C",d="#D4A017";t.innerHTML=`
  <div class="setup-screen">
    <div class="setup-box">
      <div style="text-align:center;margin-bottom:8px">
        <div style="font-size:36px">⚽</div>
        <h2 style="font-weight:900;font-size:20px">Création de ton profil</h2>
        <p style="font-size:13px;color:var(--gray-600)">Étape <span id="step-num">1</span> sur 3</p>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="progress-fill" style="width:33%"></div></div>

      <!-- Étape 1 : Pseudo -->
      <div class="setup-step active" id="step-1">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">Choisis ton pseudo</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:16px">Ce nom sera affiché à tous les autres Managers.</p>
        <div class="form-group">
          <label>Pseudo unique</label>
          <input type="text" id="setup-pseudo" placeholder="Ex: BallonDor29" maxlength="20">
          <div style="font-size:11px;color:var(--gray-600);margin-top:4px">Entre 3 et 20 caractères</div>
        </div>
        <div id="step1-error" class="form-error"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:12px" id="step1-next">Suivant →</button>
      </div>

      <!-- Étape 2 : Club -->
      <div class="setup-step" id="step-2">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">Crée ton club</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:16px">Le nom de ton équipe, unique dans tout le jeu.</p>
        <div class="form-group">
          <label>Nom du club</label>
          <input type="text" id="setup-club" placeholder="Ex: Les Invincibles" maxlength="30">
        </div>
        <div id="step2-error" class="form-error"></div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-ghost" id="step2-back" style="flex:1">← Retour</button>
          <button class="btn btn-primary" id="step2-next" style="flex:2">Suivant →</button>
        </div>
      </div>

      <!-- Étape 3 : Logo couleurs -->
      <div class="setup-step" id="step-3">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:4px">Design ton logo</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:12px">Choisis les couleurs de ton club.</p>

        <div class="club-logo-preview" id="logo-preview" style="background:${d};border-color:${o}">
          <span id="logo-initials" style="color:${o}">MW</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch1" style="background:${o};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur du contour</label>
              <input type="color" id="color1" value="${o}" style="width:100%;height:36px;padding:2px;border-radius:6px">
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch2" style="background:${d};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur de l'intérieur</label>
              <input type="color" id="color2" value="${d}" style="width:100%;height:36px;padding:2px;border-radius:6px">
            </div>
          </div>
        </div>

        <div id="step3-error" class="form-error" style="margin-top:8px"></div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-ghost" id="step3-back" style="flex:1">← Retour</button>
          <button class="btn btn-primary" id="step3-finish" style="flex:2">🚀 Créer mon profil !</button>
        </div>
      </div>
    </div>
  </div>
  `;function s(){var y;const l=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),p=((y=document.getElementById("setup-club"))==null?void 0:y.value)||"MW",u=p.trim().split(" ").filter(Boolean),v=u.length>=2?(u[0][0]+u[1][0]).toUpperCase():p.slice(0,2).toUpperCase();l&&(l.style.background=d,l.style.borderColor=o),c&&(c.textContent=v,c.style.color=o)}document.getElementById("color1").addEventListener("input",l=>{o=l.target.value,document.getElementById("swatch1").style.background=o,s()}),document.getElementById("color2").addEventListener("input",l=>{d=l.target.value,document.getElementById("swatch2").style.background=d,s()});function r(l){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${l}`).classList.add("active"),document.getElementById("step-num").textContent=l,document.getElementById("progress-fill").style.width=`${Math.round(l/3*100)}%`,l===3&&s()}document.getElementById("step1-next").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",l.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:p}=await f.from("users").select("id").eq("pseudo",l).maybeSingle();if(p){c.textContent="Ce pseudo est déjà pris.";return}r(2)}),document.getElementById("step2-back").addEventListener("click",()=>r(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const l=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",l.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:p}=await f.from("users").select("id").eq("club_name",l).maybeSingle();if(p){c.textContent="Ce nom de club est déjà pris.";return}r(3)}),document.getElementById("step3-back").addEventListener("click",()=>r(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),p=document.getElementById("step3-error"),u=document.getElementById("step3-finish");p.textContent="",u.disabled=!0,u.textContent="Création en cours…";try{const{error:v}=await f.from("users").insert({id:e.user.id,pseudo:l,club_name:c,club_color1:o,club_color2:d,credits:1e4});if(v)throw v;await me(e.user.id),await a(),n(`Bienvenue ${l} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(v){p.textContent=v.message,u.disabled=!1,u.textContent="🚀 Créer mon profil !"}})}async function me(t){const{data:e}=await f.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,n=i.filter(r=>r.job==="GK"),a=i.filter(r=>r.job!=="GK"),o=[];for(let r=0;r<5;r++){let l=[];if(r===0&&n.length>0){const c=n[Math.floor(Math.random()*n.length)];l.push(c);const p=V([...a]).slice(0,3);l.push(...p)}else l=V([...i]).slice(0,4);l.forEach(c=>{o.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(r=>{o.push({owner_id:t,card_type:"game_changer",gc_type:r})});const s=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];o.push({owner_id:t,card_type:"formation",formation:s[Math.floor(Math.random()*s.length)]}),o.length>0&&await f.from("cards").insert(o),await f.from("users").update({first_booster_opened:!0}).eq("id",t)}function V(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function W(t,{state:e,navigate:i,toast:n}){const a=e.profile;if(!a)return;const{data:o}=await f.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),d=(a.club_name||"MW").split(" ").filter(Boolean),s=d.length>=2?(d[0][0]+d[1][0]).toUpperCase():(a.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
  <div class="page">
    <div class="page-body">

      <!-- Hero profil -->
      <div class="hero">
        <div class="info">
          <h3>${a.pseudo}</h3>
          <div class="level">Niveau ${a.level} · ${a.club_name}</div>
          <div class="stats">
            <div class="stat"><span class="val">${a.wins}</span><span class="lbl">V</span></div>
            <div class="stat"><span class="val">${a.trophies_top1}</span><span class="lbl">TOP1</span></div>
            <div class="stat"><span class="val">${(a.credits||0).toLocaleString("fr")}</span><span class="lbl">Crédits</span></div>
          </div>
        </div>
        <div class="logo-big" style="background:${a.club_color2};border-color:${a.club_color1}">
          <span style="color:${a.club_color1}">${s}</span>
        </div>
      </div>

      <!-- Jeu -->
      <div>
        <div class="section-title">🎮 Jouer</div>
        <div class="action-grid">
          <div class="action-card highlight" data-action="match-ai">
            <div class="icon">🤖</div>
            <div class="label">Vs IA</div>
            <div class="sub">Entraînement</div>
          </div>
          <div class="action-card" data-action="match-random">
            <div class="icon">🌍</div>
            <div class="label">Aléatoire</div>
            <div class="sub">1v1</div>
          </div>
          <div class="action-card" data-action="match-friend">
            <div class="icon">🤝</div>
            <div class="label">Ami</div>
            <div class="sub">Défi</div>
          </div>
          <div class="action-card" data-action="championship">
            <div class="icon">🏆</div>
            <div class="label">Championnat</div>
            <div class="sub">Ligue</div>
          </div>
        </div>
      </div>

      <!-- Collection rapide -->
      <div>
        <div class="section-title">
          🃏 Ma collection
          <a href="#" data-nav="collection">Voir tout</a>
        </div>
        <div class="action-grid" style="grid-template-columns:1fr 1fr 1fr">
          <div class="action-card" data-nav="collection">
            <div class="icon">📖</div>
            <div class="label">Cartes</div>
          </div>
          <div class="action-card" data-nav="decks">
            <div class="icon">📋</div>
            <div class="label">Decks</div>
          </div>
          <div class="action-card" data-nav="boosters">
            <div class="icon">📦</div>
            <div class="label">Boosters</div>
          </div>
        </div>
      </div>

      <!-- Marché & Classement -->
      <div>
        <div class="section-title">🌐 Marché & Social</div>
        <div class="action-grid" style="grid-template-columns:1fr 1fr">
          <div class="action-card" data-nav="market">
            <div class="icon">🛒</div>
            <div class="label">Marché</div>
          </div>
          <div class="action-card" data-nav="rankings">
            <div class="icon">📊</div>
            <div class="label">Classement</div>
          </div>
        </div>
      </div>

      <!-- Derniers matchs -->
      ${o&&o.length>0?`
      <div>
        <div class="section-title">⚽ Derniers matchs</div>
        <div class="card-panel" style="padding:0">
          ${o.map(r=>{const l=r.winner_id===a.id,c=r.home_score===r.away_score,p=c?"N":l?"V":"D",u=c?"#888":l?"#1A6B3C":"#c0392b",v={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[r.mode]||r.mode,m=new Date(r.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${v}</div>
                <div style="font-size:11px;color:var(--gray-600)">${m}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${r.home_score} - ${r.away_score}</span>
                <span style="background:${u};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${p}</span>
              </div>
            </div>`}).join("")}
        </div>
      </div>`:""}

      <!-- Logout -->
      <div style="text-align:center;padding:12px 0">
        <button class="btn btn-ghost btn-sm" id="logout-btn" style="color:var(--gray-600)">Déconnexion</button>
      </div>

    </div>
  </div>
  `,t.querySelectorAll("[data-nav]").forEach(r=>{r.addEventListener("click",l=>{l.preventDefault(),i(r.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.action;if(l==="championship"){n("Championnats — bientôt disponibles","info");return}if(l==="match-random"){n("Matchmaking aléatoire — bientôt disponible","info");return}if(l==="match-friend"){n("Défi ami — bientôt disponible","info");return}l==="match-ai"&&ve(i)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await f.auth.signOut(),window.location.reload()})}function ve(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
    <div class="modal" style="max-width:380px">
      <div class="modal-header"><h2>Choisir la difficulté</h2><button class="btn-icon" id="diff-cancel">✕</button></div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${e.map(a=>`
            <div class="action-card" data-mode="${a.mode}" style="cursor:pointer">
              <div class="icon">${a.icon}</div>
              <div class="label">${a.label}</div>
              <div class="sub">${a.sub}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  `,document.body.appendChild(i);const n=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",n),i.addEventListener("click",a=>{a.target===i&&n()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{n(),t("match",{matchMode:a.dataset.mode})})})}const q={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque 1 joueur adverse ce match."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function w(t,e){if(!t)return 0;switch(e){case"GK":return t.note_g||0;case"DEF":return t.note_d||0;case"MIL":return t.note_m||0;case"ATT":return t.note_a||0;default:return 0}}function H(t){let e=0;for(let i=0;i<t.length-1;i++){const n=t[i],a=t[i+1];!n||!a||(n.country_code&&a.country_code&&n.country_code===a.country_code&&(e+=1),n.club_id&&a.club_id&&n.club_id===a.club_id&&(e+=1))}return e}function K(t,e={}){let i=t.reduce((o,d)=>o+w(d,"ATT"),0);const n=H(t);let a=i+n;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:i,links:n,total:Math.max(0,a)}}function O(t,e={}){let i=t.reduce((o,d)=>o+w(d,"DEF"),0);const n=H(t);let a=i+n;return e.stolenNote&&(a-=e.stolenNote),{base:i,links:n,total:Math.max(0,a)}}function J(t){const e=t.reduce((n,a)=>n+w(a,"MIL"),0),i=H(t);return e+i}function ie(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function ne(t,e,i="easy"){const n=e==="attack"?"ATT":"DEF",a=t.filter(s=>!s.used);if(a.length===0)return[];const o=[...a].sort((s,r)=>w(r,n)-w(s,n));let d;return i==="easy"?d=1+Math.floor(Math.random()*2):i==="medium"?d=2+Math.floor(Math.random()*2):d=3,d=Math.min(d,o.length,3),o.slice(0,d)}function ye(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const ge={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},he=["Tous","GK","DEF","MIL","ATT"];async function be(t,e){const{state:i,navigate:n,toast:a,openModal:o,closeModal:d}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await f.from("cards").select("id,card_type,current_note,gc_type,formation,is_for_sale,sale_price,player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url))").eq("owner_id",i.profile.id).order("acquired_at",{ascending:!1});let r="Tous",l="";const c=(s||[]).filter(m=>m.card_type==="player"),p=(s||[]).filter(m=>m.card_type==="game_changer"),u=(s||[]).filter(m=>m.card_type==="formation");function v(){return c.filter(m=>{const g=m.player;if(!g)return!1;const h=r==="Tous"||g.job===r,b=!l||`${g.firstname} ${g.surname_encoded}`.toLowerCase().includes(l);return h&&b})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${c.length} joueur(s) · ${p.length} Game Changer · ${u.length} Formation</p>
    </div>

    ${p.length>0||u.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div class="section-title" style="margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
        ${p.map(m=>{var g,h;return`
          <div class="gc-card" style="min-width:130px;flex-shrink:0">
            <div class="gc-icon">${((g=q[m.gc_type])==null?void 0:g.icon)||"⚡"}</div>
            <div class="gc-badge">Game Changer</div>
            <div class="gc-name">${m.gc_type}</div>
            <div class="gc-desc">${((h=q[m.gc_type])==null?void 0:h.desc)||""}</div>
          </div>`}).join("")}
        ${u.map(m=>`
          <div style="background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:var(--radius-lg);border:2px solid #2a8f52;padding:12px;color:#fff;min-width:110px;flex-shrink:0">
            <div style="font-size:24px">🏟️</div>
            <div style="font-size:9px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content">FORMATION</div>
            <div style="font-weight:700;font-size:16px;margin-top:4px">${m.formation}</div>
          </div>`).join("")}
      </div>
    </div>`:""}

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${he.map(m=>`
          <button class="filter-btn" data-job="${m}" style="flex-shrink:0;padding:4px 12px;border-radius:20px;border:1.5px solid ${m===r?"var(--green)":"var(--gray-200)"};background:${m===r?"var(--green)":"#fff"};color:${m===r?"#fff":"var(--gray-600)"};font-size:12px;font-weight:600;cursor:pointer">${m}</button>`).join("")}
      </div>
    </div>

    <div class="page-body">
      <div class="cards-grid" id="col-grid"></div>
    </div>
  </div>
  `;function y(){const m=v(),g=document.getElementById("col-grid");if(g){if(m.length===0){g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte trouvée.<br><small>Ouvre des boosters pour en obtenir !</small></div>';return}g.innerHTML=m.map(h=>{var I,L;const b=h.player,$={...b,current_note:h.current_note,club_encoded_name:(I=b.clubs)==null?void 0:I.encoded_name},D=b.skin&&b.hair?ae(b):null,C=((L=b.clubs)==null?void 0:L.logo_url)||null;return`<div class="card-item" data-card-id="${h.id}">
        ${R($,{portraitUrl:D,clubLogoUrl:C,showNotes:!1})}
        ${h.is_for_sale?'<div class="card-owned-badge" style="background:#D4A017">En vente</div>':""}
      </div>`}).join(""),g.querySelectorAll(".card-item").forEach(h=>{h.addEventListener("click",()=>{const b=c.find($=>$.id===h.dataset.cardId);b&&xe(b,t,e)})})}}y(),t.querySelectorAll(".filter-btn").forEach(m=>{m.addEventListener("click",()=>{r=m.dataset.job,t.querySelectorAll(".filter-btn").forEach(g=>{const h=g.dataset.job===r;g.style.background=h?"var(--green)":"#fff",g.style.color=h?"#fff":"var(--gray-600)",g.style.borderColor=h?"var(--green)":"var(--gray-200)"}),y()})}),document.getElementById("col-search").addEventListener("input",m=>{l=m.target.value.toLowerCase(),y()})}function ae(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co",i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.jpg`}function xe(t,e,i){var u,v,y,m,g;const{state:n,toast:a,openModal:o,closeModal:d}=i,s=t.player,r={...s,club_encoded_name:(u=s.clubs)==null?void 0:u.encoded_name},l=ae(s),c=((v=s.clubs)==null?void 0:v.logo_url)||null,p=s.rarity!=="legende"&&!(s.rarity==="papyte"&&s.note_min!==null&&(t.current_note??99)<=s.note_min);o(`${s.firstname} ${s.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
      <div>${R(r,{portraitUrl:l,clubLogoUrl:c,showNotes:!0})}</div>
      <div style="flex:1;min-width:160px">
        <div style="font-size:12px;color:var(--gray-600)">RARETÉ</div>
        <div style="font-weight:700;margin-bottom:8px;color:${ge[s.rarity]}">${s.rarity.toUpperCase()}</div>
        <div style="font-size:12px;color:var(--gray-600)">POSTE</div>
        <div style="font-weight:700;margin-bottom:8px">${s.job}${s.job2?" / "+s.job2:""}</div>
        <div style="font-size:12px;color:var(--gray-600)">PRIX DE BASE</div>
        <div style="font-weight:700">${(s.sell_price||0).toLocaleString("fr")} cr.</div>
        ${t.is_for_sale?`<div style="color:#D4A017;font-weight:700;margin-top:8px">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>`:""}
      </div>
    </div>
    ${p?"":`<div style="margin-top:12px;font-size:12px;color:var(--gray-600);text-align:center;padding:8px;background:#f5f5f5;border-radius:8px">${s.rarity==="legende"?"🔒 Les cartes Légende ne sont pas revendables (GDD §3.4)":"🔒 Carte Papyte à note minimale : non vendable"}</div>`}
    ${p&&!t.is_for_sale?`
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:12px">
      <label style="font-size:12px;font-weight:600;margin-bottom:6px;display:block">Mettre en vente sur le marché</label>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${s.sell_price||1e3}">
        <button class="btn btn-yellow" id="sell-btn">Vendre</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?'<div style="margin-top:12px"><button class="btn btn-ghost" id="cancel-sell-btn" style="width:100%">Retirer de la vente</button></div>':""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(y=document.getElementById("close-detail"))==null||y.addEventListener("click",d),(m=document.getElementById("sell-btn"))==null||m.addEventListener("click",async()=>{const h=parseInt(document.getElementById("sell-price").value);if(!h||h<1){a("Prix invalide","error");return}const{error:b}=await f.from("cards").update({is_for_sale:!0,sale_price:h}).eq("id",t.id);if(b){a(b.message,"error");return}await f.from("market_listings").insert({seller_id:n.profile.id,card_id:t.id,price:h}),a("Carte mise en vente ! ✅","success"),d(),i.navigate("collection")}),(g=document.getElementById("cancel-sell-btn"))==null||g.addEventListener("click",async()=>{await f.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await f.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),a("Annonce retirée","success"),d(),i.navigate("collection")})}const S={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},se={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};async function _e(t,e){const{state:i,navigate:n,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:o}=await f.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(o==null?void 0:o.length)||0} deck(s) · Un deck = 11 titulaires + remplaçants</p>
    </div>

    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${o&&o.length>0?o.map(d=>`
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${d.name} ${d.is_active?'<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>':""}</div>
              <div style="font-size:11px;color:var(--gray-600)">Formation : ${d.formation_card_id?"définie":"à configurer"}</div>
            </div>
            <button class="btn btn-primary btn-sm" data-edit="${d.id}">✏️ Éditer</button>
          </div>
        `).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier deck !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>
  `,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const d=prompt("Nom du deck :",`Deck ${((o==null?void 0:o.length)||0)+1}`);if(!d)return;const{data:s,error:r}=await f.from("decks").insert({owner_id:i.profile.id,name:d,is_active:!o||o.length===0}).select().single();if(r){a(r.message,"error");return}a("Deck créé !","success"),X(s.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(d=>{d.addEventListener("click",()=>X(d.dataset.edit,t,e))})}async function X(t,e,i){const{state:n,toast:a,navigate:o}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du deck...</div>';const{data:d}=await f.from("decks").select("*").eq("id",t).single(),{data:s}=await f.from("cards").select("id, card_type, formation, player:players(id,firstname,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,clubs(encoded_name,logo_url))").eq("owner_id",n.profile.id),r=(s||[]).filter(u=>u.card_type==="player"&&u.player),l=(s||[]).filter(u=>u.card_type==="formation"),{data:c}=await f.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t),p={deckId:t,name:d.name,formation:d.formation||"4-4-2",formationCardId:d.formation_card_id,slots:{},playerCards:r,formationCards:l};(c||[]).forEach(u=>{p.slots[u.position]=u.card_id}),j(e,p,i)}function j(t,e,i){const{toast:n,navigate:a}=i,o=S[e.formation],d=[];d.push("GK1");for(let r=1;r<=o.DEF;r++)d.push(`DEF${r}`);for(let r=1;r<=o.MIL;r++)d.push(`MIL${r}`);for(let r=1;r<=o.ATT;r++)d.push(`ATT${r}`);const s=d.filter(r=>e.slots[r]).length;t.innerHTML=`
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${e.name}</h2>
        <p>${s}/11 titulaires placés</p>
      </div>
    </div>

    <!-- Sélecteur formation -->
    <div style="padding:12px 16px;background:#fff;border-bottom:1px solid var(--gray-200)">
      <label style="font-size:11px">Formation</label>
      <select id="formation-select">
        ${Object.keys(S).map(r=>`<option value="${r}" ${r===e.formation?"selected":""}>${r}</option>`).join("")}
      </select>
    </div>

    <!-- Terrain -->
    <div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);padding:20px 16px;min-height:340px">
      <div class="deck-grid" id="deck-field"></div>
    </div>

    <!-- Actions -->
    <div class="page-body">
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${s<11?"disabled":""}>
        ${s<11?`Placez encore ${11-s} joueur(s)`:"💾 Enregistrer le deck"}
      </button>
    </div>
  </div>
  `,ke(t,e,d,o,i),document.getElementById("builder-back").addEventListener("click",()=>a("decks")),document.getElementById("formation-select").addEventListener("change",r=>{e.formation=r.target.value;const l=S[e.formation],c=["GK1"];for(let u=1;u<=l.DEF;u++)c.push(`DEF${u}`);for(let u=1;u<=l.MIL;u++)c.push(`MIL${u}`);for(let u=1;u<=l.ATT;u++)c.push(`ATT${u}`);const p={};c.forEach(u=>{e.slots[u]&&(p[u]=e.slots[u])}),e.slots=p,j(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>Ee(e,i))}function ke(t,e,i,n,a){const o=document.getElementById("deck-field");if(!o)return;const d=[i.filter(s=>s.startsWith("ATT")),i.filter(s=>s.startsWith("MIL")),i.filter(s=>s.startsWith("DEF")),i.filter(s=>s.startsWith("GK"))];o.innerHTML=d.map(s=>`
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:12px">
      ${s.map(r=>{const l=e.slots[r],c=l?e.playerCards.find(v=>v.id===l):null,p=r.replace(/\d+/,""),u=se[p];if(c){const v=c.player,y=p==="GK"?v.note_g:p==="DEF"?v.note_d:p==="MIL"?v.note_m:v.note_a;return`<div class="formation-slot filled" data-pos="${r}" style="border-color:${u};background:${u}">
            <div style="font-size:14px;font-weight:900;color:#fff">${y}</div>
            <div style="font-size:7px;color:#fff;max-width:52px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.surname_encoded}</div>
          </div>`}return`<div class="formation-slot" data-pos="${r}" style="border-color:rgba(255,255,255,0.4)">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${p}</div>
          <div style="font-size:16px;color:rgba(255,255,255,0.5)">+</div>
        </div>`}).join("")}
    </div>
  `).join(""),o.querySelectorAll(".formation-slot").forEach(s=>{s.addEventListener("click",()=>{we(s.dataset.pos,e,t,a)})})}function we(t,e,i,n,a,o){var u;const{openModal:d,closeModal:s,toast:r}=n,l=t.replace(/\d+/,""),c=Object.values(e.slots).filter(v=>v!==e.slots[t]),p=e.playerCards.filter(v=>{const y=v.player,m=y.job===l||y.job2===l,g=!c.includes(v.id);return m&&g});p.sort((v,y)=>{const m=l==="GK"?v.player.note_g:l==="DEF"?v.player.note_d:l==="MIL"?v.player.note_m:v.player.note_a;return(l==="GK"?y.player.note_g:l==="DEF"?y.player.note_d:l==="MIL"?y.player.note_m:y.player.note_a)-m}),d(`Choisir un ${l} (${t})`,`<div style="max-height:50vh;overflow-y:auto">
      ${e.slots[t]?'<button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:10px">Retirer le joueur actuel</button>':""}
      ${p.length>0?`<div style="display:flex;flex-direction:column;gap:6px">
        ${p.map(v=>{var h;const y=v.player,m=l==="GK"?y.note_g:l==="DEF"?y.note_d:l==="MIL"?y.note_m:y.note_a,g={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[y.rarity];return`<div class="player-option" data-card-id="${v.id}" style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
            <div style="width:32px;height:32px;border-radius:6px;background:${se[l]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;border:2px solid ${g}">${m}</div>
            <div style="flex:1">
              <div style="font-weight:600;font-size:13px">${y.firstname} ${y.surname_encoded}</div>
              <div style="font-size:11px;color:var(--gray-600)">${y.country_code} · ${((h=y.clubs)==null?void 0:h.encoded_name)||"—"} · ${y.rarity}</div>
            </div>
          </div>`}).join("")}
      </div>`:'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur éligible pour ce poste.<br><small>Ouvre des boosters pour en obtenir !</small></div>'}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`),(u=document.getElementById("remove-player"))==null||u.addEventListener("click",()=>{delete e.slots[t],s(),j(i,e,n)}),document.querySelectorAll(".player-option").forEach(v=>{v.addEventListener("click",()=>{e.slots[t]=v.dataset.cardId,s(),j(i,e,n)})})}async function Ee(t,e){const{state:i,toast:n,navigate:a}=e;let o=t.formationCardId;const d=t.formationCards.find(r=>r.formation===t.formation);d&&(o=d.id),await f.from("decks").update({formation:t.formation,formation_card_id:o}).eq("id",t.deckId),await f.from("deck_cards").delete().eq("deck_id",t.deckId);const s=Object.entries(t.slots).map(([r,l],c)=>({deck_id:t.deckId,card_id:l,position:r,is_starter:!0,slot_order:c}));if(s.length>0){const{error:r}=await f.from("deck_cards").insert(s);if(r){n(r.message,"error");return}}n("Deck enregistré ! ✅","success"),a("decks")}const Y=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}];async function $e(t,{state:e,navigate:i,toast:n}){var o;const a=((o=e.profile)==null?void 0:o.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${Y.map(d=>{const s=a>=d.cost||d.cost===0;return`<div class="booster-card ${s?"":"disabled"}" data-booster="${d.id}">
            <div class="icon">${d.icon}</div>
            <div class="name">${d.name}</div>
            <div class="desc">${d.sub}</div>
            <div class="cost">${d.costLabel}</div>
            ${s?"":'<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>'}
          </div>`}).join("")}
      </div>

      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:16px">
        <b>📌 Rappel boosters</b><br>
        • Le 1er booster Players contient toujours un Gardien.<br>
        • Game Helper disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>
  `,t.querySelectorAll(".booster-card:not(.disabled)").forEach(d=>{d.addEventListener("click",async()=>{const s=Y.find(r=>r.id===d.dataset.booster);s&&await Te(s,{state:e,toast:n,container:t})})})}async function Te(t,{state:e,toast:i,container:n}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}if(t.id==="players_pub"&&!await Ce())return;const a=n.querySelector(`[data-booster="${t.id}"]`);a&&(a.style.opacity="0.5",a.style.pointerEvents="none");try{let o=[];t.type==="player"?o=await Ie(e.profile,t.cardCount,t.cost):t.type==="game_changer"?o=await Le(e.profile,t.cardCount,t.cost):t.type==="formation"&&(o=await Me(e.profile,t.cost));const{data:d}=await f.from("users").select("*").eq("id",e.profile.id).single();d&&(e.profile=d),Ae(o,t)}catch(o){i(o.message,"error"),a&&(a.style.opacity="",a.style.pointerEvents="")}}async function Ie(t,e,i){if(i>0){const{error:l}=await f.from("users").update({credits:t.credits-i}).eq("id",t.id);if(l)throw l}const{data:n}=await f.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!n||n.length===0)throw new Error("Pas de joueurs disponibles");const a=n.filter(l=>l.job==="GK"),o=n.filter(l=>l.job!=="GK");let d=[];!t.first_booster_opened&&a.length>0?(d.push(a[Math.floor(Math.random()*a.length)]),d.push(...Q([...o]).slice(0,e-1)),await f.from("users").update({first_booster_opened:!0}).eq("id",t.id)):d=Q([...n]).slice(0,e);const s=d.map(l=>({owner_id:t.id,player_id:l.id,card_type:"player"})),{data:r}=await f.from("cards").insert(s).select();return d.map((l,c)=>({...r[c],player:l}))}async function Le(t,e,i){const{error:n}=await f.from("users").update({credits:t.credits-i}).eq("id",t.id);if(n)throw n;const a=["Ressusciter","Double attaque","Bouclier","Vol de note","Gel","Remplacement+"],o=[];for(let r=0;r<e;r++)o.push(a[Math.floor(Math.random()*a.length)]);const d=o.map(r=>({owner_id:t.id,card_type:"game_changer",gc_type:r})),{data:s}=await f.from("cards").insert(d).select();return s}async function Me(t,e){const{error:i}=await f.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const n=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=n[Math.floor(Math.random()*n.length)],{data:o}=await f.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return o}function Ae(t,e){const i=document.createElement("div");i.className="booster-reveal",i.innerHTML=`
    <div style="text-align:center;margin-bottom:20px;color:#fff">
      <div style="font-size:36px">${e.icon}</div>
      <div style="font-weight:900;font-size:20px;margin-top:4px">${e.name}</div>
      <div style="color:rgba(255,255,255,0.6);font-size:13px">+${t.length} carte${t.length>1?"s":""}</div>
    </div>

    <div class="reveal-cards">
      ${t.map((n,a)=>{var o;if(n.card_type==="player"&&n.player){const d=n.player,s={...d,club_encoded_name:(o=d.clubs)==null?void 0:o.encoded_name};let r=null;if(d.skin&&d.hair){const l="https://fcnwclxlkytdfjotqkta.supabase.co";{const c=d.hair==="chauve"?`${d.skin}-chauve-rase`:`${d.skin}-${d.hair}-${d.hair_length}`;r=`${l}/storage/v1/object/public/assets/tetes/${c}.jpg`}}return`<div class="reveal-card" style="--i:${a}">${R(s,{portraitUrl:r,showNotes:!0})}</div>`}return n.card_type==="game_changer"?`<div class="reveal-card" style="--i:${a}"><div class="gc-card">
            <div class="gc-icon">⚡</div>
            <div class="gc-badge">Game Changer</div>
            <div class="gc-name">${n.gc_type}</div>
          </div></div>`:n.card_type==="formation"?`<div class="reveal-card" style="--i:${a}"><div style="background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;padding:20px;text-align:center;color:#fff;min-width:130px">
            <div style="font-size:32px;margin-bottom:8px">🏟️</div>
            <div style="font-size:22px;font-weight:900">${n.formation}</div>
          </div></div>`:""}).join("")}
    </div>

    <div style="margin-top:28px;display:flex;gap:10px;color:#fff">
      <button class="btn btn-primary" id="reveal-close">Voir ma collection</button>
    </div>
  `,document.body.appendChild(i),document.getElementById("reveal-close").addEventListener("click",()=>{i.remove(),window._render()})}function Ce(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText=`
      position:fixed;inset:0;background:#000;display:flex;flex-direction:column;
      align-items:center;justify-content:center;z-index:3000;color:#fff;gap:16px
    `;let i=5;e.innerHTML=`
      <div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:32px;font-weight:900" id="ad-countdown">5</div>
    `,document.body.appendChild(e);const n=setInterval(()=>{i--,document.getElementById("ad-countdown").textContent=i,i<=0&&(clearInterval(n),e.remove(),t(!0))},1e3)})}function Q(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}const T={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}};async function Be(t,e){var C,I,L,U;const{state:i,navigate:n,toast:a}=e,o=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation du match...</div>';const d=o.matchMode||"vs_ai_easy",s=d.replace("vs_ai_",""),r=d,{data:l}=await f.from("decks").select("id,name,formation_card_id,cards:formation_card_id(formation)").eq("owner_id",i.profile.id).eq("is_active",!0).limit(1);if(!l||l.length===0){t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">📋</div>
        <p style="margin-bottom:16px">Tu n'as pas encore de deck actif.<br>Crée et active un deck pour jouer !</p>
        <button class="btn btn-primary" id="goto-decks-btn">Créer un deck</button>
      </div>
    </div>`,(C=document.getElementById("goto-decks-btn"))==null||C.addEventListener("click",()=>n("decks"));return}const c=l[0],{data:p}=await f.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name)))`).eq("deck_id",c.id).order("slot_order"),u=(p||[]).filter(_=>{var E;return _.is_starter&&((E=_.card)==null?void 0:E.player)}),v=(p||[]).filter(_=>{var E;return!_.is_starter&&((E=_.card)==null?void 0:E.player)});if(u.length<11){t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <p style="margin-bottom:16px">Ton deck doit contenir 11 titulaires.<br>Actuellement : ${u.length}/11</p>
        <button class="btn btn-primary" id="goto-decks-btn">Compléter mon deck</button>
      </div>
    </div>`,(I=document.getElementById("goto-decks-btn"))==null||I.addEventListener("click",()=>n("decks"));return}const{data:y}=await f.from("cards").select("id, gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),m=(p||[]).find(_=>{var E;return((E=_.card)==null?void 0:E.card_type)==="formation"}),g=((L=m==null?void 0:m.card)==null?void 0:L.formation)||((U=c.cards)==null?void 0:U.formation)||"4-4-2",h=je(u,g),b=await Se(g),{data:$}=await f.from("matches").insert({home_id:i.profile.id,away_id:null,mode:r,home_deck_id:c.id,status:"in_progress"}).select().single(),D={matchId:$==null?void 0:$.id,mode:r,difficulty:s,homeTeam:h,aiTeam:b,homeSubs:v.map(_=>oe(_.card)),homeScore:0,aiScore:0,gcCards:y||[],usedGc:[],phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},maxSubs:3};ze(t,D,e)}function oe(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:e.note_g,note_d:e.note_d,note_m:e.note_m,note_a:e.note_a,rarity:e.rarity,used:!1}}function je(t,e){const i=t.map(n=>oe(n.card));return De(i,e)}function De(t,e){const i=T[e]||T["4-4-2"],n={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const o of["GK","DEF","MIL","ATT"]){const d=i[o];for(let s=0;s<d;s++){let r=a.findIndex(l=>l.job===o);r===-1&&(r=a.findIndex(l=>l.job2===o)),r===-1&&(r=0),a[r]&&(n[o].push({...a[r],line:o}),a.splice(r,1))}}return n}async function Se(t,e){const{data:i}=await f.from("players").select("id, firstname, surname_encoded, country_code, club_id, job, job2, note_g, note_d, note_m, note_a, rarity").eq("is_active",!0).limit(60);if(!i||i.length<11)return qe(t);const n=T[t]||T["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},o=[...i];for(const d of["GK","DEF","MIL","ATT"]){const s=o.filter(c=>c.job===d),r=o.filter(c=>c.job!==d),l=[...s,...r];for(let c=0;c<n[d];c++){const p=l[c]||r[c]||o[c];p&&a[d].push({cardId:"ai-"+p.id+"-"+c,id:p.id,firstname:p.firstname,name:p.surname_encoded,country_code:p.country_code,club_id:p.club_id,job:p.job,job2:p.job2,note_g:p.note_g,note_d:p.note_d,note_m:p.note_m,note_a:p.note_a,rarity:p.rarity,line:d,used:!1})}}return a}function qe(t){const e=T[t]||T["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},n=["ROBOT","CYBER","METAL","NEXUS","ALGO","PIXEL","CODEX","BYTE","LOGIC","TURBO","QUANTUM"];let a=0;for(const o of["GK","DEF","MIL","ATT"])for(let d=0;d<e[o];d++){const s=2+Math.floor(Math.random()*5);i[o].push({cardId:"fake-ai-"+a,id:"fake-"+a,firstname:"IA",name:n[a%n.length],country_code:"XX",club_id:null,job:o,job2:null,note_g:o==="GK"?s:1,note_d:o==="DEF"?s:1,note_m:o==="MIL"?s:1,note_a:o==="ATT"?s:1,rarity:"normal",line:o,used:!1}),a++}return i}function ze(t,e,i){const n=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[],o=J(n),d=J(a);e.attacker=o>=d?"home":"ai",e.log.push({text:`Duel du milieu : Vous ${o} - ${d} IA. ${e.attacker==="home"?"Vous attaquez":"L'IA attaque"} en premier.`,type:"info"}),e.phase=e.attacker==="home"?"attack":"ai-attack",k(t,e,i),e.attacker==="ai"&&setTimeout(()=>z(t,e,i),1200)}function k(t,e,i){var o,d;const n={attack:"⚔️ À vous d'attaquer",defense:"🛡️ À vous de défendre","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"};t.innerHTML=`
  <div class="match-screen">
    <div class="match-header">
      <div style="flex:1">
        <button class="btn-icon" id="match-quit" style="color:#fff">✕</button>
      </div>
      <div style="text-align:center;flex:2">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">VOUS vs IA (${e.difficulty})</div>
        <div class="match-score">${e.homeScore} - ${e.aiScore}</div>
      </div>
      <div style="flex:1;text-align:right">
        <button class="btn-icon" id="view-ai-team" style="color:#fff" title="Voir l'équipe adverse">👁️</button>
      </div>
    </div>

    <div class="match-phase">${n[e.phase]||e.phase}</div>

    <!-- Terrain joueur -->
    <div class="match-field" id="match-field"></div>

    <!-- Game Changers disponibles -->
    ${(e.phase==="attack"||e.phase==="defense")&&e.gcCards.length>0?`
    <div style="padding:8px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:6px">Game Changers (cliquer pour utiliser)</div>
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:4px">
        ${e.gcCards.filter(s=>!e.usedGc.includes(s.id)).map(s=>{var r;return`
          <div class="gc-mini" data-gc-id="${s.id}" data-gc-type="${s.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;min-width:90px;text-align:center">
            <div style="font-size:18px">${((r=q[s.gc_type])==null?void 0:r.icon)||"⚡"}</div>
            <div style="font-size:9px;color:#fff;font-weight:600">${s.gc_type}</div>
          </div>
        `}).join("")}
      </div>
    </div>`:""}

    <!-- Actions -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(s=>`<div class="log-entry ${s.type==="goal"?"log-goal":""}">${s.text}</div>`).join("")}
    </div>
  </div>
  `,(o=document.getElementById("match-quit"))==null||o.addEventListener("click",()=>{confirm("Quitter le match ? Il sera abandonné.")&&i.navigate("home")}),(d=document.getElementById("view-ai-team"))==null||d.addEventListener("click",()=>{Ue(e,i)}),re(t,e,i),de(t,e,i),t.querySelectorAll(".gc-mini").forEach(s=>{s.addEventListener("click",()=>{Oe(s.dataset.gcId,s.dataset.gcType,t,e,i)})});const a=document.getElementById("match-log");a&&(a.scrollTop=a.scrollHeight)}function re(t,e,i){const n=document.getElementById("match-field");if(!n)return;const a=e.phase==="attack"||e.phase==="defense",o=e.phase==="attack"?["MIL","ATT"]:["GK","DEF","MIL"],d=["ATT","MIL","DEF","GK"];n.innerHTML=`<div class="match-grid">
    ${d.map(s=>{const r=e.homeTeam[s]||[];return r.length===0?"":`<div class="match-row">
        ${r.map((l,c)=>{const p=a&&o.includes(s)&&!l.used,u=e.selected.some(y=>y.cardId===l.cardId),v=w(l,e.phase==="attack"?"ATT":e.phase==="defense"?"DEF":s);return`<div class="match-slot ${p?"selectable":""} ${u?"selected":""} ${l.used?"used":""}"
            data-card-id="${l.cardId}" data-role="${s}" data-idx="${c}">
            <div class="slot-note">${v}</div>
            <div class="slot-name">${l.name}</div>
          </div>`}).join("")}
      </div>`}).join("")}
  </div>`,n.querySelectorAll(".match-slot.selectable").forEach(s=>{s.addEventListener("click",()=>{Ge(s,e,t,i)})})}function Ge(t,e,i,n){const a=t.dataset.cardId,o=t.dataset.role,d=parseInt(t.dataset.idx),s=e.selected.findIndex(r=>r.cardId===a);if(s!==-1)e.selected.splice(s,1);else{if(e.selected.length>=3){n.toast("Maximum 3 joueurs (GDD §5.1)","error");return}const r=(e.homeTeam[o]||[]).find(l=>l.cardId===a);r&&e.selected.push({...r,_role:o,_idx:d})}re(i,e,n),de(i,e,n)}function de(t,e,i){var a,o,d,s;const n=document.getElementById("match-actions");if(n)if(e.phase==="attack"){const r=K(e.selected,e.modifiers.home);n.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:8px">
        ${e.selected.length>0?`Attaque : <b style="color:var(--yellow);font-size:18px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base} + ${r.links} liens${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (milieux/attaquants)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${e.selected.length===0?"disabled":""}>
        Valider l'attaque →
      </button>
    `,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>{Fe(t,e,i)})}else if(e.phase==="defense"){const r=O(e.selected,e.modifiers.home);n.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:4px">
        <div style="font-size:12px;opacity:.7">L'IA attaque avec <b style="color:#ff6b6b">${((o=e.pendingAttack)==null?void 0:o.total)||0}</b></div>
        ${e.selected.length>0?`Défense : <b style="color:var(--yellow);font-size:18px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base} + ${r.links} liens)</span>`:'<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (gardien/défenseurs/milieux)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${e.selected.length===0?"disabled":""}>
        Valider la défense →
      </button>
    `,(d=document.getElementById("confirm-defense"))==null||d.addEventListener("click",()=>{Re(t,e,i)})}else e.phase==="finished"?(n.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(s=document.getElementById("end-match"))==null||s.addEventListener("click",()=>{i.navigate("home")})):n.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,0.5);padding:8px">⏳ Tour de l'IA...</div>`}function Fe(t,e,i){const n=K(e.selected,e.modifiers.home);e.pendingAttack={...n,players:[...e.selected],side:"home"},e.selected.forEach(a=>{const o=(e.homeTeam[a._role]||[]).find(d=>d.cardId===a.cardId);o&&(o.used=!0)}),e.log.push({text:`Vous attaquez avec ${n.total} (${e.selected.map(a=>a.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",k(t,e,i),setTimeout(()=>He(t,e,i),1200)}function Re(t,e,i){const n=O(e.selected,e.modifiers.home);e.selected.forEach(o=>{const d=(e.homeTeam[o._role]||[]).find(s=>s.cardId===o.cardId);d&&(d.used=!0)});const a=ie(e.pendingAttack.total,n.total,e.modifiers.home);a.goal?(e.aiScore++,e.log.push({text:`⚽ BUT de l'IA ! (${e.pendingAttack.total} vs ${n.total})`,type:"goal"})):a.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):e.log.push({text:`🧤 Défense réussie ! (${n.total} vs ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,le(t,e,i,"home-attack")}function z(t,e,i){const n=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=ne(n,"attack",e.difficulty);if(a.length===0){Ke(t,e,i);return}const o=K(a,e.modifiers.ai);e.pendingAttack={...o,players:a,side:"ai"},a.forEach(d=>{d.used=!0}),e.log.push({text:`L'IA attaque avec ${o.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",k(t,e,i)}function He(t,e,i){const n=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=ne(n,"defense",e.difficulty),o=O(a,e.modifiers.ai);a.forEach(s=>{s.used=!0}),ie(e.pendingAttack.total,o.total,e.modifiers.ai).goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! Vous marquez ! (${e.pendingAttack.total} vs ${o.total})`,type:"goal"})):e.log.push({text:`🧤 L'IA défend (${o.total} vs ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,le(t,e,i,"ai-attack")}function le(t,e,i,n){if(e.round++,ce(e)){G(t,e,i);return}if(n==="home-attack"){if([...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(o=>!o.used).length===0){e.phase="ai-attack",k(t,e,i),setTimeout(()=>z(t,e,i),1e3);return}e.phase="attack",k(t,e,i)}else{if([...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(o=>!o.used).length===0){if([...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(d=>!d.used).length===0){G(t,e,i);return}e.phase="attack",k(t,e,i);return}e.phase="ai-attack",k(t,e,i),setTimeout(()=>z(t,e,i),1e3)}}function ce(t){const e=["MIL","ATT"].some(n=>(t.homeTeam[n]||[]).some(a=>!a.used)),i=["MIL","ATT"].some(n=>(t.aiTeam[n]||[]).some(a=>!a.used));return!e&&!i}function Ke(t,e,i){ce(e)?G(t,e,i):(e.phase="attack",k(t,e,i))}function Oe(t,e,i,n,a){if(!n.usedGc.includes(t)){switch(n.usedGc.push(t),e){case"Double attaque":n.modifiers.home.doubleAttack=!0,n.log.push({text:"⚡ Double attaque activée !",type:"info"});break;case"Bouclier":n.modifiers.home.shield=!0,n.log.push({text:"🛡️ Bouclier activé !",type:"info"});break;case"Ressusciter":let o=!1;for(const s of["ATT","MIL","DEF","GK"]){const r=(n.homeTeam[s]||[]).find(l=>l.used);if(r){r.used=!1,o=!0;break}}n.log.push({text:o?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break;case"Vol de note":n.modifiers.ai.stolenNote=(n.modifiers.ai.stolenNote||0)+1,n.log.push({text:"🎯 -1 à la prochaine action IA",type:"info"});break;case"Gel":const d=[...n.aiTeam.ATT||[],...n.aiTeam.MIL||[]].filter(s=>!s.used);if(d.length>0){const s=d.sort((r,l)=>w(l,"ATT")-w(r,"ATT"))[0];s.used=!0,n.log.push({text:`❄️ ${s.name} (IA) gelé !`,type:"info"})}break;case"Remplacement+":n.maxSubs++,n.log.push({text:"🔄 +1 remplacement disponible",type:"info"});break}f.from("cards").delete().eq("id",t).then(()=>{}),k(i,n,a)}}async function G(t,e,i){e.phase="finished";const{state:n}=i,a=e.homeScore>e.aiScore,o=e.homeScore===e.aiScore,d=a?"victoire":o?"nul":"defaite",s=ye(e.mode,d);e.log.push({text:a?`🏆 VICTOIRE ! +${s} crédits`:o?`🤝 Match nul. +${s} crédits`:`❌ Défaite. +${s} crédits`,type:"goal"}),e.matchId&&await f.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?n.profile.id:null,home_credits_reward:s,played_at:new Date().toISOString()}).eq("id",e.matchId);const r={credits:(n.profile.credits||0)+s,matches_played:(n.profile.matches_played||0)+1};a?r.wins=(n.profile.wins||0)+1:o?r.draws=(n.profile.draws||0)+1:r.losses=(n.profile.losses||0)+1,await f.from("users").update(r).eq("id",n.profile.id),await i.refreshProfile(),Pe(t,e,{isWin:a,isDraw:o,rewards:s},i)}function Pe(t,e,{isWin:i,isDraw:n,rewards:a},o){var d,s;t.innerHTML=`
  <div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff;max-width:400px">
      <div style="font-size:72px;margin-bottom:16px">${i?"🏆":n?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">
        ${i?"Victoire !":n?"Match nul":"Défaite"}
      </h2>
      <div style="font-size:42px;font-weight:900;margin:16px 0">${e.homeScore} - ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:13px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${a.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:24px">
        <button class="btn btn-ghost" id="result-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="result-replay" style="flex:1">Rejouer</button>
      </div>
    </div>
  </div>
  `,(d=document.getElementById("result-home"))==null||d.addEventListener("click",()=>o.navigate("home")),(s=document.getElementById("result-replay"))==null||s.addEventListener("click",()=>o.navigate("match",{matchMode:e.mode}))}function Ue(t,e){const i=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div class="match-grid" style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${i.map(n=>{const a=t.aiTeam[n]||[];return a.length?`<div class="match-row" style="margin-bottom:6px">
          ${a.map(o=>{const d=w(o,n);return`<div class="match-slot ${o.used?"used":""}" style="cursor:default">
              <div class="slot-note">${d}</div>
              <div class="slot-name">${o.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>
    <p style="font-size:11px;color:var(--gray-600);margin-top:8px;text-align:center">Remplaçants non affichés (GDD §4)</p>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const Ne={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ve(t,e){const{state:i,toast:n}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await P(t,e)}async function P(t,e){const{state:i,toast:n}=e,{data:a}=await f.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),o=(a||[]).filter(r=>r.seller_id===i.profile.id),d=(a||[]).filter(r=>r.seller_id!==i.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${d.length} carte(s) en vente · Solde : ${(i.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${o.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function s(r){const l=document.getElementById("mkt-content"),c=r==="buy"?d:o;if(c.length===0){l.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${r==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}l.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(p=>{var g,h,b;const u=(g=p.card)==null?void 0:g.player;if(!u)return"";const v=u.job==="GK"?u.note_g:u.job==="DEF"?u.note_d:u.job==="MIL"?u.note_m:u.note_a,y=Ne[u.rarity],m=(i.profile.credits||0)>=p.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${Xe(u.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${y};flex-shrink:0">${v}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${u.firstname} ${u.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${u.country_code} · ${((h=u.clubs)==null?void 0:h.encoded_name)||"—"} · ${u.rarity} · ${u.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((b=p.seller)==null?void 0:b.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${p.price.toLocaleString("fr")}</div>
            ${r==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${p.id}" ${m?"":"disabled"} style="margin-top:4px">${m?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${p.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,l.querySelectorAll("[data-buy]").forEach(p=>{p.addEventListener("click",()=>We(p.dataset.buy,c,t,e))}),l.querySelectorAll("[data-cancel]").forEach(p=>{p.addEventListener("click",()=>Je(p.dataset.cancel,t,e))})}s("buy"),t.querySelectorAll(".mkt-tab").forEach(r=>{r.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(l=>{const c=l===r;l.style.background=c?"var(--green)":"#fff",l.style.color=c?"#fff":"var(--gray-600)",l.style.borderColor=c?"var(--green)":"var(--gray-200)"}),s(r.dataset.tab)})})}async function We(t,e,i,n){const{state:a,toast:o,refreshProfile:d}=n,s=e.find(r=>r.id===t);if(s){if((a.profile.credits||0)<s.price){o("Crédits insuffisants","error");return}if(confirm(`Acheter ${s.card.player.firstname} ${s.card.player.surname_encoded} pour ${s.price.toLocaleString("fr")} crédits ?`))try{const{error:r}=await f.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",s.card.id);if(r)throw r;await f.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await f.from("users").update({credits:(a.profile.credits||0)-s.price}).eq("id",a.profile.id);const{data:l}=await f.from("users").select("credits").eq("id",s.seller_id).single();l&&await f.from("users").update({credits:(l.credits||0)+s.price}).eq("id",s.seller_id),await f.from("notifications").insert({user_id:s.seller_id,type:"card_sold",message:`Ta carte ${s.card.player.surname_encoded} a été vendue pour ${s.price} crédits !`,data:{card_id:s.card.id,price:s.price}}),await d(),o("Carte achetée ! ✅","success"),P(i,n)}catch(r){o("Erreur : "+r.message,"error")}}}async function Je(t,e,i){const{toast:n}=i,{data:a}=await f.from("market_listings").select("card_id").eq("id",t).single();await f.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await f.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),n("Annonce retirée","success"),P(e,i)}function Xe(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function Ye(t,{state:e,navigate:i,toast:n}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await f.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${a&&a.length>0?a.map((o,d)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${o.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${d+1}</div>
            <div style="flex:1">
              <div style="font-weight:700">${o.pseudo}</div>
              <div style="font-size:11px;color:var(--gray-600)">${o.club_name}</div>
            </div>
            <div style="text-align:right;font-size:12px">
              <div>🥇${o.trophies_top1} 🥈${o.trophies_top2} 🥉${o.trophies_top3}</div>
              <div style="color:var(--gray-600)">${o.wins} V</div>
            </div>
          </div>
        `).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun manager.</div>'}
      </div>
    </div>
  </div>
  `}const x={user:null,profile:null,page:"home",params:{}};function M(t,e="info",i=3e3){const n=document.getElementById("toast");n&&(n.textContent=t,n.className=`show ${e}`,clearTimeout(n._t),n._t=setTimeout(()=>{n.className=""},i))}function Qe(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function F(){document.getElementById("modal-overlay").classList.add("hidden")}async function A(){if(!x.user)return;const{data:t}=await f.from("users").select("*").eq("id",x.user.id).single();t&&(x.profile=t)}function B(t,e={}){x.page=t,x.params=e,pe()}async function pe(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(n=>{n.classList.toggle("active",n.dataset.page===x.page)});const e=document.getElementById("nav-credits");e&&x.profile&&(e.textContent=`💰 ${(x.profile.credits||0).toLocaleString("fr")}`);const i={state:x,navigate:B,toast:M,openModal:Qe,closeModal:F,refreshProfile:A};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',x.page){case"home":await W(t,i);break;case"collection":await be(t,i);break;case"decks":await _e(t,i);break;case"boosters":await $e(t,i);break;case"match":await Be(t,i);break;case"market":await Ve(t,i);break;case"rankings":await Ye(t,i);break;default:await W(t,i)}}function Ze(){const t=document.getElementById("app"),e=x.profile,i=(e.club_name||"MW").split(" ").filter(Boolean);i.length>=2?(i[0][0]+i[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
    <nav class="top-nav">
      <div class="logo" id="nav-logo">⚽ MW</div>
      <div id="nav-credits" class="credits">💰 ${(e.credits||0).toLocaleString("fr")}</div>
    </nav>

    <main id="page-content" class="page"></main>

    <nav class="bottom-nav">
      <a href="#" data-page="home" class="active">
        <span class="icon">🏠</span><span>Accueil</span>
      </a>
      <a href="#" data-page="collection">
        <span class="icon">🃏</span><span>Cartes</span>
      </a>
      <a href="#" data-page="decks">
        <span class="icon">📋</span><span>Decks</span>
      </a>
      <a href="#" data-page="boosters">
        <span class="icon">📦</span><span>Boosters</span>
      </a>
      <a href="#" data-page="market">
        <span class="icon">🛒</span><span>Marché</span>
      </a>
    </nav>
  `,document.querySelectorAll(".bottom-nav a").forEach(n=>{n.addEventListener("click",a=>{a.preventDefault(),B(n.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>B("home")),document.getElementById("nav-credits").addEventListener("click",()=>B("boosters"))}async function et(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&F()}),document.getElementById("modal-close").addEventListener("click",F);const{data:{session:t}}=await f.auth.getSession();if(!t){te(),N(document.getElementById("app"),{navigate:Z,toast:M});return}if(x.user=t.user,await A(),te(),!x.profile){fe(document.getElementById("app"),{state:x,navigate:tt,toast:M,refreshProfile:A});return}x.profile.first_booster_opened||(await it(x.user.id),await A()),ue(),f.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(x.user=null,x.profile=null,document.getElementById("app").innerHTML="",N(document.getElementById("app"),{navigate:Z,toast:M}))})}function ue(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",Ze(),pe()}function Z(){window.location.reload()}async function tt(){await A(),ue()}async function it(t){const{data:e}=await f.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:i}=await f.from("players").select("id,job").eq("is_active",!0);if(!i||i.length===0)return;const n=i.filter(s=>s.job==="GK"),a=i.filter(s=>s.job!=="GK"),o=[];for(let s=0;s<5;s++){let r=[];s===0&&n.length>0?(r.push(n[Math.floor(Math.random()*n.length)]),r.push(...ee([...a]).slice(0,3))):r=ee([...i]).slice(0,4),r.forEach(l=>o.push({owner_id:t,player_id:l.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(s=>{o.push({owner_id:t,card_type:"game_changer",gc_type:s})});const d=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];o.push({owner_id:t,card_type:"formation",formation:d[Math.floor(Math.random()*d.length)]}),await f.from("cards").insert(o),await f.from("users").update({first_booster_opened:!0}).eq("id",t),M("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function ee(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function te(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}et();
