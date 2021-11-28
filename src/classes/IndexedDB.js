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