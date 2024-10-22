const addButton = document.querySelector('.add-button');
const searchButton = document.querySelector('.search-button');
const formContainer = document.querySelector('.form-container');
const addFormContainer = document.querySelector('.add-form-container');
const searchForm = document.querySelector('.search-form-container');
const menu = document.querySelector('.menu');
const addForm = document.querySelector('#bookForm');

let bookData = [];

// ------ tombol add & search di welcome menu ------

addButton.addEventListener("click", function() {
    showForm('add');
});

searchButton.addEventListener("click", function() {
    showForm('search');
});

function showForm(task) {
    const welcomeText = document.querySelector('.welcome-menu').children[0]
    welcomeText.style.display = 'none';

    const welcomeButtons = document.querySelector('.welcome-menu-buttons');
    welcomeButtons.style.marginTop = '25px';
    addButton.style.marginRight = '50px';

    formContainer.style.display = 'block';
    menu.style.zIndex = 0;

    if (task == 'add') {
        searchButton.style.transform = 'translateX(130px)';
        addButton.style.transform = 'translateX(0)';
        addFormContainer.style.display = 'block';
        searchForm.style.display = 'none';
        
    } else if (task == 'search') {
        addButton.style.transform = 'translateX(-125px)';
        searchButton.style.transform = 'translateX(0)';

        searchForm.style.display = 'block';
        addFormContainer.style.display = 'none';

    }
}

// ------ tombol submit di form add book ------

addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateBookData();
    resetForm();
});

function updateBookData() {
    const bookId = generateId();
    const bookTitle = document.getElementById('bookFormTitle').value;
    const bookAuthor = document.getElementById('bookFormAuthor').value;
    const bookYear = document.getElementById('bookFormYear').value;
    const bookIsComplete = document.getElementById('bookFormIsComplete').value;
    const myData = generateBookData(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete)
    bookData.push(myData);
    console.log(myData);
}

function generateBookData(id, title, authors, year, isCompleted) {
    return {
        id,
        title,
        authors,
        year,
        isCompleted
    }
}

function generateId() {
    return Number(new Date());
}

function resetForm() {
    document.getElementById('bookFormTitle').value = '';
    document.getElementById('bookFormAuthor').value = '';
    document.getElementById('bookFormYear').value = '';
    document.getElementById('bookFormIsComplete').checked = false;
}

