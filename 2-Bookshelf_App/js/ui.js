// import { RENDER_EVENT } from "./main.js";
import { bookData } from "./main.js";
import { separateBookData, sortedBookData } from "./bookManager.js";
import { switchCompleteStatus, moveBook } from "./bookManager.js";
import { deleteBook } from "./bookManager.js";
import { saveDataToLocal } from "./storage.js";

const bookListContainer = document.querySelector('.booklist-container');
const incompleteBookList = document.querySelector('#incompleteBookList');
const completeBookList = document.querySelector('#completeBookList');
const deleteDialog = document.querySelector('.delete-dialog');
const addButton = document.querySelector('.add-button');
const searchButton = document.querySelector('.search-button');
const mainFormContainer = document.querySelector('.main-form');
const addFormContainer = document.querySelector('.add-form-container');
const searchFormContainer = document.querySelector('.search-form-container');
const openLabelButton = document.querySelectorAll('.open-label-button');
const editFormContainer = document.querySelector('.edit-form');
const editForm = document.querySelector('#editBookForm');
const menu = document.querySelector('.menu');
const check =  document.getElementById('bookFormIsComplete');

export const RENDER_EVENT = 'render-book-data';

document.addEventListener(RENDER_EVENT, function (e) {
    if(e.detail) {
        bookListContainer.style.opacity = 1;
        bookListContainer.style.display = 'flex';
        separateBookData(e.detail.isShowAllData);
    }else{
        separateBookData();
    }
    // console.log(e)

    completeBookList.innerHTML = ''
    sortedBookData.complete.forEach(data => {
        const bookDetail = elementBookDetail(data);
        completeBookList.appendChild(bookDetail);
    });

    incompleteBookList.innerHTML = ''
    sortedBookData.uncomplete.forEach(data => {
        const bookDetail = elementBookDetail(data);
        incompleteBookList.appendChild(bookDetail);
    });
});

function elementBookDetail(data) {
    const bookDetail = document.createElement('div');
    bookDetail.classList.add("book-detail");
    bookDetail.setAttribute("data-bookid", data.id);
    bookDetail.setAttribute("data-testid", 'bookItem');

    const bookInfo = document.createElement('div');
    bookInfo.classList.add("book-info");
    bookDetail.appendChild(bookInfo);

    const heading = document.createElement('h3');
    heading.setAttribute("data-testid", 'bookItemTitle');
    heading.innerHTML = data.title;
    bookInfo.appendChild(heading);

    const paragraph1 = document.createElement('p');
    paragraph1.setAttribute("data-testid", 'bookItemAuthor');
    paragraph1.innerHTML = `<span class="key">Penulis</span>: ${data.author}`;
    paragraph1.classList.add("capitalText");
    bookInfo.appendChild(paragraph1);
    
    const paragraph2 = document.createElement('p');
    paragraph2.setAttribute("data-testid", 'bookItemYear');
    paragraph2.innerHTML = `<span class="key">Tahun</span>: ${data.year}`;
    bookInfo.appendChild(paragraph2);

    const bookInfoButtons = document.createElement('div');
    bookInfoButtons.classList.add("book-info-buttons");
    bookDetail.appendChild(bookInfoButtons);
    
    const checkButton = document.createElement('button');
    checkButton.setAttribute("title", data.isComplete == true ? 'Tandai belum selesai dibaca' : 'Tandai selesai dibaca');
    checkButton.setAttribute("data-testid", 'bookItemIsCompleteButton');
    checkButton.innerHTML = data.isComplete == true ? '<i class="fa-solid fa-circle-xmark"></i>' : '<i class="fa-solid fa-circle-check"></i>';
    bookInfoButtons.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute("title", 'Hapus');
    deleteButton.setAttribute("data-testid", 'bookItemDeleteButton');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    bookInfoButtons.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.setAttribute("title", 'Edit');
    editButton.setAttribute("data-testid", 'bookItemEditButton');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    bookInfoButtons.appendChild(editButton);

    // addEventButtons
    checkButton.addEventListener('click', function() {
        switchCompleteStatus(data.id);
        moveBook(bookDetail);
    })
    deleteButton.addEventListener('click', function() {
        showDeleteDialog(bookDetail, data.id);
    })
    editButton.addEventListener('click', function() {
        showEditForm(bookDetail, data.id);
    })

    return bookDetail;
}

