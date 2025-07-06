from django.urls import path
from . import views

urlpatterns = [
    path("",views.api_overview,name='api_overview'),
    path("task-list/",views.task_list,name='task_list'),
    path("task-detail/<str:id>/",views.task_detail,name='task_detail'),
    path("task-create/",views.task_create,name='task_create'),
    path("task-update/<str:id>/",views.task_update,name='task_update'),
    path("task-delete/<str:id>/",views.task_delete,name='task_delete'),
]