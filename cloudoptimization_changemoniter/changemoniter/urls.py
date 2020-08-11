from django.urls import path

# from . import views, iam_views, iam_profile_views, iam_user_policy_views, rds_views, s3_views, vpc_views, aws_lambda_views, cloudformation, cloudtrail, cloudwatch, elb_v1, elb_v2, route53, ses, events
# from changemoniter import views,  elb_v1, cloudwatch, elb_v2, route53, \
#     ses, events
# from changemoniter import views, elb_v1, elb_v2, route53, ses, events
from changemoniter import views, route53, elb_v1, ses

urlpatterns = [
    path('', views.change_moniter, name='change_moniter'),
    path('loading/', views.loading, name='loading'),
    # path('events_iam/', iam_views.events_iam, name='events_iam'),
    # path('events_iam_profile/', iam_profile_views.events_iam_profile, name='events_iam_profile'),
    # path('events_iam_user_policy/', iam_user_policy_views.events_iam_user_policy, name='events_iam_user_policy'),
    # path('events_rds/', rds_views.events_rds, name='events_rds'),
    # path('events_s3/', s3_views.events_s3, name='events_s3'),
    # path('events_vpc/', vpc_views.events_vpc, name='events_vpc'),
    # path('events_aws_lambda/', aws_lambda_views.events_aws_lambda, name='events_aws_lambda'),
    # path('events_cloudformation/', cloudformation.events_cloudformation, name='events_cloudformation'),
    # path('events_cloudtrail/', cloudtrail.events_cloudtrail, name='events_cloudtrail'),
    # path('events_cloudwatch/', cloudwatch.events_cloudwatch, name='events_cloudwatch'),
    path('elb_events/', elb_v1.elb_events, name='elb_events'),
    # path('elb_events_v2/', elb_v2.elb_events_v2, name='elb_events_v2'),
    path('route53_events/', route53.route53_events, name='route53_events'),
    path('ses_events/', ses.ses_events, name='ses_events'),
    # path('elb/', events.elb, name='elb')
]