export function fadeoutBook(bookDetail) {
    const elements = bookDetail.childNodes
    elements.forEach(element => {
        element.style.opacity = 0
    });
}

function showDeleteDialog(bookDetail, id) {
    deleteDialog.style.display = 'block';
    const yesButton = deleteDialog.children[0].children[1].children[0]
    yesButton.addEventListener('click', function() {
        deleteBook(bookDetail, id);
        deleteDialog.style.display = 'none';
    });
    const noButton = deleteDialog.children[0].children[1].children[1]
    noButton.addEventListener('click', function() {
        deleteDialog.style.display = 'none';
    });
}

function showEditForm(bookDetail, id) {
    editFormContainer.style.display = 'block';

    bookData.forEach((data, i) => {
        if(data.id == id) {
            // show value
            document.getElementById('editBookFormTitle').value = bookData[i].title
            document.getElementById('editBookFormAuthor').value = bookData[i].author
            document.getElementById('editBookFormYear').value = bookData[i].year

            // edit data
            editForm.onsubmit = function(e){
                e.preventDefault();

                bookData[i].title = document.getElementById('editBookFormTitle').value;
                bookData[i].author = document.getElementById('editBookFormAuthor').value;
                bookData[i].year = Number(document.getElementById('editBookFormYear').value);
                
                editFormContainer.style.display = 'none';
                
                // console.log(bookDetail.childNodes[0])
                const heading = bookDetail.childNodes[0].childNodes[0]
                const paragraph1 = bookDetail.childNodes[0].childNodes[1]
                const paragraph2 = bookDetail.childNodes[0].childNodes[2]
                // console.log(heading)
                heading.innerHTML = bookData[i].title;
                paragraph1.innerHTML = `<span class="key">Penulis</span>: ${bookData[i].author}`;
                paragraph2.innerHTML = `<span class="key">Tahun</span>: ${bookData[i].year}`;
                
                saveDataToLocal();
            };

            // close edit form
            document.getElementById('editBookFormClose').addEventListener('click', function() {
                editFormContainer.style.display = 'none';
            })
            
        }
    });
}

export function showAddResult() {
    playAnimation();
    searchButton.style.transform = 'translateX(130px)';
    addButton.style.transform = 'translateX(0)';
    addFormContainer.style.display = 'block';
    searchFormContainer.style.display = 'none'; 
    resetAddForm()
}

export function showSearchResult() {
    playAnimation();
    addButton.style.transform = 'translateX(-125px)';
    searchButton.style.transform = 'translateX(0)';
    searchFormContainer.style.display = 'block';
    addFormContainer.style.display = 'none';
    resetSearchForm();
}

function playAnimation() {
    const welcomeText = document.querySelector('.welcome-menu').children[0]
    welcomeText.style.display = 'none';

    const welcomeButtons = document.querySelector('.welcome-menu-buttons');
    welcomeButtons.style.marginTop = '25px';
    addButton.style.marginRight = '50px';

    mainFormContainer.style.display = 'block';
    menu.style.zIndex = 0;
}

export function resetAddForm() {
    document.getElementById('bookFormTitle').value = '';
    document.getElementById('bookFormAuthor').value = '';
    document.getElementById('bookFormYear').value = '';
    document.getElementById('bookFormIsComplete').checked = false;
    document.getElementById('bookFormIsComplete').value = 'off';
}

export function resetSearchForm() {
    document.getElementById('searchBookTitle').value = '';
    document.getElementById('searchBookAuthor').value = '';
    document.getElementById('searchBookYear').value = '';
    openLabelButton.forEach(button => {
        button.style.display = 'block';
        button.nextElementSibling.style.display = 'none';
    });
}

// ------ repair check button ------
check.value = 'off'
check.addEventListener('click', function() {
    check.value = check.value == 'off' ? 'on' : 'off'
    check.checked = check.value == 'on' ? true : false;
});

openLabelButton.forEach(button => {
    button.addEventListener('click', function() {
        button.nextElementSibling.style.display = 'block';
        button.nextElementSibling.childNodes[1].focus();
        button.style.display = 'none';
    })
});