/* ============================================================
   NEW YORK ITA RP — ERLC | Navbar Injector
   ============================================================ */

(function() {
  const navHTML = `
  <nav class="navbar">
    <a href="index.html" class="navbar-brand">
      🗽 NY ITA RP <span class="badge-erlc">ERLC</span>
    </a>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="storia.html">Storia</a></li>
      <li><a href="regolamento.html">Regolamento</a></li>
      <li class="nav-dropdown">
        <a href="#">Fazioni</a>
        <div class="dropdown-menu">
          <a href="governo.html">🏛️ Governo</a>
          <a href="prefettura.html">🏢 Prefettura</a>
          <a href="tribunale.html">⚖️ Tribunale</a>
          <a href="comune.html">🏙️ Comune</a>
          <a href="ice.html">🛂 ICE</a>
          <a href="border-patrol.html">🚧 Border Patrol</a>
          <a href="nypd.html">👮 NYPD</a>
          <a href="nyso.html">🔰 NYSO</a>
          <a href="nyfd.html">🚒 NYFD</a>
          <a href="ems.html">🚑 EMS</a>
          <a href="dot.html">🚦 DOT</a>
          <a href="aziende.html">🏢 Aziende</a>
          <a href="gang.html">🔫 Gang</a>
          <a href="mafie.html">🤵 Mafie</a>
        </div>
      </li>
      <li><a href="shop.html">Shop</a></li>
      <li><a href="come-iniziare.html">Come Iniziare</a></li>
    </ul>
  </nav>`;

  const container = document.getElementById('navbar-container');
  if (container) container.innerHTML = navHTML;
})();
