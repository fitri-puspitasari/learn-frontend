import { bookData } from "./main.js";
import { fadeoutBook } from "./ui.js";
import { resetAddForm, resetSearchForm } from "./ui.js";
import { saveDataToLocal } from "./storage.js";
import { RENDER_EVENT } from "./ui.js";

let searchBookData = []
export let sortedBookData = { complete: [], uncomplete: []}

export function separateBookData(isShowAllData = true) {
    const dataShowed = isShowAllData ? bookData : searchBookData
    
    sortedBookData.complete = dataShowed.filter((data) => data.isComplete === true)
    sortedBookData.uncomplete = dataShowed.filter((data) => data.isComplete === false)

    function sortByTitle(a, b) {
        return a.title.localeCompare(b.title);
    }
    
    sortedBookData.complete.sort(sortByTitle);
    sortedBookData.uncomplete.sort(sortByTitle);
}

export function switchCompleteStatus(id) {
    bookData.forEach((data, i) => {
        if(data.id == id) {
            // data.isComplete = data.isComplete == 'on' ? 'off' : 'on';
            data.isComplete = !data.isComplete
        }
    });
}

export function moveBook(bookDetail) {
    fadeoutBook(bookDetail);
    // update
    setTimeout(() => {
        // document.dispatchEvent(new Event(RENDER_EVENT));
        document.dispatchEvent(new CustomEvent(RENDER_EVENT, { detail: { isShowAllData: true }}));
        saveDataToLocal();
    }, 100);
}

export function deleteBook(bookDetail, id) {
    fadeoutBook(bookDetail);
    // delete
    setTimeout(() => {
        deleteBookData(id)
        bookDetail.remove();
        saveDataToLocal();
    }, 100);
    // console.log(bookData)
}

function deleteBookData(id) {
    bookData.forEach((data, i) => {
        if(data.id == id) bookData.splice(i, 1)
    });
    // console.log(bookData)
}

// ------ tombol submit di form add book ------
const addForm = document.querySelector('#bookForm');
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addBookData();
    document.dispatchEvent(new CustomEvent(RENDER_EVENT, { detail: { isShowAllData: true }}));
    resetAddForm();
});

function addBookData() {
    const bookId = generateId();
    const bookTitle = document.getElementById('bookFormTitle').value;
    const bookAuthor = document.getElementById('bookFormAuthor').value;
    const bookYear = Number(document.getElementById('bookFormYear').value);
    const bookIsComplete = document.getElementById('bookFormIsComplete').checked;
    const myData = generateBookData(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete)
    bookData.push(myData);
    saveDataToLocal();
}



function generateBookData(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function generateId() {
    return Number(new Date());
}

const searchForm = document.querySelector('#searchBook');
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();    
    const bookTitle = document.getElementById('searchBookTitle').value;
    const bookAuthor = document.getElementById('searchBookAuthor').value;
    const bookYear = Number(document.getElementById('searchBookYear').value);

    searchBookData = [];
    bookData.forEach((data, index) => {
        if (bookTitle !== '' || bookAuthor !== '' || bookYear !== '') {
            if (bookTitle == '' || isInclude(data, 'title', bookTitle)) {
                if (bookAuthor == '' || isInclude(data, 'author', bookAuthor)) {
                    if (bookYear == '' || data.year == bookYear) {
                        searchBookData.push(data)
                    }
                }
            }            
        }
    });
    
    document.dispatchEvent(new CustomEvent(RENDER_EVENT, { detail: { isShowAllData: false }}));
    resetSearchForm();
})
    
function isInclude(data, key, keyword) {
    const newString = data[key].toLowerCase()
    const newKeyword = keyword.toLowerCase()
    return newString.includes(newKeyword)
}