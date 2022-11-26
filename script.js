//VARIABLAR

const donutContainer = document.querySelector('.donutContainer');
const shopCartContainer = document.querySelector('.cart');
const totalContainer = document.querySelector('.totalContainer');

//shoppingCart open/close
const shopCartSection = document.querySelector('.shopCartSection');
const shoppingCart = document.querySelector('#shoppingCart');//


//lista med våra munkobjekt
const donuts = [
  {
    name: 'Pink Dream',
    price: 25,
    amount: 0,
    sum: 0,
    img: 'img/pink.jpg'
  },
  {
    name: 'Green Envy',
    price: 30,
    amount: 0,
    sum: 0,
    img: 'img/green.jpg'
  },
  {
    name: 'Blue Feeling',
    price: 30,
    amount: 0,
    sum: 0,
    img: 'img/blue.jpg'
  },
  {
    name: 'Sparkle Star',
    price: 30,
    amount: 0,
    sum: 0,
    img: 'img/lucia_donut.jpg'
  }
];





/****************************************************************************/

//skriva ut Donuts HTML
function printDonuts() {
  donutContainer.innerHTML = '';

  for (let i = 0; i < donuts.length; i++) {
    const donut = donuts[i];
    
    donutContainer.innerHTML += `
      <div class="donut">
        <div class="donutImages">
          <img class="img" data-id="${i}" img src="${donut.img}" width="200" height="200"></img>
        </div>
        <div class="donutText">
          <div class="name" data-id="${i}">${donut.name}</div>
          <div class="price" data-id="${i}">Pris: ${donut.price}:-</div>
          <div class="amount" data-id="${i}">Antal: ${donut.amount}</div>
          <div class="sum" data-id="${i}">Totalt: ${donut.sum}:-</div>
        </div>
        <div class="donutBtn">
          <button class="sub" data-id="${i}">-</button>
          <button class="add" data-id="${i}">+</button>
        </div>
          <button class="addToCart" data-id="${i}">Lägg i varukorg</button>
      </div>
      `; ////<button class="add" data-id="${i}">+</button> få id på varje knapp
  }

  applyEventlisteners();
  //totalt antal munkar klickade
  
}

//plus-minus-knappar + add to varukorg
  function applyEventlisteners() {

  //add
  document.querySelectorAll('.add').forEach((btn) =>
  btn.addEventListener('click', addAmountDonut));

  //subtract
  document.querySelectorAll('.sub').forEach((btn) =>
  btn.addEventListener('click', subAmountDonut));

  //addToCart
  //document.querySelectorAll('.addToCart').forEach((btn) =>
    //btn.addEventListener('click', addToCart));

    const totalDonutAmount = donuts.reduce (
      (previousValue, donuts) => {
      return donuts.amount + previousValue;
      }, 0); 
     
      document.querySelector('.totalAmount').innerHTML = totalDonutAmount;
      document.querySelector('#cartSum').innerHTML = totalDonutAmount;
  
    //total summa kr munkar klickade
    const totalDonutSum = donuts.reduce (
      (previousValue, donut) => {
      return (donut.sum) + previousValue;
      },0);
    
      document.querySelector('.totalSum').innerHTML = totalDonutSum;
  
  }

  //funktion add klick
  function addAmountDonut(e) {
    const addBtn = e.currentTarget.dataset.id;

    donuts[addBtn].amount += 1;

    donuts[addBtn].sum = donuts[addBtn].amount * donuts[addBtn].price; //för att få ut totalsumma n+ öka totalen, pris* antal
  
    printDonuts();
    printorderedDonuts();
  }

  //funktion sub klick
  function subAmountDonut(e) {
    const subBtn = e.currentTarget.dataset.id;

    if (donuts[subBtn].amount - 1 < 0) { //om 0; går ej att minska mer
      return;
    } else {
      donuts[subBtn].amount = donuts[subBtn].amount -  1;
    }
    
    donuts[subBtn].sum = donuts[subBtn].amount * donuts[subBtn].price;

    printDonuts();
    printorderedDonuts();
  }

  // ShoppingCart open/close eventlisteners
  shoppingCart.addEventListener('click', toggleShoppingCartOpenState); 

  function toggleShoppingCartOpenState() {
    shopCartSection.classList.toggle('open');  
  }

//skicka donuts till varukorgslistan
  /*function printToCart() {
    const index = e.target.dataset.id;
    const i = shopCartList.findIndex(element => element.name === donuts[index].name);

    if (donuts[index].amount > 0) {
      if(index === -1) {
        shopCartList.push({
          img: donuts[index].img,
          name: donuts[index].name,
          price: donuts[index].price,
          amount: donuts[index].amount,
          sum: donuts[index].sum
        });
      } else {
        shopCartList[i].amount += donuts[index].amount;
        shopCartList[i].sum = shopCartList[i].amount *shopCartList[i].price; 
      }
    }

    clearDonutAmount(index);
    printDonuts();
  }*/

// Clear donut amount after sending to cart
/*function clearDonutAmount(index) {
  donuts[index].amount = 0;
  donuts[index].sum = 0;
}*/

// varukorg - artiklar
function printorderedDonuts() {
  document.querySelector('.cart').innerHTML = '';

  for (let i = 0; i < donuts.length; i++)
    if (donuts[i].amount > 0) {
      shopCartContainer.innerHTML += `
        <div id="shopCartContent">
          <div><img class="imgInCart" src="${donuts[i].img}" alt="${donuts[i].anyAlt}"  width="55" height="55"></img>
          <span class="text"><h4>${donuts[i].name}</h4><br>
          <p>${donuts[i].amount}st</p>
          <p>${donuts[i].price}kr/st</p>
          <p>${donuts[i].sum}kr</p></span>
          <button class="material-symbols-outlined" data-id="${i}">
          delete_forever</button>
        </div>`;
    } 
/*
    const removeItems = Array.from(document.querySelectorAll('.material-symbols-outlined'));
    removeItems.forEach((item) => {
    item.addEventListener('click', removeDonuts);*/   

    function removeDonuts(e) {
      const index = e.currentTarget.dataset.id;

      if (index > -1) {
        donuts.splice(index, 1);
      } 
      printorderedDonuts();
    }
    document.querySelectorAll('button.material-symbols-outlined').forEach((btn) =>
    btn.addEventListener('click', removeDonuts)); 
    return;
}




printDonuts()
printorderedDonuts();
