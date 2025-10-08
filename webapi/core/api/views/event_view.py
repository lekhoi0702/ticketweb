from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from drf_yasg.utils import swagger_auto_schema

from webapi.core.api.serializer.serializers import EventSerializer
from webapi.core.models.event import Event
from webapi.core.models.ticket import Ticket


# =============================
# CREATE + LIST
# =============================
# class EventListCreateView(APIView):
#     @swagger_auto_schema(
#         operation_description="Lấy danh sách tất cả sự kiện",
#         responses={200: Serializer(many=True)}
#     )
#     def get(self, request):
#         events = Event.objects.all().order_by('-created_at')
#         ser = Serializer(events, many=True)
#         return Response(ser.data)
#
#     @swagger_auto_schema(
#         operation_description="Tạo sự kiện mới",
#         request_body=Serializer,
#         responses={201: Serializer()}
#     )
#     def post(self, request):
#         ser = Serializer(data=request.data)
#         if ser.is_valid():
#             ser.save()
#             return Response(ser.data, status=status.HTTP_201_CREATED)
#         return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
#
# class EventDetailView(APIView):
#     @swagger_auto_schema(
#         operation_description="Xem chi tiết sự kiện",
#         responses={200: Serializer()}
#     )
#     def get(self, request, pk):
#         try:
#             event = Event.objects.get(pk=pk)
#             ser = Serializer(event)
#             return Response(ser.data)
#         except Event.DoesNotExist:
#             return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
#
#     @swagger_auto_schema(
#         operation_description="Cập nhật sự kiện",
#         request_body=Serializer,
#         responses={200: Serializer()}
#     )
#     def put(self, request, pk):
#         try:
#             event = Event.objects.get(pk=pk)
#         except Event.DoesNotExist:
#             return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
#
#         ser = Serializer(event, data=request.data)
#         if ser.is_valid():
#             ser.save()
#             return Response(ser.data)
#         return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     @swagger_auto_schema(operation_description="Xóa sự kiện")
#     def delete(self, request, pk):
#         try:
#             event = Event.objects.get(pk=pk)
#             event.delete()
#             return Response({"message": "Event deleted"}, status=status.HTTP_204_NO_CONTENT)
#         except Event.DoesNotExist:
#             return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer