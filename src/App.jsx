import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Camera, FileText, Search, ShoppingCart, ChevronRight } from 'lucide-react'
import './style.css'

const stores = ['Toolab', 'Hylte Lantmän', 'Maskinklippet', 'Skogma']

const machines = [
  {
    id: 'M001',
    type: 'Motorsåg',
    name: 'Stihl MS 201 C-M',
    icon: '🪚',
    status: 'Aktiv',
    notes: 'Kopplad till sågkedjor, svärd, kedjepaket och filar.',
    purchases: [
      { date: '2021-09-13', supplier: 'Maskinklippet', articleNo: '1000465263', item: 'Stihl MS 201 C-M Motorsåg', price: '5 560 kr' },
      { date: '2022-12-26', supplier: 'Maskinklippet', articleNo: '1000085929', item: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja', price: '229 kr/st' },
      { date: '2022-12-26', supplier: 'Maskinklippet', articleNo: '1000106254', item: 'Stihl svärd- & kedjepaket 3/8” PS, 44 DL, 1,3 mm', price: '779 kr' },
      { date: '2024-11-19', supplier: 'Maskinklippet', articleNo: '1000085929', item: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja', price: '191 kr/st' },
      { date: '2024-11-19', supplier: 'Maskinklippet', articleNo: '1000085927', item: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 30 cm kedja', price: '189 kr' }
    ]
  },
  {
    id: 'M002',
    type: 'Blåsaggregat',
    name: 'Stihl BR 600 4-MIX',
    icon: '🍂',
    status: 'Aktiv',
    notes: 'Artikelnummer 42822000023.',
    purchases: [
      { date: '2026-03-08', supplier: 'Toolab', articleNo: '42822000023', item: 'Stihl BR 600 Blåsaggregat 4-MIX', price: '6 894 kr' }
    ]
  },
  {
    id: 'M003',
    type: 'Traktor',
    name: 'Deutz DX 3.60',
    icon: '🚜',
    status: 'Aktiv',
    notes: 'Traktor med registrerad bakruta.',
    purchases: [
      { date: '2026-01-08', supplier: 'Olssons i Ellös', articleNo: '175-D7732', item: 'Bakruta', price: '870 kr exkl. moms' }
    ]
  },
  {
    id: 'M004',
    type: 'ATV',
    name: 'Yamaha Grizzly 700 EPS',
    icon: '🚙',
    status: 'Aktiv',
    notes: 'Röd ATV. Smeknamn: Grizzlyn.',
    purchases: [
      { date: '2025-02-03', supplier: 'ATVHuset', articleNo: '', item: 'Bromsklossar Grizzly 550/700', price: 'Registrerat' },
      { date: '2025-02-08', supplier: 'ATVHuset', articleNo: '', item: 'Drivknutsdamasker och bromsdelar', price: 'Registrerat' }
    ]
  },
  {
    id: 'M005',
    type: 'Gräsklippare',
    name: 'Husqvarna Klippo LB453S',
    icon: '🌱',
    status: 'Aktiv',
    notes: 'Medföljande olja 10W-30, 0,6 liter.',
    purchases: [
      { date: '2024-07-29', supplier: 'Maskinklippet', articleNo: '', item: 'Husqvarna Klippo LB453S', price: '11 900 kr' }
    ]
  },
  {
    id: 'F001',
    type: 'Bil',
    name: 'Volkswagen Golf BPU34M',
    icon: '🚗',
    status: 'Aktiv',
    notes: 'Volkswagen Golf med registreringsnummer BPU34M.',
    purchases: [
      { date: '2026-05-12', supplier: 'Hova', articleNo: '', item: 'Höger kombinationsbackljus VW Golf VIII', price: '1 611 kr + 99 kr frakt' }
    ]
  },
  {
    id: 'F002',
    type: 'Fordon',
    name: 'CZY569',
    icon: '🚘',
    status: 'Behöver kompletteras',
    notes: 'Fordon finns sparat men modell saknas ännu.',
    purchases: []
  },
  {
    id: 'M006',
    type: 'Huggarvagn',
    name: 'Farma T9',
    icon: '🪵',
    status: 'Aktiv',
    notes: 'Reservdelar och servicehistorik ska kompletteras.',
    purchases: []
  },
  {
    id: 'M007',
    type: 'Traktor',
    name: 'Valtra',
    icon: '🚜',
    status: 'Aktiv',
    notes: 'Modell och serviceartiklar ska kompletteras.',
    purchases: []
  }
]

function makeAnswer(text) {
  const q = text.toLowerCase()
  if (!q.trim()) return 'Skriv vad du behöver, till exempel: Jag behöver nya sågkedjor.'

  if (q.includes('kedj') || q.includes('såg')) {
    return `Jag kopplar detta till Stihl MS 201 C-M.

Senast kända kedjor:
• Stihl 3/8” P Picco Super PS
• 1,3 mm spårbredd
• 35 cm sågkedja
• Svärd-/kedjepaket: 3/8” PS, 44 DL, 1,3 mm

Nästa steg i appen blir att jämföra pris hos ${stores.join(', ')}.`
  }

  if (q.includes('golf') || q.includes('bpu34m')) {
    return 'Jag kopplar detta till Volkswagen Golf BPU34M. Registrerat inköp: höger kombinationsbackljus från Hova.'
  }

  if (q.includes('grizzly') || q.includes('broms') || q.includes('atv')) {
    return 'Jag kopplar detta till Yamaha Grizzly 700 EPS. Registrerade delar: bromsklossar, drivknutsdamasker och bromsdelar.'
  }

  if (q.includes('deutz') || q.includes('bakruta')) {
    return 'Jag kopplar detta till Deutz DX 3.60. Registrerad artikel: bakruta 175-D7732 från Olssons i Ellös.'
  }

  return 'Jag hittar ingen helt säker koppling ännu. Välj en maskin i registret nedan eller komplettera frågan.'
}

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('M001')
  const selected = machines.find(m => m.id === selectedId)
  const answer = useMemo(() => makeAnswer(query), [query])
  const articleCount = machines.reduce((sum, m) => sum + m.purchases.length, 0)

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Pers digitala maskinregister</p>
          <h1>Inköpsboten</h1>
          <p>Maskiner, fordon, reservdelar och inköp samlat i en webbapp.</p>
        </div>
        <div className="statusPill">Vercel-klar</div>
      </header>

      <section className="stats">
        <div><strong>{machines.length}</strong><span>maskiner/fordon</span></div>
        <div><strong>{articleCount}</strong><span>kopplade artiklar</span></div>
        <div><strong>{stores.length}</strong><span>favoritbutiker</span></div>
      </section>

      <section className="actions">
        <button><Camera size={20}/> Identifiera del</button>
        <button><Search size={20}/> Sök artikel</button>
        <button><FileText size={20}/> Läs in faktura</button>
        <button><ShoppingCart size={20}/> Nytt inköp</button>
      </section>

      <section className="assistant">
        <h2>Fråga boten</h2>
        <p>Testa: “Jag behöver nya sågkedjor”.</p>
        <div className="searchRow">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Vad behöver du köpa?" />
          <button>Analysera</button>
        </div>
        <pre>{answer}</pre>
      </section>

      <main className="grid">
        <section className="list">
          <h2>Maskiner</h2>
          {machines.map(m => (
            <button
              key={m.id}
              className={m.id === selectedId ? 'row active' : 'row'}
              onClick={() => setSelectedId(m.id)}
            >
              <span className="icon">{m.icon}</span>
              <span>
                <strong>{m.name}</strong>
                <small>{m.id} · {m.type}</small>
              </span>
              <ChevronRight size={16}/>
            </button>
          ))}
        </section>

        <section className="detail">
          <span className="badge">{selected.id} · {selected.type}</span>
          <h2>{selected.icon} {selected.name}</h2>
          <p>{selected.notes}</p>
          <div className="machineStatus">{selected.status}</div>

          <h3>Kopplade inköp</h3>
          {selected.purchases.length ? (
            <div className="purchases">
              {selected.purchases.map((p, i) => (
                <article key={i}>
                  <div>
                    <strong>{p.item}</strong>
                    <span>{p.date} · {p.supplier}</span>
                    {p.articleNo && <span>Art.nr {p.articleNo}</span>}
                  </div>
                  <b>{p.price}</b>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty">Inga inköp kopplade ännu.</p>
          )}
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
