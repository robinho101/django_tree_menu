from django.urls import path
from .views import *

urlpatterns = [
    path('all-menus/', menus, name='menus'),
    path('<int:menu_id>/<str:field_name>/', field, name='field'),
]
