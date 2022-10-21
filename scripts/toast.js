export class Toast {

    static successCreateAccount() {
        document.body.insertAdjacentHTML("beforeend", `
        <div class="toast">
            <div class="toast-header">
                <img draggable="false" src="../../img/green-circle.svg">
                <h3>Sua conta foi criada com sucesso!</h3>
            </div>
            <p>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../login/index.html" class="link">Acessar página de login</a></p>
        </div>
        `);
        setTimeout(() => document.querySelector(".toast").remove(), 2500);
    }

    static successDeletePost() {
        document.body.insertAdjacentHTML("beforeend", `
        <div class="toast">
            <div class="toast-header">
                <img draggable="false" src="../../img/green-circle.svg">
                <h3>Post deletado com sucesso!</h3>
            </div>
            <p>O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed </p>
        </div>
        `);
        setTimeout(() => document.querySelector(".toast").remove(), 2500);
    }
}