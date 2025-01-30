document.addEventListener('DOMContentLoaded', () => {
    const setHoursButton = document.getElementById('setHoursButton');
    const resetHoursButton = document.getElementById('resetHoursButton');
    const workStartInput = document.getElementById('workStart');
    const workEndInput = document.getElementById('workEnd');
    const addEventButton = document.getElementById('addEventButton');
    const eventTitleInput = document.getElementById('eventTitle');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const eventsList = document.getElementById('eventsList');

    let workingHours = JSON.parse(localStorage.getItem('workingHours')) || {};
    let events = JSON.parse(localStorage.getItem('events')) || [];

    function updateWorkingHoursDisplay() {
        if (workingHours.start && workingHours.end) {
            setHoursButton.textContent = `Working Hours: ${workingHours.start} - ${workingHours.end}`;
        } else {
            setHoursButton.textContent = 'Set Working Hours';
        }
    }

    function updateEventsDisplay() {
        eventsList.innerHTML = '';
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.textContent = `${event.title} - ${event.start} to ${event.end}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-delete');
            deleteButton.addEventListener('click', () => deleteEvent(index));
            
            li.appendChild(deleteButton);
            eventsList.appendChild(li);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('workingHours', JSON.stringify(workingHours));
        localStorage.setItem('events', JSON.stringify(events));
    }

    function isWithinWorkingHours(start, end) {
        return start >= workingHours.start && end <= workingHours.end;
    }

    function hasOverlap(newStart, newEnd) {
        return events.some(event => 
            (newStart < event.end && newEnd > event.start)
        );
    }

    function deleteEvent(index) {
        events.splice(index, 1);
        saveToLocalStorage();
        updateEventsDisplay();
    }

    setHoursButton.addEventListener('click', () => {
        const start = workStartInput.value;
        const end = workEndInput.value;

        if (!start || !end) {
            alert('Please set both start and end working hours');
            return;
        }

        if (start >= end) {
            alert('End time must be after start time');
            return;
        }

        workingHours = { start, end };
        saveToLocalStorage();
        updateWorkingHoursDisplay();
    });

    resetHoursButton.addEventListener('click', () => {
        localStorage.removeItem('workingHours');
        workingHours = {};
        workStartInput.value = '';
        workEndInput.value = '';
        updateWorkingHoursDisplay();
    });

    addEventButton.addEventListener('click', () => {
        const title = eventTitleInput.value;
        const start = startTimeInput.value;
        const end = endTimeInput.value;

        if (!title || !start || !end) {
            alert('Please fill in all fields');
            return;
        }

        if (start >= end) {
            alert('Event end time must be after start time');
            return;
        }

        if (!workingHours.start || !workingHours.end) {
            alert('Please set working hours before adding events');
            return;
        }

        if (!isWithinWorkingHours(start, end)) {
            alert('Event must be within working hours');
            return;
        }

        if (hasOverlap(start, end)) {
            alert('This event overlaps with an existing event');
            return;
        }

        events.push({ title, start, end });
        saveToLocalStorage();
        updateEventsDisplay();

        eventTitleInput.value = '';
        startTimeInput.value = '';
        endTimeInput.value = '';
    });

    // Initial setup
    updateWorkingHoursDisplay();
    updateEventsDisplay();
});
