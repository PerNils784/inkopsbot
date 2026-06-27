export const stores = [
  'Toolab',
  'Hylte Lantmän',
  'Maskinklippet',
  'Skogma',
  'ATVHuset',
  'Hova',
  'Olssons i Ellös'
]

export const products = [
  {
    id: 'chain-ms201-35',
    category: 'Sågkedja',
    name: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja',
    machineId: 'M-001',
    keywords: ['kedja', 'sågkedja', 'kedjor', 'ms201', 'ms 201', 'stihl', '35 cm'],
    articleHistory: ['1000085929'],
    note: 'Känd från fakturor. Kontrollera svärdets märkning innan köp.',
    offers: [
      { store: 'Maskinklippet', unitPrice: 191, shipping: 89, stock: 'Okänd', note: 'Senaste fakturapris 2024-11-19' },
      { store: 'Toolab', unitPrice: 219, shipping: 69, stock: 'Okänd', note: 'Exempelpris' },
      { store: 'Hylte Lantmän', unitPrice: 229, shipping: 59, stock: 'Okänd', note: 'Exempelpris' },
      { store: 'Skogma', unitPrice: 215, shipping: 79, stock: 'Okänd', note: 'Exempelpris' }
    ]
  },
  {
    id: 'chain-ms201-30',
    category: 'Sågkedja',
    name: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 30 cm kedja',
    machineId: 'M-001',
    keywords: ['30 cm kedja', '30 cm sågkedja', 'ms201 30', 'kort kedja'],
    articleHistory: ['1000085927'],
    note: 'Känd från faktura 2024-11-19.',
    offers: [
      { store: 'Maskinklippet', unitPrice: 189, shipping: 89, stock: 'Okänd', note: 'Senaste fakturapris' },
      { store: 'Toolab', unitPrice: 209, shipping: 69, stock: 'Okänd', note: 'Exempelpris' },
      { store: 'Hylte Lantmän', unitPrice: 219, shipping: 59, stock: 'Okänd', note: 'Exempelpris' },
      { store: 'Skogma', unitPrice: 205, shipping: 79, stock: 'Okänd', note: 'Exempelpris' }
    ]
  },
  {
    id: 'deutz-rear-window',
    category: 'Glas',
    name: 'Bakruta 175-D7732 till Deutz DX 3.60',
    machineId: 'M-003',
    keywords: ['bakruta', 'ruta', 'glas', 'deutz', '175-d7732', '175 d7732'],
    articleHistory: ['175-D7732'],
    note: 'Känd från Olssons i Ellös-faktura.',
    offers: [
      { store: 'Olssons i Ellös', unitPrice: 870, shipping: 65, stock: 'Okänd', note: 'Fakturapris 2026-01-08 exkl. moms' }
    ]
  },
  {
    id: 'golf-rear-light',
    category: 'Bildel',
    name: 'Höger kombinationsbackljus VW Golf VIII',
    machineId: 'F-001',
    keywords: ['golf', 'bpu34m', 'bakljus', 'backljus', 'kombinationsbackljus', 'höger bakljus'],
    articleHistory: [],
    note: 'Känd från Hova-faktura.',
    offers: [
      { store: 'Hova', unitPrice: 1611, shipping: 99, stock: 'Okänd', note: 'Fakturapris 2026-05-12' }
    ]
  },
  {
    id: 'br600-unit',
    category: 'Maskin',
    name: 'Stihl BR 600 Blåsaggregat 4-MIX',
    machineId: 'M-002',
    keywords: ['br600', 'br 600', 'blås', 'blåsaggregat', 'lövblås', '42822000023'],
    articleHistory: ['42822000023'],
    note: 'Känd från Toolab-faktura.',
    offers: [
      { store: 'Toolab', unitPrice: 6894, shipping: 0, stock: 'Okänd', note: 'Fakturapris 2026-03-08' }
    ]
  },
  {
    id: 'grizzly-brake-pads',
    category: 'ATV-del',
    name: 'Bromsklossar Grizzly 550/700',
    machineId: 'M-004',
    keywords: ['grizzly broms', 'bromsklossar', 'bromsbelägg', 'yamaha grizzly', 'atv broms'],
    articleHistory: [],
    note: 'Känd från ATVHuset-faktura. Prisdata behöver kompletteras.',
    offers: []
  },
  {
    id: 'grizzly-cv-boot',
    category: 'ATV-del',
    name: 'Drivknutsdamasker Yamaha Grizzly',
    machineId: 'M-004',
    keywords: ['drivknutsdamask', 'drivknutsdamasker', 'damask', 'grizzly drivknut'],
    articleHistory: [],
    note: 'Känd från ATVHuset-faktura. Prisdata behöver kompletteras.',
    offers: []
  },
  {
    id: 'klippo-oil',
    category: 'Service',
    name: '10W-30 motorolja till Husqvarna Klippo LB453S',
    machineId: 'M-005',
    keywords: ['klippo olja', '10w-30', '10w30', 'gräsklippare olja'],
    articleHistory: [],
    note: 'Känd serviceuppgift. Prisdata behöver kompletteras.',
    offers: []
  }
]

