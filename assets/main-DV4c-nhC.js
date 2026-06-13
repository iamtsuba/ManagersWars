import{s as b}from"./supabase-B22JUf_T.js";function Ie(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!a){n.textContent="Remplissez tous les champs.";return}const r=document.getElementById("login-btn");r.textContent="Connexion…",r.disabled=!0;const{error:l}=await b.auth.signInWithPassword({email:o,password:a});if(r.textContent="Se connecter",r.disabled=!1,l){n.textContent=l.message.includes("Invalid")?"Email ou mot de passe incorrect.":l.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,r=document.getElementById("reg-error");if(r.textContent="",!o||!a||!n){r.textContent="Remplissez tous les champs.";return}if(a.length<6){r.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==n){r.textContent="Les mots de passe ne correspondent pas.";return}const l=document.getElementById("reg-btn");l.textContent="Création…",l.disabled=!0;const{error:s}=await b.auth.signUp({email:o,password:a});if(l.textContent="Créer mon compte",l.disabled=!1,s){r.textContent=s.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Xe(t,{state:e,navigate:i,toast:o,refreshProfile:a}){let n="#1A6B3C",r="#D4A017";t.innerHTML=`
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

        <div class="club-logo-preview" id="logo-preview" style="background:${r};border-color:${n}">
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
            <div class="color-swatch" id="swatch2" style="background:${r};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur de l'intérieur</label>
              <input type="color" id="color2" value="${r}" style="width:100%;height:36px;padding:2px;border-radius:6px">
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
  `;function l(){var x;const d=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),u=((x=document.getElementById("setup-club"))==null?void 0:x.value)||"MW",p=u.trim().split(" ").filter(Boolean),f=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():u.slice(0,2).toUpperCase();d&&(d.style.background=r,d.style.borderColor=n),c&&(c.textContent=f,c.style.color=n)}document.getElementById("color1").addEventListener("input",d=>{n=d.target.value,document.getElementById("swatch1").style.background=n,l()}),document.getElementById("color2").addEventListener("input",d=>{r=d.target.value,document.getElementById("swatch2").style.background=r,l()});function s(d){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${d}`).classList.add("active"),document.getElementById("step-num").textContent=d,document.getElementById("progress-fill").style.width=`${Math.round(d/3*100)}%`,d===3&&l()}document.getElementById("step1-next").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",d.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:u}=await b.from("users").select("id").eq("pseudo",d).maybeSingle();if(u){c.textContent="Ce pseudo est déjà pris.";return}s(2)}),document.getElementById("step2-back").addEventListener("click",()=>s(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const d=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",d.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:u}=await b.from("users").select("id").eq("club_name",d).maybeSingle();if(u){c.textContent="Ce nom de club est déjà pris.";return}s(3)}),document.getElementById("step3-back").addEventListener("click",()=>s(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),u=document.getElementById("step3-error"),p=document.getElementById("step3-finish");u.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:f}=await b.from("users").insert({id:e.user.id,pseudo:d,club_name:c,club_color1:n,club_color2:r,credits:1e4});if(f)throw f;await Qe(e.user.id),await a(),o(`Bienvenue ${d} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(f){u.textContent=f.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function Qe(t){const{data:e}=await b.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(s=>s.job==="GK"),a=i.filter(s=>s.job!=="GK"),n=[];for(let s=0;s<5;s++){let d=[];if(s===0&&o.length>0){const c=o[Math.floor(Math.random()*o.length)];d.push(c);const u=Le([...a]).slice(0,3);d.push(...u)}else d=Le([...i]).slice(0,4);d.forEach(c=>{n.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(s=>{n.push({owner_id:t,card_type:"game_changer",gc_type:s})});const l=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:l[Math.floor(Math.random()*l.length)]}),n.length>0&&await b.from("cards").insert(n),await b.from("users").update({first_booster_opened:!0}).eq("id",t)}function Le(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function Te(t,{state:e,navigate:i,toast:o}){var r;const a=e.profile;if(!a)return;const{data:n}=await b.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3);t.innerHTML=`
  <div class="page">
    <div class="page-body">

      <!-- Bandeau pseudo (couleurs du club) -->
      <div class="hero hero-compact" style="background:${a.club_color1};border:2px solid ${a.club_color2}">
        <button class="nav-rankings-btn" id="nav-rankings" title="Classement">
          <img src="/manager-wars/icons/badge-trophy.png" alt="Classement">
        </button>
        <div class="info">
          <h3 style="margin:0">${a.pseudo}</h3>
          <div class="level">Niveau ${a.level} · ${a.club_name}</div>
        </div>
        <div class="hero-compact-spacer"></div>
      </div>

      <!-- Ranked (bouton) -->
      <div class="ranked-banner play-card" data-action="ranked">
        <img src="/manager-wars/icons/badge-ranked.png" alt="" class="play-icon">
        <img src="/manager-wars/icons/badge-ranked-txt.png" alt="Ranked" class="play-text-overlay">
      </div>

      <!-- Jeu : 4 tuiles -->
      <div class="play-grid">
        <div class="play-card" data-action="match-ai">
          <img src="/manager-wars/icons/badge-ai.png" alt="" class="play-icon">
          <img src="/manager-wars/icons/badge-ai-txt.png" alt="Match IA" class="play-text-overlay">
        </div>
        <div class="play-card" data-action="match-random">
          <img src="/manager-wars/icons/badge-random.png" alt="" class="play-icon">
          <img src="/manager-wars/icons/badge-random-txt.png" alt="Match Random" class="play-text-overlay">
        </div>
        <div class="play-card" data-action="match-friend">
          <img src="/manager-wars/icons/badge-vs.png" alt="" class="play-icon">
          <img src="/manager-wars/icons/badge-vs-txt.png" alt="Match Friend" class="play-text-overlay">
        </div>
        <div class="play-card" data-action="mini-league">
          <img src="/manager-wars/icons/badge-league.png" alt="" class="play-icon">
          <img src="/manager-wars/icons/badge-league-txt.png" alt="Mini League" class="play-text-overlay">
        </div>
      </div>

      <!-- Derniers matchs -->
      ${n&&n.length>0?`
      <div>
        <div class="section-title">⚽ Derniers matchs</div>
        <div class="card-panel" style="padding:0">
          ${n.map(l=>{const s=l.winner_id===a.id,d=l.home_score===l.away_score,c=d?"N":s?"V":"D",u=d?"#888":s?"#1A6B3C":"#c0392b",p={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[l.mode]||l.mode,x=new Date(l.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${p}</div>
                <div style="font-size:11px;color:var(--gray-600)">${x}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${l.home_score} - ${l.away_score}</span>
                <span style="background:${u};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${c}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(l=>{l.addEventListener("click",s=>{s.preventDefault(),i(l.dataset.nav)})}),(r=document.getElementById("nav-rankings"))==null||r.addEventListener("click",()=>i("rankings")),t.querySelectorAll("[data-action]").forEach(l=>{l.addEventListener("click",()=>{if(l.classList.add("tapped"),setTimeout(()=>l.classList.remove("tapped"),200),l.dataset.action==="match-ai"){Ze(i);return}o("Bientôt disponible","info")})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await b.auth.signOut(),window.location.reload()})}function Ze(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
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
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{o(),t("match",{matchMode:a.dataset.mode})})})}const oe={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function q(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const Me=["ATT","MIL","DEF","GK"];function Be(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let a=o+1;a<i;a++){const n=t[o],r=t[a];if(!n||!r)continue;const l=n._col!==void 0&&r._col!==void 0&&n._col===r._col,s=n._col!==void 0&&r._col!==void 0&&Math.abs(n._col-r._col)===1,d=Me.indexOf(n._line),c=Me.indexOf(r._line),u=Math.abs(d-c)===1;(n._line===r._line&&s||l&&u)&&(n.country_code&&r.country_code&&n.country_code===r.country_code&&e++,n.club_id&&r.club_id&&n.club_id===r.club_id&&e++)}return e}function ye(t,e={}){const i=t.reduce((n,r)=>{const l=r._line||r.job;return n+Number(l==="MIL"?r.note_m:r.note_a)||0},0),o=Be(t);let a=i+o;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function xe(t,e={}){const i=t.reduce((n,r)=>{const l=r._line||r.job;let s=0;return l==="GK"?s=Number(r.note_g)||0:l==="MIL"?s=Number(r.note_m)||0:s=Number(r.note_d)||0,n+s},0),o=Be(t);let a=i+o;return e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function ze(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function je(t,e,i="easy"){const o=t.filter(r=>!r.used);if(!o.length)return[];const a=[...o].sort((r,l)=>{const s=e==="attack"?q(r,"ATT"):r._line==="GK"?q(r,"GK"):q(r,"DEF");return(e==="attack"?q(l,"ATT"):l._line==="GK"?q(l,"GK"):q(l,"DEF"))-s});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return a.slice(0,Math.min(n,a.length,3))}function et(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const ge={"4-3-3 (3)":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL1"],["ATT2","MIL2"],["ATT3","MIL3"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL1","DEF1"],["MIL1","DEF2"],["MIL3","DEF3"],["MIL3","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"5-3-2":[["ATT1","ATT2"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT2","MIL2"],["ATT2","MIL3"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL1","DEF1"],["MIL3","DEF5"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["DEF4","DEF5"],["GK1","DEF2"],["GK1","DEF3"],["GK1","DEF4"]],"4-3-3 (4)":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL1"],["ATT2","MIL2"],["ATT3","MIL3"],["MIL1","MIL2"],["MIL2","MIL3"],["ATT1","DEF1"],["MIL1","DEF1"],["MIL1","DEF2"],["MIL3","DEF3"],["MIL3","DEF4"],["ATT3","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-3-2-1":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL2"],["ATT3","MIL2"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL1","DEF1"],["MIL3","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-3-3 (2)":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL1"],["ATT2","MIL1"],["ATT2","MIL3"],["ATT3","MIL3"],["MIL1","MIL3"],["MIL1","DEF1"],["MIL3","DEF4"],["MIL2","DEF2"],["MIL2","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-3-3":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL1"],["ATT2","MIL2"],["ATT3","MIL3"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL1","DEF1"],["MIL2","DEF2"],["MIL2","DEF3"],["MIL3","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-3-3 (5)":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","DEF1"],["ATT2","MIL1"],["ATT2","MIL3"],["ATT3","MIL1"],["ATT3","DEF4"],["MIL1","MIL3"],["MIL1","DEF1"],["MIL3","DEF4"],["MIL2","DEF2"],["MIL2","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"5-2-2-1":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","DEF1"],["ATT1","MIL1"],["ATT2","MIL1"],["ATT2","MIL2"],["ATT3","MIL2"],["ATT3","DEF5"],["MIL1","MIL2"],["MIL1","DEF1"],["MIL1","DEF3"],["MIL2","DEF3"],["MIL2","DEF5"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["DEF4","DEF5"],["DEF3","GK1"],["GK1","DEF2"],["GK1","DEF4"]],"4-3-1-2":[["ATT1","MIL1"],["ATT2","MIL1"],["ATT1","MIL2"],["ATT2","MIL4"],["MIL1","MIL3"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL2","DEF1"],["MIL3","DEF2"],["MIL3","DEF3"],["MIL4","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"5-2-1-2":[["ATT1","MIL1"],["ATT2","MIL1"],["ATT1","MIL2"],["ATT2","MIL3"],["MIL1","MIL2"],["MIL1","MIL3"],["MIL2","MIL3"],["MIL2","DEF1"],["MIL2","DEF2"],["MIL3","DEF4"],["MIL3","DEF5"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["DEF4","DEF5"],["DEF3","GK1"],["GK1","DEF2"],["GK1","DEF4"]],"4-5-1 (2)":[["ATT1","MIL2"],["ATT1","MIL4"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL4","MIL5"],["MIL1","DEF1"],["MIL2","DEF1"],["MIL2","DEF2"],["MIL3","DEF2"],["MIL3","DEF3"],["MIL4","DEF3"],["MIL4","DEF4"],["MIL5","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-5-1":[["ATT1","MIL2"],["ATT1","MIL4"],["MIL1","MIL2"],["MIL2","MIL4"],["MIL4","MIL5"],["MIL2","MIL3"],["MIL4","MIL3"],["MIL1","DEF1"],["MIL5","DEF4"],["MIL3","DEF2"],["MIL3","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-4-2":[["ATT1","ATT2"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT2","MIL3"],["ATT2","MIL4"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL2","DEF2"],["MIL3","DEF3"],["MIL4","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-4-2 (2)":[["ATT1","ATT2"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT2","MIL3"],["ATT2","MIL4"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL2","DEF2"],["MIL3","DEF3"],["MIL4","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-4-1-1":[["ATT1","ATT2"],["ATT1","MIL2"],["ATT1","MIL3"],["ATT2","MIL2"],["ATT2","MIL3"],["MIL1","MIL2"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL2","DEF2"],["MIL3","DEF3"],["MIL4","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-1-2-1-2":[["ATT1","MIL1"],["ATT2","MIL1"],["ATT1","MIL2"],["ATT2","MIL4"],["MIL1","MIL3"],["MIL2","MIL4"],["MIL2","MIL3"],["MIL4","MIL3"],["MIL2","DEF1"],["MIL4","DEF4"],["MIL3","DEF2"],["MIL3","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"3-4-1-2":[["ATT1","MIL1"],["ATT2","MIL1"],["ATT1","MIL2"],["ATT2","MIL5"],["MIL1","MIL3"],["MIL1","MIL4"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL4","MIL5"],["MIL2","DEF1"],["MIL5","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF2","GK1"],["GK1","DEF1"],["GK1","DEF3"]],"3-4-2-1":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT3","MIL3"],["ATT3","MIL4"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL4","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF2","GK1"],["GK1","DEF1"],["GK1","DEF3"]],"3-5-2":[["ATT1","MIL1"],["ATT2","MIL1"],["ATT1","MIL2"],["ATT2","MIL5"],["MIL1","MIL3"],["MIL1","MIL4"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL4","MIL5"],["MIL2","DEF1"],["MIL5","DEF3"],["MIL3","DEF2"],["MIL4","DEF2"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF2","GK1"],["GK1","DEF1"],["GK1","DEF3"]],"4-1-4-1":[["ATT1","MIL2"],["ATT1","MIL3"],["MIL1","MIL2"],["MIL1","MIL3"],["MIL2","MIL4"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL2","DEF2"],["MIL3","DEF3"],["MIL4","DEF4"],["MIL2","MIL5"],["MIL3","MIL5"],["MIL5","DEF2"],["MIL5","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-2-2-2":[["ATT1","ATT2"],["ATT1","MIL1"],["ATT2","MIL4"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL4","DEF4"],["MIL2","DEF2"],["MIL3","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-2-3-1":[["ATT1","MIL1"],["ATT1","MIL3"],["ATT1","MIL2"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL1","MIL4"],["MIL3","MIL5"],["MIL4","MIL5"],["MIL4","DEF1"],["MIL4","DEF2"],["MIL5","DEF3"],["MIL5","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"4-2-3-1 (2)":[["ATT1","MIL1"],["ATT1","MIL5"],["ATT1","MIL3"],["MIL1","MIL2"],["MIL1","MIL3"],["MIL3","MIL2"],["MIL3","MIL4"],["MIL5","MIL3"],["MIL5","MIL4"],["MIL1","DEF1"],["MIL5","DEF4"],["MIL2","DEF1"],["MIL2","DEF2"],["MIL4","DEF3"],["MIL4","DEF4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]],"3-4-3":[["ATT1","ATT2"],["ATT2","ATT3"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT3","MIL3"],["ATT3","MIL4"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL1","DEF1"],["MIL4","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF2","GK1"],["GK1","DEF1"],["GK1","DEF3"]],"4-1-2-1-2 (2)":[["ATT1","MIL1"],["ATT2","MIL1"],["ATT1","MIL2"],["ATT2","MIL4"],["MIL1","MIL3"],["MIL2","MIL4"],["MIL2","MIL3"],["MIL4","MIL3"],["MIL2","DEF1"],["MIL4","DEF4"],["MIL3","DEF2"],["MIL3","DEF3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["GK1","DEF2"],["GK1","DEF3"]]};function X(t,e){if(!t||!e)return"#cc2222";const i=t.country_code&&e.country_code&&t.country_code===e.country_code,o=t.club_id&&e.club_id&&t.club_id===e.club_id;return i&&o?"#00ff88":i||o?"#FFD700":"#ff3333"}const Se={"4-3-3 (3)":{ATT1:{x:.18,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.82,y:.05},MIL1:{x:.27,y:.33},MIL2:{x:.5,y:.3},MIL3:{x:.73,y:.33},DEF1:{x:.1,y:.62},DEF2:{x:.37,y:.65},DEF3:{x:.63,y:.65},DEF4:{x:.9,y:.62},GK1:{x:.5,y:.9}},"5-3-2":{ATT1:{x:.32,y:.04},ATT2:{x:.68,y:.04},MIL1:{x:.15,y:.28},MIL2:{x:.5,y:.25},MIL3:{x:.85,y:.28},DEF1:{x:.05,y:.55},DEF2:{x:.27,y:.62},DEF3:{x:.5,y:.65},DEF4:{x:.73,y:.62},DEF5:{x:.95,y:.55},GK1:{x:.5,y:.9}},"4-3-3 (4)":{ATT1:{x:.18,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.82,y:.05},MIL1:{x:.3,y:.35},MIL2:{x:.5,y:.35},MIL3:{x:.7,y:.35},DEF1:{x:.08,y:.65},DEF2:{x:.37,y:.65},DEF3:{x:.63,y:.65},DEF4:{x:.92,y:.65},GK1:{x:.5,y:.92}},"4-3-2-1":{ATT1:{x:.3,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.7,y:.05},MIL1:{x:.27,y:.35},MIL2:{x:.5,y:.4},MIL3:{x:.73,y:.35},DEF1:{x:.08,y:.65},DEF2:{x:.37,y:.68},DEF3:{x:.63,y:.68},DEF4:{x:.92,y:.65},GK1:{x:.5,y:.92}},"4-3-3 (2)":{ATT1:{x:.18,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.82,y:.05},MIL1:{x:.3,y:.35},MIL2:{x:.5,y:.42},MIL3:{x:.7,y:.35},DEF1:{x:.08,y:.65},DEF2:{x:.37,y:.68},DEF3:{x:.63,y:.68},DEF4:{x:.92,y:.65},GK1:{x:.5,y:.92}},"4-3-3":{ATT1:{x:.18,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.82,y:.05},MIL1:{x:.27,y:.35},MIL2:{x:.5,y:.4},MIL3:{x:.73,y:.35},DEF1:{x:.08,y:.65},DEF2:{x:.37,y:.68},DEF3:{x:.63,y:.68},DEF4:{x:.92,y:.65},GK1:{x:.5,y:.92}},"4-3-3 (5)":{ATT1:{x:.18,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.82,y:.05},MIL1:{x:.3,y:.35},MIL2:{x:.5,y:.42},MIL3:{x:.7,y:.35},DEF1:{x:.08,y:.65},DEF2:{x:.37,y:.68},DEF3:{x:.63,y:.68},DEF4:{x:.92,y:.65},GK1:{x:.5,y:.92}},"5-2-2-1":{ATT1:{x:.15,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.85,y:.05},MIL1:{x:.37,y:.32},MIL2:{x:.63,y:.32},DEF1:{x:.03,y:.45},DEF2:{x:.22,y:.6},DEF3:{x:.5,y:.58},DEF4:{x:.78,y:.6},DEF5:{x:.97,y:.45},GK1:{x:.5,y:.9}},"4-3-1-2":{ATT1:{x:.35,y:.05},ATT2:{x:.65,y:.05},MIL1:{x:.5,y:.28},MIL2:{x:.27,y:.42},MIL3:{x:.5,y:.48},MIL4:{x:.73,y:.42},DEF1:{x:.08,y:.72},DEF2:{x:.37,y:.75},DEF3:{x:.63,y:.75},DEF4:{x:.92,y:.72},GK1:{x:.5,y:.95}},"5-2-1-2":{ATT1:{x:.35,y:.05},ATT2:{x:.65,y:.05},MIL1:{x:.5,y:.28},MIL2:{x:.32,y:.38},MIL3:{x:.68,y:.38},DEF1:{x:.03,y:.52},DEF2:{x:.25,y:.6},DEF3:{x:.5,y:.62},DEF4:{x:.75,y:.6},DEF5:{x:.97,y:.52},GK1:{x:.5,y:.9}},"4-5-1 (2)":{ATT1:{x:.5,y:.05},MIL1:{x:.05,y:.3},MIL2:{x:.3,y:.4},MIL3:{x:.5,y:.45},MIL4:{x:.7,y:.4},MIL5:{x:.95,y:.3},DEF1:{x:.08,y:.7},DEF2:{x:.37,y:.72},DEF3:{x:.63,y:.72},DEF4:{x:.92,y:.7},GK1:{x:.5,y:.92}},"4-5-1":{ATT1:{x:.5,y:.05},MIL1:{x:.05,y:.3},MIL2:{x:.32,y:.38},MIL3:{x:.5,y:.48},MIL4:{x:.68,y:.38},MIL5:{x:.95,y:.3},DEF1:{x:.08,y:.7},DEF2:{x:.37,y:.72},DEF3:{x:.63,y:.72},DEF4:{x:.92,y:.7},GK1:{x:.5,y:.92}},"4-4-2":{ATT1:{x:.4,y:.05},ATT2:{x:.6,y:.05},MIL1:{x:.08,y:.35},MIL2:{x:.37,y:.42},MIL3:{x:.63,y:.42},MIL4:{x:.92,y:.35},DEF1:{x:.08,y:.68},DEF2:{x:.37,y:.7},DEF3:{x:.63,y:.7},DEF4:{x:.92,y:.68},GK1:{x:.5,y:.92}},"4-4-2 (2)":{ATT1:{x:.4,y:.05},ATT2:{x:.6,y:.05},MIL1:{x:.08,y:.35},MIL2:{x:.37,y:.42},MIL3:{x:.63,y:.42},MIL4:{x:.92,y:.35},DEF1:{x:.08,y:.68},DEF2:{x:.37,y:.7},DEF3:{x:.63,y:.7},DEF4:{x:.92,y:.68},GK1:{x:.5,y:.92}},"4-4-1-1":{ATT1:{x:.5,y:.03},ATT2:{x:.5,y:.32},MIL1:{x:.08,y:.4},MIL2:{x:.33,y:.42},MIL3:{x:.67,y:.42},MIL4:{x:.92,y:.4},DEF1:{x:.08,y:.7},DEF2:{x:.37,y:.72},DEF3:{x:.63,y:.72},DEF4:{x:.92,y:.7},GK1:{x:.5,y:.92}},"4-1-2-1-2":{ATT1:{x:.35,y:.05},ATT2:{x:.65,y:.05},MIL1:{x:.5,y:.28},MIL2:{x:.05,y:.4},MIL3:{x:.5,y:.55},MIL4:{x:.95,y:.4},DEF1:{x:.08,y:.75},DEF2:{x:.37,y:.78},DEF3:{x:.63,y:.78},DEF4:{x:.92,y:.75},GK1:{x:.5,y:.95}},"3-4-1-2":{ATT1:{x:.35,y:.04},ATT2:{x:.65,y:.04},MIL1:{x:.5,y:.25},MIL2:{x:.05,y:.35},MIL3:{x:.35,y:.42},MIL4:{x:.65,y:.42},MIL5:{x:.95,y:.35},DEF1:{x:.22,y:.65},DEF2:{x:.5,y:.65},DEF3:{x:.78,y:.65},GK1:{x:.5,y:.9}},"3-4-2-1":{ATT1:{x:.3,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.7,y:.05},MIL1:{x:.05,y:.35},MIL2:{x:.35,y:.4},MIL3:{x:.65,y:.4},MIL4:{x:.95,y:.35},DEF1:{x:.22,y:.65},DEF2:{x:.5,y:.65},DEF3:{x:.78,y:.65},GK1:{x:.5,y:.9}},"3-5-2":{ATT1:{x:.35,y:.04},ATT2:{x:.65,y:.04},MIL1:{x:.5,y:.25},MIL2:{x:.05,y:.35},MIL3:{x:.35,y:.42},MIL4:{x:.65,y:.42},MIL5:{x:.95,y:.35},DEF1:{x:.22,y:.65},DEF2:{x:.5,y:.65},DEF3:{x:.78,y:.65},GK1:{x:.5,y:.9}},"4-1-4-1":{ATT1:{x:.5,y:.05},MIL1:{x:.05,y:.32},MIL2:{x:.35,y:.35},MIL3:{x:.65,y:.35},MIL4:{x:.95,y:.32},MIL5:{x:.5,y:.55},DEF1:{x:.08,y:.75},DEF2:{x:.37,y:.78},DEF3:{x:.63,y:.78},DEF4:{x:.92,y:.75},GK1:{x:.5,y:.95}},"4-2-2-2":{ATT1:{x:.4,y:.05},ATT2:{x:.6,y:.05},MIL1:{x:.18,y:.3},MIL2:{x:.37,y:.45},MIL3:{x:.63,y:.45},MIL4:{x:.82,y:.3},DEF1:{x:.08,y:.7},DEF2:{x:.37,y:.72},DEF3:{x:.63,y:.72},DEF4:{x:.92,y:.7},GK1:{x:.5,y:.92}},"4-2-3-1":{ATT1:{x:.5,y:.04},MIL1:{x:.32,y:.28},MIL2:{x:.5,y:.32},MIL3:{x:.68,y:.28},MIL4:{x:.3,y:.48},MIL5:{x:.7,y:.48},DEF1:{x:.08,y:.72},DEF2:{x:.37,y:.75},DEF3:{x:.63,y:.75},DEF4:{x:.92,y:.72},GK1:{x:.5,y:.95}},"4-2-3-1 (2)":{ATT1:{x:.5,y:.05},MIL1:{x:.08,y:.35},MIL2:{x:.3,y:.45},MIL3:{x:.5,y:.42},MIL4:{x:.7,y:.45},MIL5:{x:.92,y:.35},DEF1:{x:.08,y:.72},DEF2:{x:.37,y:.75},DEF3:{x:.63,y:.75},DEF4:{x:.92,y:.72},GK1:{x:.5,y:.95}},"3-4-3":{ATT1:{x:.3,y:.05},ATT2:{x:.5,y:.05},ATT3:{x:.7,y:.05},MIL1:{x:.05,y:.35},MIL2:{x:.35,y:.4},MIL3:{x:.65,y:.4},MIL4:{x:.95,y:.35},DEF1:{x:.22,y:.65},DEF2:{x:.5,y:.65},DEF3:{x:.78,y:.65},GK1:{x:.5,y:.9}},"4-1-2-1-2 (2)":{ATT1:{x:.35,y:.05},ATT2:{x:.65,y:.05},MIL1:{x:.5,y:.28},MIL2:{x:.15,y:.42},MIL3:{x:.5,y:.55},MIL4:{x:.85,y:.42},DEF1:{x:.08,y:.75},DEF2:{x:.37,y:.78},DEF3:{x:.63,y:.78},DEF4:{x:.92,y:.75},GK1:{x:.5,y:.95}}},Ke={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},ne={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Z=["GK","DEF","MIL","ATT"],tt=["Tous","GK","DEF","MIL","ATT"],it={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},me={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function Re(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function Q(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function we(t,e=""){var u,p;const i=t.player;if(!i)return"";const o=i.job||"ATT",a=ne[o],n=Ke[i.rarity]||"#ccc",r=Q(i,o),l=i.job2?Q(i,i.job2):null,s=i.job2?ne[i.job2]:null,d=Re(i),c=me[i.country_code]||i.country_code||"";return`
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
            fill="white" font-family="Arial Black,Arial">${r}</text>
        </svg>
        <!-- Petite étoile poste secondaire, toujours en dessous du bandeau -->
        ${l!==null?`
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${s}" stroke="white" stroke-width="1.5"/>
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
        ${(u=i.clubs)!=null&&u.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((p=i.clubs)==null?void 0:p.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}function ot(t){const e=t.job||"ATT",i=Q(t,e),o=me[t.country_code]||t.country_code||"";return`
  <div style="
    width:140px;border-radius:12px;padding:6px;
    background:#ccc;flex-shrink:0;position:relative;filter:grayscale(1);opacity:0.45
  ">
    <div style="background:#e8e8e8;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
      <div style="padding:5px 6px 2px;text-align:center">
        <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#888">${t.firstname}</div>
        <div style="font-size:14px;font-weight:900;color:#444;font-family:Arial Black,Arial;line-height:1.1">${(t.surname_encoded||"").toUpperCase()}</div>
      </div>
      <div style="position:relative;height:80px;background:#e8e8e8;display:flex;flex-direction:column;align-items:center">
        <div style="position:absolute;top:16px;width:100%;height:28px;background:#999"></div>
        <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18"
            fill="#999" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${i}</text>
        </svg>
      </div>
      <div style="height:106px;overflow:hidden;background:#ddd;display:flex;align-items:center;justify-content:center;font-size:36px;color:#aaa">👤</div>
      <div style="background:#e8e8e8;padding:3px 6px;display:flex;align-items:center;justify-content:center;min-height:26px">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#999">${o}</div>
      </div>
    </div>
  </div>`}async function nt(t,e){const{state:i,navigate:o,toast:a,openModal:n,closeModal:r}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:l}=await b.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),{data:s}=await b.from("players").select(`id, firstname, surname_encoded, country_code, club_id, job, job2,
      note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length,
      clubs(encoded_name, logo_url)`).eq("is_active",!0),d=(l||[]).filter(m=>m.card_type==="player"&&m.player),c=(l||[]).filter(m=>m.card_type==="game_changer"),u=(l||[]).filter(m=>m.card_type==="formation"),p=Object.keys(ge),f=Object.keys(oe),x={};d.forEach(m=>{const I=m.player.id;x[I]=(x[I]||0)+1});const g=new Set(Object.keys(x).map(m=>String(m))),y=new Set(u.map(m=>m.formation)),E=new Set(c.map(m=>m.gc_type));let T="player",L="Tous",v="",h=!1;function w(){return[...d].sort((m,I)=>{const M=Z.indexOf(m.player.job),$=Z.indexOf(I.player.job);return M!==$?M-$:(m.player.surname_encoded||"").localeCompare(I.player.surname_encoded||"")})}function D(){return[...s||[]].sort((m,I)=>{const M=Z.indexOf(m.job),$=Z.indexOf(I.job);return M!==$?M-$:(m.surname_encoded||"").localeCompare(I.surname_encoded||"")})}function B(){return w().filter(m=>{const I=m.player,M=L==="Tous"||I.job===L,$=!v||`${I.firstname} ${I.surname_encoded}`.toLowerCase().includes(v);return M&&$})}function j(){return D().filter(m=>{const I=L==="Tous"||m.job===L,M=!v||`${m.firstname} ${m.surname_encoded}`.toLowerCase().includes(v);return I&&M})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${d.length} carte(s) joueur · ${c.length} Game Changer · ${u.length} Formation</p>
    </div>

    <!-- Onglets -->
    <div style="display:flex;border-bottom:1px solid var(--gray-200);background:#fff">
      <button class="col-tab-btn" data-tab="player" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${T==="player"?"var(--green)":"transparent"};
        color:${T==="player"?"var(--green)":"var(--gray-600)"}">Joueurs</button>
      <button class="col-tab-btn" data-tab="formation" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${T==="formation"?"var(--green)":"transparent"};
        color:${T==="formation"?"var(--green)":"var(--gray-600)"}">Formations</button>
      <button class="col-tab-btn" data-tab="gc" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${T==="gc"?"var(--green)":"transparent"};
        color:${T==="gc"?"var(--green)":"var(--gray-600)"}">Game Changer</button>
    </div>

    <!-- Filtres -->
    <div id="col-filters" style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px"></div>

    <!-- Grille cartes -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function G(){const m=document.getElementById("col-filters");m&&(T==="player"?(m.innerHTML=`
        <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px" value="${v}">
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;align-items:center">
          ${tt.map(I=>`
            <button class="filter-btn" data-job="${I}"
              style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
                border:1.5px solid ${I===L?"var(--green)":"var(--gray-200)"};
                background:${I===L?"var(--green)":"#fff"};
                color:${I===L?"#fff":"var(--gray-600)"}">
              ${I}
            </button>`).join("")}
          <button id="show-all-btn"
            style="flex-shrink:0;margin-left:auto;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${h?"var(--yellow)":"var(--gray-200)"};
              background:${h?"var(--yellow)":"#fff"};
              color:${h?"#fff":"var(--gray-600)"}">
            ${h?"✓ Tout afficher":"Voir tout"}
          </button>
        </div>`,document.getElementById("col-search").addEventListener("input",I=>{v=I.target.value.toLowerCase(),_()}),t.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{L=I.dataset.job,G(),_()})}),document.getElementById("show-all-btn").addEventListener("click",()=>{h=!h,G(),_()})):(m.innerHTML=`
        <div style="display:flex;justify-content:flex-end">
          <button id="show-all-btn"
            style="padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${h?"var(--yellow)":"var(--gray-200)"};
              background:${h?"var(--yellow)":"#fff"};
              color:${h?"#fff":"var(--gray-600)"}">
            ${h?"✓ Tout afficher":"Voir tout"}
          </button>
        </div>`,document.getElementById("show-all-btn").addEventListener("click",()=>{h=!h,G(),_()})))}function _(){const m=document.getElementById("col-grid");m&&(T==="player"?z(m):T==="formation"?P(m):S(m))}function z(m){if(h){const I=j();if(!I.length){m.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucun joueur.</div>';return}m.innerHTML=I.map(M=>{if(g.has(String(M.id))){const A=d.find(K=>K.player.id===M.id),F=x[M.id]||1,C=F>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${F}</div>`:"",N=d.filter(K=>K.player.id===M.id&&K.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return we(A,C+N)}return ot(M)}).join("")}else{const I=B();if(!I.length){m.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const M={},$=[];I.forEach(A=>{const F=A.player.id;M[F]||(M[F]=!0,$.push(A))}),m.innerHTML=$.map(A=>{const F=x[A.player.id]||1,C=F>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${F}</div>`:"",N=d.filter(K=>K.player.id===A.player.id&&K.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return we(A,C+N)}).join("")}m.querySelectorAll("[data-card-id]").forEach(I=>{I.addEventListener("click",()=>{const M=d.find($=>$.id===I.dataset.cardId);M&&st(M,d,x,e)})})}function P(m){const I=h?p:[...y];if(!I.length){m.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Formation.<br><small>Ouvre un booster Formation !</small></div>';return}m.innerHTML=I.map(M=>{if(y.has(M)){const A=u.find(R=>R.formation===M),F=u.filter(R=>R.formation===M).length,C=F>1?`<div style="position:absolute;top:4px;right:4px;background:#0a3d1e;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${F}</div>`:"";return`
          <div data-form-id="${A.id}" style="
            position:relative;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            ${C}
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${M}</div>
          </div>`}return`
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:100px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;align-items:flex-start;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">🏟️</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
          <div style="font-weight:900;font-size:18px">${M}</div>
        </div>`}).join(""),m.querySelectorAll("[data-form-id]").forEach(M=>{M.addEventListener("click",()=>{const $=u.find(A=>A.id===M.dataset.formId);$&&at($,u,e,n)})})}function S(m){const I=h?f:[...E];if(!I.length){m.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Game Changer.<br><small>Ouvre un booster Game Changer !</small></div>';return}m.innerHTML=I.map(M=>{const $=E.has(M),A=oe[M]||{icon:"⚡"};if($){const F=c.find(N=>N.gc_type===M),C=c.filter(N=>N.gc_type===M).length,R=C>1?`<div style="position:absolute;top:4px;right:4px;background:#3d0a7a;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${C}</div>`:"";return`
          <div data-gc-id="${F.id}" data-gc-type="${M}" style="
            position:relative;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            ${R}
            <div style="font-size:28px">${A.icon}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${M}</div>
          </div>`}return`
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:120px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">${A.icon}</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
          <div style="font-weight:700;font-size:13px">${M}</div>
        </div>`}).join(""),m.querySelectorAll("[data-gc-id]").forEach(M=>{M.addEventListener("click",()=>rt(M.dataset.gcType,n))})}t.querySelectorAll(".col-tab-btn").forEach(m=>{m.addEventListener("click",()=>{T=m.dataset.tab,L="Tous",v="",h=!1,t.querySelectorAll(".col-tab-btn").forEach(I=>{const M=I.dataset.tab===T;I.style.borderBottomColor=M?"var(--green)":"transparent",I.style.color=M?"var(--green)":"var(--gray-600)"}),G(),_()})}),G(),_()}function rt(t,e){const i=oe[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const J=1e3;function at(t,e,i,o){var v,h,w;const{state:a,toast:n,closeModal:r,navigate:l,refreshProfile:s}=i,d=t.formation,c={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},u={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},p=c[d]||c["4-4-2"],f=["ATT","MIL","DEF","GK"];function x(D,B){const z=(D-1)*54,P=(B-z)/2;return Array.from({length:D},(S,m)=>P+m*54)}function g(D){return D===1?[1]:D===2?[0,2]:D===3?[0,1,2]:D===4?[0,1,1,2]:D===5?[0,1,1,1,2]:[1]}function y(){const G=f.length*72+48,_=f.map((m,I)=>24+I*72+72/2),z={};f.forEach(m=>{z[m]=x(p[m],290)});function P(m,I){const M=p[m],$=g(M),A=z[m],F=$.indexOf(I);return F>=0?A[F]:null}let S=`<svg width="290" height="${G}" viewBox="0 0 290 ${G}" xmlns="http://www.w3.org/2000/svg">`;f.forEach((m,I)=>{const M=z[m];for(let $=0;$<M.length-1;$++){const A=M[$]+20,F=M[$+1]-20,C=_[I];S+=`<line x1="${A}" y1="${C}" x2="${F}" y2="${C}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,S+=`<text x="${(A+F)/2}" y="${C-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`}});for(let m=0;m<3;m++)for(let I=0;I<f.length-1;I++){const M=f[I],$=f[I+1],A=P(M,m),F=P($,m);if(A!==null&&F!==null){const C=(A+F)/2;S+=`<line x1="${A}" y1="${_[I]+20}" x2="${F}" y2="${_[I+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,S+=`<text x="${C+6}" y="${(_[I]+_[I+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`}}return f.forEach((m,I)=>{const M=p[m],$=z[m],A=g(M),F=u[m],C=_[I],R={};A.forEach((N,K)=>{R[N]||(R[N]={xs:[],indices:[]}),R[N].xs.push($[K]),R[N].indices.push(K)}),Object.entries(R).forEach(([N,K])=>{const se=K.xs.length;if(se>1){const H=K.xs.reduce((de,Je)=>de+Je,0)/se;S+=`<circle cx="${H}" cy="${C}" r="20" fill="${F}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,S+=`<text x="${H}" y="${C-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${m}</text>`,S+=`<text x="${H}" y="${C+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${se}</text>`}else{const H=K.xs[0],de=K.indices[0]+1;S+=`<circle cx="${H}" cy="${C}" r="20" fill="${F}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,S+=`<text x="${H}" y="${C+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${m}</text>`,S+=`<text x="${H}" y="${C+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${m}${de}</text>`}})}),S+="</svg>",S}const E=e.filter(D=>D.formation===d),T=E.length,L=!t.is_for_sale;o(`Formation ${d}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${y()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>

    <!-- Vente directe -->
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:14px">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">💰 Vente directe</div>
      <div style="background:#f9f9f9;border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12px;color:var(--gray-600)">Prix fixe carte Formation</div>
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${J.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${T-1} carte${T-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-form-btn" ${T<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${L?`
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price-form" min="1" placeholder="Prix en crédits" value="${J}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-form-btn">Mettre en vente</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?`
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-form-btn">Retirer</button>
    </div>`:""}`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`),(v=document.getElementById("direct-sell-form-btn"))==null||v.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte Formation ${d} pour ${J.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const D=E.find(j=>!j.is_for_sale)||E[0];if(!D){n("Aucune carte à vendre","error");return}const{error:B}=await b.from("cards").delete().eq("id",D.id);if(B){n(B.message,"error");return}await b.from("users").update({credits:(a.profile.credits||0)+J}).eq("id",a.profile.id),await s(),n(`+${J.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),r(),l("collection")}),(h=document.getElementById("market-sell-form-btn"))==null||h.addEventListener("click",async()=>{const D=parseInt(document.getElementById("sell-price-form").value);if(!D||D<1){n("Prix invalide","error");return}await b.from("cards").update({is_for_sale:!0,sale_price:D}).eq("id",t.id),await b.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:D}),n("Carte mise en vente sur le marché !","success"),r(),l("collection")}),(w=document.getElementById("cancel-sell-form-btn"))==null||w.addEventListener("click",async()=>{await b.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await b.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),r(),l("collection")})}function st(t,e,i,o){var w,D,B,j,G,_;const{state:a,toast:n,openModal:r,closeModal:l,navigate:s,refreshProfile:d}=o,c=t.player,u=e.filter(z=>z.player.id===c.id),p=u.length,f=it[c.rarity]||1e3,x=c.rarity!=="legende",g=Re(c),y=Q(c,c.job),E=c.job2?Q(c,c.job2):null,T=ne[c.job]||"#1A6B3C",L=c.job2?ne[c.job2]:null,v=Ke[c.rarity]||"#ccc",h=me[c.country_code]||c.country_code||"";r(`${c.firstname} ${c.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${v};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${c.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(c.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${T}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${T}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${y}</text>
            </svg>
            ${E!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${L}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${E}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${g?`<img src="${g}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${c.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${h}</div>
            ${(w=c.clubs)!=null&&w.logo_url?`<img src="${c.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(((D=c.clubs)==null?void 0:D.encoded_name)||"").slice(0,6)}</div>`}
          </div>
        </div>
      </div>

      <!-- Infos -->
      <div style="flex:1;min-width:160px;display:flex;flex-direction:column;gap:10px">
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">RARETÉ</div>
          <div style="font-weight:700;color:${v}">${c.rarity.toUpperCase()}</div>
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
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${f.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${p-1} carte${p-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-btn" ${p<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${x&&!t.is_for_sale?`
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
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(B=document.getElementById("close-detail"))==null||B.addEventListener("click",l),(j=document.getElementById("direct-sell-btn"))==null||j.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${c.surname_encoded} pour ${f.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const z=u.find(S=>!S.is_for_sale)||u[0];if(!z){n("Aucune carte à vendre","error");return}const{error:P}=await b.from("cards").delete().eq("id",z.id);if(P){n(P.message,"error");return}await b.from("users").update({credits:(a.profile.credits||0)+f}).eq("id",a.profile.id),await d(),n(`+${f.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),l(),s("collection")}),(G=document.getElementById("market-sell-btn"))==null||G.addEventListener("click",async()=>{const z=parseInt(document.getElementById("sell-price").value);if(!z||z<1){n("Prix invalide","error");return}await b.from("cards").update({is_for_sale:!0,sale_price:z}).eq("id",t.id),await b.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:z}),n("Carte mise en vente sur le marché !","success"),l(),s("collection")}),(_=document.getElementById("cancel-sell-btn"))==null||_.addEventListener("click",async()=>{await b.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await b.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),l(),s("collection")})}const re={"4-3-3 (3)":{GK:1,DEF:4,MIL:3,ATT:3},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-3-3 (4)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-2-1":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (2)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (5)":{GK:1,DEF:4,MIL:3,ATT:3},"5-2-2-1":{GK:1,DEF:5,MIL:2,ATT:3},"4-3-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"5-2-1-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-5-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"4-5-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-1-1":{GK:1,DEF:4,MIL:4,ATT:2},"4-1-2-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"3-4-1-2":{GK:1,DEF:3,MIL:5,ATT:2},"3-4-2-1":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"4-1-4-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-2-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-2-3-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-3-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"4-1-2-1-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2}},V={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function ve(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function Ne(t,e){const{state:i,navigate:o,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await b.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(n==null?void 0:n.length)||0} deck(s) · 11 titulaires + 5 remplaçants max</p>
    </div>
    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${(n==null?void 0:n.length)>0?n.map(r=>`
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${r.name}
                ${r.is_active?'<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>':""}
              </div>
            </div>
            <div style="display:flex;gap:6px">
              ${r.is_active?"":`<button class="btn btn-ghost btn-sm" data-activate="${r.id}">Activer</button>`}
              <button class="btn btn-primary btn-sm" data-edit="${r.id}">✏️ Éditer</button>
            </div>
          </div>`).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const r=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!r)return;const{data:l,error:s}=await b.from("decks").insert({owner_id:i.profile.id,name:r,is_active:!(n!=null&&n.length)}).select().single();if(s){a(s.message,"error");return}a("Deck créé !","success"),De(l.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(r=>{r.addEventListener("click",()=>De(r.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(r=>{r.addEventListener("click",async()=>{await b.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await b.from("decks").update({is_active:!0}).eq("id",r.dataset.activate),a("Deck activé !","success"),Ne(t,e)})})}async function De(t,e,i){const{state:o,toast:a}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await b.from("decks").select("*").eq("id",t).single(),{data:r}=await b.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),l=(r||[]).filter(f=>f.card_type==="player"&&f.player),s=(r||[]).filter(f=>f.card_type==="formation"),d=s.map(f=>f.formation).filter(Boolean),{data:c}=await b.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let u=n.formation||"4-4-2";d.length>0&&!d.includes(u)&&(u=d[0]);const p={deckId:t,name:n.name,formation:u,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:l,formationCards:s,availableFormations:d};(c||[]).forEach(f=>{f.is_starter?p.slots[f.position]=f.card_id:p.subs.includes(f.card_id)||p.subs.push(f.card_id)}),W(e,p,i)}function W(t,e,i){var s;const{navigate:o}=i;re[e.formation];const a=$e(e.formation),n=a.filter(d=>e.slots[d]).length,r=e.availableFormations.length>0?e.availableFormations:Object.keys(re),l=e.subs.map(d=>e.playerCards.find(c=>c.id===d)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
        ${r.map(d=>`<option value="${d}" ${d===e.formation?"selected":""}>${d}</option>`).join("")}
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
            <span style="background:${V[c.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${c.job}</span>
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
  </div>`,dt(t,e,a,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",d=>{e.formation=d.target.value;const c=$e(e.formation),u={};c.forEach(p=>{e.slots[p]&&(u[p]=e.slots[p])}),e.slots=u,W(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>pt(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(d=>{d.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==d.dataset.removeSub),W(t,e,i)})}),(s=document.getElementById("add-sub-btn"))==null||s.addEventListener("click",()=>{ct(e,t,i)})}function dt(t,e,i,o){const a=document.getElementById("deck-field");if(!a)return;const n=e.formation,r=Se[n]||{},l=ge[n]||[],s={};i.forEach(L=>{const v=e.slots[L],h=v?e.playerCards.find(w=>w.id===v):null;s[L]=(h==null?void 0:h.player)||null});const d=i.filter(L=>L.startsWith("MIL"));let c=0,u=0;d.forEach(L=>{const v=s[L];v&&(c+=Number(v.note_m)||0)}),l.forEach(([L,v])=>{if(!L.startsWith("MIL")||!v.startsWith("MIL"))return;X(s[L],s[v])!=="#ff3333"&&u++});const p=320,f=320,x=28,g=4;function y(L){const v=r[L];return v?{x:v.x*p,y:v.y*f}:null}let E="";for(const[L,v]of l){const h=y(L),w=y(v);if(!h||!w)continue;const D=s[L],B=s[v],j=X(D,B),G=j==="#ff3333"?.3:.9,_=j!=="#ff3333"?`filter="url(#glow-${j.replace("#","")})"`:"";E+=`<line x1="${h.x}" y1="${h.y}" x2="${w.x}" y2="${w.y}"
      stroke="${j}" stroke-width="${g}" stroke-linecap="round"
      opacity="${G}" ${_}/>`}for(const L of i){const v=y(L);if(!v)continue;const h=s[L],w=L.replace(/\d+/,""),B={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[w]||"#555",j=h?Number(w==="GK"?h.note_g:w==="DEF"?h.note_d:w==="MIL"?h.note_m:h.note_a)||0:null,G=h?(h.surname_encoded||"").slice(0,8).toUpperCase():"";if(h){const _=ve(h);_&&(E+=`
          <defs>
            <clipPath id="clip-${L}">
              <circle cx="${v.x}" cy="${v.y}" r="${x}"/>
            </clipPath>
          </defs>
          <image href="${_}" x="${v.x-x}" y="${v.y-x}" width="${x*2}" height="${x*2}"
            clip-path="url(#clip-${L})" preserveAspectRatio="xMidYMid slice" opacity="0.85"/>`),E+=`
        <circle cx="${v.x}" cy="${v.y}" r="${x}" fill="${_?"transparent":B}"
          stroke="${B}" stroke-width="2" />
        <circle cx="${v.x}" cy="${v.y}" r="${x}" fill="${B}" opacity="${_?"0.5":"1"}"
          stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        ${_?`<image href="${_}" x="${v.x-x}" y="${v.y-x}" width="${x*2}" height="${x*2}"
          clip-path="url(#clip-${L})" preserveAspectRatio="xMidYMid slice" opacity="0.9"/>`:""}
        <text x="${v.x}" y="${v.y-3}" text-anchor="middle" font-size="13" font-weight="900"
          fill="white" font-family="Arial Black,Arial" style="text-shadow:0 1px 2px #000">${j}</text>
        <text x="${v.x}" y="${v.y+11}" text-anchor="middle" font-size="6.5" fill="rgba(255,255,255,0.9)"
          font-family="Arial">${G}</text>
        <rect x="${v.x-x}" y="${v.y-x}" width="${x*2}" height="${x*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${L}" style="cursor:pointer"/>`}else E+=`
        <circle cx="${v.x}" cy="${v.y}" r="${x}" fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="${v.x}" y="${v.y+6}" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.4)"
          font-family="Arial">+</text>
        <rect x="${v.x-x}" y="${v.y-x}" width="${x*2}" height="${x*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${L}" style="cursor:pointer"/>`}const T=`
    <defs>
      <filter id="glow-00ff88" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glow-FFD700" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>`;a.innerHTML=`
    <!-- Badge MIL -->
    ${d.length>0?`
    <div style="position:absolute;top:6px;right:8px;z-index:10;
      background:rgba(212,160,23,0.95);color:#000;border-radius:8px;
      padding:3px 10px;font-size:11px;font-weight:900;pointer-events:none">
      MIL ${c}${u>0?` +${u}`:""} ⚡
    </div>`:""}

    <svg viewBox="0 0 ${p} ${f}" width="100%" style="display:block;max-width:380px;margin:0 auto">
      ${T}
      ${E}
    </svg>`,a.querySelectorAll(".deck-slot-hit").forEach(L=>{L.addEventListener("click",()=>lt(L.dataset.pos,e,t,o))})}function lt(t,e,i,o){var p,f,x;const{openModal:a,closeModal:n}=o,r=t.replace(/\d+/,""),l=e.slots[t],s=l?e.playerCards.find(g=>g.id===l):null;(p=s==null?void 0:s.player)==null||p.id;const d=new Set;Object.entries(e.slots).forEach(([g,y])=>{var T;if(g===t||!y)return;const E=e.playerCards.find(L=>L.id===y);(T=E==null?void 0:E.player)!=null&&T.id&&d.add(E.player.id)}),e.subs.forEach(g=>{var E;const y=e.playerCards.find(T=>T.id===g);(E=y==null?void 0:y.player)!=null&&E.id&&d.add(y.player.id)});const c=new Set,u=e.playerCards.filter(g=>{const y=g.player;return!(y.job===r||y.job2===r)||d.has(y.id)||c.has(y.id)?!1:(c.add(y.id),!0)});u.sort((g,y)=>{const E=r==="GK"?g.player.note_g:r==="DEF"?g.player.note_d:r==="MIL"?g.player.note_m:g.player.note_a;return(r==="GK"?y.player.note_g:r==="DEF"?y.player.note_d:r==="MIL"?y.player.note_m:y.player.note_a)-E}),a(`Choisir ${r} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${u.length>0?u.map(g=>{var v,h;const y=g.player,E=r==="GK"?y.note_g:r==="DEF"?y.note_d:r==="MIL"?y.note_m:y.note_a,T=ve(y),L={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[y.rarity];return`<div class="player-option" data-card-id="${g.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${V[r]}">
            ${T?`<img src="${T}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${V[r]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${r}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${y.firstname} ${y.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${y.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${y.country_code}">
              ${(v=y.clubs)!=null&&v.logo_url?`<img src="${y.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((h=y.clubs)==null?void 0:h.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${y.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${V[r]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${L};flex-shrink:0">
            ${E}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(f=document.getElementById("close-selector"))==null||f.addEventListener("click",n),(x=document.getElementById("remove-player"))==null||x.addEventListener("click",()=>{delete e.slots[t],n(),W(i,e,o)}),document.querySelectorAll(".player-option").forEach(g=>{g.addEventListener("click",()=>{e.slots[t]=g.dataset.cardId,n(),W(i,e,o)})})}function ct(t,e,i){var s;const{openModal:o,closeModal:a}=i,n=new Set;Object.values(t.slots).filter(Boolean).forEach(d=>{var u;const c=t.playerCards.find(p=>p.id===d);(u=c==null?void 0:c.player)!=null&&u.id&&n.add(c.player.id)}),t.subs.forEach(d=>{var u;const c=t.playerCards.find(p=>p.id===d);(u=c==null?void 0:c.player)!=null&&u.id&&n.add(c.player.id)});const r=new Set,l=t.playerCards.filter(d=>{var c,u,p;return n.has((c=d.player)==null?void 0:c.id)||r.has((u=d.player)==null?void 0:u.id)?!1:(r.add((p=d.player)==null?void 0:p.id),!0)});o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${l.length>0?l.map(d=>{var f;const c=d.player,u=ve(c),p=c.job==="GK"?c.note_g:c.job==="DEF"?c.note_d:c.job==="MIL"?c.note_m:c.note_a;return`<div class="player-option" data-card-id="${d.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${V[c.job]}">
            ${u?`<img src="${u}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${c.firstname} ${c.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${c.job} · ${c.country_code} · ${((f=c.clubs)==null?void 0:f.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${V[c.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${p}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(s=document.getElementById("close-sub-selector"))==null||s.addEventListener("click",a),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),a(),W(e,t,i)})})}async function pt(t,e){const{state:i,toast:o,navigate:a}=e,n=t.formationCards.find(s=>s.formation===t.formation),r=(n==null?void 0:n.id)||t.formationCardId;await b.from("decks").update({formation:t.formation,formation_card_id:r||null}).eq("id",t.deckId),await b.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([s,d],c)=>{l.push({deck_id:t.deckId,card_id:d,position:s,is_starter:!0,slot_order:c})}),t.subs.forEach((s,d)=>{l.push({deck_id:t.deckId,card_id:s,position:`SUB${d+1}`,is_starter:!1,slot_order:100+d})}),l.length>0){const{error:s}=await b.from("deck_cards").insert(l);if(s){o(s.message,"error");return}}o("Deck enregistré ✅","success"),a("decks")}function $e(t){const e=re[t]||re["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const _e=[{id:"players_std",img:"/manager-wars/icons/booster-players.png",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",img:"/manager-wars/icons/booster-silver.png",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",img:"/manager-wars/icons/booster-gamechanger.png",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",img:"/manager-wars/icons/booster-formation.png",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],qe={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function ft(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const ut={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},yt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function xt(t,{state:e,navigate:i,toast:o}){var n;const a=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${_e.map(r=>{const l=a>=r.cost||r.cost===0,s=r.id==="players_std"||r.id==="players_pub";return`<div class="booster-card ${l?"":"disabled"}" data-booster="${r.id}" style="position:relative">
            ${s?`<button class="booster-info-btn" data-info="${r.id}"
              style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;
              background:rgba(0,0,0,0.15);border:none;cursor:pointer;font-size:11px;font-weight:700;
              color:var(--gray-600);display:flex;align-items:center;justify-content:center;z-index:2"
              onclick="event.stopPropagation()">ℹ</button>`:""}
            <div class="icon"><img src="${r.img}" alt="${r.name}" style="height:64px;width:auto;display:block;margin:0 auto"></div>
            <div class="name">${r.name}</div>
            <div class="desc">${r.sub}</div>
            <div class="cost">${r.costLabel}</div>
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
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(r=>{r.addEventListener("click",async()=>{const l=_e.find(s=>s.id===r.dataset.booster);if(l){r.style.opacity="0.5",r.style.pointerEvents="none";try{await gt(l,{state:e,toast:o,navigate:i,container:t})}catch(s){o(s.message,"error"),r.style.opacity="",r.style.pointerEvents=""}}})}),t.querySelectorAll(".booster-info-btn").forEach(r=>{r.addEventListener("click",l=>{l.stopPropagation(),Lt()})})}async function gt(t,{state:e,toast:i,navigate:o,container:a}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await Tt();const{data:n}=await b.from("cards").select("card_type, player_id, formation").eq("owner_id",e.profile.id),r=new Set((n||[]).filter(c=>c.card_type==="player").map(c=>c.player_id)),l=new Set((n||[]).filter(c=>c.card_type==="formation").map(c=>c.formation));let s=[];t.type==="player"?s=await ht(e.profile,t.cardCount,t.cost):t.type==="game_changer"?s=await bt(e.profile,t.cardCount,t.cost):t.type==="formation"&&(s=await Et(e.profile,t.cost)),s.forEach(c=>{c.card_type==="player"&&c.player?c.isDuplicate=r.has(c.player.id):c.card_type==="formation"&&(c.isDuplicate=l.has(c.formation))});const{data:d}=await b.from("users").select("*").eq("id",e.profile.id).single();d&&(e.profile=d),It(s,t,o)}function mt(){const t=Math.random()*100;return t<.5?"legende":t<2?"special":t<10?"normal_high":"normal_low"}function U(t){return Math.max(Number(t.note_g)||0,Number(t.note_d)||0,Number(t.note_m)||0,Number(t.note_a)||0)}function vt(t,e){let i;switch(e){case"legende":i=t.filter(o=>o.rarity==="legende"),i.length||(i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte")),i.length||(i=t.filter(o=>U(o)>=6));break;case"special":i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte"),i.length||(i=t.filter(o=>U(o)>=6));break;case"normal_high":i=t.filter(o=>o.rarity==="normal"&&U(o)>=6),i.length||(i=t.filter(o=>U(o)>=6));break;default:i=t.filter(o=>o.rarity==="normal"&&U(o)>=1&&U(o)<=5),i.length||(i=t.filter(o=>o.rarity==="normal"));break}return i.length||(i=t),i[Math.floor(Math.random()*i.length)]}async function ht(t,e,i){if(i>0){const{error:d}=await b.from("users").update({credits:t.credits-i}).eq("id",t.id);if(d)throw d}const{data:o}=await b.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const a=o.filter(d=>d.job==="GK"),n=o.filter(d=>d.job!=="GK"),r=!t.first_booster_opened&&a.length>0,l=[];for(let d=0;d<e;d++){const c=d===0&&r?a:d===0?n:o,u=mt(),p=vt(c,u);p&&l.push(p)}r&&await b.from("users").update({first_booster_opened:!0}).eq("id",t.id);const{data:s}=await b.from("cards").insert(l.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return l.map((d,c)=>({...s[c],player:d}))}async function bt(t,e,i){const{error:o}=await b.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const a=Object.keys(qe),n=Array.from({length:e},()=>a[Math.floor(Math.random()*a.length)]),{data:r}=await b.from("cards").insert(n.map(l=>({owner_id:t.id,card_type:"game_changer",gc_type:l}))).select();return r}async function Et(t,e){const{error:i}=await b.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=o[Math.floor(Math.random()*o.length)],{data:n}=await b.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return n}function It(t,e,i){const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
    <style>
      #booster-anim-overlay {
        position:fixed;inset:0;background:#0a1628;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        z-index:3000;overflow:hidden;
      }
      .pack-visual {
        width:180px;height:280px;border-radius:16px;
        background:transparent;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        filter:drop-shadow(0 0 30px rgba(212,160,23,0.5));cursor:pointer;
        animation:packFloat 2s ease-in-out infinite;
      }
      .pack-visual img { width:auto; height:100%; max-width:100%; object-fit:contain; }
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
      <div class="pack-visual" id="pack-visual"><img src="${e.img}" alt="${e.name}"></div>
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
  `,document.body.appendChild(o);let a=!1;document.getElementById("pack-visual").addEventListener("click",()=>{if(a)return;a=!0;const p=document.getElementById("pack-visual");p.classList.add("shaking"),setTimeout(()=>{p.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none",r(0)},600)},500)});let n=0;function r(p){n=p;const f=document.getElementById("reveal-phase");f.style.display="flex",l(p)}function l(p){var h;const f=t[p],x=document.getElementById("card-counter"),g=document.getElementById("single-card-slot"),y=document.getElementById("card-tap-hint");x&&(x.textContent=`Carte ${p+1} / ${t.length}`),y&&(y.textContent=p<t.length-1?"Appuie pour continuer →":"Appuie pour voir toutes tes cartes");const E=Ae(f),T=f.card_type==="player"&&((h=f.player)==null?void 0:h.rarity)==="legende";g.innerHTML=`
      <div id="current-card-wrap" class="single-card-reveal" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;${T?"filter:drop-shadow(0 0 20px #7a28b8)":""}">
        ${E}
        ${f.isDuplicate?'<div style="font-size:11px;font-weight:700;color:#fff;background:#cc2222;border-radius:8px;padding:2px 10px">Doublon</div>':""}
      </div>`,T&&c();const L=document.getElementById("current-card-wrap");let v=!1;L.addEventListener("click",()=>{if(v)return;v=!0;const w=p+1;w<t.length?(L.style.transition="all 0.25s ease",L.style.transform="translateX(-120%) rotate(-15deg)",L.style.opacity="0",setTimeout(()=>l(w),250)):s()})}function s(){u(),document.getElementById("reveal-phase").style.display="none";const p=document.getElementById("recap-phase");p.style.display="flex";const f=document.getElementById("recap-grid");f.innerHTML=t.map((x,g)=>`
      <div class="recap-card" style="--i:${g};animation-delay:${g*.07}s;display:flex;flex-direction:column;align-items:center;gap:4px">
        ${Ae(x)}
        ${x.isDuplicate?'<div style="font-size:11px;font-weight:700;color:#fff;background:#cc2222;border-radius:8px;padding:2px 10px">Doublon</div>':""}
      </div>`).join("")}let d=null;function c(){const p=document.getElementById("fireworks-canvas");if(!p)return;p.width=window.innerWidth,p.height=window.innerHeight;const f=p.getContext("2d"),x=[];function g(){const E=Math.random()*p.width,T=Math.random()*p.height*.6,L=["#7a28b8","#ff4081","#D4A017","#00e676","#fff","#e040fb","#40c4ff"],v=L[Math.floor(Math.random()*L.length)];for(let h=0;h<60;h++){const w=Math.PI*2/60*h,D=2+Math.random()*5;x.push({x:E,y:T,vx:Math.cos(w)*D,vy:Math.sin(w)*D,alpha:1,color:v,size:2+Math.random()*3})}}g(),d=setInterval(g,600);function y(){if(document.getElementById("fireworks-canvas")){f.clearRect(0,0,p.width,p.height);for(let E=x.length-1;E>=0;E--){const T=x[E];if(T.x+=T.vx,T.y+=T.vy+.08,T.vy*=.98,T.alpha-=.018,T.alpha<=0){x.splice(E,1);continue}f.globalAlpha=T.alpha,f.fillStyle=T.color,f.beginPath(),f.arc(T.x,T.y,T.size,0,Math.PI*2),f.fill()}f.globalAlpha=1,(d!==null||x.length>0)&&requestAnimationFrame(y)}}y()}function u(){d!==null&&(clearInterval(d),d=null);const p=document.getElementById("fireworks-canvas");p&&p.getContext("2d").clearRect(0,0,p.width,p.height)}document.getElementById("reveal-collection").addEventListener("click",()=>{u(),o.remove(),i("collection")}),document.getElementById("reveal-more").addEventListener("click",()=>{u(),o.remove(),i("boosters")})}function Ae(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,a=o.job||"ATT",n=ut[a]||"#1A6B3C",r=yt[o.rarity]||"#ccc",l=a==="GK"?o.note_g:a==="DEF"?o.note_d:a==="MIL"?o.note_m:o.note_a,s=ft(o),d={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${r};overflow:hidden;display:flex;flex-direction:column">
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
        ${s?`<img src="${s}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${o.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${d}</div>
        ${(e=o.clubs)!=null&&e.logo_url?`<img src="${o.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((i=o.clubs)==null?void 0:i.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const o=qe[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${o.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${o.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function Lt(){const t=document.createElement("div");t.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;
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
  `,document.body.appendChild(t),t.addEventListener("click",e=>{e.target===t&&t.remove()}),document.getElementById("odds-close").addEventListener("click",()=>t.remove())}function Tt(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let i=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const a=document.getElementById("ad-cd");a&&(a.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}const Y={"4-3-3 (3)":{GK:1,DEF:4,MIL:3,ATT:3},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-3-3 (4)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-2-1":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (2)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (5)":{GK:1,DEF:4,MIL:3,ATT:3},"5-2-2-1":{GK:1,DEF:5,MIL:2,ATT:3},"4-3-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"5-2-1-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-5-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"4-5-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-1-1":{GK:1,DEF:4,MIL:4,ATT:2},"4-1-2-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"3-4-1-2":{GK:1,DEF:3,MIL:5,ATT:2},"3-4-2-1":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"4-1-4-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-2-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-2-3-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-3-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"4-1-2-1-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2}},le={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function Oe(t,e,i,o,a){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",a)}function Pe(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function Fe(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,skin:e.skin,hair:e.hair,hair_length:e.hair_length,boost:0,used:!1,_line:null,_col:null}}function he(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function Mt(){const t=Math.random()*100;return t<.1?4:t<5?3:t<20?2:1}function wt(t,e){const i=Y[e]||Y["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const n of["GK","DEF","MIL","ATT"]){const r=[];for(let s=0;s<i[n];s++){let d=a.findIndex(c=>c.job===n);if(d===-1&&(d=a.findIndex(c=>c.job2===n)),d===-1&&(d=0),a[d]){const c={...a[d],_line:n};r.push(c),a.splice(d,1)}}const l=he(r.length);r.forEach((s,d)=>{s._col=l[d]}),o[n]=r}return o}async function Dt(t,e){const{data:i}=await b.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length").eq("is_active",!0).limit(60);if(!i||i.length<11)return $t(t);const o=Y[t]||Y["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const r of["GK","DEF","MIL","ATT"]){const l=n.filter(p=>p.job===r),s=n.filter(p=>p.job!==r),d=[...l,...s],c=[];for(let p=0;p<o[r];p++){const f=d[p]||n[p];f&&c.push({cardId:"ai-"+f.id+"-"+p,id:f.id,firstname:f.firstname,name:f.surname_encoded,country_code:f.country_code,club_id:f.club_id,job:f.job,job2:f.job2,note_g:Number(f.note_g)||0,note_d:Number(f.note_d)||0,note_m:Number(f.note_m)||0,note_a:Number(f.note_a)||0,rarity:f.rarity,skin:f.skin,hair:f.hair,hair_length:f.hair_length,boost:0,used:!1,_line:r})}const u=he(c.length);c.forEach((p,f)=>{p._col=u[f]}),a[r]=c}return a}function $t(t){const e=Y[t]||Y["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let a=0;for(const n of["GK","DEF","MIL","ATT"]){const r=[];for(let s=0;s<e[n];s++){const d=3+Math.floor(Math.random()*5);r.push({cardId:"fake-"+a,id:"fake-"+a,firstname:"IA",name:o[a%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?d:2,note_d:n==="DEF"?d:2,note_m:n==="MIL"?d:2,note_a:n==="ATT"?d:2,rarity:"normal",boost:0,used:!1,_line:n}),a++}const l=he(r.length);r.forEach((s,d)=>{s._col=l[d]}),i[n]=r}return i}async function _t(t,e){var v;const{state:i,navigate:o,toast:a}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const r=n.matchMode||"vs_ai_easy",l=r.replace("vs_ai_",""),s=r;if(!n.deckId)return At(t,e,r);const d=n.deckId,{data:c}=await b.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
          clubs(encoded_name,logo_url)))`).eq("deck_id",d).order("slot_order"),u=(c||[]).filter(h=>{var w;return h.is_starter&&((w=h.card)==null?void 0:w.player)}).map(h=>Fe(h.card)),p=(c||[]).filter(h=>{var w;return!h.is_starter&&((w=h.card)==null?void 0:w.player)}).map(h=>Fe(h.card));if(u.length<11){Oe(t,"⚠️",`Deck incomplet (${u.length}/11).`,"Compléter",()=>o("decks"));return}const f=(c||[]).find(h=>{var w;return((w=h.card)==null?void 0:w.card_type)==="formation"}),x=((v=f==null?void 0:f.card)==null?void 0:v.formation)||"4-4-2",{data:g}=await b.from("cards").select("id,gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),y=wt(u,x),E=await Dt(x),{data:T}=await b.from("matches").insert({home_id:i.profile.id,away_id:null,mode:s,home_deck_id:d,status:"in_progress"}).select().single(),L={matchId:T==null?void 0:T.id,mode:s,difficulty:l,formation:x,homeTeam:y,aiTeam:E,homeSubs:p,subsUsed:0,maxSubs:Math.min(p.length,3),homeScore:0,aiScore:0,gcCards:g||[],usedGc:[],boostCard:null,boostUsed:!1,phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},clubName:i.profile.club_name||"Vous"};Ft(t,L,e)}async function At(t,e,i){var r;const{state:o,navigate:a}=e,{data:n}=await b.from("decks").select("id,name,is_active,formation_card_id").eq("owner_id",o.profile.id).order("created_at",{ascending:!1});if(!n||n.length===0){Oe(t,"📋","Aucun deck. Crée un deck avant de jouer !","Créer un deck",()=>a("decks"));return}t.innerHTML=`
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
  </div>`,t.querySelectorAll(".deck-select-card").forEach(l=>{l.addEventListener("mouseenter",()=>l.style.background="rgba(255,255,255,0.14)"),l.addEventListener("mouseleave",()=>l.style.background="rgba(255,255,255,0.08)"),l.addEventListener("click",()=>{e.navigate("match",{matchMode:i,deckId:l.dataset.deckId})})}),(r=document.getElementById("cancel-deck-select"))==null||r.addEventListener("click",()=>a("home"))}function Ft(t,e,i){const o=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[];function n(u){return u.reduce((p,f)=>p+q(f,"MIL"),0)}function r(u){let p=0;for(let f=0;f<u.length-1;f++)X(u[f],u[f+1])!=="#333"&&p++;return p}const l=n(o)+r(o),s=n(a)+r(a),d=l>=s;function c(u,p,f){return`<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px">${p}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${u.map((x,g)=>{const y=Pe(x),E=g<u.length-1?X(x,u[g+1]):null;return`
          <div style="width:52px;height:52px;border-radius:8px;background:${f};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${y?`<img src="${y}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:""}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000">${q(x,"MIL")}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x.name}</div>
          </div>
          ${E?`<div style="width:12px;height:4px;border-radius:2px;background:${E};flex-shrink:0;opacity:${E==="#333"?.3:.9}"></div>`:""}
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
      <div id="score-ai" style="font-size:42px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.5s">${s}</div>
    </div>

    ${c(a,"IA","#bb2020")}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff">
      <div style="font-size:18px;font-weight:900"></div>
    </div>
  </div>`,setTimeout(()=>{const u=document.getElementById("score-home"),p=document.getElementById("score-ai"),f=document.getElementById("midfield-result");if(u&&p&&(d?(u.style.fontSize="72px",u.style.color="#fff",p.style.opacity="0.3"):(p.style.fontSize="72px",p.style.color="#fff",u.style.opacity="0.3")),f){const x=Mt();f.style.opacity="1";const g=d?e.clubName:"IA";f.innerHTML=`
        <div style="font-size:18px;font-weight:900;margin-bottom:8px">
          ⚽ ${g} remporte le milieu !
        </div>
        ${d?`
        <div style="background:rgba(135,206,235,0.2);border:2px solid #87CEEB;border-radius:12px;padding:12px 20px;margin-top:8px;display:inline-block">
          <div style="font-size:11px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:28px;font-weight:900;color:#87CEEB">+${x}</div>
          <div style="font-size:11px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>`:""}
      `,d&&(e.boostCard={value:x})}e.attacker=d?"home":"ai",e.log.push({text:`Duel milieu : ${e.clubName} ${l} – ${s} IA → ${d?e.clubName:"IA"} attaque en premier`,type:"info"}),setTimeout(()=>{e.phase=e.attacker==="home"?"attack":"ai-attack",O(t,e,i),e.attacker==="ai"&&setTimeout(()=>ce(t,e,i),1e3)},2800)},1200)}function He(t,e,i,o,a=310,n=310){const r=Se[e]||{},l=ge[e]||[],s=26,d={},c=["ATT","MIL","DEF","GK"];for(const x of c)(t[x]||[]).forEach((y,E)=>{d[`${x}${E+1}`]=y});function u(x){const g=r[x];return g?{x:g.x*a,y:g.y*n}:null}let p="";for(const[x,g]of l){const y=u(x),E=u(g);if(!y||!E)continue;const T=d[x],L=d[g],v=X(T,L),h=v==="#ff3333"?.25:.9,w=v!=="#ff3333"?`filter="url(#glow${v.replace("#","").slice(0,6)})"`:"";p+=`<line x1="${y.x.toFixed(1)}" y1="${y.y.toFixed(1)}" x2="${E.x.toFixed(1)}" y2="${E.y.toFixed(1)}"
      stroke="${v}" stroke-width="3.5" stroke-linecap="round" opacity="${h}" ${w}/>`}for(const[x,g]of Object.entries(d)){const y=u(x);if(!y)continue;const E=x.replace(/[0-9]/g,""),L={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[E]||"#555",v=i==="attack"&&["MIL","ATT"].includes(E)&&!g.used||i==="defense"&&["GK","DEF","MIL"].includes(E)&&!g.used,h=o.includes(g.cardId);let w;i==="attack"?w=E==="MIL"?Number(g.note_m)||0:Number(g.note_a)||0:i==="defense"?w=E==="GK"?Number(g.note_g)||0:E==="MIL"?Number(g.note_m)||0:Number(g.note_d)||0:w=Number(E==="GK"?g.note_g:E==="DEF"?g.note_d:E==="MIL"?g.note_m:g.note_a)||0,w=w+(g.boost||0);const D=h?"#FFD700":v?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)",B=h?3:2,j=g.used?.25:1,G=Pe(g);G&&(p+=`<defs><clipPath id="mc-${x}"><circle cx="${y.x}" cy="${y.y}" r="${s}"/></clipPath></defs>`),p+=`<circle cx="${y.x}" cy="${y.y}" r="${s}" fill="${L}" opacity="${j}"
      stroke="${D}" stroke-width="${B}"/>`,G&&!g.used&&(p+=`<image href="${G}" x="${y.x-s}" y="${y.y-s}" width="${s*2}" height="${s*2}"
        clip-path="url(#mc-${x})" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>`,p+=`<circle cx="${y.x}" cy="${y.y}" r="${s}" fill="${L}" opacity="0.35"
        stroke="${D}" stroke-width="${B}"/>`),g.boost&&(p+=`<rect x="${y.x+s-10}" y="${y.y-s}" width="14" height="10" rx="3" fill="#87CEEB"/>
        <text x="${y.x+s-3}" y="${y.y-s+8}" text-anchor="middle" font-size="7" fill="#000" font-weight="900">+${g.boost}</text>`),p+=`<text x="${y.x}" y="${y.y-1}" text-anchor="middle" font-size="12" font-weight="900"
      fill="${g.used?"#555":"white"}" font-family="Arial Black,Arial">${g.used?"–":w}</text>
    <text x="${y.x}" y="${y.y+11}" text-anchor="middle" font-size="6" fill="rgba(255,255,255,${g.used?.3:.8})"
      font-family="Arial">${(g.name||"").slice(0,8)}</text>`,v&&(p+=`<circle cx="${y.x}" cy="${y.y}" r="${s}" fill="rgba(255,255,255,0.08)"
        class="match-slot-hit ${h?"selected":""}" data-card-id="${g.cardId}" data-role="${E}"
        style="cursor:pointer"/>`)}return`<svg viewBox="0 0 ${a} ${n}" width="100%" style="display:block;max-width:360px;margin:0 auto">
    <defs>
    <filter id="glow00ff88"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glowFFD700"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>${p}
  </svg>`}function kt(t,e,i,o){return`<div id="match-terrain-wrap" style="position:relative;padding:0 4px">
    ${He(t,e,i,o)}
  </div>`}function O(t,e,i){var d,c,u,p;const o={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"",a=e.selected.map(f=>f.cardId),n=e.usedSubIds||[],r=e.homeSubs.filter(f=>!n.includes(f.cardId)),l=Object.values(e.homeTeam).flat().filter(f=>f.used);t.innerHTML=`
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
      ${kt(e.homeTeam,e.formation,e.phase,a)}
    </div>

    <!-- Barre d'outils : GC + Boost + Remplacements -->
    <div style="padding:6px 12px;display:flex;gap:6px;overflow-x:auto;align-items:center;background:rgba(0,0,0,0.2)">

      <!-- Game Changers -->
      ${e.gcCards.filter(f=>!e.usedGc.includes(f.id)).map(f=>{var x;return`
        <div class="gc-mini" data-gc-id="${f.id}" data-gc-type="${f.gc_type}"
          style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">${((x=oe[f.gc_type])==null?void 0:x.icon)||"⚡"}</div>
          <div style="font-size:7px;color:#fff;font-weight:600">${f.gc_type}</div>
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
      ${l.length>0&&r.length>0&&e.subsUsed<e.maxSubs?`
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
      ${e.log.slice(-6).map(f=>`<div class="log-entry ${f.type==="goal"?"log-goal":""}">${f.text}</div>`).join("")}
    </div>
  </div>`,(d=document.getElementById("match-quit"))==null||d.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(c=document.getElementById("view-ai"))==null||c.addEventListener("click",()=>Nt(e,i)),Ct(t,e,i),t.querySelectorAll(".match-slot-hit").forEach(f=>{f.addEventListener("click",()=>Gt(f,e,t,i))}),t.querySelectorAll(".gc-mini").forEach(f=>{f.addEventListener("click",()=>Rt(f.dataset.gcId,f.dataset.gcType,t,e,i))}),(u=document.getElementById("boost-card"))==null||u.addEventListener("click",()=>{St(t,e,i)}),(p=document.getElementById("sub-btn"))==null||p.addEventListener("click",()=>{Kt(t,e,i)});const s=document.getElementById("match-log");s&&(s.scrollTop=s.scrollHeight)}function Ct(t,e,i){var a,n,r,l;const o=document.getElementById("match-actions");if(o)if(e.phase==="attack"){const s=e.selected.length>0?ye(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${s?`ATT : <b style="color:var(--yellow);font-size:20px">${s.total}</b>
             <span style="font-size:11px;opacity:.7">(${s.base}${s.links?` +${s.links} liens`:""}${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.5">Sélectionne 1–3 milieux/attaquants</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${s?"":"disabled"}>Attaquer →</button>`,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>Bt(t,e,i))}else if(e.phase==="defense"){const s=e.selected.length>0?xe(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;opacity:.6;margin-bottom:2px">L'IA attaque avec <b style="color:#ff6b6b">${((n=e.pendingAttack)==null?void 0:n.total)||0}</b></div>
        ${s?`DEF : <b style="color:var(--yellow);font-size:20px">${s.total}</b>`:'<span style="opacity:.5">Sélectionne 1–3 défenseurs/GK</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${s?"":"disabled"}>Défendre →</button>`,(r=document.getElementById("confirm-defense"))==null||r.addEventListener("click",()=>zt(t,e,i))}else e.phase==="finished"?(o.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(l=document.getElementById("end-match"))==null||l.addEventListener("click",()=>i.navigate("home"))):o.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.4);padding:8px;font-size:12px">⏳ Tour de l'IA...</div>`}function Gt(t,e,i,o){const a=t.dataset.cardId,n=t.dataset.role,r=e.selected.findIndex(l=>l.cardId===a);if(r!==-1)e.selected.splice(r,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const l=(e.homeTeam[n]||[]).find(s=>s.cardId===a);l&&e.selected.push({...l,_role:n,_line:n})}O(i,e,o)}function Bt(t,e,i){const o=e.selected.map(n=>({...n,_line:n._role})),a=ye(o,e.modifiers.home);e.pendingAttack={...a,players:[...e.selected],side:"home"},e.selected.forEach(n=>{const r=(e.homeTeam[n._role]||[]).find(l=>l.cardId===n.cardId);r&&(r.used=!0)}),e.log.push({text:`Vous attaquez : ${a.total} (${e.selected.map(n=>n.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",O(t,e,i),setTimeout(()=>jt(t,e,i),1200)}function zt(t,e,i){const o=e.selected.map(r=>({...r,_line:r._role})),a=xe(o,e.modifiers.home);e.selected.forEach(r=>{const l=(e.homeTeam[r._role]||[]).find(s=>s.cardId===r.cardId);l&&(l.used=!0)});const n=ze(e.pendingAttack.total,a.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${a.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${a.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,Ue(t,e,i,"home-attack")}function ce(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=je(o,"attack",e.difficulty);if(!a.length){We(t,e,i);return}const n=ye(a,e.modifiers.ai);e.pendingAttack={...n,players:a,side:"ai"},a.forEach(r=>{r.used=!0}),e.log.push({text:`IA attaque : ${n.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",O(t,e,i)}function jt(t,e,i){const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=je(o,"defense",e.difficulty),n=a.length>0?xe(a,e.modifiers.ai).total:0;a.forEach(l=>{l.used=!0});const r=ze(e.pendingAttack.total,n,e.modifiers.ai);r.shielded?e.log.push({text:"🛡️ Bouclier IA !",type:"info"}):r.goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! (${e.pendingAttack.total} > ${n})`,type:"goal"})):e.log.push({text:`🧤 IA défend (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,Ue(t,e,i,"ai-attack")}function Ue(t,e,i,o){if(e.round++,Ve(e)){pe(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(r=>!r.used).length){pe(t,e,i);return}e.phase="ai-attack",O(t,e,i),setTimeout(()=>ce(t,e,i),800);return}e.phase="attack",O(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){We(t,e,i);return}e.phase="ai-attack",O(t,e,i),setTimeout(()=>ce(t,e,i),800)}}function Ve(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(a=>!a.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(a=>!a.used));return!e&&!i}function We(t,e,i){Ve(e)?pe(t,e,i):(e.phase="attack",O(t,e,i))}function St(t,e,i){const o=Object.values(e.homeTeam).flat().filter(a=>!a.used);if(!o.length){i.toast("Aucun joueur actif à booster","error");return}i.openModal("⚡ Utiliser le Boost",`<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${e.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${o.map(a=>`
        <div class="player-boost-opt" data-card-id="${a.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${le[a.job]||"#888"};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${q(a,a._line||a.job)}</div>
          <div style="flex:1"><b>${a.firstname} ${a.name}</b><div style="font-size:11px;color:#888">${a._line||a.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${e.boostCard.value}</div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`),document.querySelectorAll(".player-boost-opt").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.cardId;for(const r of["GK","DEF","MIL","ATT"]){const l=(e.homeTeam[r]||[]).find(s=>s.cardId===n);if(l){l.boost=(l.boost||0)+e.boostCard.value,e.log.push({text:`⚡ Boost +${e.boostCard.value} appliqué à ${l.name}`,type:"info"});break}}e.boostUsed=!0,i.closeModal(),O(t,e,i)})})}function Kt(t,e,i){e.usedSubIds||(e.usedSubIds=[]);const o=Object.values(e.homeTeam).flat().filter(s=>s.used),a=e.homeSubs.filter(s=>!e.usedSubIds.includes(s.cardId));if(!o.length){i.toast("Aucun joueur grisé","info");return}if(!a.length){i.toast("Aucun remplaçant disponible","info");return}if(e.subsUsed>=e.maxSubs){i.toast(`Maximum ${e.maxSubs} remplacements`,"error");return}i.openModal("🔄 Remplacement",`<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${o.map(s=>`
        <div class="grayed-opt" data-card-id="${s.cardId}" data-role="${s._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${le[s.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s._line}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join("")}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${a.map(s=>`
        <div class="sub-opt" data-card-id="${s.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid var(--green);border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${le[s.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s.job}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`);let n=null,r=null;document.querySelectorAll(".grayed-opt").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".grayed-opt").forEach(d=>d.style.borderColor="#eee"),s.style.borderColor="#c0392b",n={cardId:s.dataset.cardId,role:s.dataset.role},l()})}),document.querySelectorAll(".sub-opt").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".sub-opt").forEach(d=>d.style.borderColor="var(--green)"),s.style.borderColor="#D4A017",r=s.dataset.cardId,l()})});function l(){if(!n||!r)return;const s=n.role,d=e.homeTeam[s]||[],c=d.findIndex(p=>p.cardId===n.cardId),u=e.homeSubs.find(p=>p.cardId===r);c!==-1&&u&&(u._line=s,u._col=d[c]._col,u.used=!1,d.splice(c,1,u),e.usedSubIds=[...e.usedSubIds||[],r],e.subsUsed++,e.log.push({text:`🔄 Remplacement : ${u.firstname} ${u.name} entre`,type:"info"})),i.closeModal(),O(t,e,i)}}function Rt(t,e,i,o,a){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier !",type:"info"});break;case"Ressusciter":{let n=!1;for(const r of["ATT","MIL","DEF","GK"]){const l=(o.homeTeam[r]||[]).find(s=>s.used);if(l){l.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(r=>!r.used);if(n.length){const r=n.sort((l,s)=>q(s,"ATT")-q(l,"ATT"))[0];r.used=!0,o.log.push({text:`❄️ ${r.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement",type:"info"});break}b.from("cards").delete().eq("id",t).then(()=>{}),O(i,o,a)}}async function pe(t,e,i){var c,u;e.phase="finished";const{state:o}=i,a=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,r=a?"victoire":n?"nul":"defaite",l=et(e.mode,r);e.matchId&&await b.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?o.profile.id:null,home_credits_reward:l,played_at:new Date().toISOString()}).eq("id",e.matchId);const s={credits:(o.profile.credits||0)+l,matches_played:(o.profile.matches_played||0)+1};a?s.wins=(o.profile.wins||0)+1:n?s.draws=(o.profile.draws||0)+1:s.losses=(o.profile.losses||0)+1,await b.from("users").update(s).eq("id",o.profile.id),await i.refreshProfile();const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",d.innerHTML=`
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
    </div>`,document.body.appendChild(d),(c=document.getElementById("res-home"))==null||c.addEventListener("click",()=>{d.remove(),i.navigate("home")}),(u=document.getElementById("res-replay"))==null||u.addEventListener("click",()=>{d.remove(),i.navigate("match",{matchMode:e.mode})})}function Nt(t,e){e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${He(t.aiTeam,t.formation,null,[],300,300)}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const qt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ot(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await be(t,e)}async function be(t,e){const{state:i,toast:o}=e,{data:a}=await b.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),n=(a||[]).filter(s=>s.seller_id===i.profile.id),r=(a||[]).filter(s=>s.seller_id!==i.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${r.length} carte(s) en vente · Solde : ${(i.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${n.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function l(s){const d=document.getElementById("mkt-content"),c=s==="buy"?r:n;if(c.length===0){d.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${s==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}d.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(u=>{var y,E,T;const p=(y=u.card)==null?void 0:y.player;if(!p)return"";const f=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,x=qt[p.rarity],g=(i.profile.credits||0)>=u.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${Ut(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${x};flex-shrink:0">${f}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((E=p.clubs)==null?void 0:E.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((T=u.seller)==null?void 0:T.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${u.price.toLocaleString("fr")}</div>
            ${s==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${u.id}" ${g?"":"disabled"} style="margin-top:4px">${g?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${u.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,d.querySelectorAll("[data-buy]").forEach(u=>{u.addEventListener("click",()=>Pt(u.dataset.buy,c,t,e))}),d.querySelectorAll("[data-cancel]").forEach(u=>{u.addEventListener("click",()=>Ht(u.dataset.cancel,t,e))})}l("buy"),t.querySelectorAll(".mkt-tab").forEach(s=>{s.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(d=>{const c=d===s;d.style.background=c?"var(--green)":"#fff",d.style.color=c?"#fff":"var(--gray-600)",d.style.borderColor=c?"var(--green)":"var(--gray-200)"}),l(s.dataset.tab)})})}async function Pt(t,e,i,o){const{state:a,toast:n,refreshProfile:r}=o,l=e.find(s=>s.id===t);if(l){if((a.profile.credits||0)<l.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${l.card.player.firstname} ${l.card.player.surname_encoded} pour ${l.price.toLocaleString("fr")} crédits ?`))try{const{error:s}=await b.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",l.card.id);if(s)throw s;await b.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await b.from("users").update({credits:(a.profile.credits||0)-l.price}).eq("id",a.profile.id);const{data:d}=await b.from("users").select("credits").eq("id",l.seller_id).single();d&&await b.from("users").update({credits:(d.credits||0)+l.price}).eq("id",l.seller_id),await b.from("notifications").insert({user_id:l.seller_id,type:"card_sold",message:`Ta carte ${l.card.player.surname_encoded} a été vendue pour ${l.price} crédits !`,data:{card_id:l.card.id,price:l.price}}),await r(),n("Carte achetée ! ✅","success"),be(i,o)}catch(s){n("Erreur : "+s.message,"error")}}}async function Ht(t,e,i){const{toast:o}=i,{data:a}=await b.from("market_listings").select("card_id").eq("id",t).single();await b.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await b.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),o("Annonce retirée","success"),be(e,i)}function Ut(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function Vt(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await b.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${a&&a.length>0?a.map((n,r)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${n.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${r+1}</div>
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
  `}const k={user:null,profile:null,page:"home",params:{}};function ee(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function Wt(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function fe(){document.getElementById("modal-overlay").classList.add("hidden")}async function te(){if(!k.user)return;const{data:t}=await b.from("users").select("*").eq("id",k.user.id).single();t&&(k.profile=t)}const Ee="mw_theme";function ae(){return localStorage.getItem(Ee)||"light"}function Yt(t){var e;localStorage.setItem(Ee,t),ue(t),(e=k.profile)!=null&&e.id&&b.from("users").update({theme:t}).eq("id",k.profile.id).then(()=>{})}function ue(t){document.documentElement.setAttribute("data-theme",t)}function ie(t,e={}){k.page=t,k.params=e,Ye()}async function Ye(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===k.page)});const e=document.getElementById("nav-credits");e&&k.profile&&(e.textContent=`💰 ${(k.profile.credits||0).toLocaleString("fr")}`);const i={state:k,navigate:ie,toast:ee,openModal:Wt,closeModal:fe,refreshProfile:te};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',k.page){case"home":await Te(t,i);break;case"collection":await nt(t,i);break;case"decks":await Ne(t,i);break;case"boosters":await xt(t,i);break;case"match":await _t(t,i);break;case"market":await Ot(t,i);break;case"rankings":await Vt(t,i);break;default:await Te(t,i)}}function Jt(){const t=document.getElementById("app"),e=k.profile;if(!e)return;const i="/manager-wars/icons/";t.innerHTML=`
    <nav class="top-nav">
      <div class="logo" id="nav-logo">
        <img src="${i}logo-withname.png" alt="Manager Wars" style="height:48px;width:auto;display:block">
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div id="nav-credits" class="credits">💰 ${(e.credits||0).toLocaleString("fr")}</div>
        <button id="theme-toggle" class="theme-toggle-btn" title="Changer le thème">
          <span id="theme-icon"></span>
        </button>
      </div>
    </nav>

    <main id="page-content" class="page"></main>

    <nav class="bottom-nav">
      <a href="#" data-page="home" class="active">
        <div class="nav-icon-wrap">
          <img src="${i}nav-home.png" alt="" class="nav-icon">
          <img src="${i}nav-home-txt.png" alt="Accueil" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="collection">
        <div class="nav-icon-wrap">
          <img src="${i}nav-collection.png" alt="" class="nav-icon">
          <img src="${i}nav-collection-txt.png" alt="Cartes" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="decks">
        <div class="nav-icon-wrap">
          <img src="${i}nav-decks.png" alt="" class="nav-icon">
          <img src="${i}nav-deck-txt.png" alt="Decks" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="boosters">
        <div class="nav-icon-wrap">
          <img src="${i}nav-boosters.png" alt="" class="nav-icon">
          <img src="${i}nav-boosters-txt.png" alt="Boosters" class="nav-label">
        </div>
      </a>
      <a href="#" data-page="market">
        <div class="nav-icon-wrap">
          <img src="${i}nav-market.png" alt="" class="nav-icon">
          <img src="${i}nav-market-txt.png" alt="Marché" class="nav-label">
        </div>
      </a>
    </nav>
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault(),ie(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>ie("home")),document.getElementById("nav-credits").addEventListener("click",()=>ie("boosters")),document.getElementById("theme-toggle").addEventListener("click",()=>{const a=ae()==="dark"?"light":"dark";Yt(a),ke(a)}),ke(ae())}function ke(t){const e=document.getElementById("theme-icon");e&&(e.textContent=t==="dark"?"☀️":"🌙")}async function Xt(){ue(ae()),document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&fe()}),document.getElementById("modal-close").addEventListener("click",fe);const{data:{session:t}}=await b.auth.getSession();if(!t){Ge(),Ie(document.getElementById("app"),{navigate:()=>window.location.reload(),toast:ee});return}if(k.user=t.user,await te(),Ge(),!k.profile){Xe(document.getElementById("app"),{state:k,navigate:async()=>{await te(),Ce()},toast:ee,refreshProfile:te});return}k.profile.theme&&k.profile.theme!==ae()&&(localStorage.setItem(Ee,k.profile.theme),ue(k.profile.theme)),Ce(),b.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(k.user=null,k.profile=null,document.getElementById("app").innerHTML="",Ie(document.getElementById("app"),{navigate:()=>window.location.reload(),toast:ee}))})}function Ce(){const t=document.getElementById("app");t.style.display="flex",t.style.flexDirection="column",Jt(),Ye()}function Ge(){const t=document.getElementById("app-loader"),e=document.getElementById("app");e&&(e.style.display=""),t&&(t.classList.add("zoom-out"),setTimeout(()=>t.style.display="none",500))}Xt();
