# users/admin.py

from django.contrib import admin
from webapi.core.models.user import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Tùy biến hiển thị cho model User trong trang admin.
    """

    # 1. Hiển thị các cột trong danh sách User
    list_display = ('email', 'fullname', 'phone', 'gender', 'created_at')

    # 2. Thêm bộ lọc ở cột bên phải
    list_filter = ('gender', 'created_at')

    # 3. Thêm ô tìm kiếm
    search_fields = ('fullname', 'email', 'phone', 'account__username')  # Tìm kiếm cả username của Account liên quan

    # 4. Sắp xếp các trường trong trang chi tiết/chỉnh sửa cho gọn gàng
    fieldsets = (
        ('Thông tin tài khoản', {
            'fields': ('account',)
        }),
        ('Thông tin cá nhân', {
            'fields': ('fullname', 'email', 'phone', 'birthday', 'gender')
        }),
        ('Địa chỉ', {
            'fields': ('address',)
        }),
    )

    # 5. Các trường chỉ đọc, không cho phép chỉnh sửa
    readonly_fields = ('created_at',)

    # 6. Sắp xếp mặc định
    ordering = ('-created_at',)