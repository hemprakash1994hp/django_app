from django.contrib.auth import get_user_model
from django import forms
from django.db.models import Q
# from passlib.handlers.pbkdf2 import pbkdf2_sha256
# from cloudops.cloud_app.views import password_reset_activate
from .models import AWSAccount

from cryptography.fernet import Fernet
import base64
import logging
import traceback
from django.conf import settings

User = get_user_model()


class UserCreationForm(forms.ModelForm):
    username = forms.CharField(
        min_length=4,
        max_length=150,
        widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Name"}),
    )
    email = forms.EmailField(
        widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Email"})
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Password"}
        )
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Re-Enter_Password"}
        )
    )

    class Meta:
        model = User
        fields = ["username", "email"]

    def clean_password2(self):

        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("passwords do not match")
        return password2

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])

        if commit:
            user.save()
        return user


class UserLoginform(forms.Form):
    query = forms.CharField(
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "Username / Email"}
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Password"}
        )
    )

    def clean(self, *args, **kwargs):
        query = self.cleaned_data.get("query")
        password = self.cleaned_data.get("password")
        user_qs_final = User.objects.filter(
            Q(username__iexact=query) | Q(email__iexact=query)
        ).distinct()
        if not user_qs_final.exists() and user_qs_final.count != 1:
            raise forms.ValidationError("Invalid credentials - User does not exist")
        user_obj = user_qs_final.first()
        if not user_obj.check_password(password):
            raise forms.ValidationError("Credentials are not correct")
        if user_obj.email_confirmed != 1:
            raise forms.ValidationError("User is not active")
        self.cleaned_data["user_obj"] = user_obj
        return super(UserLoginform, self).clean(*args, **kwargs)


class UserAccount(forms.ModelForm):
    accountname = forms.CharField(widget=forms.TextInput(
        attrs={"class": "form-control", "style": "border: none; border-bottom: 1.5px solid #188cb8"})
    )
    accountnumber = forms.IntegerField(widget=forms.TextInput(
        attrs={"class": "form-control", "style": "border: none; border-bottom: 1.5px solid #188cb8"})
    )
    accesskey = forms.CharField(widget=forms.TextInput(
        attrs={"class": "form-control", "style": "border: none; border-bottom: 1.5px solid #188cb8"})
    )
    skey = forms.CharField(widget=forms.TextInput(
        attrs={"class": "form-control", "style": "border: none; border-bottom: 1.5px solid #188cb8"})
    )

    class Meta:
        model = AWSAccount
        fields = ["accountname", "accountnumber", "accesskey", ]


class ForgotPasswordForm(forms.Form):
    email = forms.EmailField(
        widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Email"})
    )

    # class Meta:
    #     model = User
    #     fields = []

    def clean(self, *args, **kwargs):
        user_email = self.cleaned_data.get("email")
        user_qs_for_forgot_password = User.objects.filter(
            Q(email__iexact=user_email)
        ).distinct()
        if not user_qs_for_forgot_password.exists() and user_qs_for_forgot_password.count != 1:
            raise forms.ValidationError("Invalid credentials - User does not exist")

        # user_object = user_qs_for_forgot_password.first()
        # print("Before return form")
        print(user_email)
        # print(user_qs_for_forgot_password)
        # print(user_object.email)
        # self.cleaned_data["user_object"] = user_object.email
        return super(ForgotPasswordForm, self).clean(*args, **kwargs)


class PasswordResetForm(forms.ModelForm):
    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Password"}
        )
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Re-Enter_Password"}
        )
    )

    class Meta:
        model = User
        fields = []

    def clean_password2(self):
        print("this is clean password")
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("password does not match")
        return password2

    def clean(self, commit=True):
        print("this is save password")
        # get_user = password_reset_activate
        # print(get_user)
        # user = super(PasswordResetForm, self).save(commit=False)
        user = User.objects.get(email='cloudjour@gmail.com')
        user.set_password(self.cleaned_data["password1"])
        print("this is set password")
        if commit:
            user.save()
            print("password saved")
        return user
