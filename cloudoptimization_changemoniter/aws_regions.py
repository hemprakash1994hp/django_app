
"""
Regions name by availablity zones & regions names
"""


def region_names(region_code):
    aws_region_map = {
        "ca-central-1": "Canada (Central)",
        "us-east-1": "US East (N. Virginia)",
        "ap-northeast-2": "Asia Pacific (Seoul)",
        "us-east-2": "US East (Ohio)",
        "ap-northeast-1": "Asia Pacific (Tokyo)",
        "ap-south-1": "Asia Pacific (Mumbai)",
        "ap-southeast-2": "Asia Pacific (Sydney)",
        "ap-southeast-1": "Asia Pacific (Singapore)",
        "sa-east-1": "South America (Sao Paulo)",
        "us-west-2": "US West (Oregon)",
        "eu-west-1": "EU (Ireland)",
        "eu-west-3": "EU (Paris)",
        "eu-west-2": "EU (London)",
        "us-west-1": "US West (N. California)",
        "eu-central-1": "EU (Frankfurt)",
        "eu-north-1": "EU (Stockholm)",
    }

    return aws_region_map[region_code]


def region_code(region_name):
    aws_region_name = {
        "Canada (Central)": "ca-central-1",
        "US East (N. Virginia)": "us-east-1",
        "Asia Pacific (Seoul)": "ap-northeast-2",
        "US East (Ohio)": "us-east-2",
        "Asia Pacific (Tokyo)": "ap-northeast-1",
        "Asia Pacific (Mumbai)": "ap-south-1",
        "Asia Pacific (Sydney)": "ap-southeast-2",
        "Asia Pacific (Singapore)": "ap-southeast-1",
        "South America (Sao Paulo)": "sa-east-1",
        "US West (Oregon)": "us-west-2",
        "EU (Ireland)": "eu-west-1",
        "EU (Paris)": "eu-west-3",
        "EU (London)": "eu-west-2",
        "US West (N. California)": "us-west-1",
        "EU (Frankfurt)": "eu-central-1",
        "EU (Stockholm)": "eu-north-1"
    }

    return aws_region_name[region_name]