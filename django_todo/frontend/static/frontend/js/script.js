/**
 * Retrieves the value of a cookie by name.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Get CSRF token from cookies for AJAX requests
const csrftoken = getCookie('csrftoken');

// API endpoint base URL
let endPoint = 'http://127.0.0.1:8000/api';

/**
 * Builds and displays the task list in the DOM.
 * @param {Array} list - Array of task objects.
 */
function buildList(list) {
    $('#list-wrapper').text("");
    for (let i in list) {
        let title = `<span class="title">${list[i].title}</span>`;
        if (list[i].completed) {
            title = `<strike class="title">${list[i].title}</strike>`;
        }
        let item = `
            <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                <div style="flex:7">${title}</div>
                <div style="flex:1">
                    <button class="btn btn-sm btn-outline-info edit">Edit</button>
                </div>
                <div style="flex:1">
                    <button class="btn btn-sm btn-outline-dark delete">-</button>
                </div>
            </div>`;
        $('#list-wrapper').append(item);
    }
    
    // Attach event handlers for edit, delete, and strike/unstrike
    for (let i in list) {
        let editBtn = $('.edit').eq(i);
        let deleteBtn = $('.delete').eq(i);
        let titles = $('.title').eq(i);

        editBtn.on('click', function () {
            editItem(list[i]);
        });

        deleteBtn.on('click', function () {
            deleteItem(list[i]);
        });

        titles.on('click', function () {
            strikeUnstrike(list[i]);
        });
    }
}

// Holds the currently active task for editing
let activeTask;

/**
 * Populates the form with the selected task for editing.
 * @param {Object} item - The task object to edit.
 */
function editItem(item) {
    activeTask = item;
    $('#title').val(item.title);
}

/**
 * Sends a DELETE request to remove a task.
 * @param {Object} item - The task object to delete.
 */
function deleteItem(item) {
    $.ajax({
        url: `${endPoint}/task-delete/${item.id}/`,
        type: 'DELETE',
        success: function (response) {
            console.log(response);
            GetAList();
        }
    });
}

/**
 * Toggles the completed status of a task (strike/unstrike).
 * @param {Object} item - The task object to update.
 */
function strikeUnstrike(item) {
    $.ajax({
        url: `${endPoint}/task-update/${item.id}/`,
        type: 'POST',
        headers: { 'X-CSRFToken': csrftoken },
        contentType: 'application/json',
        data: JSON.stringify({ title: item.title, completed: !item.completed }),
        success: function (response) {
            console.log(response);
            GetAList();
        }
    });
}

/**
 * Fetches the list of tasks from the API and builds the list.
 */
function GetAList() {
    $.ajax({
        url: `${endPoint}/task-list`,
        type: 'GET',
        success: function (response) {
            buildList(response);
        }
    });
}

// Initial fetch of the task list
GetAList();

/**
 * Handles the form submission for creating or updating a task.
 */
$(document).ready(function () {
    $('#form').on('submit', function (e) {
        e.preventDefault();
        let title = $('#title').val();
        if (!title) {
            return alert("Task can't be null");
        }

        let url = `${endPoint}/task-create/`;
        if (activeTask) {
            url = `${endPoint}/task-update/${activeTask.id}/`;
        }
        activeTask = null;

        $.ajax({
            url: url,
            type: 'POST',
            headers: { 'X-CSRFToken': csrftoken },
            contentType: 'application/json',
            data: JSON.stringify({ title: title }),
            success: function (response) {
                console.log('Form submitted successfully');
                $('#title').val("");
                GetAList();
            }
        });
    });
});