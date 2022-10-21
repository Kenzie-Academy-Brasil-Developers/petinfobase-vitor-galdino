import { Form } from "./form.js";
import { Api } from "./apiRequests.js";
import { RenderHomePage } from "./renders.js";
import { Toast } from "./toast.js";

export class Modal {

    static showPost() {
        const allButtons = document.querySelectorAll(".show-post");

        allButtons.forEach((button) => {
            button.onclick = (e) => {
                const li = e.path[1];
                const userInfoContent = li.children[0].children[0];
                const userInfo = userInfoContent.outerText.split("\n")
                document.body.insertAdjacentHTML("beforeend", `
                <div class="modal">
                    <div class="modal-body">
                        <div class="header-modal">
                            <div class="user-info">
                                <img src="${userInfoContent.children[0].src}" alt="${userInfo[0]} picutre">
                                <h4>${userInfo[0]}</h4>
                                <span>${userInfo[1]}</span></span>
                            </div>
                            <div class="user-tools">
                                <button class="close-btn close-modal"></button>
                            </div>
                        </div>
                        <h2>${li.children[1].innerHTML}</h2>
                        <p>${li.children[2].innerHTML}</p>
                    </div>
                </div>
                `);

                ModalFunctions.close(".close-modal");
            }
        });
    }

    static showCreatePost(buttonClass) {
        const button = document.querySelector(buttonClass);
        button.onclick = (e) => {
            document.body.insertAdjacentHTML("beforeend", `
            <div class="modal">
                <div class="modal-body">
                    <div class="header-modal">
                        <div class="user-info">
                            <h3>Criando novo post</h3>
                        </div>
                        <div class="user-tools">
                            <button class="close-btn close-modal"></button>
                        </div>
                    </div>
                    <form>
                        <label class="default-label" for="title">Título do post</label>
                        <input class="default-input" type="text" name="title" id="title"
                            placeholder="Digite o título aqui...">

                        <label class="default-label" for="content">Conteúdo do post</label>
                        <textarea class="default-input" name="content" id="content"
                            placeholder="Desenvolva o conteúdo do post aqui..."></textarea>

                        <div class="action-tools">
                            <button class="medium-btn close-modal" type="button">Cancelar</button>
                            <button class="primary-btn completed-submit" type="submit" disabled>Publicar</button>
                        </div>
                    </form>
                </div>
            </div>
            `);

            Form.checkInputs(".default-input", ".completed-submit", 2);
            Form.getModalFormValues(Api.createNewPost);
            ModalFunctions.close(".close-modal");
        }
    }

    static showEditPost() {
        const allButtons = document.querySelectorAll(".edit-post");

        allButtons.forEach(button => {
            button.onclick = (e) => {

                const idPost = e.path[3].dataset.post;
                const postValue = e.path[3].outerText.split("\n");

                document.body.insertAdjacentHTML("beforeend", `
                <div class="modal">
                    <div class="modal-body">
                        <div class="header-modal">
                            <div class="user-info"><h3>Edição</h3></div>
                            <div class="user-tools">
                                <button class="close-btn close-modal"></button>
                            </div>
                        </div>
                        <form>
                            <label class="default-label" for="title">Título do post</label>
                            <input class="default-input" type="text" name="title" id="title" value="${postValue[4]}" placeholder="Digite o título aqui...">

                            <label class="default-label" for="content">Conteúdo do post</label>
                            <textarea class="default-input edit-textarea" name="content" id="content" placeholder="Desenvolva o conteúdo do post aqui...">${postValue[6]}</textarea>

                            <div class="action-tools">
                                <button class="medium-btn close-modal" type="button">Cancelar</button>
                                <button class="primary-btn completed-submit" type="submit">Salva Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
                `);

                Form.checkInputs(".default-input", ".completed-submit", 2);
                Form.getModalFormValues(Api.updatePost, idPost);
                ModalFunctions.close(".close-modal");
            }
        });
    }

    static showConfirmDeletePost() {
        const allButtons = document.querySelectorAll(".delete-post");

        allButtons.forEach(button => {
            button.onclick = (e) => {
                const idPost = e.path[3].dataset.post;

                document.body.insertAdjacentHTML("beforeend", `
                <div class="modal">
                    <div class="modal-body">
                        <div class="header-modal">
                            <div class="user-info">
                                <h3>Confirmação de exclusão</h3>
                            </div>
                            <div class="user-tools">
                                <button class="close-btn close-modal"></button>
                            </div>
                        </div>
                        <h2>Tem certeza que deseja excluir este post?</h2>
                        <p>Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
                        <div class="delete-tools">
                            <button class="medium-btn close-modal" type="button">Cancelar</button>
                            <button class="alert-btn confirm-submit" type="submit">Sim, excluir este post</button>
                        </div>
                    </div>
                </div>
                `);

                ModalFunctions.close(".close-modal");
                ModalFunctions.checkChosenCondition(".confirm-submit", idPost);
            }
        });
    }
}

class ModalFunctions {

    static close = (btnClass) => {
        const modal = document.querySelector(".modal");
        document.querySelectorAll(btnClass).forEach(btn => btn.onclick = (e) => modal.remove());
    }

    static checkChosenCondition = (confirmButton, idPost) => {
        const button = document.querySelector(confirmButton);
        const modal = document.querySelector(".modal");

        button.onclick = async (e) => {

            const apiRequest = await Api.deletePost(idPost);

            if(apiRequest) {
                RenderHomePage.posts();
                Toast.successDeletePost();
                modal.remove();
            }
        }
    }
}