// When everything's ready, let's set up our guest list
document.addEventListener('DOMContentLoaded', function() {
  
  // Grab all the elements we'll need
  const guestForm = document.getElementById('guest-form');
  const nameInput = document.getElementById('guest-name');
  const relationshipSelect = document.getElementById('guest-category');
  const guestDisplay = document.getElementById('guest-list');
  const guestCounter = document.getElementById('guest-count-label');

  // Our growing guest list
  let guests = [];
  const MAX_GUESTS = 10; // A reasonable number for most events

  // When someone adds a guest
  guestForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Keep our page from refreshing
    
    const guestName = nameInput.value.trim();
    const relationship = relationshipSelect.value;

    // Simple validation - like checking invitations before sending
    if (!guestName) {
      showNotice("Please enter your guest's name");
      nameInput.focus();
      return;
    }

    // Check if we have space
    if (guests.length >= MAX_GUESTS) {
      showNotice(`We've reached our maximum of ${MAX_GUESTS} guests. 
                 You might need to adjust your list.`);
      return;
    }

    // Create our guest record
    const newGuest = {
      id: Date.now(), // Simple unique identifier
      name: guestName,
      relationship: relationship,
      confirmed: true, // Optimistically assume they'll come
      invitedOn: new Date() // Track when they were added
    };

    // Add to our list and refresh the display
    guests.push(newGuest);
    refreshGuestDisplay();
    
    // Show confirmation
    showNotice(`${guestName} added to your guest list`, 'success');
    
    // Reset for the next entry
    nameInput.value = '';
    nameInput.focus();
  });

  // Refresh the guest list display
  function refreshGuestDisplay() {
    // Clear existing display
    guestDisplay.innerHTML = '';
    
    // Update counter
    guestCounter.textContent = `${guests.length} of ${MAX_GUESTS} invited`;
    
    // Show special message if list is empty
    if (guests.length === 0) {
      guestDisplay.innerHTML = `
        <li class="empty-notice">
          <p>Your guest list is empty</p>
          <p>Start by adding your first guest</p>
        </li>`;
      return;
    }

    // Create an entry for each guest
    guests.forEach(function(guest) {
      const guestEntry = document.createElement('li');
      guestEntry.className = `guest-entry ${guest.relationship}`;
      
      guestEntry.innerHTML = `
        <div class="guest-details">
          <h3>${guest.name}</h3>
          <p class="relationship">${formatRelationship(guest.relationship)}</p>
          <p class="invite-date">Invited on ${formatDate(guest.invitedOn)}</p>
        </div>
        <div class="guest-actions">
          <button class="confirmation-toggle ${guest.confirmed ? 'confirmed' : 'declined'}" 
                  data-id="${guest.id}">
            ${guest.confirmed ? 'Confirmed' : 'Declined'}
          </button>
          <button class="remove-guest" data-id="${guest.id}">
            Remove
          </button>
        </div>
      `;

      guestDisplay.appendChild(guestEntry);
    });

    // Set up interaction handlers
    setupGuestInteractions();
  }

  // Set up all interactive elements
  function setupGuestInteractions() {
    // Handle confirmation toggles
    document.querySelectorAll('.confirmation-toggle').forEach(function(button) {
      button.addEventListener('click', function() {
        const guestId = parseInt(this.dataset.id);
        toggleConfirmation(guestId);
      });
    });

    // Handle guest removal
    document.querySelectorAll('.remove-guest').forEach(function(button) {
      button.addEventListener('click', function() {
        const guestId = parseInt(this.dataset.id);
        removeGuest(guestId);
      });
    });
  }

  // Toggle guest confirmation status
  function toggleConfirmation(guestId) {
    guests = guests.map(function(guest) {
      if (guest.id === guestId) {
        const newStatus = !guest.confirmed;
        showNotice(
          `${guest.name} ${newStatus ? 'is confirmed' : 'can no longer attend'}`,
          newStatus ? 'success' : 'notice'
        );
        return { ...guest, confirmed: newStatus };
      }
      return guest;
    });
    refreshGuestDisplay();
  }

  // Remove a guest from the list
  function removeGuest(guestId) {
    const guest = guests.find(function(g) { return g.id === guestId; });
    if (confirm(`Remove ${guest.name} from your guest list?`)) {
      guests = guests.filter(function(g) { return g.id !== guestId; });
      refreshGuestDisplay();
      showNotice(`${guest.name} removed from your list`, 'notice');
    }
  }

  // Format relationship for display
  function formatRelationship(relationship) {
    const relationships = {
      friend: 'Friend',
      family: 'Family Member',
      colleague: 'Colleague',
      other: 'Guest'
    };
    return relationships[relationship] || 'Guest';
  }

  // Format date simply
  function formatDate(date) {
    return date.toLocaleDateString();
  }

  // Show notices to the user
  function showNotice(message, type = 'alert') {
    const notice = document.createElement('div');
    notice.className = `user-notice ${type}`;
    notice.textContent = message;
    
    document.body.appendChild(notice);
    
    // Remove after a few seconds
    setTimeout(function() {
      notice.classList.add('fading-out');
      setTimeout(function() { notice.remove(); }, 300);
    }, 3000);
  }
});