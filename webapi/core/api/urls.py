from django.db import router
from django.urls import path, include
from rest_framework import routers

from webapi.core.api.views.auth_view import RegisterView, LoginView
from webapi.core.api.views.event_view import EventViewSet

from webapi.core.api.views.order_view import CreateOrderView, ProcessPaymentView, CancelOrderView, CheckinTicketView
from webapi.core.api.views.ticket_view import TicketViewSet





router = routers.DefaultRouter()
router.register(r'tickets', TicketViewSet),
router.register(r'events', EventViewSet),
urlpatterns = [


    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),

    path('orders/create/', CreateOrderView.as_view()),
    path('orders/<int:order_id>/process_payment/', ProcessPaymentView.as_view()),
    path('orders/<int:order_id>/cancel/', CancelOrderView.as_view()),
    path('tickets/checkin/', CheckinTicketView.as_view()),
]
