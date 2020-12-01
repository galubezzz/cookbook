from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from api_v1 import views


router = routers.DefaultRouter()
router.register(r'tags', views.TagViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'steps', views.StepViewSet)
router.register(r'ingredients', views.IngredientViewSet)
router.register(r'users', views.UserViewSet)
app_name = 'api_v1'

urlpatterns = [
    path('', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(r'login/', views.LoginView.as_view(), name='api_token_auth'),
    path(r'register/', views.UserCreateView.as_view(), name='register'),
    path(r'units/', views.UnitsView.as_view(), name='units_list'),
    path(r'favorite/<int:pk>', views.AddFavoriteVIew.as_view(), name='create_favorite'),
    path(r'favorite/', views.AddFavoriteVIew.as_view(), name='create_favorite'),
]
