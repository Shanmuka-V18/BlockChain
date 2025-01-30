let events = [];

const setWorkingHoursButton = document.getElementById('setHoursButton');
const resetWorkingHoursButton = document.getElementById('resetHoursButton');
const addEventButton = document.getElementById('addEventButton');
const eventSearch = document.getElementById('eventSearch');
const eventsList = document.getElementById('eventsList');
const darkModeToggle = document.getElementById('darkModeToggle');

setWorkingHoursButton.addEventListener('click', setWorkingHours);
resetWorkingHoursButton.addEventListener('click', resetWorkingHours);
addEventButton.addEventListener('click', addEvent);
darkModeToggle.addEventListener('click', toggleDarkMode);


function setWorkingHours() {
    const workStart = document.getElementById('workStart').value;
    const workEnd = document.getElementById('workEnd').value;
    console.log(`Working hours set from ${workStart} to ${workEnd}`);
}

function resetWorkingHours() {
    document.getElementById('workStart').value = '';
    document.getElementById('workEnd').value = '';
}


function addEvent() {
    const eventTitle = document.getElementById('eventTitle').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const category = document.getElementById('eventCategory').value;
    const recurring = document.getElementById('recurring').checked;

    if (!eventTitle || !startTime || !endTime) {
        alert('Please fill out all fields');
        return;
    }

    const event = {
        title: eventTitle,
        startTime,
        endTime,
        category,
        recurring
    };

    events.push(event);
    displayEvents();
    clearForm();
}


function displayEvents() {
    eventsList.innerHTML = '';

    events.forEach((event, index) => {
        const eventItem = document.createElement('li');
        eventItem.classList.add(event.category);
        eventItem.innerHTML = `
            <div>
                <strong>${event.title}</strong>
                <p>${event.startTime} - ${event.endTime}</p>
                ${event.recurring ? '<span>(Recurring)</span>' : ''}
            </div>
            <button class="delete-btn" onclick="deleteEvent(${index})">Delete</button>
        `;
        eventsList.appendChild(eventItem);
    });
}


function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents();
}


function clearForm() {
    document.getElementById('eventTitle').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('recurring').checked = false;
}


function searchEvents() {
    const searchQuery = eventSearch.value.toLowerCase();
    const eventItems = eventsList.getElementsByTagName('li');

    Array.from(eventItems).forEach(item => {
        const eventTitle = item.querySelector('strong').textContent.toLowerCase();
        if (eventTitle.indexOf(searchQuery) === -1) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    });
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
