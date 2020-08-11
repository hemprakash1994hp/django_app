import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_iam_user_policy(request):
    print("inside iam")
    if request.is_ajax():
        print("inside ajax call")
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        print(regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                print("inside canada")
                data = [
                   {
                      'EventName':'PutUserPolicy',
                      'EventTime':'2019-08-27 18:13:10',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'SNSInline'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-27 18:12:46',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AmazonSNSRole'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-27 18:12:46',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AmazonSNSFullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-08-27 15:00:52',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'mahesh.bheemavarapu@cloudjournee.com',
                      'Policy':'AmazonS3FullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-08-27 15:00:52',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'mahesh.bheemavarapu@cloudjournee.com',
                      'Policy':'AmazonEC2FullAccess'
                   },
                   {
                      'EventName':'PutUserPolicy',
                      'EventTime':'2019-08-23 19:53:05',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'awsconfig'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-23 19:52:17',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AWSConfigRulesExecutionRole'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-23 19:52:17',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AWSConfigRole'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-23 19:52:17',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AWSConfigRoleForOrganizations'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-23 19:52:17',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AWSConfigUserAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-23 19:51:50',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'AmazonRDSFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-23 14:48:01',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'kiran',
                      'Policy':'AWS_Policy_Custom.json'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-08-14 18:42:03',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'cloudOptimization',
                      'Policy':'AmazonEC2ReadOnlyAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-14 18:41:46',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'cloudOptimization',
                      'Policy':'AmazonEC2ReadOnlyAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-14 18:41:46',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'cloudOptimization',
                      'Policy':'ReadOnlyAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-08-14 13:02:24',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'nagateja.sambu@cloudjournee.com',
                      'Policy':'IAMReadOnlyAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-30 13:14:30',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AdministratorAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-30 13:14:12',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'vivekananda.chagam@cloudjournee.com',
                      'Policy':'IAMFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-22 17:02:14',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AdministratorAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-22 13:35:01',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AdministratorAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-20 11:37:18',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.64.179',
                      'UserName':'vivekananda.chagam@cloudjournee.com',
                      'Policy':'IAMFullAccess'
                   },
                   {
                      'EventName':'PutUserPolicy',
                      'EventTime':'2019-07-18 10:38:17',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'ses-smtp-user.20190718-103737',
                      'Policy':'AmazonSesSendingAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 16:07:08',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpoint-email-ers-'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 16:07:02',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'Pinpoint'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 16:06:57',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpointpolicygen'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 16:06:48',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'RegistrationFormPolicy'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 16:06:43',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AdministratorAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 16:06:30',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AmazonSESFullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 16:06:22',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AmazonS3FullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 16:02:26',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpointpolicygen'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 16:02:26',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpoint-email-ers-'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 16:01:54',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'Pinpoint'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 15:58:01',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'RegistrationFormPolicy'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 15:48:47',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpoint-email-ers-'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 15:48:40',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'Pinpoint'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 15:48:34',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpointpolicygen'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 15:21:24',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AmazonS3FullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 15:12:11',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpoint-email-ers-'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 15:11:57',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpointpolicygen'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 14:47:41',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'Pinpoint'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 14:47:23',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpoint-email-ers-'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 14:21:28',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'AmazonSESFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-17 14:19:30',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'srihari.kurapati@cloudjournee.com',
                      'Policy':'pinpoint-email-ers-'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-17 14:17:52',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'Site24',
                      'Policy':'ReadOnlyAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-16 19:24:35',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'vivekananda.chagam@cloudjournee.com',
                      'Policy':'AmazonRDSFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-10 12:11:05',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'amplify-user',
                      'Policy':'AdministratorAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-09 12:52:56',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'Site24',
                      'Policy':'ReadOnlyAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-08 17:54:55',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'testcjp',
                      'Policy':'ReadOnlyAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-08 17:53:52',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'testcjp',
                      'Policy':'ReadOnlyAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-05 20:16:11',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'nagateja.sambu@cloudjournee.com',
                      'Policy':'IAMFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-05 19:09:27',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'IAMFullAccess'
                   },
                   {
                      'EventName':'PutUserPolicy',
                      'EventTime':'2019-07-03 13:42:24',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'KMS'
                   },
                   {
                      'EventName':'PutUserPolicy',
                      'EventTime':'2019-07-03 13:40:46',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'MSK'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-03 10:44:27',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'CloudWatchFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-03 10:44:27',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonMSKFullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-03 10:43:58',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonECS_FullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-03 10:43:45',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonAPIGatewayAdministrator'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-03 10:43:23',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonEC2ContainerRegistryFullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-03 10:43:11',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonRDSFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-03 10:42:55',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonVPCFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-03 10:42:55',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonMSKFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-07-03 10:42:55',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'CloudWatchFullAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-07-03 10:34:54',
                      'CreatedUser':'kiran',
                      'IPAddress':'223.186.50.236',
                      'UserName':'loadbalancer2',
                      'Policy':'IAMReadOnlyAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-06-15 15:05:15',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'AmazonAPIGatewayAdministrator'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-06-15 15:04:52',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'unauthorised',
                      'Policy':'AmazonAPIGatewayAdministrator'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-06-15 14:45:36',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'unauthorised',
                      'Policy':'AmazonAPIGatewayAdministrator'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-06-11 19:15:13',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'IAMReadOnlyAccess'
                   },
                   {
                      'EventName':'DetachUserPolicy',
                      'EventTime':'2019-06-11 19:14:58',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'IAMFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-06-11 19:13:51',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'UserName':'loadbalancer2',
                      'Policy':'IAMFullAccess'
                   },
                   {
                      'EventName':'AttachUserPolicy',
                      'EventTime':'2019-06-11 10:48:52',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'UserName':'sivaji@cloudjournee.com',
                      'Policy':'Admin'
                   }
                ]
                selected_data.extend(data)

        time.sleep(1)
        print(selected_data)
        json_data = {'iam_user_policy_data': selected_data}
        return JsonResponse(json_data)