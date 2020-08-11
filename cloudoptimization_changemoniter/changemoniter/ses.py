import time

import boto3
import json
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# from aws_regions import region_code
from aws_regions import region_code


def CreateReceiptRule(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'Name': cloudtrail_event['requestParameters']['rule']['name'],
                'Enabled': cloudtrail_event['requestParameters']['rule']['enabled'],
                'ScanEnabled': cloudtrail_event['requestParameters']['rule']['scanEnabled'],
                'TlsPolicy': cloudtrail_event['requestParameters']['rule']['tlsPolicy'],
                'TopicArn': cloudtrail_event['requestParameters']['rule']['actions'][0]['sNSAction']['topicArn'],
                'Encoding': cloudtrail_event['requestParameters']['rule']['actions'][0]['sNSAction']['encoding'],
                'Recipients': cloudtrail_event['requestParameters']['rule']['recipients'][0],
                'RuleSetName': cloudtrail_event['requestParameters']['ruleSetName'],
                'Region': selected_region
                }

    return ses_data


def CreateReceiptRuleSet(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'RuleSetName': cloudtrail_event['requestParameters']['ruleSetName'],
                'Region': selected_region
                }

    return ses_data


def DeleteIdentity(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'Identity': cloudtrail_event['requestParameters']['identity'],
                'Region': selected_region
                }

    return ses_data


def DeleteReceiptRule(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'RuleName': cloudtrail_event['requestParameters']['ruleName'],
                'RuleSetName': cloudtrail_event['requestParameters']['ruleSetName'],
                'Region': selected_region
                }
    return ses_data


def PutIdentityPolicy(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'Identity': cloudtrail_event['requestParameters']['identity'],
                'policy': cloudtrail_event['requestParameters']['policy'],
                'PolicyName': cloudtrail_event['requestParameters']['policyName'],
                'Region': selected_region
                }

    return ses_data


def SetActiveReceiptRuleSet(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'RuleSetName': cloudtrail_event['requestParameters']['ruleSetName'],
                'Region': selected_region
                }

    return ses_data


def UpdateReceiptRule(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'RuleSetName': cloudtrail_event['requestParameters']['ruleSetName'],
                'Name': cloudtrail_event['requestParameters']['rule']['name'],
                'Enabled': cloudtrail_event['requestParameters']['rule']['enabled'],
                'ScanEnabled': cloudtrail_event['requestParameters']['rule']['scanEnabled'],
                'TlsPolicy': cloudtrail_event['requestParameters']['rule']['tlsPolicy'],
                'TopicArn': cloudtrail_event['requestParameters']['rule']['actions'][0]['sNSAction']['topicArn'],
                'Encoding': cloudtrail_event['requestParameters']['rule']['actions'][0]['sNSAction']['encoding'],
                'Recipients': cloudtrail_event['requestParameters']['rule']['recipients'][0],
                'Region': selected_region
                }

    return ses_data


def VerifyDomainDkim(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'Domain': cloudtrail_event['requestParameters']['domain'],
                'DkimTokens': cloudtrail_event['responseElements']['dkimTokens'],
                'Region': selected_region
                }

    return ses_data


def VerifyDomainIdentity(event, cloudtrail_event, selected_region):
    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'Domain': cloudtrail_event['requestParameters']['domain'],
                'DisableEmailNotifications': cloudtrail_event['requestParameters']['disableEmailNotifications'],
                'VerificationToken': cloudtrail_event['responseElements']['verificationToken'],
                'Region': selected_region
                }

    return ses_data


def VerifyEmailIdentity(event, cloudtrail_event, selected_region):

    ses_data = {'EventName': event['EventName'],
                'EventTime': str(event['EventTime']).split('+')[0],
                'UserName': event['Username'],
                'IPAddress': cloudtrail_event['sourceIPAddress'],
                'EmailAddress': cloudtrail_event['requestParameters']['emailAddress'],
                'Region': selected_region
                }
    return ses_data

