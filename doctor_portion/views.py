from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.utils.dateparse import parse_datetime
from doctor_portion.serializer import DoctorCreateSerializer, DoctorListSerializer
from doctor_portion.models import DoctorModel, BookingModel, ReviewModel


class Create_Doctor(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = getattr(request.user, "id", None)
        if not user_id:
            return Response(
                {"message": "userId is not found"}, status=status.HTTP_404_NOT_FOUND
            )

        filename = request.FILES.get("file")
        if filename:
            filename = filename.name
        else:
            filename = "http://localhost:3000/doctorProfile.png"

        # Extract required fields from request body
        name = request.data.get("name")
        speciality = request.data.get("speciality")
        experience = request.data.get("experience")
        About = request.data.get("About")
        consultantFee = request.data.get("consultantFee")
        location = request.data.get("location")

        if (
            not name
            or not speciality
            or not experience
            or not About
            or not consultantFee
            or not location
        ):
            return Response(
                {"message": "plaease enter valid information"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            doctor_info = DoctorModel.objects.create(
                name=name,
                speciality=speciality,
                experience=int(experience),
                about=About,
                consultantFee=int(consultantFee),
                location=location,
                image=filename,
                createdBy=request.user,
            )
            return Response(
                {"message": "DoctorInfo created Successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as error:
            print(error)
            return Response(
                {"message": "DoctorInfo creation failed on Database!!"},
                status=status.HTTP_403_FORBIDDEN,
            )


class Fetch_Doctors(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctorData = DoctorModel.objects.select_related("createdBy").all()
        if doctorData.count() > 0:
            return Response(
                {"message": "There is no Doctor information"},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = DoctorListSerializer(
            doctorData, many=True, context={"request": request}
        ).data
        return Response(
            {"message": "Doctor information fetching success", "data": data},
            status=status.HTTP_200_OK,
        )


class Update_Doctor(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        print("id:", id)
        print("req.body", request.data)

        speciality = request.data.get("speciality")
        experience = request.data.get("experience")
        About = request.data.get("About")
        consultantFee = request.data.get("consultantFee")
        location = request.data.get("location")
        isAvailable = request.data.get("isAvailable")

        # if not speciality or not experience or not About or not consultantFee or not location:
        #     return Response({
        #         'message': 'At least one field must be provided for update'
        #     }, status=status.HTTP_400_BAD_REQUEST)

        try:
            doctor = DoctorModel.objects.filter(id=id).first()
            if not doctor:
                return Response(
                    {"message": "Doctor is not found!!!"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Update all fields from request body
            for field, value in request.data.items():
                if field == "About":
                    doctor.about = value
                elif field == "isAvailable":
                    doctor.is_available = value
                elif hasattr(doctor, field):
                    setattr(doctor, field, value)

            doctor.save()
            print("Doctor Information updated!!")
            return Response(
                {"message": "doctor information updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as error:
            print(error)
            return Response(
                {"message": "Error on database during update Doctor"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class Delete_Doctor(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        if not id:
            return Response(
                {"message": "doctor id should be provided!!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        doctorId = DoctorModel.objects.filter(id=id).first()
        if not doctorId:
            return Response(
                {"message": "Doctor is not found!!!"}, status=status.HTTP_404_NOT_FOUND
            )

        doctorId.delete()
        return Response(
            {"message": "Doctor information deleted from dataBase!!!"},
            status=status.HTTP_200_OK,
        )


class Fetch_Doctor_Profile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        doctorProfile = (
            DoctorModel.objects.select_related("createdBy").filter(id=id).first()
        )
        if not doctorProfile:
            return Response(
                {"message": "Doctor information is not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = DoctorListSerializer(doctorProfile, context={"request": request}).data
        return Response(
            {"message": "Doctor information fetch successfully", "data": data},
            status=status.HTTP_200_OK,
        )


class Review_Rating(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        user = getattr(request.user, "id", None)
        doctor = id

        if not user or not doctor:
            return Response(
                {"message": "user and doctor id must be provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        comment = request.data.get("comment")
        rating = request.data.get("rating")

        try:
            # Check if review already exists for this user-doctor combination
            doctorReview = ReviewModel.objects.filter(
                doctorId=doctor, user=user
            ).exists()

            if doctorReview:
                return Response(
                    {"message": "Doctor Review with this user is already created"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            createReview = ReviewModel.objects.create(
                doctorId_id=doctor, user=request.user, comment=comment, rating=rating
            )

            if not createReview:
                return Response(
                    {"message": "Review is not created"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response({"message": "Review created"}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response(
                {"message": "Internal Server Issue", "error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class Fetch_Review_Doctor(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        doctor = id
        try:
            doctorReview = (
                ReviewModel.objects.filter(doctorId=doctor)
                .exclude(rating__isnull=True)
                .first()
            )
            if not doctorReview:
                return Response(
                    {"message": "Doctor Review is not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            data = {
                "id": str(doctorReview.id),
                "doctorId": str(doctorReview.doctorId.id),
                "user": str(doctorReview.user.id),
                "comment": doctorReview.comment,
                "created_at": doctorReview.created_at.isoformat(),
            }
            return Response({"data": data}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response(
                {
                    "message": "Internal Server Error at Doctor Review Section",
                    "error": str(error),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class Create_Booking(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doctor_id):
        user = getattr(request, "user", None)
        if not user or not user.is_authenticated:
            return Response(
                {"message": "user id must be provided!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # doctorId from path param
        if not doctor_id:
            return Response(
                {"message": "doctorId must be provided!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Parse dateOfBooking (accept ISO 8601 string)
        date_str = request.data.get("dateOfBooking")
        if not date_str:
            return Response(
                {"message": "please provide booking information and paymentStatus"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking_dt = parse_datetime(date_str)
        if booking_dt is None:
            return Response(
                {"message": "Invalid booking datetime"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Ensure doctor exists
        doctor = DoctorModel.objects.filter(id=doctor_id).first()
        if not doctor:
            return Response(
                {"message": "Doctor is not found!!!"}, status=status.HTTP_404_NOT_FOUND
            )

        # Check for existing booking at the same time for this user
        existing = BookingModel.objects.filter(
            user=user, booking_date=booking_dt
        ).exists()
        if existing:
            return Response(
                {"message": "At this time another booking is appeared!"},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            booking = BookingModel.objects.create(
                doctor=doctor,
                user=user,
                booking_date=booking_dt,
            )
            return Response(
                {
                    "message": "Booking successful",
                    "data": {
                        "id": str(booking.id),
                        "doctor": str(booking.doctor_id),
                        "user": str(booking.user_id),
                        "booking_date": booking.booking_date.isoformat(),
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception:
            return Response(
                {"message": "server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class Get_Bookings(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = getattr(request, "user", None)
        if not user or not user.is_authenticated:
            return Response(
                {"message": "user should be login"}, status=status.HTTP_400_BAD_REQUEST
            )

        qs = BookingModel.objects.select_related("doctor", "user").filter(user=user)
        data = [
            {
                "id": str(b.id),
                "booking_date": b.booking_date.isoformat(),
                "user": {
                    "id": str(b.user.id),
                    "email": b.user.email,
                    "first_name": b.user.first_name,
                    "last_name": b.user.last_name,
                    "username": b.user.username,
                },
                "doctorInfo": {
                    "id": str(b.doctor.id),
                    "nameDoctor": b.doctor.name,
                    "speciality": b.doctor.speciality,
                    "experience": b.doctor.experience,
                    "About": b.doctor.about,
                    "consultantFee": b.doctor.consultantFee,
                },
            }
            for b in qs
        ]

        return Response(
            {"message": "Booking Cart is Successfully fetch!", "data": data},
            status=status.HTTP_200_OK,
        )
