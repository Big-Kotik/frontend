export class User {
    constructor(socketId, id, login, creationTime) {
        this.socketId = socketId;
        this.id = id;
        this.login = login;
        this.creationTime = creationTime;
    }
}