import{L as a}from"./leaflet.BA7xXaOk.js";const i=document.getElementById("trip-overview-map"),l=document.getElementById("home-map-data");if(i&&l){let c=function(t){return a.divIcon({className:"home-marker-wrap",html:`
          <span class="home-marker">
            ${t.day}
          </span>
        `,iconSize:[36,36],iconAnchor:[18,18]})};const s=JSON.parse(l.textContent||"[]"),m=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#e96b4c",e=a.map(i,{scrollWheelZoom:!1,zoomControl:!0,attributionControl:!0});a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap contributors"}).addTo(e);const o=[];for(const t of s){const n=[t.lat,t.lng];o.push(n);const r=a.marker(n,{icon:c(t),keyboard:!0,title:`Day ${t.dayNo} · ${t.shortTitle}`,alt:`Day ${t.dayNo} · ${t.shortTitle}`});r.addTo(e).bindTooltip(`
            <strong>Day ${t.dayNo} · ${t.shortTitle}</strong>
            <br>
            ${t.dateLabel} · ${t.placeName}
          `,{direction:"top",offset:[0,-12],opacity:.96}),r.on("click",()=>{window.location.href=t.href})}o.length>1?(a.polyline(o,{color:m,weight:3,opacity:.68,dashArray:"1 8",lineCap:"round"}).addTo(e),e.fitBounds(o,{padding:[32,32]})):o.length===1?e.setView(o[0],10):e.setView([23.7,120.95],7)}
