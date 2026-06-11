import{s as f,r as te}from"./card-CoW7FVRn.js";function N(t,{navigate:e,toast:a}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(i=>{i.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(n=>n.classList.remove("active")),i.classList.add("active"),document.getElementById("tab-login").style.display=i.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=i.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const i=document.getElementById("login-email").value.trim(),n=document.getElementById("login-password").value,s=document.getElementById("login-error");if(s.textContent="",!i||!n){s.textContent="Remplissez tous les champs.";return}const d=document.getElementById("login-btn");d.textContent="Connexion…",d.disabled=!0;const{error:o}=await f.auth.signInWithPassword({email:i,password:n});if(d.textContent="Se connecter",d.disabled=!1,o){s.textContent=o.message.includes("Invalid")?"Email ou mot de passe incorrect.":o.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",i=>{i.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const i=document.getElementById("reg-email").value.trim(),n=document.getElementById("reg-password").value,s=document.getElementById("reg-confirm").value,d=document.getElementById("reg-error");if(d.textContent="",!i||!n||!s){d.textContent="Remplissez tous les champs.";return}if(n.length<6){d.textContent="Mot de passe trop court (min. 6 caractères).";return}if(n!==s){d.textContent="Les mots de passe ne correspondent pas.";return}const o=document.getElementById("reg-btn");o.textContent="Création…",o.disabled=!0;const{error:r}=await f.auth.signUp({email:i,password:n});if(o.textContent="Créer mon compte",o.disabled=!1,r){d.textContent=r.message;return}a("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=i})}function me(t,{state:e,navigate:a,toast:i,refreshProfile:n}){let s="#1A6B3C",d="#D4A017";t.innerHTML=`
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

        <div class="club-logo-preview" id="logo-preview" style="background:${d};border-color:${s}">
          <span id="logo-initials" style="color:${s}">MW</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch1" style="background:${s};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur du contour</label>
              <input type="color" id="color1" value="${s}" style="width:100%;height:36px;padding:2px;border-radius:6px">
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
  `;function o(){var y;const l=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),p=((y=document.getElementById("setup-club"))==null?void 0:y.value)||"MW",u=p.trim().split(" ").filter(Boolean),v=u.length>=2?(u[0][0]+u[1][0]).toUpperCase():p.slice(0,2).toUpperCase();l&&(l.style.background=d,l.style.borderColor=s),c&&(c.textContent=v,c.style.color=s)}document.getElementById("color1").addEventListener("input",l=>{s=l.target.value,document.getElementById("swatch1").style.background=s,o()}),document.getElementById("color2").addEventListener("input",l=>{d=l.target.value,document.getElementById("swatch2").style.background=d,o()});function r(l){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${l}`).classList.add("active"),document.getElementById("step-num").textContent=l,document.getElementById("progress-fill").style.width=`${Math.round(l/3*100)}%`,l===3&&o()}document.getElementById("step1-next").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",l.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:p}=await f.from("users").select("id").eq("pseudo",l).maybeSingle();if(p){c.textContent="Ce pseudo est déjà pris.";return}r(2)}),document.getElementById("step2-back").addEventListener("click",()=>r(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const l=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",l.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:p}=await f.from("users").select("id").eq("club_name",l).maybeSingle();if(p){c.textContent="Ce nom de club est déjà pris.";return}r(3)}),document.getElementById("step3-back").addEventListener("click",()=>r(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),p=document.getElementById("step3-error"),u=document.getElementById("step3-finish");p.textContent="",u.disabled=!0,u.textContent="Création en cours…";try{const{error:v}=await f.from("users").insert({id:e.user.id,pseudo:l,club_name:c,club_color1:s,club_color2:d,credits:1e4});if(v)throw v;await ve(e.user.id),await n(),i(`Bienvenue ${l} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(v){p.textContent=v.message,u.disabled=!1,u.textContent="🚀 Créer mon profil !"}})}async function ve(t){const{data:e}=await f.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const a=e,i=a.filter(r=>r.job==="GK"),n=a.filter(r=>r.job!=="GK"),s=[];for(let r=0;r<5;r++){let l=[];if(r===0&&i.length>0){const c=i[Math.floor(Math.random()*i.length)];l.push(c);const p=U([...n]).slice(0,3);l.push(...p)}else l=U([...a]).slice(0,4);l.forEach(c=>{s.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(r=>{s.push({owner_id:t,card_type:"game_changer",gc_type:r})});const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];s.push({owner_id:t,card_type:"formation",formation:o[Math.floor(Math.random()*o.length)]}),s.length>0&&await f.from("cards").insert(s),await f.from("users").update({first_booster_opened:!0}).eq("id",t)}function U(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}async function V(t,{state:e,navigate:a,toast:i}){const n=e.profile;if(!n)return;const{data:s}=await f.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${n.id},away_id.eq.${n.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),d=(n.club_name||"MW").split(" ").filter(Boolean),o=d.length>=2?(d[0][0]+d[1][0]).toUpperCase():(n.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
  <div class="page">
    <div class="page-body">

      <!-- Hero profil -->
      <div class="hero">
        <div class="info">
          <h3>${n.pseudo}</h3>
          <div class="level">Niveau ${n.level} · ${n.club_name}</div>
          <div class="stats">
            <div class="stat"><span class="val">${n.wins}</span><span class="lbl">V</span></div>
            <div class="stat"><span class="val">${n.trophies_top1}</span><span class="lbl">TOP1</span></div>
            <div class="stat"><span class="val">${(n.credits||0).toLocaleString("fr")}</span><span class="lbl">Crédits</span></div>
          </div>
        </div>
        <div class="logo-big" style="background:${n.club_color2};border-color:${n.club_color1}">
          <span style="color:${n.club_color1}">${o}</span>
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
      ${s&&s.length>0?`
      <div>
        <div class="section-title">⚽ Derniers matchs</div>
        <div class="card-panel" style="padding:0">
          ${s.map(r=>{const l=r.winner_id===n.id,c=r.home_score===r.away_score,p=c?"N":l?"V":"D",u=c?"#888":l?"#1A6B3C":"#c0392b",v={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[r.mode]||r.mode,m=new Date(r.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
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
  `,t.querySelectorAll("[data-nav]").forEach(r=>{r.addEventListener("click",l=>{l.preventDefault(),a(r.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.action;if(l==="championship"){i("Championnats — bientôt disponibles","info");return}if(l==="match-random"){i("Matchmaking aléatoire — bientôt disponible","info");return}if(l==="match-friend"){i("Défi ami — bientôt disponible","info");return}l==="match-ai"&&ye(a)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await f.auth.signOut(),window.location.reload()})}function ye(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],a=document.createElement("div");a.className="modal-overlay",a.style.zIndex="2000",a.innerHTML=`
    <div class="modal" style="max-width:380px">
      <div class="modal-header"><h2>Choisir la difficulté</h2><button class="btn-icon" id="diff-cancel">✕</button></div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${e.map(n=>`
            <div class="action-card" data-mode="${n.mode}" style="cursor:pointer">
              <div class="icon">${n.icon}</div>
              <div class="label">${n.label}</div>
              <div class="sub">${n.sub}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  `,document.body.appendChild(a);const i=()=>a.remove();document.getElementById("diff-cancel").addEventListener("click",i),a.addEventListener("click",n=>{n.target===a&&i()}),a.querySelectorAll("[data-mode]").forEach(n=>{n.addEventListener("click",()=>{i(),t("match",{matchMode:n.dataset.mode})})})}const q={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque 1 joueur adverse ce match."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function w(t,e){if(!t)return 0;switch(e){case"GK":return t.note_g||0;case"DEF":return t.note_d||0;case"MIL":return t.note_m||0;case"ATT":return t.note_a||0;default:return 0}}function R(t){let e=0;for(let a=0;a<t.length-1;a++){const i=t[a],n=t[a+1];!i||!n||(i.country_code&&n.country_code&&i.country_code===n.country_code&&(e+=1),i.club_id&&n.club_id&&i.club_id===n.club_id&&(e+=1))}return e}function O(t,e={}){let a=t.reduce((s,d)=>s+w(d,"ATT"),0);const i=R(t);let n=a+i;return e.doubleAttack&&(n*=2),e.stolenNote&&(n-=e.stolenNote),{base:a,links:i,total:Math.max(0,n)}}function H(t,e={}){let a=t.reduce((s,d)=>s+w(d,"DEF"),0);const i=R(t);let n=a+i;return e.stolenNote&&(n-=e.stolenNote),{base:a,links:i,total:Math.max(0,n)}}function W(t){const e=t.reduce((i,n)=>i+w(n,"MIL"),0),a=R(t);return e+a}function ie(t,e,a={}){return a.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function ae(t,e,a="easy"){const i=e==="attack"?"ATT":"DEF",n=t.filter(o=>!o.used);if(n.length===0)return[];const s=[...n].sort((o,r)=>w(r,i)-w(o,i));let d;return a==="easy"?d=1+Math.floor(Math.random()*2):a==="medium"?d=2+Math.floor(Math.random()*2):d=3,d=Math.min(d,s.length,3),s.slice(0,d)}function ge(t,e){const a={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(a[t]||a.vs_ai_easy)[e]||0}const he={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},be=["Tous","GK","DEF","MIL","ATT"];async function xe(t,e){const{state:a,navigate:i,toast:n,openModal:s,closeModal:d}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:o}=await f.from("cards").select("id,card_type,current_note,gc_type,formation,is_for_sale,sale_price,player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url))").eq("owner_id",a.profile.id).order("acquired_at",{ascending:!1});let r="Tous",l="";const c=(o||[]).filter(m=>m.card_type==="player"),p=(o||[]).filter(m=>m.card_type==="game_changer"),u=(o||[]).filter(m=>m.card_type==="formation");function v(){return c.filter(m=>{const g=m.player;if(!g)return!1;const h=r==="Tous"||g.job===r,b=!l||`${g.firstname} ${g.surname_encoded}`.toLowerCase().includes(l);return h&&b})}t.innerHTML=`
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
        ${be.map(m=>`
          <button class="filter-btn" data-job="${m}" style="flex-shrink:0;padding:4px 12px;border-radius:20px;border:1.5px solid ${m===r?"var(--green)":"var(--gray-200)"};background:${m===r?"var(--green)":"#fff"};color:${m===r?"#fff":"var(--gray-600)"};font-size:12px;font-weight:600;cursor:pointer">${m}</button>`).join("")}
      </div>
    </div>

    <div class="page-body">
      <div class="cards-grid" id="col-grid"></div>
    </div>
  </div>
  `;function y(){const m=v(),g=document.getElementById("col-grid");if(g){if(m.length===0){g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte trouvée.<br><small>Ouvre des boosters pour en obtenir !</small></div>';return}g.innerHTML=m.map(h=>{var T,L;const b=h.player,$={...b,current_note:h.current_note,club_encoded_name:(T=b.clubs)==null?void 0:T.encoded_name},D=b.skin&&b.hair?ne(b):null,C=((L=b.clubs)==null?void 0:L.logo_url)||null;return`<div class="card-item" data-card-id="${h.id}">
        ${te($,{portraitUrl:D,clubLogoUrl:C,showNotes:!1})}
        ${h.is_for_sale?'<div class="card-owned-badge" style="background:#D4A017">En vente</div>':""}
      </div>`}).join(""),g.querySelectorAll(".card-item").forEach(h=>{h.addEventListener("click",()=>{const b=c.find($=>$.id===h.dataset.cardId);b&&_e(b,t,e)})})}}y(),t.querySelectorAll(".filter-btn").forEach(m=>{m.addEventListener("click",()=>{r=m.dataset.job,t.querySelectorAll(".filter-btn").forEach(g=>{const h=g.dataset.job===r;g.style.background=h?"var(--green)":"#fff",g.style.color=h?"#fff":"var(--gray-600)",g.style.borderColor=h?"var(--green)":"var(--gray-200)"}),y()})}),document.getElementById("col-search").addEventListener("input",m=>{l=m.target.value.toLowerCase(),y()})}function ne(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co",a=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${a}.jpg`}function _e(t,e,a){var u,v,y,m,g;const{state:i,toast:n,openModal:s,closeModal:d}=a,o=t.player,r={...o,club_encoded_name:(u=o.clubs)==null?void 0:u.encoded_name},l=ne(o),c=((v=o.clubs)==null?void 0:v.logo_url)||null,p=o.rarity!=="legende"&&!(o.rarity==="papyte"&&o.note_min!==null&&(t.current_note??99)<=o.note_min);s(`${o.firstname} ${o.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
      <div>${te(r,{portraitUrl:l,clubLogoUrl:c,showNotes:!0})}</div>
      <div style="flex:1;min-width:160px">
        <div style="font-size:12px;color:var(--gray-600)">RARETÉ</div>
        <div style="font-weight:700;margin-bottom:8px;color:${he[o.rarity]}">${o.rarity.toUpperCase()}</div>
        <div style="font-size:12px;color:var(--gray-600)">POSTE</div>
        <div style="font-weight:700;margin-bottom:8px">${o.job}${o.job2?" / "+o.job2:""}</div>
        <div style="font-size:12px;color:var(--gray-600)">PRIX DE BASE</div>
        <div style="font-weight:700">${(o.sell_price||0).toLocaleString("fr")} cr.</div>
        ${t.is_for_sale?`<div style="color:#D4A017;font-weight:700;margin-top:8px">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>`:""}
      </div>
    </div>
    ${p?"":`<div style="margin-top:12px;font-size:12px;color:var(--gray-600);text-align:center;padding:8px;background:#f5f5f5;border-radius:8px">${o.rarity==="legende"?"🔒 Les cartes Légende ne sont pas revendables (GDD §3.4)":"🔒 Carte Papyte à note minimale : non vendable"}</div>`}
    ${p&&!t.is_for_sale?`
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:12px">
      <label style="font-size:12px;font-weight:600;margin-bottom:6px;display:block">Mettre en vente sur le marché</label>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${o.sell_price||1e3}">
        <button class="btn btn-yellow" id="sell-btn">Vendre</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?'<div style="margin-top:12px"><button class="btn btn-ghost" id="cancel-sell-btn" style="width:100%">Retirer de la vente</button></div>':""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(y=document.getElementById("close-detail"))==null||y.addEventListener("click",d),(m=document.getElementById("sell-btn"))==null||m.addEventListener("click",async()=>{const h=parseInt(document.getElementById("sell-price").value);if(!h||h<1){n("Prix invalide","error");return}const{error:b}=await f.from("cards").update({is_for_sale:!0,sale_price:h}).eq("id",t.id);if(b){n(b.message,"error");return}await f.from("market_listings").insert({seller_id:i.profile.id,card_id:t.id,price:h}),n("Carte mise en vente ! ✅","success"),d(),a.navigate("collection")}),(g=document.getElementById("cancel-sell-btn"))==null||g.addEventListener("click",async()=>{await f.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await f.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),d(),a.navigate("collection")})}const S={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},oe={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};async function ke(t,e){const{state:a,navigate:i,toast:n}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await f.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",a.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(s==null?void 0:s.length)||0} deck(s) · Un deck = 11 titulaires + remplaçants</p>
    </div>

    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${s&&s.length>0?s.map(d=>`
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
  `,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const d=prompt("Nom du deck :",`Deck ${((s==null?void 0:s.length)||0)+1}`);if(!d)return;const{data:o,error:r}=await f.from("decks").insert({owner_id:a.profile.id,name:d,is_active:!s||s.length===0}).select().single();if(r){n(r.message,"error");return}n("Deck créé !","success"),Y(o.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(d=>{d.addEventListener("click",()=>Y(d.dataset.edit,t,e))})}async function Y(t,e,a){const{state:i,toast:n,navigate:s}=a;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du deck...</div>';const{data:d}=await f.from("decks").select("*").eq("id",t).single(),{data:o}=await f.from("cards").select("id, card_type, formation, player:players(id,firstname,surname_encoded,country_code,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,clubs(encoded_name,logo_url))").eq("owner_id",i.profile.id),r=(o||[]).filter(u=>u.card_type==="player"&&u.player),l=(o||[]).filter(u=>u.card_type==="formation"),{data:c}=await f.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t),p={deckId:t,name:d.name,formation:d.formation||"4-4-2",formationCardId:d.formation_card_id,slots:{},playerCards:r,formationCards:l};(c||[]).forEach(u=>{p.slots[u.position]=u.card_id}),j(e,p,a)}function j(t,e,a){const{toast:i,navigate:n}=a,s=S[e.formation],d=[];d.push("GK1");for(let r=1;r<=s.DEF;r++)d.push(`DEF${r}`);for(let r=1;r<=s.MIL;r++)d.push(`MIL${r}`);for(let r=1;r<=s.ATT;r++)d.push(`ATT${r}`);const o=d.filter(r=>e.slots[r]).length;t.innerHTML=`
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${e.name}</h2>
        <p>${o}/11 titulaires placés</p>
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
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${o<11?"disabled":""}>
        ${o<11?`Placez encore ${11-o} joueur(s)`:"💾 Enregistrer le deck"}
      </button>
    </div>
  </div>
  `,we(t,e,d,s,a),document.getElementById("builder-back").addEventListener("click",()=>n("decks")),document.getElementById("formation-select").addEventListener("change",r=>{e.formation=r.target.value;const l=S[e.formation],c=["GK1"];for(let u=1;u<=l.DEF;u++)c.push(`DEF${u}`);for(let u=1;u<=l.MIL;u++)c.push(`MIL${u}`);for(let u=1;u<=l.ATT;u++)c.push(`ATT${u}`);const p={};c.forEach(u=>{e.slots[u]&&(p[u]=e.slots[u])}),e.slots=p,j(t,e,a)}),document.getElementById("save-deck").addEventListener("click",()=>$e(e,a))}function we(t,e,a,i,n){const s=document.getElementById("deck-field");if(!s)return;const d=[a.filter(o=>o.startsWith("ATT")),a.filter(o=>o.startsWith("MIL")),a.filter(o=>o.startsWith("DEF")),a.filter(o=>o.startsWith("GK"))];s.innerHTML=d.map(o=>`
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:12px">
      ${o.map(r=>{const l=e.slots[r],c=l?e.playerCards.find(v=>v.id===l):null,p=r.replace(/\d+/,""),u=oe[p];if(c){const v=c.player,y=p==="GK"?v.note_g:p==="DEF"?v.note_d:p==="MIL"?v.note_m:v.note_a;return`<div class="formation-slot filled" data-pos="${r}" style="border-color:${u};background:${u}">
            <div style="font-size:14px;font-weight:900;color:#fff">${y}</div>
            <div style="font-size:7px;color:#fff;max-width:52px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.surname_encoded}</div>
          </div>`}return`<div class="formation-slot" data-pos="${r}" style="border-color:rgba(255,255,255,0.4)">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${p}</div>
          <div style="font-size:16px;color:rgba(255,255,255,0.5)">+</div>
        </div>`}).join("")}
    </div>
  `).join(""),s.querySelectorAll(".formation-slot").forEach(o=>{o.addEventListener("click",()=>{Ee(o.dataset.pos,e,t,n)})})}function Ee(t,e,a,i,n,s){var u;const{openModal:d,closeModal:o,toast:r}=i,l=t.replace(/\d+/,""),c=Object.values(e.slots).filter(v=>v!==e.slots[t]),p=e.playerCards.filter(v=>{const y=v.player,m=y.job===l||y.job2===l,g=!c.includes(v.id);return m&&g});p.sort((v,y)=>{const m=l==="GK"?v.player.note_g:l==="DEF"?v.player.note_d:l==="MIL"?v.player.note_m:v.player.note_a;return(l==="GK"?y.player.note_g:l==="DEF"?y.player.note_d:l==="MIL"?y.player.note_m:y.player.note_a)-m}),d(`Choisir un ${l} (${t})`,`<div style="max-height:50vh;overflow-y:auto">
      ${e.slots[t]?'<button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:10px">Retirer le joueur actuel</button>':""}
      ${p.length>0?`<div style="display:flex;flex-direction:column;gap:6px">
        ${p.map(v=>{var h;const y=v.player,m=l==="GK"?y.note_g:l==="DEF"?y.note_d:l==="MIL"?y.note_m:y.note_a,g={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[y.rarity];return`<div class="player-option" data-card-id="${v.id}" style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
            <div style="width:32px;height:32px;border-radius:6px;background:${oe[l]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;border:2px solid ${g}">${m}</div>
            <div style="flex:1">
              <div style="font-weight:600;font-size:13px">${y.firstname} ${y.surname_encoded}</div>
              <div style="font-size:11px;color:var(--gray-600)">${y.country_code} · ${((h=y.clubs)==null?void 0:h.encoded_name)||"—"} · ${y.rarity}</div>
            </div>
          </div>`}).join("")}
      </div>`:'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur éligible pour ce poste.<br><small>Ouvre des boosters pour en obtenir !</small></div>'}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`),(u=document.getElementById("remove-player"))==null||u.addEventListener("click",()=>{delete e.slots[t],o(),j(a,e,i)}),document.querySelectorAll(".player-option").forEach(v=>{v.addEventListener("click",()=>{e.slots[t]=v.dataset.cardId,o(),j(a,e,i)})})}async function $e(t,e){const{state:a,toast:i,navigate:n}=e;let s=t.formationCardId;const d=t.formationCards.find(r=>r.formation===t.formation);d&&(s=d.id),await f.from("decks").update({formation:t.formation,formation_card_id:s}).eq("id",t.deckId),await f.from("deck_cards").delete().eq("deck_id",t.deckId);const o=Object.entries(t.slots).map(([r,l],c)=>({deck_id:t.deckId,card_id:l,position:r,is_starter:!0,slot_order:c}));if(o.length>0){const{error:r}=await f.from("deck_cards").insert(o);if(r){i(r.message,"error");return}}i("Deck enregistré ! ✅","success"),n("decks")}const J=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],se={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Ie(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const a=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${a}.jpg`}const Te={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Le={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ae(t,{state:e,navigate:a,toast:i}){var s;const n=((s=e.profile)==null?void 0:s.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${n.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${J.map(d=>{const o=n>=d.cost||d.cost===0;return`<div class="booster-card ${o?"":"disabled"}" data-booster="${d.id}">
            <div class="icon">${d.icon}</div>
            <div class="name">${d.name}</div>
            <div class="desc">${d.sub}</div>
            <div class="cost">${d.costLabel}</div>
            ${o?"":'<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>'}
          </div>`}).join("")}
      </div>
      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:8px">
        <b>📌 Rappels</b><br>
        • 1er booster Players contient toujours un Gardien.<br>
        • Game Helper : carte éphémère disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(d=>{d.addEventListener("click",async()=>{const o=J.find(r=>r.id===d.dataset.booster);if(o){d.style.opacity="0.5",d.style.pointerEvents="none";try{await Me(o,{state:e,toast:i,navigate:a,container:t})}catch(r){i(r.message,"error"),d.style.opacity="",d.style.pointerEvents=""}}})})}async function Me(t,{state:e,toast:a,navigate:i,container:n}){if(t.cost>0&&e.profile.credits<t.cost){a("Crédits insuffisants","error");return}t.id==="players_pub"&&await qe();let s=[];t.type==="player"?s=await Ce(e.profile,t.cardCount,t.cost):t.type==="game_changer"?s=await Be(e.profile,t.cardCount,t.cost):t.type==="formation"&&(s=await je(e.profile,t.cost));const{data:d}=await f.from("users").select("*").eq("id",e.profile.id).single();d&&(e.profile=d),De(s,t,i)}async function Ce(t,e,a){if(a>0){const{error:r}=await f.from("users").update({credits:t.credits-a}).eq("id",t.id);if(r)throw r}const{data:i}=await f.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(i!=null&&i.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const n=i.filter(r=>r.job==="GK"),s=i.filter(r=>r.job!=="GK");let d=[];!t.first_booster_opened&&n.length>0?(d.push(n[Math.floor(Math.random()*n.length)]),d.push(...X([...s]).slice(0,e-1)),await f.from("users").update({first_booster_opened:!0}).eq("id",t.id)):d=X([...i]).slice(0,e);const{data:o}=await f.from("cards").insert(d.map(r=>({owner_id:t.id,player_id:r.id,card_type:"player"}))).select();return d.map((r,l)=>({...o[l],player:r}))}async function Be(t,e,a){const{error:i}=await f.from("users").update({credits:t.credits-a}).eq("id",t.id);if(i)throw i;const n=Object.keys(se),s=Array.from({length:e},()=>n[Math.floor(Math.random()*n.length)]),{data:d}=await f.from("cards").insert(s.map(o=>({owner_id:t.id,card_type:"game_changer",gc_type:o}))).select();return d}async function je(t,e){const{error:a}=await f.from("users").update({credits:t.credits-e}).eq("id",t.id);if(a)throw a;const i=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],n=i[Math.floor(Math.random()*i.length)],{data:s}=await f.from("cards").insert({owner_id:t.id,card_type:"formation",formation:n}).select();return s}function De(t,e,a){var d,o;const i=document.createElement("div");i.id="booster-anim-overlay",i.innerHTML=`
    <style>
      #booster-anim-overlay {
        position:fixed;inset:0;background:#0a1628;display:flex;flex-direction:column;
        align-items:center;justify-content:center;z-index:3000;overflow:hidden;
      }
      .pack-container { display:flex;flex-direction:column;align-items:center;gap:16px; }
      .pack-visual {
        width:160px;height:220px;border-radius:16px;
        background:linear-gradient(135deg,#1A6B3C,#D4A017,#1A6B3C);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        box-shadow:0 0 40px rgba(212,160,23,0.5);
        cursor:pointer;transition:transform 0.1s;font-size:64px;
        border:3px solid rgba(212,160,23,0.6);
        animation: packFloat 2s ease-in-out infinite;
      }
      @keyframes packFloat {
        0%,100% { transform:translateY(0) rotate(-1deg); }
        50%      { transform:translateY(-8px) rotate(1deg); }
      }
      .pack-visual.shaking {
        animation: packShake 0.4s ease-in-out;
      }
      @keyframes packShake {
        0%,100% { transform:rotate(0deg); }
        20%     { transform:rotate(-8deg) scale(1.05); }
        40%     { transform:rotate(8deg) scale(1.08); }
        60%     { transform:rotate(-5deg) scale(1.06); }
        80%     { transform:rotate(5deg) scale(1.04); }
      }
      .pack-open {
        animation: packOpen 0.6s ease-out forwards !important;
      }
      @keyframes packOpen {
        0%   { transform:scale(1); opacity:1; }
        50%  { transform:scale(1.3) rotate(5deg); opacity:0.8; }
        100% { transform:scale(0) rotate(20deg); opacity:0; }
      }
      .cards-reveal {
        display:none;flex-wrap:wrap;gap:10px;justify-content:center;
        max-width:600px;padding:16px;
      }
      .card-flip-wrapper {
        perspective:600px;
        cursor:pointer;
      }
      .card-flip-inner {
        width:140px;height:200px;position:relative;
        transform-style:preserve-3d;
        transition:transform 0.6s ease;
        transform:rotateY(180deg);
      }
      .card-flip-inner.revealed { transform:rotateY(0deg); }
      .card-face-back, .card-face-front {
        position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;
        display:flex;align-items:center;justify-content:center;
      }
      .card-face-back {
        background:linear-gradient(135deg,#1A6B3C,#0a3d1e);
        border:3px solid rgba(212,160,23,0.6);
        font-size:40px;
      }
      .card-face-front {
        backface-visibility:hidden;transform:rotateY(0deg);
        overflow:hidden;
      }
    </style>

    <!-- Phase 1 : booster -->
    <div class="pack-container" id="pack-phase">
      <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-bottom:8px">
        ${e.name} · ${t.length} carte${t.length>1?"s":""}
      </div>
      <div class="pack-visual" id="pack-visual">${e.icon}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:8px">Appuie pour ouvrir</div>
    </div>

    <!-- Phase 2 : cartes -->
    <div class="cards-reveal" id="cards-phase"></div>

    <!-- Boutons fin -->
    <div id="reveal-btns" style="display:none;margin-top:20px;gap:10px;flex-direction:column;align-items:center">
      <button class="btn btn-primary" id="reveal-collection" style="min-width:200px">
        Voir ma collection
      </button>
      <button class="btn btn-ghost" id="reveal-more" style="color:#fff;border-color:rgba(255,255,255,0.3);min-width:200px">
        Retour aux boosters
      </button>
    </div>
  `,document.body.appendChild(i);let n=!1;const s=document.getElementById("pack-visual");s.addEventListener("click",()=>{n||(n=!0,s.classList.add("shaking"),setTimeout(()=>{s.classList.remove("shaking"),s.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none";const r=document.getElementById("cards-phase");r.style.display="flex",r.innerHTML=t.map((l,c)=>`
          <div class="card-flip-wrapper" data-card-idx="${c}">
            <div class="card-flip-inner" id="card-flip-${c}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${Se(l)}</div>
            </div>
          </div>`).join(""),t.forEach((l,c)=>{setTimeout(()=>{var p;(p=document.getElementById(`card-flip-${c}`))==null||p.classList.add("revealed")},c*350+300)}),setTimeout(()=>{document.getElementById("reveal-btns").style.display="flex"},t.length*350+800),r.querySelectorAll(".card-flip-wrapper").forEach(l=>{l.addEventListener("click",()=>{var c;(c=document.getElementById(`card-flip-${l.dataset.cardIdx}`))==null||c.classList.add("revealed")})})},600)},500))}),(d=document.getElementById("reveal-collection"))==null||d.addEventListener("click",()=>{i.remove(),a("collection")}),(o=document.getElementById("reveal-more"))==null||o.addEventListener("click",()=>{i.remove(),a("boosters")})}function Se(t){var e,a;if(t.card_type==="player"&&t.player){const i=t.player,n=i.job||"ATT",s=Te[n]||"#1A6B3C",d=Le[i.rarity]||"#ccc",o=n==="GK"?i.note_g:n==="DEF"?i.note_d:n==="MIL"?i.note_m:i.note_a,r=Ie(i),l={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[i.country_code]||i.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${d};overflow:hidden;display:flex;flex-direction:column">
      <!-- Nom -->
      <div style="padding:6px 6px 2px;text-align:center;background:#f2e8d2">
        <div style="font-size:8px;letter-spacing:1px;color:#666;text-transform:uppercase">${i.firstname}</div>
        <div style="font-size:13px;font-weight:900;color:#111;line-height:1.1;font-family:Arial Black,Arial">${(i.surname_encoded||"").toUpperCase()}</div>
      </div>
      <!-- Étoile + bande poste -->
      <div style="position:relative;height:58px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div style="position:absolute;width:100%;height:12px;background:${s}"></div>
        <svg width="44" height="42" viewBox="0 0 52 50" style="position:relative;z-index:1">
          <polygon points="26,3 31.5,18 48,18 35,29 39.5,46 26,36 12.5,46 17,29 4,18 20.5,18" fill="${s}" stroke="#0004" stroke-width="2"/>
          <text x="26" y="32" text-anchor="middle" font-size="15" font-weight="900" fill="white" font-family="Arial Black,Arial">${o||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${r?`<img src="${r}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${i.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${l}</div>
        ${(e=i.clubs)!=null&&e.logo_url?`<img src="${i.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((a=i.clubs)==null?void 0:a.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const i=se[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${i.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${i.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function qe(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let a=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const i=setInterval(()=>{a--;const n=document.getElementById("ad-cd");n&&(n.textContent=a),a<=0&&(clearInterval(i),e.remove(),t(!0))},1e3)})}function X(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}const I={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}};async function ze(t,e){var C,T,L,K;const{state:a,navigate:i,toast:n}=e,s=a.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation du match...</div>';const d=s.matchMode||"vs_ai_easy",o=d.replace("vs_ai_",""),r=d,{data:l}=await f.from("decks").select("id,name,formation_card_id,cards:formation_card_id(formation)").eq("owner_id",a.profile.id).eq("is_active",!0).limit(1);if(!l||l.length===0){t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">📋</div>
        <p style="margin-bottom:16px">Tu n'as pas encore de deck actif.<br>Crée et active un deck pour jouer !</p>
        <button class="btn btn-primary" id="goto-decks-btn">Créer un deck</button>
      </div>
    </div>`,(C=document.getElementById("goto-decks-btn"))==null||C.addEventListener("click",()=>i("decks"));return}const c=l[0],{data:p}=await f.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name)))`).eq("deck_id",c.id).order("slot_order"),u=(p||[]).filter(_=>{var E;return _.is_starter&&((E=_.card)==null?void 0:E.player)}),v=(p||[]).filter(_=>{var E;return!_.is_starter&&((E=_.card)==null?void 0:E.player)});if(u.length<11){t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <p style="margin-bottom:16px">Ton deck doit contenir 11 titulaires.<br>Actuellement : ${u.length}/11</p>
        <button class="btn btn-primary" id="goto-decks-btn">Compléter mon deck</button>
      </div>
    </div>`,(T=document.getElementById("goto-decks-btn"))==null||T.addEventListener("click",()=>i("decks"));return}const{data:y}=await f.from("cards").select("id, gc_type").eq("owner_id",a.profile.id).eq("card_type","game_changer"),m=(p||[]).find(_=>{var E;return((E=_.card)==null?void 0:E.card_type)==="formation"}),g=((L=m==null?void 0:m.card)==null?void 0:L.formation)||((K=c.cards)==null?void 0:K.formation)||"4-4-2",h=Ge(u,g),b=await Re(g),{data:$}=await f.from("matches").insert({home_id:a.profile.id,away_id:null,mode:r,home_deck_id:c.id,status:"in_progress"}).select().single(),D={matchId:$==null?void 0:$.id,mode:r,difficulty:o,homeTeam:h,aiTeam:b,homeSubs:v.map(_=>re(_.card)),homeScore:0,aiScore:0,gcCards:y||[],usedGc:[],phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},maxSubs:3};He(t,D,e)}function re(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:e.note_g,note_d:e.note_d,note_m:e.note_m,note_a:e.note_a,rarity:e.rarity,used:!1}}function Ge(t,e){const a=t.map(i=>re(i.card));return Fe(a,e)}function Fe(t,e){const a=I[e]||I["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},n=[...t];for(const s of["GK","DEF","MIL","ATT"]){const d=a[s];for(let o=0;o<d;o++){let r=n.findIndex(l=>l.job===s);r===-1&&(r=n.findIndex(l=>l.job2===s)),r===-1&&(r=0),n[r]&&(i[s].push({...n[r],line:s}),n.splice(r,1))}}return i}async function Re(t,e){const{data:a}=await f.from("players").select("id, firstname, surname_encoded, country_code, club_id, job, job2, note_g, note_d, note_m, note_a, rarity").eq("is_active",!0).limit(60);if(!a||a.length<11)return Oe(t);const i=I[t]||I["4-4-2"],n={GK:[],DEF:[],MIL:[],ATT:[]},s=[...a];for(const d of["GK","DEF","MIL","ATT"]){const o=s.filter(c=>c.job===d),r=s.filter(c=>c.job!==d),l=[...o,...r];for(let c=0;c<i[d];c++){const p=l[c]||r[c]||s[c];p&&n[d].push({cardId:"ai-"+p.id+"-"+c,id:p.id,firstname:p.firstname,name:p.surname_encoded,country_code:p.country_code,club_id:p.club_id,job:p.job,job2:p.job2,note_g:p.note_g,note_d:p.note_d,note_m:p.note_m,note_a:p.note_a,rarity:p.rarity,line:d,used:!1})}}return n}function Oe(t){const e=I[t]||I["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},i=["ROBOT","CYBER","METAL","NEXUS","ALGO","PIXEL","CODEX","BYTE","LOGIC","TURBO","QUANTUM"];let n=0;for(const s of["GK","DEF","MIL","ATT"])for(let d=0;d<e[s];d++){const o=2+Math.floor(Math.random()*5);a[s].push({cardId:"fake-ai-"+n,id:"fake-"+n,firstname:"IA",name:i[n%i.length],country_code:"XX",club_id:null,job:s,job2:null,note_g:s==="GK"?o:1,note_d:s==="DEF"?o:1,note_m:s==="MIL"?o:1,note_a:s==="ATT"?o:1,rarity:"normal",line:s,used:!1}),n++}return a}function He(t,e,a){const i=e.homeTeam.MIL||[],n=e.aiTeam.MIL||[],s=W(i),d=W(n);e.attacker=s>=d?"home":"ai",e.log.push({text:`Duel du milieu : Vous ${s} - ${d} IA. ${e.attacker==="home"?"Vous attaquez":"L'IA attaque"} en premier.`,type:"info"}),e.phase=e.attacker==="home"?"attack":"ai-attack",k(t,e,a),e.attacker==="ai"&&setTimeout(()=>z(t,e,a),1200)}function k(t,e,a){var s,d;const i={attack:"⚔️ À vous d'attaquer",defense:"🛡️ À vous de défendre","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"};t.innerHTML=`
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

    <div class="match-phase">${i[e.phase]||e.phase}</div>

    <!-- Terrain joueur -->
    <div class="match-field" id="match-field"></div>

    <!-- Game Changers disponibles -->
    ${(e.phase==="attack"||e.phase==="defense")&&e.gcCards.length>0?`
    <div style="padding:8px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:6px">Game Changers (cliquer pour utiliser)</div>
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:4px">
        ${e.gcCards.filter(o=>!e.usedGc.includes(o.id)).map(o=>{var r;return`
          <div class="gc-mini" data-gc-id="${o.id}" data-gc-type="${o.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;min-width:90px;text-align:center">
            <div style="font-size:18px">${((r=q[o.gc_type])==null?void 0:r.icon)||"⚡"}</div>
            <div style="font-size:9px;color:#fff;font-weight:600">${o.gc_type}</div>
          </div>
        `}).join("")}
      </div>
    </div>`:""}

    <!-- Actions -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(o=>`<div class="log-entry ${o.type==="goal"?"log-goal":""}">${o.text}</div>`).join("")}
    </div>
  </div>
  `,(s=document.getElementById("match-quit"))==null||s.addEventListener("click",()=>{confirm("Quitter le match ? Il sera abandonné.")&&a.navigate("home")}),(d=document.getElementById("view-ai-team"))==null||d.addEventListener("click",()=>{Je(e,a)}),de(t,e,a),le(t,e,a),t.querySelectorAll(".gc-mini").forEach(o=>{o.addEventListener("click",()=>{We(o.dataset.gcId,o.dataset.gcType,t,e,a)})});const n=document.getElementById("match-log");n&&(n.scrollTop=n.scrollHeight)}function de(t,e,a){const i=document.getElementById("match-field");if(!i)return;const n=e.phase==="attack"||e.phase==="defense",s=e.phase==="attack"?["MIL","ATT"]:["GK","DEF","MIL"],d=["ATT","MIL","DEF","GK"];i.innerHTML=`<div class="match-grid">
    ${d.map(o=>{const r=e.homeTeam[o]||[];return r.length===0?"":`<div class="match-row">
        ${r.map((l,c)=>{const p=n&&s.includes(o)&&!l.used,u=e.selected.some(y=>y.cardId===l.cardId),v=w(l,e.phase==="attack"?"ATT":e.phase==="defense"?"DEF":o);return`<div class="match-slot ${p?"selectable":""} ${u?"selected":""} ${l.used?"used":""}"
            data-card-id="${l.cardId}" data-role="${o}" data-idx="${c}">
            <div class="slot-note">${v}</div>
            <div class="slot-name">${l.name}</div>
          </div>`}).join("")}
      </div>`}).join("")}
  </div>`,i.querySelectorAll(".match-slot.selectable").forEach(o=>{o.addEventListener("click",()=>{Pe(o,e,t,a)})})}function Pe(t,e,a,i){const n=t.dataset.cardId,s=t.dataset.role,d=parseInt(t.dataset.idx),o=e.selected.findIndex(r=>r.cardId===n);if(o!==-1)e.selected.splice(o,1);else{if(e.selected.length>=3){i.toast("Maximum 3 joueurs (GDD §5.1)","error");return}const r=(e.homeTeam[s]||[]).find(l=>l.cardId===n);r&&e.selected.push({...r,_role:s,_idx:d})}de(a,e,i),le(a,e,i)}function le(t,e,a){var n,s,d,o;const i=document.getElementById("match-actions");if(i)if(e.phase==="attack"){const r=O(e.selected,e.modifiers.home);i.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:8px">
        ${e.selected.length>0?`Attaque : <b style="color:var(--yellow);font-size:18px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base} + ${r.links} liens${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (milieux/attaquants)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${e.selected.length===0?"disabled":""}>
        Valider l'attaque →
      </button>
    `,(n=document.getElementById("confirm-attack"))==null||n.addEventListener("click",()=>{Ke(t,e,a)})}else if(e.phase==="defense"){const r=H(e.selected,e.modifiers.home);i.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:4px">
        <div style="font-size:12px;opacity:.7">L'IA attaque avec <b style="color:#ff6b6b">${((s=e.pendingAttack)==null?void 0:s.total)||0}</b></div>
        ${e.selected.length>0?`Défense : <b style="color:var(--yellow);font-size:18px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base} + ${r.links} liens)</span>`:'<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (gardien/défenseurs/milieux)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${e.selected.length===0?"disabled":""}>
        Valider la défense →
      </button>
    `,(d=document.getElementById("confirm-defense"))==null||d.addEventListener("click",()=>{Ne(t,e,a)})}else e.phase==="finished"?(i.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(o=document.getElementById("end-match"))==null||o.addEventListener("click",()=>{a.navigate("home")})):i.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,0.5);padding:8px">⏳ Tour de l'IA...</div>`}function Ke(t,e,a){const i=O(e.selected,e.modifiers.home);e.pendingAttack={...i,players:[...e.selected],side:"home"},e.selected.forEach(n=>{const s=(e.homeTeam[n._role]||[]).find(d=>d.cardId===n.cardId);s&&(s.used=!0)}),e.log.push({text:`Vous attaquez avec ${i.total} (${e.selected.map(n=>n.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",k(t,e,a),setTimeout(()=>Ue(t,e,a),1200)}function Ne(t,e,a){const i=H(e.selected,e.modifiers.home);e.selected.forEach(s=>{const d=(e.homeTeam[s._role]||[]).find(o=>o.cardId===s.cardId);d&&(d.used=!0)});const n=ie(e.pendingAttack.total,i.total,e.modifiers.home);n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT de l'IA ! (${e.pendingAttack.total} vs ${i.total})`,type:"goal"})):n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):e.log.push({text:`🧤 Défense réussie ! (${i.total} vs ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,ce(t,e,a,"home-attack")}function z(t,e,a){const i=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],n=ae(i,"attack",e.difficulty);if(n.length===0){Ve(t,e,a);return}const s=O(n,e.modifiers.ai);e.pendingAttack={...s,players:n,side:"ai"},n.forEach(d=>{d.used=!0}),e.log.push({text:`L'IA attaque avec ${s.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",k(t,e,a)}function Ue(t,e,a){const i=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],n=ae(i,"defense",e.difficulty),s=H(n,e.modifiers.ai);n.forEach(o=>{o.used=!0}),ie(e.pendingAttack.total,s.total,e.modifiers.ai).goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! Vous marquez ! (${e.pendingAttack.total} vs ${s.total})`,type:"goal"})):e.log.push({text:`🧤 L'IA défend (${s.total} vs ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,ce(t,e,a,"ai-attack")}function ce(t,e,a,i){if(e.round++,pe(e)){G(t,e,a);return}if(i==="home-attack"){if([...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(s=>!s.used).length===0){e.phase="ai-attack",k(t,e,a),setTimeout(()=>z(t,e,a),1e3);return}e.phase="attack",k(t,e,a)}else{if([...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(s=>!s.used).length===0){if([...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(d=>!d.used).length===0){G(t,e,a);return}e.phase="attack",k(t,e,a);return}e.phase="ai-attack",k(t,e,a),setTimeout(()=>z(t,e,a),1e3)}}function pe(t){const e=["MIL","ATT"].some(i=>(t.homeTeam[i]||[]).some(n=>!n.used)),a=["MIL","ATT"].some(i=>(t.aiTeam[i]||[]).some(n=>!n.used));return!e&&!a}function Ve(t,e,a){pe(e)?G(t,e,a):(e.phase="attack",k(t,e,a))}function We(t,e,a,i,n){if(!i.usedGc.includes(t)){switch(i.usedGc.push(t),e){case"Double attaque":i.modifiers.home.doubleAttack=!0,i.log.push({text:"⚡ Double attaque activée !",type:"info"});break;case"Bouclier":i.modifiers.home.shield=!0,i.log.push({text:"🛡️ Bouclier activé !",type:"info"});break;case"Ressusciter":let s=!1;for(const o of["ATT","MIL","DEF","GK"]){const r=(i.homeTeam[o]||[]).find(l=>l.used);if(r){r.used=!1,s=!0;break}}i.log.push({text:s?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break;case"Vol de note":i.modifiers.ai.stolenNote=(i.modifiers.ai.stolenNote||0)+1,i.log.push({text:"🎯 -1 à la prochaine action IA",type:"info"});break;case"Gel":const d=[...i.aiTeam.ATT||[],...i.aiTeam.MIL||[]].filter(o=>!o.used);if(d.length>0){const o=d.sort((r,l)=>w(l,"ATT")-w(r,"ATT"))[0];o.used=!0,i.log.push({text:`❄️ ${o.name} (IA) gelé !`,type:"info"})}break;case"Remplacement+":i.maxSubs++,i.log.push({text:"🔄 +1 remplacement disponible",type:"info"});break}f.from("cards").delete().eq("id",t).then(()=>{}),k(a,i,n)}}async function G(t,e,a){e.phase="finished";const{state:i}=a,n=e.homeScore>e.aiScore,s=e.homeScore===e.aiScore,d=n?"victoire":s?"nul":"defaite",o=ge(e.mode,d);e.log.push({text:n?`🏆 VICTOIRE ! +${o} crédits`:s?`🤝 Match nul. +${o} crédits`:`❌ Défaite. +${o} crédits`,type:"goal"}),e.matchId&&await f.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:n?i.profile.id:null,home_credits_reward:o,played_at:new Date().toISOString()}).eq("id",e.matchId);const r={credits:(i.profile.credits||0)+o,matches_played:(i.profile.matches_played||0)+1};n?r.wins=(i.profile.wins||0)+1:s?r.draws=(i.profile.draws||0)+1:r.losses=(i.profile.losses||0)+1,await f.from("users").update(r).eq("id",i.profile.id),await a.refreshProfile(),Ye(t,e,{isWin:n,isDraw:s,rewards:o},a)}function Ye(t,e,{isWin:a,isDraw:i,rewards:n},s){var d,o;t.innerHTML=`
  <div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff;max-width:400px">
      <div style="font-size:72px;margin-bottom:16px">${a?"🏆":i?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">
        ${a?"Victoire !":i?"Match nul":"Défaite"}
      </h2>
      <div style="font-size:42px;font-weight:900;margin:16px 0">${e.homeScore} - ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:13px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${n.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:24px">
        <button class="btn btn-ghost" id="result-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="result-replay" style="flex:1">Rejouer</button>
      </div>
    </div>
  </div>
  `,(d=document.getElementById("result-home"))==null||d.addEventListener("click",()=>s.navigate("home")),(o=document.getElementById("result-replay"))==null||o.addEventListener("click",()=>s.navigate("match",{matchMode:e.mode}))}function Je(t,e){const a=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div class="match-grid" style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${a.map(i=>{const n=t.aiTeam[i]||[];return n.length?`<div class="match-row" style="margin-bottom:6px">
          ${n.map(s=>{const d=w(s,i);return`<div class="match-slot ${s.used?"used":""}" style="cursor:default">
              <div class="slot-note">${d}</div>
              <div class="slot-name">${s.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>
    <p style="font-size:11px;color:var(--gray-600);margin-top:8px;text-align:center">Remplaçants non affichés (GDD §4)</p>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const Xe={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Qe(t,e){const{state:a,toast:i}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await P(t,e)}async function P(t,e){const{state:a,toast:i}=e,{data:n}=await f.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),s=(n||[]).filter(r=>r.seller_id===a.profile.id),d=(n||[]).filter(r=>r.seller_id!==a.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${d.length} carte(s) en vente · Solde : ${(a.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${s.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function o(r){const l=document.getElementById("mkt-content"),c=r==="buy"?d:s;if(c.length===0){l.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${r==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}l.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(p=>{var g,h,b;const u=(g=p.card)==null?void 0:g.player;if(!u)return"";const v=u.job==="GK"?u.note_g:u.job==="DEF"?u.note_d:u.job==="MIL"?u.note_m:u.note_a,y=Xe[u.rarity],m=(a.profile.credits||0)>=p.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${tt(u.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${y};flex-shrink:0">${v}</div>
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
    </div>`,l.querySelectorAll("[data-buy]").forEach(p=>{p.addEventListener("click",()=>Ze(p.dataset.buy,c,t,e))}),l.querySelectorAll("[data-cancel]").forEach(p=>{p.addEventListener("click",()=>et(p.dataset.cancel,t,e))})}o("buy"),t.querySelectorAll(".mkt-tab").forEach(r=>{r.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(l=>{const c=l===r;l.style.background=c?"var(--green)":"#fff",l.style.color=c?"#fff":"var(--gray-600)",l.style.borderColor=c?"var(--green)":"var(--gray-200)"}),o(r.dataset.tab)})})}async function Ze(t,e,a,i){const{state:n,toast:s,refreshProfile:d}=i,o=e.find(r=>r.id===t);if(o){if((n.profile.credits||0)<o.price){s("Crédits insuffisants","error");return}if(confirm(`Acheter ${o.card.player.firstname} ${o.card.player.surname_encoded} pour ${o.price.toLocaleString("fr")} crédits ?`))try{const{error:r}=await f.from("cards").update({owner_id:n.profile.id,is_for_sale:!1,sale_price:null}).eq("id",o.card.id);if(r)throw r;await f.from("market_listings").update({status:"sold",buyer_id:n.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await f.from("users").update({credits:(n.profile.credits||0)-o.price}).eq("id",n.profile.id);const{data:l}=await f.from("users").select("credits").eq("id",o.seller_id).single();l&&await f.from("users").update({credits:(l.credits||0)+o.price}).eq("id",o.seller_id),await f.from("notifications").insert({user_id:o.seller_id,type:"card_sold",message:`Ta carte ${o.card.player.surname_encoded} a été vendue pour ${o.price} crédits !`,data:{card_id:o.card.id,price:o.price}}),await d(),s("Carte achetée ! ✅","success"),P(a,i)}catch(r){s("Erreur : "+r.message,"error")}}}async function et(t,e,a){const{toast:i}=a,{data:n}=await f.from("market_listings").select("card_id").eq("id",t).single();await f.from("market_listings").update({status:"cancelled"}).eq("id",t),n&&await f.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",n.card_id),i("Annonce retirée","success"),P(e,a)}function tt(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function it(t,{state:e,navigate:a,toast:i}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await f.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${n&&n.length>0?n.map((s,d)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${s.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${d+1}</div>
            <div style="flex:1">
              <div style="font-weight:700">${s.pseudo}</div>
              <div style="font-size:11px;color:var(--gray-600)">${s.club_name}</div>
            </div>
            <div style="text-align:right;font-size:12px">
              <div>🥇${s.trophies_top1} 🥈${s.trophies_top2} 🥉${s.trophies_top3}</div>
              <div style="color:var(--gray-600)">${s.wins} V</div>
            </div>
          </div>
        `).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun manager.</div>'}
      </div>
    </div>
  </div>
  `}const x={user:null,profile:null,page:"home",params:{}};function A(t,e="info",a=3e3){const i=document.getElementById("toast");i&&(i.textContent=t,i.className=`show ${e}`,clearTimeout(i._t),i._t=setTimeout(()=>{i.className=""},a))}function at(t,e,a=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=a,document.getElementById("modal-overlay").classList.remove("hidden")}function F(){document.getElementById("modal-overlay").classList.add("hidden")}async function M(){if(!x.user)return;const{data:t}=await f.from("users").select("*").eq("id",x.user.id).single();t&&(x.profile=t)}function B(t,e={}){x.page=t,x.params=e,ue()}async function ue(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(i=>{i.classList.toggle("active",i.dataset.page===x.page)});const e=document.getElementById("nav-credits");e&&x.profile&&(e.textContent=`💰 ${(x.profile.credits||0).toLocaleString("fr")}`);const a={state:x,navigate:B,toast:A,openModal:at,closeModal:F,refreshProfile:M};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',x.page){case"home":await V(t,a);break;case"collection":await xe(t,a);break;case"decks":await ke(t,a);break;case"boosters":await Ae(t,a);break;case"match":await ze(t,a);break;case"market":await Qe(t,a);break;case"rankings":await it(t,a);break;default:await V(t,a)}}function nt(){const t=document.getElementById("app"),e=x.profile,a=(e.club_name||"MW").split(" ").filter(Boolean);a.length>=2?(a[0][0]+a[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(i=>{i.addEventListener("click",n=>{n.preventDefault(),B(i.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>B("home")),document.getElementById("nav-credits").addEventListener("click",()=>B("boosters"))}async function ot(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&F()}),document.getElementById("modal-close").addEventListener("click",F);const{data:{session:t}}=await f.auth.getSession();if(!t){ee(),N(document.getElementById("app"),{navigate:Q,toast:A});return}if(x.user=t.user,await M(),ee(),!x.profile){me(document.getElementById("app"),{state:x,navigate:st,toast:A,refreshProfile:M});return}x.profile.first_booster_opened||(await rt(x.user.id),await M()),fe(),f.auth.onAuthStateChange(async(e,a)=>{e==="SIGNED_OUT"&&(x.user=null,x.profile=null,document.getElementById("app").innerHTML="",N(document.getElementById("app"),{navigate:Q,toast:A}))})}function fe(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",nt(),ue()}function Q(){window.location.reload()}async function st(){await M(),fe()}async function rt(t){const{data:e}=await f.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:a}=await f.from("players").select("id,job").eq("is_active",!0);if(!a||a.length===0)return;const i=a.filter(o=>o.job==="GK"),n=a.filter(o=>o.job!=="GK"),s=[];for(let o=0;o<5;o++){let r=[];o===0&&i.length>0?(r.push(i[Math.floor(Math.random()*i.length)]),r.push(...Z([...n]).slice(0,3))):r=Z([...a]).slice(0,4),r.forEach(l=>s.push({owner_id:t,player_id:l.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(o=>{s.push({owner_id:t,card_type:"game_changer",gc_type:o})});const d=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];s.push({owner_id:t,card_type:"formation",formation:d[Math.floor(Math.random()*d.length)]}),await f.from("cards").insert(s),await f.from("users").update({first_booster_opened:!0}).eq("id",t),A("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function Z(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}function ee(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}ot();
