import re

import boto3
import json
from datetime import datetime, timedelta

from aws_regions import region_code


def route53_events(selected_regions):
    route53_list = []
    create_hosted_zone_list = []

    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    # def route53_events_filter():

    def ChangeResourceRecordSets():
            if event['EventName'] == "ChangeResourceRecordSets":
                # print("Inside ChangeResourceRecordSets")
                route53_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'HostedZoneId': cloudtrail_event['requestParameters']['hostedZoneId'],
                                'Action': cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['action'],
                                'ResourceRecordSetType': cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet']['type'],
                                'ResourceRecordSetTTL': cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet']['tTL'],
                                'ResourceRecordsValue': cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet']['resourceRecords'][0]['value'],
                                'ResourceRecordSetName': cloudtrail_event['requestParameters']['changeBatch']['changes'][0]['resourceRecordSet']['name'],
                                'ChangeInfo_Status': cloudtrail_event['responseElements']['changeInfo']['status'],
                                'ChangeInfo_Id': cloudtrail_event['responseElements']['changeInfo']['id'],
                                'ChangeInfo_submittedAt': cloudtrail_event['responseElements']['changeInfo']['submittedAt'],
                                'Region': selected_region
                                }
                route53_list.append(route53_data)

            return route53_list

    def DeleteHostedZone():
            global DeleteHostedZone_Id
            global CreateHostedZone_Id
            global DeleteHostedZone_Name

            if event['EventName'] == "DeleteHostedZone":
                print("Inside DeleteHostedZone")
                DeleteHostedZone_Id = cloudtrail_event['requestParameters']['id']
                print(DeleteHostedZone_Id)
                # print(event)
                route53_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'HostedZoneId': cloudtrail_event['requestParameters']['id'],
                                # 'ChangeInfo_Status': cloudtrail_event['responseElements']['changeInfo']['status'],
                                # 'ChangeInfo_Id': cloudtrail_event['responseElements']['changeInfo']['id'],
                                # 'ChangeInfo_SubmittedAt': cloudtrail_event['responseElements']['changeInfo']['submittedAt'],
                                'Region': selected_region
                                }

                for create_hosted_zone_id in create_hosted_zone_list:
                    if cloudtrail_event['requestParameters']['id'] == create_hosted_zone_id['Id']:
                        print('*******************')
                        print(create_hosted_zone_id['Name'])

                route53_list.append(route53_data)

            if event['EventName'] == "CreateHostedZone":
                print("inside CreateHostedZone")
                CreateHostedZone_Id = cloudtrail_event['responseElements']['hostedZone']['id'].split('/')[-1]

                print(CreateHostedZone_Id)
            # if DeleteHostedZone_Id == CreateHostedZone_Id:
            #         DeleteHostedZone_Name = {'Name': cloudtrail_event['requestParameters']['name']
            #                          }
            #         print(DeleteHostedZone_Name)
            # if event['EventName'] == "DeleteHostedZone":
            #     route53_data = DeleteHostedZone_Name
            #
            #
            #     route53_list.append(route53_data)



            return route53_list

    def CreateHostedZone():
            if event['EventName'] == "CreateHostedZone":
                # print("Inside CreateHostedZone")
                # print(event)
                route53_data = {'EventName': event['EventName'],
                                'EventTime': str(event['EventTime']).split('+')[0],
                                'Username': event['Username'],
                                'IPAddress': cloudtrail_event['sourceIPAddress'],
                                'CallerReference': cloudtrail_event['requestParameters']['callerReference'],
                                'Name': cloudtrail_event['requestParameters']['name'],
                                'changeInfo_status': cloudtrail_event['responseElements']['changeInfo']['status'],
                                'changeInfo_Id': cloudtrail_event['responseElements']['changeInfo']['id'],
                                'changeInfo_submittedAt': cloudtrail_event['responseElements']['changeInfo']['submittedAt'],
                                'Location': cloudtrail_event['responseElements']['location'],
                                'ResourceRecordSetCount': cloudtrail_event['responseElements']['hostedZone']['resourceRecordSetCount'],
                                'hostedZone_Id': cloudtrail_event['responseElements']['hostedZone']['id'].split('/')[-1],
                                'nameServers': cloudtrail_event['responseElements']['delegationSet']['nameServers'],
                                'Region': selected_region
                                }
                create_hosted_zone_dict ={
                    "Id":cloudtrail_event['responseElements']['hostedZone']['id'].split('/')[-1],
                    "Name": cloudtrail_event['requestParameters']['name']
                }
                create_hosted_zone_list.append(create_hosted_zone_dict)
                route53_list.append(route53_data)

            return route53_list

        # def other_events():
        #     if event['EventName'] != "CreateHostedZone" or event['EventName'] != "ChangeResourceRecordSets" or event['EventName'] != "DeleteHostedZone":
        #         print("Inside other events")
        #         route53_data = {'EventName': event['EventName'],
        #                         'EventTime': str(event['EventTime']).split('+')[0],
        #                         'Username': event['Username'],
        #                         'IPAddress': cloudtrail_event['sourceIPAddress'],
        #                         # 'HostedZoneId': cloudtrail_event['requestParameters']['hostedZoneId'],
        #                         # 'LoadBalancerName': cloudtrail_event['requestParameters']['loadBalancerArn'].split('/')[2],
        #                         'Region': selected_region
        #                         }
        #         route53_list.append(route53_data)
        #         return route53_list

    # return ChangeResourceRecordSets(), CreateHostedZone(), DeleteHostedZone()

    event_names = ['CreateHostedZone', 'ChangeResourceRecordSets', 'DeleteHostedZone']
    for selected_region in selected_regions:
        client = boto3.client("cloudtrail", region_name=region_code(selected_region))

        for event_name in event_names:
            print(event_name)
            response = client.lookup_events(
                LookupAttributes=[
                    {"AttributeKey": "EventName",
                     "AttributeValue": event_name}
                ],
                StartTime=start_time,
                EndTime=end_time,
                MaxResults=1,
            )

            print(response)
            for event in response["Events"]:

                cloudtrail_event = json.loads(event["CloudTrailEvent"])
                # for i in event_names_nondup:
                #     if re.search("^List", i) or re.search("^Get", i) or re.search("ListHealthChecks", i):
                #             # print(i)
                #             pass
                #
                #         # if i != re.search("^List", i) or re.search("^Get", i):
                #         #     print(i)
                #     else:
                if event['EventName'] == 'CreateHostedZone':
                    CreateHostedZone()
                if event['EventName'] == 'ChangeResourceRecordSets':
                    ChangeResourceRecordSets()
                if event['EventName'] == 'DeleteHostedZone':
                    DeleteHostedZone()

                # route53_events_filter()

                            # else:
                            #     route53_data = {'EventName': event['EventName'],
                            #                     'EventTime': str(event['EventTime']).split('+')[0],
                            #                     'Username': event['Username'],
                            #                     'IPAddress': cloudtrail_event['sourceIPAddress'],
                            #                     'Region': selected_region
                            #                     }
                            #                     #     elb_list.append(elb_data)
                            #
                            #
                            #     route53_list.append(route53_data)
                # print(filtered_events)
        # print(event_names_nondup)
        print(create_hosted_zone_list)
        # return route53_events_filter()
        return CreateHostedZone(), ChangeResourceRecordSets(), DeleteHostedZone()

# print(route53_events(['US West (Oregon)']))
print(route53_events(['US East (N. Virginia)']))
