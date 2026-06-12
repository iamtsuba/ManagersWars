import{s as _}from"./supabase-z_u0vv5N.js";function se(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(r=>r.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),r=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!r){n.textContent="Remplissez tous les champs.";return}const s=document.getElementById("login-btn");s.textContent="Connexion…",s.disabled=!0;const{error:l}=await _.auth.signInWithPassword({email:o,password:r});if(s.textContent="Se connecter",s.disabled=!1,l){n.textContent=l.message.includes("Invalid")?"Email ou mot de passe incorrect.":l.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),r=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,s=document.getElementById("reg-error");if(s.textContent="",!o||!r||!n){s.textContent="Remplissez tous les champs.";return}if(r.length<6){s.textContent="Mot de passe trop court (min. 6 caractères).";return}if(r!==n){s.textContent="Les mots de passe ne correspondent pas.";return}const l=document.getElementById("reg-btn");l.textContent="Création…",l.disabled=!0;const{error:a}=await _.auth.signUp({email:o,password:r});if(l.textContent="Créer mon compte",l.disabled=!1,a){s.textContent=a.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Fe(t,{state:e,navigate:i,toast:o,refreshProfile:r}){let n="#1A6B3C",s="#D4A017";t.innerHTML=`
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
  `;function l(){var h;const d=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),y=((h=document.getElementById("setup-club"))==null?void 0:h.value)||"MW",p=y.trim().split(" ").filter(Boolean),f=p.length>=2?(p[0][0]+p[1][0]).toUpperCase():y.slice(0,2).toUpperCase();d&&(d.style.background=s,d.style.borderColor=n),c&&(c.textContent=f,c.style.color=n)}document.getElementById("color1").addEventListener("input",d=>{n=d.target.value,document.getElementById("swatch1").style.background=n,l()}),document.getElementById("color2").addEventListener("input",d=>{s=d.target.value,document.getElementById("swatch2").style.background=s,l()});function a(d){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${d}`).classList.add("active"),document.getElementById("step-num").textContent=d,document.getElementById("progress-fill").style.width=`${Math.round(d/3*100)}%`,d===3&&l()}document.getElementById("step1-next").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",d.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:y}=await _.from("users").select("id").eq("pseudo",d).maybeSingle();if(y){c.textContent="Ce pseudo est déjà pris.";return}a(2)}),document.getElementById("step2-back").addEventListener("click",()=>a(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const d=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",d.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:y}=await _.from("users").select("id").eq("club_name",d).maybeSingle();if(y){c.textContent="Ce nom de club est déjà pris.";return}a(3)}),document.getElementById("step3-back").addEventListener("click",()=>a(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),y=document.getElementById("step3-error"),p=document.getElementById("step3-finish");y.textContent="",p.disabled=!0,p.textContent="Création en cours…";try{const{error:f}=await _.from("users").insert({id:e.user.id,pseudo:d,club_name:c,club_color1:n,club_color2:s,credits:1e4});if(f)throw f;await ze(e.user.id),await r(),o(`Bienvenue ${d} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(f){y.textContent=f.message,p.disabled=!1,p.textContent="🚀 Créer mon profil !"}})}async function ze(t){const{data:e}=await _.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(a=>a.job==="GK"),r=i.filter(a=>a.job!=="GK"),n=[];for(let a=0;a<5;a++){let d=[];if(a===0&&o.length>0){const c=o[Math.floor(Math.random()*o.length)];d.push(c);const y=ae([...r]).slice(0,3);d.push(...y)}else d=ae([...i]).slice(0,4);d.forEach(c=>{n.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(a=>{n.push({owner_id:t,card_type:"game_changer",gc_type:a})});const l=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:l[Math.floor(Math.random()*l.length)]}),n.length>0&&await _.from("cards").insert(n),await _.from("users").update({first_booster_opened:!0}).eq("id",t)}function ae(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function K(t,{state:e,navigate:i,toast:o}){const r=e.profile;if(!r)return;const{data:n}=await _.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${r.id},away_id.eq.${r.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),s=(r.club_name||"MW").split(" ").filter(Boolean),l=s.length>=2?(s[0][0]+s[1][0]).toUpperCase():(r.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
  <div class="page">
    <div class="page-body">

      <!-- Hero profil -->
      <div class="hero">
        <div class="info">
          <h3>${r.pseudo}</h3>
          <div class="level">Niveau ${r.level} · ${r.club_name}</div>
          <div class="stats">
            <div class="stat"><span class="val">${r.wins}</span><span class="lbl">V</span></div>
            <div class="stat"><span class="val">${r.trophies_top1}</span><span class="lbl">TOP1</span></div>
            <div class="stat"><span class="val">${(r.credits||0).toLocaleString("fr")}</span><span class="lbl">Crédits</span></div>
          </div>
        </div>
        <div class="logo-big" style="background:${r.club_color2};border-color:${r.club_color1}">
          <span style="color:${r.club_color1}">${l}</span>
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
          ${n.map(a=>{const d=a.winner_id===r.id,c=a.home_score===a.away_score,y=c?"N":d?"V":"D",p=c?"#888":d?"#1A6B3C":"#c0392b",f={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[a.mode]||a.mode,m=new Date(a.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${f}</div>
                <div style="font-size:11px;color:var(--gray-600)">${m}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${a.home_score} - ${a.away_score}</span>
                <span style="background:${p};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${y}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",d=>{d.preventDefault(),i(a.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",()=>{const d=a.dataset.action;if(d==="championship"){o("Championnats — bientôt disponibles","info");return}if(d==="match-random"){o("Matchmaking aléatoire — bientôt disponible","info");return}if(d==="match-friend"){o("Défi ami — bientôt disponible","info");return}d==="match-ai"&&Se(i)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await _.auth.signOut(),window.location.reload()})}function Se(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
    <div class="modal" style="max-width:380px">
      <div class="modal-header"><h2>Choisir la difficulté</h2><button class="btn-icon" id="diff-cancel">✕</button></div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${e.map(r=>`
            <div class="action-card" data-mode="${r.mode}" style="cursor:pointer">
              <div class="icon">${r.icon}</div>
              <div class="label">${r.label}</div>
              <div class="sub">${r.sub}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",r=>{r.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(r=>{r.addEventListener("click",()=>{o(),t("match",{matchMode:r.dataset.mode})})})}const Q={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function C(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const re=["ATT","MIL","DEF","GK"];function ye(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let r=o+1;r<i;r++){const n=t[o],s=t[r];if(!n||!s)continue;const l=n._col!==void 0&&s._col!==void 0&&n._col===s._col,a=n._col!==void 0&&s._col!==void 0&&Math.abs(n._col-s._col)===1,d=re.indexOf(n._line),c=re.indexOf(s._line),y=Math.abs(d-c)===1;(n._line===s._line&&a||l&&y)&&(n.country_code&&s.country_code&&n.country_code===s.country_code&&e++,n.club_id&&s.club_id&&n.club_id===s.club_id&&e++)}return e}function Z(t,e={}){const i=t.reduce((n,s)=>{const l=s._line||s.job;return n+Number(l==="MIL"?s.note_m:s.note_a)||0},0),o=ye(t);let r=i+o;return e.doubleAttack&&(r*=2),e.stolenNote&&(r-=e.stolenNote),{base:i,links:o,total:Math.max(0,r)}}function ee(t,e={}){const i=t.reduce((n,s)=>{const l=s._line||s.job;let a=0;return l==="GK"?a=Number(s.note_g)||0:l==="MIL"?a=Number(s.note_m)||0:a=Number(s.note_d)||0,n+a},0),o=ye(t);let r=i+o;return e.stolenNote&&(r-=e.stolenNote),{base:i,links:o,total:Math.max(0,r)}}function ge(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function me(t,e,i="easy"){const o=t.filter(s=>!s.used);if(!o.length)return[];const r=[...o].sort((s,l)=>{const a=e==="attack"?C(s,"ATT"):s._line==="GK"?C(s,"GK"):C(s,"DEF");return(e==="attack"?C(l,"ATT"):l._line==="GK"?C(l,"GK"):C(l,"DEF"))-a});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return r.slice(0,Math.min(n,r.length,3))}function Ge(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const ve={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},H={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},de=["GK","DEF","MIL","ATT"],Re=["Tous","GK","DEF","MIL","ATT"],Ne={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},xe={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function he(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function U(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function qe(t,e=""){var y,p;const i=t.player;if(!i)return"";const o=i.job||"ATT",r=H[o],n=ve[i.rarity]||"#ccc",s=U(i,o),l=i.job2?U(i,i.job2):null,a=i.job2?H[i.job2]:null,d=he(i),c=xe[i.country_code]||i.country_code||"";return`
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
        <div style="position:absolute;top:16px;width:100%;height:28px;background:${r}"></div>
        <!-- Étoile principale centrée sur le bandeau, contour blanc -->
        <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18"
            fill="${r}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${s}</text>
        </svg>
        <!-- Petite étoile poste secondaire, toujours en dessous du bandeau -->
        ${l!==null?`
        <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
          <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11"
            fill="${a}" stroke="white" stroke-width="1.5"/>
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
        ${(y=i.clubs)!=null&&y.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((p=i.clubs)==null?void 0:p.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}async function be(t,e){const{state:i,navigate:o,toast:r,openModal:n,closeModal:s}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:l}=await _.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),a=(l||[]).filter(u=>u.card_type==="player"&&u.player),d=(l||[]).filter(u=>u.card_type==="game_changer"),c=(l||[]).filter(u=>u.card_type==="formation"),y={};a.forEach(u=>{const x=u.player.id;y[x]=(y[x]||0)+1});let p="Tous",f="";function h(){return[...a].sort((u,x)=>{const b=de.indexOf(u.player.job),v=de.indexOf(x.player.job);return b!==v?b-v:(u.player.surname_encoded||"").localeCompare(x.player.surname_encoded||"")})}function m(){return h().filter(u=>{const x=u.player,b=p==="Tous"||x.job===p,v=!f||`${x.firstname} ${x.surname_encoded}`.toLowerCase().includes(f);return b&&v})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${a.length} carte(s) joueur · ${d.length} Game Changer · ${c.length} Formation</p>
    </div>

    <!-- Cartes spéciales (cliquables) -->
    ${d.length>0||c.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">

        ${d.map(u=>{var x;return`
          <div data-gc-id="${u.id}" data-gc-type="${u.gc_type}" style="
            background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            <div style="font-size:28px">${((x=Q[u.gc_type])==null?void 0:x.icon)||"⚡"}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${u.gc_type}</div>
          </div>`}).join("")}

        ${c.map(u=>`
          <div data-form-id="${u.id}" data-formation="${u.formation}" style="
            background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${u.formation}</div>
          </div>`).join("")}

      </div>
    </div>`:""}

    <!-- Filtres -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${Re.map(u=>`
          <button class="filter-btn" data-job="${u}"
            style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${u===p?"var(--green)":"var(--gray-200)"};
              background:${u===p?"var(--green)":"#fff"};
              color:${u===p?"#fff":"var(--gray-600)"}">
            ${u}
          </button>`).join("")}
      </div>
    </div>

    <!-- Grille cartes joueurs -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function g(){const u=m(),x=document.getElementById("col-grid");if(!x)return;if(!u.length){x.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const b={},v=[];u.forEach($=>{const E=$.player.id;b[E]||(b[E]=!0,v.push($))}),x.innerHTML=v.map($=>{const E=y[$.player.id]||1,w=E>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${E}</div>`:"",L=a.filter(I=>I.player.id===$.player.id&&I.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return qe($,w+L)}).join(""),x.querySelectorAll("[data-card-id]").forEach($=>{$.addEventListener("click",()=>{const E=a.find(w=>w.id===$.dataset.cardId);E&&Ke(E,a,y,e)})})}g(),t.querySelectorAll(".filter-btn").forEach(u=>{u.addEventListener("click",()=>{p=u.dataset.job,t.querySelectorAll(".filter-btn").forEach(x=>{const b=x.dataset.job===p;x.style.background=b?"var(--green)":"#fff",x.style.color=b?"#fff":"var(--gray-600)",x.style.borderColor=b?"var(--green)":"var(--gray-200)"}),g()})}),document.getElementById("col-search").addEventListener("input",u=>{f=u.target.value.toLowerCase(),g()}),t.querySelectorAll("[data-gc-id]").forEach(u=>{u.addEventListener("click",()=>Oe(u.dataset.gcType,n))}),t.querySelectorAll("[data-form-id]").forEach(u=>{u.addEventListener("click",()=>Pe(u.dataset.formation,n))})}function Oe(t,e){const i=Q[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function Pe(t,e){const i={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},o={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},r=i[t]||i["4-4-2"],n=["ATT","MIL","DEF","GK"];function s(d,c){const h=(d-1)*54,m=(c-h)/2;return Array.from({length:d},(g,u)=>m+u*54)}function l(d){return d===1?[1]:d===2?[0,2]:d===3?[0,1,2]:d===4?[0,1,1,2]:d===5?[0,1,1,1,2]:[1]}function a(){const p=n.length*72+48,f=n.map((u,x)=>24+x*72+72/2),h={};n.forEach(u=>{h[u]=s(r[u],290)});function m(u,x){const b=r[u],v=l(b),$=h[u],E=v.indexOf(x);return E>=0?$[E]:null}let g=`<svg width="290" height="${p}" viewBox="0 0 290 ${p}" xmlns="http://www.w3.org/2000/svg">`;n.forEach((u,x)=>{const b=h[u];for(let v=0;v<b.length-1;v++){const $=b[v]+20,E=b[v+1]-20,w=f[x];g+=`<line x1="${$}" y1="${w}" x2="${E}" y2="${w}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,g+=`<text x="${($+E)/2}" y="${w-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`}});for(let u=0;u<3;u++)for(let x=0;x<n.length-1;x++){const b=n[x],v=n[x+1],$=m(b,u),E=m(v,u);if($!==null&&E!==null){const w=($+E)/2;g+=`<line x1="${$}" y1="${f[x]+20}" x2="${E}" y2="${f[x+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,g+=`<text x="${w+6}" y="${(f[x]+f[x+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`}}return n.forEach((u,x)=>{const b=r[u],v=h[u],$=l(b),E=o[u],w=f[x],A={};$.forEach((L,I)=>{A[L]||(A[L]={xs:[],indices:[]}),A[L].xs.push(v[I]),A[L].indices.push(I)}),Object.entries(A).forEach(([L,I])=>{const M=I.xs.length;if(M>1){const T=I.xs.reduce((j,V)=>j+V,0)/M;g+=`<circle cx="${T}" cy="${w}" r="20" fill="${E}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,g+=`<text x="${T}" y="${w-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${u}</text>`,g+=`<text x="${T}" y="${w+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${M}</text>`}else{const T=I.xs[0],j=I.indices[0]+1;g+=`<circle cx="${T}" cy="${w}" r="20" fill="${E}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,g+=`<text x="${T}" y="${w+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${u}</text>`,g+=`<text x="${T}" y="${w+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${u}${j}</text>`}})}),g+="</svg>",g}e(`Formation ${t}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${a()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function Ke(t,e,i,o){var E,w,A,L,I,M;const{state:r,toast:n,openModal:s,closeModal:l,navigate:a,refreshProfile:d}=o,c=t.player,y=e.filter(T=>T.player.id===c.id),p=y.length,f=Ne[c.rarity]||1e3,h=c.rarity!=="legende",m=he(c),g=U(c,c.job),u=c.job2?U(c,c.job2):null,x=H[c.job]||"#1A6B3C",b=c.job2?H[c.job2]:null,v=ve[c.rarity]||"#ccc",$=xe[c.country_code]||c.country_code||"";s(`${c.firstname} ${c.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${v};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${c.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(c.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${x}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${x}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${g}</text>
            </svg>
            ${u!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${b}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${u}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${m?`<img src="${m}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${c.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${$}</div>
            ${(E=c.clubs)!=null&&E.logo_url?`<img src="${c.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(((w=c.clubs)==null?void 0:w.encoded_name)||"").slice(0,6)}</div>`}
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
    ${h&&!t.is_for_sale?`
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
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(A=document.getElementById("close-detail"))==null||A.addEventListener("click",l),(L=document.getElementById("direct-sell-btn"))==null||L.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${c.surname_encoded} pour ${f.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const T=y.find(V=>!V.is_for_sale)||y[0];if(!T){n("Aucune carte à vendre","error");return}const{error:j}=await _.from("cards").delete().eq("id",T.id);if(j){n(j.message,"error");return}await _.from("users").update({credits:(r.profile.credits||0)+f}).eq("id",r.profile.id),await d(),n(`+${f.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),l(),a("collection")}),(I=document.getElementById("market-sell-btn"))==null||I.addEventListener("click",async()=>{const T=parseInt(document.getElementById("sell-price").value);if(!T||T<1){n("Prix invalide","error");return}await _.from("cards").update({is_for_sale:!0,sale_price:T}).eq("id",t.id),await _.from("market_listings").insert({seller_id:r.profile.id,card_id:t.id,price:T}),n("Carte mise en vente sur le marché !","success"),l(),a("collection")}),(M=document.getElementById("cancel-sell-btn"))==null||M.addEventListener("click",async()=>{await _.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await _.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),l(),a("collection")})}const $e={"4-4-2":[["ATT1","ATT2"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT2","MIL3"],["ATT2","MIL4"],["MIL1","DEF1"],["MIL1","DEF2"],["MIL2","DEF2"],["MIL3","DEF3"],["MIL4","DEF3"],["MIL4","DEF4"],["DEF1","GK1"],["DEF2","GK1"],["DEF3","GK1"],["DEF4","GK1"]],"4-3-3":[["ATT1","ATT2"],["ATT2","ATT3"],["MIL1","MIL2"],["MIL2","MIL3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["ATT1","MIL1"],["ATT2","MIL2"],["ATT3","MIL3"],["MIL1","DEF1"],["MIL1","DEF2"],["MIL2","DEF2"],["MIL2","DEF3"],["MIL3","DEF3"],["MIL3","DEF4"],["DEF1","GK1"],["DEF2","GK1"],["DEF3","GK1"],["DEF4","GK1"]],"3-4-3":[["ATT1","ATT2"],["ATT2","ATT3"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["DEF1","DEF2"],["DEF2","DEF3"],["ATT1","MIL1"],["ATT2","MIL2"],["ATT2","MIL3"],["ATT3","MIL4"],["MIL1","DEF1"],["MIL2","DEF1"],["MIL2","DEF2"],["MIL3","DEF2"],["MIL3","DEF3"],["MIL4","DEF3"],["DEF1","GK1"],["DEF2","GK1"],["DEF3","GK1"]],"3-5-2":[["ATT1","ATT2"],["MIL1","MIL2"],["MIL2","MIL3"],["MIL3","MIL4"],["MIL4","MIL5"],["DEF1","DEF2"],["DEF2","DEF3"],["ATT1","MIL1"],["ATT1","MIL2"],["ATT2","MIL4"],["ATT2","MIL5"],["MIL1","DEF1"],["MIL2","DEF1"],["MIL2","DEF2"],["MIL3","DEF2"],["MIL4","DEF2"],["MIL4","DEF3"],["MIL5","DEF3"],["DEF1","GK1"],["DEF2","GK1"],["DEF3","GK1"]],"5-3-2":[["ATT1","ATT2"],["MIL1","MIL2"],["MIL2","MIL3"],["DEF1","DEF2"],["DEF2","DEF3"],["DEF3","DEF4"],["DEF4","DEF5"],["ATT1","MIL1"],["ATT2","MIL3"],["MIL1","DEF1"],["MIL1","DEF2"],["MIL2","DEF2"],["MIL2","DEF3"],["MIL2","DEF4"],["MIL3","DEF4"],["MIL3","DEF5"],["DEF1","GK1"],["DEF2","GK1"],["DEF3","GK1"],["DEF4","GK1"],["DEF5","GK1"]]};function N(t,e){if(!t||!e)return"#cc2222";const i=t.country_code&&e.country_code&&t.country_code===e.country_code,o=t.club_id&&e.club_id&&t.club_id===e.club_id;return i&&o?"#00ff88":i||o?"#FFD700":"#ff3333"}const Ee={"4-4-2":{ATT1:{x:.3,y:.04},ATT2:{x:.7,y:.04},MIL1:{x:.1,y:.3},MIL2:{x:.37,y:.3},MIL3:{x:.63,y:.3},MIL4:{x:.9,y:.3},DEF1:{x:.1,y:.6},DEF2:{x:.37,y:.6},DEF3:{x:.63,y:.6},DEF4:{x:.9,y:.6},GK1:{x:.5,y:.88}},"4-3-3":{ATT1:{x:.2,y:.04},ATT2:{x:.5,y:.04},ATT3:{x:.8,y:.04},MIL1:{x:.2,y:.33},MIL2:{x:.5,y:.33},MIL3:{x:.8,y:.33},DEF1:{x:.1,y:.62},DEF2:{x:.37,y:.62},DEF3:{x:.63,y:.62},DEF4:{x:.9,y:.62},GK1:{x:.5,y:.88}},"3-4-3":{ATT1:{x:.2,y:.04},ATT2:{x:.5,y:.04},ATT3:{x:.8,y:.04},MIL1:{x:.1,y:.33},MIL2:{x:.37,y:.33},MIL3:{x:.63,y:.33},MIL4:{x:.9,y:.33},DEF1:{x:.2,y:.62},DEF2:{x:.5,y:.62},DEF3:{x:.8,y:.62},GK1:{x:.5,y:.88}},"3-5-2":{ATT1:{x:.3,y:.04},ATT2:{x:.7,y:.04},MIL1:{x:.05,y:.33},MIL2:{x:.28,y:.33},MIL3:{x:.5,y:.33},MIL4:{x:.72,y:.33},MIL5:{x:.95,y:.33},DEF1:{x:.2,y:.62},DEF2:{x:.5,y:.62},DEF3:{x:.8,y:.62},GK1:{x:.5,y:.88}},"5-3-2":{ATT1:{x:.3,y:.04},ATT2:{x:.7,y:.04},MIL1:{x:.2,y:.33},MIL2:{x:.5,y:.33},MIL3:{x:.8,y:.33},DEF1:{x:.05,y:.62},DEF2:{x:.28,y:.62},DEF3:{x:.5,y:.62},DEF4:{x:.72,y:.62},DEF5:{x:.95,y:.62},GK1:{x:.5,y:.88}}},W={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},z={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function te(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function ie(t,e){const{state:i,navigate:o,toast:r}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await _.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
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
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const s=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!s)return;const{data:l,error:a}=await _.from("decks").insert({owner_id:i.profile.id,name:s,is_active:!(n!=null&&n.length)}).select().single();if(a){r(a.message,"error");return}r("Deck créé !","success"),le(l.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(s=>{s.addEventListener("click",()=>le(s.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(s=>{s.addEventListener("click",async()=>{await _.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await _.from("decks").update({is_active:!0}).eq("id",s.dataset.activate),r("Deck activé !","success"),ie(t,e)})})}async function le(t,e,i){const{state:o,toast:r}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await _.from("decks").select("*").eq("id",t).single(),{data:s}=await _.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),l=(s||[]).filter(f=>f.card_type==="player"&&f.player),a=(s||[]).filter(f=>f.card_type==="formation"),d=a.map(f=>f.formation).filter(Boolean),{data:c}=await _.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let y=n.formation||"4-4-2";d.length>0&&!d.includes(y)&&(y=d[0]);const p={deckId:t,name:n.name,formation:y,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:l,formationCards:a,availableFormations:d};(c||[]).forEach(f=>{f.is_starter?p.slots[f.position]=f.card_id:p.subs.includes(f.card_id)||p.subs.push(f.card_id)}),S(e,p,i)}function S(t,e,i){var a;const{navigate:o}=i;W[e.formation];const r=ce(e.formation),n=r.filter(d=>e.slots[d]).length,s=e.availableFormations.length>0?e.availableFormations:Object.keys(W),l=e.subs.map(d=>e.playerCards.find(c=>c.id===d)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
            <span style="background:${z[c.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${c.job}</span>
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
  </div>`,He(t,e,r,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",d=>{e.formation=d.target.value;const c=ce(e.formation),y={};c.forEach(p=>{e.slots[p]&&(y[p]=e.slots[p])}),e.slots=y,S(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>Ve(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(d=>{d.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==d.dataset.removeSub),S(t,e,i)})}),(a=document.getElementById("add-sub-btn"))==null||a.addEventListener("click",()=>{We(e,t,i)})}function He(t,e,i,o){const r=document.getElementById("deck-field");if(!r)return;const n=e.formation,s=Ee[n]||{},l=$e[n]||[],a={};i.forEach(b=>{const v=e.slots[b],$=v?e.playerCards.find(E=>E.id===v):null;a[b]=($==null?void 0:$.player)||null});const d=i.filter(b=>b.startsWith("MIL"));let c=0,y=0;d.forEach(b=>{const v=a[b];v&&(c+=Number(v.note_m)||0)}),l.forEach(([b,v])=>{if(!b.startsWith("MIL")||!v.startsWith("MIL"))return;N(a[b],a[v])!=="#ff3333"&&y++});const p=320,f=320,h=28,m=4;function g(b){const v=s[b];return v?{x:v.x*p,y:v.y*f}:null}let u="";for(const[b,v]of l){const $=g(b),E=g(v);if(!$||!E)continue;const w=a[b],A=a[v],L=N(w,A),I=L==="#ff3333"?.3:.9,M=L!=="#ff3333"?`filter="url(#glow-${L.replace("#","")})"`:"";u+=`<line x1="${$.x}" y1="${$.y}" x2="${E.x}" y2="${E.y}"
      stroke="${L}" stroke-width="${m}" stroke-linecap="round"
      opacity="${I}" ${M}/>`}for(const b of i){const v=g(b);if(!v)continue;const $=a[b],E=b.replace(/\d+/,""),A={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[E]||"#555",L=$?Number(E==="GK"?$.note_g:E==="DEF"?$.note_d:E==="MIL"?$.note_m:$.note_a)||0:null,I=$?($.surname_encoded||"").slice(0,8).toUpperCase():"";if($){const M=te($);M&&(u+=`
          <defs>
            <clipPath id="clip-${b}">
              <circle cx="${v.x}" cy="${v.y}" r="${h}"/>
            </clipPath>
          </defs>
          <image href="${M}" x="${v.x-h}" y="${v.y-h}" width="${h*2}" height="${h*2}"
            clip-path="url(#clip-${b})" preserveAspectRatio="xMidYMid slice" opacity="0.85"/>`),u+=`
        <circle cx="${v.x}" cy="${v.y}" r="${h}" fill="${M?"transparent":A}"
          stroke="${A}" stroke-width="2" />
        <circle cx="${v.x}" cy="${v.y}" r="${h}" fill="${A}" opacity="${M?"0.5":"1"}"
          stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        ${M?`<image href="${M}" x="${v.x-h}" y="${v.y-h}" width="${h*2}" height="${h*2}"
          clip-path="url(#clip-${b})" preserveAspectRatio="xMidYMid slice" opacity="0.9"/>`:""}
        <text x="${v.x}" y="${v.y-3}" text-anchor="middle" font-size="13" font-weight="900"
          fill="white" font-family="Arial Black,Arial" style="text-shadow:0 1px 2px #000">${L}</text>
        <text x="${v.x}" y="${v.y+11}" text-anchor="middle" font-size="6.5" fill="rgba(255,255,255,0.9)"
          font-family="Arial">${I}</text>
        <rect x="${v.x-h}" y="${v.y-h}" width="${h*2}" height="${h*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${b}" style="cursor:pointer"/>`}else u+=`
        <circle cx="${v.x}" cy="${v.y}" r="${h}" fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="${v.x}" y="${v.y-3}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)"
          font-family="Arial">${E}</text>
        <text x="${v.x}" y="${v.y+10}" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.4)"
          font-family="Arial">+</text>
        <rect x="${v.x-h}" y="${v.y-h}" width="${h*2}" height="${h*2}"
          fill="transparent" class="deck-slot-hit" data-pos="${b}" style="cursor:pointer"/>`}const x=`
    <defs>
      <filter id="glow-00ff88" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glow-FFD700" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>`;r.innerHTML=`
    <!-- Badge MIL -->
    ${d.length>0?`
    <div style="position:absolute;top:6px;right:8px;z-index:10;
      background:rgba(212,160,23,0.95);color:#000;border-radius:8px;
      padding:3px 10px;font-size:11px;font-weight:900;pointer-events:none">
      MIL ${c}${y>0?` +${y}`:""} ⚡
    </div>`:""}

    <svg viewBox="0 0 ${p} ${f}" width="100%" style="display:block;max-width:380px;margin:0 auto">
      ${x}
      ${u}
    </svg>`,r.querySelectorAll(".deck-slot-hit").forEach(b=>{b.addEventListener("click",()=>Ue(b.dataset.pos,e,t,o))})}function Ue(t,e,i,o){var p,f,h;const{openModal:r,closeModal:n}=o,s=t.replace(/\d+/,""),l=e.slots[t],a=l?e.playerCards.find(m=>m.id===l):null;(p=a==null?void 0:a.player)==null||p.id;const d=new Set;Object.entries(e.slots).forEach(([m,g])=>{var x;if(m===t||!g)return;const u=e.playerCards.find(b=>b.id===g);(x=u==null?void 0:u.player)!=null&&x.id&&d.add(u.player.id)}),e.subs.forEach(m=>{var u;const g=e.playerCards.find(x=>x.id===m);(u=g==null?void 0:g.player)!=null&&u.id&&d.add(g.player.id)});const c=new Set,y=e.playerCards.filter(m=>{const g=m.player;return!(g.job===s||g.job2===s)||d.has(g.id)||c.has(g.id)?!1:(c.add(g.id),!0)});y.sort((m,g)=>{const u=s==="GK"?m.player.note_g:s==="DEF"?m.player.note_d:s==="MIL"?m.player.note_m:m.player.note_a;return(s==="GK"?g.player.note_g:s==="DEF"?g.player.note_d:s==="MIL"?g.player.note_m:g.player.note_a)-u}),r(`Choisir ${s} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${y.length>0?y.map(m=>{var v,$;const g=m.player,u=s==="GK"?g.note_g:s==="DEF"?g.note_d:s==="MIL"?g.note_m:g.note_a,x=te(g),b={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[g.rarity];return`<div class="player-option" data-card-id="${m.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${z[s]}">
            ${x?`<img src="${x}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${z[s]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${s}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${g.firstname} ${g.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${g.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${g.country_code}">
              ${(v=g.clubs)!=null&&v.logo_url?`<img src="${g.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${(($=g.clubs)==null?void 0:$.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${g.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${z[s]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${b};flex-shrink:0">
            ${u}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(f=document.getElementById("close-selector"))==null||f.addEventListener("click",n),(h=document.getElementById("remove-player"))==null||h.addEventListener("click",()=>{delete e.slots[t],n(),S(i,e,o)}),document.querySelectorAll(".player-option").forEach(m=>{m.addEventListener("click",()=>{e.slots[t]=m.dataset.cardId,n(),S(i,e,o)})})}function We(t,e,i){var a;const{openModal:o,closeModal:r}=i,n=new Set;Object.values(t.slots).filter(Boolean).forEach(d=>{var y;const c=t.playerCards.find(p=>p.id===d);(y=c==null?void 0:c.player)!=null&&y.id&&n.add(c.player.id)}),t.subs.forEach(d=>{var y;const c=t.playerCards.find(p=>p.id===d);(y=c==null?void 0:c.player)!=null&&y.id&&n.add(c.player.id)});const s=new Set,l=t.playerCards.filter(d=>{var c,y,p;return n.has((c=d.player)==null?void 0:c.id)||s.has((y=d.player)==null?void 0:y.id)?!1:(s.add((p=d.player)==null?void 0:p.id),!0)});o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${l.length>0?l.map(d=>{var f;const c=d.player,y=te(c),p=c.job==="GK"?c.note_g:c.job==="DEF"?c.note_d:c.job==="MIL"?c.note_m:c.note_a;return`<div class="player-option" data-card-id="${d.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${z[c.job]}">
            ${y?`<img src="${y}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${c.firstname} ${c.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${c.job} · ${c.country_code} · ${((f=c.clubs)==null?void 0:f.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${z[c.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${p}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(a=document.getElementById("close-sub-selector"))==null||a.addEventListener("click",r),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),r(),S(e,t,i)})})}async function Ve(t,e){const{state:i,toast:o,navigate:r}=e,n=t.formationCards.find(a=>a.formation===t.formation),s=(n==null?void 0:n.id)||t.formationCardId;await _.from("decks").update({formation:t.formation,formation_card_id:s||null}).eq("id",t.deckId),await _.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([a,d],c)=>{l.push({deck_id:t.deckId,card_id:d,position:a,is_starter:!0,slot_order:c})}),t.subs.forEach((a,d)=>{l.push({deck_id:t.deckId,card_id:a,position:`SUB${d+1}`,is_starter:!1,slot_order:100+d})}),l.length>0){const{error:a}=await _.from("deck_cards").insert(l);if(a){o(a.message,"error");return}}o("Deck enregistré ✅","success"),r("decks")}function ce(t){const e=W[t]||W["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const pe=[{id:"players_std",img:"/icons/booster-players.png",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",img:"/icons/booster-silver.png",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",img:"/icons/booster-gamechanger.png",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",img:"/icons/booster-formation.png",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],_e={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Ye(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const Je={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Xe={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function we(t,{state:e,navigate:i,toast:o}){var n;const r=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${r.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${pe.map(s=>{const l=r>=s.cost||s.cost===0,a=s.id==="players_std"||s.id==="players_pub";return`<div class="booster-card ${l?"":"disabled"}" data-booster="${s.id}" style="position:relative">
            ${a?`<button class="booster-info-btn" data-info="${s.id}"
              style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;
              background:rgba(0,0,0,0.15);border:none;cursor:pointer;font-size:11px;font-weight:700;
              color:var(--gray-600);display:flex;align-items:center;justify-content:center;z-index:2"
              onclick="event.stopPropagation()">ℹ</button>`:""}
            <div class="icon"><img src="${s.img}" alt="${s.name}" style="height:64px;width:auto;display:block;margin:0 auto"></div>
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
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(s=>{s.addEventListener("click",async()=>{const l=pe.find(a=>a.id===s.dataset.booster);if(l){s.style.opacity="0.5",s.style.pointerEvents="none";try{await Qe(l,{state:e,toast:o,navigate:i,container:t})}catch(a){o(a.message,"error"),s.style.opacity="",s.style.pointerEvents=""}}})}),t.querySelectorAll(".booster-info-btn").forEach(s=>{s.addEventListener("click",l=>{l.stopPropagation(),st()})})}async function Qe(t,{state:e,toast:i,navigate:o,container:r}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await at();let n=[];t.type==="player"?n=await tt(e.profile,t.cardCount,t.cost):t.type==="game_changer"?n=await it(e.profile,t.cardCount,t.cost):t.type==="formation"&&(n=await ot(e.profile,t.cost));const{data:s}=await _.from("users").select("*").eq("id",e.profile.id).single();s&&(e.profile=s),nt(n,t,o)}function Ze(){const t=Math.random()*100;return t<.5?"legende":t<2?"special":t<10?"normal_high":"normal_low"}function F(t){return Math.max(Number(t.note_g)||0,Number(t.note_d)||0,Number(t.note_m)||0,Number(t.note_a)||0)}function et(t,e){let i;switch(e){case"legende":i=t.filter(o=>o.rarity==="legende"),i.length||(i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte")),i.length||(i=t.filter(o=>F(o)>=6));break;case"special":i=t.filter(o=>o.rarity==="pepite"||o.rarity==="papyte"),i.length||(i=t.filter(o=>F(o)>=6));break;case"normal_high":i=t.filter(o=>o.rarity==="normal"&&F(o)>=6),i.length||(i=t.filter(o=>F(o)>=6));break;default:i=t.filter(o=>o.rarity==="normal"&&F(o)>=1&&F(o)<=5),i.length||(i=t.filter(o=>o.rarity==="normal"));break}return i.length||(i=t),i[Math.floor(Math.random()*i.length)]}async function tt(t,e,i){if(i>0){const{error:d}=await _.from("users").update({credits:t.credits-i}).eq("id",t.id);if(d)throw d}const{data:o}=await _.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const r=o.filter(d=>d.job==="GK"),n=o.filter(d=>d.job!=="GK"),s=!t.first_booster_opened&&r.length>0,l=[];for(let d=0;d<e;d++){const c=d===0&&s?r:d===0?n:o,y=Ze(),p=et(c,y);p&&l.push(p)}s&&await _.from("users").update({first_booster_opened:!0}).eq("id",t.id);const{data:a}=await _.from("cards").insert(l.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return l.map((d,c)=>({...a[c],player:d}))}async function it(t,e,i){const{error:o}=await _.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const r=Object.keys(_e),n=Array.from({length:e},()=>r[Math.floor(Math.random()*r.length)]),{data:s}=await _.from("cards").insert(n.map(l=>({owner_id:t.id,card_type:"game_changer",gc_type:l}))).select();return s}async function ot(t,e){const{error:i}=await _.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],r=o[Math.floor(Math.random()*o.length)],{data:n}=await _.from("cards").insert({owner_id:t.id,card_type:"formation",formation:r}).select();return n}function nt(t,e,i){const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
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
  `,document.body.appendChild(o);let r=!1;document.getElementById("pack-visual").addEventListener("click",()=>{if(r)return;r=!0;const p=document.getElementById("pack-visual");p.classList.add("shaking"),setTimeout(()=>{p.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none",s(0)},600)},500)});let n=0;function s(p){n=p;const f=document.getElementById("reveal-phase");f.style.display="flex",l(p)}function l(p){var $;const f=t[p],h=document.getElementById("card-counter"),m=document.getElementById("single-card-slot"),g=document.getElementById("card-tap-hint");h&&(h.textContent=`Carte ${p+1} / ${t.length}`),g&&(g.textContent=p<t.length-1?"Appuie pour continuer →":"Appuie pour voir toutes tes cartes");const u=fe(f),x=f.card_type==="player"&&(($=f.player)==null?void 0:$.rarity)==="legende";m.innerHTML=`
      <div id="current-card-wrap" class="single-card-reveal" style="cursor:pointer;${x?"filter:drop-shadow(0 0 20px #7a28b8)":""}">
        ${u}
      </div>`,x&&c();const b=document.getElementById("current-card-wrap");let v=!1;b.addEventListener("click",()=>{if(v)return;v=!0;const E=p+1;E<t.length?(b.style.transition="all 0.25s ease",b.style.transform="translateX(-120%) rotate(-15deg)",b.style.opacity="0",setTimeout(()=>l(E),250)):a()})}function a(){y(),document.getElementById("reveal-phase").style.display="none";const p=document.getElementById("recap-phase");p.style.display="flex";const f=document.getElementById("recap-grid");f.innerHTML=t.map((h,m)=>`
      <div class="recap-card" style="--i:${m};animation-delay:${m*.07}s">
        ${fe(h)}
      </div>`).join("")}let d=null;function c(){const p=document.getElementById("fireworks-canvas");if(!p)return;p.width=window.innerWidth,p.height=window.innerHeight;const f=p.getContext("2d"),h=[];function m(){const u=Math.random()*p.width,x=Math.random()*p.height*.6,b=["#7a28b8","#ff4081","#D4A017","#00e676","#fff","#e040fb","#40c4ff"],v=b[Math.floor(Math.random()*b.length)];for(let $=0;$<60;$++){const E=Math.PI*2/60*$,w=2+Math.random()*5;h.push({x:u,y:x,vx:Math.cos(E)*w,vy:Math.sin(E)*w,alpha:1,color:v,size:2+Math.random()*3})}}m(),d=setInterval(m,600);function g(){if(document.getElementById("fireworks-canvas")){f.clearRect(0,0,p.width,p.height);for(let u=h.length-1;u>=0;u--){const x=h[u];if(x.x+=x.vx,x.y+=x.vy+.08,x.vy*=.98,x.alpha-=.018,x.alpha<=0){h.splice(u,1);continue}f.globalAlpha=x.alpha,f.fillStyle=x.color,f.beginPath(),f.arc(x.x,x.y,x.size,0,Math.PI*2),f.fill()}f.globalAlpha=1,(d!==null||h.length>0)&&requestAnimationFrame(g)}}g()}function y(){d!==null&&(clearInterval(d),d=null);const p=document.getElementById("fireworks-canvas");p&&p.getContext("2d").clearRect(0,0,p.width,p.height)}document.getElementById("reveal-collection").addEventListener("click",()=>{y(),o.remove(),i("collection")}),document.getElementById("reveal-more").addEventListener("click",()=>{y(),o.remove(),i("boosters")})}function fe(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,r=o.job||"ATT",n=Je[r]||"#1A6B3C",s=Xe[o.rarity]||"#ccc",l=r==="GK"?o.note_g:r==="DEF"?o.note_d:r==="MIL"?o.note_m:o.note_a,a=Ye(o),d={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${s};overflow:hidden;display:flex;flex-direction:column">
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
        ${a?`<img src="${a}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${o.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${d}</div>
        ${(e=o.clubs)!=null&&e.logo_url?`<img src="${o.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((i=o.clubs)==null?void 0:i.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const o=_e[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${o.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${o.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function st(){const t=document.createElement("div");t.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;
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
  `,document.body.appendChild(t),t.addEventListener("click",e=>{e.target===t&&t.remove()}),document.getElementById("odds-close").addEventListener("click",()=>t.remove())}function at(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let i=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const r=document.getElementById("ad-cd");r&&(r.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}const G={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},Y={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function ke(t,e,i,o,r){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",r)}function Ie(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function ue(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,skin:e.skin,hair:e.hair,hair_length:e.hair_length,boost:0,used:!1,_line:null,_col:null}}function oe(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function rt(){const t=Math.random()*100;return t<.1?4:t<5?3:t<20?2:1}function dt(t,e){const i=G[e]||G["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},r=[...t];for(const n of["GK","DEF","MIL","ATT"]){const s=[];for(let a=0;a<i[n];a++){let d=r.findIndex(c=>c.job===n);if(d===-1&&(d=r.findIndex(c=>c.job2===n)),d===-1&&(d=0),r[d]){const c={...r[d],_line:n};s.push(c),r.splice(d,1)}}const l=oe(s.length);s.forEach((a,d)=>{a._col=l[d]}),o[n]=s}return o}async function lt(t,e){const{data:i}=await _.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length").eq("is_active",!0).limit(60);if(!i||i.length<11)return ct(t);const o=G[t]||G["4-4-2"],r={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const s of["GK","DEF","MIL","ATT"]){const l=n.filter(p=>p.job===s),a=n.filter(p=>p.job!==s),d=[...l,...a],c=[];for(let p=0;p<o[s];p++){const f=d[p]||n[p];f&&c.push({cardId:"ai-"+f.id+"-"+p,id:f.id,firstname:f.firstname,name:f.surname_encoded,country_code:f.country_code,club_id:f.club_id,job:f.job,job2:f.job2,note_g:Number(f.note_g)||0,note_d:Number(f.note_d)||0,note_m:Number(f.note_m)||0,note_a:Number(f.note_a)||0,rarity:f.rarity,skin:f.skin,hair:f.hair,hair_length:f.hair_length,boost:0,used:!1,_line:s})}const y=oe(c.length);c.forEach((p,f)=>{p._col=y[f]}),r[s]=c}return r}function ct(t){const e=G[t]||G["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let r=0;for(const n of["GK","DEF","MIL","ATT"]){const s=[];for(let a=0;a<e[n];a++){const d=3+Math.floor(Math.random()*5);s.push({cardId:"fake-"+r,id:"fake-"+r,firstname:"IA",name:o[r%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?d:2,note_d:n==="DEF"?d:2,note_m:n==="MIL"?d:2,note_a:n==="ATT"?d:2,rarity:"normal",boost:0,used:!1,_line:n}),r++}const l=oe(s.length);s.forEach((a,d)=>{a._col=l[d]}),i[n]=s}return i}async function Le(t,e){var v;const{state:i,navigate:o,toast:r}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const s=n.matchMode||"vs_ai_easy",l=s.replace("vs_ai_",""),a=s;if(!n.deckId)return pt(t,e,s);const d=n.deckId,{data:c}=await _.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
          clubs(encoded_name,logo_url)))`).eq("deck_id",d).order("slot_order"),y=(c||[]).filter($=>{var E;return $.is_starter&&((E=$.card)==null?void 0:E.player)}).map($=>ue($.card)),p=(c||[]).filter($=>{var E;return!$.is_starter&&((E=$.card)==null?void 0:E.player)}).map($=>ue($.card));if(y.length<11){ke(t,"⚠️",`Deck incomplet (${y.length}/11).`,"Compléter",()=>o("decks"));return}const f=(c||[]).find($=>{var E;return((E=$.card)==null?void 0:E.card_type)==="formation"}),h=((v=f==null?void 0:f.card)==null?void 0:v.formation)||"4-4-2",{data:m}=await _.from("cards").select("id,gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),g=dt(y,h),u=await lt(h),{data:x}=await _.from("matches").insert({home_id:i.profile.id,away_id:null,mode:a,home_deck_id:d,status:"in_progress"}).select().single(),b={matchId:x==null?void 0:x.id,mode:a,difficulty:l,formation:h,homeTeam:g,aiTeam:u,homeSubs:p,subsUsed:0,maxSubs:Math.min(p.length,3),homeScore:0,aiScore:0,gcCards:m||[],usedGc:[],boostCard:null,boostUsed:!1,phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},clubName:i.profile.club_name||"Vous"};ft(t,b,e)}async function pt(t,e,i){var s;const{state:o,navigate:r}=e,{data:n}=await _.from("decks").select("id,name,is_active,formation_card_id").eq("owner_id",o.profile.id).order("created_at",{ascending:!1});if(!n||n.length===0){ke(t,"📋","Aucun deck. Crée un deck avant de jouer !","Créer un deck",()=>r("decks"));return}t.innerHTML=`
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
  </div>`,t.querySelectorAll(".deck-select-card").forEach(l=>{l.addEventListener("mouseenter",()=>l.style.background="rgba(255,255,255,0.14)"),l.addEventListener("mouseleave",()=>l.style.background="rgba(255,255,255,0.08)"),l.addEventListener("click",()=>{e.navigate("match",{matchMode:i,deckId:l.dataset.deckId})})}),(s=document.getElementById("cancel-deck-select"))==null||s.addEventListener("click",()=>r("home"))}function ft(t,e,i){const o=e.homeTeam.MIL||[],r=e.aiTeam.MIL||[];function n(y){return y.reduce((p,f)=>p+C(f,"MIL"),0)}function s(y){let p=0;for(let f=0;f<y.length-1;f++)N(y[f],y[f+1])!=="#333"&&p++;return p}const l=n(o)+s(o),a=n(r)+s(r),d=l>=a;function c(y,p,f){return`<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px">${p}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${y.map((h,m)=>{const g=Ie(h),u=m<y.length-1?N(h,y[m+1]):null;return`
          <div style="width:52px;height:52px;border-radius:8px;background:${f};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${g?`<img src="${g}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:""}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000">${C(h,"MIL")}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${h.name}</div>
          </div>
          ${u?`<div style="width:12px;height:4px;border-radius:2px;background:${u};flex-shrink:0;opacity:${u==="#333"?.3:.9}"></div>`:""}
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
      <div id="score-ai" style="font-size:42px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.5s">${a}</div>
    </div>

    ${c(r,"IA","#bb2020")}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff">
      <div style="font-size:18px;font-weight:900"></div>
    </div>
  </div>`,setTimeout(()=>{const y=document.getElementById("score-home"),p=document.getElementById("score-ai"),f=document.getElementById("midfield-result");if(y&&p&&(d?(y.style.fontSize="72px",y.style.color="#fff",p.style.opacity="0.3"):(p.style.fontSize="72px",p.style.color="#fff",y.style.opacity="0.3")),f){const h=rt();f.style.opacity="1";const m=d?e.clubName:"IA";f.innerHTML=`
        <div style="font-size:18px;font-weight:900;margin-bottom:8px">
          ⚽ ${m} remporte le milieu !
        </div>
        ${d?`
        <div style="background:rgba(135,206,235,0.2);border:2px solid #87CEEB;border-radius:12px;padding:12px 20px;margin-top:8px;display:inline-block">
          <div style="font-size:11px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:28px;font-weight:900;color:#87CEEB">+${h}</div>
          <div style="font-size:11px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>`:""}
      `,d&&(e.boostCard={value:h})}e.attacker=d?"home":"ai",e.log.push({text:`Duel milieu : ${e.clubName} ${l} – ${a} IA → ${d?e.clubName:"IA"} attaque en premier`,type:"info"}),setTimeout(()=>{e.phase=e.attacker==="home"?"attack":"ai-attack",D(t,e,i),e.attacker==="ai"&&setTimeout(()=>J(t,e,i),1e3)},2800)},1200)}function Ae(t,e,i,o,r=310,n=310){const s=Ee[e]||{},l=$e[e]||[],a=26,d={},c=["ATT","MIL","DEF","GK"];for(const h of c)(t[h]||[]).forEach((g,u)=>{d[`${h}${u+1}`]=g});function y(h){const m=s[h];return m?{x:m.x*r,y:m.y*n}:null}let p="";for(const[h,m]of l){const g=y(h),u=y(m);if(!g||!u)continue;const x=d[h],b=d[m],v=N(x,b),$=v==="#ff3333"?.25:.9,E=v!=="#ff3333"?`filter="url(#glow${v.replace("#","").slice(0,6)})"`:"";p+=`<line x1="${g.x.toFixed(1)}" y1="${g.y.toFixed(1)}" x2="${u.x.toFixed(1)}" y2="${u.y.toFixed(1)}"
      stroke="${v}" stroke-width="3.5" stroke-linecap="round" opacity="${$}" ${E}/>`}for(const[h,m]of Object.entries(d)){const g=y(h);if(!g)continue;const u=h.replace(/[0-9]/g,""),b={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[u]||"#555",v=i==="attack"&&["MIL","ATT"].includes(u)&&!m.used||i==="defense"&&["GK","DEF","MIL"].includes(u)&&!m.used,$=o.includes(m.cardId);let E;i==="attack"?E=u==="MIL"?Number(m.note_m)||0:Number(m.note_a)||0:i==="defense"?E=u==="GK"?Number(m.note_g)||0:u==="MIL"?Number(m.note_m)||0:Number(m.note_d)||0:E=Number(u==="GK"?m.note_g:u==="DEF"?m.note_d:u==="MIL"?m.note_m:m.note_a)||0,E=E+(m.boost||0);const w=$?"#FFD700":v?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)",A=$?3:2,L=m.used?.25:1,I=Ie(m);I&&(p+=`<defs><clipPath id="mc-${h}"><circle cx="${g.x}" cy="${g.y}" r="${a}"/></clipPath></defs>`),p+=`<circle cx="${g.x}" cy="${g.y}" r="${a}" fill="${b}" opacity="${L}"
      stroke="${w}" stroke-width="${A}"/>`,I&&!m.used&&(p+=`<image href="${I}" x="${g.x-a}" y="${g.y-a}" width="${a*2}" height="${a*2}"
        clip-path="url(#mc-${h})" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>`,p+=`<circle cx="${g.x}" cy="${g.y}" r="${a}" fill="${b}" opacity="0.35"
        stroke="${w}" stroke-width="${A}"/>`),m.boost&&(p+=`<rect x="${g.x+a-10}" y="${g.y-a}" width="14" height="10" rx="3" fill="#87CEEB"/>
        <text x="${g.x+a-3}" y="${g.y-a+8}" text-anchor="middle" font-size="7" fill="#000" font-weight="900">+${m.boost}</text>`),p+=`<text x="${g.x}" y="${g.y-1}" text-anchor="middle" font-size="12" font-weight="900"
      fill="${m.used?"#555":"white"}" font-family="Arial Black,Arial">${m.used?"–":E}</text>
    <text x="${g.x}" y="${g.y+11}" text-anchor="middle" font-size="6" fill="rgba(255,255,255,${m.used?.3:.8})"
      font-family="Arial">${(m.name||"").slice(0,8)}</text>`,v&&(p+=`<circle cx="${g.x}" cy="${g.y}" r="${a}" fill="rgba(255,255,255,0.08)"
        class="match-slot-hit ${$?"selected":""}" data-card-id="${m.cardId}" data-role="${u}"
        style="cursor:pointer"/>`)}return`<svg viewBox="0 0 ${r} ${n}" width="100%" style="display:block;max-width:360px;margin:0 auto">
    <defs>
    <filter id="glow00ff88"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="glowFFD700"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>${p}
  </svg>`}function ut(t,e,i,o){return`<div id="match-terrain-wrap" style="position:relative;padding:0 4px">
    ${Ae(t,e,i,o)}
  </div>`}function D(t,e,i){var d,c,y,p;const o={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"",r=e.selected.map(f=>f.cardId),n=e.usedSubIds||[],s=e.homeSubs.filter(f=>!n.includes(f.cardId)),l=Object.values(e.homeTeam).flat().filter(f=>f.used);t.innerHTML=`
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
      ${ut(e.homeTeam,e.formation,e.phase,r)}
    </div>

    <!-- Barre d'outils : GC + Boost + Remplacements -->
    <div style="padding:6px 12px;display:flex;gap:6px;overflow-x:auto;align-items:center;background:rgba(0,0,0,0.2)">

      <!-- Game Changers -->
      ${e.gcCards.filter(f=>!e.usedGc.includes(f.id)).map(f=>{var h;return`
        <div class="gc-mini" data-gc-id="${f.id}" data-gc-type="${f.gc_type}"
          style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">${((h=Q[f.gc_type])==null?void 0:h.icon)||"⚡"}</div>
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
      ${e.log.slice(-6).map(f=>`<div class="log-entry ${f.type==="goal"?"log-goal":""}">${f.text}</div>`).join("")}
    </div>
  </div>`,(d=document.getElementById("match-quit"))==null||d.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(c=document.getElementById("view-ai"))==null||c.addEventListener("click",()=>Et(e,i)),yt(t,e,i),t.querySelectorAll(".match-slot-hit").forEach(f=>{f.addEventListener("click",()=>gt(f,e,t,i))}),t.querySelectorAll(".gc-mini").forEach(f=>{f.addEventListener("click",()=>$t(f.dataset.gcId,f.dataset.gcType,t,e,i))}),(y=document.getElementById("boost-card"))==null||y.addEventListener("click",()=>{ht(t,e,i)}),(p=document.getElementById("sub-btn"))==null||p.addEventListener("click",()=>{bt(t,e,i)});const a=document.getElementById("match-log");a&&(a.scrollTop=a.scrollHeight)}function yt(t,e,i){var r,n,s,l;const o=document.getElementById("match-actions");if(o)if(e.phase==="attack"){const a=e.selected.length>0?Z(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${a?`ATT : <b style="color:var(--yellow);font-size:20px">${a.total}</b>
             <span style="font-size:11px;opacity:.7">(${a.base}${a.links?` +${a.links} liens`:""}${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.5">Sélectionne 1–3 milieux/attaquants</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${a?"":"disabled"}>Attaquer →</button>`,(r=document.getElementById("confirm-attack"))==null||r.addEventListener("click",()=>mt(t,e,i))}else if(e.phase==="defense"){const a=e.selected.length>0?ee(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;opacity:.6;margin-bottom:2px">L'IA attaque avec <b style="color:#ff6b6b">${((n=e.pendingAttack)==null?void 0:n.total)||0}</b></div>
        ${a?`DEF : <b style="color:var(--yellow);font-size:20px">${a.total}</b>`:'<span style="opacity:.5">Sélectionne 1–3 défenseurs/GK</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${a?"":"disabled"}>Défendre →</button>`,(s=document.getElementById("confirm-defense"))==null||s.addEventListener("click",()=>vt(t,e,i))}else e.phase==="finished"?(o.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(l=document.getElementById("end-match"))==null||l.addEventListener("click",()=>i.navigate("home"))):o.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.4);padding:8px;font-size:12px">⏳ Tour de l'IA...</div>`}function gt(t,e,i,o){const r=t.dataset.cardId,n=t.dataset.role,s=e.selected.findIndex(l=>l.cardId===r);if(s!==-1)e.selected.splice(s,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const l=(e.homeTeam[n]||[]).find(a=>a.cardId===r);l&&e.selected.push({...l,_role:n,_line:n})}D(i,e,o)}function mt(t,e,i){const o=e.selected.map(n=>({...n,_line:n._role})),r=Z(o,e.modifiers.home);e.pendingAttack={...r,players:[...e.selected],side:"home"},e.selected.forEach(n=>{const s=(e.homeTeam[n._role]||[]).find(l=>l.cardId===n.cardId);s&&(s.used=!0)}),e.log.push({text:`Vous attaquez : ${r.total} (${e.selected.map(n=>n.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",D(t,e,i),setTimeout(()=>xt(t,e,i),1200)}function vt(t,e,i){const o=e.selected.map(s=>({...s,_line:s._role})),r=ee(o,e.modifiers.home);e.selected.forEach(s=>{const l=(e.homeTeam[s._role]||[]).find(a=>a.cardId===s.cardId);l&&(l.used=!0)});const n=ge(e.pendingAttack.total,r.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${r.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${r.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,Te(t,e,i,"home-attack")}function J(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],r=me(o,"attack",e.difficulty);if(!r.length){Ce(t,e,i);return}const n=Z(r,e.modifiers.ai);e.pendingAttack={...n,players:r,side:"ai"},r.forEach(s=>{s.used=!0}),e.log.push({text:`IA attaque : ${n.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",D(t,e,i)}function xt(t,e,i){const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],r=me(o,"defense",e.difficulty),n=r.length>0?ee(r,e.modifiers.ai).total:0;r.forEach(l=>{l.used=!0});const s=ge(e.pendingAttack.total,n,e.modifiers.ai);s.shielded?e.log.push({text:"🛡️ Bouclier IA !",type:"info"}):s.goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! (${e.pendingAttack.total} > ${n})`,type:"goal"})):e.log.push({text:`🧤 IA défend (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,Te(t,e,i,"ai-attack")}function Te(t,e,i,o){if(e.round++,Me(e)){X(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(s=>!s.used).length){X(t,e,i);return}e.phase="ai-attack",D(t,e,i),setTimeout(()=>J(t,e,i),800);return}e.phase="attack",D(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){Ce(t,e,i);return}e.phase="ai-attack",D(t,e,i),setTimeout(()=>J(t,e,i),800)}}function Me(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(r=>!r.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(r=>!r.used));return!e&&!i}function Ce(t,e,i){Me(e)?X(t,e,i):(e.phase="attack",D(t,e,i))}function ht(t,e,i){const o=Object.values(e.homeTeam).flat().filter(r=>!r.used);if(!o.length){i.toast("Aucun joueur actif à booster","error");return}i.openModal("⚡ Utiliser le Boost",`<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${e.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${o.map(r=>`
        <div class="player-boost-opt" data-card-id="${r.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${Y[r.job]||"#888"};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${C(r,r._line||r.job)}</div>
          <div style="flex:1"><b>${r.firstname} ${r.name}</b><div style="font-size:11px;color:#888">${r._line||r.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${e.boostCard.value}</div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`),document.querySelectorAll(".player-boost-opt").forEach(r=>{r.addEventListener("click",()=>{const n=r.dataset.cardId;for(const s of["GK","DEF","MIL","ATT"]){const l=(e.homeTeam[s]||[]).find(a=>a.cardId===n);if(l){l.boost=(l.boost||0)+e.boostCard.value,e.log.push({text:`⚡ Boost +${e.boostCard.value} appliqué à ${l.name}`,type:"info"});break}}e.boostUsed=!0,i.closeModal(),D(t,e,i)})})}function bt(t,e,i){e.usedSubIds||(e.usedSubIds=[]);const o=Object.values(e.homeTeam).flat().filter(a=>a.used),r=e.homeSubs.filter(a=>!e.usedSubIds.includes(a.cardId));if(!o.length){i.toast("Aucun joueur grisé","info");return}if(!r.length){i.toast("Aucun remplaçant disponible","info");return}if(e.subsUsed>=e.maxSubs){i.toast(`Maximum ${e.maxSubs} remplacements`,"error");return}i.openModal("🔄 Remplacement",`<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${o.map(a=>`
        <div class="grayed-opt" data-card-id="${a.cardId}" data-role="${a._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${Y[a.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${a._line}</div>
          <div><b>${a.firstname} ${a.name}</b></div>
        </div>`).join("")}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${r.map(a=>`
        <div class="sub-opt" data-card-id="${a.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid var(--green);border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${Y[a.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${a.job}</div>
          <div><b>${a.firstname} ${a.name}</b></div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`);let n=null,s=null;document.querySelectorAll(".grayed-opt").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".grayed-opt").forEach(d=>d.style.borderColor="#eee"),a.style.borderColor="#c0392b",n={cardId:a.dataset.cardId,role:a.dataset.role},l()})}),document.querySelectorAll(".sub-opt").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".sub-opt").forEach(d=>d.style.borderColor="var(--green)"),a.style.borderColor="#D4A017",s=a.dataset.cardId,l()})});function l(){if(!n||!s)return;const a=n.role,d=e.homeTeam[a]||[],c=d.findIndex(p=>p.cardId===n.cardId),y=e.homeSubs.find(p=>p.cardId===s);c!==-1&&y&&(y._line=a,y._col=d[c]._col,y.used=!1,d.splice(c,1,y),e.usedSubIds=[...e.usedSubIds||[],s],e.subsUsed++,e.log.push({text:`🔄 Remplacement : ${y.firstname} ${y.name} entre`,type:"info"})),i.closeModal(),D(t,e,i)}}function $t(t,e,i,o,r){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier !",type:"info"});break;case"Ressusciter":{let n=!1;for(const s of["ATT","MIL","DEF","GK"]){const l=(o.homeTeam[s]||[]).find(a=>a.used);if(l){l.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(s=>!s.used);if(n.length){const s=n.sort((l,a)=>C(a,"ATT")-C(l,"ATT"))[0];s.used=!0,o.log.push({text:`❄️ ${s.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement",type:"info"});break}_.from("cards").delete().eq("id",t).then(()=>{}),D(i,o,r)}}async function X(t,e,i){var c,y;e.phase="finished";const{state:o}=i,r=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,s=r?"victoire":n?"nul":"defaite",l=Ge(e.mode,s);e.matchId&&await _.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:r?o.profile.id:null,home_credits_reward:l,played_at:new Date().toISOString()}).eq("id",e.matchId);const a={credits:(o.profile.credits||0)+l,matches_played:(o.profile.matches_played||0)+1};r?a.wins=(o.profile.wins||0)+1:n?a.draws=(o.profile.draws||0)+1:a.losses=(o.profile.losses||0)+1,await _.from("users").update(a).eq("id",o.profile.id),await i.refreshProfile();const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",d.innerHTML=`
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${r?"🏆":n?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${r?"Victoire !":n?"Match nul":"Défaite"}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${e.homeScore} – ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${l.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`,document.body.appendChild(d),(c=document.getElementById("res-home"))==null||c.addEventListener("click",()=>{d.remove(),i.navigate("home")}),(y=document.getElementById("res-replay"))==null||y.addEventListener("click",()=>{d.remove(),i.navigate("match",{matchMode:e.mode})})}function Et(t,e){e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${Ae(t.aiTeam,t.formation,null,[],300,300)}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const _t={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function De(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await ne(t,e)}async function ne(t,e){const{state:i,toast:o}=e,{data:r}=await _.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),n=(r||[]).filter(a=>a.seller_id===i.profile.id),s=(r||[]).filter(a=>a.seller_id!==i.profile.id);t.innerHTML=`
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
  `;function l(a){const d=document.getElementById("mkt-content"),c=a==="buy"?s:n;if(c.length===0){d.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${a==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}d.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(y=>{var g,u,x;const p=(g=y.card)==null?void 0:g.player;if(!p)return"";const f=p.job==="GK"?p.note_g:p.job==="DEF"?p.note_d:p.job==="MIL"?p.note_m:p.note_a,h=_t[p.rarity],m=(i.profile.credits||0)>=y.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${It(p.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${h};flex-shrink:0">${f}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${p.firstname} ${p.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${p.country_code} · ${((u=p.clubs)==null?void 0:u.encoded_name)||"—"} · ${p.rarity} · ${p.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((x=y.seller)==null?void 0:x.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${y.price.toLocaleString("fr")}</div>
            ${a==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${y.id}" ${m?"":"disabled"} style="margin-top:4px">${m?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${y.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,d.querySelectorAll("[data-buy]").forEach(y=>{y.addEventListener("click",()=>wt(y.dataset.buy,c,t,e))}),d.querySelectorAll("[data-cancel]").forEach(y=>{y.addEventListener("click",()=>kt(y.dataset.cancel,t,e))})}l("buy"),t.querySelectorAll(".mkt-tab").forEach(a=>{a.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(d=>{const c=d===a;d.style.background=c?"var(--green)":"#fff",d.style.color=c?"#fff":"var(--gray-600)",d.style.borderColor=c?"var(--green)":"var(--gray-200)"}),l(a.dataset.tab)})})}async function wt(t,e,i,o){const{state:r,toast:n,refreshProfile:s}=o,l=e.find(a=>a.id===t);if(l){if((r.profile.credits||0)<l.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${l.card.player.firstname} ${l.card.player.surname_encoded} pour ${l.price.toLocaleString("fr")} crédits ?`))try{const{error:a}=await _.from("cards").update({owner_id:r.profile.id,is_for_sale:!1,sale_price:null}).eq("id",l.card.id);if(a)throw a;await _.from("market_listings").update({status:"sold",buyer_id:r.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await _.from("users").update({credits:(r.profile.credits||0)-l.price}).eq("id",r.profile.id);const{data:d}=await _.from("users").select("credits").eq("id",l.seller_id).single();d&&await _.from("users").update({credits:(d.credits||0)+l.price}).eq("id",l.seller_id),await _.from("notifications").insert({user_id:l.seller_id,type:"card_sold",message:`Ta carte ${l.card.player.surname_encoded} a été vendue pour ${l.price} crédits !`,data:{card_id:l.card.id,price:l.price}}),await s(),n("Carte achetée ! ✅","success"),ne(i,o)}catch(a){n("Erreur : "+a.message,"error")}}}async function kt(t,e,i){const{toast:o}=i,{data:r}=await _.from("market_listings").select("card_id").eq("id",t).single();await _.from("market_listings").update({status:"cancelled"}).eq("id",t),r&&await _.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",r.card_id),o("Annonce retirée","success"),ne(e,i)}function It(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function Be(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:r}=await _.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${r&&r.length>0?r.map((n,s)=>`
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
  `}const k={user:null,profile:null,page:"home",params:{}};function R(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function je(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function O(){document.getElementById("modal-overlay").classList.add("hidden")}function B(t,e={}){k.page=t,k.params=e,Lt()}async function P(){if(!k.user)return;const{data:t}=await _.from("users").select("*").eq("id",k.user.id).single();t&&(k.profile=t)}async function Lt(){const t=document.getElementById("app");document.querySelector(".bottom-nav")&&document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===k.page)});const e=document.getElementById("nav-credits");e&&k.profile&&(e.textContent=`💰 ${(k.profile.credits||0).toLocaleString("fr")}`);const i={state:k,navigate:B,toast:R,openModal:je,closeModal:O,refreshProfile:P};switch(k.page){case"home":await K(t,i);break;case"collection":await be(t,i);break;case"decks":await ie(t,i);break;case"boosters":await we(t,i);break;case"match":await Le(t,i);break;case"market":await De(t,i);break;case"rankings":await Be(t,i);break;default:await K(t,i)}}function At(){const t=document.getElementById("app"),e=k.profile;if(!e)return;const i=(e.club_name||"MW").split(" ").filter(Boolean);i.length>=2?(i[0][0]+i[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
    <nav class="top-nav">
      <div class="logo" id="nav-logo" style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <img src="/manager-wars/icons/logo.png" alt="Manager Wars" style="height:36px;width:auto;display:block">
        <span style="font-weight:900;font-size:17px;letter-spacing:0.5px;color:var(--green)">Manager Wars</span>
      </div>
      <div id="nav-credits" class="credits">💰 ${(e.credits||0).toLocaleString("fr")}</div>
    </nav>

    <main id="page-content" class="page"></main>

    <nav class="bottom-nav">
      <a href="#" data-page="home" class="active">
        <span class="icon"><img src="/manager-wars/icons/nav-home.png" alt="Accueil" style="height:26px;width:auto;display:block"></span>
        <span>Accueil</span>
      </a>
      <a href="#" data-page="collection">
        <span class="icon"><img src="/manager-wars/icons/nav-collection.png" alt="Cartes" style="height:26px;width:auto;display:block"></span>
        <span>Cartes</span>
      </a>
      <a href="#" data-page="decks">
        <span class="icon"><img src="/manager-wars/icons/nav-decks.png" alt="Decks" style="height:26px;width:auto;display:block"></span>
        <span>Decks</span>
      </a>
      <a href="#" data-page="boosters">
        <span class="icon"><img src="/manager-wars/icons/nav-boosters.png" alt="Boosters" style="height:26px;width:auto;display:block"></span>
        <span>Boosters</span>
      </a>
      <a href="#" data-page="market">
        <span class="icon"><img src="/manager-wars/icons/nav-market.png" alt="Marché" style="height:26px;width:auto;display:block"></span>
        <span>Marché</span>
      </a>
    </nav>
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),B(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>B("home")),document.getElementById("nav-credits").addEventListener("click",()=>B("boosters"))}async function Tt(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&O()}),document.getElementById("modal-close").addEventListener("click",O);const{data:{session:t}}=await _.auth.getSession();if(!t){q(),se(document.getElementById("app"),{navigate:B,toast:R});return}if(k.user=t.user,await P(),q(),!k.profile){Fe(document.getElementById("app"),{state:k,navigate:B,toast:R,refreshProfile:P});return}document.getElementById("app").style.display="flex",document.getElementById("app").style.flexDirection="column",At(),window._render=async function(){const e=document.getElementById("page-content");if(!e)return;document.querySelectorAll(".bottom-nav a").forEach(r=>{r.classList.toggle("active",r.dataset.page===k.page)});const i=document.getElementById("nav-credits");i&&k.profile&&(i.textContent=`💰 ${(k.profile.credits||0).toLocaleString("fr")}`);const o={state:k,navigate:B,toast:R,openModal:je,closeModal:O,refreshProfile:P};switch(k.page){case"home":await K(e,o);break;case"collection":await be(e,o);break;case"decks":await ie(e,o);break;case"boosters":await we(e,o);break;case"match":await Le(e,o);break;case"market":await De(e,o);break;case"rankings":await Be(e,o);break;default:await K(e,o)}},globalThis.mwNavigate=function(e,i={}){k.page=e,k.params=i,window._render()},window._render(),_.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(k.user=null,k.profile=null,document.getElementById("app").innerHTML="",q(),se(document.getElementById("app"),{navigate:B,toast:R}),q())})}function q(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}Tt();
