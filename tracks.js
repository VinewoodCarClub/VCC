// Načtení tratí po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    displayTracks();
    setupTrackListeners();
});

// Zobrazení všech tratí
function displayTracks() {
    const container = document.getElementById('tracksContainer');
    container.innerHTML = '';

    tracks.forEach((track, index) => {
        const trackCard = createTrackCard(track, index);
        container.appendChild(trackCard);
    });
}

// Vytvoření karty tratě
function createTrackCard(track, index) {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.setAttribute('data-track-id', track.id);
    
    card.innerHTML = `
        <div class="track-header" onclick="toggleTrack('${track.id}')">
            <div class="track-header-content">
                <h3>${track.name}</h3>
                <div class="track-header-info">
                    <span class="champion-badge">🏆 ${track.championName}</span>
                </div>
            </div>
            <div class="track-toggle">
                <span class="toggle-icon">▼</span>
            </div>
        </div>
        
        <div class="track-detail" id="detail-${track.id}">
            <div class="track-banner">
                <img src="${track.banner}" alt="${track.name}">
            </div>
            
            <div class="track-info-grid">
                <div class="track-map">
                    <h4>MAPA TRATĚ</h4>
                    <img src="${track.map}" alt="${track.name} Map">
                </div>
                
                <div class="track-champion">
                    <h4>AKTUÁLNÍ ŠAMPION</h4>
                    <img src="${track.champion}" alt="${track.championName}">
                </div>
            </div>
            
            <div class="track-description">
                <h4>O TRATI</h4>
                <p>${track.description}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Přepnutí zobrazení detailu tratě
function toggleTrack(trackId) {
    const detail = document.getElementById(`detail-${trackId}`);
    const card = document.querySelector(`[data-track-id="${trackId}"]`);
    const icon = card.querySelector('.toggle-icon');
    
    // Zavřít všechny ostatní tratě
    document.querySelectorAll('.track-detail').forEach(d => {
        if (d.id !== `detail-${trackId}` && d.classList.contains('active')) {
            d.classList.remove('active');
            const otherCard = d.parentElement;
            const otherIcon = otherCard.querySelector('.toggle-icon');
            otherCard.classList.remove('active');
            otherIcon.textContent = '▼';
        }
    });
    
    // Přepnout aktuální trať
    detail.classList.toggle('active');
    card.classList.toggle('active');
    icon.textContent = detail.classList.contains('active') ? '▲' : '▼';
}

// Nastavení event listenerů
function setupTrackListeners() {
    // Listener je přímo v HTML onclick atributu
    console.log('Track listeners ready');
}