export class Message {

    static showErrorMessage(elem, local) {
        if (local === "login") local = "A senha está incorreta";
        else local = "Email já cadastrado";

        if (!document.querySelector(".error-message")) {
            elem.insertAdjacentHTML("beforebegin", `<p class="error-message">${local}</p>`);
            setTimeout(() => {
                document.querySelector(".error-message").remove();
            }, 2500)
        }
    }
}