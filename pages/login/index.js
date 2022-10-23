import { Api } from "../../scripts/apiRequests.js";
import { Form } from "../../scripts/form.js";
import { Permission } from "../../scripts/permissions.js";

// const refreshPage = () => localStorage.getItem("userToken") ? location.reload() : false;
// refreshPage();
// console.log(performance.getEntriesByType("navigation")[0].type)
let date = new Date()
console.log(date)
Permission.userHasToken();

Form.checkInputs(".default-input", ".login-access");
Form.getFormValues(".login-access", Api.loginRequest, "login");