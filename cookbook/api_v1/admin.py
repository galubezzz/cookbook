from django.contrib import admin
from webapp.models import Recipe, Ingredient, Step, Tag
# Register your models here.

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Step)
admin.site.register(Tag)
