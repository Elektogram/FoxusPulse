from django.db import models

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=200)  # Etkinlik başlığı
    date = models.DateField()  # Etkinlik tarihi (YYYY-MM-DD)
    time = models.TimeField()  # Etkinlik saati (HH:MM)
    
    def __str__(self):
        return f"{self.title} ({self.date} - {self.time})"