
//  UI Variables
const form = document.querySelector("#car-form");
const carList = document.querySelector('ul.collection');
const clearButton = document.querySelector('.clear-cars');
const filterInput = document.querySelector('#filter');
const carInput = document.querySelector('#car');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getcars);
  form.addEventListener('submit', addcar);
  carList.addEventListener('click', removecar);
  clearButton.addEventListener('click', clearcars);
  filterInput.addEventListener('keyup', filtercars);
}

function getcars() {

  let cars;


  if (localStorage.getItem('cars') === null) {
    cars = [];    
  } else {
    cars = JSON.parse(localStorage.getItem('cars'));
  }
  
  cars.forEach(function(carName) {
    const li = document.createElement('li');
    li.className = 'collection-item ';
    li.appendChild(document.createTextNode(carName));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    li.appendChild(link);
    carList.appendChild(li);
  });

}

function filtercars(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(car) {
    const itemText = car.firstChild.textContent;
    if (itemText.toLowerCase().indexOf(filterText) != -1) {
      car.style.display = 'block';
    } else {
      car.style.display = 'none';
    }
  });

}

function clearcars(e) {

  while (carList.firstChild) {
    carList.removeChild(carList.firstChild);
  }

  clearcarsFromLocalStorage();
}

function clearcarsFromLocalStorage() {
  localStorage.clear();
}

function removecar(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        e.target.parentElement.parentElement.remove();

        removecarFromLocalStorage(e.target.parentElement.parentElement);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })


    
  }
}

function removecarFromLocalStorage(carItem) {
  let cars;
  if (localStorage.getItem('cars') === null) {
    cars = [];    
  } else {
    cars = JSON.parse(localStorage.getItem('cars'));
  }

  cars.forEach(function(carName, index) {
    if (carItem.textContent === carName)  {
      cars.splice(index, 1);
    }
  });

  localStorage.setItem('cars', JSON.stringify(cars));

}

function addcar(e) {
  if(carInput.value === '') {
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Enter a company Name :',
    })
  }
else{


  const li = document.createElement('li');
  li.className = 'collection-item ';
  li.appendChild(document.createTextNode(carInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  li.appendChild(link);
  carList.appendChild(li);

  storecarInLocalStorage(carInput.value);
  carInput.value = '';
}
  e.preventDefault();

  
}
function storecarInLocalStorage(carName) {
  let cars;
  if (localStorage.getItem('cars') === null) {
    cars = [];    
  } else {
    cars = JSON.parse(localStorage.getItem('cars'));
  }

  cars.push(carName);
  localStorage.setItem('cars', JSON.stringify(cars));
}
