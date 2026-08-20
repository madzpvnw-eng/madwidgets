const zones=[
  ["Jakarta","Asia/Jakarta"],["Tokyo","Asia/Tokyo"],["London","Europe/London"],["New York","America/New_York"]
];
const el=document.getElementById("clocks");
function render(){const now=new Date();el.innerHTML=zones.map(([city,tz])=>`<div class="row"><div><strong>${city}</strong><small>${new Intl.DateTimeFormat("en-US",{timeZone:tz,timeZoneName:"short"}).format(now).split(", ").pop()}</small></div><b>${new Intl.DateTimeFormat("en-GB",{timeZone:tz,hour:"2-digit",minute:"2-digit"}).format(now)}</b></div>`).join("");}
render();setInterval(render,1000);