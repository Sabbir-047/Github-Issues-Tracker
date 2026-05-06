document.getElementById('btn-signin').addEventListener('click', function(){
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const username = usernameField.value;
    const password = passwordField.value;
    if (username == "admin" && password == "admin123") {
        usernameField.value = "";
        passwordField.value = "";
        alert("Successfully Signed In");
        window.location.href = "index.html";
    }else{
        alert("Give proper credentials");
    }
});