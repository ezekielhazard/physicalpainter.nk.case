/* ==========================================================
   physicalpainter.nk — скрипты сайта
   ГЛАВНОЕ МЕСТО ДЛЯ ВАС: список WORKS ниже (там вставляются видео).
   ========================================================== */

const C={sumi:'#16151f',aka:'#F0392B',kin:'#FFCB2E',ai:'#2A3FA8',sakura:'#FF9EBB',asagi:'#19B5A5',kami:'#FFF7E8'};

/* ---------- seigaiha ---------- */
function seigaiha(bg,line,sw){
  sw=sw||1.5;
  const ring=(x,y)=>`<circle cx="${x}" cy="${y}" r="20" fill="${bg}"/>`+[20,15,10,5].map(r=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${line}" stroke-width="${sw}"/>`).join('');
  return ring(20,-10)+ring(0,0)+ring(40,0)+ring(20,10)+ring(0,20)+ring(40,20)+ring(20,30);
}
document.querySelectorAll('[data-sg]').forEach(el=>{
  const [bg,line]=el.dataset.sg.split(',');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20">${seigaiha(bg,line)}</svg>`;
  el.style.setProperty('--sg',`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
});

/* ---------- анимированные заглушки (пока нет видео) ---------- */
const wrap=(inner,label)=>`<svg class="art" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const ART={
  sun(){
    let r='';
    for(let i=0;i<18;i++){
      const a=i*Math.PI/9,b=a+Math.PI/18,R=700;
      r+=`<path d="M200 320 L${(200+R*Math.cos(a)).toFixed(1)} ${(320+R*Math.sin(a)).toFixed(1)} L${(200+R*Math.cos(b)).toFixed(1)} ${(320+R*Math.sin(b)).toFixed(1)}Z" fill="${C.kin}"/>`;
    }
    return wrap(`<rect width="400" height="400" fill="${C.aka}"/><g class="spin20">${r}</g><rect y="320" width="400" height="80" fill="${C.sumi}"/><circle cx="200" cy="320" r="88" fill="${C.kami}" stroke="${C.sumi}" stroke-width="6"/><polygon points="0,400 0,352 90,300 170,352 262,286 400,362 400,400" fill="${C.sumi}"/>`,'Восходящее солнце');
  },
  waves(id){
    return wrap(`<defs><pattern id="${id}" width="40" height="20" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">${seigaiha(C.asagi,C.kami,1.4)}</pattern></defs><rect width="400" height="400" fill="${C.sakura}"/><g class="bob"><circle cx="200" cy="200" r="96" fill="${C.aka}" stroke="${C.sumi}" stroke-width="6"/></g><g class="drift60"><rect x="0" y="222" width="520" height="190" fill="url(#${id})"/></g><rect y="219" width="400" height="6" fill="${C.sumi}"/>`,'Волны');
  },
  eq(){
    const cols=[C.ai,C.sakura,C.aka,C.kin,C.asagi,C.sumi,C.aka,C.ai];
    return wrap(`<rect width="400" height="400" fill="${C.kami}"/>`+cols.map((c,i)=>`<rect class="eq" style="--d:${(-i*0.37).toFixed(2)}s" x="${i*50}" y="0" width="50" height="400" fill="${c}"/>`).join('')+`<g class="pulse"><circle cx="200" cy="200" r="64" fill="${C.aka}" stroke="${C.kami}" stroke-width="8"/></g><circle cx="200" cy="200" r="24" fill="${C.sumi}"/>`,'Эквалайзер');
  },
  enso(){
    return wrap(`<rect width="400" height="400" fill="${C.kin}"/><g class="spin360"><circle cx="200" cy="200" r="84" fill="none" stroke="${C.sumi}" stroke-width="30" stroke-linecap="round" stroke-dasharray="470 60"/></g><g class="pulse"><rect x="282" y="252" width="40" height="40" fill="${C.aka}"/></g><text x="302" y="281" text-anchor="middle" font-size="26" fill="${C.kami}" font-family="serif">画</text>`,'Энсо');
  },
  check(){
    let r='';
    for(let i=-2;i<8;i++)for(let j=0;j<8;j++)r+=`<rect x="${i*50}" y="${j*50}" width="50" height="50" fill="${(i+j+4)%2?C.kami:C.ai}"/>`;
    return wrap(`<g class="drift100">${r}</g><g class="pulse"><circle cx="200" cy="200" r="104" fill="${C.sakura}" stroke="${C.sumi}" stroke-width="10"/></g><circle cx="200" cy="200" r="44" fill="${C.aka}"/>`,'Шахматный узор');
  },
  rings(){
    const cs=[C.aka,C.kin,C.asagi,C.sakura];
    let r=`<rect width="400" height="400" fill="${C.sumi}"/>`;
    [50,150,250,350].forEach((x,i)=>{
      const c=cs[i];
      r+=`<g class="pulse" style="--d:${(-i*.5).toFixed(1)}s"><circle cx="${x}" cy="200" r="42" fill="${c}"/><circle cx="${x}" cy="200" r="31" fill="${C.sumi}"/><circle cx="${x}" cy="200" r="21" fill="${c}"/><circle cx="${x}" cy="200" r="9" fill="${C.sumi}"/></g>`;
    });
    return wrap(r,'Кольца');
  },
  orbit(){
    return wrap(`<rect width="400" height="400" fill="${C.ai}"/><circle cx="200" cy="200" r="150" fill="none" stroke="${C.kami}" stroke-width="3" stroke-dasharray="6 10"/><circle cx="200" cy="200" r="90" fill="none" stroke="${C.kami}" stroke-width="3" stroke-dasharray="6 10"/><g class="pulse"><circle cx="200" cy="200" r="56" fill="${C.sakura}" stroke="${C.sumi}" stroke-width="6"/></g><g class="spin360"><circle cx="200" cy="50" r="22" fill="${C.kin}" stroke="${C.sumi}" stroke-width="5"/></g><g class="spin360" style="animation-duration:8s;animation-direction:reverse"><circle cx="200" cy="110" r="14" fill="${C.aka}" stroke="${C.sumi}" stroke-width="4"/></g>`,'Орбиты');
  }
};

/* ╔══════════════════════════════════════════════════════════════════╗
   ║   ★★★  ЗДЕСЬ ВСТАВЛЯЮТСЯ ВАШИ ВИДЕО  ★★★                        ║
   ╚══════════════════════════════════════════════════════════════════╝

   Каждая строка ниже {...} — это одна плитка на сайте.

   ПОЛЯ:
     t       — название работы (видно при наведении и в плеере)
     k       — подпись под названием (инструменты, тип работы)
     n       — иероглиф-номер в красной метке (壱 弐 参 四 五 六 七 八 九 十)
     c, r    — размер плитки в сетке: c = ширина (из 12 колонок), r = высота (в рядах)
     art     — анимированная заглушка, пока нет видео. Можно оставить как есть.

     video   — ★ ПОЛНОЕ ВИДЕО, которое откроется по клику.
               Пример:  video:'videos/klip-obladaet.mp4'
     preview — ★ (по желанию) КОРОТКИЙ ЗАЦИКЛЕННЫЙ ФРАГМЕНТ для самой плитки, 5–10 сек, без звука.
               Пример:  preview:'videos/klip-obladaet-preview.mp4'
               Если не указать — плитка сама будет играть video (тяжелее для сайта).
     poster  — ★ (по желанию) ОБЛОЖКА-картинка jpg/png/webp.
               Пример:  poster:'covers/klip-obladaet.jpg'
               Показывается, пока видео грузится, а также если у работы нет video.
     embed   — ★ ССЫЛКА НА YOUTUBE / VIMEO вместо файла (открывается в плеере по клику).
               YouTube: 'https://www.youtube-nocookie.com/embed/ВАШ_ID'
                        (ID — это часть после v= в обычной ссылке)
               Vimeo:   'https://player.vimeo.com/video/ВАШ_ID'
               Для плитки при этом лучше указать poster (обложку).

   ФОРМАТ ФАЙЛОВ:  .mp4, кодек H.264 (видео) + AAC (звук), 1280×720 или 1920×1080.
   КУДА КЛАСТЬ:    видео → папка  videos/   |   обложки → папка  covers/
   Имена файлов — латиницей, без пробелов (klip-1.mp4, а не «Клип 1.mp4»).

   Как добавить ещё одну работу: скопируйте целую строку {...}, вставьте ниже
   и измените поля. Как удалить — удалите строку.
   Сетка: в каждом ряду ширины плиток (c) должны давать в сумме 12.
*/
const WORKS=[
  // ─── РЯД 1: две крупные плитки (7 + 5 = 12) ───
  {
    t:'Музыкальный клип', k:'3D, VFX, монтаж', n:'壱', c:7, r:3, art:'sun',
    video:'',    // ← ВСТАВЬТЕ: 'videos/имя-файла.mp4'
    preview:'',  // ← (по желанию) 'videos/имя-файла-preview.mp4'
    poster:'',   // ← (по желанию) 'covers/имя-файла.jpg'
    embed:''     // ← ИЛИ ссылка YouTube/Vimeo (вместо video)
  },
  {
    t:'3D-визуал', k:'Blender, Cinema 4D', n:'弐', c:5, r:3, art:'waves',
    video:'',    // ← ВСТАВЬТЕ видео здесь
    preview:'',
    poster:'',
    embed:''
  },

  // ─── РЯД 2: три средние плитки (4 + 4 + 4 = 12) ───
  {
    t:'Motion graphics', k:'After Effects', n:'参', c:4, r:2, art:'eq',
    video:'',    // ← ВСТАВЬТЕ видео здесь
    preview:'',
    poster:'',
    embed:''
  },
  {
    t:'VFX и cleanup', k:'Compositing', n:'四', c:4, r:2, art:'enso',
    video:'',    // ← ВСТАВЬТЕ видео здесь
    preview:'',
    poster:'',
    embed:''
  },
  {
    t:'Реклама', k:'Motion, 3D', n:'五', c:4, r:2, art:'check',
    video:'',    // ← ВСТАВЬТЕ видео здесь
    preview:'',
    poster:'',
    embed:''
  },

  // ─── РЯД 3: две плитки (5 + 7 = 12) ───
  {
    t:'UI/UX', k:'Figma, digital-дизайн', n:'六', c:5, r:2, art:'orbit',
    video:'',    // ← сюда можно поставить запись экрана интерфейса (mp4)
    preview:'',
    poster:'',   // ← или просто картинку-скриншот интерфейса
    embed:''
  },
  {
    t:'Визуалы для артистов', k:'Обложки, петли, экраны', n:'七', c:7, r:2, art:'rings',
    video:'',    // ← ВСТАВЬТЕ видео здесь
    preview:'',
    poster:'',
    embed:''
  }
];

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function media(w,i,big){
  if(big&&w.embed)return `<iframe src="${w.embed}" title="${w.t}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  if(w.video){
    return big
      ?`<video src="${w.video}" poster="${w.poster||''}" controls autoplay playsinline></video>`
      :`<video class="art" data-preview src="${w.preview||w.video}" poster="${w.poster||''}" muted loop playsinline preload="metadata"></video>`;
  }
  if(w.poster)return `<img class="art" src="${w.poster}" alt="${w.t}" style="object-fit:cover">`;
  return ART[w.art]('w'+i+(big?'L':''));
}
const hasVideo=w=>!!(w.video||w.embed);

const grid=document.getElementById('grid');
WORKS.forEach((w,i)=>{
  const b=document.createElement('button');
  b.type='button';b.className='tile';
  b.style.setProperty('--c',w.c);b.style.setProperty('--r',w.r);
  b.setAttribute('aria-label','Открыть: '+w.t);
  b.innerHTML=media(w,i,false)+`<span class="no" aria-hidden="true">${w.n}</span><span class="play" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M2 1l13 7-13 7z" fill="currentColor"/></svg></span><span class="cap">${w.t}<small>${w.k}</small></span>`;
  b.addEventListener('click',()=>openLB(i));
  grid.appendChild(b);
});

/* превью-видео играют, пока видны на экране */
if(!reduce&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    const v=e.target;
    if(e.isIntersecting)v.play().catch(()=>{});else v.pause();
  }),{threshold:.5});
  document.querySelectorAll('video[data-preview]').forEach(v=>io.observe(v));
}

