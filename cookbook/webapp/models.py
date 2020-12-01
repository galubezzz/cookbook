from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class SoftDeleteManager(models.Manager):
    def active(self):
        return self.filter(is_deleted=False)

    def deleted(self):
        return self.filter(is_deleted=True)
# Create your models here.


class Tag(models.Model):
    name = models.CharField(max_length=255, verbose_name='Name', unique=True)
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Tags'


class Recipe(models.Model):
    name = models.CharField(max_length=255, verbose_name='Name')
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Description')
    pic = models.ImageField(upload_to='recipe_images', null=True, blank=True, verbose_name='Picture',
                            default='media/default.jpg')
    tags = models.ManyToManyField(Tag, blank=True, related_name="tag_in_recipe", verbose_name='Tag')
    user_id = models.ForeignKey(User, related_name="recipe_user", verbose_name="User", on_delete=models.CASCADE)
    cook_time = models.IntegerField(null=True, blank=True, verbose_name='Cooking time')

    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Recipes'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Recipe, blank=True, related_name="favorites", verbose_name="favorites")

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        profile, created = Profile.objects.get_or_create(user=instance)
        instance.profile.save()


class Step(models.Model):
    name = models.CharField(max_length=255, verbose_name='Name')
    step_number = models.IntegerField(verbose_name="Number of the step")
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Description')
    pic = models.ImageField(upload_to='step_images', null=True, blank=True, verbose_name='Picture',
                            default='media/default.jpg')
    recipe = models.ForeignKey(Recipe, related_name='steps_in_recipe', verbose_name="Recipe", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Steps'


class Ingredient(models.Model):
    UNIT_CHOICES = (
        ('gr', 'gramm'),
        ('cup', 'cup'),
        ('ml', 'ml'),
        ('pc', 'pc'),
        ('kg', 'kg'),
        ('tbs', 'tbs'),
        ('ts', 'ts'),
        ('oz', 'ounce'),
        ('lbs', 'pound'),
        ('gal', 'gallon'),
        ('pinch', 'pinch'),
    )
    name = models.CharField(max_length=255, verbose_name='Name')
    quantity = models.FloatField(null=True, blank=True, verbose_name='Quantity')
    unit = models.CharField(max_length=20, choices=UNIT_CHOICES, verbose_name='Unit')
    recipe = models.ForeignKey(Recipe, related_name='ingredients_in_recipe', verbose_name="Recipe", on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Ingredients'