from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api_v1.serializers import UserSerializer, TagSerializer, RecipeSerializer, IngredientSerializer, StepSerializer, \
    RecipePostSerializer, UserCreateSerializer
from webapp.models import Tag, Recipe, Ingredient, Step
from rest_framework import viewsets, filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.pagination import PageNumberPagination


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
            'is_staff': user.is_staff,
        })


class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny,]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = self.queryset
        username = self.request.query_params.get('username', None)
        if username:
            queryset = queryset.filter(username=username)
        # token = self.request.META.get('HTTP_AUTHORIZATION', None).split(" ")[1]
        # existing_token = get_object_or_404(Token, key=token)
        # user = existing_token.user
        #
        # if token:
        #     queryset = queryset.filter(id=user.id)
        return queryset

    def patch(self, request):
        user = request.user
        user.email = request.data.get("email", user.email)
        user.profile.about = request.data.get("about", user.profile.about)
        user.profile.pic = request.data.get("pic", user.profile.pic)

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
    search_fields = ['name', 'description', 'tags__name']
    filter_backends = (filters.SearchFilter,)
    queryset = Recipe.objects.all().order_by('-id')
    pagination_class = PageNumberPagination
    page_size = 20

    def get_queryset(self):
        queryset = Recipe.objects.all().order_by('-id')
        username = self.request.query_params.get('username', None)
        tag = self.request.query_params.get('tag', None)
        favorite = self.request.query_params.get('favorite', None)
        if username:
            queryset = queryset.filter(user_id__username=username)
        if tag:
            queryset = queryset.filter(tags__name=tag)
        if favorite and username:
            user = User.objects.get(username=username)
            queryset = user.profile.favorites.all().order_by('-id')
        elif favorite:
            queryset = self.request.user.profile.favorites.all().order_by('-id')


        if 'pk' in self.kwargs.keys():
            pk = self.kwargs['pk']
            queryset = queryset.filter(id=pk)
            return queryset

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


class AddFavoriteVIew(APIView):

    def post(self, request, pk=None):
        user = request.user
        recipe = get_object_or_404(Recipe, pk=pk)
        user.profile.favorites.add(recipe)
        return Response(data={"status": "OK"}, status=status.HTTP_201_CREATED)

    def get(self, request):
        user = request.user
        recipes = user.profile.favorites.all()
        serializer = RecipeSerializer(recipes, many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        user = request.user
        recipe = get_object_or_404(Recipe, pk=pk)
        user.profile.favorites.remove(recipe)
        return Response(status=status.HTTP_204_NO_CONTENT)