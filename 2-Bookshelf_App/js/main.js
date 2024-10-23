const addButton = document.querySelector('.add-button');
const searchButton = document.querySelector('.search-button');
const mainFormContainer = document.querySelector('.main-form');
const addFormContainer = document.querySelector('.add-form-container');
const searchFormContainer = document.querySelector('.search-form-container');
const searchForm = document.querySelector('#searchBook');
const showButton = document.querySelector('.show-button');
const menu = document.querySelector('.menu');
const addForm = document.querySelector('#bookForm');
const bookListContainer = document.querySelector('.booklist-container');
const incompleteBookList = document.querySelector('#incompleteBookList');
const completeBookList = document.querySelector('#completeBookList');
const editFormContainer = document.querySelector('.edit-form');
const editForm = document.querySelector('#editBookForm');
const openLabelButton = document.querySelectorAll('.open-label-button');


let bookData = [];
let searchBookData = []
let sortedBookData = { complete: [], uncomplete: []}
let isAllDataShowed = true;

const STORAGE_KEY = 'LOCAL_BOOK_DATA';
const RENDER_EVENT = 'render-book-data';



// ------ tombol add & search di welcome menu ------

document.addEventListener('DOMContentLoaded', function () {
    addButton.addEventListener("click", function() {
        showForm('add');
        resetSearchForm();
    });
    
    searchButton.addEventListener("click", function() {
        showForm('search');
        resetAddForm();
    });

    if (typeof (Storage) !== undefined) {
        loadDataFromStorage();
    } else {
        alert('Browser anda tidak mendukung local storage');
    }
    
    // ------ tombol show => menampilkan Booklist UI ------
    showButton.addEventListener('click', function() {
        bookListContainer.style.opacity = 1;
        isAllDataShowed = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
    })
});


function loadDataFromStorage() {
    // const serializedData = localStorage.getItem(STORAGE_KEY);
    let dataFromLocal = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (dataFromLocal !== null) {
        for (const data of dataFromLocal) {
            bookData.push(data);
        }
    }
}


// document.addEventListener(RENDER_EVENT, function () {
//     updateBooklistUI();
// });



function showForm(task) {
    const welcomeText = document.querySelector('.welcome-menu').children[0]
    welcomeText.style.display = 'none';

    const welcomeButtons = document.querySelector('.welcome-menu-buttons');
    welcomeButtons.style.marginTop = '25px';
    addButton.style.marginRight = '50px';

    mainFormContainer.style.display = 'block';
    menu.style.zIndex = 0;

    if (task == 'add') {
        searchButton.style.transform = 'translateX(130px)';
        addButton.style.transform = 'translateX(0)';
        addFormContainer.style.display = 'block';
        searchFormContainer.style.display = 'none';
        
    } else if (task == 'search') {
        addButton.style.transform = 'translateX(-125px)';
        searchButton.style.transform = 'translateX(0)';

        searchFormContainer.style.display = 'block';
        addFormContainer.style.display = 'none';

    }
}

// ------ repair check button ------
const check =  document.getElementById('bookFormIsComplete')
check.value = 'off'
check.addEventListener('click', function() {
    check.value = check.value == 'off' ? 'on' : 'off'
    check.checked = check.value == 'on' ? true : false;
});

// ------ tombol submit di form add book ------

addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addBookData();
    document.dispatchEvent(new Event(RENDER_EVENT));
    bookListContainer.style.opacity = 1;
    resetAddForm();
});

function addBookData() {
    const bookId = generateId();
    const bookTitle = document.getElementById('bookFormTitle').value;
    const bookAuthor = document.getElementById('bookFormAuthor').value;
    const bookYear = document.getElementById('bookFormYear').value;
    const bookIsComplete = document.getElementById('bookFormIsComplete').value;
    const myData = generateBookData(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete)
    bookData.push(myData);
    saveDataToLocal();
}

function saveDataToLocal() {
    if (typeof (Storage) !== undefined) {
        const parsed = JSON.stringify(bookData);
        localStorage.setItem(STORAGE_KEY, parsed);
    }
}

