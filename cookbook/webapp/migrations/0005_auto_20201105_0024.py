# Generated by Django 3.1.2 on 2020-11-05 00:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('webapp', '0004_auto_20201104_0621'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='recipe_user', to='auth.user', verbose_name='User'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredient_in_recipe', to='webapp.recipe', verbose_name='Recipe'),
        ),
        migrations.AlterField(
            model_name='step',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='step_in_recipe', to='webapp.recipe', verbose_name='Recipe'),
        ),
    ]