
const body=document.body;
document.getElementById('year').textContent=new Date().getFullYear();

const cursor=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});

const words=['useful.','clean.','practical.','interactive.','different.'];
let wi=0;
setInterval(()=>{wi=(wi+1)%words.length;document.getElementById('rotatingWord').textContent=words[wi]},1800);

document.getElementById('themeToggle').onclick=()=>{
  body.classList.toggle('light');
  document.getElementById('themeToggle').textContent=body.classList.contains('light')?'☾':'☀';
};

const menuBtn=document.getElementById('menuBtn'), navLinks=document.getElementById('navLinks');
menuBtn.onclick=()=>navLinks.classList.toggle('open');
document.querySelectorAll('.nav-links a').forEach(a=>a.onclick=()=>navLinks.classList.remove('open'));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
},{threshold:.13});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('.counter');
let counted=false;
const counterObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;
    counters.forEach(c=>{
      const target=+c.dataset.target; let n=0;
      const step=Math.max(1,Math.ceil(target/45));
      const tick=()=>{n=Math.min(target,n+step);c.textContent=n;if(n<target)requestAnimationFrame(tick)};
      tick();
    });
  }
});
counterObserver.observe(document.querySelector('.hero-metrics'));

document.querySelectorAll('.interest-card').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.interest-card').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('interestText').textContent=btn.dataset.text;
  }
});

document.querySelectorAll('.details-btn').forEach(btn=>{
  btn.onclick=()=>{
    const extra=btn.nextElementSibling;
    extra.classList.toggle('open');
    btn.textContent=extra.classList.contains('open')?'Hide details ↑':'See details ↓';
  }
});

document.querySelectorAll('.filter').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      card.classList.toggle('hidden',f!=='all'&&card.dataset.category!==f);
    });
  }
});

const skills={
  data:[
    ['SQL','Querying and organizing structured data'],
    ['Power BI','Interactive dashboards and reporting'],
    ['Tableau','Visual analytics and storytelling'],
    ['Excel','Analysis, formulas, reporting, and organization'],
    ['Python','Foundational data analysis and scripting']
  ],
  engineering:[
    ['AutoCAD','Survey plotting, pile centre calculations, drawings'],
    ['SolidWorks','Part modelling, drawings, tooling concepts'],
    ['PFMEA','Process risk documentation and manufacturing analysis'],
    ['Leica Survey Equipment','MS60, TS16, GS14 field workflows']
  ],
  web:[
    ['HTML','Semantic page structure and components'],
    ['CSS','Responsive layouts, animation, visual design'],
    ['JavaScript','Front-end interactions and UI behaviour'],
    ['UX Thinking','Flows, hierarchy, usability, product concepts']
  ],
  professional:[
    ['Leadership','Led student teams and coordinated initiatives'],
    ['Corporate Relations','Sponsor outreach and partnership communication'],
    ['Communication','Professional writing, presentations, teamwork'],
    ['Problem Solving','Technical, operational, and business contexts']
  ]
};
function renderSkills(key){
  document.getElementById('skillPanel').innerHTML=`<div class="skill-list">${skills[key].map(s=>`<div class="skill-item"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>`;
}
renderSkills('data');
document.querySelectorAll('.skill-tab').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.skill-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderSkills(btn.dataset.skill);
  }
});

const projectInfo={
  barbershop:{type:'WEB DEVELOPMENT',title:'Interactive Barbershop Website',text:'A custom service website concept designed around a real booking experience instead of a static business page.',details:['Interactive appointment flow','Barber and service selection','Responsive mobile layout','Review and service sections']},
  gnome:{type:'STARTUP / PRODUCT',title:'Local Gnome',text:'An early-stage local services concept focused on making it easier for people to discover and connect with nearby help.',details:['Brand identity exploration','App interface concepts','Local service marketplace direction','Product and UX thinking']},
  dashboard:{type:'DATA / ANALYTICS',title:'Analytics & Dashboard Practice',text:'Hands-on practice using analytics tools to turn raw data into understandable summaries and visual dashboards.',details:['SQL querying','Power BI and Tableau visuals','Excel analysis','Python data workflows']},
  ev:{type:'RESEARCH',title:'EV Charging Infrastructure',text:'Research focused on technology challenges and opportunities in Ontario’s EV charging network.',details:['Smart charging and load management','Charger reliability','Grid readiness','Technology recommendations']}
};
const modal=document.getElementById('projectModal');
document.querySelectorAll('.project-btn').forEach(btn=>{
  btn.onclick=()=>{
    const p=projectInfo[btn.dataset.project];
    document.getElementById('modalType').textContent=p.type;
    document.getElementById('modalTitle').textContent=p.title;
    document.getElementById('modalText').textContent=p.text;
    document.getElementById('modalDetails').innerHTML=p.details.map(x=>`<div>${x}</div>`).join('');
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');
  }
});
document.querySelectorAll('[data-close]').forEach(el=>el.onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')});

const drawer=document.getElementById('resumeDrawer');
document.getElementById('resumeBtn').onclick=()=>drawer.classList.add('open');
document.getElementById('drawerClose').onclick=()=>drawer.classList.remove('open');
drawer.addEventListener('click',e=>{if(e.target===drawer)drawer.classList.remove('open')});

const card=document.querySelector('.tilt-card');
card.addEventListener('mousemove',e=>{
  const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  const ry=((x/r.width)-.5)*8,rx=-((y/r.height)-.5)*8;
  card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
});
card.addEventListener('mouseleave',()=>card.style.transform='rotateX(0) rotateY(0)');

document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`;
  });
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  const message=document.getElementById('message').value.trim();
  const subject=encodeURIComponent(`Portfolio inquiry from ${name}`);
  const bodyText=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  document.getElementById('formStatus').textContent='Opening your email app...';
  window.location.href=`mailto:ajay.suceethar21@gmail.com?subject=${subject}&body=${bodyText}`;
});
