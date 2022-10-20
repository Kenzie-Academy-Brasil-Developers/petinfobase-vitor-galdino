export class LocalStorage {
    static getUserToken = () => JSON.parse(localStorage.getItem("userToken")).token;

    static getUserId = () => JSON.parse(localStorage.getItem("userId"));
}