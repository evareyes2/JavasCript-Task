// import { getData, filterUpcoming, filterPast, porcentajeMasAltoAsistencia, 
//     porcentajeMasBajoAsistencia, mayorCapacidad, upcomingEventsStatistics, pastEventsStatistics } from "./module/funciones.js";
const statsMain = document.getElementById("stats-main");

async function getData() {
    try {
        const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(`Error: ${error}`)
    }
}


function filterUpcoming(events, date) {
    let upcomingFilter = []
    for (let event of events) {
        if (date < event.date) {
            upcomingFilter.push(event)
        }
    }
    return upcomingFilter
}

function filterPast(events, date) {
    let pastEvents = []
    for (let event of events) {
        if (date > event.date) {
            pastEvents.push(event)
        }
    }
    return pastEvents
}

function porcentajeMasAltoAsistencia(events) {
    let highest = 0
    let highestEvent
    for (let event of events) {
        let percentageOfAttendance = (event.assistance * 100) / event.capacity
        if (highest === 0 || percentageOfAttendance > highest) {
            highest = percentageOfAttendance
            highestEvent = event
        }
    }
    return highestEvent
}

function porcentajeMasBajoAsistencia(events) {
    let lowest = 0
    let lowestEvent
    for (let event of events) {
        let percentageOfAttendance = (event.assistance * 100) / event.capacity
        if (lowest === 0 || percentageOfAttendance < lowest) {
            lowest = percentageOfAttendance
            lowestEvent = event
        }
    }
    return lowestEvent
}

function mayorCapacidad(events) {
    let larger = 0
    let largerCapacityEvent
    for (let event of events) {
        if (larger === 0 || event.capacity > larger) {
            larger = event.capacity
            largerCapacityEvent = event
        }
    }
    return largerCapacityEvent
}

function upcomingEventsStatistics(events) {
    let upcomingStatistics = [] // ARRAY TO SAVE 3 LIST OF ELEMENTS
    let upcomingCategories = Array.from(new Set(events.map(event => event.category))) // CATEGORIES OF THE EVENTS


    let upcomingRevenues = [] // REVENUES FROM THE EVENTS
    for (let category of upcomingCategories) {
        let revenueCont = 0
        for (let event of events) {
            if (event.category === category) {
                revenueCont += event.estimate * event.price
            }
        }
        upcomingRevenues.push(revenueCont)
    }


    let upcomingPercentageOfAttendance = [] // PERCENTAGE OF ATTENDANCE
    for (let category of upcomingCategories) {
        let estimateAttendance = 0
        let capacity = 0
        for (let event of events) {
            if (event.category === category) {
                estimateAttendance += event.estimate
                capacity += event.capacity
            }
        }
        upcomingPercentageOfAttendance.push((estimateAttendance * 100) / capacity)
    }


    upcomingStatistics.push(upcomingCategories, upcomingRevenues, upcomingPercentageOfAttendance)
    return upcomingStatistics
}


function pastEventsStatistics(events) {
    let pastStatistics = [] // ARRAY TO SAVE 3 LIST OF ELEMENTS
    let pastCategories = Array.from(new Set(events.map(event => event.category))) // CATEGORIES OF THE EVENTS


    let pastRevenues = [] // REVENUES FROM THE EVENTS
    for (let category of pastCategories) {
        let revenueCont = 0
        for (let event of events) {
            if (event.category === category) {
                revenueCont += event.assistance * event.price
            }
        }
        pastRevenues.push(revenueCont)
    }


    let pastPercentageOfAttendance = [] // PERCENTAGE OF ATTENDANCE
    for (let category of pastCategories) {
        let assistance = 0
        let capacity = 0
        for (let event of events) {
            if (event.category === category) {
                assistance += event.assistance
                capacity += event.capacity
            }
        }
        pastPercentageOfAttendance.push((assistance * 100) / capacity)
    }


    pastStatistics.push(pastCategories, pastRevenues, pastPercentageOfAttendance)
    return pastStatistics
}

(async () => {
    try {
        const response = await getData();
        const upcomingEvents = filterUpcoming(response.events, response.currentDate);
        const pastEvents = filterPast(response.events, response.currentDate);
        const porsentajeAlto = porcentajeMasAltoAsistencia(pastEvents);
        const porsentajeBajo = porcentajeMasBajoAsistencia(pastEvents);
        const mayorCapacity = mayorCapacidad(response.events);
        const upcomingStatistics = upcomingEventsStatistics(upcomingEvents);
        const pastStatistics = pastEventsStatistics(pastEvents);

        // Rellena la tabla de estadísticas de eventos
        const eventStatisticsContainer = document.getElementById("event-statistics");
        eventStatisticsContainer.innerHTML = `
      <tr>
        <td>"${porsentajeAlto.name}" with ${((porsentajeAlto.assistance * 100) / porsentajeAlto.capacity).toFixed(2)}%</td>
        <td>"${porsentajeBajo.name}" with ${((porsentajeBajo.assistance * 100) / porsentajeBajo.capacity).toFixed(2)}%</td>
        <td>"${mayorCapacity.name}" with ${mayorCapacity.capacity} capacity</td>
      </tr>
    `;

        // Rellena la próxima tabla de estadísticas futuras
        const upcomingStatisticsContainer = document.getElementById("upcoming-statistics");
        const upcomingRows = upcomingStatistics[0].map((category, i) => `
      <tr>
        <td>${category}</td>
        <td>$${upcomingStatistics[1][i]}</td>
        <td>${upcomingStatistics[2][i].toFixed(2)}%</td>
      </tr>
    `).join("");
        upcomingStatisticsContainer.innerHTML = upcomingRows;

        // Rellena la tabla de estadísticas pasadas
        const pastStatisticsContainer = document.getElementById("past-statistics");
        const pastRows = pastStatistics[0].map((category, i) => `
      <tr>
        <td>${category}</td>
        <td>$${pastStatistics[1][i]}</td>
        <td>${pastStatistics[2][i].toFixed(2)}%</td>
      </tr>
    `).join("");
        pastStatisticsContainer.innerHTML = pastRows;
    } catch (error) {
        console.log(error);
        statsMain.innerHTML = `<p class="text-center">An unexpected error has occurred</p>`;
    }
})();