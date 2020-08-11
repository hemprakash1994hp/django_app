$(document).ready(function () {
	c3.generate({
		bindto: '#gauge_ec2',
		data: {
			columns: [
				['running', 2]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 7
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_ebs',
		data: {
			columns: [
				['Attached', 12]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 15
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_s3',
		data: {
			columns: [
				['Private', 17]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 22
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_iam',
		data: {
			columns: [
				['Guest users', 18]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 21
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_snapshots',
		data: {
			columns: [
				['Used by AMI', 5]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 13
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_ami',
		data: {
			columns: [
				['Used', 3]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 15
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_rds',
		data: {
			columns: [
				['Running DB instance', 17]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 22
		},
		color: {
			pattern: ['#1ab394', '#BABABA']
		}
	});
	c3.generate({
		bindto: '#gauge_elb',
		data: {
			columns: [
				['Classic ELB', 2]
			],
			type: 'gauge'
		},
		gauge: {
			label: {
				format: function (value, ratio) {
					return value;
				},
			},
			min: 1,
			max: 6
		},
		color: {
			pattern: ['#1ab394', '#BABABA', '#33D5FF']
		}
	});
});