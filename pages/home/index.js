import { RenderHomePage } from "../../scripts/renders.js";
import { Permission } from "../../scripts/permissions.js";

// const refreshPage = () => !localStorage.getItem("userToken") ? location.reload() : false;
// refreshPage();

Permission.userDontHaveToken();

RenderHomePage.headerProfile();
RenderHomePage.posts();