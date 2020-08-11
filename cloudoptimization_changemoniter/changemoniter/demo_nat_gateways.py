import json
from datetime import datetime, timedelta

import boto3

# from django.utils.datetime_safe import datetime

from aws_regions import region_code


def natgateways_events(selected_regions):
    ec2 = boto3.client('ec2', region_name=region_code(selected_regions))
    client = boto3.client('cloudwatch', region_name=region_code(selected_regions))
    # nat_gateway_response = client.describe_nat_gateways()
    # response = client.Metric(cw:dashboard)
    # response = client.list_metrics()

    natgateway=ec2.describe_nat_gateways()
    for event in natgateway['NatGateways']:
        print(event)
        natgateway_data = {
            'NatGatewayName': event["Tags"][0]["Value"],
            'NatGatewayId': event["NatGatewayId"],
            'PublicIp': event["NatGatewayAddresses"][0]["PublicIp"],
            'PrivateIp': event["NatGatewayAddresses"][0]["PrivateIp"],
            'CreateTime': str(event['CreateTime']).split('+')[0],
            'VpcId': event["VpcId"],
            'SubnetId': event["SubnetId"],
            'NetworkInterfaceId': event["NatGatewayAddresses"][0]["NetworkInterfaceId"],
            'State': event["State"],
        }

        natgateway_name = event["Tags"][0]["Value"]
        natgateway_id = event["NatGatewayId"]

    print(natgateway_data)
    today_date = datetime.now().isoformat(" ", "seconds")
    response = client.get_metric_statistics(
        Namespace='AWS/NATGateway',
        MetricName='ActiveConnectionCount',
        Dimensions=[
            {
                'Name': 'NatGatewayId',
                'Value': natgateway_id
            },
        ],
        StartTime=datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=31, seconds=0), #datetime(2019, 12, 2, 10, 30, 00),
        EndTime=datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S"), #datetime(2019, 12, 3, 13, 10, 00),
        Period=2592000, #43200, #2592000
        Statistics=['Average', 'SampleCount', 'Sum', 'Minimum', 'Maximum'],
        Unit='Count'
    )
    start_date = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=31, seconds=0)
    end_date = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    s_date = str(start_date).split(' ')[0]
    e_date = str(end_date).split(' ')[0]
    client_cost = boto3.client('ce')
    cost_explorer = client_cost.get_cost_and_usage(
        TimePeriod={
            'Start': s_date, #'2019-12-02',
            'End': e_date, #'2019-12-03',
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
                    natgateway_id,
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
            'AmortizedCost','BlendedCost',
        ],
        GroupBy=[
            {
                'Type': 'COST_CATEGORY',
                'Key': natgateway_id
            },
        ],
        # NextPageToken='string'
    )


    # cost_client = boto3.client('pricing')
    # cost_response = cost_client.get_products(
    #     ServiceCode='AmazonVPC',
    #     Filters=[
    #         {
    #             'Type': 'TERM_MATCH',
    #             'Field': 'NatGateway',
    #             'Value': 'General Purpose'
    #         },
    #     ],
    #     # FormatVersion='string',
    #     # NextToken='string',
    #     # MaxResults=123
    # )

    # cost_client = boto3.client('pricing')
    # cost_response = cost_client.describe_budget(
    #     AccountId='5198-5203-6875',
    #     BudgetName='s3'
    # )

    # response = client.get_metric_data('MetricDataQueries')
    print(natgateway_id)
    print(cost_explorer)
    # print(cost_response)
    # print(response_metrics_list)
    return response


print(natgateways_events('US East (N. Virginia)'))
