from django.db import models
import uuid
from Authentication.models import User
from django.core.validators import MinValueValidator,MaxValueValidator


# Create your models here.

class DoctorModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    name = models.CharField(max_length=20, null=False)
    speciality = models.CharField(max_length=100, null=False)
    experience = models.IntegerField(default=0)
    location = models.CharField(max_length=100)
    reviews = models.IntegerField(default=0)
    rating = models.IntegerField(
        validators=[
            MinValueValidator(0),MaxValueValidator(5)
        ], default=0
    )
    about = models.TextField(null=True, blank=True)
    consultantFee = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to="storage/")
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctors')

class ReviewModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doctorId = models.ForeignKey('doctor_portion.DoctorModel', on_delete=models.CASCADE, related_name='doctor_reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_reviews')
    comment = models.TextField()
    rating = models.IntegerField(
        validators=[
            MinValueValidator(1), MaxValueValidator(5)
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['doctorId', 'user']

    def __str__(self):
        return f"Review({self.id}) by {self.user_id} for {self.doctorId}"

class BookingModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doctor = models.ForeignKey('doctor_portion.DoctorModel', on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    booking_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'booking_date'], name='unique_booking_per_user_per_datetime')
        ]
        ordering = ['-booking_date']

    def __str__(self):
        return f"Booking({self.id}) by {self.user_id} with {self.doctor_id} at {self.booking_date}"