function generateBookData(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function generateId() {
    return Number(new Date());
}

function resetAddForm() {
    document.getElementById('bookFormTitle').value = '';
    document.getElementById('bookFormAuthor').value = '';
    document.getElementById('bookFormYear').value = '';
    document.getElementById('bookFormIsComplete').checked = false;
    document.getElementById('bookFormIsComplete').value = 'off';


}

function resetSearchForm() {
    document.getElementById('editBookFormTitle').value = '';
    document.getElementById('editBookFormAuthor').value = '';
    document.getElementById('editBookFormYear').value = '';
    console.log(openLabelButton)
    openLabelButton.forEach(button => {
        button.style.display = 'block';
        button.nextElementSibling.style.display = 'none';

    });
}


// ------ update UI Booklist berdasarkan variabel bookData ------

document.addEventListener(RENDER_EVENT, function () {
    separateBookData();

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


function separateBookData() {
    const dataShowed = isAllDataShowed ? bookData : searchBookData
    
    sortedBookData.complete = dataShowed.filter((data) => data.isCompleted === "on")
    sortedBookData.uncomplete = dataShowed.filter((data) => data.isCompleted === "off")

    function sortByTitle(a, b) {
        return a.title.localeCompare(b.title);
    }
    
    sortedBookData.complete.sort(sortByTitle);
    sortedBookData.uncomplete.sort(sortByTitle);
    // sortedBookData.totalLength = sortedBookData.complete.length + sortedBookData.uncomplete.length;
}

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
    // heading.classList.add("capitalText");
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
    // bookInfoButtons.setAttribute("data-id", data.id);
    bookDetail.appendChild(bookInfoButtons);
    
    const checkButton = document.createElement('button');
    checkButton.setAttribute("title", data.isCompleted == 'on' ? 'Tandai belum selesai dibaca' : 'Tandai selesai dibaca');
    checkButton.setAttribute("data-testid", 'bookItemIsCompleteButton');
    checkButton.innerHTML = data.isCompleted == 'on' ? '<i class="fa-solid fa-circle-xmark"></i>' : '<i class="fa-solid fa-circle-check"></i>';
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
        deleteBook(bookDetail, data.id);
    })
    editButton.addEventListener('click', function() {
        showEditForm(bookDetail, data.id);

    })

    return bookDetail;
}

// ------ switch isComplete pada variable bookdata ------
function switchCompleteStatus(id) {
    bookData.forEach((data, i) => {
        if(data.id == id) {
            data.isCompleted = data.isCompleted == 'on' ? 'off' : 'on';
        }

    });
}

// ------ delete child bookdata ------
function deleteBookData(id) {
    bookData.forEach((data, i) => {
        if(data.id == id) bookData.splice(i, 1)
    });
    // console.log(bookData)
}

// ------ animasi fadeout bookdetail pada checkbutton yang dipilih ------

function moveBook(bookDetail) {
    fadeoutBook(bookDetail);
    // update
    setTimeout(() => {
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveDataToLocal();

    }, 100);
}

function deleteBook(bookDetail, id) {
    fadeoutBook(bookDetail);
    // delete
    setTimeout(() => {
        deleteBookData(id)
        bookDetail.remove();
        saveDataToLocal();

    }, 100);
    console.log(bookData)
}

function fadeoutBook(bookDetail) {
    const elements = bookDetail.childNodes
    elements.forEach(element => {
        // console.log(element)
        element.style.opacity = 0
        
    });
}

// ------ show edit form ------

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
                bookData[i].year = document.getElementById('editBookFormYear').value;
                
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


// ------ search feature ------


openLabelButton.forEach(button => {
    button.addEventListener('click', function() {
        button.nextElementSibling.style.display = 'block';
        button.nextElementSibling.childNodes[1].focus();
        button.style.display = 'none';

    })
});

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();    
    const bookTitle = document.getElementById('searchBookTitle').value;
    const bookAuthor = document.getElementById('searchBookAuthor').value;
    const bookYear = document.getElementById('searchBookYear').value;

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
    
    bookListContainer.style.opacity = 1;
    isAllDataShowed = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
})
    
function isInclude(data, key, keyword) {
    const newString = data[key].toLowerCase()
    const newKeyword = keyword.toLowerCase()
    return newString.includes(newKeyword)
}