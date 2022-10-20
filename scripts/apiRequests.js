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
                    location.replace("../home/index.html");
                }, 2500);
                return request.ok;
            } else {
                throw new Error(request.status + " " + request.statusText);
            }

        } catch (err) {
            console.log(err)
            return false;
        }
    }
}

export { Api };