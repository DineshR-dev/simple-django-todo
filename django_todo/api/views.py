from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import task_serializer


# Returns a list of available API endpoints.
@api_view(['GET'])
def api_overview(request):
    api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:id>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:id>/',
		'Delete':'/task-delete/<str:id>/',
    }
    return Response(api_urls)


# Returns a list of all tasks.
@api_view(['GET'])
def task_list(request):
    list_all = Task.objects.all()
    list_all = task_serializer(list_all,many=True)
    return Response(list_all.data)
    

# Returns details of a single task by ID
@api_view(['GET'])
def task_detail(request,id):
    list_item = get_object_or_404(Task,id=id)
    list_item = task_serializer(list_item,many=False)
    return Response(list_item.data)
    

# Creates a new task
@api_view(['POST'])
def task_create(request):
    Taskserz = task_serializer(data=request.data)
    if Taskserz.is_valid():
        Taskserz.save()
        return Response(Taskserz.data)
    else:
        return Response(Taskserz.errors)


# Updates an existing task
@api_view(['POST'])
def task_update(request,id):
    task_instance = get_object_or_404(Task, id=id)
    Taskserz = task_serializer(instance=task_instance, data=request.data)

    if Taskserz.is_valid():
        Taskserz.save()
        return Response(Taskserz.data)
    else:
        return Response(Taskserz.errors)


# Deletes a task
@api_view(['DELETE'])
def task_delete(request,id):
    task = get_object_or_404(Task, id=id)
    task.delete()
    return Response({'message': 'Task deleted successfully'})