export const machines = [
  {
    id: 'M-001',
    type: 'Motorsåg',
    name: 'Stihl MS 201 C-M',
    shortName: 'MS201',
    icon: '🪚',
    status: 'Aktiv',
    priority: 'Hög',
    description: 'Motorsåg med registrerade kedjor, svärd/kedjepaket och filar.',
    tags: ['Kedjor', 'Svärd', 'Filar', '3/8 P', '1,3 mm'],
    knownParts: [
      'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja',
      'Stihl 3/8” P Picco Super PS, 1,3 mm, 30 cm kedja',
      'Stihl svärd- & kedjepaket 3/8” PS, 44 DL, 1,3 mm'
    ],
    purchases: [
      { date: '2021-09-13', supplier: 'Maskinklippet', articleNo: '1000465263', item: 'Stihl MS 201 C-M Motorsåg', qty: '1', price: '5 560 kr' },
      { date: '2022-12-26', supplier: 'Maskinklippet', articleNo: '1000085929', item: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja', qty: '2', price: '229 kr/st' },
      { date: '2022-12-26', supplier: 'Maskinklippet', articleNo: '1000106254', item: 'Stihl svärd- & kedjepaket 3/8” PS, 44 DL, 1,3 mm', qty: '1', price: '779 kr' },
      { date: '2024-11-19', supplier: 'Maskinklippet', articleNo: '1000085929', item: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 35 cm sågkedja', qty: '2', price: '191 kr/st' },
      { date: '2024-11-19', supplier: 'Maskinklippet', articleNo: '1000085927', item: 'Stihl 3/8” P Picco Super PS, 1,3 mm, 30 cm kedja', qty: '1', price: '189 kr' }
    ]
  },
  { id: 'M-002', type: 'Blåsaggregat', name: 'Stihl BR 600 4-MIX', shortName: 'BR600', icon: '🍂', status: 'Aktiv', priority: 'Normal', description: 'Blåsaggregat från Toolab.', tags: ['4-MIX', 'Service', 'Filter'], knownParts: ['Artikelnummer 42822000023'], purchases: [{ date: '2026-03-08', supplier: 'Toolab', articleNo: '42822000023', item: 'Stihl BR 600 Blåsaggregat 4-MIX', qty: '1', price: '6 894 kr' }] },
  { id: 'M-003', type: 'Traktor', name: 'Deutz DX 3.60', shortName: 'Deutz', icon: '🚜', status: 'Aktiv', priority: 'Normal', description: 'Traktor med registrerad bakruta.', tags: ['Hytt', 'Glas', 'Reservdelar'], knownParts: ['Bakruta 175-D7732'], purchases: [{ date: '2026-01-08', supplier: 'Olssons i Ellös', articleNo: '175-D7732', item: 'Bakruta', qty: '1', price: '870 kr exkl. moms' }] },
  { id: 'M-004', type: 'ATV', name: 'Yamaha Grizzly 700 EPS', shortName: 'Grizzlyn', icon: '🚙', status: 'Aktiv', priority: 'Hög', description: 'Röd ATV. Smeknamn Grizzlyn.', tags: ['Bromsar', 'Drivknut', 'Vinsch', 'ATV'], knownParts: ['Bromsklossar Grizzly 550/700', 'Drivknutsdamasker', 'Bromsdelar'], purchases: [{ date: '2025-02-03', supplier: 'ATVHuset', articleNo: '', item: 'Bromsklossar Grizzly 550/700', qty: '', price: 'Registrerat' }, { date: '2025-02-08', supplier: 'ATVHuset', articleNo: '', item: 'Drivknutsdamasker och bromsdelar', qty: '', price: 'Registrerat' }] },
  { id: 'M-005', type: 'Gräsklippare', name: 'Husqvarna Klippo LB453S', shortName: 'Klippo', icon: '🌱', status: 'Aktiv', priority: 'Normal', description: 'Gräsklippare med serviceartiklar som ska byggas ut.', tags: ['10W-30', 'Kniv', 'Tändstift'], knownParts: ['10W-30 olja, 0,6 liter'], purchases: [{ date: '2024-07-29', supplier: 'Maskinklippet', articleNo: '', item: 'Husqvarna Klippo LB453S', qty: '1', price: '11 900 kr' }] },
  { id: 'F-001', type: 'Bil', name: 'Volkswagen Golf', shortName: 'BPU34M', icon: '🚗', status: 'Aktiv', priority: 'Normal', description: 'Volkswagen Golf med registreringsnummer BPU34M.', tags: ['BPU34M', 'Golf', 'Belysning'], knownParts: ['Höger kombinationsbackljus VW Golf VIII'], purchases: [{ date: '2026-05-12', supplier: 'Hova', articleNo: '', item: 'Höger kombinationsbackljus VW Golf VIII', qty: '1', price: '1 611 kr + 99 kr frakt' }] },
  { id: 'F-002', type: 'Fordon', name: 'CZY569', shortName: 'CZY569', icon: '🚘', status: 'Behöver kompletteras', priority: 'Låg', description: 'Fordon finns sparat men modell saknas ännu.', tags: ['CZY569', 'Fordon'], knownParts: [], purchases: [] },
  { id: 'M-006', type: 'Huggarvagn', name: 'Farma T9', shortName: 'Farma', icon: '🪵', status: 'Aktiv', priority: 'Normal', description: 'Huggarvagn i maskinregistret.', tags: ['Skog', 'Vagn', 'Reservdelar'], knownParts: [], purchases: [] },
  { id: 'M-007', type: 'Traktor', name: 'Valtra', shortName: 'Valtra', icon: '🚜', status: 'Aktiv', priority: 'Normal', description: 'Traktor i maskinregistret. Modell ska kompletteras.', tags: ['Traktor', 'Service'], knownParts: [], purchases: [] }
]
