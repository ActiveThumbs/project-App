const CreateNewTodo = document.getElementById("CreateNewTodo");
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');
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
const current = document.querySelectorAll("a");
for(let i = 0; i < current.length; i++){
    if (window.location.href == current[i].href) {
        current[i].classList.add("active");
    }
}



CreateNewTodo.addEventListener('click', () => {
    modal.showModal();
    modal.style.display = "block"; 
})

submit.onclick = () =>{
    modal.close();
    modal.style.display = "none";
    FormatDate = fullDate();
   //an object to store value of id todocontent, id todotitle and id todocolor
    const todo = {
        title: document.getElementById("todotitle").value,
        color: document.getElementById("todocolor").value,
        date: fullDate()
    }
    //code to add todo item to local storage

    console.log(FormatDate);
    console.log("sldaskndlkasjndoia");
    const newTodo = document.createElement("div");
    newTodo.classList.add("todoitem");
    newTodo.setAttribute("id", `todo${track}`);
    newTodo.style.outline = `1px solid ${todo.color}`;
    newTodo.innerHTML = `<p>${document.getElementById("todotitle").value}</p><span class="time">${FormatDate}</span><i class="fa-solid fa-circle-minus" id="remove${track}" onclick="removeTodo(this)"></i><i class="fa-solid fa-circle-check" id="check${track}" onclick="checkTodo(this)"></i>`;
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
        console.log(colorarr);
    }
    ////////////////////////////////////////////////////

    const colors = document.getElementsByClassName("accentcolor");
    localStorage.setItem("colors", JSON.stringify(colorarr));
    console.log(colors);

    //////////////////////////////////////////////////
    console.log(todo);
    console.log(track);
    localStorage.setItem(`todo${track}`, JSON.stringify(todo));
    track++;
    document.getElementById("todotitle").value = "";
    document.getElementById("todocolor").value = "";
}

//code to remove todo item
function removeTodo(btn){
    todo_number = btn.id.slice(6);
        const todo = document.getElementById(`todo${todo_number}`);
        todo.remove();
        localStorage.removeItem(`todo${todo_number}`);
        console.log(todo_number);
        removecolor();
}   

let notchecked = true

//code to check todo item
function checkTodo(btn){
    if (notchecked) {
        todo_number = btn.id.slice(5);
        const todo = document.getElementById(`todo${todo_number}`);
        console.log(btn.id);
        notchecked = !notchecked;
        todo.style.backgroundColor = "transparent";
        console.log(document.querySelector("head"))
        createBefore(todo.id);
        console.log(todo.id)
            
    }
    else{
        todo_number = btn.id.slice(5);
        const todo = document.getElementById(`todo${todo_number}`);
        console.log(btn.id);
        notchecked = !notchecked; 
        todo.style.backgroundColor = "#1A2227";
        removeBefore(todo.id);
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


//current a should be active
// code to get the todo items from local storage
for(let i = 0; i < localStorage.length; i++){
    Dates = JSON.parse(localStorage.getItem(localStorage.key(i))).date;
    let trackindex = localStorage.key(i).slice(4);
    console.log(localStorage.key(i));
    if (localStorage.key(i).includes("todo")) {
        const todo = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const newTodo = document.createElement("div");
        newTodo.classList.add("todoitem");
        newTodo.setAttribute("id", `${localStorage.key(i)}`);
        newTodo.style.outline = `1px solid ${todo.color}`;
        newTodo.innerHTML = `<p>${todo.title}</p> <span class="time">${Dates}</span><i class="fa-solid fa-circle-minus" id="remove${trackindex}" onclick="removeTodo(this)"></i> <i class="fa-solid fa-circle-check" id="check${trackindex}" onclick="checkTodo(this)"></i>`;
        document.getElementById("todoitems").append(newTodo)
        track = localStorage.length + 1;
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


console.log(colorarr);




function filterColor(color){
    const todoitems = document.getElementsByClassName("todoitem");
    console.log(todoitems);
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
    console.log(todoitems);
    for(let i = 0; i < todoitems.length; i++){
            todoitems[i].style.display = "grid";
    }
}



console.log(document.getElementsByClassName("todoitem"))
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
        transition: transform 0.5s ease-in-out;
    }`
    document.querySelector("head").appendChild(style)

}
    
