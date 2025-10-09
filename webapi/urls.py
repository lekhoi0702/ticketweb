from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.shortcuts import redirect 

schema_view = get_schema_view(
    openapi.Info(title="TicketWeb API", default_version='v1', description="API backend TicketWeb"),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

def redirect_to_swagger(request):
    return redirect('schema-swagger-ui')

urlpatterns = [
	path('', redirect_to_swagger),
    path('admin/', admin.site.urls),
    path('api/', include('webapi.core.api.urls')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0)),
	path('accounts/', include('django.contrib.auth.urls')),
]
