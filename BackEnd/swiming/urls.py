from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'about', views.AboutViewSet)
router.register(r'about-details', views.AboutDetailViewSet)
router.register(r'gallery', views.GalleryViewSet)
router.register(r'programs', views.ProgramViewSet)
router.register(r'schedule', views.ScheduleViewSet)
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'heroes', views.HeroViewSet)
router.register(r'contacts', views.ContactViewSet)

urlpatterns = [
    # Authentication endpoints
    path('api/auth/login/', views.login_view, name='login'),
    path('api/auth/logout/', views.logout_view, name='logout'),
    path('api/auth/user/', views.current_user, name='current-user'),

    # Protected CRUD endpoints
    path('api/', include(router.urls)),

    # Public read-only endpoints
    path('api/public/about/', views.get_about_details, name='public-about'),
    path('api/public/about-details/', views.get_about_detail_items, name='public-about-details'),
    path('api/public/gallery/', views.get_all_gallery, name='public-gallery'),
    path('api/public/gallery/category/<str:category>/', views.get_gallery_by_category, name='public-gallery-by-category'),
    path('api/public/programs/', views.get_all_programs, name='public-programs'),
    path('api/public/programs/level/<str:level>/', views.get_programs_by_level, name='public-programs-by-level'),
    path('api/public/schedule/', views.get_all_schedules, name='public-schedule'),
    path('api/public/testimonials/', views.get_all_testimonials, name='public-testimonials'),
    path('api/public/heroes/', views.get_all_heroes, name='public-heroes'),
    path('api/public/contact/', views.get_contact_info, name='public-contact'),
]