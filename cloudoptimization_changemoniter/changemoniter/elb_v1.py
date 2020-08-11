import time
import boto3
import json

from datetime import datetime, timedelta
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from aws_regions import region_code


def CreateLoadBalancer(event, cloudtrail_event, selected_region):
    print(cloudtrail_event)
    elb_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                # 'Subnets': cloudtrail_event['requestParameters']['subnets'][0],
                'SecurityGroups': cloudtrail_event['requestParameters']['securityGroups'][0],
                'Protocol': cloudtrail_event['requestParameters']['listeners'][0]['protocol'],
                'LoadBalancerPort': cloudtrail_event['requestParameters']['listeners'][0]['loadBalancerPort'],
                # 'InstanceProtocol': cloudtrail_event['requestParameters']['listeners'][0]['instanceProtocol'],
                'InstancePort': cloudtrail_event['requestParameters']['listeners'][0]['instancePort'],
                # 'Scheme': cloudtrail_event['requestParameters']['scheme'],
                'DNSName': cloudtrail_event['responseElements']['dNSName'],
                'Region': selected_region
                }
    if 'subnets' in cloudtrail_event['requestParameters']:
        Subnets = cloudtrail_event['requestParameters']['subnets'],
        elb_data['Subnets'] = Subnets
    if 'instanceProtocol' in cloudtrail_event['requestParameters']['listeners'][0]:
        InstanceProtocol = cloudtrail_event['requestParameters']['listeners'][0]['instanceProtocol'],
        elb_data['InstanceProtocol'] = InstanceProtocol
    if 'scheme' in cloudtrail_event['requestParameters']:
        Scheme = cloudtrail_event['requestParameters']['scheme'],
        elb_data['Scheme'] = Scheme
    if 'availabilityZones' in cloudtrail_event['requestParameters']:
        AvailabilityZones = cloudtrail_event['requestParameters']['availabilityZones'][0],
        elb_data['AvailabilityZones'] = AvailabilityZones

    return elb_data


def CreateLoadBalancerListeners(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'SSLCertificateId': cloudtrail_event['requestParameters']['listeners'][0]['sSLCertificateId'],
                    'Protocol': cloudtrail_event['requestParameters']['listeners'][0]['protocol'],
                    'loadBalancerPort': cloudtrail_event['requestParameters']['listeners'][0]['loadBalancerPort'],
                    'InstanceProtocol': cloudtrail_event['requestParameters']['listeners'][0]['instanceProtocol'],
                    'InstancePort': cloudtrail_event['requestParameters']['listeners'][0]['instancePort'],
                    'Region': selected_region
                    }
        return elb_data


def ModifyLoadBalancerAttributes(event, cloudtrail_event, selected_region):
    elb_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                'CrossZoneLoadBalancingEnabled': cloudtrail_event['requestParameters']['loadBalancerAttributes']['crossZoneLoadBalancing']['enabled'],
                'ConnectionDrainingEnabled': cloudtrail_event['requestParameters']['loadBalancerAttributes']['connectionDraining']['enabled'],
                'ConnectionDrainingTimeout': cloudtrail_event['requestParameters']['loadBalancerAttributes']['connectionDraining']['timeout'],
                'Region': selected_region
                }
    return elb_data


def ConfigureHealthCheck(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'Target': cloudtrail_event['requestParameters']['healthCheck']['target'],
                    'Interval': cloudtrail_event['requestParameters']['healthCheck']['interval'],
                    'Timeout': cloudtrail_event['requestParameters']['healthCheck']['timeout'],
                    'UnhealthyThreshold': cloudtrail_event['requestParameters']['healthCheck']['unhealthyThreshold'],
                    'HealthyThreshold': cloudtrail_event['requestParameters']['healthCheck']['healthyThreshold'],
                    'Protocol': cloudtrail_event['requestParameters']['healthCheck']['target'].split('/')[0],
                    'Region': selected_region
                    }
        return elb_data


def ApplySecurityGroupsToLoadBalancer(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'SecurityGroups': cloudtrail_event['responseElements']['securityGroups'][0],
                    'Region': selected_region
                    }
        return elb_data


def DeregisterInstancesFromLoadBalancer(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'InstanceId': cloudtrail_event['requestParameters']['instances'][0]['instanceId'],
                    'Region': selected_region
                    }
        return elb_data


def SetLoadBalancerPoliciesOfListener(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'LoadBalancerPort': cloudtrail_event['requestParameters']['loadBalancerPort'],
                    'Region': selected_region
                    }
        return elb_data


def RegisterInstancesWithLoadBalancer(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'InstanceId': cloudtrail_event['requestParameters']['instances'][0]['instanceId'],
                    'Region': selected_region
                    }
        return elb_data


