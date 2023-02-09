let checkboxes = document.querySelectorAll('input[type=checkbox]')
console.log(checkboxes[0])
let checked = ["Costume Party", "Music Concert", "Soccer field", "Race", "Book Exchange", "Cinema", "Museum", "Food Fair"]
for (let checkbox of checkboxes ){
    checkbox.addEventListener("click", (evento)=>{
        if (evento.target.checked){
            container.innerHTML = ""
            checked.push(evento.target.value)
            console.log(filtrarCategoria(data.events))
            let listaFiltrada = filtrarCategoria(data.events)
            agregarCard(listaFiltrada, container)
        }else {
            checked.indexOf(evento.target.value)
        if (checked.includes(evento.target.value)){
            container.innerHTML = ""
            let indice = checked.indexOf(evento.target.value)
            delete checked[indice]
            console.log(filtrarCategoria(data.events))
            let listaFiltrada = filtrarCategoria(data.events)
            agregarCard(listaFiltrada, container)
        } }
        console.log(checked)
    }
)}

function filtrarCategoria (events){
    let filtrados = []
    for (let event of events){
        if (checked.includes(event.category)){
            filtrados.push(event)
        }
    }
    return filtrados
} 
let container = document.getElementById("template-cards");
let listaFiltrada = filtrarCategoria(data.events); 

function creardCard (tarjeta){
    return "<div class=card>  <img src=" + 
    tarjeta.image + "class=card-img-top style= height:18rem> <div class=card-body> <h5 class=card-title> " + 
    tarjeta.name + "</h5><p class=card-text>" + 
    tarjeta.description + 
    "</p><a href=./details.html id=btn>View more!</a></div></div>";
}

var events = data.events
function agregarCard (lista, container){
    let template = ""
    for (let tarjeta of lista){
        template += creardCard(tarjeta)
    } 
    container.innerHTML += template
}

agregarCard(events, container);