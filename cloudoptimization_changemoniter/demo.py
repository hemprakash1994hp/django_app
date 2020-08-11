import boto3
import json


from datetime import datetime, timedelta

from aws_regions import region_code


def cloudtrail_events(selected_regions):

    trails_list = []

    today_date = datetime.now().isoformat(" ", "seconds")
    print(today_date)
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    print(end_time)
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)
    print(start_time)

    for selected_region in selected_regions:
        client = boto3.client("cloudtrail", region_name=region_code(selected_region))

        response = client.lookup_events(
            LookupAttributes=[
                {"AttributeKey": "ResourceType", "AttributeValue": 'AWS::CloudTrail::Trail'}
            ],
            StartTime=start_time,
            EndTime=end_time,
            MaxResults=100,
        )

        for event in response["Events"]:
            cloudtrail_event = json.loads(event["CloudTrailEvent"])
            if event['EventName'] == 'CreateTrail' or event['EventName'] == 'DeleteTrail':

                if '/' in cloudtrail_event['requestParameters']['name']:
                    trail_name = str(cloudtrail_event['requestParameters']['name']).split('/')[-1]
                else:
                    trail_name = cloudtrail_event['requestParameters']['name']

                trails = {
                    "EventName": event["EventName"],
                    "EventTime": str(event["EventTime"])[:-6],
                    "UserName": event["Username"],
                    "IPAddress": cloudtrail_event["sourceIPAddress"],
                    "Region": selected_region,
                    "TrailName": trail_name
                }

                if cloudtrail_event['responseElements'] != None:
                    trails["IsMultiRegionTrail"] = cloudtrail_event['responseElements']['isMultiRegionTrail']

                trails_list.append(trails)


    return trails_list

print(cloudtrail_events(['US West (Oregon)']))
#print(cloudtrail_events(['US East (N. Virginia)']))


