from django.shortcuts import render
from .models import *


# Create your views here.

def menus(request):
    return render(request, 'menus\menus.html')
