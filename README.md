# Django Todo App

A simple Todo application built with Django REST Framework for the backend and jQuery for the frontend. This project demonstrates basic CRUD (Create, Read, Update, Delete) operations using a RESTful API and a dynamic JavaScript interface.

## Features

- List all tasks
- Create new tasks
- Edit existing tasks
- Mark tasks as completed/uncompleted
- Delete tasks
- Responsive UI using Bootstrap and jQuery

## Tech Stack

- **Backend:** Django, Django REST Framework
- **Frontend:** HTML, CSS, Bootstrap, jQuery
- **Database:** SQLite (default Django setup)

## Project Structure

```
django_todo/
├── api/
│   ├── models.py        # Task model definition
│   ├── serializers.py   # Serializers for Task model
│   ├── views.py         # API views for CRUD operations
│   └── urls.py          # API endpoint routing
├── frontend/
│   └── static/
│       └── frontend/
│           └── js/
│               └── script.js  # jQuery logic for UI and AJAX
├── django_todo/
│   └── settings.py      # Django project settings
├── db.sqlite3           # SQLite database
└── manage.py
```

## How It Works

- The backend exposes REST API endpoints for listing, creating, updating, and deleting tasks.
- The Task model is a Django model managed by Django's migration system (created and updated via `manage.py makemigrations` and `manage.py migrate`).
- The frontend uses jQuery to make AJAX requests to these endpoints and dynamically updates the UI.
- CSRF protection is handled by retrieving the CSRF token from cookies and including it in AJAX requests.


## Screenshots
![To-Do List](https://github.com/user-attachments/assets/67d1c9a0-0780-46dd-84d5-9f51be2aa891)



## Acknowledgment
This project was built for learning purposes, inspired by a YouTube tutorial by Dennis Ivy.  
While the original used core JavaScript, I implemented the frontend using **jQuery**.
