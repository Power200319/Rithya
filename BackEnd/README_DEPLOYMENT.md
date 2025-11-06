# Backend Deployment Guide

This guide will help you deploy the Django backend to Render.

## Prerequisites

1. A Render account (https://render.com)
2. A PostgreSQL database (you can use Neon.tech, Supabase, or Render's PostgreSQL)
3. A Cloudinary account for image storage

## Step 1: Prepare Your Database

1. Create a PostgreSQL database (recommended: Neon.tech for free tier)
2. Note down your database credentials:
   - Database name
   - Username
   - Password
   - Host URL
   - Port (usually 5432)

## Step 2: Set Up Cloudinary (if using images)

1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard

## Step 3: Deploy to Render

1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: swiming-backend (or your preferred name)
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn BackEnd.wsgi:application --bind 0.0.0.0:$PORT`

## Step 4: Configure Environment Variables

In your Render service settings, add these environment variables:

### Required Variables:
- `SECRET_KEY`: Generate a secure random key
- `DEBUG`: Set to `false` for production
- `ALLOWED_HOSTS`: Your Render app URL (e.g., `swiming-backend.onrender.com`)

### Database Variables:
- `DB_NAME`: Your PostgreSQL database name
- `DB_USER`: Your database username
- `DB_PASSWORD`: Your database password
- `DB_HOST`: Your database host URL
- `DB_PORT`: Your database port (usually `5432`)

### Cloudinary Variables (if using images):
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### CORS Configuration:
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs
  Example: `https://www.sorithya.com`

## Step 5: Deploy

1. Click "Create Web Service"
2. Wait for the deployment to complete
3. Your backend will be available at: `https://your-service-name.onrender.com`

## Step 6: Update Frontend

Update your frontend's API base URL to point to the Render backend URL instead of localhost.

## Troubleshooting

### Migration Issues:
If you encounter migration errors, you may need to run migrations manually or reset your database.

### Static Files:
Make sure `collectstatic` runs during deployment to serve static files properly.

### CORS Issues:
Double-check your `CORS_ALLOWED_ORIGINS` environment variable includes your frontend URL.

## Notes

- The backend uses Django REST Framework for API endpoints
- Authentication is handled via token authentication
- File uploads are handled through Cloudinary
- Database is PostgreSQL with proper SSL configuration