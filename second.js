//eventos porteriores a la fecha "currentDate": "2022-01-01", 
let fechaBase = new Date(data.currentDate)
let events = data.events;
let template = "";

for (let i = 0; i < events.length; i++) {
    if (fechaBase < new Date(events[i].date)){
    template += "<div class=card>  <img src=" + 
    events[i].image + "class=card-img-top style= height:18rem> <div class=card-body> <h5 class=card-title> " + 
    events[i].name + "</h5><p class=card-text>" + 
    events[i].description + 
    "</p><a href=./details.html class=btn btn-primary style=color:blue>View more!</a></div></div>";
}
} 

console.log(template);
document.getElementById("xxx").innerHTML = template;