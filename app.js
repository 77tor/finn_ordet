import { substantivDb } from './bilder.js';

let gjeldendeOrdListe = [], selectedAdvancedWords = [], gjeldendeHoyreOrd = [];

function stokkeHoyreKolonne(skalStokke) {
    gjeldendeHoyreOrd = [...gjeldendeOrdListe];
    if (skalStokke && gjeldendeHoyreOrd.length > 1) {
        let like = true, forsok = 0;
        while (like && forsok < 10) {
            gjeldendeHoyreOrd.sort(() => 0.5 - Math.random());
            like = gjeldendeOrdListe.some((item, index) => item.ord === gjeldendeHoyreOrd[index]?.ord);
            forsok++;
        }
    } else if (!skalStokke) { gjeldendeHoyreOrd = [...gjeldendeOrdListe]; }
}

export function generateStaveKryss(nyStokking = true) {
    const outputContainer = document.getElementById('output-container'), captureArea = document.getElementById('capture-area'), placeholder = document.getElementById('placeholder-image');
    if (captureArea) captureArea.className = document.getElementById('theme-select')?.value || 'tema-standard';
    if (!outputContainer) return;

    const bildeStorrelseValg = document.getElementById('image-size')?.value || "55";
    let maksAntall = bildeStorrelseValg === "70" ? 10 : (bildeStorrelseValg === "40" ? 15 : 12);
    const harEgneValg = selectedAdvancedWords.length > 0, skalStokke = document.getElementById('toggle-shuffle')?.checked ?? true;

    if (harEgneValg) { gjeldendeOrdListe = selectedAdvancedWords.slice(0, maksAntall); }
    else if (nyStokking) { gjeldendeOrdListe = [...substantivDb].sort(() => 0.5 - Math.random()).slice(0, Math.min(maksAntall, substantivDb.length)); }
    else {
        if (gjeldendeOrdListe.length === 0) return;
        if (gjeldendeOrdListe.length < maksAntall && gjeldendeOrdListe.length < substantivDb.length) {
            const ekstra = substantivDb.filter(db => !gjeldendeOrdListe.some(g => g.ord === db.ord)).sort(() => 0.5 - Math.random()).slice(0, maksAntall - gjeldendeOrdListe.length);
            gjeldendeOrdListe = [...gjeldendeOrdListe, ...ekstra];
        } else if (gjeldendeOrdListe.length > maksAntall) { gjeldendeOrdListe = gjeldendeOrdListe.slice(0, maksAntall); }
    }

    const antallOrd = gjeldendeOrdListe.length;
    if (nyStokking || gjeldendeHoyreOrd.length !== antallOrd) stokkeHoyreKolonne(skalStokke);
    const hoyreOrdAvskåret = gjeldendeHoyreOrd.slice(0, antallOrd);
    if (antallOrd === 0) return;

    if (placeholder) placeholder.style.display = 'none';
    if (captureArea) captureArea.style.display = 'block';

    const themeImg3 = document.getElementById('theme-img-3');
    if (themeImg3) { antallOrd >= 10 ? themeImg3.style.setProperty('display', 'none', 'important') : themeImg3.style.removeProperty('display'); }

    const fontFamily = document.getElementById('font-family')?.value || "'Trykkskrift', sans-serif", fontSize = (document.getElementById('font-size')?.value || "24") + "px";
    const storeBokstaver = document.getElementById('toggle-upper')?.checked || false, fetSkrift = document.getElementById('toggle-bold')?.checked || false, visFasit = document.getElementById('toggle-fasit')?.checked || false;
    const bildeStorrelsePx = document.getElementById('image-size')?.value || "55", bildeStorrelse = bildeStorrelsePx + "px";

    outputContainer.innerHTML = ""; outputContainer.style.fontFamily = fontFamily; outputContainer.style.position = "relative";
    let html = `<h1 style="font-family: ${fontFamily}; font-weight: ${fetSkrift ? 'bold' : 'normal'}; text-align: center; margin-top: 0; margin-bottom: 5px;">${storeBokstaver ? "FINN RIKTIG ORD" : "Finn riktig ord"}</h1>
    <p style="text-align: center; margin-top: 0; margin-bottom: 20px;">${storeBokstaver ? "TREKK STREK FRA BILDET TIL RIKTIG ORD." : "Trekk strek fra bildet til riktig ord."}</p>
    <svg id="fasit-svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;"></svg>
    <div style="display: flex; justify-content: space-between; width: 100%; padding: 0 20px; box-sizing: border-box; align-items: flex-start;">
    <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">`;

    gjeldendeOrdListe.forEach(item => {
        html += `<div style="display: flex; align-items: center; gap: 15px; height: ${bildeStorrelse}; box-sizing: border-box;">
            <span class="oppgave-symbol" style="display: flex; align-items: center; justify-content: center; width: ${bildeStorrelse}; height: ${bildeStorrelse}; font-size: calc(${bildeStorrelsePx}px * 0.75);">${item.symbol}</span>
            <div class="fasit-punkt-venstre" data-ord="${item.ord}" style="width: 12px; height: 12px; background-color: #333; border-radius: 50%; flex-shrink: 0;"></div>
        </div>`;
    });

    html += `</div><div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">`;

    hoyreOrdAvskåret.forEach(item => {
        html += `<div style="display: flex; align-items: center; gap: 15px; height: ${bildeStorrelse}; box-sizing: border-box;">
            <div class="fasit-punkt-hoyre" data-ord="${item.ord}" style="width: 12px; height: 12px; background-color: #333; border-radius: 50%; flex-shrink: 0;"></div>
            <span style="font-size: ${fontSize}; font-weight: ${fetSkrift ? 'bold' : 'normal'}; min-width: 120px; display: flex; align-items: center; height: 100%;">${storeBokstaver ? item.ord.toUpperCase() : item.ord.toLowerCase()}</span>
        </div>`;
    });

    html += `</div></div>`;
    outputContainer.innerHTML = html;
    if (visFasit) setTimeout(tegnerFasitStreker, 50);
}

