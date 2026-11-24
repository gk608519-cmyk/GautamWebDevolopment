const DEFAULT_PROJECTS = [
 {id:"sample-1",name:"Fitness Hub Gym",category:"Gym & Fitness",description:"A bold, modern website concept for a fitness brand.",url:"https://example.com",image:"",status:"published"},
 {id:"sample-2",name:"Style Studio",category:"Salon & Barber",description:"A clean and premium online presence for a grooming studio.",url:"https://example.com",image:"",status:"published"},
 {id:"sample-3",name:"Cielo Hair Spa",category:"Salon & Spa",description:"An elegant website concept for a hair and beauty spa.",url:"https://example.com",image:"",status:"published"},
 {id:"sample-4",name:"The Plumbing Company",category:"Business",description:"A professional service website designed to build trust.",url:"https://example.com",image:"",status:"published"}
];
const CATEGORIES=["All Projects","Business","Gym & Fitness","Restaurant & Food","Salon & Barber","Salon & Spa","Healthcare","E-commerce","Personal Portfolio","Other"];
function getProjects(){try{const saved=localStorage.getItem("gautamPortfolioProjects");return saved?JSON.parse(saved):DEFAULT_PROJECTS}catch(e){return DEFAULT_PROJECTS}}
function renderPortfolio(category="All Projects"){
 const projects=getProjects().filter(p=>p.status==="published");
 const filtered=category==="All Projects"?projects:projects.filter(p=>p.category===category);
 const list=document.getElementById("category-list"),grid=document.getElementById("project-grid");
 if(!list||!grid)return;
 list.innerHTML=CATEGORIES.map(c=>`<button class="category-btn ${c===category?"active":""}" data-category="${c}">${c}<span style="opacity:.55;margin-left:7px">${c==="All Projects"?projects.length:projects.filter(p=>p.category===c).length}</span></button>`).join("");
 list.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>renderPortfolio(b.dataset.category)));
 document.getElementById("project-count").textContent=`${filtered.length} ${filtered.length===1?"project":"projects"}`;
 document.getElementById("empty-state").classList.toggle("hidden",filtered.length!==0);
 grid.innerHTML=filtered.map(p=>`<article class="project-card"><div class="project-image">${p.image?`<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)} preview">`:`<div class="image-placeholder">${escapeHtml(p.name.split(" ").map(x=>x[0]).join("").slice(0,3))}</div>`}</div><div class="project-content"><div class="project-meta"><span class="project-category">${escapeHtml(p.category)}</span><span class="project-status">● Published</span></div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||"A website project by Gautam.")}</p><a class="project-link" href="${safeUrl(p.url)}" target="_blank" rel="noopener"><span>Explore website</span><span>↗</span></a></div></article>`).join("");
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeAttr(s=""){return escapeHtml(s)}
function safeUrl(s=""){try{const u=new URL(s);return ["http:","https:"].includes(u.protocol)?u.href:"#"}catch(e){return "#"}}
document.getElementById("year").textContent=new Date().getFullYear();
renderPortfolio();
