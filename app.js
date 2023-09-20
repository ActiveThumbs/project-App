const CreateNewTodo = document.getElementById("CreateNewTodo");
const modal = document.getElementById('modal');
const submit = document.getElementById('submit');
let track = 1;
let colorarr = [];
const date = new Date();
minuites = date.getMinutes();
if (minuites < 10) {
    minuites = "0" + minuites;
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
   //an object to store value of id todocontent, id todotitle and id todocolor
    const todo = {
        title: document.getElementById("todotitle").value,
        color: document.getElementById("todocolor").value
    }
    //code to add todo item to local storage

    const newTodo = document.createElement("div");
    newTodo.classList.add("todoitem");
    newTodo.setAttribute("id", `todo${track}`);
    newTodo.style.outline = `1px solid ${todo.color}`;
    newTodo.innerHTML = `<p>${document.getElementById("todotitle").value}</p><span class="time">${date.getHours() + ' : ' + minuites + '<br>' + date.getDay() +'/'+ date.getMonth() +'/'+ date.getFullYear()}</span><i class="fa-solid fa-circle-minus" id="remove${track}" onclick="removeTodo(this)"></i>`;
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

    let trackindex = localStorage.key(i).slice(4);
    console.log(localStorage.key(i));
    if (localStorage.key(i).includes("todo")) {
        const todo = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const newTodo = document.createElement("div");
        newTodo.classList.add("todoitem");
        newTodo.setAttribute("id", `${localStorage.key(i)}`);
        newTodo.style.outline = `1px solid ${todo.color}`;
        newTodo.innerHTML = `<p>${todo.title}</p> <span class="time">${date.getHours() + ' : ' + minuites + '<br>' + date.getDay() +'/'+ date.getMonth() +'/'+ date.getFullYear()}</span><i class="fa-solid fa-circle-minus" id="remove${trackindex}" onclick="removeTodo(this)"></i>`;
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
        const col = document.getElementsByClassName("accentcolor")
        const citem = document.getElementsByClassName("todoitem")
    
        for(let i = 0; i < col.length; i++){
            let count = 0;
            for(let j = 0; j < citem.length; j++){
                if (citem[j].style.outline.includes(col[i].id)) {
                    count++;
                }
            }
            if (count == 0) {
                col[i].remove();
                const index = colorarr.indexOf(col[i].id);
                console.log(index);
                console.log(colorarr.splice(index, col[i].id.length - 1))

                // localStorage.setItem("colors", JSON.stringify(colorarr));
            }


        }
    }