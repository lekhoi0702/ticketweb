from rest_framework import serializers
from webapi.core.models.account import Account
from webapi.core.models.user import User
from django.contrib.auth.hashers import make_password, check_password


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(write_only=True)
    fullname = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=15, required=False)

    def validate_username(self, value):
        if Account.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):

        account = Account.objects.create(
            username=validated_data["username"],
            password=make_password(validated_data["password"]),
        )

        User.objects.create(
            account=account,
            fullname=validated_data["fullname"],
            email=validated_data["email"],
            phone=validated_data.get("phone"),
        )
        return account


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            account = Account.objects.get(username=data["username"])
        except Account.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password")

        if not check_password(data["password"], account.password):
            raise serializers.ValidationError("Invalid username or password")

        data["account"] = account
        return data
