document.getElementById("activity3").addEventListener("click", activity3, false);

function activity3() {
    const name = prompt("Please enter your name: ");

    if (name.length > 4) {
        alert("The name " + name + " is greater than 4 characters.");
    } else {
        alert("The name " + name + " is less than 4 characters.");
    }

}