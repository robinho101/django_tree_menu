from django.contrib import admin
from .models import *


# Register your models here.

class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)
    list_display_links = ('id', 'title',)
    list_filter = ('id', 'title',)
    search_fields = ('id', 'title',)


class FieldsAdmin(admin.ModelAdmin):
    list_display = ('id', 'field_name', 'branch_name', 'nest_name')
    list_display_links = ('id', 'field_name', 'branch_name', 'nest_name')
    list_filter = ('id', 'field_name', 'branch_name', 'nest_name')
    search_fields = ('id', 'field_name', 'branch_name', 'nest_name')


# Register your models here.
admin.site.register(Menu, MenuAdmin)
admin.site.register(Fields, FieldsAdmin)

admin.site.site_title = 'управление меню'
admin.site.site_header = 'управление меню'
