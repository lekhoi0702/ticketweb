from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from webapi.core.api.serializer.auth_serializer import LoginSerializer


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        account = serializer.validated_data["account"]
        # Simple token-less auth: return minimal account info and a fake token
        token = f"token-{account.id}"
        return Response({
            "token": token,
            "account": {
                "id": account.id,
                "username": account.username,
                "role": getattr(account, 'role', None),
            }
        })


