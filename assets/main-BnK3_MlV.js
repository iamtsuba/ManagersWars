import{s as f,r as oe}from"./card-CoW7FVRn.js";function V(t,{navigate:e,toast:a}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(i=>{i.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(o=>o.classList.remove("active")),i.classList.add("active"),document.getElementById("tab-login").style.display=i.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=i.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const i=document.getElementById("login-email").value.trim(),o=document.getElementById("login-password").value,s=document.getElementById("login-error");if(s.textContent="",!i||!o){s.textContent="Remplissez tous les champs.";return}const n=document.getElementById("login-btn");n.textContent="Connexion…",n.disabled=!0;const{error:r}=await f.auth.signInWithPassword({email:i,password:o});if(n.textContent="Se connecter",n.disabled=!1,r){s.textContent=r.message.includes("Invalid")?"Email ou mot de passe incorrect.":r.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",i=>{i.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const i=document.getElementById("reg-email").value.trim(),o=document.getElementById("reg-password").value,s=document.getElementById("reg-confirm").value,n=document.getElementById("reg-error");if(n.textContent="",!i||!o||!s){n.textContent="Remplissez tous les champs.";return}if(o.length<6){n.textContent="Mot de passe trop court (min. 6 caractères).";return}if(o!==s){n.textContent="Les mots de passe ne correspondent pas.";return}const r=document.getElementById("reg-btn");r.textContent="Création…",r.disabled=!0;const{error:d}=await f.auth.signUp({email:i,password:o});if(r.textContent="Créer mon compte",r.disabled=!1,d){n.textContent=d.message;return}a("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=i})}function ye(t,{state:e,navigate:a,toast:i,refreshProfile:o}){let s="#1A6B3C",n="#D4A017";t.innerHTML=`
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

        <div class="club-logo-preview" id="logo-preview" style="background:${n};border-color:${s}">
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
            <div class="color-swatch" id="swatch2" style="background:${n};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur de l'intérieur</label>
              <input type="color" id="color2" value="${n}" style="width:100%;height:36px;padding:2px;border-radius:6px">
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
  `;function r(){var h;const l=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),u=((h=document.getElementById("setup-club"))==null?void 0:h.value)||"MW",p=u.trim().split(" ").filter(Boolean),m=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():u.slice(0,2).toUpperCase();l&&(l.style.background=n,l.style.borderColor=s),c&&(c.textContent=m,c.style.color=s)}document.getElementById("color1").addEventListener("input",l=>{s=l.target.value,document.getElementById("swatch1").style.background=s,r()}),document.getElementById("color2").addEventListener("input",l=>{n=l.target.value,document.getElementById("swatch2").style.background=n,r()});function d(l){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${l}`).classList.add("active"),document.getElementById("step-num").textContent=l,document.getElementById("progress-fill").style.width=`${Math.round(l/3*100)}%`,l===3&&r()}document.getElementById("step1-next").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",l.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:u}=await f.from("users").select("id").eq("pseudo",l).maybeSingle();if(u){c.textContent="Ce pseudo est déjà pris.";return}d(2)}),document.getElementById("step2-back").addEventListener("click",()=>d(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const l=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",l.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:u}=await f.from("users").select("id").eq("club_name",l).maybeSingle();if(u){c.textContent="Ce nom de club est déjà pris.";return}d(3)}),document.getElementById("step3-back").addEventListener("click",()=>d(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),u=document.getElementById("step3-error"),p=document.getElementById("step3-finish");u.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:m}=await f.from("users").insert({id:e.user.id,pseudo:l,club_name:c,club_color1:s,club_color2:n,credits:1e4});if(m)throw m;await he(e.user.id),await o(),i(`Bienvenue ${l} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(m){u.textContent=m.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function he(t){const{data:e}=await f.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const a=e,i=a.filter(d=>d.job==="GK"),o=a.filter(d=>d.job!=="GK"),s=[];for(let d=0;d<5;d++){let l=[];if(d===0&&i.length>0){const c=i[Math.floor(Math.random()*i.length)];l.push(c);const u=W([...o]).slice(0,3);l.push(...u)}else l=W([...a]).slice(0,4);l.forEach(c=>{s.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(d=>{s.push({owner_id:t,card_type:"game_changer",gc_type:d})});const r=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];s.push({owner_id:t,card_type:"formation",formation:r[Math.floor(Math.random()*r.length)]}),s.length>0&&await f.from("cards").insert(s),await f.from("users").update({first_booster_opened:!0}).eq("id",t)}function W(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}async function Y(t,{state:e,navigate:a,toast:i}){const o=e.profile;if(!o)return;const{data:s}=await f.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${o.id},away_id.eq.${o.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),n=(o.club_name||"MW").split(" ").filter(Boolean),r=n.length>=2?(n[0][0]+n[1][0]).toUpperCase():(o.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
  <div class="page">
    <div class="page-body">

      <!-- Hero profil -->
      <div class="hero">
        <div class="info">
          <h3>${o.pseudo}</h3>
          <div class="level">Niveau ${o.level} · ${o.club_name}</div>
          <div class="stats">
            <div class="stat"><span class="val">${o.wins}</span><span class="lbl">V</span></div>
            <div class="stat"><span class="val">${o.trophies_top1}</span><span class="lbl">TOP1</span></div>
            <div class="stat"><span class="val">${(o.credits||0).toLocaleString("fr")}</span><span class="lbl">Crédits</span></div>
          </div>
        </div>
        <div class="logo-big" style="background:${o.club_color2};border-color:${o.club_color1}">
          <span style="color:${o.club_color1}">${r}</span>
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
          ${s.map(d=>{const l=d.winner_id===o.id,c=d.home_score===d.away_score,u=c?"N":l?"V":"D",p=c?"#888":l?"#1A6B3C":"#c0392b",m={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[d.mode]||d.mode,v=new Date(d.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${m}</div>
                <div style="font-size:11px;color:var(--gray-600)">${v}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${d.home_score} - ${d.away_score}</span>
                <span style="background:${p};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${u}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(d=>{d.addEventListener("click",l=>{l.preventDefault(),a(d.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.action;if(l==="championship"){i("Championnats — bientôt disponibles","info");return}if(l==="match-random"){i("Matchmaking aléatoire — bientôt disponible","info");return}if(l==="match-friend"){i("Défi ami — bientôt disponible","info");return}l==="match-ai"&&be(a)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await f.auth.signOut(),window.location.reload()})}function be(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],a=document.createElement("div");a.className="modal-overlay",a.style.zIndex="2000",a.innerHTML=`
    <div class="modal" style="max-width:380px">
      <div class="modal-header"><h2>Choisir la difficulté</h2><button class="btn-icon" id="diff-cancel">✕</button></div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${e.map(o=>`
            <div class="action-card" data-mode="${o.mode}" style="cursor:pointer">
              <div class="icon">${o.icon}</div>
              <div class="label">${o.label}</div>
              <div class="sub">${o.sub}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  `,document.body.appendChild(a);const i=()=>a.remove();document.getElementById("diff-cancel").addEventListener("click",i),a.addEventListener("click",o=>{o.target===a&&i()}),a.querySelectorAll("[data-mode]").forEach(o=>{o.addEventListener("click",()=>{i(),t("match",{matchMode:o.dataset.mode})})})}const z={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque 1 joueur adverse ce match."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function w(t,e){if(!t)return 0;switch(e){case"GK":return t.note_g||0;case"DEF":return t.note_d||0;case"MIL":return t.note_m||0;case"ATT":return t.note_a||0;default:return 0}}function O(t){let e=0;for(let a=0;a<t.length-1;a++){const i=t[a],o=t[a+1];!i||!o||(i.country_code&&o.country_code&&i.country_code===o.country_code&&(e+=1),i.club_id&&o.club_id&&i.club_id===o.club_id&&(e+=1))}return e}function P(t,e={}){let a=t.reduce((s,n)=>s+w(n,"ATT"),0);const i=O(t);let o=a+i;return e.doubleAttack&&(o*=2),e.stolenNote&&(o-=e.stolenNote),{base:a,links:i,total:Math.max(0,o)}}function H(t,e={}){let a=t.reduce((s,n)=>s+w(n,"DEF"),0);const i=O(t);let o=a+i;return e.stolenNote&&(o-=e.stolenNote),{base:a,links:i,total:Math.max(0,o)}}function J(t){const e=t.reduce((i,o)=>i+w(o,"MIL"),0),a=O(t);return e+a}function ne(t,e,a={}){return a.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function se(t,e,a="easy"){const i=e==="attack"?"ATT":"DEF",o=t.filter(r=>!r.used);if(o.length===0)return[];const s=[...o].sort((r,d)=>w(d,i)-w(r,i));let n;return a==="easy"?n=1+Math.floor(Math.random()*2):a==="medium"?n=2+Math.floor(Math.random()*2):n=3,n=Math.min(n,s.length,3),s.slice(0,n)}function xe(t,e){const a={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(a[t]||a.vs_ai_easy)[e]||0}const _e={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},ke=["Tous","GK","DEF","MIL","ATT"];async function we(t,e){const{state:a,navigate:i,toast:o,openModal:s,closeModal:n}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:r}=await f.from("cards").select("id,card_type,current_note,gc_type,formation,is_for_sale,sale_price,player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url))").eq("owner_id",a.profile.id).order("acquired_at",{ascending:!1});let d="Tous",l="";const c=(r||[]).filter(v=>v.card_type==="player"),u=(r||[]).filter(v=>v.card_type==="game_changer"),p=(r||[]).filter(v=>v.card_type==="formation");function m(){return c.filter(v=>{const y=v.player;if(!y)return!1;const g=d==="Tous"||y.job===d,b=!l||`${y.firstname} ${y.surname_encoded}`.toLowerCase().includes(l);return g&&b})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${c.length} joueur(s) · ${u.length} Game Changer · ${p.length} Formation</p>
    </div>

    ${u.length>0||p.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div class="section-title" style="margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
        ${u.map(v=>{var y,g;return`
          <div class="gc-card" style="min-width:130px;flex-shrink:0">
            <div class="gc-icon">${((y=z[v.gc_type])==null?void 0:y.icon)||"⚡"}</div>
            <div class="gc-badge">Game Changer</div>
            <div class="gc-name">${v.gc_type}</div>
            <div class="gc-desc">${((g=z[v.gc_type])==null?void 0:g.desc)||""}</div>
          </div>`}).join("")}
        ${p.map(v=>`
          <div style="background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:var(--radius-lg);border:2px solid #2a8f52;padding:12px;color:#fff;min-width:110px;flex-shrink:0">
            <div style="font-size:24px">🏟️</div>
            <div style="font-size:9px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content">FORMATION</div>
            <div style="font-weight:700;font-size:16px;margin-top:4px">${v.formation}</div>
          </div>`).join("")}
      </div>
    </div>`:""}

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${ke.map(v=>`
          <button class="filter-btn" data-job="${v}" style="flex-shrink:0;padding:4px 12px;border-radius:20px;border:1.5px solid ${v===d?"var(--green)":"var(--gray-200)"};background:${v===d?"var(--green)":"#fff"};color:${v===d?"#fff":"var(--gray-600)"};font-size:12px;font-weight:600;cursor:pointer">${v}</button>`).join("")}
      </div>
    </div>

    <div class="page-body">
      <div class="cards-grid" id="col-grid"></div>
    </div>
  </div>
  `;function h(){const v=m(),y=document.getElementById("col-grid");if(y){if(v.length===0){y.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte trouvée.<br><small>Ouvre des boosters pour en obtenir !</small></div>';return}y.innerHTML=v.map(g=>{var A,M;const b=g.player,E={...b,current_note:g.current_note,club_encoded_name:(A=b.clubs)==null?void 0:A.encoded_name},q=b.skin&&b.hair?re(b):null,B=((M=b.clubs)==null?void 0:M.logo_url)||null;return`<div class="card-item" data-card-id="${g.id}">
        ${oe(E,{portraitUrl:q,clubLogoUrl:B,showNotes:!1})}
        ${g.is_for_sale?'<div class="card-owned-badge" style="background:#D4A017">En vente</div>':""}
      </div>`}).join(""),y.querySelectorAll(".card-item").forEach(g=>{g.addEventListener("click",()=>{const b=c.find(E=>E.id===g.dataset.cardId);b&&$e(b,t,e)})})}}h(),t.querySelectorAll(".filter-btn").forEach(v=>{v.addEventListener("click",()=>{d=v.dataset.job,t.querySelectorAll(".filter-btn").forEach(y=>{const g=y.dataset.job===d;y.style.background=g?"var(--green)":"#fff",y.style.color=g?"#fff":"var(--gray-600)",y.style.borderColor=g?"var(--green)":"var(--gray-200)"}),h()})}),document.getElementById("col-search").addEventListener("input",v=>{l=v.target.value.toLowerCase(),h()})}function re(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co",a=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${a}.jpg`}function $e(t,e,a){var p,m,h,v,y;const{state:i,toast:o,openModal:s,closeModal:n}=a,r=t.player,d={...r,club_encoded_name:(p=r.clubs)==null?void 0:p.encoded_name},l=re(r),c=((m=r.clubs)==null?void 0:m.logo_url)||null,u=r.rarity!=="legende"&&!(r.rarity==="papyte"&&r.note_min!==null&&(t.current_note??99)<=r.note_min);s(`${r.firstname} ${r.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
      <div>${oe(d,{portraitUrl:l,clubLogoUrl:c,showNotes:!0})}</div>
      <div style="flex:1;min-width:160px">
        <div style="font-size:12px;color:var(--gray-600)">RARETÉ</div>
        <div style="font-weight:700;margin-bottom:8px;color:${_e[r.rarity]}">${r.rarity.toUpperCase()}</div>
        <div style="font-size:12px;color:var(--gray-600)">POSTE</div>
        <div style="font-weight:700;margin-bottom:8px">${r.job}${r.job2?" / "+r.job2:""}</div>
        <div style="font-size:12px;color:var(--gray-600)">PRIX DE BASE</div>
        <div style="font-weight:700">${(r.sell_price||0).toLocaleString("fr")} cr.</div>
        ${t.is_for_sale?`<div style="color:#D4A017;font-weight:700;margin-top:8px">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>`:""}
      </div>
    </div>
    ${u?"":`<div style="margin-top:12px;font-size:12px;color:var(--gray-600);text-align:center;padding:8px;background:#f5f5f5;border-radius:8px">${r.rarity==="legende"?"🔒 Les cartes Légende ne sont pas revendables (GDD §3.4)":"🔒 Carte Papyte à note minimale : non vendable"}</div>`}
    ${u&&!t.is_for_sale?`
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:12px">
      <label style="font-size:12px;font-weight:600;margin-bottom:6px;display:block">Mettre en vente sur le marché</label>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${r.sell_price||1e3}">
        <button class="btn btn-yellow" id="sell-btn">Vendre</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?'<div style="margin-top:12px"><button class="btn btn-ghost" id="cancel-sell-btn" style="width:100%">Retirer de la vente</button></div>':""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(h=document.getElementById("close-detail"))==null||h.addEventListener("click",n),(v=document.getElementById("sell-btn"))==null||v.addEventListener("click",async()=>{const g=parseInt(document.getElementById("sell-price").value);if(!g||g<1){o("Prix invalide","error");return}const{error:b}=await f.from("cards").update({is_for_sale:!0,sale_price:g}).eq("id",t.id);if(b){o(b.message,"error");return}await f.from("market_listings").insert({seller_id:i.profile.id,card_id:t.id,price:g}),o("Carte mise en vente ! ✅","success"),n(),a.navigate("collection")}),(y=document.getElementById("cancel-sell-btn"))==null||y.addEventListener("click",async()=>{await f.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await f.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),o("Annonce retirée","success"),n(),a.navigate("collection")})}const D={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},I={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function K(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const a=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${a}.jpg`}async function de(t,e){const{state:a,navigate:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await f.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",a.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(s==null?void 0:s.length)||0} deck(s) · 11 titulaires + 5 remplaçants max</p>
    </div>
    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${(s==null?void 0:s.length)>0?s.map(n=>`
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${n.name}
                ${n.is_active?'<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>':""}
              </div>
            </div>
            <div style="display:flex;gap:6px">
              ${n.is_active?"":`<button class="btn btn-ghost btn-sm" data-activate="${n.id}">Activer</button>`}
              <button class="btn btn-primary btn-sm" data-edit="${n.id}">✏️ Éditer</button>
            </div>
          </div>`).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const n=prompt("Nom du deck :",`Deck ${((s==null?void 0:s.length)||0)+1}`);if(!n)return;const{data:r,error:d}=await f.from("decks").insert({owner_id:a.profile.id,name:n,is_active:!(s!=null&&s.length)}).select().single();if(d){o(d.message,"error");return}o("Deck créé !","success"),X(r.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(n=>{n.addEventListener("click",()=>X(n.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(n=>{n.addEventListener("click",async()=>{await f.from("decks").update({is_active:!1}).eq("owner_id",a.profile.id),await f.from("decks").update({is_active:!0}).eq("id",n.dataset.activate),o("Deck activé !","success"),de(t,e)})})}async function X(t,e,a){const{state:i,toast:o}=a;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await f.from("decks").select("*").eq("id",t).single(),{data:n}=await f.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),r=(n||[]).filter(m=>m.card_type==="player"&&m.player),d=(n||[]).filter(m=>m.card_type==="formation"),l=d.map(m=>m.formation).filter(Boolean),{data:c}=await f.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let u=s.formation||"4-4-2";l.length>0&&!l.includes(u)&&(u=l[0]);const p={deckId:t,name:s.name,formation:u,formationCardId:s.formation_card_id,slots:{},subs:[],playerCards:r,formationCards:d,availableFormations:l};(c||[]).forEach(m=>{m.is_starter?p.slots[m.position]=m.card_id:p.subs.includes(m.card_id)||p.subs.push(m.card_id)}),L(e,p,a)}function L(t,e,a){var d;const{navigate:i}=a;D[e.formation];const o=Q(e.formation),s=o.filter(l=>e.slots[l]).length,n=e.availableFormations.length>0?e.availableFormations:Object.keys(D),r=e.subs.map(l=>e.playerCards.find(c=>c.id===l)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${e.name}</h2>
        <p>${s}/11 titulaires · ${e.subs.length}/5 remplaçants</p>
      </div>
    </div>

    <!-- Formation (uniquement les cartes possédées) -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200)">
      <label style="font-size:11px;margin-bottom:4px;display:block">Formation ${e.availableFormations.length===0?"(aucune carte — toutes disponibles)":""}</label>
      <select id="formation-select" style="width:100%;padding:7px;border-radius:6px;border:1.5px solid var(--gray-200)">
        ${n.map(l=>`<option value="${l}" ${l===e.formation?"selected":""}>${l}</option>`).join("")}
      </select>
    </div>

    <!-- Terrain -->
    <div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);padding:16px;min-height:280px">
      <div id="deck-field"></div>
    </div>

    <!-- Remplaçants (Petit 4) -->
    <div style="padding:12px 16px;background:#fff;border-top:1px solid var(--gray-200)">
      <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--gray-600)">REMPLAÇANTS (${e.subs.length}/5)</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="subs-list">
        ${r.map(l=>{const c=l.player;return`<div style="display:flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px">
            <span style="background:${I[c.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${c.job}</span>
            ${c.firstname} ${c.surname_encoded}
            <button style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:14px" data-remove-sub="${l.id}">✕</button>
          </div>`}).join("")}
        ${e.subs.length<5?'<button class="btn btn-ghost btn-sm" id="add-sub-btn">+ Remplaçant</button>':""}
      </div>
    </div>

    <!-- Sauvegarder -->
    <div class="page-body">
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${s<11?"disabled":""}>
        ${s<11?`Placez encore ${11-s} joueur(s)`:"💾 Enregistrer le deck"}
      </button>
    </div>
  </div>`,Ee(t,e,o,a),document.getElementById("builder-back").addEventListener("click",()=>i("decks")),document.getElementById("formation-select").addEventListener("change",l=>{e.formation=l.target.value;const c=Q(e.formation),u={};c.forEach(p=>{e.slots[p]&&(u[p]=e.slots[p])}),e.slots=u,L(t,e,a)}),document.getElementById("save-deck").addEventListener("click",()=>Te(e,a)),t.querySelectorAll("[data-remove-sub]").forEach(l=>{l.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==l.dataset.removeSub),L(t,e,a)})}),(d=document.getElementById("add-sub-btn"))==null||d.addEventListener("click",()=>{Le(e,t,a)})}function Ee(t,e,a,i){const o=document.getElementById("deck-field");if(!o)return;const s=[a.filter(n=>n.startsWith("ATT")),a.filter(n=>n.startsWith("MIL")),a.filter(n=>n.startsWith("DEF")),a.filter(n=>n.startsWith("GK"))];o.innerHTML=s.map(n=>`
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:10px">
      ${n.map(r=>{const d=e.slots[r],l=d?e.playerCards.find(p=>p.id===d):null,c=r.replace(/\d+/,""),u=I[c];if(l){const p=l.player,m=c==="GK"?p.note_g:c==="DEF"?p.note_d:c==="MIL"?p.note_m:p.note_a,h=K(p);return`<div class="formation-slot filled" data-pos="${r}"
            style="border-color:${u};background:${u};cursor:pointer;position:relative;width:60px;height:60px">
            ${h?`<img src="${h}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.7">`:""}
            <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008">${m}</div>
            <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.surname_encoded}</div>
          </div>`}return`<div class="formation-slot" data-pos="${r}"
          style="border-color:rgba(255,255,255,0.4);cursor:pointer;width:60px;height:60px">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${c}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>
        </div>`}).join("")}
    </div>`).join(""),o.querySelectorAll(".formation-slot").forEach(n=>{n.addEventListener("click",()=>Ie(n.dataset.pos,e,t,i))})}function Ie(t,e,a,i){var c,u;const{openModal:o,closeModal:s}=i,n=t.replace(/\d+/,""),r=Object.entries(e.slots).filter(([p,m])=>p!==t&&m).map(([,p])=>p),d=e.subs,l=e.playerCards.filter(p=>{const m=p.player;return(m.job===n||m.job2===n)&&!r.includes(p.id)&&!d.includes(p.id)});l.sort((p,m)=>{const h=n==="GK"?p.player.note_g:n==="DEF"?p.player.note_d:n==="MIL"?p.player.note_m:p.player.note_a;return(n==="GK"?m.player.note_g:n==="DEF"?m.player.note_d:n==="MIL"?m.player.note_m:m.player.note_a)-h}),o(`Choisir ${n} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${l.length>0?l.map(p=>{var g,b;const m=p.player,h=n==="GK"?m.note_g:n==="DEF"?m.note_d:n==="MIL"?m.note_m:m.note_a,v=K(m),y={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[m.rarity];return`<div class="player-option" data-card-id="${p.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${I[n]}">
            ${v?`<img src="${v}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${I[n]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${n}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${m.firstname} ${m.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${m.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${m.country_code}">
              ${(g=m.clubs)!=null&&g.logo_url?`<img src="${m.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((b=m.clubs)==null?void 0:b.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${m.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${I[n]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${y};flex-shrink:0">
            ${h}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(c=document.getElementById("close-selector"))==null||c.addEventListener("click",s),(u=document.getElementById("remove-player"))==null||u.addEventListener("click",()=>{delete e.slots[t],s(),L(a,e,i)}),document.querySelectorAll(".player-option").forEach(p=>{p.addEventListener("click",()=>{e.slots[t]=p.dataset.cardId,s(),L(a,e,i)})})}function Le(t,e,a){var r;const{openModal:i,closeModal:o}=a,s=[...Object.values(t.slots).filter(Boolean),...t.subs],n=t.playerCards.filter(d=>!s.includes(d.id));i("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${n.length>0?n.map(d=>{var p;const l=d.player,c=K(l),u=l.job==="GK"?l.note_g:l.job==="DEF"?l.note_d:l.job==="MIL"?l.note_m:l.note_a;return`<div class="player-option" data-card-id="${d.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${I[l.job]}">
            ${c?`<img src="${c}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${l.firstname} ${l.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${l.job} · ${l.country_code} · ${((p=l.clubs)==null?void 0:p.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${I[l.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${u}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(r=document.getElementById("close-sub-selector"))==null||r.addEventListener("click",o),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),o(),L(e,t,a)})})}async function Te(t,e){const{state:a,toast:i,navigate:o}=e,s=t.formationCards.find(d=>d.formation===t.formation),n=(s==null?void 0:s.id)||t.formationCardId;await f.from("decks").update({formation:t.formation,formation_card_id:n||null}).eq("id",t.deckId),await f.from("deck_cards").delete().eq("deck_id",t.deckId);const r=[];if(Object.entries(t.slots).forEach(([d,l],c)=>{r.push({deck_id:t.deckId,card_id:l,position:d,is_starter:!0,slot_order:c})}),t.subs.forEach((d,l)=>{r.push({deck_id:t.deckId,card_id:d,position:`SUB${l+1}`,is_starter:!1,slot_order:100+l})}),r.length>0){const{error:d}=await f.from("deck_cards").insert(r);if(d){i(d.message,"error");return}}i("Deck enregistré ✅","success"),o("decks")}function Q(t){const e=D[t]||D["4-4-2"],a=["GK1"];for(let i=1;i<=e.DEF;i++)a.push(`DEF${i}`);for(let i=1;i<=e.MIL;i++)a.push(`MIL${i}`);for(let i=1;i<=e.ATT;i++)a.push(`ATT${i}`);return a}const Z=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],le={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Ae(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const a=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${a}.jpg`}const Me={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Ce={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function je(t,{state:e,navigate:a,toast:i}){var s;const o=((s=e.profile)==null?void 0:s.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${o.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${Z.map(n=>{const r=o>=n.cost||n.cost===0;return`<div class="booster-card ${r?"":"disabled"}" data-booster="${n.id}">
            <div class="icon">${n.icon}</div>
            <div class="name">${n.name}</div>
            <div class="desc">${n.sub}</div>
            <div class="cost">${n.costLabel}</div>
            ${r?"":'<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>'}
          </div>`}).join("")}
      </div>
      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:8px">
        <b>📌 Rappels</b><br>
        • 1er booster Players contient toujours un Gardien.<br>
        • Game Helper : carte éphémère disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(n=>{n.addEventListener("click",async()=>{const r=Z.find(d=>d.id===n.dataset.booster);if(r){n.style.opacity="0.5",n.style.pointerEvents="none";try{await Be(r,{state:e,toast:i,navigate:a,container:t})}catch(d){i(d.message,"error"),n.style.opacity="",n.style.pointerEvents=""}}})})}async function Be(t,{state:e,toast:a,navigate:i,container:o}){if(t.cost>0&&e.profile.credits<t.cost){a("Crédits insuffisants","error");return}t.id==="players_pub"&&await Fe();let s=[];t.type==="player"?s=await Se(e.profile,t.cardCount,t.cost):t.type==="game_changer"?s=await De(e.profile,t.cardCount,t.cost):t.type==="formation"&&(s=await qe(e.profile,t.cost));const{data:n}=await f.from("users").select("*").eq("id",e.profile.id).single();n&&(e.profile=n),ze(s,t,i)}async function Se(t,e,a){if(a>0){const{error:d}=await f.from("users").update({credits:t.credits-a}).eq("id",t.id);if(d)throw d}const{data:i}=await f.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(i!=null&&i.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const o=i.filter(d=>d.job==="GK"),s=i.filter(d=>d.job!=="GK");let n=[];!t.first_booster_opened&&o.length>0?(n.push(o[Math.floor(Math.random()*o.length)]),n.push(...ee([...s]).slice(0,e-1)),await f.from("users").update({first_booster_opened:!0}).eq("id",t.id)):n=ee([...i]).slice(0,e);const{data:r}=await f.from("cards").insert(n.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return n.map((d,l)=>({...r[l],player:d}))}async function De(t,e,a){const{error:i}=await f.from("users").update({credits:t.credits-a}).eq("id",t.id);if(i)throw i;const o=Object.keys(le),s=Array.from({length:e},()=>o[Math.floor(Math.random()*o.length)]),{data:n}=await f.from("cards").insert(s.map(r=>({owner_id:t.id,card_type:"game_changer",gc_type:r}))).select();return n}async function qe(t,e){const{error:a}=await f.from("users").update({credits:t.credits-e}).eq("id",t.id);if(a)throw a;const i=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],o=i[Math.floor(Math.random()*i.length)],{data:s}=await f.from("cards").insert({owner_id:t.id,card_type:"formation",formation:o}).select();return s}function ze(t,e,a){var n,r;const i=document.createElement("div");i.id="booster-anim-overlay",i.innerHTML=`
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
  `,document.body.appendChild(i);let o=!1;const s=document.getElementById("pack-visual");s.addEventListener("click",()=>{o||(o=!0,s.classList.add("shaking"),setTimeout(()=>{s.classList.remove("shaking"),s.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none";const d=document.getElementById("cards-phase");d.style.display="flex",d.innerHTML=t.map((l,c)=>`
          <div class="card-flip-wrapper" data-card-idx="${c}">
            <div class="card-flip-inner" id="card-flip-${c}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${Ge(l)}</div>
            </div>
          </div>`).join(""),t.forEach((l,c)=>{setTimeout(()=>{var u;(u=document.getElementById(`card-flip-${c}`))==null||u.classList.add("revealed")},c*350+300)}),setTimeout(()=>{document.getElementById("reveal-btns").style.display="flex"},t.length*350+800),d.querySelectorAll(".card-flip-wrapper").forEach(l=>{l.addEventListener("click",()=>{var c;(c=document.getElementById(`card-flip-${l.dataset.cardIdx}`))==null||c.classList.add("revealed")})})},600)},500))}),(n=document.getElementById("reveal-collection"))==null||n.addEventListener("click",()=>{i.remove(),a("collection")}),(r=document.getElementById("reveal-more"))==null||r.addEventListener("click",()=>{i.remove(),a("boosters")})}function Ge(t){var e,a;if(t.card_type==="player"&&t.player){const i=t.player,o=i.job||"ATT",s=Me[o]||"#1A6B3C",n=Ce[i.rarity]||"#ccc",r=o==="GK"?i.note_g:o==="DEF"?i.note_d:o==="MIL"?i.note_m:i.note_a,d=Ae(i),l={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[i.country_code]||i.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${n};overflow:hidden;display:flex;flex-direction:column">
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
          <text x="26" y="32" text-anchor="middle" font-size="15" font-weight="900" fill="white" font-family="Arial Black,Arial">${r||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${d?`<img src="${d}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${i.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${l}</div>
        ${(e=i.clubs)!=null&&e.logo_url?`<img src="${i.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((a=i.clubs)==null?void 0:a.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const i=le[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${i.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${i.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function Fe(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let a=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const i=setInterval(()=>{a--;const o=document.getElementById("ad-cd");o&&(o.textContent=a),a<=0&&(clearInterval(i),e.remove(),t(!0))},1e3)})}function ee(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}const T={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}};async function Re(t,e){var B,A,M,U;const{state:a,navigate:i,toast:o}=e,s=a.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation du match...</div>';const n=s.matchMode||"vs_ai_easy",r=n.replace("vs_ai_",""),d=n,{data:l}=await f.from("decks").select("id,name,formation_card_id,cards:formation_card_id(formation)").eq("owner_id",a.profile.id).eq("is_active",!0).limit(1);if(!l||l.length===0){t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">📋</div>
        <p style="margin-bottom:16px">Tu n'as pas encore de deck actif.<br>Crée et active un deck pour jouer !</p>
        <button class="btn btn-primary" id="goto-decks-btn">Créer un deck</button>
      </div>
    </div>`,(B=document.getElementById("goto-decks-btn"))==null||B.addEventListener("click",()=>i("decks"));return}const c=l[0],{data:u}=await f.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name)))`).eq("deck_id",c.id).order("slot_order"),p=(u||[]).filter(_=>{var $;return _.is_starter&&(($=_.card)==null?void 0:$.player)}),m=(u||[]).filter(_=>{var $;return!_.is_starter&&(($=_.card)==null?void 0:$.player)});if(p.length<11){t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center;padding:40px;color:#fff">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <p style="margin-bottom:16px">Ton deck doit contenir 11 titulaires.<br>Actuellement : ${p.length}/11</p>
        <button class="btn btn-primary" id="goto-decks-btn">Compléter mon deck</button>
      </div>
    </div>`,(A=document.getElementById("goto-decks-btn"))==null||A.addEventListener("click",()=>i("decks"));return}const{data:h}=await f.from("cards").select("id, gc_type").eq("owner_id",a.profile.id).eq("card_type","game_changer"),v=(u||[]).find(_=>{var $;return(($=_.card)==null?void 0:$.card_type)==="formation"}),y=((M=v==null?void 0:v.card)==null?void 0:M.formation)||((U=c.cards)==null?void 0:U.formation)||"4-4-2",g=Oe(p,y),b=await He(y),{data:E}=await f.from("matches").insert({home_id:a.profile.id,away_id:null,mode:d,home_deck_id:c.id,status:"in_progress"}).select().single(),q={matchId:E==null?void 0:E.id,mode:d,difficulty:r,homeTeam:g,aiTeam:b,homeSubs:m.map(_=>ce(_.card)),homeScore:0,aiScore:0,gcCards:h||[],usedGc:[],phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},maxSubs:3};Ne(t,q,e)}function ce(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:e.note_g,note_d:e.note_d,note_m:e.note_m,note_a:e.note_a,rarity:e.rarity,used:!1}}function Oe(t,e){const a=t.map(i=>ce(i.card));return Pe(a,e)}function Pe(t,e){const a=T[e]||T["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=[...t];for(const s of["GK","DEF","MIL","ATT"]){const n=a[s];for(let r=0;r<n;r++){let d=o.findIndex(l=>l.job===s);d===-1&&(d=o.findIndex(l=>l.job2===s)),d===-1&&(d=0),o[d]&&(i[s].push({...o[d],line:s}),o.splice(d,1))}}return i}async function He(t,e){const{data:a}=await f.from("players").select("id, firstname, surname_encoded, country_code, club_id, job, job2, note_g, note_d, note_m, note_a, rarity").eq("is_active",!0).limit(60);if(!a||a.length<11)return Ke(t);const i=T[t]||T["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},s=[...a];for(const n of["GK","DEF","MIL","ATT"]){const r=s.filter(c=>c.job===n),d=s.filter(c=>c.job!==n),l=[...r,...d];for(let c=0;c<i[n];c++){const u=l[c]||d[c]||s[c];u&&o[n].push({cardId:"ai-"+u.id+"-"+c,id:u.id,firstname:u.firstname,name:u.surname_encoded,country_code:u.country_code,club_id:u.club_id,job:u.job,job2:u.job2,note_g:u.note_g,note_d:u.note_d,note_m:u.note_m,note_a:u.note_a,rarity:u.rarity,line:n,used:!1})}}return o}function Ke(t){const e=T[t]||T["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},i=["ROBOT","CYBER","METAL","NEXUS","ALGO","PIXEL","CODEX","BYTE","LOGIC","TURBO","QUANTUM"];let o=0;for(const s of["GK","DEF","MIL","ATT"])for(let n=0;n<e[s];n++){const r=2+Math.floor(Math.random()*5);a[s].push({cardId:"fake-ai-"+o,id:"fake-"+o,firstname:"IA",name:i[o%i.length],country_code:"XX",club_id:null,job:s,job2:null,note_g:s==="GK"?r:1,note_d:s==="DEF"?r:1,note_m:s==="MIL"?r:1,note_a:s==="ATT"?r:1,rarity:"normal",line:s,used:!1}),o++}return a}function Ne(t,e,a){const i=e.homeTeam.MIL||[],o=e.aiTeam.MIL||[],s=J(i),n=J(o);e.attacker=s>=n?"home":"ai",e.log.push({text:`Duel du milieu : Vous ${s} - ${n} IA. ${e.attacker==="home"?"Vous attaquez":"L'IA attaque"} en premier.`,type:"info"}),e.phase=e.attacker==="home"?"attack":"ai-attack",k(t,e,a),e.attacker==="ai"&&setTimeout(()=>G(t,e,a),1200)}function k(t,e,a){var s,n;const i={attack:"⚔️ À vous d'attaquer",defense:"🛡️ À vous de défendre","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"};t.innerHTML=`
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
        ${e.gcCards.filter(r=>!e.usedGc.includes(r.id)).map(r=>{var d;return`
          <div class="gc-mini" data-gc-id="${r.id}" data-gc-type="${r.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;min-width:90px;text-align:center">
            <div style="font-size:18px">${((d=z[r.gc_type])==null?void 0:d.icon)||"⚡"}</div>
            <div style="font-size:9px;color:#fff;font-weight:600">${r.gc_type}</div>
          </div>
        `}).join("")}
      </div>
    </div>`:""}

    <!-- Actions -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(r=>`<div class="log-entry ${r.type==="goal"?"log-goal":""}">${r.text}</div>`).join("")}
    </div>
  </div>
  `,(s=document.getElementById("match-quit"))==null||s.addEventListener("click",()=>{confirm("Quitter le match ? Il sera abandonné.")&&a.navigate("home")}),(n=document.getElementById("view-ai-team"))==null||n.addEventListener("click",()=>{Ze(e,a)}),pe(t,e,a),ue(t,e,a),t.querySelectorAll(".gc-mini").forEach(r=>{r.addEventListener("click",()=>{Xe(r.dataset.gcId,r.dataset.gcType,t,e,a)})});const o=document.getElementById("match-log");o&&(o.scrollTop=o.scrollHeight)}function pe(t,e,a){const i=document.getElementById("match-field");if(!i)return;const o=e.phase==="attack"||e.phase==="defense",s=e.phase==="attack"?["MIL","ATT"]:["GK","DEF","MIL"],n=["ATT","MIL","DEF","GK"];i.innerHTML=`<div class="match-grid">
    ${n.map(r=>{const d=e.homeTeam[r]||[];return d.length===0?"":`<div class="match-row">
        ${d.map((l,c)=>{const u=o&&s.includes(r)&&!l.used,p=e.selected.some(h=>h.cardId===l.cardId),m=w(l,e.phase==="attack"?"ATT":e.phase==="defense"?"DEF":r);return`<div class="match-slot ${u?"selectable":""} ${p?"selected":""} ${l.used?"used":""}"
            data-card-id="${l.cardId}" data-role="${r}" data-idx="${c}">
            <div class="slot-note">${m}</div>
            <div class="slot-name">${l.name}</div>
          </div>`}).join("")}
      </div>`}).join("")}
  </div>`,i.querySelectorAll(".match-slot.selectable").forEach(r=>{r.addEventListener("click",()=>{Ue(r,e,t,a)})})}function Ue(t,e,a,i){const o=t.dataset.cardId,s=t.dataset.role,n=parseInt(t.dataset.idx),r=e.selected.findIndex(d=>d.cardId===o);if(r!==-1)e.selected.splice(r,1);else{if(e.selected.length>=3){i.toast("Maximum 3 joueurs (GDD §5.1)","error");return}const d=(e.homeTeam[s]||[]).find(l=>l.cardId===o);d&&e.selected.push({...d,_role:s,_idx:n})}pe(a,e,i),ue(a,e,i)}function ue(t,e,a){var o,s,n,r;const i=document.getElementById("match-actions");if(i)if(e.phase==="attack"){const d=P(e.selected,e.modifiers.home);i.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:8px">
        ${e.selected.length>0?`Attaque : <b style="color:var(--yellow);font-size:18px">${d.total}</b>
             <span style="font-size:11px;opacity:.7">(${d.base} + ${d.links} liens${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (milieux/attaquants)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${e.selected.length===0?"disabled":""}>
        Valider l'attaque →
      </button>
    `,(o=document.getElementById("confirm-attack"))==null||o.addEventListener("click",()=>{Ve(t,e,a)})}else if(e.phase==="defense"){const d=H(e.selected,e.modifiers.home);i.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:4px">
        <div style="font-size:12px;opacity:.7">L'IA attaque avec <b style="color:#ff6b6b">${((s=e.pendingAttack)==null?void 0:s.total)||0}</b></div>
        ${e.selected.length>0?`Défense : <b style="color:var(--yellow);font-size:18px">${d.total}</b>
             <span style="font-size:11px;opacity:.7">(${d.base} + ${d.links} liens)</span>`:'<span style="opacity:.6">Sélectionne 1 à 3 joueurs adjacents (gardien/défenseurs/milieux)</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${e.selected.length===0?"disabled":""}>
        Valider la défense →
      </button>
    `,(n=document.getElementById("confirm-defense"))==null||n.addEventListener("click",()=>{We(t,e,a)})}else e.phase==="finished"?(i.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(r=document.getElementById("end-match"))==null||r.addEventListener("click",()=>{a.navigate("home")})):i.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,0.5);padding:8px">⏳ Tour de l'IA...</div>`}function Ve(t,e,a){const i=P(e.selected,e.modifiers.home);e.pendingAttack={...i,players:[...e.selected],side:"home"},e.selected.forEach(o=>{const s=(e.homeTeam[o._role]||[]).find(n=>n.cardId===o.cardId);s&&(s.used=!0)}),e.log.push({text:`Vous attaquez avec ${i.total} (${e.selected.map(o=>o.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",k(t,e,a),setTimeout(()=>Ye(t,e,a),1200)}function We(t,e,a){const i=H(e.selected,e.modifiers.home);e.selected.forEach(s=>{const n=(e.homeTeam[s._role]||[]).find(r=>r.cardId===s.cardId);n&&(n.used=!0)});const o=ne(e.pendingAttack.total,i.total,e.modifiers.home);o.goal?(e.aiScore++,e.log.push({text:`⚽ BUT de l'IA ! (${e.pendingAttack.total} vs ${i.total})`,type:"goal"})):o.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):e.log.push({text:`🧤 Défense réussie ! (${i.total} vs ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,fe(t,e,a,"home-attack")}function G(t,e,a){const i=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],o=se(i,"attack",e.difficulty);if(o.length===0){Je(t,e,a);return}const s=P(o,e.modifiers.ai);e.pendingAttack={...s,players:o,side:"ai"},o.forEach(n=>{n.used=!0}),e.log.push({text:`L'IA attaque avec ${s.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",k(t,e,a)}function Ye(t,e,a){const i=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],o=se(i,"defense",e.difficulty),s=H(o,e.modifiers.ai);o.forEach(r=>{r.used=!0}),ne(e.pendingAttack.total,s.total,e.modifiers.ai).goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! Vous marquez ! (${e.pendingAttack.total} vs ${s.total})`,type:"goal"})):e.log.push({text:`🧤 L'IA défend (${s.total} vs ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,fe(t,e,a,"ai-attack")}function fe(t,e,a,i){if(e.round++,me(e)){F(t,e,a);return}if(i==="home-attack"){if([...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(s=>!s.used).length===0){e.phase="ai-attack",k(t,e,a),setTimeout(()=>G(t,e,a),1e3);return}e.phase="attack",k(t,e,a)}else{if([...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(s=>!s.used).length===0){if([...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length===0){F(t,e,a);return}e.phase="attack",k(t,e,a);return}e.phase="ai-attack",k(t,e,a),setTimeout(()=>G(t,e,a),1e3)}}function me(t){const e=["MIL","ATT"].some(i=>(t.homeTeam[i]||[]).some(o=>!o.used)),a=["MIL","ATT"].some(i=>(t.aiTeam[i]||[]).some(o=>!o.used));return!e&&!a}function Je(t,e,a){me(e)?F(t,e,a):(e.phase="attack",k(t,e,a))}function Xe(t,e,a,i,o){if(!i.usedGc.includes(t)){switch(i.usedGc.push(t),e){case"Double attaque":i.modifiers.home.doubleAttack=!0,i.log.push({text:"⚡ Double attaque activée !",type:"info"});break;case"Bouclier":i.modifiers.home.shield=!0,i.log.push({text:"🛡️ Bouclier activé !",type:"info"});break;case"Ressusciter":let s=!1;for(const r of["ATT","MIL","DEF","GK"]){const d=(i.homeTeam[r]||[]).find(l=>l.used);if(d){d.used=!1,s=!0;break}}i.log.push({text:s?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break;case"Vol de note":i.modifiers.ai.stolenNote=(i.modifiers.ai.stolenNote||0)+1,i.log.push({text:"🎯 -1 à la prochaine action IA",type:"info"});break;case"Gel":const n=[...i.aiTeam.ATT||[],...i.aiTeam.MIL||[]].filter(r=>!r.used);if(n.length>0){const r=n.sort((d,l)=>w(l,"ATT")-w(d,"ATT"))[0];r.used=!0,i.log.push({text:`❄️ ${r.name} (IA) gelé !`,type:"info"})}break;case"Remplacement+":i.maxSubs++,i.log.push({text:"🔄 +1 remplacement disponible",type:"info"});break}f.from("cards").delete().eq("id",t).then(()=>{}),k(a,i,o)}}async function F(t,e,a){e.phase="finished";const{state:i}=a,o=e.homeScore>e.aiScore,s=e.homeScore===e.aiScore,n=o?"victoire":s?"nul":"defaite",r=xe(e.mode,n);e.log.push({text:o?`🏆 VICTOIRE ! +${r} crédits`:s?`🤝 Match nul. +${r} crédits`:`❌ Défaite. +${r} crédits`,type:"goal"}),e.matchId&&await f.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:o?i.profile.id:null,home_credits_reward:r,played_at:new Date().toISOString()}).eq("id",e.matchId);const d={credits:(i.profile.credits||0)+r,matches_played:(i.profile.matches_played||0)+1};o?d.wins=(i.profile.wins||0)+1:s?d.draws=(i.profile.draws||0)+1:d.losses=(i.profile.losses||0)+1,await f.from("users").update(d).eq("id",i.profile.id),await a.refreshProfile(),Qe(t,e,{isWin:o,isDraw:s,rewards:r},a)}function Qe(t,e,{isWin:a,isDraw:i,rewards:o},s){var n,r;t.innerHTML=`
  <div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff;max-width:400px">
      <div style="font-size:72px;margin-bottom:16px">${a?"🏆":i?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">
        ${a?"Victoire !":i?"Match nul":"Défaite"}
      </h2>
      <div style="font-size:42px;font-weight:900;margin:16px 0">${e.homeScore} - ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:13px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${o.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:24px">
        <button class="btn btn-ghost" id="result-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="result-replay" style="flex:1">Rejouer</button>
      </div>
    </div>
  </div>
  `,(n=document.getElementById("result-home"))==null||n.addEventListener("click",()=>s.navigate("home")),(r=document.getElementById("result-replay"))==null||r.addEventListener("click",()=>s.navigate("match",{matchMode:e.mode}))}function Ze(t,e){const a=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div class="match-grid" style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${a.map(i=>{const o=t.aiTeam[i]||[];return o.length?`<div class="match-row" style="margin-bottom:6px">
          ${o.map(s=>{const n=w(s,i);return`<div class="match-slot ${s.used?"used":""}" style="cursor:default">
              <div class="slot-note">${n}</div>
              <div class="slot-name">${s.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>
    <p style="font-size:11px;color:var(--gray-600);margin-top:8px;text-align:center">Remplaçants non affichés (GDD §4)</p>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const et={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function tt(t,e){const{state:a,toast:i}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await N(t,e)}async function N(t,e){const{state:a,toast:i}=e,{data:o}=await f.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),s=(o||[]).filter(d=>d.seller_id===a.profile.id),n=(o||[]).filter(d=>d.seller_id!==a.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${n.length} carte(s) en vente · Solde : ${(a.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${s.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function r(d){const l=document.getElementById("mkt-content"),c=d==="buy"?n:s;if(c.length===0){l.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${d==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}l.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(u=>{var y,g,b;const p=(y=u.card)==null?void 0:y.player;if(!p)return"";const m=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,h=et[p.rarity],v=(a.profile.credits||0)>=u.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${ot(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${h};flex-shrink:0">${m}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((g=p.clubs)==null?void 0:g.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((b=u.seller)==null?void 0:b.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${u.price.toLocaleString("fr")}</div>
            ${d==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${u.id}" ${v?"":"disabled"} style="margin-top:4px">${v?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${u.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,l.querySelectorAll("[data-buy]").forEach(u=>{u.addEventListener("click",()=>it(u.dataset.buy,c,t,e))}),l.querySelectorAll("[data-cancel]").forEach(u=>{u.addEventListener("click",()=>at(u.dataset.cancel,t,e))})}r("buy"),t.querySelectorAll(".mkt-tab").forEach(d=>{d.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(l=>{const c=l===d;l.style.background=c?"var(--green)":"#fff",l.style.color=c?"#fff":"var(--gray-600)",l.style.borderColor=c?"var(--green)":"var(--gray-200)"}),r(d.dataset.tab)})})}async function it(t,e,a,i){const{state:o,toast:s,refreshProfile:n}=i,r=e.find(d=>d.id===t);if(r){if((o.profile.credits||0)<r.price){s("Crédits insuffisants","error");return}if(confirm(`Acheter ${r.card.player.firstname} ${r.card.player.surname_encoded} pour ${r.price.toLocaleString("fr")} crédits ?`))try{const{error:d}=await f.from("cards").update({owner_id:o.profile.id,is_for_sale:!1,sale_price:null}).eq("id",r.card.id);if(d)throw d;await f.from("market_listings").update({status:"sold",buyer_id:o.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await f.from("users").update({credits:(o.profile.credits||0)-r.price}).eq("id",o.profile.id);const{data:l}=await f.from("users").select("credits").eq("id",r.seller_id).single();l&&await f.from("users").update({credits:(l.credits||0)+r.price}).eq("id",r.seller_id),await f.from("notifications").insert({user_id:r.seller_id,type:"card_sold",message:`Ta carte ${r.card.player.surname_encoded} a été vendue pour ${r.price} crédits !`,data:{card_id:r.card.id,price:r.price}}),await n(),s("Carte achetée ! ✅","success"),N(a,i)}catch(d){s("Erreur : "+d.message,"error")}}}async function at(t,e,a){const{toast:i}=a,{data:o}=await f.from("market_listings").select("card_id").eq("id",t).single();await f.from("market_listings").update({status:"cancelled"}).eq("id",t),o&&await f.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",o.card_id),i("Annonce retirée","success"),N(e,a)}function ot(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function nt(t,{state:e,navigate:a,toast:i}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:o}=await f.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${o&&o.length>0?o.map((s,n)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${s.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${n+1}</div>
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
  `}const x={user:null,profile:null,page:"home",params:{}};function C(t,e="info",a=3e3){const i=document.getElementById("toast");i&&(i.textContent=t,i.className=`show ${e}`,clearTimeout(i._t),i._t=setTimeout(()=>{i.className=""},a))}function st(t,e,a=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=a,document.getElementById("modal-overlay").classList.remove("hidden")}function R(){document.getElementById("modal-overlay").classList.add("hidden")}async function j(){if(!x.user)return;const{data:t}=await f.from("users").select("*").eq("id",x.user.id).single();t&&(x.profile=t)}function S(t,e={}){x.page=t,x.params=e,ve()}async function ve(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(i=>{i.classList.toggle("active",i.dataset.page===x.page)});const e=document.getElementById("nav-credits");e&&x.profile&&(e.textContent=`💰 ${(x.profile.credits||0).toLocaleString("fr")}`);const a={state:x,navigate:S,toast:C,openModal:st,closeModal:R,refreshProfile:j};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',x.page){case"home":await Y(t,a);break;case"collection":await we(t,a);break;case"decks":await de(t,a);break;case"boosters":await je(t,a);break;case"match":await Re(t,a);break;case"market":await tt(t,a);break;case"rankings":await nt(t,a);break;default:await Y(t,a)}}function rt(){const t=document.getElementById("app"),e=x.profile,a=(e.club_name||"MW").split(" ").filter(Boolean);a.length>=2?(a[0][0]+a[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),S(i.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>S("home")),document.getElementById("nav-credits").addEventListener("click",()=>S("boosters"))}async function dt(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&R()}),document.getElementById("modal-close").addEventListener("click",R);const{data:{session:t}}=await f.auth.getSession();if(!t){ae(),V(document.getElementById("app"),{navigate:te,toast:C});return}if(x.user=t.user,await j(),ae(),!x.profile){ye(document.getElementById("app"),{state:x,navigate:lt,toast:C,refreshProfile:j});return}x.profile.first_booster_opened||(await ct(x.user.id),await j()),ge(),f.auth.onAuthStateChange(async(e,a)=>{e==="SIGNED_OUT"&&(x.user=null,x.profile=null,document.getElementById("app").innerHTML="",V(document.getElementById("app"),{navigate:te,toast:C}))})}function ge(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",rt(),ve()}function te(){window.location.reload()}async function lt(){await j(),ge()}async function ct(t){const{data:e}=await f.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:a}=await f.from("players").select("id,job").eq("is_active",!0);if(!a||a.length===0)return;const i=a.filter(r=>r.job==="GK"),o=a.filter(r=>r.job!=="GK"),s=[];for(let r=0;r<5;r++){let d=[];r===0&&i.length>0?(d.push(i[Math.floor(Math.random()*i.length)]),d.push(...ie([...o]).slice(0,3))):d=ie([...a]).slice(0,4),d.forEach(l=>s.push({owner_id:t,player_id:l.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(r=>{s.push({owner_id:t,card_type:"game_changer",gc_type:r})});const n=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];s.push({owner_id:t,card_type:"formation",formation:n[Math.floor(Math.random()*n.length)]}),await f.from("cards").insert(s),await f.from("users").update({first_booster_opened:!0}).eq("id",t),C("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function ie(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t}function ae(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}dt();
