from drf_yasg.openapi import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from drf_yasg import openapi

from rest_framework import status

from webapi.core.api.serializer.serializers import CreateOrderSerializer, ProcessPaymentSerializer, \
    CancelOrderSerializer, CheckinSerializer
from webapi.core.service import order_service


class CreateOrderView(APIView):
    @swagger_auto_schema(
        operation_description="Tạo đơn hàng mới",
        request_body=CreateOrderSerializer,
        responses={
            201: openapi.Response("Order created", CreateOrderSerializer),
            400: "Bad Request"
        }
    )
    def post(self, request):
        ser = CreateOrderSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        data = ser.validated_data
        try:
            result = order_service.create_order(
                data['user_id'], data['event_id'], data['items'], data.get('promotion_code')
            )
            return Response(result, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProcessPaymentView(APIView):
    @swagger_auto_schema(
        operation_description="Xử lý thanh toán đơn hàng",
        request_body=ProcessPaymentSerializer,
        manual_parameters=[
            openapi.Parameter(
                "order_id",
                openapi.IN_PATH,
                description="ID của đơn hàng",
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        responses={200: "Payment success", 400: "Error"}
    )
    def post(self, request, order_id):
        ser = ProcessPaymentSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            order_service.process_payment(order_id, ser.validated_data['payment_method'])
            return Response({"message": "Payment processed"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CancelOrderView(APIView):
    @swagger_auto_schema(
        operation_description="Hủy đơn hàng",
        request_body=CancelOrderSerializer,
        manual_parameters=[
            openapi.Parameter(
                "order_id",
                openapi.IN_PATH,
                description="ID của đơn hàng",
                type=openapi.TYPE_INTEGER,
                required=True
            )
        ],
        responses={200: "Order cancelled", 400: "Error"}
    )
    def post(self, request, order_id):
        ser = CancelOrderSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            order_service.cancel_order(order_id, ser.validated_data['reason'])
            return Response({"message": "Order cancelled"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CheckinTicketView(APIView):
    @swagger_auto_schema(
        operation_description="Checkin vé theo mã code",
        request_body=CheckinSerializer,
        responses={
            200: openapi.Response("Checkin result"),
            400: "Error"
        }
    )
    def post(self, request):
        ser = CheckinSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            result = order_service.checkin_ticket(ser.validated_data['ticket_code'])
            return Response(result)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
