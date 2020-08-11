import binascii

from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

# from fernet_fields import EncryptedCharField

USERNAME_REGEX = "^[a-zA-Z0-9.+-]*$"


# User = get_user_model()

class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError("User must have an email address")

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password=password)
        user.is_admin = True
        user.is_staff = True
        user.email_confirmed = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):

    # id = models.IntegerField(unique=True)

    username = models.CharField(
        max_length=225,
        validators=[
            RegexValidator(
                regex=USERNAME_REGEX,
                message="username must be alphanumeric or contain numbers",
                code="Invalid username",
            )
        ],
        unique=True,
    )

    email = models.EmailField(primary_key=True, max_length=200, unique=True, verbose_name="email address")
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    email_confirmed = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    @receiver(post_save, sender=AbstractBaseUser)
    def update_user_myuser(sender, instance, created, **kwargs):
        print("this is update_user")
        if created:
            MyUser.objects.create(user=instance)
        instance.myuser.save()

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True


# class MytypeField(models.Field):
#     def db_type(self, connection):
#         return 'mytype'


class AWSAccount(models.Model):
    # id = models.IntegerField(unique=True)
    accountname = models.CharField(max_length=200)
    accountnumber = models.IntegerField(unique=True)
    accesskey = models.CharField(max_length=250)
    skey = models.CharField(max_length=250)
    email_id = models.ForeignKey(MyUser, on_delete=False)
    # skey = EncryptedCharField(max_length=250)
    # fieldtype = MytypeField(unique=True)

    objects = MyUserManager()

    # def get_internal_type(self):
    #     return "CharField"
    #
    # def get_prep_value(self, value):
    #     return value

    # def get_db_prep_value(self, value, connection, prepared=False):
    #     print("inside db_value")
    #     value = super().get_db_prep_value(value, connection, prepared)
    #     print("after get_db")
    #     if value is not None:
    #         return connection.Database.Binary(value)
    #     return value

    # def __unicode__(self):
    #     return self.accountname
    #
    # def __str__(self):
    #     return self.accountname
    #
    # def db_type(self, connection):
    #     return self.accountname


class AWS_Account_Info(models.Model):
    IAMUser = models.CharField(max_length=100)
    AccessKeyId = models.CharField(max_length=225)
    Status = models.CharField(max_length=100)
    AccessKeyIdCreatedDate = models.DateTimeField()
    AccessKeyAge = models.CharField(max_length=100)
    LastUsedService = models.CharField(max_length=200)
    EventTime = models.DateTimeField()
    AWSRegion = models.CharField(max_length=200)
    IPAddress = models.GenericIPAddressField()
    AttachedPolicies = models.CharField(max_length=250)
    CreatedBy = models.CharField(max_length=100)
    CreatedDate = models.DateTimeField()

    objects = MyUserManager()