function tegnerFasitStreker() {
    const container = document.getElementById('output-container'), svg = document.getElementById('fasit-svg');
    if (!container || !svg) return;
    svg.innerHTML = '';
    const farger = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#e84393', '#f1c40f', '#34495e', '#d35400'];
    const venstrePunkter = container.querySelectorAll('.fasit-punkt-venstre'), hoyrePunkter = container.querySelectorAll('.fasit-punkt-hoyre');
    const captureArea = document.getElementById('capture-area'), rect = captureArea ? captureArea.getBoundingClientRect() : null, skala = rect ? (rect.width / captureArea.offsetWidth) : 1, containerRect = container.getBoundingClientRect();

    venstrePunkter.forEach((vPunkt, index) => {
        const ord = vPunkt.getAttribute('data-ord'), hPunkt = Array.from(hoyrePunkter).find(h => h.getAttribute('data-ord') === ord);
        if (hPunkt) {
            const r1 = vPunkt.getBoundingClientRect(), r2 = hPunkt.getBoundingClientRect();
            const x1 = ((r1.left + r1.width / 2) - containerRect.left) / skala, y1 = ((r1.top + r1.height / 2) - containerRect.top) / skala;
            const x2 = ((r2.left + r2.width / 2) - containerRect.left) / skala, y2 = ((r2.top + r2.height / 2) - containerRect.top) / skala;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1); line.setAttribute("y1", y1); line.setAttribute("x2", x2); line.setAttribute("y2", y2);
            line.setAttribute("stroke", farger[index % farger.length]); line.setAttribute("stroke-width", "3");
            line.setAttribute("stroke-dasharray", "6,6"); line.setAttribute("stroke-linecap", "round");
            svg.appendChild(line);
        }
    });
}

