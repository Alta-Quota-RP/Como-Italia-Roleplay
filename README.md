# APEX DESIGNS — Guida alla Personalizzazione

## 📁 Struttura dei File

```
shop/
├── index.html          → Pagina principale (Home)
├── livree.html         → Pagina Livree ERLC
├── grafiche.html       → Pagina Grafiche
├── uniformi.html       → Pagina Uniformi
├── contatti.html       → Pagina Contatti + FAQ
│
├── css/
│   └── style.css       → Tutti gli stili del sito
│
├── js/
│   ├── config.js       ⭐ FILE PRINCIPALE DI CONFIGURAZIONE
│   └── main.js         → Logica del sito (non toccare)
│
└── assets/             → Cartella per immagini e loghi
```

---

## ⚡ CONFIGURAZIONE RAPIDA (js/config.js)

Apri **js/config.js** e modifica questi valori:

| Variabile | Descrizione |
|-----------|-------------|
| `siteName` | Nome del tuo shop |
| `discordInvite` | Link invite del tuo server Discord |
| `logoFile` | Percorso del tuo logo |
| `heroBanner` | Immagine di sfondo hero |
| `accentColor` | Colore principale (es. `#ff3c00`) |
| `contactEmail` | Email di contatto |

---

## 🖼️ SOSTITUIRE IMMAGINI

Metti tutte le immagini nella cartella `assets/` e usa questi nomi:

### Logo
- `assets/logo.png` → Logo del sito (navbar e footer)

### Banner delle pagine
- `assets/hero-banner.jpg` → Sfondo della home
- `assets/discord-banner.jpg` → Sfondo sezione Discord
- `assets/banner-livree.jpg` → Banner pagina Livree
- `assets/banner-grafiche.jpg` → Banner pagina Grafiche
- `assets/banner-uniformi.jpg` → Banner pagina Uniformi

### Cards nella Home
- `assets/card-livree.jpg` → Card servizio Livree
- `assets/card-grafiche.jpg` → Card servizio Grafiche
- `assets/card-uniformi.jpg` → Card servizio Uniformi

### Portfolio (Home)
- `assets/portfolio-1.jpg` → Immagine portfolio 1
- `assets/portfolio-2.jpg` → Immagine portfolio 2
- `assets/portfolio-3.jpg` → Immagine portfolio 3
- `assets/portfolio-4.jpg` → Immagine portfolio 4

### Prodotti Livree
- `assets/livrea-polizia-1.jpg`
- `assets/livrea-polizia-2.jpg`
- `assets/livrea-ambulanza-1.jpg`
- `assets/livrea-vvf-1.jpg`
- `assets/livrea-civile-1.jpg`
- `assets/livrea-militare-1.jpg`

### Prodotti Grafiche
- `assets/grafica-logo-1.jpg`
- `assets/grafica-banner-1.jpg`
- `assets/grafica-doc-1.jpg`
- `assets/grafica-ui-1.jpg`
- `assets/grafica-social-1.jpg`
- `assets/grafica-patch-1.jpg`

### Prodotti Uniformi
- `assets/uniforme-polizia-1.jpg`
- `assets/uniforme-swat-1.jpg`
- `assets/uniforme-ems-1.jpg`
- `assets/uniforme-vvf-1.jpg`
- `assets/uniforme-militare-1.jpg`
- `assets/uniforme-civile-1.jpg`

> **Nota:** Se un'immagine manca, il sito mostra automaticamente un'icona emoji al suo posto. Il sito funziona anche senza immagini!

---

## 🎨 CAMBIARE COLORI (css/style.css)

Apri `css/style.css` e modifica le variabili CSS in cima al file:

```css
:root {
  --accent: #ff3c00;      /* Colore principale (arancio-rosso) */
  --accent2: #ff8c00;     /* Colore secondario (arancio) */
  --bg: #080808;          /* Sfondo principale */
  --text: #f0f0f0;        /* Colore testo */
}
```

---

## ➕ AGGIUNGERE UN PRODOTTO

Nelle pagine livree/grafiche/uniformi, copia questo blocco HTML e incollalo nella griglia:

```html
<div class="product-card" data-category="CATEGORIA">
  <div class="product-img">
    <img src="assets/nome-immagine.jpg" alt="Nome Prodotto" onerror="this.style.display='none'">
    <div class="product-img-placeholder">🚔</div>  <!-- emoji fallback -->
    <!-- <div class="product-badge">NUOVO</div> -->  <!-- opzionale -->
  </div>
  <div class="product-body">
    <div class="product-cat">Categoria</div>
    <div class="product-name">Nome Prodotto</div>
    <div class="product-desc">Descrizione del prodotto.</div>
    <div class="product-footer">
      <div class="product-price">GRATIS</div>
      <a href="#" class="product-order-btn discord-dynamic" target="_blank">Ordina →</a>
    </div>
  </div>
</div>
```

**Categorie disponibili per data-category:**
- Livree: `polizia`, `ambulanza`, `vigili`, `civile`, `militare`
- Grafiche: `logo`, `banner`, `documento`, `interfaccia`, `social`
- Uniformi: `polizia`, `ems`, `vvf`, `militare`, `civile`

---

## 🔗 LINK DISCORD

Il link Discord viene impostato **una sola volta** in `js/config.js`:
```javascript
discordInvite: "https://discord.gg/TUOINVITE",
```
Questo link viene applicato automaticamente a **tutti i pulsanti Discord** del sito!

---

## ❓ FAQ (Domande Frequenti)

Per modificare le domande frequenti, apri `contatti.html` e cerca i blocchi `.faq-item`:

```html
<div class="faq-item">
  <div class="faq-question">La tua domanda qui?</div>
  <div class="faq-answer">La risposta va qui. Può essere lunga quanto vuoi.</div>
</div>
```

---

## 🌐 PUBBLICARE IL SITO

Opzioni consigliate (tutte gratuite):
1. **GitHub Pages** — Carica su GitHub e attiva Pages
2. **Netlify** — Trascina la cartella su netlify.com
3. **Vercel** — Importa da GitHub su vercel.com

Tutte queste opzioni ti danno un dominio gratuito tipo `apex-designs.netlify.app`.
Per un dominio personalizzato (es. `apexdesigns.it`) costa circa 10-15€/anno.
