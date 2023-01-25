import json
from django import template
from django.core.cache import cache
from menus.models import *

register = template.Library()


def cache_search(request): # кэш хранится полдня #
    user_req = json.loads(request.body)
    passed_names = set()
    if 'menu_name_to_delete' in user_req:  # если ключ есть, то извлекаем из кэша множество(set) , #
        # и удаляем переданное со страницы название меню по ключу #
        passed_names = cache.get('menu_name')
        passed_names.discard(user_req['menu_name_to_delete'].lower())
        cache.set('menu_name', passed_names, 43200)

    if 'menu_name' in user_req:  # тоже самое, только добавление меню #
        if cache.get('menu_name'):
            passed_names = cache.get('menu_name')
            passed_names.add(user_req['menu_name'].replace(' ', ''))
            cache.set('menu_name', passed_names, 43200)
        else:
            passed_names.add(user_req['menu_name'].replace(' ', ''))
            cache.set('menu_name', passed_names, 43200)

    return cache.get('menu_name')


@register.inclusion_tag('menus/template_tags_templates/for_all_menus.html', takes_context=True)
def draw_menu(context, main_menu):
    request = context['request']
    data = Fields.objects.select_related('menu_name').order_by('menu_name_id', 'field_name', 'branch_name')
    context = {'menus': data}

    if request.body:
        cache_search(request)
        # print(context['names'])
    context['names'] = cache.get('menu_name')
    print(context)
    return context


@register.inclusion_tag('menus/template_tags_templates/for_field.html', takes_context=True)
def field(context):
    request = context['request']
    menus_id = request.resolver_match.kwargs['menu_id']
    data = Fields.objects.select_related('menu_name').order_by('menu_name_id', 'field_name', 'branch_name')
    context = {'menus': data}

    if request.body:
        cache_search(request)

    context['names'] = cache.get('menu_name')
    context['menus_id'] = menus_id
    return context
