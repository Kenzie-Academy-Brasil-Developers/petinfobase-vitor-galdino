import { Api } from "./apiRequests.js";
import { LocalStorage } from "./localStorage.js";
import { Logout } from "./logout.js";
import { Modal } from "./modals.js";

export class RenderHomePage {

    static async headerProfile() {
        const li = document.querySelector(".user-profile");
        const userRequest = await Api.getUserInfo();
        li.innerHTML = "";

        li.insertAdjacentHTML("beforeend",
            Card.profileContent(userRequest.avatar, userRequest.username));

        Logout.checkhomePage(".exit-btn");
        Modal.showCreatePost(".create-post");
    }

    static async posts() {
        const ul = document.querySelector(".cards-content");
        const postRequest = await Api.getPosts();
        const userId = LocalStorage.getUserId();
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        ul.innerHTML = "";

        postRequest.slice().reverse().forEach((elem, index) => {

            ul.insertAdjacentHTML("beforeend",
                Card.postContent(
                    elem.user.id,
                    elem.id,
                    elem.title,
                    elem.content,
                    elem.user.avatar,
                    elem.user.username,
                    months[elem.createdAt.split("-")[1] - 1],
                    elem.createdAt.split("-")[0]
                )
            );

            if (elem.user.id === userId) {
                const div = document.querySelectorAll(".user-info")[index];
                div.insertAdjacentHTML("afterend", Card.postTools());
            }
        });

        Modal.showEditPost();
        Modal.showConfirmDeletePost();
        Modal.showPost();
    }
}

class Card {

    static profileContent(avatar, username) {
        return `
        <img src="${avatar}" alt="${username} picture">
        <div class="user-options">
            <span>@${username}</span>
            <button class="exit-btn">Sair da conta</button>
        </div>`;
    }

    static postContent(userId, elemId, title, content, avatar, username, month, year) {
        return `
        <li data-user="${userId}" data-post="${elemId}" class="card">
            <div class="header-card">
                <div class="user-info">
                    <img src="${avatar}" alt="${username}">
                    <h4>${username}</h4>
                    <span>${month} de ${year}</span>
                </div>
            </div>
            <h2>${title}</h2>
            <p>${content}</p>
            <a class="link show-post">Acessar publicação</a>
        </li>
        `;
    }

    static postTools() {
        return `
        <div class="user-tools">
           <button class="outline-btn edit-post">Editar</button>
           <button class="medium-btn delete-post">Excluir</button>
        </div>
        `;
    }
}