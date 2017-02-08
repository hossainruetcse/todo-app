init();
function init() {
    makeTaskList();
    show("All");
}

var searchKey = "";
var selectedType = "All";
function setSearchKey(searchObj) {
    searchKey = searchObj.value;
    show(selectedType, searchKey);
}
function getDoc() {
    var showDoc = document.getElementById('showTask');
    showDoc.innerHTML = "";
    return showDoc;
}
function create() {
    var newTask = {};
    newTask.title = document.getElementById('title').value;
    newTask.discription = document.getElementById('discription').value;
    newTask.status = false;
    taskList.push(newTask);
    document.getElementById('addTask').style.display = "none";
    show(selectedType);
    document.getElementById('title').value = "";
    document.getElementById('discription').value = "";
}

function cancel() {
    document.getElementById('addTask').style.display = "none";
}
function addTask() {
    document.getElementById('addTask').style.display = "block";
}
function show(Selected,searchKey) {
    selectedType = Selected;
    var taskList = window.taskList;
    var showDoc = getDoc();
    for (var task in taskList) {
        if (!searchKey || taskList[task].title.indexOf(searchKey) != -1) {
            if (Selected === "Done") {
                if (taskList[task].status)
                    makeRow(task, showDoc);
            }
            else if (Selected === "Pending") {
                if (!taskList[task].status)
                    makeRow(task, showDoc);
            } else {
                makeRow(task, showDoc);
            }
        }
       
        
    }
}

function edit(index) {
    var title = document.getElementById('editTitle').value;
    var discription = document.getElementById('editDiscription').value;
    taskList[index].title = title;
    taskList[index].discription = discription;
    show(selectedType);
}

function makeEditHtml(index) {
    var  htmlCode = '<label for="title">Title :</label><input type="text" id="editTitle"value="'+taskList[index].title +'" style="margin: 13px;margin-left: 53px;padding: 7px;" /><br/>';
    htmlCode += '<label for="discription">Discription :</label><input type="text" id="editDiscription" value="' + taskList[index].discription + '" style="margin: 13px; padding: 7px;"/>';
    htmlCode += '<button style="float: right; padding: 12px;border-radius: 10px; margin: 20px; background-color: #4688f1;"onclick="edit('+index+')">Save</button>';
    return htmlCode;
}

function editDoc(index) {
    var htmlCode = makeEditHtml(index);
    document.getElementById(taskList[index].title + index).innerHTML = htmlCode;
    console.log(index);
}

function deleteDoc(index) {
    delete taskList[index];
    show(selectedType);
}

function editStatus(index,object) {
    //object.value = !object.value;
    if (taskList[index].status === true) {
        taskList[index].status = false;
        object.value = false;
    } else {
        taskList[index].status = true;
        object.value = true;
    }
    show(selectedType);
}

function makeRow(task, doc) {
    
    var div = document.createElement("div");
    div.style = "border-style: solid; border-width: 1px; padding: 10px; margin: 1px; background-color: rgb(224, 225, 225)";
    div.id = taskList[task].title + task;
    var row = doc.appendChild(div);
    row.innerHTML = "<h2>" + taskList[task].title + "</h2> <p>" + taskList[task].discription + "</p>" + '<button style="margin: 8px;padding: 10px;border-radius: 10px; background-color: #4688f1;" onclick="editDoc(' + task + ') ">Edit</button><button style="margin: 8px;padding: 10px;border-radius: 10px; background-color: #e8443b;"  onclick="deleteDoc(' + task + ')">Delete</button>';
    if (taskList[task].status)
        row.innerHTML += '<input type="checkbox" name="Status" value=' + taskList[task].status + ' onclick="editStatus(' + task + ',this)" checked>Done<br>';
    else 
        row.innerHTML += '<input type="checkbox" name="Status" value=' + taskList[task].status + ' onclick="editStatus(' + task + ',this)">Done<br>';
    //div.onclick = function () {
    //    console.log(task);
    //}
}

function makeTaskList() {
    var taskList = [{ "title": "task 1", "discription": "this is the first tast", "status": false }, { "title": "task 2", "discription": "this is the 2nd tast", "status": false }];
    window.taskList = taskList;
}

