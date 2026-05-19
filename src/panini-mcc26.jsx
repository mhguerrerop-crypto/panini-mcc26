import { useState, useEffect, useMemo, useCallback } from "react";

// ============================================================
//  DATA
// ============================================================
const PACK_SIZE = 7, PACK_COST = 5000;

const SECTIONS = [
  {id:"FWC_T",name:"FWC 🏆",flag:"🏆",code:"FWC🏆",total:18,specialStart:true},
  {id:"FWC_W",name:"FWC 🌎",flag:"🌎",code:"FWC🌎",total:12},
  {id:"FWC_H",name:"FWC 📜",flag:"📜",code:"FWC📜",total:20},
  {id:"MEX",name:"México",flag:"🇲🇽",code:"MEX",total:20},
  {id:"RSA",name:"Sudáfrica",flag:"🇿🇦",code:"RSA",total:20},
  {id:"KOR",name:"Corea",flag:"🇰🇷",code:"KOR",total:20},
  {id:"CZE",name:"Chequia",flag:"🇨🇿",code:"CZE",total:20},
  {id:"CAN",name:"Canadá",flag:"🇨🇦",code:"CAN",total:20},
  {id:"BIH",name:"Bosnia",flag:"🇧🇦",code:"BIH",total:20},
  {id:"QAT",name:"Qatar",flag:"🇶🇦",code:"QAT",total:20},
  {id:"SUI",name:"Suiza",flag:"🇨🇭",code:"SUI",total:20},
  {id:"BRA",name:"Brasil",flag:"🇧🇷",code:"BRA",total:20},
  {id:"MAR",name:"Marruecos",flag:"🇲🇦",code:"MAR",total:20},
  {id:"HAI",name:"Haití",flag:"🇭🇹",code:"HAI",total:20},
  {id:"SCO",name:"Escocia",flag:"🏴",code:"SCO",total:20},
  {id:"USA",name:"EE.UU.",flag:"🇺🇸",code:"USA",total:20},
  {id:"PAR",name:"Paraguay",flag:"🇵🇾",code:"PAR",total:20},
  {id:"AUS",name:"Australia",flag:"🇦🇺",code:"AUS",total:20},
  {id:"TUR",name:"Turquía",flag:"🇹🇷",code:"TUR",total:20},
  {id:"GER",name:"Alemania",flag:"🇩🇪",code:"GER",total:20},
  {id:"CUW",name:"Curazao",flag:"🇨🇼",code:"CUW",total:20},
  {id:"CIV",name:"C. Marfil",flag:"🇨🇮",code:"CIV",total:20},
  {id:"ECU",name:"Ecuador",flag:"🇪🇨",code:"ECU",total:20},
  {id:"NED",name:"P. Bajos",flag:"🇳🇱",code:"NED",total:20},
  {id:"JPN",name:"Japón",flag:"🇯🇵",code:"JPN",total:20},
  {id:"SWE",name:"Suecia",flag:"🇸🇪",code:"SWE",total:20},
  {id:"TUN",name:"Túnez",flag:"🇹🇳",code:"TUN",total:20},
  {id:"BEL",name:"Bélgica",flag:"🇧🇪",code:"BEL",total:20},
  {id:"EGY",name:"Egipto",flag:"🇪🇬",code:"EGY",total:20},
  {id:"IRN",name:"Irán",flag:"🇮🇷",code:"IRN",total:20},
  {id:"NZL",name:"N. Zelanda",flag:"🇳🇿",code:"NZL",total:20},
  {id:"ESP",name:"España",flag:"🇪🇸",code:"ESP",total:20},
  {id:"CPV",name:"Cabo Verde",flag:"🇨🇻",code:"CPV",total:20},
  {id:"KSA",name:"A. Saudí",flag:"🇸🇦",code:"KSA",total:20},
  {id:"URU",name:"Uruguay",flag:"🇺🇾",code:"URU",total:20},
  {id:"FRA",name:"Francia",flag:"🇫🇷",code:"FRA",total:20},
  {id:"SEN",name:"Senegal",flag:"🇸🇳",code:"SEN",total:20},
  {id:"IRQ",name:"Irak",flag:"🇮🇶",code:"IRQ",total:20},
  {id:"NOR",name:"Noruega",flag:"🇳🇴",code:"NOR",total:20},
  {id:"ARG",name:"Argentina",flag:"🇦🇷",code:"ARG",total:20},
  {id:"ALG",name:"Argelia",flag:"🇩🇿",code:"ALG",total:20},
  {id:"AUT",name:"Austria",flag:"🇦🇹",code:"AUT",total:20},
  {id:"JOR",name:"Jordania",flag:"🇯🇴",code:"JOR",total:20},
  {id:"POR",name:"Portugal",flag:"🇵🇹",code:"POR",total:20},
  {id:"COD",name:"R.D. Congo",flag:"🇨🇩",code:"COD",total:20},
  {id:"UZB",name:"Uzbekistán",flag:"🇺🇿",code:"UZB",total:20},
  {id:"COL",name:"Colombia",flag:"🇨🇴",code:"COL",total:20},
  {id:"ENG",name:"Inglaterra",flag:"🏴",code:"ENG",total:20},
  {id:"CRO",name:"Croacia",flag:"🇭🇷",code:"CRO",total:20},
  {id:"GHA",name:"Ghana",flag:"🇬🇭",code:"GHA",total:20},
  {id:"PAN",name:"Panamá",flag:"🇵🇦",code:"PAN",total:20},
];

