const CreateNewTodo = document.getElementById("CreateNewTodo");
const modal = document.getElementById('modal'); 
const submit = document.getElementById('submit');
const alarmInputs = document.querySelector(".alarmInputs");
let track = 1;
let colorarr = [];

function fullDate() {
    const date = new Date();
    minuites = date.getMinutes();
    if (minuites < 10) {
        minuites = "0" + minuites;
    }
    let FormatDate = (date.getHours() + ' : ' + minuites + '<br>' + date.getDay() +'/'+ date.getMonth() +'/'+ date.getFullYear());
    return FormatDate;
}
    



//code to make the current a active
// const current = document.querySelectorAll("a");
// for(let i = 0; i < current.length; i++){
//     if (window.location.href == current[i].href) {
//         current[i].classList.add("active");
//     }
// }



CreateNewTodo.addEventListener('click', () => {
    modal.showModal();
    modal.style.display = "block"; 
})


// =============================================================================
// Create new todo
// =============================================================================
submit.onclick = () =>{
    modal.close();
    modal.style.display = "none";
    FormatDate = fullDate();
   //an object to store value of id todocontent, id todotitle and id todocolor
    const todo = {
        title: document.getElementById("todotitle").value,
        color: document.getElementById("todocolor").value,
        // AlarmMonth: document.getElementById("AlarmMonth").value,
        // AlarmDay: document.getElementById("AlarmDay").value,
        // AlarmHour: document.getElementById("AlarmHour").value,
        // AlarmMin: document.getElementById("AlarmMin").value,
        date: fullDate()
    }
    //code to add todo item to local storage

    const newTodo = document.createElement("div");
    newTodo.classList.add("todoitem");
    newTodo.setAttribute("id", `todo${track}`);
    newTodo.style.outline = `1px solid ${todo.color}`;
    newTodo.innerHTML = `<p>${document.getElementById("todotitle").value}</p><span class="time">${FormatDate}</span></i><i class="fa-solid fa-pen-to-square" id="edit${track}" onclick="editTodo(this)" ></i><i class="fa-solid fa-circle-check" id="check${track}" onclick="checkTodo(this)"></i><i class="fa-solid fa-circle-minus" id="remove${track}" onclick="removeTodo(this)"></i>`;
    document.getElementById("todoitems").append(newTodo)
    /////////////////////////////////////

    const color = document.createElement("div"); 
    color.classList.add("accentcolor");
    color.setAttribute("id", `${todo.color}`);
    color.style.backgroundColor = `${todo.color}`;
    color.setAttribute("onclick", `filterColor(this)`);

    if (colorarr.includes(todo.color)) {
        console.log("already present");
    }
    else{
        document.getElementById("colorbox").append(color);
        colorarr.push(todo.color);
    }
    ////////////////////////////////////////////////////

    const colors = document.getElementsByClassName("accentcolor");
    localStorage.setItem("colors", JSON.stringify(colorarr));

    localStorage.setItem(`todo${track}`, JSON.stringify(todo));
    track++;
    document.getElementById("todotitle").value = "";
    document.getElementById("todocolor").value = "";

    const splash = document.querySelector("#splash");
    const todoitemss = document.getElementsByClassName("todoitem");
    if(todoitemss.length == 0){
        splash.style.display = "block";
    }
    else{
        splash.style.display = "none";
    }
}

//code to remove todo item
function removeTodo(btn){
    todo_number = btn.id.slice(6);
        const todo = document.getElementById(`todo${todo_number}`);
        todo.remove();
        localStorage.removeItem(`todo${todo_number}`);
        localStorage.removeItem(`check${todo_number}`);

        removecolor();
}   

// =============================================================================
// check behavior of todo item
// =============================================================================
let notchecked = true

//code to check todo item
function checkTodo(btn){
    if (notchecked) {
        todo_number = btn.id.slice(5);
        const todo = document.getElementById(`todo${todo_number}`);
        notchecked = !notchecked;
        todo.style.backgroundColor = "transparent";
        createBefore(todo.id);

        localStorage.setItem(`check${todo_number}`, JSON.stringify('checked'));  
        console.log(btn)
        btn.setAttribute("class", "fa-solid fa-circle-xmark");
    }   
    else if(!notchecked){
        todo_number = btn.id.slice(5);
        const todo = document.getElementById(`todo${todo_number}`);

        notchecked = !notchecked; 
        todo.style.backgroundColor = "#1A2227";
        removeBefore(todo.id);
        localStorage.setItem(`check${todo_number}`, JSON.stringify('notchecked'));      
        btn.setAttribute("class", "fa-solid fa-circle-check");
    }


}

