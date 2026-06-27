import React,{useState}from'react'
import{createRoot}from'react-dom/client'
import{LayoutDashboard,Wrench,FileText,Package,ShoppingCart,BarChart3,Settings,Search,CalendarCheck}from'lucide-react'
import'./style.css'

const stores=['Toolab','Hylte Lantmän','Maskinklippet','Skogma','ATVHuset','Hova','Olssons i Ellös']
const machines=[
{id:'M-001',type:'Motorsåg',name:'Stihl MS 201 C-M',icon:'🪚',status:'Aktiv',tags:['Kedjor','Svärd','Filar'],note:'Sågkedjor och svärd registrerade.'},
{id:'M-002',type:'Blåsaggregat',name:'Stihl BR 600',icon:'🍂',status:'Aktiv',tags:['4-MIX','Service'],note:'Artikel 42822000023.'},
{id:'M-003',type:'Traktor',name:'Deutz DX 3.60',icon:'🚜',status:'Aktiv',tags:['Hytt','Glas'],note:'Bakruta 175-D7732 registrerad.'},
{id:'M-004',type:'ATV',name:'Yamaha Grizzly 700 EPS',icon:'🚙',status:'Aktiv',tags:['Bromsar','Drivknut','Vinsch'],note:'Bromsdelar och drivknutsdamasker registrerade.'},
{id:'M-005',type:'Gräsklippare',name:'Husqvarna Klippo LB453S',icon:'🌱',status:'Aktiv',tags:['10W-30','Kniv'],note:'Serviceartiklar ska byggas ut.'},
{id:'F-001',type:'Bil',name:'Volkswagen Golf BPU34M',icon:'🚗',status:'Aktiv',tags:['Belysning','Reservdelar'],note:'Höger kombinationsbackljus registrerat.'},
{id:'F-002',type:'Fordon',name:'CZY569',icon:'🚘',status:'Behöver kompletteras',tags:['Fordon'],note:'Modell saknas.'},
{id:'M-006',type:'Huggarvagn',name:'Farma T9',icon:'🪵',status:'Aktiv',tags:['Skog','Vagn'],note:'Reservdelar ska kompletteras.'},
{id:'M-007',type:'Traktor',name:'Valtra',icon:'🚜',status:'Aktiv',tags:['Traktor','Service'],note:'Modell och serviceartiklar ska kompletteras.'}]
const invoices=[
['2021-09-13','Maskinklippet','94161032','Stihl MS 201 C-M','5 993 kr'],
['2022-12-26','Maskinklippet','124138723','Stihl MS 201 C-M','2 832 kr'],
['2024-11-19','Maskinklippet','173099077','Stihl MS 201 C-M','1 451,62 kr'],
['2026-03-08','Toolab','215744123','Stihl BR 600','6 894 kr'],
['2026-01-08','Olssons i Ellös','2063662106','Deutz DX 3.60','1 169 kr'],
['2026-05-12','Hova','—','Volkswagen Golf BPU34M','1 710 kr']]
const articles=[
['1000465263','Stihl MS 201 C-M Motorsåg','Stihl MS 201 C-M','Maskinklippet','2021-09-13','5 560 kr'],
['1000085929','Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja','Stihl MS 201 C-M','Maskinklippet','2024-11-19','191 kr/st'],
['1000106254','Stihl svärd- & kedjepaket 3/8” PS, 44 DL, 1,3 mm','Stihl MS 201 C-M','Maskinklippet','2022-12-26','779 kr'],
['1000085927','Stihl 3/8” P Picco Super PS, 1,3 mm, 30 cm kedja','Stihl MS 201 C-M','Maskinklippet','2024-11-19','189 kr'],
['42822000023','Stihl BR 600 Blåsaggregat 4-MIX','Stihl BR 600','Toolab','2026-03-08','6 894 kr'],
['175-D7732','Bakruta Deutz DX 3.60','Deutz DX 3.60','Olssons i Ellös','2026-01-08','870 kr exkl. moms'],
['—','Höger kombinationsbackljus VW Golf VIII','Volkswagen Golf BPU34M','Hova','2026-05-12','1 611 kr + frakt'],
['—','Bromsklossar Grizzly 550/700','Yamaha Grizzly 700 EPS','ATVHuset','2025-02-03','Registrerat']]
const prices=[
['Stihl 35 cm sågkedja','Maskinklippet','191 kr','2','89 kr','471 kr'],
['Stihl 35 cm sågkedja','Toolab','219 kr','2','69 kr','507 kr'],
['Stihl 35 cm sågkedja','Hylte Lantmän','229 kr','2','59 kr','517 kr'],
['Stihl 35 cm sågkedja','Skogma','215 kr','2','79 kr','509 kr']]
const nav=[['dashboard','Dashboard',LayoutDashboard],['machines','Maskiner',Wrench],['invoices','Fakturor',FileText],['articles','Artiklar',Package],['purchase','Inköp',ShoppingCart],['prices','Prisjämförelse',BarChart3],['service','Service',CalendarCheck],['settings','Inställningar',Settings]]
function norm(s){return String(s).toLowerCase().replace(/[åä]/g,'a').replace(/ö/g,'o')}
function Title(p){return <div className="pageTitle"><h1>{p.t}</h1><p>{p.s}</p></div>}
function SearchBox({q,setQ,ph}){return <div className="searchbox"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={ph}/></div>}
function Table({heads,rows}){return <div className="table"><div className="thead">{heads.map(h=><b key={h}>{h}</b>)}</div>{rows.map((r,i)=><div className="trow" key={i}>{r.map((c,j)=><span key={j}>{c}</span>)}</div>)}</div>}
function Dashboard({setPage}){return <><Title t="Dashboard" s="Översikt över maskiner, fakturor, artiklar och inköp."/><div className="stats"><button onClick={()=>setPage('machines')}><strong>{machines.length}</strong><span>Maskiner & fordon</span></button><button onClick={()=>setPage('invoices')}><strong>{invoices.length}</strong><span>Fakturor</span></button><button onClick={()=>setPage('articles')}><strong>{articles.length}</strong><span>Artiklar</span></button><button onClick={()=>setPage('purchase')}><strong>1</strong><span>Inköpsflöde</span></button></div><div className="panel"><h2>Fas 1 klar</h2><p>Sidomenyn fungerar nu. Varje knapp visar en egen vy.</p></div></>}
function Machines(){const[q,setQ]=useState('');const list=machines.filter(m=>norm(Object.values(m).join(' ')).includes(norm(q)));return <><Title t="Maskiner" s="Alla registrerade maskiner och fordon."/><SearchBox q={q} setQ={setQ} ph="Sök maskin, typ eller reservdel..."/><div className="cards">{list.map(m=><article className="card" key={m.id}><div className="big">{m.icon}</div><span className="badge">{m.id} · {m.type}</span><h3>{m.name}</h3><p>{m.note}</p><div className="tags">{m.tags.map(t=><span key={t}>{t}</span>)}</div><b className={m.status==='Aktiv'?'ok':'warn'}>{m.status}</b></article>)}</div></>}
function Invoices(){const[q,setQ]=useState('');const rows=invoices.filter(r=>norm(r.join(' ')).includes(norm(q)));return <><Title t="Fakturor" s="Fakturaregister med leverantör, datum och kopplad maskin."/><SearchBox q={q} setQ={setQ} ph="Sök faktura, leverantör eller maskin..."/><Table heads={['Datum','Leverantör','Fakturanr','Maskin','Total']} rows={rows}/></>}
function Articles(){const[q,setQ]=useState('');const rows=articles.filter(r=>norm(r.join(' ')).includes(norm(q)));return <><Title t="Artiklar" s="Sökbar artikeldatabas från fakturor och maskinregister."/><SearchBox q={q} setQ={setQ} ph="Sök artikelnummer, artikel, maskin eller leverantör..."/><Table heads={['Artikelnummer','Artikel','Maskin','Leverantör','Senast köpt','Pris']} rows={rows}/></>}
function Purchase(){const[q,setQ]=useState('');const isChain=norm(q).includes('kedj')||norm(q).includes('sag');return <><Title t="Inköp" s="Starta ett inköp och låt appen föreslå rätt reservdel."/><div className="panel"><SearchBox q={q} setQ={setQ} ph="Exempel: Jag behöver två kedjor"/><div className="answer">{!q?'Skriv vad du behöver köpa.':isChain?'Jag kopplar detta till Stihl MS 201 C-M och föreslår 35 cm Stihl 3/8” P Picco Super PS, 1,3 mm. Gå till Prisjämförelse för totalpris.':'Jag hittar ingen säker koppling ännu.'}</div></div></>}
function Prices(){return <><Title t="Prisjämförelse" s="Jämför pris, antal, frakt och totalpris."/><Table heads={['Produkt','Butik','Pris/st','Antal','Frakt','Totalt']} rows={prices}/><p className="note">Obs: sparad/exempelbaserad prisdata. Livepriser bygger vi senare.</p></>}
function Service(){return <><Title t="Service" s="Kommande servicefunktioner och servicehistorik."/><div className="cards"><article className="card"><h3>Yamaha Grizzly</h3><p>Bromsar och drivknutsdamasker registrerade.</p></article><article className="card"><h3>Klippo LB453S</h3><p>Olja 10W-30, 0,6 liter.</p></article><article className="card"><h3>MS201</h3><p>Kedjor, svärd och filar registrerade.</p></article></div></>}
function SettingsPage(){return <><Title t="Inställningar" s="Grundinställningar för appen."/><div className="panel"><h2>Prioriterade butiker</h2><div className="tags">{stores.map(s=><span key={s}>{s}</span>)}</div><p>Nästa steg: admin-läge.</p></div></>}
function App(){const[page,setPage]=useState('dashboard');const Icon=nav.find(n=>n[0]===page)?.[2]||LayoutDashboard;return <div className="shell"><aside><div className="brand"><div>🤖</div><span><b>Inköpsboten</b><small>Version 3.0 Fas 1</small></span></div><nav>{nav.map(([id,label,I])=><button key={id} onClick={()=>setPage(id)} className={page===id?'active':''}><I size={18}/>{label}</button>)}</nav></aside><main><div className="topbar"><div><Icon size={22}/><b>{nav.find(n=>n[0]===page)?.[1]}</b></div><span>Fungerande sidomeny</span></div>{page==='dashboard'&&<Dashboard setPage={setPage}/>} {page==='machines'&&<Machines/>} {page==='invoices'&&<Invoices/>} {page==='articles'&&<Articles/>} {page==='purchase'&&<Purchase/>} {page==='prices'&&<Prices/>} {page==='service'&&<Service/>} {page==='settings'&&<SettingsPage/>}</main></div>}
createRoot(document.getElementById('root')).render(<App/>)
