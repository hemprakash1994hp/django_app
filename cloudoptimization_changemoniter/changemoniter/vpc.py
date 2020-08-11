import boto3
import json
from datetime import datetime, timedelta
from aws_regions import region_code

def vpc_events(selected_regions):
    vpc_list = []
    event_names = []


    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    def CreateVpc():
            vpc_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'CidrBlock': cloudtrail_event['requestParameters']['cidrBlock'],
                                'InstanceTenancy': cloudtrail_event['requestParameters']['instanceTenancy'],
                                'AmazonProvidedIpv6CidrBlock': cloudtrail_event['requestParameters']['amazonProvidedIpv6CidrBlock'],
                                'RequestId': cloudtrail_event['responseElements']['requestId'],
                                'vpcId': cloudtrail_event['responseElements']['vpc']['vpcId'],
                                'State': cloudtrail_event['responseElements']['vpc']['state'],
                                'OwnerId': cloudtrail_event['responseElements']['vpc']['ownerId'],
                                'AssociationId': cloudtrail_event['responseElements']['vpc']['cidrBlockAssociationSet']['items'][0]['associationId'],
                                'cidrBlockState': cloudtrail_event['responseElements']['vpc']['cidrBlockAssociationSet']['items'][0]['cidrBlockState']['state'],
                                'DhcpOptionsId': cloudtrail_event['responseElements']['vpc']['dhcpOptionsId'],
                                'IsDefault': cloudtrail_event['responseElements']['vpc']['isDefault'],
                                'Region': selected_region
                                }

            return vpc_data

    def CreateSubnet():
            vpc_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'VpcId': cloudtrail_event['requestParameters']['vpcId'],
                                'CidrBlock': cloudtrail_event['requestParameters']['cidrBlock'],
                                'RequestId': cloudtrail_event['responseElements']['requestId'],
                                'SubnetId': cloudtrail_event['responseElements']['subnet']['subnetId'],
                                'SubnetArn': cloudtrail_event['responseElements']['subnet']['subnetArn'],
                                'State': cloudtrail_event['responseElements']['subnet']['state'],
                                'AvailableIpAddressCount': cloudtrail_event['responseElements']['subnet']['availableIpAddressCount'],
                                'AvailabilityZone': cloudtrail_event['responseElements']['subnet']['availabilityZone'],
                                'AvailabilityZoneId': cloudtrail_event['responseElements']['subnet']['availabilityZoneId'],
                                'OwnerId': cloudtrail_event['responseElements']['subnet']['ownerId'],
                                'DefaultForAz': cloudtrail_event['responseElements']['subnet']['defaultForAz'],
                                'MapPublicIpOnLaunch': cloudtrail_event['responseElements']['subnet']['mapPublicIpOnLaunch'],
                                'AssignIpv6AddressOnCreation': cloudtrail_event['responseElements']['subnet']['assignIpv6AddressOnCreation'],
                                'Region': selected_region
                                }

            return vpc_data

    def CreateRouteTable():
            vpc_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'VpcId': cloudtrail_event['requestParameters']['vpcId'],
                                'RequestId': cloudtrail_event['responseElements']['requestId'],
                                'RouteTableId': cloudtrail_event['responseElements']['routeTable']['routeTableId'],
                                'OwnerId': cloudtrail_event['responseElements']['routeTable']['ownerId'],
                                'DestinationCidrBlock': cloudtrail_event['responseElements']['routeTable']['routeSet']['items'][0]['destinationCidrBlock'],
                                'GatewayId': cloudtrail_event['responseElements']['routeTable']['routeSet']['items'][0]['gatewayId'],
                                'State': cloudtrail_event['responseElements']['routeTable']['routeSet']['items'][0]['state'],
                                'Origin': cloudtrail_event['responseElements']['routeTable']['routeSet']['items'][0]['origin'],
                                'Region': selected_region
                                }

            return vpc_data

    def CreateTargetGroup():
            vpc_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'UnhealthyThresholdCount': cloudtrail_event['requestParameters']['unhealthyThresholdCount'],
                                'HealthCheckTimeoutSeconds': cloudtrail_event['requestParameters']['healthCheckTimeoutSeconds'],
                                'HealthyThresholdCount': cloudtrail_event['requestParameters']['healthyThresholdCount'],
                                'Protocol': cloudtrail_event['requestParameters']['protocol'],
                                'HttpCode': cloudtrail_event['requestParameters']['matcher']['httpCode'],
                                'TargetType': cloudtrail_event['requestParameters']['targetType'],
                                'HealthCheckPath': cloudtrail_event['requestParameters']['healthCheckPath'],
                                'VpcId': cloudtrail_event['requestParameters']['vpcId'],
                                'Port': cloudtrail_event['requestParameters']['port'],
                                'HealthCheckProtocol': cloudtrail_event['requestParameters']['healthCheckProtocol'],
                                'HealthCheckIntervalSeconds': cloudtrail_event['requestParameters']['healthCheckIntervalSeconds'],
                                'Name': cloudtrail_event['requestParameters']['name'],
                                'TargetGroupArn': cloudtrail_event['responseElements']['targetGroups'][0]['targetGroupArn'],
                                'HealthCheckPort': cloudtrail_event['responseElements']['targetGroups'][0]['healthCheckPort'],
                                'HealthCheckEnabled': cloudtrail_event['responseElements']['targetGroups'][0]['healthCheckEnabled'],
                                'Region': selected_region
                                }

            return vpc_data

    def CreateSecurityGroup():
            vpc_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'GroupName': cloudtrail_event['requestParameters']['groupName'],
                                'GroupDescription': cloudtrail_event['requestParameters']['groupDescription'],
                                'RequestId': cloudtrail_event['responseElements']['requestId'],
                                'GroupId': cloudtrail_event['responseElements']['groupId'],
                                'Region': selected_region
                                }
            if 'vpcId' in cloudtrail_event['requestParameters']:
                VpcId = cloudtrail_event['requestParameters']['vpcId']
                vpc_data['VpcId'] = VpcId

            return vpc_data

    def AcceptVpcPeeringConnection():
            vpc_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'SubnetId': cloudtrail_event['requestParameters']['subnetId'],
                                'Description': cloudtrail_event['requestParameters']['description'],
                                'GroupId': cloudtrail_event['requestParameters']['groupSet']['items'][0]['groupId'],
                                'Region': selected_region
                                }
            if 'ipv6AddressCount' in cloudtrail_event['requestParameters']:
                Ipv6AddressCount = cloudtrail_event['requestParameters']['ipv6AddressCount']
                vpc_data['Ipv6AddressCount'] = Ipv6AddressCount

            if cloudtrail_event['responseElements'] != None:
                RequestId = cloudtrail_event['responseElements']['requestId']
                NetworkInterfaceId = cloudtrail_event['responseElements']['networkInterface']['networkInterfaceId']
                vpcId = cloudtrail_event['responseElements']['networkInterface']['vpcId']
                AvailabilityZone = cloudtrail_event['responseElements']['networkInterface']['availabilityZone']
                OwnerId = cloudtrail_event['responseElements']['networkInterface']['ownerId']
                RequesterId = cloudtrail_event['responseElements']['networkInterface']['requesterId']
                RequesterManaged = cloudtrail_event['responseElements']['networkInterface']['requesterManaged']
                Status = cloudtrail_event['responseElements']['networkInterface']['status']
                MacAddress = cloudtrail_event['responseElements']['networkInterface']['macAddress']
                PrivateIpAddress = cloudtrail_event['responseElements']['networkInterface']['privateIpAddress']
                PrivateDnsName = cloudtrail_event['responseElements']['networkInterface']['privateDnsName']
                SourceDestCheck = cloudtrail_event['responseElements']['networkInterface']['sourceDestCheck']
                GroupName = cloudtrail_event['responseElements']['networkInterface']['groupSet']['items'][0]['groupName']
                Primary = cloudtrail_event['responseElements']['networkInterface']['privateIpAddressesSet']['item'][0]['primary']

                vpc_data['RequestId'] = RequestId
                vpc_data['NetworkInterfaceId'] = NetworkInterfaceId
                vpc_data['vpcId'] = vpcId
                vpc_data['AvailabilityZone'] = AvailabilityZone
                vpc_data['OwnerId'] = OwnerId
                vpc_data['RequesterId'] = RequesterId
                vpc_data['RequesterManaged'] = RequesterManaged
                vpc_data['Status'] = Status
                vpc_data['MacAddress'] = MacAddress
                vpc_data['PrivateIpAddress'] = PrivateIpAddress
                vpc_data['PrivateDnsName'] = PrivateDnsName
                vpc_data['SourceDestCheck'] = SourceDestCheck
                vpc_data['GroupName'] = GroupName
                vpc_data['Primary'] = Primary

                if 'interfaceType' in cloudtrail_event['responseElements']['networkInterface']:
                    InterfaceType = cloudtrail_event['responseElements']['networkInterface']['interfaceType']
                    vpc_data['InterfaceType'] = InterfaceType


            return vpc_data

    eventnames = ['AttachInternetGateway', 'DetachInternetGateway', 'RunInstances', 'DeleteDBInstance', 'CreateNetworkInterface', \
                  'CreateSecurityGroup', 'DeleteVpc', 'CreateRouteTable', 'CreateTargetGroup', 'CreateDBInstance', 'AcceptVpcPeeringConnection', \
                  'CreateSubnet', 'CreateVpc']


    for selected_region in selected_regions:

        client = boto3.client('cloudtrail', region_name=region_code(selected_region))
        for eventname in eventnames:
            response = client.lookup_events(
                    LookupAttributes=[
                        {
                            'AttributeKey': 'EventName',
                            'AttributeValue': eventname
                        },
                    ],
                    StartTime=start_time,
                    EndTime=end_time,
                    MaxResults=100,
                )
            print(response)

            for event in response['Events']:

                event_names.append(event["EventName"])
                event_names_nondup = event_names

                cloudtrail_event = json.loads(event["CloudTrailEvent"])
                if event['EventName'] == 'CreateVpc':
                    CreateVpcData = CreateVpc()
                    vpc_list.append(CreateVpcData)
                if event['EventName'] == 'CreateSubnet':
                    CreateSubnetData = CreateSubnet()
                    vpc_list.append(CreateSubnetData)
                if event['EventName'] == 'CreateRouteTable':
                    CreateRouteTableData = CreateRouteTable()
                    vpc_list.append(CreateRouteTableData)
                # if event['EventName'] == 'CreateTargetGroup':
                #     CreateTargetGroupData = CreateTargetGroup()
                #     vpc_list.append(CreateTargetGroupData)
                if event['EventName'] == 'CreateSecurityGroup':
                    CreateSecurityGroupData = CreateSecurityGroup()
                    vpc_list.append(CreateSecurityGroupData)
                if event['EventName'] == 'AcceptVpcPeeringConnection':
                    AcceptVpcPeeringConnectionData = AcceptVpcPeeringConnection()
                    vpc_list.append(AcceptVpcPeeringConnectionData)
                # if event['EventName'] == 'CreateDBInstance':
                #     CreateDBInstanceData = CreateDBInstance()
                #     vpc_list.append(CreateDBInstanceData)


    print(list(set(event_names)))
    return vpc_list

# print(vpc_events(['US East (N. Virginia)']))
print(vpc_events(['US West (Oregon)']))