# Generated by Django 2.2.2 on 2019-07-11 06:07

from django.conf import settings
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=225, unique=True, validators=[django.core.validators.RegexValidator(code='Invalid username', message='username must be alphanumeric or contain numbers', regex='^[a-zA-Z0-9.+-]*$')])),
                ('email', models.EmailField(max_length=200, primary_key=True, serialize=False, unique=True, verbose_name='email address')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('email_confirmed', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AWS_Account_Info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('IAMUser', models.CharField(max_length=100)),
                ('AccessKeyId', models.CharField(max_length=225)),
                ('Status', models.CharField(max_length=100)),
                ('AccessKeyIdCreatedDate', models.DateTimeField()),
                ('AccessKeyAge', models.CharField(max_length=100)),
                ('LastUsedService', models.CharField(max_length=200)),
                ('EventTime', models.DateTimeField()),
                ('AWSRegion', models.CharField(max_length=200)),
                ('IPAddress', models.GenericIPAddressField()),
                ('AttachedPolicies', models.CharField(max_length=250)),
                ('CreatedBy', models.CharField(max_length=100)),
                ('CreatedDate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='AWSAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accountname', models.CharField(max_length=200)),
                ('accountnumber', models.IntegerField(unique=True)),
                ('accesskey', models.CharField(max_length=250)),
                ('skey', models.CharField(max_length=250)),
                ('email_id', models.ForeignKey(on_delete=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
