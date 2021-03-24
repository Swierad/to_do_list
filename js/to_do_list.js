let $toDoInput; // input w którym wpisywana jest treść zadania do wykonania
let $alertInfo; // div informjujący o braku zadań na liście
let $addBtn; // przycisk dodawania nowego zadania
let $ulList // ul w którym wyświetlane będą zadania
let $newTask // nowo dodane zadanie

let $popup; // pobrany popup
let $popupInfo; // alert w popupie jeśli pusty tekst
let $editedTodo; //edytowany Todo
let $popupInput; // w z iputa w popupie
let $addPopupBtn; // przycisk zatwierdź
let $closeTodoBtn; // zamknij popup
let $idNumber = 0;
let $alltask




const main = () => {

    prepareDOMElements()
    prepareDOMEvents()

}


//pobieramy elementy
const prepareDOMElements = () => {
    $toDoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup ');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $alltask = $ulList.getElementsByTagName('li')
}


    //nasłuchujemy zdarzeń
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup)
    $addPopupBtn.addEventListener('click', changeTodo)
    $toDoInput.addEventListener('keyup', enterCheck)

}


const addNewTask = () => {
    if ($toDoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $toDoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $toDoInput.value = '';
        $alertInfo.innerText = '';
        createNewTool()

    } else {
        $alertInfo.innerText = 'Wpisz treść zadania';
    }
}

const enterCheck = () => {
    if(event.keyCode === 13){
        addNewTask();
    };
        
};

//tworzenie nowego zadania
const createNewTool = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel)

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'Edit';


    const deleteBtn= document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
}   

const checkClick = (event) => {
    if (event.target.closest('button').classList.contains('complete')) {
        event.target.closest('li').classList.toggle('completed');
        event.target.closest('button').classList.toggle('completed');

    } else if (event.target.closest('button').className === 'edit') {
        editTask(event)
    } else if (event.target.closest('button').className === 'delete') {
        deleteTask(event)
    }
}

//edycja zadania
const editTask = (event) => {
    const oldTodo = event.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value =  $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex'
}

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'podaj treść zadania';
    };
}


//zamykanie popupa
const closePopup = () => {
    $popup.style.display = 'none'
};

//usuwanie zadania
const deleteTask = (event) => {
    const deleteTodo = event.target.closest('li')
    deleteTodo.remove()

    if ($alltask.length == 0) {
        $alertInfo.innerText = "brak zadań na liście"
    }
} 

document.addEventListener('DOMContentLoaded', main);