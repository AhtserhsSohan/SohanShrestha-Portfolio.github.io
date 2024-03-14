const scriptURL =
    "https://script.google.com/macros/s/AKfycbzIxbpHa7aAh748mx7PmcWd4j84dLZXxHh6pgX022sANpytbJ6yZ0NTvv9Wt_w669702Q/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            msg.innerHTML = "Message Sent Successfully";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch((error) => console.error("Error!", error.message));
});