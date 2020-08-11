import boto3
import json
from datetime import datetime, timedelta

from aws_regions import region_code


def natgateways_events(selected_regions):
    elb_list = []
    event_names = []
    elb_collected_events = []
    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=30, seconds=0)

    for selected_region in selected_regions:
        client = boto3.client('cloudtrail', region_name=region_code(selected_region))

        response = client.lookup_events(
            LookupAttributes=[
                {
                    'AttributeKey': 'ResourceType',
                    'AttributeValue': 'AWS::EC2::NatGateway'

                },
            ],
            StartTime=start_time,
            EndTime=end_time,
            MaxResults=1000,
        )

        for event in response['Events']:
            cloudtrail_event = json.loads(event["CloudTrailEvent"])
        print(event)

        print(cloudtrail_event)


        return response
print(natgateways_events(['US East (N. Virginia)']))