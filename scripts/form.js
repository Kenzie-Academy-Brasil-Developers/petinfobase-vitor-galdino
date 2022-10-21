import { Message } from "./warningsMessage.js";
import { RenderHomePage } from "./renders.js";

export class Form {

    static checkInputs(inputClass, submitClass, buttonAmount = 1) {
        const inputs = document.querySelectorAll(inputClass);
        const submit = document.querySelector(submitClass);
        const form = document.querySelector("form");
        const elem = [...form.elements].slice(0, -buttonAmount);

        inputs.forEach((input) => {
            input.oninput = () => {
                elem.forEach((elem) => {
                    if (elem.value) {
                        submit.disabled = false;
                    } else {
                        submit.disabled = true;
                    }
                })
            }
        });
    }

    static getFormValues(submitClass, apiCallback, local) {
        const submit = document.querySelector(submitClass)
        const form = document.querySelector("form");
        const elem = [...form.elements];

        form.onsubmit = async (e) => {
            e.preventDefault();
            submit.disabled = true;
            submit.classList.add("loading");

            const body = {};

            elem.forEach(input => {
                if (!input.classList.contains(submitClass.replace(".", ""))) {
                    input.disabled = true;
                    body[input.id] = input.value;
                }
            });

            const apiRequest = await apiCallback(body);
            if (!apiRequest) {
                elem.forEach(input => input.disabled = false);
                submit.classList.remove("loading");

                Message.showErrorMessage(submit, local);
            }
        }
    }

    static getModalFormValues(apiCallback, id = undefined) {
        const modal = document.querySelector(".modal");
        const form = document.querySelector("form");
        const elem = [...form.elements]

        form.onsubmit = async (e) => {
            e.preventDefault();

            const body = {};

            elem.forEach((input) => {
                if (input.classList.contains("default-input")) {
                    body[input.id] = input.value;
                }
            });

            const apiRequest = await apiCallback(body, id);
            if (apiRequest) {
                RenderHomePage.posts();
                modal.remove();
            }
        }
    }
}