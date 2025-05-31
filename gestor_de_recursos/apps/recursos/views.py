from django.shortcuts import render
from rest_framework import  viewsets
from apps.recursos.models import Recurso
from apps.recursos.serializer import RecursoSerializer
from django.http import JsonResponse 
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
# recursos/views.py
class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer
    lookup_field = 'id'  
    permission_classes = [IsAuthenticated]
    