const MISSING_INIT = {
  FWC_T:["00"],FWC_H:["19"],
  MEX:["1","20"],RSA:["2","17"],KOR:["1","5"],CZE:["4","10","11"],
  CAN:["2","4","5","6","7","9","11","14","17","18"],
  BIH:["1","4","10","15","16","17","18","19"],QAT:["10","15","17","19"],
  SUI:["1","2","7","8","10","15","16","17","20"],
  BRA:["5","9","12","14","15","18","20"],MAR:["1","4","7","8"],
  SCO:["10","15"],USA:["1","13","19"],PAR:["13","15","19"],AUS:["13","14"],
  TUR:["1","5","9","11"],GER:["2","5","6","10","17","20"],CUW:["1","3","4","19"],
  CIV:["2","6","11","15","16","19"],ECU:["10"],JPN:["1","8","16"],
  SWE:["2","3","4","6","7","20"],TUN:["2","6","13","15"],BEL:["5","9","10","16"],
  IRN:["1","5"],NZL:["2","6","10","19"],ESP:["13","16","20"],CPV:["2","3","7","20"],
  KSA:["8","10","15","19"],URU:["4","9","15"],FRA:["15","16","17","19","20"],
  SEN:["3","4","5","7","8","12","14"],IRQ:["4","7","10","12","16","19","20"],
  NOR:["1"],ARG:["3","6","15","19"],ALG:["5","6","9","14","15","18","19"],
  AUT:["2","7","10","16","20"],JOR:["1","5","7","11","16","20"],POR:["4","8","17"],
  COD:["4","8","15","16","19"],UZB:["8","11"],COL:["1","4","8","13","18"],
  ENG:["3","14"],CRO:["2","5","10","16","18","20"],GHA:["2","5","9","15","18"],
  PAN:["10","13","15"],
};

const REPEATED_INIT = {
  FWC_T:["1","2"],FWC_W:["5","6","7","8"],FWC_H:["9","10","13","14","15","16"],
  MEX:["5","11","15","16","18"],RSA:["3","4","5","6","7","15"],
  KOR:["3","7","8","9","12","14","17","18"],CZE:["3","5","9","13","16","20"],
  CAN:["13"],BIH:["20"],QAT:["5","9","13","14","20"],SUI:["4","5","6","9","12","14","18"],
  BRA:["1","8","10","13"],MAR:["12","13","14","18","20"],
  HAI:["1","2","4","8","10","11","12","15"],SCO:["3","5","7","8","9","11","13","16"],
  USA:["3","7","10","11","20"],PAR:["2","7","11","16","18","20"],
  AUS:["1","7","9","11","12","15","16","18","19","20"],TUR:["4","8","12","17"],
  GER:["1","3"],CUW:["12"],CIV:["13","17"],ECU:["5","9","13","14","19","20"],
  NED:["3","7","11","16","20"],JPN:["7","13","14"],SWE:["15"],
  TUN:["3","7","14","16","18"],BEL:["1","3","12","18"],EGY:["3","4","5","8","13","15","19"],
  IRN:["3","7","11","16","17"],NZL:["5","8","9","11","12","14","16","17","18"],
  ESP:["3","4","5","8","12","17","18"],CPV:["1","13"],
  KSA:["2","6","7","12","16","17","18"],URU:["3","6","7","14","16"],FRA:["6","9","10"],
  SEN:["2","15","17","19","20"],IRQ:["9"],NOR:["5","7","11","13","14","16","20"],
  ARG:["1","2","4","9","12","13"],ALG:["1"],AUT:["5","9","13","14","17","18"],
  POR:["7","12","15","16","20"],COD:["5","9","13"],UZB:["1"],
  COL:["2","5","6","10","15"],ENG:["4","5","9","15","16","19","20"],CRO:["1","13"],
  GHA:["1","3","11","13"],PAN:["1","11","14","17","20"],
};

