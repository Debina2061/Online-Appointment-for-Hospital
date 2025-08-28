from rest_framework import serializers
from doctor_portion.models import DoctorModel, ReviewModel
from Authentication.models import User


class DoctorCreateSerializer(serializers.ModelSerializer):
    # Map request body keys to model fields
    About = serializers.CharField(source='about')

    class Meta:
        model = DoctorModel
        fields = [
            'name',
            'speciality',
            'rating',
            'reviews',
            'experience',
            'location',
            'consultantFee',
            'image',
            'About',
            'is_available'
        ]

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            # Match the original message semantics
            raise serializers.ValidationError({'message': 'userId is not found'})

        # Default profile image if not provided (mirrors the Node.js behavior)
        if not validated_data.get('image'):
            # Store the URL string as the file name reference, consistent with the provided code
            validated_data['image'] = 'http://localhost:3000/doctorProfile.png'

        # Attach creator
        return DoctorModel.objects.create(createdBy=user, **validated_data)


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'username', 'photo_name', 'date_of_birth', 'role'
        )


class DoctorListSerializer(serializers.ModelSerializer):
    nameDoctor = serializers.CharField(source='name', read_only=True)
    About = serializers.CharField(source='about', allow_blank=True, allow_null=True, read_only=True)
    appointmentFee = serializers.IntegerField(source='consultantFee', read_only=True)
    profileDoc = serializers.SerializerMethodField()
    # Expose related user as `user`, excluding password & admin flags
    user = UserPublicSerializer(source='createdBy', read_only=True)

    class Meta:
        model = DoctorModel
        fields = (
            'id', 'nameDoctor', 'speciality', 'rating', 'reviews', 'experience', 'location', 'appointmentFee', 'profileDoc', 'is_available', 'user', 'About'
        )

    def get_profileDoc(self, obj):
        # If it's an ImageField with a file, build absolute URL; if it's a stored URL string, return as-is
        try:
            request = self.context.get('request')
            if hasattr(obj.image, 'url'):
                url = obj.image.url
                if request is not None:
                    return request.build_absolute_uri(url)
                return url
            # Fallback if a raw string was stored
            return obj.image
        except Exception:
            return None


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewModel
        fields = ['id', 'doctorId', 'user', 'comment', 'rating', 'created_at']


