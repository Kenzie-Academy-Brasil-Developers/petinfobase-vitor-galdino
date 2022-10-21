export class Logout {
    static checkhomePage(classButton) {
        const button = document.querySelector(classButton);

        button.onclick = () => {
            localStorage.clear();
            location.replace("../login/index.html");
        }
    }
}