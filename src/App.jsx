
import React,{useState}from'react'
import{createRoot}from'react-dom/client'
import{LayoutDashboard,Wrench,FileText,Package,ShoppingCart,BarChart3,Settings,Search,CalendarCheck,ExternalLink,ChevronRight,ArrowLeft}from'lucide-react'
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
{id:'M-007',type:'Traktor',name:'Valtra',icon:'🚜',status:'Aktiv',tags:['Traktor','Service'],note:'Modell och serviceartiklar ska kompletteras.'}
]

const invoices=[
{id:'INV-001',date:'2021-09-13',supplier:'Maskinklippet',number:'94161032',order:'52064628',total:'5 993 kr',machine:'Stihl MS 201 C-M',pdf:'/invoices/maskinklippet-2021-09-13-ms201.pdf',items:[
{no:'1000465263',name:'Stihl MS 201 C-M Motorsåg',qty:'1',price:'5 560 kr',machine:'Stihl MS 201 C-M'},
{no:'1000097680',name:'Stihl Multifil 2 i 1 till 3/8” P, ø 4,0',qty:'1',price:'399 kr',machine:'Stihl MS 201 C-M'},
{no:'1000097700',name:'Stihl Rundfil CLASSIC 1/4” och 3/8” P, 4 x 200 mm',qty:'1',price:'34 kr',machine:'Stihl MS 201 C-M'}]},
{id:'INV-002',date:'2022-12-26',supplier:'Maskinklippet',number:'124138723',order:'76733621',total:'2 832 kr',machine:'Stihl MS 201 C-M',pdf:'/invoices/maskinklippet-2022-12-26-kedjor.pdf',items:[
{no:'1000191328',name:'Husqvarna Verktygsbälte komplett',qty:'1',price:'1 595 kr',machine:'Skogsutrustning'},
{no:'1000085929',name:'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja',qty:'2',price:'229 kr/st',machine:'Stihl MS 201 C-M'},
{no:'1000106254',name:'Stihl svärd- & kedjepaket 3/8” PS, 44 DL, 1,3 mm',qty:'1',price:'779 kr',machine:'Stihl MS 201 C-M'}]},
{id:'INV-003',date:'2024-11-19',supplier:'Maskinklippet',number:'173099077',order:'130326677',total:'1 451,62 kr',machine:'Stihl MS 201 C-M',pdf:'/invoices/maskinklippet-2024-11-19-kedjor.pdf',items:[
{no:'1000085929',name:'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja',qty:'2',price:'191 kr/st',machine:'Stihl MS 201 C-M'},
{no:'1000085927',name:'Stihl 3/8” P Picco Super PS, 1,3 mm, 30 cm kedja',qty:'1',price:'189 kr',machine:'Stihl MS 201 C-M'},
{no:'3000016134',name:'Husqvarna Scarlett 200/1” Röjklinga',qty:'2',price:'199 kr/st',machine:'Röjsåg'}]},
{id:'INV-004',date:'2026-03-08',supplier:'Toolab',number:'215744123',order:'515780',total:'6 894 kr',machine:'Stihl BR 600',pdf:'/invoices/toolab-2026-03-08-br600.pdf',items:[
{no:'42822000023',name:'Stihl BR 600 Blåsaggregat 4-MIX',qty:'1',price:'6 894 kr',machine:'Stihl BR 600'}]},
{id:'INV-005',date:'2026-01-08',supplier:'Olssons i Ellös',number:'2063662106',order:'7805251',total:'1 169 kr',machine:'Deutz DX 3.60',pdf:'/invoices/olssons-2026-01-08-deutz-bakruta.pdf',items:[
{no:'175-D7732',name:'Bakruta',qty:'1',price:'870 kr exkl. moms',machine:'Deutz DX 3.60'},
{no:'FREIGHT',name:'Frakt',qty:'1',price:'65 kr',machine:'Deutz DX 3.60'}]},
{id:'INV-006',date:'2026-05-12',supplier:'Hova',number:'',order:'',total:'1 710 kr',machine:'Volkswagen Golf BPU34M',pdf:'/invoices/hova-2026-05-12-golf-bakljus.pdf',items:[
{no:'',name:'Höger kombinationsbackljus VW Golf VIII',qty:'1',price:'1 611 kr',machine:'Volkswagen Golf BPU34M'},
{no:'FRAKT',name:'Frakt',qty:'1',price:'99 kr',machine:'Volkswagen Golf BPU34M'}]}
]

