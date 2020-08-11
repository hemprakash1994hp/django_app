import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_cloudtrail(request):
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'CreateTrail',
                    'EventTime': '2019-09-06 11:30:40',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'TrailName': 'cjpTrail',
                    'IsMultiRegionTrail': False
                  },
                  {
                    'EventName': 'DeleteTrail',
                    'EventTime': '2019-09-06 10:37:40',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'TrailName': 'test'
                  },
                  {
                    'EventName': 'CreateTrail',
                    'EventTime': '2019-09-06 10:36:48',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'TrailName': 'test',
                    'IsMultiRegionTrail': False
                  },
                  {
                    'EventName': 'DeleteTrail',
                    'EventTime': '2019-08-20 18:59:57',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'TrailName': 'cloudops_hp'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'cloudtrail_data': selected_data}
        return JsonResponse(json_data)