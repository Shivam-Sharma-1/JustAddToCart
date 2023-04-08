import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://justaddtocart-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", () => {
    const inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})

onValue(shoppingListInDB, (snapshot) => {
    if(snapshot.exists()) {
        clearShoppingListEl()   
        const itemsArray = Object.entries(snapshot.val())
        itemsArray.forEach((item) => {
            const currentItemID = item[0]
            const currentItemValue = item[1]
    
            appendItemToShoppingListEl(item)
        })
    } else {
        shoppingListEl.innerHTML = "No items in the cart..."
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item) {
    const itemID = item[0]
    const itemValue = item[1]

    const newItem = document.createElement('li')
    newItem.textContent = itemValue

    newItem.addEventListener('dblclick', () => {
        const itemLocation = ref(database, `shoppingList/${itemID}`)
        remove(itemLocation)
    })

    shoppingListEl.append(newItem)
}