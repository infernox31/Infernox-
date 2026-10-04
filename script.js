const seedGames=[
{id:1,title:"Shadow Protocol",developer:"Nightfall Studio",genre:"Action",platform:"Windows",version:"1.2",releaseDate:"2026-09-18",rating:4.8,downloads:18420,views:48200,featured:true,status:"Available",description:"A cinematic action experience where every decision changes the battlefield.",tags:["ACTION","CINEMATIC"],coverImage:"",downloadUrl:"#"},
{id:2,title:"Project Abyss",developer:"Vertex Labs",genre:"Horror",platform:"Android",version:"1.0",releaseDate:"2026-09-10",rating:4.6,downloads:12890,views:31900,featured:true,status:"Available",description:"Descend into a hostile world where survival depends on how well you read the darkness.",tags:["HORROR","SURVIVAL"],coverImage:"",downloadUrl:"#"},
{id:3,title:"Neon Velocity",developer:"Overdrive",genre:"Racing",platform:"Windows",version:"2.1",releaseDate:"2026-08-28",rating:4.7,downloads:21540,views:55100,featured:false,status:"Available",description:"High-speed street racing with impossible turns and a futuristic city.",tags:["RACING","ARCADE"],coverImage:"",downloadUrl:"#"},
{id:4,title:"Last Horizon",developer:"Orbit Games",genre:"Adventure",platform:"Android",version:"0.9",releaseDate:"2026-10-20",rating:4.4,downloads:0,views:8200,featured:true,status:"Coming Soon",description:"A mysterious journey beyond the edge of the known world.",tags:["ADVENTURE","STORY"],coverImage:"",downloadUrl:"#"},
{id:5,title:"Zero Hour",developer:"Black Sector",genre:"Shooter",platform:"Windows",version:"1.0",releaseDate:"2026-07-16",rating:4.5,downloads:17320,views:40200,featured:false,status:"Available",description:"Fast tactical combat built around precision, movement and team play.",tags:["SHOOTER","TACTICAL"],coverImage:"",downloadUrl:"#"},
{id:6,title:"Mindframe",developer:"Lucid Works",genre:"Puzzle",platform:"Web",version:"1.4",releaseDate:"2026-06-30",rating:4.3,downloads:9320,views:28100,featured:false,status:"Available",description:"A clean, strange and increasingly difficult puzzle experience.",tags:["PUZZLE","EXPERIMENTAL"],coverImage:"",downloadUrl:"#"},
{id:7,title:"Wasteland 9",developer:"Iron Moon",genre:"Survival",platform:"Android",version:"0.7",releaseDate:"2026-11-05",rating:4.2,downloads:0,views:6100,featured:false,status:"Coming Soon",description:"Build, explore and survive in a world that does not want you there.",tags:["SURVIVAL","OPEN WORLD"],coverImage:"",downloadUrl:"#"},
{id:8,title:"Circuit Breaker",developer:"Kinetic",genre:"Experimental",platform:"Web",version:"0.5",releaseDate:"2026-09-01",rating:4.1,downloads:4420,views:14600,featured:false,status:"Available",description:"An experimental arcade playground that bends familiar rules.",tags:["EXPERIMENTAL","ARCADE"],coverImage:"",downloadUrl:"#"}
];

const KEY="infernox_games_v1";
let games=JSON.parse(localStorage.getItem(KEY)||"null")||seedGames;
function save(){localStorage.setItem(KEY,JSON.stringify(games))}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function fallback(title){return `<div class="game-cover-fallback">${esc(title.slice(0,1).toUpperCase())}</div>`}
function coverStyle(g){return g.coverImage?`style="background-image:linear-gradient(0deg,rgba(0,0,0,.35),rgba(0,0,0,.05)),url('${esc(g.coverImage)}')"`:""}
function openModal(id){document.getElementById(id).classList.add("show")}
function closeModal(id){document.getElementById(id).classList.remove("show")}

