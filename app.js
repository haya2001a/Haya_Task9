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
  
    // swal({
    //   title: "Are you sure?",
    //   text: "You will not be able to recover this imaginary file!",
    //   type: "warning",
    //   showCancelButton: true,
    //   confirmButtonClass: 'btn-danger',
    //   confirmButtonText: 'Yes, delete it!',
    //   closeOnConfirm: false,
    //   closeOnCancel: false
    // },
    // function (isConfirm) {
    //   if (isConfirm) {
        
    //     swal("Deleted!", "Your imaginary file has been deleted!", "success");
    //   } else {
    //     swal("Cancelled", "Your imaginary file is safe :)", "error");
    //   }
    // }); 
    
    swal({
      title:'Are You Sure ? ? ',
      text:'The file will be deleted ',
      type:'warning',
      showCancelButton:true,
      confirmButtonText:'yes , delete it ',
      cancelButtonText:'No keep it ',
    }).then((result)=>{
      if(result.value){
        swal('deleted!','your file has been deleted','success')
        e.target.parentElement.parentElement.remove();
      removecarFromLocalStorage(e.target.parentElement.parentElement);

      }else if (result.dismiss===swal.DismissReason.cancel){
        swal('canceled','ur file deleted','error')
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
    swal('oops...','U have to enter a Company name !','error');  
  e.preventDefault();    
}
else{
  const li = document.createElement('li');
  li.className = 'collection-item list-group-item';
  li.appendChild(document.createTextNode(carInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-trash"></i>';
  li.appendChild(link);
  carList.appendChild(li);

  storecarInLocalStorage(carInput.value);
  carInput.value = '';
  e.preventDefault();  
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
