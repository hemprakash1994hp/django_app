$(function () {
	Morris.Donut({
		element: 'morris-donut-chart',
		data: [{
				label: "User1",
				value: 12
			},
			{
				label: "dev_ec2",
				value: 30
			},
			{
				label: "test_proj",
				value: 20
			},
			{
				label: "webapp",
				value: 15
			}
		],
		resize: true,
		colors: ['#87d6c6', '#54cdb4', '#1ab394', '#33D5FF'],
	});
	Morris.Bar({
		element: 'morris-bar-chart',
		data: [{
				y: '2006',
				a: 60
			},
			{
				y: '2007',
				a: 75
			},
			{
				y: '2008',
				a: 50
			},
			{
				y: '2009',
				a: 75
			},
			{
				y: '2010',
				a: 50
			},
			{
				y: '2011',
				a: 75
			},
			{
				y: '2012',
				a: 100
			},
			{
				y: '2009',
				a: 75
			},
			{
				y: '2010',
				a: 50
			},
			{
				y: '2011',
				a: 75
			}
		],
		xkey: ['y'],
		ykeys: ['a'],
		labels: ['Series A'],
		hideHover: 'auto',
		resize: false,
		stacked: true,
		axes: false,
		grid: false,
		barColors: ['#1ab394'],
	});
})