from django.contrib import admin
from django.urls import include, path
from rest_framework import routers, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from apps.usuarios.views import LoginView
router = routers.DefaultRouter()


schema_view = get_schema_view(
   openapi.Info(
      title="Esta es la API de gestor de Recursos, donde podras gestionar tus recursos sin necesidad de acceder a un aplicativo.",
      default_version='v1',
      contact=openapi.Contact(email="guillentcarlos@gmail.com"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   #  path('api/', include('rest_framework.urls', namespace='rest_framework')), 
   #  path('v1/', include('router.urls')),
   path('admin/', admin.site.urls),
   path('recursos/', include('apps.recursos.urls')),
   path('usuarios/', include('apps.usuarios.urls')),
   path('peticiones/', include('apps.peticiones.urls')),
  path('login/', LoginView.as_view(), name='login'),  # 👈 Aquí definimos el endpoint
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] 

