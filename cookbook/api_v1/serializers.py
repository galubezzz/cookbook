from django.contrib.auth.models import User
from webapp.models import Ingredient, Step, Tag, Recipe
from rest_framework import serializers, fields

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.first_name)
        if validated_data.get('password'):
            instance.set_password(validated_data.get('password'))
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')


class TagSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:tag-detail')

    class Meta:
        model = Tag
        fields = ('url', 'id', 'name')


class IngredientSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:ingredient-detail')
    recipe_url = serializers.HyperlinkedRelatedField(view_name='api_v1:recipe-detail', source='recipe', read_only=True)

    class Meta:
        model = Ingredient
        fields = ('url', 'id', 'name', 'quantity', 'unit', 'recipe', 'recipe_url')


class StepSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:step-detail')
    recipe_url = serializers.HyperlinkedRelatedField(view_name='api_v1:recipe-detail', source='recipe', read_only=True)

    class Meta:
        model = Step
        fields = ('url', 'id', 'name', 'step_number', 'description', 'pic', 'recipe', 'recipe_url')


class RecipeSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:recipe-detail')
    # ingredients = serializers.HyperlinkedRelatedField(view_name='api_v1:ingredient-detail', source='ingredient', read_only=True)
    ingredient_in_recipe = IngredientSerializer(many=True, read_only=True)
    step_in_recipe = StepSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = ('url', 'id', 'name', 'description', 'pic', 'tags', 'ingredient_in_recipe', 'step_in_recipe')


class RecipePostSerializer(serializers.ModelSerializer):
    tags = fields.CharField(required=False)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'pic', 'tags')

    def create(self, validated_data):
        if 'tags' not in validated_data.keys():
            recipe = Recipe.objects.create(**validated_data)
            return recipe
        tags_data = validated_data.pop('tags')
        tags_list = tags_data.split(",")
        recipe = Recipe.objects.create(**validated_data)

        for tag in tags_list:
            new_tag, created = Tag.objects.get_or_create(name=tag)
            recipe.tags.add(new_tag)
        return recipe

