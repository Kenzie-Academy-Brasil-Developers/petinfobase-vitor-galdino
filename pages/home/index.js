import { RenderHomePage } from "../../scripts/renders.js";
import { Permission } from "../../scripts/permissions.js";

Permission.userDontHaveToken();

RenderHomePage.headerProfile();
RenderHomePage.posts();