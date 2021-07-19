const container = document.querySelectorAll('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;



//save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectMovieIndex', movieIndex);
  localStorage.setItem('selectMoviePrice', moviePrice);
}

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//get data from localStorage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectMoiveIndex = localStorage.getItem('selectMovieIndex');
  if (selectMoiveIndex !== null) {
    movieSelect.selectedIndex = selectMoiveIndex;
  }

  const selectMoivePrice = localStorage.getItem('selectMoviePrice');
  console.log(typeof selectMoviePrice)
  if (selectMoivePrice !== null) {
    ticketPrice = selectMoivePrice;
  }

  updateSelectedCount();
}



//Seat click event
container[1].addEventListener('click', e => {
  if (!e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelectedCount();
  }
});

//Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, +e.target.value);
  updateSelectedCount();
});

populateUI();