//code to expand the todo list when clicked on the todo item
const todoitems = document.getElementById("todoitems");
todoitems.addEventListener("click", (e) =>{
    if(e.target.classList.contains("todoitem")){
        e.target.classList.toggle("active");
    }
    else if(e.target.classList.contains("fa-circle-minus")){
        e.target.parentElement.classList.toggle("active");
    }
})


// =============================================================================
// Re render the todo items when the page is reloaded
// =============================================================================
//current a should be active
// code to get the todo items from local storage
for(let i = 0; i < localStorage.length; i++){
    Dates = JSON.parse(localStorage.getItem(localStorage.key(i))).date;
    let trackindex = localStorage.key(i).slice(4);

    if (localStorage.key(i).includes("todo")) {
        const todo = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const newTodo = document.createElement("div");
        newTodo.classList.add("todoitem");
        newTodo.setAttribute("id", `${localStorage.key(i)}`);
        newTodo.style.outline = `1px solid ${todo.color}`;
        // newTodo.style.boxShadow = `0px 0px 5px ${todo.color}`;
        newTodo.innerHTML = `<p>${todo.title}</p> <span class="time">${Dates}</span><i class="fa-solid fa-pen-to-square" id="edit${trackindex}" onclick="editTodo(this)"></i> <i class="fa-solid fa-circle-check" id="check${trackindex}" onclick="checkTodo(this)"></i></i><i class="fa-solid fa-circle-minus" id="remove${trackindex}" onclick="removeTodo(this)"></div>`;
        document.getElementById("todoitems").append(newTodo)
        track = localStorage.length + 1;
        if (JSON.parse(localStorage.getItem(`check${trackindex}`)) == "checked") {
            const todo = document.getElementById(`todo${trackindex}`);
            todo.style.backgroundColor = "transparent";
            createBefore(todo.id);
        }
        else{
            const todo = document.getElementById(`todo${trackindex}`);
            todo.style.backgroundColor = "#1A2227";
            removeBefore(todo.id);
        }
    }
    const splash = document.querySelector("#splash");
    const todoitemss = document.getElementsByClassName("todoitem");
    if(todoitemss.length == 0){
        splash.style.display = "block";
    }
    else{
        splash.style.display = "none";
    }
}


if (localStorage.getItem("colors") != null) {
    colorarr = JSON.parse(localStorage.getItem("colors"));
    for (let i = 0; i < colorarr.length; i++) {
        const color = document.createElement("div");
        color.classList.add("accentcolor");
        color.setAttribute("id", `${colorarr[i]}`);
        color.style.backgroundColor = `${colorarr[i]}`;
        color.setAttribute("onclick", `filterColor(this)`);
        document.getElementById("colorbox").append(color);
    }
}

else{
    colorarr = [];
}

function filterColor(color){
    const todoitems = document.getElementsByClassName("todoitem");
    for(let i = 0; i < todoitems.length; i++){
        if (todoitems[i].style.outline.includes(color.id)) {
            todoitems[i].style.display = "grid";
        }
        else{
            todoitems[i].style.display = "none";
        }

    }
}

document.getElementById("none").onclick = () =>{
    const todoitems = document.getElementsByClassName("todoitem");
    for(let i = 0; i < todoitems.length; i++){
            todoitems[i].style.display = "grid";
    }
}

function removecolor(){
    const todoitems = document.getElementsByClassName("todoitem");
    if(todoitems.length == 0){
        const colors = document.getElementsByClassName("accentcolor");
        for(let i = 0; i < colors.length; i++){
            colors[i].remove();
        }
        colorarr = [];
        localStorage.removeItem("colors");
        window.location.reload();
    }
}

// =============================================================================
// code to toggle the before style tag when the todo item is checked
// =============================================================================

