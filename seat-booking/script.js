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
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});