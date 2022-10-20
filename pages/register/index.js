import { Api } from "../../scripts/apiRequests.js";
import { Global } from "../../scripts/globalScripts.js";

Global.checkInputs(".default-input", ".register-access", 1);
Global.getFormValues(".register-access", Api.registerRequest, "register");