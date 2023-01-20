from django import template
from menus.models import *

register = template.Library()


@register.inclusion_tag('menus/menus_sidebar.html')
def draw_menu(main_menu):
    data = Fields.objects.select_related('menu_name').order_by('menu_name_id', 'field_name', 'branch_name')
    context = {'menus': data}

    return context
