from django.urls import path
from .views import *

urlpatterns = [
    path('', menus, name='menus'),
]
