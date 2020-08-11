import json
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def events_vpc(request):
    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                data = [
                  {
                    'EventName': 'DeleteVpc',
                    'EventTime': '2019-09-07 10:31:25',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-0ec95d07abd8e052b'
                  },
                  {
                    'EventName': 'DetachInternetGateway',
                    'EventTime': '2019-09-07 10:31:23',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-0ec95d07abd8e052b',
                    'InternetGateWayId': 'igw-06a3f6a275a8e693b'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-09-06 16:54:31',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-0bab48e9e587364b0',
                    'VpcId': 'vpc-0ec95d07abd8e052b'
                  },
                  {
                    'EventName': 'AttachInternetGateway',
                    'EventTime': '2019-09-06 16:44:44',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-0ec95d07abd8e052b',
                    'InternetGateWayId': 'igw-06a3f6a275a8e693b'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-09-06 16:43:37',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-02135bc18dbed3ef8',
                    'VpcId': 'vpc-0ec95d07abd8e052b',
                    'CIDRBlock': '172.32.0.0/16',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateSubnet',
                    'EventTime': '2019-09-06 16:43:00',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'SubnetId': 'subnet-0399a85beb6419bfd',
                    'VpcId': 'vpc-0ec95d07abd8e052b',
                    'CIDRBlock': '172.32.0.0/24',
                    'AvailablityZone': 'us-west-2c'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-09-06 16:37:20',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-0c25e17852fed670d',
                    'VpcId': 'vpc-0ec95d07abd8e052b',
                    'CIDRBlock': '172.32.0.0/16',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateSubnet',
                    'EventTime': '2019-09-06 16:34:40',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'SubnetId': 'subnet-02beafeaf03eadefc',
                    'VpcId': 'vpc-0ec95d07abd8e052b',
                    'CIDRBlock': '172.32.1.0/24',
                    'AvailablityZone': 'us-west-2c'
                  },
                  {
                    'EventName': 'CreateVpc',
                    'EventTime': '2019-09-06 16:32:55',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-0ec95d07abd8e052b'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-09-06 10:50:50',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-0acb72c18368e11eb',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-08-23 17:12:17',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-0917e9effc2f02184',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-08-23 16:53:13',
                    'UserName': 'SLRManagement',
                    'IPAddress': 'rds.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-01008877a8d9688b9',
                    'SubnetId': 'subnet-88c9e9ec',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '172.31.18.89',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-08-21 11:39:59',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-03643f72011dfd021',
                    'SubnetId': 'subnet-9883fbee',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '172.31.33.240',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-25 13:00:05',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-058879cd6a2bb028a',
                    'SubnetId': 'subnet-9883fbee',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '172.31.45.133',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-25 13:00:05',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-00b1c8fd00cadf91a',
                    'SubnetId': 'subnet-88c9e9ec',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '172.31.26.148',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-25 12:59:43',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-050196b4637a2374c',
                    'SubnetId': 'subnet-bbcb73e3',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '172.31.10.140',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-25 12:41:23',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0ab1b0529c3eeaac3',
                    'SubnetId': 'subnet-88c9e9ec',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '172.31.22.177',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-25 12:41:22',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-046c68d8eda7b4dd9',
                    'SubnetId': 'subnet-bbcb73e3',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '172.31.15.147',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-25 12:41:00',
                    'UserName': 'elasticache.manageResourcesRole',
                    'IPAddress': 'ec.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-059dcc5ac64c7aef7',
                    'SubnetId': 'subnet-9883fbee',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '172.31.34.12',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-23 18:57:10',
                    'UserName': 'SLRManagement',
                    'IPAddress': 'rds.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0f2ecff3a139fae3c',
                    'SubnetId': 'subnet-88c9e9ec',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '172.31.28.207',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-07-23 18:56:35',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-0b0e86c39d4b79548',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-07-22 19:27:10',
                    'UserName': 'sivaji@cloudjournee.com',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-0a86cce016d1405d1',
                    'VpcId': 'vpc-4ad6ea2e'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-07-09 09:41:52',
                    'UserName': 'digin',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-05e372aa9c2f27e3c',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-07-04 12:40:34',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-059bb534ee6eea5ef',
                    'VpcId': 'vpc-0ef06875bf32c21f3',
                    'CIDRBlock': '192.168.0.0/16',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-04 12:12:19',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0d18cfb4b370777e6',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '192.168.3.241',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-04 12:12:19',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0b9d25fbaff8dcfd2',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '192.168.1.103',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-04 12:12:18',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-035f957c0421b85c7',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '192.168.2.118',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-04 12:12:18',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-07dfd251a63668957',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '192.168.3.62',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-04 12:12:18',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-054d57065d59acb10',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '192.168.1.53',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-04 12:12:17',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-007e66daafde10256',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '192.168.2.191',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 16:30:09',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-00d586d66d798f502',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '192.168.2.141',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 16:30:09',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-024961fdb43b919fc',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '192.168.3.105',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 16:30:09',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-01e03757019d60555',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '192.168.1.67',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 16:30:09',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-020345c3b305e0359',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '192.168.3.243',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 16:30:08',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-03e99d17067fad2f7',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '192.168.1.195',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 16:30:08',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-01c2ff9d1c659130a',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '192.168.2.205',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-07-03 14:41:25',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-0baad8b080069d5f8',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 14:12:02',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0068caf286206f198',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '192.168.2.188',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 14:12:02',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-07158c528b754e809',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '192.168.1.113',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 14:12:02',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-06d135f734fa69489',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '192.168.3.228',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 14:12:01',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-043418a9b8c4751e3',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '192.168.1.116',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 14:12:01',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-054101c215d97bd9f',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'AvailabilityZone': 'us-west-2c',
                    'PrivateIP': '192.168.3.219',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-07-03 14:12:01',
                    'UserName': '519852036875',
                    'IPAddress': 'kafka.amazonaws.com',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-09553facbcdbff897',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '192.168.2.36',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'CreateSubnet',
                    'EventTime': '2019-07-03 11:25:08',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'SubnetId': 'subnet-0cead393fadd7079c',
                    'VpcId': 'vpc-0ef06875bf32c21f3',
                    'CIDRBlock': '192.168.3.0/24',
                    'AvailablityZone': 'us-west-2c'
                  },
                  {
                    'EventName': 'CreateSubnet',
                    'EventTime': '2019-07-03 10:57:13',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'SubnetId': 'subnet-04ca1dd318823c8ba',
                    'VpcId': 'vpc-0ef06875bf32c21f3',
                    'CIDRBlock': '192.168.2.0/24',
                    'AvailablityZone': 'us-west-2b'
                  },
                  {
                    'EventName': 'AttachInternetGateway',
                    'EventTime': '2019-07-03 10:51:53',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-0ef06875bf32c21f3',
                    'InternetGateWayId': 'igw-0b77f94cfc2869047'
                  },
                  {
                    'EventName': 'CreateSubnet',
                    'EventTime': '2019-07-03 10:51:52',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'SubnetId': 'subnet-034096968bbfc5ef6',
                    'VpcId': 'vpc-0ef06875bf32c21f3',
                    'CIDRBlock': '192.168.1.0/24',
                    'AvailablityZone': 'us-west-2a'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-07-03 10:51:51',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-0f7c484b6be5c3d5d',
                    'VpcId': 'vpc-0ef06875bf32c21f3',
                    'CIDRBlock': '192.168.0.0/16',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateVpc',
                    'EventTime': '2019-07-03 10:51:51',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-0ef06875bf32c21f3'
                  },
                  {
                    'EventName': 'DeleteVpc',
                    'EventTime': '2019-07-03 10:47:21',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-01a755bfeff951a8e'
                  },
                  {
                    'EventName': 'CreateVpc',
                    'EventTime': '2019-07-03 10:34:36',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '122.166.175.59',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-01a755bfeff951a8e'
                  },
                  {
                    'EventName': 'DetachInternetGateway',
                    'EventTime': '2019-06-26 14:44:17',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'InternetGateWayId': 'igw-0dbddb4749bf47951'
                  },
                  {
                    'EventName': 'DeleteVpc',
                    'EventTime': '2019-06-26 14:44:17',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'DetachVpnGateway',
                    'EventTime': '2019-06-26 14:43:04',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'VPNGatewayId': 'vgw-0bdc5ab6098d57a9a',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'DetachVpnGateway',
                    'EventTime': '2019-06-26 14:42:53',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'VPNGatewayId': 'vgw-0bdc5ab6098d57a9a',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-06-26 14:36:30',
                    'UserName': 'ElasticLoadBalancing',
                    'IPAddress': 'elasticloadbalancing',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0be1b8c2c2d12bc4b',
                    'SubnetId': 'subnet-0fdd04370574d9f12',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '10.100.0.12',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-06-26 14:34:21',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-045893deface80532',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'CIDRBlock': '10.100.0.0/24',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-06-26 14:34:21',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-0a01387ce3307f9c8',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'CIDRBlock': '10.100.0.0/24',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-06-26 14:34:20',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-07b63b74c5a978eea',
                    'SubnetId': 'subnet-03968248b6cdea4a7',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '10.100.0.76',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-06-26 14:34:19',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-02e29c6be58520807',
                    'SubnetId': 'subnet-0b33a0abed5a17957',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '10.100.0.108',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'AttachVpnGateway',
                    'EventTime': '2019-06-26 14:34:18',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'VPNGatewayId': 'vgw-0bdc5ab6098d57a9a',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-06-26 14:33:55',
                    'UserName': 'ElasticLoadBalancing',
                    'IPAddress': 'elasticloadbalancing',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-01315a22a20a36032',
                    'SubnetId': 'subnet-0fdd04370574d9f12',
                    'AvailabilityZone': 'us-west-2a',
                    'PrivateIP': '10.100.0.8',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-06-26 14:33:55',
                    'UserName': 'ElasticLoadBalancing',
                    'IPAddress': 'elasticloadbalancing',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-0f086d68c5c349421',
                    'SubnetId': 'subnet-07b671ec30c4dbad2',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '10.100.0.45',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateNetworkInterface',
                    'EventTime': '2019-06-26 14:33:50',
                    'UserName': 'ElasticLoadBalancing',
                    'IPAddress': 'elasticloadbalancing',
                    'Region': 'US West (Oregon)',
                    'NetworkInterfaceId': 'eni-08c13e489c146d6ac',
                    'SubnetId': 'subnet-07b671ec30c4dbad2',
                    'AvailabilityZone': 'us-west-2b',
                    'PrivateIP': '10.100.0.54',
                    'VpcId': 'vpc-015def90c70dc586c'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-06-26 14:33:44',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-008bd103045d5f20f',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'CIDRBlock': '10.100.0.0/24',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateRouteTable',
                    'EventTime': '2019-06-26 14:33:44',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'RouteTableId': 'rtb-057c8667e3fcd9f1b',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'CIDRBlock': '10.100.0.0/24',
                    'Gateway': 'local'
                  },
                  {
                    'EventName': 'CreateSubnet',
                    'EventTime': '2019-06-26 14:33:43',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'SubnetId': 'subnet-0b33a0abed5a17957',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'CIDRBlock': '10.100.0.96/27',
                    'AvailablityZone': 'us-west-2b'
                  },
                  {
                    'EventName': 'AttachInternetGateway',
                    'EventTime': '2019-06-26 14:33:43',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'VpcId': 'vpc-015def90c70dc586c',
                    'InternetGateWayId': 'igw-0dbddb4749bf47951'
                  },
                  {
                    'EventName': 'CreateSecurityGroup',
                    'EventTime': '2019-06-26 14:33:43',
                    'UserName': 'loadbalancer2',
                    'IPAddress': '3.16.43.100',
                    'Region': 'US West (Oregon)',
                    'GroupID': 'sg-04b77dd5b8a89adf2',
                    'VpcId': 'vpc-015def90c70dc586c'
                  }
                ]
                selected_data.extend(data)

        time.sleep(1)
        json_data = {'vpc_data': selected_data}
        return JsonResponse(json_data)