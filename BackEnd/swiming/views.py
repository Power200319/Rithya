from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import About, AboutDetail, Gallery, Program, Schedule, Testimonial, Hero, Contact
from .serializers import (
    AboutSerializer, AboutDetailSerializer, GallerySerializer, ProgramSerializer,
    ScheduleSerializer, TestimonialSerializer, HeroSerializer, ContactSerializer
)

class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class AboutDetailViewSet(viewsets.ModelViewSet):
    queryset = AboutDetail.objects.all()
    serializer_class = AboutDetailSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Authentication endpoints
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Login endpoint that returns authentication token"""
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'email': user.email
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout endpoint that deletes the user's token"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out'})
    except:
        return Response({'error': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Get current user information"""
    return Response({
        'user_id': request.user.id,
        'username': request.user.username,
        'email': request.user.email,
        'is_staff': request.user.is_staff,
        'is_superuser': request.user.is_superuser
    })

# Public endpoints (no authentication required)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_about_details(request):
    """Get all about section details"""
    about_items = About.objects.all()
    serializer = AboutSerializer(about_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_about_detail_items(request):
    """Get all about detail items"""
    about_detail_items = AboutDetail.objects.all()
    serializer = AboutDetailSerializer(about_detail_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_gallery_by_category(request, category):
    """Get gallery items by category"""
    gallery_items = Gallery.objects.filter(category=category)
    serializer = GallerySerializer(gallery_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_programs_by_level(request, level):
    """Get programs by level"""
    programs = Program.objects.filter(level=level)
    serializer = ProgramSerializer(programs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_gallery(request):
    """Get all gallery items"""
    gallery_items = Gallery.objects.all()
    serializer = GallerySerializer(gallery_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_programs(request):
    """Get all programs"""
    programs = Program.objects.all()
    serializer = ProgramSerializer(programs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_schedules(request):
    """Get all schedules"""
    schedules = Schedule.objects.all()
    serializer = ScheduleSerializer(schedules, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_heroes(request):
    """Get all heroes"""
    heroes = Hero.objects.all()
    serializer = HeroSerializer(heroes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_contact_info(request):
    """Get contact information"""
    try:
        contact = Contact.objects.first()
        if contact:
            serializer = ContactSerializer(contact)
            return Response(serializer.data)
        else:
            return Response({"message": "No contact information found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_testimonials(request):
    """Get all testimonials"""
    testimonials = Testimonial.objects.all()
    serializer = TestimonialSerializer(testimonials, many=True)
    return Response(serializer.data)
