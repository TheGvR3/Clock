const options = [
    // Gruppo 1: Solo Data (indici 0-4)
    {
        dateStyle: "full"
    },
    {
        dateStyle: "long"
    },
    {
        dateStyle: "medium"
    },
    {
        dateStyle: "short"
    },
    {
        year: "numeric",
        month: "long",
        day: "numeric"
    },

    // Gruppo 2: Solo Ora (indici 5-8)
    {
        timeStyle: "full",
        hour12: false
    },
    {
        timeStyle: "medium",
        hour12: false
    },
    {
        timeStyle: "short",
        hour12: false
    },
    {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    },

    // Gruppo 3: Data e Ora Combinate (indici 9-14)
    {
        dateStyle: "full",
        timeStyle: "full"
    },
    {
        dateStyle: "medium",
        timeStyle: "medium"
    },
    {
        dateStyle: "short",
        timeStyle: "short"
    },
    {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    },
    {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    },
    {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }
];

function updateDateTime() {
    const now = new Date();
    const selectedFormat = document.querySelector('input[name="selectorFormat"]:checked').value;
    const formattedDateTime = now.toLocaleString(undefined, options[selectedFormat]);
    
    // Dividi la stringa in data e ora se contiene entrambe
    if (selectedFormat >= 9) { // Formati combinati
        const [date, time] = formattedDateTime.split(', ');
        document.getElementById('realDate').textContent = date;
        document.getElementById('realTime').textContent = time;
    } else if (selectedFormat >= 5) { // Solo ora
        document.getElementById('realDate').textContent = '';
        // Se contiene GMT o UTC, spezza su due righe
        const timeStr = formattedDateTime;
        if (timeStr.includes('GMT') || timeStr.includes('UTC')) {
            const [time, zone] = timeStr.split(' ');
            document.getElementById('realTime').innerHTML = `${time}<br><span class="timezone">${zone}</span>`;
        } else {
            document.getElementById('realTime').textContent = timeStr;
        }
    } else { // Solo data
        document.getElementById('realDate').textContent = formattedDateTime;
        document.getElementById('realTime').textContent = '';
    }
}

// Aggiungi event listener per i radio button
document.querySelectorAll('input[name="selectorFormat"]').forEach(radio => {
    radio.addEventListener('change', updateDateTime);
});

// Aggiorna ogni secondo
updateDateTime();
setInterval(updateDateTime, 1000);


