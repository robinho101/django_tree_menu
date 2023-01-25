from django.shortcuts import render
from .models import *


# Create your views here.

def menus(request):
    return render(request, 'menus/all_menus.html')


def field(request, menu_id, field_name):
    return render(request, 'menus/field.html')


