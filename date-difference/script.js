const a=document.getElementById('a'),b=document.getElementById('b'),r=document.getElementById('result');document.getElementById('calc').onclick=()=>{if(!a.value||!b.value)return;const d=Math.abs(new Date(a.value)-new Date(b.value));r.textContent=Math.round(d/86400000)};
lucide?.createIcons?.();
