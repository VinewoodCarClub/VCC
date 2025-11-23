// Globální proměnné
let currentFilter = 'all';
let currentSearch = '';

// Načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    updateCounts();
    displayVehicles();
    setupEventListeners();
});

// Spočítání vozidel podle tříd
function updateCounts() {
    const counts = {
        all: vehicles.length,
        S: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };

    vehicles.forEach(vehicle => {
        if (counts[vehicle.class] !== undefined) {
            counts[vehicle.class]++;
        }
    });

    document.getElementById('count-all').textContent = counts.all;
    document.getElementById('count-s').textContent = counts.S;
    document.getElementById('count-a').textContent = counts.A;
    document.getElementById('count-b').textContent = counts.B;
    document.getElementById('count-c').textContent = counts.C;
    document.getElementById('count-d').textContent = counts.D;
}

// Zobrazení vozidel v tabulce
function displayVehicles() {
    const tbody = document.getElementById('vehiclesTableBody');
    tbody.innerHTML = '';

    // Filtrování vozidel
    let filteredVehicles = vehicles.filter(vehicle => {
        const matchesClass = currentFilter === 'all' || vehicle.class === currentFilter;
        const matchesSearch = vehicle.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesClass && matchesSearch;
    });

    // Aktualizace počtu zobrazených
    document.getElementById('displayedCount').textContent = filteredVehicles.length;

    // Pokud žádná vozidla, zobraz zprávu
    if (filteredVehicles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-results">Žádná vozidla nenalezena</td></tr>';
        return;
    }

    // Vytvoření řádků tabulky
    filteredVehicles.forEach((vehicle, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${vehicle.name}</td>
            <td><span class="class-badge class-${vehicle.class.toLowerCase()}">${vehicle.class}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Nastavení event listenerů
function setupEventListeners() {
    // Filtry tříd
    const classButtons = document.querySelectorAll('.class-btn');
    classButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Odstranění active ze všech tlačítek
            classButtons.forEach(btn => btn.classList.remove('active'));
            // Přidání active na kliknuté tlačítko
            button.classList.add('active');
            
            // Nastavení filtru
            currentFilter = button.getAttribute('data-class');
            displayVehicles();
        });
    });

    // Vyhledávání
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        displayVehicles();
    });
}
