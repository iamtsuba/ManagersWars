import{s as g}from"./supabase-z_u0vv5N.js";function ue(t,{navigate:e,toast:i}){t.innerHTML=`
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
  `,t.querySelectorAll(".auth-tab").forEach(n=>{n.addEventListener("click",()=>{t.querySelectorAll(".auth-tab").forEach(r=>r.classList.remove("active")),n.classList.add("active"),document.getElementById("tab-login").style.display=n.dataset.tab==="login"?"block":"none",document.getElementById("tab-register").style.display=n.dataset.tab==="register"?"block":"none"})}),document.getElementById("login-btn").addEventListener("click",async()=>{const n=document.getElementById("login-email").value.trim(),r=document.getElementById("login-password").value,o=document.getElementById("login-error");if(o.textContent="",!n||!r){o.textContent="Remplissez tous les champs.";return}const a=document.getElementById("login-btn");a.textContent="Connexion…",a.disabled=!0;const{error:l}=await g.auth.signInWithPassword({email:n,password:r});if(a.textContent="Se connecter",a.disabled=!1,l){o.textContent=l.message.includes("Invalid")?"Email ou mot de passe incorrect.":l.message;return}window.location.reload()}),document.getElementById("login-password").addEventListener("keydown",n=>{n.key==="Enter"&&document.getElementById("login-btn").click()}),document.getElementById("reg-btn").addEventListener("click",async()=>{const n=document.getElementById("reg-email").value.trim(),r=document.getElementById("reg-password").value,o=document.getElementById("reg-confirm").value,a=document.getElementById("reg-error");if(a.textContent="",!n||!r||!o){a.textContent="Remplissez tous les champs.";return}if(r.length<6){a.textContent="Mot de passe trop court (min. 6 caractères).";return}if(r!==o){a.textContent="Les mots de passe ne correspondent pas.";return}const l=document.getElementById("reg-btn");l.textContent="Création…",l.disabled=!0;const{error:s}=await g.auth.signUp({email:n,password:r});if(l.textContent="Créer mon compte",l.disabled=!1,s){a.textContent=s.message;return}i("Compte créé ! Connectez-vous.","success",4e3),document.querySelector('[data-tab="login"]').click(),document.getElementById("login-email").value=n})}function He(t,{state:e,navigate:i,toast:n,refreshProfile:r}){let o="#1A6B3C",a="#D4A017";t.innerHTML=`
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

        <div class="club-logo-preview" id="logo-preview" style="background:${a};border-color:${o}">
          <span id="logo-initials" style="color:${o}">MW</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="color-swatch" id="swatch1" style="background:${o};width:40px;height:40px;border-radius:50%;border:2px solid #ddd;cursor:pointer"></div>
            <div style="flex:1">
              <label style="font-size:12px">Couleur du contour</label>
              <input type="color" id="color1" value="${o}" style="width:100%;height:36px;padding:2px;border-radius:6px">
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
  `;function l(){var k;const d=document.getElementById("logo-preview"),c=document.getElementById("logo-initials"),f=((k=document.getElementById("setup-club"))==null?void 0:k.value)||"MW",v=f.trim().split(" ").filter(Boolean),u=v.length>=2?(v[0][0]+v[1][0]).toUpperCase():f.slice(0,2).toUpperCase();d&&(d.style.background=a,d.style.borderColor=o),c&&(c.textContent=u,c.style.color=o)}document.getElementById("color1").addEventListener("input",d=>{o=d.target.value,document.getElementById("swatch1").style.background=o,l()}),document.getElementById("color2").addEventListener("input",d=>{a=d.target.value,document.getElementById("swatch2").style.background=a,l()});function s(d){document.querySelectorAll(".setup-step").forEach(c=>c.classList.remove("active")),document.getElementById(`step-${d}`).classList.add("active"),document.getElementById("step-num").textContent=d,document.getElementById("progress-fill").style.width=`${Math.round(d/3*100)}%`,d===3&&l()}document.getElementById("step1-next").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("step1-error");if(c.textContent="",d.length<3){c.textContent="Pseudo trop court (min. 3 caractères).";return}const{data:f}=await g.from("users").select("id").eq("pseudo",d).maybeSingle();if(f){c.textContent="Ce pseudo est déjà pris.";return}s(2)}),document.getElementById("step2-back").addEventListener("click",()=>s(1)),document.getElementById("step2-next").addEventListener("click",async()=>{const d=document.getElementById("setup-club").value.trim(),c=document.getElementById("step2-error");if(c.textContent="",d.length<2){c.textContent="Nom trop court (min. 2 caractères).";return}const{data:f}=await g.from("users").select("id").eq("club_name",d).maybeSingle();if(f){c.textContent="Ce nom de club est déjà pris.";return}s(3)}),document.getElementById("step3-back").addEventListener("click",()=>s(2)),document.getElementById("step3-finish").addEventListener("click",async()=>{const d=document.getElementById("setup-pseudo").value.trim(),c=document.getElementById("setup-club").value.trim(),f=document.getElementById("step3-error"),v=document.getElementById("step3-finish");f.textContent="",v.disabled=!0,v.textContent="Création en cours…";try{const{error:u}=await g.from("users").insert({id:e.user.id,pseudo:d,club_name:c,club_color1:o,club_color2:a,credits:1e4});if(u)throw u;await Ue(e.user.id),await r(),n(`Bienvenue ${d} ! Tes récompenses de démarrage sont prêtes.`,"success",5e3),window.location.reload()}catch(u){f.textContent=u.message,v.disabled=!1,v.textContent="🚀 Créer mon profil !"}})}async function Ue(t){const{data:e}=await g.from("players").select("id,job,firstname,surname_encoded,country_code,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price").eq("is_active",!0);if(!e||e.length===0)return;const i=e,n=i.filter(s=>s.job==="GK"),r=i.filter(s=>s.job!=="GK"),o=[];for(let s=0;s<5;s++){let d=[];if(s===0&&n.length>0){const c=n[Math.floor(Math.random()*n.length)];d.push(c);const f=fe([...r]).slice(0,3);d.push(...f)}else d=fe([...i]).slice(0,4);d.forEach(c=>{o.push({owner_id:t,player_id:c.id,card_type:"player"})})}["Ressusciter","Double attaque","Bouclier"].forEach(s=>{o.push({owner_id:t,card_type:"game_changer",gc_type:s})});const l=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];o.push({owner_id:t,card_type:"formation",formation:l[Math.floor(Math.random()*l.length)]}),o.length>0&&await g.from("cards").insert(o),await g.from("users").update({first_booster_opened:!0}).eq("id",t)}function fe(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}async function ve(t,{state:e,navigate:i,toast:n}){const r=e.profile;if(!r)return;const{data:o}=await g.from("matches").select("id,home_score,away_score,status,mode,winner_id,created_at").or(`home_id.eq.${r.id},away_id.eq.${r.id}`).eq("status","finished").order("created_at",{ascending:!1}).limit(3),a=(r.club_name||"MW").split(" ").filter(Boolean),l=a.length>=2?(a[0][0]+a[1][0]).toUpperCase():(r.club_name||"MW").slice(0,2).toUpperCase();t.innerHTML=`
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
      ${o&&o.length>0?`
      <div>
        <div class="section-title">⚽ Derniers matchs</div>
        <div class="card-panel" style="padding:0">
          ${o.map(s=>{const d=s.winner_id===r.id,c=s.home_score===s.away_score,f=c?"N":d?"V":"D",v=c?"#888":d?"#1A6B3C":"#c0392b",u={vs_ai_easy:"IA Facile",vs_ai_medium:"IA Moyen",vs_ai_hard:"IA Difficile",vs_ai_club:"IA Club",friend_challenge:"Défi ami",championship:"Championnat"}[s.mode]||s.mode,_=new Date(s.created_at).toLocaleDateString("fr",{month:"short",day:"numeric"});return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--gray-200)">
              <div>
                <div style="font-size:13px;font-weight:600">${u}</div>
                <div style="font-size:11px;color:var(--gray-600)">${_}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px;font-weight:700">${s.home_score} - ${s.away_score}</span>
                <span style="background:${v};color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900">${f}</span>
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
  `,t.querySelectorAll("[data-nav]").forEach(s=>{s.addEventListener("click",d=>{d.preventDefault(),i(s.dataset.nav)})}),t.querySelectorAll("[data-action]").forEach(s=>{s.addEventListener("click",()=>{const d=s.dataset.action;if(d==="championship"){n("Championnats — bientôt disponibles","info");return}if(d==="match-random"){n("Matchmaking aléatoire — bientôt disponible","info");return}if(d==="match-friend"){n("Défi ami — bientôt disponible","info");return}d==="match-ai"&&We(i)})}),document.getElementById("logout-btn").addEventListener("click",async()=>{await g.auth.signOut(),window.location.reload()})}function We(t){const e=[{mode:"vs_ai_easy",label:"Facile",sub:"Gain 500 cr.",icon:"🟢"},{mode:"vs_ai_medium",label:"Moyen",sub:"Gain 1 000 cr.",icon:"🟡"},{mode:"vs_ai_hard",label:"Difficile",sub:"Gain 1 500 cr.",icon:"🟠"},{mode:"vs_ai_club",label:"Club",sub:"Gain 2 500 cr.",icon:"🔴"}],i=document.createElement("div");i.className="modal-overlay",i.style.zIndex="2000",i.innerHTML=`
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
  `,document.body.appendChild(i);const n=()=>i.remove();document.getElementById("diff-cancel").addEventListener("click",n),i.addEventListener("click",r=>{r.target===i&&n()}),i.querySelectorAll("[data-mode]").forEach(r=>{r.addEventListener("click",()=>{n(),t("match",{matchMode:r.dataset.mode})})})}const oe={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé pour ce match."},"Double attaque":{icon:"⚡",desc:"La note d'attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la note d'un joueur adverse."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function T(t,e){if(!t)return 0;switch(e){case"GK":return Number(t.note_g)||0;case"DEF":return Number(t.note_d)||0;case"MIL":return Number(t.note_m)||0;case"ATT":return Number(t.note_a)||0;default:return 0}}const me=["ATT","MIL","DEF","GK"];function Ee(t){let e=0;const i=t.length;for(let n=0;n<i;n++)for(let r=n+1;r<i;r++){const o=t[n],a=t[r];if(!o||!a)continue;const l=o._col!==void 0&&a._col!==void 0&&o._col===a._col,s=o._col!==void 0&&a._col!==void 0&&Math.abs(o._col-a._col)===1,d=me.indexOf(o._line),c=me.indexOf(a._line),f=Math.abs(d-c)===1;(o._line===a._line&&s||l&&f)&&(o.country_code&&a.country_code&&o.country_code===a.country_code&&e++,o.club_id&&a.club_id&&o.club_id===a.club_id&&e++)}return e}function ne(t,e={}){const i=t.reduce((o,a)=>o+T(a,"ATT"),0),n=Ee(t);let r=i+n;return e.doubleAttack&&(r*=2),e.stolenNote&&(r-=e.stolenNote),{base:i,links:n,total:Math.max(0,r)}}function se(t,e={}){const i=t.reduce((o,a)=>o+(a._line==="GK"||a.job==="GK"?T(a,"GK"):T(a,"DEF")),0),n=Ee(t);let r=i+n;return e.stolenNote&&(r-=e.stolenNote),{base:i,links:n,total:Math.max(0,r)}}function Ae(t,e,i={}){return i.shield?{goal:!1,shielded:!0}:{goal:t>e,shielded:!1}}function Ie(t,e,i="easy"){const n=t.filter(a=>!a.used);if(!n.length)return[];const r=[...n].sort((a,l)=>{const s=e==="attack"?T(a,"ATT"):a._line==="GK"?T(a,"GK"):T(a,"DEF");return(e==="attack"?T(l,"ATT"):l._line==="GK"?T(l,"GK"):T(l,"DEF"))-s});let o=i==="easy"?1+Math.floor(Math.random()*2):i==="medium"?2+Math.floor(Math.random()*2):3;return r.slice(0,Math.min(o,r.length,3))}function Ve(t,e){const i={vs_ai_easy:{victoire:500,nul:250,defaite:50},vs_ai_medium:{victoire:1e3,nul:500,defaite:50},vs_ai_hard:{victoire:1500,nul:750,defaite:100},vs_ai_club:{victoire:2500,nul:1250,defaite:100}};return(i[t]||i.vs_ai_easy)[e]||0}const Te={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"},Y={GK:"#111111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},ye=["GK","DEF","MIL","ATT"],Ye=["Tous","GK","DEF","MIL","ATT"],Je={normal:1e3,pepite:5e3,papyte:5e3,legende:1e4},Le={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL",NG:"NIGERIA",DK:"DANEMARK",NL:"PAYS-BAS",BE:"BELGIQUE",CI:"CÔTE D'IVOIRE",AL:"ALBANIE",HR:"CROATIE",RS:"SERBIE",TR:"TURQUIE"};function Ce(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function J(t,e){return t&&Number(e==="GK"?t.note_g:e==="DEF"?t.note_d:e==="MIL"?t.note_m:t.note_a)||0}function Xe(t,e=""){var f,v;const i=t.player;if(!i)return"";const n=i.job||"ATT",r=Y[n],o=Te[i.rarity]||"#ccc",a=J(i,n),l=i.job2?J(i,i.job2):null,s=i.job2?Y[i.job2]:null,d=Ce(i),c=Le[i.country_code]||i.country_code||"";return`
  <div style="
    width:140px;border-radius:12px;padding:6px;
    background:${o};cursor:pointer;flex-shrink:0;position:relative
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
            fill="white" font-family="Arial Black,Arial">${a}</text>
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
        ${(f=i.clubs)!=null&&f.logo_url?`<img src="${i.clubs.logo_url}" style="width:22px;height:18px;object-fit:contain;flex-shrink:0">`:`<div style="background:#1a3a7a;color:#fff;border-radius:3px;padding:1px 4px;font-size:6px;font-weight:800;flex-shrink:0">${(((v=i.clubs)==null?void 0:v.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>
  </div>`}async function Qe(t,e){const{state:i,navigate:n,toast:r,openModal:o,closeModal:a}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:l}=await g.from("cards").select(`id, card_type, current_note, gc_type, formation, is_for_sale, sale_price,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, note_min, note_max, skin, hair, hair_length, sell_price,
        clubs(encoded_name, logo_url))`).eq("owner_id",i.profile.id),s=(l||[]).filter(p=>p.card_type==="player"&&p.player),d=(l||[]).filter(p=>p.card_type==="game_changer"),c=(l||[]).filter(p=>p.card_type==="formation"),f={};s.forEach(p=>{const m=p.player.id;f[m]=(f[m]||0)+1});let v="Tous",u="";function k(){return[...s].sort((p,m)=>{const x=ye.indexOf(p.player.job),w=ye.indexOf(m.player.job);return x!==w?x-w:(p.player.surname_encoded||"").localeCompare(m.player.surname_encoded||"")})}function _(){return k().filter(p=>{const m=p.player,x=v==="Tous"||m.job===v,w=!u||`${m.firstname} ${m.surname_encoded}`.toLowerCase().includes(u);return x&&w})}t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Ma collection</h2>
      <p>${s.length} carte(s) joueur · ${d.length} Game Changer · ${c.length} Formation</p>
    </div>

    <!-- Cartes spéciales (cliquables) -->
    ${d.length>0||c.length>0?`
    <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200)">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Cartes spéciales</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">

        ${d.map(p=>{var m;return`
          <div data-gc-id="${p.id}" data-gc-type="${p.gc_type}" style="
            background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:2px solid #9b59b6;
            border-radius:12px;padding:12px;color:#fff;min-width:120px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px">
            <div style="font-size:28px">${((m=oe[p.gc_type])==null?void 0:m.icon)||"⚡"}</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">GAME CHANGER</div>
            <div style="font-weight:700;font-size:13px">${p.gc_type}</div>
          </div>`}).join("")}

        ${c.map(p=>`
          <div data-form-id="${p.id}" data-formation="${p.formation}" style="
            background:linear-gradient(135deg,#1A6B3C,#2a8f52);border:2px solid #2a8f52;
            border-radius:12px;padding:12px;color:#fff;min-width:100px;flex-shrink:0;cursor:pointer;
            display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            <div style="font-size:28px">🏟️</div>
            <div style="font-size:8px;background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:10px;width:fit-content;letter-spacing:.4px">FORMATION</div>
            <div style="font-weight:900;font-size:18px">${p.formation}</div>
          </div>`).join("")}

      </div>
    </div>`:""}

    <!-- Filtres -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;flex-direction:column;gap:8px">
      <input id="col-search" placeholder="🔍 Rechercher un joueur..." style="font-size:13px">
      <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
        ${Ye.map(p=>`
          <button class="filter-btn" data-job="${p}"
            style="flex-shrink:0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
              border:1.5px solid ${p===v?"var(--green)":"var(--gray-200)"};
              background:${p===v?"var(--green)":"#fff"};
              color:${p===v?"#fff":"var(--gray-600)"}">
            ${p}
          </button>`).join("")}
      </div>
    </div>

    <!-- Grille cartes joueurs -->
    <div class="page-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start" id="col-grid"></div>
    </div>
  </div>`;function y(){const p=_(),m=document.getElementById("col-grid");if(!m)return;if(!p.length){m.innerHTML='<div style="width:100%;text-align:center;padding:40px;color:var(--gray-600)">Aucune carte.<br><small>Ouvre des boosters !</small></div>';return}const x={},w=[];p.forEach(b=>{const h=b.player.id;x[h]||(x[h]=!0,w.push(b))}),m.innerHTML=w.map(b=>{const h=f[b.player.id]||1,$=h>1?`<div style="position:absolute;top:4px;right:4px;background:#1A6B3C;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;z-index:3">×${h}</div>`:"",B=s.filter(I=>I.player.id===b.player.id&&I.is_for_sale).length>0?'<div style="position:absolute;top:4px;left:4px;background:#D4A017;color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 5px;z-index:3">🏷️</div>':"";return Xe(b,$+B)}).join(""),m.querySelectorAll("[data-card-id]").forEach(b=>{b.addEventListener("click",()=>{const h=s.find($=>$.id===b.dataset.cardId);h&&tt(h,s,f,e)})})}y(),t.querySelectorAll(".filter-btn").forEach(p=>{p.addEventListener("click",()=>{v=p.dataset.job,t.querySelectorAll(".filter-btn").forEach(m=>{const x=m.dataset.job===v;m.style.background=x?"var(--green)":"#fff",m.style.color=x?"#fff":"var(--gray-600)",m.style.borderColor=x?"var(--green)":"var(--gray-200)"}),y()})}),document.getElementById("col-search").addEventListener("input",p=>{u=p.target.value.toLowerCase(),y()}),t.querySelectorAll("[data-gc-id]").forEach(p=>{p.addEventListener("click",()=>Ze(p.dataset.gcType,o))}),t.querySelectorAll("[data-form-id]").forEach(p=>{p.addEventListener("click",()=>et(p.dataset.formation,o))})}function Ze(t,e){const i=oe[t]||{icon:"⚡",desc:"Effet spécial."};e("Game Changer",`<div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:8px">
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
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function et(t,e){const i={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},n={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},r=i[t]||i["4-4-2"],o=["ATT","MIL","DEF","GK"];function a(d,c){const k=(d-1)*54,_=(c-k)/2;return Array.from({length:d},(y,p)=>_+p*54)}function l(d){return d===1?[1]:d===2?[0,2]:d===3?[0,1,2]:d===4?[0,1,1,2]:d===5?[0,1,1,1,2]:[1]}function s(){const v=o.length*72+48,u=o.map((p,m)=>24+m*72+72/2),k={};o.forEach(p=>{k[p]=a(r[p],290)});function _(p,m){const x=r[p],w=l(x),b=k[p],h=w.indexOf(m);return h>=0?b[h]:null}let y=`<svg width="290" height="${v}" viewBox="0 0 290 ${v}" xmlns="http://www.w3.org/2000/svg">`;o.forEach((p,m)=>{const x=k[p];for(let w=0;w<x.length-1;w++){const b=x[w]+20,h=x[w+1]-20,$=u[m];y+=`<line x1="${b}" y1="${$}" x2="${h}" y2="${$}"
          stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,y+=`<text x="${(b+h)/2}" y="${$-6}" text-anchor="middle"
          font-size="8" fill="rgba(255,255,255,0.45)">↔</text>`}});for(let p=0;p<3;p++)for(let m=0;m<o.length-1;m++){const x=o[m],w=o[m+1],b=_(x,p),h=_(w,p);if(b!==null&&h!==null){const $=(b+h)/2;y+=`<line x1="${b}" y1="${u[m]+20}" x2="${h}" y2="${u[m+1]-20}"
            stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="4,3"/>`,y+=`<text x="${$+6}" y="${(u[m]+u[m+1])/2+3}"
            font-size="8" fill="rgba(255,255,255,0.45)">↕</text>`}}return o.forEach((p,m)=>{const x=r[p],w=k[p],b=l(x),h=n[p],$=u[m],C={};b.forEach((B,I)=>{C[B]||(C[B]={xs:[],indices:[]}),C[B].xs.push(w[I]),C[B].indices.push(I)}),Object.entries(C).forEach(([B,I])=>{const A=I.xs.length;if(A>1){const E=I.xs.reduce((M,S)=>M+S,0)/A;y+=`<circle cx="${E}" cy="${$}" r="20" fill="${h}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,y+=`<text x="${E}" y="${$-4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${p}</text>`,y+=`<text x="${E}" y="${$+9}" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.85)">×${A}</text>`}else{const E=I.xs[0],M=I.indices[0]+1;y+=`<circle cx="${E}" cy="${$}" r="20" fill="${h}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`,y+=`<text x="${E}" y="${$+4}" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${p}</text>`,y+=`<text x="${E}" y="${$+30}" text-anchor="middle" font-size="7" fill="rgba(255,255,255,0.4)">${p}${M}</text>`}})}),y+="</svg>",y}e(`Formation ${t}`,`<div style="background:linear-gradient(180deg,#1a6b3c,#0a3d1e);border-radius:12px;padding:16px;margin-bottom:14px;overflow-x:auto;text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:10px">SCHÉMA DES POSTES ET LIENS</div>
      ${s()}
    </div>
    <div style="background:#f0f8f0;border-radius:10px;padding:12px 14px">
      <div style="font-size:12px;font-weight:700;color:#1A6B3C;margin-bottom:4px">📌 Liens (GDD §7)</div>
      <div style="font-size:12px;color:#333;line-height:1.6">
        Deux joueurs <b>adjacents</b> (↔ horizontal ou ↕ vertical) partageant le même <b>pays</b> ou le même <b>club</b> donnent <b>+1</b> à l'action.
      </div>
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}function tt(t,e,i,n){var h,$,C,B,I,A;const{state:r,toast:o,openModal:a,closeModal:l,navigate:s,refreshProfile:d}=n,c=t.player,f=e.filter(E=>E.player.id===c.id),v=f.length,u=Je[c.rarity]||1e3,k=c.rarity!=="legende",_=Ce(c),y=J(c,c.job),p=c.job2?J(c,c.job2):null,m=Y[c.job]||"#1A6B3C",x=c.job2?Y[c.job2]:null,w=Te[c.rarity]||"#ccc",b=Le[c.country_code]||c.country_code||"";a(`${c.firstname} ${c.surname_encoded}`,`<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">

      <!-- Carte visuelle -->
      <div style="width:140px;border-radius:12px;padding:6px;background:${w};flex-shrink:0">
        <div style="background:#f2e8d2;border-radius:8px;overflow:hidden;display:flex;flex-direction:column">
          <div style="padding:5px 6px 2px;text-align:center">
            <div style="font-size:8px;letter-spacing:1.2px;text-transform:uppercase;color:#666">${c.firstname}</div>
            <div style="font-size:14px;font-weight:900;color:#111;font-family:Arial Black,Arial;line-height:1.1">${(c.surname_encoded||"").toUpperCase()}</div>
          </div>
          <div style="position:relative;height:80px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
            <div style="position:absolute;top:16px;width:100%;height:28px;background:${m}"></div>
            <svg width="54" height="52" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
              <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${m}" stroke="white" stroke-width="2.5"/>
              <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${y}</text>
            </svg>
            ${p!==null?`
            <svg width="32" height="31" viewBox="0 0 32 31" style="position:absolute;top:50px;z-index:2;display:block">
              <polygon points="16,2 19.5,11 30,11 22,17.5 25,27 16,21.5 7,27 10,17.5 2,11 12.5,11" fill="${x}" stroke="white" stroke-width="1.5"/>
              <text x="16" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial Black,Arial">${p}</text>
            </svg>`:""}
          </div>
          <div style="height:110px;overflow:hidden;background:#b8d4f0">
            ${_?`<img src="${_}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"
                   onerror="this.parentElement.innerHTML='<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be'>👤</div>'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;color:#8fa5be">👤</div>'}
          </div>
          <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;min-height:24px">
            <img src="https://flagsapi.com/${c.country_code}/flat/32.png" style="width:20px;height:13px;object-fit:cover;border-radius:2px" onerror="this.style.display='none'">
            <div style="font-size:7px;text-transform:uppercase;color:#555">${b}</div>
            ${(h=c.clubs)!=null&&h.logo_url?`<img src="${c.clubs.logo_url}" style="width:22px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:800">${((($=c.clubs)==null?void 0:$.encoded_name)||"").slice(0,6)}</div>`}
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
          <div style="font-weight:700;font-size:18px">×${v}</div>
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
          <div style="font-size:11px;color:var(--gray-600);margin-top:2px">Il vous restera ×${v-1} carte${v-1>1?"s":""}</div>
        </div>
        <button class="btn btn-yellow" id="direct-sell-btn" ${v<=0?"disabled":""}>
          Vendre 1 carte
        </button>
      </div>
    </div>

    <!-- Marché (optionnel) -->
    ${k&&!t.is_for_sale?`
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
    </div>`:""}`,'<button class="btn btn-ghost" id="close-detail">Fermer</button>'),(C=document.getElementById("close-detail"))==null||C.addEventListener("click",l),(B=document.getElementById("direct-sell-btn"))==null||B.addEventListener("click",async()=>{if(!confirm(`Vendre 1 carte ${c.surname_encoded} pour ${u.toLocaleString("fr")} crédits ? Cette action est irréversible.`))return;const E=f.find(S=>!S.is_for_sale)||f[0];if(!E){o("Aucune carte à vendre","error");return}const{error:M}=await g.from("cards").delete().eq("id",E.id);if(M){o(M.message,"error");return}await g.from("users").update({credits:(r.profile.credits||0)+u}).eq("id",r.profile.id),await d(),o(`+${u.toLocaleString("fr")} crédits ! Carte vendue.`,"success"),l(),s("collection")}),(I=document.getElementById("market-sell-btn"))==null||I.addEventListener("click",async()=>{const E=parseInt(document.getElementById("sell-price").value);if(!E||E<1){o("Prix invalide","error");return}await g.from("cards").update({is_for_sale:!0,sale_price:E}).eq("id",t.id),await g.from("market_listings").insert({seller_id:r.profile.id,card_id:t.id,price:E}),o("Carte mise en vente sur le marché !","success"),l(),s("collection")}),(A=document.getElementById("cancel-sell-btn"))==null||A.addEventListener("click",async()=>{await g.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",t.id),await g.from("market_listings").update({status:"cancelled"}).eq("card_id",t.id).eq("status","active"),o("Annonce retirée","success"),l(),s("collection")})}const F={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},q={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function ae(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}async function Be(t,e){const{state:i,navigate:n,toast:r}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:o}=await g.from("decks").select("id,name,formation_card_id,is_active").eq("owner_id",i.profile.id).order("created_at",{ascending:!1});t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>Mes decks</h2>
      <p>${(o==null?void 0:o.length)||0} deck(s) · 11 titulaires + 5 remplaçants max</p>
    </div>
    <div class="page-body">
      <div style="display:grid;gap:10px">
        ${(o==null?void 0:o.length)>0?o.map(a=>`
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
  </div>`,document.getElementById("new-deck-btn").addEventListener("click",async()=>{const a=prompt("Nom du deck :",`Deck ${((o==null?void 0:o.length)||0)+1}`);if(!a)return;const{data:l,error:s}=await g.from("decks").insert({owner_id:i.profile.id,name:a,is_active:!(o!=null&&o.length)}).select().single();if(s){r(s.message,"error");return}r("Deck créé !","success"),ge(l.id,t,e)}),t.querySelectorAll("[data-edit]").forEach(a=>{a.addEventListener("click",()=>ge(a.dataset.edit,t,e))}),t.querySelectorAll("[data-activate]").forEach(a=>{a.addEventListener("click",async()=>{await g.from("decks").update({is_active:!1}).eq("owner_id",i.profile.id),await g.from("decks").update({is_active:!0}).eq("id",a.dataset.activate),r("Deck activé !","success"),Be(t,e)})})}async function ge(t,e,i){const{state:n,toast:r}=i;e.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:o}=await g.from("decks").select("*").eq("id",t).single(),{data:a}=await g.from("cards").select(`id, card_type, formation,
      player:players(id, firstname, surname_encoded, country_code, club_id, job, job2,
        note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length,
        clubs(encoded_name, logo_url))`).eq("owner_id",n.profile.id),l=(a||[]).filter(u=>u.card_type==="player"&&u.player),s=(a||[]).filter(u=>u.card_type==="formation"),d=s.map(u=>u.formation).filter(Boolean),{data:c}=await g.from("deck_cards").select("card_id, position, is_starter, slot_order").eq("deck_id",t);let f=o.formation||"4-4-2";d.length>0&&!d.includes(f)&&(f=d[0]);const v={deckId:t,name:o.name,formation:f,formationCardId:o.formation_card_id,slots:{},subs:[],playerCards:l,formationCards:s,availableFormations:d};(c||[]).forEach(u=>{u.is_starter?v.slots[u.position]=u.card_id:v.subs.includes(u.card_id)||v.subs.push(u.card_id)}),O(e,v,i)}function O(t,e,i){var s;const{navigate:n}=i;F[e.formation];const r=he(e.formation),o=r.filter(d=>e.slots[d]).length,a=e.availableFormations.length>0?e.availableFormations:Object.keys(F),l=e.subs.map(d=>e.playerCards.find(c=>c.id===d)).filter(Boolean);[...Object.values(e.slots),...e.subs],t.innerHTML=`
  <div class="page">
    <div class="page-header" style="display:flex;align-items:center;gap:10px">
      <button class="btn-icon" id="builder-back" style="font-size:20px">←</button>
      <div style="flex:1">
        <h2 style="font-size:18px">${e.name}</h2>
        <p>${o}/11 titulaires · ${e.subs.length}/5 remplaçants</p>
      </div>
    </div>

    <!-- Formation (uniquement les cartes possédées) -->
    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200)">
      <label style="font-size:11px;margin-bottom:4px;display:block">Formation ${e.availableFormations.length===0?"(aucune carte — toutes disponibles)":""}</label>
      <select id="formation-select" style="width:100%;padding:7px;border-radius:6px;border:1.5px solid var(--gray-200)">
        ${a.map(d=>`<option value="${d}" ${d===e.formation?"selected":""}>${d}</option>`).join("")}
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
      <button class="btn btn-primary" id="save-deck" style="width:100%" ${o<11?"disabled":""}>
        ${o<11?`Placez encore ${11-o} joueur(s)`:"💾 Enregistrer le deck"}
      </button>
    </div>
  </div>`,it(t,e,r,i),document.getElementById("builder-back").addEventListener("click",()=>n("decks")),document.getElementById("formation-select").addEventListener("change",d=>{e.formation=d.target.value;const c=he(e.formation),f={};c.forEach(v=>{e.slots[v]&&(f[v]=e.slots[v])}),e.slots=f,O(t,e,i)}),document.getElementById("save-deck").addEventListener("click",()=>st(e,i)),t.querySelectorAll("[data-remove-sub]").forEach(d=>{d.addEventListener("click",()=>{e.subs=e.subs.filter(c=>c!==d.dataset.removeSub),O(t,e,i)})}),(s=document.getElementById("add-sub-btn"))==null||s.addEventListener("click",()=>{nt(e,t,i)})}function it(t,e,i,n){const r=document.getElementById("deck-field");if(!r)return;const a=["ATT","MIL","DEF","GK"].map(p=>i.filter(m=>m.startsWith(p))),l=F[e.formation]||F["4-4-2"];function s(p){return p===1?[1]:p===2?[0,2]:p===3?[0,1,2]:p===4?[0,1,1,2]:p===5?[0,1,1,1,2]:[1]}function d(p){const m=e.slots[p];if(!m)return null;const x=e.playerCards.find(w=>w.id===m);return(x==null?void 0:x.player)||null}function c(p,m){if(!p||!m)return"#333";const x=p.country_code&&m.country_code&&p.country_code===m.country_code,w=p.club_id&&m.club_id&&p.club_id===m.club_id;return x&&w?"#1A6B3C":x||w?"#D4A017":"#333"}function f(p,m){return p&&Number(m==="GK"?p.note_g:m==="DEF"?p.note_d:m==="MIL"?p.note_m:p.note_a)||0}function v(p){var b;const m=((b=p[0])==null?void 0:b.replace(/\d+/,""))||"ATT";let x=0,w=0;p.forEach(h=>{x+=f(d(h),m)});for(let h=0;h<p.length-1;h++)c(d(p[h]),d(p[h+1]))!=="#333"&&w++;return{total:x,linkBonus:w}}const u=60,k=60,_=14;r.innerHTML=`<div id="deck-terrain" style="position:relative;display:inline-block;width:100%">
    <div id="deck-rows" style="display:flex;flex-direction:column;gap:0;align-items:center;padding:8px 0"></div>
    <svg id="deck-links-svg" style="position:absolute;inset:0;pointer-events:none;overflow:visible" width="100%" height="100%"></svg>
  </div>`;const y=document.getElementById("deck-rows");a.forEach((p,m)=>{var C;const x=((C=p[0])==null?void 0:C.replace(/\d+/,""))||"ATT",{total:w,linkBonus:b}=v(p),h=document.createElement("div");h.style.cssText="display:flex;align-items:center;justify-content:center;gap:0;position:relative",h.dataset.lineIdx=m,p.forEach((B,I)=>{const A=d(B),E=q[x],M=A?f(A,x):null,S=A?ae(A):null,j=document.createElement("div");if(j.className=A?"formation-slot filled":"formation-slot",j.dataset.pos=B,j.dataset.lineIdx=m,j.dataset.slotIdx=I,j.style.cssText=`
        border-color:${A?E:"rgba(255,255,255,0.4)"};
        background:${A?E:"transparent"};
        cursor:pointer;position:relative;
        width:${u}px;height:${k}px;flex-shrink:0;
      `,A&&S){const D=document.createElement("img");D.src=S,D.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:6px;opacity:0.75",j.appendChild(D)}if(A?j.innerHTML+=`
          <div style="position:relative;z-index:1;font-size:16px;font-weight:900;color:#fff;text-shadow:0 1px 3px #0008;line-height:1">${M}</div>
          <div style="position:relative;z-index:1;font-size:7px;color:#fff;text-shadow:0 1px 2px #0008;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px">${A.surname_encoded}</div>
        `:j.innerHTML=`
          <div style="font-size:9px;color:rgba(255,255,255,0.7)">${x}</div>
          <div style="font-size:18px;color:rgba(255,255,255,0.5)">+</div>
        `,h.appendChild(j),I<p.length-1){const D=d(p[I+1]),R=c(A,D),H=document.createElement("div");H.style.cssText=`
          width:${_}px;height:4px;border-radius:2px;
          background:${R};flex-shrink:0;
          box-shadow:0 0 4px ${R==="#333"?"none":R};
          opacity:${R==="#333"?"0.4":"0.95"};
        `,h.appendChild(H)}}),y.appendChild(h);const $=document.createElement("div");$.style.cssText="text-align:center;color:rgba(255,255,255,0.7);font-size:10px;margin:2px 0 6px",$.innerHTML=`<span style="font-weight:700;color:#fff">${w}</span>
      ${b>0?`<span style="color:#D4A017">(+${b} lien${b>1?"s":""})</span>`:""}`,y.appendChild($)}),requestAnimationFrame(()=>{var w,b;const p=document.getElementById("deck-links-svg"),m=document.getElementById("deck-terrain");if(!p||!m)return;const x=m.getBoundingClientRect();p.setAttribute("height",x.height);for(let h=0;h<a.length-1;h++){const $=a[h],C=a[h+1],B=((w=$[0])==null?void 0:w.replace(/\d+/,""))||"ATT",I=((b=C[0])==null?void 0:b.replace(/\d+/,""))||"DEF",A=s(l[B]||1),E=s(l[I]||1);for(let M=0;M<=2;M++){const S=A.indexOf(M),j=E.indexOf(M);if(S===-1||j===-1)continue;const D=$[S],R=C[j];if(!D||!R)continue;const H=d(D),Fe=d(R),le=c(H,Fe),ce=r.querySelector(`[data-pos="${D}"]`),pe=r.querySelector(`[data-pos="${R}"]`);if(!ce||!pe)continue;const U=ce.getBoundingClientRect(),X=pe.getBoundingClientRect(),W=x,Oe=U.left-W.left+U.width/2,Ne=U.top-W.top+U.height,Pe=X.left-W.left+X.width/2,Ke=X.top-W.top,G=document.createElementNS("http://www.w3.org/2000/svg","line");G.setAttribute("x1",Oe),G.setAttribute("y1",Ne),G.setAttribute("x2",Pe),G.setAttribute("y2",Ke),G.setAttribute("stroke",le),G.setAttribute("stroke-width","4"),G.setAttribute("stroke-linecap","round"),G.setAttribute("opacity",le==="#333"?"0.35":"0.9"),p.appendChild(G)}}}),r.querySelectorAll(".formation-slot").forEach(p=>{p.addEventListener("click",()=>ot(p.dataset.pos,e,t,n))})}function ot(t,e,i,n){var v,u,k;const{openModal:r,closeModal:o}=n,a=t.replace(/\d+/,""),l=e.slots[t],s=l?e.playerCards.find(_=>_.id===l):null;(v=s==null?void 0:s.player)==null||v.id;const d=new Set;Object.entries(e.slots).forEach(([_,y])=>{var m;if(_===t||!y)return;const p=e.playerCards.find(x=>x.id===y);(m=p==null?void 0:p.player)!=null&&m.id&&d.add(p.player.id)}),e.subs.forEach(_=>{var p;const y=e.playerCards.find(m=>m.id===_);(p=y==null?void 0:y.player)!=null&&p.id&&d.add(y.player.id)});const c=new Set,f=e.playerCards.filter(_=>{const y=_.player;return!(y.job===a||y.job2===a)||d.has(y.id)||c.has(y.id)?!1:(c.add(y.id),!0)});f.sort((_,y)=>{const p=a==="GK"?_.player.note_g:a==="DEF"?_.player.note_d:a==="MIL"?_.player.note_m:_.player.note_a;return(a==="GK"?y.player.note_g:a==="DEF"?y.player.note_d:a==="MIL"?y.player.note_m:y.player.note_a)-p}),r(`Choisir ${a} — ${t}`,`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${e.slots[t]?`
        <button class="btn btn-danger btn-sm" id="remove-player" style="width:100%;margin-bottom:4px">
          ✕ Retirer le joueur actuel
        </button>`:""}
      ${f.length>0?f.map(_=>{var w,b;const y=_.player,p=a==="GK"?y.note_g:a==="DEF"?y.note_d:a==="MIL"?y.note_m:y.note_a,m=ae(y),x={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"}[y.rarity];return`<div class="player-option" data-card-id="${_.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <!-- Portrait -->
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${q[a]}">
            ${m?`<img src="${m}" style="width:100%;height:100%;object-fit:cover">`:`<div style="width:100%;height:100%;background:${q[a]};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${a}</div>`}
          </div>
          <!-- Infos -->
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${y.firstname} ${y.surname_encoded}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
              <img src="https://flagsapi.com/${y.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" alt="${y.country_code}">
              ${(w=y.clubs)!=null&&w.logo_url?`<img src="${y.clubs.logo_url}" style="width:18px;height:18px;object-fit:contain">`:`<span style="font-size:10px;color:var(--gray-600)">${((b=y.clubs)==null?void 0:b.encoded_name)||"—"}</span>`}
              <span style="font-size:10px;color:var(--gray-600)">${y.country_code}</span>
            </div>
          </div>
          <!-- Note -->
          <div style="width:36px;height:36px;border-radius:8px;background:${q[a]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;border:2px solid ${x};flex-shrink:0">
            ${p}
          </div>
        </div>`}).join(""):'<div style="text-align:center;color:var(--gray-600);padding:20px">Aucun joueur pour ce poste.<br><small>Ouvre des boosters !</small></div>'}
    </div>`,'<button class="btn btn-ghost" id="close-selector">Fermer</button>'),(u=document.getElementById("close-selector"))==null||u.addEventListener("click",o),(k=document.getElementById("remove-player"))==null||k.addEventListener("click",()=>{delete e.slots[t],o(),O(i,e,n)}),document.querySelectorAll(".player-option").forEach(_=>{_.addEventListener("click",()=>{e.slots[t]=_.dataset.cardId,o(),O(i,e,n)})})}function nt(t,e,i){var s;const{openModal:n,closeModal:r}=i,o=new Set;Object.values(t.slots).filter(Boolean).forEach(d=>{var f;const c=t.playerCards.find(v=>v.id===d);(f=c==null?void 0:c.player)!=null&&f.id&&o.add(c.player.id)}),t.subs.forEach(d=>{var f;const c=t.playerCards.find(v=>v.id===d);(f=c==null?void 0:c.player)!=null&&f.id&&o.add(c.player.id)});const a=new Set,l=t.playerCards.filter(d=>{var c,f,v;return o.has((c=d.player)==null?void 0:c.id)||a.has((f=d.player)==null?void 0:f.id)?!1:(a.add((v=d.player)==null?void 0:v.id),!0)});n("Ajouter un remplaçant",`<div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px">
      ${l.length>0?l.map(d=>{var u;const c=d.player,f=ae(c),v=c.job==="GK"?c.note_g:c.job==="DEF"?c.note_d:c.job==="MIL"?c.note_m:c.note_a;return`<div class="player-option" data-card-id="${d.id}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:10px;cursor:pointer">
          <div style="width:40px;height:40px;border-radius:8px;overflow:hidden;flex-shrink:0;background:#dde;border:2px solid ${q[c.job]}">
            ${f?`<img src="${f}" style="width:100%;height:100%;object-fit:cover">`:""}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${c.firstname} ${c.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${c.job} · ${c.country_code} · ${((u=c.clubs)==null?void 0:u.encoded_name)||"—"}</div>
          </div>
          <div style="width:32px;height:32px;border-radius:6px;background:${q[c.job]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">
            ${v}
          </div>
        </div>`}).join(""):'<div style="text-align:center;padding:20px;color:var(--gray-600)">Tous vos joueurs sont déjà utilisés.</div>'}
    </div>`,'<button class="btn btn-ghost" id="close-sub-selector">Fermer</button>'),(s=document.getElementById("close-sub-selector"))==null||s.addEventListener("click",r),document.querySelectorAll(".player-option").forEach(d=>{d.addEventListener("click",()=>{t.subs.push(d.dataset.cardId),r(),O(e,t,i)})})}async function st(t,e){const{state:i,toast:n,navigate:r}=e,o=t.formationCards.find(s=>s.formation===t.formation),a=(o==null?void 0:o.id)||t.formationCardId;await g.from("decks").update({formation:t.formation,formation_card_id:a||null}).eq("id",t.deckId),await g.from("deck_cards").delete().eq("deck_id",t.deckId);const l=[];if(Object.entries(t.slots).forEach(([s,d],c)=>{l.push({deck_id:t.deckId,card_id:d,position:s,is_starter:!0,slot_order:c})}),t.subs.forEach((s,d)=>{l.push({deck_id:t.deckId,card_id:s,position:`SUB${d+1}`,is_starter:!1,slot_order:100+d})}),l.length>0){const{error:s}=await g.from("deck_cards").insert(l);if(s){n(s.message,"error");return}}n("Deck enregistré ✅","success"),r("decks")}function he(t){const e=F[t]||F["4-4-2"],i=["GK1"];for(let n=1;n<=e.DEF;n++)i.push(`DEF${n}`);for(let n=1;n<=e.MIL;n++)i.push(`MIL${n}`);for(let n=1;n<=e.ATT;n++)i.push(`ATT${n}`);return i}const be=[{id:"players_std",icon:"⚽",name:"Players",sub:"5 cartes joueurs",cost:5e3,costLabel:"5 000 crédits",cardCount:5,type:"player"},{id:"players_pub",icon:"📺",name:"Players (pub)",sub:"3 cartes joueurs",cost:0,costLabel:"1 pub",cardCount:3,type:"player"},{id:"game_changer",icon:"⚡",name:"Game Changer",sub:"3 cartes spéciales",cost:1e4,costLabel:"10 000 crédits",cardCount:3,type:"game_changer"},{id:"formation",icon:"🏟️",name:"Formation",sub:"1 carte formation",cost:1e4,costLabel:"10 000 crédits",cardCount:1,type:"formation"}],Me={Ressusciter:{icon:"💫",desc:"Réactive un joueur grisé."},"Double attaque":{icon:"⚡",desc:"La prochaine attaque compte double."},Bouclier:{icon:"🛡️",desc:"Annule le prochain but adverse."},"Vol de note":{icon:"🎯",desc:"-1 à la prochaine action IA."},Gel:{icon:"❄️",desc:"Bloque le meilleur attaquant IA."},"Remplacement+":{icon:"🔄",desc:"+1 remplacement pour ce match."}};function at(t){const e="https://fcnwclxlkytdfjotqkta.supabase.co";if(!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}const rt={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"},dt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function lt(t,{state:e,navigate:i,toast:n}){var o;const r=((o=e.profile)==null?void 0:o.credits)||0;t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📦 Boosters</h2>
      <p>Solde : <b>${r.toLocaleString("fr")} crédits</b></p>
    </div>
    <div class="page-body">
      <div class="booster-grid">
        ${be.map(a=>{const l=r>=a.cost||a.cost===0;return`<div class="booster-card ${l?"":"disabled"}" data-booster="${a.id}">
            <div class="icon">${a.icon}</div>
            <div class="name">${a.name}</div>
            <div class="desc">${a.sub}</div>
            <div class="cost">${a.costLabel}</div>
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
  </div>`,t.querySelectorAll(".booster-card:not(.disabled)").forEach(a=>{a.addEventListener("click",async()=>{const l=be.find(s=>s.id===a.dataset.booster);if(l){a.style.opacity="0.5",a.style.pointerEvents="none";try{await ct(l,{state:e,toast:n,navigate:i,container:t})}catch(s){n(s.message,"error"),a.style.opacity="",a.style.pointerEvents=""}}})})}async function ct(t,{state:e,toast:i,navigate:n,container:r}){if(t.cost>0&&e.profile.credits<t.cost){i("Crédits insuffisants","error");return}t.id==="players_pub"&&await yt();let o=[];t.type==="player"?o=await pt(e.profile,t.cardCount,t.cost):t.type==="game_changer"?o=await ut(e.profile,t.cardCount,t.cost):t.type==="formation"&&(o=await ft(e.profile,t.cost));const{data:a}=await g.from("users").select("*").eq("id",e.profile.id).single();a&&(e.profile=a),vt(o,t,n)}async function pt(t,e,i){if(i>0){const{error:s}=await g.from("users").update({credits:t.credits-i}).eq("id",t.id);if(s)throw s}const{data:n}=await g.from("players").select("id,job,firstname,surname_encoded,country_code,club_id,rarity,note_g,note_d,note_m,note_a,note_min,note_max,skin,hair,hair_length,sell_price,clubs(encoded_name,logo_url)").eq("is_active",!0);if(!(n!=null&&n.length))throw new Error("Pas de joueurs en BDD — ajoutes-en via le panel admin !");const r=n.filter(s=>s.job==="GK"),o=n.filter(s=>s.job!=="GK");let a=[];!t.first_booster_opened&&r.length>0?(a.push(r[Math.floor(Math.random()*r.length)]),a.push(...xe([...o]).slice(0,e-1)),await g.from("users").update({first_booster_opened:!0}).eq("id",t.id)):a=xe([...n]).slice(0,e);const{data:l}=await g.from("cards").insert(a.map(s=>({owner_id:t.id,player_id:s.id,card_type:"player"}))).select();return a.map((s,d)=>({...l[d],player:s}))}async function ut(t,e,i){const{error:n}=await g.from("users").update({credits:t.credits-i}).eq("id",t.id);if(n)throw n;const r=Object.keys(Me),o=Array.from({length:e},()=>r[Math.floor(Math.random()*r.length)]),{data:a}=await g.from("cards").insert(o.map(l=>({owner_id:t.id,card_type:"game_changer",gc_type:l}))).select();return a}async function ft(t,e){const{error:i}=await g.from("users").update({credits:t.credits-e}).eq("id",t.id);if(i)throw i;const n=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"],r=n[Math.floor(Math.random()*n.length)],{data:o}=await g.from("cards").insert({owner_id:t.id,card_type:"formation",formation:r}).select();return o}function vt(t,e,i){var a,l;const n=document.createElement("div");n.id="booster-anim-overlay",n.innerHTML=`
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
  `,document.body.appendChild(n);let r=!1;const o=document.getElementById("pack-visual");o.addEventListener("click",()=>{r||(r=!0,o.classList.add("shaking"),setTimeout(()=>{o.classList.remove("shaking"),o.classList.add("pack-open"),setTimeout(()=>{document.getElementById("pack-phase").style.display="none";const s=document.getElementById("cards-phase");s.style.display="flex",s.innerHTML=t.map((d,c)=>`
          <div class="card-flip-wrapper" data-card-idx="${c}">
            <div class="card-flip-inner" id="card-flip-${c}">
              <div class="card-face-back">⚽</div>
              <div class="card-face-front">${mt(d)}</div>
            </div>
          </div>`).join(""),t.forEach((d,c)=>{setTimeout(()=>{var f;(f=document.getElementById(`card-flip-${c}`))==null||f.classList.add("revealed")},c*350+300)}),setTimeout(()=>{document.getElementById("reveal-btns").style.display="flex"},t.length*350+800),s.querySelectorAll(".card-flip-wrapper").forEach(d=>{d.addEventListener("click",()=>{var c;(c=document.getElementById(`card-flip-${d.dataset.cardIdx}`))==null||c.classList.add("revealed")})})},600)},500))}),(a=document.getElementById("reveal-collection"))==null||a.addEventListener("click",()=>{n.remove(),i("collection")}),(l=document.getElementById("reveal-more"))==null||l.addEventListener("click",()=>{n.remove(),i("boosters")})}function mt(t){var e,i;if(t.card_type==="player"&&t.player){const n=t.player,r=n.job||"ATT",o=rt[r]||"#1A6B3C",a=dt[n.rarity]||"#ccc",l=r==="GK"?n.note_g:r==="DEF"?n.note_d:r==="MIL"?n.note_m:n.note_a,s=at(n),d={MA:"MAROC",FR:"FRANCE",AR:"ARGENTINE",PT:"PORTUGAL",BR:"BRESIL",ES:"ESPAGNE",DE:"ALLEMAGNE",GB:"ANGLETERRE",IT:"ITALIE",CM:"CAMEROUN",SN:"SENEGAL"}[n.country_code]||n.country_code;return`<div style="width:140px;height:200px;background:#f2e8d2;border-radius:12px;border:3px solid ${a};overflow:hidden;display:flex;flex-direction:column">
      <!-- Nom -->
      <div style="padding:6px 6px 2px;text-align:center;background:#f2e8d2">
        <div style="font-size:8px;letter-spacing:1px;color:#666;text-transform:uppercase">${n.firstname}</div>
        <div style="font-size:13px;font-weight:900;color:#111;line-height:1.1;font-family:Arial Black,Arial">${(n.surname_encoded||"").toUpperCase()}</div>
      </div>
      <!-- Étoile + bande poste -->
      <div style="position:relative;height:72px;background:#f2e8d2;display:flex;flex-direction:column;align-items:center">
        <div style="position:absolute;top:14px;width:100%;height:26px;background:${o}"></div>
        <svg width="50" height="48" viewBox="0 0 54 52" style="position:absolute;top:4px;z-index:2;display:block">
          <polygon points="27,3 33,18 50,18 37,29 41,47 27,37 13,47 17,29 4,18 21,18" fill="${o}" stroke="white" stroke-width="2.5"/>
          <text x="27" y="33" text-anchor="middle" font-size="16" font-weight="900" fill="white" font-family="Arial Black,Arial">${l||0}</text>
        </svg>
      </div>
      <!-- Portrait -->
      <div style="flex:1;overflow:hidden;background:#b8d4f0">
        ${s?`<img src="${s}" style="width:100%;height:100%;object-fit:cover;object-position:center top" onerror="this.style.display='none'">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:#8fa5be">👤</div>'}
      </div>
      <!-- Footer -->
      <div style="background:#f2e8d2;padding:3px 6px;display:flex;align-items:center;justify-content:space-between;height:26px">
        <img src="https://flagsapi.com/${n.country_code}/flat/32.png" style="width:18px;height:12px;border-radius:2px;object-fit:cover" onerror="this.style.display='none'">
        <div style="font-size:7px;letter-spacing:1px;color:#555;text-transform:uppercase">${d}</div>
        ${(e=n.clubs)!=null&&e.logo_url?`<img src="${n.clubs.logo_url}" style="width:20px;height:16px;object-fit:contain">`:`<div style="background:#1a3a7a;color:#fff;border-radius:2px;padding:1px 3px;font-size:6px;font-weight:700">${(((i=n.clubs)==null?void 0:i.encoded_name)||"").slice(0,6)}</div>`}
      </div>
    </div>`}if(t.card_type==="game_changer"){const n=Me[t.gc_type]||{icon:"⚡",desc:""};return`<div style="width:140px;height:200px;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border-radius:12px;border:3px solid #9b59b6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px">
      <div style="font-size:40px">${n.icon}</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">GAME CHANGER</div>
      <div style="font-weight:700;font-size:13px;color:#fff;text-align:center">${t.gc_type}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.7);text-align:center">${n.desc}</div>
    </div>`}return t.card_type==="formation"?`<div style="width:140px;height:200px;background:linear-gradient(135deg,#1A6B3C,#2a8f52);border-radius:12px;border:3px solid #2a8f52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
      <div style="font-size:40px">🏟️</div>
      <div style="font-size:8px;background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.5px">FORMATION</div>
      <div style="font-weight:900;font-size:22px;color:#fff">${t.formation}</div>
    </div>`:'<div style="width:140px;height:200px;background:#333;border-radius:12px"></div>'}function yt(){return new Promise(t=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4000;color:#fff;gap:16px";let i=5;e.innerHTML=`<div style="font-size:48px">📺</div>
      <div style="font-size:18px;font-weight:700">Publicité</div>
      <div style="font-size:36px;font-weight:900" id="ad-cd">5</div>`,document.body.appendChild(e);const n=setInterval(()=>{i--;const r=document.getElementById("ad-cd");r&&(r.textContent=i),i<=0&&(clearInterval(n),e.remove(),t(!0))},1e3)})}function xe(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}const N={"4-4-2":{GK:1,DEF:4,MIL:4,ATT:2},"4-3-3":{GK:1,DEF:4,MIL:3,ATT:3},"3-4-3":{GK:1,DEF:3,MIL:4,ATT:3},"3-5-2":{GK:1,DEF:3,MIL:5,ATT:2},"5-3-2":{GK:1,DEF:5,MIL:3,ATT:2}},Q={GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"};function je(t,e,i,n,r){var o;t.innerHTML=`<div class="match-screen" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
    <div style="text-align:center;padding:40px;color:#fff">
      <div style="font-size:48px;margin-bottom:16px">${e}</div>
      <p style="margin-bottom:16px">${i}</p>
      <button class="btn btn-primary" id="msg-btn">${n}</button>
    </div>
  </div>`,(o=document.getElementById("msg-btn"))==null||o.addEventListener("click",r)}function ze(t){const e=typeof import.meta<"u"?"https://fcnwclxlkytdfjotqkta.supabase.co":"";if(!e||!(t!=null&&t.skin)||!(t!=null&&t.hair))return null;const i=t.hair==="chauve"?`${t.skin}-chauve-rase`:`${t.skin}-${t.hair}-${t.hair_length}`;return`${e}/storage/v1/object/public/assets/tetes/${i}.png`}function _e(t){const e=t.player;return{cardId:t.id,id:e.id,firstname:e.firstname,name:e.surname_encoded,country_code:e.country_code,club_id:e.club_id,job:e.job,job2:e.job2,note_g:Number(e.note_g)||0,note_d:Number(e.note_d)||0,note_m:Number(e.note_m)||0,note_a:Number(e.note_a)||0,rarity:e.rarity,skin:e.skin,hair:e.hair,hair_length:e.hair_length,boost:0,used:!1,_line:null,_col:null}}function re(t){return t===1?[1]:t===2?[0,2]:t===3?[0,1,2]:t===4?[0,1,1,2]:t===5?[0,1,1,1,2]:[1]}function Z(t,e){if(!t||!e)return"#333";const i=t.country_code&&e.country_code&&t.country_code===e.country_code,n=t.club_id&&e.club_id&&t.club_id===e.club_id;return i&&n?"#1A6B3C":i||n?"#D4A017":"#333"}function gt(){const t=Math.random()*100;return t<.1?4:t<5?3:t<20?2:1}function ht(t,e){const i=N[e]||N["4-4-2"],n={GK:[],DEF:[],MIL:[],ATT:[]},r=[...t];for(const o of["GK","DEF","MIL","ATT"]){const a=[];for(let s=0;s<i[o];s++){let d=r.findIndex(c=>c.job===o);if(d===-1&&(d=r.findIndex(c=>c.job2===o)),d===-1&&(d=0),r[d]){const c={...r[d],_line:o};a.push(c),r.splice(d,1)}}const l=re(a.length);a.forEach((s,d)=>{s._col=l[d]}),n[o]=a}return n}async function bt(t,e){const{data:i}=await g.from("players").select("id,firstname,surname_encoded,country_code,club_id,job,job2,note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length").eq("is_active",!0).limit(60);if(!i||i.length<11)return xt(t);const n=N[t]||N["4-4-2"],r={GK:[],DEF:[],MIL:[],ATT:[]},o=[...i];for(const a of["GK","DEF","MIL","ATT"]){const l=o.filter(v=>v.job===a),s=o.filter(v=>v.job!==a),d=[...l,...s],c=[];for(let v=0;v<n[a];v++){const u=d[v]||o[v];u&&c.push({cardId:"ai-"+u.id+"-"+v,id:u.id,firstname:u.firstname,name:u.surname_encoded,country_code:u.country_code,club_id:u.club_id,job:u.job,job2:u.job2,note_g:Number(u.note_g)||0,note_d:Number(u.note_d)||0,note_m:Number(u.note_m)||0,note_a:Number(u.note_a)||0,rarity:u.rarity,skin:u.skin,hair:u.hair,hair_length:u.hair_length,boost:0,used:!1,_line:a})}const f=re(c.length);c.forEach((v,u)=>{v._col=f[u]}),r[a]=c}return r}function xt(t){const e=N[t]||N["4-4-2"],i={GK:[],DEF:[],MIL:[],ATT:[]},n=["ROBOT","CYBER","NEXUS","ALGO","PIXEL","BYTE","LOGIC","TURBO","CORE","VOLT","FLUX"];let r=0;for(const o of["GK","DEF","MIL","ATT"]){const a=[];for(let s=0;s<e[o];s++){const d=3+Math.floor(Math.random()*5);a.push({cardId:"fake-"+r,id:"fake-"+r,firstname:"IA",name:n[r%n.length],country_code:"XX",club_id:null,job:o,job2:null,note_g:o==="GK"?d:2,note_d:o==="DEF"?d:2,note_m:o==="MIL"?d:2,note_a:o==="ATT"?d:2,rarity:"normal",boost:0,used:!1,_line:o}),r++}const l=re(a.length);a.forEach((s,d)=>{s._col=l[d]}),i[o]=a}return i}async function _t(t,e){var w;const{state:i,navigate:n,toast:r}=e,o=i.params||{};t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const a=o.matchMode||"vs_ai_easy",l=a.replace("vs_ai_",""),s=a;if(!o.deckId)return kt(t,e,a);const d=o.deckId,{data:c}=await g.from("deck_cards").select(`position, is_starter, slot_order,
      card:cards(id, card_type, formation,
        player:players(id,firstname,surname_encoded,country_code,club_id,job,job2,
          note_g,note_d,note_m,note_a,rarity,skin,hair,hair_length,
          clubs(encoded_name,logo_url)))`).eq("deck_id",d).order("slot_order"),f=(c||[]).filter(b=>{var h;return b.is_starter&&((h=b.card)==null?void 0:h.player)}).map(b=>_e(b.card)),v=(c||[]).filter(b=>{var h;return!b.is_starter&&((h=b.card)==null?void 0:h.player)}).map(b=>_e(b.card));if(f.length<11){je(t,"⚠️",`Deck incomplet (${f.length}/11).`,"Compléter",()=>n("decks"));return}const u=(c||[]).find(b=>{var h;return((h=b.card)==null?void 0:h.card_type)==="formation"}),k=((w=u==null?void 0:u.card)==null?void 0:w.formation)||"4-4-2",{data:_}=await g.from("cards").select("id,gc_type").eq("owner_id",i.profile.id).eq("card_type","game_changer"),y=ht(f,k),p=await bt(k),{data:m}=await g.from("matches").insert({home_id:i.profile.id,away_id:null,mode:s,home_deck_id:d,status:"in_progress"}).select().single(),x={matchId:m==null?void 0:m.id,mode:s,difficulty:l,formation:k,homeTeam:y,aiTeam:p,homeSubs:v,subsUsed:0,maxSubs:Math.min(v.length,3),homeScore:0,aiScore:0,gcCards:_||[],usedGc:[],boostCard:null,boostUsed:!1,phase:"midfield",attacker:null,round:0,selected:[],pendingAttack:null,log:[],modifiers:{home:{},ai:{}},clubName:i.profile.club_name||"Vous"};wt(t,x,e)}async function kt(t,e,i){var a;const{state:n,navigate:r}=e,{data:o}=await g.from("decks").select("id,name,is_active,formation_card_id").eq("owner_id",n.profile.id).order("created_at",{ascending:!1});if(!o||o.length===0){je(t,"📋","Aucun deck. Crée un deck avant de jouer !","Créer un deck",()=>r("decks"));return}t.innerHTML=`
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px">
    <div style="text-align:center;margin-bottom:24px;color:#fff">
      <div style="font-size:14px;opacity:.6;text-transform:uppercase;letter-spacing:1px">Match vs IA — ${i.replace("vs_ai_","").toUpperCase()}</div>
      <div style="font-size:22px;font-weight:900;margin-top:6px">Choisis ton deck</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px">
      ${o.map(l=>`
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
  </div>`,t.querySelectorAll(".deck-select-card").forEach(l=>{l.addEventListener("mouseenter",()=>l.style.background="rgba(255,255,255,0.14)"),l.addEventListener("mouseleave",()=>l.style.background="rgba(255,255,255,0.08)"),l.addEventListener("click",()=>{e.navigate("match",{matchMode:i,deckId:l.dataset.deckId})})}),(a=document.getElementById("cancel-deck-select"))==null||a.addEventListener("click",()=>r("home"))}function wt(t,e,i){const n=e.homeTeam.MIL||[],r=e.aiTeam.MIL||[];function o(f){return f.reduce((v,u)=>v+T(u,"MIL"),0)}function a(f){let v=0;for(let u=0;u<f.length-1;u++)Z(f[u],f[u+1])!=="#333"&&v++;return v}const l=o(n)+a(n),s=o(r)+a(r),d=l>=s;function c(f,v,u){return`<div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:8px">${v}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0">
        ${f.map((k,_)=>{const y=ze(k),p=_<f.length-1?Z(k,f[_+1]):null;return`
          <div style="width:52px;height:52px;border-radius:8px;background:${u};position:relative;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,0.3)">
            ${y?`<img src="${y}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.8">`:""}
            <div style="position:relative;z-index:1;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 3px #000">${T(k,"MIL")}</div>
            <div style="position:relative;z-index:1;font-size:6px;color:#fff;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${k.name}</div>
          </div>
          ${p?`<div style="width:12px;height:4px;border-radius:2px;background:${p};flex-shrink:0;opacity:${p==="#333"?.3:.9}"></div>`:""}
          `}).join("")}
      </div>
    </div>`}t.innerHTML=`
  <div class="match-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:20px;padding:20px">
    <div style="text-align:center;color:#fff">
      <div style="font-size:12px;opacity:.5;letter-spacing:1px">DUEL DU MILIEU DE TERRAIN</div>
    </div>

    ${c(n,e.clubName.toUpperCase(),"#D4A017")}

    <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
      <div id="score-home" style="font-size:42px;font-weight:900;color:#D4A017;transition:all 0.5s">${l}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4)">VS</div>
      <div id="score-ai" style="font-size:42px;font-weight:900;color:rgba(255,255,255,0.7);transition:all 0.5s">${s}</div>
    </div>

    ${c(r,"IA","#bb2020")}

    <div id="midfield-result" style="opacity:0;text-align:center;transition:opacity 0.5s;color:#fff">
      <div style="font-size:18px;font-weight:900"></div>
    </div>
  </div>`,setTimeout(()=>{const f=document.getElementById("score-home"),v=document.getElementById("score-ai"),u=document.getElementById("midfield-result");if(f&&v&&(d?(f.style.fontSize="72px",f.style.color="#fff",v.style.opacity="0.3"):(v.style.fontSize="72px",v.style.color="#fff",f.style.opacity="0.3")),u){const k=gt();u.style.opacity="1";const _=d?e.clubName:"IA";u.innerHTML=`
        <div style="font-size:18px;font-weight:900;margin-bottom:8px">
          ⚽ ${_} remporte le milieu !
        </div>
        ${d?`
        <div style="background:rgba(135,206,235,0.2);border:2px solid #87CEEB;border-radius:12px;padding:12px 20px;margin-top:8px;display:inline-block">
          <div style="font-size:11px;color:#87CEEB;letter-spacing:1px">CARTE BOOST OBTENUE</div>
          <div style="font-size:28px;font-weight:900;color:#87CEEB">+${k}</div>
          <div style="font-size:11px;color:rgba(135,206,235,0.7)">Applicable sur n'importe quel joueur</div>
        </div>`:""}
      `,d&&(e.boostCard={value:k})}e.attacker=d?"home":"ai",e.log.push({text:`Duel milieu : ${e.clubName} ${l} – ${s} IA → ${d?e.clubName:"IA"} attaque en premier`,type:"info"}),setTimeout(()=>{e.phase=e.attacker==="home"?"attack":"ai-attack",z(t,e,i),e.attacker==="ai"&&setTimeout(()=>ee(t,e,i),1e3)},2800)},1200)}function $t(t,e,i,n){return["ATT","MIL","DEF","GK"].map(a=>{const l=t[a]||[];return l.length?`<div style="display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:4px">
      ${l.map((s,d)=>{const c=i&&!s.used,f=n.includes(s.cardId),v=i==="attack"?T(s,"ATT"):i==="defense"?a==="GK"?T(s,"GK"):T(s,"DEF"):T(s,a),u=ze(s),k=d<l.length-1&&a==="MIL"?Z(s,l[d+1]):null,_=v+(s.boost||0);return`
        <div class="match-slot ${c?"selectable":""} ${f?"selected":""} ${s.used?"used":""}"
          data-card-id="${s.cardId}" data-role="${a}"
          style="width:54px;height:54px;flex-shrink:0;position:relative;overflow:hidden">
          ${u?`<img src="${u}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:${s.used?.2:.6}">`:""}
          ${s.boost?`<div style="position:absolute;top:2px;right:2px;background:#87CEEB;color:#000;border-radius:4px;font-size:7px;font-weight:900;padding:1px 3px;z-index:3">+${s.boost}</div>`:""}
          <div class="slot-note" style="position:relative;z-index:2;color:${s.used?"#555":"#fff"}">${s.used?"–":_}</div>
          <div class="slot-name" style="position:relative;z-index:2">${s.name}</div>
        </div>
        ${k?`<div style="width:10px;height:3px;border-radius:2px;background:${k};flex-shrink:0;opacity:${k==="#333"?.3:.9}"></div>`:""}
        `}).join("")}
    </div>`:""}).join("")}function z(t,e,i){var d,c,f,v;const n={attack:"⚔️ Choisissez vos attaquants",defense:"🛡️ Choisissez vos défenseurs","ai-attack":"🤖 L'IA attaque...","ai-defense":"🤖 L'IA défend...",finished:"🏁 Match terminé"}[e.phase]||"",r=e.selected.map(u=>u.cardId),o=e.usedSubIds||[],a=e.homeSubs.filter(u=>!o.includes(u.cardId)),l=Object.values(e.homeTeam).flat().filter(u=>u.used);t.innerHTML=`
  <div class="match-screen">
    <div class="match-header">
      <button class="btn-icon" id="match-quit" style="color:#fff;padding:4px 8px">✕</button>
      <div style="flex:1;text-align:center">
        <div style="font-size:10px;color:rgba(255,255,255,0.6)">${e.clubName} vs IA (${e.difficulty.toUpperCase()})</div>
        <div class="match-score">${e.homeScore} – ${e.aiScore}</div>
      </div>
      <button class="btn-icon" id="view-ai" style="color:#fff;padding:4px 8px">👁️</button>
    </div>

    <div class="match-phase">${n}</div>

    <!-- Terrain -->
    <div class="match-field" id="match-field">
      ${$t(e.homeTeam,e.formation,e.phase,r)}
    </div>

    <!-- Barre d'outils : GC + Boost + Remplacements -->
    <div style="padding:6px 12px;display:flex;gap:6px;overflow-x:auto;align-items:center;background:rgba(0,0,0,0.2)">

      <!-- Game Changers -->
      ${e.gcCards.filter(u=>!e.usedGc.includes(u.id)).map(u=>{var k;return`
        <div class="gc-mini" data-gc-id="${u.id}" data-gc-type="${u.gc_type}"
          style="flex-shrink:0;background:linear-gradient(135deg,#3d0a7a,#7a28b8);border:1px solid #9b59b6;border-radius:8px;padding:4px 8px;cursor:pointer;text-align:center;min-width:72px">
          <div style="font-size:14px">${((k=oe[u.gc_type])==null?void 0:k.icon)||"⚡"}</div>
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
      ${l.length>0&&a.length>0&&e.subsUsed<e.maxSubs?`
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
  </div>`,(d=document.getElementById("match-quit"))==null||d.addEventListener("click",()=>{confirm("Abandonner le match ?")&&i.navigate("home")}),(c=document.getElementById("view-ai"))==null||c.addEventListener("click",()=>jt(e,i)),Et(t,e,i),t.querySelectorAll(".match-slot.selectable").forEach(u=>{u.addEventListener("click",()=>At(u,e,t,i))}),t.querySelectorAll(".gc-mini").forEach(u=>{u.addEventListener("click",()=>Mt(u.dataset.gcId,u.dataset.gcType,t,e,i))}),(f=document.getElementById("boost-card"))==null||f.addEventListener("click",()=>{Ct(t,e,i)}),(v=document.getElementById("sub-btn"))==null||v.addEventListener("click",()=>{Bt(t,e,i)});const s=document.getElementById("match-log");s&&(s.scrollTop=s.scrollHeight)}function Et(t,e,i){var r,o,a,l;const n=document.getElementById("match-actions");if(n)if(e.phase==="attack"){const s=e.selected.length>0?ne(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;n.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        ${s?`ATT : <b style="color:var(--yellow);font-size:20px">${s.total}</b>
             <span style="font-size:11px;opacity:.7">(${s.base}${s.links?` +${s.links} liens`:""}${e.modifiers.home.doubleAttack?" ×2":""})</span>`:'<span style="opacity:.5">Sélectionne 1–3 milieux/attaquants</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-attack" style="width:100%" ${s?"":"disabled"}>Attaquer →</button>`,(r=document.getElementById("confirm-attack"))==null||r.addEventListener("click",()=>It(t,e,i))}else if(e.phase==="defense"){const s=e.selected.length>0?se(e.selected.map(d=>({...d,_line:d._role})),e.modifiers.home):null;n.innerHTML=`
      <div style="text-align:center;color:#fff;margin-bottom:6px;font-size:13px">
        <div style="font-size:11px;opacity:.6;margin-bottom:2px">L'IA attaque avec <b style="color:#ff6b6b">${((o=e.pendingAttack)==null?void 0:o.total)||0}</b></div>
        ${s?`DEF : <b style="color:var(--yellow);font-size:20px">${s.total}</b>`:'<span style="opacity:.5">Sélectionne 1–3 défenseurs/GK</span>'}
      </div>
      <button class="btn btn-primary" id="confirm-defense" style="width:100%" ${s?"":"disabled"}>Défendre →</button>`,(a=document.getElementById("confirm-defense"))==null||a.addEventListener("click",()=>Tt(t,e,i))}else e.phase==="finished"?(n.innerHTML='<button class="btn btn-primary" id="end-match" style="width:100%">Voir les résultats</button>',(l=document.getElementById("end-match"))==null||l.addEventListener("click",()=>i.navigate("home"))):n.innerHTML=`<div style="text-align:center;color:rgba(255,255,255,.4);padding:8px;font-size:12px">⏳ Tour de l'IA...</div>`}function At(t,e,i,n){const r=t.dataset.cardId,o=t.dataset.role,a=e.selected.findIndex(l=>l.cardId===r);if(a!==-1)e.selected.splice(a,1);else{if(e.selected.length>=3){n.toast("Maximum 3 joueurs","error");return}const l=(e.homeTeam[o]||[]).find(s=>s.cardId===r);l&&e.selected.push({...l,_role:o,_line:o})}z(i,e,n)}function It(t,e,i){const n=e.selected.map(o=>({...o,_line:o._role})),r=ne(n,e.modifiers.home);e.pendingAttack={...r,players:[...e.selected],side:"home"},e.selected.forEach(o=>{const a=(e.homeTeam[o._role]||[]).find(l=>l.cardId===o.cardId);a&&(a.used=!0)}),e.log.push({text:`Vous attaquez : ${r.total} (${e.selected.map(o=>o.name).join(", ")})`,type:"info"}),e.selected=[],e.modifiers.home={},e.phase="ai-defense",z(t,e,i),setTimeout(()=>Lt(t,e,i),1200)}function Tt(t,e,i){const n=e.selected.map(a=>({...a,_line:a._role})),r=se(n,e.modifiers.home);e.selected.forEach(a=>{const l=(e.homeTeam[a._role]||[]).find(s=>s.cardId===a.cardId);l&&(l.used=!0)});const o=Ae(e.pendingAttack.total,r.total,e.modifiers.home);o.shielded?e.log.push({text:"🛡️ Bouclier ! But annulé.",type:"info"}):o.goal?(e.aiScore++,e.log.push({text:`⚽ BUT IA ! (${e.pendingAttack.total} > ${r.total})`,type:"goal"})):e.log.push({text:`🧤 Défense ! (${r.total} ≥ ${e.pendingAttack.total})`,type:"info"}),e.selected=[],e.modifiers.home={},e.pendingAttack=null,Se(t,e,i,"home-attack")}function ee(t,e,i){const n=[...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]],r=Ie(n,"attack",e.difficulty);if(!r.length){Ge(t,e,i);return}const o=ne(r,e.modifiers.ai);e.pendingAttack={...o,players:r,side:"ai"},r.forEach(a=>{a.used=!0}),e.log.push({text:`IA attaque : ${o.total}`,type:"info"}),e.modifiers.ai={},e.phase="defense",z(t,e,i)}function Lt(t,e,i){const n=[...e.aiTeam.GK||[],...e.aiTeam.DEF||[],...e.aiTeam.MIL||[]],r=Ie(n,"defense",e.difficulty),o=r.length>0?se(r,e.modifiers.ai).total:0;r.forEach(l=>{l.used=!0});const a=Ae(e.pendingAttack.total,o,e.modifiers.ai);a.shielded?e.log.push({text:"🛡️ Bouclier IA !",type:"info"}):a.goal?(e.homeScore++,e.log.push({text:`⚽ BUT ! (${e.pendingAttack.total} > ${o})`,type:"goal"})):e.log.push({text:`🧤 IA défend (${o} ≥ ${e.pendingAttack.total})`,type:"info"}),e.modifiers.ai={},e.pendingAttack=null,Se(t,e,i,"ai-attack")}function Se(t,e,i,n){if(e.round++,De(e)){te(t,e,i);return}if(n==="home-attack"){if(![...e.homeTeam.MIL||[],...e.homeTeam.ATT||[]].filter(o=>!o.used).length){if(![...e.homeTeam.GK||[],...e.homeTeam.DEF||[],...e.homeTeam.MIL||[]].filter(a=>!a.used).length){te(t,e,i);return}e.phase="ai-attack",z(t,e,i),setTimeout(()=>ee(t,e,i),800);return}e.phase="attack",z(t,e,i)}else{if(![...e.aiTeam.MIL||[],...e.aiTeam.ATT||[]].filter(o=>!o.used).length){Ge(t,e,i);return}e.phase="ai-attack",z(t,e,i),setTimeout(()=>ee(t,e,i),800)}}function De(t){const e=["MIL","ATT","GK","DEF"].some(n=>(t.homeTeam[n]||[]).some(r=>!r.used)),i=["MIL","ATT","GK","DEF"].some(n=>(t.aiTeam[n]||[]).some(r=>!r.used));return!e&&!i}function Ge(t,e,i){De(e)?te(t,e,i):(e.phase="attack",z(t,e,i))}function Ct(t,e,i){const n=Object.values(e.homeTeam).flat().filter(r=>!r.used);if(!n.length){i.toast("Aucun joueur actif à booster","error");return}i.openModal("⚡ Utiliser le Boost",`<div style="margin-bottom:12px;background:linear-gradient(135deg,#4a9fc4,#87CEEB);border-radius:10px;padding:12px;text-align:center;color:#000">
      <div style="font-size:24px;font-weight:900">+${e.boostCard.value}</div>
      <div style="font-size:12px">Appliqué à un seul joueur actif</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${n.map(r=>`
        <div class="player-boost-opt" data-card-id="${r.cardId}"
          style="display:flex;align-items:center;gap:10px;padding:8px;border:1.5px solid var(--gray-200);border-radius:8px;cursor:pointer">
          <div style="width:32px;height:32px;background:${Q[r.job]||"#888"};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:13px">${T(r,r._line||r.job)}</div>
          <div style="flex:1"><b>${r.firstname} ${r.name}</b><div style="font-size:11px;color:#888">${r._line||r.job}</div></div>
          <div style="color:#87CEEB;font-weight:700">+${e.boostCard.value}</div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`),document.querySelectorAll(".player-boost-opt").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.cardId;for(const a of["GK","DEF","MIL","ATT"]){const l=(e.homeTeam[a]||[]).find(s=>s.cardId===o);if(l){l.boost=(l.boost||0)+e.boostCard.value,e.log.push({text:`⚡ Boost +${e.boostCard.value} appliqué à ${l.name}`,type:"info"});break}}e.boostUsed=!0,i.closeModal(),z(t,e,i)})})}function Bt(t,e,i){e.usedSubIds||(e.usedSubIds=[]);const n=Object.values(e.homeTeam).flat().filter(s=>s.used),r=e.homeSubs.filter(s=>!e.usedSubIds.includes(s.cardId));if(!n.length){i.toast("Aucun joueur grisé","info");return}if(!r.length){i.toast("Aucun remplaçant disponible","info");return}if(e.subsUsed>=e.maxSubs){i.toast(`Maximum ${e.maxSubs} remplacements`,"error");return}i.openModal("🔄 Remplacement",`<div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">JOUEUR À REMPLACER (grisé)</div>
      ${n.map(s=>`
        <div class="grayed-opt" data-card-id="${s.cardId}" data-role="${s._line}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid #eee;border-radius:8px;cursor:pointer;margin-bottom:4px;opacity:0.7">
          <div style="width:28px;height:28px;background:${Q[s.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s._line}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join("")}
    </div>
    <div>
      <div style="font-size:12px;color:var(--gray-600);margin-bottom:6px">REMPLAÇANTS DISPONIBLES</div>
      ${r.map(s=>`
        <div class="sub-opt" data-card-id="${s.cardId}"
          style="display:flex;align-items:center;gap:8px;padding:8px;border:1.5px solid var(--green);border-radius:8px;cursor:pointer;margin-bottom:4px">
          <div style="width:28px;height:28px;background:${Q[s.job]||"#888"};border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:900">${s.job}</div>
          <div><b>${s.firstname} ${s.name}</b></div>
        </div>`).join("")}
    </div>`,`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Annuler</button>`);let o=null,a=null;document.querySelectorAll(".grayed-opt").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".grayed-opt").forEach(d=>d.style.borderColor="#eee"),s.style.borderColor="#c0392b",o={cardId:s.dataset.cardId,role:s.dataset.role},l()})}),document.querySelectorAll(".sub-opt").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".sub-opt").forEach(d=>d.style.borderColor="var(--green)"),s.style.borderColor="#D4A017",a=s.dataset.cardId,l()})});function l(){if(!o||!a)return;const s=o.role,d=e.homeTeam[s]||[],c=d.findIndex(v=>v.cardId===o.cardId),f=e.homeSubs.find(v=>v.cardId===a);c!==-1&&f&&(f._line=s,f._col=d[c]._col,f.used=!1,d.splice(c,1,f),e.usedSubIds=[...e.usedSubIds||[],a],e.subsUsed++,e.log.push({text:`🔄 Remplacement : ${f.firstname} ${f.name} entre`,type:"info"})),i.closeModal(),z(t,e,i)}}function Mt(t,e,i,n,r){if(!n.usedGc.includes(t)){switch(n.usedGc.push(t),e){case"Double attaque":n.modifiers.home.doubleAttack=!0,n.log.push({text:"⚡ Double attaque !",type:"info"});break;case"Bouclier":n.modifiers.home.shield=!0,n.log.push({text:"🛡️ Bouclier !",type:"info"});break;case"Ressusciter":{let o=!1;for(const a of["ATT","MIL","DEF","GK"]){const l=(n.homeTeam[a]||[]).find(s=>s.used);if(l){l.used=!1,o=!0;break}}n.log.push({text:o?"💫 Joueur ressuscité !":"💫 Aucun joueur à ressusciter",type:"info"});break}case"Vol de note":n.modifiers.ai.stolenNote=(n.modifiers.ai.stolenNote||0)+1,n.log.push({text:"🎯 -1 à la prochaine IA",type:"info"});break;case"Gel":{const o=[...n.aiTeam.ATT||[],...n.aiTeam.MIL||[]].filter(a=>!a.used);if(o.length){const a=o.sort((l,s)=>T(s,"ATT")-T(l,"ATT"))[0];a.used=!0,n.log.push({text:`❄️ ${a.name} (IA) gelé !`,type:"info"})}break}case"Remplacement+":n.maxSubs++,n.log.push({text:"🔄 +1 remplacement",type:"info"});break}g.from("cards").delete().eq("id",t).then(()=>{}),z(i,n,r)}}async function te(t,e,i){var c,f;e.phase="finished";const{state:n}=i,r=e.homeScore>e.aiScore,o=e.homeScore===e.aiScore,a=r?"victoire":o?"nul":"defaite",l=Ve(e.mode,a);e.matchId&&await g.from("matches").update({status:"finished",home_score:e.homeScore,away_score:e.aiScore,winner_id:r?n.profile.id:null,home_credits_reward:l,played_at:new Date().toISOString()}).eq("id",e.matchId);const s={credits:(n.profile.credits||0)+l,matches_played:(n.profile.matches_played||0)+1};r?s.wins=(n.profile.wins||0)+1:o?s.draws=(n.profile.draws||0)+1:s.losses=(n.profile.losses||0)+1,await g.from("users").update(s).eq("id",n.profile.id),await i.refreshProfile();const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:2000",d.innerHTML=`
    <div style="text-align:center;padding:40px;color:#fff;max-width:360px">
      <div style="font-size:72px;margin-bottom:12px">${r?"🏆":o?"🤝":"😔"}</div>
      <h2 style="font-size:28px;font-weight:900;margin-bottom:8px">${r?"Victoire !":o?"Match nul":"Défaite"}</h2>
      <div style="font-size:48px;font-weight:900;margin:12px 0">${e.homeScore} – ${e.aiScore}</div>
      <div style="background:rgba(212,160,23,0.2);border:1px solid var(--yellow);border-radius:12px;padding:12px;margin:16px 0">
        <div style="font-size:12px;opacity:.8">Récompense</div>
        <div style="font-size:24px;font-weight:900;color:var(--yellow)">+${l.toLocaleString("fr")} crédits</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-ghost" id="res-home" style="flex:1;color:#fff;border-color:rgba(255,255,255,0.3)">Accueil</button>
        <button class="btn btn-primary" id="res-replay" style="flex:1">Rejouer</button>
      </div>
    </div>`,document.body.appendChild(d),(c=document.getElementById("res-home"))==null||c.addEventListener("click",()=>{d.remove(),i.navigate("home")}),(f=document.getElementById("res-replay"))==null||f.addEventListener("click",()=>{d.remove(),i.navigate("match",{matchMode:e.mode})})}function jt(t,e){const i=["ATT","MIL","DEF","GK"];e.openModal("Équipe adverse (IA)",`<div style="background:#0a3d1e;padding:12px;border-radius:8px">
      ${i.map(n=>{const r=t.aiTeam[n]||[];return r.length?`<div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px">
          ${r.map(o=>{const a=T(o,n);return`<div class="match-slot ${o.used?"used":""}" style="cursor:default">
              <div class="slot-note">${o.used?"–":a}</div>
              <div class="slot-name">${o.name}</div>
            </div>`}).join("")}
        </div>`:""}).join("")}
    </div>`,`<button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Fermer</button>`)}const zt={normal:"#ccc",pepite:"#D4A017",papyte:"#909090",legende:"#7a28b8"};async function St(t,e){const{state:i,toast:n}=e;t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement du marché...</div>',await de(t,e)}async function de(t,e){const{state:i,toast:n}=e,{data:r}=await g.from("market_listings").select(`id, price, status, listed_at, seller_id,
      seller:users!seller_id(pseudo),
      card:cards(id, card_type,
        player:players(id, firstname, surname_encoded, country_code, job, job2,
          note_g, note_d, note_m, note_a, rarity, skin, hair, hair_length, clubs(encoded_name, logo_url)))`).eq("status","active").order("listed_at",{ascending:!1}).limit(60),o=(r||[]).filter(s=>s.seller_id===i.profile.id),a=(r||[]).filter(s=>s.seller_id!==i.profile.id);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>🛒 Marché des transferts</h2>
      <p>${a.length} carte(s) en vente · Solde : ${(i.profile.credits||0).toLocaleString("fr")} cr.</p>
    </div>

    <div style="padding:10px 16px;background:#fff;border-bottom:1px solid var(--gray-200);display:flex;gap:6px;overflow-x:auto">
      <button class="mkt-tab active" data-tab="buy" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--green);background:var(--green);color:#fff;font-size:13px;font-weight:600;cursor:pointer">Acheter</button>
      <button class="mkt-tab" data-tab="mine" style="flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--gray-200);background:#fff;color:var(--gray-600);font-size:13px;font-weight:600;cursor:pointer">Mes ventes (${o.length})</button>
    </div>

    <div class="page-body" id="mkt-content"></div>
  </div>
  `;function l(s){const d=document.getElementById("mkt-content"),c=s==="buy"?a:o;if(c.length===0){d.innerHTML=`<div style="text-align:center;color:var(--gray-600);padding:40px">
        ${s==="buy"?"Aucune carte en vente actuellement.":"Tu n'as aucune carte en vente."}
      </div>`;return}d.innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      ${c.map(f=>{var y,p,m;const v=(y=f.card)==null?void 0:y.player;if(!v)return"";const u=v.job==="GK"?v.note_g:v.job==="DEF"?v.note_d:v.job==="MIL"?v.note_m:v.note_a,k=zt[v.rarity],_=(i.profile.credits||0)>=f.price;return`<div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px">
          <div style="width:44px;height:44px;border-radius:8px;background:${Rt(v.job)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border:2px solid ${k};flex-shrink:0">${u}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:14px">${v.firstname} ${v.surname_encoded}</div>
            <div style="font-size:11px;color:var(--gray-600)">${v.country_code} · ${((p=v.clubs)==null?void 0:p.encoded_name)||"—"} · ${v.rarity} · ${v.job}</div>
            <div style="font-size:11px;color:var(--gray-600)">Vendeur : ${((m=f.seller)==null?void 0:m.pseudo)||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-weight:900;color:var(--yellow);font-size:15px">${f.price.toLocaleString("fr")}</div>
            ${s==="buy"?`<button class="btn btn-primary btn-sm" data-buy="${f.id}" ${_?"":"disabled"} style="margin-top:4px">${_?"Acheter":"Trop cher"}</button>`:`<button class="btn btn-danger btn-sm" data-cancel="${f.id}" style="margin-top:4px">Retirer</button>`}
          </div>
        </div>`}).join("")}
    </div>`,d.querySelectorAll("[data-buy]").forEach(f=>{f.addEventListener("click",()=>Dt(f.dataset.buy,c,t,e))}),d.querySelectorAll("[data-cancel]").forEach(f=>{f.addEventListener("click",()=>Gt(f.dataset.cancel,t,e))})}l("buy"),t.querySelectorAll(".mkt-tab").forEach(s=>{s.addEventListener("click",()=>{t.querySelectorAll(".mkt-tab").forEach(d=>{const c=d===s;d.style.background=c?"var(--green)":"#fff",d.style.color=c?"#fff":"var(--gray-600)",d.style.borderColor=c?"var(--green)":"var(--gray-200)"}),l(s.dataset.tab)})})}async function Dt(t,e,i,n){const{state:r,toast:o,refreshProfile:a}=n,l=e.find(s=>s.id===t);if(l){if((r.profile.credits||0)<l.price){o("Crédits insuffisants","error");return}if(confirm(`Acheter ${l.card.player.firstname} ${l.card.player.surname_encoded} pour ${l.price.toLocaleString("fr")} crédits ?`))try{const{error:s}=await g.from("cards").update({owner_id:r.profile.id,is_for_sale:!1,sale_price:null}).eq("id",l.card.id);if(s)throw s;await g.from("market_listings").update({status:"sold",buyer_id:r.profile.id,sold_at:new Date().toISOString()}).eq("id",t),await g.from("users").update({credits:(r.profile.credits||0)-l.price}).eq("id",r.profile.id);const{data:d}=await g.from("users").select("credits").eq("id",l.seller_id).single();d&&await g.from("users").update({credits:(d.credits||0)+l.price}).eq("id",l.seller_id),await g.from("notifications").insert({user_id:l.seller_id,type:"card_sold",message:`Ta carte ${l.card.player.surname_encoded} a été vendue pour ${l.price} crédits !`,data:{card_id:l.card.id,price:l.price}}),await a(),o("Carte achetée ! ✅","success"),de(i,n)}catch(s){o("Erreur : "+s.message,"error")}}}async function Gt(t,e,i){const{toast:n}=i,{data:r}=await g.from("market_listings").select("card_id").eq("id",t).single();await g.from("market_listings").update({status:"cancelled"}).eq("id",t),r&&await g.from("cards").update({is_for_sale:!1,sale_price:null}).eq("id",r.card_id),n("Annonce retirée","success"),de(e,i)}function Rt(t){return{GK:"#111",DEF:"#bb2020",MIL:"#D4A017",ATT:"#1A6B3C"}[t]||"#888"}async function qt(t,{state:e,navigate:i,toast:n}){t.innerHTML='<div class="page" style="padding:40px;text-align:center;color:#aaa">⚽ Chargement...</div>';const{data:r}=await g.from("users").select("id,pseudo,club_name,trophies_top1,trophies_top2,trophies_top3,wins,level").order("trophies_top1",{ascending:!1}).limit(100);t.innerHTML=`
  <div class="page">
    <div class="page-header">
      <h2>📊 Classement global</h2>
      <p>GDD §10.3 : TOP1 > TOP2 > TOP3 > Victoires</p>
    </div>

    <div class="page-body">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${r&&r.length>0?r.map((o,a)=>`
          <div class="card-panel" style="display:flex;align-items:center;gap:12px;padding:12px;${o.id===e.profile.id?"border:2px solid var(--yellow)":""}">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;flex-shrink:0">${a+1}</div>
            <div style="flex:1">
              <div style="font-weight:700">${o.pseudo}</div>
              <div style="font-size:11px;color:var(--gray-600)">${o.club_name}</div>
            </div>
            <div style="text-align:right;font-size:12px">
              <div>🥇${o.trophies_top1} 🥈${o.trophies_top2} 🥉${o.trophies_top3}</div>
              <div style="color:var(--gray-600)">${o.wins} V</div>
            </div>
          </div>
        `).join(""):'<div style="text-align:center;color:var(--gray-600);padding:40px">Aucun manager.</div>'}
      </div>
    </div>
  </div>
  `}const L={user:null,profile:null,page:"home",params:{}};function P(t,e="info",i=3e3){const n=document.getElementById("toast");n&&(n.textContent=t,n.className=`show ${e}`,clearTimeout(n._t),n._t=setTimeout(()=>{n.className=""},i))}function Ft(t,e,i=""){document.getElementById("modal-title").textContent=t,document.getElementById("modal-body").innerHTML=e,document.getElementById("modal-footer").innerHTML=i,document.getElementById("modal-overlay").classList.remove("hidden")}function ie(){document.getElementById("modal-overlay").classList.add("hidden")}async function K(){if(!L.user)return;const{data:t}=await g.from("users").select("*").eq("id",L.user.id).single();t&&(L.profile=t)}function V(t,e={}){L.page=t,L.params=e,Re()}async function Re(){const t=document.getElementById("page-content");if(!t)return;document.querySelectorAll(".bottom-nav a").forEach(n=>{n.classList.toggle("active",n.dataset.page===L.page)});const e=document.getElementById("nav-credits");e&&L.profile&&(e.textContent=`💰 ${(L.profile.credits||0).toLocaleString("fr")}`);const i={state:L,navigate:V,toast:P,openModal:Ft,closeModal:ie,refreshProfile:K};switch(t.innerHTML='<div style="padding:40px;text-align:center;color:#aaa">⚽</div>',L.page){case"home":await ve(t,i);break;case"collection":await Qe(t,i);break;case"decks":await Be(t,i);break;case"boosters":await lt(t,i);break;case"match":await _t(t,i);break;case"market":await St(t,i);break;case"rankings":await qt(t,i);break;default:await ve(t,i)}}function Ot(){const t=document.getElementById("app"),e=L.profile,i=(e.club_name||"MW").split(" ").filter(Boolean);i.length>=2?(i[0][0]+i[1][0]).toUpperCase():(e.club_name||"MW").slice(0,2).toUpperCase(),t.innerHTML=`
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
  `,document.querySelectorAll(".bottom-nav a").forEach(n=>{n.addEventListener("click",r=>{r.preventDefault(),V(n.dataset.page)})}),document.getElementById("nav-logo").addEventListener("click",()=>V("home")),document.getElementById("nav-credits").addEventListener("click",()=>V("boosters"))}async function Nt(){document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&ie()}),document.getElementById("modal-close").addEventListener("click",ie);const{data:{session:t}}=await g.auth.getSession();if(!t){$e(),ue(document.getElementById("app"),{navigate:ke,toast:P});return}if(L.user=t.user,await K(),$e(),!L.profile){He(document.getElementById("app"),{state:L,navigate:Pt,toast:P,refreshProfile:K});return}L.profile.first_booster_opened||(await Kt(L.user.id),await K()),qe(),g.auth.onAuthStateChange(async(e,i)=>{e==="SIGNED_OUT"&&(L.user=null,L.profile=null,document.getElementById("app").innerHTML="",ue(document.getElementById("app"),{navigate:ke,toast:P}))})}function qe(){document.getElementById("app").style.cssText="display:flex;flex-direction:column",Ot(),Re()}function ke(){window.location.reload()}async function Pt(){await K(),qe()}async function Kt(t){const{data:e}=await g.from("cards").select("id").eq("owner_id",t).limit(1);if(e&&e.length>0)return;const{data:i}=await g.from("players").select("id,job").eq("is_active",!0);if(!i||i.length===0)return;const n=i.filter(l=>l.job==="GK"),r=i.filter(l=>l.job!=="GK"),o=[];for(let l=0;l<5;l++){let s=[];l===0&&n.length>0?(s.push(n[Math.floor(Math.random()*n.length)]),s.push(...we([...r]).slice(0,3))):s=we([...i]).slice(0,4),s.forEach(d=>o.push({owner_id:t,player_id:d.id,card_type:"player"}))}["Ressusciter","Double attaque","Bouclier"].forEach(l=>{o.push({owner_id:t,card_type:"game_changer",gc_type:l})});const a=["4-4-2","4-3-3","3-4-3","3-5-2","5-3-2"];o.push({owner_id:t,card_type:"formation",formation:a[Math.floor(Math.random()*a.length)]}),await g.from("cards").insert(o),await g.from("users").update({first_booster_opened:!0}).eq("id",t),P("🎁 Tes récompenses de démarrage ont été ajoutées !","success",5e3)}function we(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function $e(){const t=document.getElementById("app-loader");t&&(t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.style.display="none",300)),document.getElementById("app").style.display="flex"}Nt();
