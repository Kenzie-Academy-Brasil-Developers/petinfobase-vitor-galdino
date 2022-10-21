import { Api } from "../../scripts/apiRequests.js";
import { Form } from "../../scripts/form.js";

Form.checkInputs(".default-input", ".register-access", 1);
Form.getFormValues(".register-access", Api.registerRequest, "register");