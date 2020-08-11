import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_iam_profile(request):
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
                      'EventName':'DeleteLoginProfile',
                      'EventTime':'2019-08-27 15:00:51',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'ToUserName':'mahesh.bheemavarapu@cloudjournee.com'
                   },
                   {
                      'EventName':'CreateLoginProfile',
                      'EventTime':'2019-08-14 18:41:50',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'ToUserName':'cloudOptimization'
                   },
                   {
                      'EventName':'CreateLoginProfile',
                      'EventTime':'2019-07-17 14:19:32',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'ToUserName':'srihari.kurapati@cloudjournee.com'
                   },
                   {
                      'EventName':'DeleteLoginProfile',
                      'EventTime':'2019-07-17 14:17:52',
                      'CreatedUser':'kiran',
                      'IPAddress':'122.166.175.59',
                      'ToUserName':'Site24'
                   },
                   {
                      'EventName':'DeleteLoginProfile',
                      'EventTime':'2019-07-08 17:54:55',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'ToUserName':'testcjp'
                   },
                   {
                      'EventName':'CreateLoginProfile',
                      'EventTime':'2019-07-08 17:53:53',
                      'CreatedUser':'digin',
                      'IPAddress':'122.166.175.59',
                      'ToUserName':'testcjp'
                   }
                ]
                selected_data.extend(data)

        time.sleep(1)
        print(selected_data)
        json_data = {'iam_profile_data': selected_data}
        return JsonResponse(json_data)