export function apneOrdModal() { const modal = document.getElementById('ord-modal'); if (modal) { modal.style.display = 'flex'; byttFane('database'); lastInnDatabaseGrid(); oppdaterMineOrdListe(); } }
export function lukkOrdModal() { const modal = document.getElementById('ord-modal'); if (modal) modal.style.display = 'none'; }

export function byttFane(faneNavn) {
    const faneDb = document.getElementById('fane-database'), faneEgne = document.getElementById('fane-egne'), knapper = document.querySelectorAll('.tab-btn');
    knapper.forEach(el => el.classList.remove('active'));
    if (faneNavn === 'database') { if (faneDb) faneDb.style.display = 'flex'; if (faneEgne) faneEgne.style.display = 'none'; if (knapper[0]) knapper[0].classList.add('active'); }
    else { if (faneDb) faneDb.style.display = 'none'; if (faneEgne) faneEgne.style.display = 'flex'; if (knapper[1]) knapper[1].classList.add('active'); }
}

export function lastInnDatabaseGrid(filterTekst = '') {
    const grid = document.getElementById('database-grid'); if (!grid) return;
    grid.innerHTML = '';
    substantivDb.forEach(item => {
        if (filterTekst && !item.ord.toLowerCase().includes(filterTekst.toLowerCase())) return;
        const erValgt = selectedAdvancedWords.some(w => w.ord === item.ord && w.symbol === item.symbol);
        const kort = document.createElement('div');
        kort.className = `ord-kort ${erValgt ? 'selected' : ''}`;
        kort.style.cssText = `border: ${erValgt ? '2px solid #27ae60' : '1px solid #ccc'}; background-color: ${erValgt ? '#e8f8f5' : '#fff'}; padding: 10px; border-radius: 8px; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;`;
        kort.innerHTML = `<div style="height: 40px; display: flex; align-items: center; justify-content: center;">${item.symbol}</div><div style="margin-top: 5px; font-weight: bold; font-size: 0.9rem;">${item.ord}</div>`;
        kort.onclick = () => {
            const idx = selectedAdvancedWords.findIndex(w => w.ord === item.ord && w.symbol === item.symbol);
            idx > -1 ? selectedAdvancedWords.splice(idx, 1) : selectedAdvancedWords.push(item);
            lastInnDatabaseGrid(filterTekst); oppdaterMineOrdListe();
        };
        grid.appendChild(kort);
    });
}

export function filtrerDatabaseGrid() { lastInnDatabaseGrid(document.getElementById('modal-sok')?.value || ''); }

export function leggTilEgetOrd() {
    const input = document.getElementById('custom-word-input'), bildeInput = document.getElementById('custom-image-upload');
    if (!input || !input.value.trim()) return;
    const ordListe = input.value.split(/[\n,]+/).map(s => s.trim()).filter(Boolean), bildeFil = bildeInput?.files[0];

    if (bildeFil) {
        const reader = new FileReader();
        reader.onload = function(e) {
            ordListe.forEach((ord, i) => selectedAdvancedWords.push({ ord, path: `custom_${Date.now()}_${i}`, symbol: `<img src="${e.target.result}" alt="${ord}" style="width: 40px; height: 40px; object-fit: contain;">` }));
            input.value = ''; if (bildeInput) bildeInput.value = '';
            oppdaterMineOrdListe();
        };
        reader.readAsDataURL(bildeFil);
    } else {
        ordListe.forEach((ord, i) => selectedAdvancedWords.push({ ord, path: `custom_text_${Date.now()}_${i}`, symbol: `<span style="font-size: 24px; font-weight: bold;">📝</span>` }));
        input.value = ''; oppdaterMineOrdListe();
    }
}

