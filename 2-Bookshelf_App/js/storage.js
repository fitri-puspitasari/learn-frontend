// import { STORAGE_KEY, RENDER_EVENT } from "./main.js";
import { RENDER_EVENT } from "./ui.js";
import { bookData } from "./main.js";

const STORAGE_KEY = 'LOCAL_BOOK_DATA';

export function getBookFromStorage() {
    let books = [];
    if (typeof (Storage) !== undefined) {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let dataFromLocal = JSON.parse(serializedData);
        if (dataFromLocal !== null) {
            for (const data of dataFromLocal) {
                data.year = Number(data.year);
                data.isComplete = Boolean(data.isComplete);
                books.push(data);
            }
        }
        document.dispatchEvent(new Event(RENDER_EVENT));
    } else {
        alert('Browser anda tidak mendukung local storage');
    }
    return books;
}

export function saveDataToLocal() {
    if (typeof (Storage) !== undefined) {
        const parsed = JSON.stringify(bookData);
        localStorage.setItem(STORAGE_KEY, parsed);
    }
}

export function addSeedForTesting() {
    bookData = [
        {id: 1111111111111, title: "Habibie & Ainun Jilid 1", author: "Habibie", year: 2014, isComplete: true},
        {id: 2222222222222, title: "Habibie & Ainun Jilid 2", author: "B.J. Habibie", year: 2023, isComplete: false},
        {id: 3333333333333, title: "Mamalia di Indonesia", author: "Anggi Amelia", year: 2012, isComplete: true},
        {id: 4444444444444, title: "Menanam Strawberry di Rumah", author: "Sarah Ambarwati", year: 2011, isComplete: false},
        {id: 5555555555555, title: "Menanam Buah Mangga Itu Mudah", author: "Sandi Andrian", year: 2009, isComplete: false},
        {id: 6666666666666, title: "Bedua Bersamamu Jilid 1", author: "Ashanty Kurnianingsih", year: 2018, isComplete: true}
    ]
    saveDataToLocal();
}