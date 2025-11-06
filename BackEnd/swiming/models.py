from django.db import models
import cloudinary.models

class About(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = cloudinary.models.CloudinaryField('image', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class AboutDetail(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = cloudinary.models.CloudinaryField('image', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Gallery(models.Model):
    CATEGORY_CHOICES = [
        ('training', 'កំពុងហ្វឹកហាត់'),
        ('competition', 'ការប្រកួត'),
        ('kids', 'កុមារ'),
        ('facilities', 'គ្រឿងបរិក្ខារ'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = cloudinary.models.CloudinaryField('image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Program(models.Model):
    LEVEL_CHOICES = [
        ('basic', 'Basic'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('highest', 'Highest'),
    ]

    title = models.CharField(max_length=200)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    description = models.TextField()  # Changed from JSONField to TextField
    image = cloudinary.models.CloudinaryField('image', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Schedule(models.Model):
    hours = models.CharField(max_length=100)
    lesson_type = models.CharField(max_length=200)
    price = models.CharField(max_length=20)
    color = models.CharField(max_length=20, default='bg-blue-500')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.hours} - {self.price}"

class Testimonial(models.Model):
    EXPERIENCE_CHOICES = [
        (1, 'Basic (Name & Image)'),
        (2, 'Technical Referee Experience'),
        (3, 'Team Leadership Experience'),
    ]

    name = models.CharField(max_length=100, blank=True, null=True)
    image = cloudinary.models.CloudinaryField('image', blank=True, null=True)
    experience = models.IntegerField(choices=EXPERIENCE_CHOICES, default=1)
    experience_details = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.name:
            return self.name
        elif self.experience == 2:
            return "Technical Referee Experience"
        elif self.experience == 3:
            return "Team Leadership Experience"
        else:
            return f"Testimonial {self.id}"

class Hero(models.Model):
    image = cloudinary.models.CloudinaryField('image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Hero Image {self.id}"

class Contact(models.Model):
    phone = models.CharField(max_length=100, help_text="Main phone number")
    telegram_khmer = models.CharField(max_length=100, help_text="Telegram for Khmer speaking")
    telegram_english = models.CharField(max_length=100, help_text="Telegram for English speaking")
    email = models.EmailField(help_text="Contact email")
    address_link = models.URLField(help_text="Google Maps link")
    monday_friday_hours = models.CharField(max_length=50, default="6:00 AM - 19:00 PM")
    saturday_sunday_hours = models.CharField(max_length=50, default="6:00 AM - 18:00 PM")
    pool_location = models.CharField(max_length=200, default="Olympic Stadium / Khmer Swimming Federation")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

    def __str__(self):
        return f"Contact Information - {self.email}"
