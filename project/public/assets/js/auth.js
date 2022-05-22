var user = {}

function verifyAuth() {
    var stringUser = sessionStorage.USUARIO;

    if (stringUser == undefined) {
        window.location.replace('../sign-in.html');
    }

    user = JSON.parse(stringUser);
}

function signOut() {
    sessionStorage.clear();

    window.location.replace('../sign-in.html');
}