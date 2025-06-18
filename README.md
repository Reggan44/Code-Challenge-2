#  Guest List Manager Web App

A simple and interactive event guest list manager built using HTML, CSS, and JavaScript.

---

##  About

The **Guest List Manager** is a dynamic web application designed to help users manage their event attendees. It allows you to add, categorize, and monitor guests, mark their attendance status, and manage the list with real-time updates — all without a backend!

---

## Objective

The main goal of this project is to:
- Practice DOM manipulation using vanilla JavaScript.
- Create a responsive and user-friendly interface for managing data.
- Implement CRUD (Create, Read, Update, Delete) functionality in the browser.
- Learn basic testing strategies for front-end apps.

---

##  Features

- **Add Guests**: Input name and category, then click to add to the list.
- **Toggle RSVP**: Mark a guest as "Attending" or "Not Attending."
- **Remove Guests**: Instantly delete any guest from the list.
- **Edit Guest Name**: Change a guest’s name using a prompt.
- **Limit Guests**: Max guest limit set to 10; user is alerted if exceeded.
-  **Timestamp**: Shows when each guest was added.
- **Live Count**: See how many guests are currently added.

---

## How to Use the App

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Reggan44/Code-Challenge-2.git
   cd Code-Challenge-2
Open the project
Simply open index.html in your browser.

Add a guest

Enter a full name in the input field.

Choose a category (friend, family, colleague, etc.).

Click “Add Guest”.

Manage the guest

Use "RSVP" to toggle attendance.

Use "Edit" to update the name.

Use "Remove" to delete the guest from the list.

 Testing Strategies
This project focuses on manual and visual testing, appropriate for DOM-heavy vanilla JavaScript apps:

 Manual Testing
Test form inputs with valid and invalid data.

Attempt to add more than 10 guests to verify limit.

Click each action button (RSVP, Edit, Remove) and confirm the result.

Refresh the page to confirm temporary in-memory data (no persistence).

 Visual Inspection
Confirm the layout adapts to different screen sizes.

Ensure accessibility features like aria-* and label are working properly.

 Future Testing Improvements
Add unit tests using Jest for functions like toggleRSVP, deleteGuest, and renderGuestList.

Integrate UI tests using tools like Cypress or Playwright.

Folder Structure
css
Copy
Edit
Code-Challenge-2/
├── index.html          # Main HTML file
├── style.css           # Styling file
└── src/
    └── index.js        # JavaScript functionality
Author
Reggan Nzuki
GitHub

License
This project is licensed under the MIT License. Feel free to fork and modify it for personal or educational use.

yaml
Copy
Edit

---

Let me know if you’d like a version that includes screenshots or badge icons (e.g., GitHub stars, license, built-with). I can also convert this into a Markdown file and help push it to your GitHub repo.


## You can view this website atthis link     
https://reggan44.github.io/Code-Challenge-2/




