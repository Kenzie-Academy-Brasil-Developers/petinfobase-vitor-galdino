import { Api } from "../../scripts/apiRequests.js";
import { Form } from "../../scripts/form.js";

Form.checkInputs(".default-input", ".login-access", 0);
Form.getFormValues(".login-access", Api.loginRequest, "login");