import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_aws_lambda(request):
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-08-23 14:53:51',
                    'UserName': 'kiran',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'AWSCostExplorerLambda',
                    'Role': 'AWSCostExplorer',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-08-23 14:52:12',
                    'UserName': 'kiran',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'AWSCostExplorerLambda',
                    'Role': 'AWSCostExplorer',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-08-23 14:50:41',
                    'UserName': 'kiran',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'AWSCostExplorerLambda',
                    'Role': 'AWSCostExplorer',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'DeleteFunction20150331',
                    'EventTime': '2019-07-10 19:19:52',
                    'UserName': 'digin',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'chatbot-hr-dev-20190710172834-UserPoolClientLambda-1IQ6S3165Z9B1'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-07-10 17:31:32',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'chatbot-hr-dev-20190710172834-UserPoolClientLambda-1IQ6S3165Z9B1',
                    'Role': 'chatbob68dc494_userpoolclient_lambda_role-dev',
                    'Runtime': 'nodejs8.10'
                  },
                  {
                    'EventName': 'DeleteFunction20150331',
                    'EventTime': '2019-07-10 16:46:01',
                    'UserName': 'digin',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'chatbot-hr-dev-20190710155342-UserPoolClientLambda-1H46HSWJ73WAJ'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-07-10 15:57:27',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'chatbot-hr-dev-20190710155342-UserPoolClientLambda-1H46HSWJ73WAJ',
                    'Role': 'chatbo19733fcc_userpoolclient_lambda_role-dev',
                    'Runtime': 'nodejs8.10'
                  },
                  {
                    'EventName': 'DeleteFunction20150331',
                    'EventTime': '2019-07-10 15:18:57',
                    'UserName': 'digin',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'hrportal-dev-20190710142823-a-UserPoolClientLambda-AE0IT91ZWSGX'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-07-10 14:32:03',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'hrportal-dev-20190710142823-a-UserPoolClientLambda-AE0IT91ZWSGX',
                    'Role': 'hrport2d05850d_userpoolclient_lambda_role-dev',
                    'Runtime': 'nodejs8.10'
                  },
                  {
                    'EventName': 'DeleteFunction20150331',
                    'EventTime': '2019-07-10 14:21:52',
                    'UserName': 'digin',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'hr-chatbot-web-20190710124907-UserPoolClientLambda-4BEW1SQER1GG'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-07-10 12:53:46',
                    'UserName': 'amplify-user',
                    'IPAddress': 'cloudformation',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'hr-chatbot-web-20190710124907-UserPoolClientLambda-4BEW1SQER1GG',
                    'Role': 'hrchat08e2263b_userpoolclient_lambda_role-web',
                    'Runtime': 'nodejs8.10'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 10:15:09',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 10:14:55',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 10:10:46',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 10:10:41',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:59:59',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:57:48',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'monitoring',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:54:47',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:52:57',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'monitoring',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:52:45',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'monitoring',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:52:14',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:50:48',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'monitoring',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:46:48',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'monitoring',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:46:23',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-10 09:43:36',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-07-09 19:05:40',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'monitoring',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 18:58:28',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 18:45:36',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 18:44:38',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:22:00',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:20:45',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:20:43',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:20:04',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:18:50',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:17:50',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:10:20',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:07:04',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:06:22',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:04:26',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:04:02',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:02:26',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:01:16',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:01:00',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:00:36',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 16:00:19',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:59:18',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:59:09',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:58:49',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:49:57',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:49:47',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:49:33',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:49:03',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:45:24',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:41:58',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:33:58',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:31:23',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:30:30',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:28:51',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:27:17',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:26:53',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:26:28',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:24:54',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:24:28',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:19:56',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:14:39',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:10:09',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 15:07:15',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 12:14:55',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:58:44',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:57:29',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:54:52',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:54:26',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:54:06',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:51:21',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:50:58',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:50:38',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:46:12',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 11:43:35',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'DeleteFunction20150331',
                    'EventTime': '2019-07-09 10:06:17',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'Book-hotel'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 10:03:42',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-09 10:00:42',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-08 17:46:05',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'CreateFunction20150331',
                    'EventTime': '2019-07-08 17:45:23',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'cloudwatch',
                    'Role': 'service-role/cloudwatch-role-3u5c6kr1',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-08 11:50:34',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'validation_chatbot_test',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-06 16:26:34',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'validation_chatbot_test',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.7'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 19:15:25',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'myself_fulfillment',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 19:14:16',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'myself_fulfillment',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 19:14:06',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'myself_fulfillment',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 19:11:44',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'myself_validation',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 17:25:49',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'Weather-validation',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 17:18:02',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'Weather-validation',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 17:13:30',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'WeatherBot',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 17:13:21',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'Weather-validation',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 17:12:44',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'WeatherBot',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  },
                  {
                    'EventName': 'UpdateFunctionCode20150331v2',
                    'EventTime': '2019-07-05 17:09:10',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'FunctionName': 'Weather-validation',
                    'Role': 'lambda-role-for-lex',
                    'Runtime': 'python3.6'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'aws_lambda_data': selected_data}
        return JsonResponse(json_data)