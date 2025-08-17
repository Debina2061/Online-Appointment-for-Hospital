from django.urls import path
from doctor_portion.views import (
    Create_Doctor, Fetch_Doctors, Update_Doctor, Delete_Doctor, 
    Create_Booking, Get_Bookings, Fetch_Doctor_Profile, 
    Review_Rating, Fetch_Review_Doctor
)


urlpatterns = [
    path('create', Create_Doctor.as_view(), name='doctor_create'),
    path('list', Fetch_Doctors.as_view(), name='doctor_list'),
    path('update/<uuid:id>', Update_Doctor.as_view(), name='doctor_update'),
    path('delete/<uuid:id>', Delete_Doctor.as_view(), name='doctor_delete'),
    path('profile/<uuid:id>', Fetch_Doctor_Profile.as_view(), name='doctor_profile'),
    path('review/<uuid:id>', Review_Rating.as_view(), name='doctor_review'),
    path('fetch-review/<uuid:id>', Fetch_Review_Doctor.as_view(), name='doctor_fetch_review'),
    path('<uuid:doctor_id>/book', Create_Booking.as_view(), name='booking_create'),
    path('bookings', Get_Bookings.as_view(), name='booking_list'),
]

## http://localhost:8000/v1/api/doctor/create
## http://localhost:8000/v1/api/doctor/list
## http://localhost:8000/v1/api/doctor/update
## http://localhost:8000/v1/api/doctor/delete
## http://localhost:8000/v1/api/doctor/profile/aee6e782-75f3-4d57-87d2-63ec43ab7043
## http://localhost:8000/v1/api/doctor/review/aee6e782-75f3-4d57-87d2-63ec43ab7043
## http://localhost:8000/v1/api/doctor/fetch-review
## http://localhost:8000/v1/api/doctor/aee6e782-75f3-4d57-87d2-63ec43ab7043/book
## http://localhost:8000/v1/api/doctor/bookings
