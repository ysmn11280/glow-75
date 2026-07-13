let currentUser = "";

const habits = document.querySelectorAll(".habit");

function chooseUser(user) {

    currentUser = user;

    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    document.getElementById("hello").innerHTML =
        "Welcome " + user + " 🤍";

    loadData();
}


function saveDay(){

    let score = 0;

    habits.forEach((habit, index)=>{

        if(habit.checked){
            score++;
        }

        localStorage.setItem(
            currentUser + "_habit_" + index,
            habit.checked
        );
    });


    let day =
    Number(localStorage.getItem(currentUser+"_day")) || 1;


    let streak =
    Number(localStorage.getItem(currentUser+"_streak")) || 0;


    if(score === 6){
        streak++;
    }
    else{
        streak = 0;
    }


    if(day < 75){
        day++;
    }


    localStorage.setItem(
        currentUser+"_day",
        day
    );


    localStorage.setItem(
        currentUser+"_streak",
        streak
    );


    localStorage.setItem(
        currentUser+"_notes",
        document.getElementById("notes").value
    );


    updateDisplay(score, streak, day);

    alert("Saved 🤍✨");
}



function loadData(){

    let score = 0;


    habits.forEach((habit,index)=>{

        let saved =
        localStorage.getItem(
            currentUser+"_habit_"+index
        );


        if(saved === "true"){
            habit.checked = true;
            score++;
        }
        else{
            habit.checked = false;
        }

    });



    let streak =
    Number(localStorage.getItem(currentUser+"_streak")) || 0;


    let day =
    Number(localStorage.getItem(currentUser+"_day")) || 1;


    document.getElementById("notes").value =
    localStorage.getItem(currentUser+"_notes") || "";


    updateDisplay(score, streak, day);

}



function updateDisplay(score, streak, day){

    document.getElementById("score").innerHTML =
    "Score: " + score + "/6";


    document.getElementById("streak").innerHTML =
    "🔥 Streak: " + streak + " days";


    document.getElementById("day").innerHTML =
    "Day " + day + " / 75";


    document.getElementById("bar").style.width =
    (score/6)*100 + "%";

}
