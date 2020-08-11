import boto3
import json
from datetime import datetime, timedelta

from aws_regions import region_code


def elb_events(selected_regions):
    elb_list = []
    event_names = []
    elb_collected_events = []
    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    def elb_v1_events():
        events = []
        for selected_region in selected_regions:
            client = boto3.client('cloudtrail', region_name=region_code(selected_region))

            response = client.lookup_events(
                LookupAttributes=[
                    {
                        'AttributeKey': 'ResourceType',
                        'AttributeValue': 'AWS::ElasticLoadBalancing::LoadBalancer'
                    },
                ],
                StartTime=start_time,
                EndTime=end_time,
                MaxResults=1000,
            )
            elb_collected_events.append(response['Events'])
            # for event in response['Events']:
            #     events = event

                # event_names.append(event["EventName"])

            return elb_collected_events

    def elb_V2_events():
        for selected_region in selected_regions:
            client = boto3.client('cloudtrail', region_name=region_code(selected_region))

            response = client.lookup_events(
                LookupAttributes=[
                    {
                        'AttributeKey': 'ResourceType',
                        'AttributeValue': 'AWS::ElasticLoadBalancingV2::LoadBalancer'
                    },

                ],
                StartTime=start_time,
                EndTime=end_time,
                MaxResults=1000,
            )
            elb_collected_events.append(response['Events'])
            # for event in response['Events']:
            #     # event_names.append(event["EventName"])

            return elb_collected_events

    # print(elb_v1_events())
    # print(elb_V2_events())
    # elb_collected_events = elb_v1_events()
    # elb_v2_collected_events =elb_V2_events()
    print(elb_collected_events)
    for event in elb_collected_events:
        print(event["EventName"])
        event_names.append(event["EventName"])
        event_names_nondup = list(set(event_names))


        cloudtrail_event = json.loads(event["CloudTrailEvent"])
        print("this is before if")
        for i in event_names_nondup:

            if event['EventName'] == i:
                print("this is inside if ")
                elb_data = {'EventName': event['EventName'],
                            'EventTime': str(event['EventTime']).split('+')[0],
                            'Username': event['Username'],
                            'IPAddress': cloudtrail_event['sourceIPAddress'],
                            # 'Region': selected_region
                            }
                elb_list.append(elb_data)
    print(event_names_nondup)
    print(event)
    print(event_names)
    print(list(set(event_names)))
    return elb_list


print(elb_events(['US East (N. Virginia)']))
