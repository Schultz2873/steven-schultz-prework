document.getElementById("activity4").addEventListener("click", activity4, false);


function activity4() {
    var students = ["Moe", "Larry", "Curly"];

    for (var i = 0; i < 3; i++) {
       students.push(prompt("Please enter the name of student " + (i + 1)));
    }

    for (var i = 0; i < students.length; i++) {
        console.log("The name of student " + (i + 1)  + " is " + students[i]);
    }

}