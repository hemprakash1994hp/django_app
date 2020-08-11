import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_s3(request):
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-08-28 15:10:59',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.13.200',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036876'
                  },
                  {
                    'EventName': 'PutBucketPolicy',
                    'EventTime': '2019-08-28 15:10:59',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.13.200',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036876'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-08-28 15:10:30',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036899'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-08-28 15:10:27',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036899'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-08-28 14:25:11',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036878'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-08-28 14:24:58',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036877'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-08-28 14:24:42',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036876'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-08-28 14:24:38',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036876'
                  },
                  {
                    'EventName': 'PutBucketPolicy',
                    'EventTime': '2019-08-28 14:21:33',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.226.246',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036899'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-08-28 14:21:33',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.226.246',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036899'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-08-28 14:21:21',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.138.117',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036878'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-08-28 14:21:08',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.13.200',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036877'
                  },
                  {
                    'EventName': 'PutBucketPolicy',
                    'EventTime': '2019-08-26 13:55:57',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.136.160',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036876'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-08-26 13:55:56',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '10.247.136.160',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'config-bucket-519852036876'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-18 10:15:25',
                    'UserName': 'vivekananda.chagam@cloudjournee.com',
                    'IPAddress': '3.89.125.83',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'dumpcjp544'
                  },
                  {
                    'EventName': 'PutBucketPublicAccessBlock',
                    'EventTime': '2019-07-18 10:15:25',
                    'UserName': 'vivekananda.chagam@cloudjournee.com',
                    'IPAddress': '3.89.125.83',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'dumpcjp544'
                  },
                  {
                    'EventName': 'PutBucketPublicAccessBlock',
                    'EventTime': '2019-07-18 10:15:03',
                    'UserName': 'vivekananda.chagam@cloudjournee.com',
                    'IPAddress': '3.89.125.83',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'dumpcjp'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-18 10:15:02',
                    'UserName': 'vivekananda.chagam@cloudjournee.com',
                    'IPAddress': '3.89.125.83',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'dumpcjp'
                  },
                  {
                    'EventName': 'PutBucketPublicAccessBlock',
                    'EventTime': '2019-07-17 18:37:14',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mohan-kitchen'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-17 18:37:09',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mohan-kitchen'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-10 17:28:37',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-hr-dev-20190710172834-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-10 15:53:47',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-hr-dev-20190710155342-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-10 15:21:48',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hrchatbot-chat-20190710122217-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-10 15:21:46',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hrchatbot-chat-20190710122217-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-10 15:21:36',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hr-chatbot-web-20190710124907-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-10 15:21:34',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hr-chatbot-web-20190710124907-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-10 15:21:20',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hrportal-dev-20190710142823-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-10 15:21:17',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hrportal-dev-20190710142823-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-10 14:28:29',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hrportal-dev-20190710142823-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-10 12:49:13',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hr-chatbot-web-20190710124907-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-07-10 12:22:22',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'hrchatbot-chat-20190710122217-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-07-03 09:48:01',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'cjp-medialive-logsbucket-q19g203z1qiw'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-27 11:02:52',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '18.221.128.160',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'kubernetes-teja'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-06-27 09:58:56',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mybot-javascript-20190621103117-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-06-27 09:58:36',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mybot-javascript-20190619173808-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-06-27 09:57:54',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mybot-javascript-20190619173503-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-21 10:31:23',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mybot-javascript-20190621103117-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-19 17:38:14',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mybot-javascript-20190619173808-deployment'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-19 17:35:10',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'mybot-javascript-20190619173503-deployment'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-06-13 19:05:46',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-uploads-519852036875'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-06-13 19:05:18',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'sivaji-kinesiss-test'
                  },
                  {
                    'EventName': 'DeleteBucket',
                    'EventTime': '2019-06-13 19:03:35',
                    'UserName': 'chatbot-demosivaji-WebAppBootstrapper',
                    'IPAddress': '34.239.228.70',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-webapp-519852036875'
                  },
                  {
                    'EventName': 'PutBucketNotification',
                    'EventTime': '2019-06-11 11:37:53',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-uploads-519852036875'
                  },
                  {
                    'EventName': 'PutBucketCors',
                    'EventTime': '2019-06-11 11:37:52',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-uploads-519852036875'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-11 11:37:51',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-uploads-519852036875'
                  },
                  {
                    'EventName': 'PutBucketWebsite',
                    'EventTime': '2019-06-11 11:37:17',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-webapp-519852036875'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-11 11:37:16',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'chatbot-demosivaji-webapp-519852036875'
                  },
                  {
                    'EventName': 'CreateBucket',
                    'EventTime': '2019-06-11 10:53:53',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'BucketName': 'sivaji-kinesiss-test'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'s3_data': selected_data}
        return JsonResponse(json_data)