def DeleteLoadBalancer(event, cloudtrail_event, selected_region):
    elb_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                'Region': selected_region
                }
    return elb_data


def DeleteLoadBalancerListeners(event, cloudtrail_event, selected_region):
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event['Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    'LoadBalancerPorts': cloudtrail_event['requestParameters']['loadBalancerPorts'][0],
                    'Region': selected_region
                    }
        return elb_data

@csrf_exempt
def elb_events(request):
    elb_list = []
    event_names = []
    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    # if request.is_ajax():
    #     selected_regions = request.POST.get('regions')
    #     regions = json.loads(selected_regions)
    #     print(regions)

    for selected_region in request:

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

            cloudtrail_event = json.loads(event["CloudTrailEvent"])

            for i in event_names_nondup:
                # if i != "CreateLoadBalancer":
                if event['EventName'] == i:

                    if event['EventName'] == "CreateLoadBalancer":
                        CreateLoadBalancerData = CreateLoadBalancer(event, cloudtrail_event, selected_region)
                        elb_list.append(CreateLoadBalancerData)
                    if event['EventName'] == "DeleteLoadBalancer":
                        DeleteLoadBalancerdata = DeleteLoadBalancer(event, cloudtrail_event, selected_region)
                        elb_list.append(DeleteLoadBalancerdata)
                    if event['EventName'] == "ModifyLoadBalancerAttributes":
                        ModifyLoadBalancerAttributesData = ModifyLoadBalancerAttributes(event, cloudtrail_event,
                                                                                        selected_region)
                        elb_list.append(ModifyLoadBalancerAttributesData)
                    if event['EventName'] == "ConfigureHealthCheck":
                        ConfigureHealthCheckData = ConfigureHealthCheck(event, cloudtrail_event, selected_region)
                        elb_list.append(ConfigureHealthCheckData)
                    if event['EventName'] == "ApplySecurityGroupsToLoadBalancer":
                        ApplySecurityGroupsToLoadBalancerData = ApplySecurityGroupsToLoadBalancer(event,
                                                                                                  cloudtrail_event,
                                                                                                  selected_region)
                        elb_list.append(ApplySecurityGroupsToLoadBalancerData)
                    if event['EventName'] == "DeregisterInstancesFromLoadBalancer":
                        DeregisterInstancesFromLoadBalancerData = DeregisterInstancesFromLoadBalancer(event,
                                                                                                      cloudtrail_event,
                                                                                                      selected_region)
                        elb_list.append(DeregisterInstancesFromLoadBalancerData)
                    if event['EventName'] == "SetLoadBalancerPoliciesOfListener":
                        SetLoadBalancerPoliciesOfListenerData = SetLoadBalancerPoliciesOfListener(event,
                                                                                                  cloudtrail_event,
                                                                                                  selected_region)
                        elb_list.append(SetLoadBalancerPoliciesOfListenerData)
                    if event['EventName'] == "DeleteLoadBalancerListeners":
                        DeleteLoadBalancerListenersData = DeleteLoadBalancerListeners(event, cloudtrail_event,
                                                                                      selected_region)
                        elb_list.append(DeleteLoadBalancerListenersData)
                    if event['EventName'] == "CreateLoadBalancerListeners":
                        CreateLoadBalancerListenersData = CreateLoadBalancerListeners(event, cloudtrail_event,
                                                                                      selected_region)
                        elb_list.append(CreateLoadBalancerListenersData)
                    if event['EventName'] == "RegisterInstancesWithLoadBalancer":
                        RegisterInstancesWithLoadBalancerData = RegisterInstancesWithLoadBalancer(event,
                                                                                                  cloudtrail_event,
                                                                                                  selected_region)
                        elb_list.append(RegisterInstancesWithLoadBalancerData)
                    # else:
                    #
                    #     elb_data = {'EventName': event['EventName'],
                    #                 'EventTime': str(event['EventTime']).split('+')[0],
                    #                 'Username': event['Username'],
                    #                 'IPAddress': cloudtrail_event['sourceIPAddress'],
                    #                 'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerName'],
                    #                 # 'SecurityGroups': requestParameters_event['securityGroups[]'],
                    #                 # 'Scheme': requestParameters_event['scheme'],
                    #                 # 'DNSname': responseElements_events['dNSName'],
                    #                 # 'LoadBalancerName': cloudtrail_event['loadBalancerName'],
                    #                 'Region': selected_region
                    #                 }
                    #     elb_list.append(elb_data)

    print(list(set(event_names)))
    print(elb_list)
    return elb_list

    # time.sleep(1)
    # json_data = {'elb_data': elb_list}
    # return JsonResponse(json_data)

# print(elb_events(['US East (N. Virginia)']))
# print(elb_events(['US West (Oregon)']))
