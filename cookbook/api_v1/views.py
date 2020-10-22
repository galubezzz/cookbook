from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api_v1.serializers import UserSerializer, TagSerializer, RecipeSerializer, IngredientSerializer, StepSerializer
from webapp.models import Tag, Recipe, Ingredient, Step
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'is_admin': user.is_superuser,
            'is_staff': user.is_staff
        })

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