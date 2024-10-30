export let bookData = [];

import { getBookFromStorage } from "./storage.js";
import { showAddResult, showSearchResult } from "./ui.js";
import { addSeedForTesting } from "./storage.js";
import { RENDER_EVENT } from "./ui.js";

const addButton = document.querySelector('.add-button');
const searchButton = document.querySelector('.search-button');
const showButton = document.querySelector('.show-button');

document.addEventListener('DOMContentLoaded', function () {
    // add seed data for testing
    // addSeedForTesting();

    addButton.addEventListener("click", function() {
        showAddResult();
    });

    searchButton.addEventListener("click", function() {
        showSearchResult();
    });

    bookData = getBookFromStorage();

    // ------ tombol show => menampilkan Booklist UI ------
    showButton.addEventListener('click', function() {
        document.dispatchEvent(new CustomEvent(RENDER_EVENT, { detail: { isShowAllData: true }}));
    })
});