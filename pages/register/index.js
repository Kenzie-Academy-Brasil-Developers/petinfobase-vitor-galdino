import { Api } from "../../scripts/apiRequests.js";
import { Form } from "../../scripts/form.js";
import { Permission } from "../../scripts/permissions.js";

const refreshPage = () => localStorage.getItem("userToken") ? location.reload() : false;
refreshPage();

Permission.userHasToken();

Form.checkInputs(".default-input", ".register-access");
Form.getFormValues(".register-access", Api.registerRequest, "register");