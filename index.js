const balance = document.getElementById('balance');
const income = document.getElementById('income-amt');
const expense = document.getElementById('expense-amt');
const lists = document.getElementById('lists');
const form = document.getElementById('form');
const listName = document.getElementById('list-name');
const listAmt = document.getElementById('list-amt');
const deleteBtn = document.getElementById('delete-btn');


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
    );

let transactions =
 localStorage.getItem('transactions') !== null ?
 localStorageTransactions : [];

//Add transaction to Dom list
 function dispayTransactions(transaction){

    //Change sign according to amount
    const sign = transaction.amount < 0 ? '-' : '+'; 

    const item = document.createElement('li');
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
     ${transaction.text}                   
     <span>${sign}${Math.abs(transaction.amount)}</span>
     <button class="delete-btn" id="delete-btn" onclick='removeTransaction(${transaction.id})'>x</button>      
     `; 
     
     lists.appendChild(item);
    
 }

 //Update Balance, income and expense
 function displayBalance(){
     const amounts = transactions.map(transaction => 
     transaction.amount);     

     let newBalance = amounts.reduce((acc, item) => (acc+=item), 0).toFixed(2);
     balance.innerHTML = `$${newBalance}`;  

     let incomeBal = amounts
                            .filter(item => item > 0) 
                            .reduce((acc, item) => (acc+=item), 0)
                            .toFixed(2);
     
     income.innerHTML = `+ $${incomeBal}`;
     
     let expenseBal = (amounts
                           .filter(item => item < 0) 
                           .reduce((acc, item) => (acc+=item), 0) * -1)
                           .toFixed(2);

     expense.innerHTML = `- $${expenseBal}` ;

 }

 //Add new Transaction 
 function addTransaction(e){
     e.preventDefault();

     if (listName.value.trim() === '' || listAmt.value.trim() === '') {
         alert('Please add a text and amount');
     } else {

     const transaction = {
         id: generateID(),
         text: listName.value,
         amount: +listAmt.value
     };

     transactions.push(transaction);

     dispayTransactions(transaction);

     displayBalance();

     updateLocalStorage();

         listName.value = '';
         listAmt.value = '';
   }          
 }

 function generateID() {
     return Math.floor(Math.random() * 100000000);
 }


 //Remove transaction

 function removeTransaction(id) {
     transactions = transactions.filter(transaction => transaction.id !== id);

     updateLocalStorage();

     init();    
     displayBalance();
    
 }
 

 //Update Local Storage
 function updateLocalStorage() {
     localStorage.setItem('transactions', JSON.stringify(transactions));
 }


//  dispayTransactions(transactions);
 function init(){
     lists.innerHTML = '';
    transactions.forEach(dispayTransactions);
 }

init();
displayBalance();


//Event Listeners
form.addEventListener('submit', addTransaction);
