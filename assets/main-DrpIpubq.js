import{s as h}from"./supabase-z_u0vv5N.js";function ye(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!a){n.textContent="Remplissez tous les champs.";return}const s=document.getElementById("login-btn");s.textContent="Connexion…",s.disabled=!0;const{error:l}=await h.auth.signInWithPassword({email:o,password:a});if(s.textContent="Se connecter",s.disabled=!1,l){n.textContent=l.message.includes("Invalid")?"Email ou mot de passe incorrect.":l.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,s=document.getElementById("reg-error");if(s.textContent="",!o||!a||!n){s.textContent="Remplissez tous les champs.";return}if(a.length<6){s.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==n){s.textContent="Les mots de passe ne correspondent pas.";return}const l=document.getElementById("reg-btn");l.textContent="Création…",l.disabled=!0;const{error:r}=await h.auth.signUp({email:o,password:a});if(l.textContent="Créer mon compte",l.disabled=!1,r){s.textContent=r.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Xe(t,{state:e,navigate:i,toast:o,refreshProfile:a}){let n="#1A6B3C",s="#D4A017";t.innerHTML=`
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
  `;function l(){var _;const d=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),f=((_=document.getElementById("setup-club"))==null?void 0:_.value)||"MW",p=f.trim().split(" ").filter(Boolean),u=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():f.slice(0,2).toUpperCase();d&&(d.style.background=s,d.style.borderColor=n),c&&(c.textContent=u,c.style.color=n)}document.getElementById("color1").addEventListener("input",d=>{n=d.target.value,document.getElementById("swatch1").style.background=n,l()}),document.getElementById("color2").addEventListener("input",d=>{s=d.target.value,document.getElementById("swatch2").style.background=s,l()});function r(d){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${d}`).classList.add("active"),document.getElementById("step-num").textContent=d,document.getElementById("progress-fill").style.width=`${Math.round(d/3*100)}%`,d===3&&l()}document.getElementById("step1-next").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",d.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:f}=await h.from("users").select("id").eq("pseudo",d).maybeSingle();if(f){c.textContent="Ce pseudo est déjà pris.";return}r(2)}),document.getElementById("step2-back").addEventListener("click",()=>r(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const d=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",d.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:f}=await h.from("users").select("id").eq("club_name",d).maybeSingle();if(f){c.textContent="Ce nom de club est déjà pris.";return}r(3)}),document.getElementById("step3-back").addEventListener("click",()=>r(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),f=document.getElementById("step3-error"),p=document.getElementById("step3-finish");f.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:u}=await h.from("users").insert({id:e.user.id,pseudo:d,club_name:c,club_color1:n,club_color2:s,credits:1e4});if(u)throw u;await Qe(e.user.id),await a(),o(`Bienvenue ${d} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(u){f.textContent=u.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function Qe(t){const{data:e}=await h.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(r=>r.job==="GK"),a=i.filter(r=>r.job!=="GK"),n=[];for(let r=0;r<5;r++){let d=[];if(r===0&&o.length>0){const c=o[Math.floor(Math.random()*o.length)];d.push(c);const f=ge([...a]).slice(0,3);d.push(...f)}else d=ge([...i]).slice(0,4);d.forEach(c=>{n.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(r=>{n.push({owner_id:t,card_type:"game_changer",gc_type:r})});const l=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:l[Math.floor(Math.random()*l.length)]}),n.length>0&&await h.from("cards").insert(n),await h.from("users").update({first_booster_opened:!0}).eq("id",t)}function ge(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function me(t,{state:e,navigate:i,toast:o}){const a=e.profile;if(!a)return;const{data:n}=await h.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),s=(a.club_name||"MW").split(" ").filter(Boolean),l=s.length>=2?(s[0][0]+s[1][0]).toUpperCase():(a.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
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
          <span style="color:${a.club_color1}">${l}</span>
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
          ${n.map(r=>{const d=r.winner_id===a.id,c=r.home_score===r.away_score,f=c?"N":d?"V":"D",p=c?"#888":d?"#1A6B3C":"#c0392b",u={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[r.mode]||r.mode,k=new Date(r.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${u}</div>
                <div style="font-size:11px;color:var(--gray-600)">${k}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${r.home_score} - ${r.away_score}</span>
                <span style="background:${p};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${f}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(r=>{r.addEventListener("click",d=>{d.preventDefault(),i(r.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.action;if(d==="championship"){o("Championnats — bientôt disponibles","info");return}if(d==="match-random"){o("Matchmaking aléatoire — bientôt disponible","info");return}if(d==="match-friend"){o("Défi ami — bientôt disponible","info");return}d==="match-ai"&&Ze(i)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await h.auth.signOut(),window.location.reload()})}function Ze(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
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
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{o(),t("match",{matchMode:a.dataset.mode})})})}const ne={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function M(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const he=["ATT","MIL","DEF","GK"];function Le(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let a=o+1;a<i;a++){const n=t[o],s=t[a];if(!n||!s)continue;const l=n._col!==void 0&&s._col!==void 0&&n._col===s._col,r=n._col!==void 0&&s._col!==void 0&&Math.abs(n._col-s._col)===1,d=he.indexOf(n._line),c=he.indexOf(s._line),f=Math.abs(d-c)===1;(n._line===s._line&&r||l&&f)&&(n.country_code&&s.country_code&&n.country_code===s.country_code&&e++,n.club_id&&s.club_id&&n.club_id===s.club_id&&e++)}return e}function se(t,e={}){const i=t.reduce((n,s)=>{const l=s._line||s.job;return n+Number(l==="MIL"?s.note_m:s.note_a)||0},0),o=Le(t);let a=i+o;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function re(t,e={}){const i=t.reduce((n,s)=>{const l=s._line||s.job;let r=0;return l==="GK"?r=Number(s.note_g)||0:l==="MIL"?r=Number(s.note_m)||0:r=Number(s.note_d)||0,n+r},0),o=Le(t);let a=i+o;return e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function Te(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function Ce(t,e,i="easy"){const o=t.filter(s=>!s.used);if(!o.length)return[];const a=[...o].sort((s,l)=>{const r=e==="attack"?M(s,"ATT"):s._line==="GK"?M(s,"GK"):M(s,"DEF");return(e==="attack"?M(l,"ATT"):l._line==="GK"?M(l,"GK"):M(l,"DEF"))-r});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return a.slice(0,Math.min(n,a.length,3))}function et(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const Me={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},J={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},be=["GK","DEF","MIL","ATT"],tt=["Tous","GK","DEF","MIL","ATT"],it={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},Be={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function je(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function X(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function ot(t,e=""){var f,p;const i=t.player;if(!i)return"";const o=i.job||"ATT",a=J[o],n=Me[i.rarity]||"#ccc",s=X(i,o),l=i.job2?X(i,i.job2):null,r=i.job2?J[i.job2]:null,d=je(i),c=Be[i.country_code]||i.country_code||"";return`
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
        ${l!==null?`
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${r}" stroke="white" stroke-width="1.5"/>
          <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${l}</text>
        </svg>`:""}
      </div>
      <!-- Portrait -->
      <div style="height:106px;overflow:hidden;background:#b8d4f0;position:relative">
        ${d?`<img src="${d}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
               onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:26px;gap:4px">
        <img src="https://flagsapi.com/${i.country_code}/flat/32.png"
          style="width:20px;height:14px;border-radius:2px;object-fit:cover;flex-shrink:0"
          onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555;flex:1;text-align:center">${c}</div>
        ${(f=i.clubs)!=null&&f.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((p=i.clubs)==null?void 0:p.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}async function nt(t,e){const{state:i,navigate:o,toast:a,openModal:n,closeModal:s}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:l}=await h.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),r=(l||[]).filter(v=>v.card_type==="player"&&v.player),d=(l||[]).filter(v=>v.card_type==="game_changer"),c=(l||[]).filter(v=>v.card_type==="formation"),f={};r.forEach(v=>{const g=v.player.id;f[g]=(f[g]||0)+1});let p="Tous",u="";function _(){return[...r].sort((v,g)=>{const y=be.indexOf(v.player.job),b=be.indexOf(g.player.job);return y!==b?y-b:(v.player.surname_encoded||"").localeCompare(g.player.surname_encoded||"")})}function k(){return _().filter(v=>{const g=v.player,y=p==="Tous"||g.job===p,b=!u||`${g.firstname} ${g.surname_encoded}`.toLowerCase().includes(u);return y&&b})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${r.length} carte(s) joueur · ${d.length} Game Changer · ${c.length} Formation</p>
    </div>

    <!-- Cartes spéciales (cliquables) -->
    ${d.length>0||c.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">

        ${d.map(v=>{var g;return`
          <div data-gc-id="${v.id}" data-gc-type="${v.gc_type}" style="
            background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            <div style="font-size:28px">${((g=ne[v.gc_type])==null?void 0:g.icon)||"⚡"}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${v.gc_type}</div>
          </div>`}).join("")}

        ${c.map(v=>`
          <div data-form-id="${v.id}" data-formation="${v.formation}" style="
            background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${v.formation}</div>
          </div>`).join("")}

      </div>
    </div>`:""}

    <!-- Filtres -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${tt.map(v=>`
          <button class="filter-btn" data-job="${v}"
            style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${v===p?"var(--green)":"var(--gray-200)"};
              background:${v===p?"var(--green)":"#fff"};
              color:${v===p?"#fff":"var(--gray-600)"}">
            ${v}
          </button>`).join("")}
      </div>
    </div>

    <!-- Grille cartes joueurs -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function m(){const v=k(),g=document.getElementById("col-grid");if(!g)return;if(!v.length){g.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const y={},b=[];v.forEach(x=>{const w=x.player.id;y[w]||(y[w]=!0,b.push(x))}),g.innerHTML=b.map(x=>{const w=f[x.player.id]||1,$=w>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${w}</div>`:"",C=r.filter(I=>I.player.id===x.player.id&&I.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return ot(x,$+C)}).join(""),g.querySelectorAll("[data-card-id]").forEach(x=>{x.addEventListener("click",()=>{const w=r.find($=>$.id===x.dataset.cardId);w&&at(w,r,f,e)})})}m(),t.querySelectorAll(".filter-btn").forEach(v=>{v.addEventListener("click",()=>{p=v.dataset.job,t.querySelectorAll(".filter-btn").forEach(g=>{const y=g.dataset.job===p;g.style.background=y?"var(--green)":"#fff",g.style.color=y?"#fff":"var(--gray-600)",g.style.borderColor=y?"var(--green)":"var(--gray-200)"}),m()})}),document.getElementById("col-search").addEventListener("input",v=>{u=v.target.value.toLowerCase(),m()}),t.querySelectorAll("[data-gc-id]").forEach(v=>{v.addEventListener("click",()=>st(v.dataset.gcType,n))}),t.querySelectorAll("[data-form-id]").forEach(v=>{v.addEventListener("click",()=>rt(v.dataset.formation,n))})}function st(t,e){const i=ne[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function rt(t,e){const i={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},o={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},a=i[t]||i["4-4-2"],n=["ATT","MIL","DEF","GK"];function s(d,c){const _=(d-1)*54,k=(c-_)/2;return Array.from({length:d},(m,v)=>k+v*54)}function l(d){return d===1?[1]:d===2?[0,2]:d===3?[0,1,2]:d===4?[0,1,1,2]:d===5?[0,1,1,1,2]:[1]}function r(){const p=n.length*72+48,u=n.map((v,g)=>24+g*72+72/2),_={};n.forEach(v=>{_[v]=s(a[v],290)});function k(v,g){const y=a[v],b=l(y),x=_[v],w=b.indexOf(g);return w>=0?x[w]:null}let m=`<svg width="290" height="${p}" viewBox="0 0 290 ${p}" xmlns="http://www.w3.org/2000/svg">`;n.forEach((v,g)=>{const y=_[v];for(let b=0;b<y.length-1;b++){const x=y[b]+20,w=y[b+1]-20,$=u[g];m+=`<line x1="${x}" y1="${$}" x2="${w}" y2="${$}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,m+=`<text x="${(x+w)/2}" y="${$-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`}});for(let v=0;v<3;v++)for(let g=0;g<n.length-1;g++){const y=n[g],b=n[g+1],x=k(y,v),w=k(b,v);if(x!==null&&w!==null){const $=(x+w)/2;m+=`<line x1="${x}" y1="${u[g]+20}" x2="${w}" y2="${u[g+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,m+=`<text x="${$+6}" y="${(u[g]+u[g+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`}}return n.forEach((v,g)=>{const y=a[v],b=_[v],x=l(y),w=o[v],$=u[g],T={};x.forEach((C,I)=>{T[C]||(T[C]={xs:[],indices:[]}),T[C].xs.push(b[I]),T[C].indices.push(I)}),Object.entries(T).forEach(([C,I])=>{const A=I.xs.length;if(A>1){const E=I.xs.reduce((S,R)=>S+R,0)/A;m+=`<circle cx="${E}" cy="${$}" r="20" fill="${w}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,m+=`<text x="${E}" y="${$-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${v}</text>`,m+=`<text x="${E}" y="${$+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${A}</text>`}else{const E=I.xs[0],S=I.indices[0]+1;m+=`<circle cx="${E}" cy="${$}" r="20" fill="${w}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,m+=`<text x="${E}" y="${$+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${v}</text>`,m+=`<text x="${E}" y="${$+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${v}${S}</text>`}})}),m+="</svg>",m}e(`Formation ${t}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${r()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function at(t,e,i,o){var w,$,T,C,I,A;const{state:a,toast:n,openModal:s,closeModal:l,navigate:r,refreshProfile:d}=o,c=t.player,f=e.filter(E=>E.player.id===c.id),p=f.length,u=it[c.rarity]||1e3,_=c.rarity!=="legende",k=je(c),m=X(c,c.job),v=c.job2?X(c,c.job2):null,g=J[c.job]||"#1A6B3C",y=c.job2?J[c.job2]:null,b=Me[c.rarity]||"#ccc",x=Be[c.country_code]||c.country_code||"";s(`${c.firstname} ${c.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${b};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${c.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(c.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${g}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${g}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${m}</text>
            </svg>
            ${v!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${y}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${v}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${k?`<img src="${k}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${c.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${x}</div>
            ${(w=c.clubs)!=null&&w.logo_url?`<img src="${c.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${((($=c.clubs)==null?void 0:$.encoded_name)||"").slice(0,6)}</div>`}
          </div>
        </div>
      </div>

      <!-- Infos -->
      <div style="flex:1;min-width:160px;display:flex;flex-direction:column;gap:10px">
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">RARETÉ</div>
          <div style="font-weight:700;color:${b}">${c.rarity.toUpperCase()}</div>
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
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${u.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${p-1} carte${p-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-btn" ${p<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${_&&!t.is_for_sale?`
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
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(T=document.getElementById("close-detail"))==null||T.addEventListener("click",l),(C=document.getElementById("direct-sell-btn"))==null||C.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${c.surname_encoded} pour ${u.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const E=f.find(R=>!R.is_for_sale)||f[0];if(!E){n("Aucune carte à vendre","error");return}const{error:S}=await h.from("cards").delete().eq("id",E.id);if(S){n(S.message,"error");return}await h.from("users").update({credits:(a.profile.credits||0)+u}).eq("id",a.profile.id),await d(),n(`+${u.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),l(),r("collection")}),(I=document.getElementById("market-sell-btn"))==null||I.addEventListener("click",async()=>{const E=parseInt(document.getElementById("sell-price").value);if(!E||E<1){n("Prix invalide","error");return}await h.from("cards").update({is_for_sale:!0,sale_price:E}).eq("id",t.id),await h.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:E}),n("Carte mise en vente sur le marché !","success"),l(),r("collection")}),(A=document.getElementById("cancel-sell-btn"))==null||A.addEventListener("click",async()=>{await h.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await h.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),l(),r("collection")})}const F={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},q={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function ae(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function ze(t,e){const{state:i,navigate:o,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await h.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
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
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const s=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!s)return;const{data:l,error:r}=await h.from("decks").insert({owner_id:i.profile.id,name:s,is_active:!(n!=null&&n.length)}).select().single();if(r){a(r.message,"error");return}a("Deck créé !","success"),xe(l.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(s=>{s.addEventListener("click",()=>xe(s.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(s=>{s.addEventListener("click",async()=>{await h.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await h.from("decks").update({is_active:!0}).eq("id",s.dataset.activate),a("Deck activé !","success"),ze(t,e)})})}async function xe(t,e,i){const{state:o,toast:a}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await h.from("decks").select("*").eq("id",t).single(),{data:s}=await h.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),l=(s||[]).filter(u=>u.card_type==="player"&&u.player),r=(s||[]).filter(u=>u.card_type==="formation"),d=r.map(u=>u.formation).filter(Boolean),{data:c}=await h.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let f=n.formation||"4-4-2";d.length>0&&!d.includes(f)&&(f=d[0]);const p={deckId:t,name:n.name,formation:f,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:l,formationCards:r,availableFormations:d};(c||[]).forEach(u=>{u.is_starter?p.slots[u.position]=u.card_id:p.subs.includes(u.card_id)||p.subs.push(u.card_id)}),O(e,p,i)}function O(t,e,i){var r;const{navigate:o}=i;F[e.formation];const a=_e(e.formation),n=a.filter(d=>e.slots[d]).length,s=e.availableFormations.length>0?e.availableFormations:Object.keys(F),l=e.subs.map(d=>e.playerCards.find(c=>c.id===d)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
        ${s.map(d=>`<option value="${d}" ${d===e.formation?"selected":""}>${d}</option>`).join("")}
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
        ${l.map(d=>{const c=d.player;return`<div style="display:flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px">
            <span style="background:${q[c.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${c.job}</span>
            ${c.firstname} ${c.surname_encoded}
            <button style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:14px" data-remove-sub="${d.id}">✕</button>
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
  </div>`,dt(t,e,a,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",d=>{e.formation=d.target.value;const c=_e(e.formation),f={};c.forEach(p=>{e.slots[p]&&(f[p]=e.slots[p])}),e.slots=f,O(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>pt(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(d=>{d.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==d.dataset.removeSub),O(t,e,i)})}),(r=document.getElementById("add-sub-btn"))==null||r.addEventListener("click",()=>{ct(e,t,i)})}function dt(t,e,i,o){const a=document.getElementById("deck-field");if(!a)return;const s=["ATT","MIL","DEF","GK"].map(y=>i.filter(b=>b.startsWith(y))),l=F[e.formation]||F["4-4-2"];function r(y){return y===1?[1]:y===2?[0,2]:y===3?[0,1,2]:y===4?[0,1,1,2]:y===5?[0,1,1,1,2]:[1]}function d(y){var x;const b=e.slots[y];return b&&((x=e.playerCards.find(w=>w.id===b))==null?void 0:x.player)||null}function c(y,b){if(!y||!b)return"#cc2222";const x=y.country_code&&b.country_code&&y.country_code===b.country_code,w=y.club_id&&b.club_id&&y.club_id===b.club_id;return x&&w?"#00e676":x||w?"#D4A017":"#cc2222"}function f(y,b){return y&&Number(b==="GK"?y.note_g:b==="DEF"?y.note_d:b==="MIL"?y.note_m:y.note_a)||0}const p=s.find(y=>{var b;return(b=y[0])==null?void 0:b.startsWith("MIL")})||[];let u=0,_=0;p.forEach(y=>{u+=f(d(y),"MIL")});for(let y=0;y<p.length-1;y++)c(d(p[y]),d(p[y+1]))!=="#cc2222"&&_++;const k=60,m=60,v=12;a.innerHTML=`
    <div id="deck-terrain" style="position:relative;display:inline-block;width:100%">
      ${p.length>0?`
        <div style="position:absolute;top:6px;right:8px;z-index:10;
          background:rgba(212,160,23,0.9);color:#000;border-radius:8px;
          padding:3px 8px;font-size:11px;font-weight:900;pointer-events:none">
          MIL ${u}${_>0?` +${_}`:""} ⚡
        </div>`:""}
      <div id="deck-rows" style="display:flex;flex-direction:column;gap:0;align-items:center;padding:28px 0 8px"></div>
      <svg id="deck-links-svg" style="position:absolute;inset:0;pointer-events:none;overflow:visible" width="100%" height="100%"></svg>
    </div>`;const g=document.getElementById("deck-rows");s.forEach((y,b)=>{var T;const x=((T=y[0])==null?void 0:T.replace(/\d+/,""))||"ATT",w=document.createElement("div");w.style.cssText="display:flex;align-items:center;justify-content:center;gap:0;position:relative",w.dataset.lineIdx=b,y.forEach((C,I)=>{const A=d(C),E=q[x],S=A?f(A,x):null,R=A?ae(A):null,B=document.createElement("div");if(B.className=A?"formation-slot filled":"formation-slot",B.dataset.pos=C,B.dataset.lineIdx=b,B.dataset.slotIdx=I,B.style.cssText=`border-color:${A?E:"rgba(255,255,255,0.4)"};background:${A?E:"transparent"};cursor:pointer;position:relative;width:${k}px;height:${m}px;flex-shrink:0;`,A&&R){const j=document.createElement("img");j.src=R,j.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.75",B.appendChild(j)}if(A?B.innerHTML+=`
          <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008;line-height:1">${S}</div>
          <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px">${A.surname_encoded}</div>`:B.innerHTML=`
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${x}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>`,w.appendChild(B),I<y.length-1){const j=c(A,d(y[I+1])),G=document.createElement("div");G.style.cssText=`width:${v}px;height:4px;border-radius:2px;background:${j};flex-shrink:0;box-shadow:0 0 5px ${j};opacity:0.9;`,w.appendChild(G)}}),g.appendChild(w);const $=document.createElement("div");$.style.cssText="height:8px",g.appendChild($)}),requestAnimationFrame(()=>{var w,$;const y=document.getElementById("deck-links-svg"),b=document.getElementById("deck-terrain");if(!y||!b)return;const x=b.getBoundingClientRect();y.setAttribute("height",x.height);for(let T=0;T<s.length-1;T++){const C=s[T],I=s[T+1],A=((w=C[0])==null?void 0:w.replace(/\d+/,""))||"ATT",E=(($=I[0])==null?void 0:$.replace(/\d+/,""))||"DEF",S=r(l[A]||1),R=r(l[E]||1),B=new Set;for(let j=0;j<C.length;j++)for(let G=0;G<I.length;G++){const Pe=S[j],Ke=R[G];if(Math.abs(Pe-Ke)>1)continue;const ce=`${j}-${G}`;if(B.has(ce))continue;B.add(ce);const pe=C[j],ue=I[G],He=d(pe),Ue=d(ue),U=c(He,Ue),fe=a.querySelector(`[data-pos="${pe}"]`),ve=a.querySelector(`[data-pos="${ue}"]`);if(!fe||!ve)continue;const W=fe.getBoundingClientRect(),Q=ve.getBoundingClientRect(),V=x,We=W.left-V.left+W.width/2,Ve=W.top-V.top+W.height,Ye=Q.left-V.left+Q.width/2,Je=Q.top-V.top,D=document.createElementNS("http://www.w3.org/2000/svg","line");D.setAttribute("x1",We),D.setAttribute("y1",Ve),D.setAttribute("x2",Ye),D.setAttribute("y2",Je),D.setAttribute("stroke",U),D.setAttribute("stroke-width","3"),D.setAttribute("stroke-linecap","round"),D.setAttribute("opacity",U==="#cc2222"?"0.35":"0.85"),U!=="#cc2222"&&D.setAttribute("filter",`drop-shadow(0 0 3px ${U})`),y.appendChild(D)}}}),a.querySelectorAll(".formation-slot").forEach(y=>{y.addEventListener("click",()=>lt(y.dataset.pos,e,t,o))})}function lt(t,e,i,o){var p,u,_;const{openModal:a,closeModal:n}=o,s=t.replace(/\d+/,""),l=e.slots[t],r=l?e.playerCards.find(k=>k.id===l):null;(p=r==null?void 0:r.player)==null||p.id;const d=new Set;Object.entries(e.slots).forEach(([k,m])=>{var g;if(k===t||!m)return;const v=e.playerCards.find(y=>y.id===m);(g=v==null?void 0:v.player)!=null&&g.id&&d.add(v.player.id)}),e.subs.forEach(k=>{var v;const m=e.playerCards.find(g=>g.id===k);(v=m==null?void 0:m.player)!=null&&v.id&&d.add(m.player.id)});const c=new Set,f=e.playerCards.filter(k=>{const m=k.player;return!(m.job===s||m.job2===s)||d.has(m.id)||c.has(m.id)?!1:(c.add(m.id),!0)});f.sort((k,m)=>{const v=s==="GK"?k.player.note_g:s==="DEF"?k.player.note_d:s==="MIL"?k.player.note_m:k.player.note_a;return(s==="GK"?m.player.note_g:s==="DEF"?m.player.note_d:s==="MIL"?m.player.note_m:m.player.note_a)-v}),a(`Choisir ${s} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${f.length>0?f.map(k=>{var b,x;const m=k.player,v=s==="GK"?m.note_g:s==="DEF"?m.note_d:s==="MIL"?m.note_m:m.note_a,g=ae(m),y={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[m.rarity];return`<div class="player-option" data-card-id="${k.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${q[s]}">
            ${g?`<img src="${g}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${q[s]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${s}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${m.firstname} ${m.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${m.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${m.country_code}">
              ${(b=m.clubs)!=null&&b.logo_url?`<img src="${m.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((x=m.clubs)==null?void 0:x.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${m.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${q[s]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${y};flex-shrink:0">
            ${v}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(u=document.getElementById("close-selector"))==null||u.addEventListener("click",n),(_=document.getElementById("remove-player"))==null||_.addEventListener("click",()=>{delete e.slots[t],n(),O(i,e,o)}),document.querySelectorAll(".player-option").forEach(k=>{k.addEventListener("click",()=>{e.slots[t]=k.dataset.cardId,n(),O(i,e,o)})})}function ct(t,e,i){var r;const{openModal:o,closeModal:a}=i,n=new Set;Object.values(t.slots).filter(Boolean).forEach(d=>{var f;const c=t.playerCards.find(p=>p.id===d);(f=c==null?void 0:c.player)!=null&&f.id&&n.add(c.player.id)}),t.subs.forEach(d=>{var f;const c=t.playerCards.find(p=>p.id===d);(f=c==null?void 0:c.player)!=null&&f.id&&n.add(c.player.id)});const s=new Set,l=t.playerCards.filter(d=>{var c,f,p;return n.has((c=d.player)==null?void 0:c.id)||s.has((f=d.player)==null?void 0:f.id)?!1:(s.add((p=d.player)==null?void 0:p.id),!0)});o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${l.length>0?l.map(d=>{var u;const c=d.player,f=ae(c),p=c.job==="GK"?c.note_g:c.job==="DEF"?c.note_d:c.job==="MIL"?c.note_m:c.note_a;return`<div class="player-option" data-card-id="${d.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${q[c.job]}">
            ${f?`<img src="${f}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${c.firstname} ${c.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${c.job} · ${c.country_code} · ${((u=c.clubs)==null?void 0:u.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${q[c.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${p}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(r=document.getElementById("close-sub-selector"))==null||r.addEventListener("click",a),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),a(),O(e,t,i)})})}async function pt(t,e){const{state:i,toast:o,navigate:a}=e,n=t.formationCards.find(r=>r.formation===t.formation),s=(n==null?void 0:n.id)||t.formationCardId;await h.from("decks").update({formation:t.formation,formation_card_id:s||null}).eq("id",t.deckId),await h.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([r,d],c)=>{l.push({deck_id:t.deckId,card_id:d,position:r,is_starter:!0,slot_order:c})}),t.subs.forEach((r,d)=>{l.push({deck_id:t.deckId,card_id:r,position:`SUB${d+1}`,is_starter:!1,slot_order:100+d})}),l.length>0){const{error:r}=await h.from("deck_cards").insert(l);if(r){o(r.message,"error");return}}o("Deck enregistré ✅","success"),a("decks")}function _e(t){const e=F[t]||F["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const we=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],Se={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function ut(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const ft={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},vt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function yt(t,{state:e,navigate:i,toast:o}){var n;const a=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${we.map(s=>{const l=a>=s.cost||s.cost===0,r=s.id==="players_std"||s.id==="players_pub";return`<div class="booster-card ${l?"":"disabled"}" data-booster="${s.id}" style="position:relative">
            ${r?`<button class="booster-info-btn" data-info="${s.id}"
              style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;
              background:rgba(0,0,0,0.15);border:none;cursor:pointer;font-size:11px;font-weight:700;
              color:var(--gray-600);display:flex;align-items:center;justify-content:center;z-index:2"
              onclick="event.stopPropagation()">ℹ</button>`:""}
            <div class="icon">${s.icon}</div>
            <div class="name">${s.name}</div>
            <div class="desc">${s.sub}</div>
            <div class="cost">${s.costLabel}</div>
            ${l?"":'<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>'}
          </div>`}).join("")}
      </div>
      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:8px">
        <b>📌 Rappels</b><br>
        • 1er booster Players contient toujours un Gardien.<br>
        • Game Helper : carte éphémère disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(s=>{s.addEventListener("click",async()=>{const l=we.find(r=>r.id===s.dataset.booster);if(l){s.style.opacity="0.5",s.style.pointerEvents="none";try{await gt(l,{state:e,toast:o,navigate:i,container:t})}catch(r){o(r.message,"error"),s.style.opacity="",s.style.pointerEvents=""}}})}),t.querySelectorAll(".booster-info-btn").forEach(s=>{s.addEventListener("click",l=>{l.stopPropagation(),kt()})})}async function gt(t,{state:e,toast:i,navigate:o,container:a}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await $t();let n=[];t.type==="player"?n=await bt(e.profile,t.cardCount,t.cost):t.type==="game_changer"?n=await xt(e.profile,t.cardCount,t.cost):t.type==="formation"&&(n=await _t(e.profile,t.cost));const{data:s}=await h.from("users").select("*").eq("id",e.profile.id).single();s&&(e.profile=s),wt(n,t,o)}function mt(){const t=Math.random()*100;return t<.5?"legende":t<2?"special":t<10?"normal_high":"normal_low"}function N(t){return Math.max(Number(t.note_g)||0,Number(t.note_d)||0,Number(t.note_m)||0,Number(t.note_a)||0)}function ht(t,e){let i;switch(e){case"legende":i=t.filter(o=>o.rarity==="legende"),i.length||(i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte")),i.length||(i=t.filter(o=>N(o)>=6));break;case"special":i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte"),i.length||(i=t.filter(o=>N(o)>=6));break;case"normal_high":i=t.filter(o=>o.rarity==="normal"&&N(o)>=6),i.length||(i=t.filter(o=>N(o)>=6));break;default:i=t.filter(o=>o.rarity==="normal"&&N(o)>=1&&N(o)<=5),i.length||(i=t.filter(o=>o.rarity==="normal"));break}return i.length||(i=t),i[Math.floor(Math.random()*i.length)]}async function bt(t,e,i){if(i>0){const{error:d}=await h.from("users").update({credits:t.credits-i}).eq("id",t.id);if(d)throw d}const{data:o}=await h.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const a=o.filter(d=>d.job==="GK"),n=o.filter(d=>d.job!=="GK"),s=!t.first_booster_opened&&a.length>0,l=[];for(let d=0;d<e;d++){const c=d===0&&s?a:d===0?n:o,f=mt(),p=ht(c,f);p&&l.push(p)}s&&await h.from("users").update({first_booster_opened:!0}).eq("id",t.id);const{data:r}=await h.from("cards").insert(l.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return l.map((d,c)=>({...r[c],player:d}))}async function xt(t,e,i){const{error:o}=await h.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const a=Object.keys(Se),n=Array.from({length:e},()=>a[Math.floor(Math.random()*a.length)]),{data:s}=await h.from("cards").insert(n.map(l=>({owner_id:t.id,card_type:"game_changer",gc_type:l}))).select();return s}async function _t(t,e){const{error:i}=await h.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=o[Math.floor(Math.random()*o.length)],{data:n}=await h.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return n}function wt(t,e,i){const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
    <style>
      #booster-anim-overlay {
        position:fixed;inset:0;background:#0a1628;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        z-index:3000;overflow:hidden;
      }
      .pack-visual {
        width:160px;height:220px;border-radius:16px;
        background:linear-gradient(135deg,#1A6B3C,#D4A017,#1A6B3C);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        box-shadow:0 0 40px rgba(212,160,23,0.5);cursor:pointer;font-size:64px;
        border:3px solid rgba(212,160,23,0.6);animation:packFloat 2s ease-in-out infinite;
      }
      @keyframes packFloat {
        0%,100% { transform:translateY(0) rotate(-1deg); }
        50%      { transform:translateY(-8px) rotate(1deg); }
      }
      .pack-visual.shaking { animation:packShake 0.4s ease-in-out; }
      @keyframes packShake {
        0%,100%{transform:rotate(0)} 20%{transform:rotate(-8deg) scale(1.05)}
        40%{transform:rotate(8deg) scale(1.08)} 60%{transform:rotate(-5deg)}
        80%{transform:rotate(5deg)}
      }
      .pack-open { animation:packOpen 0.6s ease-out forwards !important; }
      @keyframes packOpen {
        0%{transform:scale(1);opacity:1} 50%{transform:scale(1.3) rotate(5deg);opacity:.8}
        100%{transform:scale(0) rotate(20deg);opacity:0}
      }
      /* Carte révélation - une seule carte centrée */
      .single-card-reveal {
        animation:cardReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
      }
      @keyframes cardReveal {
        from{opacity:0;transform:scale(0.5) rotateY(90deg)}
        to{opacity:1;transform:scale(1) rotateY(0deg)}
      }
      .legend-glow {
        box-shadow:0 0 30px 10px #7a28b8, 0 0 60px 20px rgba(122,40,184,0.5) !important;
        animation:legendPulse 0.8s ease-in-out infinite alternate;
      }
      @keyframes legendPulse {
        from{box-shadow:0 0 20px 5px #7a28b8}
        to{box-shadow:0 0 50px 20px #7a28b8,0 0 80px 30px rgba(122,40,184,0.4)}
      }
      /* Récapitulatif final */
      .recap-grid {
        display:flex;flex-wrap:wrap;gap:8px;justify-content:center;
        max-width:600px;padding:16px;overflow-y:auto;max-height:70vh;
      }
      .recap-card { animation:recapAppear 0.3s ease both; }
      @keyframes recapAppear { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
    </style>

    <!-- Phase 1 : booster -->
    <div id="pack-phase" style="display:flex;flex-direction:column;align-items:center;gap:16px">
      <div style="font-size:14px;color:rgba(255,255,255,0.7)">
        ${e.name} · ${t.length} carte${t.length>1?"s":""}
      </div>
      <div class="pack-visual" id="pack-visual">${e.icon}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.5)">Appuie pour ouvrir</div>
    </div>

    <!-- Phase 2 : révélation une par une -->
    <div id="reveal-phase" style="display:none;flex-direction:column;align-items:center;gap:16px;width:100%;padding:0 20px">
      <div id="card-counter" style="font-size:13px;color:rgba(255,255,255,0.5)"></div>
      <div id="single-card-slot" style="position:relative"></div>
      <div id="card-tap-hint" style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:4px">Appuie pour continuer →</div>
    </div>

    <!-- Phase 3 : récapitulatif -->
    <div id="recap-phase" style="display:none;flex-direction:column;align-items:center;gap:0;width:100%">
      <div style="font-size:14px;color:rgba(255,255,255,0.7);margin:12px 0 4px">
        ${t.length} carte${t.length>1?"s obtenues":"obtenue"} !
      </div>
      <div class="recap-grid" id="recap-grid"></div>
      <div style="display:flex;gap:10px;padding:0 16px 20px;width:100%;max-width:400px">
        <button class="btn btn-primary" id="reveal-collection" style="flex:1">Voir ma collection</button>
        <button class="btn btn-ghost" id="reveal-more" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Boosters</button>
      </div>
    </div>

    <!-- Canvas pour feu d'artifice -->
    <canvas id="fireworks-canvas" style="position:fixed;inset:0;pointer-events:none;z-index:3001"></canvas>
  `,document.body.appendChild(o);let a=!1;document.getElementById("pack-visual").addEventListener("click",()=>{if(a)return;a=!0;const p=document.getElementById("pack-visual");p.classList.add("shaking"),setTimeout(()=>{p.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none",s(0)},600)},500)});let n=0;function s(p){n=p;const u=document.getElementById("reveal-phase");u.style.display="flex",l(p)}function l(p){var x;const u=t[p],_=document.getElementById("card-counter"),k=document.getElementById("single-card-slot"),m=document.getElementById("card-tap-hint");_&&(_.textContent=`Carte ${p+1} / ${t.length}`),m&&(m.textContent=p<t.length-1?"Appuie pour continuer →":"Appuie pour voir toutes tes cartes");const v=ke(u),g=u.card_type==="player"&&((x=u.player)==null?void 0:x.rarity)==="legende";k.innerHTML=`
      <div id="current-card-wrap" class="single-card-reveal" style="cursor:pointer;${g?"filter:drop-shadow(0 0 20px #7a28b8)":""}">
        ${v}
      </div>`,g&&c();const y=document.getElementById("current-card-wrap");let b=!1;y.addEventListener("click",()=>{if(b)return;b=!0;const w=p+1;w<t.length?(y.style.transition="all 0.25s ease",y.style.transform="translateX(-120%) rotate(-15deg)",y.style.opacity="0",setTimeout(()=>l(w),250)):r()})}function r(){f(),document.getElementById("reveal-phase").style.display="none";const p=document.getElementById("recap-phase");p.style.display="flex";const u=document.getElementById("recap-grid");u.innerHTML=t.map((_,k)=>`
      <div class="recap-card" style="--i:${k};animation-delay:${k*.07}s">
        ${ke(_)}
      </div>`).join("")}let d=null;function c(){const p=document.getElementById("fireworks-canvas");if(!p)return;p.width=window.innerWidth,p.height=window.innerHeight;const u=p.getContext("2d"),_=[];function k(){const v=Math.random()*p.width,g=Math.random()*p.height*.6,y=["#7a28b8","#ff4081","#D4A017","#00e676","#fff","#e040fb","#40c4ff"],b=y[Math.floor(Math.random()*y.length)];for(let x=0;x<60;x++){const w=Math.PI*2/60*x,$=2+Math.random()*5;_.push({x:v,y:g,vx:Math.cos(w)*$,vy:Math.sin(w)*$,alpha:1,color:b,size:2+Math.random()*3})}}k(),d=setInterval(k,600);function m(){if(document.getElementById("fireworks-canvas")){u.clearRect(0,0,p.width,p.height);for(let v=_.length-1;v>=0;v--){const g=_[v];if(g.x+=g.vx,g.y+=g.vy+.08,g.vy*=.98,g.alpha-=.018,g.alpha<=0){_.splice(v,1);continue}u.globalAlpha=g.alpha,u.fillStyle=g.color,u.beginPath(),u.arc(g.x,g.y,g.size,0,Math.PI*2),u.fill()}u.globalAlpha=1,(d!==null||_.length>0)&&requestAnimationFrame(m)}}m()}function f(){d!==null&&(clearInterval(d),d=null);const p=document.getElementById("fireworks-canvas");p&&p.getContext("2d").clearRect(0,0,p.width,p.height)}document.getElementById("reveal-collection").addEventListener("click",()=>{f(),o.remove(),i("collection")}),document.getElementById("reveal-more").addEventListener("click",()=>{f(),o.remove(),i("boosters")})}function ke(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,a=o.job||"ATT",n=ft[a]||"#1A6B3C",s=vt[o.rarity]||"#ccc",l=a==="GK"?o.note_g:a==="DEF"?o.note_d:a==="MIL"?o.note_m:o.note_a,r=ut(o),d={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${s};overflow:hidden;display:flex;flex-direction:column">
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
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${l||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${r?`<img src="${r}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${o.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${d}</div>
        ${(e=o.clubs)!=null&&e.logo_url?`<img src="${o.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((i=o.clubs)==null?void 0:i.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const o=Se[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${o.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${o.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function kt(){const t=document.createElement("div");t.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;
    align-items:center;justify-content:center;z-index:4000;padding:16px`,t.innerHTML=`
    <div style="background:#fff;border-radius:16px;padding:20px;max-width:340px;width:100%;
      box-shadow:0 8px 40px rgba(0,0,0,0.3)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:700;margin:0">📦 Chances d'obtention</h3>
        <button id="odds-close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#666">✕</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#f5f5f5">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#ccc;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Normal (note 1–5)</div>
              <div style="font-size:11px;color:#888">Carte commune</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#333">90%</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#f0f8ff">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#4a90d9;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Normal (note 6–10)</div>
              <div style="font-size:11px;color:#888">Carte commune haute</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#4a90d9">8%</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#fff8e1">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#D4A017;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Pépite / Papyte</div>
              <div style="font-size:11px;color:#888">Carte rare</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#D4A017">1.5%</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:10px 14px;border-radius:10px;background:#f5eeff">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:14px;height:14px;border-radius:50%;background:#7a28b8;flex-shrink:0"></div>
            <div>
              <div style="font-weight:600;font-size:13px">Légende</div>
              <div style="font-size:11px;color:#888">Carte ultra-rare</div>
            </div>
          </div>
          <div style="font-size:18px;font-weight:900;color:#7a28b8">0.5%</div>
        </div>

      </div>
      <div style="margin-top:14px;padding:10px;background:#f9f9f9;border-radius:8px;font-size:11px;color:#888;text-align:center">
        Les probabilités s'appliquent à chaque carte individuellement.<br>
        Le 1er booster contient toujours un Gardien.
      </div>
    </div>
  `,document.body.appendChild(t),t.addEventListener("click",e=>{e.target===t&&t.remove()}),document.getElementById("odds-close").addEventListener("click",()=>t.remove())}function $t(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let i=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const a=document.getElementById("ad-cd");a&&(a.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}const P={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},Z={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function De(t,e,i,o,a){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",a)}function Re(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function $e(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,skin:e.skin,hair:e.hair,hair_length:e.hair_length,boost:0,used:!1,_line:null,_col:null}}function de(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function ee(t,e){if(!t||!e)return"#333";const i=t.country_code&&e.country_code&&t.country_code===e.country_code,o=t.club_id&&e.club_id&&t.club_id===e.club_id;return i&&o?"#1A6B3C":i||o?"#D4A017":"#333"}function Et(){const t=Math.random()*100;return t<.1?4:t<5?3:t<20?2:1}function It(t,e){const i=P[e]||P["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const n of["GK","DEF","MIL","ATT"]){const s=[];for(let r=0;r<i[n];r++){let d=a.findIndex(c=>c.job===n);if(d===-1&&(d=a.findIndex(c=>c.job2===n)),d===-1&&(d=0),a[d]){const c={...a[d],_line:n};s.push(c),a.splice(d,1)}}const l=de(s.length);s.forEach((r,d)=>{r._col=l[d]}),o[n]=s}return o}async function At(t,e){const{data:i}=await h.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length").eq("is_active",!0).limit(60);if(!i||i.length<11)return Lt(t);const o=P[t]||P["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const s of["GK","DEF","MIL","ATT"]){const l=n.filter(p=>p.job===s),r=n.filter(p=>p.job!==s),d=[...l,...r],c=[];for(let p=0;p<o[s];p++){const u=d[p]||n[p];u&&c.push({cardId:"ai-"+u.id+"-"+p,id:u.id,firstname:u.firstname,name:u.surname_encoded,country_code:u.country_code,club_id:u.club_id,job:u.job,job2:u.job2,note_g:Number(u.note_g)||0,note_d:Number(u.note_d)||0,note_m:Number(u.note_m)||0,note_a:Number(u.note_a)||0,rarity:u.rarity,skin:u.skin,hair:u.hair,hair_length:u.hair_length,boost:0,used:!1,_line:s})}const f=de(c.length);c.forEach((p,u)=>{p._col=f[u]}),a[s]=c}return a}function Lt(t){const e=P[t]||P["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let a=0;for(const n of["GK","DEF","MIL","ATT"]){const s=[];for(let r=0;r<e[n];r++){const d=3+Math.floor(Math.random()*5);s.push({cardId:"fake-"+a,id:"fake-"+a,firstname:"IA",name:o[a%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?d:2,note_d:n==="DEF"?d:2,note_m:n==="MIL"?d:2,note_a:n==="ATT"?d:2,rarity:"normal",boost:0,used:!1,_line:n}),a++}const l=de(s.length);s.forEach((r,d)=>{r._col=l[d]}),i[n]=s}return i}async function Tt(t,e){var b;const{state:i,navigate:o,toast:a}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const s=n.matchMode||"vs_ai_easy",l=s.replace("vs_ai_",""),r=s;if(!n.deckId)return Ct(t,e,s);const d=n.deckId,{data:c}=await h.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
          clubs(encoded_name,logo_url)))`).eq("deck_id",d).order("slot_order"),f=(c||[]).filter(x=>{var w;return x.is_starter&&((w=x.card)==null?void 0:w.player)}).map(x=>$e(x.card)),p=(c||[]).filter(x=>{var w;return!x.is_starter&&((w=x.card)==null?void 0:w.player)}).map(x=>$e(x.card));if(f.length<11){De(t,"⚠️",`Deck incomplet (${f.length}/11).`,"Compléter",()=>o("decks"));return}const u=(c||[]).find(x=>{var w;return((w=x.card)==null?void 0:w.card_type)==="formation"}),_=((b=u==null?void 0:u.card)==null?void 0:b.formation)||"4-4-2",{data:k}=await h.from("cards").select("id,gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),m=It(f,_),v=await At(_),{data:g}=await h.from("matches").insert({home_id:i.profile.id,away_id:null,mode:r,home_deck_id:d,status:"in_progress"}).select().single(),y={matchId:g==null?void 0:g.id,mode:r,difficulty:l,formation:_,homeTeam:m,aiTeam:v,homeSubs:p,subsUsed:0,maxSubs:Math.min(p.length,3),homeScore:0,aiScore:0,gcCards:k||[],usedGc:[],boostCard:null,boostUsed:!1,phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},clubName:i.profile.club_name||"Vous"};Mt(t,y,e)}async function Ct(t,e,i){var s;const{state:o,navigate:a}=e,{data:n}=await h.from("decks").select("id,name,is_active,formation_card_id").eq("owner_id",o.profile.id).order("created_at",{ascending:!1});if(!n||n.length===0){De(t,"📋","Aucun deck. Crée un deck avant de jouer !","Créer un deck",()=>a("decks"));return}t.innerHTML=`
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px">
    <div style="text-align:center;margin-bottom:24px;color:#fff">
      <div style="font-size:14px;opacity:.6;text-transform:uppercase;letter-spacing:1px">Match vs IA — ${i.replace("vs_ai_","").toUpperCase()}</div>
      <div style="font-size:22px;font-weight:900;margin-top:6px">Choisis ton deck</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px">
      ${n.map(l=>`
        <div class="deck-select-card" data-deck-id="${l.id}" style="
          background:rgba(255,255,255,0.08);border:2px solid ${l.is_active?"var(--yellow)":"rgba(255,255,255,0.2)"};
          border-radius:12px;padding:16px;cursor:pointer;transition:all .15s;color:#fff">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-weight:700;font-size:15px">${l.name}</div>
              <div style="font-size:11px;opacity:.6;margin-top:2px">${l.is_active?"Deck actif":"—"}</div>
            </div>
            <div style="font-size:24px">→</div>
          </div>
        </div>`).join("")}
    </div>
    <button class="btn btn-ghost" id="cancel-deck-select" style="margin-top:20px;color:rgba(255,255,255,0.5);border-color:rgba(255,255,255,0.2)">Annuler</button>
  </div>`,t.querySelectorAll(".deck-select-card").forEach(l=>{l.addEventListener("mouseenter",()=>l.style.background="rgba(255,255,255,0.14)"),l.addEventListener("mouseleave",()=>l.style.background="rgba(255,255,255,0.08)"),l.addEventListener("click",()=>{e.navigate("match",{matchMode:i,deckId:l.dataset.deckId})})}),(s=document.getElementById("cancel-deck-select"))==null||s.addEventListener("click",()=>a("home"))}function Mt(t,e,i){const o=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[];function n(f){return f.reduce((p,u)=>p+M(u,"MIL"),0)}function s(f){let p=0;for(let u=0;u<f.length-1;u++)ee(f[u],f[u+1])!=="#333"&&p++;return p}const l=n(o)+s(o),r=n(a)+s(a),d=l>=r;function c(f,p,u){return`<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px">${p}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${f.map((_,k)=>{const m=Re(_),v=k<f.length-1?ee(_,f[k+1]):null;return`
          <div style="width:52px;height:52px;border-radius:8px;background:${u};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${m?`<img src="${m}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:""}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000">${M(_,"MIL")}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_.name}</div>
          </div>
          ${v?`<div style="width:12px;height:4px;border-radius:2px;background:${v};flex-shrink:0;opacity:${v==="#333"?.3:.9}"></div>`:""}
          `}).join("")}
      </div>
    </div>`}t.innerHTML=`
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:20px;padding:20px">
    <div style="text-align:center;color:#fff">
      <div style="font-size:12px;opacity:.5;letter-spacing:1px">DUEL DU MILIEU DE TERRAIN</div>
    </div>

    ${c(o,e.clubName.toUpperCase(),"#D4A017")}

    <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
      <div id="score-home" style="font-size:42px;font-weight:900;color:#D4A017;transition:all 0.5s">${l}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4)">VS</div>
      <div id="score-ai" style="font-size:42px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.5s">${r}</div>
    </div>

    ${c(a,"IA","#bb2020")}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff">
      <div style="font-size:18px;font-weight:900"></div>
    </div>
  </div>`,setTimeout(()=>{const f=document.getElementById("score-home"),p=document.getElementById("score-ai"),u=document.getElementById("midfield-result");if(f&&p&&(d?(f.style.fontSize="72px",f.style.color="#fff",p.style.opacity="0.3"):(p.style.fontSize="72px",p.style.color="#fff",f.style.opacity="0.3")),u){const _=Et();u.style.opacity="1";const k=d?e.clubName:"IA";u.innerHTML=`
        <div style="font-size:18px;font-weight:900;margin-bottom:8px">
          ⚽ ${k} remporte le milieu !
        </div>
        ${d?`
        <div style="background:rgba(135,206,235,0.2);border:2px solid #87CEEB;border-radius:12px;padding:12px 20px;margin-top:8px;display:inline-block">
          <div style="font-size:11px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:28px;font-weight:900;color:#87CEEB">+${_}</div>
          <div style="font-size:11px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>`:""}
      `,d&&(e.boostCard={value:_})}e.attacker=d?"home":"ai",e.log.push({text:`Duel milieu : ${e.clubName} ${l} – ${r} IA → ${d?e.clubName:"IA"} attaque en premier`,type:"info"}),setTimeout(()=>{e.phase=e.attacker==="home"?"attack":"ai-attack",z(t,e,i),e.attacker==="ai"&&setTimeout(()=>te(t,e,i),1e3)},2800)},1200)}function Bt(t,e,i,o){return["ATT","MIL","DEF","GK"].map(s=>{const l=t[s]||[];return l.length?`<div style="display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:4px">
      ${l.map((r,d)=>{const c=i&&!r.used,f=o.includes(r.cardId),p=i==="attack"?M(r,"ATT"):i==="defense"?s==="GK"?M(r,"GK"):M(r,"DEF"):M(r,s),u=Re(r),_=d<l.length-1&&s==="MIL"?ee(r,l[d+1]):null,k=p+(r.boost||0);return`
        <div class="match-slot ${c?"selectable":""} ${f?"selected":""} ${r.used?"used":""}"
          data-card-id="${r.cardId}" data-role="${s}"
          style="width:54px;height:54px;flex-shrink:0;position:relative;overflow:hidden">
          ${u?`<img src="${u}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:${r.used?.2:.6}">`:""}
          ${r.boost?`<div style="position:absolute;top:2px;right:2px;background:#87CEEB;color:#000;border-radius:4px;font-size:7px;font-weight:900;padding:1px 3px;z-index:3">+${r.boost}</div>`:""}
          <div class="slot-note" style="position:relative;z-index:2;color:${r.used?"#555":"#fff"}">${r.used?"–":k}</div>
          <div class="slot-name" style="position:relative;z-index:2">${r.name}</div>
        </div>
        ${_?`<div style="width:10px;height:3px;border-radius:2px;background:${_};flex-shrink:0;opacity:${_==="#333"?.3:.9}"></div>`:""}
        `}).join("")}
    </div>`:""}).join("")}function z(t,e,i){var d,c,f,p;const o={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"",a=e.selected.map(u=>u.cardId),n=e.usedSubIds||[],s=e.homeSubs.filter(u=>!n.includes(u.cardId)),l=Object.values(e.homeTeam).flat().filter(u=>u.used);t.innerHTML=`
  <div class="match-screen">
    <div class="match-header">
      <button class="btn-icon" id="match-quit" style="color:#fff;padding:4px 8px">✕</button>
      <div style="flex:1;text-align:center">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">${e.clubName} vs IA (${e.difficulty.toUpperCase()})</div>
        <div class="match-score">${e.homeScore} – ${e.aiScore}</div>
      </div>
      <button class="btn-icon" id="view-ai" style="color:#fff;padding:4px 8px">👁️</button>
    </div>

    <div class="match-phase">${o}</div>

    <!-- Terrain -->
    <div class="match-field" id="match-field" style="position:relative">
      ${Bt(e.homeTeam,e.formation,e.phase,a)}
      <svg id="match-vlinks-svg" style="position:absolute;inset:0;pointer-events:none;overflow:visible;width:100%;height:100%"></svg>
    </div>

    <!-- Barre d'outils : GC + Boost + Remplacements -->
    <div style="padding:6px 12px;display:flex;gap:6px;overflow-x:auto;align-items:center;background:rgba(0,0,0,0.2)">

      <!-- Game Changers -->
      ${e.gcCards.filter(u=>!e.usedGc.includes(u.id)).map(u=>{var _;return`
        <div class="gc-mini" data-gc-id="${u.id}" data-gc-type="${u.gc_type}"
          style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">${((_=ne[u.gc_type])==null?void 0:_.icon)||"⚡"}</div>
          <div style="font-size:7px;color:#fff;font-weight:600">${u.gc_type}</div>
        </div>`}).join("")}

      <!-- Boost -->
      ${e.boostCard&&!e.boostUsed?`
        <div id="boost-card" style="flex-shrink:0;background:linear-gradient(135deg,#4a9fc4,#87CEEB);
          border:2px solid #87CEEB;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">⚡</div>
          <div style="font-size:9px;color:#000;font-weight:900">BOOST +${e.boostCard.value}</div>
          <div style="font-size:6px;color:rgba(0,0,0,0.7)">1 joueur</div>
        </div>`:""}

      <!-- Remplacements -->
      ${l.length>0&&s.length>0&&e.subsUsed<e.maxSubs?`
        <div id="sub-btn" style="flex-shrink:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);
          border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">🔄</div>
          <div style="font-size:7px;color:#fff">Remplaçant</div>
          <div style="font-size:6px;color:rgba(255,255,255,0.5)">(${e.subsUsed}/${e.maxSubs})</div>
        </div>`:""}
    </div>

    <!-- Actions -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(u=>`<div class="log-entry ${u.type==="goal"?"log-goal":""}">${u.text}</div>`).join("")}
    </div>
  </div>`,(d=document.getElementById("match-quit"))==null||d.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(c=document.getElementById("view-ai"))==null||c.addEventListener("click",()=>Ft(e,i)),jt(t,e,i),t.querySelectorAll(".match-slot.selectable").forEach(u=>{u.addEventListener("click",()=>zt(u,e,t,i))}),t.querySelectorAll(".gc-mini").forEach(u=>{u.addEventListener("click",()=>Nt(u.dataset.gcId,u.dataset.gcType,t,e,i))}),(f=document.getElementById("boost-card"))==null||f.addEventListener("click",()=>{Gt(t,e,i)}),(p=document.getElementById("sub-btn"))==null||p.addEventListener("click",()=>{qt(t,e,i)});const r=document.getElementById("match-log");r&&(r.scrollTop=r.scrollHeight),requestAnimationFrame(()=>drawMatchVerticalLinks(e.homeTeam,e.formation))}function jt(t,e,i){var a,n,s,l;const o=document.getElementById("match-actions");if(o)if(e.phase==="attack"){const r=e.selected.length>0?se(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${r?`ATT : <b style="color:var(--yellow);font-size:20px">${r.total}</b>
             <span style="font-size:11px;opacity:.7">(${r.base}${r.links?` +${r.links} liens`:""}${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.5">Sélectionne 1–3 milieux/attaquants</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${r?"":"disabled"}>Attaquer →</button>`,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>St(t,e,i))}else if(e.phase==="defense"){const r=e.selected.length>0?re(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;opacity:.6;margin-bottom:2px">L'IA attaque avec <b style="color:#ff6b6b">${((n=e.pendingAttack)==null?void 0:n.total)||0}</b></div>
        ${r?`DEF : <b style="color:var(--yellow);font-size:20px">${r.total}</b>`:'<span style="opacity:.5">Sélectionne 1–3 défenseurs/GK</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${r?"":"disabled"}>Défendre →</button>`,(s=document.getElementById("confirm-defense"))==null||s.addEventListener("click",()=>Dt(t,e,i))}else e.phase==="finished"?(o.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(l=document.getElementById("end-match"))==null||l.addEventListener("click",()=>i.navigate("home"))):o.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.4);padding:8px;font-size:12px">⏳ Tour de l'IA...</div>`}function zt(t,e,i,o){const a=t.dataset.cardId,n=t.dataset.role,s=e.selected.findIndex(l=>l.cardId===a);if(s!==-1)e.selected.splice(s,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const l=(e.homeTeam[n]||[]).find(r=>r.cardId===a);l&&e.selected.push({...l,_role:n,_line:n})}z(i,e,o)}function St(t,e,i){const o=e.selected.map(n=>({...n,_line:n._role})),a=se(o,e.modifiers.home);e.pendingAttack={...a,players:[...e.selected],side:"home"},e.selected.forEach(n=>{const s=(e.homeTeam[n._role]||[]).find(l=>l.cardId===n.cardId);s&&(s.used=!0)}),e.log.push({text:`Vous attaquez : ${a.total} (${e.selected.map(n=>n.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",z(t,e,i),setTimeout(()=>Rt(t,e,i),1200)}function Dt(t,e,i){const o=e.selected.map(s=>({...s,_line:s._role})),a=re(o,e.modifiers.home);e.selected.forEach(s=>{const l=(e.homeTeam[s._role]||[]).find(r=>r.cardId===s.cardId);l&&(l.used=!0)});const n=Te(e.pendingAttack.total,a.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${a.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${a.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,Ge(t,e,i,"home-attack")}function te(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=Ce(o,"attack",e.difficulty);if(!a.length){Ne(t,e,i);return}const n=se(a,e.modifiers.ai);e.pendingAttack={...n,players:a,side:"ai"},a.forEach(s=>{s.used=!0}),e.log.push({text:`IA attaque : ${n.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",z(t,e,i)}function Rt(t,e,i){const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=Ce(o,"defense",e.difficulty),n=a.length>0?re(a,e.modifiers.ai).total:0;a.forEach(l=>{l.used=!0});const s=Te(e.pendingAttack.total,n,e.modifiers.ai);s.shielded?e.log.push({text:"🛡️ Bouclier IA !",type:"info"}):s.goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! (${e.pendingAttack.total} > ${n})`,type:"goal"})):e.log.push({text:`🧤 IA défend (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,Ge(t,e,i,"ai-attack")}function Ge(t,e,i,o){if(e.round++,qe(e)){ie(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(s=>!s.used).length){ie(t,e,i);return}e.phase="ai-attack",z(t,e,i),setTimeout(()=>te(t,e,i),800);return}e.phase="attack",z(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){Ne(t,e,i);return}e.phase="ai-attack",z(t,e,i),setTimeout(()=>te(t,e,i),800)}}function qe(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(a=>!a.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(a=>!a.used));return!e&&!i}function Ne(t,e,i){qe(e)?ie(t,e,i):(e.phase="attack",z(t,e,i))}function Gt(t,e,i){const o=Object.values(e.homeTeam).flat().filter(a=>!a.used);if(!o.length){i.toast("Aucun joueur actif à booster","error");return}i.openModal("⚡ Utiliser le Boost",`<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${e.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${o.map(a=>`
        <div class="player-boost-opt" data-card-id="${a.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${Z[a.job]||"#888"};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${M(a,a._line||a.job)}</div>
          <div style="flex:1"><b>${a.firstname} ${a.name}</b><div style="font-size:11px;color:#888">${a._line||a.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${e.boostCard.value}</div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`),document.querySelectorAll(".player-boost-opt").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.cardId;for(const s of["GK","DEF","MIL","ATT"]){const l=(e.homeTeam[s]||[]).find(r=>r.cardId===n);if(l){l.boost=(l.boost||0)+e.boostCard.value,e.log.push({text:`⚡ Boost +${e.boostCard.value} appliqué à ${l.name}`,type:"info"});break}}e.boostUsed=!0,i.closeModal(),z(t,e,i)})})}function qt(t,e,i){e.usedSubIds||(e.usedSubIds=[]);const o=Object.values(e.homeTeam).flat().filter(r=>r.used),a=e.homeSubs.filter(r=>!e.usedSubIds.includes(r.cardId));if(!o.length){i.toast("Aucun joueur grisé","info");return}if(!a.length){i.toast("Aucun remplaçant disponible","info");return}if(e.subsUsed>=e.maxSubs){i.toast(`Maximum ${e.maxSubs} remplacements`,"error");return}i.openModal("🔄 Remplacement",`<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${o.map(r=>`
        <div class="grayed-opt" data-card-id="${r.cardId}" data-role="${r._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${Z[r.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${r._line}</div>
          <div><b>${r.firstname} ${r.name}</b></div>
        </div>`).join("")}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${a.map(r=>`
        <div class="sub-opt" data-card-id="${r.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid var(--green);border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${Z[r.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${r.job}</div>
          <div><b>${r.firstname} ${r.name}</b></div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`);let n=null,s=null;document.querySelectorAll(".grayed-opt").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".grayed-opt").forEach(d=>d.style.borderColor="#eee"),r.style.borderColor="#c0392b",n={cardId:r.dataset.cardId,role:r.dataset.role},l()})}),document.querySelectorAll(".sub-opt").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".sub-opt").forEach(d=>d.style.borderColor="var(--green)"),r.style.borderColor="#D4A017",s=r.dataset.cardId,l()})});function l(){if(!n||!s)return;const r=n.role,d=e.homeTeam[r]||[],c=d.findIndex(p=>p.cardId===n.cardId),f=e.homeSubs.find(p=>p.cardId===s);c!==-1&&f&&(f._line=r,f._col=d[c]._col,f.used=!1,d.splice(c,1,f),e.usedSubIds=[...e.usedSubIds||[],s],e.subsUsed++,e.log.push({text:`🔄 Remplacement : ${f.firstname} ${f.name} entre`,type:"info"})),i.closeModal(),z(t,e,i)}}function Nt(t,e,i,o,a){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier !",type:"info"});break;case"Ressusciter":{let n=!1;for(const s of["ATT","MIL","DEF","GK"]){const l=(o.homeTeam[s]||[]).find(r=>r.used);if(l){l.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(s=>!s.used);if(n.length){const s=n.sort((l,r)=>M(r,"ATT")-M(l,"ATT"))[0];s.used=!0,o.log.push({text:`❄️ ${s.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement",type:"info"});break}h.from("cards").delete().eq("id",t).then(()=>{}),z(i,o,a)}}async function ie(t,e,i){var c,f;e.phase="finished";const{state:o}=i,a=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,s=a?"victoire":n?"nul":"defaite",l=et(e.mode,s);e.matchId&&await h.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?o.profile.id:null,home_credits_reward:l,played_at:new Date().toISOString()}).eq("id",e.matchId);const r={credits:(o.profile.credits||0)+l,matches_played:(o.profile.matches_played||0)+1};a?r.wins=(o.profile.wins||0)+1:n?r.draws=(o.profile.draws||0)+1:r.losses=(o.profile.losses||0)+1,await h.from("users").update(r).eq("id",o.profile.id),await i.refreshProfile();const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",d.innerHTML=`
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${a?"🏆":n?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${a?"Victoire !":n?"Match nul":"Défaite"}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${e.homeScore} – ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${l.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`,document.body.appendChild(d),(c=document.getElementById("res-home"))==null||c.addEventListener("click",()=>{d.remove(),i.navigate("home")}),(f=document.getElementById("res-replay"))==null||f.addEventListener("click",()=>{d.remove(),i.navigate("match",{matchMode:e.mode})})}function Ft(t,e){const i=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${i.map(o=>{const a=t.aiTeam[o]||[];return a.length?`<div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px">
          ${a.map(n=>{const s=M(n,o);return`<div class="match-slot ${n.used?"used":""}" style="cursor:default">
              <div class="slot-note">${n.used?"–":s}</div>
              <div class="slot-name">${n.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const Ot={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Pt(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await le(t,e)}async function le(t,e){const{state:i,toast:o}=e,{data:a}=await h.from("market_listings").select(`id, price, status, listed_at, seller_id,
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
  `;function l(r){const d=document.getElementById("mkt-content"),c=r==="buy"?s:n;if(c.length===0){d.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${r==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}d.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(f=>{var m,v,g;const p=(m=f.card)==null?void 0:m.player;if(!p)return"";const u=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,_=Ot[p.rarity],k=(i.profile.credits||0)>=f.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${Ut(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${_};flex-shrink:0">${u}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((v=p.clubs)==null?void 0:v.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((g=f.seller)==null?void 0:g.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${f.price.toLocaleString("fr")}</div>
            ${r==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${f.id}" ${k?"":"disabled"} style="margin-top:4px">${k?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${f.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,d.querySelectorAll("[data-buy]").forEach(f=>{f.addEventListener("click",()=>Kt(f.dataset.buy,c,t,e))}),d.querySelectorAll("[data-cancel]").forEach(f=>{f.addEventListener("click",()=>Ht(f.dataset.cancel,t,e))})}l("buy"),t.querySelectorAll(".mkt-tab").forEach(r=>{r.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(d=>{const c=d===r;d.style.background=c?"var(--green)":"#fff",d.style.color=c?"#fff":"var(--gray-600)",d.style.borderColor=c?"var(--green)":"var(--gray-200)"}),l(r.dataset.tab)})})}async function Kt(t,e,i,o){const{state:a,toast:n,refreshProfile:s}=o,l=e.find(r=>r.id===t);if(l){if((a.profile.credits||0)<l.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${l.card.player.firstname} ${l.card.player.surname_encoded} pour ${l.price.toLocaleString("fr")} crédits ?`))try{const{error:r}=await h.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",l.card.id);if(r)throw r;await h.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await h.from("users").update({credits:(a.profile.credits||0)-l.price}).eq("id",a.profile.id);const{data:d}=await h.from("users").select("credits").eq("id",l.seller_id).single();d&&await h.from("users").update({credits:(d.credits||0)+l.price}).eq("id",l.seller_id),await h.from("notifications").insert({user_id:l.seller_id,type:"card_sold",message:`Ta carte ${l.card.player.surname_encoded} a été vendue pour ${l.price} crédits !`,data:{card_id:l.card.id,price:l.price}}),await s(),n("Carte achetée ! ✅","success"),le(i,o)}catch(r){n("Erreur : "+r.message,"error")}}}async function Ht(t,e,i){const{toast:o}=i,{data:a}=await h.from("market_listings").select("card_id").eq("id",t).single();await h.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await h.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),o("Annonce retirée","success"),le(e,i)}function Ut(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function Wt(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await h.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
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
  `}const L={user:null,profile:null,page:"home",params:{}};function K(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function Vt(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function oe(){document.getElementById("modal-overlay").classList.add("hidden")}async function H(){if(!L.user)return;const{data:t}=await h.from("users").select("*").eq("id",L.user.id).single();t&&(L.profile=t)}function Y(t,e={}){L.page=t,L.params=e,Fe()}async function Fe(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===L.page)});const e=document.getElementById("nav-credits");e&&L.profile&&(e.textContent=`💰 ${(L.profile.credits||0).toLocaleString("fr")}`);const i={state:L,navigate:Y,toast:K,openModal:Vt,closeModal:oe,refreshProfile:H};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',L.page){case"home":await me(t,i);break;case"collection":await nt(t,i);break;case"decks":await ze(t,i);break;case"boosters":await yt(t,i);break;case"match":await Tt(t,i);break;case"market":await Pt(t,i);break;case"rankings":await Wt(t,i);break;default:await me(t,i)}}function Yt(){const t=document.getElementById("app"),e=L.profile,i=(e.club_name||"MW").split(" ").filter(Boolean);i.length>=2?(i[0][0]+i[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault(),Y(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>Y("home")),document.getElementById("nav-credits").addEventListener("click",()=>Y("boosters"))}async function Jt(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&oe()}),document.getElementById("modal-close").addEventListener("click",oe);const{data:{session:t}}=await h.auth.getSession();if(!t){Ae(),ye(document.getElementById("app"),{navigate:Ee,toast:K});return}if(L.user=t.user,await H(),Ae(),!L.profile){Xe(document.getElementById("app"),{state:L,navigate:Xt,toast:K,refreshProfile:H});return}L.profile.first_booster_opened||(await Qt(L.user.id),await H()),Oe(),h.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(L.user=null,L.profile=null,document.getElementById("app").innerHTML="",ye(document.getElementById("app"),{navigate:Ee,toast:K}))})}function Oe(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",Yt(),Fe()}function Ee(){window.location.reload()}async function Xt(){await H(),Oe()}async function Qt(t){const{data:e}=await h.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:i}=await h.from("players").select("id,job").eq("is_active",!0);if(!i||i.length===0)return;const o=i.filter(l=>l.job==="GK"),a=i.filter(l=>l.job!=="GK"),n=[];for(let l=0;l<5;l++){let r=[];l===0&&o.length>0?(r.push(o[Math.floor(Math.random()*o.length)]),r.push(...Ie([...a]).slice(0,3))):r=Ie([...i]).slice(0,4),r.forEach(d=>n.push({owner_id:t,player_id:d.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(l=>{n.push({owner_id:t,card_type:"game_changer",gc_type:l})});const s=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:s[Math.floor(Math.random()*s.length)]}),await h.from("cards").insert(n),await h.from("users").update({first_booster_opened:!0}).eq("id",t),K("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function Ie(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function Ae(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}Jt();
