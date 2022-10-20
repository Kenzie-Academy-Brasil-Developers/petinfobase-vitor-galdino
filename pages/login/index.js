import { Api } from "../../scripts/apiRequests.js";
import { Global } from "../../scripts/globalScripts.js";

Global.checkInputs(".default-input", ".login-access", 0);
Global.getFormValues(".login-access", Api.loginRequest, "login");