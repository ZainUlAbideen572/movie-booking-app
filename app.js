const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.Occupied)');
const countElement = document.getElementById('count');
const total = document.getElementById('total');
const movieselect = document.getElementById('movie');
populate()
function updateCount() {
    const selectedSeats = document.querySelectorAll('.seat.Selected');
    const selectedCount = selectedSeats.length;
    console.log(selectedSeats)
    console.log(seats)
    countElement.innerText = selectedCount;

    const ticketPrice = parseInt(movieselect.value, 10);
    total.innerText = selectedCount * ticketPrice;
    // const selectedSeats = document.querySelectorAll('.seat.Selected');
    const seatIndices = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    console.log("Seat Indices:", seatIndices);
    localStorage.setItem('Tickets-Bookead', JSON.stringify(seatIndices))

}
function populate() {
    const selectedSeats = JSON.parse(localStorage.getItem('Tickets-Bookead'))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('Selected')
            }
        })
    }
    // setMoviedata()
//    console.log(selectedSeats.Movieindex===movieselect.selectedIndex)

}

function setMoviedata(Movieindex, Movieprice) {
    localStorage.setItem('index', Movieindex)
    localStorage.setItem('price', Movieprice)
}

movieselect.addEventListener('change', (e) => {
    setMoviedata(e.target.selectedIndex, e.target.value)
    updateCount();
});

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('Occupied')) {
        e.target.classList.toggle('Selected');
        updateCount();
        // updatedSelectedcount()
    }
});
updateCount()