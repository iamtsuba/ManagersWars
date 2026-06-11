import{s as v}from"./supabase-z_u0vv5N.js";function Z(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!a){n.textContent="Remplissez tous les champs.";return}const s=document.getElementById("login-btn");s.textContent="Connexion…",s.disabled=!0;const{error:d}=await v.auth.signInWithPassword({email:o,password:a});if(s.textContent="Se connecter",s.disabled=!1,d){n.textContent=d.message.includes("Invalid")?"Email ou mot de passe incorrect.":d.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,s=document.getElementById("reg-error");if(s.textContent="",!o||!a||!n){s.textContent="Remplissez tous les champs.";return}if(a.length<6){s.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==n){s.textContent="Les mots de passe ne correspondent pas.";return}const d=document.getElementById("reg-btn");d.textContent="Création…",d.disabled=!0;const{error:r}=await v.auth.signUp({email:o,password:a});if(d.textContent="Créer mon compte",d.disabled=!1,r){s.textContent=r.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Ie(t,{state:e,navigate:i,toast:o,refreshProfile:a}){let n="#1A6B3C",s="#D4A017";t.innerHTML=`
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

        <div class="club-logo-preview" id="logo-preview" style="background:${s};border-color:${n}">
          <span id="logo-initials" style="color:${n}">MW</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch1" style="background:${n};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur du contour</label>
              <input type="color" id="color1" value="${n}" style="width:100%;height:36px;padding:2px;border-radius:6px">
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch2" style="background:${s};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur de l'intérieur</label>
              <input type="color" id="color2" value="${s}" style="width:100%;height:36px;padding:2px;border-radius:6px">
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
  `;function d(){var b;const l=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),u=((b=document.getElementById("setup-club"))==null?void 0:b.value)||"MW",p=u.trim().split(" ").filter(Boolean),m=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():u.slice(0,2).toUpperCase();l&&(l.style.background=s,l.style.borderColor=n),c&&(c.textContent=m,c.style.color=n)}document.getElementById("color1").addEventListener("input",l=>{n=l.target.value,document.getElementById("swatch1").style.background=n,d()}),document.getElementById("color2").addEventListener("input",l=>{s=l.target.value,document.getElementById("swatch2").style.background=s,d()});function r(l){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${l}`).classList.add("active"),document.getElementById("step-num").textContent=l,document.getElementById("progress-fill").style.width=`${Math.round(l/3*100)}%`,l===3&&d()}document.getElementById("step1-next").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",l.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:u}=await v.from("users").select("id").eq("pseudo",l).maybeSingle();if(u){c.textContent="Ce pseudo est déjà pris.";return}r(2)}),document.getElementById("step2-back").addEventListener("click",()=>r(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const l=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",l.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:u}=await v.from("users").select("id").eq("club_name",l).maybeSingle();if(u){c.textContent="Ce nom de club est déjà pris.";return}r(3)}),document.getElementById("step3-back").addEventListener("click",()=>r(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const l=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),u=document.getElementById("step3-error"),p=document.getElementById("step3-finish");u.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:m}=await v.from("users").insert({id:e.user.id,pseudo:l,club_name:c,club_color1:n,club_color2:s,credits:1e4});if(m)throw m;await Le(e.user.id),await a(),o(`Bienvenue ${l} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(m){u.textContent=m.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function Le(t){const{data:e}=await v.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(r=>r.job==="GK"),a=i.filter(r=>r.job!=="GK"),n=[];for(let r=0;r<5;r++){let l=[];if(r===0&&o.length>0){const c=o[Math.floor(Math.random()*o.length)];l.push(c);const u=ee([...a]).slice(0,3);l.push(...u)}else l=ee([...i]).slice(0,4);l.forEach(c=>{n.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(r=>{n.push({owner_id:t,card_type:"game_changer",gc_type:r})});const d=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:d[Math.floor(Math.random()*d.length)]}),n.length>0&&await v.from("cards").insert(n),await v.from("users").update({first_booster_opened:!0}).eq("id",t)}function ee(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function te(t,{state:e,navigate:i,toast:o}){const a=e.profile;if(!a)return;const{data:n}=await v.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),s=(a.club_name||"MW").split(" ").filter(Boolean),d=s.length>=2?(s[0][0]+s[1][0]).toUpperCase():(a.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
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
          <span style="color:${a.club_color1}">${d}</span>
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
      ${n&&n.length>0?`
      <div>
        <div class="section-title">⚽ Derniers matchs</div>
        <div class="card-panel" style="padding:0">
          ${n.map(r=>{const l=r.winner_id===a.id,c=r.home_score===r.away_score,u=c?"N":l?"V":"D",p=c?"#888":l?"#1A6B3C":"#c0392b",m={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[r.mode]||r.mode,$=new Date(r.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${m}</div>
                <div style="font-size:11px;color:var(--gray-600)">${$}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${r.home_score} - ${r.away_score}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(r=>{r.addEventListener("click",l=>{l.preventDefault(),i(r.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.action;if(l==="championship"){o("Championnats — bientôt disponibles","info");return}if(l==="match-random"){o("Matchmaking aléatoire — bientôt disponible","info");return}if(l==="match-friend"){o("Défi ami — bientôt disponible","info");return}l==="match-ai"&&Ce(i)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await v.auth.signOut(),window.location.reload()})}function Ce(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
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
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{o(),t("match",{matchMode:a.dataset.mode})})})}const V={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Me(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function T(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const ie=["ATT","MIL","DEF","GK"];function W(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let a=o+1;a<i;a++){const n=t[o],s=t[a];if(!n||!s)continue;const d=n._col!==void 0&&s._col!==void 0&&n._col===s._col,r=n._col!==void 0&&s._col!==void 0&&Math.abs(n._col-s._col)===1,l=ie.indexOf(n._line),c=ie.indexOf(s._line),u=Math.abs(l-c)===1;(n._line===s._line&&r||d&&u)&&(n.country_code&&s.country_code&&n.country_code===s.country_code&&e++,n.club_id&&s.club_id&&n.club_id===s.club_id&&e++)}return e}function Y(t,e={}){const i=t.reduce((n,s)=>n+T(s,"ATT"),0),o=W(t);let a=i+o;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function J(t,e={}){const i=t.reduce((n,s)=>n+(s._line==="GK"||s.job==="GK"?T(s,"GK"):T(s,"DEF")),0),o=W(t);let a=i+o;return e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function oe(t){const e=t.reduce((o,a)=>o+T(a,"MIL"),0),i=W(t);return e+i}function fe(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function me(t,e,i="easy"){const o=t.filter(s=>!s.used);if(!o.length)return[];const a=[...o].sort((s,d)=>{const r=e==="attack"?T(s,"ATT"):s._line==="GK"?T(s,"GK"):T(s,"DEF");return(e==="attack"?T(d,"ATT"):d._line==="GK"?T(d,"GK"):T(d,"DEF"))-r});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return a.slice(0,Math.min(n,a.length,3))}function Be(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const ve={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},F={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},ne=["GK","DEF","MIL","ATT"],je=["Tous","GK","DEF","MIL","ATT"],ze={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},ge={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function ye(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function N(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function Se(t,e=""){var u,p;const i=t.player;if(!i)return"";const o=i.job||"ATT",a=F[o],n=ve[i.rarity]||"#ccc",s=N(i,o),d=i.job2?N(i,i.job2):null,r=i.job2?F[i.job2]:null,l=ye(i),c=ge[i.country_code]||i.country_code||"";return`
  <div style="
    width:140px;border-radius:12px;padding:6px;
    background:${n};cursor:pointer;flex-shrink:0;position:relative
  " data-card-id="${t.id}">
    ${e}
    <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
      <!-- Nom -->
      <div style="padding:5px 6px 2px;text-align:center">
        <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${i.firstname}</div>
        <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(i.surname_encoded||"").toUpperCase()}</div>
      </div>
      <!-- Zone étoiles : bandeau fixe + étoile principale dedans + petite étoile dessous -->
      <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
        <!-- Bandeau de couleur fixe (toujours au même endroit) -->
        <div style="position:absolute;top:16px;width:100%;height:28px;background:${a}"></div>
        <!-- Étoile principale centrée sur le bandeau, contour blanc -->
        <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18"
            fill="${a}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${s}</text>
        </svg>
        <!-- Petite étoile poste secondaire, toujours en dessous du bandeau -->
        ${d!==null?`
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${r}" stroke="white" stroke-width="1.5"/>
          <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${d}</text>
        </svg>`:""}
      </div>
      <!-- Portrait -->
      <div style="height:106px;overflow:hidden;background:#b8d4f0;position:relative">
        ${l?`<img src="${l}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
               onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:26px;gap:4px">
        <img src="https://flagsapi.com/${i.country_code}/flat/32.png"
          style="width:20px;height:14px;border-radius:2px;object-fit:cover;flex-shrink:0"
          onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555;flex:1;text-align:center">${c}</div>
        ${(u=i.clubs)!=null&&u.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((p=i.clubs)==null?void 0:p.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}async function De(t,e){const{state:i,navigate:o,toast:a,openModal:n,closeModal:s}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:d}=await v.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),r=(d||[]).filter(f=>f.card_type==="player"&&f.player),l=(d||[]).filter(f=>f.card_type==="game_changer"),c=(d||[]).filter(f=>f.card_type==="formation"),u={};r.forEach(f=>{const g=f.player.id;u[g]=(u[g]||0)+1});let p="Tous",m="";function b(){return[...r].sort((f,g)=>{const _=ne.indexOf(f.player.job),w=ne.indexOf(g.player.job);return _!==w?_-w:(f.player.surname_encoded||"").localeCompare(g.player.surname_encoded||"")})}function $(){return b().filter(f=>{const g=f.player,_=p==="Tous"||g.job===p,w=!m||`${g.firstname} ${g.surname_encoded}`.toLowerCase().includes(m);return _&&w})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${r.length} carte(s) joueur · ${l.length} Game Changer · ${c.length} Formation</p>
    </div>

    <!-- Cartes spéciales (cliquables) -->
    ${l.length>0||c.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">

        ${l.map(f=>{var g;return`
          <div data-gc-id="${f.id}" data-gc-type="${f.gc_type}" style="
            background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            <div style="font-size:28px">${((g=V[f.gc_type])==null?void 0:g.icon)||"⚡"}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${f.gc_type}</div>
          </div>`}).join("")}

        ${c.map(f=>`
          <div data-form-id="${f.id}" data-formation="${f.formation}" style="
            background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${f.formation}</div>
          </div>`).join("")}

      </div>
    </div>`:""}

    <!-- Filtres -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${je.map(f=>`
          <button class="filter-btn" data-job="${f}"
            style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${f===p?"var(--green)":"var(--gray-200)"};
              background:${f===p?"var(--green)":"#fff"};
              color:${f===p?"#fff":"var(--gray-600)"}">
            ${f}
          </button>`).join("")}
      </div>
    </div>

    <!-- Grille cartes joueurs -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function x(){const f=$(),g=document.getElementById("col-grid");if(!g)return;if(!f.length){g.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const _={},w=[];f.forEach(k=>{const y=k.player.id;_[y]||(_[y]=!0,w.push(k))}),g.innerHTML=w.map(k=>{const y=u[k.player.id]||1,h=y>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${y}</div>`:"",L=r.filter(I=>I.player.id===k.player.id&&I.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Se(k,h+L)}).join(""),g.querySelectorAll("[data-card-id]").forEach(k=>{k.addEventListener("click",()=>{const y=r.find(h=>h.id===k.dataset.cardId);y&&Re(y,r,u,e)})})}x(),t.querySelectorAll(".filter-btn").forEach(f=>{f.addEventListener("click",()=>{p=f.dataset.job,t.querySelectorAll(".filter-btn").forEach(g=>{const _=g.dataset.job===p;g.style.background=_?"var(--green)":"#fff",g.style.color=_?"#fff":"var(--gray-600)",g.style.borderColor=_?"var(--green)":"var(--gray-200)"}),x()})}),document.getElementById("col-search").addEventListener("input",f=>{m=f.target.value.toLowerCase(),x()}),t.querySelectorAll("[data-gc-id]").forEach(f=>{f.addEventListener("click",()=>Ge(f.dataset.gcType,n))}),t.querySelectorAll("[data-form-id]").forEach(f=>{f.addEventListener("click",()=>qe(f.dataset.formation,n))})}function Ge(t,e){const i=V[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
      <div style="background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:16px;border:2px solid #9b59b6;
        padding:24px 32px;text-align:center;color:#fff;width:100%;max-width:280px">
        <div style="font-size:56px;margin-bottom:8px">${i.icon}</div>
        <div style="font-size:9px;background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:10px;display:inline-block;letter-spacing:.5px;margin-bottom:8px">GAME CHANGER</div>
        <div style="font-size:22px;font-weight:900">${t}</div>
      </div>
      <div style="background:#f9f0ff;border-radius:10px;padding:14px 16px;width:100%">
        <div style="font-size:12px;font-weight:700;color:#7a28b8;margin-bottom:6px">EFFET</div>
        <div style="font-size:14px;color:#333">${i.desc}</div>
      </div>
      <div style="background:#fff3cd;border-radius:10px;padding:10px 14px;width:100%">
        <div style="font-size:12px;color:#856404">⚠️ Cette carte est à <b>usage unique</b>. Une fois jouée en match, elle est définitivement supprimée de ta collection.</div>
      </div>
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function qe(t,e){const i={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},o={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},a=i[t]||i["4-4-2"],n=["ATT","MIL","DEF","GK"];function s(l,c){const b=(l-1)*54,$=(c-b)/2;return Array.from({length:l},(x,f)=>$+f*54)}function d(l){return l===1?[1]:l===2?[0,2]:l===3?[0,1,2]:l===4?[0,1,1,2]:l===5?[0,1,1,1,2]:[1]}function r(){const p=n.length*72+48,m=n.map((f,g)=>24+g*72+72/2),b={};n.forEach(f=>{b[f]=s(a[f],290)});function $(f,g){const _=a[f],w=d(_),k=b[f],y=w.indexOf(g);return y>=0?k[y]:null}let x=`<svg width="290" height="${p}" viewBox="0 0 290 ${p}" xmlns="http://www.w3.org/2000/svg">`;n.forEach((f,g)=>{const _=b[f];for(let w=0;w<_.length-1;w++){const k=_[w]+20,y=_[w+1]-20,h=m[g];x+=`<line x1="${k}" y1="${h}" x2="${y}" y2="${h}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,x+=`<text x="${(k+y)/2}" y="${h-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`}});for(let f=0;f<3;f++)for(let g=0;g<n.length-1;g++){const _=n[g],w=n[g+1],k=$(_,f),y=$(w,f);if(k!==null&&y!==null){const h=(k+y)/2;x+=`<line x1="${k}" y1="${m[g]+20}" x2="${y}" y2="${m[g+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,x+=`<text x="${h+6}" y="${(m[g]+m[g+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`}}return n.forEach((f,g)=>{const _=a[f],w=b[f],k=d(_),y=o[f],h=m[g],C={};k.forEach((L,I)=>{C[L]||(C[L]={xs:[],indices:[]}),C[L].xs.push(w[I]),C[L].indices.push(I)}),Object.entries(C).forEach(([L,I])=>{const j=I.xs.length;if(j>1){const A=I.xs.reduce((z,K)=>z+K,0)/j;x+=`<circle cx="${A}" cy="${h}" r="20" fill="${y}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,x+=`<text x="${A}" y="${h-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${f}</text>`,x+=`<text x="${A}" y="${h+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${j}</text>`}else{const A=I.xs[0],z=I.indices[0]+1;x+=`<circle cx="${A}" cy="${h}" r="20" fill="${y}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,x+=`<text x="${A}" y="${h+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${f}</text>`,x+=`<text x="${A}" y="${h+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${f}${z}</text>`}})}),x+="</svg>",x}e(`Formation ${t}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${r()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function Re(t,e,i,o){var y,h,C,L,I,j;const{state:a,toast:n,openModal:s,closeModal:d,navigate:r,refreshProfile:l}=o,c=t.player,u=e.filter(A=>A.player.id===c.id),p=u.length,m=ze[c.rarity]||1e3,b=c.rarity!=="legende",$=ye(c),x=N(c,c.job),f=c.job2?N(c,c.job2):null,g=F[c.job]||"#1A6B3C",_=c.job2?F[c.job2]:null,w=ve[c.rarity]||"#ccc",k=ge[c.country_code]||c.country_code||"";s(`${c.firstname} ${c.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${w};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${c.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(c.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${g}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${g}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${x}</text>
            </svg>
            ${f!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${_}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${f}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${$?`<img src="${$}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${c.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${k}</div>
            ${(y=c.clubs)!=null&&y.logo_url?`<img src="${c.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(((h=c.clubs)==null?void 0:h.encoded_name)||"").slice(0,6)}</div>`}
          </div>
        </div>
      </div>

      <!-- Infos -->
      <div style="flex:1;min-width:160px;display:flex;flex-direction:column;gap:10px">
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">RARETÉ</div>
          <div style="font-weight:700;color:${w}">${c.rarity.toUpperCase()}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">POSTE</div>
          <div style="font-weight:700">${c.job}${c.job2?" / "+c.job2:""}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">NOTES</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:12px">
            <span>GK <b>${c.note_g||0}</b></span>
            <span>DEF <b>${c.note_d||0}</b></span>
            <span>MIL <b>${c.note_m||0}</b></span>
            <span>ATT <b>${c.note_a||0}</b></span>
          </div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">EN COLLECTION</div>
          <div style="font-weight:700;font-size:18px">×${p}</div>
        </div>
      </div>
    </div>

    <!-- Vente directe -->
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:14px">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">💰 Vente directe</div>
      <div style="background:#f9f9f9;border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12px;color:var(--gray-600)">Prix fixe selon rareté</div>
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${m.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${p-1} carte${p-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-btn" ${p<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${b&&!t.is_for_sale?`
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${c.sell_price||5e3}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-btn">Mettre en vente</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?`
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-btn">Retirer</button>
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(C=document.getElementById("close-detail"))==null||C.addEventListener("click",d),(L=document.getElementById("direct-sell-btn"))==null||L.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${c.surname_encoded} pour ${m.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const A=u.find(K=>!K.is_for_sale)||u[0];if(!A){n("Aucune carte à vendre","error");return}const{error:z}=await v.from("cards").delete().eq("id",A.id);if(z){n(z.message,"error");return}await v.from("users").update({credits:(a.profile.credits||0)+m}).eq("id",a.profile.id),await l(),n(`+${m.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),d(),r("collection")}),(I=document.getElementById("market-sell-btn"))==null||I.addEventListener("click",async()=>{const A=parseInt(document.getElementById("sell-price").value);if(!A||A<1){n("Prix invalide","error");return}await v.from("cards").update({is_for_sale:!0,sale_price:A}).eq("id",t.id),await v.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:A}),n("Carte mise en vente sur le marché !","success"),d(),r("collection")}),(j=document.getElementById("cancel-sell-btn"))==null||j.addEventListener("click",async()=>{await v.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await v.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),d(),r("collection")})}const O={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},B={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function X(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function he(t,e){const{state:i,navigate:o,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await v.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(n==null?void 0:n.length)||0} deck(s) · 11 titulaires + 5 remplaçants max</p>
    </div>
    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${(n==null?void 0:n.length)>0?n.map(s=>`
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${s.name}
                ${s.is_active?'<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>':""}
              </div>
            </div>
            <div style="display:flex;gap:6px">
              ${s.is_active?"":`<button class="btn btn-ghost btn-sm" data-activate="${s.id}">Activer</button>`}
              <button class="btn btn-primary btn-sm" data-edit="${s.id}">✏️ Éditer</button>
            </div>
          </div>`).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const s=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!s)return;const{data:d,error:r}=await v.from("decks").insert({owner_id:i.profile.id,name:s,is_active:!(n!=null&&n.length)}).select().single();if(r){a(r.message,"error");return}a("Deck créé !","success"),se(d.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(s=>{s.addEventListener("click",()=>se(s.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(s=>{s.addEventListener("click",async()=>{await v.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await v.from("decks").update({is_active:!0}).eq("id",s.dataset.activate),a("Deck activé !","success"),he(t,e)})})}async function se(t,e,i){const{state:o,toast:a}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await v.from("decks").select("*").eq("id",t).single(),{data:s}=await v.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),d=(s||[]).filter(m=>m.card_type==="player"&&m.player),r=(s||[]).filter(m=>m.card_type==="formation"),l=r.map(m=>m.formation).filter(Boolean),{data:c}=await v.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let u=n.formation||"4-4-2";l.length>0&&!l.includes(u)&&(u=l[0]);const p={deckId:t,name:n.name,formation:u,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:d,formationCards:r,availableFormations:l};(c||[]).forEach(m=>{m.is_starter?p.slots[m.position]=m.card_id:p.subs.includes(m.card_id)||p.subs.push(m.card_id)}),S(e,p,i)}function S(t,e,i){var r;const{navigate:o}=i;O[e.formation];const a=ae(e.formation),n=a.filter(l=>e.slots[l]).length,s=e.availableFormations.length>0?e.availableFormations:Object.keys(O),d=e.subs.map(l=>e.playerCards.find(c=>c.id===l)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${e.name}</h2>
        <p>${n}/11 titulaires · ${e.subs.length}/5 remplaçants</p>
      </div>
    </div>

    <!-- Formation (uniquement les cartes possédées) -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200)">
      <label style="font-size:11px;margin-bottom:4px;display:block">Formation ${e.availableFormations.length===0?"(aucune carte — toutes disponibles)":""}</label>
      <select id="formation-select" style="width:100%;padding:7px;border-radius:6px;border:1.5px solid var(--gray-200)">
        ${s.map(l=>`<option value="${l}" ${l===e.formation?"selected":""}>${l}</option>`).join("")}
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
        ${d.map(l=>{const c=l.player;return`<div style="display:flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px">
            <span style="background:${B[c.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${c.job}</span>
            ${c.firstname} ${c.surname_encoded}
            <button style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:14px" data-remove-sub="${l.id}">✕</button>
          </div>`}).join("")}
        ${e.subs.length<5?'<button class="btn btn-ghost btn-sm" id="add-sub-btn">+ Remplaçant</button>':""}
      </div>
    </div>

    <!-- Sauvegarder -->
    <div class="page-body">
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${n<11?"disabled":""}>
        ${n<11?`Placez encore ${11-n} joueur(s)`:"💾 Enregistrer le deck"}
      </button>
    </div>
  </div>`,Fe(t,e,a,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",l=>{e.formation=l.target.value;const c=ae(e.formation),u={};c.forEach(p=>{e.slots[p]&&(u[p]=e.slots[p])}),e.slots=u,S(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>Ke(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(l=>{l.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==l.dataset.removeSub),S(t,e,i)})}),(r=document.getElementById("add-sub-btn"))==null||r.addEventListener("click",()=>{Oe(e,t,i)})}function Fe(t,e,i,o){const a=document.getElementById("deck-field");if(!a)return;const n=[i.filter(s=>s.startsWith("ATT")),i.filter(s=>s.startsWith("MIL")),i.filter(s=>s.startsWith("DEF")),i.filter(s=>s.startsWith("GK"))];a.innerHTML=n.map(s=>`
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:10px">
      ${s.map(d=>{const r=e.slots[d],l=r?e.playerCards.find(p=>p.id===r):null,c=d.replace(/\d+/,""),u=B[c];if(l){const p=l.player,m=c==="GK"?p.note_g:c==="DEF"?p.note_d:c==="MIL"?p.note_m:p.note_a,b=X(p);return`<div class="formation-slot filled" data-pos="${d}"
            style="border-color:${u};background:${u};cursor:pointer;position:relative;width:60px;height:60px">
            ${b?`<img src="${b}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.7">`:""}
            <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008">${m}</div>
            <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.surname_encoded}</div>
          </div>`}return`<div class="formation-slot" data-pos="${d}"
          style="border-color:rgba(255,255,255,0.4);cursor:pointer;width:60px;height:60px">
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${c}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>
        </div>`}).join("")}
    </div>`).join(""),a.querySelectorAll(".formation-slot").forEach(s=>{s.addEventListener("click",()=>Ne(s.dataset.pos,e,t,o))})}function Ne(t,e,i,o){var c,u;const{openModal:a,closeModal:n}=o,s=t.replace(/\d+/,""),d=Object.entries(e.slots).filter(([p,m])=>p!==t&&m).map(([,p])=>p),r=e.subs,l=e.playerCards.filter(p=>{const m=p.player;return(m.job===s||m.job2===s)&&!d.includes(p.id)&&!r.includes(p.id)});l.sort((p,m)=>{const b=s==="GK"?p.player.note_g:s==="DEF"?p.player.note_d:s==="MIL"?p.player.note_m:p.player.note_a;return(s==="GK"?m.player.note_g:s==="DEF"?m.player.note_d:s==="MIL"?m.player.note_m:m.player.note_a)-b}),a(`Choisir ${s} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${l.length>0?l.map(p=>{var f,g;const m=p.player,b=s==="GK"?m.note_g:s==="DEF"?m.note_d:s==="MIL"?m.note_m:m.note_a,$=X(m),x={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[m.rarity];return`<div class="player-option" data-card-id="${p.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${B[s]}">
            ${$?`<img src="${$}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${B[s]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${s}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${m.firstname} ${m.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${m.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${m.country_code}">
              ${(f=m.clubs)!=null&&f.logo_url?`<img src="${m.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((g=m.clubs)==null?void 0:g.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${m.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${B[s]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${x};flex-shrink:0">
            ${b}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(c=document.getElementById("close-selector"))==null||c.addEventListener("click",n),(u=document.getElementById("remove-player"))==null||u.addEventListener("click",()=>{delete e.slots[t],n(),S(i,e,o)}),document.querySelectorAll(".player-option").forEach(p=>{p.addEventListener("click",()=>{e.slots[t]=p.dataset.cardId,n(),S(i,e,o)})})}function Oe(t,e,i){var d;const{openModal:o,closeModal:a}=i,n=[...Object.values(t.slots).filter(Boolean),...t.subs],s=t.playerCards.filter(r=>!n.includes(r.id));o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${s.length>0?s.map(r=>{var p;const l=r.player,c=X(l),u=l.job==="GK"?l.note_g:l.job==="DEF"?l.note_d:l.job==="MIL"?l.note_m:l.note_a;return`<div class="player-option" data-card-id="${r.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${B[l.job]}">
            ${c?`<img src="${c}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${l.firstname} ${l.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${l.job} · ${l.country_code} · ${((p=l.clubs)==null?void 0:p.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${B[l.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${u}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(d=document.getElementById("close-sub-selector"))==null||d.addEventListener("click",a),document.querySelectorAll(".player-option").forEach(r=>{r.addEventListener("click",()=>{t.subs.push(r.dataset.cardId),a(),S(e,t,i)})})}async function Ke(t,e){const{state:i,toast:o,navigate:a}=e,n=t.formationCards.find(r=>r.formation===t.formation),s=(n==null?void 0:n.id)||t.formationCardId;await v.from("decks").update({formation:t.formation,formation_card_id:s||null}).eq("id",t.deckId),await v.from("deck_cards").delete().eq("deck_id",t.deckId);const d=[];if(Object.entries(t.slots).forEach(([r,l],c)=>{d.push({deck_id:t.deckId,card_id:l,position:r,is_starter:!0,slot_order:c})}),t.subs.forEach((r,l)=>{d.push({deck_id:t.deckId,card_id:r,position:`SUB${l+1}`,is_starter:!1,slot_order:100+l})}),d.length>0){const{error:r}=await v.from("deck_cards").insert(d);if(r){o(r.message,"error");return}}o("Deck enregistré ✅","success"),a("decks")}function ae(t){const e=O[t]||O["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const re=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],be={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Pe(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const He={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Ue={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ve(t,{state:e,navigate:i,toast:o}){var n;const a=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${re.map(s=>{const d=a>=s.cost||s.cost===0;return`<div class="booster-card ${d?"":"disabled"}" data-booster="${s.id}">
            <div class="icon">${s.icon}</div>
            <div class="name">${s.name}</div>
            <div class="desc">${s.sub}</div>
            <div class="cost">${s.costLabel}</div>
            ${d?"":'<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>'}
          </div>`}).join("")}
      </div>
      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:8px">
        <b>📌 Rappels</b><br>
        • 1er booster Players contient toujours un Gardien.<br>
        • Game Helper : carte éphémère disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(s=>{s.addEventListener("click",async()=>{const d=re.find(r=>r.id===s.dataset.booster);if(d){s.style.opacity="0.5",s.style.pointerEvents="none";try{await We(d,{state:e,toast:o,navigate:i,container:t})}catch(r){o(r.message,"error"),s.style.opacity="",s.style.pointerEvents=""}}})})}async function We(t,{state:e,toast:i,navigate:o,container:a}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await et();let n=[];t.type==="player"?n=await Ye(e.profile,t.cardCount,t.cost):t.type==="game_changer"?n=await Je(e.profile,t.cardCount,t.cost):t.type==="formation"&&(n=await Xe(e.profile,t.cost));const{data:s}=await v.from("users").select("*").eq("id",e.profile.id).single();s&&(e.profile=s),Qe(n,t,o)}async function Ye(t,e,i){if(i>0){const{error:r}=await v.from("users").update({credits:t.credits-i}).eq("id",t.id);if(r)throw r}const{data:o}=await v.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const a=o.filter(r=>r.job==="GK"),n=o.filter(r=>r.job!=="GK");let s=[];!t.first_booster_opened&&a.length>0?(s.push(a[Math.floor(Math.random()*a.length)]),s.push(...de([...n]).slice(0,e-1)),await v.from("users").update({first_booster_opened:!0}).eq("id",t.id)):s=de([...o]).slice(0,e);const{data:d}=await v.from("cards").insert(s.map(r=>({owner_id:t.id,player_id:r.id,card_type:"player"}))).select();return s.map((r,l)=>({...d[l],player:r}))}async function Je(t,e,i){const{error:o}=await v.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const a=Object.keys(be),n=Array.from({length:e},()=>a[Math.floor(Math.random()*a.length)]),{data:s}=await v.from("cards").insert(n.map(d=>({owner_id:t.id,card_type:"game_changer",gc_type:d}))).select();return s}async function Xe(t,e){const{error:i}=await v.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=o[Math.floor(Math.random()*o.length)],{data:n}=await v.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return n}function Qe(t,e,i){var s,d;const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
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
  `,document.body.appendChild(o);let a=!1;const n=document.getElementById("pack-visual");n.addEventListener("click",()=>{a||(a=!0,n.classList.add("shaking"),setTimeout(()=>{n.classList.remove("shaking"),n.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none";const r=document.getElementById("cards-phase");r.style.display="flex",r.innerHTML=t.map((l,c)=>`
          <div class="card-flip-wrapper" data-card-idx="${c}">
            <div class="card-flip-inner" id="card-flip-${c}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${Ze(l)}</div>
            </div>
          </div>`).join(""),t.forEach((l,c)=>{setTimeout(()=>{var u;(u=document.getElementById(`card-flip-${c}`))==null||u.classList.add("revealed")},c*350+300)}),setTimeout(()=>{document.getElementById("reveal-btns").style.display="flex"},t.length*350+800),r.querySelectorAll(".card-flip-wrapper").forEach(l=>{l.addEventListener("click",()=>{var c;(c=document.getElementById(`card-flip-${l.dataset.cardIdx}`))==null||c.classList.add("revealed")})})},600)},500))}),(s=document.getElementById("reveal-collection"))==null||s.addEventListener("click",()=>{o.remove(),i("collection")}),(d=document.getElementById("reveal-more"))==null||d.addEventListener("click",()=>{o.remove(),i("boosters")})}function Ze(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,a=o.job||"ATT",n=He[a]||"#1A6B3C",s=Ue[o.rarity]||"#ccc",d=a==="GK"?o.note_g:a==="DEF"?o.note_d:a==="MIL"?o.note_m:o.note_a,r=Pe(o),l={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${s};overflow:hidden;display:flex;flex-direction:column">
      <!-- Nom -->
      <div style="padding:6px 6px 2px;text-align:center;background:#f2e8d2">
        <div style="font-size:8px;letter-spacing:1px;color:#666;text-transform:uppercase">${o.firstname}</div>
        <div style="font-size:13px;font-weight:900;color:#111;line-height:1.1;font-family:Arial Black,Arial">${(o.surname_encoded||"").toUpperCase()}</div>
      </div>
      <!-- Étoile + bande poste -->
      <div style="position:relative;height:72px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
        <div style="position:absolute;top:14px;width:100%;height:26px;background:${n}"></div>
        <svg width="50" height="48" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${n}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${d||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${r?`<img src="${r}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${o.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${l}</div>
        ${(e=o.clubs)!=null&&e.logo_url?`<img src="${o.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((i=o.clubs)==null?void 0:i.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const o=be[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${o.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${o.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function et(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let i=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const a=document.getElementById("ad-cd");a&&(a.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}function de(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}const D={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}};async function tt(t,e){var k;const{state:i,navigate:o,toast:a}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation...</div>';const s=n.matchMode||"vs_ai_easy",d=s.replace("vs_ai_",""),r=s,{data:l}=await v.from("decks").select("id,name,formation_card_id").eq("owner_id",i.profile.id).eq("is_active",!0).limit(1);if(!l||l.length===0){le(t,"📋","Aucun deck actif.","Créer un deck",()=>o("decks"));return}const c=l[0],{data:u}=await v.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
          clubs(encoded_name, logo_url)))`).eq("deck_id",c.id).order("slot_order"),p=(u||[]).filter(y=>{var h;return y.is_starter&&((h=y.card)==null?void 0:h.player)}),m=(u||[]).filter(y=>{var h;return!y.is_starter&&((h=y.card)==null?void 0:h.player)});if(p.length<11){le(t,"⚠️",`Deck incomplet (${p.length}/11 titulaires).`,"Compléter",()=>o("decks"));return}const{data:b}=await v.from("cards").select("id, gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),$=(u||[]).find(y=>{var h;return((h=y.card)==null?void 0:h.card_type)==="formation"}),x=((k=$==null?void 0:$.card)==null?void 0:k.formation)||"4-4-2",f=it(p,x),g=await nt(x),{data:_}=await v.from("matches").insert({home_id:i.profile.id,away_id:null,mode:r,home_deck_id:c.id,status:"in_progress"}).select().single(),w={matchId:_==null?void 0:_.id,mode:r,difficulty:d,homeTeam:f,aiTeam:g,homeSubs:m.map(y=>xe(y.card)),homeScore:0,aiScore:0,gcCards:b||[],usedGc:[],phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},maxSubs:3};at(t,w,e)}function le(t,e,i,o,a){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",a)}function xe(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,used:!1}}function it(t,e){const i=t.map(o=>xe(o.card));return ot(i,e)}function ot(t,e){const i=D[e]||D["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const n of["GK","DEF","MIL","ATT"]){const s=[];for(let r=0;r<i[n];r++){let l=a.findIndex(c=>c.job===n);l===-1&&(l=a.findIndex(c=>c.job2===n)),l===-1&&(l=0),a[l]&&(s.push({...a[l],_line:n}),a.splice(l,1))}const d=Me(s.length);s.forEach((r,l)=>{r._col=d[l]}),o[n]=s}return o}async function nt(t,e){const{data:i}=await v.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity").eq("is_active",!0).limit(60);if(!i||i.length<11)return st(t);const o=D[t]||D["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const s of["GK","DEF","MIL","ATT"]){const d=n.filter(c=>c.job===s),r=n.filter(c=>c.job!==s),l=[...d,...r];for(let c=0;c<o[s];c++){const u=l[c]||n[c];u&&a[s].push({cardId:"ai-"+u.id+"-"+c,id:u.id,firstname:u.firstname,name:u.surname_encoded,country_code:u.country_code,club_id:u.club_id,job:u.job,job2:u.job2,note_g:Number(u.note_g)||0,note_d:Number(u.note_d)||0,note_m:Number(u.note_m)||0,note_a:Number(u.note_a)||0,rarity:u.rarity,_line:s,used:!1})}}return a}function st(t){const e=D[t]||D["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let a=0;for(const n of["GK","DEF","MIL","ATT"])for(let s=0;s<e[n];s++){const d=3+Math.floor(Math.random()*5);i[n].push({cardId:"fake-"+a,id:"fake-"+a,firstname:"IA",name:o[a%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?d:2,note_d:n==="DEF"?d:2,note_m:n==="MIL"?d:2,note_a:n==="ATT"?d:2,rarity:"normal",_line:n,used:!1}),a++}return i}function at(t,e,i){const o=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[],n=oe(o),s=oe(a);e.attacker=n>=s?"home":"ai",e.log.push({text:`Duel milieu : Vous ${n} - ${s} IA → ${e.attacker==="home"?"Vous attaquez en 1er":"L'IA attaque en 1er"}`,type:"info"}),e.phase=e.attacker==="home"?"attack":"ai-attack",M(t,e,i),e.attacker==="ai"&&setTimeout(()=>P(t,e,i),1200)}function M(t,e,i){var n,s;const o={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"";t.innerHTML=`
  <div class="match-screen">
    <div class="match-header">
      <button class="btn-icon" id="match-quit" style="color:#fff;padding:4px 8px">✕</button>
      <div style="flex:1;text-align:center">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">VOUS vs IA (${e.difficulty.toUpperCase()})</div>
        <div class="match-score">${e.homeScore} – ${e.aiScore}</div>
      </div>
      <button class="btn-icon" id="view-ai" style="color:#fff;padding:4px 8px">👁️</button>
    </div>

    <div class="match-phase">${o}</div>

    <!-- Terrain joueur -->
    <div class="match-field" id="match-field"></div>

    <!-- Game Changers -->
    ${(e.phase==="attack"||e.phase==="defense")&&e.gcCards.filter(d=>!e.usedGc.includes(d.id)).length>0?`
    <div style="padding:6px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:4px">Game Changers</div>
      <div style="display:flex;gap:6px;overflow-x:auto">
        ${e.gcCards.filter(d=>!e.usedGc.includes(d.id)).map(d=>{var r;return`
          <div class="gc-mini" data-gc-id="${d.id}" data-gc-type="${d.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;text-align:center;min-width:80px">
            <div style="font-size:16px">${((r=V[d.gc_type])==null?void 0:r.icon)||"⚡"}</div>
            <div style="font-size:8px;color:#fff;font-weight:600">${d.gc_type}</div>
          </div>`}).join("")}
      </div>
    </div>`:""}

    <!-- Actions & calcul -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(d=>`<div class="log-entry ${d.type==="goal"?"log-goal":""}">${d.text}</div>`).join("")}
    </div>
  </div>`,(n=document.getElementById("match-quit"))==null||n.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(s=document.getElementById("view-ai"))==null||s.addEventListener("click",()=>ft(e,i)),_e(t,e,i),ke(t,e,i),t.querySelectorAll(".gc-mini").forEach(d=>{d.addEventListener("click",()=>pt(d.dataset.gcId,d.dataset.gcType,t,e,i))});const a=document.getElementById("match-log");a&&(a.scrollTop=a.scrollHeight)}function _e(t,e,i){const o=document.getElementById("match-field");if(!o)return;const a=e.phase==="attack"||e.phase==="defense",n=e.phase==="attack"?["MIL","ATT"]:["GK","DEF","MIL"];e.phase==="attack"||e.phase;const s=["ATT","MIL","DEF","GK"];o.innerHTML=`<div class="match-grid">
    ${s.map(d=>{const r=e.homeTeam[d]||[];return r.length?`<div class="match-row">
        ${r.map((l,c)=>{const u=a&&n.includes(d)&&!l.used,p=e.selected.some(b=>b.cardId===l.cardId);let m;return e.phase==="attack"?m=T(l,"ATT"):e.phase==="defense"?m=d==="GK"?T(l,"GK"):T(l,"DEF"):m=T(l,d),`<div class="match-slot ${u?"selectable":""} ${p?"selected":""} ${l.used?"used":""}"
            data-card-id="${l.cardId}" data-role="${d}" data-idx="${c}">
            <div class="slot-note" style="color:${l.used?"#666":"#fff"}">${l.used?"–":m}</div>
            <div class="slot-name">${l.name}</div>
          </div>`}).join("")}
      </div>`:""}).join("")}
  </div>`,o.querySelectorAll(".match-slot.selectable").forEach(d=>{d.addEventListener("click",()=>rt(d,e,t,i))})}function rt(t,e,i,o){const a=t.dataset.cardId,n=t.dataset.role,s=parseInt(t.dataset.idx),d=e.selected.findIndex(r=>r.cardId===a);if(d!==-1)e.selected.splice(d,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const r=(e.homeTeam[n]||[]).find(l=>l.cardId===a);r&&e.selected.push({...r,_role:n,_line:n,_idx:s})}_e(i,e,o),ke(i,e,o)}function ke(t,e,i){var a,n,s,d;const o=document.getElementById("match-actions");if(o)if(e.phase==="attack"){const r=e.selected.length>0?Y(e.selected,e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${r?`ATT : <b style="color:var(--yellow);font-size:20px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base}${r.links?` +${r.links} liens`:""})${e.modifiers.home.doubleAttack?" ×2":""}</span>`:'<span style="opacity:.5">Sélectionne 1-3 attaquants/milieux adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${r?"":"disabled"}>
        Attaquer →
      </button>`,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>dt(t,e,i))}else if(e.phase==="defense"){const r=e.selected.length>0?J(e.selected.map(c=>({...c,_line:c._role})),e.modifiers.home):null,l=((n=e.pendingAttack)==null?void 0:n.total)||0;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px">L'IA attaque avec <b style="color:#ff6b6b">${l}</b></div>
        ${r?`DEF : <b style="color:var(--yellow);font-size:20px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base}${r.links?` +${r.links} liens`:""})</span>`:'<span style="opacity:.5">Sélectionne 1-3 défenseurs/GK adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${r?"":"disabled"}>
        Défendre →
      </button>`,(s=document.getElementById("confirm-defense"))==null||s.addEventListener("click",()=>lt(t,e,i))}else e.phase==="finished"?(o.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(d=document.getElementById("end-match"))==null||d.addEventListener("click",()=>i.navigate("home"))):o.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.5);padding:8px;font-size:13px">⏳ Tour de l'IA...</div>`}function dt(t,e,i){const o=Y(e.selected,e.modifiers.home);e.pendingAttack={...o,players:[...e.selected],side:"home"},e.selected.forEach(a=>{const n=(e.homeTeam[a._role]||[]).find(s=>s.cardId===a.cardId);n&&(n.used=!0)}),e.log.push({text:`Vous attaquez : ${o.total} (${e.selected.map(a=>a.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",M(t,e,i),setTimeout(()=>ct(t,e,i),1200)}function lt(t,e,i){const o=e.selected.map(s=>({...s,_line:s._role})),a=J(o,e.modifiers.home);e.selected.forEach(s=>{const d=(e.homeTeam[s._role]||[]).find(r=>r.cardId===s.cardId);d&&(d.used=!0)});const n=fe(e.pendingAttack.total,a.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${a.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${a.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,we(t,e,i,"home-attack")}function P(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=me(o,"attack",e.difficulty);if(!a.length){Ee(t,e,i);return}const n=Y(a,e.modifiers.ai);e.pendingAttack={...n,players:a,side:"ai"},a.forEach(s=>{s.used=!0}),e.log.push({text:`IA attaque : ${n.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",M(t,e,i)}function ct(t,e,i){const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=me(o,"defense",e.difficulty),n=a.length>0?J(a,e.modifiers.ai).total:0;a.forEach(d=>{d.used=!0});const s=fe(e.pendingAttack.total,n,e.modifiers.ai);s.shielded?e.log.push({text:"🛡️ Bouclier IA ! But annulé.",type:"info"}):s.goal?(e.homeScore++,e.log.push({text:`⚽ BUT VOUS ! (${e.pendingAttack.total} > ${n})`,type:"goal"})):e.log.push({text:`🧤 IA défend ! (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,we(t,e,i,"ai-attack")}function we(t,e,i,o){if(e.round++,$e(e)){H(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(s=>!s.used).length){H(t,e,i);return}e.phase="ai-attack",M(t,e,i),setTimeout(()=>P(t,e,i),800);return}e.phase="attack",M(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){Ee(t,e,i);return}e.phase="ai-attack",M(t,e,i),setTimeout(()=>P(t,e,i),800)}}function $e(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(a=>!a.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(a=>!a.used));return!e&&!i}function Ee(t,e,i){$e(e)?H(t,e,i):(e.phase="attack",M(t,e,i))}function pt(t,e,i,o,a){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier actif !",type:"info"});break;case"Ressusciter":{let n=!1;for(const s of["ATT","MIL","DEF","GK"]){const d=(o.homeTeam[s]||[]).find(r=>r.used);if(d){d.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine action IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(s=>!s.used);if(n.length){const s=n.sort((d,r)=>T(r,"ATT")-T(d,"ATT"))[0];s.used=!0,o.log.push({text:`❄️ ${s.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement",type:"info"});break}v.from("cards").delete().eq("id",t).then(()=>{}),M(i,o,a)}}async function H(t,e,i){e.phase="finished";const{state:o}=i,a=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,s=a?"victoire":n?"nul":"defaite",d=Be(e.mode,s);e.log.push({text:a?`🏆 Victoire ! +${d} cr.`:n?`🤝 Nul. +${d} cr.`:`❌ Défaite. +${d} cr.`,type:"goal"}),e.matchId&&await v.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?o.profile.id:null,home_credits_reward:d,played_at:new Date().toISOString()}).eq("id",e.matchId);const r={credits:(o.profile.credits||0)+d,matches_played:(o.profile.matches_played||0)+1};a?r.wins=(o.profile.wins||0)+1:n?r.draws=(o.profile.draws||0)+1:r.losses=(o.profile.losses||0)+1,await v.from("users").update(r).eq("id",o.profile.id),await i.refreshProfile(),M(t,e,i),ut(t,e,{isWin:a,isDraw:n,rewards:d},i)}function ut(t,e,{isWin:i,isDraw:o,rewards:a},n){var d,r;const s=document.createElement("div");s.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",s.innerHTML=`
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${i?"🏆":o?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${i?"Victoire !":o?"Match nul":"Défaite"}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${e.homeScore} – ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${a.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`,document.body.appendChild(s),(d=document.getElementById("res-home"))==null||d.addEventListener("click",()=>{s.remove(),n.navigate("home")}),(r=document.getElementById("res-replay"))==null||r.addEventListener("click",()=>{s.remove(),n.navigate("match",{matchMode:e.mode})})}function ft(t,e){const i=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${i.map(o=>{const a=t.aiTeam[o]||[];return a.length?`<div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px">
          ${a.map(n=>{const s=T(n,o);return`<div class="match-slot ${n.used?"used":""}" style="cursor:default">
              <div class="slot-note">${n.used?"–":s}</div>
              <div class="slot-name">${n.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const mt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function vt(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await Q(t,e)}async function Q(t,e){const{state:i,toast:o}=e,{data:a}=await v.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),n=(a||[]).filter(r=>r.seller_id===i.profile.id),s=(a||[]).filter(r=>r.seller_id!==i.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${s.length} carte(s) en vente · Solde : ${(i.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${n.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function d(r){const l=document.getElementById("mkt-content"),c=r==="buy"?s:n;if(c.length===0){l.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${r==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}l.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(u=>{var x,f,g;const p=(x=u.card)==null?void 0:x.player;if(!p)return"";const m=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,b=mt[p.rarity],$=(i.profile.credits||0)>=u.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${ht(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${b};flex-shrink:0">${m}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((f=p.clubs)==null?void 0:f.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((g=u.seller)==null?void 0:g.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${u.price.toLocaleString("fr")}</div>
            ${r==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${u.id}" ${$?"":"disabled"} style="margin-top:4px">${$?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${u.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,l.querySelectorAll("[data-buy]").forEach(u=>{u.addEventListener("click",()=>gt(u.dataset.buy,c,t,e))}),l.querySelectorAll("[data-cancel]").forEach(u=>{u.addEventListener("click",()=>yt(u.dataset.cancel,t,e))})}d("buy"),t.querySelectorAll(".mkt-tab").forEach(r=>{r.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(l=>{const c=l===r;l.style.background=c?"var(--green)":"#fff",l.style.color=c?"#fff":"var(--gray-600)",l.style.borderColor=c?"var(--green)":"var(--gray-200)"}),d(r.dataset.tab)})})}async function gt(t,e,i,o){const{state:a,toast:n,refreshProfile:s}=o,d=e.find(r=>r.id===t);if(d){if((a.profile.credits||0)<d.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${d.card.player.firstname} ${d.card.player.surname_encoded} pour ${d.price.toLocaleString("fr")} crédits ?`))try{const{error:r}=await v.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",d.card.id);if(r)throw r;await v.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await v.from("users").update({credits:(a.profile.credits||0)-d.price}).eq("id",a.profile.id);const{data:l}=await v.from("users").select("credits").eq("id",d.seller_id).single();l&&await v.from("users").update({credits:(l.credits||0)+d.price}).eq("id",d.seller_id),await v.from("notifications").insert({user_id:d.seller_id,type:"card_sold",message:`Ta carte ${d.card.player.surname_encoded} a été vendue pour ${d.price} crédits !`,data:{card_id:d.card.id,price:d.price}}),await s(),n("Carte achetée ! ✅","success"),Q(i,o)}catch(r){n("Erreur : "+r.message,"error")}}}async function yt(t,e,i){const{toast:o}=i,{data:a}=await v.from("market_listings").select("card_id").eq("id",t).single();await v.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await v.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),o("Annonce retirée","success"),Q(e,i)}function ht(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function bt(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await v.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${a&&a.length>0?a.map((n,s)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${n.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${s+1}</div>
            <div style="flex:1">
              <div style="font-weight:700">${n.pseudo}</div>
              <div style="font-size:11px;color:var(--gray-600)">${n.club_name}</div>
            </div>
            <div style="text-align:right;font-size:12px">
              <div>🥇${n.trophies_top1} 🥈${n.trophies_top2} 🥉${n.trophies_top3}</div>
              <div style="color:var(--gray-600)">${n.wins} V</div>
            </div>
          </div>
        `).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun manager.</div>'}
      </div>
    </div>
  </div>
  `}const E={user:null,profile:null,page:"home",params:{}};function G(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function xt(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function U(){document.getElementById("modal-overlay").classList.add("hidden")}async function q(){if(!E.user)return;const{data:t}=await v.from("users").select("*").eq("id",E.user.id).single();t&&(E.profile=t)}function R(t,e={}){E.page=t,E.params=e,Ae()}async function Ae(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===E.page)});const e=document.getElementById("nav-credits");e&&E.profile&&(e.textContent=`💰 ${(E.profile.credits||0).toLocaleString("fr")}`);const i={state:E,navigate:R,toast:G,openModal:xt,closeModal:U,refreshProfile:q};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',E.page){case"home":await te(t,i);break;case"collection":await De(t,i);break;case"decks":await he(t,i);break;case"boosters":await Ve(t,i);break;case"match":await tt(t,i);break;case"market":await vt(t,i);break;case"rankings":await bt(t,i);break;default:await te(t,i)}}function _t(){const t=document.getElementById("app"),e=E.profile,i=(e.club_name||"MW").split(" ").filter(Boolean);i.length>=2?(i[0][0]+i[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault(),R(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>R("home")),document.getElementById("nav-credits").addEventListener("click",()=>R("boosters"))}async function kt(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&U()}),document.getElementById("modal-close").addEventListener("click",U);const{data:{session:t}}=await v.auth.getSession();if(!t){ue(),Z(document.getElementById("app"),{navigate:ce,toast:G});return}if(E.user=t.user,await q(),ue(),!E.profile){Ie(document.getElementById("app"),{state:E,navigate:wt,toast:G,refreshProfile:q});return}E.profile.first_booster_opened||(await $t(E.user.id),await q()),Te(),v.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(E.user=null,E.profile=null,document.getElementById("app").innerHTML="",Z(document.getElementById("app"),{navigate:ce,toast:G}))})}function Te(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",_t(),Ae()}function ce(){window.location.reload()}async function wt(){await q(),Te()}async function $t(t){const{data:e}=await v.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:i}=await v.from("players").select("id,job").eq("is_active",!0);if(!i||i.length===0)return;const o=i.filter(d=>d.job==="GK"),a=i.filter(d=>d.job!=="GK"),n=[];for(let d=0;d<5;d++){let r=[];d===0&&o.length>0?(r.push(o[Math.floor(Math.random()*o.length)]),r.push(...pe([...a]).slice(0,3))):r=pe([...i]).slice(0,4),r.forEach(l=>n.push({owner_id:t,player_id:l.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(d=>{n.push({owner_id:t,card_type:"game_changer",gc_type:d})});const s=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:s[Math.floor(Math.random()*s.length)]}),await v.from("cards").insert(n),await v.from("users").update({first_booster_opened:!0}).eq("id",t),G("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function pe(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function ue(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}kt();
