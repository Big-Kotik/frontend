export class IndexedDB {
    dbName;
    DB = null;
    static dbVersion = 1;

    constructor(dbName) {
        if (!('indexedDB' in window)) {
            console.warn('IndexedDB not supported')
            alert('IndexedDB not supported');
        }

        this.dbName = dbName;

        let dbReq = indexedDB.open(this.dbName, 1);

        dbReq.onupgradeneeded = () => {
            let db = dbReq.result;
            if (!db.objectStoreNames.contains(this.dbName)) { // если хранилище "books" не существует
                //db.createObjectStore('messages', {autoIncrement: true});
                const store = db.createObjectStore('messages', {autoIncrement: true}); // создаем хранилище
                //store.createIndex('login', 'login', { unique: false })
                //store.createIndex('password', 'password', { unique: false })
                store.createIndex('creationTime', 'creationTime')
            }
        }

        dbReq.onsuccess = (event) => {
            this.DB = event.target.result;
        }
        dbReq.onerror = (event) => {
            alert('error opening database ' + event.target.errorCode);
        }
    }

    save(message) {
        let transaction = this.DB.transaction([this.dbName], "readwrite");

        let messages = transaction.objectStore("messages");

        message.creationTime = new Date();

        messages.add(message);

        transaction.onsuccess = function () {
            console.log("Message add");
        };

        transaction.onerror = function () {
            console.log("Ошибка", message);
        };
    }

    findAll() {
        let tx = this.DB.transaction([this.dbName], 'readonly');
        let store = tx.objectStore('messages');
        // Создать запрос курсора

        let index = store.index('creationTime');

        let anHourAgoInMilliseconds = Date.now() - 60 * 60 * 1000;
// IDBKeyRange - глобальная переменная для определения диапазонов для запроса
        let keyRange = IDBKeyRange.lowerBound(anHourAgoInMilliseconds);
        let req = index.openCursor(keyRange, 'next');

        let allMessage = [];

        req.onsuccess = (event) => {

            let cursor = event.target.result;
            if (cursor != null) {
                allMessage.push(cursor.value);
                cursor.continue();
            } else {
                console.log(allMessage)
                return allMessage;
            }
        }
        req.onerror = (event) => {
            console.log('error in cursor request ')
            alert('error in cursor request ' + event.target.errorCode);
        }
    }
}


let db;
let dbReq = indexedDB.open('user2', 1);
dbReq.onupgradeneeded = () => {
    let db = dbReq.result;
    if (!db.objectStoreNames.contains('messages')) { // если хранилище "books" не существует
        //db.createObjectStore('messages', {autoIncrement: true});
        const store = db.createObjectStore('messages', {autoIncrement: true}); // создаем хранилище
        //store.createIndex('login', 'login', { unique: false })
        //store.createIndex('password', 'password', { unique: false })
        store.createIndex('creation', 'creation')
    }
}
dbReq.onsuccess = (event) => {
    db = event.target.result;
}
dbReq.onerror = (event) => {
    alert('error opening database ' + event.target.errorCode);
}

console.log(db)

const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target, newLogin, newPass)
    let transaction = db.transaction(["messages"], "readwrite"); // (1)

// получить хранилище объектов для работы с ним
    let messages = transaction.objectStore("messages"); // (2)

    let message = {
        login: newLogin,
        password: newPass,
        creation: new Date()
    };

    messages.add(message); // (3)

    transaction.onsuccess = function () { // (4)
        console.log("Книга добавлена в хранилище");
    };

    transaction.onerror = function () {
        console.log("Ошибка", newLogin, newPass);
    };
}

const fildAll = (event) => {
    console.log("klik")

    let tx = db.transaction(['messages'], 'readonly');
    let store = tx.objectStore('messages');
    // Создать запрос курсора

    let index = store.index('creation');

    let anHourAgoInMilliseconds = Date.now() - 60 * 60 * 1000;
// IDBKeyRange - глобальная переменная для определения диапазонов для запроса
    let keyRange = IDBKeyRange.lowerBound(anHourAgoInMilliseconds);
    let req = index.openCursor(keyRange, 'next');


    //let req = store.openCursor();
    let allNotes = [];

    req.onsuccess = (event) => {
        // Результатом req.onsuccess в запросах openCursor является
        // IDBCursor
        let cursor = event.target.result;
        if (cursor != null) {
            // Если курсор не нулевой, мы получили элемент.
            allNotes.push(cursor.value);
            cursor.continue();
        } else {
            // Если у нас нулевой курсор, это означает, что мы получили
            // все данные, поэтому отображаем заметки, которые мы получили.
            console.log(allNotes)
        }
    }
    req.onerror = (event) => {
        console.log('error in cursor request ')
        alert('error in cursor request ' + event.target.errorCode);
    }
}