/* ---------- lightbox ---------- */
const lb=document.getElementById('lb'),lbArt=document.getElementById('lbArt'),lbTitle=document.getElementById('lbTitle');
let cur=0;
function show(i){
  cur=(i+WORKS.length)%WORKS.length;
  const w=WORKS[cur];
  lbArt.innerHTML=media(w,cur,true);
  lbTitle.innerHTML=`${w.n}  ${w.t}<small>${hasVideo(w)?w.k:w.k+' — здесь будет видео'}</small>`;
}
function openLB(i){show(i);lb.showModal()}
document.getElementById('prev').onclick=()=>show(cur-1);
document.getElementById('next').onclick=()=>show(cur+1);
document.getElementById('close').onclick=()=>lb.close();
lb.addEventListener('close',()=>{lbArt.innerHTML=''});
lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
lb.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft')show(cur-1);
  if(e.key==='ArrowRight')show(cur+1);
});

/* ---------- marquee ---------- */
/* Слова в бегущей строке под первым экраном — меняйте/добавляйте */
const items=['CG Generalist','立体','2D Motion Design','映像','VFX','特効','UI/UX','Creative Production','physicalpainter.nk'];
const grp='<div class="grp">'+[...items,...items].map(t=>`<span>${t}</span><i></i>`).join('')+'</div>';
document.getElementById('track').innerHTML=grp+grp;

