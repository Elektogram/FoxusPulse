from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Event
from .serializers import EventSerializer
import openai # type: ignore
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import Event
import logging

logger = logging.getLogger(__name__)

# Tüm etkinlikleri listeleme ve yeni etkinlik oluşturma
@api_view(['GET', 'POST'])
def event_list(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Belirli bir etkinliği GET, PUT, DELETE işlemleri
@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        event.delete()
        return Response({'message': 'Event deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# OpenAI API Key:FoxusPulse(sk-LLE0-xHTm5b6t4X4F40N4xCmw19YX_rw8E7nY-zjMmT3BlbkFJ2YHGlwIk3LJTeAiF1bVBYlIhfJJFczltKo8Yk_LHQA)
openai.api_key = "sk-LLE0-xHTm5b6t4X4F40N4xCmw19YX_rw8E7nY-zjMmT3BlbkFJ2YHGlwIk3LJTeAiF1bVBYlIhfJJFczltKo8Yk_LHQA"

# AI işlemleri
@csrf_exempt
def chat_with_gpt(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")
            today_date = datetime.today().date()

            if not user_message:
                return JsonResponse({"error": "Mesaj boş olamaz!"}, status=400)
            
            # 1️⃣ Kullanıcı sorgusunu GPT'ye gönder, hangi veriyi çekmemiz gerektiğini sor
            response = openai.ChatCompletion.create(

                # GPT MODELİ BELLİ OLUNCA DEĞİŞTİR !!!
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Sen bir takvim asistanısın. Kullanıcının takvimiyle ilgili sorduğu soruyu analiz et ve hangi verinin çekileceğini JSON formatında döndür."},
                    {"role": "user", "content": user_message}
                ]
            )


            logger.error(f"GPT Yanıtı: {response}")  # OpenAI API'nin cevabını logla

            # 2️⃣ GPT’den gelen JSON çıktısını al (Hangi verinin çekileceği belirleniyor)
            query_json = json.loads(response["choices"][0]["message"]["content"])

            # JSON formatında ne istendiğine göre veri çekelim
            if query_json.get("query_type") == "schedule":
                date = query_json.get("date", str(today_date))
                events = Event.objects.filter(date=date)

                event_data = [{"time": str(event.time), "event": event.title} for event in events]

                # 3️⃣ Çekilen veriyi GPT’ye gönder ve kullanıcının sorusuna uygun bir yanıt oluştur
                response = openai.ChatCompletion.create(
                    
                    # GPT MODELİ BELLİ OLUNCA DEĞİŞTİR !!!
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "Sen bir takvim asistanısın. Kullanıcının sorduğu soruya verilen takvim verilerine göre en uygun cevabı oluştur."},
                        {"role": "user", "content": f"Kullanıcı şu soruyu sordu: '{user_message}'. İşte takvim verileri: {json.dumps(event_data)}"}
                    ]
                )

                chat_response = response["choices"][0]["message"]["content"]

                # 4️⃣ React'e JSON formatında geri döndür
                return JsonResponse({
                    "events": event_data,
                    "chat_response": chat_response
                }, status=200)

        except json.JSONDecodeError:
            logger.error("JSON Hatası: Gönderilen veri JSON formatında değil!")
            return JsonResponse({"error": "Geçersiz JSON formatı!"}, status=400)

        except Exception as e:
            logger.error(f"Chat işleminde hata: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Invalid request"}, status=400)