// ============================================================
//  HELPERS
// ============================================================
function getStickerNums(sec) {
  if (sec.specialStart) return ["00",...Array.from({length:sec.total-1},(_,i)=>String(i+1))];
  return Array.from({length:sec.total},(_,i)=>String(i+1));
}

function buildInitialState() {
  const s = {};
  for (const sec of SECTIONS) {
    s[sec.id] = {};
    const miss = new Set(MISSING_INIT[sec.id]||[]);
    const rep  = new Set(REPEATED_INIT[sec.id]||[]);
    for (const n of getStickerNums(sec)) {
      if (miss.has(n)) s[sec.id][n]={status:"missing",extra:0};
      else if (rep.has(n)) s[sec.id][n]={status:"repeated",extra:1};
      else s[sec.id][n]={status:"owned",extra:0};
    }
  }
  return s;
}

function computeStats(stickers) {
  let total=0,owned=0,missing=0,repUnique=0,extraTotal=0,acquired=0;
  const secStats={};
  for (const sec of SECTIONS) {
    const d=stickers[sec.id]||{};
    let sOwned=0; const sM=[],sR=[];
    for (const n of getStickerNums(sec)) {
      const st=d[n]||{status:"missing",extra:0}; total++;
      if (st.status==="missing"){missing++;sM.push(n);}
      else if (st.status==="owned"){owned++;sOwned++;acquired++;}
      else{owned++;sOwned++;repUnique++;extraTotal+=st.extra;acquired+=1+st.extra;sR.push({num:n,extra:st.extra});}
    }
    secStats[sec.id]={owned:sOwned,total:sec.total,missing:sM,repeated:sR,progress:Math.round(sOwned/sec.total*100)};
  }
  const packs=Math.ceil(acquired/PACK_SIZE);
  return {total,owned,missing,repUnique,extraTotal,acquired,packs,cost:packs*PACK_COST,progress:Math.round(owned/total*100),secStats};
}

const getColor=(p)=>p===100?"#22c55e":p>=80?"#3b82f6":p>=50?"#f59e0b":"#ef4444";
const fmtNum=(n)=>n.toLocaleString("es-CO");

function copyMissing(stats){
  const txt="📌 Me faltan estas láminas\n⚽ Álbum Panini MCC 2026\n\n"+
    SECTIONS.filter(s=>stats.secStats[s.id].missing.length)
      .map(s=>`${s.flag} ${s.code}: ${stats.secStats[s.id].missing.join(", ")}`).join("\n");
  navigator.clipboard.writeText(txt).catch(()=>{});
}
function copyRepeated(stats){
  const txt="🔄 Tengo repetidas para cambiar\n⚽ Álbum Panini MCC 2026\n\n"+
    SECTIONS.filter(s=>stats.secStats[s.id].repeated.length)
      .map(s=>`${s.flag} ${s.code}: ${stats.secStats[s.id].repeated.map(r=>r.num+(r.extra>1?`(×${r.extra+1})`:``)).join(", ")}`).join("\n");
  navigator.clipboard.writeText(txt).catch(()=>{});
}
function shareWhatsApp(stats){
  const txt="📌 *Me faltan estas láminas*\n⚽ *Álbum Panini MCC 2026*\n\n"+
    SECTIONS.filter(s=>stats.secStats[s.id].missing.length)
      .map(s=>`${s.flag} ${s.code}: ${stats.secStats[s.id].missing.join(", ")}`).join("\n")+
    "\n\n📲 ¡Me avisas si tienes alguna para cambiar!";
  window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank");
}

// ============================================================
//  ATOMS
// ============================================================
function RingChart({pct,size=56}){
  const sw=5,r=(size-sw*2)/2,circ=2*Math.PI*r;
  const used=(Math.min(100,Math.max(0,pct))/100)*circ;
  const color=getColor(pct);
  const cx=size/2,cy=size/2;
  return(
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={sw}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${used} ${circ-used}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}/>
      <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize={size>50?11:9} fontWeight="bold" fontFamily="sans-serif">
        {pct}%
      </text>
    </svg>
  );
}

// ============================================================
//  COMPOSITES
// ============================================================
function StatCard({val,lbl,color,sub,small}){
  return(
    <div style={{background:"#0f1623",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"12px 14px"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:small?20:28,lineHeight:1,color}}>{val}</div>
      <div style={{fontSize:10,color:"#64748b",marginTop:2,textTransform:"uppercase",letterSpacing:"0.4px"}}>{lbl}</div>
      {sub&&<div style={{fontSize:10,color:"#475569",marginTop:2}}>{sub}</div>}
    </div>
  );
}

