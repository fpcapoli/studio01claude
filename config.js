/* ================= CONFIGURAÇÃO ================= */
const WHATS="5521972016917";
const OPEN=9*60, CLOSE=19*60, STEP=30;          // 09:00–19:00, grade de 30 em 30 min
const DIAS_ABERTOS=[2,3,4,5,6];                   // 0=Dom ... 6=Sáb (Ter a Sáb)
const DIAS_A_FRENTE=21;
const FIREBASE={apiKey:"AIzaSyBoApswQzeMVFblfUvYMwP8TiPvheQ1KjY",authDomain:"studio01barbearia-30f4d.firebaseapp.com",projectId:"studio01barbearia-30f4d",storageBucket:"studio01barbearia-30f4d.firebasestorage.app",messagingSenderId:"933759433352",appId:"1:933759433352:web:ad50996b2281beb27a3d3d"};
const SERVICOS=[
 {id:"barba",n:"Barba",p:15,min:30,ap:1,c:"Barba"},
 {id:"cav",n:"Cavanhaque",p:15,min:20,ap:1,c:"Barba"},
 {id:"col",n:"Coloração",p:60,min:50,ap:1,c:"Química"},
 {id:"cs",n:"Corte Simples",p:20,min:40,c:"Cabelo"},
 {id:"cd",n:"Corte Degradê",p:40,min:40,c:"Cabelo"},
 {id:"ct",n:"Corte Todo na Tesoura",p:25,min:40,ap:1,c:"Cabelo"},
 {id:"cdt",n:"Corte Degradê + Tesoura",p:45,min:50,ap:1,c:"Cabelo"},
 {id:"pz",n:"Pézinho / Acabamento",p:10,min:15,ap:1,c:"Acabamento"},
 {id:"pig",n:"Pigmentação",p:20,min:30,c:"Química"},
 {id:"pla",n:"Platinado / Nevou",p:60,min:60,c:"Química"},
 {id:"ref",n:"Reflexo / Luzes",p:60,min:60,ap:1,c:"Química"},
 {id:"sob",n:"Sobrancelha",p:10,min:15,c:"Acabamento"}];
const BARBEIROS=[
 {n:"Rodrigo '01'",e:"Degradê Navalhado & Fade Freestyle",img:"img/b1.jpg"},
 {n:"Lucas Silva",e:"Tesoura Clássica, Barboterapia & Pigmentação",img:"img/b2.jpg"},
 {n:"Matheus 'Nevou' Costa",e:"Platinados, Luzes & Acabamentos",img:"img/b3.jpg"}];
/* ================================================= */
