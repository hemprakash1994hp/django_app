import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_cloudformation(request):
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 19:19:37',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710172834-authchatbothrb68dc494-P4G63MZRK5H0'
                  },
                  {
                    'EventName': 'UpdateStack',
                    'EventTime': '2019-07-10 17:30:28',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710172834'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-07-10 17:28:33',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710172834'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 16:46:20',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710155342'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 16:45:47',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710155342-authchatbothr19733fcc-QYRZXFMK59HG'
                  },
                  {
                    'EventName': 'UpdateStack',
                    'EventTime': '2019-07-10 15:56:22',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710155342'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-07-10 15:53:43',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chatbot-hr-dev-20190710155342'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 15:19:21',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hrportal-dev-20190710142823'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 15:18:43',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hrportal-dev-20190710142823-authhrportal2d05850d-1PYBSJMLS450G'
                  },
                  {
                    'EventName': 'UpdateStack',
                    'EventTime': '2019-07-10 14:30:56',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hrportal-dev-20190710142823'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-07-10 14:28:25',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hrportal-dev-20190710142823'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 14:24:18',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hr-chatbot-web-20190710124907'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 14:21:38',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hr-chatbot-web-20190710124907-authhrchatbot08e2263b-1VRL8NK9YD0N6'
                  },
                  {
                    'EventName': 'UpdateStack',
                    'EventTime': '2019-07-10 12:52:45',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hr-chatbot-web-20190710124907'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-07-10 12:49:09',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hr-chatbot-web-20190710124907'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-07-10 12:33:33',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hrchatbot-chat-20190710122217'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-07-10 12:22:17',
                    'UserName': 'amplify-user',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'hrchatbot-chat-20190710122217'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-27 10:03:21',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-27 10:00:03',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-27 09:55:54',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-27 09:47:08',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-26 10:59:50',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-26 10:58:45',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-25 18:54:01',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'UpdateStack',
                    'EventTime': '2019-06-21 10:34:56',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-06-21 10:31:20',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190621103117'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-20 15:44:41',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190619173503'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-20 15:44:32',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190619173808'
                  },
                  {
                    'EventName': 'UpdateStack',
                    'EventTime': '2019-06-19 17:45:49',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190619173808'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-06-19 17:38:10',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190619173808'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-06-19 17:35:05',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'mybot-javascript-20190619173503'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-19 16:37:22',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chat-bot'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-13 19:03:31',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chat-bot'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-06-11 11:37:06',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'chat-bot'
                  },
                  {
                    'EventName': 'DeleteStack',
                    'EventTime': '2019-06-11 11:12:51',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'sivaji-kenisis-test-stack'
                  },
                  {
                    'EventName': 'CreateStack',
                    'EventTime': '2019-06-11 11:11:40',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'StackName': 'sivaji-kenisis-test-stack'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'cloudformation_data': selected_data}
        return JsonResponse(json_data)