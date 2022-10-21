export class Permission {
    
    static userHasToken() {
        if (localStorage.getItem("userToken")) {
            location.replace("../home/index.html");
        } 
    }

    static userDontHaveToken() {
        if (!localStorage.getItem("userToken")) {
            location.replace("../login/index.html");
        } 
    }
}