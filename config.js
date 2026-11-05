/* ================= CONFIGURAÇÃO ================= */
let WHATS="5521972016917";
let OPEN=9*60, CLOSE=19*60, STEP=30;          // 09:00–19:00, grade de 30 em 30 min
let DIAS_ABERTOS=[2,3,4,5,6];                   // 0=Dom ... 6=Sáb (Ter a Sáb)
let DIAS_A_FRENTE=21;
const FIREBASE={apiKey:"AIzaSyBoApswQzeMVFblfUvYMwP8TiPvheQ1KjY",authDomain:"studio01barbearia-30f4d.firebaseapp.com",projectId:"studio01barbearia-30f4d",storageBucket:"studio01barbearia-30f4d.firebasestorage.app",messagingSenderId:"933759433352",appId:"1:933759433352:web:ad50996b2281beb27a3d3d"};
let SERVICOS=[
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
let AGENDA_B=[];
let BARBEIROS=[
 {id:"novaes",n:"Novaes",e:"Barbeiro • Studio 01",img:"img/novaes.jpg",modo:"chegada",whats:"5521971283272"},
 {id:"capoli",n:"Capoli",e:"Barbeiro • Studio 01",img:"img/capoli.jpg",modo:"agenda",whats:""}];
const precoServ=s=>s.combinar?"A combinar":"R$ "+s.p.toFixed(2).replace(".",",");
const totalTxt=(t,comb)=>{const v="R$ "+t.toFixed(2).replace(".",",");return comb?(t>0?v+" + a combinar":"A combinar"):v};
/* ================================================= */

/* ---- configurações editáveis pelo painel (guardadas no Firestore em config/site) ---- */
let TX={etiqueta:"BARBEARIA • PENHA CIRCULAR",t1:"Seu corte,",t2:"no seu horário.",sub:"Escolha o serviço, o barbeiro e o horário direto pelo site. A grade atualiza em tempo real, sem espera.",cortesiaOn:true,cortesia:"limpeza de sobrancelha em qualquer corte.",endereco:"",instagram:"",cnpj:"CNPJ 62.773.547/0001-87",avisoOn:false,aviso:""};
let ANTEC=30;
const FOTOS={};
const fotoSrc=b=>FOTOS[b.id]||((b.img&&!String(b.img).startsWith("db:"))?b.img:"");
const slug=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"")||("b"+Date.now());
const DONOS=['filipe.capoli@gmail.com'];                    // responsável: acesso total
const COLABS=['novaesdocorte@studio01barbearia.com.br'];    // colaborador: agenda, clientes e fotos
const DOMINIO_LOGIN="studio01barbearia.com.br";             // usuário sem @ vira usuario@este-dominio
const DEF={textos:{...TX},antecedencia:ANTEC,abre:OPEN,fecha:CLOSE,step:STEP,dias:[...DIAS_ABERTOS],diasFrente:DIAS_A_FRENTE,whats:WHATS,
 servicos:SERVICOS.map(s=>({...s,ativo:true})),barbeiros:BARBEIROS.map(b=>({...b,ativo:true}))};
let RAW=JSON.parse(JSON.stringify(DEF));
function aplicaConfig(){
 OPEN=+RAW.abre;CLOSE=+RAW.fecha;STEP=+RAW.step;DIAS_ABERTOS=RAW.dias;DIAS_A_FRENTE=+RAW.diasFrente;WHATS=RAW.whats;
 SERVICOS=RAW.servicos.filter(s=>s.ativo!==false);BARBEIROS=RAW.barbeiros.filter(b=>b.ativo!==false);AGENDA_B=BARBEIROS.filter(b=>b.modo!="chegada");
 TX={...DEF.textos,...(RAW.textos||{})};ANTEC=+RAW.antecedencia>=0?+RAW.antecedencia:30;
}
async function carregaConfig(db){
 try{const d=await db.collection("config").doc("site").get();
  if(d.exists){const x=d.data();for(const k in x)if(x[k]!=null)RAW[k]=x[k]}
  RAW.barbeiros=RAW.barbeiros.map(b=>{const d0=DEF.barbeiros.find(y=>y.n==b.n)||{};return {...d0,...b,modo:b.modo||d0.modo||"agenda",whats:b.whats!=null?b.whats:(d0.whats||""),id:b.id||d0.id||slug(b.n)}});
  RAW.textos={...DEF.textos,...(RAW.textos||{})};
  await carregaFotos(db);
 }catch(e){console.warn("config",e)}
 aplicaConfig();
}

/* ---- telefone: o número (só dígitos, sem 55) é a "chave" que liga cliente e agendamento ---- */
const telNorm=v=>{let t=String(v||"").replace(/\D/g,"");if(t.length>11&&t.startsWith("55"))t=t.slice(2);return t};
const telFmt=v=>{const t=telNorm(v);return t.length==11?t.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):t.length==10?t.replace(/(\d{2})(\d{4})(\d{4})/,"($1) $2-$3"):t};
aplicaConfig();
async function carregaFotos(db){
 await Promise.all(RAW.barbeiros.filter(b=>String(b.img||"").startsWith("db:")).map(async b=>{
  try{const d=await db.collection("barbeiro_fotos").doc(b.id).get();if(d.exists)FOTOS[b.id]=d.data().img}catch(e){}}));
}
