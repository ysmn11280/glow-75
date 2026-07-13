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


    updateDashboard(score, day);
    createCalendar(day);

}



function updateDashboard(score, day){

    let completed = day - 1;

    let percentage =
    Math.round((completed / 75) * 100);


    let best =
    Number(localStorage.getItem(currentUser + "_best"))
    || 0;


    if(score > best){

        localStorage.setItem(
        currentUser + "_best",
        score
        );

        best = score;
    }


    document.getElementById("completed")
    .innerHTML =
    "Days completed: " + completed + " / 75";


    document.getElementById("percentage")
    .innerHTML =
    "Progress: " + percentage + "%";


    document.getElementById("best")
    .innerHTML =
    "🏆 Best score: " + best + "/6";


    if(percentage >= 75){

        document.getElementById("message")
        .innerHTML =
        "✨ Amazing! Your glow up is almost complete";

    } 
    else if(percentage >= 25){

        document.getElementById("message")
        .innerHTML =
        "🌸 You are building your best self";

    } 
    else {

        document.getElementById("message")
        .innerHTML =
        "🤍 Every day counts. Keep going";
    }

}
function goBack(){

    document.getElementById("dashboard")
    .classList.add("hidden");

    document.getElementById("welcome")
    .classList.remove("hidden");

    currentUser = "";
}
function createCalendar(day){

    let calendar =
    document.getElementById("calendar");

    calendar.innerHTML = "";


    for(let i = 1; i <= 75; i++){

        let box =
        document.createElement("div");

        box.className = "day-box";

        box.innerHTML = i;


        if(i < day){

            box.classList.add("completed");

        }


        calendar.appendChild(box);

    }

}