function render(){
 const q=document.getElementById("searchInput").value.toLowerCase().trim();
 const genre=document.getElementById("genreFilter").value, platform=document.getElementById("platformFilter").value, sort=document.getElementById("sortFilter").value;
 let filtered=games.filter(g=>(!q||[g.title,g.genre,g.developer,...(g.tags||[])].join(" ").toLowerCase().includes(q))&&(!genre||g.genre===genre)&&(!platform||g.platform===platform));
 filtered.sort((a,b)=>sort==="popular"?b.downloads-a.downloads:sort==="rating"?b.rating-a.rating:sort==="az"?a.title.localeCompare(b.title):new Date(b.releaseDate||0)-new Date(a.releaseDate||0));
 document.getElementById("gameGrid").innerHTML=filtered.map(card).join("");
 document.getElementById("emptyState").classList.toggle("hidden",filtered.length>0);
 document.getElementById("statGames").textContent=games.length;
 renderFeatured();
 renderCategories();
 renderAdmin();
}
function card(g){return `<article class="game-card" onclick="openGame(${g.id})"><div class="cover" ${coverStyle(g)}>${g.coverImage?"":fallback(g.title)}</div><button class="play-mini" onclick="event.stopPropagation();openGame(${g.id})">▶</button><div class="game-info"><div class="tags">${(g.tags||[]).slice(0,2).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div><h3>${esc(g.title)}</h3><div class="game-meta"><span>${esc(g.genre)} · ${esc(g.platform)}</span><span>★ ${g.rating||"—"}</span></div></div></article>`}
function renderFeatured(){document.getElementById("featuredGrid").innerHTML=games.filter(g=>g.featured).slice(0,2).map(g=>`<article class="feature-card" onclick="openGame(${g.id})"><div class="cover" ${coverStyle(g)}>${g.coverImage?"":fallback(g.title)}</div><div class="feature-info"><div class="eyebrow">${esc(g.status)} · ${esc(g.genre)}</div><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p><div class="tags">${(g.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div></div></article>`).join("")}
function renderCategories(){const cats=[["⚡","Action"],["◈","Horror"],["◉","Survival"],["⌁","Racing"],["✦","Puzzle"],["◆","Adventure"],["◎","Shooter"],["◇","Experimental"],["∞","Strategy"],["＋","Other"]];document.getElementById("categoryGrid").innerHTML=cats.map(c=>`<button class="category" onclick="document.getElementById('genreFilter').value='${c[1]}';document.getElementById('games').scrollIntoView();render()"><div class="emoji">${c[0]}</div><h3>${c[1]}</h3><p>${games.filter(g=>g.genre===c[1]).length} games</p></button>`).join("")}
function openGame(id){const g=games.find(x=>x.id===id);if(!g)return;g.views=(g.views||0)+1;save();document.getElementById("gameDetail").innerHTML=`<div class="detail-cover" ${coverStyle(g)}>${g.coverImage?"":fallback(g.title)}</div><div class="detail-body"><div class="eyebrow">${esc(g.status)} · ${esc(g.platform)}</div><h2>${esc(g.title)}</h2><p class="muted">Developed by <b>${esc(g.developer)}</b> · Version ${esc(g.version||"1.0")} · ★ ${g.rating||"—"}</p><div class="detail-actions">${g.downloadUrl&&g.downloadUrl!=="#" ? `<a class="primary-btn" href="${esc(g.downloadUrl)}" target="_blank" rel="noopener">Download / Play →</a>`:`<button class="primary-btn" disabled>Coming Soon</button>`}<button class="outline-btn" onclick="closeModal('gameModal')">Close</button></div><div class="detail-block"><h3>ABOUT THE GAME</h3><p>${esc(g.description)}</p></div><div class="detail-block"><h3>GAME INFO</h3><p>Genre: ${esc(g.genre)} &nbsp; • &nbsp; Platform: ${esc(g.platform)} &nbsp; • &nbsp; Release: ${esc(g.releaseDate||"TBA")}</p></div></div>`;openModal("gameModal")}

function renderAdmin(){document.getElementById("aTotal").textContent=games.length;document.getElementById("aFeatured").textContent=games.filter(g=>g.featured).length;document.getElementById("aViews").textContent=games.reduce((n,g)=>n+(g.views||0),0);document.getElementById("adminList").innerHTML=games.map(g=>`<div class="admin-list-item"><div class="thumb" ${coverStyle(g)}></div><div><h4>${esc(g.title)}</h4><small>${esc(g.genre)} · ${esc(g.platform)} · ${esc(g.status)}</small></div><div class="actions"><button onclick="toggleFeatured(${g.id})">${g.featured?"Unfeature":"Feature"}</button><button class="delete" onclick="deleteGame(${g.id})">Delete</button></div></div>`).join("")}
function toggleFeatured(id){const g=games.find(x=>x.id===id);g.featured=!g.featured;save();render()}
function deleteGame(id){if(confirm("Delete this game from the local library?")){games=games.filter(g=>g.id!==id);save();render()}}
function openPublish(){openModal("publishModal")}
document.getElementById("publishForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.target);const g={id:Date.now(),title:d.get("title"),developer:d.get("developer"),genre:d.get("genre"),platform:d.get("platform"),version:d.get("version")||"1.0",releaseDate:d.get("releaseDate")||"TBA",rating:0,downloads:0,views:0,featured:false,status:"Available",description:d.get("description"),tags:[String(d.get("genre")).toUpperCase()],coverImage:d.get("coverImage"),downloadUrl:d.get("downloadUrl")};games.unshift(g);save();e.target.reset();closeModal("publishModal");render();document.getElementById("games").scrollIntoView();alert("Game added to your InfernoX local library.")});
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
["searchInput","genreFilter","platformFilter","sortFilter"].forEach(id=>document.getElementById(id).addEventListener("input",render));
document.getElementById("clearSearch").onclick=()=>{document.getElementById("searchInput").value="";render()};
["publishOpen","heroPublish","ctaPublish","mobilePublish","footerPublish","adminAdd"].forEach(id=>document.getElementById(id).onclick=openPublish);
["adminOpen","footerAdmin"].forEach(id=>document.getElementById(id).onclick=()=>openModal("adminModal"));
document.getElementById("menuBtn").onclick=()=>document.getElementById("mobileMenu").classList.toggle("show");
document.getElementById("searchToggle").onclick=()=>{document.getElementById("games").scrollIntoView();setTimeout(()=>document.getElementById("searchInput").focus(),400)};
window.addEventListener("click",e=>{if(e.target.classList.contains("modal"))e.target.classList.remove("show")});
const genres=[...new Set(games.map(g=>g.genre))].sort();document.getElementById("genreFilter").innerHTML='<option value="">All Genres</option>'+genres.map(g=>`<option>${esc(g)}</option>`).join("");
render();
window.addEventListener("load",()=>setTimeout(()=>{document.getElementById("loader").style.opacity="0";setTimeout(()=>document.getElementById("loader").remove(),600)},500));
