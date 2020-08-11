$(function () {

    $(document).ready(function () {
        $('#regions').multiselect({
            includeSelectAllOption: true,
            nonSelectedText: 'Select Region',
        });
    });

	$(".ip-location").click(function () {
		//var ip_address = $(this).closest("tr").find("td").eq(8).html();
		var ip_address = $(this).closest('td').text();
		$.ajax({
			type: 'GET',
			url: '/get_ip_location',
			data: {
				'ip_address': ip_address,
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			success: function (response) {
				var ip_tracked_location = '';

				ip_tracked_location += '<tr><td>' + 1 + '</td><td>' + response["ip_tracked_data"].IPAddress + '</td><td>' + response["ip_tracked_data"].Country + '</td><td>' + response["ip_tracked_data"].IPRegion + '</td><td>' + response["ip_tracked_data"].City + '</td><td>' + response["ip_tracked_data"].Latitude + '</td><td>' + response["ip_tracked_data"].Longitude + '</td></tr>'

				$('#ip-tracked-location').empty();
				$('#ip-tracked-location').append(ip_tracked_location);
				$('#ip-location-modal').modal('show');
			},
			failure: function (response) {
				alert(response);
			},
			error: function (response) {
				alert(response.responseText);
			}
		});
	});

	$(".last-accessed-s3").click(function () {
		var bucket_name = $(this).closest("tr").find("td").eq(2).html();
		var region = $(this).closest("tr").find("td").eq(8).html();
		$.ajax({
			type: 'GET',
			url: '/get_last_last_accessed_s3',
			data: {
				'bucket_name': bucket_name,
				'region': region
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			success: function (response) {
				var last_accessed = '';

				last_accessed += '<tr><td>' + 1 + '</td><td>' + response["last_accessed_s3_bucket_data"].IAMUser + '</td><td>' + response["last_accessed_s3_bucket_data"].EventName + '</td><td>' + response["last_accessed_s3_bucket_data"].EventTime + '</td><td>' + response["last_accessed_s3_bucket_data"].IPAddress + '</td></tr>'

				$('#last-accessed-s3-data').empty();
				$('#last-accessed-s3-data').append(last_accessed);
				$('#last-accessed-s3-modal').modal('show');
			},
			failure: function (response) {
				alert(response);
			},
			error: function (response) {
				alert(response.responseText);
			}
		});
	});

	$(".last-events").click(function () {
		var iam_user = $(this).closest("tr").find("td").eq(1).html();
		$.ajax({
			type: 'GET',
			url: '/get_last_ten_activites',
			data: {
				'iam_user': iam_user,
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			success: function (response) {

				var last_events = '';
				$.each(response['last_activities_data'], function (key, value) {
					last_events += '<tr><td>' + value.SLNo + '</td><td>' + value.EventSource + '</td><td>' + value.EventName + '</td><td>' + value.EventTime + '</td><td>' + value.IPAddress + '</td><td><a class="ip-location1" href="javascript:;">Track IP Location</a></td></tr>'
				})
				$('#last-events-data').empty();
				$('#last-events-data').append(last_events);
				$('#last-events-modal').modal('show');
			},
			failure: function (response) {
				alert(response);
			},
			error: function (response) {
				alert(response.responseText);
			}
		});
	});

});


