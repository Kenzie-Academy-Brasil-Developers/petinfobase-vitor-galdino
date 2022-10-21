export class Permission {
    
    static userHasToken() {
        if (localStorage.getItem("userToken")) {
            location.assign("../home/index.html");
        } 
    }

    static userDontHaveToken() {
        if (!localStorage.getItem("userToken")) {
            location.assign("../login/index.html");
        } 
    }
}