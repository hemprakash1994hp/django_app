import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_cloudwatch(request):
    print("Inside cloudwatch")
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-08-29 15:33:40',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'ConsumedReadCapacityUnits',
                    'Namespace': 'AWS/DynamoDB',
                    'AlaramName': 'Music-ReadCapacityUnitsLimit-BasicAlarm'
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-08-29 15:33:40',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'ConsumedWriteCapacityUnits',
                    'Namespace': 'AWS/DynamoDB',
                    'AlaramName': 'Music-WriteCapacityUnitsLimit-BasicAlarm'
                  },
                  {
                    'EventName': 'DeleteAlarms',
                    'EventTime': '2019-07-25 12:37:20',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'AlarmName': [
                      'Music-ReadCapacityUnitsLimit-BasicAlarm',
                      'Music-WriteCapacityUnitsLimit-BasicAlarm'
                    ]
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-07-25 11:04:17',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'ConsumedReadCapacityUnits',
                    'Namespace': 'AWS/DynamoDB',
                    'AlaramName': 'Music-ReadCapacityUnitsLimit-BasicAlarm'
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-07-25 11:04:17',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'ConsumedWriteCapacityUnits',
                    'Namespace': 'AWS/DynamoDB',
                    'AlaramName': 'Music-WriteCapacityUnitsLimit-BasicAlarm'
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-07-04 17:11:14',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'GlobalPartitionCount',
                    'Namespace': 'AWS/Kafka',
                    'AlaramName': 'alarm'
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-07-04 17:04:14',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'GlobalPartitionCount',
                    'Namespace': 'AWS/Kafka',
                    'AlaramName': 'alarm'
                  },
                  {
                    'EventName': 'DeleteAlarms',
                    'EventTime': '2019-07-04 17:01:59',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'AlarmName': [
                      'thesshold'
                    ]
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-07-04 16:55:46',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'GlobalPartitionCount',
                    'Namespace': 'AWS/Kafka',
                    'AlaramName': 'thesshold'
                  },
                  {
                    'EventName': 'PutMetricAlarm',
                    'EventTime': '2019-07-04 16:55:19',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'MetricName': 'GlobalPartitionCount',
                    'Namespace': 'AWS/Kafka',
                    'AlaramName': 'thesshold'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'cloudwatch_data': selected_data}
        return JsonResponse(json_data)