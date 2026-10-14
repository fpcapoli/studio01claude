/* ================= CONFIGURAÇÃO ================= */
const WHATS="5521972016917";
const OPEN=9*60, CLOSE=19*60, STEP=30;          // 09:00–19:00, grade de 30 em 30 min
const DIAS_ABERTOS=[2,3,4,5,6];                   // 0=Dom ... 6=Sáb (Ter a Sáb)
const DIAS_A_FRENTE=21;
const FIREBASE={apiKey:"AIzaSyBoApswQzeMVFblfUvYMwP8TiPvheQ1KjY",authDomain:"studio01barbearia-30f4d.firebaseapp.com",projectId:"studio01barbearia-30f4d",storageBucket:"studio01barbearia-30f4d.firebasestorage.app",messagingSenderId:"933759433352",appId:"1:933759433352:web:ad50996b2281beb27a3d3d"};
const SERVICOS=[
 {id:"bmod",n:"Barba Modelada",p:30,min:60,c:"Barba"},
 {id:"bsim",n:"Barba Simples",p:15,min:60,c:"Barba"},
 {id:"pz",n:"Acabamento / Pézinho",p:10,min:30,c:"Acabamento"},
 {id:"cs",n:"Corte Simples",p:20,min:30,c:"Corte"},
 {id:"cdis",n:"Corte Disfarçado",p:40,min:60,c:"Corte"},
 {id:"cdist",n:"Corte Disfarçado + Tesoura",p:45,min:60,c:"Corte"},
 {id:"cbm",n:"Corte + Barba Modelada",p:60,min:60,c:"Combo"},
 {id:"ccav",n:"Corte + Cavanhaque",p:50,min:60,c:"Combo"},
 {id:"cpig",n:"Corte + Pigmentação",p:60,min:60,c:"Combo"},
 {id:"lz",n:"Luzes / Reflexo / Nevou / Platinado",p:0,combinar:1,min:60,c:"Química"}];
const BARBEIROS=[
 {n:"Novaes",e:"Barbeiro • Studio 01",img:"img/novaes.jpg"},
 {n:"Capoli",e:"Barbeiro • Studio 01",img:"img/capoli.jpg"}];
const precoServ=s=>s.combinar?"A combinar":"R$ "+s.p.toFixed(2).replace(".",",");
const totalTxt=(t,comb)=>{const v="R$ "+t.toFixed(2).replace(".",",");return comb?(t>0?v+" + a combinar":"A combinar"):v};
/* ================================================= */
