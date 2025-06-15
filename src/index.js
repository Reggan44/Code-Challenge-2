document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const guestForm = document.getElementById('guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const guestList = document.getElementById('guest-list');
    const guestCountLabel = document.getElementById('guest-count-label');

    // Guest data
    let guests = [];
    const MAX_GUESTS = 10;

    // Handle form submission
    guestForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = guestNameInput.value.trim();
        const category = guestCategorySelect.value;

        // Don't proceed with empty name
        if (!name) return;

        // Enforce guest limit
        if (guests.length >= MAX_GUESTS) {
            alert(`Guest list is full. Maximum allowed is ${MAX_GUESTS} guests.`);
            return;
        }

        // Create guest object
        const newGuest = {
            id: Date.now(),
            name,
            category,
            attending: true,
            timestamp: new Date()
        };

        // Add to list and update UI
        guests.push(newGuest);
        renderGuestList();

        // Reset form
        guestNameInput.value = '';
        guestNameInput.focus();
    });

    // Render guest list on the page
    function renderGuestList() {
        guestList.innerHTML = '';
        guestCountLabel.textContent = `(${guests.length} of ${MAX_GUESTS} spots filled)`;

        guests.forEach(guest => {
            const li = document.createElement('li');
            li.className = `guest-item ${guest.category}`;

            li.innerHTML = `
                <div class="guest-info">
                    <strong class="guest-name">${guest.name}</strong> 
                    <em>(${guest.category})</em>
                    <span class="timestamp">${formatTime(guest.timestamp)}</span>
                </div>
                <div class="guest-actions">
                    <button class="rsvp-btn ${guest.attending ? '' : 'not-attending'}" data-id="${guest.id}">
                        ${guest.attending ? 'Attending' : 'Not Attending'}
                    </button>
                    <button class="delete-btn" data-id="${guest.id}">Remove</button>
                </div>
            `;

            guestList.appendChild(li);
        });

        // Add interactivity
        document.querySelectorAll('.rsvp-btn').forEach(button =>
            button.addEventListener('click', toggleRSVP)
        );

        document.querySelectorAll('.delete-btn').forEach(button =>
            button.addEventListener('click', deleteGuest)
        );
    }

    // Toggle RSVP status
    function toggleRSVP(e) {
        const id = parseInt(e.target.dataset.id);
        guests = guests.map(guest => {
            if (guest.id === id) {
                guest.attending = !guest.attending;
            }
            return guest;
        });
        renderGuestList();
    }
    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      guests = guests.filter((g) => g.id !== guest.id);
      renderGuests();
    });

    // Delete guest
    function deleteGuest(e) {
        const id = parseInt(e.target.dataset.id);
        guests = guests.filter(guest => guest.id !== id);
        renderGuestList();
    }

    // Format time (e.g. "04:12 PM")
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});

