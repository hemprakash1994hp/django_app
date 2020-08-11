import time

from django.http import JsonResponse
from django.shortcuts import render
import json

from django.views.decorators.csrf import csrf_exempt


def change_moniter(request):
    change_moniter_template = 'change_moniter_v1.html'
    return render(request, change_moniter_template)

@csrf_exempt
def loading(request):
    if request.is_ajax():
        selected_regions = request.POST.get('jsonText')
        regions = json.loads(selected_regions)
        print(regions)
        selected_data = []
        for region in regions:
            if region == "Canada (Central)":
                print("inside canada")
                data = [
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '4 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '21 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    }
                ]
                selected_data.extend(data)

            if region == "US East (N. Virginia)":
                print("inside virginia")
                data = [
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '10 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '11 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    }
                ]
                selected_data.extend(data)
            if region == "Asia Pacific (Seoul)":
                print("inside virginia")
                data = [
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '10 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '17 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '10 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '17 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '10 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '17 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '10 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '17 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMF2SLTMDWK',
                        'Status': 'Active',
                        'AccessKeyIdCreatedDate': '2019-05-30 11:20:31',
                        'AccessKeyAge': '10 days',
                        'LastUsedService': 'lambda',
                        'EventTime': '2019-06-25 18:32:19',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    },
                    {
                        'IAMUser': 'digin',
                        'AccessKeyId': 'AKIAXSCMYSMFSUJC2NPI',
                        'Status': 'Inactive',
                        'AccessKeyIdCreatedDate': '2019-04-08 05:53:42',
                        'AccessKeyAge': '17 days',
                        'LastUsedService': 'kinesisvideo',
                        'EventTime': '2019-05-30 16:41:38',
                        'AWSRegion': 'US East (N. Virginia)',
                        'IPAddress': '122.166.175.59',
                        'AttachedPolicies': [
                            'AdministratorAccess',
                            'IAMUserChangePassword'
                        ]
                    }
                ]
                selected_data.extend(data)

        time.sleep(5)
        print(selected_data)
        json_data = {'data': selected_data}
        return JsonResponse(json_data)
