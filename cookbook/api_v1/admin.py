from django.contrib import admin
from webapp.models import Recipe, Ingredient, Step, Tag, Profile
# Register your models here.


class StepInline(admin.StackedInline):
    model = Step


class IngredientInline(admin.StackedInline):
    model = Ingredient


class RecipeAdmin(admin.ModelAdmin):
    inlines = [StepInline, IngredientInline,]


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient)
admin.site.register(Step)
admin.site.register(Tag)
admin.site.register(Profile)