/* ---------- process ---------- */
/* Этапы процесса: [иероглиф-номер, название, цвет фона, (цвет текста)] */
const steps=[
  ['壱','Идея','var(--kin)'],['弐','Концепт','var(--sakura)'],['参','Дизайн','var(--asagi)'],['四','3D','var(--kami)'],
  ['五','Motion','var(--ai)','var(--kami)'],['六','VFX','var(--aka)','var(--kami)'],['七','Монтаж','var(--asagi)'],['八','Финал','var(--kin)']
];
document.getElementById('flow').innerHTML=steps.map(s=>`<div class="step" role="listitem" style="--b:${s[2]};--f:${s[3]||'var(--sumi)'}"><i aria-hidden="true">${s[0]}</i><span>${s[1]}</span></div>`).join('');

/* ---------- clients ---------- */
/* СПИСОК КЛИЕНТОВ — добавляйте имена в кавычках через запятую */
const clients=['OBLADAET','YASMI','Kondachelo','OG Buda','MAYOT','Tony Souljah','Rakhim','TOXIS','JEEMBO','BATO','UnknownT','Баста','GloRilla','Газпром','Серч','Earth Gang','и многие другие'];
const pal=[['var(--kin)'],['var(--sakura)'],['var(--asagi)'],['var(--kami)'],['var(--aka)','var(--kami)'],['var(--ai)','var(--kami)']];
document.getElementById('wall').innerHTML=clients.map((n,i)=>{
  const p=pal[i%pal.length];
  return `<span class="chip" style="--b:${p[0]};--f:${p[1]||'var(--sumi)'}">${n}</span>`;
}).join('');
