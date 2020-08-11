import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_rds(request):
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'CreateDBInstance',
                    'EventTime': '2019-09-06 10:31:58',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'VPC': 'sg-933dade9',
                    'DBInstanceIdentifier': 'database-2',
                    'Engine': 'mysql',
                    'AllocatedStorage': 20,
                    'DBInstanceClass': 'db.t2.micro'
                  },
                  {
                    'EventName': 'CreateDBInstance',
                    'EventTime': '2019-09-06 10:30:47',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US East (N. Virginia)',
                    'VPC': 'sg-933dade9',
                    'DBInstanceIdentifier': 'database-1',
                    'Engine': 'mysql',
                    'AllocatedStorage': 20,
                    'DBInstanceClass': 'db.t2.micro'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'rds_data': selected_data}
        return JsonResponse(json_data)