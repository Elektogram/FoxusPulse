from django.contrib import admin
from django.urls import path
from todo.views import event_list, event_detail
from todo.views import chat_with_gpt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', event_list),  # Tüm etkinlikleri listeler veya yeni ekler
    path('api/events/<int:event_id>/', event_detail),  # Tekil etkinlik işlemleri (GET, PUT, DELETE)
    path("api/chat/", chat_with_gpt, name="chat_with_gpt"),


]
