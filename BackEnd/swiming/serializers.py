from rest_framework import serializers
from .models import About, AboutDetail, Gallery, Program, Schedule, Testimonial, Hero, Contact

class AboutSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = About
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class AboutDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutDetail
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class GallerySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class ProgramSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Ensure experience_details is properly serialized
        if instance.experience_details:
            try:
                # If it's already a list, keep it as is
                if isinstance(instance.experience_details, list):
                    data['experience_details'] = instance.experience_details
                else:
                    # Try to parse if it's a string
                    import json
                    data['experience_details'] = json.loads(instance.experience_details)
            except Exception as e:
                print(f"Error serializing experience_details for testimonial {instance.id}: {e}")
                data['experience_details'] = []
        return data

class HeroSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'