function oppdaterMineOrdListe() {
    const liste = document.getElementById('mine-ord-liste'), antallEl = document.getElementById('antall-valgte');
    if (antallEl) antallEl.innerText = selectedAdvancedWords.length;
    if (!liste) return;
    liste.innerHTML = '';
    if (selectedAdvancedWords.length === 0) { liste.innerHTML = '<li style="color: #888; font-size: 0.85rem; font-style: italic; padding: 5px 0;">Ingen ord valgt ennå. Klikk på ordene til høyre.</li>'; return; }

    selectedAdvancedWords.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #ddd; padding: 6px; border-radius: 4px; margin-bottom: 6px; font-size: 0.9rem;";
        li.innerHTML = `<span style="display: flex; align-items: center; gap: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span style="display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center;">${item.symbol}</span><strong>${item.ord}</strong></span><button style="background: #e74c3c; color: white; border: none; border-radius: 3px; padding: 2px 6px; cursor: pointer; font-size: 0.8rem;">✕</button>`;
        li.querySelector('button').onclick = () => {
            selectedAdvancedWords.splice(index, 1); oppdaterMineOrdListe();
            lastInnDatabaseGrid(document.getElementById('modal-sok')?.value || '');
        };
        liste.appendChild(li);
    });
}

export function lagreModalValg() { lukkOrdModal(); generateStaveKryss(true); }
export function toggleMenu() { document.getElementById("myDropdown")?.classList.toggle("show"); }

export function resetForm() {
    selectedAdvancedWords = []; gjeldendeOrdListe = []; gjeldendeHoyreOrd = [];
    const captureArea = document.getElementById('capture-area'), placeholder = document.getElementById('placeholder-image'), outputContainer = document.getElementById('output-container'), fasitSvg = document.getElementById('fasit-svg');
    if (outputContainer) outputContainer.innerHTML = '';
    if (fasitSvg) fasitSvg.innerHTML = '';
    if (captureArea) { captureArea.style.display = 'none'; captureArea.className = 'tema-standard'; }
    if (placeholder) placeholder.style.display = 'flex';

    const imgSize = document.getElementById('image-size') || document.getElementById('bilde-storrelse'); if (imgSize) { imgSize.value = "55"; if (imgSize.selectedIndex === -1) imgSize.selectedIndex = 1; }
    const fontSize = document.getElementById('font-size') || document.getElementById('skrift-storrelse'); if (fontSize) { fontSize.value = "24"; if (fontSize.selectedIndex === -1) fontSize.selectedIndex = 1; }
    const fontFamily = document.getElementById('font-family') || document.getElementById('skrifttype'); if (fontFamily) fontFamily.selectedIndex = 0;
    const themeSelect = document.getElementById('theme-select') || document.getElementById('velg-tema'); if (themeSelect) themeSelect.selectedIndex = 0;

    ['theme-img-1', 'theme-img-2', 'theme-img-3'].forEach(id => document.getElementById(id)?.style.removeProperty('display'));
    ['toggle-upper', 'toggle-bold', 'toggle-fasit'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
    const shuffleToggle = document.getElementById('toggle-shuffle') || document.getElementById('stokke-rekkefolge'); if (shuffleToggle) shuffleToggle.checked = true;
    const customInput = document.getElementById('custom-word-input'); if (customInput) customInput.value = '';
}

window.onclick = function(event) {
    if (!event.target.matches('.hamburger') && !event.target.matches('.hamburger span')) {
        Array.from(document.getElementsByClassName("dropdown-menu")).forEach(openDropdown => openDropdown.classList.remove('show'));
    }
};

window.generateStaveKryss = generateStaveKryss;
window.oppdaterVisning = () => generateStaveKryss(false);
window.toggleMenu = toggleMenu;
window.resetForm = resetForm;
window.apneOrdModal = apneOrdModal;
window.lukkOrdModal = lukkOrdModal;
window.byttFane = byttFane;
window.filtrerDatabaseGrid = filtrerDatabaseGrid;
window.leggTilEgetOrd = leggTilEgetOrd;
window.lagreModalValg = lagreModalValg;

function initApp() {
    resetForm();
    const shuffleToggle = document.getElementById('toggle-shuffle') || document.getElementById('stokke-rekkefolge');
    if (shuffleToggle) shuffleToggle.addEventListener('change', () => { if (gjeldendeOrdListe.length > 0) generateStaveKryss(true); });
}

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', initApp) : initApp();