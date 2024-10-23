const addButton = document.querySelector('.add-button');
const searchButton = document.querySelector('.search-button');
const mainFormContainer = document.querySelector('.main-form');
const addFormContainer = document.querySelector('.add-form-container');
const searchForm = document.querySelector('.search-form-container');
const menu = document.querySelector('.menu');
const addForm = document.querySelector('#bookForm');
const incompleteBookList = document.querySelector('#incompleteBookList');
const completeBookList = document.querySelector('#completeBookList');
const editFormContainer = document.querySelector('.edit-form');
const editForm = document.querySelector('#editBookForm');






// let bookData = [];
let bookData = [
    {id: 1111111111111, title: 'Juz Amma', authors: 'Imam Yasir', year: '2008', isCompleted: 'off'},
    {id: 2222222222222, title: 'Habibie & ainun', authors: 'Habibie', year: '2013', isCompleted: 'off'},
    {id: 3333333333333, title: 'smart parenting', authors: 'Tania Saraswati M.Psi.', year: '2024', isCompleted: 'on'},
    {id: 4444444444444, title: 'Ayah', authors: 'Sandi Alamsyah', year: '2023', isCompleted: 'on'},
    {id: 5555555555555, title: 'Aneka Ikan', authors: 'Bendi Ahmad', year: '2019', isCompleted: 'on'},
];

let sortedBookData = { complete: [], uncomplete: [], totalLength: 0}



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

    mainFormContainer.style.display = 'block';
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
    addBookData();
    resetForm();
});

function addBookData() {
    const bookId = generateId();
    const bookTitle = document.getElementById('bookFormTitle').value;
    const bookAuthor = document.getElementById('bookFormAuthor').value;
    const bookYear = document.getElementById('bookFormYear').value;
    const bookIsComplete = document.getElementById('bookFormIsComplete').value;
    const myData = generateBookData(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete)
    bookData.push(myData);
    // console.log(bookData);
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

// ------ update UI Booklist berdasarkan variabel bookData ------

function updateBooklistUI() {
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
    heading.classList.add("capitalText");
    bookInfo.appendChild(heading);

    const paragraph1 = document.createElement('p');
    paragraph1.setAttribute("data-testid", 'bookItemAuthor');
    paragraph1.innerHTML = `<span class="key">Penulis</span>: ${data.authors}`;
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

function separateBookData() {
    sortedBookData.complete = bookData.filter((data) => data.isCompleted === "on")
    sortedBookData.uncomplete = bookData.filter((data) => data.isCompleted === "off")

    function sortByTitle(a, b) {
        return a.title.localeCompare(b.title);
    }
    
    sortedBookData.complete.sort(sortByTitle);
    sortedBookData.uncomplete.sort(sortByTitle);
    sortedBookData.totalLength = sortedBookData.complete.length + sortedBookData.uncomplete.length;

}

// test
updateBooklistUI();


// ------ switch isComplete pada variable bookdata ------
function switchCompleteStatus(id) {
    bookData.forEach((data, i) => {
        if(data.id == id) data.isCompleted = data.isCompleted == 'on' ? 'off' : 'on'
    });
}

// ------ delete child bookdata ------
function deleteBookData(id) {
    bookData.forEach((data, i) => {
        if(data.id == id) bookData.splice(i, 1)
    });
    console.log(bookData)
}

// ------ animasi fadeout bookdetail pada checkbutton yang dipilih ------

function moveBook(bookDetail) {
    fadeoutBook(bookDetail);
    // update
    setTimeout(() => {
        updateBooklistUI();
    }, 500);
}

function deleteBook(bookDetail, id) {
    fadeoutBook(bookDetail);
    // delete
    setTimeout(() => {
        deleteBookData(id)
        bookDetail.remove();
    }, 500);
}

function fadeoutBook(bookDetail) {
    const elements = bookDetail.childNodes
    elements.forEach(element => {
        console.log(element)
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
            document.getElementById('editBookFormAuthor').value = bookData[i].authors
            document.getElementById('editBookFormYear').value = bookData[i].year

            // edit data
            editForm.onsubmit = function(e){
                e.preventDefault();

                bookData[i].title = document.getElementById('editBookFormTitle').value;
                bookData[i].authors = document.getElementById('editBookFormAuthor').value;
                bookData[i].year = document.getElementById('editBookFormYear').value;
                
                editFormContainer.style.display = 'none';
                
                // console.log(bookDetail.childNodes[0])
                const heading = bookDetail.childNodes[0].childNodes[0]
                const paragraph1 = bookDetail.childNodes[0].childNodes[1]
                const paragraph2 = bookDetail.childNodes[0].childNodes[2]
                console.log(heading)
                heading.innerHTML = bookData[i].title;
                paragraph1.innerHTML = `<span class="key">Penulis</span>: ${bookData[i].authors}`;
                paragraph2.innerHTML = `<span class="key">Tahun</span>: ${bookData[i].year}`;

                console.log(bookData)
            };
        }
    });

    

    
}


// ------ update variable bookdata, kecuali isComplete ------

// function updateBookData(id, newData) {
//     console.log(bookData)

// }

// updateBookData(1111111111111, {
//     id: 5555555555555, 
//     title: 'Aneka Ikan', 
//     authors: 'Bendi Ahmad', 
//     year: '2019', 
//     isCompleted: 'on'
// })

    

