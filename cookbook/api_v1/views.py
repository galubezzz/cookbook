from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api_v1.serializers import UserSerializer, TagSerializer, RecipeSerializer, IngredientSerializer, StepSerializer, RecipePostSerializer
from webapp.models import Tag, Recipe, Ingredient, Step
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'id': user.id,
            'token': token.key,
            'username': user.username,
            'is_admin': user.is_superuser,
            'is_staff': user.is_staff
        })


class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny,]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['get', 'patch'], detail=False, url_path=r'username/(?P<username>\w+)')
    def get_by_username(self, request, username):
        user = get_object_or_404(User, username=username)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by('-id')
    serializer_class = TagSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-id')

    def get_queryset(self):
        queryset = self.queryset
        token = self.request.META.get('HTTP_AUTHORIZATION', None).split(" ")[1]
        print(token)
        user = Token.objects.get(key=token).user

        if token:
            queryset = queryset.filter(user_id=user.id)
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeSerializer
        if self.action == 'retrieve':
            return RecipeSerializer
        return RecipePostSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('-id')
    serializer_class = IngredientSerializer


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all().order_by('-id')
    serializer_class = StepSerializer


class UnitsView(APIView):
    def get(self, request):
        units_dict = {}
        for unit_choise in Ingredient.UNIT_CHOICES:
            units_dict[unit_choise[0]] = unit_choise[1]
        return Response(units_dict)