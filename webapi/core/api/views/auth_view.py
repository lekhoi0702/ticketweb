from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from webapi.core.api.serializer.auth_serializer import RegisterSerializer, LoginSerializer

class RegisterView(APIView):
    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response({"message": "Register success"}, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        ser = LoginSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

        account = ser.validated_data["account"]
        refresh = RefreshToken.for_user(account)
        return Response({
            "username": account.username,
            "role": account.role,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })
