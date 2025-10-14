from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework_simplejwt.tokens import AccessToken
from webapi.core.models.account import Account


class IsAdminOrReadOnly(BasePermission):
    """Allow safe methods to everyone; write operations require JWT with role 'admin'.

    Also sets request.account to the authenticated Account for downstream use.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        auth_header = request.headers.get('Authorization') or ''
        if not auth_header.startswith('Bearer '):
            return False
        token = auth_header.split(' ', 1)[1]
        try:
            access = AccessToken(token)
            account_id = access.get('user_id')
            if not account_id:
                return False
            try:
                account = Account.objects.get(pk=account_id)
            except Account.DoesNotExist:
                return False
            if account.role != 'admin':
                return False
            # Attach for later use in view
            setattr(request, 'account', account)
            return True
        except Exception:
            return False


