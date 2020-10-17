from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from api_v1 import views

router = routers.DefaultRouter()

app_name = 'api_v1'

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', obtain_auth_token, name='api_token_auth')
]
