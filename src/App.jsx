import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Camera, FileText, Search, ShoppingCart, Wrench, PackageCheck, Plus, ChevronRight, Database, Trophy, AlertTriangle, Info } from 'lucide-react'
import { machines, stores, products } from './data/machines.js'
import './style.css'

function normalize(text) {
  return text.toLowerCase().replace(/[åä]/g, 'a').replace(/ö/g, 'o')
}

function extractQty(text) {
  const q = normalize(text)
  const numberMatch = q.match(/\b(\d+)\b/)
  if (numberMatch) return Number(numberMatch[1])
  if (q.includes('tva')) return 2
  if (q.includes('tre')) return 3
  if (q.includes('fyra')) return 4
  return 1
}

function scoreProduct(product, query) {
  const q = normalize(query)
  let score = 0
  for (const keyword of product.keywords) {
    if (q.includes(normalize(keyword))) score += keyword.length
  }
  return score
}

function findProduct(query) {
  const scored = products
    .map(product => ({ product, score: scoreProduct(product, query) }))
    .filter(row => row.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored[0]?.product || null
}

function sortedOffers(product, qty) {
  if (!product || !product.offers.length) return []
  return product.offers
    .map(offer => ({
      ...offer,
      qty,
      subtotal: offer.unitPrice * qty,
      total: offer.unitPrice * qty + offer.shipping
    }))
    .sort((a, b) => a.total - b.total)
}

function makeAnswer(query, product, qty, offers) {
  if (!query.trim()) return 'Skriv vad du behöver köpa. Exempel: “två kedjor”, “bakruta Deutz”, “bromsklossar Grizzly” eller “bakljus Golf”.'

  if (product && offers.length) {
    const best = offers[0]
    return `Jag hittade en reservdel som matchar sökningen.

Reservdel:
${product.name}

Antal: ${qty} st

Rekommendation:
${best.store} är billigast i jämförelsen: ${best.total} kr totalt.

Obs: Detta är lokal jämförelsedata. Nästa steg är att koppla livepriser från butik.`
  }

  if (product && !offers.length) {
    return `Jag hittade en reservdel som matchar sökningen.

Reservdel:
${product.name}

Men jag saknar prisdata för jämförelse ännu.

Nästa steg:
• Lägg in butik/pris/frakt manuellt
• Eller bygg livehämtning från butik`
  }

  return 'Jag hittar ingen säker reservdel ännu. Sök på artikel, maskin, registreringsnummer eller reservdelstyp.'
}

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('M-001')
  const selected = machines.find(m => m.id === selectedId)

  const product = useMemo(() => findProduct(query), [query])
  const qty = useMemo(() => extractQty(query), [query])
  const offers = useMemo(() => sortedOffers(product, qty), [product, qty])
  const answer = useMemo(() => makeAnswer(query, product, qty, offers), [query, product, qty, offers])
  const productMachine = product ? machines.find(m => m.id === product.machineId) : null

  const allPurchases = machines.flatMap(m => m.purchases.map(p => ({ ...p, machine: m.name })))

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
          <div><strong>Inköpsboten</strong><span>Version 2.2</span></div>
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
            <h1>Reservdelssökning med jämförelser</h1>
            <p>Prisjämförelse visas nu för alla reservdelar där appen har prisdata.</p>
          </div>
          <button className="addBtn"><Plus size={18}/> Lägg till maskin</button>
        </header>

        <section className="stats">
          <div><strong>{machines.length}</strong><span>maskiner & fordon</span></div>
          <div><strong>{allPurchases.length}</strong><span>kopplade inköp</span></div>
          <div><strong>{products.length}</strong><span>sökbara reservdelar</span></div>
          <div><strong>v2.2</strong><span>generell sökning</span></div>
        </section>

        <section className="quickActions">
          <button><Camera size={20}/> Identifiera del</button>
          <button><Search size={20}/> Sök reservdel</button>
          <button><FileText size={20}/> Läs in faktura</button>
          <button><ShoppingCart size={20}/> Nytt inköp</button>
        </section>

        <section className="assistantCard">
          <div>
            <h2>Reservdelssökning</h2>
            <p>Testa: “två kedjor”, “bakruta Deutz”, “bromsklossar Grizzly” eller “bakljus Golf”.</p>
          </div>
          <div className="searchBar">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Skriv reservdel, maskin eller artikelnummer" />
            <button>Analysera</button>
          </div>
          <pre>{answer}</pre>

          {product && (
            <section className="resultBox">
              <div className="resultHeader">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category} · {productMachine?.name || 'Maskin saknas'}</p>
                </div>
                <span><Info size={16}/> {product.offers.length ? 'Prisdata finns' : 'Prisdata saknas'}</span>
              </div>

              {offers.length ? (
                <>
                  <div className="table">
                    <div className="tableHead">
                      <span>Butik</span><span>Pris/st</span><span>Antal</span><span>Frakt</span><span>Totalt</span>
                    </div>
                    {offers.map((offer, index) => (
                      <div className={index === 0 ? 'tableRow best' : 'tableRow'} key={offer.store}>
                        <span>{index === 0 && <Trophy size={15}/>} {offer.store}</span>
                        <span>{offer.unitPrice} kr</span>
                        <span>{offer.qty}</span>
                        <span>{offer.shipping} kr</span>
                        <strong>{offer.total} kr</strong>
                      </div>
                    ))}
                  </div>
                  <p className="note"><AlertTriangle size={15}/> Ej livepriser ännu. Tabellen bygger på sparad prisdata/exempeldata.</p>
                </>
              ) : (
                <div className="missingPrices">
                  <AlertTriangle size={22}/>
                  <div>
                    <strong>Ingen prisjämförelse ännu</strong>
                    <p>Reservdelen är identifierad men saknar butikspriser. Nästa steg är att lägga in priser eller koppla livehämtning.</p>
                  </div>
                </div>
              )}
            </section>
          )}
        </section>

        <section className="layout">
          <div className="machineList">
            <h2>Maskinregister</h2>
            {filtered.map(machine => (
              <button key={machine.id} className={machine.id === selectedId ? 'machineRow active' : 'machineRow'} onClick={() => setSelectedId(machine.id)}>
                <span className="machineIcon">{machine.icon}</span>
                <span><strong>{machine.name}</strong><small>{machine.id} · {machine.type}</small></span>
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

            <div className="tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>

            <section className="subcard">
              <h3>Kända reservdelar</h3>
              {selected.knownParts.length ? <ul>{selected.knownParts.map(part => <li key={part}>{part}</li>)}</ul> : <p className="empty">Inga reservdelar registrerade ännu.</p>}
            </section>

            <section className="subcard">
              <h3>Inköpshistorik</h3>
              {selected.purchases.length ? (
                <div className="purchaseList">
                  {selected.purchases.map((p, index) => (
                    <article key={index}>
                      <div><strong>{p.item}</strong><span>{p.date} · {p.supplier}</span>{p.articleNo && <span>Art.nr {p.articleNo}</span>}</div>
                      <div className="price">{p.price}</div>
                    </article>
                  ))}
                </div>
              ) : <p className="empty">Inga inköp kopplade ännu.</p>}
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
