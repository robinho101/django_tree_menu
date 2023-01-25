from django.urls import path
from .views import *

urlpatterns = [
    path('all-menus/', menus, name='menus'),
    path('<int:menu_id>/<str:field_name>/', field, name='field'),
    path('<int:menu_id>/<str:field_name>/<str:branch_name>/', branch, name='branch'),
    path('<int:menu_id>/<str:field_name>/<str:branch_name>/<str:nest_name>/', nest, name='nest'),
]
