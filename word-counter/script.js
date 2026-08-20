const t=document.getElementById('text');function update(){const v=t.value;document.getElementById('words').textContent=(v.trim().match(/\S+/g)||[]).length;document.getElementById('chars').textContent=v.length;document.getElementById('lines').textContent=v? v.split(/\n/).length:0}t.oninput=update;update();
lucide?.createIcons?.();