function createBefore(todo) {
    const style = document.createElement("style")
    style.innerHTML = `#${todo}::before{
        transform: scaleX(1);

    }`
    document.querySelector("head").appendChild(style)

}

function removeBefore(todo) {
    const style = document.createElement("style")
    style.innerHTML = `#${todo}::before{
        transform: scaleX(0);
    }`
    document.querySelector("head").appendChild(style)

}


// =============================================================================
// code to remove the before style tag when the todo item is removed
// =============================================================================
const beforeStyles = document.querySelectorAll("style");
for (let i = 0; i < beforeStyles.length; i++) {
    if (beforeStyles[i].innerHTML.includes("scaleX(0)")) {
        beforeStyles[i].remove();
    }    
}

// =============================================================================
// Dropdown for alarm
// =============================================================================
let dropped = false;
function dropdown(btn){
    if (!dropped) {
        alarmInputs.style.display = "flex";
        dropped = !dropped;
        btn.style.transform = "rotate(180deg)";
        btn.style.transition = "transform 0.5s ease-in-out";
    }
    else{
        alarmInputs.style.display = "none";
        dropped = !dropped;
        btn.style.transform = "rotate(0deg)";
        btn.style.transition = "transform 0.5s ease-in-out";
    }
}

// =============================================================================
// Deadline countdown calculator
// =============================================================================
let ring = false;
function alarmTodo(btn) {
    if (ring == false) {
        btn.classList.remove("fa-bell-slash");
        btn.classList.add("fa-bell");
        const todo = document.getElementById(`todo${btn.id.slice(5)}`);
        const bar = document.getElementById(`progress${btn.id.slice(5)}`);
        bar.style.display = "block";
        bar.style.backgroundColor = JSON.parse(localStorage.getItem(`todo${btn.id.slice(5)}`)).color;
        console.log();
        ring = !ring;
        bar.style.width = "20%";
        console.log( JSON.parse(localStorage.getItem(`todo${btn.id.slice(5)}`)).AlarmMonth)
    }
    else if(ring == true){
        btn.classList.remove("fa-bell");
        btn.classList.add("fa-bell-slash");
        const todo = document.getElementById(`todo${btn.id.slice(5)}`);
        const bar = document.getElementById(`progress${btn.id.slice(5)}`);
        bar.style.display = "none";
        ring = !ring;
    }

}
// =============================================================================
// edit the todo item
// =============================================================================
let edit = false;
function editTodo (btn) {
    if (edit == false) {
        btn.classList.remove("fa-pen-to-square");
        btn.classList.add("fa-floppy-disk");
        const todo = document.getElementById(`todo${btn.id.slice(4)}`);
        const title = todo.querySelector("p");
        title.setAttribute("contenteditable", "true");
        title.style.borderBottom = "1px solid white";
        edit = !edit;
        todo.style.boxShadow = `0px 0px 10px ${JSON.parse(localStorage.getItem(`todo${btn.id.slice(4)}`)).color}`;
    }
    else if(edit == true){
        btn.classList.remove("fa-floppy-disk");
        btn.classList.add("fa-pen-to-square");
        const todo = document.getElementById(`todo${btn.id.slice(4)}`);
        const title = todo.querySelector("p");
        title.setAttribute("contenteditable", "false");
        title.style.borderBottom = "none";
        console.log(JSON.parse(localStorage.getItem(`todo${btn.id.slice(4)}`)).title);
        localStorage.setItem(`todo${btn.id.slice(4)}`, JSON.stringify({title: title.innerHTML, color: JSON.parse(localStorage.getItem(`todo${btn.id.slice(4)}`)).color, date: JSON.parse(localStorage.getItem(`todo${btn.id.slice(4)}`)).date}));
        todo.style.boxShadow = `0px 0px 0px ${JSON.parse(localStorage.getItem(`todo${btn.id.slice(4)}`)).color}`;
        edit = !edit;
    }
}

// =============================================================================
// splash screen
// =============================================================================


    const splash = document.querySelector("#splash");
    const todoitemss = document.getElementsByClassName("todoitem");
    if(todoitemss.length == 0){
        splash.style.display = "block";
    }
    else{
        splash.style.display = "none";
    }
