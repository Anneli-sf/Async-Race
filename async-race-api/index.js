(()=>{"use strict";const e=["Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Fiat","Ford","Honda","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Porsche","Saab","Smart","Subaru ","Suzuki","Tesla","Toyota","Volkswagen","Volvo"],n=["Brera","Spider","Laguna","A4","i8","Z4","M5","Veyron","De Ville","Camaro","Corvette"," Viper","250 GT","Maranello","Panda","E-Series","Focus","Sierra","CR-V","Civic","X-Type","Discovery","Lancer","Boxster","Land Cruiser","Supra","Jetta","Golf","Passat","Polo","V70/XC70","9000"];const t=()=>"#"+(Math.random().toString(16)+"000000").substring(2,8).toUpperCase(),o=()=>`${e[Math.floor(Math.random()*e.length)]} ${n[Math.floor(Math.random()*n.length)]}`,c=(e,n)=>{const t=document.querySelector(e),o=document.querySelector(n);t.value="#ffffff",o.value=""},i=(e,n,t)=>{h.selectedCar.name=e,h.selectedCar.color=n,h.selectedCar.id=t||-1},a=(e,n)=>{const t=[];for(let o=0;o<e.length;o+=n){const c=e.slice(o,o+n);t.push(c)}return t};var r=function(e,n,t,o){return new(t||(t=Promise))((function(c,i){function a(e){try{d(o.next(e))}catch(e){i(e)}}function r(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var n;e.done?c(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,r)}d((o=o.apply(e,n||[])).next())}))};const d="http://127.0.0.1:3000",l=`${d}/garage`,s=`${d}/engine`,u=(e,n)=>r(void 0,void 0,void 0,(function*(){return yield fetch(`${s}?id=${e}&status=${n}`,{method:"PATCH"}).then((e=>e.json()))})),v=e=>r(void 0,void 0,void 0,(function*(){return yield fetch(`${s}?id=${e}&status=drive`,{method:"PATCH"}).then((e=>e.json()))})),f=(e,n)=>r(void 0,void 0,void 0,(function*(){return yield Promise.all(e.flat().map((e=>r(void 0,void 0,void 0,(function*(){return yield fetch(`${s}?id=${e.id}&status=${n}`,{method:"PATCH"}).then((e=>e.json()))})))))}));var p=function(e,n,t,o){return new(t||(t=Promise))((function(c,i){function a(e){try{d(o.next(e))}catch(e){i(e)}}function r(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var n;e.done?c(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,r)}d((o=o.apply(e,n||[])).next())}))};window.addEventListener("load",(()=>p(void 0,void 0,void 0,(function*(){return yield m()}))));const h={cars:[],selectedCar:{name:"",color:"",id:-1},page:0,winners:[]},m=()=>p(void 0,void 0,void 0,(function*(){yield function(e){return r(this,void 0,void 0,(function*(){return yield fetch(`${l}`).then((e=>e.json())).then((e=>{const n=h.cars.flat().concat(e);return console.log(a(n,7)),h.cars=a(n,7)}))}))}(h.page),yield y(h.page)})),y=e=>p(void 0,void 0,void 0,(function*(){const n=document.querySelector(".race-block");var t,o,c,i;n.innerHTML="",n.append(k()),h.cars[e].forEach((e=>n.append(C(e.name,e.color,e.id)))),t=void 0,o=void 0,i=function*(){document.querySelector(".cars-amount").value=`${h.cars.flat().length}`},new((c=void 0)||(c=Promise))((function(e,n){function a(e){try{d(i.next(e))}catch(e){n(e)}}function r(e){try{d(i.throw(e))}catch(e){n(e)}}function d(n){var t;n.done?e(n.value):(t=n.value,t instanceof c?t:new c((function(e){e(t)}))).then(a,r)}d((i=i.apply(t,o||[])).next())}))})),b=(e,n)=>p(void 0,void 0,void 0,(function*(){const t=document.querySelector(`#car-${e}`),o=t.parentElement.offsetWidth,c=o/n*1e3,i=new KeyframeEffect(t,[{transform:"translateY(0%)"},{transform:`translate(${o+60}px)`}],{duration:c,fill:"forwards"}),a=new Animation(i,document.timeline);return console.log(1e3*c/1e3),a})),g=(e,n)=>{const t=document.createElement(`${e}`);return t.classList.add(n),t},S=(e,n)=>{const t=g("button",n);return t.innerText=e,t},$=(e,n,t,o,c,i)=>{const a=g("input",`${e}`);return a.type=n,o&&(a.placeholder=o),c&&(a.value=c),i&&(a.readOnly=i),t&&(a.id=t),a};var w=function(e,n,t,o){return new(t||(t=Promise))((function(c,i){function a(e){try{d(o.next(e))}catch(e){i(e)}}function r(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var n;e.done?c(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,r)}d((o=o.apply(e,n||[])).next())}))};const L=()=>{const e=g("div","header");return e.append((()=>{const e=g("div","nav"),n=S("to garage","btn-to-garage"),t=S("to winners","btn-to-winners");return e.append(n,t),e})(),(()=>{const e=g("div","block-creation"),n=$("create-car-name","text","","","",!1),i=$("create-car-color","color","","","#ffffff",!1),d=S("create","btn-create");return e.append(n,i,d),d.addEventListener("click",(()=>w(void 0,void 0,void 0,(function*(){yield p(void 0,void 0,void 0,(function*(){const e=(()=>{const e=document.querySelector(".create-car-name"),n=document.querySelector(".create-car-color");return{name:""===e.value?o():e.value,color:"#ffffff"===n.value?t():n.value}})();var n;yield(n=e,r(void 0,void 0,void 0,(function*(){return yield fetch(`${l}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((e=>e.json())).then((e=>{const n=h.cars.flat().concat(e);return h.cars=a(n,7)}))}))),yield y(h.page),c(".create-car-color",".create-car-name")}))})))),e})(),(()=>{const e=g("div","block-update"),n=$("update-car-name","text","","","",!1),t=$("update-car-color","color","","","#ffffff",!1),o=S("update","btn-update");return e.append(n,t,o),o.addEventListener("click",(()=>w(void 0,void 0,void 0,(function*(){yield p(void 0,void 0,void 0,(function*(){const e=document.querySelector(".update-car-color"),n=document.querySelector(".update-car-name"),t=h.cars.flat();if(""!==n.value){i(n.value,e.value,h.selectedCar.id),yield(o=h.selectedCar.id,a=h.selectedCar,r(void 0,void 0,void 0,(function*(){return yield fetch(`${l}/${o}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((e=>e.json()))})));const d=t.findIndex((e=>e.id==h.selectedCar.id));t[d].name=h.selectedCar.name,t[d].color=h.selectedCar.color,y(h.page),c(".update-car-color",".update-car-name")}var o,a}))})))),e})(),(()=>{const e=g("div","race-btns-block"),n=S("race","btn-race"),c=S("reset","btn-reset");c.disabled=!0;const i=S("generate cars","btn-generate-cars");return e.append(n,c,i),i.addEventListener("click",(()=>w(void 0,void 0,void 0,(function*(){yield p(void 0,void 0,void 0,(function*(){const e=yield r(void 0,void 0,void 0,(function*(){const e=[];let n=0;for(;n<100;)e.push({name:o(),color:t()}),n++;return yield Promise.all(e.map((e=>r(void 0,void 0,void 0,(function*(){return yield fetch(`${l}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json()))})))))}));let n=h.cars.flat();n=[...n,...e],h.cars=a(n,7),yield y(h.page)}))})))),n.addEventListener("click",(()=>w(void 0,void 0,void 0,(function*(){var e,t;yield(e=h.cars,t=h.page,p(void 0,void 0,void 0,(function*(){const n=document.querySelectorAll(".btn-a"),o=(document.querySelectorAll(".btn-b"),document.querySelector(".btn-reset")),c=[...yield f(e[t],"started")];e[t].forEach(((i,a)=>p(void 0,void 0,void 0,(function*(){const r=yield b(i.id,c[a].velocity);r.play(),r.addEventListener("finish",(()=>{((e,n)=>{const t=[];if(e.startTime&&e.currentTime&&e.effect){const o=e.effect.getTiming().duration;t.push({name:n,result:o/1e3}),console.log("allResults,",t)}})(r,i.name)}),{once:!0}),n.forEach((e=>e.disabled=!0)),o.addEventListener("click",(()=>{e[t].forEach((e=>p(void 0,void 0,void 0,(function*(){return yield u(e.id,"stopped")})))),r.cancel(),n.forEach((e=>e.disabled=!1))}));try{yield v(i.id)}catch(e){r.pause()}}))))}))),c.disabled=!1,n.disabled=!0})))),c.addEventListener("click",(()=>w(void 0,void 0,void 0,(function*(){c.disabled=!0,n.disabled=!1})))),e})()),e};var E=function(e,n,t,o){return new(t||(t=Promise))((function(c,i){function a(e){try{d(o.next(e))}catch(e){i(e)}}function r(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var n;e.done?c(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,r)}d((o=o.apply(e,n||[])).next())}))};const k=()=>{const e=g("div","race-header"),n=g("div","title-block"),t=g("div","page-block"),o=g("span","title");o.innerText="Garage";const c=$("cars-amount","number","","","0",!0);c.disabled=!0;const i=g("span","page");i.innerText="Page";const a=g("span","page-number");a.innerHTML=`${h.page+1}`;const r=S("","btn-prev"),d=S("","btn-next");return r.addEventListener("click",(()=>{(()=>{const e=document.querySelector(".page-number");h.page>0&&(h.page-=1),e.innerHTML=`${h.page+1}`,y(h.page)})()})),d.addEventListener("click",(()=>{(()=>{const e=document.querySelector(".page-number");h.page<h.cars.length-1&&(h.page+=1),e.innerHTML=`${h.page+1}`,y(h.page)})()})),n.append(o,c),t.append(i,r,a,d),e.append(n,t),e},C=(e,n,t)=>{const o=g("div","car-block"),c=g("div","car-block-header"),d=S("select","btn-select"),s=S("remove","btn-remove");s.id=`remove${t}`,d.id=`select${t}`;const f=g("span","car-name");f.innerHTML=e,c.append(d,s,f);const m=g("div","car-main-block"),$=g("div","car-main-btns-block"),w=S("A","btn-a");w.id=`a${t}`;const L=S("B","btn-b");L.id=`b${t}`,L.disabled=!0,$.append(w,L),w.addEventListener("click",(e=>E(void 0,void 0,void 0,(function*(){w.disabled=!0,L.disabled=!1,yield((e,n)=>p(void 0,void 0,void 0,(function*(){const t=e.target,o=document.querySelector(`#b${n}`);let c,i;if(t&&"btn-a"===t.className){c=yield u(n,"started"),i=yield b(n,c.velocity),i.play(),o.addEventListener("click",(()=>p(void 0,void 0,void 0,(function*(){yield u(n,"stopped"),i.cancel()}))));try{yield v(n)}catch(e){i.pause()}}})))(e,+w.id.slice(1))})))),L.addEventListener("click",(()=>E(void 0,void 0,void 0,(function*(){w.disabled=!1,L.disabled=!0})))),s.addEventListener("click",(e=>E(void 0,void 0,void 0,(function*(){yield((e,n)=>p(void 0,void 0,void 0,(function*(){const t=e.target;t&&t.id==`remove${n}`&&(yield(e=>r(void 0,void 0,void 0,(function*(){return yield fetch(`${l}/${e}`,{method:"DELETE"}).then((e=>e.json())).then((()=>{let n=h.cars.flat();return console.log("del arr",n),n=n.filter((n=>n.id!==e)),h.cars=a(n,7)}))})))(n),y(h.page))})))(e,+s.id.slice(6))})))),d.addEventListener("click",(e=>E(void 0,void 0,void 0,(function*(){yield((e,n)=>p(void 0,void 0,void 0,(function*(){const t=e.target,o=document.querySelector(".update-car-color"),c=document.querySelector(".update-car-name"),a=h.cars.flat();if(t&&t.id==`select${n}`){const e=a.findIndex((e=>e.id==n));o.value=a[e].color,c.value=a[e].name}i(c.value,o.value,n)})))(e,+d.id.slice(6))}))));const k=g("div","car"),C=((e,n)=>{const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.classList.add("car-image"),t.id=n,t.setAttributeNS(null,"version","1.1"),t.setAttributeNS(null,"width","60"),t.setAttributeNS(null,"height","60"),t.setAttributeNS(null,"viewBox","0 0 470 470"),t.setAttributeNS(null,"enable-background","new 0 0 470 470"),t.innerHTML='\n    <g>\n        <path d="m126.184,358.951c19.299,0 35-15.701 35-35s-15.701-35-35-35-35,15.701-35,35 15.701,35 35,35zm0-55c11.028,0 20,8.972 20,20s-8.972,20-20,20-20-8.972-20-20 8.971-20 20-20z"/>\n        <path d="m343.816,288.951c-19.299,0-35,15.701-35,35s15.701,35 35,35 35-15.701 35-35-15.701-35-35-35zm0,55c-11.028,0-20-8.972-20-20s8.972-20 20-20 20,8.972 20,20-8.971,20-20,20z"/>\n        <path d="m137.5,116.049h23.779c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-23.779c-10.423,0-27.031,7.176-34.177,14.767l-60.088,63.845c-2.051,2.179-2.609,5.368-1.423,8.115 1.187,2.747 3.893,4.525 6.885,4.525h290.271c2.562,0 4.945-1.307 6.323-3.467 1.377-2.159 1.558-4.873 0.478-7.195l-30.854-66.365c-3.315-7.046-14.628-14.225-22.415-14.225h-101.221c-4.143,0-7.5,3.358-7.5,7.5l-.001,68.752h-117.722l48.19-51.204c4.243-4.508 17.066-10.048 23.254-10.048zm61.279,0h93.7c2.203,0.103 7.842,3.681 8.849,5.581l25.883,55.671h-128.433l.001-61.252z"/>\n        <path d="m470,257.692c0-26.631-20.555-55.149-45.819-63.57-0.017-0.006-35.078-11.693-35.078-11.693-5.854-1.951-13.576-8.812-16.203-14.394l-30.84-65.535c-8.299-17.636-30.068-31.451-49.56-31.451h-155c-18.639,0-43.247,10.632-56.022,24.206l-69.158,73.482c-6.909,7.34-12.32,20.984-12.32,31.064v94.15c0,20.678 16.822,37.5 37.5,37.5h14.06c3.775,37.846 35.8,67.5 74.624,67.5s70.849-29.654 74.624-67.5h45.509c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-45.509c-3.775-37.846-35.8-67.5-74.624-67.5s-70.849,29.654-74.624,67.5h-14.06c-12.406,0-22.5-10.093-22.5-22.5v-94.15c0-6.294 3.929-16.2 8.242-20.783l69.159-73.483c9.941-10.563 30.594-19.486 45.099-19.486h155c13.682,0 30.162,10.458 35.987,22.838l30.84,65.535c4.421,9.395 15.182,18.955 25.031,22.238l28.498,9.499c-0.492,2.841-0.748,5.729-0.748,8.642 0,25.238 18.65,46.198 42.892,49.831v29.32c0,12.407-8.357,22.5-18.631,22.5h-17.929c-3.775-37.846-35.8-67.5-74.624-67.5-41.355,0-75,33.645-75,75s33.645,75 75,75c38.824,0 70.849-29.654 74.624-67.5h17.929c18.544,0 33.631-16.822 33.631-37.5v-36.26zm-343.816,6.259c33.084,0 60,26.916 60,60s-26.916,60-60,60-60-26.916-60-60 26.916-60 60-60zm217.632,120c-33.084,0-60-26.916-60-60s26.916-60 60-60 60,26.916 60,60-26.916,60-60,60zm83.292-169.15c0-0.969 0.04-1.934 0.117-2.893 13.16,7.627 23.787,22.37 26.864,37.266-15.466-3.785-26.981-17.756-26.981-34.373z"/>\n      </g>\n    ',t})(0,`car-${t}`);C.style.fill=n||"transparent",k.append(C);const T=g("span","flag");return m.append($,k,T),o.append(c,m),o},T=document.querySelector(".wrapper");window.addEventListener("load",(()=>{T.append((()=>{const e=g("main","main");return e.append(L(),(()=>{const e=g("div","race-block");return e.append(k()),e})()),e})())}))})();