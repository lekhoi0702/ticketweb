from django.db import router
from django.urls import path, include
from rest_framework import routers

from webapi.core.api.views.event_view import EventViewSet
from webapi.core.api.views.ticket_type_view import TicketTypeViewSet
from webapi.core.api.views.order_view import CreateOrderView, ProcessPaymentView, CancelOrderView, CheckinTicketView
from webapi.core.api.views.account_view import AccountViewSet
from webapi.core.api.views.user_view import UserViewSet
from webapi.core.api.views.order_viewset import OrderViewSet
from webapi.core.api.views.ticket_view import TicketViewSet
from webapi.core.api.views.auth_view import LoginView
from webapi.core.api.views.promotion_view import PromotionViewSet





router = routers.DefaultRouter()
router.register(r'tickets', TicketViewSet),
router.register(r'events', EventViewSet),
router.register(r'ticket-types', TicketTypeViewSet),
router.register(r'accounts', AccountViewSet),
router.register(r'users', UserViewSet),
router.register(r'orders', OrderViewSet),
router.register(r'promotions', PromotionViewSet),
urlpatterns = [


    path('', include(router.urls)),

    path('auth/login/', LoginView.as_view()),
    path('orders/create/', CreateOrderView.as_view()),
    path('orders/<int:order_id>/process_payment/', ProcessPaymentView.as_view()),
    path('orders/<int:order_id>/cancel/', CancelOrderView.as_view()),
    path('tickets/checkin/', CheckinTicketView.as_view()),
]
