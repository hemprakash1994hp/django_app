import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from changemoniter.elb_v1 import elb_events
from changemoniter.elb_v2 import elb_events_v2
from changemoniter.route53 import route53_events


@csrf_exempt
def elb(request):
    print("Inside elb_v1")
    elbs_events = []
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        print(regions)
        # for region in regions:
        elb_events_data = elb_events(regions)
        elb_events_v2_data =elb_events_v2(regions)
    # elb_events_data.append(elb_events_v2_data)
    # elbs_events.append(elb_events_data)
    # elbs_events.append(elb_events_v2_data)
        # elbs_events.append(elb_events(regions))
        # elbs_events.append(elb_events_v2(regions))
    # context = elb_events_data
    # print(elb_events_data)

    # return elbs_events

    time.sleep(1)
    json_data = {'elb_data': elb_events_data + elb_events_v2_data}
    return JsonResponse(json_data)

# @csrf_exempt
# def route53(request):
#
#     # if request.is_ajax():
#     #     selected_regions = request.POST.get('regions')
#     #     regions = json.loads(selected_regions)
#     #     print(regions)
#
#     route53_events_data = route53_events(request)
#     print(len(route53_events_data))
#
#     # time.sleep(1)
#     # json_data = {'route53_data': route53_events_data}
#     # return JsonResponse(json_data)
#
# # print(route53(['US West (Oregon)']))
# print(route53(['US East (N. Virginia)']))
# # print(elb(['US East (N. Virginia)']))