import time

import json
from datetime import datetime, timedelta

import boto3
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# from aws_regions import region_code
# from aws_regions import region_code
from aws_regions import region_code

create_hosted_zone_list = []

def CreateHostedZone(event, cloudtrail_event, selected_region):
        route53_data = {'EventName': event['EventName'],
                        'EventTime': str(event['EventTime']).split('+')[0],
                        'UserName': event['Username'],
                        'IPAddress': cloudtrail_event['sourceIPAddress'],
                        'CallerReference': cloudtrail_event['requestParameters']['callerReference'],
                        'HostedZoneName': cloudtrail_event['requestParameters']['name'],
                        'ChangeInfo_Status': cloudtrail_event['responseElements']['changeInfo']['status'],
                        'ChangeInfo_Id': cloudtrail_event['responseElements']['changeInfo']['id'].split('/')[-1],
                        'ChangeInfo_SubmittedAt': cloudtrail_event['responseElements']['changeInfo']['submittedAt'],
                        'Location': cloudtrail_event['responseElements']['location'],
                        'ResourceRecordSetCount': cloudtrail_event['responseElements']['hostedZone'][
                            'resourceRecordSetCount'],
                        'HostedZone_Id': cloudtrail_event['responseElements']['hostedZone']['id'].split('/')[-1],
                        # 'NameServers': cloudtrail_event['responseElements']['delegationSet']['nameServers'],
                        'Region': selected_region
                        }
        if 'delegationSet' in cloudtrail_event['responseElements']:
            NameServers = cloudtrail_event['responseElements']['delegationSet']['nameServers'],
            route53_data['NameServers'] = NameServers
        create_hosted_zone_dict = {
            "HostedZoneId": cloudtrail_event['responseElements']['hostedZone']['id'].split('/')[-1],
            "HostedZoneName": cloudtrail_event['requestParameters']['name']
        }
        create_hosted_zone_list.append(create_hosted_zone_dict)
        return route53_data


def ChangeResourceRecordSets(event, cloudtrail_event, selected_region):
        route53_data = {'EventName': event['EventName'],
                        'EventTime': str(event['EventTime']).split('+')[0],
                        'UserName': event['Username'],
                        'IPAddress': cloudtrail_event['sourceIPAddress'],
                        'HostedZoneId': cloudtrail_event['requestParameters']['hostedZoneId'],
                        'Action': cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['action'],
                        'ResourceRecordSetType':
                            cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet'][
                                'type'],
                        'ResourceRecordSetTTL':
                            cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet'][
                                'tTL'],
                        'ResourceRecordsValue':
                            cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet'][
                                'resourceRecords'][0]['value'],
                        'ResourceRecordSetName':
                            cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet'][
                                'name'],
                        'ChangeInfo_Status': cloudtrail_event['responseElements']['changeInfo']['status'],
                        'ChangeInfo_Id': cloudtrail_event['responseElements']['changeInfo']['id'].split('/')[-1],
                        'ChangeInfo_submittedAt': cloudtrail_event['responseElements']['changeInfo']['submittedAt'],
                        'Region': selected_region
                        }
        return route53_data


def DeleteHostedZone(event, cloudtrail_event, selected_region):
        global DeleteHostedZone_Id
        global CreateHostedZone_Id
        global DeleteHostedZone_Name

        DeleteHostedZone_Id = cloudtrail_event['requestParameters']['id']
        route53_data = {'EventName': event['EventName'],
                        'EventTime': str(event['EventTime']).split('+')[0],
                        'UserName': event['Username'],
                        'IPAddress': cloudtrail_event['sourceIPAddress'],
                        'HostedZoneId': cloudtrail_event['requestParameters']['id'],
                        'Region': selected_region
                        }
        if cloudtrail_event['responseElements'] != None:
            ChangeInfo_Status = cloudtrail_event['responseElements']['changeInfo']['status']
            ChangeInfo_Id = cloudtrail_event['responseElements']['changeInfo']['id'].split('/')[-1]
            ChangeInfo_SubmittedAt = cloudtrail_event['responseElements']['changeInfo']['submittedAt']
            route53_data['ChangeInfo_Status'] = ChangeInfo_Status
            route53_data['ChangeInfo_Id'] = ChangeInfo_Id
            route53_data['ChangeInfo_SubmittedAt'] = ChangeInfo_SubmittedAt

        for create_hosted_zone_id in create_hosted_zone_list:
            if cloudtrail_event['requestParameters']['id'] == create_hosted_zone_id['HostedZoneId']:
                route53_data['HostedZoneName'] = create_hosted_zone_id['HostedZoneName']
        return route53_data

@csrf_exempt
def route53_events(request):
    route53_list = []
    CreateHostedZone_list = []
    ChangeResourceRecordSets_list = []
    DeleteHostedZoneData_list =[]

    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        print(regions)

    event_names = ['CreateHostedZone', 'ChangeResourceRecordSets', 'DeleteHostedZone']
    for selected_region in regions:
        client = boto3.client("cloudtrail", region_name=region_code(selected_region))

        for event_name in event_names:
            response = client.lookup_events(
                LookupAttributes=[
                    {"AttributeKey": "EventName",
                     "AttributeValue": event_name}
                ],
                StartTime=start_time,
                EndTime=end_time,
                MaxResults=1000,
            )
            print(event_name)
            print(response)

            for event in response['Events']:
                cloudtrail_event = json.loads(event["CloudTrailEvent"   ])
                if event['EventName'] == 'CreateHostedZone':
                    print("Inside CreateHostedZone")
                    CreateHostedZoneData = CreateHostedZone(event, cloudtrail_event, selected_region)
                    CreateHostedZone_list.append(CreateHostedZoneData)
                    # route53_list.append(CreateHostedZoneData)
                if event['EventName'] == 'ChangeResourceRecordSets':
                    print("Inside ChangeResourceRecordSets")
                    ChangeResourceRecordSetsData = ChangeResourceRecordSets(event, cloudtrail_event, selected_region)
                    ChangeResourceRecordSets_list.append(ChangeResourceRecordSetsData)
                    # route53_list.append(ChangeResourceRecordSetsData)
                if event['EventName'] == 'DeleteHostedZone':
                    print("Inside DeleteHostedZone")
                    DeleteHostedZoneData = DeleteHostedZone(event, cloudtrail_event, selected_region)
                    DeleteHostedZoneData_list.append(DeleteHostedZoneData)
                    # route53_list.append(DeleteHostedZoneData)
                    # print(DeleteHostedZoneData)
    print(len(route53_list))
    route53_list.append(CreateHostedZone_list)
    route53_list.append(ChangeResourceRecordSets_list)
    route53_list.append(DeleteHostedZoneData_list)
    # return ChangeResourceRecordSets_list
    # return route53_list

    time.sleep(1)
    json_data = {'route53_list': route53_list, 'events_list': event_names}
    # json_data = {'CreateHostedZone': CreateHostedZone_list, 'ChangeResourceRecordSets': ChangeResourceRecordSets_list}
    return JsonResponse(json_data)

# print(route53_events(['US West (Oregon)']))

# print(route53_events(['US East (N. Virginia)']))

