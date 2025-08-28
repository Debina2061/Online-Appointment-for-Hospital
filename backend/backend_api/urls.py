
from django.contrib import admin
from django.urls import path
from django.urls import include
import Authentication.urls
import doctor_portion.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path("v1/api/auth/",include(Authentication.urls)),
    path("v1/api/doctor/",include(doctor_portion.urls))
]