function MiniCard({val,lbl,color}){
  return(
    <div style={{background:"#0f1623",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 12px"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,lineHeight:1,color}}>{val}</div>
      <div style={{fontSize:9,color:"#64748b",marginTop:2}}>{lbl}</div>
    </div>
  );
}

function TeamRow({sec,nums,type,onChipClick}){
  const [open,setOpen]=useState(true);
  const c=type==="missing"?"#ef4444":"#f97316";
  const bg=type==="missing"?"rgba(239,68,68,0.12)":"rgba(249,115,22,0.12)";
  return(
    <div style={{background:"#0f1623",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,marginBottom:8,overflow:"hidden"}}>
      <div onClick={()=>setOpen(v=>!v)} style={{padding:"9px 12px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",userSelect:"none"}}>
        <span style={{fontSize:16}}>{sec.flag}</span>
        <span style={{fontSize:11,fontWeight:700}}>{sec.code}</span>
        <span style={{fontSize:9,color:"#94a3b8",flex:1}}>{nums.join(", ")}</span>
        <span style={{background:bg,color:c,fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>{nums.length}</span>
        <span style={{fontSize:9,color:"#475569",display:"inline-block",transform:open?"":"rotate(-90deg)",transition:"transform .2s"}}>▼</span>
      </div>
      {open&&(
        <div style={{padding:"0 12px 10px",display:"flex",flexWrap:"wrap",gap:5}}>
          {nums.map(n=>(
            <span key={n} onClick={()=>onChipClick&&onChipClick(n)}
              style={{background:bg,color:c,border:`1px solid ${c}30`,borderRadius:6,
                padding:"3px 8px",fontSize:11,fontWeight:600,cursor:onChipClick?"pointer":"default",
                transition:"opacity .15s"}}
              title={type==="missing"?"Toca para marcar como pegada":undefined}>
              {n}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const inputSt={background:"#0f1623",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,
  padding:"9px 12px",width:"100%",fontSize:13,color:"white",outline:"none",
  marginBottom:10,boxSizing:"border-box"};
const btn=(bg,mb=8)=>({width:"100%",padding:"11px",borderRadius:10,border:"none",cursor:"pointer",
  fontWeight:700,fontSize:12,color:"white",background:bg,display:"flex",
  alignItems:"center",justifyContent:"center",gap:8,marginBottom:mb,letterSpacing:"0.3px"});
const ctrlBtn={background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",
  borderRadius:5,color:"white",fontSize:15,width:26,height:26,cursor:"pointer",
  display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1};

// ============================================================
//  TABS
// ============================================================
function OverviewTab({stats,onSecClick}){
  const {total,owned,missing,repUnique,extraTotal,packs,cost,secStats,progress}=stats;
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:14}}>
        <StatCard val={owned} lbl="Pegadas ✅" color="#22c55e" sub={`${progress}% del álbum`}/>
        <StatCard val={missing} lbl="Faltantes ❓" color="#ef4444" sub={`${total} láminas totales`}/>
        <StatCard val={repUnique} lbl="Tipos repetidos 🔄" color="#f97316" sub={`${repUnique+extraTotal} copias extra`}/>
        <StatCard val={`$${fmtNum(cost)}`} lbl="Gastado 💸" color="#f59e0b" sub={`~${packs} sobres`} small/>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.6px",color:"#475569"}}>
          Selecciones · Toca para editar
        </div>
        <div style={{display:"flex",gap:8,fontSize:9,color:"#64748b"}}>
          <span>🔴 Falta</span><span>🟠 Rep.</span><span>🟢 OK</span>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(78px,1fr))",gap:8}}>
        {SECTIONS.map(sec=>{
          const ss=secStats[sec.id];
          return(
            <div key={sec.id} onClick={()=>onSecClick(sec.id)}
              style={{background:"#0f1623",border:`1px solid ${ss.progress===100?"rgba(34,197,94,.3)":"rgba(255,255,255,.06)"}`,
                borderRadius:12,padding:"10px 6px 8px",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                position:"relative",userSelect:"none",transition:"all .15s"}}>
              {ss.missing.length>0&&<div style={{position:"absolute",top:5,right:5,background:"#ef4444",color:"white",
                fontSize:8,fontWeight:800,borderRadius:"50%",width:16,height:16,
                display:"flex",alignItems:"center",justifyContent:"center"}}>{ss.missing.length}</div>}
              {ss.repeated.length>0&&<div style={{position:"absolute",top:5,left:5,background:"#f97316",color:"white",
                fontSize:8,fontWeight:800,borderRadius:"50%",width:16,height:16,
                display:"flex",alignItems:"center",justifyContent:"center"}}>{ss.repeated.length}</div>}
              <div style={{fontSize:22}}>{sec.flag}</div>
              <RingChart pct={ss.progress} size={52}/>
              <div style={{fontSize:8,fontWeight:700,color:"#64748b",textAlign:"center",lineHeight:1.2}}>{sec.code}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MissingTab({stats,search,setSearch,onMarkOwned,onCopy,onWhatsApp}){
  const filtered=SECTIONS.filter(s=>{
    const ss=stats.secStats[s.id];
    if(!ss.missing.length)return false;
    if(!search)return true;
    const q=search.toLowerCase();
    return s.name.toLowerCase().includes(q)||s.code.toLowerCase().includes(q);
  });
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <MiniCard val={stats.missing} lbl="Total faltantes" color="#ef4444"/>
        <MiniCard val={SECTIONS.filter(s=>stats.secStats[s.id].missing.length).length} lbl="Secciones incompletas" color="#f97316"/>
      </div>
      <button style={btn("linear-gradient(135deg,#1d4ed8,#1e40af)")} onClick={onCopy}>📋 Copiar lista de faltantes</button>
      <button style={btn("linear-gradient(135deg,#16a34a,#15803d)",12)} onClick={onWhatsApp}>📲 Compartir por WhatsApp</button>
      <input style={inputSt} type="text" placeholder="🔍 Buscar selección..." value={search} onChange={e=>setSearch(e.target.value)}/>
      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"30px",color:"#475569",fontSize:13}}>
          {search?"😕 Sin resultados para esa búsqueda":"🎉 ¡No te falta ninguna lámina!"}
        </div>
      ):filtered.map(sec=>(
        <TeamRow key={sec.id} sec={sec} nums={stats.secStats[sec.id].missing} type="missing"
          onChipClick={num=>onMarkOwned(sec.id,num)}/>
      ))}
    </div>
  );
}

function RepeatedTab({stats,search,setSearch,onExtra,onCopy}){
  const filtered=SECTIONS.filter(s=>{
    const ss=stats.secStats[s.id];
    if(!ss.repeated.length)return false;
    if(!search)return true;
    const q=search.toLowerCase();
    return s.name.toLowerCase().includes(q)||s.code.toLowerCase().includes(q);
  });
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <MiniCard val={stats.repUnique} lbl="Tipos repetidos" color="#f97316"/>
        <MiniCard val={stats.repUnique+stats.extraTotal} lbl="Copias extra totales" color="#f59e0b"/>
      </div>
      <button style={btn("linear-gradient(135deg,#ea580c,#c2410c)")} onClick={onCopy}>📋 Copiar repetidas para ofrecer</button>
      <div style={{background:"rgba(249,115,22,.07)",border:"1px solid rgba(249,115,22,.15)",borderRadius:10,
        padding:"9px 12px",marginBottom:10,fontSize:11,color:"#94a3b8"}}>
        💡 Usa <b style={{color:"#f97316"}}>−</b> / <b style={{color:"#f97316"}}>+</b> para indicar cuántas copias tienes de cada lámina
      </div>
      <input style={inputSt} type="text" placeholder="🔍 Buscar selección..." value={search} onChange={e=>setSearch(e.target.value)}/>
      {filtered.map(sec=>{
        const ss=stats.secStats[sec.id];
        const totalCopies=ss.repeated.reduce((a,r)=>a+r.extra,0)+ss.repeated.length;
        return(
          <div key={sec.id} style={{background:"#0f1623",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,marginBottom:8,overflow:"hidden"}}>
            <div style={{padding:"9px 12px 4px",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>{sec.flag}</span>
              <span style={{fontSize:11,fontWeight:700}}>{sec.code}</span>
              <span style={{fontSize:9,color:"#64748b",flex:1}}>{sec.name}</span>
              <span style={{background:"rgba(249,115,22,.15)",color:"#f97316",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>
                {totalCopies} copias
              </span>
            </div>
            <div style={{padding:"6px 12px 10px",display:"flex",flexWrap:"wrap",gap:6}}>
              {ss.repeated.map(r=>(
                <div key={r.num} style={{display:"flex",alignItems:"center",gap:3}}>
                  <span style={{background:"rgba(249,115,22,.15)",color:"#f97316",
                    border:"1px solid rgba(249,115,22,.3)",borderRadius:6,padding:"3px 7px",
                    fontSize:11,fontWeight:700,minWidth:28,textAlign:"center"}}>{r.num}</span>
                  <button style={ctrlBtn} onClick={()=>onExtra(sec.id,r.num,-1)}>−</button>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:"#f97316",
                    minWidth:24,textAlign:"center",lineHeight:1}}>×{r.extra+1}</span>
                  <button style={ctrlBtn} onClick={()=>onExtra(sec.id,r.num,+1)}>+</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CostsTab({stats}){
  const {total,owned,missing,repUnique,extraTotal,acquired,packs,cost,secStats}=stats;
  const costPerOwned=owned>0?Math.round(cost/owned):0;
  const expPerPack=missing>0?+(7*(missing/total)).toFixed(2):0;
  const extraPacks=missing>0?Math.ceil(missing/Math.max(0.01,expPerPack)):0;
  const extraCost=extraPacks*PACK_COST;
  const topMiss=[...SECTIONS].filter(s=>secStats[s.id].missing.length>0)
    .sort((a,b)=>secStats[b.id].missing.length-secStats[a.id].missing.length).slice(0,8);
  return(
    <div>
      <div style={{background:"linear-gradient(135deg,rgba(245,158,11,.12),rgba(249,115,22,.12))",
        border:"1px solid rgba(245,158,11,.25)",borderRadius:14,padding:"16px 18px",
        marginBottom:10,textAlign:"center"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:44,color:"#f59e0b",lineHeight:1}}>
          ${fmtNum(cost)}
        </div>
        <div style={{fontSize:11,color:"#94a3b8",marginTop:4}}>COP gastado estimado</div>
        <div style={{fontSize:10,color:"#64748b",marginTop:2}}>~{packs} sobres × $5.000 c/u · {fmtNum(acquired)} láminas adquiridas</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:10}}>
        {[
          {v:`$${fmtNum(costPerOwned)}`,l:"COP por lám. única",c:"#22c55e"},
          {v:fmtNum(acquired),l:"Láminas adquiridas",c:"#3b82f6"},
          {v:extraPacks,l:"Sobres para terminar*",c:"#ef4444"},
          {v:`$${fmtNum(extraCost)}`,l:"Costo para terminar*",c:"#f97316"},
        ].map(({v,l,c})=>(
          <div key={l} style={{background:"#0f1623",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"12px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,lineHeight:1,color:c}}>{v}</div>
            <div style={{fontSize:9,color:"#64748b",marginTop:3,lineHeight:1.3}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{background:"#0f1623",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"14px",marginBottom:10}}>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",color:"#64748b",marginBottom:10}}>📊 Composición del álbum</div>
        {[
          {lbl:"Pegadas",val:owned,color:"#22c55e"},
          {lbl:"Faltantes",val:missing,color:"#ef4444"},
          {lbl:"Repetidas (únicas)",val:repUnique,color:"#f97316"},
          {lbl:"Copias extra",val:repUnique+extraTotal,color:"#f59e0b"},
        ].map(({lbl,val,color})=>(
          <div key={lbl} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,fontSize:11}}>
            <div style={{minWidth:110,color}}>{lbl}</div>
            <div style={{flex:1,background:"rgba(255,255,255,.04)",borderRadius:3,height:6,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${Math.round(val/total*100)}%`,background:color,borderRadius:3}}/>
            </div>
            <div style={{minWidth:36,textAlign:"right",fontWeight:700,color}}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{background:"#0f1623",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"14px"}}>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",color:"#64748b",marginBottom:10}}>🔴 Secciones con más faltantes</div>
        {topMiss.map(s=>{
          const cnt=secStats[s.id].missing.length;
          return(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:11}}>
              <span style={{fontSize:14}}>{s.flag}</span>
              <div style={{minWidth:50,color:"#94a3b8",fontSize:10}}>{s.code}</div>
              <div style={{flex:1,background:"rgba(255,255,255,.04)",borderRadius:3,height:5,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.round(cnt/s.total*100)}%`,background:"#ef4444",borderRadius:3}}/>
              </div>
              <div style={{minWidth:30,textAlign:"right",fontWeight:700,color:"#ef4444"}}>{cnt}</div>
            </div>
          );
        })}
        <div style={{marginTop:10,padding:"8px 10px",background:"rgba(255,255,255,.03)",borderRadius:8,fontSize:10,color:"#475569",lineHeight:1.5}}>
          * Estimado probabilístico sin intercambios. Con {fmtNum(repUnique+extraTotal)} láminas repetidas disponibles para cambiar, el costo real puede ser mucho menor.
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  MODAL
// ============================================================
function SectionModal({sec,secStats,stickerData,onClose,onCycle,onMarkAllOwned}){
  const nums=getStickerNums(sec);
  const color=getColor(secStats.progress);
  const bgMap={missing:"rgba(239,68,68,.12)",owned:"rgba(34,197,94,.12)",repeated:"rgba(249,115,22,.15)"};
  const bdMap={missing:"rgba(239,68,68,.35)",owned:"rgba(34,197,94,.35)",repeated:"rgba(249,115,22,.45)"};
  const cMap={missing:"#ef4444",owned:"#22c55e",repeated:"#f97316"};
  return(
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(4px)",
        zIndex:200,display:"flex",alignItems:"flex-end"}}>
      <div style={{background:"#0f1623",borderRadius:"20px 20px 0 0",borderTop:"1px solid rgba(255,255,255,.08)",
        width:"100%",maxHeight:"88vh",overflowY:"auto"}}>
        <div style={{width:40,height:4,background:"rgba(255,255,255,.12)",borderRadius:2,margin:"10px auto 0"}}/>
        <div style={{padding:"10px 14px 12px",borderBottom:"1px solid rgba(255,255,255,.06)",
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:28}}>{sec.flag}</span>
            <div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20}}>{sec.name}</div>
              <div style={{fontSize:11,color:"#64748b"}}>{secStats.owned}/{sec.total} láminas · {secStats.progress}%</div>
            </div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.08)",border:"none",borderRadius:8,
            color:"white",fontSize:13,width:30,height:30,cursor:"pointer",display:"flex",
            alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"10px 14px"}}>
          <div style={{background:"rgba(255,255,255,.04)",borderRadius:4,height:5,overflow:"hidden",marginBottom:12}}>
            <div style={{height:"100%",width:`${secStats.progress}%`,background:color,borderRadius:4,transition:"width .5s"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:12}}>
            {[{v:secStats.owned,l:"Pegadas",c:"#22c55e"},{v:secStats.missing.length,l:"Faltantes",c:"#ef4444"},
              {v:secStats.repeated.length,l:"Repetidas",c:"#f97316"},{v:`${secStats.progress}%`,l:"Completo",c:color}].map(({v,l,c})=>(
              <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"7px 4px",textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:c,lineHeight:1}}>{v}</div>
                <div style={{fontSize:8,color:"#64748b",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:12,marginBottom:10,fontSize:10,color:"#64748b"}}>
            <span>🟢 Pegada</span><span>🔴 Faltante</span><span>🟠 Repetida</span>
            <span style={{flex:1,textAlign:"right"}}>Toca para cambiar</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:14}}>
            {nums.map(num=>{
              const st=stickerData[num]||{status:"missing",extra:0};
              return(
                <div key={num} onClick={()=>onCycle(sec.id,num)}
                  style={{background:bgMap[st.status],border:`2px solid ${bdMap[st.status]}`,
                    borderRadius:8,minHeight:44,display:"flex",flexDirection:"column",
                    alignItems:"center",justifyContent:"center",cursor:"pointer",
                    fontSize:12,fontWeight:700,color:cMap[st.status],gap:1,
                    transition:"transform .1s",userSelect:"none"}}>
                  {num}
                  {st.status==="repeated"&&<div style={{fontSize:8,fontWeight:800}}>×{st.extra+1}</div>}
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:8,paddingBottom:20}}>
            <button onClick={()=>onMarkAllOwned(sec.id)}
              style={{flex:1,background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.25)",
                borderRadius:10,color:"#22c55e",fontSize:11,fontWeight:700,padding:"10px",cursor:"pointer"}}>
              ✅ Marcar faltantes como pegadas
            </button>
            <button onClick={onClose}
              style={{padding:"10px 14px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",
                borderRadius:10,color:"white",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  LAYOUT
// ============================================================
function Header({stats}){
  const color=getColor(stats.progress);
  return(
    <div style={{background:"linear-gradient(135deg,#0a1628,#0d1f3c)",borderBottom:"1px solid rgba(255,255,255,.07)",
      padding:"11px 14px 11px",position:"sticky",top:0,zIndex:50}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:1}}>⚽ Panini MCC 2026</div>
          <div style={{fontSize:11,color:"#64748b",marginTop:1}}>{stats.owned}/{stats.total} láminas · {stats.missing} faltantes</div>
        </div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:38,color,lineHeight:1}}>{stats.progress}%</div>
      </div>
      <div style={{background:"rgba(255,255,255,.05)",borderRadius:5,height:7,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${stats.progress}%`,background:`linear-gradient(90deg,${color},#60a5fa)`,borderRadius:5,transition:"width .8s"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#475569",marginTop:5}}>
        <span>🔴 {stats.missing} faltantes</span>
        <span>🔄 {stats.repUnique} repetidas · ~{stats.packs} sobres</span>
      </div>
    </div>
  );
}

function BottomNav({tab,setTab,stats}){
  const tabs=[
    {id:"overview",ico:"📊",lbl:"Resumen"},
    {id:"missing",ico:"❓",lbl:"Faltantes"},
    {id:"repeated",ico:"🔄",lbl:"Repetidas"},
    {id:"costs",ico:"💰",lbl:"Costos"},
  ];
  return(
    <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(8,12,20,.97)",
      borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",backdropFilter:"blur(12px)",zIndex:100}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>setTab(t.id)}
          style={{flex:1,background:"none",border:"none",cursor:"pointer",
            padding:"7px 4px 9px",display:"flex",flexDirection:"column",alignItems:"center",gap:3,
            fontSize:9,fontWeight:700,letterSpacing:"0.3px",textTransform:"uppercase",
            color:tab===t.id?"#3b82f6":"#475569",transition:"color .2s"}}>
          <span style={{fontSize:20}}>{t.ico}</span>
          {t.lbl}
        </button>
      ))}
    </nav>
  );
}

// ============================================================
//  MAIN APP
// ============================================================
export default function App(){
  const [stickers,setStickers]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const [tab,setTab]=useState("overview");
  const [openSecId,setOpenSecId]=useState(null);
  const [searchMiss,setSearchMiss]=useState("");
  const [searchRep,setSearchRep]=useState("");
  const [toast,setToast]=useState(null);

  useEffect(() => {
  try {
    const saved = localStorage.getItem("panini-mcc26-v3");
    setStickers(saved ? JSON.parse(saved) : buildInitialState());
  } catch {
    setStickers(buildInitialState());
  }
  setLoaded(true);
}, []);

useEffect(() => {
  if (stickers && loaded) {
    localStorage.setItem("panini-mcc26-v3", JSON.stringify(stickers));
  }
}, [stickers, loaded]);

  const showToast=useCallback((msg,color="#22c55e")=>{
    setToast({msg,color});
    setTimeout(()=>setToast(null),2200);
  },[]);

  const cycleSticker=useCallback((sid,num)=>{
    setStickers(prev=>{
      const cur=prev[sid][num].status;
      const next=cur==="missing"?"owned":cur==="owned"?"repeated":"missing";
      return{...prev,[sid]:{...prev[sid],[num]:{status:next,extra:next==="repeated"?1:0}}};
    });
  },[]);

  const setExtra=useCallback((sid,num,delta)=>{
    setStickers(prev=>{
      const cur=prev[sid][num];
      if(cur.status!=="repeated")return prev;
      return{...prev,[sid]:{...prev[sid],[num]:{...cur,extra:Math.max(1,cur.extra+delta)}}};
    });
  },[]);

  const stats=useMemo(()=>stickers?computeStats(stickers):null,[stickers]);

  if(!loaded||!stickers||!stats)return(
    <div style={{minHeight:"100vh",background:"#080c14",display:"flex",alignItems:"center",
      justifyContent:"center",color:"white",fontFamily:"sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:12}}>⚽</div>
        <div style={{fontSize:14,color:"#64748b"}}>Cargando álbum...</div>
      </div>
    </div>
  );

  const openSec=SECTIONS.find(s=>s.id===openSecId);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
        body{background:#080c14;overflow-x:hidden}
        input{font-family:inherit}
        input:focus{border-color:#3b82f6!important}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
      `}</style>
      <div style={{minHeight:"100vh",background:"#080c14",color:"white",
        fontFamily:"'DM Sans',system-ui,sans-serif",paddingBottom:68}}>
        <Header stats={stats}/>
        <div style={{padding:"12px 10px 0"}}>
          {tab==="overview"&&<OverviewTab stats={stats} onSecClick={setOpenSecId}/>}
          {tab==="missing"&&(
            <MissingTab stats={stats} search={searchMiss} setSearch={setSearchMiss}
              onMarkOwned={(sid,num)=>{cycleSticker(sid,num);showToast("✅ Lámina marcada como pegada");}}
              onCopy={()=>{copyMissing(stats);showToast("📋 Lista copiada al portapapeles");}}
              onWhatsApp={()=>shareWhatsApp(stats)}/>
          )}
          {tab==="repeated"&&(
            <RepeatedTab stats={stats} search={searchRep} setSearch={setSearchRep}
              onExtra={setExtra}
              onCopy={()=>{copyRepeated(stats);showToast("📋 Lista copiada al portapapeles","#f97316");}}/>
          )}
          {tab==="costs"&&<CostsTab stats={stats}/>}
        </div>
        <BottomNav tab={tab} setTab={setTab} stats={stats}/>
        {openSec&&(
          <SectionModal sec={openSec} secStats={stats.secStats[openSec.id]}
            stickerData={stickers[openSec.id]} onClose={()=>setOpenSecId(null)}
            onCycle={cycleSticker}
            onMarkAllOwned={sid=>{
              setStickers(prev=>{
                const u={...prev[sid]};
                for(const[k,v]of Object.entries(u))if(v.status==="missing")u[k]={status:"owned",extra:0};
                return{...prev,[sid]:u};
              });
              showToast("✅ Faltantes marcadas como pegadas");
            }}/>
        )}
        {toast&&(
          <div style={{position:"fixed",bottom:76,left:"50%",transform:"translateX(-50%)",
            background:toast.color,color:"white",padding:"8px 18px",borderRadius:20,
            fontSize:12,fontWeight:700,zIndex:600,whiteSpace:"nowrap",pointerEvents:"none",
            animation:"toastIn .25s ease"}}>
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
