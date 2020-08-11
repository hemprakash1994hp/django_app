
import boto3
import json
from datetime import datetime, timedelta

from aws_regions import region_code

def delete_loadbalancer():
    pass



def elb_events(selected_regions):
    elb_list = []
    event_names = []
    collected_events = []
    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    def DeleteLoadBalancer():
        print("======================================")
        print(event)
        print("======================================")


        # if event['EventName'] == "DeleteLoadBalancer":

        elb_data = {'EventName': event['EventName'],
                        'EventTime': str(event['EventTime']).split('+')[0],
                        'Username': event['Username'],
                        'IPAddress': cloudtrail_event['sourceIPAddress'],
                        # 'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],

                        'Region': selected_region
                        }
        elb_list.append(elb_data)
        # if event['EventName'] == "DeleteLoadBalancer":
        #     elb_data = {'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
        #                 }
        #     elb_list.append(elb_data)
        # else :
        #     elb_data = {'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerArn'],
        #                 }
        #     elb_list.append(elb_data)

        return elb_list

    def ModifyLoadBalancerAttributes():
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'Username': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'Type': cloudtrail_event['userAgent'],
                    # 'HealthCheck': requestParameters_event['healthCheck'],
                    # 'LoadBalancerName': requestParameters_event['loadBalancerName'],
                    'Region': selected_region
                    }
        elb_list.append(elb_data)
        return elb_list

    def ConfigureHealthCheck():
        # print(cloudtrail_event['responseElements']['listeners'][0]['protocol'])
        # print(cloudtrail_event['responseElements']['listeners'][0]['port'])
        if event['EventName'] == "ConfigureHealthCheck":

            elb_data = {'EventName': event['EventName'],
                        'EventTime': str(event['EventTime']).split('+')[0],
                        'Username': event['Username'],
                        'IPAddress': cloudtrail_event['sourceIPAddress'],
                        'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                        'UnhealthyThreshold': cloudtrail_event['requestParameters']['healthCheck']['unhealthyThreshold'],
                        'HealthyThreshold': cloudtrail_event['requestParameters']['healthCheck']['healthyThreshold'],
                        'Protocol/port': cloudtrail_event['requestParameters']['healthCheck']['target'].split('/')[0],
                        'Region': selected_region
                        }
            elb_list.append(elb_data)
        return elb_list

    def CreateListener():
        # print(cloudtrail_event['responseElements']['listeners'][0]['protocol'])
        # print(cloudtrail_event['responseElements']['listeners'][0]['port'])
        if event['EventName'] == "CreateListener":

            elb_data = {'EventName': event['EventName'],
                        'EventTime': str(event['EventTime']).split('+')[0],
                        'Username': event['Username'],
                        'IPAddress': cloudtrail_event['sourceIPAddress'],
                        'Type': cloudtrail_event['userAgent'],
                        'Port': cloudtrail_event['responseElements']['listeners'][0]['port'],
                        'Protocol': cloudtrail_event['responseElements']['listeners'][0]['protocol'],
                        # 'HealthCheck': requestParameters_event['healthCheck'],
                        # 'LoadBalancerName': requestParameters_event['loadBalancerName'],
                        'Region': selected_region
                        }
            elb_list.append(elb_data)
        return elb_list



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
        print(response)
        for event in response['Events']:
            print('********************************')
            cloudtrail_event = json.loads(event["CloudTrailEvent"])
            if event['EventName'] == 'CreateListener':
                # print(cloudtrail_event['responseElements']['listeners'][0]['protocol'])
                print(cloudtrail_event['responseElements']['listeners'][0]['port'])
            print('===============================')
            event_names.append(event["EventName"])
            event_names_nondup = event_names
            # if event_names_nondup == 'DeleteLoadBalancer':
            #     collected_eventname = event_names_nondup



            requestParameters_event = cloudtrail_event["requestParameters"]
            responseElements_events = cloudtrail_event['responseElements']
            for i in event_names_nondup:
                    if i != "CreateLoadBalancer":

                        if event['EventName'] == i:
                            if event['EventName'] == "DeleteLoadBalancer":
                                # print(cloudtrail_event['requestParameters']['loadBalancerName'])
                                DeleteLoadBalancer()
                            if event['EventName'] == "ModifyLoadBalancerAttributes":
                                ModifyLoadBalancerAttributes()
                            if event['EventName'] == "ConfigureHealthCheck":
                                ConfigureHealthCheck()
                            if event['EventName'] == "CreateListener":
                                CreateListener()
                            # else:
                            #
                            #     elb_data = {'EventName': event['EventName'],
                            #                 'EventTime': str(event['EventTime']).split('+')[0],
                            #                 'Username': event['Username'],
                            #                 'IPAddress': cloudtrail_event['sourceIPAddress'],
                            #                 'Type': cloudtrail_event['userAgent'],
                            #                 # 'protocol': cloudtrail_event['responseElements']['listeners'][0]['protocol'],
                            #                 # 'HealthCheck': requestParameters_event['healthCheck'],
                            #                 # 'LoadBalancerName': requestParameters_event['loadBalancerName'],
                            #                 'Region': selected_region
                            #                 }
                            #     elb_list.append(elb_data)

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
        print(response)
        for event in response['Events']:
            # print(event)
            event_names.append(event["EventName"])
            event_names_nondup = list(set(event_names))
            # if event_names_nondup == 'DeleteLoadBalancer':
            #     collected_eventname = event_names_nondup

            cloudtrail_event = json.loads(event["CloudTrailEvent"])
            # requestParameters_event = cloudtrail_event["requestParameters"]
            # responseElements_events = cloudtrail_event['responseElements']
            for i in event_names_nondup:
                if i != "CreateLoadBalancer":
                    # print(i == "CreateLoadBalancer")

                    if event['EventName'] == i:
                        if event['EventName'] == "DeleteLoadBalancer":
                            print(cloudtrail_event['requestParameters']['loadBalancerName'])
                            DeleteLoadBalancer()
                        if event['EventName'] == "ModifyLoadBalancerAttributes":
                            ModifyLoadBalancerAttributes()
                        if event['EventName'] == "ConfigureHealthCheck":
                            ConfigureHealthCheck()
                        if event['EventName'] == "CreateListener":
                            CreateListener()
                        # else:
                        #
                        #     elb_data = {'EventName': event['EventName'],
                        #                 'EventTime': str(event['EventTime']).split('+')[0],
                        #                 'Username': event['Username'],
                        #                 'IPAddress': cloudtrail_event['sourceIPAddress'],
                        #                 # 'Type': cloudtrail_event['requestParameters'],
                        #                 'LoadBalancerName': requestParameters_event['loadBalancerName'],
                        #                 # 'SecurityGroups': requestParameters_event['securityGroups[]'],
                        #                 # 'Scheme': requestParameters_event['scheme'],
                        #                 # 'DNSname': responseElements_events['dNSName'],
                        #                 # 'LoadBalancerName': cloudtrail_event['loadBalancerName'],
                        #                 'Region': selected_region
                        #                 }
                        #     elb_list.append(elb_data)

    # print(collected_eventname)
    print(event)
    print(event_names)
    print(list(set(event_names)))
    # print(filtered_events)
    # return elb_list

    return DeleteLoadBalancer(), ModifyLoadBalancerAttributes(), ConfigureHealthCheck(), CreateListener()


print(elb_events(['US East (N. Virginia)']))
