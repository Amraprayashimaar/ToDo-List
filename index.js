let input = document.querySelector("#Task");
let button = document.querySelector("#addBtn");
let list = document.querySelector("#List");

button.addEventListener("click",()=>{
   
let task=input.value;

if(task=== ""){
    alert("please enter something");
}else{
    let node=document.createElement("li");
    node.innerHTML = input.value;
    list.appendChild(node);


    let dlt = document.createElement("span");
    dlt.innerHTML = "\u00d7";
    node.appendChild(dlt);
   
    node.querySelector("span").addEventListener("click",function(){
        node.remove()
    }
    )
    
}
input.value="";


});
function addTodo(){
let db;
let request = indexedDB.open('todoDB',1);

request.onerror=function(event){
    console('Error opening database:',event.target.error);
};

request.onsuccess=function(event){
    console.log('database opened');
    db=event.target.result;
    displayList();

};

request.onupgradeneeded=function(event){
    console.log('Database upgrade needed');
    db=event.target.result;
    let objectStore = db.createObjectStore('todos',{
        keyPath:'Id',
        autoIncrement:true});

}
};


function addTodo(){
    
    let title = document.querySelector("Task").value;
    let transaction = db.transaction(['todos'],
'readwrite');
let objectStore = transaction.objectStore('todos');
    
    let newItem = {
       
        title,
        complete:false
    };
    let request = objectStore.add(newItem);

    request.onsuccess=function(event){
        console.log('todo item added');
        displayList();
    }
    request.onerror=function(event){
        console.error('Error adding todoitem:',event.target.error);
    };
}
function displayTodoitems(){
    let transaction=db.transaction(['todos'],'readonly');
    let objectStore=transaction.objectStore('todos');
    let list = document.querySelector('List');
    list.innerHTML='input.value';

    objectStore.openCursor().onsuccess = function(event){
        let cursor = event.target.result;
        if(cursor){
            let node=document.createElement('li');
            list.textContent=`${cursor.value.title}`;
            list.appendChild(li);
            cursor.continue();
        }
    };
}