@csrf_exempt
def ses_events(request):
    ses_list = []

    today_date = datetime.now().isoformat(" ", "seconds")
    end_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S")
    start_time = datetime.strptime(today_date, "%Y-%m-%d %H:%M:%S") - timedelta(days=90, seconds=0)

    if request.is_ajax():
        selected_regions = request.POST.get('regions')
        regions = json.loads(selected_regions)
        print(regions)

    event_names = ['CloneReceiptRuleSet', 'CreateReceiptFilter', 'CreateReceiptRule', 'CreateReceiptRuleSet', 'DeleteIdentity', 'DeleteIdentityPolicy', 'DeleteReceiptFilter', \
                   'DeleteReceiptRule', 'DeleteReceiptRuleSet', 'DeleteVerifiedEmailAddress',  \
                   'PutIdentityPolicy', 'ReorderReceiptRuleSet', 'SetActiveReceiptRuleSet', 'SetReceiptRulePosition', 'SetIdentityDkimEnabled', \
                   'SetIdentityFeedbackForwardingEnabled', 'SetIdentityHeadersInNotificationsEnabled', 'SetIdentityNotificationTopic', 'UpdateReceiptRule', 'VerifyDomainDkim', \
                   'VerifyDomainIdentity', 'VerifyEmailAddress', 'VerifyEmailIdentity']

    for selected_region in regions:

        client = boto3.client('cloudtrail', region_name=region_code(selected_region))
        for event_name in event_names:
            response = client.lookup_events(
                LookupAttributes=[
                    {
                        'AttributeKey': 'EventName',
                        'AttributeValue': event_name
                    },
                ],
                StartTime=start_time,
                EndTime=end_time,
                MaxResults=100,
            )
            print(response)
            # print("this")

            for event in response['Events']:
                cloudtrail_event = json.loads(event["CloudTrailEvent"])
                if event['EventName'] == 'CreateReceiptRule':
                    CreateReceiptRuleData = CreateReceiptRule(event, cloudtrail_event, selected_region)
                    ses_list.append(CreateReceiptRuleData)
                if event['EventName'] == 'CreateReceiptRuleSet':
                    CreateReceiptRuleSetData = CreateReceiptRuleSet(event, cloudtrail_event, selected_region)
                    ses_list.append(CreateReceiptRuleSetData)
                if event['EventName'] == 'DeleteIdentity':
                    print("Inside DeleteIdentity")
                    DeleteIdentityData = DeleteIdentity(event, cloudtrail_event, selected_region)
                    ses_list.append(DeleteIdentityData)
                if event['EventName'] == 'DeleteReceiptRule':
                    DeleteReceiptRuleData = DeleteReceiptRule(event, cloudtrail_event, selected_region)
                    ses_list.append(DeleteReceiptRuleData)
                if event['EventName'] == 'PutIdentityPolicy':
                    print("Inside PutIdentityPolicy")
                    PutIdentityPolicyData = PutIdentityPolicy(event, cloudtrail_event, selected_region)
                    ses_list.append(PutIdentityPolicyData)
                if event['EventName'] == 'SetActiveReceiptRuleSet':
                    SetActiveReceiptRuleSetData = SetActiveReceiptRuleSet(event, cloudtrail_event, selected_region)
                    ses_list.append(SetActiveReceiptRuleSetData)
                if event['EventName'] == 'UpdateReceiptRule':
                    UpdateReceiptRuleData = UpdateReceiptRule(event, cloudtrail_event, selected_region)
                    ses_list.append(UpdateReceiptRuleData)
                if event['EventName'] == 'VerifyDomainDkim':
                    VerifyDomainDkimData = VerifyDomainDkim(event, cloudtrail_event, selected_region)
                    ses_list.append(VerifyDomainDkimData)
                if event['EventName'] == 'VerifyDomainIdentity':
                    VerifyDomainIdentityData = VerifyDomainIdentity(event, cloudtrail_event, selected_region)
                    ses_list.append(VerifyDomainIdentityData)
                if event['EventName'] == 'VerifyEmailIdentity':
                    VerifyEmailIdentityData = VerifyEmailIdentity(event, cloudtrail_event, selected_region)
                    ses_list.append(VerifyEmailIdentityData)


    # return ses_list
    time.sleep(1)
    json_data = {'ses_data': ses_list}
    return JsonResponse(json_data)

# print(ses_events(['US East (N. Virginia)']))
# print(ses_events(['US West (Oregon)']))