const allArticles=invoices.flatMap(inv=>inv.items.map(it=>({...it,invoice:inv.id,date:inv.date,supplier:inv.supplier,invoiceNumber:inv.number})))
const nav=[['dashboard','Dashboard',LayoutDashboard],['machines','Maskiner',Wrench],['invoices','Fakturor',FileText],['articles','Artiklar',Package],['purchase','Inköp',ShoppingCart],['prices','Prisjämförelse',BarChart3],['service','Service',CalendarCheck],['settings','Inställningar',Settings]]
function norm(s){return String(s).toLowerCase().replace(/[åä]/g,'a').replace(/ö/g,'o')}
function Title({t,s}){return <div className="pageTitle"><h1>{t}</h1><p>{s}</p></div>}
function SearchBox({q,setQ,ph}){return <div className="searchbox"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={ph}/></div>}
function Table({heads,rows}){return <div className="table"><div className="thead">{heads.map(h=><b key={h}>{h}</b>)}</div>{rows.map((r,i)=><div className="trow" key={i}>{r.map((c,j)=><span key={j}>{c}</span>)}</div>)}</div>}

function Dashboard({setPage}){return <><Title t="Dashboard" s="Översikt över maskiner, fakturor, artiklar och inköp."/><div className="stats"><button onClick={()=>setPage('machines')}><strong>{machines.length}</strong><span>Maskiner & fordon</span></button><button onClick={()=>setPage('invoices')}><strong>{invoices.length}</strong><span>Fakturor</span></button><button onClick={()=>setPage('articles')}><strong>{allArticles.length}</strong><span>Artikelrader</span></button><button onClick={()=>setPage('purchase')}><strong>v4</strong><span>Fakturacentral</span></button></div><div className="panel"><h2>Nyhet i v4</h2><p>Fakturasidan har detaljvy, artikelrader och knapp för original-PDF. Lägg originalfakturor i <b>public/invoices</b>.</p></div></>}
function Machines(){const[q,setQ]=useState('');const list=machines.filter(m=>norm(Object.values(m).join(' ')).includes(norm(q)));return <><Title t="Maskiner" s="Alla registrerade maskiner och fordon."/><SearchBox q={q} setQ={setQ} ph="Sök maskin, typ eller reservdel..."/><div className="cards">{list.map(m=><article className="card" key={m.id}><div className="big">{m.icon}</div><span className="badge">{m.id} · {m.type}</span><h3>{m.name}</h3><p>{m.note}</p><div className="tags">{m.tags.map(t=><span key={t}>{t}</span>)}</div><b className={m.status==='Aktiv'?'ok':'warn'}>{m.status}</b></article>)}</div></>}
function Invoices(){const[q,setQ]=useState('');const[selected,setSelected]=useState(null);const list=invoices.filter(i=>norm([i.date,i.supplier,i.number,i.order,i.total,i.machine,...i.items.flatMap(x=>[x.no,x.name,x.machine])].join(' ')).includes(norm(q)));if(selected){const inv=invoices.find(i=>i.id===selected);return <InvoiceDetail inv={inv} back={()=>setSelected(null)}/>}return <><Title t="Fakturor" s="Fakturacentral med original-PDF och artikelrader."/><SearchBox q={q} setQ={setQ} ph="Sök faktura, artikelnummer, leverantör eller maskin..."/><div className="invoiceList">{list.map(inv=><button className="invoiceRow" key={inv.id} onClick={()=>setSelected(inv.id)}><div><b>{inv.supplier}</b><span>{inv.date} · Faktura {inv.number||'saknas'} · {inv.machine}</span></div><strong>{inv.total}</strong><ChevronRight size={18}/></button>)}</div></>}
function InvoiceDetail({inv,back}){return <><button className="back" onClick={back}><ArrowLeft size={17}/> Tillbaka till fakturor</button><Title t={`${inv.supplier}`} s={`Faktura ${inv.number||'saknas'} · ${inv.date} · ${inv.machine}`}/><div className="detailGrid"><section className="panel"><h2>Fakturainfo</h2><p><b>Leverantör:</b> {inv.supplier}</p><p><b>Fakturanummer:</b> {inv.number||'—'}</p><p><b>Ordernummer:</b> {inv.order||'—'}</p><p><b>Total:</b> {inv.total}</p><a className="openPdf" href={inv.pdf} target="_blank" rel="noreferrer"><ExternalLink size={17}/> Öppna originalfaktura</a><p className="note">Om PDF saknas: lägg filen i <b>public/invoices</b> med rätt filnamn.</p></section><section className="panel"><h2>Artiklar på fakturan</h2><Table heads={['Art.nr','Artikel','Antal','Pris','Maskin']} rows={inv.items.map(i=>[i.no||'—',i.name,i.qty,i.price,i.machine])}/></section></div></>}
function Articles(){const[q,setQ]=useState('');const rows=allArticles.filter(a=>norm(Object.values(a).join(' ')).includes(norm(q))).map(a=>[a.no||'—',a.name,a.machine,a.supplier,a.date,a.price,a.invoiceNumber||'—']);return <><Title t="Artiklar" s="Sökbar artikeldatabas från fakturor och maskinregister."/><SearchBox q={q} setQ={setQ} ph="Sök artikelnummer, artikel, maskin eller leverantör..."/><Table heads={['Artikelnummer','Artikel','Maskin','Leverantör','Datum','Pris','Faktura']} rows={rows}/></>}
function Purchase(){const[q,setQ]=useState('');const isChain=norm(q).includes('kedj')||norm(q).includes('sag');return <><Title t="Inköp" s="Starta ett inköp och låt appen föreslå rätt reservdel."/><div className="panel"><SearchBox q={q} setQ={setQ} ph="Exempel: Jag behöver två kedjor"/><div className="answer">{!q?'Skriv vad du behöver köpa.':isChain?'Jag kopplar detta till Stihl MS 201 C-M. Föreslagen artikel: Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja.':'Jag hittar ingen säker koppling ännu.'}</div></div></>}
function Prices(){const rows=[['Stihl 35 cm sågkedja','Maskinklippet','191 kr','2','89 kr','471 kr'],['Stihl 35 cm sågkedja','Toolab','219 kr','2','69 kr','507 kr'],['Stihl 35 cm sågkedja','Hylte Lantmän','229 kr','2','59 kr','517 kr'],['Stihl 35 cm sågkedja','Skogma','215 kr','2','79 kr','509 kr']];return <><Title t="Prisjämförelse" s="Jämför pris, antal, frakt och totalpris."/><Table heads={['Produkt','Butik','Pris/st','Antal','Frakt','Totalt']} rows={rows}/><p className="note">Obs: sparad/exempelbaserad prisdata. Livepriser bygger vi senare.</p></>}
function Service(){return <><Title t="Service" s="Kommande servicefunktioner och servicehistorik."/><div className="cards"><article className="card"><h3>Yamaha Grizzly</h3><p>Bromsar och drivknutsdamasker registrerade.</p></article><article className="card"><h3>Klippo LB453S</h3><p>Olja 10W-30, 0,6 liter.</p></article><article className="card"><h3>MS201</h3><p>Kedjor, svärd och filar registrerade.</p></article></div></>}
function SettingsPage(){return <><Title t="Inställningar" s="Grundinställningar för appen."/><div className="panel"><h2>Prioriterade butiker</h2><div className="tags">{stores.map(s=><span key={s}>{s}</span>)}</div><p>Nästa steg: admin-läge.</p></div><div className="panel"><h2>Originalfakturor</h2><p>PDF-filer ska ligga i mappen <b>public/invoices</b>. Vercel publicerar dem så att knappen “Öppna originalfaktura” fungerar.</p></div></>}
function App(){const[page,setPage]=useState('dashboard');const Icon=nav.find(n=>n[0]===page)?.[2]||LayoutDashboard;return <div className="shell"><aside><div className="brand"><div>🤖</div><span><b>Inköpsboten</b><small>Version 4.0</small></span></div><nav>{nav.map(([id,label,I])=><button key={id} onClick={()=>setPage(id)} className={page===id?'active':''}><I size={18}/>{label}</button>)}</nav></aside><main><div className="topbar"><div><Icon size={22}/><b>{nav.find(n=>n[0]===page)?.[1]}</b></div><span>Fakturacentral</span></div>{page==='dashboard'&&<Dashboard setPage={setPage}/>} {page==='machines'&&<Machines/>} {page==='invoices'&&<Invoices/>} {page==='articles'&&<Articles/>} {page==='purchase'&&<Purchase/>} {page==='prices'&&<Prices/>} {page==='service'&&<Service/>} {page==='settings'&&<SettingsPage/>}</main></div>}
createRoot(document.getElementById('root')).render(<App/>)
