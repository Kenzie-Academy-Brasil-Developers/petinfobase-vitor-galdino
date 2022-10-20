import { Api } from "./apiRequests.js";

class Login {

    static showErrorMessage(elem) {
        if (!document.querySelector(".error-message")) {
            elem.insertAdjacentHTML("beforebegin", `<p class="error-message">A senha está incorreta</p>`);
            setTimeout(() => {
                document.querySelector(".error-message").remove();
            }, 2500)
        }
    }

    static checkInputs() {
        const inputs = document.querySelectorAll(".default-input");
        const submit = document.querySelector(".login-access");

        inputs.forEach((input) => {
            input.oninput = () => {

                if (inputs[0].value && inputs[1].value && inputs[0].value.includes("@" && ".")) {
                    submit.disabled = false;
                } else {
                    submit.disabled = true;
                }
            }
        });
    }

    static getFormValues() {
        const submit = document.querySelector(".login-access")
        const form = document.querySelector("form");
        const elem = [...form.elements];

        form.onsubmit = async (e) => {
            e.preventDefault();
            submit.disabled = true;
            submit.classList.add("loading");

            const body = {};

            elem.forEach(input => {
                if (!input.classList.contains("login-access")) {
                    input.disabled = true;
                    body[input.id] = input.value;
                }
            });

            const apiRequest = await Api.loginRequest(body);
            if (!apiRequest) {
                submit.disabled = false;
                form[0].disabled = false;
                form[1].disabled = false;
                submit.classList.remove("loading");

                this.showErrorMessage(submit);
            }
        }
    }
}

export { Login };