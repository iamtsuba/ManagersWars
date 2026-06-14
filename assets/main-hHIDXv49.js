import{s as k,F as W,b as ye,c as ce,l as J,d as Xe}from"./formation-links-BD9zicgB.js";function we(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(s=>s.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),s=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!s){n.textContent="Remplissez tous les champs.";return}const a=document.getElementById("login-btn");a.textContent="Connexion…",a.disabled=!0;const{error:c}=await k.auth.signInWithPassword({email:o,password:s});if(a.textContent="Se connecter",a.disabled=!1,c){n.textContent=c.message.includes("Invalid")?"Email ou mot de passe incorrect.":c.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),s=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,a=document.getElementById("reg-error");if(a.textContent="",!o||!s||!n){a.textContent="Remplissez tous les champs.";return}if(s.length<6){a.textContent="Mot de passe trop court (min. 6 caractères).";return}if(s!==n){a.textContent="Les mots de passe ne correspondent pas.";return}const c=document.getElementById("reg-btn");c.textContent="Création…",c.disabled=!0;const{error:l}=await k.auth.signUp({email:o,password:s});if(c.textContent="Créer mon compte",c.disabled=!1,l){a.textContent=l.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Qe(t,{state:e,navigate:i,toast:o,refreshProfile:s}){let n="#1A6B3C",a="#D4A017";t.innerHTML=`
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

        <div class="club-logo-preview" id="logo-preview" style="background:${a};border-color:${n}">
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
            <div class="color-swatch" id="swatch2" style="background:${a};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur de l'intérieur</label>
              <input type="color" id="color2" value="${a}" style="width:100%;height:36px;padding:2px;border-radius:6px">
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
  `;function c(){var y;const r=document.getElementById("logo-preview"),d=document.getElementById("logo-initials"),f=((y=document.getElementById("setup-club"))==null?void 0:y.value)||"MW",p=f.trim().split(" ").filter(Boolean),u=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():f.slice(0,2).toUpperCase();r&&(r.style.background=a,r.style.borderColor=n),d&&(d.textContent=u,d.style.color=n)}document.getElementById("color1").addEventListener("input",r=>{n=r.target.value,document.getElementById("swatch1").style.background=n,c()}),document.getElementById("color2").addEventListener("input",r=>{a=r.target.value,document.getElementById("swatch2").style.background=a,c()});function l(r){document.querySelectorAll(".setup-step").forEach(d=>d.classList.remove("active")),document.getElementById(`step-${r}`).classList.add("active"),document.getElementById("step-num").textContent=r,document.getElementById("progress-fill").style.width=`${Math.round(r/3*100)}%`,r===3&&c()}document.getElementById("step1-next").addEventListener("click",async()=>{const r=document.getElementById("setup-pseudo").value.trim(),d=document.getElementById("step1-error");if(d.textContent="",r.length<3){d.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:f}=await k.from("users").select("id").eq("pseudo",r).maybeSingle();if(f){d.textContent="Ce pseudo est déjà pris.";return}l(2)}),document.getElementById("step2-back").addEventListener("click",()=>l(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const r=document.getElementById("setup-club").value.trim(),d=document.getElementById("step2-error");if(d.textContent="",r.length<2){d.textContent="Nom trop court (min. 2 caractères).";return}const{data:f}=await k.from("users").select("id").eq("club_name",r).maybeSingle();if(f){d.textContent="Ce nom de club est déjà pris.";return}l(3)}),document.getElementById("step3-back").addEventListener("click",()=>l(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const r=document.getElementById("setup-pseudo").value.trim(),d=document.getElementById("setup-club").value.trim(),f=document.getElementById("step3-error"),p=document.getElementById("step3-finish");f.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:u}=await k.from("users").insert({id:e.user.id,pseudo:r,club_name:d,club_color1:n,club_color2:a,credits:1e4});if(u)throw u;await Ze(e.user.id),await s(),o(`Bienvenue ${r} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(u){f.textContent=u.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function Ze(t){const{data:e}=await k.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(l=>l.job==="GK"),s=i.filter(l=>l.job!=="GK"),n=[];for(let l=0;l<5;l++){let r=[];if(l===0&&o.length>0){const d=o[Math.floor(Math.random()*o.length)];r.push(d);const f=$e([...s]).slice(0,3);r.push(...f)}else r=$e([...i]).slice(0,4);r.forEach(d=>{n.push({owner_id:t,player_id:d.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(l=>{n.push({owner_id:t,card_type:"game_changer",gc_type:l})});const c=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:c[Math.floor(Math.random()*c.length)]}),n.length>0&&await k.from("cards").insert(n),await k.from("users").update({first_booster_opened:!0}).eq("id",t)}function $e(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function ke(t,{state:e,navigate:i,toast:o}){var a;const s=e.profile;if(!s)return;const{data:n}=await k.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${s.id},away_id.eq.${s.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3);t.innerHTML=`
  <div class="page">
    <div class="page-body">

      <!-- Bandeau pseudo (couleurs du club) -->
      <div class="hero hero-compact" style="background:${s.club_color1};border:2px solid ${s.club_color2}">
        <button class="nav-rankings-btn" id="nav-rankings" title="Classement">
          <img src="/manager-wars/icons/badge-trophy.png" alt="Classement">
        </button>
        <div class="info">
          <h3 style="margin:0">${s.pseudo}</h3>
          <div class="level">Niveau ${s.level} · ${s.club_name}</div>
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
          ${n.map(c=>{const l=c.winner_id===s.id,r=c.home_score===c.away_score,d=r?"N":l?"V":"D",f=r?"#888":l?"#1A6B3C":"#c0392b",p={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[c.mode]||c.mode,y=new Date(c.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${p}</div>
                <div style="font-size:11px;color:var(--gray-600)">${y}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${c.home_score} - ${c.away_score}</span>
                <span style="background:${f};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${d}</span>
              </div>
            </div>`}).join("")}
        </div>
      </div>`:""}

      <!-- Logout -->
      <div style="text-align:center;padding:12px 0;display:flex;flex-direction:column;gap:8px;align-items:center">
        <button class="btn btn-ghost btn-sm" id="logout-btn" style="color:var(--gray-600)">Déconnexion</button>
        ${s.is_admin?`
        <a href="/manager-wars/admin.html" class="btn btn-sm" id="admin-editor-btn"
          style="background:var(--yellow);color:#111;font-weight:700;border:none;text-decoration:none;display:inline-block;padding:6px 16px;border-radius:8px">
          ⚙️ Admin Editor
        </a>`:""}
      </div>

    </div>
  </div>
  `,t.querySelectorAll("[data-nav]").forEach(c=>{c.addEventListener("click",l=>{l.preventDefault(),i(c.dataset.nav)})}),(a=document.getElementById("nav-rankings"))==null||a.addEventListener("click",()=>i("rankings")),t.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",()=>{if(c.classList.add("tapped"),setTimeout(()=>c.classList.remove("tapped"),200),c.dataset.action==="match-ai"){et(i);return}o("Bientôt disponible","info")})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await k.auth.signOut(),window.location.reload()})}function et(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
    <div class="modal" style="max-width:380px">
      <div class="modal-header"><h2>Choisir la difficulté</h2><button class="btn-icon" id="diff-cancel">✕</button></div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${e.map(s=>`
            <div class="action-card" data-mode="${s.mode}" style="cursor:pointer">
              <div class="icon">${s.icon}</div>
              <div class="label">${s.label}</div>
              <div class="sub">${s.sub}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",s=>{s.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(s=>{s.addEventListener("click",()=>{o(),t("match",{matchMode:s.dataset.mode})})})}const re={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function G(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const _e=["ATT","MIL","DEF","GK"];function je(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let s=o+1;s<i;s++){const n=t[o],a=t[s];if(!n||!a)continue;const c=n._col!==void 0&&a._col!==void 0&&n._col===a._col,l=n._col!==void 0&&a._col!==void 0&&Math.abs(n._col-a._col)===1,r=_e.indexOf(n._line),d=_e.indexOf(a._line),f=Math.abs(r-d)===1;(n._line===a._line&&l||c&&f)&&(n.country_code&&a.country_code&&n.country_code===a.country_code&&e++,n.club_id&&a.club_id&&n.club_id===a.club_id&&e++)}return e}function Se(t,e={}){const i=t.reduce((n,a)=>{const c=a._line||a.job;return n+Number(c==="MIL"?a.note_m:a.note_a)||0},0),o=je(t);let s=i+o;return e.doubleAttack&&(s*=2),e.stolenNote&&(s-=e.stolenNote),{base:i,links:o,total:Math.max(0,s)}}function De(t,e={}){const i=t.reduce((n,a)=>{const c=a._line||a.job;let l=0;return c==="GK"?l=Number(a.note_g)||0:c==="MIL"?l=Number(a.note_m)||0:l=Number(a.note_d)||0,n+l},0),o=je(t);let s=i+o;return e.stolenNote&&(s-=e.stolenNote),{base:i,links:o,total:Math.max(0,s)}}function Fe(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function Ge(t,e,i="easy"){const o=t.filter(a=>!a.used);if(!o.length)return[];const s=[...o].sort((a,c)=>{const l=e==="attack"?G(a,"ATT"):a._line==="GK"?G(a,"GK"):G(a,"DEF");return(e==="attack"?G(c,"ATT"):c._line==="GK"?G(c,"GK"):G(c,"DEF"))-l});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return s.slice(0,Math.min(n,s.length,3))}function tt(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const Re={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},ae={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},te=["GK","DEF","MIL","ATT"],it=["Tous","GK","DEF","MIL","ATT"],ot={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},me={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function qe(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function X(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function Ee(t,e=""){var f,p;const i=t.player;if(!i)return"";const o=i.job||"ATT",s=ae[o],n=Re[i.rarity]||"#ccc",a=X(i,o),c=i.job2?X(i,i.job2):null,l=i.job2?ae[i.job2]:null,r=qe(i),d=me[i.country_code]||i.country_code||"";return`
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
        <div style="position:absolute;top:16px;width:100%;height:28px;background:${s}"></div>
        <!-- Étoile principale centrée sur le bandeau, contour blanc -->
        <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18"
            fill="${s}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${a}</text>
        </svg>
        <!-- Petite étoile poste secondaire, toujours en dessous du bandeau -->
        ${c!==null?`
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${l}" stroke="white" stroke-width="1.5"/>
          <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${c}</text>
        </svg>`:""}
      </div>
      <!-- Portrait -->
      <div style="height:106px;overflow:hidden;background:#b8d4f0;position:relative">
        ${r?`<img src="${r}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
               onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:26px;gap:4px">
        <img src="https://flagsapi.com/${i.country_code}/flat/32.png"
          style="width:20px;height:14px;border-radius:2px;object-fit:cover;flex-shrink:0"
          onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555;flex:1;text-align:center">${d}</div>
        ${(f=i.clubs)!=null&&f.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((p=i.clubs)==null?void 0:p.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}function nt(t){const e=t.job||"ATT",i=X(t,e),o=me[t.country_code]||t.country_code||"";return`
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
  </div>`}async function rt(t,e){const{state:i,navigate:o,toast:s,openModal:n,closeModal:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:c}=await k.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),{data:l}=await k.from("players").select(`id, firstname, surname_encoded, country_code, club_id, job, job2,
      note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length,
      clubs(encoded_name, logo_url)`).eq("is_active",!0),r=(c||[]).filter(_=>_.card_type==="player"&&_.player),d=(c||[]).filter(_=>_.card_type==="game_changer"),f=(c||[]).filter(_=>_.card_type==="formation"),p=Object.keys(W),u=Object.keys(re),y={};r.forEach(_=>{const I=_.player.id;y[I]=(y[I]||0)+1});const m=new Set(Object.keys(y).map(_=>String(_))),g=new Set(f.map(_=>_.formation)),b=new Set(d.map(_=>_.gc_type));let h="player",$="Tous",x="",w=!1;function E(){return[...r].sort((_,I)=>{const A=te.indexOf(_.player.job),z=te.indexOf(I.player.job);return A!==z?A-z:(_.player.surname_encoded||"").localeCompare(I.player.surname_encoded||"")})}function v(){return[...l||[]].sort((_,I)=>{const A=te.indexOf(_.job),z=te.indexOf(I.job);return A!==z?A-z:(_.surname_encoded||"").localeCompare(I.surname_encoded||"")})}function T(){return E().filter(_=>{const I=_.player,A=$==="Tous"||I.job===$,z=!x||`${I.firstname} ${I.surname_encoded}`.toLowerCase().includes(x);return A&&z})}function L(){return v().filter(_=>{const I=$==="Tous"||_.job===$,A=!x||`${_.firstname} ${_.surname_encoded}`.toLowerCase().includes(x);return I&&A})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${r.length} carte(s) joueur · ${d.length} Game Changer · ${f.length} Formation</p>
    </div>

    <!-- Onglets -->
    <div style="display:flex;border-bottom:1px solid var(--gray-200);background:#fff">
      <button class="col-tab-btn" data-tab="player" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${h==="player"?"var(--green)":"transparent"};
        color:${h==="player"?"var(--green)":"var(--gray-600)"}">Joueurs</button>
      <button class="col-tab-btn" data-tab="formation" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${h==="formation"?"var(--green)":"transparent"};
        color:${h==="formation"?"var(--green)":"var(--gray-600)"}">Formations</button>
      <button class="col-tab-btn" data-tab="gc" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${h==="gc"?"var(--green)":"transparent"};
        color:${h==="gc"?"var(--green)":"var(--gray-600)"}">Game Changer</button>
    </div>

    <!-- Filtres -->
    <div id="col-filters" style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px"></div>

    <!-- Grille cartes -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function M(){const _=document.getElementById("col-filters");_&&(h==="player"?(_.innerHTML=`
        <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px" value="${x}">
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;align-items:center">
          ${it.map(I=>`
            <button class="filter-btn" data-job="${I}"
              style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
                border:1.5px solid ${I===$?"var(--green)":"var(--gray-200)"};
                background:${I===$?"var(--green)":"#fff"};
                color:${I===$?"#fff":"var(--gray-600)"}">
              ${I}
            </button>`).join("")}
          <button id="show-all-btn"
            style="flex-shrink:0;margin-left:auto;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${w?"var(--yellow)":"var(--gray-200)"};
              background:${w?"var(--yellow)":"#fff"};
              color:${w?"#fff":"var(--gray-600)"}">
            ${w?"✓ Tout afficher":"Voir tout"}
          </button>
        </div>`,document.getElementById("col-search").addEventListener("input",I=>{x=I.target.value.toLowerCase(),C()}),t.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{$=I.dataset.job,M(),C()})}),document.getElementById("show-all-btn").addEventListener("click",()=>{w=!w,M(),C()})):(_.innerHTML=`
        <div style="display:flex;justify-content:flex-end">
          <button id="show-all-btn"
            style="padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${w?"var(--yellow)":"var(--gray-200)"};
              background:${w?"var(--yellow)":"#fff"};
              color:${w?"#fff":"var(--gray-600)"}">
            ${w?"✓ Tout afficher":"Voir tout"}
          </button>
        </div>`,document.getElementById("show-all-btn").addEventListener("click",()=>{w=!w,M(),C()})))}function C(){const _=document.getElementById("col-grid");_&&(h==="player"?j(_):h==="formation"?ee(_):le(_))}function j(_){if(w){const I=L();if(!I.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucun joueur.</div>';return}_.innerHTML=I.map(A=>{if(m.has(String(A.id))){const S=r.find(O=>O.player.id===A.id),D=y[A.id]||1,R=D>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${D}</div>`:"",N=r.filter(O=>O.player.id===A.id&&O.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Ee(S,R+N)}return nt(A)}).join("")}else{const I=T();if(!I.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const A={},z=[];I.forEach(S=>{const D=S.player.id;A[D]||(A[D]=!0,z.push(S))}),_.innerHTML=z.map(S=>{const D=y[S.player.id]||1,R=D>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${D}</div>`:"",N=r.filter(O=>O.player.id===S.player.id&&O.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Ee(S,R+N)}).join("")}_.querySelectorAll("[data-card-id]").forEach(I=>{I.addEventListener("click",()=>{const A=r.find(z=>z.id===I.dataset.cardId);A&&dt(A,r,y,e)})})}function ee(_){const I=w?p:[...g];if(!I.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Formation.<br><small>Ouvre un booster Formation !</small></div>';return}_.innerHTML=I.map(A=>{if(g.has(A)){const S=f.find(q=>q.formation===A),D=f.filter(q=>q.formation===A).length,R=D>1?`<div style="position:absolute;top:4px;right:4px;background:#0a3d1e;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${D}</div>`:"";return`
          <div data-form-id="${S.id}" style="
            position:relative;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            ${R}
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${A}</div>
          </div>`}return`
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:100px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;align-items:flex-start;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">🏟️</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
          <div style="font-weight:900;font-size:18px">${A}</div>
        </div>`}).join(""),_.querySelectorAll("[data-form-id]").forEach(A=>{A.addEventListener("click",()=>{const z=f.find(S=>S.id===A.dataset.formId);z&&st(z,f,e,n)})})}function le(_){const I=w?u:[...b];if(!I.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Game Changer.<br><small>Ouvre un booster Game Changer !</small></div>';return}_.innerHTML=I.map(A=>{const z=b.has(A),S=re[A]||{icon:"⚡"};if(z){const D=d.find(N=>N.gc_type===A),R=d.filter(N=>N.gc_type===A).length,q=R>1?`<div style="position:absolute;top:4px;right:4px;background:#3d0a7a;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${R}</div>`:"";return`
          <div data-gc-id="${D.id}" data-gc-type="${A}" style="
            position:relative;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            ${q}
            <div style="font-size:28px">${S.icon}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${A}</div>
          </div>`}return`
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:120px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">${S.icon}</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
          <div style="font-weight:700;font-size:13px">${A}</div>
        </div>`}).join(""),_.querySelectorAll("[data-gc-id]").forEach(A=>{A.addEventListener("click",()=>at(A.dataset.gcType,n))})}t.querySelectorAll(".col-tab-btn").forEach(_=>{_.addEventListener("click",()=>{h=_.dataset.tab,$="Tous",x="",w=!1,t.querySelectorAll(".col-tab-btn").forEach(I=>{const A=I.dataset.tab===h;I.style.borderBottomColor=A?"var(--green)":"transparent",I.style.color=A?"var(--green)":"var(--gray-600)"}),M(),C()})}),M(),C()}function at(t,e){const i=re[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const Y=1e3;function st(t,e,i,o){var m,g,b;const{state:s,toast:n,closeModal:a,navigate:c,refreshProfile:l}=i,r=t.formation,d={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function f(){const h=ye[r]||{},$=W[r]||[],x=290,w=360,E=20;function v(L){const M=h[L];return M?{x:M.x*x,y:M.y*w}:null}let T=`<svg width="${x}" height="${w}" viewBox="0 0 ${x} ${w}" xmlns="http://www.w3.org/2000/svg">`;for(const[L,M]of $){const C=v(L),j=v(M);!C||!j||(T+=`<line x1="${C.x}" y1="${C.y}" x2="${j.x}" y2="${j.y}"
        stroke="#FFD700" stroke-width="2.5" stroke-dasharray="4,3" opacity="0.85"/>`)}for(const L of Object.keys(h)){const M=v(L);if(!M)continue;const C=L.replace(/\d+/,""),j=d[C]||"#555";T+=`<circle cx="${M.x}" cy="${M.y}" r="${E}" fill="${j}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,T+=`<text x="${M.x}" y="${M.y+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${C}</text>`}return T+="</svg>",T}const p=e.filter(h=>h.formation===r),u=p.length,y=!t.is_for_sale;o(`Formation ${r}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${f()}
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
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${Y.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${u-1} carte${u-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-form-btn" ${u<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${y?`
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price-form" min="1" placeholder="Prix en crédits" value="${Y}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-form-btn">Mettre en vente</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?`
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-form-btn">Retirer</button>
    </div>`:""}`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`),(m=document.getElementById("direct-sell-form-btn"))==null||m.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte Formation ${r} pour ${Y.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const h=p.find(x=>!x.is_for_sale)||p[0];if(!h){n("Aucune carte à vendre","error");return}const{error:$}=await k.from("cards").delete().eq("id",h.id);if($){n($.message,"error");return}await k.from("users").update({credits:(s.profile.credits||0)+Y}).eq("id",s.profile.id),await l(),n(`+${Y.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),a(),c("collection")}),(g=document.getElementById("market-sell-form-btn"))==null||g.addEventListener("click",async()=>{const h=parseInt(document.getElementById("sell-price-form").value);if(!h||h<1){n("Prix invalide","error");return}await k.from("cards").update({is_for_sale:!0,sale_price:h}).eq("id",t.id),await k.from("market_listings").insert({seller_id:s.profile.id,card_id:t.id,price:h}),n("Carte mise en vente sur le marché !","success"),a(),c("collection")}),(b=document.getElementById("cancel-sell-form-btn"))==null||b.addEventListener("click",async()=>{await k.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await k.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),a(),c("collection")})}function dt(t,e,i,o){var E,v,T,L,M,C;const{state:s,toast:n,openModal:a,closeModal:c,navigate:l,refreshProfile:r}=o,d=t.player,f=e.filter(j=>j.player.id===d.id),p=f.length,u=ot[d.rarity]||1e3,y=d.rarity!=="legende",m=qe(d),g=X(d,d.job),b=d.job2?X(d,d.job2):null,h=ae[d.job]||"#1A6B3C",$=d.job2?ae[d.job2]:null,x=Re[d.rarity]||"#ccc",w=me[d.country_code]||d.country_code||"";a(`${d.firstname} ${d.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${x};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${d.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(d.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${h}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${h}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${g}</text>
            </svg>
            ${b!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${$}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${b}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${m?`<img src="${m}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${d.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${w}</div>
            ${(E=d.clubs)!=null&&E.logo_url?`<img src="${d.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(((v=d.clubs)==null?void 0:v.encoded_name)||"").slice(0,6)}</div>`}
          </div>
        </div>
      </div>

      <!-- Infos -->
      <div style="flex:1;min-width:160px;display:flex;flex-direction:column;gap:10px">
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">RARETÉ</div>
          <div style="font-weight:700;color:${x}">${d.rarity.toUpperCase()}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">POSTE</div>
          <div style="font-weight:700">${d.job}${d.job2?" / "+d.job2:""}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">NOTES</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:12px">
            <span>GK <b>${d.note_g||0}</b></span>
            <span>DEF <b>${d.note_d||0}</b></span>
            <span>MIL <b>${d.note_m||0}</b></span>
            <span>ATT <b>${d.note_a||0}</b></span>
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
    ${y&&!t.is_for_sale?`
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${d.sell_price||5e3}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-btn">Mettre en vente</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?`
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-btn">Retirer</button>
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(T=document.getElementById("close-detail"))==null||T.addEventListener("click",c),(L=document.getElementById("direct-sell-btn"))==null||L.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${d.surname_encoded} pour ${u.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const j=f.find(le=>!le.is_for_sale)||f[0];if(!j){n("Aucune carte à vendre","error");return}const{error:ee}=await k.from("cards").delete().eq("id",j.id);if(ee){n(ee.message,"error");return}await k.from("users").update({credits:(s.profile.credits||0)+u}).eq("id",s.profile.id),await r(),n(`+${u.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),c(),l("collection")}),(M=document.getElementById("market-sell-btn"))==null||M.addEventListener("click",async()=>{const j=parseInt(document.getElementById("sell-price").value);if(!j||j<1){n("Prix invalide","error");return}await k.from("cards").update({is_for_sale:!0,sale_price:j}).eq("id",t.id),await k.from("market_listings").insert({seller_id:s.profile.id,card_id:t.id,price:j}),n("Carte mise en vente sur le marché !","success"),c(),l("collection")}),(C=document.getElementById("cancel-sell-btn"))==null||C.addEventListener("click",async()=>{await k.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await k.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),c(),l("collection")})}const se={"4-3-3 (3)":{GK:1,DEF:4,MIL:3,ATT:3},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-3-3 (4)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-2-1":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (2)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (5)":{GK:1,DEF:4,MIL:3,ATT:3},"5-2-2-1":{GK:1,DEF:5,MIL:2,ATT:3},"4-3-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"5-2-1-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-5-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"4-5-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-1-1":{GK:1,DEF:4,MIL:4,ATT:2},"4-1-2-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"3-4-1-2":{GK:1,DEF:3,MIL:5,ATT:2},"3-4-2-1":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"4-1-4-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-2-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-2-3-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-3-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"4-1-2-1-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2}},H={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function xe(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function Ne(t,e){const{state:i,navigate:o,toast:s}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await k.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(n==null?void 0:n.length)||0} deck(s) · 11 titulaires + 5 remplaçants max</p>
    </div>
    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${(n==null?void 0:n.length)>0?n.map(a=>`
          <div class="card-panel" style="display:flex;justify-content:space-between;align-items:center;padding:14px">
            <div>
              <div style="font-weight:700;font-size:14px">${a.name}
                ${a.is_active?'<span style="font-size:10px;background:var(--green);color:#fff;padding:2px 6px;border-radius:8px;margin-left:4px">ACTIF</span>':""}
              </div>
            </div>
            <div style="display:flex;gap:6px">
              ${a.is_active?"":`<button class="btn btn-ghost btn-sm" data-activate="${a.id}">Activer</button>`}
              <button class="btn btn-primary btn-sm" data-edit="${a.id}">✏️ Éditer</button>
            </div>
          </div>`).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun deck. Crée ton premier !</div>'}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-primary" id="new-deck-btn" style="width:100%">+ Nouveau deck</button>
      </div>
    </div>
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const a=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!a)return;const{data:c,error:l}=await k.from("decks").insert({owner_id:i.profile.id,name:a,is_active:!(n!=null&&n.length)}).select().single();if(l){s(l.message,"error");return}s("Deck créé !","success"),Ie(c.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(a=>{a.addEventListener("click",()=>Ie(a.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(a=>{a.addEventListener("click",async()=>{await k.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await k.from("decks").update({is_active:!0}).eq("id",a.dataset.activate),s("Deck activé !","success"),Ne(t,e)})})}async function Ie(t,e,i){const{state:o,toast:s}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await k.from("decks").select("*").eq("id",t).single(),{data:a}=await k.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),c=(a||[]).filter(u=>u.card_type==="player"&&u.player),l=(a||[]).filter(u=>u.card_type==="formation"),r=l.map(u=>u.formation).filter(Boolean),{data:d}=await k.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let f=n.formation||"4-4-2";r.length>0&&!r.includes(f)&&(f=r[0]);const p={deckId:t,name:n.name,formation:f,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:c,formationCards:l,availableFormations:r};(d||[]).forEach(u=>{u.is_starter?p.slots[u.position]=u.card_id:p.subs.includes(u.card_id)||p.subs.push(u.card_id)}),U(e,p,i)}function U(t,e,i){var l;const{navigate:o}=i;se[e.formation];const s=Ae(e.formation),n=s.filter(r=>e.slots[r]).length,a=e.availableFormations.length>0?e.availableFormations:Object.keys(se),c=e.subs.map(r=>e.playerCards.find(d=>d.id===r)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
        ${a.map(r=>`<option value="${r}" ${r===e.formation?"selected":""}>${r}</option>`).join("")}
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
        ${c.map(r=>{const d=r.player;return`<div style="display:flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px">
            <span style="background:${H[d.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${d.job}</span>
            ${d.firstname} ${d.surname_encoded}
            <button style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:14px" data-remove-sub="${r.id}">✕</button>
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
  </div>`,lt(t,e,s,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",r=>{e.formation=r.target.value;const d=Ae(e.formation),f={};d.forEach(p=>{e.slots[p]&&(f[p]=e.slots[p])}),e.slots=f,U(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>ft(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(r=>{r.addEventListener("click",()=>{e.subs=e.subs.filter(d=>d!==r.dataset.removeSub),U(t,e,i)})}),(l=document.getElementById("add-sub-btn"))==null||l.addEventListener("click",()=>{pt(e,t,i)})}function lt(t,e,i,o){const s=document.getElementById("deck-field");if(!s)return;const n=e.formation,a=ye[n]||{},c=ce?ce(n)||W[n]||[]:W[n]||[],l={};i.forEach($=>{const x=e.slots[$],w=x?e.playerCards.find(E=>E.id===x):null;l[$]=(w==null?void 0:w.player)||null});const r=i.filter($=>$.startsWith("MIL"));let d=0,f=0;r.forEach($=>{const x=l[$];x&&(d+=Number(x.note_m)||0)}),c.forEach(([$,x])=>{if(!$.startsWith("MIL")||!x.startsWith("MIL"))return;J(l[$],l[x])!=="#ff3333"&&f++});const p=320,u=320,y=28,m=4;function g($){const x=a[$];return x?{x:x.x*p,y:x.y*u}:null}let b="";for(const[$,x]of c){const w=g($),E=g(x);if(!w||!E)continue;const v=l[$],T=l[x],L=J(v,T);if(L==="#00ff88"||L==="#FFD700")b+=`<line x1="${w.x}" y1="${w.y}" x2="${E.x}" y2="${E.y}"
        stroke="${L}" stroke-width="${m*3}" stroke-linecap="round" opacity="0.25"/>`,b+=`<line x1="${w.x}" y1="${w.y}" x2="${E.x}" y2="${E.y}"
        stroke="${L}" stroke-width="${m}" stroke-linecap="round" opacity="0.95"/>`;else{const C=L==="#ff3333"||L==="#cc2222"?.75:.9;b+=`<line x1="${w.x}" y1="${w.y}" x2="${E.x}" y2="${E.y}"
        stroke="${L}" stroke-width="${m}" stroke-linecap="round" opacity="${C}"/>`}}for(const $ of i){const x=g($);if(!x)continue;const w=l[$],E=$.replace(/\d+/,""),T={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[E]||"#555",L=w?Number(E==="GK"?w.note_g:E==="DEF"?w.note_d:E==="MIL"?w.note_m:w.note_a)||0:null,M=w?(w.surname_encoded||"").slice(0,8).toUpperCase():"";if(w){const C=xe(w);C&&(b+=`
          <defs>
            <clipPath id="clip-${$}">
              <circle cx="${x.x}" cy="${x.y}" r="${y}"/>
            </clipPath>
          </defs>
          <image href="${C}" x="${x.x-y}" y="${x.y-y}" width="${y*2}" height="${y*2}"
            clip-path="url(#clip-${$})" preserveAspectRatio="xMidYMid slice" opacity="0.85"/>`),b+=`
        <circle cx="${x.x}" cy="${x.y}" r="${y}" fill="${C?"transparent":T}"
          stroke="${T}" stroke-width="2" />
        <circle cx="${x.x}" cy="${x.y}" r="${y}" fill="${T}" opacity="${C?"0.5":"1"}"
          stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        ${C?`<image href="${C}" x="${x.x-y}" y="${x.y-y}" width="${y*2}" height="${y*2}"
          clip-path="url(#clip-${$})" preserveAspectRatio="xMidYMid slice" opacity="0.9"/>`:""}
        <text x="${x.x}" y="${x.y-3}" text-anchor="middle" font-size="13" font-weight="900"
          fill="white" font-family="Arial Black,Arial" style="text-shadow:0 1px 2px #000">${L}</text>
        <text x="${x.x}" y="${x.y+11}" text-anchor="middle" font-size="6.5" fill="rgba(255,255,255,0.9)"
          font-family="Arial">${M}</text>
        <rect x="${x.x-y}" y="${x.y-y}" width="${y*2}" height="${y*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${$}" style="cursor:pointer"/>`}else b+=`
        <circle cx="${x.x}" cy="${x.y}" r="${y}" fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="${x.x}" y="${x.y+6}" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.4)"
          font-family="Arial">+</text>
        <rect x="${x.x-y}" y="${x.y-y}" width="${y*2}" height="${y*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${$}" style="cursor:pointer"/>`}const h="";s.innerHTML=`
    <!-- Badge MIL -->
    ${r.length>0?`
    <div style="position:absolute;top:6px;right:8px;z-index:10;
      background:rgba(212,160,23,0.95);color:#000;border-radius:8px;
      padding:3px 10px;font-size:11px;font-weight:900;pointer-events:none">
      MIL ${d}${f>0?` +${f}`:""} ⚡
    </div>`:""}

    <svg viewBox="0 0 ${p} ${u}" width="100%" style="display:block;max-width:380px;margin:0 auto">
      ${h}
      ${b}
    </svg>`,s.querySelectorAll(".deck-slot-hit").forEach($=>{$.addEventListener("click",()=>ct($.dataset.pos,e,t,o))})}function ct(t,e,i,o){var p,u,y;const{openModal:s,closeModal:n}=o,a=t.replace(/\d+/,""),c=e.slots[t],l=c?e.playerCards.find(m=>m.id===c):null;(p=l==null?void 0:l.player)==null||p.id;const r=new Set;Object.entries(e.slots).forEach(([m,g])=>{var h;if(m===t||!g)return;const b=e.playerCards.find($=>$.id===g);(h=b==null?void 0:b.player)!=null&&h.id&&r.add(b.player.id)}),e.subs.forEach(m=>{var b;const g=e.playerCards.find(h=>h.id===m);(b=g==null?void 0:g.player)!=null&&b.id&&r.add(g.player.id)});const d=new Set,f=e.playerCards.filter(m=>{const g=m.player;return!(g.job===a||g.job2===a)||r.has(g.id)||d.has(g.id)?!1:(d.add(g.id),!0)});f.sort((m,g)=>{const b=a==="GK"?m.player.note_g:a==="DEF"?m.player.note_d:a==="MIL"?m.player.note_m:m.player.note_a;return(a==="GK"?g.player.note_g:a==="DEF"?g.player.note_d:a==="MIL"?g.player.note_m:g.player.note_a)-b}),s(`Choisir ${a} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${f.length>0?f.map(m=>{var x,w;const g=m.player,b=a==="GK"?g.note_g:a==="DEF"?g.note_d:a==="MIL"?g.note_m:g.note_a,h=xe(g),$={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[g.rarity];return`<div class="player-option" data-card-id="${m.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${H[a]}">
            ${h?`<img src="${h}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${H[a]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${a}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${g.firstname} ${g.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${g.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${g.country_code}">
              ${(x=g.clubs)!=null&&x.logo_url?`<img src="${g.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((w=g.clubs)==null?void 0:w.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${g.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${H[a]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${$};flex-shrink:0">
            ${b}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(u=document.getElementById("close-selector"))==null||u.addEventListener("click",n),(y=document.getElementById("remove-player"))==null||y.addEventListener("click",()=>{delete e.slots[t],n(),U(i,e,o)}),document.querySelectorAll(".player-option").forEach(m=>{m.addEventListener("click",()=>{e.slots[t]=m.dataset.cardId,n(),U(i,e,o)})})}function pt(t,e,i){var l;const{openModal:o,closeModal:s}=i,n=new Set;Object.values(t.slots).filter(Boolean).forEach(r=>{var f;const d=t.playerCards.find(p=>p.id===r);(f=d==null?void 0:d.player)!=null&&f.id&&n.add(d.player.id)}),t.subs.forEach(r=>{var f;const d=t.playerCards.find(p=>p.id===r);(f=d==null?void 0:d.player)!=null&&f.id&&n.add(d.player.id)});const a=new Set,c=t.playerCards.filter(r=>{var d,f,p;return n.has((d=r.player)==null?void 0:d.id)||a.has((f=r.player)==null?void 0:f.id)?!1:(a.add((p=r.player)==null?void 0:p.id),!0)});o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${c.length>0?c.map(r=>{var u;const d=r.player,f=xe(d),p=d.job==="GK"?d.note_g:d.job==="DEF"?d.note_d:d.job==="MIL"?d.note_m:d.note_a;return`<div class="player-option" data-card-id="${r.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${H[d.job]}">
            ${f?`<img src="${f}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${d.firstname} ${d.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${d.job} · ${d.country_code} · ${((u=d.clubs)==null?void 0:u.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${H[d.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${p}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(l=document.getElementById("close-sub-selector"))==null||l.addEventListener("click",s),document.querySelectorAll(".player-option").forEach(r=>{r.addEventListener("click",()=>{t.subs.push(r.dataset.cardId),s(),U(e,t,i)})})}async function ft(t,e){const{state:i,toast:o,navigate:s}=e,n=t.formationCards.find(r=>r.formation===t.formation),a=(n==null?void 0:n.id)||t.formationCardId,{error:c}=await k.from("decks").update({formation:t.formation,formation_card_id:a||null}).eq("id",t.deckId);if(c){o(c.message,"error");return}await k.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([r,d],f)=>{l.push({deck_id:t.deckId,card_id:d,position:r,is_starter:!0,slot_order:f})}),t.subs.forEach((r,d)=>{l.push({deck_id:t.deckId,card_id:r,position:`SUB${d+1}`,is_starter:!1,slot_order:100+d})}),l.length>0){const{error:r}=await k.from("deck_cards").insert(l);if(r){o(r.message,"error");return}}o("Deck enregistré ✅","success"),s("decks")}function Ae(t){const e=se[t]||se["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const Te=[{id:"players_std",img:"/manager-wars/icons/booster-players.png",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",img:"/manager-wars/icons/booster-silver.png",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",img:"/manager-wars/icons/booster-gamechanger.png",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",img:"/manager-wars/icons/booster-formation.png",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],Oe={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function ut(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const gt={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},yt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function mt(t,{state:e,navigate:i,toast:o}){var n;const s=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${s.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${Te.map(a=>{const c=s>=a.cost||a.cost===0,l=a.id==="players_std"||a.id==="players_pub";return`<div class="booster-card ${c?"":"disabled"}" data-booster="${a.id}" style="position:relative">
            ${l?`<button class="booster-info-btn" data-info="${a.id}"
              style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;
              background:rgba(0,0,0,0.15);border:none;cursor:pointer;font-size:11px;font-weight:700;
              color:var(--gray-600);display:flex;align-items:center;justify-content:center;z-index:2"
              onclick="event.stopPropagation()">ℹ</button>`:""}
            <div class="icon"><img src="${a.img}" alt="${a.name}" style="height:64px;width:auto;display:block;margin:0 auto"></div>
            <div class="name">${a.name}</div>
            <div class="desc">${a.sub}</div>
            <div class="cost">${a.costLabel}</div>
            ${c?"":'<div style="font-size:10px;color:#c0392b;margin-top:4px">Crédits insuffisants</div>'}
          </div>`}).join("")}
      </div>
      <div class="card-panel" style="font-size:13px;color:var(--gray-600);line-height:1.7;margin-top:8px">
        <b>📌 Rappels</b><br>
        • 1er booster Players contient toujours un Gardien.<br>
        • Game Helper : carte éphémère disparaît en fin de match.<br>
        • Cartes Légende = non revendables.
      </div>
    </div>
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(a=>{a.addEventListener("click",async()=>{const c=Te.find(l=>l.id===a.dataset.booster);if(c){a.style.opacity="0.5",a.style.pointerEvents="none";try{await xt(c,{state:e,toast:o,navigate:i,container:t})}catch(l){o(l.message,"error"),a.style.opacity="",a.style.pointerEvents=""}}})}),t.querySelectorAll(".booster-info-btn").forEach(a=>{a.addEventListener("click",c=>{c.stopPropagation(),_t()})})}async function xt(t,{state:e,toast:i,navigate:o,container:s}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await Et();const{data:n}=await k.from("cards").select("card_type, player_id, formation").eq("owner_id",e.profile.id),a=new Set((n||[]).filter(d=>d.card_type==="player").map(d=>d.player_id)),c=new Set((n||[]).filter(d=>d.card_type==="formation").map(d=>d.formation));let l=[];t.type==="player"?l=await ht(e.profile,t.cardCount,t.cost):t.type==="game_changer"?l=await wt(e.profile,t.cardCount,t.cost):t.type==="formation"&&(l=await $t(e.profile,t.cost)),l.forEach(d=>{d.card_type==="player"&&d.player?d.isDuplicate=a.has(d.player.id):d.card_type==="formation"&&(d.isDuplicate=c.has(d.formation))});const{data:r}=await k.from("users").select("*").eq("id",e.profile.id).single();r&&(e.profile=r),kt(l,t,o)}function vt(){const t=Math.random()*100;return t<.5?"legende":t<2?"special":t<10?"normal_high":"normal_low"}function P(t){return Math.max(Number(t.note_g)||0,Number(t.note_d)||0,Number(t.note_m)||0,Number(t.note_a)||0)}function bt(t,e){let i;switch(e){case"legende":i=t.filter(o=>o.rarity==="legende"),i.length||(i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte")),i.length||(i=t.filter(o=>P(o)>=6));break;case"special":i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte"),i.length||(i=t.filter(o=>P(o)>=6));break;case"normal_high":i=t.filter(o=>o.rarity==="normal"&&P(o)>=6),i.length||(i=t.filter(o=>P(o)>=6));break;default:i=t.filter(o=>o.rarity==="normal"&&P(o)>=1&&P(o)<=5),i.length||(i=t.filter(o=>o.rarity==="normal"));break}return i.length||(i=t),i[Math.floor(Math.random()*i.length)]}async function ht(t,e,i){if(i>0){const{error:r}=await k.from("users").update({credits:t.credits-i}).eq("id",t.id);if(r)throw r}const{data:o}=await k.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const s=o.filter(r=>r.job==="GK"),n=o.filter(r=>r.job!=="GK"),a=!t.first_booster_opened&&s.length>0,c=[];for(let r=0;r<e;r++){const d=r===0&&a?s:r===0?n:o,f=vt(),p=bt(d,f);p&&c.push(p)}a&&await k.from("users").update({first_booster_opened:!0}).eq("id",t.id);const{data:l}=await k.from("cards").insert(c.map(r=>({owner_id:t.id,player_id:r.id,card_type:"player"}))).select();return c.map((r,d)=>({...l[d],player:r}))}async function wt(t,e,i){const{error:o}=await k.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const s=Object.keys(Oe),n=Array.from({length:e},()=>s[Math.floor(Math.random()*s.length)]),{data:a}=await k.from("cards").insert(n.map(c=>({owner_id:t.id,card_type:"game_changer",gc_type:c}))).select();return a}async function $t(t,e){const{error:i}=await k.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],s=o[Math.floor(Math.random()*o.length)],{data:n}=await k.from("cards").insert({owner_id:t.id,card_type:"formation",formation:s}).select();return n}function kt(t,e,i){const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
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
  `,document.body.appendChild(o);let s=!1;document.getElementById("pack-visual").addEventListener("click",()=>{if(s)return;s=!0;const p=document.getElementById("pack-visual");p.classList.add("shaking"),setTimeout(()=>{p.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none",a(0)},600)},500)});let n=0;function a(p){n=p;const u=document.getElementById("reveal-phase");u.style.display="flex",c(p)}function c(p){var w;const u=t[p],y=document.getElementById("card-counter"),m=document.getElementById("single-card-slot"),g=document.getElementById("card-tap-hint");y&&(y.textContent=`Carte ${p+1} / ${t.length}`),g&&(g.textContent=p<t.length-1?"Appuie pour continuer →":"Appuie pour voir toutes tes cartes");const b=Le(u),h=u.card_type==="player"&&((w=u.player)==null?void 0:w.rarity)==="legende";m.innerHTML=`
      <div id="current-card-wrap" class="single-card-reveal" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;${h?"filter:drop-shadow(0 0 20px #7a28b8)":""}">
        ${b}
        ${u.isDuplicate?'<div style="font-size:11px;font-weight:700;color:#fff;background:#cc2222;border-radius:8px;padding:2px 10px">Doublon</div>':""}
      </div>`,h&&d();const $=document.getElementById("current-card-wrap");let x=!1;$.addEventListener("click",()=>{if(x)return;x=!0;const E=p+1;E<t.length?($.style.transition="all 0.25s ease",$.style.transform="translateX(-120%) rotate(-15deg)",$.style.opacity="0",setTimeout(()=>c(E),250)):l()})}function l(){f(),document.getElementById("reveal-phase").style.display="none";const p=document.getElementById("recap-phase");p.style.display="flex";const u=document.getElementById("recap-grid");u.innerHTML=t.map((y,m)=>`
      <div class="recap-card" style="--i:${m};animation-delay:${m*.07}s;display:flex;flex-direction:column;align-items:center;gap:4px">
        ${Le(y)}
        ${y.isDuplicate?'<div style="font-size:11px;font-weight:700;color:#fff;background:#cc2222;border-radius:8px;padding:2px 10px">Doublon</div>':""}
      </div>`).join("")}let r=null;function d(){const p=document.getElementById("fireworks-canvas");if(!p)return;p.width=window.innerWidth,p.height=window.innerHeight;const u=p.getContext("2d"),y=[];function m(){const b=Math.random()*p.width,h=Math.random()*p.height*.6,$=["#7a28b8","#ff4081","#D4A017","#00e676","#fff","#e040fb","#40c4ff"],x=$[Math.floor(Math.random()*$.length)];for(let w=0;w<60;w++){const E=Math.PI*2/60*w,v=2+Math.random()*5;y.push({x:b,y:h,vx:Math.cos(E)*v,vy:Math.sin(E)*v,alpha:1,color:x,size:2+Math.random()*3})}}m(),r=setInterval(m,600);function g(){if(document.getElementById("fireworks-canvas")){u.clearRect(0,0,p.width,p.height);for(let b=y.length-1;b>=0;b--){const h=y[b];if(h.x+=h.vx,h.y+=h.vy+.08,h.vy*=.98,h.alpha-=.018,h.alpha<=0){y.splice(b,1);continue}u.globalAlpha=h.alpha,u.fillStyle=h.color,u.beginPath(),u.arc(h.x,h.y,h.size,0,Math.PI*2),u.fill()}u.globalAlpha=1,(r!==null||y.length>0)&&requestAnimationFrame(g)}}g()}function f(){r!==null&&(clearInterval(r),r=null);const p=document.getElementById("fireworks-canvas");p&&p.getContext("2d").clearRect(0,0,p.width,p.height)}document.getElementById("reveal-collection").addEventListener("click",()=>{f(),o.remove(),i("collection")}),document.getElementById("reveal-more").addEventListener("click",()=>{f(),o.remove(),i("boosters")})}function Le(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,s=o.job||"ATT",n=gt[s]||"#1A6B3C",a=yt[o.rarity]||"#ccc",c=s==="GK"?o.note_g:s==="DEF"?o.note_d:s==="MIL"?o.note_m:o.note_a,l=ut(o),r={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${a};overflow:hidden;display:flex;flex-direction:column">
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
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${c||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${l?`<img src="${l}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${o.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${r}</div>
        ${(e=o.clubs)!=null&&e.logo_url?`<img src="${o.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((i=o.clubs)==null?void 0:i.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const o=Oe[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${o.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${o.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function _t(){const t=document.createElement("div");t.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;
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
  `,document.body.appendChild(t),t.addEventListener("click",e=>{e.target===t&&t.remove()}),document.getElementById("odds-close").addEventListener("click",()=>t.remove())}function Et(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let i=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const s=document.getElementById("ad-cd");s&&(s.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}const V={"4-3-3 (3)":{GK:1,DEF:4,MIL:3,ATT:3},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-3-3 (4)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-2-1":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (2)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (5)":{GK:1,DEF:4,MIL:3,ATT:3},"5-2-2-1":{GK:1,DEF:5,MIL:2,ATT:3},"4-3-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"5-2-1-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-5-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"4-5-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-1-1":{GK:1,DEF:4,MIL:4,ATT:2},"4-1-2-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"3-4-1-2":{GK:1,DEF:3,MIL:5,ATT:2},"3-4-2-1":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"4-1-4-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-2-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-2-3-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-3-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"4-1-2-1-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2}},K={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function Ke(t,e,i,o,s){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",s)}function Q(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function pe(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,skin:e.skin,hair:e.hair,hair_length:e.hair_length,boost:0,used:!1,_line:null,_col:null}}function ve(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function It(){const t=Math.random()*100;return t<.1?4:t<5?3:t<20?2:1}function Pe(t,e){const i=V[e]||V["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},s=[...t];for(const n of["GK","DEF","MIL","ATT"]){const a=[];for(let l=0;l<i[n];l++){let r=s.findIndex(d=>d.job===n);if(r===-1&&(r=s.findIndex(d=>d.job2===n)),r===-1&&(r=0),s[r]){const d={...s[r],_line:n};a.push(d),s.splice(r,1)}}const c=ve(a.length);a.forEach((l,r)=>{l._col=c[r]}),o[n]=a}return o}async function At(t,e){const{data:i}=await k.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length").eq("is_active",!0).limit(60);if(!i||i.length<11)return Tt(t);const o=V[t]||V["4-4-2"],s={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const a of["GK","DEF","MIL","ATT"]){const c=n.filter(p=>p.job===a),l=n.filter(p=>p.job!==a),r=[...c,...l],d=[];for(let p=0;p<o[a];p++){const u=r[p]||n[p];u&&d.push({cardId:"ai-"+u.id+"-"+p,id:u.id,firstname:u.firstname,name:u.surname_encoded,country_code:u.country_code,club_id:u.club_id,job:u.job,job2:u.job2,note_g:Number(u.note_g)||0,note_d:Number(u.note_d)||0,note_m:Number(u.note_m)||0,note_a:Number(u.note_a)||0,rarity:u.rarity,skin:u.skin,hair:u.hair,hair_length:u.hair_length,boost:0,used:!1,_line:a})}const f=ve(d.length);d.forEach((p,u)=>{p._col=f[u]}),s[a]=d}return s}function Tt(t){const e=V[t]||V["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let s=0;for(const n of["GK","DEF","MIL","ATT"]){const a=[];for(let l=0;l<e[n];l++){const r=3+Math.floor(Math.random()*5);a.push({cardId:"fake-"+s,id:"fake-"+s,firstname:"IA",name:o[s%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?r:2,note_d:n==="DEF"?r:2,note_m:n==="MIL"?r:2,note_a:n==="ATT"?r:2,rarity:"normal",boost:0,used:!1,_line:n}),s++}const c=ve(a.length);a.forEach((l,r)=>{l._col=c[r]}),i[n]=a}return i}async function Lt(t,e){var w;const{state:i,navigate:o,toast:s}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const a=n.matchMode||"vs_ai_easy",c=a.replace("vs_ai_",""),l=a;if(!n.deckId)return Mt(t,e,a);const r=n.deckId,[{data:d},{data:f}]=await Promise.all([k.from("decks").select("formation,name").eq("id",r).single(),k.from("deck_cards").select(`position, is_starter, slot_order,
        card:cards(id, card_type, formation,
          player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
            note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
            clubs(encoded_name,logo_url)))`).eq("deck_id",r).order("slot_order")]),p=(f||[]).filter(E=>{var v;return E.is_starter&&((v=E.card)==null?void 0:v.player)}).map(E=>pe(E.card)),u=(f||[]).filter(E=>{var v;return!E.is_starter&&((v=E.card)==null?void 0:v.player)}).map(E=>pe(E.card));if(p.length<11){Ke(t,"⚠️",`Deck incomplet (${p.length}/11).`,"Compléter",()=>o("decks"));return}const y=(f||[]).find(E=>{var v;return((v=E.card)==null?void 0:v.card_type)==="formation"}),m=(d==null?void 0:d.formation)||((w=y==null?void 0:y.card)==null?void 0:w.formation)||"4-4-2",{data:g}=await k.from("cards").select("id,gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),b=Pe(p,m),h=await At(m),{data:$}=await k.from("matches").insert({home_id:i.profile.id,away_id:null,mode:l,home_deck_id:r,status:"in_progress"}).select().single(),x={matchId:$==null?void 0:$.id,mode:l,difficulty:c,formation:m,homeTeam:b,aiTeam:h,homeSubs:u,subsUsed:0,maxSubs:Math.min(u.length,3),homeScore:0,aiScore:0,gcCards:g||[],usedGc:[],boostCard:null,boostUsed:!1,phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},clubName:i.profile.club_name||"Vous"};Ct(t,x,e)}async function Mt(t,e,i){const{state:o,navigate:s}=e;t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await k.from("decks").select("id,name,is_active,formation").eq("owner_id",o.profile.id).order("created_at",{ascending:!1});if(!n||n.length===0){Ke(t,"📋","Aucun deck. Crée un deck avant de jouer !","Créer un deck",()=>s("decks"));return}const a=n.map(d=>d.id),{data:c}=await k.from("deck_cards").select(`deck_id, position, is_starter, slot_order,
      card:cards(id,card_type,formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length))`).in("deck_id",a).order("slot_order");let l=0;function r(){var h,$,x,w,E;const d=n[l],f=(c||[]).filter(v=>v.deck_id===d.id),p=f.filter(v=>{var T;return v.is_starter&&((T=v.card)==null?void 0:T.player)}).map(v=>pe(v.card)),u=f.find(v=>{var T;return((T=v.card)==null?void 0:T.card_type)==="formation"}),y=d.formation||((h=u==null?void 0:u.card)==null?void 0:h.formation)||"4-4-2",m=p.length>=11?Pe(p,y):null,g=p.length>=11;t.innerHTML=`
    <div id="deck-select-screen" style="display:flex;flex-direction:column;height:calc(100vh - 130px);overflow:hidden;background:#0a3d1e;color:#fff">

      <!-- Header -->
      <div style="padding:10px 16px;background:rgba(0,0,0,0.4);text-align:center;flex-shrink:0">
        <div style="font-size:10px;opacity:.6;letter-spacing:2px;text-transform:uppercase">Match vs IA — ${i.replace("vs_ai_","").toUpperCase()}</div>
        <div style="font-size:17px;font-weight:900;margin-top:2px">Choisis ton deck</div>
      </div>

      <!-- Navigation deck -->
      <div style="display:flex;align-items:center;gap:8px;padding:8px;flex-shrink:0">
        <button id="prev-deck" style="width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,${l===0?"0.05":"0.15"});border:2px solid rgba(255,255,255,${l===0?"0.1":"0.3"});color:${l===0?"rgba(255,255,255,0.2)":"#fff"};font-size:20px;cursor:${l===0?"default":"pointer"};flex-shrink:0">◀</button>
        <div style="flex:1;text-align:center">
          <div style="font-size:19px;font-weight:900">${d.name}</div>
          <div style="font-size:11px;opacity:.6;margin-top:2px">${y} · ${p.length}/11 ${d.is_active?"· ⭐ Actif":""}</div>
        </div>
        <button id="next-deck" style="width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,${l===n.length-1?"0.05":"0.15"});border:2px solid rgba(255,255,255,${l===n.length-1?"0.1":"0.3"});color:${l===n.length-1?"rgba(255,255,255,0.2)":"#fff"};font-size:20px;cursor:${l===n.length-1?"default":"pointer"};flex-shrink:0">▶</button>
      </div>

      <!-- Terrain preview : hauteur plafonnée pour que les boutons restent visibles -->
      <div id="deck-swipe-zone" style="flex:1;min-height:0;max-height:min(calc(100vh - 360px), 52vw);overflow:hidden;position:relative;touch-action:pan-y">
        ${m?Ue(m,y,null,[],240,240):`<div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:.4;flex-direction:column;gap:8px">
              <div style="font-size:32px">⚠️</div>
              <div>Deck incomplet (${p.length}/11)</div>
             </div>`}
      </div>

      <!-- Indicateurs pagination -->
      ${n.length>1?`
      <div style="display:flex;justify-content:center;gap:6px;padding:4px;flex-shrink:0">
        ${n.map((v,T)=>`<div style="width:7px;height:7px;border-radius:50%;background:${T===l?"#FFD700":"rgba(255,255,255,0.25)"}"></div>`).join("")}
      </div>`:""}

      <!-- Boutons TOUJOURS VISIBLES -->
      <div style="padding:10px 14px 16px;flex-shrink:0;display:flex;flex-direction:column;gap:8px;background:rgba(0,0,0,0.2)">
        <button id="validate-deck" style="width:100%;padding:15px;border-radius:12px;border:none;
          background:${g?"#1A6B3C":"rgba(255,255,255,0.08)"};
          color:${g?"#fff":"rgba(255,255,255,0.3)"};font-size:16px;font-weight:900;cursor:${g?"pointer":"default"}">
          ${g?"✅ Valider ce deck":"⚠️ Deck incomplet"}
        </button>
        <button id="cancel-deck-select" style="width:100%;padding:11px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,.5);font-size:14px;cursor:pointer">
          Annuler
        </button>
      </div>
    </div>`,($=document.getElementById("prev-deck"))==null||$.addEventListener("click",()=>{l>0&&(l--,r())}),(x=document.getElementById("next-deck"))==null||x.addEventListener("click",()=>{l<n.length-1&&(l++,r())}),(w=document.getElementById("validate-deck"))==null||w.addEventListener("click",()=>{g&&e.navigate("match",{matchMode:i,deckId:d.id})}),(E=document.getElementById("cancel-deck-select"))==null||E.addEventListener("click",()=>s("home"));const b=document.getElementById("deck-swipe-zone");if(b){let v=0,T=0;b.addEventListener("touchstart",L=>{v=L.touches[0].clientX,T=L.touches[0].clientY},{passive:!0}),b.addEventListener("touchend",L=>{const M=L.changedTouches[0].clientX-v,C=L.changedTouches[0].clientY-T;Math.abs(M)<40||Math.abs(M)<Math.abs(C)||(M<0&&l<n.length-1?(l++,r()):M>0&&l>0&&(l--,r()))},{passive:!0})}}r()}function Ct(t,e,i){const o=e.homeTeam.MIL||[],s=e.aiTeam.MIL||[];function n(f){return f.reduce((p,u)=>p+G(u,"MIL"),0)}function a(f){let p=0;for(let u=0;u<f.length-1;u++){const y=J(f[u],f[u+1]);y!=="#ff3333"&&y!=="#cc2222"&&p++}return p}const c=n(o)+a(o),l=n(s)+a(s),r=c>=l;function d(f,p,u){return`<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:2px;margin-bottom:8px;text-transform:uppercase">${p}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${f.map((y,m)=>{const g=Q(y),b=m<f.length-1?J(y,f[m+1]):null,h=b&&b!=="#ff3333"&&b!=="#cc2222";return`
          <div style="width:52px;height:52px;border-radius:8px;background:${u};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${g?`<img src="${g}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:""}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000;text-align:center;padding-top:4px">${G(y,"MIL")}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 2px">${y.name}</div>
          </div>
          ${b?`<div style="width:14px;height:4px;border-radius:2px;background:${b};flex-shrink:0;opacity:${h?.9:.3}"></div>`:""}
          `}).join("")}
      </div>
      <div style="margin-top:6px;font-size:11px;color:rgba(255,255,255,0.5)">
        Score: ${n(f)} + ${a(f)} liens = <b style="color:#fff">${n(f)+a(f)}</b>
      </div>
    </div>`}t.innerHTML=`
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:24px;padding:24px;background:#0a3d1e">
    <div style="text-align:center;color:#fff">
      <div style="font-size:11px;opacity:.5;letter-spacing:2px;text-transform:uppercase">Duel du milieu de terrain</div>
    </div>

    ${d(o,e.clubName,"#D4A017")}

    <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
      <div id="score-home" style="font-size:48px;font-weight:900;color:#D4A017;transition:all 0.6s ease">${c}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4);letter-spacing:2px">VS</div>
      <div id="score-ai" style="font-size:48px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.6s ease">${l}</div>
    </div>

    ${d(s,"IA","#bb2020")}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff;max-width:320px"></div>
  </div>`,setTimeout(()=>{const f=document.getElementById("score-home"),p=document.getElementById("score-ai"),u=document.getElementById("midfield-result");if(f&&p&&(r?(f.style.fontSize="80px",f.style.color="#FFD700",p.style.opacity="0.25"):(p.style.fontSize="80px",p.style.color="#ff6b6b",f.style.opacity="0.25")),u){const y=It();u.style.opacity="1",r&&e.clubName,u.innerHTML=`
        <div style="font-size:20px;font-weight:900;margin-bottom:10px">
          ⚽ ${r?`${e.clubName} gagne le milieu de terrain et attaque !`:"L'IA gagne l'engagement et attaque !"}
        </div>
        ${r?`
        <div style="background:rgba(135,206,235,0.15);border:2px solid #87CEEB;border-radius:14px;padding:14px 24px;display:inline-block;margin-top:4px">
          <div style="font-size:10px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:32px;font-weight:900;color:#87CEEB">+${y}</div>
          <div style="font-size:10px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>`:""}
      `,r&&(e.boostCard={value:y})}e.attacker=r?"home":"ai",e.log.push({text:`Duel milieu : ${e.clubName} ${c} – ${l} IA → ${r?e.clubName+" attaque":"IA attaque"}`,type:"info"}),setTimeout(()=>{e.phase=e.attacker==="home"?"attack":"ai-attack",F(t,e,i),e.attacker==="ai"&&setTimeout(()=>fe(t,e,i),1e3)},2800)},1200)}function He(t,e,i,o,s=310,n=310){const a=ye[e]||{},c=ce(e)||W[e]||[],l=26,r={},d=["ATT","MIL","DEF","GK"];for(const y of d)(t[y]||[]).forEach((g,b)=>{r[`${y}${b+1}`]=g});function f(y){const m=a[y];return m?{x:m.x*s,y:m.y*n}:null}let p="";for(const[y,m]of c){const g=f(y),b=f(m);if(!g||!b)continue;const h=r[y],$=r[m],x=J(h,$);x==="#00ff88"||x==="#FFD700"?(p+=`<line x1="${g.x.toFixed(1)}" y1="${g.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
        stroke="${x}" stroke-width="10" stroke-linecap="round" opacity="0.22"/>`,p+=`<line x1="${g.x.toFixed(1)}" y1="${g.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
        stroke="${x}" stroke-width="3.5" stroke-linecap="round" opacity="0.95"/>`):p+=`<line x1="${g.x.toFixed(1)}" y1="${g.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
        stroke="${x}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>`}for(const[y,m]of Object.entries(r)){const g=f(y);if(!g)continue;const b=y.replace(/[0-9]/g,""),h=K[b]||"#555",$=i==="attack"&&["MIL","ATT"].includes(b)&&!m.used||i==="defense"&&["GK","DEF","MIL"].includes(b)&&!m.used,x=o.includes(m.cardId);let w;i==="attack"?w=b==="MIL"?Number(m.note_m)||0:Number(m.note_a)||0:i==="defense"?w=b==="GK"?Number(m.note_g)||0:b==="MIL"?Number(m.note_m)||0:Number(m.note_d)||0:w=Number(b==="GK"?m.note_g:b==="DEF"?m.note_d:b==="MIL"?m.note_m:m.note_a)||0,w=w+(m.boost||0);const E=x?"#FFD700":$?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)",v=x?3:2,T=m.used?.2:1,L=Q(m);L&&(p+=`<defs><clipPath id="mc-${y}"><circle cx="${g.x}" cy="${g.y}" r="${l}"/></clipPath></defs>`),p+=`<circle cx="${g.x}" cy="${g.y}" r="${l}" fill="${h}" opacity="${T}"
      stroke="${E}" stroke-width="${v}"/>`,L&&!m.used&&(p+=`<image href="${L}" x="${g.x-l}" y="${g.y-l}" width="${l*2}" height="${l*2}"
        clip-path="url(#mc-${y})" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>`,p+=`<circle cx="${g.x}" cy="${g.y}" r="${l}" fill="${h}" opacity="0.3"
        stroke="${E}" stroke-width="${v}"/>`),m.boost&&(p+=`<rect x="${g.x+l-10}" y="${g.y-l}" width="14" height="10" rx="3" fill="#87CEEB"/>
        <text x="${g.x+l-3}" y="${g.y-l+8}" text-anchor="middle" font-size="7" fill="#000" font-weight="900">+${m.boost}</text>`),p+=`<text x="${g.x}" y="${g.y-1}" text-anchor="middle" font-size="12" font-weight="900"
      fill="${m.used?"rgba(255,255,255,0.2)":"white"}" font-family="Arial Black,Arial">${m.used?"–":w}</text>
    <text x="${g.x}" y="${g.y+11}" text-anchor="middle" font-size="6" fill="rgba(255,255,255,${m.used?.2:.8})"
      font-family="Arial">${(m.name||"").slice(0,8)}</text>`,$&&(p+=`<circle cx="${g.x}" cy="${g.y}" r="${l}" fill="rgba(255,255,255,0.08)"
        class="match-slot-hit ${x?"selected":""}" data-card-id="${m.cardId}" data-role="${b}"
        style="cursor:pointer"/>`)}const u=l+4;return`<svg viewBox="${-u} ${-u} ${s+u*2} ${n+u*2}" width="100%" style="display:block;width:100%;max-width:380px;margin:0 auto">
    ${p}
  </svg>`}function Ue(t,e,i,o,s=300,n=300){return`<div id="match-terrain-wrap" style="position:relative;padding:0 4px">
    ${He(t,e,i,o,s,n)}
  </div>`}function F(t,e,i){var m,g,b,h,$,x,w,E;const o=e.selected.map(v=>v.cardId),s=e.usedSubIds||[],n=e.homeSubs.filter(v=>!s.includes(v.cardId)),c=Object.values(e.homeTeam).flat().filter(v=>v.used).length>0&&n.length>0&&e.subsUsed<e.maxSubs,l=e.log[e.log.length-1],r=e.phase==="ai-attack"||e.phase==="ai-defense",d=e.phase==="attack",f=e.phase==="defense",p=e.phase==="finished",u=e.gcCards.filter(v=>!e.usedGc.includes(v.id)),y=e.boostCard&&!e.boostUsed;t.innerHTML=`
  <style>
    @keyframes subSlideOut { from{transform:translateX(0);opacity:1} to{transform:translateX(-120%);opacity:0} }
    @keyframes subSlideIn  { from{transform:translateX(120%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes subFadeIn   { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
    .sub-anim-out { animation: subSlideOut 0.45s ease forwards; }
    .sub-anim-in  { animation: subSlideIn 0.45s ease 0.35s forwards; opacity:0; }
    #match-history-panel {
      position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:500;
      display:flex;flex-direction:column;
      transform:translateY(100%);transition:transform 0.3s ease;
    }
    #match-history-panel.open { transform:translateY(0); }
  </style>

  <div class="match-screen" style="display:flex;flex-direction:column;height:calc(100vh - 130px);overflow:hidden;background:#0a3d1e;position:relative">

    <!-- SCORE BAR -->
    <div style="display:flex;align-items:center;padding:8px 10px;background:rgba(0,0,0,0.5);gap:6px;flex-shrink:0">
      <button id="match-quit" style="width:34px;height:34px;border-radius:50%;background:rgba(220,50,50,0.7);border:none;color:#fff;font-size:16px;cursor:pointer;flex-shrink:0">✕</button>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px">
        <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.clubName}</span>
        <span style="font-size:26px;font-weight:900;color:#FFD700;letter-spacing:2px">${e.homeScore} – ${e.aiScore}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.5)">IA (${e.difficulty.toUpperCase()})</span>
      </div>
      <button id="view-ai" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);color:#fff;font-size:16px;cursor:pointer;flex-shrink:0">👁</button>
    </div>

    <!-- DERNIÈRE ACTION -->
    <div id="last-action-zone" style="padding:6px 10px;background:rgba(0,0,0,0.25);min-height:40px;flex-shrink:0;display:flex;align-items:center">
      ${l?`<span style="font-size:12px;color:${l.type==="goal"?"#FFD700":"rgba(255,255,255,0.8)"};font-weight:${l.type==="goal"?"900":"400"}">${l.text}</span>`:'<span style="font-size:11px;color:rgba(255,255,255,0.3)">En attente du premier action...</span>'}
      ${e.phase==="defense"&&e.pendingAttack?`<span style="margin-left:8px;background:rgba(255,80,80,0.2);border:1px solid #ff6b6b;border-radius:6px;padding:2px 7px;font-size:11px;color:#ff6b6b;font-weight:700">IA attaque ${e.pendingAttack.total}</span>`:""}
    </div>

    <!-- BOUTON HISTORIQUE -->
    <button id="toggle-history" style="width:100%;padding:4px 10px;background:rgba(0,0,0,0.15);border:none;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.35);font-size:10px;cursor:pointer;letter-spacing:1px;flex-shrink:0">
      ▼  VOIR L'HISTORIQUE (${e.log.length})
    </button>

    <!-- ZONE CENTRALE : REMPLAÇANTS + TERRAIN -->
    <div style="display:flex;flex:1;min-height:0;overflow:hidden">

      <!-- Colonne remplaçants -->
      <div style="display:flex;flex-direction:column;gap:5px;padding:6px 3px;width:42px;align-items:center;overflow-y:auto;flex-shrink:0;background:rgba(0,0,0,0.15)">
        ${n.length===0?'<div style="font-size:8px;color:rgba(255,255,255,0.25);text-align:center;margin-top:6px;line-height:1.4">Pas de<br>rempl.</div>':n.map(v=>{const T=Q(v),L=K[v.job]||"#555";return`
              <div class="sub-btn-col" data-sub-id="${v.cardId}" title="${v.firstname} ${v.name}"
                style="width:34px;height:34px;border-radius:50%;background:${L};border:2px solid rgba(255,255,255,0.4);cursor:pointer;position:relative;overflow:hidden;flex-shrink:0">
                ${T?`<img src="${T}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.85">`:""}
                <div style="position:absolute;bottom:0;left:0;right:0;font-size:6px;text-align:center;color:#fff;background:rgba(0,0,0,0.5);font-weight:700">${v.job}</div>
              </div>`}).join("")}
        ${c?`
        <div id="sub-btn-main" style="margin-top:4px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.1);border:1.5px dashed rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;color:rgba(255,255,255,0.5)">🔄</div>
        `:""}
      </div>

      <!-- Terrain -->
      <div style="flex:1;overflow:hidden;min-width:0;align-self:flex-start;max-height:min(calc(100vh - 340px), calc(100vw - 50px))" id="match-field">
        ${Ue(e.homeTeam,e.formation,e.phase,o,280,280)}
      </div>
    </div>

    <!-- ZONE BAS : GC + BOUTON ACTION -->
    <div style="display:flex;align-items:flex-end;padding:6px 8px;background:rgba(0,0,0,0.35);gap:8px;flex-shrink:0;min-height:80px">

      <!-- Grille GC -->
      <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:3px;align-content:start">
        ${u.map(v=>{var T;return`
          <div class="gc-mini" data-gc-id="${v.id}" data-gc-type="${v.gc_type}"
            style="background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:7px;padding:3px 2px;cursor:pointer;text-align:center">
            <div style="font-size:16px">${((T=re[v.gc_type])==null?void 0:T.icon)||"⚡"}</div>
            <div style="font-size:6px;color:#fff;font-weight:600;line-height:1.2">${v.gc_type.slice(0,8)}</div>
          </div>`}).join("")}
        ${y?`
          <div id="boost-card" style="background:linear-gradient(135deg,#4a9fc4,#87CEEB);border:2px solid #87CEEB;border-radius:7px;padding:3px 2px;cursor:pointer;text-align:center">
            <div style="font-size:16px">⚡</div>
            <div style="font-size:6px;color:#000;font-weight:900">+${e.boostCard.value}</div>
          </div>`:""}
      </div>

      <!-- Bouton action principal -->
      <div style="flex-shrink:0">
        ${p?'<button id="btn-results" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#D4A017,#FFD700);border:3px solid #FFD700;color:#000;font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center">🏁</button>':r?'<div style="width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,0.08);border:3px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.3);font-size:26px;display:flex;align-items:center;justify-content:center">⏳</div>':d?`<button id="btn-action" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#c47a00,#FFD700);border:3px solid #FFD700;color:#fff;font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(255,215,0,0.4)" ${e.selected.length===0?'disabled style="opacity:0.4;cursor:default"':""}>⚔️</button>`:f?`<button id="btn-action" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#1a4a8a,#3a7bd5);border:3px solid #87CEEB;color:#fff;font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(135,206,235,0.4)" ${e.selected.length===0?'disabled style="opacity:0.4;cursor:default"':""}>🛡️</button>`:'<div style="width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,0.05);border:3px solid rgba(255,255,255,0.1)"></div>'}
        ${d||f?`
        <div style="text-align:center;font-size:8px;color:rgba(255,255,255,0.4);margin-top:3px">
          ${e.selected.length}/3
        </div>`:""}
      </div>
    </div>
  </div>

  <!-- PANNEAU HISTORIQUE (slide-up) -->
  <div id="match-history-panel">
    <div style="display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.1)">
      <div style="flex:1;font-size:14px;font-weight:700;color:#fff">📋 Historique du match</div>
      <button id="close-history" style="background:none;border:none;color:rgba(255,255,255,0.6);font-size:20px;cursor:pointer">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:6px">
      ${e.log.length===0?`<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.3)">Aucune action pour l'instant</div>`:[...e.log].reverse().map((v,T)=>`
          <div style="padding:8px 10px;border-radius:8px;background:${v.type==="goal"?"rgba(212,160,23,0.15)":"rgba(255,255,255,0.05)"};border-left:3px solid ${v.type==="goal"?"#FFD700":"rgba(255,255,255,0.15)"}">
            <span style="font-size:12px;color:${v.type==="goal"?"#FFD700":"rgba(255,255,255,0.8)"};font-weight:${v.type==="goal"?700:400}">${v.text}</span>
          </div>`).join("")}
    </div>
  </div>`,(m=document.getElementById("match-quit"))==null||m.addEventListener("click",()=>{confirm("Abandonner ? Résultat : défaite 3-0")&&(e.homeScore=0,e.aiScore=3,Z(t,e,i))}),(g=document.getElementById("view-ai"))==null||g.addEventListener("click",()=>Rt(e,i)),(b=document.getElementById("toggle-history"))==null||b.addEventListener("click",()=>{var v;(v=document.getElementById("match-history-panel"))==null||v.classList.add("open")}),(h=document.getElementById("close-history"))==null||h.addEventListener("click",()=>{var v;(v=document.getElementById("match-history-panel"))==null||v.classList.remove("open")}),($=document.getElementById("btn-action"))==null||$.addEventListener("click",()=>{e.selected.length!==0&&(d?zt(t,e,i):f&&jt(t,e,i))}),(x=document.getElementById("btn-results"))==null||x.addEventListener("click",()=>Z(t,e,i)),t.querySelectorAll(".match-slot-hit").forEach(v=>{v.addEventListener("click",()=>Bt(v,e,t,i))}),t.querySelectorAll(".gc-mini").forEach(v=>{v.addEventListener("click",()=>Ft(v.dataset.gcId,v.dataset.gcType,t,e,i))}),(w=document.getElementById("boost-card"))==null||w.addEventListener("click",()=>Gt(t,e,i)),t.querySelectorAll(".sub-btn-col").forEach(v=>{v.addEventListener("click",()=>Me(t,e,i,v.dataset.subId))}),(E=document.getElementById("sub-btn-main"))==null||E.addEventListener("click",()=>Me(t,e,i))}function Bt(t,e,i,o){const s=t.dataset.cardId,n=t.dataset.role,a=e.selected.findIndex(c=>c.cardId===s);if(a!==-1)e.selected.splice(a,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const c=(e.homeTeam[n]||[]).find(l=>l.cardId===s);c&&e.selected.push({...c,_role:n,_line:n})}F(i,e,o)}function zt(t,e,i){const o=e.selected.map(n=>({...n,_line:n._role})),s=Se(o,e.modifiers.home);e.pendingAttack={...s,players:[...e.selected],side:"home"},e.selected.forEach(n=>{const a=(e.homeTeam[n._role]||[]).find(c=>c.cardId===n.cardId);a&&(a.used=!0)}),e.log.push({text:`⚔️ Vous attaquez : ${s.total} (base ${s.base}${s.links?` +${s.links} liens`:""}) — ${e.selected.map(n=>n.name).join(", ")}`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",F(t,e,i),setTimeout(()=>St(t,e,i),1200)}function jt(t,e,i){const o=e.selected.map(a=>({...a,_line:a._role})),s=De(o,e.modifiers.home);e.selected.forEach(a=>{const c=(e.homeTeam[a._role]||[]).find(l=>l.cardId===a.cardId);c&&(c.used=!0)});const n=Fe(e.pendingAttack.total,s.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${s.total})`,type:"goal"})):e.log.push({text:`🧤 Défense réussie ! (${s.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,Ve(t,e,i,"home-attack")}function fe(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],s=Ge(o,"attack",e.difficulty);if(!s.length){We(t,e,i);return}const n=Se(s,e.modifiers.ai);e.pendingAttack={...n,players:s,side:"ai"},s.forEach(a=>{a.used=!0}),e.log.push({text:`🤖 IA attaque : ${n.total} (${s.map(a=>a.name).join(", ")})`,type:"info"}),e.modifiers.ai={},e.phase="defense",F(t,e,i)}function St(t,e,i){var c;const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],s=Ge(o,"defense",e.difficulty),n=s.length>0?De(s,e.modifiers.ai).total:0;s.forEach(l=>{l.used=!0});const a=Fe(e.pendingAttack.total,n,e.modifiers.ai);a.shielded?e.log.push({text:"🛡️ Bouclier IA !",type:"info"}):a.goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! (${e.pendingAttack.total} > ${n}) — ${((c=e.selected)==null?void 0:c.map(l=>l.name).join(", "))||""}`,type:"goal"})):e.log.push({text:`🧤 IA défend (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,Ve(t,e,i,"ai-attack")}function Ve(t,e,i,o){if(e.round++,Ye(e)){Z(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(a=>!a.used).length){Z(t,e,i);return}e.phase="ai-attack",F(t,e,i),setTimeout(()=>fe(t,e,i),800);return}e.phase="attack",F(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){We(t,e,i);return}e.phase="ai-attack",F(t,e,i),setTimeout(()=>fe(t,e,i),800)}}function Ye(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(s=>!s.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(s=>!s.used));return!e&&!i}function We(t,e,i){Ye(e)?Z(t,e,i):(e.phase="attack",F(t,e,i))}function Dt(t,e,i){const o=document.createElement("div");o.style.cssText=`
    position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:800;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;
    animation:subFadeIn 0.2s ease;
  `;const s=Q(t),n=Q(e),a=K[t.job]||"#555",c=K[e.job]||"#555";o.innerHTML=`
    <style>@keyframes subFadeIn{from{opacity:0}to{opacity:1}}</style>
    <div style="font-size:13px;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase">Remplacement</div>
    <div style="display:flex;align-items:center;gap:24px">
      <!-- Sortant -->
      <div class="sub-anim-out" style="text-align:center">
        <div style="width:72px;height:72px;border-radius:50%;background:${a};border:3px solid rgba(255,255,255,0.3);position:relative;overflow:hidden;opacity:0.5;margin:0 auto">
          ${s?`<img src="${s}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`:""}
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px">${t.firstname} ${t.name}</div>
        <div style="font-size:20px;margin-top:2px">❌</div>
      </div>

      <div style="font-size:36px">🔄</div>

      <!-- Entrant -->
      <div class="sub-anim-in" style="text-align:center">
        <div style="width:72px;height:72px;border-radius:50%;background:${c};border:3px solid #00ff88;position:relative;overflow:hidden;margin:0 auto">
          ${n?`<img src="${n}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`:""}
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.8);margin-top:6px;font-weight:700">${e.firstname} ${e.name}</div>
        <div style="font-size:20px;margin-top:2px">✅</div>
      </div>
    </div>
  `,document.body.appendChild(o),setTimeout(()=>{o.remove(),i()},2e3)}function Me(t,e,i,o=null){e.usedSubIds||(e.usedSubIds=[]);const s=Object.values(e.homeTeam).flat().filter(r=>r.used),n=e.homeSubs.filter(r=>!e.usedSubIds.includes(r.cardId));if(!s.length){i.toast("Aucun joueur grisé","info");return}if(!n.length){i.toast("Aucun remplaçant disponible","info");return}if(e.subsUsed>=e.maxSubs){i.toast(`Maximum ${e.maxSubs} remplacements`,"error");return}i.openModal("🔄 Remplacement",`<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${s.map(r=>`
        <div class="grayed-opt" data-card-id="${r.cardId}" data-role="${r._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${K[r.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${r._line}</div>
          <div><b>${r.firstname} ${r.name}</b></div>
        </div>`).join("")}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${n.map(r=>`
        <div class="sub-opt" data-card-id="${r.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid ${r.cardId===o?"#D4A017":"var(--green)"};border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${K[r.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${r.job}</div>
          <div><b>${r.firstname} ${r.name}</b></div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`);let a=null,c=o;document.querySelectorAll(".grayed-opt").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".grayed-opt").forEach(d=>d.style.borderColor="#eee"),r.style.borderColor="#c0392b",a={cardId:r.dataset.cardId,role:r.dataset.role},l()})}),document.querySelectorAll(".sub-opt").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".sub-opt").forEach(d=>d.style.borderColor="var(--green)"),r.style.borderColor="#D4A017",c=r.dataset.cardId,l()})});function l(){if(!a||!c)return;const r=a.role,d=e.homeTeam[r]||[],f=d.findIndex(y=>y.cardId===a.cardId),p=e.homeSubs.find(y=>y.cardId===c),u=d[f];f!==-1&&p&&(p._line=r,p._col=d[f]._col,p.used=!1,d.splice(f,1,p),e.usedSubIds=[...e.usedSubIds||[],c],e.subsUsed++,e.log.push({text:`🔄 ${p.firstname} ${p.name} remplace ${u==null?void 0:u.firstname} ${u==null?void 0:u.name}`,type:"info"})),i.closeModal(),u&&p?Dt(u,p,()=>F(t,e,i)):F(t,e,i)}}function Ft(t,e,i,o,s){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque activée !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier activé !",type:"info"});break;case"Ressusciter":{let n=!1;for(const a of["ATT","MIL","DEF","GK"]){const c=(o.homeTeam[a]||[]).find(l=>l.used);if(c){c.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine attaque IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(a=>!a.used);if(n.length){const a=n.sort((c,l)=>G(l,"ATT")-G(c,"ATT"))[0];a.used=!0,o.log.push({text:`❄️ ${a.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement débloqué",type:"info"});break}k.from("cards").delete().eq("id",t).then(()=>{}),F(i,o,s)}}function Gt(t,e,i){const o=Object.values(e.homeTeam).flat().filter(s=>!s.used);if(!o.length){i.toast("Aucun joueur actif à booster","error");return}i.openModal("⚡ Utiliser le Boost",`<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${e.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${o.map(s=>`
        <div class="player-boost-opt" data-card-id="${s.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${K[s.job]||"#888"};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${G(s,s._line||s.job)}</div>
          <div style="flex:1"><b>${s.firstname} ${s.name}</b><div style="font-size:11px;color:#888">${s._line||s.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${e.boostCard.value}</div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`),document.querySelectorAll(".player-boost-opt").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.cardId;for(const a of["GK","DEF","MIL","ATT"]){const c=(e.homeTeam[a]||[]).find(l=>l.cardId===n);if(c){c.boost=(c.boost||0)+e.boostCard.value,e.log.push({text:`⚡ Boost +${e.boostCard.value} appliqué à ${c.name}`,type:"info"});break}}e.boostUsed=!0,i.closeModal(),F(t,e,i)})})}async function Z(t,e,i){var d,f;e.phase="finished";const{state:o}=i,s=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,a=s?"victoire":n?"nul":"defaite",c=tt(e.mode,a);e.matchId&&await k.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:s?o.profile.id:null,home_credits_reward:c,played_at:new Date().toISOString()}).eq("id",e.matchId);const l={credits:(o.profile.credits||0)+c,matches_played:(o.profile.matches_played||0)+1};s?l.wins=(o.profile.wins||0)+1:n?l.draws=(o.profile.draws||0)+1:l.losses=(o.profile.losses||0)+1,await k.from("users").update(l).eq("id",o.profile.id),await i.refreshProfile();const r=document.createElement("div");r.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;z-index:2000",r.innerHTML=`
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${s?"🏆":n?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${s?"Victoire !":n?"Match nul":"Défaite"}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${e.homeScore} – ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${c.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`,document.body.appendChild(r),(d=document.getElementById("res-home"))==null||d.addEventListener("click",()=>{r.remove(),i.navigate("home")}),(f=document.getElementById("res-replay"))==null||f.addEventListener("click",()=>{r.remove(),i.navigate("match",{matchMode:e.mode})})}function Rt(t,e){e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${He(t.aiTeam,t.formation,null,[],300,300)}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const qt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Nt(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await be(t,e)}async function be(t,e){const{state:i,toast:o}=e,{data:s}=await k.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),n=(s||[]).filter(l=>l.seller_id===i.profile.id),a=(s||[]).filter(l=>l.seller_id!==i.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${a.length} carte(s) en vente · Solde : ${(i.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${n.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function c(l){const r=document.getElementById("mkt-content"),d=l==="buy"?a:n;if(d.length===0){r.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${l==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}r.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${d.map(f=>{var g,b,h;const p=(g=f.card)==null?void 0:g.player;if(!p)return"";const u=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,y=qt[p.rarity],m=(i.profile.credits||0)>=f.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${Pt(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${y};flex-shrink:0">${u}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((b=p.clubs)==null?void 0:b.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((h=f.seller)==null?void 0:h.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${f.price.toLocaleString("fr")}</div>
            ${l==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${f.id}" ${m?"":"disabled"} style="margin-top:4px">${m?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${f.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,r.querySelectorAll("[data-buy]").forEach(f=>{f.addEventListener("click",()=>Ot(f.dataset.buy,d,t,e))}),r.querySelectorAll("[data-cancel]").forEach(f=>{f.addEventListener("click",()=>Kt(f.dataset.cancel,t,e))})}c("buy"),t.querySelectorAll(".mkt-tab").forEach(l=>{l.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(r=>{const d=r===l;r.style.background=d?"var(--green)":"#fff",r.style.color=d?"#fff":"var(--gray-600)",r.style.borderColor=d?"var(--green)":"var(--gray-200)"}),c(l.dataset.tab)})})}async function Ot(t,e,i,o){const{state:s,toast:n,refreshProfile:a}=o,c=e.find(l=>l.id===t);if(c){if((s.profile.credits||0)<c.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${c.card.player.firstname} ${c.card.player.surname_encoded} pour ${c.price.toLocaleString("fr")} crédits ?`))try{const{error:l}=await k.from("cards").update({owner_id:s.profile.id,is_for_sale:!1,sale_price:null}).eq("id",c.card.id);if(l)throw l;await k.from("market_listings").update({status:"sold",buyer_id:s.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await k.from("users").update({credits:(s.profile.credits||0)-c.price}).eq("id",s.profile.id);const{data:r}=await k.from("users").select("credits").eq("id",c.seller_id).single();r&&await k.from("users").update({credits:(r.credits||0)+c.price}).eq("id",c.seller_id),await k.from("notifications").insert({user_id:c.seller_id,type:"card_sold",message:`Ta carte ${c.card.player.surname_encoded} a été vendue pour ${c.price} crédits !`,data:{card_id:c.card.id,price:c.price}}),await a(),n("Carte achetée ! ✅","success"),be(i,o)}catch(l){n("Erreur : "+l.message,"error")}}}async function Kt(t,e,i){const{toast:o}=i,{data:s}=await k.from("market_listings").select("card_id").eq("id",t).single();await k.from("market_listings").update({status:"cancelled"}).eq("id",t),s&&await k.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",s.card_id),o("Annonce retirée","success"),be(e,i)}function Pt(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function Ht(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:s}=await k.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${s&&s.length>0?s.map((n,a)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${n.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${a+1}</div>
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
  `}const B={user:null,profile:null,page:"home",params:{}};function ie(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function Ut(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function ue(){document.getElementById("modal-overlay").classList.add("hidden")}async function oe(){if(!B.user)return;const{data:t}=await k.from("users").select("*").eq("id",B.user.id).single();t&&(B.profile=t)}const he="mw_theme";function de(){return localStorage.getItem(he)||"light"}function Vt(t){var e;localStorage.setItem(he,t),ge(t),(e=B.profile)!=null&&e.id&&k.from("users").update({theme:t}).eq("id",B.profile.id).then(()=>{})}function ge(t){document.documentElement.setAttribute("data-theme",t)}function ne(t,e={}){B.page=t,B.params=e,Je()}async function Je(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===B.page)});const e=document.getElementById("nav-credits");e&&B.profile&&(e.textContent=`💰 ${(B.profile.credits||0).toLocaleString("fr")}`);const i={state:B,navigate:ne,toast:ie,openModal:Ut,closeModal:ue,refreshProfile:oe};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',B.page){case"home":await ke(t,i);break;case"collection":await rt(t,i);break;case"decks":await Ne(t,i);break;case"boosters":await mt(t,i);break;case"match":await Lt(t,i);break;case"market":await Nt(t,i);break;case"rankings":await Ht(t,i);break;default:await ke(t,i)}}function Yt(){const t=document.getElementById("app"),e=B.profile;if(!e)return;const i="/manager-wars/icons/";t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",s=>{s.preventDefault(),ne(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>ne("home")),document.getElementById("nav-credits").addEventListener("click",()=>ne("boosters")),document.getElementById("theme-toggle").addEventListener("click",()=>{const s=de()==="dark"?"light":"dark";Vt(s),Ce(s)}),Ce(de())}function Ce(t){const e=document.getElementById("theme-icon");e&&(e.textContent=t==="dark"?"☀️":"🌙")}async function Wt(){ge(de()),document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&ue()}),document.getElementById("modal-close").addEventListener("click",ue);const{data:{session:t}}=await k.auth.getSession();if(!t){ze(),we(document.getElementById("app"),{navigate:()=>window.location.reload(),toast:ie});return}B.user=t.user,await oe(),ze();try{const{data:e}=await k.from("formation_links_overrides").select("formation, links"),i={};(e||[]).forEach(o=>{i[o.formation]=o.links}),Xe(i)}catch(e){console.warn("Impossible de charger les overrides de formation:",e)}if(!B.profile){Qe(document.getElementById("app"),{state:B,navigate:async()=>{await oe(),Be()},toast:ie,refreshProfile:oe});return}B.profile.theme&&B.profile.theme!==de()&&(localStorage.setItem(he,B.profile.theme),ge(B.profile.theme)),Be(),k.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(B.user=null,B.profile=null,document.getElementById("app").innerHTML="",we(document.getElementById("app"),{navigate:()=>window.location.reload(),toast:ie}))})}function Be(){const t=document.getElementById("app");t.style.display="flex",t.style.flexDirection="column",Yt(),Je()}function ze(){const t=document.getElementById("app-loader"),e=document.getElementById("app");e&&(e.style.display=""),t&&(t.classList.add("zoom-out"),setTimeout(()=>t.style.display="none",500))}Wt();
