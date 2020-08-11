from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from cloud_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index, name='index'),
    path('', views.login_view),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register),
    path('show/', views.show),
    path('sample/', views.sample),
    path('table/', views.table),
    path('dashboard/', views.dashboard),
    path('security/', views.security),
    path('aws_accounts/', views.aws_accounts),

    path('account_activation_sent/', views.account_activation_sent, name='account_activation_sent'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),

    path('loading/', views.loading),
    path('retrieving/', views.retrieving),
    path('forgot_password/', views.forgot_password),
    path('password_reset_link_sent/', views.password_reset_link_sent, name='password_reset_link_sent'),
    url(r'^password_reset_activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.password_reset_activate, name='password_reset_activate'),

]