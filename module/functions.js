export function crearCheckbox(eventos, container){
    let fn = eventos => eventos.category
    let newCategory = new Set(eventos.filter(fn).map(fn))
    // console.log(newCategory)
    newCategory.forEach(categoria => {
        container.innerHTML += `
        <label class="form-check-label">
        <input class="form-check-input" value="${categoria}" type="checkbox" name="inlineRadioOptions" id="">${categoria}
        </label>
    
        `
    })
} 

export function cards(eventos){

    let div = document.createElement('div')
    div.classList = `card`
    div.innerHTML = `
    <img src=${eventos.image} class="card-img-top" style="height:18rem"> 
<div class="card-body">
<h5 class="card-title">${eventos.name}</h5>
<p class="card-text">${eventos.description}</p>
<a id="btn" href="./details.html?id=${eventos._id}" &name=${eventos.name}>View more!</a>
</div>
</div>
    ` 
    return div
}

export function imprimirCards(eventos, contenedor){
contenedor.innerHTML = ``
if(eventos.length > 0){
let fragment = document.createDocumentFragment()
eventos.forEach(eventos => fragment.appendChild(cards(eventos)))
contenedor.appendChild(fragment)
}else{
contenedor.innerHTML = '<h2> Event not found </h2>'
}
}

// export function filtrar(){
// let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value)
// let filtradosCategoria = eventos.filter( evento => checked.includes( evento.category))
// console.log(filtradosCategoria)
// let filtradosSearch = filtradosCategoria.filter(evento => evento.name.toLowerCase().includes(search.value.toLowerCase()))
// // console.log(filtradosSearch)
// imprimirCards(filtradosSearch, contEventos)
// }

// export function cardDetails (eventCard,container){
//     container.innerHTML = `
//     <div class="card border-secondary col-10">
//     <img class="img-fluid rounded-start" src="${eventCard.image} alt="">
//     <div class="card-body">
//       <h3 class="card-title">${eventCard.name}</h3>
//       <p class="card-text">${eventCard.description}</p>
//       <p class="card-text">Date:${eventCard.date}</p>
//       <p class="card-text">Capacity:${eventCard.capacity}</p>
//       <p class="card-text">Place:${eventCard.place}</p>
//       <p class="card-text">Price:${eventCard.price}</p>
//     </div>
//     </div> 
//     `}

// export async function getData() {
//     try {
//         const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
//         const data = await response.json()
//         return data
//     }
//     catch (error) {
//         console.log(`Error: ${error}`)
//     }
// }


// export function filterUpcoming(events, date) {
//     let upcomingFilter = []
//     for (let event of events) {
//         if (date < event.date) {
//             upcomingFilter.push(event)
//         }
//     }
//     return upcomingFilter
// }

// export function filterPast(events, date) {
//     let pastEvents = []
//     for (let event of events) {
//         if (date > event.date) {
//             pastEvents.push(event)
//         }
//     }
//     return pastEvents
// }

// export function porcentajeMasAltoAsistencia(events) {
//     let highest = 0
//     let highestEvent
//     for (let event of events) {
//         let percentageOfAttendance = (event.assistance * 100) / event.capacity
//         if (highest === 0 || percentageOfAttendance > highest) {
//             highest = percentageOfAttendance
//             highestEvent = event
//         }
//     }
//     return highestEvent
// }

// export function porcentajeMasBajoAsistencia(events) {
//     let lowest = 0
//     let lowestEvent
//     for (let event of events) {
//         let percentageOfAttendance = (event.assistance * 100) / event.capacity
//         if (lowest === 0 || percentageOfAttendance < lowest) {
//             lowest = percentageOfAttendance
//             lowestEvent = event
//         }
//     }
//     return lowestEvent
// }

// export function mayorCapacidad(events) {
//     let larger = 0
//     let largerCapacityEvent
//     for (let event of events) {
//         if (larger === 0 || event.capacity > larger) {
//             larger = event.capacity
//             largerCapacityEvent = event
//         }
//     }
//     return largerCapacityEvent
// }

// export function upcomingEventsStatistics(events) {
//     let upcomingStatistics = [] // ARRAY TO SAVE 3 LIST OF ELEMENTS
//     let upcomingCategories = Array.from(new Set(events.map(event => event.category))) // CATEGORIES OF THE EVENTS


//     let upcomingRevenues = [] // REVENUES FROM THE EVENTS
//     for (let category of upcomingCategories) {
//         let revenueCont = 0
//         for (let event of events) {
//             if (event.category === category) {
//                 revenueCont += event.estimate * event.price
//             }
//         }
//         upcomingRevenues.push(revenueCont)
//     }


//     let upcomingPercentageOfAttendance = [] // PERCENTAGE OF ATTENDANCE
//     for (let category of upcomingCategories) {
//         let estimateAttendance = 0
//         let capacity = 0
//         for (let event of events) {
//             if (event.category === category) {
//                 estimateAttendance += event.estimate
//                 capacity += event.capacity
//             }
//         }
//         upcomingPercentageOfAttendance.push((estimateAttendance * 100) / capacity)
//     }


//     upcomingStatistics.push(upcomingCategories, upcomingRevenues, upcomingPercentageOfAttendance)
//     return upcomingStatistics
// }


// export function pastEventsStatistics(events) {
//     let pastStatistics = [] // ARRAY TO SAVE 3 LIST OF ELEMENTS
//     let pastCategories = Array.from(new Set(events.map(event => event.category))) // CATEGORIES OF THE EVENTS


//     let pastRevenues = [] // REVENUES FROM THE EVENTS
//     for (let category of pastCategories) {
//         let revenueCont = 0
//         for (let event of events) {
//             if (event.category === category) {
//                 revenueCont += event.assistance * event.price
//             }
//         }
//         pastRevenues.push(revenueCont)
//     }


//     let pastPercentageOfAttendance = [] // PERCENTAGE OF ATTENDANCE
//     for (let category of pastCategories) {
//         let assistance = 0
//         let capacity = 0
//         for (let event of events) {
//             if (event.category === category) {
//                 assistance += event.assistance
//                 capacity += event.capacity
//             }
//         }
//         pastPercentageOfAttendance.push((assistance * 100) / capacity)
//     }


//     pastStatistics.push(pastCategories, pastRevenues, pastPercentageOfAttendance)
//     return pastStatistics
// }
