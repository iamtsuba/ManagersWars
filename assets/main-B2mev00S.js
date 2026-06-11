import{s as m,r as ie}from"./card-CoW7FVRn.js";function P(t,{navigate:e,toast:o}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(i=>{i.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),i.classList.add("active"),document.getElementById("tab-login").style.display=i.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=i.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const i=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,s=document.getElementById("login-error");if(s.textContent="",!i||!a){s.textContent="Remplissez tous les champs.";return}const n=document.getElementById("login-btn");n.textContent="Connexion…",n.disabled=!0;const{error:r}=await m.auth.signInWithPassword({email:i,password:a});if(n.textContent="Se connecter",n.disabled=!1,r){s.textContent=r.message.includes("Invalid")?"Email ou mot de passe incorrect.":r.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",i=>{i.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const i=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,s=document.getElementById("reg-confirm").value,n=document.getElementById("reg-error");if(n.textContent="",!i||!a||!s){n.textContent="Remplissez tous les champs.";return}if(a.length<6){n.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==s){n.textContent="Les mots de passe ne correspondent pas.";return}const r=document.getElementById("reg-btn");r.textContent="Création…",r.disabled=!0;const{error:d}=await m.auth.signUp({email:i,password:a});if(r.textContent="Créer mon compte",r.disabled=!1,d){n.textContent=d.message;return}o("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=i})}function ye(t,{state:e,navigate:o,toast:i,refreshProfile:a}){let s="#1A6B3C",n="#D4A017";t.innerHTML=`
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
  `;function r(){var h;const l=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),u=((h=document.getElementById("setup-club"))==null?void 0:h.value)||"MW",p=u.trim().split(" ").filter(Boolean),f=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():u.slice(0,2).toUpperCase();l&&(l.style.background=n,l.style.borderColor=s),c&&(c.textContent=f,c.style.color=s)}document.getElementById("color1").addEventListener("input",l=>{s=l.target.value,document.getElementById("swatch1").style.background=s,r()}),document.getElementById("color2").addEventListener("input",l=>{n=l.target.value,document.getElementById("swatch2").style.background=n,r()});function d(l){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${l}`).classList.add("active"),document.getElementById("step-num").textContent=l,document.getElementById("progress-fill").style.width=`${Math.round(l/3*100)}%`,l===3&&r()}document.getElementById("step1-next").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",l.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:u}=await m.from("users").select("id").eq("pseudo",l).maybeSingle();if(u){c.textContent="Ce pseudo est déjà pris.";return}d(2)}),document.getElementById("step2-back").addEventListener("click",()=>d(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const l=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",l.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:u}=await m.from("users").select("id").eq("club_name",l).maybeSingle();if(u){c.textContent="Ce nom de club est déjà pris.";return}d(3)}),document.getElementById("step3-back").addEventListener("click",()=>d(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),u=document.getElementById("step3-error"),p=document.getElementById("step3-finish");u.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:f}=await m.from("users").insert({id:e.user.id,pseudo:l,club_name:c,club_color1:s,club_color2:n,credits:1e4});if(f)throw f;await ge(e.user.id),await a(),i(`Bienvenue ${l} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(f){u.textContent=f.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function ge(t){const{data:e}=await m.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const o=e,i=o.filter(d=>d.job==="GK"),a=o.filter(d=>d.job!=="GK"),s=[];for(let d=0;d<5;d++){let l=[];if(d===0&&i.length>0){const c=i[Math.floor(Math.random()*i.length)];l.push(c);const u=H([...a]).slice(0,3);l.push(...u)}else l=H([...o]).slice(0,4);l.forEach(c=>{s.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(d=>{s.push({owner_id:t,card_type:"game_changer",gc_type:d})});const r=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];s.push({owner_id:t,card_type:"formation",formation:r[Math.floor(Math.random()*r.length)]}),s.length>0&&await m.from("cards").insert(s),await m.from("users").update({first_booster_opened:!0}).eq("id",t)}function H(t){for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}return t}async function U(t,{state:e,navigate:o,toast:i}){const a=e.profile;if(!a)return;const{data:s}=await m.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),n=(a.club_name||"MW").split(" ").filter(Boolean),r=n.length>=2?(n[0][0]+n[1][0]).toUpperCase():(a.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
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
          <span style="color:${a.club_color1}">${r}</span>
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
          ${s.map(d=>{const l=d.winner_id===a.id,c=d.home_score===d.away_score,u=c?"N":l?"V":"D",p=c?"#888":l?"#1A6B3C":"#c0392b",f={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[d.mode]||d.mode,v=new Date(d.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${f}</div>
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
  `,t.querySelectorAll("[data-nav]").forEach(d=>{d.addEventListener("click",l=>{l.preventDefault(),o(d.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.action;if(l==="championship"){i("Championnats — bientôt disponibles","info");return}if(l==="match-random"){i("Matchmaking aléatoire — bientôt disponible","info");return}if(l==="match-friend"){i("Défi ami — bientôt disponible","info");return}l==="match-ai"&&he(o)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await m.auth.signOut(),window.location.reload()})}function he(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],o=document.createElement("div");o.className="modal-overlay",o.style.zIndex="2000",o.innerHTML=`
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
  `,document.body.appendChild(o);const i=()=>o.remove();document.getElementById("diff-cancel").addEventListener("click",i),o.addEventListener("click",a=>{a.target===o&&i()}),o.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{i(),t("match",{matchMode:a.dataset.mode})})})}const D={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque 1 joueur adverse ce match."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function k(t,e){if(!t)return 0;switch(e){case"GK":return t.note_g||0;case"DEF":return t.note_d||0;case"MIL":return t.note_m||0;case"ATT":return t.note_a||0;default:return 0}}function F(t){let e=0;for(let o=0;o<t.length-1;o++){const i=t[o],a=t[o+1];!i||!a||(i.country_code&&a.country_code&&i.country_code===a.country_code&&(e+=1),i.club_id&&a.club_id&&i.club_id===a.club_id&&(e+=1))}return e}function R(t,e={}){let o=t.reduce((s,n)=>s+k(n,"ATT"),0);const i=F(t);let a=o+i;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:o,links:i,total:Math.max(0,a)}}function O(t,e={}){let o=t.reduce((s,n)=>s+k(n,"DEF"),0);const i=F(t);let a=o+i;return e.stolenNote&&(a-=e.stolenNote),{base:o,links:i,total:Math.max(0,a)}}function V(t){const e=t.reduce((i,a)=>i+k(a,"MIL"),0),o=F(t);return e+o}function oe(t,e,o={}){return o.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function ne(t,e,o="easy"){const i=e==="attack"?"ATT":"DEF",a=t.filter(r=>!r.used);if(a.length===0)return[];const s=[...a].sort((r,d)=>k(d,i)-k(r,i));let n;return o==="easy"?n=1+Math.floor(Math.random()*2):o==="medium"?n=2+Math.floor(Math.random()*2):n=3,n=Math.min(n,s.length,3),s.slice(0,n)}function be(t,e){const o={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(o[t]||o.vs_ai_easy)[e]||0}const xe={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},_e=["Tous","GK","DEF","MIL","ATT"];async function ke(t,e){const{state:o,navigate:i,toast:a,openModal:s,closeModal:n}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:r}=await m.from("cards").select("id,card_type,current_note,gc_type,formation,is_for_sale,sale_price,player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url))").eq("owner_id",o.profile.id).order("acquired_at",{ascending:!1});let d="Tous",l="";const c=(r||[]).filter(v=>v.card_type==="player"),u=(r||[]).filter(v=>v.card_type==="game_changer"),p=(r||[]).filter(v=>v.card_type==="formation");function f(){return c.filter(v=>{const g=v.player;if(!g)return!1;const y=d==="Tous"||g.job===d,b=!l||`${g.firstname} ${g.surname_encoded}`.toLowerCase().includes(l);return y&&b})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${c.length} joueur(s) · ${u.length} Game Changer · ${p.length} Formation</p>
    </div>

    ${u.length>0||p.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div class="section-title" style="margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
        ${u.map(v=>{var g,y;return`
          <div class="gc-card" style="min-width:130px;flex-shrink:0">
            <div class="gc-icon">${((g=D[v.gc_type])==null?void 0:g.icon)||"⚡"}</div>
            <div class="gc-badge">Game Changer</div>
            <div class="gc-name">${v.gc_type}</div>
            <div class="gc-desc">${((y=D[v.gc_type])==null?void 0:y.desc)||""}</div>
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
        ${_e.map(v=>`
          <button class="filter-btn" data-job="${v}" style="flex-shrink:0;padding:4px 12px;border-radius:20px;border:1.5px solid ${v===d?"var(--green)":"var(--gray-200)"};background:${v===d?"var(--green)":"#fff"};color:${v===d?"#fff":"var(--gray-600)"};font-size:12px;font-weight:600;cursor:pointer">${v}</button>`).join("")}
      </div>
    </div>

    <div class="page-body">
      <div class="cards-grid" id="col-grid"></div>
    </div>
  </div>
  `;function h(){const v=f(),g=document.getElementById("col-grid");if(g){if(v.length===0){g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte trouvée.<br><small>Ouvre des boosters pour en obtenir !</small></div>';return}g.innerHTML=v.map(y=>{var _,w;const b=y.player,E={...b,current_note:y.current_note,club_encoded_name:(_=b.clubs)==null?void 0:_.encoded_name},S=b.skin&&b.hair?ae(b):null,C=((w=b.clubs)==null?void 0:w.logo_url)||null;return`<div class="card-item" data-card-id="${y.id}">
        ${ie(E,{portraitUrl:S,clubLogoUrl:C,showNotes:!1})}
        ${y.is_for_sale?'<div class="card-owned-badge" style="background:#D4A017">En vente</div>':""}
      </div>`}).join(""),g.querySelectorAll(".card-item").forEach(y=>{y.addEventListener("click",()=>{const b=c.find(E=>E.id===y.dataset.cardId);b&&we(b,t,e)})})}}h(),t.querySelectorAll(".filter-btn").forEach(v=>{v.addEventListener("click",()=>{d=v.dataset.job,t.querySelectorAll(".filter-btn").forEach(g=>{const y=g.dataset.job===d;g.style.background=y?"var(--green)":"#fff",g.style.color=y?"#fff":"var(--gray-600)",g.style.borderColor=y?"var(--green)":"var(--gray-200)"}),h()})}),document.getElementById("col-search").addEventListener("input",v=>{l=v.target.value.toLowerCase(),h()})}function ae(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co",o=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${o}.jpg`}function we(t,e,o){var p,f,h,v,g;const{state:i,toast:a,openModal:s,closeModal:n}=o,r=t.player,d={...r,club_encoded_name:(p=r.clubs)==null?void 0:p.encoded_name},l=ae(r),c=((f=r.clubs)==null?void 0:f.logo_url)||null,u=r.rarity!=="legende"&&!(r.rarity==="papyte"&&r.note_min!==null&&(t.current_note??99)<=r.note_min);s(`${r.firstname} ${r.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
      <div>${ie(d,{portraitUrl:l,clubLogoUrl:c,showNotes:!0})}</div>
      <div style="flex:1;min-width:160px">
        <div style="font-size:12px;color:var(--gray-600)">RARETÉ</div>
        <div style="font-weight:700;margin-bottom:8px;color:${xe[r.rarity]}">${r.rarity.toUpperCase()}</div>
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
    ${t.is_for_sale?'<div style="margin-top:12px"><button class="btn btn-ghost" id="cancel-sell-btn" style="width:100%">Retirer de la vente</button></div>':""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(h=document.getElementById("close-detail"))==null||h.addEventListener("click",n),(v=document.getElementById("sell-btn"))==null||v.addEventListener("click",async()=>{const y=parseInt(document.getElementById("sell-price").value);if(!y||y<1){a("Prix invalide","error");return}const{error:b}=await m.from("cards").update({is_for_sale:!0,sale_price:y}).eq("id",t.id);if(b){a(b.message,"error");return}await m.from("market_listings").insert({seller_id:i.profile.id,card_id:t.id,price:y}),a("Carte mise en vente ! ✅","success"),n(),o.navigate("collection")}),(g=document.getElementById("cancel-sell-btn"))==null||g.addEventListener("click",async()=>{await m.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await m.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),a("Annonce retirée","success"),n(),o.navigate("collection")})}const j={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},I={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function N(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const o=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${o}.jpg`}async function se(t,e){const{state:o,navigate:i,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await m.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",o.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
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
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const n=prompt("Nom du deck :",`Deck ${((s==null?void 0:s.length)||0)+1}`);if(!n)return;const{data:r,error:d}=await m.from("decks").insert({owner_id:o.profile.id,name:n,is_active:!(s!=null&&s.length)}).select().single();if(d){a(d.message,"error");return}a("Deck créé !","success"),W(r.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(n=>{n.addEventListener("click",()=>W(n.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(n=>{n.addEventListener("click",async()=>{await m.from("decks").update({is_active:!1}).eq("owner_id",o.profile.id),await m.from("decks").update({is_active:!0}).eq("id",n.dataset.activate),a("Deck activé !","success"),se(t,e)})})}async function W(t,e,o){const{state:i,toast:a}=o;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await m.from("decks").select("*").eq("id",t).single(),{data:n}=await m.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),r=(n||[]).filter(f=>f.card_type==="player"&&f.player),d=(n||[]).filter(f=>f.card_type==="formation"),l=d.map(f=>f.formation).filter(Boolean),{data:c}=await m.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let u=s.formation||"4-4-2";l.length>0&&!l.includes(u)&&(u=l[0]);const p={deckId:t,name:s.name,formation:u,formationCardId:s.formation_card_id,slots:{},subs:[],playerCards:r,formationCards:d,availableFormations:l};(c||[]).forEach(f=>{f.is_starter?p.slots[f.position]=f.card_id:p.subs.includes(f.card_id)||p.subs.push(f.card_id)}),L(e,p,o)}function L(t,e,o){var d;const{navigate:i}=o;j[e.formation];const a=Y(e.formation),s=a.filter(l=>e.slots[l]).length,n=e.availableFormations.length>0?e.availableFormations:Object.keys(j),r=e.subs.map(l=>e.playerCards.find(c=>c.id===l)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
  </div>`,$e(t,e,a,o),document.getElementById("builder-back").addEventListener("click",()=>i("decks")),document.getElementById("formation-select").addEventListener("change",l=>{e.formation=l.target.value;const c=Y(e.formation),u={};c.forEach(p=>{e.slots[p]&&(u[p]=e.slots[p])}),e.slots=u,L(t,e,o)}),document.getElementById("save-deck").addEventListener("click",()=>Le(e,o)),t.querySelectorAll("[data-remove-sub]").forEach(l=>{l.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==l.dataset.removeSub),L(t,e,o)})}),(d=document.getElementById("add-sub-btn"))==null||d.addEventListener("click",()=>{Ie(e,t,o)})}function $e(t,e,o,i){const a=document.getElementById("deck-field");if(!a)return;const s=[o.filter(n=>n.startsWith("ATT")),o.filter(n=>n.startsWith("MIL")),o.filter(n=>n.startsWith("DEF")),o.filter(n=>n.startsWith("GK"))];a.innerHTML=s.map(n=>`
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:10px">
      ${n.map(r=>{const d=e.slots[r],l=d?e.playerCards.find(p=>p.id===d):null,c=r.replace(/\d+/,""),u=I[c];if(l){const p=l.player,f=c==="GK"?p.note_g:c==="DEF"?p.note_d:c==="MIL"?p.note_m:p.note_a,h=N(p);return`<div class="formation-slot filled" data-pos="${r}"
            style="border-color:${u};background:${u};cursor:pointer;position:relative;width:60px;height:60px">
            ${h?`<img src="${h}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.7">`:""}
            <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008">${f}</div>
            <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.surname_encoded}</div>
          </div>`}return`<div class="formation-slot" data-pos="${r}"
          style="border-color:rgba(255,255,255,0.4);cursor:pointer;width:60px;height:60px">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${c}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>
        </div>`}).join("")}
    </div>`).join(""),a.querySelectorAll(".formation-slot").forEach(n=>{n.addEventListener("click",()=>Ee(n.dataset.pos,e,t,i))})}function Ee(t,e,o,i){var c,u;const{openModal:a,closeModal:s}=i,n=t.replace(/\d+/,""),r=Object.entries(e.slots).filter(([p,f])=>p!==t&&f).map(([,p])=>p),d=e.subs,l=e.playerCards.filter(p=>{const f=p.player;return(f.job===n||f.job2===n)&&!r.includes(p.id)&&!d.includes(p.id)});l.sort((p,f)=>{const h=n==="GK"?p.player.note_g:n==="DEF"?p.player.note_d:n==="MIL"?p.player.note_m:p.player.note_a;return(n==="GK"?f.player.note_g:n==="DEF"?f.player.note_d:n==="MIL"?f.player.note_m:f.player.note_a)-h}),a(`Choisir ${n} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${l.length>0?l.map(p=>{var y,b;const f=p.player,h=n==="GK"?f.note_g:n==="DEF"?f.note_d:n==="MIL"?f.note_m:f.note_a,v=N(f),g={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[f.rarity];return`<div class="player-option" data-card-id="${p.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${I[n]}">
            ${v?`<img src="${v}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${I[n]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${n}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${f.firstname} ${f.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${f.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${f.country_code}">
              ${(y=f.clubs)!=null&&y.logo_url?`<img src="${f.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((b=f.clubs)==null?void 0:b.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${f.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${I[n]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${g};flex-shrink:0">
            ${h}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(c=document.getElementById("close-selector"))==null||c.addEventListener("click",s),(u=document.getElementById("remove-player"))==null||u.addEventListener("click",()=>{delete e.slots[t],s(),L(o,e,i)}),document.querySelectorAll(".player-option").forEach(p=>{p.addEventListener("click",()=>{e.slots[t]=p.dataset.cardId,s(),L(o,e,i)})})}function Ie(t,e,o){var r;const{openModal:i,closeModal:a}=o,s=[...Object.values(t.slots).filter(Boolean),...t.subs],n=t.playerCards.filter(d=>!s.includes(d.id));i("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${n.length>0?n.map(d=>{var p;const l=d.player,c=N(l),u=l.job==="GK"?l.note_g:l.job==="DEF"?l.note_d:l.job==="MIL"?l.note_m:l.note_a;return`<div class="player-option" data-card-id="${d.id}"
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
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(r=document.getElementById("close-sub-selector"))==null||r.addEventListener("click",a),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),a(),L(e,t,o)})})}async function Le(t,e){const{state:o,toast:i,navigate:a}=e,s=t.formationCards.find(d=>d.formation===t.formation),n=(s==null?void 0:s.id)||t.formationCardId;await m.from("decks").update({formation:t.formation,formation_card_id:n||null}).eq("id",t.deckId),await m.from("deck_cards").delete().eq("deck_id",t.deckId);const r=[];if(Object.entries(t.slots).forEach(([d,l],c)=>{r.push({deck_id:t.deckId,card_id:l,position:d,is_starter:!0,slot_order:c})}),t.subs.forEach((d,l)=>{r.push({deck_id:t.deckId,card_id:d,position:`SUB${l+1}`,is_starter:!1,slot_order:100+l})}),r.length>0){const{error:d}=await m.from("deck_cards").insert(r);if(d){i(d.message,"error");return}}i("Deck enregistré ✅","success"),a("decks")}function Y(t){const e=j[t]||j["4-4-2"],o=["GK1"];for(let i=1;i<=e.DEF;i++)o.push(`DEF${i}`);for(let i=1;i<=e.MIL;i++)o.push(`MIL${i}`);for(let i=1;i<=e.ATT;i++)o.push(`ATT${i}`);return o}const J=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],re={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Te(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const o=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${o}.jpg`}const Ae={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Me={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ce(t,{state:e,navigate:o,toast:i}){var s;const a=((s=e.profile)==null?void 0:s.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${J.map(n=>{const r=a>=n.cost||n.cost===0;return`<div class="booster-card ${r?"":"disabled"}" data-booster="${n.id}">
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
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(n=>{n.addEventListener("click",async()=>{const r=J.find(d=>d.id===n.dataset.booster);if(r){n.style.opacity="0.5",n.style.pointerEvents="none";try{await Be(r,{state:e,toast:i,navigate:o,container:t})}catch(d){i(d.message,"error"),n.style.opacity="",n.style.pointerEvents=""}}})})}async function Be(t,{state:e,toast:o,navigate:i,container:a}){if(t.cost>0&&e.profile.credits<t.cost){o("Crédits insuffisants","error");return}t.id==="players_pub"&&await Ge();let s=[];t.type==="player"?s=await je(e.profile,t.cardCount,t.cost):t.type==="game_changer"?s=await Se(e.profile,t.cardCount,t.cost):t.type==="formation"&&(s=await De(e.profile,t.cost));const{data:n}=await m.from("users").select("*").eq("id",e.profile.id).single();n&&(e.profile=n),ze(s,t,i)}async function je(t,e,o){if(o>0){const{error:d}=await m.from("users").update({credits:t.credits-o}).eq("id",t.id);if(d)throw d}const{data:i}=await m.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(i!=null&&i.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const a=i.filter(d=>d.job==="GK"),s=i.filter(d=>d.job!=="GK");let n=[];!t.first_booster_opened&&a.length>0?(n.push(a[Math.floor(Math.random()*a.length)]),n.push(...X([...s]).slice(0,e-1)),await m.from("users").update({first_booster_opened:!0}).eq("id",t.id)):n=X([...i]).slice(0,e);const{data:r}=await m.from("cards").insert(n.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return n.map((d,l)=>({...r[l],player:d}))}async function Se(t,e,o){const{error:i}=await m.from("users").update({credits:t.credits-o}).eq("id",t.id);if(i)throw i;const a=Object.keys(re),s=Array.from({length:e},()=>a[Math.floor(Math.random()*a.length)]),{data:n}=await m.from("cards").insert(s.map(r=>({owner_id:t.id,card_type:"game_changer",gc_type:r}))).select();return n}async function De(t,e){const{error:o}=await m.from("users").update({credits:t.credits-e}).eq("id",t.id);if(o)throw o;const i=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=i[Math.floor(Math.random()*i.length)],{data:s}=await m.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return s}function ze(t,e,o){var n,r;const i=document.createElement("div");i.id="booster-anim-overlay",i.innerHTML=`
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
  `,document.body.appendChild(i);let a=!1;const s=document.getElementById("pack-visual");s.addEventListener("click",()=>{a||(a=!0,s.classList.add("shaking"),setTimeout(()=>{s.classList.remove("shaking"),s.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none";const d=document.getElementById("cards-phase");d.style.display="flex",d.innerHTML=t.map((l,c)=>`
          <div class="card-flip-wrapper" data-card-idx="${c}">
            <div class="card-flip-inner" id="card-flip-${c}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${qe(l)}</div>
            </div>
          </div>`).join(""),t.forEach((l,c)=>{setTimeout(()=>{var u;(u=document.getElementById(`card-flip-${c}`))==null||u.classList.add("revealed")},c*350+300)}),setTimeout(()=>{document.getElementById("reveal-btns").style.display="flex"},t.length*350+800),d.querySelectorAll(".card-flip-wrapper").forEach(l=>{l.addEventListener("click",()=>{var c;(c=document.getElementById(`card-flip-${l.dataset.cardIdx}`))==null||c.classList.add("revealed")})})},600)},500))}),(n=document.getElementById("reveal-collection"))==null||n.addEventListener("click",()=>{i.remove(),o("collection")}),(r=document.getElementById("reveal-more"))==null||r.addEventListener("click",()=>{i.remove(),o("boosters")})}function qe(t){var e,o;if(t.card_type==="player"&&t.player){const i=t.player,a=i.job||"ATT",s=Ae[a]||"#1A6B3C",n=Me[i.rarity]||"#ccc",r=a==="GK"?i.note_g:a==="DEF"?i.note_d:a==="MIL"?i.note_m:i.note_a,d=Te(i),l={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[i.country_code]||i.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${n};overflow:hidden;display:flex;flex-direction:column">
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
        ${(e=i.clubs)!=null&&e.logo_url?`<img src="${i.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((o=i.clubs)==null?void 0:o.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const i=re[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${i.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${i.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function Ge(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let o=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const i=setInterval(()=>{o--;const a=document.getElementById("ad-cd");a&&(a.textContent=o),o<=0&&(clearInterval(i),e.remove(),t(!0))},1e3)})}function X(t){for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}return t}const T={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}};async function Fe(t,e){var C;const{state:o,navigate:i,toast:a}=e,s=o.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation...</div>';const n=s.matchMode||"vs_ai_easy",r=n.replace("vs_ai_",""),d=n,{data:l}=await m.from("decks").select("id,name,formation_card_id").eq("owner_id",o.profile.id).eq("is_active",!0).limit(1);if(!l||l.length===0){Q(t,"📋","Aucun deck actif.","Créer un deck",()=>i("decks"));return}const c=l[0],{data:u}=await m.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
          clubs(encoded_name, logo_url)))`).eq("deck_id",c.id).order("slot_order"),p=(u||[]).filter(_=>{var w;return _.is_starter&&((w=_.card)==null?void 0:w.player)}),f=(u||[]).filter(_=>{var w;return!_.is_starter&&((w=_.card)==null?void 0:w.player)});if(p.length<11){Q(t,"⚠️",`Deck incomplet (${p.length}/11 titulaires).`,"Compléter",()=>i("decks"));return}const{data:h}=await m.from("cards").select("id, gc_type").eq("owner_id",o.profile.id).eq("card_type","game_changer"),v=(u||[]).find(_=>{var w;return((w=_.card)==null?void 0:w.card_type)==="formation"}),g=((C=v==null?void 0:v.card)==null?void 0:C.formation)||"4-4-2",y=Re(p,g),b=await Ne(g),{data:E}=await m.from("matches").insert({home_id:o.profile.id,away_id:null,mode:d,home_deck_id:c.id,status:"in_progress"}).select().single(),S={matchId:E==null?void 0:E.id,mode:d,difficulty:r,homeTeam:y,aiTeam:b,homeSubs:f.map(_=>de(_.card)),homeScore:0,aiScore:0,gcCards:h||[],usedGc:[],phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},maxSubs:3};Pe(t,S,e)}function Q(t,e,o,i,a){var s;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${o}</p>
      <button class="btn btn-primary" id="msg-btn">${i}</button>
    </div>
  </div>`,(s=document.getElementById("msg-btn"))==null||s.addEventListener("click",a)}function de(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,used:!1}}function Re(t,e){const o=t.map(i=>de(i.card));return Oe(o,e)}function Oe(t,e){const o=T[e]||T["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const s of["GK","DEF","MIL","ATT"])for(let n=0;n<o[s];n++){let r=a.findIndex(d=>d.job===s);r===-1&&(r=a.findIndex(d=>d.job2===s)),r===-1&&(r=0),a[r]&&(i[s].push({...a[r],_line:s}),a.splice(r,1))}return i}async function Ne(t,e){const{data:o}=await m.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity").eq("is_active",!0).limit(60);if(!o||o.length<11)return Ke(t);const i=T[t]||T["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},s=[...o];for(const n of["GK","DEF","MIL","ATT"]){const r=s.filter(c=>c.job===n),d=s.filter(c=>c.job!==n),l=[...r,...d];for(let c=0;c<i[n];c++){const u=l[c]||s[c];u&&a[n].push({cardId:"ai-"+u.id+"-"+c,id:u.id,firstname:u.firstname,name:u.surname_encoded,country_code:u.country_code,club_id:u.club_id,job:u.job,job2:u.job2,note_g:Number(u.note_g)||0,note_d:Number(u.note_d)||0,note_m:Number(u.note_m)||0,note_a:Number(u.note_a)||0,rarity:u.rarity,_line:n,used:!1})}}return a}function Ke(t){const e=T[t]||T["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},i=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let a=0;for(const s of["GK","DEF","MIL","ATT"])for(let n=0;n<e[s];n++){const r=3+Math.floor(Math.random()*5);o[s].push({cardId:"fake-"+a,id:"fake-"+a,firstname:"IA",name:i[a%i.length],country_code:"XX",club_id:null,job:s,job2:null,note_g:s==="GK"?r:2,note_d:s==="DEF"?r:2,note_m:s==="MIL"?r:2,note_a:s==="ATT"?r:2,rarity:"normal",_line:s,used:!1}),a++}return o}function Pe(t,e,o){const i=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[],s=V(i),n=V(a);e.attacker=s>=n?"home":"ai",e.log.push({text:`Duel milieu : Vous ${s} - ${n} IA → ${e.attacker==="home"?"Vous attaquez en 1er":"L'IA attaque en 1er"}`,type:"info"}),e.phase=e.attacker==="home"?"attack":"ai-attack",$(t,e,o),e.attacker==="ai"&&setTimeout(()=>z(t,e,o),1200)}function $(t,e,o){var s,n;const i={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"";t.innerHTML=`
  <div class="match-screen">
    <div class="match-header">
      <button class="btn-icon" id="match-quit" style="color:#fff;padding:4px 8px">✕</button>
      <div style="flex:1;text-align:center">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">VOUS vs IA (${e.difficulty.toUpperCase()})</div>
        <div class="match-score">${e.homeScore} – ${e.aiScore}</div>
      </div>
      <button class="btn-icon" id="view-ai" style="color:#fff;padding:4px 8px">👁️</button>
    </div>

    <div class="match-phase">${i}</div>

    <!-- Terrain joueur -->
    <div class="match-field" id="match-field"></div>

    <!-- Game Changers -->
    ${(e.phase==="attack"||e.phase==="defense")&&e.gcCards.filter(r=>!e.usedGc.includes(r.id)).length>0?`
    <div style="padding:6px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:4px">Game Changers</div>
      <div style="display:flex;gap:6px;overflow-x:auto">
        ${e.gcCards.filter(r=>!e.usedGc.includes(r.id)).map(r=>{var d;return`
          <div class="gc-mini" data-gc-id="${r.id}" data-gc-type="${r.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;text-align:center;min-width:80px">
            <div style="font-size:16px">${((d=D[r.gc_type])==null?void 0:d.icon)||"⚡"}</div>
            <div style="font-size:8px;color:#fff;font-weight:600">${r.gc_type}</div>
          </div>`}).join("")}
      </div>
    </div>`:""}

    <!-- Actions & calcul -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(r=>`<div class="log-entry ${r.type==="goal"?"log-goal":""}">${r.text}</div>`).join("")}
    </div>
  </div>`,(s=document.getElementById("match-quit"))==null||s.addEventListener("click",()=>{confirm("Abandonner le match ?")&&o.navigate("home")}),(n=document.getElementById("view-ai"))==null||n.addEventListener("click",()=>Xe(e,o)),le(t,e,o),ce(t,e,o),t.querySelectorAll(".gc-mini").forEach(r=>{r.addEventListener("click",()=>Ye(r.dataset.gcId,r.dataset.gcType,t,e,o))});const a=document.getElementById("match-log");a&&(a.scrollTop=a.scrollHeight)}function le(t,e,o){const i=document.getElementById("match-field");if(!i)return;const a=e.phase==="attack"||e.phase==="defense",s=e.phase==="attack"?["MIL","ATT"]:["GK","DEF","MIL"];e.phase==="attack"||e.phase;const n=["ATT","MIL","DEF","GK"];i.innerHTML=`<div class="match-grid">
    ${n.map(r=>{const d=e.homeTeam[r]||[];return d.length?`<div class="match-row">
        ${d.map((l,c)=>{const u=a&&s.includes(r)&&!l.used,p=e.selected.some(h=>h.cardId===l.cardId);let f;return e.phase==="attack"?f=k(l,"ATT"):e.phase==="defense"?f=r==="GK"?k(l,"GK"):k(l,"DEF"):f=k(l,r),`<div class="match-slot ${u?"selectable":""} ${p?"selected":""} ${l.used?"used":""}"
            data-card-id="${l.cardId}" data-role="${r}" data-idx="${c}">
            <div class="slot-note" style="color:${l.used?"#666":"#fff"}">${l.used?"–":f}</div>
            <div class="slot-name">${l.name}</div>
          </div>`}).join("")}
      </div>`:""}).join("")}
  </div>`,i.querySelectorAll(".match-slot.selectable").forEach(r=>{r.addEventListener("click",()=>He(r,e,t,o))})}function He(t,e,o,i){const a=t.dataset.cardId,s=t.dataset.role,n=parseInt(t.dataset.idx),r=e.selected.findIndex(d=>d.cardId===a);if(r!==-1)e.selected.splice(r,1);else{if(e.selected.length>=3){i.toast("Maximum 3 joueurs","error");return}const d=(e.homeTeam[s]||[]).find(l=>l.cardId===a);d&&e.selected.push({...d,_role:s,_line:s,_idx:n})}le(o,e,i),ce(o,e,i)}function ce(t,e,o){var a,s,n,r;const i=document.getElementById("match-actions");if(i)if(e.phase==="attack"){const d=e.selected.length>0?R(e.selected,e.modifiers.home):null;i.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${d?`ATT : <b style="color:var(--yellow);font-size:20px">${d.total}</b>
             <span style="font-size:11px;opacity:.7">(${d.base}${d.links?` +${d.links} liens`:""})${e.modifiers.home.doubleAttack?" ×2":""}</span>`:'<span style="opacity:.5">Sélectionne 1-3 attaquants/milieux adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${d?"":"disabled"}>
        Attaquer →
      </button>`,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>Ue(t,e,o))}else if(e.phase==="defense"){const d=e.selected.length>0?O(e.selected.map(c=>({...c,_line:c._role})),e.modifiers.home):null,l=((s=e.pendingAttack)==null?void 0:s.total)||0;i.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px">L'IA attaque avec <b style="color:#ff6b6b">${l}</b></div>
        ${d?`DEF : <b style="color:var(--yellow);font-size:20px">${d.total}</b>
             <span style="font-size:11px;opacity:.7">(${d.base}${d.links?` +${d.links} liens`:""})</span>`:'<span style="opacity:.5">Sélectionne 1-3 défenseurs/GK adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${d?"":"disabled"}>
        Défendre →
      </button>`,(n=document.getElementById("confirm-defense"))==null||n.addEventListener("click",()=>Ve(t,e,o))}else e.phase==="finished"?(i.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(r=document.getElementById("end-match"))==null||r.addEventListener("click",()=>o.navigate("home"))):i.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.5);padding:8px;font-size:13px">⏳ Tour de l'IA...</div>`}function Ue(t,e,o){const i=R(e.selected,e.modifiers.home);e.pendingAttack={...i,players:[...e.selected],side:"home"},e.selected.forEach(a=>{const s=(e.homeTeam[a._role]||[]).find(n=>n.cardId===a.cardId);s&&(s.used=!0)}),e.log.push({text:`Vous attaquez : ${i.total} (${e.selected.map(a=>a.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",$(t,e,o),setTimeout(()=>We(t,e,o),1200)}function Ve(t,e,o){const i=e.selected.map(n=>({...n,_line:n._role})),a=O(i,e.modifiers.home);e.selected.forEach(n=>{const r=(e.homeTeam[n._role]||[]).find(d=>d.cardId===n.cardId);r&&(r.used=!0)});const s=oe(e.pendingAttack.total,a.total,e.modifiers.home);s.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):s.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${a.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${a.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,pe(t,e,o,"home-attack")}function z(t,e,o){const i=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=ne(i,"attack",e.difficulty);if(!a.length){fe(t,e,o);return}const s=R(a,e.modifiers.ai);e.pendingAttack={...s,players:a,side:"ai"},a.forEach(n=>{n.used=!0}),e.log.push({text:`IA attaque : ${s.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",$(t,e,o)}function We(t,e,o){const i=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=ne(i,"defense",e.difficulty),s=a.length>0?O(a,e.modifiers.ai).total:0;a.forEach(r=>{r.used=!0});const n=oe(e.pendingAttack.total,s,e.modifiers.ai);n.shielded?e.log.push({text:"🛡️ Bouclier IA ! But annulé.",type:"info"}):n.goal?(e.homeScore++,e.log.push({text:`⚽ BUT VOUS ! (${e.pendingAttack.total} > ${s})`,type:"goal"})):e.log.push({text:`🧤 IA défend ! (${s} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,pe(t,e,o,"ai-attack")}function pe(t,e,o,i){if(e.round++,ue(e)){q(t,e,o);return}if(i==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(s=>!s.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(n=>!n.used).length){q(t,e,o);return}e.phase="ai-attack",$(t,e,o),setTimeout(()=>z(t,e,o),800);return}e.phase="attack",$(t,e,o)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(s=>!s.used).length){fe(t,e,o);return}e.phase="ai-attack",$(t,e,o),setTimeout(()=>z(t,e,o),800)}}function ue(t){const e=["MIL","ATT","GK","DEF"].some(i=>(t.homeTeam[i]||[]).some(a=>!a.used)),o=["MIL","ATT","GK","DEF"].some(i=>(t.aiTeam[i]||[]).some(a=>!a.used));return!e&&!o}function fe(t,e,o){ue(e)?q(t,e,o):(e.phase="attack",$(t,e,o))}function Ye(t,e,o,i,a){if(!i.usedGc.includes(t)){switch(i.usedGc.push(t),e){case"Double attaque":i.modifiers.home.doubleAttack=!0,i.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":i.modifiers.home.shield=!0,i.log.push({text:"🛡️ Bouclier actif !",type:"info"});break;case"Ressusciter":{let s=!1;for(const n of["ATT","MIL","DEF","GK"]){const r=(i.homeTeam[n]||[]).find(d=>d.used);if(r){r.used=!1,s=!0;break}}i.log.push({text:s?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":i.modifiers.ai.stolenNote=(i.modifiers.ai.stolenNote||0)+1,i.log.push({text:"🎯 -1 à la prochaine action IA",type:"info"});break;case"Gel":{const s=[...i.aiTeam.ATT||[],...i.aiTeam.MIL||[]].filter(n=>!n.used);if(s.length){const n=s.sort((r,d)=>k(d,"ATT")-k(r,"ATT"))[0];n.used=!0,i.log.push({text:`❄️ ${n.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":i.maxSubs++,i.log.push({text:"🔄 +1 remplacement",type:"info"});break}m.from("cards").delete().eq("id",t).then(()=>{}),$(o,i,a)}}async function q(t,e,o){e.phase="finished";const{state:i}=o,a=e.homeScore>e.aiScore,s=e.homeScore===e.aiScore,n=a?"victoire":s?"nul":"defaite",r=be(e.mode,n);e.log.push({text:a?`🏆 Victoire ! +${r} cr.`:s?`🤝 Nul. +${r} cr.`:`❌ Défaite. +${r} cr.`,type:"goal"}),e.matchId&&await m.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?i.profile.id:null,home_credits_reward:r,played_at:new Date().toISOString()}).eq("id",e.matchId);const d={credits:(i.profile.credits||0)+r,matches_played:(i.profile.matches_played||0)+1};a?d.wins=(i.profile.wins||0)+1:s?d.draws=(i.profile.draws||0)+1:d.losses=(i.profile.losses||0)+1,await m.from("users").update(d).eq("id",i.profile.id),await o.refreshProfile(),$(t,e,o),Je(t,e,{isWin:a,isDraw:s,rewards:r},o)}function Je(t,e,{isWin:o,isDraw:i,rewards:a},s){var r,d;const n=document.createElement("div");n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",n.innerHTML=`
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${o?"🏆":i?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${o?"Victoire !":i?"Match nul":"Défaite"}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${e.homeScore} – ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${a.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`,document.body.appendChild(n),(r=document.getElementById("res-home"))==null||r.addEventListener("click",()=>{n.remove(),s.navigate("home")}),(d=document.getElementById("res-replay"))==null||d.addEventListener("click",()=>{n.remove(),s.navigate("match",{matchMode:e.mode})})}function Xe(t,e){const o=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${o.map(i=>{const a=t.aiTeam[i]||[];return a.length?`<div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px">
          ${a.map(s=>{const n=k(s,i);return`<div class="match-slot ${s.used?"used":""}" style="cursor:default">
              <div class="slot-note">${s.used?"–":n}</div>
              <div class="slot-name">${s.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const Qe={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ze(t,e){const{state:o,toast:i}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await K(t,e)}async function K(t,e){const{state:o,toast:i}=e,{data:a}=await m.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),s=(a||[]).filter(d=>d.seller_id===o.profile.id),n=(a||[]).filter(d=>d.seller_id!==o.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${n.length} carte(s) en vente · Solde : ${(o.profile.credits||0).toLocaleString("fr")} cr.</p>
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
      ${c.map(u=>{var g,y,b;const p=(g=u.card)==null?void 0:g.player;if(!p)return"";const f=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,h=Qe[p.rarity],v=(o.profile.credits||0)>=u.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${it(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${h};flex-shrink:0">${f}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((y=p.clubs)==null?void 0:y.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((b=u.seller)==null?void 0:b.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${u.price.toLocaleString("fr")}</div>
            ${d==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${u.id}" ${v?"":"disabled"} style="margin-top:4px">${v?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${u.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,l.querySelectorAll("[data-buy]").forEach(u=>{u.addEventListener("click",()=>et(u.dataset.buy,c,t,e))}),l.querySelectorAll("[data-cancel]").forEach(u=>{u.addEventListener("click",()=>tt(u.dataset.cancel,t,e))})}r("buy"),t.querySelectorAll(".mkt-tab").forEach(d=>{d.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(l=>{const c=l===d;l.style.background=c?"var(--green)":"#fff",l.style.color=c?"#fff":"var(--gray-600)",l.style.borderColor=c?"var(--green)":"var(--gray-200)"}),r(d.dataset.tab)})})}async function et(t,e,o,i){const{state:a,toast:s,refreshProfile:n}=i,r=e.find(d=>d.id===t);if(r){if((a.profile.credits||0)<r.price){s("Crédits insuffisants","error");return}if(confirm(`Acheter ${r.card.player.firstname} ${r.card.player.surname_encoded} pour ${r.price.toLocaleString("fr")} crédits ?`))try{const{error:d}=await m.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",r.card.id);if(d)throw d;await m.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await m.from("users").update({credits:(a.profile.credits||0)-r.price}).eq("id",a.profile.id);const{data:l}=await m.from("users").select("credits").eq("id",r.seller_id).single();l&&await m.from("users").update({credits:(l.credits||0)+r.price}).eq("id",r.seller_id),await m.from("notifications").insert({user_id:r.seller_id,type:"card_sold",message:`Ta carte ${r.card.player.surname_encoded} a été vendue pour ${r.price} crédits !`,data:{card_id:r.card.id,price:r.price}}),await n(),s("Carte achetée ! ✅","success"),K(o,i)}catch(d){s("Erreur : "+d.message,"error")}}}async function tt(t,e,o){const{toast:i}=o,{data:a}=await m.from("market_listings").select("card_id").eq("id",t).single();await m.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await m.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),i("Annonce retirée","success"),K(e,o)}function it(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function ot(t,{state:e,navigate:o,toast:i}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await m.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${a&&a.length>0?a.map((s,n)=>`
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
  `}const x={user:null,profile:null,page:"home",params:{}};function A(t,e="info",o=3e3){const i=document.getElementById("toast");i&&(i.textContent=t,i.className=`show ${e}`,clearTimeout(i._t),i._t=setTimeout(()=>{i.className=""},o))}function nt(t,e,o=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=o,document.getElementById("modal-overlay").classList.remove("hidden")}function G(){document.getElementById("modal-overlay").classList.add("hidden")}async function M(){if(!x.user)return;const{data:t}=await m.from("users").select("*").eq("id",x.user.id).single();t&&(x.profile=t)}function B(t,e={}){x.page=t,x.params=e,me()}async function me(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(i=>{i.classList.toggle("active",i.dataset.page===x.page)});const e=document.getElementById("nav-credits");e&&x.profile&&(e.textContent=`💰 ${(x.profile.credits||0).toLocaleString("fr")}`);const o={state:x,navigate:B,toast:A,openModal:nt,closeModal:G,refreshProfile:M};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',x.page){case"home":await U(t,o);break;case"collection":await ke(t,o);break;case"decks":await se(t,o);break;case"boosters":await Ce(t,o);break;case"match":await Fe(t,o);break;case"market":await Ze(t,o);break;case"rankings":await ot(t,o);break;default:await U(t,o)}}function at(){const t=document.getElementById("app"),e=x.profile,o=(e.club_name||"MW").split(" ").filter(Boolean);o.length>=2?(o[0][0]+o[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault(),B(i.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>B("home")),document.getElementById("nav-credits").addEventListener("click",()=>B("boosters"))}async function st(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&G()}),document.getElementById("modal-close").addEventListener("click",G);const{data:{session:t}}=await m.auth.getSession();if(!t){te(),P(document.getElementById("app"),{navigate:Z,toast:A});return}if(x.user=t.user,await M(),te(),!x.profile){ye(document.getElementById("app"),{state:x,navigate:rt,toast:A,refreshProfile:M});return}x.profile.first_booster_opened||(await dt(x.user.id),await M()),ve(),m.auth.onAuthStateChange(async(e,o)=>{e==="SIGNED_OUT"&&(x.user=null,x.profile=null,document.getElementById("app").innerHTML="",P(document.getElementById("app"),{navigate:Z,toast:A}))})}function ve(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",at(),me()}function Z(){window.location.reload()}async function rt(){await M(),ve()}async function dt(t){const{data:e}=await m.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:o}=await m.from("players").select("id,job").eq("is_active",!0);if(!o||o.length===0)return;const i=o.filter(r=>r.job==="GK"),a=o.filter(r=>r.job!=="GK"),s=[];for(let r=0;r<5;r++){let d=[];r===0&&i.length>0?(d.push(i[Math.floor(Math.random()*i.length)]),d.push(...ee([...a]).slice(0,3))):d=ee([...o]).slice(0,4),d.forEach(l=>s.push({owner_id:t,player_id:l.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(r=>{s.push({owner_id:t,card_type:"game_changer",gc_type:r})});const n=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];s.push({owner_id:t,card_type:"formation",formation:n[Math.floor(Math.random()*n.length)]}),await m.from("cards").insert(s),await m.from("users").update({first_booster_opened:!0}).eq("id",t),A("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function ee(t){for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}return t}function te(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}st();
