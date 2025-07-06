from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@ensure_csrf_cookie
def list(request):
    return render(request,'frontend/list.html')