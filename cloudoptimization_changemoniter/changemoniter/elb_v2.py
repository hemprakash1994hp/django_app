INDX( 	 E�B            (   �  �       ��ri['t_],  ns      �5     ` N     �5     C6ׇ�J�;ne��pne�C6ׇ�                       c l i . p y   �5     h T     �5     ~}!6ׇ��:=ne�rqne�~}!6ׇ�       ?              	 c o m p a t . p y     �5     ` N     �5     \,26ׇ���66ׇ���66ׇ�^��eׇ�                        e n g i n e i �5     p \     �5     ��#6ׇ��K>ne�Frne���#6ׇ�p      n              
 e x c e p t i o n s . p y     �5     ` P     �5     �>6ׇ��G6ׇ �G6ׇ�^��eׇ�                        f i l t e r s �5     p Z     �5     �A&6ׇ�?]?ne�o�rne��A&6ׇ�        �               f o r m a t t e r . p y       �5     h X     �5     �(6ׇ���@ne��une��(6ׇ� p      �e               k e y w o r d s . p y �5     h R     �5     �(6ׇ��BBne�#�une��(6ׇ�       �	               l e x e r . p y       �5     ` N     �5     �+6ׇ�lzCne�udwne��+6ׇ� P      �N               s q l . p y   �5     h T     �5     h-6ׇ��'Ene � xne�h-6ׇ�       �              	 t o k e n s . p y     �5     h R     �5     h-6ׇ�4`Fne�֜xne�h-6ׇ�       �
               u t i l s . p y       �5     h X     �5     �/6ׇ�~C9ne�+�yne��/6ׇ�       �               _ _ i n i t _ _ . p y �5     h X     �5     �/6ׇ��:ne��4{ne��/6ׇ��      z               _ _ m a i n _ _ . p y �5     h X     �5     ��N6ׇ��]6ׇ��]6ׇ�T �oׇ�                        _ _ p y c a c h e _ _               roups'] = secu tyGroups
        for subnet_id in cloudtrail_event['responseElements']['loadBalancers'][0]['availabilityZones']:
            subnet_ids.append(subnet_id['subnetId'])
            zone_Name.append(subnet_id['zoneName'])

        elb_data['Subnets'] = subnet_ids
        elb_data['ZoneName'] = zone_Name

    else:
        subnet_ids = []
        elb_data = {'EventName': event['EventName'],
                    'EventTime': str(event['EventTime']).split('+')[0],
                    'UserName': event Username'],
                    'IPAddress': cloudtrail_event['sourceIPAddress'],
                    'LoadBalancerType': cloudtrail_event['requestParameters']['type'],
                    'LoadBalancerName': cloudtrail_event['requestParameters']['name'],
                    'Scheme': cloudtrail_event['requestParameters']['scheme'],
                    'Region': selected_region
                    }
        for subnet_id in cloudtrail_event['requestParameters']['subnetMappings']:
            subne ids.append(subnet_id['subnetId'])
            elb_data['Subnets'] = subnet_ids

    return elb_data


def CreateListener(event, cloudtrail_event, selected_region):
    elb_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerArn'].split("/")[2],
                'LoadBalancerType': cloudtrail_event['requestParameters']['loadBalancerArn'].split("/")[1],
                'Protocol': cloudtrail_event['requestParameters']['protocol'],
                'Port': cloudtrail_event['requestParameters']['port'],
                'TargetGroupName':
                    cloudtrail_event['requestParameters']['defaultActions'][0]['targetGroupArn'].split("/")[1],
                'Type': cloudtrail_event['requestParameters']['defaultActions'][0]['type'],
              'Region': selected_region

                }
    return elb_data


def ModifyTargetGroup(event, cloudtrail_event, selected_region):
    elb_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'LoadBalancerName':
                    cloudtrail_event['responseElements']['targetGroups'][0]['loadBalancerAr '][0].split('/')[2],
                'LoadBalancerType':
                    cloudtrail_event['responseElements']['targetGroups'][0]['loadBalancerArns'][0].split('/')[1],
                'TargetGroupNmae': cloudtrail_event['responseElements']['targetGroups'][0]['targetGroupArn'].split('/')[
                    1],
                'HealthCheckEnabled': cloudtrail_event['responseElements']['targetGroups'][0]['healthCheckEnabled'],
                'Port': cloudtrail_event['responseElements']['targetGroups'][0]['port'],
                'VpcId': cloudtrail_event['responseElements']['targetGroups'][0]['vpcId'],
                'TargetType': cloudtrail_event['responseElements']['targetGroups'][0]['targetType'],
                'HttpCode': cloudtrail_event['requestParameters']['matcher']['httpCode'],
                'HealthCheckPort': cloudtrail_event['requestParameters']['healthCheckPort'],
                'HealthyThresholdCount': cloudtrail_event['requestParameters']['healthyThresholdCount'],
                'HealthCheckProtocol': cloudtrail_event['requestParameters']['healthCheckProtocol'],
                'HealthCheckIntervalSeconds': cloudtrail_event['requestParameters']['healthCheckIntervalSeconds'],
                'HealthCheckTimeoutSeconds': cloudtrail_event['requestParameters']['healthCheckTimeoutSeconds'],
                'HealthCheckPath': cloudtrail_event['requestParameters']['healthCheckPath'],
                'UnhealthyThresholdCount': cloudtrail_event['requestParameters']['unhealthyThresholdCount'],
                'Region': selected_region
                }
    return elb_data


