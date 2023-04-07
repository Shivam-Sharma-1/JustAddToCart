import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://justaddtocart-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")

addButton.addEventListener("click", () => {
    const inputValue = inputField.value

    push(shoppingListInDB, inputValue)
})