from django.db import models


class SoftDeleteManager(models.Manager):
    def active(self):
        return self.filter(is_deleted=False)

    def deleted(self):
        return self.filter(is_deleted=True)
# Create your models here.


class Ingredient(models.Model):
    UNIT_CHOICES = (
        ('gr', 'gramm'),
        ('cup', 'cup'),
        ('ml', 'ml')
    )
    name = models.CharField(max_length=255, verbose_name='Name')
    quantity = models.TextField(max_length=100, null=True, blank=True, verbose_name='Quantity')
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Ingredients'


class Tag(models.Model):
    name = models.CharField(max_length=255, verbose_name='Name')
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Tags'


class Step(models.Model):
    name = models.CharField(max_length=255, verbose_name='Name')
    step_number = models.IntegerField(verbose_name="Number of the step")
    pic = models.ImageField(upload_to='step_images', null=True, blank=True, verbose_name='Picture')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Steps'


class Recipe(models.Model):
    name = models.CharField(max_length=255, verbose_name='Name')
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Description')
    pic = models.ImageField(upload_to='recipe_images', null=True, blank=True, verbose_name='Picture')
    tags = models.ManyToManyField(Tag, blank=True, related_name="tag_in_recipe", verbose_name='Tag')
    ingredients = models.ForeignKey(Ingredient, related_name="ingredient_in_recipe", verbose_name='Ingredients',
                                    on_delete=models.CASCADE)
    steps = models.ForeignKey(Step, related_name="step_in_recipe", verbose_name="Steps", on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Recipes'
