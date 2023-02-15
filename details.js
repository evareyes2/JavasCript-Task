const container = document.getElementById("cardDetails")
let eventos;
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then( data => data.json() )
    .then( res => {
        eventos = res.events
        const params = new URLSearchParams(location.search)
        // console.log(params.get('id'))
        const id = params.get('id')
        const eventCard = eventos.find(event => event._id == id)
        cardDetails(eventCard,container)
    })
    .catch(err => console.log(err))

    function cardDetails (eventCard,container){
      container.innerHTML = `
      <div class="card border-secondary col-10">
      <img class="img-fluid rounded-start" src="${eventCard.image} alt="">
      <div class="card-body">
        <h3 class="card-title">${eventCard.name}</h3>
        <p class="card-text">${eventCard.description}</p>
        <p class="card-text">Date:${eventCard.date}</p>
        <p class="card-text">Capacity:${eventCard.capacity}</p>
        <p class="card-text">Place:${eventCard.place}</p>
        <p class="card-text">Price:${eventCard.price}</p>
      </div>
      </div> 
      `}
