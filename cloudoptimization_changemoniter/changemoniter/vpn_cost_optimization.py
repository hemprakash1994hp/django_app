import json
from datetime import datetime, timedelta

import boto3

from hurry.filesize import size
from aws_regions import region_code


def vpn_events(selected_regions):
    ec2 = boto3.client('ec2', region_name=region_code(selected_regions))
    client = boto3.client('cloudwatch', region_name=region_code(selected_regions))
    cloudtrail = boto3.client('cloudtrail', region_name=region_code(selected_regions))

    today_date = datetime.now().isoformat(" ", "seconds")
    start_date = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=30, seconds=0)
    end_date = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")

    vpn = ec2.describe_vpn_connections()
    VpnConnections_length = len(vpn['VpnConnections'])
    print(VpnConnections_length)
    vpn_collected_data = []
    for event in vpn['VpnConnections']:
        print(event)
        vpn_data = {
            'VpnName': event["Tags"][0]["Value"],
            'VpnConnectionId': event["VpnConnectionId"],
            'CustomerGatewayId': event["CustomerGatewayId"],
            'VpnGatewayId': event["VpnGatewayId"],
            'NoOfTunnels': len(event["VgwTelemetry"]),
            'State': event["State"],
        }
        tunnel_length = len(event["VgwTelemetry"])

        active_count = 0
        for i in range(tunnel_length):
            if event["VgwTelemetry"][i]["Status"] == "UP":
                active_count = active_count + 1
        print(active_count)
        vpn_data["ActiveTunnels"] = active_count
        inactive_count = 0
        for i in range(tunnel_length):
            if event["VgwTelemetry"][i]["Status"] == "DOWN":
                inactive_count = inactive_count + 1
        print(inactive_count)
        vpn_data["InActiveTunnels"] = inactive_count
        vpn_collected_data.append(vpn_data)

        cloudtrail_response = cloudtrail.lookup_events(
            LookupAttributes=[
                {
                    'AttributeKey': 'ResourceName',
                    'AttributeValue': vpn_data["VpnConnectionId"]

                },
            ],
            StartTime=start_date,
            EndTime=end_date,
            MaxResults=1000,
        )
        for cloudtrail_event in cloudtrail_response['Events']:
            cloudtrail_collect_event = json.loads(cloudtrail_event["CloudTrailEvent"])

            if cloudtrail_event['EventName'] == "CreateVpnConnection":
                cloudtrail_data = {
                    'creationDate': cloudtrail_collect_event["userIdentity"]["sessionContext"]["attributes"]["creationDate"],
                    'awsRegion': cloudtrail_collect_event["awsRegion"],
                }
                print(cloudtrail_data)
               
                vpn_collected_data.append(cloudtrail_data)
        print(cloudtrail_response)
    print(tunnel_length)

    print(vpn_data["VpnConnectionId"])

    dimensions_data = [{'Name': 'VpnId', 'Value': vpn_data["VpnConnectionId"]}]
    for metric_name in range(tunnel_length):
        dimensions = {'Name': 'TunnelIpAddress', 'Value': event["VgwTelemetry"][metric_name]["OutsideIpAddress"]}
        dimensions_data.append(dimensions)

    vpn_metric = []

    for dimension in dimensions_data:
            vpn_metric_collect = client.get_metric_statistics(
                Namespace='AWS/VPN',
                MetricName='TunnelDataIn',
                Dimensions=[dimension],
                StartTime=start_date, #datetime(2019, 12, 1, 5, 30, 00),
                EndTime=end_date, #datetime(2019, 12, 20, 5, 29, 00),
                Period=2592000,  # 43200, #2592000
                Statistics=['Average', 'SampleCount', 'Sum', 'Minimum', 'Maximum'],
                Unit='Bytes'
            )
            vpn_metric.append(vpn_metric_collect)
            # print(vpn_metric["Datapoints"]["Sum"])
    print(vpn_metric)
    print(len(vpn_metric))
    sum = size(vpn_metric[0]["Datapoints"][0]["Sum"])
    if sum <= "2":

        for tunnel_count in range(len(vpn_metric)):
            get_tunnel ={
                'sum': vpn_metric[tunnel_count]["Datapoints"][0]["Sum"]
            }
            vpn_collected_data.append(get_tunnel)
            print(get_tunnel)

        print(vpn_data)
        print(sum)


    s_date = str(start_date).split(' ')[0]
    e_date = str(end_date).split(' ')[0]
    client_cost = boto3.client('ce')
    cost_explorer = client_cost.get_cost_and_usage(
        TimePeriod={
            'Start': s_date,
            'End': e_date,
        },
        Granularity='MONTHLY',
        Filter={
            # 'Or': [
            #     {'... recursive ...'},
            # ],
            # 'And': [
            #     {"Or": [ {"Dimensions": { "Key": "REGION", "Values": [ "us-east-1", "us-west-1" ] }}, {"Tags": { "Key": "NatGatewayId", "Values": [natgateway_id] } } ]}, {"Not": {"Dimensions": { "Key": "USAGE_TYPE", "Values": ["DataTransfer"] }}},
            # ],
            # 'Not': {'... recursive ...'},
            'Dimensions': {
                'Key': 'USAGE_TYPE',
                'Values': [
                    vpn_data["VpnConnectionId"],
                ]
            },
            # 'Tags': {
            #     'Key': 'string',
            #     'Values': [
            #         'string',
            #     ]
            # },
            # 'CostCategories': {
            #     'Key': 'NatGatewayId',
            #     'Values': [
            #         natgateway_id,
            #     ]
            # }
        },
        Metrics=[
            'AmortizedCost', 'BlendedCost',
        ],
        GroupBy=[
            {
                'Type': 'COST_CATEGORY',
                'Key': vpn_data["VpnConnectionId"]
            },
        ],
        # NextPageToken='string'
    )



    print(vpn_collected_data)
    print(vpn_metric[0]["Datapoints"][0]["Sum"])
    print(dimensions_data)
    print(cost_explorer)
    return vpn


print(vpn_events('US East (N. Virginia)'))
