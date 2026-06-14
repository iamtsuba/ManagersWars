import{s as h,F as Y,b as fe,c as be,l as J,d as Ye}from"./formation-links-Dqc5Z8Uj.js";function we(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!a){n.textContent="Remplissez tous les champs.";return}const r=document.getElementById("login-btn");r.textContent="Connexion…",r.disabled=!0;const{error:l}=await h.auth.signInWithPassword({email:o,password:a});if(r.textContent="Se connecter",r.disabled=!1,l){n.textContent=l.message.includes("Invalid")?"Email ou mot de passe incorrect.":l.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,r=document.getElementById("reg-error");if(r.textContent="",!o||!a||!n){r.textContent="Remplissez tous les champs.";return}if(a.length<6){r.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==n){r.textContent="Les mots de passe ne correspondent pas.";return}const l=document.getElementById("reg-btn");l.textContent="Création…",l.disabled=!0;const{error:s}=await h.auth.signUp({email:o,password:a});if(l.textContent="Créer mon compte",l.disabled=!1,s){r.textContent=s.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Je(t,{state:e,navigate:i,toast:o,refreshProfile:a}){let n="#1A6B3C",r="#D4A017";t.innerHTML=`
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
  `;function l(){var y;const d=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),u=((y=document.getElementById("setup-club"))==null?void 0:y.value)||"MW",p=u.trim().split(" ").filter(Boolean),f=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():u.slice(0,2).toUpperCase();d&&(d.style.background=r,d.style.borderColor=n),c&&(c.textContent=f,c.style.color=n)}document.getElementById("color1").addEventListener("input",d=>{n=d.target.value,document.getElementById("swatch1").style.background=n,l()}),document.getElementById("color2").addEventListener("input",d=>{r=d.target.value,document.getElementById("swatch2").style.background=r,l()});function s(d){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${d}`).classList.add("active"),document.getElementById("step-num").textContent=d,document.getElementById("progress-fill").style.width=`${Math.round(d/3*100)}%`,d===3&&l()}document.getElementById("step1-next").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",d.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:u}=await h.from("users").select("id").eq("pseudo",d).maybeSingle();if(u){c.textContent="Ce pseudo est déjà pris.";return}s(2)}),document.getElementById("step2-back").addEventListener("click",()=>s(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const d=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",d.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:u}=await h.from("users").select("id").eq("club_name",d).maybeSingle();if(u){c.textContent="Ce nom de club est déjà pris.";return}s(3)}),document.getElementById("step3-back").addEventListener("click",()=>s(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),u=document.getElementById("step3-error"),p=document.getElementById("step3-finish");u.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:f}=await h.from("users").insert({id:e.user.id,pseudo:d,club_name:c,club_color1:n,club_color2:r,credits:1e4});if(f)throw f;await We(e.user.id),await a(),o(`Bienvenue ${d} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(f){u.textContent=f.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function We(t){const{data:e}=await h.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(s=>s.job==="GK"),a=i.filter(s=>s.job!=="GK"),n=[];for(let s=0;s<5;s++){let d=[];if(s===0&&o.length>0){const c=o[Math.floor(Math.random()*o.length)];d.push(c);const u=$e([...a]).slice(0,3);d.push(...u)}else d=$e([...i]).slice(0,4);d.forEach(c=>{n.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(s=>{n.push({owner_id:t,card_type:"game_changer",gc_type:s})});const l=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:l[Math.floor(Math.random()*l.length)]}),n.length>0&&await h.from("cards").insert(n),await h.from("users").update({first_booster_opened:!0}).eq("id",t)}function $e(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function _e(t,{state:e,navigate:i,toast:o}){var r;const a=e.profile;if(!a)return;const{data:n}=await h.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3);t.innerHTML=`
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
          ${n.map(l=>{const s=l.winner_id===a.id,d=l.home_score===l.away_score,c=d?"N":s?"V":"D",u=d?"#888":s?"#1A6B3C":"#c0392b",p={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[l.mode]||l.mode,y=new Date(l.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${p}</div>
                <div style="font-size:11px;color:var(--gray-600)">${y}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${l.home_score} - ${l.away_score}</span>
                <span style="background:${u};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${c}</span>
              </div>
            </div>`}).join("")}
        </div>
      </div>`:""}

      <!-- Logout -->
      <div style="text-align:center;padding:12px 0;display:flex;flex-direction:column;gap:8px;align-items:center">
        <button class="btn btn-ghost btn-sm" id="logout-btn" style="color:var(--gray-600)">Déconnexion</button>
        ${a.is_admin?`
        <a href="/manager-wars/admin.html" class="btn btn-sm" id="admin-editor-btn"
          style="background:var(--yellow);color:#111;font-weight:700;border:none;text-decoration:none;display:inline-block;padding:6px 16px;border-radius:8px">
          ⚙️ Admin Editor
        </a>`:""}
      </div>

    </div>
  </div>
  `,t.querySelectorAll("[data-nav]").forEach(l=>{l.addEventListener("click",s=>{s.preventDefault(),i(l.dataset.nav)})}),(r=document.getElementById("nav-rankings"))==null||r.addEventListener("click",()=>i("rankings")),t.querySelectorAll("[data-action]").forEach(l=>{l.addEventListener("click",()=>{if(l.classList.add("tapped"),setTimeout(()=>l.classList.remove("tapped"),200),l.dataset.action==="match-ai"){Xe(i);return}o("Bientôt disponible","info")})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await h.auth.signOut(),window.location.reload()})}function Xe(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
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
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{o(),t("match",{matchMode:a.dataset.mode})})})}const ie={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function G(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const ke=["ATT","MIL","DEF","GK"];function je(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let a=o+1;a<i;a++){const n=t[o],r=t[a];if(!n||!r)continue;const l=n._col!==void 0&&r._col!==void 0&&n._col===r._col,s=n._col!==void 0&&r._col!==void 0&&Math.abs(n._col-r._col)===1,d=ke.indexOf(n._line),c=ke.indexOf(r._line),u=Math.abs(d-c)===1;(n._line===r._line&&s||l&&u)&&(n.country_code&&r.country_code&&n.country_code===r.country_code&&e++,n.club_id&&r.club_id&&n.club_id===r.club_id&&e++)}return e}function ue(t,e={}){const i=t.reduce((n,r)=>{const l=r._line||r.job;return n+Number(l==="MIL"?r.note_m:r.note_a)||0},0),o=je(t);let a=i+o;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function ge(t,e={}){const i=t.reduce((n,r)=>{const l=r._line||r.job;let s=0;return l==="GK"?s=Number(r.note_g)||0:l==="MIL"?s=Number(r.note_m)||0:s=Number(r.note_d)||0,n+s},0),o=je(t);let a=i+o;return e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function Se(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function De(t,e,i="easy"){const o=t.filter(r=>!r.used);if(!o.length)return[];const a=[...o].sort((r,l)=>{const s=e==="attack"?G(r,"ATT"):r._line==="GK"?G(r,"GK"):G(r,"DEF");return(e==="attack"?G(l,"ATT"):l._line==="GK"?G(l,"GK"):G(l,"DEF"))-s});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return a.slice(0,Math.min(n,a.length,3))}function Qe(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const Ge={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},oe={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Q=["GK","DEF","MIL","ATT"],Ze=["Tous","GK","DEF","MIL","ATT"],et={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},ye={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function Fe(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function W(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function Ee(t,e=""){var u,p;const i=t.player;if(!i)return"";const o=i.job||"ATT",a=oe[o],n=Ge[i.rarity]||"#ccc",r=W(i,o),l=i.job2?W(i,i.job2):null,s=i.job2?oe[i.job2]:null,d=Fe(i),c=ye[i.country_code]||i.country_code||"";return`
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
  </div>`}function tt(t){const e=t.job||"ATT",i=W(t,e),o=ye[t.country_code]||t.country_code||"";return`
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
  </div>`}async function it(t,e){const{state:i,navigate:o,toast:a,openModal:n,closeModal:r}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:l}=await h.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),{data:s}=await h.from("players").select(`id, firstname, surname_encoded, country_code, club_id, job, job2,
      note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length,
      clubs(encoded_name, logo_url)`).eq("is_active",!0),d=(l||[]).filter(_=>_.card_type==="player"&&_.player),c=(l||[]).filter(_=>_.card_type==="game_changer"),u=(l||[]).filter(_=>_.card_type==="formation"),p=Object.keys(Y),f=Object.keys(ie),y={};d.forEach(_=>{const k=_.player.id;y[k]=(y[k]||0)+1});const m=new Set(Object.keys(y).map(_=>String(_))),g=new Set(u.map(_=>_.formation)),$=new Set(c.map(_=>_.gc_type));let b="player",w="Tous",v="",x=!1;function I(){return[...d].sort((_,k)=>{const E=Q.indexOf(_.player.job),z=Q.indexOf(k.player.job);return E!==z?E-z:(_.player.surname_encoded||"").localeCompare(k.player.surname_encoded||"")})}function j(){return[...s||[]].sort((_,k)=>{const E=Q.indexOf(_.job),z=Q.indexOf(k.job);return E!==z?E-z:(_.surname_encoded||"").localeCompare(k.surname_encoded||"")})}function C(){return I().filter(_=>{const k=_.player,E=w==="Tous"||k.job===w,z=!v||`${k.firstname} ${k.surname_encoded}`.toLowerCase().includes(v);return E&&z})}function L(){return j().filter(_=>{const k=w==="Tous"||_.job===w,E=!v||`${_.firstname} ${_.surname_encoded}`.toLowerCase().includes(v);return k&&E})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${d.length} carte(s) joueur · ${c.length} Game Changer · ${u.length} Formation</p>
    </div>

    <!-- Onglets -->
    <div style="display:flex;border-bottom:1px solid var(--gray-200);background:#fff">
      <button class="col-tab-btn" data-tab="player" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${b==="player"?"var(--green)":"transparent"};
        color:${b==="player"?"var(--green)":"var(--gray-600)"}">Joueurs</button>
      <button class="col-tab-btn" data-tab="formation" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${b==="formation"?"var(--green)":"transparent"};
        color:${b==="formation"?"var(--green)":"var(--gray-600)"}">Formations</button>
      <button class="col-tab-btn" data-tab="gc" style="flex:1;padding:12px 4px;border:none;background:none;cursor:pointer;
        font-size:13px;font-weight:700;border-bottom:3px solid ${b==="gc"?"var(--green)":"transparent"};
        color:${b==="gc"?"var(--green)":"var(--gray-600)"}">Game Changer</button>
    </div>

    <!-- Filtres -->
    <div id="col-filters" style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px"></div>

    <!-- Grille cartes -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function A(){const _=document.getElementById("col-filters");_&&(b==="player"?(_.innerHTML=`
        <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px" value="${v}">
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;align-items:center">
          ${Ze.map(k=>`
            <button class="filter-btn" data-job="${k}"
              style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
                border:1.5px solid ${k===w?"var(--green)":"var(--gray-200)"};
                background:${k===w?"var(--green)":"#fff"};
                color:${k===w?"#fff":"var(--gray-600)"}">
              ${k}
            </button>`).join("")}
          <button id="show-all-btn"
            style="flex-shrink:0;margin-left:auto;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${x?"var(--yellow)":"var(--gray-200)"};
              background:${x?"var(--yellow)":"#fff"};
              color:${x?"#fff":"var(--gray-600)"}">
            ${x?"✓ Tout afficher":"Voir tout"}
          </button>
        </div>`,document.getElementById("col-search").addEventListener("input",k=>{v=k.target.value.toLowerCase(),T()}),t.querySelectorAll(".filter-btn").forEach(k=>{k.addEventListener("click",()=>{w=k.dataset.job,A(),T()})}),document.getElementById("show-all-btn").addEventListener("click",()=>{x=!x,A(),T()})):(_.innerHTML=`
        <div style="display:flex;justify-content:flex-end">
          <button id="show-all-btn"
            style="padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${x?"var(--yellow)":"var(--gray-200)"};
              background:${x?"var(--yellow)":"#fff"};
              color:${x?"#fff":"var(--gray-600)"}">
            ${x?"✓ Tout afficher":"Voir tout"}
          </button>
        </div>`,document.getElementById("show-all-btn").addEventListener("click",()=>{x=!x,A(),T()})))}function T(){const _=document.getElementById("col-grid");_&&(b==="player"?B(_):b==="formation"?X(_):ae(_))}function B(_){if(x){const k=L();if(!k.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucun joueur.</div>';return}_.innerHTML=k.map(E=>{if(m.has(String(E.id))){const S=d.find(O=>O.player.id===E.id),D=y[E.id]||1,R=D>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${D}</div>`:"",N=d.filter(O=>O.player.id===E.id&&O.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Ee(S,R+N)}return tt(E)}).join("")}else{const k=C();if(!k.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const E={},z=[];k.forEach(S=>{const D=S.player.id;E[D]||(E[D]=!0,z.push(S))}),_.innerHTML=z.map(S=>{const D=y[S.player.id]||1,R=D>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${D}</div>`:"",N=d.filter(O=>O.player.id===S.player.id&&O.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Ee(S,R+N)}).join("")}_.querySelectorAll("[data-card-id]").forEach(k=>{k.addEventListener("click",()=>{const E=d.find(z=>z.id===k.dataset.cardId);E&&rt(E,d,y,e)})})}function X(_){const k=x?p:[...g];if(!k.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Formation.<br><small>Ouvre un booster Formation !</small></div>';return}_.innerHTML=k.map(E=>{if(g.has(E)){const S=u.find(q=>q.formation===E),D=u.filter(q=>q.formation===E).length,R=D>1?`<div style="position:absolute;top:4px;right:4px;background:#0a3d1e;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${D}</div>`:"";return`
          <div data-form-id="${S.id}" style="
            position:relative;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            ${R}
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${E}</div>
          </div>`}return`
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:100px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;align-items:flex-start;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">🏟️</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
          <div style="font-weight:900;font-size:18px">${E}</div>
        </div>`}).join(""),_.querySelectorAll("[data-form-id]").forEach(E=>{E.addEventListener("click",()=>{const z=u.find(S=>S.id===E.dataset.formId);z&&nt(z,u,e,n)})})}function ae(_){const k=x?f:[...$];if(!k.length){_.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte Game Changer.<br><small>Ouvre un booster Game Changer !</small></div>';return}_.innerHTML=k.map(E=>{const z=$.has(E),S=ie[E]||{icon:"⚡"};if(z){const D=c.find(N=>N.gc_type===E),R=c.filter(N=>N.gc_type===E).length,q=R>1?`<div style="position:absolute;top:4px;right:4px;background:#3d0a7a;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${R}</div>`:"";return`
          <div data-gc-id="${D.id}" data-gc-type="${E}" style="
            position:relative;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;width:140px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            ${q}
            <div style="font-size:28px">${S.icon}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${E}</div>
          </div>`}return`
        <div style="
          background:#ccc;border:2px solid #bbb;border-radius:12px;padding:12px;color:#888;
          min-width:120px;width:140px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;
          filter:grayscale(1);opacity:0.45">
          <div style="font-size:28px">${S.icon}</div>
          <div style="font-size:8px;background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
          <div style="font-weight:700;font-size:13px">${E}</div>
        </div>`}).join(""),_.querySelectorAll("[data-gc-id]").forEach(E=>{E.addEventListener("click",()=>ot(E.dataset.gcType,n))})}t.querySelectorAll(".col-tab-btn").forEach(_=>{_.addEventListener("click",()=>{b=_.dataset.tab,w="Tous",v="",x=!1,t.querySelectorAll(".col-tab-btn").forEach(k=>{const E=k.dataset.tab===b;k.style.borderBottomColor=E?"var(--green)":"transparent",k.style.color=E?"var(--green)":"var(--gray-600)"}),A(),T()})}),A(),T()}function ot(t,e){const i=ie[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const V=1e3;function nt(t,e,i,o){var m,g,$;const{state:a,toast:n,closeModal:r,navigate:l,refreshProfile:s}=i,d=t.formation,c={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function u(){const b=fe[d]||{},w=Y[d]||[],v=290,x=360,I=20;function j(L){const A=b[L];return A?{x:A.x*v,y:A.y*x}:null}let C=`<svg width="${v}" height="${x}" viewBox="0 0 ${v} ${x}" xmlns="http://www.w3.org/2000/svg">`;for(const[L,A]of w){const T=j(L),B=j(A);!T||!B||(C+=`<line x1="${T.x}" y1="${T.y}" x2="${B.x}" y2="${B.y}"
        stroke="#FFD700" stroke-width="2.5" stroke-dasharray="4,3" opacity="0.85"/>`)}for(const L of Object.keys(b)){const A=j(L);if(!A)continue;const T=L.replace(/\d+/,""),B=c[T]||"#555";C+=`<circle cx="${A.x}" cy="${A.y}" r="${I}" fill="${B}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,C+=`<text x="${A.x}" y="${A.y+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${T}</text>`}return C+="</svg>",C}const p=e.filter(b=>b.formation===d),f=p.length,y=!t.is_for_sale;o(`Formation ${d}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${u()}
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
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${V.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${f-1} carte${f-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-form-btn" ${f<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${y?`
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price-form" min="1" placeholder="Prix en crédits" value="${V}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-form-btn">Mettre en vente</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?`
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-form-btn">Retirer</button>
    </div>`:""}`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`),(m=document.getElementById("direct-sell-form-btn"))==null||m.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte Formation ${d} pour ${V.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const b=p.find(v=>!v.is_for_sale)||p[0];if(!b){n("Aucune carte à vendre","error");return}const{error:w}=await h.from("cards").delete().eq("id",b.id);if(w){n(w.message,"error");return}await h.from("users").update({credits:(a.profile.credits||0)+V}).eq("id",a.profile.id),await s(),n(`+${V.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),r(),l("collection")}),(g=document.getElementById("market-sell-form-btn"))==null||g.addEventListener("click",async()=>{const b=parseInt(document.getElementById("sell-price-form").value);if(!b||b<1){n("Prix invalide","error");return}await h.from("cards").update({is_for_sale:!0,sale_price:b}).eq("id",t.id),await h.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:b}),n("Carte mise en vente sur le marché !","success"),r(),l("collection")}),($=document.getElementById("cancel-sell-form-btn"))==null||$.addEventListener("click",async()=>{await h.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await h.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),r(),l("collection")})}function rt(t,e,i,o){var I,j,C,L,A,T;const{state:a,toast:n,openModal:r,closeModal:l,navigate:s,refreshProfile:d}=o,c=t.player,u=e.filter(B=>B.player.id===c.id),p=u.length,f=et[c.rarity]||1e3,y=c.rarity!=="legende",m=Fe(c),g=W(c,c.job),$=c.job2?W(c,c.job2):null,b=oe[c.job]||"#1A6B3C",w=c.job2?oe[c.job2]:null,v=Ge[c.rarity]||"#ccc",x=ye[c.country_code]||c.country_code||"";r(`${c.firstname} ${c.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${v};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${c.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(c.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${b}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${b}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${g}</text>
            </svg>
            ${$!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${w}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${$}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${m?`<img src="${m}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${c.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${x}</div>
            ${(I=c.clubs)!=null&&I.logo_url?`<img src="${c.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(((j=c.clubs)==null?void 0:j.encoded_name)||"").slice(0,6)}</div>`}
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
    ${y&&!t.is_for_sale?`
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
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(C=document.getElementById("close-detail"))==null||C.addEventListener("click",l),(L=document.getElementById("direct-sell-btn"))==null||L.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${c.surname_encoded} pour ${f.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const B=u.find(ae=>!ae.is_for_sale)||u[0];if(!B){n("Aucune carte à vendre","error");return}const{error:X}=await h.from("cards").delete().eq("id",B.id);if(X){n(X.message,"error");return}await h.from("users").update({credits:(a.profile.credits||0)+f}).eq("id",a.profile.id),await d(),n(`+${f.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),l(),s("collection")}),(A=document.getElementById("market-sell-btn"))==null||A.addEventListener("click",async()=>{const B=parseInt(document.getElementById("sell-price").value);if(!B||B<1){n("Prix invalide","error");return}await h.from("cards").update({is_for_sale:!0,sale_price:B}).eq("id",t.id),await h.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:B}),n("Carte mise en vente sur le marché !","success"),l(),s("collection")}),(T=document.getElementById("cancel-sell-btn"))==null||T.addEventListener("click",async()=>{await h.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await h.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),l(),s("collection")})}const ne={"4-3-3 (3)":{GK:1,DEF:4,MIL:3,ATT:3},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-3-3 (4)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-2-1":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (2)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (5)":{GK:1,DEF:4,MIL:3,ATT:3},"5-2-2-1":{GK:1,DEF:5,MIL:2,ATT:3},"4-3-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"5-2-1-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-5-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"4-5-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-1-1":{GK:1,DEF:4,MIL:4,ATT:2},"4-1-2-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"3-4-1-2":{GK:1,DEF:3,MIL:5,ATT:2},"3-4-2-1":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"4-1-4-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-2-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-2-3-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-3-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"4-1-2-1-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2}},P={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function me(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function Re(t,e){const{state:i,navigate:o,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await h.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
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
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const r=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!r)return;const{data:l,error:s}=await h.from("decks").insert({owner_id:i.profile.id,name:r,is_active:!(n!=null&&n.length)}).select().single();if(s){a(s.message,"error");return}a("Deck créé !","success"),Ie(l.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(r=>{r.addEventListener("click",()=>Ie(r.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(r=>{r.addEventListener("click",async()=>{await h.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await h.from("decks").update({is_active:!0}).eq("id",r.dataset.activate),a("Deck activé !","success"),Re(t,e)})})}async function Ie(t,e,i){const{state:o,toast:a}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await h.from("decks").select("*").eq("id",t).single(),{data:r}=await h.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),l=(r||[]).filter(f=>f.card_type==="player"&&f.player),s=(r||[]).filter(f=>f.card_type==="formation"),d=s.map(f=>f.formation).filter(Boolean),{data:c}=await h.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let u=n.formation||"4-4-2";d.length>0&&!d.includes(u)&&(u=d[0]);const p={deckId:t,name:n.name,formation:u,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:l,formationCards:s,availableFormations:d};(c||[]).forEach(f=>{f.is_starter?p.slots[f.position]=f.card_id:p.subs.includes(f.card_id)||p.subs.push(f.card_id)}),H(e,p,i)}function H(t,e,i){var s;const{navigate:o}=i;ne[e.formation];const a=Ae(e.formation),n=a.filter(d=>e.slots[d]).length,r=e.availableFormations.length>0?e.availableFormations:Object.keys(ne),l=e.subs.map(d=>e.playerCards.find(c=>c.id===d)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
            <span style="background:${P[c.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${c.job}</span>
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
  </div>`,at(t,e,a,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",d=>{e.formation=d.target.value;const c=Ae(e.formation),u={};c.forEach(p=>{e.slots[p]&&(u[p]=e.slots[p])}),e.slots=u,H(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>lt(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(d=>{d.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==d.dataset.removeSub),H(t,e,i)})}),(s=document.getElementById("add-sub-btn"))==null||s.addEventListener("click",()=>{dt(e,t,i)})}function at(t,e,i,o){const a=document.getElementById("deck-field");if(!a)return;const n=e.formation,r=fe[n]||{},l=be?be(n)||Y[n]||[]:Y[n]||[],s={};i.forEach(w=>{const v=e.slots[w],x=v?e.playerCards.find(I=>I.id===v):null;s[w]=(x==null?void 0:x.player)||null});const d=i.filter(w=>w.startsWith("MIL"));let c=0,u=0;d.forEach(w=>{const v=s[w];v&&(c+=Number(v.note_m)||0)}),l.forEach(([w,v])=>{if(!w.startsWith("MIL")||!v.startsWith("MIL"))return;J(s[w],s[v])!=="#ff3333"&&u++});const p=320,f=320,y=28,m=4;function g(w){const v=r[w];return v?{x:v.x*p,y:v.y*f}:null}let $="";for(const[w,v]of l){const x=g(w),I=g(v);if(!x||!I)continue;const j=s[w],C=s[v],L=J(j,C),A=L==="#ff3333"||L==="#cc2222"?.3:.9,B=L==="#00ff88"||L==="#FFD700"?`filter="url(#glow-${L.replace("#","")})"`:"";$+=`<line x1="${x.x}" y1="${x.y}" x2="${I.x}" y2="${I.y}"
      stroke="${L}" stroke-width="${m}" stroke-linecap="round"
      opacity="${A}" ${B}/>`}for(const w of i){const v=g(w);if(!v)continue;const x=s[w],I=w.replace(/\d+/,""),C={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[I]||"#555",L=x?Number(I==="GK"?x.note_g:I==="DEF"?x.note_d:I==="MIL"?x.note_m:x.note_a)||0:null,A=x?(x.surname_encoded||"").slice(0,8).toUpperCase():"";if(x){const T=me(x);T&&($+=`
          <defs>
            <clipPath id="clip-${w}">
              <circle cx="${v.x}" cy="${v.y}" r="${y}"/>
            </clipPath>
          </defs>
          <image href="${T}" x="${v.x-y}" y="${v.y-y}" width="${y*2}" height="${y*2}"
            clip-path="url(#clip-${w})" preserveAspectRatio="xMidYMid slice" opacity="0.85"/>`),$+=`
        <circle cx="${v.x}" cy="${v.y}" r="${y}" fill="${T?"transparent":C}"
          stroke="${C}" stroke-width="2" />
        <circle cx="${v.x}" cy="${v.y}" r="${y}" fill="${C}" opacity="${T?"0.5":"1"}"
          stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        ${T?`<image href="${T}" x="${v.x-y}" y="${v.y-y}" width="${y*2}" height="${y*2}"
          clip-path="url(#clip-${w})" preserveAspectRatio="xMidYMid slice" opacity="0.9"/>`:""}
        <text x="${v.x}" y="${v.y-3}" text-anchor="middle" font-size="13" font-weight="900"
          fill="white" font-family="Arial Black,Arial" style="text-shadow:0 1px 2px #000">${L}</text>
        <text x="${v.x}" y="${v.y+11}" text-anchor="middle" font-size="6.5" fill="rgba(255,255,255,0.9)"
          font-family="Arial">${A}</text>
        <rect x="${v.x-y}" y="${v.y-y}" width="${y*2}" height="${y*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${w}" style="cursor:pointer"/>`}else $+=`
        <circle cx="${v.x}" cy="${v.y}" r="${y}" fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="${v.x}" y="${v.y+6}" text-anchor="middle" font-size="16" fill="rgba(255,255,255,0.4)"
          font-family="Arial">+</text>
        <rect x="${v.x-y}" y="${v.y-y}" width="${y*2}" height="${y*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${w}" style="cursor:pointer"/>`}const b=`
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
      ${b}
      ${$}
    </svg>`,a.querySelectorAll(".deck-slot-hit").forEach(w=>{w.addEventListener("click",()=>st(w.dataset.pos,e,t,o))})}function st(t,e,i,o){var p,f,y;const{openModal:a,closeModal:n}=o,r=t.replace(/\d+/,""),l=e.slots[t],s=l?e.playerCards.find(m=>m.id===l):null;(p=s==null?void 0:s.player)==null||p.id;const d=new Set;Object.entries(e.slots).forEach(([m,g])=>{var b;if(m===t||!g)return;const $=e.playerCards.find(w=>w.id===g);(b=$==null?void 0:$.player)!=null&&b.id&&d.add($.player.id)}),e.subs.forEach(m=>{var $;const g=e.playerCards.find(b=>b.id===m);($=g==null?void 0:g.player)!=null&&$.id&&d.add(g.player.id)});const c=new Set,u=e.playerCards.filter(m=>{const g=m.player;return!(g.job===r||g.job2===r)||d.has(g.id)||c.has(g.id)?!1:(c.add(g.id),!0)});u.sort((m,g)=>{const $=r==="GK"?m.player.note_g:r==="DEF"?m.player.note_d:r==="MIL"?m.player.note_m:m.player.note_a;return(r==="GK"?g.player.note_g:r==="DEF"?g.player.note_d:r==="MIL"?g.player.note_m:g.player.note_a)-$}),a(`Choisir ${r} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${u.length>0?u.map(m=>{var v,x;const g=m.player,$=r==="GK"?g.note_g:r==="DEF"?g.note_d:r==="MIL"?g.note_m:g.note_a,b=me(g),w={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[g.rarity];return`<div class="player-option" data-card-id="${m.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${P[r]}">
            ${b?`<img src="${b}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${P[r]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${r}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${g.firstname} ${g.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${g.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${g.country_code}">
              ${(v=g.clubs)!=null&&v.logo_url?`<img src="${g.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((x=g.clubs)==null?void 0:x.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${g.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${P[r]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${w};flex-shrink:0">
            ${$}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(f=document.getElementById("close-selector"))==null||f.addEventListener("click",n),(y=document.getElementById("remove-player"))==null||y.addEventListener("click",()=>{delete e.slots[t],n(),H(i,e,o)}),document.querySelectorAll(".player-option").forEach(m=>{m.addEventListener("click",()=>{e.slots[t]=m.dataset.cardId,n(),H(i,e,o)})})}function dt(t,e,i){var s;const{openModal:o,closeModal:a}=i,n=new Set;Object.values(t.slots).filter(Boolean).forEach(d=>{var u;const c=t.playerCards.find(p=>p.id===d);(u=c==null?void 0:c.player)!=null&&u.id&&n.add(c.player.id)}),t.subs.forEach(d=>{var u;const c=t.playerCards.find(p=>p.id===d);(u=c==null?void 0:c.player)!=null&&u.id&&n.add(c.player.id)});const r=new Set,l=t.playerCards.filter(d=>{var c,u,p;return n.has((c=d.player)==null?void 0:c.id)||r.has((u=d.player)==null?void 0:u.id)?!1:(r.add((p=d.player)==null?void 0:p.id),!0)});o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${l.length>0?l.map(d=>{var f;const c=d.player,u=me(c),p=c.job==="GK"?c.note_g:c.job==="DEF"?c.note_d:c.job==="MIL"?c.note_m:c.note_a;return`<div class="player-option" data-card-id="${d.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${P[c.job]}">
            ${u?`<img src="${u}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${c.firstname} ${c.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${c.job} · ${c.country_code} · ${((f=c.clubs)==null?void 0:f.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${P[c.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${p}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(s=document.getElementById("close-sub-selector"))==null||s.addEventListener("click",a),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),a(),H(e,t,i)})})}async function lt(t,e){const{state:i,toast:o,navigate:a}=e,n=t.formationCards.find(s=>s.formation===t.formation),r=(n==null?void 0:n.id)||t.formationCardId;await h.from("decks").update({formation:t.formation,formation_card_id:r||null}).eq("id",t.deckId),await h.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([s,d],c)=>{l.push({deck_id:t.deckId,card_id:d,position:s,is_starter:!0,slot_order:c})}),t.subs.forEach((s,d)=>{l.push({deck_id:t.deckId,card_id:s,position:`SUB${d+1}`,is_starter:!1,slot_order:100+d})}),l.length>0){const{error:s}=await h.from("deck_cards").insert(l);if(s){o(s.message,"error");return}}o("Deck enregistré ✅","success"),a("decks")}function Ae(t){const e=ne[t]||ne["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const Te=[{id:"players_std",img:"/manager-wars/icons/booster-players.png",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",img:"/manager-wars/icons/booster-silver.png",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",img:"/manager-wars/icons/booster-gamechanger.png",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",img:"/manager-wars/icons/booster-formation.png",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],qe={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function ct(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const pt={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},ft={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function ut(t,{state:e,navigate:i,toast:o}){var n;const a=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${Te.map(r=>{const l=a>=r.cost||r.cost===0,s=r.id==="players_std"||r.id==="players_pub";return`<div class="booster-card ${l?"":"disabled"}" data-booster="${r.id}" style="position:relative">
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
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(r=>{r.addEventListener("click",async()=>{const l=Te.find(s=>s.id===r.dataset.booster);if(l){r.style.opacity="0.5",r.style.pointerEvents="none";try{await gt(l,{state:e,toast:o,navigate:i,container:t})}catch(s){o(s.message,"error"),r.style.opacity="",r.style.pointerEvents=""}}})}),t.querySelectorAll(".booster-info-btn").forEach(r=>{r.addEventListener("click",l=>{l.stopPropagation(),wt()})})}async function gt(t,{state:e,toast:i,navigate:o,container:a}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await $t();const{data:n}=await h.from("cards").select("card_type, player_id, formation").eq("owner_id",e.profile.id),r=new Set((n||[]).filter(c=>c.card_type==="player").map(c=>c.player_id)),l=new Set((n||[]).filter(c=>c.card_type==="formation").map(c=>c.formation));let s=[];t.type==="player"?s=await vt(e.profile,t.cardCount,t.cost):t.type==="game_changer"?s=await xt(e.profile,t.cardCount,t.cost):t.type==="formation"&&(s=await ht(e.profile,t.cost)),s.forEach(c=>{c.card_type==="player"&&c.player?c.isDuplicate=r.has(c.player.id):c.card_type==="formation"&&(c.isDuplicate=l.has(c.formation))});const{data:d}=await h.from("users").select("*").eq("id",e.profile.id).single();d&&(e.profile=d),bt(s,t,o)}function yt(){const t=Math.random()*100;return t<.5?"legende":t<2?"special":t<10?"normal_high":"normal_low"}function K(t){return Math.max(Number(t.note_g)||0,Number(t.note_d)||0,Number(t.note_m)||0,Number(t.note_a)||0)}function mt(t,e){let i;switch(e){case"legende":i=t.filter(o=>o.rarity==="legende"),i.length||(i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte")),i.length||(i=t.filter(o=>K(o)>=6));break;case"special":i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte"),i.length||(i=t.filter(o=>K(o)>=6));break;case"normal_high":i=t.filter(o=>o.rarity==="normal"&&K(o)>=6),i.length||(i=t.filter(o=>K(o)>=6));break;default:i=t.filter(o=>o.rarity==="normal"&&K(o)>=1&&K(o)<=5),i.length||(i=t.filter(o=>o.rarity==="normal"));break}return i.length||(i=t),i[Math.floor(Math.random()*i.length)]}async function vt(t,e,i){if(i>0){const{error:d}=await h.from("users").update({credits:t.credits-i}).eq("id",t.id);if(d)throw d}const{data:o}=await h.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const a=o.filter(d=>d.job==="GK"),n=o.filter(d=>d.job!=="GK"),r=!t.first_booster_opened&&a.length>0,l=[];for(let d=0;d<e;d++){const c=d===0&&r?a:d===0?n:o,u=yt(),p=mt(c,u);p&&l.push(p)}r&&await h.from("users").update({first_booster_opened:!0}).eq("id",t.id);const{data:s}=await h.from("cards").insert(l.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return l.map((d,c)=>({...s[c],player:d}))}async function xt(t,e,i){const{error:o}=await h.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const a=Object.keys(qe),n=Array.from({length:e},()=>a[Math.floor(Math.random()*a.length)]),{data:r}=await h.from("cards").insert(n.map(l=>({owner_id:t.id,card_type:"game_changer",gc_type:l}))).select();return r}async function ht(t,e){const{error:i}=await h.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=o[Math.floor(Math.random()*o.length)],{data:n}=await h.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return n}function bt(t,e,i){const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
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
  `,document.body.appendChild(o);let a=!1;document.getElementById("pack-visual").addEventListener("click",()=>{if(a)return;a=!0;const p=document.getElementById("pack-visual");p.classList.add("shaking"),setTimeout(()=>{p.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none",r(0)},600)},500)});let n=0;function r(p){n=p;const f=document.getElementById("reveal-phase");f.style.display="flex",l(p)}function l(p){var x;const f=t[p],y=document.getElementById("card-counter"),m=document.getElementById("single-card-slot"),g=document.getElementById("card-tap-hint");y&&(y.textContent=`Carte ${p+1} / ${t.length}`),g&&(g.textContent=p<t.length-1?"Appuie pour continuer →":"Appuie pour voir toutes tes cartes");const $=Le(f),b=f.card_type==="player"&&((x=f.player)==null?void 0:x.rarity)==="legende";m.innerHTML=`
      <div id="current-card-wrap" class="single-card-reveal" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;${b?"filter:drop-shadow(0 0 20px #7a28b8)":""}">
        ${$}
        ${f.isDuplicate?'<div style="font-size:11px;font-weight:700;color:#fff;background:#cc2222;border-radius:8px;padding:2px 10px">Doublon</div>':""}
      </div>`,b&&c();const w=document.getElementById("current-card-wrap");let v=!1;w.addEventListener("click",()=>{if(v)return;v=!0;const I=p+1;I<t.length?(w.style.transition="all 0.25s ease",w.style.transform="translateX(-120%) rotate(-15deg)",w.style.opacity="0",setTimeout(()=>l(I),250)):s()})}function s(){u(),document.getElementById("reveal-phase").style.display="none";const p=document.getElementById("recap-phase");p.style.display="flex";const f=document.getElementById("recap-grid");f.innerHTML=t.map((y,m)=>`
      <div class="recap-card" style="--i:${m};animation-delay:${m*.07}s;display:flex;flex-direction:column;align-items:center;gap:4px">
        ${Le(y)}
        ${y.isDuplicate?'<div style="font-size:11px;font-weight:700;color:#fff;background:#cc2222;border-radius:8px;padding:2px 10px">Doublon</div>':""}
      </div>`).join("")}let d=null;function c(){const p=document.getElementById("fireworks-canvas");if(!p)return;p.width=window.innerWidth,p.height=window.innerHeight;const f=p.getContext("2d"),y=[];function m(){const $=Math.random()*p.width,b=Math.random()*p.height*.6,w=["#7a28b8","#ff4081","#D4A017","#00e676","#fff","#e040fb","#40c4ff"],v=w[Math.floor(Math.random()*w.length)];for(let x=0;x<60;x++){const I=Math.PI*2/60*x,j=2+Math.random()*5;y.push({x:$,y:b,vx:Math.cos(I)*j,vy:Math.sin(I)*j,alpha:1,color:v,size:2+Math.random()*3})}}m(),d=setInterval(m,600);function g(){if(document.getElementById("fireworks-canvas")){f.clearRect(0,0,p.width,p.height);for(let $=y.length-1;$>=0;$--){const b=y[$];if(b.x+=b.vx,b.y+=b.vy+.08,b.vy*=.98,b.alpha-=.018,b.alpha<=0){y.splice($,1);continue}f.globalAlpha=b.alpha,f.fillStyle=b.color,f.beginPath(),f.arc(b.x,b.y,b.size,0,Math.PI*2),f.fill()}f.globalAlpha=1,(d!==null||y.length>0)&&requestAnimationFrame(g)}}g()}function u(){d!==null&&(clearInterval(d),d=null);const p=document.getElementById("fireworks-canvas");p&&p.getContext("2d").clearRect(0,0,p.width,p.height)}document.getElementById("reveal-collection").addEventListener("click",()=>{u(),o.remove(),i("collection")}),document.getElementById("reveal-more").addEventListener("click",()=>{u(),o.remove(),i("boosters")})}function Le(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,a=o.job||"ATT",n=pt[a]||"#1A6B3C",r=ft[o.rarity]||"#ccc",l=a==="GK"?o.note_g:a==="DEF"?o.note_d:a==="MIL"?o.note_m:o.note_a,s=ct(o),d={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${r};overflow:hidden;display:flex;flex-direction:column">
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
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function wt(){const t=document.createElement("div");t.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;
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
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const a=document.getElementById("ad-cd");a&&(a.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}const U={"4-3-3 (3)":{GK:1,DEF:4,MIL:3,ATT:3},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-3-3 (4)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-2-1":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (2)":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"4-3-3 (5)":{GK:1,DEF:4,MIL:3,ATT:3},"5-2-2-1":{GK:1,DEF:5,MIL:2,ATT:3},"4-3-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"5-2-1-2":{GK:1,DEF:5,MIL:3,ATT:2},"4-5-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"4-5-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2},"4-4-1-1":{GK:1,DEF:4,MIL:4,ATT:2},"4-1-2-1-2":{GK:1,DEF:4,MIL:4,ATT:2},"3-4-1-2":{GK:1,DEF:3,MIL:5,ATT:2},"3-4-2-1":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"4-1-4-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-2-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-2-3-1":{GK:1,DEF:4,MIL:5,ATT:1},"4-2-3-1 (2)":{GK:1,DEF:4,MIL:5,ATT:1},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"4-1-2-1-2 (2)":{GK:1,DEF:4,MIL:4,ATT:2}},se={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function Ne(t,e,i,o,a){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",a)}function Oe(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function Me(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,skin:e.skin,hair:e.hair,hair_length:e.hair_length,boost:0,used:!1,_line:null,_col:null}}function ve(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function _t(){const t=Math.random()*100;return t<.1?4:t<5?3:t<20?2:1}function kt(t,e){const i=U[e]||U["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const n of["GK","DEF","MIL","ATT"]){const r=[];for(let s=0;s<i[n];s++){let d=a.findIndex(c=>c.job===n);if(d===-1&&(d=a.findIndex(c=>c.job2===n)),d===-1&&(d=0),a[d]){const c={...a[d],_line:n};r.push(c),a.splice(d,1)}}const l=ve(r.length);r.forEach((s,d)=>{s._col=l[d]}),o[n]=r}return o}async function Et(t,e){const{data:i}=await h.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length").eq("is_active",!0).limit(60);if(!i||i.length<11)return It(t);const o=U[t]||U["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const r of["GK","DEF","MIL","ATT"]){const l=n.filter(p=>p.job===r),s=n.filter(p=>p.job!==r),d=[...l,...s],c=[];for(let p=0;p<o[r];p++){const f=d[p]||n[p];f&&c.push({cardId:"ai-"+f.id+"-"+p,id:f.id,firstname:f.firstname,name:f.surname_encoded,country_code:f.country_code,club_id:f.club_id,job:f.job,job2:f.job2,note_g:Number(f.note_g)||0,note_d:Number(f.note_d)||0,note_m:Number(f.note_m)||0,note_a:Number(f.note_a)||0,rarity:f.rarity,skin:f.skin,hair:f.hair,hair_length:f.hair_length,boost:0,used:!1,_line:r})}const u=ve(c.length);c.forEach((p,f)=>{p._col=u[f]}),a[r]=c}return a}function It(t){const e=U[t]||U["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let a=0;for(const n of["GK","DEF","MIL","ATT"]){const r=[];for(let s=0;s<e[n];s++){const d=3+Math.floor(Math.random()*5);r.push({cardId:"fake-"+a,id:"fake-"+a,firstname:"IA",name:o[a%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?d:2,note_d:n==="DEF"?d:2,note_m:n==="MIL"?d:2,note_a:n==="ATT"?d:2,rarity:"normal",boost:0,used:!1,_line:n}),a++}const l=ve(r.length);r.forEach((s,d)=>{s._col=l[d]}),i[n]=r}return i}async function At(t,e){var v;const{state:i,navigate:o,toast:a}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const r=n.matchMode||"vs_ai_easy",l=r.replace("vs_ai_",""),s=r;if(!n.deckId)return Tt(t,e,r);const d=n.deckId,{data:c}=await h.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
          clubs(encoded_name,logo_url)))`).eq("deck_id",d).order("slot_order"),u=(c||[]).filter(x=>{var I;return x.is_starter&&((I=x.card)==null?void 0:I.player)}).map(x=>Me(x.card)),p=(c||[]).filter(x=>{var I;return!x.is_starter&&((I=x.card)==null?void 0:I.player)}).map(x=>Me(x.card));if(u.length<11){Ne(t,"⚠️",`Deck incomplet (${u.length}/11).`,"Compléter",()=>o("decks"));return}const f=(c||[]).find(x=>{var I;return((I=x.card)==null?void 0:I.card_type)==="formation"}),y=((v=f==null?void 0:f.card)==null?void 0:v.formation)||"4-4-2",{data:m}=await h.from("cards").select("id,gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),g=kt(u,y),$=await Et(y),{data:b}=await h.from("matches").insert({home_id:i.profile.id,away_id:null,mode:s,home_deck_id:d,status:"in_progress"}).select().single(),w={matchId:b==null?void 0:b.id,mode:s,difficulty:l,formation:y,homeTeam:g,aiTeam:$,homeSubs:p,subsUsed:0,maxSubs:Math.min(p.length,3),homeScore:0,aiScore:0,gcCards:m||[],usedGc:[],boostCard:null,boostUsed:!1,phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},clubName:i.profile.club_name||"Vous"};Lt(t,w,e)}async function Tt(t,e,i){var r;const{state:o,navigate:a}=e,{data:n}=await h.from("decks").select("id,name,is_active,formation_card_id").eq("owner_id",o.profile.id).order("created_at",{ascending:!1});if(!n||n.length===0){Ne(t,"📋","Aucun deck. Crée un deck avant de jouer !","Créer un deck",()=>a("decks"));return}t.innerHTML=`
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
  </div>`,t.querySelectorAll(".deck-select-card").forEach(l=>{l.addEventListener("mouseenter",()=>l.style.background="rgba(255,255,255,0.14)"),l.addEventListener("mouseleave",()=>l.style.background="rgba(255,255,255,0.08)"),l.addEventListener("click",()=>{e.navigate("match",{matchMode:i,deckId:l.dataset.deckId})})}),(r=document.getElementById("cancel-deck-select"))==null||r.addEventListener("click",()=>a("home"))}function Lt(t,e,i){const o=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[];function n(u){return u.reduce((p,f)=>p+G(f,"MIL"),0)}function r(u){let p=0;for(let f=0;f<u.length-1;f++)J(u[f],u[f+1])!=="#333"&&p++;return p}const l=n(o)+r(o),s=n(a)+r(a),d=l>=s;function c(u,p,f){return`<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px">${p}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${u.map((y,m)=>{const g=Oe(y),$=m<u.length-1?J(y,u[m+1]):null;return`
          <div style="width:52px;height:52px;border-radius:8px;background:${f};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${g?`<img src="${g}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:""}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000">${G(y,"MIL")}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${y.name}</div>
          </div>
          ${$?`<div style="width:12px;height:4px;border-radius:2px;background:${$};flex-shrink:0;opacity:${$==="#333"?.3:.9}"></div>`:""}
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
  </div>`,setTimeout(()=>{const u=document.getElementById("score-home"),p=document.getElementById("score-ai"),f=document.getElementById("midfield-result");if(u&&p&&(d?(u.style.fontSize="72px",u.style.color="#fff",p.style.opacity="0.3"):(p.style.fontSize="72px",p.style.color="#fff",u.style.opacity="0.3")),f){const y=_t();f.style.opacity="1";const m=d?e.clubName:"IA";f.innerHTML=`
        <div style="font-size:18px;font-weight:900;margin-bottom:8px">
          ⚽ ${m} remporte le milieu !
        </div>
        ${d?`
        <div style="background:rgba(135,206,235,0.2);border:2px solid #87CEEB;border-radius:12px;padding:12px 20px;margin-top:8px;display:inline-block">
          <div style="font-size:11px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:28px;font-weight:900;color:#87CEEB">+${y}</div>
          <div style="font-size:11px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>`:""}
      `,d&&(e.boostCard={value:y})}e.attacker=d?"home":"ai",e.log.push({text:`Duel milieu : ${e.clubName} ${l} – ${s} IA → ${d?e.clubName:"IA"} attaque en premier`,type:"info"}),setTimeout(()=>{e.phase=e.attacker==="home"?"attack":"ai-attack",F(t,e,i),e.attacker==="ai"&&setTimeout(()=>de(t,e,i),1e3)},2800)},1200)}function Ke(t,e,i,o,a=310,n=310){const r=fe[e]||{},l=Y[e]||[],s=26,d={},c=["ATT","MIL","DEF","GK"];for(const y of c)(t[y]||[]).forEach((g,$)=>{d[`${y}${$+1}`]=g});function u(y){const m=r[y];return m?{x:m.x*a,y:m.y*n}:null}let p="";for(const[y,m]of l){const g=u(y),$=u(m);if(!g||!$)continue;const b=d[y],w=d[m],v=J(b,w),x=v==="#ff3333"?.25:.9,I=v!=="#ff3333"?`filter="url(#glow${v.replace("#","").slice(0,6)})"`:"";p+=`<line x1="${g.x.toFixed(1)}" y1="${g.y.toFixed(1)}" x2="${$.x.toFixed(1)}" y2="${$.y.toFixed(1)}"
      stroke="${v}" stroke-width="3.5" stroke-linecap="round" opacity="${x}" ${I}/>`}for(const[y,m]of Object.entries(d)){const g=u(y);if(!g)continue;const $=y.replace(/[0-9]/g,""),w={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[$]||"#555",v=i==="attack"&&["MIL","ATT"].includes($)&&!m.used||i==="defense"&&["GK","DEF","MIL"].includes($)&&!m.used,x=o.includes(m.cardId);let I;i==="attack"?I=$==="MIL"?Number(m.note_m)||0:Number(m.note_a)||0:i==="defense"?I=$==="GK"?Number(m.note_g)||0:$==="MIL"?Number(m.note_m)||0:Number(m.note_d)||0:I=Number($==="GK"?m.note_g:$==="DEF"?m.note_d:$==="MIL"?m.note_m:m.note_a)||0,I=I+(m.boost||0);const j=x?"#FFD700":v?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)",C=x?3:2,L=m.used?.25:1,A=Oe(m);A&&(p+=`<defs><clipPath id="mc-${y}"><circle cx="${g.x}" cy="${g.y}" r="${s}"/></clipPath></defs>`),p+=`<circle cx="${g.x}" cy="${g.y}" r="${s}" fill="${w}" opacity="${L}"
      stroke="${j}" stroke-width="${C}"/>`,A&&!m.used&&(p+=`<image href="${A}" x="${g.x-s}" y="${g.y-s}" width="${s*2}" height="${s*2}"
        clip-path="url(#mc-${y})" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>`,p+=`<circle cx="${g.x}" cy="${g.y}" r="${s}" fill="${w}" opacity="0.35"
        stroke="${j}" stroke-width="${C}"/>`),m.boost&&(p+=`<rect x="${g.x+s-10}" y="${g.y-s}" width="14" height="10" rx="3" fill="#87CEEB"/>
        <text x="${g.x+s-3}" y="${g.y-s+8}" text-anchor="middle" font-size="7" fill="#000" font-weight="900">+${m.boost}</text>`),p+=`<text x="${g.x}" y="${g.y-1}" text-anchor="middle" font-size="12" font-weight="900"
      fill="${m.used?"#555":"white"}" font-family="Arial Black,Arial">${m.used?"–":I}</text>
    <text x="${g.x}" y="${g.y+11}" text-anchor="middle" font-size="6" fill="rgba(255,255,255,${m.used?.3:.8})"
      font-family="Arial">${(m.name||"").slice(0,8)}</text>`,v&&(p+=`<circle cx="${g.x}" cy="${g.y}" r="${s}" fill="rgba(255,255,255,0.08)"
        class="match-slot-hit ${x?"selected":""}" data-card-id="${m.cardId}" data-role="${$}"
        style="cursor:pointer"/>`)}return`<svg viewBox="0 0 ${a} ${n}" width="100%" style="display:block;max-width:360px;margin:0 auto">
    <defs>
    <filter id="glow00ff88"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glowFFD700"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>${p}
  </svg>`}function Mt(t,e,i,o){return`<div id="match-terrain-wrap" style="position:relative;padding:0 4px">
    ${Ke(t,e,i,o)}
  </div>`}function F(t,e,i){var d,c,u,p;const o={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"",a=e.selected.map(f=>f.cardId),n=e.usedSubIds||[],r=e.homeSubs.filter(f=>!n.includes(f.cardId)),l=Object.values(e.homeTeam).flat().filter(f=>f.used);t.innerHTML=`
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
      ${Mt(e.homeTeam,e.formation,e.phase,a)}
    </div>

    <!-- Barre d'outils : GC + Boost + Remplacements -->
    <div style="padding:6px 12px;display:flex;gap:6px;overflow-x:auto;align-items:center;background:rgba(0,0,0,0.2)">

      <!-- Game Changers -->
      ${e.gcCards.filter(f=>!e.usedGc.includes(f.id)).map(f=>{var y;return`
        <div class="gc-mini" data-gc-id="${f.id}" data-gc-type="${f.gc_type}"
          style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">${((y=ie[f.gc_type])==null?void 0:y.icon)||"⚡"}</div>
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
  </div>`,(d=document.getElementById("match-quit"))==null||d.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(c=document.getElementById("view-ai"))==null||c.addEventListener("click",()=>Rt(e,i)),Ct(t,e,i),t.querySelectorAll(".match-slot-hit").forEach(f=>{f.addEventListener("click",()=>Bt(f,e,t,i))}),t.querySelectorAll(".gc-mini").forEach(f=>{f.addEventListener("click",()=>Ft(f.dataset.gcId,f.dataset.gcType,t,e,i))}),(u=document.getElementById("boost-card"))==null||u.addEventListener("click",()=>{Dt(t,e,i)}),(p=document.getElementById("sub-btn"))==null||p.addEventListener("click",()=>{Gt(t,e,i)});const s=document.getElementById("match-log");s&&(s.scrollTop=s.scrollHeight)}function Ct(t,e,i){var a,n,r,l;const o=document.getElementById("match-actions");if(o)if(e.phase==="attack"){const s=e.selected.length>0?ue(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${s?`ATT : <b style="color:var(--yellow);font-size:20px">${s.total}</b>
             <span style="font-size:11px;opacity:.7">(${s.base}${s.links?` +${s.links} liens`:""}${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.5">Sélectionne 1–3 milieux/attaquants</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${s?"":"disabled"}>Attaquer →</button>`,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>zt(t,e,i))}else if(e.phase==="defense"){const s=e.selected.length>0?ge(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;opacity:.6;margin-bottom:2px">L'IA attaque avec <b style="color:#ff6b6b">${((n=e.pendingAttack)==null?void 0:n.total)||0}</b></div>
        ${s?`DEF : <b style="color:var(--yellow);font-size:20px">${s.total}</b>`:'<span style="opacity:.5">Sélectionne 1–3 défenseurs/GK</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${s?"":"disabled"}>Défendre →</button>`,(r=document.getElementById("confirm-defense"))==null||r.addEventListener("click",()=>jt(t,e,i))}else e.phase==="finished"?(o.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(l=document.getElementById("end-match"))==null||l.addEventListener("click",()=>i.navigate("home"))):o.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.4);padding:8px;font-size:12px">⏳ Tour de l'IA...</div>`}function Bt(t,e,i,o){const a=t.dataset.cardId,n=t.dataset.role,r=e.selected.findIndex(l=>l.cardId===a);if(r!==-1)e.selected.splice(r,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const l=(e.homeTeam[n]||[]).find(s=>s.cardId===a);l&&e.selected.push({...l,_role:n,_line:n})}F(i,e,o)}function zt(t,e,i){const o=e.selected.map(n=>({...n,_line:n._role})),a=ue(o,e.modifiers.home);e.pendingAttack={...a,players:[...e.selected],side:"home"},e.selected.forEach(n=>{const r=(e.homeTeam[n._role]||[]).find(l=>l.cardId===n.cardId);r&&(r.used=!0)}),e.log.push({text:`Vous attaquez : ${a.total} (${e.selected.map(n=>n.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",F(t,e,i),setTimeout(()=>St(t,e,i),1200)}function jt(t,e,i){const o=e.selected.map(r=>({...r,_line:r._role})),a=ge(o,e.modifiers.home);e.selected.forEach(r=>{const l=(e.homeTeam[r._role]||[]).find(s=>s.cardId===r.cardId);l&&(l.used=!0)});const n=Se(e.pendingAttack.total,a.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${a.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${a.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,Pe(t,e,i,"home-attack")}function de(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=De(o,"attack",e.difficulty);if(!a.length){Ue(t,e,i);return}const n=ue(a,e.modifiers.ai);e.pendingAttack={...n,players:a,side:"ai"},a.forEach(r=>{r.used=!0}),e.log.push({text:`IA attaque : ${n.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",F(t,e,i)}function St(t,e,i){const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=De(o,"defense",e.difficulty),n=a.length>0?ge(a,e.modifiers.ai).total:0;a.forEach(l=>{l.used=!0});const r=Se(e.pendingAttack.total,n,e.modifiers.ai);r.shielded?e.log.push({text:"🛡️ Bouclier IA !",type:"info"}):r.goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! (${e.pendingAttack.total} > ${n})`,type:"goal"})):e.log.push({text:`🧤 IA défend (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,Pe(t,e,i,"ai-attack")}function Pe(t,e,i,o){if(e.round++,He(e)){le(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(r=>!r.used).length){le(t,e,i);return}e.phase="ai-attack",F(t,e,i),setTimeout(()=>de(t,e,i),800);return}e.phase="attack",F(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){Ue(t,e,i);return}e.phase="ai-attack",F(t,e,i),setTimeout(()=>de(t,e,i),800)}}function He(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(a=>!a.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(a=>!a.used));return!e&&!i}function Ue(t,e,i){He(e)?le(t,e,i):(e.phase="attack",F(t,e,i))}function Dt(t,e,i){const o=Object.values(e.homeTeam).flat().filter(a=>!a.used);if(!o.length){i.toast("Aucun joueur actif à booster","error");return}i.openModal("⚡ Utiliser le Boost",`<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${e.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${o.map(a=>`
        <div class="player-boost-opt" data-card-id="${a.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${se[a.job]||"#888"};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${G(a,a._line||a.job)}</div>
          <div style="flex:1"><b>${a.firstname} ${a.name}</b><div style="font-size:11px;color:#888">${a._line||a.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${e.boostCard.value}</div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`),document.querySelectorAll(".player-boost-opt").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.cardId;for(const r of["GK","DEF","MIL","ATT"]){const l=(e.homeTeam[r]||[]).find(s=>s.cardId===n);if(l){l.boost=(l.boost||0)+e.boostCard.value,e.log.push({text:`⚡ Boost +${e.boostCard.value} appliqué à ${l.name}`,type:"info"});break}}e.boostUsed=!0,i.closeModal(),F(t,e,i)})})}function Gt(t,e,i){e.usedSubIds||(e.usedSubIds=[]);const o=Object.values(e.homeTeam).flat().filter(s=>s.used),a=e.homeSubs.filter(s=>!e.usedSubIds.includes(s.cardId));if(!o.length){i.toast("Aucun joueur grisé","info");return}if(!a.length){i.toast("Aucun remplaçant disponible","info");return}if(e.subsUsed>=e.maxSubs){i.toast(`Maximum ${e.maxSubs} remplacements`,"error");return}i.openModal("🔄 Remplacement",`<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${o.map(s=>`
        <div class="grayed-opt" data-card-id="${s.cardId}" data-role="${s._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${se[s.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s._line}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join("")}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${a.map(s=>`
        <div class="sub-opt" data-card-id="${s.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid var(--green);border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${se[s.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s.job}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`);let n=null,r=null;document.querySelectorAll(".grayed-opt").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".grayed-opt").forEach(d=>d.style.borderColor="#eee"),s.style.borderColor="#c0392b",n={cardId:s.dataset.cardId,role:s.dataset.role},l()})}),document.querySelectorAll(".sub-opt").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".sub-opt").forEach(d=>d.style.borderColor="var(--green)"),s.style.borderColor="#D4A017",r=s.dataset.cardId,l()})});function l(){if(!n||!r)return;const s=n.role,d=e.homeTeam[s]||[],c=d.findIndex(p=>p.cardId===n.cardId),u=e.homeSubs.find(p=>p.cardId===r);c!==-1&&u&&(u._line=s,u._col=d[c]._col,u.used=!1,d.splice(c,1,u),e.usedSubIds=[...e.usedSubIds||[],r],e.subsUsed++,e.log.push({text:`🔄 Remplacement : ${u.firstname} ${u.name} entre`,type:"info"})),i.closeModal(),F(t,e,i)}}function Ft(t,e,i,o,a){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier !",type:"info"});break;case"Ressusciter":{let n=!1;for(const r of["ATT","MIL","DEF","GK"]){const l=(o.homeTeam[r]||[]).find(s=>s.used);if(l){l.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(r=>!r.used);if(n.length){const r=n.sort((l,s)=>G(s,"ATT")-G(l,"ATT"))[0];r.used=!0,o.log.push({text:`❄️ ${r.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement",type:"info"});break}h.from("cards").delete().eq("id",t).then(()=>{}),F(i,o,a)}}async function le(t,e,i){var c,u;e.phase="finished";const{state:o}=i,a=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,r=a?"victoire":n?"nul":"defaite",l=Qe(e.mode,r);e.matchId&&await h.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?o.profile.id:null,home_credits_reward:l,played_at:new Date().toISOString()}).eq("id",e.matchId);const s={credits:(o.profile.credits||0)+l,matches_played:(o.profile.matches_played||0)+1};a?s.wins=(o.profile.wins||0)+1:n?s.draws=(o.profile.draws||0)+1:s.losses=(o.profile.losses||0)+1,await h.from("users").update(s).eq("id",o.profile.id),await i.refreshProfile();const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",d.innerHTML=`
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
    </div>`,document.body.appendChild(d),(c=document.getElementById("res-home"))==null||c.addEventListener("click",()=>{d.remove(),i.navigate("home")}),(u=document.getElementById("res-replay"))==null||u.addEventListener("click",()=>{d.remove(),i.navigate("match",{matchMode:e.mode})})}function Rt(t,e){e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${Ke(t.aiTeam,t.formation,null,[],300,300)}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const qt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Nt(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await xe(t,e)}async function xe(t,e){const{state:i,toast:o}=e,{data:a}=await h.from("market_listings").select(`id, price, status, listed_at, seller_id,
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
      ${c.map(u=>{var g,$,b;const p=(g=u.card)==null?void 0:g.player;if(!p)return"";const f=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,y=qt[p.rarity],m=(i.profile.credits||0)>=u.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${Pt(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${y};flex-shrink:0">${f}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${(($=p.clubs)==null?void 0:$.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((b=u.seller)==null?void 0:b.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${u.price.toLocaleString("fr")}</div>
            ${s==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${u.id}" ${m?"":"disabled"} style="margin-top:4px">${m?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${u.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,d.querySelectorAll("[data-buy]").forEach(u=>{u.addEventListener("click",()=>Ot(u.dataset.buy,c,t,e))}),d.querySelectorAll("[data-cancel]").forEach(u=>{u.addEventListener("click",()=>Kt(u.dataset.cancel,t,e))})}l("buy"),t.querySelectorAll(".mkt-tab").forEach(s=>{s.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(d=>{const c=d===s;d.style.background=c?"var(--green)":"#fff",d.style.color=c?"#fff":"var(--gray-600)",d.style.borderColor=c?"var(--green)":"var(--gray-200)"}),l(s.dataset.tab)})})}async function Ot(t,e,i,o){const{state:a,toast:n,refreshProfile:r}=o,l=e.find(s=>s.id===t);if(l){if((a.profile.credits||0)<l.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${l.card.player.firstname} ${l.card.player.surname_encoded} pour ${l.price.toLocaleString("fr")} crédits ?`))try{const{error:s}=await h.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",l.card.id);if(s)throw s;await h.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await h.from("users").update({credits:(a.profile.credits||0)-l.price}).eq("id",a.profile.id);const{data:d}=await h.from("users").select("credits").eq("id",l.seller_id).single();d&&await h.from("users").update({credits:(d.credits||0)+l.price}).eq("id",l.seller_id),await h.from("notifications").insert({user_id:l.seller_id,type:"card_sold",message:`Ta carte ${l.card.player.surname_encoded} a été vendue pour ${l.price} crédits !`,data:{card_id:l.card.id,price:l.price}}),await r(),n("Carte achetée ! ✅","success"),xe(i,o)}catch(s){n("Erreur : "+s.message,"error")}}}async function Kt(t,e,i){const{toast:o}=i,{data:a}=await h.from("market_listings").select("card_id").eq("id",t).single();await h.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await h.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),o("Annonce retirée","success"),xe(e,i)}function Pt(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function Ht(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await h.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
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
  `}const M={user:null,profile:null,page:"home",params:{}};function Z(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function Ut(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function ce(){document.getElementById("modal-overlay").classList.add("hidden")}async function ee(){if(!M.user)return;const{data:t}=await h.from("users").select("*").eq("id",M.user.id).single();t&&(M.profile=t)}const he="mw_theme";function re(){return localStorage.getItem(he)||"light"}function Vt(t){var e;localStorage.setItem(he,t),pe(t),(e=M.profile)!=null&&e.id&&h.from("users").update({theme:t}).eq("id",M.profile.id).then(()=>{})}function pe(t){document.documentElement.setAttribute("data-theme",t)}function te(t,e={}){M.page=t,M.params=e,Ve()}async function Ve(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===M.page)});const e=document.getElementById("nav-credits");e&&M.profile&&(e.textContent=`💰 ${(M.profile.credits||0).toLocaleString("fr")}`);const i={state:M,navigate:te,toast:Z,openModal:Ut,closeModal:ce,refreshProfile:ee};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',M.page){case"home":await _e(t,i);break;case"collection":await it(t,i);break;case"decks":await Re(t,i);break;case"boosters":await ut(t,i);break;case"match":await At(t,i);break;case"market":await Nt(t,i);break;case"rankings":await Ht(t,i);break;default:await _e(t,i)}}function Yt(){const t=document.getElementById("app"),e=M.profile;if(!e)return;const i="/manager-wars/icons/";t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault(),te(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>te("home")),document.getElementById("nav-credits").addEventListener("click",()=>te("boosters")),document.getElementById("theme-toggle").addEventListener("click",()=>{const a=re()==="dark"?"light":"dark";Vt(a),Ce(a)}),Ce(re())}function Ce(t){const e=document.getElementById("theme-icon");e&&(e.textContent=t==="dark"?"☀️":"🌙")}async function Jt(){pe(re()),document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&ce()}),document.getElementById("modal-close").addEventListener("click",ce);const{data:{session:t}}=await h.auth.getSession();if(!t){ze(),we(document.getElementById("app"),{navigate:()=>window.location.reload(),toast:Z});return}M.user=t.user,await ee(),ze();try{const{data:e}=await h.from("formation_links_overrides").select("formation, links"),i={};(e||[]).forEach(o=>{i[o.formation]=o.links}),Ye(i)}catch(e){console.warn("Impossible de charger les overrides de formation:",e)}if(!M.profile){Je(document.getElementById("app"),{state:M,navigate:async()=>{await ee(),Be()},toast:Z,refreshProfile:ee});return}M.profile.theme&&M.profile.theme!==re()&&(localStorage.setItem(he,M.profile.theme),pe(M.profile.theme)),Be(),h.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(M.user=null,M.profile=null,document.getElementById("app").innerHTML="",we(document.getElementById("app"),{navigate:()=>window.location.reload(),toast:Z}))})}function Be(){const t=document.getElementById("app");t.style.display="flex",t.style.flexDirection="column",Yt(),Ve()}function ze(){const t=document.getElementById("app-loader"),e=document.getElementById("app");e&&(e.style.display=""),t&&(t.classList.add("zoom-out"),setTimeout(()=>t.style.display="none",500))}Jt();
