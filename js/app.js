/* ============================================================
   APP LOGIC — you shouldn't need to edit this file.
   All editable text lives in js/content.js
   ============================================================ */
(function(){
  "use strict";

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Icons ---------------- */
  const ICONS = {
    chair: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3v9M18 3v9M6 12h12l-1.2 8H7.2L6 12Z"/></svg>`,
    headphones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="14" width="5" height="7" rx="1.5"/><rect x="16.5" y="14" width="5" height="7" rx="1.5"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20s-7.5-4.6-10-9.3C.4 7 2 3.5 5.6 3A6 6 0 0 1 12 6.6 6 6 0 0 1 18.4 3C22 3.5 23.6 7 22 10.7 19.5 15.4 12 20 12 20Z"/></svg>`,
    candy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"/><path d="M4 6 8 10M20 6l-4 4M4 18l4-4M20 18l-4-4"/></svg>`,
    music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>`,
    musicOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>`,
    chevLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`,
    chevRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`,
    photo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10.5" r="1.6"/><path d="M21 16l-5.5-5.5L9 17"/></svg>`,
    door: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="2.5" width="14" height="19" rx="1"/><circle cx="15" cy="12" r="1"/></svg>`,
  };

  /* ---------------- Data ---------------- */
  const S = window.STORY;

  /* ---------------- Starfield (ambient canvas) ---------------- */
  function initStarfield(){
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resize(){
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000));
      stars = Array.from({length: count}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.1 + 0.3) * devicePixelRatio,
        base: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    let t = 0;
    function draw(){
      ctx.clearRect(0,0,canvas.width, canvas.height);
      t += reduceMotion ? 0 : 1;
      for(const s of stars){
        const a = s.base + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(233, 219, 180, ${Math.max(0,a)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  /* ---------------- Photo w/ fallback ---------------- */
  function photoBlock(b){
    const wrap = document.createElement('div');
    wrap.className = 'photo-block reveal';
    const frame = document.createElement('div');
    frame.className = 'photo-frame';
    const img = document.createElement('img');
    img.alt = b.alt || b.caption || 'photo';
    img.loading = 'lazy';
    // Resolve against the page's own URL (document.baseURI) instead of a bare
    // relative string. This is more reliable across file:// vs http://,
    // trailing slashes, query strings, etc. It still expects a `photos`
    // folder that sits next to index.html.
    const resolvedSrc = new URL('photos/' + b.file, document.baseURI).href;
    img.src = resolvedSrc;
    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    placeholder.innerHTML = ICONS.photo + `<span>A photo goes here</span><span class="ph-file">photos/${b.file}</span>`;
    img.style.display = 'none';
    img.onload = () => { img.style.display = 'block'; placeholder.remove(); };
    img.onerror = () => {
      img.style.display = 'none';
      // Leaves a breadcrumb in the browser console (F12 -> Console) so you
      // can see exactly which URL failed and why.
      console.warn('[photo missing] tried to load:', resolvedSrc, '\nMake sure a file named exactly "' + b.file + '" (same case) exists in the "photos" folder, next to index.html.');
    };
    frame.appendChild(placeholder);
    frame.appendChild(img);
    wrap.appendChild(frame);
    if(b.caption){
      const cap = document.createElement('div');
      cap.className = 'photo-caption';
      cap.textContent = b.caption;
      wrap.appendChild(cap);
    }
    return wrap;
  }

  function textBlock(b){
    const wrap = document.createElement('div');
    wrap.className = 'text-block reveal' + (b.small ? ' small' : '') + (b.emphasis ? ' emphasis' : '') + (b.italic ? ' italic' : '');
    b.lines.forEach(line => {
      const p = document.createElement('p');
      p.textContent = line;
      wrap.appendChild(p);
    });
    return wrap;
  }

  function dividerBlock(){
    const d = document.createElement('div');
    d.className = 'block-divider reveal';
    d.innerHTML = '<span>&#10022;</span>';
    return d;
  }

  function songBlock(b){
    const wrap = document.createElement('div');
    wrap.className = 'song-block reveal';
    wrap.innerHTML = `
      <div class="song-note">${ICONS.music}</div>
      <div class="song-meta">
        <div class="song-title">${b.title}</div>
        <div class="song-artists">${b.artists}</div>
      </div>`;
    const outer = document.createElement('div');
    outer.appendChild(wrap);
    if(b.lines && b.lines.length){
      outer.appendChild(textBlock({lines: b.lines, small: true}));
    }
    return outer;
  }

  function twoBooksBlock(){
    const wrap = document.createElement('div');
    wrap.className = 'twobooks reveal';
    wrap.innerHTML = `<svg viewBox="0 0 300 140" fill="none">
      <ellipse cx="90" cy="120" rx="70" ry="10" fill="rgba(201,161,92,0.08)"/>
      <ellipse cx="210" cy="120" rx="70" ry="10" fill="rgba(201,161,92,0.08)"/>
      <g transform="translate(35,55) rotate(-8)">
        <rect x="0" y="0" width="70" height="46" rx="3" fill="#12162a" stroke="#c9a15c" stroke-width="1.2"/>
        <line x1="10" y1="8" x2="60" y2="8" stroke="#c9a15c" stroke-width="1" opacity=".5"/>
        <line x1="10" y1="16" x2="60" y2="16" stroke="#c9a15c" stroke-width="1" opacity=".5"/>
      </g>
      <g transform="translate(190,60) rotate(9)">
        <rect x="0" y="0" width="70" height="46" rx="3" fill="#12162a" stroke="#9c3b3b" stroke-width="1.2"/>
        <line x1="10" y1="8" x2="60" y2="8" stroke="#9c3b3b" stroke-width="1" opacity=".5"/>
        <line x1="10" y1="16" x2="60" y2="16" stroke="#9c3b3b" stroke-width="1" opacity=".5"/>
      </g>
      <circle cx="70" cy="40" r="22" fill="url(#glowA)"/>
      <circle cx="225" cy="45" r="22" fill="url(#glowB)"/>
      <defs>
        <radialGradient id="glowA"><stop offset="0" stop-color="#c9a15c" stop-opacity=".25"/><stop offset="1" stop-color="#c9a15c" stop-opacity="0"/></radialGradient>
        <radialGradient id="glowB"><stop offset="0" stop-color="#9c3b3b" stop-opacity=".22"/><stop offset="1" stop-color="#9c3b3b" stop-opacity="0"/></radialGradient>
      </defs>
    </svg>`;
    return wrap;
  }

  function pathMotifBlock(){
    const wrap = document.createElement('div');
    wrap.className = 'pathmotif reveal';
    wrap.innerHTML = `<svg viewBox="0 0 320 120" fill="none">
      <path class="thread thread-a" d="M10,90 C 80,90 90,30 160,30 S 250,90 310,30" />
      <path class="thread thread-b" d="M10,30 C 80,30 90,90 160,90 S 250,30 310,90" />
      <circle cx="10" cy="90" r="4" fill="#c9a15c"/>
      <circle cx="310" cy="30" r="4" fill="#c9a15c"/>
      <circle cx="10" cy="30" r="4" fill="#9c3b3b"/>
      <circle cx="310" cy="90" r="4" fill="#9c3b3b"/>
    </svg>`;
    return wrap;
  }

  function objectsBlock(){
    const wrap = document.createElement('div');
    wrap.className = 'reveal';
    const hint = document.createElement('div');
    hint.className = 'objects-hint';
    hint.textContent = 'Tap each one.';
    const grid = document.createElement('div');
    grid.className = 'objects-grid';
    S.objects.forEach(o => {
      const card = document.createElement('button');
      card.className = 'obj-card';
      card.type = 'button';
      card.setAttribute('aria-label', o.label);
      card.innerHTML = `${ICONS[o.icon] || ''}<span class="obj-label">${o.label}</span><span class="obj-text">${o.text}</span>`;
      card.addEventListener('click', () => card.classList.toggle('is-found'));
      grid.appendChild(card);
    });
    wrap.appendChild(hint);
    wrap.appendChild(grid);
    return wrap;
  }

  function alwaysRevealBlock(){
    const wrap = document.createElement('div');
    wrap.className = 'alwaysreveal reveal';
    const word = document.createElement('div');
    word.className = 'always-word';
    word.textContent = 'Always.';
    wrap.appendChild(word);
    return wrap;
  }

  const BLOCK_RENDERERS = {
    text: textBlock,
    photo: photoBlock,
    song: songBlock,
    twobooks: twoBooksBlock,
    pathmotif: pathMotifBlock,
    objects: objectsBlock,
    alwaysreveal: alwaysRevealBlock,
    divider: dividerBlock,
  };

  /* ---------------- Build chapter DOM ---------------- */
  function buildChapterScene(ch, index){
    const scene = document.createElement('section');
    scene.className = 'scene';
    scene.id = `scene-ch-${ch.id}`;
    scene.dataset.mood = ch.mood;
    scene.dataset.index = index;

    const scroll = document.createElement('div');
    scroll.className = 'scene-scroll';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'chapter-eyebrow reveal';
    eyebrow.textContent = `Chapter ${ch.roman}`;

    const title = document.createElement('h2');
    title.className = 'chapter-title reveal';
    title.textContent = ch.title;

    const divider = document.createElement('div');
    divider.className = 'chapter-divider';

    const body = document.createElement('div');
    body.className = 'chapter-body';
    ch.blocks.forEach(b => {
      const fn = BLOCK_RENDERERS[b.type];
      if(fn) body.appendChild(fn(b));
    });

    if(ch.outro && ch.outro.length){
      const outro = document.createElement('div');
      outro.className = 'chapter-outro reveal';
      ch.outro.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        outro.appendChild(p);
      });
      body.appendChild(outro);
    }

    scroll.appendChild(eyebrow);
    scroll.appendChild(title);
    scroll.appendChild(divider);
    scroll.appendChild(body);
    scene.appendChild(scroll);
    return scene;
  }

  /* ---------------- Finale scene ---------------- */
  function buildFinaleScene(){
    const scene = document.createElement('section');
    scene.className = 'scene';
    scene.id = 'scene-finale';
    scene.dataset.mood = 'joyful';

    const scroll = document.createElement('div');
    scroll.className = 'scene-scroll';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'chapter-eyebrow reveal';
    eyebrow.textContent = `Chapter X`;
    const title = document.createElement('h2');
    title.className = 'chapter-title reveal';
    title.textContent = `Happy ${S.HER_AGE}${ordinalSuffix(S.HER_AGE)}`;
    const divider = document.createElement('div');
    divider.className = 'chapter-divider';

    const stage = document.createElement('div');
    stage.className = 'finale-stage';

    const sky = document.createElement('div');
    sky.className = 'memory-sky';
    const positions = [
      [18,20],[68,12],[85,38],[30,45],[55,55],
      [12,68],[75,70],[42,78],[60,30],[25,88]
    ];
    S.finale.memoryStars.forEach((mem, i) => {
      const btn = document.createElement('button');
      btn.className = 'mem-star';
      btn.style.left = positions[i][0] + '%';
      btn.style.top = positions[i][1] + '%';
      btn.style.animationDelay = (i * 0.12) + 's';
      btn.setAttribute('aria-label', mem);
      btn.addEventListener('click', () => { caption.textContent = mem; });
      sky.appendChild(btn);
    });
    const caption = document.createElement('div');
    caption.className = 'mem-caption';
    caption.textContent = 'Tap a star.';

    const lines = document.createElement('div');
    lines.className = 'finale-lines';
    S.finale.lines.forEach(l => {
      const p = document.createElement('p');
      p.textContent = l;
      lines.appendChild(p);
    });
    const pause = document.createElement('p');
    pause.className = 'pause';
    pause.textContent = S.finale.pause;
    lines.appendChild(pause);
    const finalLine = document.createElement('p');
    finalLine.textContent = S.finale.finalLine;
    finalLine.style.fontStyle = 'italic';
    finalLine.style.color = 'var(--gold-bright)';
    lines.appendChild(finalLine);

    const headlineWrap = document.createElement('div');
    headlineWrap.className = 'headline-wrap reveal';
    headlineWrap.innerHTML = `<h1 class="headline">Happy ${S.HER_AGE}${ordinalSuffix(S.HER_AGE)} Birthday,<br>${S.HER_NAME} <span class="heart">&#10084;</span></h1>`;

    const closing = document.createElement('div');
    closing.className = 'closing-lines reveal';
    S.finale.closing.forEach(l => {
      const p = document.createElement('p');
      p.textContent = l;
      closing.appendChild(p);
    });

    const letterToggle = document.createElement('button');
    letterToggle.className = 'btn-primary letter-toggle';
    letterToggle.type = 'button';
    letterToggle.textContent = 'Read my letter';

    const letterPanel = document.createElement('div');
    letterPanel.className = 'letter-panel';
    letterPanel.textContent = S.finale.letter.replace('[MY NAME]', S.MY_NAME);

    letterToggle.addEventListener('click', () => {
      letterPanel.classList.toggle('is-open');
      letterToggle.textContent = letterPanel.classList.contains('is-open') ? 'Close letter' : 'Read my letter';
      if(letterPanel.classList.contains('is-open')){
        setTimeout(() => letterPanel.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'center'}), 100);
      }
    });

    const replayRow = document.createElement('div');
    replayRow.className = 'replay-row';
    const replayBtn = document.createElement('button');
    replayBtn.className = 'btn-ghost';
    replayBtn.type = 'button';
    replayBtn.textContent = 'Read our story again';
    replayBtn.addEventListener('click', () => Router.goTo(0));
    replayRow.appendChild(replayBtn);

    stage.appendChild(sky);
    stage.appendChild(caption);
    stage.appendChild(lines);
    stage.appendChild(headlineWrap);
    stage.appendChild(closing);
    stage.appendChild(letterToggle);
    stage.appendChild(letterPanel);
    stage.appendChild(replayRow);

    scroll.appendChild(eyebrow);
    scroll.appendChild(title);
    scroll.appendChild(divider);
    scroll.appendChild(stage);
    scene.appendChild(scroll);
    return scene;
  }

  function ordinalSuffix(n){
    const j = n % 10, k = n % 100;
    if(j===1 && k!==11) return 'st';
    if(j===2 && k!==12) return 'nd';
    if(j===3 && k!==13) return 'rd';
    return 'th';
  }

  /* ---------------- Confetti / celebration ---------------- */
  function celebrate(){
    if(reduceMotion) return;
    const canvas = document.getElementById('celebrate-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth+'px';
    canvas.style.height = window.innerHeight+'px';
    const colors = ['#c9a15c','#e8cd94','#9c3b3b','#e08a4b','#f3ead4'];
    const particles = Array.from({length: 90}, () => ({
      x: Math.random()*canvas.width,
      y: -20 - Math.random()*canvas.height*0.4,
      r: (Math.random()*4+2)*devicePixelRatio,
      c: colors[Math.floor(Math.random()*colors.length)],
      vy: (Math.random()*1.5+1)*devicePixelRatio,
      vx: (Math.random()-0.5)*1.2*devicePixelRatio,
      rot: Math.random()*Math.PI,
      vr: (Math.random()-0.5)*0.1,
      life: 0,
    }));
    let frame = 0;
    function draw(){
      frame++;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      let alive = false;
      for(const p of particles){
        if(p.y < canvas.height + 30){
          alive = true;
          p.x += p.vx; p.y += p.vy; p.rot += p.vr;
          ctx.save();
          ctx.translate(p.x,p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.c;
          ctx.globalAlpha = 0.9;
          ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);
          ctx.restore();
        }
      }
      if(alive && frame < 420) requestAnimationFrame(draw);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    draw();
  }

  /* ---------------- Reveal-on-scroll ---------------- */
  let revealObserver;
  function observeReveals(root){
    $$('.reveal', root).forEach(el => revealObserver.observe(el));
  }

  /* ---------------- Router / Navigation ---------------- */
  const Router = {
    scenes: [],
    current: 0,
    init(scenes){
      this.scenes = scenes;
    },
    goTo(i, opts={}){
      if(i < 0 || i >= this.scenes.length) return;
      this.scenes.forEach((s,idx) => s.classList.toggle('is-active', idx===i));
      this.current = i;
      const scene = this.scenes[i];
      scene.querySelector('.scene-scroll')?.scrollTo({top:0, behavior:'auto'});
      observeReveals(scene);
      updateChrome(i);
      if(scene.id === 'scene-finale' && !opts.skipCelebrate){
        setTimeout(celebrate, 400);
      }
    },
    next(){ this.goTo(this.current+1); },
    prev(){ this.goTo(this.current-1); },
  };
  window.Router = Router;

  /* ---------------- Chrome: topbar / bottombar ---------------- */
  let dots = [];
  function updateChrome(i){
    const isProlog = i === 0;
    $('#topbar').style.display = isProlog ? 'none' : 'flex';
    $('#bottombar').style.display = isProlog ? 'none' : 'flex';
    if(isProlog) return;
    dots.forEach((d, idx) => {
      d.classList.toggle('is-done', idx < i);
      d.classList.toggle('is-current', idx === i);
    });
    $('#prevBtn').disabled = (i <= 0);
    $('#nextBtn').style.visibility = (i >= Router.scenes.length-1) ? 'hidden' : 'visible';
    const scene = Router.scenes[i];
    const label = scene.id === 'scene-finale' ? '' : (scene.querySelector('.chapter-eyebrow')?.textContent || '');
    $('#navLabel').textContent = label;
  }

  /* ---------------- Music control ---------------- */
  function initMusic(){
    const btn = $('#musicBtn');
    btn.querySelector('.icon').innerHTML = ICONS.music;
    btn.querySelector('.music-label').textContent = S.AUDIO.label;
    const audio = new Audio(S.AUDIO.src);
    audio.loop = true;
    audio.preload = 'none';
    let playing = false;
    let knownMissing = false;
    audio.addEventListener('error', () => { knownMissing = true; });
    btn.addEventListener('click', () => {
      if(knownMissing){
        showToast('Add a file at /' + S.AUDIO.src + ' to play your song here.');
        return;
      }
      if(playing){
        audio.pause();
        playing = false;
        btn.classList.remove('is-playing');
        btn.querySelector('.music-label').textContent = S.AUDIO.label;
      } else {
        audio.play().then(() => {
          playing = true;
          btn.classList.add('is-playing');
          btn.querySelector('.music-label').textContent = 'Playing our song';
        }).catch(() => {
          knownMissing = true;
          showToast('Add a file at /' + S.AUDIO.src + ' to play your song here.');
        });
      }
    });
  }

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function showToast(msg){
    const t = $('#eggToast');
    t.textContent = msg;
    t.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-shown'), 3200);
  }

  /* ---------------- Easter eggs ---------------- */
  function initEasterEggs(){
    // "Always" — hidden tap on the brand text in the top bar
    let brandTaps = 0;
    $('#brand').addEventListener('click', () => {
      brandTaps++;
      if(brandTaps >= 3){ showToast('Always.'); brandTaps = 0; }
    });
    // "basically" — hidden tap on nav label
    let labelTaps = 0;
    $('#navLabel').addEventListener('click', () => {
      labelTaps++;
      if(labelTaps >= 3){ showToast(S.easterEggs.basically); labelTaps = 0; }
    });
    // door
    $('#eggDoor').addEventListener('click', () => showToast(S.easterEggs.door));
  }

  /* ---------------- Prologue ---------------- */
  function initPrologue(){
    $('#prologueAddress').textContent = S.prologue.address;
    const linesWrap = $('#prologueLines');
    S.prologue.lines.forEach(l => {
      const p = document.createElement('p');
      p.textContent = l;
      linesWrap.appendChild(p);
    });
    $('#prologueBtn').textContent = S.prologue.button + ' \u2192';

    const envelopeWrap = $('#envelopeWrap');
    const letter = $('#prologueLetter');
    envelopeWrap.addEventListener('click', () => {
      if(envelopeWrap.classList.contains('is-open')) return;
      envelopeWrap.classList.add('is-open');
      setTimeout(() => { letter.style.display = 'flex'; requestAnimationFrame(()=>letter.classList.add('is-in')); }, 500);
    });
    envelopeWrap.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); envelopeWrap.click(); }
    });
    $('#prologueBtn').addEventListener('click', () => Router.next());
  }

  /* ---------------- Swipe ---------------- */
  function initSwipe(root){
    let sx=0, sy=0, active=false;
    root.addEventListener('touchstart', e => {
      const t = e.touches[0]; sx=t.clientX; sy=t.clientY; active=true;
    }, {passive:true});
    root.addEventListener('touchend', e => {
      if(!active) return; active=false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if(Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)*1.5){
        if(dx < 0) Router.next(); else Router.prev();
      }
    }, {passive:true});
  }

  /* ---------------- Init ---------------- */
  function boot(){
    initStarfield();
    $('#brand').textContent = S.HER_NAME + ', always';
    document.title = 'To ' + S.HER_NAME;

    const app = $('#app');
    const chapterScenes = S.chapters.map((ch,i) => buildChapterScene(ch, i+1));
    chapterScenes.forEach(s => app.appendChild(s));
    const finaleScene = buildFinaleScene();
    app.appendChild(finaleScene);

    const prologueScene = $('#scene-prologue');
    const allScenes = [prologueScene, ...chapterScenes, finaleScene];
    Router.init(allScenes);

    // progress dots (one per chapter + finale)
    const progressWrap = $('#threadProgress');
    const navScenes = allScenes.slice(1); // exclude prologue
    navScenes.forEach((s, idx) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to section ' + (idx+1));
      dot.addEventListener('click', () => Router.goTo(idx+1));
      progressWrap.appendChild(dot);
      dots.push(dot);
    });

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-in'); });
    }, {threshold: 0.15, rootMargin: '0px 0px -8% 0px'});

    initPrologue();
    initMusic();
    initEasterEggs();
    initSwipe(app);

    $('#prevBtn').addEventListener('click', () => Router.prev());
    $('#nextBtn').addEventListener('click', () => Router.next());
    window.addEventListener('keydown', e => {
      if(e.key === 'ArrowRight') Router.next();
      if(e.key === 'ArrowLeft') Router.prev();
    });

    Router.goTo(0, {skipCelebrate:true});
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
