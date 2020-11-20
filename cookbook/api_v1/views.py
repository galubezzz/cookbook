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
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication


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

    # @action(methods=['get', 'patch'], detail=False, url_path=r'username/(?P<username>\w+)')
    # def get_by_username(self, request, username):
    #     # user = get_object_or_404(User, username=username)
    #     return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

    # @action(methods=['get', 'patch'], detail=False, url_path=r'token/(?P<token>\w+)')
    def get_queryset(self):
        queryset = self.queryset
        token = self.request.META.get('HTTP_AUTHORIZATION', None).split(" ")[1]
        existing_token = get_object_or_404(Token, key=token)
        user = existing_token.user

        if token:
            queryset = queryset.filter(id=user.id)
        return queryset

    def patch(self, request):
        token = self.request.META.get('HTTP_AUTHORIZATION', None).split(" ")[1]
        existing_token = get_object_or_404(Token, key=token)
        user = existing_token.user
        user.username = request.data["username"]
        user.email = request.data["email"]
        if 'password' in request.data.keys() and 'newPassword' in request.data.keys():
            if user.check_password(request.data['password']):
                user.set_password(request.data['newPassword'])
            else:
                return Response({"error": "Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
        user.save()
        return Response(status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by('-id')
    serializer_class = TagSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-id')
    authentication_classes = [TokenAuthentication, ]

    def get_queryset(self):
        queryset = self.queryset
        username = self.request.query_params.get('username', None)
        tag = self.request.query_params.get('tag', None)
        if username:
            queryset = queryset.filter(user_id__username=username)
        if tag:
            queryset = queryset.filter(tags__name=tag)

        # token = self.request.META.get('HTTP_AUTHORIZATION', None).split(" ")[1]
        # user = Token.objects.get(key=token).user
        if 'pk' in self.kwargs.keys():
            pk = self.kwargs['pk']
            queryset = queryset.filter(id=pk)
            return queryset

        # if token:
        #     queryset = queryset.filter(user_id=user.id)
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeSerializer
        if self.action == 'retrieve':
            return RecipeSerializer
        return RecipePostSerializer

    def update(self, request, *args, **kwargs):
        user = self.request.user
        pk = self.kwargs['pk']
        recipe = Recipe.objects.get(pk=pk)
        if recipe.user_id != user:
            return Response("Wrong user", status=status.HTTP_403_FORBIDDEN)
        else:
            serializer = RecipePostSerializer(instance=recipe, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('-id')
    serializer_class = IngredientSerializer


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all().order_by('-id')
    serializer_class = StepSerializer


class UnitsView(APIView):
    def get(self, request):
        units_dict = {}
        for unit_choice in Ingredient.UNIT_CHOICES:
            units_dict[unit_choice[0]] = unit_choice[1]
        return Response(units_dict)