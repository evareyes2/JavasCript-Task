import { crearCheckbox, imprimirCards, cards} from'./module/functions.js'  
const checkboxs = document.getElementById('chechkbox')  
const contEventos = document.getElementById('template-cards') 
const search = document.getElementById('formulario')
// //eventos porteriores a la fecha "currentDate": "2022-01-01", 
let fechaBase;
let eventos; 
fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then( data => data.json() )
.then( res => {
    eventos = res.events
    fechaBase = new Date(res.currentDate)
    eventos = eventos.filter(evento => new Date(evento.date)>fechaBase)
    crearCheckbox(eventos, checkboxs)
    imprimirCards(eventos, contEventos)
    search.addEventListener('keyup', filtrar)
    checkboxs.addEventListener('change', filtrar)
})

function filtrar(){
    let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value)
    let filtradosCategoria = eventos.filter( evento => checked.includes( evento.category))
    console.log(filtradosCategoria)
    let filtradosSearch = filtradosCategoria.filter(evento => evento.name.toLowerCase().includes(search.value.toLowerCase()))
    // console.log(filtradosSearch)
    imprimirCards(filtradosSearch, contEventos)
    }