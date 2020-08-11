import time

from cryptography.fernet import Fernet
from django.contrib.auth import login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.db.models import Q
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
# from google.protobuf.text_encoding import byte
# from numpy.core import byte
from .forms import UserCreationForm, UserLoginform, UserAccount, ForgotPasswordForm, PasswordResetForm
from .models import AWSAccount, MyUser, AWS_Account_Info

from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from .tokens import account_activation_token, password_reset_token
from django.conf import settings
from django.core.mail import send_mail
# from passlib.hash import pbkdf2_sha256


import base64
import logging
import traceback

User = get_user_model()


def register(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            subject = 'Activate Your Cloud Optimization Account'
            message = render_to_string('account_activation_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            from_email = settings.EMAIL_HOST_USER
            to_list = [user.email]
            send_mail(subject, message, from_email, to_list, fail_silently=True)
            return redirect('account_activation_sent')
        else:
            return render(request, "register.html", {"form": form, "error": "Incorrect Details Given !!!"})

    return render(request, "register.html", {"form": form})


def account_activation_sent(request):
    return render(request, 'account_activation_sent.html')


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.is_admin = False
        user.is_staff = False
        user.email_confirmed = True
        user.save()
        login(request, user)
        return redirect('login')
    else:
        return render(request, 'account_activation_invalid.html')


def login_view(request, *args, **kwargs):
    form = UserLoginform(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            user_obj = form.cleaned_data.get("user_obj")
            login(request, user_obj)
            return HttpResponseRedirect("/index")
        else:
            return render(request, "login.html", {"form": form, "error": "Incorrect Email_id or password !!!"})
    else:
        return render(request, "login.html", {"form": form})


@login_required(login_url="/login")
def index(request):
    profile = request.user
    id = MyUser.objects.get(
        Q(username__iexact=profile) | Q(email__iexact=profile)
    )
    user_acc_name = id.username
    user_acc_email = id.email
    get_access_key = AWSAccount.objects.get(email_id=user_acc_email)
    print(get_access_key.accesskey)
    print(get_access_key.accountname)
    print(get_access_key.skey)

    d = get_access_key.skey
    print("this is encoded" + d)
    txt = base64.urlsafe_b64decode(d)
    cipher_suite = Fernet(settings.ENCRYPT_KEY)
    decoded_text = cipher_suite.decrypt(txt).decode("ascii")
    print("decrypted" + ' ' + decoded_text)

    form = UserAccount(request.POST or None)
    print("inside form")
    if request.method == "POST":
        print(" inside if request")
        if form.is_valid():
            print("inside if form")
            form.save()
            name = form.cleaned_data.get("accountname")
            dryp = form.cleaned_data.get("skey")
            print(name + ' ' + dryp)
            txt = str(dryp)
            print(txt)
            cipher_suite = Fernet(settings.ENCRYPT_KEY)
            encrypted_text = cipher_suite.encrypt(txt.encode('ascii'))
            encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii")
            print("enctypted" + ' ' + encrypted_text)
            p = AWSAccount.objects.get(accountname=name)
            print(p)
            p.skey = encrypted_text
            p.save()
            print("saved")

        # return render(request, "index.html",
        #                   {"form": form, "user": user_acc_name, "access_key": get_access_key.accesskey,
        #                    "aws_account_name": get_access_key.accountname, "aws_secret_key": decoded_text})

    return render(request, "index.html",
                  {"form": form, "user": user_acc_name, "access_key": get_access_key.accesskey,
                   "aws_account_name": get_access_key.accountname, "aws_secret_key": decoded_text})


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/login")


def show(request):
    # account = MyAccount.objects.filter(accountname="HP")
    # print(account)
    # key = settings.SECRET_KEY
    print("this is before key")
    fkey = Fernet(settings.FERNET_KEYS)
    print(fkey)
    print("this is after key")
    account = AWSAccount.objects.get(accountname='HP')
    # account = MyAccount.objects.all()
    # str = account.get(accountname='HP')
    # encode = urlsafe_base64_decode(account.skey)
    print("This is the type", type(account))
    skey = account.skey.encode()
    # print(account)
    # assert isinstance(account.secretkey, fkey)
    decrypted = fkey.decrypt(skey)
    # key = fernet.decrypt(account.secretkey)

    print(decrypted)
    return render(request, "login.html")


def sample(request):
    profile = request.user
    id = MyUser.objects.get(
        Q(username__iexact=profile) | Q(email__iexact=profile)
    )
    user_acc_name = id.username
    user_acc_email = id.email
    get_access_key = AWSAccount.objects.get(email_id=user_acc_email)
    print(get_access_key.accesskey)
    print(get_access_key.accountname)
    print(get_access_key.skey)
    try:
        # base64 decode
        dypt = AWSAccount.objects.get(accountname='HP')
        d = dypt.skey
        print("this is encoded" + d)
        txt = base64.urlsafe_b64decode(d)
        cipher_suite = Fernet(settings.ENCRYPT_KEY)
        decoded_text = cipher_suite.decrypt(txt).decode("ascii")
        print("decrypted" + ' ' + decoded_text)
        return render(request, "data.html",
                      {"access_key": get_access_key.accesskey, "aws_account_name": get_access_key.accountname,
                       "aws_secret_key": get_access_key.skey})
    except Exception as e:
        # log the error
        logging.getLogger("error_logger").error(traceback.format_exc())
        return None


def loading(request):
    data = [
        {
            'IAMUser': 'digin',
            'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
            'Status': 'Active',
            'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
            'AccessKeyAge': '29 days',
            'LastUsedService': 'lambda',
            'EventTime': '2019-06-25 18:32:19',
            'AWSRegion': 'US East (N. Virginia)',
            'IPAddress': '122.166.175.59',
            'AttachedPolicies': [
                'AdministratorAccess',
                'IAMUserChangePassword'
            ]
        },
        {
            'IAMUser': 'digin',
            'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
            'Status': 'Inactive',
            'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
            'AccessKeyAge': '81 days',
            'LastUsedService': 'kinesisvideo',
            'EventTime': '2019-05-30 16:41:38',
            'AWSRegion': 'US East (N. Virginia)',
            'IPAddress': '122.166.175.59',
            'AttachedPolicies': [
                'AdministratorAccess',
                'IAMUserChangePassword'
            ]
        }
    ]
    time.sleep(5)
    json_data = {'data': data}
    return JsonResponse(json_data)


def table(request):
    data = AWS_Account_Info.objects.all()
    print("data retrieving")
    print(data)
    return render(request, "table.html", {"access_keys_datas": data})


def dashboard(request):
    return render(request, "dashboard.html")


def security(request):
    return render(request, "security.html")


def aws_accounts(request):
    return render(request, "aws_accounts.html")


def retrieving(request):
    Data = AWSAccount.objects.all()
    print(Data)
    return render(request, 'data.html', {'data': Data})


def forgot_password(request, *args, **kwargs):
    forgot_form = ForgotPasswordForm(request.POST or None)
    print("before if")
    if request.method == "POST":
        print("before if form valid")
        print(forgot_form)
        if forgot_form.is_valid():
            print("Inside if form valid ")
            get_user = forgot_form.cleaned_data.get("email")
            print(get_user)
            get_user_from_db = User.objects.get(email=get_user)
            print(get_user_from_db)
            print(get_user_from_db.username)
            # forgot_password_user = get_user_from_db
            # get_user = forgot_password_user.email

            # get_user = User.objects.get(email=forgot_password_user)
            current_site = get_current_site(request)
            subject = 'Reset Your Cloud Optimization Account Password'
            message = render_to_string('password_reset_email.html', {
                'user': get_user_from_db,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(get_user_from_db.pk)),
                'token': password_reset_token.make_token(get_user_from_db),
            })
            from_email = settings.EMAIL_HOST_USER
            to_list = [get_user_from_db.email]
            send_mail(subject, message, from_email, to_list, fail_silently=True)
            print("Before link sent")
            return redirect('password_reset_link_sent')
        else:
            return HttpResponseRedirect("/register", {"error": "User Does Not Exist, Please Register..."})

    return render(request, "forgot_password.html", {"forgot_form": forgot_form})


def password_reset_link_sent(request):
    return render(request, 'password_reset_link_sent.html')


def password_reset_activate(request, uidb64, token):
    form = PasswordResetForm(request.POST or None)

    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and password_reset_token.check_token(user, token):
        if request.method == "POST":
            if form.is_valid():
                print(user)

                # user.set_password = form.cleaned_data.get("password1")
                # user.is_active = True
                # user.is_admin = False
                # user.is_staff = False
                # user.email_confirmed = True
                # user.save()
                print("password saved")

                login(request, user)
                return redirect('login')
            else:
                return redirect(request, "password_reset.html", {"error": "password doesn't match"})

    return render(request, "password_reset.html", {"form": form})