def DeleteLoadBalancer(event, cloudtrail_event, selected_region):
    elb_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'LoadBalancerType': cloudtrail_event['requestParameters']['loadBalancerArn'].split('/')[1],
                'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerArn'].split('/')[2],
                'Region': selected_region
                }

    return elb_data


# def other_events(event, cloudtrail_event, selected_region):
#     elb_data = {'EventName': event['EventName'],
#                     'EventTime': str(event['EventTime']).split('+')[0],
#                     'Username': event['Username'],
#                     'IPAddress': cloudtrail_event['sourceIPAddress'],
#                     'LoadBalancerName': requestParameters_event['loadBalancerName'],
#                     'Region': selected_region
#                     }
#     elb_list.append(elb_data)
#     return elb_list

@csrf_exempt
def elb_events_v2(request):
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
                    'AttributeValue': 'AWS::ElasticLoadBalancingV2::LoadBalancer'
                },

            ],
            StartTime=start_time,
            EndTime=end_time,
            MaxResults=1000,
        )
        print(response)
        for event in response['Events']:
            cloudtrail_event = json.loads(event["CloudTrailEvent"])

            event_names.append(event["EventName"])
            event_names_nondup = list(set(event_names))

            for i in event_names_nondup:
                if event['EventName'] == i:
                    if event['EventName'] == "CreateLoadBalancer":
                        CreateLoadBalancerData = CreateLoadBalancer(event, cloudtrail_event, selected_region)
                        elb_list.append(CreateLoadBalancerData)
                    if event['EventName'] == "ModifyTargetGroup":
                        ModifyTargetGroupData = ModifyTargetGroup(event, cloudtrail_event, selected_region)
                        elb_list.append(ModifyTargetGroupData)
                    if event['EventName'] == "CreateListener":
                        CreateListenerData = CreateListener(event, cloudtrail_event, selected_region)
                        elb_list.append(CreateListenerData)
                    if event['EventName'] == "DeleteLoadBalancer":
                        DeleteLoadBalancerData = DeleteLoadBalancer(event, cloudtrail_event, selected_region)
                        elb_list.append(DeleteLoadBalancerData)
                    # else:
                    #     OtherEventsData = other_events(event, cloudtrail_event, selected_region)
                    #     elb_list.append(OtherEventsData)

    print(list(set(event_names)))
    return elb_list
    # time.sleep(1)
    # json_data = {'elb_data': elb_list}
    # return JsonResponse(json_data)

# print(elb_events_v2(['US East (N. Virginia)']))
# print(elb_events(['US West (Oregon)']))
