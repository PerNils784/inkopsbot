import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Camera, FileText, Search, ShoppingCart, Wrench, PackageCheck, Plus, ChevronRight, Database } from 'lucide-react'
import { machines, stores } from './data/machines.js'
import './style.css'

function normalize(text) {
  return text.toLowerCase().replace(/[åä]/g, 'a').replace(/ö/g, 'o')
}

function answerQuestion(query) {
  const q = normalize(query)
  if (!q.trim()) {
    return 'Skriv vad du behöver köpa. Exempel: “Jag behöver två sågkedjor” eller “bromsar till Grizzlyn”.'
  }

  if (q.includes('kedj') || q.includes('sag') || q.includes('ms201') || q.includes('ms 201')) {
    return `Jag kopplar detta till Stihl MS 201 C-M.

Rekommendation från din historik:
• Stihl 3/8” P Picco Super PS
• 1,3 mm spårbredd
• 35 cm sågkedja har köpts flera gånger
• Du har även köpt 30 cm kedja
• Svärd-/kedjepaket: 3/8” PS, 44 DL, 1,3 mm

Nästa steg i appen:
1. Fråga hur många kedjor du vill köpa.
2. Jämför ${stores.slice(0,4).join(', ')}.
3. Räkna med frakt och kampanjer.`
  }

  if (q.includes('grizzly') || q.includes('broms') || q.includes('atv')) {
    return 'Jag kopplar detta till Yamaha Grizzly 700 EPS. I registret finns bromsklossar, drivknutsdamasker och bromsdelar registrerade.'
  }

  if (q.includes('golf') || q.includes('bpu34m')) {
    return 'Jag kopplar detta till Volkswagen Golf BPU34M. Hittills finns höger kombinationsbackljus från Hova registrerat.'
  }

  if (q.includes('deutz') || q.includes('bakruta') || q.includes('ruta')) {
    return 'Jag kopplar detta till Deutz DX 3.60. Registrerad artikel: Bakruta 175-D7732 från Olssons i Ellös.'
  }

  if (q.includes('blas') || q.includes('br600') || q.includes('br 600')) {
    return 'Jag kopplar detta till Stihl BR 600 4-MIX. Den är registrerad med artikelnummer 42822000023 från Toolab.'
  }

  return 'Jag hittar ingen säker maskinkoppling ännu. Sökresultaten nedan kan hjälpa dig välja rätt maskin.'
}

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('M-001')
  const selected = machines.find(m => m.id === selectedId)

  const allPurchases = machines.flatMap(m => m.purchases.map(p => ({ ...p, machine: m.name })))
  const answer = useMemo(() => answerQuestion(query), [query])

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q.trim()) return machines
    return machines.filter(m => {
      const blob = normalize([
        m.name, m.shortName, m.type, m.description,
        ...m.tags, ...m.knownParts,
        ...m.purchases.flatMap(p => [p.item, p.articleNo, p.supplier])
      ].join(' '))
      return q.split(/\s+/).some(word => word.length > 1 && blob.includes(word))
    })
  }, [query])

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="logo">
          <div className="logoIcon">🤖</div>
          <div>
            <strong>Inköpsboten</strong>
            <span>Version 2</span>
          </div>
        </div>

        <nav>
          <a className="active"><Database size={18}/> Översikt</a>
          <a><Wrench size={18}/> Maskiner</a>
          <a><FileText size={18}/> Fakturor</a>
          <a><ShoppingCart size={18}/> Inköp</a>
          <a><PackageCheck size={18}/> Artiklar</a>
        </nav>

        <div className="stores">
          <strong>Prioriterade butiker</strong>
          {stores.slice(0,4).map(store => <span key={store}>{store}</span>)}
        </div>
      </aside>

      <main className="main">
        <header className="hero">
          <div>
            <p className="kicker">Pers personliga inköpsassistent</p>
            <h1>Maskiner, fakturor och reservdelar</h1>
            <p>En riktig webbapp för att koppla dina inköp till rätt maskin och föreslå nästa köp smartare.</p>
          </div>
          <button className="addBtn"><Plus size={18}/> Lägg till maskin</button>
        </header>

        <section className="stats">
          <div><strong>{machines.length}</strong><span>maskiner & fordon</span></div>
          <div><strong>{allPurchases.length}</strong><span>kopplade inköp</span></div>
          <div><strong>{stores.length}</strong><span>leverantörer</span></div>
          <div><strong>v2</strong><span>appversion</span></div>
        </section>

        <section className="quickActions">
          <button><Camera size={20}/> Identifiera del</button>
          <button><Search size={20}/> Sök artikel</button>
          <button><FileText size={20}/> Läs in faktura</button>
          <button><ShoppingCart size={20}/> Nytt inköp</button>
        </section>

        <section className="assistantCard">
          <div>
            <h2>Fråga inköpsboten</h2>
            <p>Testa: “Jag behöver nya sågkedjor”</p>
          </div>
          <div className="searchBar">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Vad behöver du köpa?" />
            <button>Analysera</button>
          </div>
          <pre>{answer}</pre>
        </section>

        <section className="layout">
          <div className="machineList">
            <h2>Maskinregister</h2>
            {filtered.map(machine => (
              <button
                key={machine.id}
                className={machine.id === selectedId ? 'machineRow active' : 'machineRow'}
                onClick={() => setSelectedId(machine.id)}
              >
                <span className="machineIcon">{machine.icon}</span>
                <span>
                  <strong>{machine.name}</strong>
                  <small>{machine.id} · {machine.type}</small>
                </span>
                <ChevronRight size={16}/>
              </button>
            ))}
          </div>

          <div className="detail">
            <div className="detailTop">
              <div>
                <span className="badge">{selected.id} · {selected.type}</span>
                <h2>{selected.icon} {selected.name}</h2>
                <p>{selected.description}</p>
              </div>
              <span className={selected.status === 'Aktiv' ? 'status ok' : 'status warn'}>{selected.status}</span>
            </div>

            <div className="tags">
              {selected.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>

            <section className="subcard">
              <h3>Kända reservdelar</h3>
              {selected.knownParts.length ? (
                <ul>
                  {selected.knownParts.map(part => <li key={part}>{part}</li>)}
                </ul>
              ) : (
                <p className="empty">Inga reservdelar registrerade ännu.</p>
              )}
            </section>

            <section className="subcard">
              <h3>Inköpshistorik</h3>
              {selected.purchases.length ? (
                <div className="purchaseList">
                  {selected.purchases.map((p, index) => (
                    <article key={index}>
                      <div>
                        <strong>{p.item}</strong>
                        <span>{p.date} · {p.supplier}</span>
                        {p.articleNo && <span>Art.nr {p.articleNo}</span>}
                      </div>
                      <div className="price">{p.price}</div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="empty">Inga inköp kopplade ännu.</p>
              )}
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
