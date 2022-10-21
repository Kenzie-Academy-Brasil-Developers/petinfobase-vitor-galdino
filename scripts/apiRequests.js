import { LocalStorage } from "./localStorage.js";
import { Toast } from "./toast.js";

const baseUrl = "http://localhost:3333/"

class Api {

    static async loginRequest(body) {
        try {
            const request = await fetch(`${baseUrl}login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (request.ok) {
                const response = await request.json();
                localStorage.setItem("userToken", JSON.stringify(response));

                setTimeout(() => {
                    location.assign("../home/index.html");
                }, 2500);
                return request.ok;
            } else {
                throw new Error(request.status + " " + request.statusText);
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    static async registerRequest(body) {
        try {
            const request = await fetch(`${baseUrl}users/create`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (request.ok) {
                Toast.successCreateAccount();
                setTimeout(() => {
                    location.assign("../login/index.html");
                }, 2500);

                return request.ok;
            } else {
                throw new Error(request.status + " " + request.statusText);
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    static async getUserInfo() {
        try {
            const request = await fetch(`${baseUrl}users/profile`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${LocalStorage.getUserToken()}`,
                }
            });

            const response = await request.json();
            localStorage.setItem("userId", JSON.stringify(response.id));

            return response;

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async getPosts() {
        try {
            const request = await fetch(`${baseUrl}posts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${LocalStorage.getUserToken()}`,
                }
            });

            const response = await request.json();
            return response;

        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

export { Api };