from django.db import models


# Create your models here.

class Menu(models.Model):
    title = models.CharField(max_length=150, verbose_name='наименование')

    class Meta:
        verbose_name = 'Меню'
        verbose_name_plural = 'Меню'

    def __str__(self):
        return self.title


class Fields(models.Model):
    field_name = models.CharField(max_length=150, verbose_name='название поля')
    branch_name = models.CharField(max_length=150, verbose_name='название ветки')
    nest_name = models.CharField(max_length=150, verbose_name='название вложенности')
    menu_name = models.ForeignKey(Menu, on_delete=models.RESTRICT)

    class Meta:
        verbose_name = 'Поле меню'
        verbose_name_plural = 'Поля меню'

    def __str__(self):
        return 'Поле: ' + self.field_name


