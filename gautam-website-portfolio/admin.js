// DEMO ONLY: browser-side passcode and localStorage are not secure authentication or shared hosting storage.
// For a production multi-device admin, connect Supabase Auth, Database and Storage with RLS policies.
const DEMO_PASSCODE="gautam123";
const CATS=["Business","Gym & Fitness","Restaurant & Food","Salon & Barber","Salon & Spa","Healthcare","E-commerce","Personal Portfolio","Other"];
const $=id=>document.getElementById(id);
let projects=load();
function load(){try{const s=localStorage.getItem("gautamPortfolioProjects");return s?JSON.parse(s):[
{id:"sample-1",name:"Fitness Hub Gym",category:"Gym & Fitness",description:"A bold, modern website concept for a fitness brand.",url:"https://example.com",image:"",status:"published"},
{id:"sample-2",name:"Style Studio",category:"Salon & Barber",description:"A clean and premium online presence for a grooming studio.",url:"https://example.com",image:"",status:"published"},
{id:"sample-3",name:"Cielo Hair Spa",category:"Salon & Spa",description:"An elegant website concept for a hair and beauty spa.",url:"https://example.com",image:"",status:"published"},
{id:"sample-4",name:"The Plumbing Company",category:"Business",description:"A professional service website designed to build trust.",url:"https://example.com",image:"",status:"published"}]}catch(e){return []}}
function persist(){localStorage.setItem("gautamPortfolioProjects",JSON.stringify(projects));render()}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("category").innerHTML=CATS.map(c=>`<option>${c}</option>`).join("");
$("login-btn").onclick=()=>{if($("passcode").value===DEMO_PASSCODE){$("login-view").classList.add("hidden");$("dashboard-view").classList.remove("hidden");render()}else $("login-error").textContent="Incorrect passcode. Please try again."};
$("passcode").addEventListener("keydown",e=>{if(e.key==="Enter")$("login-btn").click()});
$("logout-btn").onclick=()=>{$("dashboard-view").classList.add("hidden");$("login-view").classList.remove("hidden");$("passcode").value=""};
function render(){$("total-count").textContent=projects.length;$("published-count").textContent=projects.filter(p=>p.status==="published").length;$("draft-count").textContent=projects.filter(p=>p.status==="draft").length;$("admin-projects").innerHTML=projects.length?projects.map(p=>`<div class="admin-project"><div><strong>${esc(p.name)}</strong><small>${esc(p.category)} · ${p.status==="published"?"Published":"Draft"} · ${esc(p.url)}</small></div><div class="admin-actions"><button class="mini-btn" data-edit="${esc(p.id)}">Edit</button><button class="mini-btn delete" data-delete="${esc(p.id)}">Delete</button></div></div>`).join(""):`<div class="empty-admin">No projects yet. Add your first project above.</div>`;
document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>edit(b.dataset.edit));document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>removeProject(b.dataset.delete))}
function reset(){$("project-form").reset();$("project-id").value="";$("form-title").textContent="Add a project";$("save-btn").textContent="Save project"}
function edit(id){const p=projects.find(x=>x.id===id);if(!p)return;$("project-id").value=p.id;$("name").value=p.name;$("category").value=p.category;$("url").value=p.url;$("description").value=p.description||"";$("image").value=p.image||"";$("status").value=p.status;$("form-title").textContent="Edit project";$("save-btn").textContent="Update project";window.scrollTo({top:0,behavior:"smooth"})}
function removeProject(id){const p=projects.find(x=>x.id===id);if(p&&confirm(`Delete "${p.name}"? This cannot be undone.`)){projects=projects.filter(x=>x.id!==id);persist();if($("project-id").value===id)reset()}}
$("project-form").onsubmit=e=>{e.preventDefault();const id=$("project-id").value;const item={id:id||("p-"+Date.now()),name:$("name").value.trim(),category:$("category").value,url:$("url").value.trim(),description:$("description").value.trim(),image:$("image").value.trim(),status:$("status").value};try{new URL(item.url)}catch(e){alert("Please enter a valid website URL, including https://");return}if(id)projects=projects.map(p=>p.id===id?item:p);else projects.unshift(item);persist();reset();alert(id?"Project updated.":"Project added.")};
$("cancel-btn").onclick=reset;
