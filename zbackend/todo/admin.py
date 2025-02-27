from django.contrib import admin
from .models import Event  # Event modelini içe aktar

# Basit kayıt:
# admin.site.register(Event)  # ÇİFT KAYIT OLMASIN!


# Alternatif: Daha gelişmiş admin arayüzü için
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time')  # Liste görünümünde gösterilecek alanlar
    search_fields = ('title',)  # Başlığa göre arama yapma
    list_filter = ('date',)  # Tarihe göre filtreleme
