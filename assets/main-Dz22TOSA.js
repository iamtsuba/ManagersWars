import{s as g}from"./supabase-z_u0vv5N.js";function Z(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById("tab-login").style.display=o.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=o.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const o=document.getElementById("login-email").value.trim(),a=document.getElementById("login-password").value,n=document.getElementById("login-error");if(n.textContent="",!o||!a){n.textContent="Remplissez tous les champs.";return}const s=document.getElementById("login-btn");s.textContent="Connexion…",s.disabled=!0;const{error:l}=await g.auth.signInWithPassword({email:o,password:a});if(s.textContent="Se connecter",s.disabled=!1,l){n.textContent=l.message.includes("Invalid")?"Email ou mot de passe incorrect.":l.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",o=>{o.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const o=document.getElementById("reg-email").value.trim(),a=document.getElementById("reg-password").value,n=document.getElementById("reg-confirm").value,s=document.getElementById("reg-error");if(s.textContent="",!o||!a||!n){s.textContent="Remplissez tous les champs.";return}if(a.length<6){s.textContent="Mot de passe trop court (min. 6 caractères).";return}if(a!==n){s.textContent="Les mots de passe ne correspondent pas.";return}const l=document.getElementById("reg-btn");l.textContent="Création…",l.disabled=!0;const{error:d}=await g.auth.signUp({email:o,password:a});if(l.textContent="Créer mon compte",l.disabled=!1,d){s.textContent=d.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=o})}function Ie(t,{state:e,navigate:i,toast:o,refreshProfile:a}){let n="#1A6B3C",s="#D4A017";t.innerHTML=`
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
  `;function l(){var k;const c=document.getElementById("logo-preview"),r=document.getElementById("logo-initials"),p=((k=document.getElementById("setup-club"))==null?void 0:k.value)||"MW",f=p.trim().split(" ").filter(Boolean),y=f.length>=2?(f[0][0]+f[1][0]).toUpperCase():p.slice(0,2).toUpperCase();c&&(c.style.background=s,c.style.borderColor=n),r&&(r.textContent=y,r.style.color=n)}document.getElementById("color1").addEventListener("input",c=>{n=c.target.value,document.getElementById("swatch1").style.background=n,l()}),document.getElementById("color2").addEventListener("input",c=>{s=c.target.value,document.getElementById("swatch2").style.background=s,l()});function d(c){document.querySelectorAll(".setup-step").forEach(r=>r.classList.remove("active")),document.getElementById(`step-${c}`).classList.add("active"),document.getElementById("step-num").textContent=c,document.getElementById("progress-fill").style.width=`${Math.round(c/3*100)}%`,c===3&&l()}document.getElementById("step1-next").addEventListener("click",async()=>{const c=document.getElementById("setup-pseudo").value.trim(),r=document.getElementById("step1-error");if(r.textContent="",c.length<3){r.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:p}=await g.from("users").select("id").eq("pseudo",c).maybeSingle();if(p){r.textContent="Ce pseudo est déjà pris.";return}d(2)}),document.getElementById("step2-back").addEventListener("click",()=>d(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const c=document.getElementById("setup-club").value.trim(),r=document.getElementById("step2-error");if(r.textContent="",c.length<2){r.textContent="Nom trop court (min. 2 caractères).";return}const{data:p}=await g.from("users").select("id").eq("club_name",c).maybeSingle();if(p){r.textContent="Ce nom de club est déjà pris.";return}d(3)}),document.getElementById("step3-back").addEventListener("click",()=>d(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const c=document.getElementById("setup-pseudo").value.trim(),r=document.getElementById("setup-club").value.trim(),p=document.getElementById("step3-error"),f=document.getElementById("step3-finish");p.textContent="",f.disabled=!0,f.textContent="Création en cours…";try{const{error:y}=await g.from("users").insert({id:e.user.id,pseudo:c,club_name:r,club_color1:n,club_color2:s,credits:1e4});if(y)throw y;await Le(e.user.id),await a(),o(`Bienvenue ${c} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(y){p.textContent=y.message,f.disabled=!1,f.textContent="🚀 Créer mon profil !"}})}async function Le(t){const{data:e}=await g.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,o=i.filter(d=>d.job==="GK"),a=i.filter(d=>d.job!=="GK"),n=[];for(let d=0;d<5;d++){let c=[];if(d===0&&o.length>0){const r=o[Math.floor(Math.random()*o.length)];c.push(r);const p=ee([...a]).slice(0,3);c.push(...p)}else c=ee([...i]).slice(0,4);c.forEach(r=>{n.push({owner_id:t,player_id:r.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(d=>{n.push({owner_id:t,card_type:"game_changer",gc_type:d})});const l=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:l[Math.floor(Math.random()*l.length)]}),n.length>0&&await g.from("cards").insert(n),await g.from("users").update({first_booster_opened:!0}).eq("id",t)}function ee(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function te(t,{state:e,navigate:i,toast:o}){const a=e.profile;if(!a)return;const{data:n}=await g.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${a.id},away_id.eq.${a.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),s=(a.club_name||"MW").split(" ").filter(Boolean),l=s.length>=2?(s[0][0]+s[1][0]).toUpperCase():(a.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
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
          ${n.map(d=>{const c=d.winner_id===a.id,r=d.home_score===d.away_score,p=r?"N":c?"V":"D",f=r?"#888":c?"#1A6B3C":"#c0392b",y={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[d.mode]||d.mode,h=new Date(d.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${y}</div>
                <div style="font-size:11px;color:var(--gray-600)">${h}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${d.home_score} - ${d.away_score}</span>
                <span style="background:${f};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${p}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(d=>{d.addEventListener("click",c=>{c.preventDefault(),i(d.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(d=>{d.addEventListener("click",()=>{const c=d.dataset.action;if(c==="championship"){o("Championnats — bientôt disponibles","info");return}if(c==="match-random"){o("Matchmaking aléatoire — bientôt disponible","info");return}if(c==="match-friend"){o("Défi ami — bientôt disponible","info");return}c==="match-ai"&&Ce(i)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await g.auth.signOut(),window.location.reload()})}function Ce(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
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
  `,document.body.appendChild(i);const o=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()}),i.querySelectorAll("[data-mode]").forEach(a=>{a.addEventListener("click",()=>{o(),t("match",{matchMode:a.dataset.mode})})})}const V={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Me(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function T(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const ie=["ATT","MIL","DEF","GK"];function W(t){let e=0;const i=t.length;for(let o=0;o<i;o++)for(let a=o+1;a<i;a++){const n=t[o],s=t[a];if(!n||!s)continue;const l=n._col!==void 0&&s._col!==void 0&&n._col===s._col,d=n._col!==void 0&&s._col!==void 0&&Math.abs(n._col-s._col)===1,c=ie.indexOf(n._line),r=ie.indexOf(s._line),p=Math.abs(c-r)===1;(n._line===s._line&&d||l&&p)&&(n.country_code&&s.country_code&&n.country_code===s.country_code&&e++,n.club_id&&s.club_id&&n.club_id===s.club_id&&e++)}return e}function Y(t,e={}){const i=t.reduce((n,s)=>n+T(s,"ATT"),0),o=W(t);let a=i+o;return e.doubleAttack&&(a*=2),e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function J(t,e={}){const i=t.reduce((n,s)=>n+(s._line==="GK"||s.job==="GK"?T(s,"GK"):T(s,"DEF")),0),o=W(t);let a=i+o;return e.stolenNote&&(a-=e.stolenNote),{base:i,links:o,total:Math.max(0,a)}}function oe(t){const e=t.reduce((o,a)=>o+T(a,"MIL"),0),i=W(t);return e+i}function fe(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function me(t,e,i="easy"){const o=t.filter(s=>!s.used);if(!o.length)return[];const a=[...o].sort((s,l)=>{const d=e==="attack"?T(s,"ATT"):s._line==="GK"?T(s,"GK"):T(s,"DEF");return(e==="attack"?T(l,"ATT"):l._line==="GK"?T(l,"GK"):T(l,"DEF"))-d});let n=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return a.slice(0,Math.min(n,a.length,3))}function je(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const ve={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},F={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},ne=["GK","DEF","MIL","ATT"],Be=["Tous","GK","DEF","MIL","ATT"],ze={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},ye={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function ge(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function N(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function Se(t,e=""){var p,f;const i=t.player;if(!i)return"";const o=i.job||"ATT",a=F[o],n=ve[i.rarity]||"#ccc",s=N(i,o),l=i.job2?N(i,i.job2):null,d=i.job2?F[i.job2]:null,c=ge(i),r=ye[i.country_code]||i.country_code||"";return`
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
            fill="${d}" stroke="white" stroke-width="1.5"/>
          <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900"
            fill="white" font-family="Arial Black,Arial">${l}</text>
        </svg>`:""}
      </div>
      <!-- Portrait -->
      <div style="height:106px;overflow:hidden;background:#b8d4f0;position:relative">
        ${c?`<img src="${c}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
               onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:26px;gap:4px">
        <img src="https://flagsapi.com/${i.country_code}/flat/32.png"
          style="width:20px;height:14px;border-radius:2px;object-fit:cover;flex-shrink:0"
          onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:#555;flex:1;text-align:center">${r}</div>
        ${(p=i.clubs)!=null&&p.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((f=i.clubs)==null?void 0:f.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}async function De(t,e){const{state:i,navigate:o,toast:a,openModal:n,closeModal:s}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:l}=await g.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),d=(l||[]).filter(u=>u.card_type==="player"&&u.player),c=(l||[]).filter(u=>u.card_type==="game_changer"),r=(l||[]).filter(u=>u.card_type==="formation"),p={};d.forEach(u=>{const v=u.player.id;p[v]=(p[v]||0)+1});let f="Tous",y="";function k(){return[...d].sort((u,v)=>{const b=ne.indexOf(u.player.job),w=ne.indexOf(v.player.job);return b!==w?b-w:(u.player.surname_encoded||"").localeCompare(v.player.surname_encoded||"")})}function h(){return k().filter(u=>{const v=u.player,b=f==="Tous"||v.job===f,w=!y||`${v.firstname} ${v.surname_encoded}`.toLowerCase().includes(y);return b&&w})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${d.length} carte(s) joueur · ${c.length} Game Changer · ${r.length} Formation</p>
    </div>

    <!-- Cartes spéciales (cliquables) -->
    ${c.length>0||r.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">

        ${c.map(u=>{var v;return`
          <div data-gc-id="${u.id}" data-gc-type="${u.gc_type}" style="
            background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            <div style="font-size:28px">${((v=V[u.gc_type])==null?void 0:v.icon)||"⚡"}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${u.gc_type}</div>
          </div>`}).join("")}

        ${r.map(u=>`
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
        ${Be.map(u=>`
          <button class="filter-btn" data-job="${u}"
            style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${u===f?"var(--green)":"var(--gray-200)"};
              background:${u===f?"var(--green)":"#fff"};
              color:${u===f?"#fff":"var(--gray-600)"}">
            ${u}
          </button>`).join("")}
      </div>
    </div>

    <!-- Grille cartes joueurs -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function m(){const u=h(),v=document.getElementById("col-grid");if(!v)return;if(!u.length){v.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const b={},w=[];u.forEach($=>{const x=$.player.id;b[x]||(b[x]=!0,w.push($))}),v.innerHTML=w.map($=>{const x=p[$.player.id]||1,_=x>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${x}</div>`:"",L=d.filter(I=>I.player.id===$.player.id&&I.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Se($,_+L)}).join(""),v.querySelectorAll("[data-card-id]").forEach($=>{$.addEventListener("click",()=>{const x=d.find(_=>_.id===$.dataset.cardId);x&&Re(x,d,p,e)})})}m(),t.querySelectorAll(".filter-btn").forEach(u=>{u.addEventListener("click",()=>{f=u.dataset.job,t.querySelectorAll(".filter-btn").forEach(v=>{const b=v.dataset.job===f;v.style.background=b?"var(--green)":"#fff",v.style.color=b?"#fff":"var(--gray-600)",v.style.borderColor=b?"var(--green)":"var(--gray-200)"}),m()})}),document.getElementById("col-search").addEventListener("input",u=>{y=u.target.value.toLowerCase(),m()}),t.querySelectorAll("[data-gc-id]").forEach(u=>{u.addEventListener("click",()=>Ge(u.dataset.gcType,n))}),t.querySelectorAll("[data-form-id]").forEach(u=>{u.addEventListener("click",()=>qe(u.dataset.formation,n))})}function Ge(t,e){const i=V[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function qe(t,e){const i={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},o={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},a=i[t]||i["4-4-2"],n=["ATT","MIL","DEF","GK"];function s(c,r){const k=(c-1)*54,h=(r-k)/2;return Array.from({length:c},(m,u)=>h+u*54)}function l(c){return c===1?[1]:c===2?[0,2]:c===3?[0,1,2]:c===4?[0,1,1,2]:c===5?[0,1,1,1,2]:[1]}function d(){const f=n.length*72+48,y=n.map((u,v)=>24+v*72+72/2),k={};n.forEach(u=>{k[u]=s(a[u],290)});function h(u,v){const b=a[u],w=l(b),$=k[u],x=w.indexOf(v);return x>=0?$[x]:null}let m=`<svg width="290" height="${f}" viewBox="0 0 290 ${f}" xmlns="http://www.w3.org/2000/svg">`;n.forEach((u,v)=>{const b=k[u];for(let w=0;w<b.length-1;w++){const $=b[w]+20,x=b[w+1]-20,_=y[v];m+=`<line x1="${$}" y1="${_}" x2="${x}" y2="${_}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,m+=`<text x="${($+x)/2}" y="${_-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`}});for(let u=0;u<3;u++)for(let v=0;v<n.length-1;v++){const b=n[v],w=n[v+1],$=h(b,u),x=h(w,u);if($!==null&&x!==null){const _=($+x)/2;m+=`<line x1="${$}" y1="${y[v]+20}" x2="${x}" y2="${y[v+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,m+=`<text x="${_+6}" y="${(y[v]+y[v+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`}}return n.forEach((u,v)=>{const b=a[u],w=k[u],$=l(b),x=o[u],_=y[v],C={};$.forEach((L,I)=>{C[L]||(C[L]={xs:[],indices:[]}),C[L].xs.push(w[I]),C[L].indices.push(I)}),Object.entries(C).forEach(([L,I])=>{const M=I.xs.length;if(M>1){const A=I.xs.reduce((z,P)=>z+P,0)/M;m+=`<circle cx="${A}" cy="${_}" r="20" fill="${x}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,m+=`<text x="${A}" y="${_-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${u}</text>`,m+=`<text x="${A}" y="${_+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${M}</text>`}else{const A=I.xs[0],z=I.indices[0]+1;m+=`<circle cx="${A}" cy="${_}" r="20" fill="${x}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,m+=`<text x="${A}" y="${_+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${u}</text>`,m+=`<text x="${A}" y="${_+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${u}${z}</text>`}})}),m+="</svg>",m}e(`Formation ${t}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${d()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function Re(t,e,i,o){var x,_,C,L,I,M;const{state:a,toast:n,openModal:s,closeModal:l,navigate:d,refreshProfile:c}=o,r=t.player,p=e.filter(A=>A.player.id===r.id),f=p.length,y=ze[r.rarity]||1e3,k=r.rarity!=="legende",h=ge(r),m=N(r,r.job),u=r.job2?N(r,r.job2):null,v=F[r.job]||"#1A6B3C",b=r.job2?F[r.job2]:null,w=ve[r.rarity]||"#ccc",$=ye[r.country_code]||r.country_code||"";s(`${r.firstname} ${r.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${w};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${r.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(r.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${v}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${v}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${m}</text>
            </svg>
            ${u!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${b}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${u}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${h?`<img src="${h}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${r.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${$}</div>
            ${(x=r.clubs)!=null&&x.logo_url?`<img src="${r.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${(((_=r.clubs)==null?void 0:_.encoded_name)||"").slice(0,6)}</div>`}
          </div>
        </div>
      </div>

      <!-- Infos -->
      <div style="flex:1;min-width:160px;display:flex;flex-direction:column;gap:10px">
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">RARETÉ</div>
          <div style="font-weight:700;color:${w}">${r.rarity.toUpperCase()}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">POSTE</div>
          <div style="font-weight:700">${r.job}${r.job2?" / "+r.job2:""}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">NOTES</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:12px">
            <span>GK <b>${r.note_g||0}</b></span>
            <span>DEF <b>${r.note_d||0}</b></span>
            <span>MIL <b>${r.note_m||0}</b></span>
            <span>ATT <b>${r.note_a||0}</b></span>
          </div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--gray-600);margin-bottom:2px">EN COLLECTION</div>
          <div style="font-weight:700;font-size:18px">×${f}</div>
        </div>
      </div>
    </div>

    <!-- Vente directe -->
    <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:14px">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px">💰 Vente directe</div>
      <div style="background:#f9f9f9;border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12px;color:var(--gray-600)">Prix fixe selon rareté</div>
          <div style="font-size:18px;font-weight:900;color:var(--yellow)">${y.toLocaleString("fr")} crédits</div>
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${f-1} carte${f-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-btn" ${f<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${k&&!t.is_for_sale?`
    <div style="margin-top:12px;border-top:1px solid var(--gray-200);padding-top:12px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">🛒 Marché des transferts</div>
      <div style="display:flex;gap:8px">
        <input type="number" id="sell-price" min="1" placeholder="Prix en crédits" value="${r.sell_price||5e3}"
          style="flex:1;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px">
        <button class="btn btn-primary" id="market-sell-btn">Mettre en vente</button>
      </div>
    </div>`:""}
    ${t.is_for_sale?`
    <div style="margin-top:12px;padding:10px;background:#fff8e1;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;color:#D4A017;font-weight:600">🏷️ En vente : ${(t.sale_price||0).toLocaleString("fr")} cr.</div>
      <button class="btn btn-ghost btn-sm" id="cancel-sell-btn">Retirer</button>
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(C=document.getElementById("close-detail"))==null||C.addEventListener("click",l),(L=document.getElementById("direct-sell-btn"))==null||L.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${r.surname_encoded} pour ${y.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const A=p.find(P=>!P.is_for_sale)||p[0];if(!A){n("Aucune carte à vendre","error");return}const{error:z}=await g.from("cards").delete().eq("id",A.id);if(z){n(z.message,"error");return}await g.from("users").update({credits:(a.profile.credits||0)+y}).eq("id",a.profile.id),await c(),n(`+${y.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),l(),d("collection")}),(I=document.getElementById("market-sell-btn"))==null||I.addEventListener("click",async()=>{const A=parseInt(document.getElementById("sell-price").value);if(!A||A<1){n("Prix invalide","error");return}await g.from("cards").update({is_for_sale:!0,sale_price:A}).eq("id",t.id),await g.from("market_listings").insert({seller_id:a.profile.id,card_id:t.id,price:A}),n("Carte mise en vente sur le marché !","success"),l(),d("collection")}),(M=document.getElementById("cancel-sell-btn"))==null||M.addEventListener("click",async()=>{await g.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await g.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),n("Annonce retirée","success"),l(),d("collection")})}const O={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},B={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function X(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function he(t,e){const{state:i,navigate:o,toast:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await g.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
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
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const s=prompt("Nom du deck :",`Deck ${((n==null?void 0:n.length)||0)+1}`);if(!s)return;const{data:l,error:d}=await g.from("decks").insert({owner_id:i.profile.id,name:s,is_active:!(n!=null&&n.length)}).select().single();if(d){a(d.message,"error");return}a("Deck créé !","success"),se(l.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(s=>{s.addEventListener("click",()=>se(s.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(s=>{s.addEventListener("click",async()=>{await g.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await g.from("decks").update({is_active:!0}).eq("id",s.dataset.activate),a("Deck activé !","success"),he(t,e)})})}async function se(t,e,i){const{state:o,toast:a}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:n}=await g.from("decks").select("*").eq("id",t).single(),{data:s}=await g.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",o.profile.id),l=(s||[]).filter(y=>y.card_type==="player"&&y.player),d=(s||[]).filter(y=>y.card_type==="formation"),c=d.map(y=>y.formation).filter(Boolean),{data:r}=await g.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let p=n.formation||"4-4-2";c.length>0&&!c.includes(p)&&(p=c[0]);const f={deckId:t,name:n.name,formation:p,formationCardId:n.formation_card_id,slots:{},subs:[],playerCards:l,formationCards:d,availableFormations:c};(r||[]).forEach(y=>{y.is_starter?f.slots[y.position]=y.card_id:f.subs.includes(y.card_id)||f.subs.push(y.card_id)}),S(e,f,i)}function S(t,e,i){var d;const{navigate:o}=i;O[e.formation];const a=ae(e.formation),n=a.filter(c=>e.slots[c]).length,s=e.availableFormations.length>0?e.availableFormations:Object.keys(O),l=e.subs.map(c=>e.playerCards.find(r=>r.id===c)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
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
        ${s.map(c=>`<option value="${c}" ${c===e.formation?"selected":""}>${c}</option>`).join("")}
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
        ${l.map(c=>{const r=c.player;return`<div style="display:flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px">
            <span style="background:${B[r.job]};color:#fff;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:700">${r.job}</span>
            ${r.firstname} ${r.surname_encoded}
            <button style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:14px" data-remove-sub="${c.id}">✕</button>
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
  </div>`,Fe(t,e,a,i),document.getElementById("builder-back").addEventListener("click",()=>o("decks")),document.getElementById("formation-select").addEventListener("change",c=>{e.formation=c.target.value;const r=ae(e.formation),p={};r.forEach(f=>{e.slots[f]&&(p[f]=e.slots[f])}),e.slots=p,S(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>Pe(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(c=>{c.addEventListener("click",()=>{e.subs=e.subs.filter(r=>r!==c.dataset.removeSub),S(t,e,i)})}),(d=document.getElementById("add-sub-btn"))==null||d.addEventListener("click",()=>{Oe(e,t,i)})}function Fe(t,e,i,o){const a=document.getElementById("deck-field");if(!a)return;const s=["ATT","MIL","DEF","GK"].map(r=>i.filter(p=>p.startsWith(r)));function l(r,p){if(!r||!p)return null;const f=r.country_code&&p.country_code&&r.country_code===p.country_code,y=r.club_id&&p.club_id&&r.club_id===p.club_id;return f&&y?"#1A6B3C":f||y?"#D4A017":"#222"}function d(r,p){return r&&Number(p==="GK"?r.note_g:p==="DEF"?r.note_d:p==="MIL"?r.note_m:r.note_a)||0}function c(r){var h;const p=r.map(m=>{const u=e.slots[m],v=u?e.playerCards.find(b=>b.id===u):null;return v?v.player:null}),f=((h=r[0])==null?void 0:h.replace(/\d+/,""))||"ATT",y=p.reduce((m,u)=>m+d(u,f),0);let k=0;for(let m=0;m<p.length-1;m++){const u=l(p[m],p[m+1]);u&&u!=="#222"&&k++}return{total:y,linkBonus:k}}a.innerHTML=s.map(r=>{var h;const p=((h=r[0])==null?void 0:h.replace(/\d+/,""))||"ATT",{total:f,linkBonus:y}=c(r),k=r.map(m=>{const u=e.slots[m];return u?e.playerCards.find(v=>v.id===u):null});return`
    <div style="margin-bottom:6px">
      <!-- Ligne de joueurs avec liens -->
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${r.map((m,u)=>{var _,C;const v=k[u],b=B[p],w=u<r.length-1?l((_=k[u])==null?void 0:_.player,(C=k[u+1])==null?void 0:C.player):null,$=v?(()=>{const L=v.player,I=d(L,p),M=X(L);return`<div class="formation-slot filled" data-pos="${m}"
              style="border-color:${b};background:${b};cursor:pointer;position:relative;width:60px;height:60px;flex-shrink:0">
              ${M?`<img src="${M}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.75">`:""}
              <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008;line-height:1">${I}</div>
              <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px">${L.surname_encoded}</div>
            </div>`})():`<div class="formation-slot" data-pos="${m}"
            style="border-color:rgba(255,255,255,0.4);cursor:pointer;width:60px;height:60px;flex-shrink:0">
            <div style="font-size:9px;color:rgba(255,255,255,0.7)">${p}</div>
            <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>
          </div>`,x=w?`<div style="
            width:16px;height:4px;border-radius:2px;background:${w};
            flex-shrink:0;opacity:0.9;box-shadow:0 0 4px ${w}
          "></div>`:"";return $+x}).join("")}
      </div>
      <!-- Note de ligne -->
      <div style="text-align:center;color:rgba(255,255,255,0.7);font-size:10px;margin-top:3px">
        <span style="font-weight:700;color:#fff">${f}</span>
        ${y>0?`<span style="color:#D4A017">(+${y} lien${y>1?"s":""})</span>`:""}
      </div>
    </div>`}).join(""),a.querySelectorAll(".formation-slot").forEach(r=>{r.addEventListener("click",()=>Ne(r.dataset.pos,e,t,o))})}function Ne(t,e,i,o){var f,y,k;const{openModal:a,closeModal:n}=o,s=t.replace(/\d+/,""),l=e.slots[t],d=l?e.playerCards.find(h=>h.id===l):null;(f=d==null?void 0:d.player)==null||f.id;const c=new Set;Object.entries(e.slots).forEach(([h,m])=>{var v;if(h===t||!m)return;const u=e.playerCards.find(b=>b.id===m);(v=u==null?void 0:u.player)!=null&&v.id&&c.add(u.player.id)}),e.subs.forEach(h=>{var u;const m=e.playerCards.find(v=>v.id===h);(u=m==null?void 0:m.player)!=null&&u.id&&c.add(m.player.id)});const r=new Set,p=e.playerCards.filter(h=>{const m=h.player;return!(m.job===s||m.job2===s)||c.has(m.id)||r.has(m.id)?!1:(r.add(m.id),!0)});p.sort((h,m)=>{const u=s==="GK"?h.player.note_g:s==="DEF"?h.player.note_d:s==="MIL"?h.player.note_m:h.player.note_a;return(s==="GK"?m.player.note_g:s==="DEF"?m.player.note_d:s==="MIL"?m.player.note_m:m.player.note_a)-u}),a(`Choisir ${s} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${p.length>0?p.map(h=>{var w,$;const m=h.player,u=s==="GK"?m.note_g:s==="DEF"?m.note_d:s==="MIL"?m.note_m:m.note_a,v=X(m),b={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[m.rarity];return`<div class="player-option" data-card-id="${h.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${B[s]}">
            ${v?`<img src="${v}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${B[s]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${s}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${m.firstname} ${m.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${m.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${m.country_code}">
              ${(w=m.clubs)!=null&&w.logo_url?`<img src="${m.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${(($=m.clubs)==null?void 0:$.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${m.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${B[s]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${b};flex-shrink:0">
            ${u}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(y=document.getElementById("close-selector"))==null||y.addEventListener("click",n),(k=document.getElementById("remove-player"))==null||k.addEventListener("click",()=>{delete e.slots[t],n(),S(i,e,o)}),document.querySelectorAll(".player-option").forEach(h=>{h.addEventListener("click",()=>{e.slots[t]=h.dataset.cardId,n(),S(i,e,o)})})}function Oe(t,e,i){var d;const{openModal:o,closeModal:a}=i,n=new Set;Object.values(t.slots).filter(Boolean).forEach(c=>{var p;const r=t.playerCards.find(f=>f.id===c);(p=r==null?void 0:r.player)!=null&&p.id&&n.add(r.player.id)}),t.subs.forEach(c=>{var p;const r=t.playerCards.find(f=>f.id===c);(p=r==null?void 0:r.player)!=null&&p.id&&n.add(r.player.id)});const s=new Set,l=t.playerCards.filter(c=>{var r,p,f;return n.has((r=c.player)==null?void 0:r.id)||s.has((p=c.player)==null?void 0:p.id)?!1:(s.add((f=c.player)==null?void 0:f.id),!0)});o("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${l.length>0?l.map(c=>{var y;const r=c.player,p=X(r),f=r.job==="GK"?r.note_g:r.job==="DEF"?r.note_d:r.job==="MIL"?r.note_m:r.note_a;return`<div class="player-option" data-card-id="${c.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${B[r.job]}">
            ${p?`<img src="${p}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${r.firstname} ${r.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${r.job} · ${r.country_code} · ${((y=r.clubs)==null?void 0:y.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${B[r.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${f}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(d=document.getElementById("close-sub-selector"))==null||d.addEventListener("click",a),document.querySelectorAll(".player-option").forEach(c=>{c.addEventListener("click",()=>{t.subs.push(c.dataset.cardId),a(),S(e,t,i)})})}async function Pe(t,e){const{state:i,toast:o,navigate:a}=e,n=t.formationCards.find(d=>d.formation===t.formation),s=(n==null?void 0:n.id)||t.formationCardId;await g.from("decks").update({formation:t.formation,formation_card_id:s||null}).eq("id",t.deckId),await g.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([d,c],r)=>{l.push({deck_id:t.deckId,card_id:c,position:d,is_starter:!0,slot_order:r})}),t.subs.forEach((d,c)=>{l.push({deck_id:t.deckId,card_id:d,position:`SUB${c+1}`,is_starter:!1,slot_order:100+c})}),l.length>0){const{error:d}=await g.from("deck_cards").insert(l);if(d){o(d.message,"error");return}}o("Deck enregistré ✅","success"),a("decks")}function ae(t){const e=O[t]||O["4-4-2"],i=["GK1"];for(let o=1;o<=e.DEF;o++)i.push(`DEF${o}`);for(let o=1;o<=e.MIL;o++)i.push(`MIL${o}`);for(let o=1;o<=e.ATT;o++)i.push(`ATT${o}`);return i}const re=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],be={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function Ke(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const He={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},Ue={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function Ve(t,{state:e,navigate:i,toast:o}){var n;const a=((n=e.profile)==null?void 0:n.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${a.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${re.map(s=>{const l=a>=s.cost||s.cost===0;return`<div class="booster-card ${l?"":"disabled"}" data-booster="${s.id}">
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
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(s=>{s.addEventListener("click",async()=>{const l=re.find(d=>d.id===s.dataset.booster);if(l){s.style.opacity="0.5",s.style.pointerEvents="none";try{await We(l,{state:e,toast:o,navigate:i,container:t})}catch(d){o(d.message,"error"),s.style.opacity="",s.style.pointerEvents=""}}})})}async function We(t,{state:e,toast:i,navigate:o,container:a}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await et();let n=[];t.type==="player"?n=await Ye(e.profile,t.cardCount,t.cost):t.type==="game_changer"?n=await Je(e.profile,t.cardCount,t.cost):t.type==="formation"&&(n=await Xe(e.profile,t.cost));const{data:s}=await g.from("users").select("*").eq("id",e.profile.id).single();s&&(e.profile=s),Qe(n,t,o)}async function Ye(t,e,i){if(i>0){const{error:d}=await g.from("users").update({credits:t.credits-i}).eq("id",t.id);if(d)throw d}const{data:o}=await g.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(o!=null&&o.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const a=o.filter(d=>d.job==="GK"),n=o.filter(d=>d.job!=="GK");let s=[];!t.first_booster_opened&&a.length>0?(s.push(a[Math.floor(Math.random()*a.length)]),s.push(...de([...n]).slice(0,e-1)),await g.from("users").update({first_booster_opened:!0}).eq("id",t.id)):s=de([...o]).slice(0,e);const{data:l}=await g.from("cards").insert(s.map(d=>({owner_id:t.id,player_id:d.id,card_type:"player"}))).select();return s.map((d,c)=>({...l[c],player:d}))}async function Je(t,e,i){const{error:o}=await g.from("users").update({credits:t.credits-i}).eq("id",t.id);if(o)throw o;const a=Object.keys(be),n=Array.from({length:e},()=>a[Math.floor(Math.random()*a.length)]),{data:s}=await g.from("cards").insert(n.map(l=>({owner_id:t.id,card_type:"game_changer",gc_type:l}))).select();return s}async function Xe(t,e){const{error:i}=await g.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const o=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],a=o[Math.floor(Math.random()*o.length)],{data:n}=await g.from("cards").insert({owner_id:t.id,card_type:"formation",formation:a}).select();return n}function Qe(t,e,i){var s,l;const o=document.createElement("div");o.id="booster-anim-overlay",o.innerHTML=`
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
  `,document.body.appendChild(o);let a=!1;const n=document.getElementById("pack-visual");n.addEventListener("click",()=>{a||(a=!0,n.classList.add("shaking"),setTimeout(()=>{n.classList.remove("shaking"),n.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none";const d=document.getElementById("cards-phase");d.style.display="flex",d.innerHTML=t.map((c,r)=>`
          <div class="card-flip-wrapper" data-card-idx="${r}">
            <div class="card-flip-inner" id="card-flip-${r}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${Ze(c)}</div>
            </div>
          </div>`).join(""),t.forEach((c,r)=>{setTimeout(()=>{var p;(p=document.getElementById(`card-flip-${r}`))==null||p.classList.add("revealed")},r*350+300)}),setTimeout(()=>{document.getElementById("reveal-btns").style.display="flex"},t.length*350+800),d.querySelectorAll(".card-flip-wrapper").forEach(c=>{c.addEventListener("click",()=>{var r;(r=document.getElementById(`card-flip-${c.dataset.cardIdx}`))==null||r.classList.add("revealed")})})},600)},500))}),(s=document.getElementById("reveal-collection"))==null||s.addEventListener("click",()=>{o.remove(),i("collection")}),(l=document.getElementById("reveal-more"))==null||l.addEventListener("click",()=>{o.remove(),i("boosters")})}function Ze(t){var e,i;if(t.card_type==="player"&&t.player){const o=t.player,a=o.job||"ATT",n=He[a]||"#1A6B3C",s=Ue[o.rarity]||"#ccc",l=a==="GK"?o.note_g:a==="DEF"?o.note_d:a==="MIL"?o.note_m:o.note_a,d=Ke(o),c={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[o.country_code]||o.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${s};overflow:hidden;display:flex;flex-direction:column">
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
        ${d?`<img src="${d}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${o.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${c}</div>
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
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const o=setInterval(()=>{i--;const a=document.getElementById("ad-cd");a&&(a.textContent=i),i<=0&&(clearInterval(o),e.remove(),t(!0))},1e3)})}function de(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}const D={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}};async function tt(t,e){var $;const{state:i,navigate:o,toast:a}=e,n=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Préparation...</div>';const s=n.matchMode||"vs_ai_easy",l=s.replace("vs_ai_",""),d=s,{data:c}=await g.from("decks").select("id,name,formation_card_id").eq("owner_id",i.profile.id).eq("is_active",!0).limit(1);if(!c||c.length===0){le(t,"📋","Aucun deck actif.","Créer un deck",()=>o("decks"));return}const r=c[0],{data:p}=await g.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
          clubs(encoded_name, logo_url)))`).eq("deck_id",r.id).order("slot_order"),f=(p||[]).filter(x=>{var _;return x.is_starter&&((_=x.card)==null?void 0:_.player)}),y=(p||[]).filter(x=>{var _;return!x.is_starter&&((_=x.card)==null?void 0:_.player)});if(f.length<11){le(t,"⚠️",`Deck incomplet (${f.length}/11 titulaires).`,"Compléter",()=>o("decks"));return}const{data:k}=await g.from("cards").select("id, gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),h=(p||[]).find(x=>{var _;return((_=x.card)==null?void 0:_.card_type)==="formation"}),m=(($=h==null?void 0:h.card)==null?void 0:$.formation)||"4-4-2",u=it(f,m),v=await nt(m),{data:b}=await g.from("matches").insert({home_id:i.profile.id,away_id:null,mode:d,home_deck_id:r.id,status:"in_progress"}).select().single(),w={matchId:b==null?void 0:b.id,mode:d,difficulty:l,homeTeam:u,aiTeam:v,homeSubs:y.map(x=>xe(x.card)),homeScore:0,aiScore:0,gcCards:k||[],usedGc:[],phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},maxSubs:3};at(t,w,e)}function le(t,e,i,o,a){var n;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${o}</button>
    </div>
  </div>`,(n=document.getElementById("msg-btn"))==null||n.addEventListener("click",a)}function xe(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,used:!1}}function it(t,e){const i=t.map(o=>xe(o.card));return ot(i,e)}function ot(t,e){const i=D[e]||D["4-4-2"],o={GK:[],DEF:[],MIL:[],ATT:[]},a=[...t];for(const n of["GK","DEF","MIL","ATT"]){const s=[];for(let d=0;d<i[n];d++){let c=a.findIndex(r=>r.job===n);c===-1&&(c=a.findIndex(r=>r.job2===n)),c===-1&&(c=0),a[c]&&(s.push({...a[c],_line:n}),a.splice(c,1))}const l=Me(s.length);s.forEach((d,c)=>{d._col=l[c]}),o[n]=s}return o}async function nt(t,e){const{data:i}=await g.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity").eq("is_active",!0).limit(60);if(!i||i.length<11)return st(t);const o=D[t]||D["4-4-2"],a={GK:[],DEF:[],MIL:[],ATT:[]},n=[...i];for(const s of["GK","DEF","MIL","ATT"]){const l=n.filter(r=>r.job===s),d=n.filter(r=>r.job!==s),c=[...l,...d];for(let r=0;r<o[s];r++){const p=c[r]||n[r];p&&a[s].push({cardId:"ai-"+p.id+"-"+r,id:p.id,firstname:p.firstname,name:p.surname_encoded,country_code:p.country_code,club_id:p.club_id,job:p.job,job2:p.job2,note_g:Number(p.note_g)||0,note_d:Number(p.note_d)||0,note_m:Number(p.note_m)||0,note_a:Number(p.note_a)||0,rarity:p.rarity,_line:s,used:!1})}}return a}function st(t){const e=D[t]||D["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},o=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let a=0;for(const n of["GK","DEF","MIL","ATT"])for(let s=0;s<e[n];s++){const l=3+Math.floor(Math.random()*5);i[n].push({cardId:"fake-"+a,id:"fake-"+a,firstname:"IA",name:o[a%o.length],country_code:"XX",club_id:null,job:n,job2:null,note_g:n==="GK"?l:2,note_d:n==="DEF"?l:2,note_m:n==="MIL"?l:2,note_a:n==="ATT"?l:2,rarity:"normal",_line:n,used:!1}),a++}return i}function at(t,e,i){const o=e.homeTeam.MIL||[],a=e.aiTeam.MIL||[],n=oe(o),s=oe(a);e.attacker=n>=s?"home":"ai",e.log.push({text:`Duel milieu : Vous ${n} - ${s} IA → ${e.attacker==="home"?"Vous attaquez en 1er":"L'IA attaque en 1er"}`,type:"info"}),e.phase=e.attacker==="home"?"attack":"ai-attack",j(t,e,i),e.attacker==="ai"&&setTimeout(()=>K(t,e,i),1200)}function j(t,e,i){var n,s;const o={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"";t.innerHTML=`
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
    ${(e.phase==="attack"||e.phase==="defense")&&e.gcCards.filter(l=>!e.usedGc.includes(l.id)).length>0?`
    <div style="padding:6px 16px">
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:4px">Game Changers</div>
      <div style="display:flex;gap:6px;overflow-x:auto">
        ${e.gcCards.filter(l=>!e.usedGc.includes(l.id)).map(l=>{var d;return`
          <div class="gc-mini" data-gc-id="${l.id}" data-gc-type="${l.gc_type}"
            style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:6px 10px;cursor:pointer;text-align:center;min-width:80px">
            <div style="font-size:16px">${((d=V[l.gc_type])==null?void 0:d.icon)||"⚡"}</div>
            <div style="font-size:8px;color:#fff;font-weight:600">${l.gc_type}</div>
          </div>`}).join("")}
      </div>
    </div>`:""}

    <!-- Actions & calcul -->
    <div class="match-actions" id="match-actions"></div>

    <!-- Log -->
    <div class="match-log" id="match-log">
      ${e.log.slice(-6).map(l=>`<div class="log-entry ${l.type==="goal"?"log-goal":""}">${l.text}</div>`).join("")}
    </div>
  </div>`,(n=document.getElementById("match-quit"))==null||n.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(s=document.getElementById("view-ai"))==null||s.addEventListener("click",()=>ft(e,i)),_e(t,e,i),ke(t,e,i),t.querySelectorAll(".gc-mini").forEach(l=>{l.addEventListener("click",()=>pt(l.dataset.gcId,l.dataset.gcType,t,e,i))});const a=document.getElementById("match-log");a&&(a.scrollTop=a.scrollHeight)}function _e(t,e,i){const o=document.getElementById("match-field");if(!o)return;const a=e.phase==="attack"||e.phase==="defense",n=e.phase==="attack"?["MIL","ATT"]:["GK","DEF","MIL"];e.phase==="attack"||e.phase;const s=["ATT","MIL","DEF","GK"];o.innerHTML=`<div class="match-grid">
    ${s.map(l=>{const d=e.homeTeam[l]||[];return d.length?`<div class="match-row">
        ${d.map((c,r)=>{const p=a&&n.includes(l)&&!c.used,f=e.selected.some(k=>k.cardId===c.cardId);let y;return e.phase==="attack"?y=T(c,"ATT"):e.phase==="defense"?y=l==="GK"?T(c,"GK"):T(c,"DEF"):y=T(c,l),`<div class="match-slot ${p?"selectable":""} ${f?"selected":""} ${c.used?"used":""}"
            data-card-id="${c.cardId}" data-role="${l}" data-idx="${r}">
            <div class="slot-note" style="color:${c.used?"#666":"#fff"}">${c.used?"–":y}</div>
            <div class="slot-name">${c.name}</div>
          </div>`}).join("")}
      </div>`:""}).join("")}
  </div>`,o.querySelectorAll(".match-slot.selectable").forEach(l=>{l.addEventListener("click",()=>rt(l,e,t,i))})}function rt(t,e,i,o){const a=t.dataset.cardId,n=t.dataset.role,s=parseInt(t.dataset.idx),l=e.selected.findIndex(d=>d.cardId===a);if(l!==-1)e.selected.splice(l,1);else{if(e.selected.length>=3){o.toast("Maximum 3 joueurs","error");return}const d=(e.homeTeam[n]||[]).find(c=>c.cardId===a);d&&e.selected.push({...d,_role:n,_line:n,_idx:s})}_e(i,e,o),ke(i,e,o)}function ke(t,e,i){var a,n,s,l;const o=document.getElementById("match-actions");if(o)if(e.phase==="attack"){const d=e.selected.length>0?Y(e.selected,e.modifiers.home):null;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${d?`ATT : <b style="color:var(--yellow);font-size:20px">${d.total}</b>
             <span style="font-size:11px;opacity:.7">(${d.base}${d.links?` +${d.links} liens`:""})${e.modifiers.home.doubleAttack?" ×2":""}</span>`:'<span style="opacity:.5">Sélectionne 1-3 attaquants/milieux adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${d?"":"disabled"}>
        Attaquer →
      </button>`,(a=document.getElementById("confirm-attack"))==null||a.addEventListener("click",()=>dt(t,e,i))}else if(e.phase==="defense"){const d=e.selected.length>0?J(e.selected.map(r=>({...r,_line:r._role})),e.modifiers.home):null,c=((n=e.pendingAttack)==null?void 0:n.total)||0;o.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px">L'IA attaque avec <b style="color:#ff6b6b">${c}</b></div>
        ${d?`DEF : <b style="color:var(--yellow);font-size:20px">${d.total}</b>
             <span style="font-size:11px;opacity:.7">(${d.base}${d.links?` +${d.links} liens`:""})</span>`:'<span style="opacity:.5">Sélectionne 1-3 défenseurs/GK adjacents</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${d?"":"disabled"}>
        Défendre →
      </button>`,(s=document.getElementById("confirm-defense"))==null||s.addEventListener("click",()=>lt(t,e,i))}else e.phase==="finished"?(o.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(l=document.getElementById("end-match"))==null||l.addEventListener("click",()=>i.navigate("home"))):o.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.5);padding:8px;font-size:13px">⏳ Tour de l'IA...</div>`}function dt(t,e,i){const o=Y(e.selected,e.modifiers.home);e.pendingAttack={...o,players:[...e.selected],side:"home"},e.selected.forEach(a=>{const n=(e.homeTeam[a._role]||[]).find(s=>s.cardId===a.cardId);n&&(n.used=!0)}),e.log.push({text:`Vous attaquez : ${o.total} (${e.selected.map(a=>a.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",j(t,e,i),setTimeout(()=>ct(t,e,i),1200)}function lt(t,e,i){const o=e.selected.map(s=>({...s,_line:s._role})),a=J(o,e.modifiers.home);e.selected.forEach(s=>{const l=(e.homeTeam[s._role]||[]).find(d=>d.cardId===s.cardId);l&&(l.used=!0)});const n=fe(e.pendingAttack.total,a.total,e.modifiers.home);n.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):n.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${a.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${a.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,we(t,e,i,"home-attack")}function K(t,e,i){const o=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],a=me(o,"attack",e.difficulty);if(!a.length){Ee(t,e,i);return}const n=Y(a,e.modifiers.ai);e.pendingAttack={...n,players:a,side:"ai"},a.forEach(s=>{s.used=!0}),e.log.push({text:`IA attaque : ${n.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",j(t,e,i)}function ct(t,e,i){const o=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],a=me(o,"defense",e.difficulty),n=a.length>0?J(a,e.modifiers.ai).total:0;a.forEach(l=>{l.used=!0});const s=fe(e.pendingAttack.total,n,e.modifiers.ai);s.shielded?e.log.push({text:"🛡️ Bouclier IA ! But annulé.",type:"info"}):s.goal?(e.homeScore++,e.log.push({text:`⚽ BUT VOUS ! (${e.pendingAttack.total} > ${n})`,type:"goal"})):e.log.push({text:`🧤 IA défend ! (${n} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,we(t,e,i,"ai-attack")}function we(t,e,i,o){if(e.round++,$e(e)){H(t,e,i);return}if(o==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(n=>!n.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(s=>!s.used).length){H(t,e,i);return}e.phase="ai-attack",j(t,e,i),setTimeout(()=>K(t,e,i),800);return}e.phase="attack",j(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(n=>!n.used).length){Ee(t,e,i);return}e.phase="ai-attack",j(t,e,i),setTimeout(()=>K(t,e,i),800)}}function $e(t){const e=["MIL","ATT","GK","DEF"].some(o=>(t.homeTeam[o]||[]).some(a=>!a.used)),i=["MIL","ATT","GK","DEF"].some(o=>(t.aiTeam[o]||[]).some(a=>!a.used));return!e&&!i}function Ee(t,e,i){$e(e)?H(t,e,i):(e.phase="attack",j(t,e,i))}function pt(t,e,i,o,a){if(!o.usedGc.includes(t)){switch(o.usedGc.push(t),e){case"Double attaque":o.modifiers.home.doubleAttack=!0,o.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":o.modifiers.home.shield=!0,o.log.push({text:"🛡️ Bouclier actif !",type:"info"});break;case"Ressusciter":{let n=!1;for(const s of["ATT","MIL","DEF","GK"]){const l=(o.homeTeam[s]||[]).find(d=>d.used);if(l){l.used=!1,n=!0;break}}o.log.push({text:n?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":o.modifiers.ai.stolenNote=(o.modifiers.ai.stolenNote||0)+1,o.log.push({text:"🎯 -1 à la prochaine action IA",type:"info"});break;case"Gel":{const n=[...o.aiTeam.ATT||[],...o.aiTeam.MIL||[]].filter(s=>!s.used);if(n.length){const s=n.sort((l,d)=>T(d,"ATT")-T(l,"ATT"))[0];s.used=!0,o.log.push({text:`❄️ ${s.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":o.maxSubs++,o.log.push({text:"🔄 +1 remplacement",type:"info"});break}g.from("cards").delete().eq("id",t).then(()=>{}),j(i,o,a)}}async function H(t,e,i){e.phase="finished";const{state:o}=i,a=e.homeScore>e.aiScore,n=e.homeScore===e.aiScore,s=a?"victoire":n?"nul":"defaite",l=je(e.mode,s);e.log.push({text:a?`🏆 Victoire ! +${l} cr.`:n?`🤝 Nul. +${l} cr.`:`❌ Défaite. +${l} cr.`,type:"goal"}),e.matchId&&await g.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:a?o.profile.id:null,home_credits_reward:l,played_at:new Date().toISOString()}).eq("id",e.matchId);const d={credits:(o.profile.credits||0)+l,matches_played:(o.profile.matches_played||0)+1};a?d.wins=(o.profile.wins||0)+1:n?d.draws=(o.profile.draws||0)+1:d.losses=(o.profile.losses||0)+1,await g.from("users").update(d).eq("id",o.profile.id),await i.refreshProfile(),j(t,e,i),ut(t,e,{isWin:a,isDraw:n,rewards:l},i)}function ut(t,e,{isWin:i,isDraw:o,rewards:a},n){var l,d;const s=document.createElement("div");s.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",s.innerHTML=`
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
    </div>`,document.body.appendChild(s),(l=document.getElementById("res-home"))==null||l.addEventListener("click",()=>{s.remove(),n.navigate("home")}),(d=document.getElementById("res-replay"))==null||d.addEventListener("click",()=>{s.remove(),n.navigate("match",{matchMode:e.mode})})}function ft(t,e){const i=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${i.map(o=>{const a=t.aiTeam[o]||[];return a.length?`<div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px">
          ${a.map(n=>{const s=T(n,o);return`<div class="match-slot ${n.used?"used":""}" style="cursor:default">
              <div class="slot-note">${n.used?"–":s}</div>
              <div class="slot-name">${n.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const mt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function vt(t,e){const{state:i,toast:o}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await Q(t,e)}async function Q(t,e){const{state:i,toast:o}=e,{data:a}=await g.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),n=(a||[]).filter(d=>d.seller_id===i.profile.id),s=(a||[]).filter(d=>d.seller_id!==i.profile.id);t.innerHTML=`
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
  `;function l(d){const c=document.getElementById("mkt-content"),r=d==="buy"?s:n;if(r.length===0){c.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${d==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}c.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${r.map(p=>{var m,u,v;const f=(m=p.card)==null?void 0:m.player;if(!f)return"";const y=f.job==="GK"?f.note_g:f.job==="DEF"?f.note_d:f.job==="MIL"?f.note_m:f.note_a,k=mt[f.rarity],h=(i.profile.credits||0)>=p.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${ht(f.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${k};flex-shrink:0">${y}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${f.firstname} ${f.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${f.country_code} · ${((u=f.clubs)==null?void 0:u.encoded_name)||"—"} · ${f.rarity} · ${f.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((v=p.seller)==null?void 0:v.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${p.price.toLocaleString("fr")}</div>
            ${d==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${p.id}" ${h?"":"disabled"} style="margin-top:4px">${h?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${p.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,c.querySelectorAll("[data-buy]").forEach(p=>{p.addEventListener("click",()=>yt(p.dataset.buy,r,t,e))}),c.querySelectorAll("[data-cancel]").forEach(p=>{p.addEventListener("click",()=>gt(p.dataset.cancel,t,e))})}l("buy"),t.querySelectorAll(".mkt-tab").forEach(d=>{d.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(c=>{const r=c===d;c.style.background=r?"var(--green)":"#fff",c.style.color=r?"#fff":"var(--gray-600)",c.style.borderColor=r?"var(--green)":"var(--gray-200)"}),l(d.dataset.tab)})})}async function yt(t,e,i,o){const{state:a,toast:n,refreshProfile:s}=o,l=e.find(d=>d.id===t);if(l){if((a.profile.credits||0)<l.price){n("Crédits insuffisants","error");return}if(confirm(`Acheter ${l.card.player.firstname} ${l.card.player.surname_encoded} pour ${l.price.toLocaleString("fr")} crédits ?`))try{const{error:d}=await g.from("cards").update({owner_id:a.profile.id,is_for_sale:!1,sale_price:null}).eq("id",l.card.id);if(d)throw d;await g.from("market_listings").update({status:"sold",buyer_id:a.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await g.from("users").update({credits:(a.profile.credits||0)-l.price}).eq("id",a.profile.id);const{data:c}=await g.from("users").select("credits").eq("id",l.seller_id).single();c&&await g.from("users").update({credits:(c.credits||0)+l.price}).eq("id",l.seller_id),await g.from("notifications").insert({user_id:l.seller_id,type:"card_sold",message:`Ta carte ${l.card.player.surname_encoded} a été vendue pour ${l.price} crédits !`,data:{card_id:l.card.id,price:l.price}}),await s(),n("Carte achetée ! ✅","success"),Q(i,o)}catch(d){n("Erreur : "+d.message,"error")}}}async function gt(t,e,i){const{toast:o}=i,{data:a}=await g.from("market_listings").select("card_id").eq("id",t).single();await g.from("market_listings").update({status:"cancelled"}).eq("id",t),a&&await g.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",a.card_id),o("Annonce retirée","success"),Q(e,i)}function ht(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function bt(t,{state:e,navigate:i,toast:o}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:a}=await g.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
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
  `}const E={user:null,profile:null,page:"home",params:{}};function G(t,e="info",i=3e3){const o=document.getElementById("toast");o&&(o.textContent=t,o.className=`show ${e}`,clearTimeout(o._t),o._t=setTimeout(()=>{o.className=""},i))}function xt(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function U(){document.getElementById("modal-overlay").classList.add("hidden")}async function q(){if(!E.user)return;const{data:t}=await g.from("users").select("*").eq("id",E.user.id).single();t&&(E.profile=t)}function R(t,e={}){E.page=t,E.params=e,Ae()}async function Ae(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(o=>{o.classList.toggle("active",o.dataset.page===E.page)});const e=document.getElementById("nav-credits");e&&E.profile&&(e.textContent=`💰 ${(E.profile.credits||0).toLocaleString("fr")}`);const i={state:E,navigate:R,toast:G,openModal:xt,closeModal:U,refreshProfile:q};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',E.page){case"home":await te(t,i);break;case"collection":await De(t,i);break;case"decks":await he(t,i);break;case"boosters":await Ve(t,i);break;case"match":await tt(t,i);break;case"market":await vt(t,i);break;case"rankings":await bt(t,i);break;default:await te(t,i)}}function _t(){const t=document.getElementById("app"),e=E.profile,i=(e.club_name||"MW").split(" ").filter(Boolean);i.length>=2?(i[0][0]+i[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault(),R(o.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>R("home")),document.getElementById("nav-credits").addEventListener("click",()=>R("boosters"))}async function kt(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&U()}),document.getElementById("modal-close").addEventListener("click",U);const{data:{session:t}}=await g.auth.getSession();if(!t){ue(),Z(document.getElementById("app"),{navigate:ce,toast:G});return}if(E.user=t.user,await q(),ue(),!E.profile){Ie(document.getElementById("app"),{state:E,navigate:wt,toast:G,refreshProfile:q});return}E.profile.first_booster_opened||(await $t(E.user.id),await q()),Te(),g.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(E.user=null,E.profile=null,document.getElementById("app").innerHTML="",Z(document.getElementById("app"),{navigate:ce,toast:G}))})}function Te(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",_t(),Ae()}function ce(){window.location.reload()}async function wt(){await q(),Te()}async function $t(t){const{data:e}=await g.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:i}=await g.from("players").select("id,job").eq("is_active",!0);if(!i||i.length===0)return;const o=i.filter(l=>l.job==="GK"),a=i.filter(l=>l.job!=="GK"),n=[];for(let l=0;l<5;l++){let d=[];l===0&&o.length>0?(d.push(o[Math.floor(Math.random()*o.length)]),d.push(...pe([...a]).slice(0,3))):d=pe([...i]).slice(0,4),d.forEach(c=>n.push({owner_id:t,player_id:c.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(l=>{n.push({owner_id:t,card_type:"game_changer",gc_type:l})});const s=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];n.push({owner_id:t,card_type:"formation",formation:s[Math.floor(Math.random()*s.length)]}),await g.from("cards").insert(n),await g.from("users").update({first_booster_opened:!0}).eq("id",t),G("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function pe(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function ue(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}kt();
