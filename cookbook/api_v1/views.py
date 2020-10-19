from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api_v1.serializers import UserSerializer, TagSerializer, RecipeSerializer, IngredientSerializer, StepSerializer
from webapp.models import Tag, Recipe, Ingredient, Step
from rest_framework import viewsets


class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny,]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by('-id')
    serializer_class = TagSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-id')
    serializer_class = RecipeSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('-id')
    serializer_class = IngredientSerializer


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all().order_by('-id')
    serializer_class = StepSerializer