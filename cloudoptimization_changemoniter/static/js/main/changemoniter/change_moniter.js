$(function () {

    var selected_regions;
	$('#regions').change(function (e) {
		selected_regions = $(e.target).val();
	});


    $(document).ajaxStart(function () {
		$(".body-opacity").addClass('loading-opacity');
		$("#loading").show();
	}).ajaxStop(function () {
		$("#loading").hide();
		$(".body-opacity").removeClass('loading-opacity');
	});


    var value = 0;

	$("#iam-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_iam/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.iam_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.iam_data[i].EventName + '</td>';
                                table_data += '<td>' + data.iam_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.iam_data[i].UserName + '</td>';
                                table_data += '<td>' + data.iam_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.iam_data[i].CreatedUser + '</td>';

                                if (data.iam_data[i].GroupName){
                                    table_data += '<td>' + data.iam_data[i].GroupName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                if (data.iam_data[i].Policy){
                                    table_data += '<td>' + data.iam_data[i].Policy + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.iam_data[i].ToUserName){
                                    table_data += '<td>' + data.iam_data[i].ToUserName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.iam_data[i].AccessKeyId){
                                    table_data += '<td>' + data.iam_data[i].AccessKeyId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.iam_data[i].Status){
                                    table_data += '<td>' + data.iam_data[i].Status + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                 table_data += '</tr>';
                            }
                        }
                        $('#iam-events-table').DataTable().destroy();
                        $('#iam-events-data').empty();
                        $('#iam-events-data').append(table_data);
                        IAMEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function IAMEventsDataDocumentGenerate(){
	    $('#iam-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in IAM',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in IAM',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_IAM',
					orientation: 'landscape',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in IAM',
										fontSize: 20,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 16,
										text: 'CloudjourneeOpSec All Events Occurs in IAM Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


    $("#iam-profile-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_iam_profile/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.iam_profile_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.iam_profile_data[i].EventName + '</td>';
                                table_data += '<td>' + data.iam_profile_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.iam_profile_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.iam_profile_data[i].CreatedUser + '</td>';
                                table_data += '<td>' + data.iam_profile_data[i].ToUserName + '</td>';
                                 table_data += '</tr>';
                            }
                        }
                        $('#iam-profile-events-table').DataTable().destroy();
                        $('#iam-profile-events-data').empty();
                        $('#iam-profile-events-data').append(table_data);
                        IAMProfileEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function IAMProfileEventsDataDocumentGenerate(){
	    $('#iam-profile-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in IAM-Profile',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in IAM-Profile',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_IAM-Profile',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in IAM-Profile',
										fontSize: 12,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'CloudjourneeOpSec All Events Occurs in IAM-Profile Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#iam-user-policy-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_iam_user_policy/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.iam_user_policy_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.iam_user_policy_data[i].EventName + '</td>';
                                table_data += '<td>' + data.iam_user_policy_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.iam_user_policy_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.iam_user_policy_data[i].CreatedUser + '</td>';
                                table_data += '<td>' + data.iam_user_policy_data[i].UserName + '</td>';
                                table_data += '<td>' + data.iam_user_policy_data[i].Policy + '</td>';
                                table_data += '</tr>';
                            }
                        }
                        $('#iam-user-policy-events-table').DataTable().destroy();
                        $('#iam-user-policy-events-data').empty();
                        $('#iam-user-policy-events-data').append(table_data);
                        IAMUserPolicyEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function IAMUserPolicyEventsDataDocumentGenerate(){
	    $('#iam-user-policy-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in IAM-User-Policy',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in IAM-User-Policy',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_IAM-User-Policy',
					orientation: 'portrait',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in IAM-User-Policy',
										fontSize: 14,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 10,
										text: 'CloudjourneeOpSec All Events Occurs in IAM-User-Policy Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#rds-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_rds/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.rds_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.rds_data[i].EventName + '</td>';
                                table_data += '<td>' + data.rds_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.rds_data[i].UserName + '</td>';
                                table_data += '<td>' + data.rds_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.rds_data[i].Region + '</td>';
                                table_data += '<td>' + data.rds_data[i].VPC + '</td>';
                                table_data += '<td>' + data.rds_data[i].DBInstanceIdentifier + '</td>';
                                table_data += '<td>' + data.rds_data[i].Engine + '</td>';
                                table_data += '<td>' + data.rds_data[i].AllocatedStorage + '</td>';
                                table_data += '<td>' + data.rds_data[i].DBInstanceClass + '</td>';
                                table_data += '</tr>';
                            }
                        }
                        $('#rds-events-table').DataTable().destroy();
                        $('#rds-events-data').empty();
                        $('#rds-events-data').append(table_data);
                        RDSEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function RDSEventsDataDocumentGenerate(){
	    $('#rds-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in RDS',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in RDS',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_RDS',
					orientation: 'portrait',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in RDS',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in RDS Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#s3-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_s3/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.s3_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.s3_data[i].EventName + '</td>';
                                table_data += '<td>' + data.s3_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.s3_data[i].UserName + '</td>';
                                table_data += '<td>' + data.s3_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.s3_data[i].Region + '</td>';
                                table_data += '<td>' + data.s3_data[i].BucketName + '</td>';
                                table_data += '</tr>';
                            }
                        }
                        $('#s3-events-table').DataTable().destroy();
                        $('#s3-events-data').empty();
                        $('#s3-events-data').append(table_data);
                        S3EventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function S3EventsDataDocumentGenerate(){
	    $('#s3-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in S3',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in S3',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_S3',
					orientation: 'portrait',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXVlT5V9dZ+/XqjoZt9FZBdjLghLgjGRHGLUUNiNIlJZsbolzjZJ5PMzBcnySTRyTJxSWISNSYuQQUDooDihqwisggCAt2svW+v31Z3/nPrVHf16/dePxANzKT4Lq9e1a2qW/c/y3/Ouf2Mmx98m/raFJohn+5mZDmfczM8HfPcM9/lKsutPPvDsX8Bds9Am4w2FK0MzYfWgXYE7R30W4d+q7C/Ai2db/wq58iMXuPp8/1zzGe+l1UF3stHJ/d2NdoX8M5zMufEM8FRfFShTcL+lXJ4H9pjaPeg7TiZJ8A8GQcNcOYBjPXYfQJtrhc8lcVCZNlYQ7+Cth3tV2iVfwfwg9mK0B4COE/h87QMq9zLNBlZTFeW7YuGA+Qn/w7g+7tNQ9sMEOZTDpCMHP4mmy/NOFeO9iDaf/8dwPdnO59NJtoIL4lReUhCX2Qhx7nbyNHuk2Y7GUjMDLQX+mLFsq3BsVdx7i3sH0CLi3aNRPsQ2jk4N7gPdjgPH89g76OFc8H/GwBGhboHhKI3ozUWenEOTRmC9lKuvvLZjGn+BfYfwv62PsIgPz4BDN2Cz4/k0ciPYP/XiozPvcc5CaL1QwvLI9rQ6tDsEwHAUWgXoc00HEIxHK2E50Emox0ftdjfhP1XJPZ6g/owexlALROByDXRD6B9zXAmpZAtifYkN9znMlz3c+yPyCFAn8Wxl9Dv90cxJyXCimdKTDoGrcIzz2wRjuC+W8mJR1eiPf9eADSOIZD/KPb/CZ+XHlWA6px/Hefv5YnvKzmA7YcMTp7xfAIfj+Qbg8oItFXvnEIQ3/9E3fFhtmdxDHk4V05C7jvFcPzn1dgvNwoIaTxj2UWO9fgftENHG8gXTGJww3Nx7xfRFqljAE+2M9F+i8ZSc0PvBIT7T2vz13JpKfrOVFnAO4YtjvtchfbrPKb9oW7K1Gtaq8UKbGSNFX/bAzijb5fBluxf0Xaifff9YqH/hQe+jM9ZeSb1aLax6P9HyYaUZTl/r8qdZZpNjkk+bhvue4uXfWY8e45DgHq94Y0SP95kFKBtfcSivEVw7nvo8KYQt+MCYKnY6X8+mtirj4F6+3xMGON09274NwHHLsnBMu/A8eXHIDCFkKcrJcXW694Y008NcrOgervbcHxjNFuMaeT363nHopxc7uton3uvALJ52IB2nnEUoOQzp0aGIZI+TOvXkTbR2nx+NcezVqP9NO9zlSLTZ1EgUkRBNMM09bFck5VljFdTljgTn+ehReX742i3F8KkjQIyQir3Pe5H+2afLDRH1r0Y0saTOqgAoF7Fx3LlgF2L7zHDYY4D0KYoJwi/yGWT2aoJ8gkTbXwV+zfmmJCb8gGnB92vnFLJFLUeOkLKtqlsyCAyLZPa6hudPobRl4VYix4L8HlVFitzt6TyrsknqHJsm8zJKuzvxn4L9i1yCM44w2GpF+LYQCPPvfD9ThzvxO5dObX2piwsFBduwIXT8tw8rZy0028NJ72VN/9oOILwSex/2XA0O9t2BOcfFq33TLUOSxBPqm4fZSvyhQIUihbrngaaz++nA5vfpjefXkqNNft1vwFjRtL4i2dR9YSxpNJpSgPcZDxByc5ORr3nUzxuo6tqYTjd5DU4HPg4Dp2dbU5kDv5iOGxymcrDWt0YUTnCwOz1TCO/9boaBxcUCuA9uMEX8ijeYjzkS8Ka+goFMkOQCPZ/hM9/9Jxbis/fYPfRXObInUPWIsM0KNq/kmLNLXRo204cszWQdbv2ArxnKdEeo3BZib4i1tRM/nBIgzj0tMlkp1IUqayg6ID+uL6ZUgCTzWxOU9gNoPfcWPFP810LpZxQ4B/QluYCTOWfH772Z5lxueo5lmodZvQB4AW4YEUe0/BdfP5718WYTFYPWzmT6wsEKBAKak+W7OikNCZMa0jvF/iMMC2W1jf7cvbaHwEoy+ejYgCwe/UG2rzwOWrYV6sBMNFSiSQFi4sAWFibT2d8JrQtTp0trRQoCut+fozvlAtn0qTL51CirR2Ad/TSxD4A9GZZWNAnod2Kbol8gPUBoGbm2F/MYUUOJrtawrC8gfwBymHiFEuJre5hkhCChFswWWlIsIXvDKBpWhRraaHWg4cxHyaVDx1EVsBPrXUNzgBlkvqi2dkA5PtbfotKBlbRlmeW0Sv3P6zvzdrkmlQtTEZujsfax89JArAOaO/ky+bQWTdd7xAdAB4HmNz4e4EA5g2nen0XKTbyJx6ihsNAT1XZme21yiFRWVNpt2SC57n5t+BD7gmXlpAvGKCaN7fQ4e27qKOhEd+DNGTaRD15by1eTs21BzTdrhw5jCbNmwv/M44SrW2U6GSNTPeekUwWaVkAy6f7pZNJ+C5ba3a0upI2L3qOVj3wZyoqL4W2Rch2Nc3qO6gwfc6r+stKwVIjtH3FKzCjrTC3pVo7T5l1NpVUD6DWw3X6XVhA2JKk4kk9JhbcNLQc0pQTRX6GBUFiIsU+18B1RRB2Hr8eK4Qj0cqC0qaFPMt9WpWTcN+FVp5Fa39lZADo1UBOF/XPIllLlJ2+lCeNzdTrf3ic9q7ZoP0HD5gHxpRdTzikPIjJ4f2OxiY9MRM/ejGNPncGJiRA4dKofrH2hiYt9TwxoZIoWWx2BQyeJPZvPtybzxlgkf6iEG1csJhW/+5RaD8mHKYSDz6mWoFrDZSMkd+Dn81+cfrH59Gpl1xAnXh+B8ZoQpCKyssoEYvB3HZo38ouggUxDiBYwGy8DwsxW6U4BDUdjwO0MjIhAKlEgvZv2gpf/Y4mTzyHw0+fotkxm29fKKQFJY1+PBYbwsqWRCcOFK3JoUyfxv4fMn0gL1F4KgviKfieUviVDiYKy+++j3a88BpVDB+sWZ8tTI7NU5eUM9EQ/5PoiOmXYtMXjEaotLqKRp49nQZCK/nF+drDO3ZpAsJaxxqwd+1Gqtu5R0v8sNMnQ7sn065X19CWxcsgEEU6xmOhKXRBVK5YtMcxTFp7XaMe8+nXX6HB279pG/xpkAZOHEetR+qp4d19VD1ujDbbPoA4aNJ4TZ7YInXiHXe9tpZq33iLkrE4VY0fQ4Mmn0q1sFRvL3sZ89DRZapLMRfTrrpUW6aDW3dQw94azOcQGnXuGZo3sL9mzcU4f0LOso9MheIQ5dQeABpOhv6K3tVr9Q2Ykx+WDqqmNQ//hdY/tpDKIT18Mt8EdsV3IunJWCclIWUsxfzCp193BY2bPZM2PvUsbX3uRUrhPBMUPseS6mOpZIBBXJiUJJlZwnxrsyaadzwBdAkPa0xnU4seN2sQm8sUNIoFk7XRxvkUtI/9fsWwIVRUUUYBjK/tSB0dfHunjjmZG2jrxG4A1wcZZG2OnWczQOyzI/0rcF29FnAT14y74Bya8amP6X7Mng2TjTG1MHPPAiITp80ugMVcjlFOZt67tdl2urRs8EB796p1tPyu+7UJAIubDlAuR98S5eQCOaXU6fGp8w2nHviwd66UywqhlelUUpum1sP12syyRGuTyJrlSF8X87QxYaztGS9wFvpMUE6JanfG+3H1gGt+B9H+WiiA3UGnY1VU7sqD/i8JrWKhVDw+jD8oMWlX4Mjvwt8ziJWJ7+xq2B2xwLJwsAltQuw6euZZdP6XbqYUmHMCQg0u8R3ysH7PmP4V+//hAsh1sYW9GZW6G/7sy0nY/2f/8+fwW40U6VfxdQzsBxnv/C6nwdD2S26wRY5b2QqX/AIpAMhSytql4zAxu73jxu6py5j4JyTtxTT+voxHXIK2RLJCQygXCH1Yj7wA5i5PFZx77dFfA29T/e4aOuMTV9EZ86+mxhomg3q13JEst3lFao7EavqhHA95NFhSDBO3UttpgHehB7w/Sl6yVQqii+V4zPWdOWM6YZqseYZh5GWlebYm10pkOedag9qcRaATbdNab8I/DqC3nnmeajZuBqmqZF/PhepXs1xxBq4oVpLMnpzFxtq+QHBVGyg1p6fY/+BuP5PT/yJZiDs8106RdJkLXDrLQzkFdQFaKEsVe4AnpLGEDZdn9OPq9vmyvzOP4LvH7CyRpjuG8FGOwS/nSY6fK3nRCk9FYpzcO9s2nnOf2Vi+bOcAxPP9EGo2rxseW6RjbM4iQeCXZkl+c155rFuNGJNFIp4JRSOKk8BtdeynioaK42Tp/r6n4x7OcXL5RzlrYEJZBsfF2TdEkjjLU4PPyz3n2VfuVd2WYIRyyjorPDWD25SzgvoFMdlnHoV4u2PghcCvit+szTYGkjEox6rsU5KVImd5xF4pIvM7v6ycMSzgDIlyVg9sc8asl0t44+kfy7HlEqp9xnOOgXhRTOILsHA7olX9R9ci9Ni27CWw9gGMxVIje4VjqCEATpFjvKLrTilgXu0L+mn/xi0IOjuY0k+TPhuyzBC//FJy1sBY3uSHfK7EfaeSswaEfW0/PP5peLVBAk+lpKUCHiIUdCXecCbfXa/5K/EJ8wpnnfopXNM8zTMG1qynPdUWPQYj9xgC8v160UaO0XitT4VoF6/LuU/A5e9fkvvME0tVT876GxaO3yhnZThvHM/NMhwXxEtNxmB/SaRfGW16+llYv+1U3L/yNQA7Btd8XkpZh+Q+Z3KigQHk9S0TJTf5bSD+fLi8NHUEsRhnK3TGv9tMNPSRWFIZZ7l6Pkxe+Gx5oV9Ix6/IZ0tXzNnT/DYLUXDLSz+TJDhrw/ZCC6XKeeYwqSeebTgx712eAjG5xEtlGUOGT28QszlDmHuxPPsyIVS3Sr/RHndDspTxNo+yXCfPvY5ZtHJWyH0R7ZcwmWMw59M5Lbn2Tws0E/cFgzulPnitWJPrOWfNwmlKQnmLF4EgbPE7K1dRe32Dk2XBC8kDQ31U382MQ7PlOu+K55+4bFE6xXNU+l0NnkTdhVS3z7Me35RzOKLhF3q01yU17njm5htDFtbKSxxbPceick/X1DZmECkvkHdKupK301X3+lQWju/J+fHadKXtuSVVA0BmttA7L62iKPaVLdOrfBir8Wd8eU5MBQfbnEGxMBAf/F0FHd5+kPat36gDVck37pYBTs4yYRyn8FK5P6jugbsz6ZKFRs/kdKju5Rp6vN6FWC4v9SzMCnpNsurJdtvEHPK4tuHaw6pbW0zp7wpdq2doccoYQwb4ylOL7JGrzKH4fnkH1wTHvblrJZoo9+UlJLtEk0isw3flZqzV7C/bOLwKl0Zo4xPPUb/qqVQ2fDglWlvIBpKpFIdfMbB4xJJ2qhJf2tDiaE2gr0do+/KXaf+WTqoeF8WxNNDX1fl28QkXUfe6lAAe+B15i6c8Jsd9sb3yyeTgrzIZp8gxdxFuSPUENpYxqQflc6Bn4lzJ3ipm5V4hBw94rIB7vwMeTX7CQ6x6jMG9RgYfU1nCIS+zzVj95wJtZAid2y/kEZpymafpLvfwLFsJCY9IsH/zByqoo76JDiV+QGa0itqSrVQSakb8MA3c5Hwol4980QE/JstfCzQR+Vvt5A820bSrkhRvH0sbnwySL5CmkupEWqu4ou8rZ8kBT1aDsC83P7c3g8SQ5Fc5Xvw66eXqmoD8Qk7/3jWV8vJzZELv9E6mZFPYv3yDBcdwSi3usgY27W+Lxt4qi5JcP7RJhB5kxfg3ctbaLMocg0ywC8wc1XMMbRnvY+SIKzMtb0T6sJn7ODlLDtlV8eKwr8l8uAuGOSQZpJxECBOsqYapZqU6rW3tewI0+pOKSmeupvojCUpafioCHtHo6xQuWQQAQ2R89eWJsFl+tq3alNopdCo3KVRi07bnKuj1hwbS3g1RqHOKiisTK5UyzvO+gbuSileXqZ6ZGFPe9f4sK6y45nWWp4x1XxbTHJNYi8TkjPT6R+UkIa6FpMI3Goks/pDjpB0ys/erjDFI3e0sVdgYeLX1s4azzmW2xwcqT2xYJ6HJ06JVM8RSvJPlvjOkD5OyX/bMyaq9nXWBCakOs33UdYdo1PwDlGqzKNVp6nUs/YtsqkZTZgfwSpN11qemwkQW4Qu0VwWgiT5KxixKdFg09LRWGntRA2sgNe4L0eEdkQcsn0r5QyqCoTcLmeB1kVJV57KlMVLCjaflBReKNlWJD2FAP+GxQIjPDJ9QeU7Qcp7VL6zRzfD8SSaDTcy3yFmWwfsrHepuLKTuRAIvJLoZbaNHLRaKNlXLGHgJxw1GNwDrJXToGgP1HINP2OdiWfjkbrwoics5C/CZRPMZjolcIkLKvn+ZjC3qLNzScfNqm72kSWvg6tgiDOeijh03H+yoDV1RNDDRMeH2fTTsysOUbAF47T5O1LDUjrQMurEkqFKk/AeUCpJxxwsXBwKmSqVsw05n2Ab4PgpE0lQ6ME5NtUFa92gVbVrUn5oPBghAgt7aYEx4ctIkC6oNDUXM6FxXWDUg+0KDQioNRp6KvtFHxVwdxXP6rGI4VRvvmtH890S3VIuPrFCKku0W2TFYPhhmO22SvzhF1bMaadQNBylcFaeO/SFYRBoA8Dg5fxXwuZxr16PLUhQw6XJ8X+RLpI3i5rh5fUnAnh20VBv/MQrAPAi0G6DOjcmYWXdkR1FDuCzZcuFt+5LjL26gna+UUf3uMHU0+sgfsmnY9FZqqAnS+scG6PxmuDxFaUhYZ5uPIhVJxJIpDfT/682l4LBklWc007jP11DzjiJqeqtY0+5QZZLKJrZRxdQ2gvksatsTvtSw1DUA70o39WeQ4zuADwGra4gBTNvUsKfFejxkmcWlQfub0YC6MeJXFLKU9uzc2bZULNbia0bbXDYofu+5n619jG1yvJ2XPyiEG0mthf1HxeitxZWIH/1UPDRJAye00a5Xy+jQ9iJoZxIhSppXFVAC1zL4lp8r4Qk69pz2SYKdqQCKRTCP1P/MZpp0x7sUgBaFYdlY48ArYMEQHsTMi2OHAjcgUrgM4A3odR+u0wGPFK/OMODvWO9vfX4O7YadTaaZiuFGBl1S5LO/DCAvKWZw0AIMpiAvlHEHJON3pqUexMTvSyfMLjA6W33UfCAIEpSiypExqt1UTGsfqab9m4upvQHmAkAXAcwRkMJOOOctS/pRMJqmIryQGwDqCpPHjPMEnNAmlAcOE2j4VFf2INEELtFqkS8CwsGLD3Bu0Ox6Gj3/INyMTZ31AQsgDURf/vWMD+MW7HdH9TUOWEwahvmqLEqviKeNi7oAVELrlNY6jfR5PpNuB5jXFCPa6wLT9Gim0qThYaHEK3QaH338oTSlUyYloKHsF30ws/V7QtRUE4JpNal0MCRvfLsGZ80jVbTuz1XUcihIEAiHu6YAGgTCgGT6DOdYACwYL4zJMGT5hkP+09BmA+PTkyczzALAx+MNfviaNAXKU12F2K46nsm+yMI4Da0NuRDS/txQXUKVbHaA8WMSrXBaC2SqE4IP38/vZid5iYlBlR9qofKprVS/voSYsIz59H59jMeUhA/EePtJovumo9FmgEaDi9M0MJLegf2xvQDMlFoANQXO8nZM5KfDmI8oJpbBDAuYJGCiDzNP/tOxR8nz93RKNMoH8xl0TWiHqTXVB7MRrUrQ4XeKqGZjVNbSKNq7roTaoMXFp7RTZFIbHVjWj+rWlOiJ8YFUMYhp+FcT17MZ6qzzAzBLg6XPgUWHYQ36n9NEMZCvurWlZATTIAlpbYZSOJ+E9peNbUcgnKaGN4s1oDxGtiY84Yala6y4JzQIz7VxDZONimmt1A/svA5j7KgJadNXMb1Fm8IGvEMc7iMytJOqZjXhM6bNJmsgC2C8ye9kWbv/UoZzqRNkBcE8STZYfQFYhXEOiaZj0MaqvABmgDkcmnlLWhlfBFfuF/axRtrE/jKC/aDPyYynlNEBMJ/E/R4UOt2rwu29qc69YhLZ5Lp5pxQmkWKmTuEf4D6Q2MaNxQAqoIFh7WrbG4bmJKkfJq/57QjVrS7VoDBAxcNjNGBmE1VMadUSf2B5BR1eVYrJDTh/Z43JrJjSRoPn1pG/JE0HXyynw/DV3DdcHaeiQZ26LwtIPxC0FCxJ56EANDlJ/c9upuiIGLW+G6YY2DhrYhGESGtjSocG2jrwvfg6Pm6IRci5ILR7mydJ++H5TGg5hGoExp20aWLBAHqLn1whAPn5HMCaysMKYcAMKINZJPs+Rzu3oc/jtk1/gTBvKHRRLGthGCHK/mY/7QPZCUPi/DBz7DuYLBls0gKOOWVy4GoeA2haDkDMglkbfAh6gyBZiUY/xQ4H9Hvy93D/BCVaeaGSQaF+OA/TmICG8LWBaEqbQzbLPBa9tIX/DMgm3YeBYUvA2skmk8HhT8M6yvUVkrUhpxrBS0FOl4R2KFdngKYt4MjSND9m7rEA6N2u4LQaNG5eSmI/v+kAyP4yLGAGLY5w1Uo8ewF860L4zp0qD4C60gl/dwgTVQtQeL8QpqcnkF1j2uj1N1wMuAWhYH+mfVXC7HXe9DsCosEwHRVR9vtCTMskpzxPwOtf6IUcqyMGpFEQNMukG9/rr1RwAvspMNdTLUtxfvQGgDO4DZPQnCBmtNpPsoZCM2eF/GpW2FJ3BSxaZhmKE8tLMKDdMMtdCdFjXlZi55lszr0xuUhaBZ/Pl4w4xm24LKvgP0//sCzjOKZwMi2FSz/c4fH6mZGtkiz+NrT4GsQoN/ud5LR+UDMkvjHOgCotPfCXs6GZs9ncAsxXAPJT0LIlOLVJUXei8yTfisUkXiztTDq2PyzeJfVUXgbyuBvMs9BD5IYc7x/64aTyI9J49fC10MLroJ0Tulgt/osD0Oa4AxJM67lBC82nfgRwN0FbXwSoS4v99mu4tu4kAmyIsMhzZNXADMmfHsuWFOvGIdqTnuPXArXHbGb9tg7sh79XH1jodpGUVeZl1PW0NLkSpWM4B1RoKXG6/fW4bWyQHxPYLdK4VwTlb7X5xByOkzZFNG0ivfefLtsgYRj/7EhNjj7zEUo8NBTsF+HEqg8KQPIUOudKEfYS6l6q14PQ6MSGcsHsReoOSZG21qlE6BpgjRR+OfvfJCWtdk9NsdCtiLp/capMyAVr1gjJkgyX74OO45zUeLTttXzsk1NuzIg7U8YXBhen7uFQ4oP+rbS4lHYWSoJ2jjh0XhQ0tGsdi9EtTFm4TZW0aX08p11KRx3SkqK5tqdeySWjgAAXEfAilPHrUO/DVi/ltielYJ3KSc4kXhwYsbtSmrBW9wZNZcE6hT5oDcy1mVKZZu3kxbsz6fj9ksiJsu2RCv0zUiNsLeQiW/6Uf2xFmiKIg1kTDa2ROvt1wvxaIWvFS9T9w3Zsqs4TIJkUTD4JAWONXytgrZB2zMESFxvihlOJcDWTgfWdwNK6R5w5iQ86R5jdVGnlJ9iYeUXeGwIaV95XUveCqveVUZ0M27vS/uiJscZKIniaMMCRQjAiH8B4joiAbRXmuE72j/wtKPHJuPH6lvXSHvIcd3/clQlRtadVSUxWLIQlJIzYou5CUlrIT1xIT5uQDWa3+z3M1xWmzhNhIv5XgAEAOcyGGJeOyHYAAAAASUVORK5CYII=';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in S3',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in S3 Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#vpc-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_vpc/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.vpc_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.vpc_data[i].EventName + '</td>';
                                table_data += '<td>' + data.vpc_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.vpc_data[i].UserName + '</td>';
                                table_data += '<td>' + data.vpc_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.vpc_data[i].Region + '</td>';

                                if (data.vpc_data[i].VpcId){
                                    table_data += '<td>' + data.vpc_data[i].VpcId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].GroupID){
                                    table_data += '<td>' + data.vpc_data[i].GroupID + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].InternetGateWayId){
                                    table_data += '<td>' + data.vpc_data[i].InternetGateWayId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].RouteTableId){
                                    table_data += '<td>' + data.vpc_data[i].RouteTableId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].CIDRBlock){
                                    table_data += '<td>' + data.vpc_data[i].CIDRBlock + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].Gateway){
                                    table_data += '<td>' + data.vpc_data[i].Gateway + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].SubnetId){
                                    table_data += '<td>' + data.vpc_data[i].SubnetId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].AvailablityZone){
                                    table_data += '<td>' + data.vpc_data[i].AvailablityZone + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].NetworkInterfaceId){
                                    table_data += '<td>' + data.vpc_data[i].NetworkInterfaceId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].PrivateIP){
                                    table_data += '<td>' + data.vpc_data[i].PrivateIP + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.vpc_data[i].VPNGatewayId){
                                    table_data += '<td>' + data.vpc_data[i].VPNGatewayId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                table_data += '</tr>';
                            }
                        }
                        $('#vpc-events-table').DataTable().destroy();
                        $('#vpc-events-data').empty();
                        $('#vpc-events-data').append(table_data);
                        VPCEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function VPCEventsDataDocumentGenerate(){
	    $('#vpc-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in VPC',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in VPC',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_VPC',
					orientation: 'landscape',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in VPC',
										fontSize: 20,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 16,
										text: 'CloudjourneeOpSec All Events Occurs in VPC Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#aws-lambda-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_aws_lambda/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.aws_lambda_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.aws_lambda_data[i].EventName + '</td>';
                                table_data += '<td>' + data.aws_lambda_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.aws_lambda_data[i].UserName + '</td>';
                                table_data += '<td>' + data.aws_lambda_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.aws_lambda_data[i].Region + '</td>';
                                table_data += '<td>' + data.aws_lambda_data[i].FunctionName + '</td>';
                                if (data.aws_lambda_data[i].Role){
                                    table_data += '<td>' + data.aws_lambda_data[i].Role + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.aws_lambda_data[i].Runtime){
                                    table_data += '<td>' + data.aws_lambda_data[i].Runtime + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                table_data += '</tr>';
                            }
                        }
                        $('#aws-lambda-events-table').DataTable().destroy();
                        $('#aws-lambda-events-data').empty();
                        $('#aws-lambda-events-data').append(table_data);
                        LambdaEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function LambdaEventsDataDocumentGenerate(){
	    $('#aws-lambda-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in Lambda',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in Lambda',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_Lambda',
					orientation: 'portrait',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in Lambda',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in Lambda Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#cloudformation-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_cloudformation/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.cloudformation_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.cloudformation_data[i].EventName + '</td>';
                                table_data += '<td>' + data.cloudformation_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.cloudformation_data[i].UserName + '</td>';
                                table_data += '<td>' + data.cloudformation_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.cloudformation_data[i].Region + '</td>';
                                table_data += '<td>' + data.cloudformation_data[i].StackName + '</td>';
                                table_data += '</tr>';
                            }
                        }
                        $('#cloudformation-events-table').DataTable().destroy();
                        $('#cloudformation-events-data').empty();
                        $('#cloudformation-events-data').append(table_data);
                        CloudFormationEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function CloudFormationEventsDataDocumentGenerate(){
	    $('#cloudformation-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in cloudFormation',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in cloudFormation',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_cloudFormation',
					orientation: 'portrait',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in cloudFormation',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in cloudFormation Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#cloudtrail-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_cloudtrail/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.cloudtrail_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.cloudtrail_data[i].EventName + '</td>';
                                table_data += '<td>' + data.cloudtrail_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.cloudtrail_data[i].UserName + '</td>';
                                table_data += '<td>' + data.cloudtrail_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.cloudtrail_data[i].Region + '</td>';
                                table_data += '<td>' + data.cloudtrail_data[i].TrailName + '</td>';
                                if ('IsMultiRegionTrail' in data.cloudtrail_data[i]){
                                    table_data += '<td>' + data.cloudtrail_data[i].IsMultiRegionTrail + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                table_data += '</tr>';
                            }
                        }
                        $('#cloudtrail-events-table').DataTable().destroy();
                        $('#cloudtrail-events-data').empty();
                        $('#cloudtrail-events-data').append(table_data);
                        CloudTrailEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function CloudTrailEventsDataDocumentGenerate(){
	    $('#cloudtrail-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in cloudTrail',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in cloudTrail',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_cloudTrail',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in cloudTrail',
										fontSize: 12,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'CloudjourneeOpSec All Events Occurs in cloudTrail Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


	$("#cloudwatch-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "events_cloudwatch/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.cloudwatch_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.cloudwatch_data[i].EventName + '</td>';
                                table_data += '<td>' + data.cloudwatch_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.cloudwatch_data[i].UserName + '</td>';
                                table_data += '<td>' + data.cloudwatch_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.cloudwatch_data[i].Region + '</td>';
                                if (data.cloudwatch_data[i].MetricName){
                                    table_data += '<td>' + data.cloudwatch_data[i].MetricName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.cloudwatch_data[i].Namespace){
                                    table_data += '<td>' + data.cloudwatch_data[i].Namespace + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.cloudwatch_data[i].AlaramName){
                                    table_data += '<td>' + data.cloudwatch_data[i].AlaramName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                table_data += '</tr>';
                            }
                        }
                        $('#cloudwatch-events-table').DataTable().destroy();
                        $('#cloudwatch-events-data').empty();
                        $('#cloudwatch-events-data').append(table_data);
                        CloudWatchEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function CloudWatchEventsDataDocumentGenerate(){
	    $('#cloudwatch-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in cloudWatch',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in cloudWatch',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_cloudWatch',
					orientation: 'portrait',
					pageSize: 'A3',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXVlT5V9dZ+/XqjoZt9FZBdjLghLgjGRHGLUUNiNIlJZsbolzjZJ5PMzBcnySTRyTJxSWISNSYuQQUDooDihqwisggCAt2svW+v31Z3/nPrVHf16/dePxANzKT4Lq9e1a2qW/c/y3/Ouf2Mmx98m/raFJohn+5mZDmfczM8HfPcM9/lKsutPPvDsX8Bds9Am4w2FK0MzYfWgXYE7R30W4d+q7C/Ai2db/wq58iMXuPp8/1zzGe+l1UF3stHJ/d2NdoX8M5zMufEM8FRfFShTcL+lXJ4H9pjaPeg7TiZJ8A8GQcNcOYBjPXYfQJtrhc8lcVCZNlYQ7+Cth3tV2iVfwfwg9mK0B4COE/h87QMq9zLNBlZTFeW7YuGA+Qn/w7g+7tNQ9sMEOZTDpCMHP4mmy/NOFeO9iDaf/8dwPdnO59NJtoIL4lReUhCX2Qhx7nbyNHuk2Y7GUjMDLQX+mLFsq3BsVdx7i3sH0CLi3aNRPsQ2jk4N7gPdjgPH89g76OFc8H/GwBGhboHhKI3ozUWenEOTRmC9lKuvvLZjGn+BfYfwv62PsIgPz4BDN2Cz4/k0ciPYP/XiozPvcc5CaL1QwvLI9rQ6tDsEwHAUWgXoc00HEIxHK2E50Emox0ftdjfhP1XJPZ6g/owexlALROByDXRD6B9zXAmpZAtifYkN9znMlz3c+yPyCFAn8Wxl9Dv90cxJyXCimdKTDoGrcIzz2wRjuC+W8mJR1eiPf9eADSOIZD/KPb/CZ+XHlWA6px/Hefv5YnvKzmA7YcMTp7xfAIfj+Qbg8oItFXvnEIQ3/9E3fFhtmdxDHk4V05C7jvFcPzn1dgvNwoIaTxj2UWO9fgftENHG8gXTGJww3Nx7xfRFqljAE+2M9F+i8ZSc0PvBIT7T2vz13JpKfrOVFnAO4YtjvtchfbrPKb9oW7K1Gtaq8UKbGSNFX/bAzijb5fBluxf0Xaifff9YqH/hQe+jM9ZeSb1aLax6P9HyYaUZTl/r8qdZZpNjkk+bhvue4uXfWY8e45DgHq94Y0SP95kFKBtfcSivEVw7nvo8KYQt+MCYKnY6X8+mtirj4F6+3xMGON09274NwHHLsnBMu/A8eXHIDCFkKcrJcXW694Y008NcrOgervbcHxjNFuMaeT363nHopxc7uton3uvALJ52IB2nnEUoOQzp0aGIZI+TOvXkTbR2nx+NcezVqP9NO9zlSLTZ1EgUkRBNMM09bFck5VljFdTljgTn+ehReX742i3F8KkjQIyQir3Pe5H+2afLDRH1r0Y0saTOqgAoF7Fx3LlgF2L7zHDYY4D0KYoJwi/yGWT2aoJ8gkTbXwV+zfmmJCb8gGnB92vnFLJFLUeOkLKtqlsyCAyLZPa6hudPobRl4VYix4L8HlVFitzt6TyrsknqHJsm8zJKuzvxn4L9i1yCM44w2GpF+LYQCPPvfD9ThzvxO5dObX2piwsFBduwIXT8tw8rZy0028NJ72VN/9oOILwSex/2XA0O9t2BOcfFq33TLUOSxBPqm4fZSvyhQIUihbrngaaz++nA5vfpjefXkqNNft1vwFjRtL4i2dR9YSxpNJpSgPcZDxByc5ORr3nUzxuo6tqYTjd5DU4HPg4Dp2dbU5kDv5iOGxymcrDWt0YUTnCwOz1TCO/9boaBxcUCuA9uMEX8ijeYjzkS8Ka+goFMkOQCPZ/hM9/9Jxbis/fYPfRXObInUPWIsM0KNq/kmLNLXRo204cszWQdbv2ArxnKdEeo3BZib4i1tRM/nBIgzj0tMlkp1IUqayg6ID+uL6ZUgCTzWxOU9gNoPfcWPFP810LpZxQ4B/QluYCTOWfH772Z5lxueo5lmodZvQB4AW4YEUe0/BdfP5718WYTFYPWzmT6wsEKBAKak+W7OikNCZMa0jvF/iMMC2W1jf7cvbaHwEoy+ejYgCwe/UG2rzwOWrYV6sBMNFSiSQFi4sAWFibT2d8JrQtTp0trRQoCut+fozvlAtn0qTL51CirR2Ad/TSxD4A9GZZWNAnod2Kbol8gPUBoGbm2F/MYUUOJrtawrC8gfwBymHiFEuJre5hkhCChFswWWlIsIXvDKBpWhRraaHWg4cxHyaVDx1EVsBPrXUNzgBlkvqi2dkA5PtbfotKBlbRlmeW0Sv3P6zvzdrkmlQtTEZujsfax89JArAOaO/ky+bQWTdd7xAdAB4HmNz4e4EA5g2nen0XKTbyJx6ihsNAT1XZme21yiFRWVNpt2SC57n5t+BD7gmXlpAvGKCaN7fQ4e27qKOhEd+DNGTaRD15by1eTs21BzTdrhw5jCbNmwv/M44SrW2U6GSNTPeekUwWaVkAy6f7pZNJ+C5ba3a0upI2L3qOVj3wZyoqL4W2Rch2Nc3qO6gwfc6r+stKwVIjtH3FKzCjrTC3pVo7T5l1NpVUD6DWw3X6XVhA2JKk4kk9JhbcNLQc0pQTRX6GBUFiIsU+18B1RRB2Hr8eK4Qj0cqC0qaFPMt9WpWTcN+FVp5Fa39lZADo1UBOF/XPIllLlJ2+lCeNzdTrf3ic9q7ZoP0HD5gHxpRdTzikPIjJ4f2OxiY9MRM/ejGNPncGJiRA4dKofrH2hiYt9TwxoZIoWWx2BQyeJPZvPtybzxlgkf6iEG1csJhW/+5RaD8mHKYSDz6mWoFrDZSMkd+Dn81+cfrH59Gpl1xAnXh+B8ZoQpCKyssoEYvB3HZo38ouggUxDiBYwGy8DwsxW6U4BDUdjwO0MjIhAKlEgvZv2gpf/Y4mTzyHw0+fotkxm29fKKQFJY1+PBYbwsqWRCcOFK3JoUyfxv4fMn0gL1F4KgviKfieUviVDiYKy+++j3a88BpVDB+sWZ8tTI7NU5eUM9EQ/5PoiOmXYtMXjEaotLqKRp49nQZCK/nF+drDO3ZpAsJaxxqwd+1Gqtu5R0v8sNMnQ7sn065X19CWxcsgEEU6xmOhKXRBVK5YtMcxTFp7XaMe8+nXX6HB279pG/xpkAZOHEetR+qp4d19VD1ujDbbPoA4aNJ4TZ7YInXiHXe9tpZq33iLkrE4VY0fQ4Mmn0q1sFRvL3sZ89DRZapLMRfTrrpUW6aDW3dQw94azOcQGnXuGZo3sL9mzcU4f0LOso9MheIQ5dQeABpOhv6K3tVr9Q2Ykx+WDqqmNQ//hdY/tpDKIT18Mt8EdsV3IunJWCclIWUsxfzCp193BY2bPZM2PvUsbX3uRUrhPBMUPseS6mOpZIBBXJiUJJlZwnxrsyaadzwBdAkPa0xnU4seN2sQm8sUNIoFk7XRxvkUtI/9fsWwIVRUUUYBjK/tSB0dfHunjjmZG2jrxG4A1wcZZG2OnWczQOyzI/0rcF29FnAT14y74Bya8amP6X7Mng2TjTG1MHPPAiITp80ugMVcjlFOZt67tdl2urRs8EB796p1tPyu+7UJAIubDlAuR98S5eQCOaXU6fGp8w2nHviwd66UywqhlelUUpum1sP12syyRGuTyJrlSF8X87QxYaztGS9wFvpMUE6JanfG+3H1gGt+B9H+WiiA3UGnY1VU7sqD/i8JrWKhVDw+jD8oMWlX4Mjvwt8ziJWJ7+xq2B2xwLJwsAltQuw6euZZdP6XbqYUmHMCQg0u8R3ysH7PmP4V+//hAsh1sYW9GZW6G/7sy0nY/2f/8+fwW40U6VfxdQzsBxnv/C6nwdD2S26wRY5b2QqX/AIpAMhSytql4zAxu73jxu6py5j4JyTtxTT+voxHXIK2RLJCQygXCH1Yj7wA5i5PFZx77dFfA29T/e4aOuMTV9EZ86+mxhomg3q13JEst3lFao7EavqhHA95NFhSDBO3UttpgHehB7w/Sl6yVQqii+V4zPWdOWM6YZqseYZh5GWlebYm10pkOedag9qcRaATbdNab8I/DqC3nnmeajZuBqmqZF/PhepXs1xxBq4oVpLMnpzFxtq+QHBVGyg1p6fY/+BuP5PT/yJZiDs8106RdJkLXDrLQzkFdQFaKEsVe4AnpLGEDZdn9OPq9vmyvzOP4LvH7CyRpjuG8FGOwS/nSY6fK3nRCk9FYpzcO9s2nnOf2Vi+bOcAxPP9EGo2rxseW6RjbM4iQeCXZkl+c155rFuNGJNFIp4JRSOKk8BtdeynioaK42Tp/r6n4x7OcXL5RzlrYEJZBsfF2TdEkjjLU4PPyz3n2VfuVd2WYIRyyjorPDWD25SzgvoFMdlnHoV4u2PghcCvit+szTYGkjEox6rsU5KVImd5xF4pIvM7v6ycMSzgDIlyVg9sc8asl0t44+kfy7HlEqp9xnOOgXhRTOILsHA7olX9R9ci9Ni27CWw9gGMxVIje4VjqCEATpFjvKLrTilgXu0L+mn/xi0IOjuY0k+TPhuyzBC//FJy1sBY3uSHfK7EfaeSswaEfW0/PP5peLVBAk+lpKUCHiIUdCXecCbfXa/5K/EJ8wpnnfopXNM8zTMG1qynPdUWPQYj9xgC8v160UaO0XitT4VoF6/LuU/A5e9fkvvME0tVT876GxaO3yhnZThvHM/NMhwXxEtNxmB/SaRfGW16+llYv+1U3L/yNQA7Btd8XkpZh+Q+Z3KigQHk9S0TJTf5bSD+fLi8NHUEsRhnK3TGv9tMNPSRWFIZZ7l6Pkxe+Gx5oV9Ix6/IZ0tXzNnT/DYLUXDLSz+TJDhrw/ZCC6XKeeYwqSeebTgx712eAjG5xEtlGUOGT28QszlDmHuxPPsyIVS3Sr/RHndDspTxNo+yXCfPvY5ZtHJWyH0R7ZcwmWMw59M5Lbn2Tws0E/cFgzulPnitWJPrOWfNwmlKQnmLF4EgbPE7K1dRe32Dk2XBC8kDQ31U382MQ7PlOu+K55+4bFE6xXNU+l0NnkTdhVS3z7Me35RzOKLhF3q01yU17njm5htDFtbKSxxbPceick/X1DZmECkvkHdKupK301X3+lQWju/J+fHadKXtuSVVA0BmttA7L62iKPaVLdOrfBir8Wd8eU5MBQfbnEGxMBAf/F0FHd5+kPat36gDVck37pYBTs4yYRyn8FK5P6jugbsz6ZKFRs/kdKju5Rp6vN6FWC4v9SzMCnpNsurJdtvEHPK4tuHaw6pbW0zp7wpdq2doccoYQwb4ylOL7JGrzKH4fnkH1wTHvblrJZoo9+UlJLtEk0isw3flZqzV7C/bOLwKl0Zo4xPPUb/qqVQ2fDglWlvIBpKpFIdfMbB4xJJ2qhJf2tDiaE2gr0do+/KXaf+WTqoeF8WxNNDX1fl28QkXUfe6lAAe+B15i6c8Jsd9sb3yyeTgrzIZp8gxdxFuSPUENpYxqQflc6Bn4lzJ3ipm5V4hBw94rIB7vwMeTX7CQ6x6jMG9RgYfU1nCIS+zzVj95wJtZAid2y/kEZpymafpLvfwLFsJCY9IsH/zByqoo76JDiV+QGa0itqSrVQSakb8MA3c5Hwol4980QE/JstfCzQR+Vvt5A820bSrkhRvH0sbnwySL5CmkupEWqu4ou8rZ8kBT1aDsC83P7c3g8SQ5Fc5Xvw66eXqmoD8Qk7/3jWV8vJzZELv9E6mZFPYv3yDBcdwSi3usgY27W+Lxt4qi5JcP7RJhB5kxfg3ctbaLMocg0ywC8wc1XMMbRnvY+SIKzMtb0T6sJn7ODlLDtlV8eKwr8l8uAuGOSQZpJxECBOsqYapZqU6rW3tewI0+pOKSmeupvojCUpafioCHtHo6xQuWQQAQ2R89eWJsFl+tq3alNopdCo3KVRi07bnKuj1hwbS3g1RqHOKiisTK5UyzvO+gbuSileXqZ6ZGFPe9f4sK6y45nWWp4x1XxbTHJNYi8TkjPT6R+UkIa6FpMI3Goks/pDjpB0ys/erjDFI3e0sVdgYeLX1s4azzmW2xwcqT2xYJ6HJ06JVM8RSvJPlvjOkD5OyX/bMyaq9nXWBCakOs33UdYdo1PwDlGqzKNVp6nUs/YtsqkZTZgfwSpN11qemwkQW4Qu0VwWgiT5KxixKdFg09LRWGntRA2sgNe4L0eEdkQcsn0r5QyqCoTcLmeB1kVJV57KlMVLCjaflBReKNlWJD2FAP+GxQIjPDJ9QeU7Qcp7VL6zRzfD8SSaDTcy3yFmWwfsrHepuLKTuRAIvJLoZbaNHLRaKNlXLGHgJxw1GNwDrJXToGgP1HINP2OdiWfjkbrwoics5C/CZRPMZjolcIkLKvn+ZjC3qLNzScfNqm72kSWvg6tgiDOeijh03H+yoDV1RNDDRMeH2fTTsysOUbAF47T5O1LDUjrQMurEkqFKk/AeUCpJxxwsXBwKmSqVsw05n2Ab4PgpE0lQ6ME5NtUFa92gVbVrUn5oPBghAgt7aYEx4ctIkC6oNDUXM6FxXWDUg+0KDQioNRp6KvtFHxVwdxXP6rGI4VRvvmtH890S3VIuPrFCKku0W2TFYPhhmO22SvzhF1bMaadQNBylcFaeO/SFYRBoA8Dg5fxXwuZxr16PLUhQw6XJ8X+RLpI3i5rh5fUnAnh20VBv/MQrAPAi0G6DOjcmYWXdkR1FDuCzZcuFt+5LjL26gna+UUf3uMHU0+sgfsmnY9FZqqAnS+scG6PxmuDxFaUhYZ5uPIhVJxJIpDfT/682l4LBklWc007jP11DzjiJqeqtY0+5QZZLKJrZRxdQ2gvksatsTvtSw1DUA70o39WeQ4zuADwGra4gBTNvUsKfFejxkmcWlQfub0YC6MeJXFLKU9uzc2bZULNbia0bbXDYofu+5n619jG1yvJ2XPyiEG0mthf1HxeitxZWIH/1UPDRJAye00a5Xy+jQ9iJoZxIhSppXFVAC1zL4lp8r4Qk69pz2SYKdqQCKRTCP1P/MZpp0x7sUgBaFYdlY48ArYMEQHsTMi2OHAjcgUrgM4A3odR+u0wGPFK/OMODvWO9vfX4O7YadTaaZiuFGBl1S5LO/DCAvKWZw0AIMpiAvlHEHJON3pqUexMTvSyfMLjA6W33UfCAIEpSiypExqt1UTGsfqab9m4upvQHmAkAXAcwRkMJOOOctS/pRMJqmIryQGwDqCpPHjPMEnNAmlAcOE2j4VFf2INEELtFqkS8CwsGLD3Bu0Ox6Gj3/INyMTZ31AQsgDURf/vWMD+MW7HdH9TUOWEwahvmqLEqviKeNi7oAVELrlNY6jfR5PpNuB5jXFCPa6wLT9Gim0qThYaHEK3QaH338oTSlUyYloKHsF30ws/V7QtRUE4JpNal0MCRvfLsGZ80jVbTuz1XUcihIEAiHu6YAGgTCgGT6DOdYACwYL4zJMGT5hkP+09BmA+PTkyczzALAx+MNfviaNAXKU12F2K46nsm+yMI4Da0NuRDS/txQXUKVbHaA8WMSrXBaC2SqE4IP38/vZid5iYlBlR9qofKprVS/voSYsIz59H59jMeUhA/EePtJovumo9FmgEaDi9M0MJLegf2xvQDMlFoANQXO8nZM5KfDmI8oJpbBDAuYJGCiDzNP/tOxR8nz93RKNMoH8xl0TWiHqTXVB7MRrUrQ4XeKqGZjVNbSKNq7roTaoMXFp7RTZFIbHVjWj+rWlOiJ8YFUMYhp+FcT17MZ6qzzAzBLg6XPgUWHYQ36n9NEMZCvurWlZATTIAlpbYZSOJ+E9peNbUcgnKaGN4s1oDxGtiY84Yala6y4JzQIz7VxDZONimmt1A/svA5j7KgJadNXMb1Fm8IGvEMc7iMytJOqZjXhM6bNJmsgC2C8ye9kWbv/UoZzqRNkBcE8STZYfQFYhXEOiaZj0MaqvABmgDkcmnlLWhlfBFfuF/axRtrE/jKC/aDPyYynlNEBMJ/E/R4UOt2rwu29qc69YhLZ5Lp5pxQmkWKmTuEf4D6Q2MaNxQAqoIFh7WrbG4bmJKkfJq/57QjVrS7VoDBAxcNjNGBmE1VMadUSf2B5BR1eVYrJDTh/Z43JrJjSRoPn1pG/JE0HXyynw/DV3DdcHaeiQZ26LwtIPxC0FCxJ56EANDlJ/c9upuiIGLW+G6YY2DhrYhGESGtjSocG2jrwvfg6Pm6IRci5ILR7mydJ++H5TGg5hGoExp20aWLBAHqLn1whAPn5HMCaysMKYcAMKINZJPs+Rzu3oc/jtk1/gTBvKHRRLGthGCHK/mY/7QPZCUPi/DBz7DuYLBls0gKOOWVy4GoeA2haDkDMglkbfAh6gyBZiUY/xQ4H9Hvy93D/BCVaeaGSQaF+OA/TmICG8LWBaEqbQzbLPBa9tIX/DMgm3YeBYUvA2skmk8HhT8M6yvUVkrUhpxrBS0FOl4R2KFdngKYt4MjSND9m7rEA6N2u4LQaNG5eSmI/v+kAyP4yLGAGLY5w1Uo8ewF860L4zp0qD4C60gl/dwgTVQtQeL8QpqcnkF1j2uj1N1wMuAWhYH+mfVXC7HXe9DsCosEwHRVR9vtCTMskpzxPwOtf6IUcqyMGpFEQNMukG9/rr1RwAvspMNdTLUtxfvQGgDO4DZPQnCBmtNpPsoZCM2eF/GpW2FJ3BSxaZhmKE8tLMKDdMMtdCdFjXlZi55lszr0xuUhaBZ/Pl4w4xm24LKvgP0//sCzjOKZwMi2FSz/c4fH6mZGtkiz+NrT4GsQoN/ud5LR+UDMkvjHOgCotPfCXs6GZs9ncAsxXAPJT0LIlOLVJUXei8yTfisUkXiztTDq2PyzeJfVUXgbyuBvMs9BD5IYc7x/64aTyI9J49fC10MLroJ0Tulgt/osD0Oa4AxJM67lBC82nfgRwN0FbXwSoS4v99mu4tu4kAmyIsMhzZNXADMmfHsuWFOvGIdqTnuPXArXHbGb9tg7sh79XH1jodpGUVeZl1PW0NLkSpWM4B1RoKXG6/fW4bWyQHxPYLdK4VwTlb7X5xByOkzZFNG0ivfefLtsgYRj/7EhNjj7zEUo8NBTsF+HEqg8KQPIUOudKEfYS6l6q14PQ6MSGcsHsReoOSZG21qlE6BpgjRR+OfvfJCWtdk9NsdCtiLp/capMyAVr1gjJkgyX74OO45zUeLTttXzsk1NuzIg7U8YXBhen7uFQ4oP+rbS4lHYWSoJ2jjh0XhQ0tGsdi9EtTFm4TZW0aX08p11KRx3SkqK5tqdeySWjgAAXEfAilPHrUO/DVi/ltielYJ3KSc4kXhwYsbtSmrBW9wZNZcE6hT5oDcy1mVKZZu3kxbsz6fj9ksiJsu2RCv0zUiNsLeQiW/6Uf2xFmiKIg1kTDa2ROvt1wvxaIWvFS9T9w3Zsqs4TIJkUTD4JAWONXytgrZB2zMESFxvihlOJcDWTgfWdwNK6R5w5iQ86R5jdVGnlJ9iYeUXeGwIaV95XUveCqveVUZ0M27vS/uiJscZKIniaMMCRQjAiH8B4joiAbRXmuE72j/wtKPHJuPH6lvXSHvIcd3/clQlRtadVSUxWLIQlJIzYou5CUlrIT1xIT5uQDWa3+z3M1xWmzhNhIv5XgAEAOcyGGJeOyHYAAAAASUVORK5CYII=';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in cloudWatch',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in cloudWatch Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}

	$("#elb-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {
//			    var elb_urls = ["elb_events/", "elb_events_v2/"];
//			    var urls;
//                for (urls of elb_urls) {
                    $.ajax({
                        type: 'POST',
                        url: 'elb/',
                        data: {
                            'regions': regions_jsonText,
                            "csrfmiddlewaretoken": "{{csrf_token}}"
                        },
                        cache: false,
                        async: 'asynchronous',
                        dataType: 'json',
                        success: function (data) {
                            var len = data.elb_data.length;
                            var table_data = '';
                            if (len > 0) {
                                for (var i = 0; i < len; i++) {
                                    table_data += '<tr>';
                                    table_data += '<td>' + (i + 1) + '</td>';
                                    table_data += '<td>' + data.elb_data[i].EventName + '</td>';
                                    table_data += '<td>' + data.elb_data[i].EventTime + '</td>';
                                    table_data += '<td>' + data.elb_data[i].UserName + '</td>';
                                    table_data += '<td>' + data.elb_data[i].IPAddress + '</td>';
                                    table_data += '<td>' + data.elb_data[i].Region + '</td>';

                                    if (data.elb_data[i].LoadBalancerName){
                                        table_data += '<td>' + data.elb_data[i].LoadBalancerName + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].LoadBalancerType){
                                        table_data += '<td>' + data.elb_data[i].LoadBalancerType + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].InstanceId){
                                        table_data += '<td>' + data.elb_data[i].InstanceId + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].UnhealthyThreshold){
                                        table_data += '<td>' + data.elb_data[i].UnhealthyThreshold + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthyThreshold){
                                        table_data += '<td>' + data.elb_data[i].HealthyThreshold + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
//                                    if (data.elb_data[i].Protocolport){
//                                        table_data += '<td>' + data.elb_data[i].Protocolport + '</td>';
//                                    }
//                                    else{
//                                        table_data += '<td>-</td>';
//                                    }
                                    if (data.elb_data[i].Subnets){
                                        table_data += '<td>' + data.elb_data[i].Subnets + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].ZoneName){
                                        table_data += '<td>' + data.elb_data[i].ZoneName + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].SecurityGroups){
                                        table_data += '<td>' + data.elb_data[i].SecurityGroups + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Protocol){
                                        table_data += '<td>' + data.elb_data[i].Protocol + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Port){
                                        table_data += '<td>' + data.elb_data[i].Port + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].LoadBalancerPort){
                                        table_data += '<td>' + data.elb_data[i].LoadBalancerPort + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].InstanceProtocol){
                                        table_data += '<td>' + data.elb_data[i].InstanceProtocol + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].InstancePort){
                                        table_data += '<td>' + data.elb_data[i].InstancePort + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Scheme){
                                        table_data += '<td>' + data.elb_data[i].Scheme + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].CrossZoneLoadBalancingEnabled){
                                        table_data += '<td>' + data.elb_data[i].CrossZoneLoadBalancingEnabled + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].ConnectionDrainingEnabled){
                                        table_data += '<td>' + data.elb_data[i].ConnectionDrainingEnabled + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].ConnectionDrainingTimeout){
                                        table_data += '<td>' + data.elb_data[i].ConnectionDrainingTimeout + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].TargetGroupName){
                                        table_data += '<td>' + data.elb_data[i].TargetGroupName + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Type){
                                        table_data += '<td>' + data.elb_data[i].Type + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].TargetType){
                                        table_data += '<td>' + data.elb_data[i].TargetType + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Target){
                                        table_data += '<td>' + data.elb_data[i].Target + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Interval){
                                        table_data += '<td>' + data.elb_data[i].Interval + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].Timeout){
                                        table_data += '<td>' + data.elb_data[i].Timeout + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].DNSName){
                                        table_data += '<td>' + data.elb_data[i].DNSName + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].SSLCertificateId){
                                        table_data += '<td>' + data.elb_data[i].SSLCertificateId + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].vpcId){
                                        table_data += '<td>' + data.elb_data[i].vpcId + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].IpAddressType){
                                        table_data += '<td>' + data.elb_data[i].IpAddressType + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthCheckEnabled){
                                        table_data += '<td>' + data.elb_data[i].HealthCheckEnabled + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HttpCode){
                                        table_data += '<td>' + data.elb_data[i].HttpCode + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthCheckPort){
                                        table_data += '<td>' + data.elb_data[i].HealthCheckPort + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthyThresholdCount){
                                        table_data += '<td>' + data.elb_data[i].HealthyThresholdCount + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthCheckProtocol){
                                        table_data += '<td>' + data.elb_data[i].HealthCheckProtocol + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthCheckIntervalSeconds){
                                        table_data += '<td>' + data.elb_data[i].HealthCheckIntervalSeconds + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthCheckTimeoutSeconds){
                                        table_data += '<td>' + data.elb_data[i].HealthCheckTimeoutSeconds + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].HealthCheckPath){
                                        table_data += '<td>' + data.elb_data[i].HealthCheckPath + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }
                                    if (data.elb_data[i].UnhealthyThresholdCount){
                                        table_data += '<td>' + data.elb_data[i].UnhealthyThresholdCount + '</td>';
                                    }
                                    else{
                                        table_data += '<td>-</td>';
                                    }

                                    table_data += '</tr>';
                                }
                            }
                            $('#elb-events-table').DataTable().destroy();
                            $('#elb-events-data').empty();
                            $('#elb-events-data').append(table_data);
                            ELBEventsDataDocumentGenerate();

                        },
                        error: function (request, status, error) {
                            console.log("Error: " + error);
                        }
                    });
//                }
            }
		}
		value++;
	});

	function ELBEventsDataDocumentGenerate(){
	    $('#elb-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in ELB',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in ELB',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_ELB',
					orientation: 'landscape',
					pageSize: 'A2',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXVlT5V9dZ+/XqjoZt9FZBdjLghLgjGRHGLUUNiNIlJZsbolzjZJ5PMzBcnySTRyTJxSWISNSYuQQUDooDihqwisggCAt2svW+v31Z3/nPrVHf16/dePxANzKT4Lq9e1a2qW/c/y3/Ouf2Mmx98m/raFJohn+5mZDmfczM8HfPcM9/lKsutPPvDsX8Bds9Am4w2FK0MzYfWgXYE7R30W4d+q7C/Ai2db/wq58iMXuPp8/1zzGe+l1UF3stHJ/d2NdoX8M5zMufEM8FRfFShTcL+lXJ4H9pjaPeg7TiZJ8A8GQcNcOYBjPXYfQJtrhc8lcVCZNlYQ7+Cth3tV2iVfwfwg9mK0B4COE/h87QMq9zLNBlZTFeW7YuGA+Qn/w7g+7tNQ9sMEOZTDpCMHP4mmy/NOFeO9iDaf/8dwPdnO59NJtoIL4lReUhCX2Qhx7nbyNHuk2Y7GUjMDLQX+mLFsq3BsVdx7i3sH0CLi3aNRPsQ2jk4N7gPdjgPH89g76OFc8H/GwBGhboHhKI3ozUWenEOTRmC9lKuvvLZjGn+BfYfwv62PsIgPz4BDN2Cz4/k0ciPYP/XiozPvcc5CaL1QwvLI9rQ6tDsEwHAUWgXoc00HEIxHK2E50Emox0ftdjfhP1XJPZ6g/owexlALROByDXRD6B9zXAmpZAtifYkN9znMlz3c+yPyCFAn8Wxl9Dv90cxJyXCimdKTDoGrcIzz2wRjuC+W8mJR1eiPf9eADSOIZD/KPb/CZ+XHlWA6px/Hefv5YnvKzmA7YcMTp7xfAIfj+Qbg8oItFXvnEIQ3/9E3fFhtmdxDHk4V05C7jvFcPzn1dgvNwoIaTxj2UWO9fgftENHG8gXTGJww3Nx7xfRFqljAE+2M9F+i8ZSc0PvBIT7T2vz13JpKfrOVFnAO4YtjvtchfbrPKb9oW7K1Gtaq8UKbGSNFX/bAzijb5fBluxf0Xaifff9YqH/hQe+jM9ZeSb1aLax6P9HyYaUZTl/r8qdZZpNjkk+bhvue4uXfWY8e45DgHq94Y0SP95kFKBtfcSivEVw7nvo8KYQt+MCYKnY6X8+mtirj4F6+3xMGON09274NwHHLsnBMu/A8eXHIDCFkKcrJcXW694Y008NcrOgervbcHxjNFuMaeT363nHopxc7uton3uvALJ52IB2nnEUoOQzp0aGIZI+TOvXkTbR2nx+NcezVqP9NO9zlSLTZ1EgUkRBNMM09bFck5VljFdTljgTn+ehReX742i3F8KkjQIyQir3Pe5H+2afLDRH1r0Y0saTOqgAoF7Fx3LlgF2L7zHDYY4D0KYoJwi/yGWT2aoJ8gkTbXwV+zfmmJCb8gGnB92vnFLJFLUeOkLKtqlsyCAyLZPa6hudPobRl4VYix4L8HlVFitzt6TyrsknqHJsm8zJKuzvxn4L9i1yCM44w2GpF+LYQCPPvfD9ThzvxO5dObX2piwsFBduwIXT8tw8rZy0028NJ72VN/9oOILwSex/2XA0O9t2BOcfFq33TLUOSxBPqm4fZSvyhQIUihbrngaaz++nA5vfpjefXkqNNft1vwFjRtL4i2dR9YSxpNJpSgPcZDxByc5ORr3nUzxuo6tqYTjd5DU4HPg4Dp2dbU5kDv5iOGxymcrDWt0YUTnCwOz1TCO/9boaBxcUCuA9uMEX8ijeYjzkS8Ka+goFMkOQCPZ/hM9/9Jxbis/fYPfRXObInUPWIsM0KNq/kmLNLXRo204cszWQdbv2ArxnKdEeo3BZib4i1tRM/nBIgzj0tMlkp1IUqayg6ID+uL6ZUgCTzWxOU9gNoPfcWPFP810LpZxQ4B/QluYCTOWfH772Z5lxueo5lmodZvQB4AW4YEUe0/BdfP5718WYTFYPWzmT6wsEKBAKak+W7OikNCZMa0jvF/iMMC2W1jf7cvbaHwEoy+ejYgCwe/UG2rzwOWrYV6sBMNFSiSQFi4sAWFibT2d8JrQtTp0trRQoCut+fozvlAtn0qTL51CirR2Ad/TSxD4A9GZZWNAnod2Kbol8gPUBoGbm2F/MYUUOJrtawrC8gfwBymHiFEuJre5hkhCChFswWWlIsIXvDKBpWhRraaHWg4cxHyaVDx1EVsBPrXUNzgBlkvqi2dkA5PtbfotKBlbRlmeW0Sv3P6zvzdrkmlQtTEZujsfax89JArAOaO/ky+bQWTdd7xAdAB4HmNz4e4EA5g2nen0XKTbyJx6ihsNAT1XZme21yiFRWVNpt2SC57n5t+BD7gmXlpAvGKCaN7fQ4e27qKOhEd+DNGTaRD15by1eTs21BzTdrhw5jCbNmwv/M44SrW2U6GSNTPeekUwWaVkAy6f7pZNJ+C5ba3a0upI2L3qOVj3wZyoqL4W2Rch2Nc3qO6gwfc6r+stKwVIjtH3FKzCjrTC3pVo7T5l1NpVUD6DWw3X6XVhA2JKk4kk9JhbcNLQc0pQTRX6GBUFiIsU+18B1RRB2Hr8eK4Qj0cqC0qaFPMt9WpWTcN+FVp5Fa39lZADo1UBOF/XPIllLlJ2+lCeNzdTrf3ic9q7ZoP0HD5gHxpRdTzikPIjJ4f2OxiY9MRM/ejGNPncGJiRA4dKofrH2hiYt9TwxoZIoWWx2BQyeJPZvPtybzxlgkf6iEG1csJhW/+5RaD8mHKYSDz6mWoFrDZSMkd+Dn81+cfrH59Gpl1xAnXh+B8ZoQpCKyssoEYvB3HZo38ouggUxDiBYwGy8DwsxW6U4BDUdjwO0MjIhAKlEgvZv2gpf/Y4mTzyHw0+fotkxm29fKKQFJY1+PBYbwsqWRCcOFK3JoUyfxv4fMn0gL1F4KgviKfieUviVDiYKy+++j3a88BpVDB+sWZ8tTI7NU5eUM9EQ/5PoiOmXYtMXjEaotLqKRp49nQZCK/nF+drDO3ZpAsJaxxqwd+1Gqtu5R0v8sNMnQ7sn065X19CWxcsgEEU6xmOhKXRBVK5YtMcxTFp7XaMe8+nXX6HB279pG/xpkAZOHEetR+qp4d19VD1ujDbbPoA4aNJ4TZ7YInXiHXe9tpZq33iLkrE4VY0fQ4Mmn0q1sFRvL3sZ89DRZapLMRfTrrpUW6aDW3dQw94azOcQGnXuGZo3sL9mzcU4f0LOso9MheIQ5dQeABpOhv6K3tVr9Q2Ykx+WDqqmNQ//hdY/tpDKIT18Mt8EdsV3IunJWCclIWUsxfzCp193BY2bPZM2PvUsbX3uRUrhPBMUPseS6mOpZIBBXJiUJJlZwnxrsyaadzwBdAkPa0xnU4seN2sQm8sUNIoFk7XRxvkUtI/9fsWwIVRUUUYBjK/tSB0dfHunjjmZG2jrxG4A1wcZZG2OnWczQOyzI/0rcF29FnAT14y74Bya8amP6X7Mng2TjTG1MHPPAiITp80ugMVcjlFOZt67tdl2urRs8EB796p1tPyu+7UJAIubDlAuR98S5eQCOaXU6fGp8w2nHviwd66UywqhlelUUpum1sP12syyRGuTyJrlSF8X87QxYaztGS9wFvpMUE6JanfG+3H1gGt+B9H+WiiA3UGnY1VU7sqD/i8JrWKhVDw+jD8oMWlX4Mjvwt8ziJWJ7+xq2B2xwLJwsAltQuw6euZZdP6XbqYUmHMCQg0u8R3ysH7PmP4V+//hAsh1sYW9GZW6G/7sy0nY/2f/8+fwW40U6VfxdQzsBxnv/C6nwdD2S26wRY5b2QqX/AIpAMhSytql4zAxu73jxu6py5j4JyTtxTT+voxHXIK2RLJCQygXCH1Yj7wA5i5PFZx77dFfA29T/e4aOuMTV9EZ86+mxhomg3q13JEst3lFao7EavqhHA95NFhSDBO3UttpgHehB7w/Sl6yVQqii+V4zPWdOWM6YZqseYZh5GWlebYm10pkOedag9qcRaATbdNab8I/DqC3nnmeajZuBqmqZF/PhepXs1xxBq4oVpLMnpzFxtq+QHBVGyg1p6fY/+BuP5PT/yJZiDs8106RdJkLXDrLQzkFdQFaKEsVe4AnpLGEDZdn9OPq9vmyvzOP4LvH7CyRpjuG8FGOwS/nSY6fK3nRCk9FYpzcO9s2nnOf2Vi+bOcAxPP9EGo2rxseW6RjbM4iQeCXZkl+c155rFuNGJNFIp4JRSOKk8BtdeynioaK42Tp/r6n4x7OcXL5RzlrYEJZBsfF2TdEkjjLU4PPyz3n2VfuVd2WYIRyyjorPDWD25SzgvoFMdlnHoV4u2PghcCvit+szTYGkjEox6rsU5KVImd5xF4pIvM7v6ycMSzgDIlyVg9sc8asl0t44+kfy7HlEqp9xnOOgXhRTOILsHA7olX9R9ci9Ni27CWw9gGMxVIje4VjqCEATpFjvKLrTilgXu0L+mn/xi0IOjuY0k+TPhuyzBC//FJy1sBY3uSHfK7EfaeSswaEfW0/PP5peLVBAk+lpKUCHiIUdCXecCbfXa/5K/EJ8wpnnfopXNM8zTMG1qynPdUWPQYj9xgC8v160UaO0XitT4VoF6/LuU/A5e9fkvvME0tVT876GxaO3yhnZThvHM/NMhwXxEtNxmB/SaRfGW16+llYv+1U3L/yNQA7Btd8XkpZh+Q+Z3KigQHk9S0TJTf5bSD+fLi8NHUEsRhnK3TGv9tMNPSRWFIZZ7l6Pkxe+Gx5oV9Ix6/IZ0tXzNnT/DYLUXDLSz+TJDhrw/ZCC6XKeeYwqSeebTgx712eAjG5xEtlGUOGT28QszlDmHuxPPsyIVS3Sr/RHndDspTxNo+yXCfPvY5ZtHJWyH0R7ZcwmWMw59M5Lbn2Tws0E/cFgzulPnitWJPrOWfNwmlKQnmLF4EgbPE7K1dRe32Dk2XBC8kDQ31U382MQ7PlOu+K55+4bFE6xXNU+l0NnkTdhVS3z7Me35RzOKLhF3q01yU17njm5htDFtbKSxxbPceick/X1DZmECkvkHdKupK301X3+lQWju/J+fHadKXtuSVVA0BmttA7L62iKPaVLdOrfBir8Wd8eU5MBQfbnEGxMBAf/F0FHd5+kPat36gDVck37pYBTs4yYRyn8FK5P6jugbsz6ZKFRs/kdKju5Rp6vN6FWC4v9SzMCnpNsurJdtvEHPK4tuHaw6pbW0zp7wpdq2doccoYQwb4ylOL7JGrzKH4fnkH1wTHvblrJZoo9+UlJLtEk0isw3flZqzV7C/bOLwKl0Zo4xPPUb/qqVQ2fDglWlvIBpKpFIdfMbB4xJJ2qhJf2tDiaE2gr0do+/KXaf+WTqoeF8WxNNDX1fl28QkXUfe6lAAe+B15i6c8Jsd9sb3yyeTgrzIZp8gxdxFuSPUENpYxqQflc6Bn4lzJ3ipm5V4hBw94rIB7vwMeTX7CQ6x6jMG9RgYfU1nCIS+zzVj95wJtZAid2y/kEZpymafpLvfwLFsJCY9IsH/zByqoo76JDiV+QGa0itqSrVQSakb8MA3c5Hwol4980QE/JstfCzQR+Vvt5A820bSrkhRvH0sbnwySL5CmkupEWqu4ou8rZ8kBT1aDsC83P7c3g8SQ5Fc5Xvw66eXqmoD8Qk7/3jWV8vJzZELv9E6mZFPYv3yDBcdwSi3usgY27W+Lxt4qi5JcP7RJhB5kxfg3ctbaLMocg0ywC8wc1XMMbRnvY+SIKzMtb0T6sJn7ODlLDtlV8eKwr8l8uAuGOSQZpJxECBOsqYapZqU6rW3tewI0+pOKSmeupvojCUpafioCHtHo6xQuWQQAQ2R89eWJsFl+tq3alNopdCo3KVRi07bnKuj1hwbS3g1RqHOKiisTK5UyzvO+gbuSileXqZ6ZGFPe9f4sK6y45nWWp4x1XxbTHJNYi8TkjPT6R+UkIa6FpMI3Goks/pDjpB0ys/erjDFI3e0sVdgYeLX1s4azzmW2xwcqT2xYJ6HJ06JVM8RSvJPlvjOkD5OyX/bMyaq9nXWBCakOs33UdYdo1PwDlGqzKNVp6nUs/YtsqkZTZgfwSpN11qemwkQW4Qu0VwWgiT5KxixKdFg09LRWGntRA2sgNe4L0eEdkQcsn0r5QyqCoTcLmeB1kVJV57KlMVLCjaflBReKNlWJD2FAP+GxQIjPDJ9QeU7Qcp7VL6zRzfD8SSaDTcy3yFmWwfsrHepuLKTuRAIvJLoZbaNHLRaKNlXLGHgJxw1GNwDrJXToGgP1HINP2OdiWfjkbrwoics5C/CZRPMZjolcIkLKvn+ZjC3qLNzScfNqm72kSWvg6tgiDOeijh03H+yoDV1RNDDRMeH2fTTsysOUbAF47T5O1LDUjrQMurEkqFKk/AeUCpJxxwsXBwKmSqVsw05n2Ab4PgpE0lQ6ME5NtUFa92gVbVrUn5oPBghAgt7aYEx4ctIkC6oNDUXM6FxXWDUg+0KDQioNRp6KvtFHxVwdxXP6rGI4VRvvmtH890S3VIuPrFCKku0W2TFYPhhmO22SvzhF1bMaadQNBylcFaeO/SFYRBoA8Dg5fxXwuZxr16PLUhQw6XJ8X+RLpI3i5rh5fUnAnh20VBv/MQrAPAi0G6DOjcmYWXdkR1FDuCzZcuFt+5LjL26gna+UUf3uMHU0+sgfsmnY9FZqqAnS+scG6PxmuDxFaUhYZ5uPIhVJxJIpDfT/682l4LBklWc007jP11DzjiJqeqtY0+5QZZLKJrZRxdQ2gvksatsTvtSw1DUA70o39WeQ4zuADwGra4gBTNvUsKfFejxkmcWlQfub0YC6MeJXFLKU9uzc2bZULNbia0bbXDYofu+5n619jG1yvJ2XPyiEG0mthf1HxeitxZWIH/1UPDRJAye00a5Xy+jQ9iJoZxIhSppXFVAC1zL4lp8r4Qk69pz2SYKdqQCKRTCP1P/MZpp0x7sUgBaFYdlY48ArYMEQHsTMi2OHAjcgUrgM4A3odR+u0wGPFK/OMODvWO9vfX4O7YadTaaZiuFGBl1S5LO/DCAvKWZw0AIMpiAvlHEHJON3pqUexMTvSyfMLjA6W33UfCAIEpSiypExqt1UTGsfqab9m4upvQHmAkAXAcwRkMJOOOctS/pRMJqmIryQGwDqCpPHjPMEnNAmlAcOE2j4VFf2INEELtFqkS8CwsGLD3Bu0Ox6Gj3/INyMTZ31AQsgDURf/vWMD+MW7HdH9TUOWEwahvmqLEqviKeNi7oAVELrlNY6jfR5PpNuB5jXFCPa6wLT9Gim0qThYaHEK3QaH338oTSlUyYloKHsF30ws/V7QtRUE4JpNal0MCRvfLsGZ80jVbTuz1XUcihIEAiHu6YAGgTCgGT6DOdYACwYL4zJMGT5hkP+09BmA+PTkyczzALAx+MNfviaNAXKU12F2K46nsm+yMI4Da0NuRDS/txQXUKVbHaA8WMSrXBaC2SqE4IP38/vZid5iYlBlR9qofKprVS/voSYsIz59H59jMeUhA/EePtJovumo9FmgEaDi9M0MJLegf2xvQDMlFoANQXO8nZM5KfDmI8oJpbBDAuYJGCiDzNP/tOxR8nz93RKNMoH8xl0TWiHqTXVB7MRrUrQ4XeKqGZjVNbSKNq7roTaoMXFp7RTZFIbHVjWj+rWlOiJ8YFUMYhp+FcT17MZ6qzzAzBLg6XPgUWHYQ36n9NEMZCvurWlZATTIAlpbYZSOJ+E9peNbUcgnKaGN4s1oDxGtiY84Yala6y4JzQIz7VxDZONimmt1A/svA5j7KgJadNXMb1Fm8IGvEMc7iMytJOqZjXhM6bNJmsgC2C8ye9kWbv/UoZzqRNkBcE8STZYfQFYhXEOiaZj0MaqvABmgDkcmnlLWhlfBFfuF/axRtrE/jKC/aDPyYynlNEBMJ/E/R4UOt2rwu29qc69YhLZ5Lp5pxQmkWKmTuEf4D6Q2MaNxQAqoIFh7WrbG4bmJKkfJq/57QjVrS7VoDBAxcNjNGBmE1VMadUSf2B5BR1eVYrJDTh/Z43JrJjSRoPn1pG/JE0HXyynw/DV3DdcHaeiQZ26LwtIPxC0FCxJ56EANDlJ/c9upuiIGLW+G6YY2DhrYhGESGtjSocG2jrwvfg6Pm6IRci5ILR7mydJ++H5TGg5hGoExp20aWLBAHqLn1whAPn5HMCaysMKYcAMKINZJPs+Rzu3oc/jtk1/gTBvKHRRLGthGCHK/mY/7QPZCUPi/DBz7DuYLBls0gKOOWVy4GoeA2haDkDMglkbfAh6gyBZiUY/xQ4H9Hvy93D/BCVaeaGSQaF+OA/TmICG8LWBaEqbQzbLPBa9tIX/DMgm3YeBYUvA2skmk8HhT8M6yvUVkrUhpxrBS0FOl4R2KFdngKYt4MjSND9m7rEA6N2u4LQaNG5eSmI/v+kAyP4yLGAGLY5w1Uo8ewF860L4zp0qD4C60gl/dwgTVQtQeL8QpqcnkF1j2uj1N1wMuAWhYH+mfVXC7HXe9DsCosEwHRVR9vtCTMskpzxPwOtf6IUcqyMGpFEQNMukG9/rr1RwAvspMNdTLUtxfvQGgDO4DZPQnCBmtNpPsoZCM2eF/GpW2FJ3BSxaZhmKE8tLMKDdMMtdCdFjXlZi55lszr0xuUhaBZ/Pl4w4xm24LKvgP0//sCzjOKZwMi2FSz/c4fH6mZGtkiz+NrT4GsQoN/ud5LR+UDMkvjHOgCotPfCXs6GZs9ncAsxXAPJT0LIlOLVJUXei8yTfisUkXiztTDq2PyzeJfVUXgbyuBvMs9BD5IYc7x/64aTyI9J49fC10MLroJ0Tulgt/osD0Oa4AxJM67lBC82nfgRwN0FbXwSoS4v99mu4tu4kAmyIsMhzZNXADMmfHsuWFOvGIdqTnuPXArXHbGb9tg7sh79XH1jodpGUVeZl1PW0NLkSpWM4B1RoKXG6/fW4bWyQHxPYLdK4VwTlb7X5xByOkzZFNG0ivfefLtsgYRj/7EhNjj7zEUo8NBTsF+HEqg8KQPIUOudKEfYS6l6q14PQ6MSGcsHsReoOSZG21qlE6BpgjRR+OfvfJCWtdk9NsdCtiLp/capMyAVr1gjJkgyX74OO45zUeLTttXzsk1NuzIg7U8YXBhen7uFQ4oP+rbS4lHYWSoJ2jjh0XhQ0tGsdi9EtTFm4TZW0aX08p11KRx3SkqK5tqdeySWjgAAXEfAilPHrUO/DVi/ltielYJ3KSc4kXhwYsbtSmrBW9wZNZcE6hT5oDcy1mVKZZu3kxbsz6fj9ksiJsu2RCv0zUiNsLeQiW/6Uf2xFmiKIg1kTDa2ROvt1wvxaIWvFS9T9w3Zsqs4TIJkUTD4JAWONXytgrZB2zMESFxvihlOJcDWTgfWdwNK6R5w5iQ86R5jdVGnlJ9iYeUXeGwIaV95XUveCqveVUZ0M27vS/uiJscZKIniaMMCRQjAiH8B4joiAbRXmuE72j/wtKPHJuPH6lvXSHvIcd3/clQlRtadVSUxWLIQlJIzYou5CUlrIT1xIT5uQDWa3+z3M1xWmzhNhIv5XgAEAOcyGGJeOyHYAAAAASUVORK5CYII=';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in ELB',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in ELB Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}

	$("#route53-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "route53_events/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.route53_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.route53_data[i].EventName + '</td>';
                                table_data += '<td>' + data.route53_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.route53_data[i].UserName + '</td>';
                                table_data += '<td>' + data.route53_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.route53_data[i].Region + '</td>';
                                if (data.route53_data[i].CallerReference){
                                    table_data += '<td>' + data.route53_data[i].CallerReference + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].HostedZoneName){
                                    table_data += '<td>' + data.route53_data[i].HostedZoneName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ChangeInfo_Status){
                                    table_data += '<td>' + data.route53_data[i].ChangeInfo_Status + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ChangeInfo_Id){
                                    table_data += '<td>' + data.route53_data[i].ChangeInfo_Id + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ChangeInfo_SubmittedAt){
                                    table_data += '<td>' + data.route53_data[i].ChangeInfo_SubmittedAt + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].Location){
                                    table_data += '<td>' + data.route53_data[i].Location + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ResourceRecordSetCount){
                                    table_data += '<td>' + data.route53_data[i].ResourceRecordSetCount + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].HostedZone_Id){
                                    table_data += '<td>' + data.route53_data[i].HostedZone_Id + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].NameServers){
                                    table_data += '<td>' + data.route53_data[i].NameServers + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].Action){
                                    table_data += '<td>' + data.route53_data[i].Action + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ResourceRecordSetType){
                                    table_data += '<td>' + data.route53_data[i].ResourceRecordSetType + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ResourceRecordSetTTL){
                                    table_data += '<td>' + data.route53_data[i].ResourceRecordSetTTL + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ResourceRecordsValue){
                                    table_data += '<td>' + data.route53_data[i].ResourceRecordsValue + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_data[i].ResourceRecordSetName){
                                    table_data += '<td>' + data.route53_data[i].ResourceRecordSetName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                table_data += '</tr>';
                            }
                        }
                        $('#route53-events-table').DataTable().destroy();
                        $('#route53-events-data').empty();
                        $('#route53-events-data').append(table_data);
                        Route53EventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function Route53EventsDataDocumentGenerate(){
	    $('#route53-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in Route53',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in Route53',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_Route53',
					orientation: 'landscape',
					pageSize: 'A2',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXVlT5V9dZ+/XqjoZt9FZBdjLghLgjGRHGLUUNiNIlJZsbolzjZJ5PMzBcnySTRyTJxSWISNSYuQQUDooDihqwisggCAt2svW+v31Z3/nPrVHf16/dePxANzKT4Lq9e1a2qW/c/y3/Ouf2Mmx98m/raFJohn+5mZDmfczM8HfPcM9/lKsutPPvDsX8Bds9Am4w2FK0MzYfWgXYE7R30W4d+q7C/Ai2db/wq58iMXuPp8/1zzGe+l1UF3stHJ/d2NdoX8M5zMufEM8FRfFShTcL+lXJ4H9pjaPeg7TiZJ8A8GQcNcOYBjPXYfQJtrhc8lcVCZNlYQ7+Cth3tV2iVfwfwg9mK0B4COE/h87QMq9zLNBlZTFeW7YuGA+Qn/w7g+7tNQ9sMEOZTDpCMHP4mmy/NOFeO9iDaf/8dwPdnO59NJtoIL4lReUhCX2Qhx7nbyNHuk2Y7GUjMDLQX+mLFsq3BsVdx7i3sH0CLi3aNRPsQ2jk4N7gPdjgPH89g76OFc8H/GwBGhboHhKI3ozUWenEOTRmC9lKuvvLZjGn+BfYfwv62PsIgPz4BDN2Cz4/k0ciPYP/XiozPvcc5CaL1QwvLI9rQ6tDsEwHAUWgXoc00HEIxHK2E50Emox0ftdjfhP1XJPZ6g/owexlALROByDXRD6B9zXAmpZAtifYkN9znMlz3c+yPyCFAn8Wxl9Dv90cxJyXCimdKTDoGrcIzz2wRjuC+W8mJR1eiPf9eADSOIZD/KPb/CZ+XHlWA6px/Hefv5YnvKzmA7YcMTp7xfAIfj+Qbg8oItFXvnEIQ3/9E3fFhtmdxDHk4V05C7jvFcPzn1dgvNwoIaTxj2UWO9fgftENHG8gXTGJww3Nx7xfRFqljAE+2M9F+i8ZSc0PvBIT7T2vz13JpKfrOVFnAO4YtjvtchfbrPKb9oW7K1Gtaq8UKbGSNFX/bAzijb5fBluxf0Xaifff9YqH/hQe+jM9ZeSb1aLax6P9HyYaUZTl/r8qdZZpNjkk+bhvue4uXfWY8e45DgHq94Y0SP95kFKBtfcSivEVw7nvo8KYQt+MCYKnY6X8+mtirj4F6+3xMGON09274NwHHLsnBMu/A8eXHIDCFkKcrJcXW694Y008NcrOgervbcHxjNFuMaeT363nHopxc7uton3uvALJ52IB2nnEUoOQzp0aGIZI+TOvXkTbR2nx+NcezVqP9NO9zlSLTZ1EgUkRBNMM09bFck5VljFdTljgTn+ehReX742i3F8KkjQIyQir3Pe5H+2afLDRH1r0Y0saTOqgAoF7Fx3LlgF2L7zHDYY4D0KYoJwi/yGWT2aoJ8gkTbXwV+zfmmJCb8gGnB92vnFLJFLUeOkLKtqlsyCAyLZPa6hudPobRl4VYix4L8HlVFitzt6TyrsknqHJsm8zJKuzvxn4L9i1yCM44w2GpF+LYQCPPvfD9ThzvxO5dObX2piwsFBduwIXT8tw8rZy0028NJ72VN/9oOILwSex/2XA0O9t2BOcfFq33TLUOSxBPqm4fZSvyhQIUihbrngaaz++nA5vfpjefXkqNNft1vwFjRtL4i2dR9YSxpNJpSgPcZDxByc5ORr3nUzxuo6tqYTjd5DU4HPg4Dp2dbU5kDv5iOGxymcrDWt0YUTnCwOz1TCO/9boaBxcUCuA9uMEX8ijeYjzkS8Ka+goFMkOQCPZ/hM9/9Jxbis/fYPfRXObInUPWIsM0KNq/kmLNLXRo204cszWQdbv2ArxnKdEeo3BZib4i1tRM/nBIgzj0tMlkp1IUqayg6ID+uL6ZUgCTzWxOU9gNoPfcWPFP810LpZxQ4B/QluYCTOWfH772Z5lxueo5lmodZvQB4AW4YEUe0/BdfP5718WYTFYPWzmT6wsEKBAKak+W7OikNCZMa0jvF/iMMC2W1jf7cvbaHwEoy+ejYgCwe/UG2rzwOWrYV6sBMNFSiSQFi4sAWFibT2d8JrQtTp0trRQoCut+fozvlAtn0qTL51CirR2Ad/TSxD4A9GZZWNAnod2Kbol8gPUBoGbm2F/MYUUOJrtawrC8gfwBymHiFEuJre5hkhCChFswWWlIsIXvDKBpWhRraaHWg4cxHyaVDx1EVsBPrXUNzgBlkvqi2dkA5PtbfotKBlbRlmeW0Sv3P6zvzdrkmlQtTEZujsfax89JArAOaO/ky+bQWTdd7xAdAB4HmNz4e4EA5g2nen0XKTbyJx6ihsNAT1XZme21yiFRWVNpt2SC57n5t+BD7gmXlpAvGKCaN7fQ4e27qKOhEd+DNGTaRD15by1eTs21BzTdrhw5jCbNmwv/M44SrW2U6GSNTPeekUwWaVkAy6f7pZNJ+C5ba3a0upI2L3qOVj3wZyoqL4W2Rch2Nc3qO6gwfc6r+stKwVIjtH3FKzCjrTC3pVo7T5l1NpVUD6DWw3X6XVhA2JKk4kk9JhbcNLQc0pQTRX6GBUFiIsU+18B1RRB2Hr8eK4Qj0cqC0qaFPMt9WpWTcN+FVp5Fa39lZADo1UBOF/XPIllLlJ2+lCeNzdTrf3ic9q7ZoP0HD5gHxpRdTzikPIjJ4f2OxiY9MRM/ejGNPncGJiRA4dKofrH2hiYt9TwxoZIoWWx2BQyeJPZvPtybzxlgkf6iEG1csJhW/+5RaD8mHKYSDz6mWoFrDZSMkd+Dn81+cfrH59Gpl1xAnXh+B8ZoQpCKyssoEYvB3HZo38ouggUxDiBYwGy8DwsxW6U4BDUdjwO0MjIhAKlEgvZv2gpf/Y4mTzyHw0+fotkxm29fKKQFJY1+PBYbwsqWRCcOFK3JoUyfxv4fMn0gL1F4KgviKfieUviVDiYKy+++j3a88BpVDB+sWZ8tTI7NU5eUM9EQ/5PoiOmXYtMXjEaotLqKRp49nQZCK/nF+drDO3ZpAsJaxxqwd+1Gqtu5R0v8sNMnQ7sn065X19CWxcsgEEU6xmOhKXRBVK5YtMcxTFp7XaMe8+nXX6HB279pG/xpkAZOHEetR+qp4d19VD1ujDbbPoA4aNJ4TZ7YInXiHXe9tpZq33iLkrE4VY0fQ4Mmn0q1sFRvL3sZ89DRZapLMRfTrrpUW6aDW3dQw94azOcQGnXuGZo3sL9mzcU4f0LOso9MheIQ5dQeABpOhv6K3tVr9Q2Ykx+WDqqmNQ//hdY/tpDKIT18Mt8EdsV3IunJWCclIWUsxfzCp193BY2bPZM2PvUsbX3uRUrhPBMUPseS6mOpZIBBXJiUJJlZwnxrsyaadzwBdAkPa0xnU4seN2sQm8sUNIoFk7XRxvkUtI/9fsWwIVRUUUYBjK/tSB0dfHunjjmZG2jrxG4A1wcZZG2OnWczQOyzI/0rcF29FnAT14y74Bya8amP6X7Mng2TjTG1MHPPAiITp80ugMVcjlFOZt67tdl2urRs8EB796p1tPyu+7UJAIubDlAuR98S5eQCOaXU6fGp8w2nHviwd66UywqhlelUUpum1sP12syyRGuTyJrlSF8X87QxYaztGS9wFvpMUE6JanfG+3H1gGt+B9H+WiiA3UGnY1VU7sqD/i8JrWKhVDw+jD8oMWlX4Mjvwt8ziJWJ7+xq2B2xwLJwsAltQuw6euZZdP6XbqYUmHMCQg0u8R3ysH7PmP4V+//hAsh1sYW9GZW6G/7sy0nY/2f/8+fwW40U6VfxdQzsBxnv/C6nwdD2S26wRY5b2QqX/AIpAMhSytql4zAxu73jxu6py5j4JyTtxTT+voxHXIK2RLJCQygXCH1Yj7wA5i5PFZx77dFfA29T/e4aOuMTV9EZ86+mxhomg3q13JEst3lFao7EavqhHA95NFhSDBO3UttpgHehB7w/Sl6yVQqii+V4zPWdOWM6YZqseYZh5GWlebYm10pkOedag9qcRaATbdNab8I/DqC3nnmeajZuBqmqZF/PhepXs1xxBq4oVpLMnpzFxtq+QHBVGyg1p6fY/+BuP5PT/yJZiDs8106RdJkLXDrLQzkFdQFaKEsVe4AnpLGEDZdn9OPq9vmyvzOP4LvH7CyRpjuG8FGOwS/nSY6fK3nRCk9FYpzcO9s2nnOf2Vi+bOcAxPP9EGo2rxseW6RjbM4iQeCXZkl+c155rFuNGJNFIp4JRSOKk8BtdeynioaK42Tp/r6n4x7OcXL5RzlrYEJZBsfF2TdEkjjLU4PPyz3n2VfuVd2WYIRyyjorPDWD25SzgvoFMdlnHoV4u2PghcCvit+szTYGkjEox6rsU5KVImd5xF4pIvM7v6ycMSzgDIlyVg9sc8asl0t44+kfy7HlEqp9xnOOgXhRTOILsHA7olX9R9ci9Ni27CWw9gGMxVIje4VjqCEATpFjvKLrTilgXu0L+mn/xi0IOjuY0k+TPhuyzBC//FJy1sBY3uSHfK7EfaeSswaEfW0/PP5peLVBAk+lpKUCHiIUdCXecCbfXa/5K/EJ8wpnnfopXNM8zTMG1qynPdUWPQYj9xgC8v160UaO0XitT4VoF6/LuU/A5e9fkvvME0tVT876GxaO3yhnZThvHM/NMhwXxEtNxmB/SaRfGW16+llYv+1U3L/yNQA7Btd8XkpZh+Q+Z3KigQHk9S0TJTf5bSD+fLi8NHUEsRhnK3TGv9tMNPSRWFIZZ7l6Pkxe+Gx5oV9Ix6/IZ0tXzNnT/DYLUXDLSz+TJDhrw/ZCC6XKeeYwqSeebTgx712eAjG5xEtlGUOGT28QszlDmHuxPPsyIVS3Sr/RHndDspTxNo+yXCfPvY5ZtHJWyH0R7ZcwmWMw59M5Lbn2Tws0E/cFgzulPnitWJPrOWfNwmlKQnmLF4EgbPE7K1dRe32Dk2XBC8kDQ31U382MQ7PlOu+K55+4bFE6xXNU+l0NnkTdhVS3z7Me35RzOKLhF3q01yU17njm5htDFtbKSxxbPceick/X1DZmECkvkHdKupK301X3+lQWju/J+fHadKXtuSVVA0BmttA7L62iKPaVLdOrfBir8Wd8eU5MBQfbnEGxMBAf/F0FHd5+kPat36gDVck37pYBTs4yYRyn8FK5P6jugbsz6ZKFRs/kdKju5Rp6vN6FWC4v9SzMCnpNsurJdtvEHPK4tuHaw6pbW0zp7wpdq2doccoYQwb4ylOL7JGrzKH4fnkH1wTHvblrJZoo9+UlJLtEk0isw3flZqzV7C/bOLwKl0Zo4xPPUb/qqVQ2fDglWlvIBpKpFIdfMbB4xJJ2qhJf2tDiaE2gr0do+/KXaf+WTqoeF8WxNNDX1fl28QkXUfe6lAAe+B15i6c8Jsd9sb3yyeTgrzIZp8gxdxFuSPUENpYxqQflc6Bn4lzJ3ipm5V4hBw94rIB7vwMeTX7CQ6x6jMG9RgYfU1nCIS+zzVj95wJtZAid2y/kEZpymafpLvfwLFsJCY9IsH/zByqoo76JDiV+QGa0itqSrVQSakb8MA3c5Hwol4980QE/JstfCzQR+Vvt5A820bSrkhRvH0sbnwySL5CmkupEWqu4ou8rZ8kBT1aDsC83P7c3g8SQ5Fc5Xvw66eXqmoD8Qk7/3jWV8vJzZELv9E6mZFPYv3yDBcdwSi3usgY27W+Lxt4qi5JcP7RJhB5kxfg3ctbaLMocg0ywC8wc1XMMbRnvY+SIKzMtb0T6sJn7ODlLDtlV8eKwr8l8uAuGOSQZpJxECBOsqYapZqU6rW3tewI0+pOKSmeupvojCUpafioCHtHo6xQuWQQAQ2R89eWJsFl+tq3alNopdCo3KVRi07bnKuj1hwbS3g1RqHOKiisTK5UyzvO+gbuSileXqZ6ZGFPe9f4sK6y45nWWp4x1XxbTHJNYi8TkjPT6R+UkIa6FpMI3Goks/pDjpB0ys/erjDFI3e0sVdgYeLX1s4azzmW2xwcqT2xYJ6HJ06JVM8RSvJPlvjOkD5OyX/bMyaq9nXWBCakOs33UdYdo1PwDlGqzKNVp6nUs/YtsqkZTZgfwSpN11qemwkQW4Qu0VwWgiT5KxixKdFg09LRWGntRA2sgNe4L0eEdkQcsn0r5QyqCoTcLmeB1kVJV57KlMVLCjaflBReKNlWJD2FAP+GxQIjPDJ9QeU7Qcp7VL6zRzfD8SSaDTcy3yFmWwfsrHepuLKTuRAIvJLoZbaNHLRaKNlXLGHgJxw1GNwDrJXToGgP1HINP2OdiWfjkbrwoics5C/CZRPMZjolcIkLKvn+ZjC3qLNzScfNqm72kSWvg6tgiDOeijh03H+yoDV1RNDDRMeH2fTTsysOUbAF47T5O1LDUjrQMurEkqFKk/AeUCpJxxwsXBwKmSqVsw05n2Ab4PgpE0lQ6ME5NtUFa92gVbVrUn5oPBghAgt7aYEx4ctIkC6oNDUXM6FxXWDUg+0KDQioNRp6KvtFHxVwdxXP6rGI4VRvvmtH890S3VIuPrFCKku0W2TFYPhhmO22SvzhF1bMaadQNBylcFaeO/SFYRBoA8Dg5fxXwuZxr16PLUhQw6XJ8X+RLpI3i5rh5fUnAnh20VBv/MQrAPAi0G6DOjcmYWXdkR1FDuCzZcuFt+5LjL26gna+UUf3uMHU0+sgfsmnY9FZqqAnS+scG6PxmuDxFaUhYZ5uPIhVJxJIpDfT/682l4LBklWc007jP11DzjiJqeqtY0+5QZZLKJrZRxdQ2gvksatsTvtSw1DUA70o39WeQ4zuADwGra4gBTNvUsKfFejxkmcWlQfub0YC6MeJXFLKU9uzc2bZULNbia0bbXDYofu+5n619jG1yvJ2XPyiEG0mthf1HxeitxZWIH/1UPDRJAye00a5Xy+jQ9iJoZxIhSppXFVAC1zL4lp8r4Qk69pz2SYKdqQCKRTCP1P/MZpp0x7sUgBaFYdlY48ArYMEQHsTMi2OHAjcgUrgM4A3odR+u0wGPFK/OMODvWO9vfX4O7YadTaaZiuFGBl1S5LO/DCAvKWZw0AIMpiAvlHEHJON3pqUexMTvSyfMLjA6W33UfCAIEpSiypExqt1UTGsfqab9m4upvQHmAkAXAcwRkMJOOOctS/pRMJqmIryQGwDqCpPHjPMEnNAmlAcOE2j4VFf2INEELtFqkS8CwsGLD3Bu0Ox6Gj3/INyMTZ31AQsgDURf/vWMD+MW7HdH9TUOWEwahvmqLEqviKeNi7oAVELrlNY6jfR5PpNuB5jXFCPa6wLT9Gim0qThYaHEK3QaH338oTSlUyYloKHsF30ws/V7QtRUE4JpNal0MCRvfLsGZ80jVbTuz1XUcihIEAiHu6YAGgTCgGT6DOdYACwYL4zJMGT5hkP+09BmA+PTkyczzALAx+MNfviaNAXKU12F2K46nsm+yMI4Da0NuRDS/txQXUKVbHaA8WMSrXBaC2SqE4IP38/vZid5iYlBlR9qofKprVS/voSYsIz59H59jMeUhA/EePtJovumo9FmgEaDi9M0MJLegf2xvQDMlFoANQXO8nZM5KfDmI8oJpbBDAuYJGCiDzNP/tOxR8nz93RKNMoH8xl0TWiHqTXVB7MRrUrQ4XeKqGZjVNbSKNq7roTaoMXFp7RTZFIbHVjWj+rWlOiJ8YFUMYhp+FcT17MZ6qzzAzBLg6XPgUWHYQ36n9NEMZCvurWlZATTIAlpbYZSOJ+E9peNbUcgnKaGN4s1oDxGtiY84Yala6y4JzQIz7VxDZONimmt1A/svA5j7KgJadNXMb1Fm8IGvEMc7iMytJOqZjXhM6bNJmsgC2C8ye9kWbv/UoZzqRNkBcE8STZYfQFYhXEOiaZj0MaqvABmgDkcmnlLWhlfBFfuF/axRtrE/jKC/aDPyYynlNEBMJ/E/R4UOt2rwu29qc69YhLZ5Lp5pxQmkWKmTuEf4D6Q2MaNxQAqoIFh7WrbG4bmJKkfJq/57QjVrS7VoDBAxcNjNGBmE1VMadUSf2B5BR1eVYrJDTh/Z43JrJjSRoPn1pG/JE0HXyynw/DV3DdcHaeiQZ26LwtIPxC0FCxJ56EANDlJ/c9upuiIGLW+G6YY2DhrYhGESGtjSocG2jrwvfg6Pm6IRci5ILR7mydJ++H5TGg5hGoExp20aWLBAHqLn1whAPn5HMCaysMKYcAMKINZJPs+Rzu3oc/jtk1/gTBvKHRRLGthGCHK/mY/7QPZCUPi/DBz7DuYLBls0gKOOWVy4GoeA2haDkDMglkbfAh6gyBZiUY/xQ4H9Hvy93D/BCVaeaGSQaF+OA/TmICG8LWBaEqbQzbLPBa9tIX/DMgm3YeBYUvA2skmk8HhT8M6yvUVkrUhpxrBS0FOl4R2KFdngKYt4MjSND9m7rEA6N2u4LQaNG5eSmI/v+kAyP4yLGAGLY5w1Uo8ewF860L4zp0qD4C60gl/dwgTVQtQeL8QpqcnkF1j2uj1N1wMuAWhYH+mfVXC7HXe9DsCosEwHRVR9vtCTMskpzxPwOtf6IUcqyMGpFEQNMukG9/rr1RwAvspMNdTLUtxfvQGgDO4DZPQnCBmtNpPsoZCM2eF/GpW2FJ3BSxaZhmKE8tLMKDdMMtdCdFjXlZi55lszr0xuUhaBZ/Pl4w4xm24LKvgP0//sCzjOKZwMi2FSz/c4fH6mZGtkiz+NrT4GsQoN/ud5LR+UDMkvjHOgCotPfCXs6GZs9ncAsxXAPJT0LIlOLVJUXei8yTfisUkXiztTDq2PyzeJfVUXgbyuBvMs9BD5IYc7x/64aTyI9J49fC10MLroJ0Tulgt/osD0Oa4AxJM67lBC82nfgRwN0FbXwSoS4v99mu4tu4kAmyIsMhzZNXADMmfHsuWFOvGIdqTnuPXArXHbGb9tg7sh79XH1jodpGUVeZl1PW0NLkSpWM4B1RoKXG6/fW4bWyQHxPYLdK4VwTlb7X5xByOkzZFNG0ivfefLtsgYRj/7EhNjj7zEUo8NBTsF+HEqg8KQPIUOudKEfYS6l6q14PQ6MSGcsHsReoOSZG21qlE6BpgjRR+OfvfJCWtdk9NsdCtiLp/capMyAVr1gjJkgyX74OO45zUeLTttXzsk1NuzIg7U8YXBhen7uFQ4oP+rbS4lHYWSoJ2jjh0XhQ0tGsdi9EtTFm4TZW0aX08p11KRx3SkqK5tqdeySWjgAAXEfAilPHrUO/DVi/ltielYJ3KSc4kXhwYsbtSmrBW9wZNZcE6hT5oDcy1mVKZZu3kxbsz6fj9ksiJsu2RCv0zUiNsLeQiW/6Uf2xFmiKIg1kTDa2ROvt1wvxaIWvFS9T9w3Zsqs4TIJkUTD4JAWONXytgrZB2zMESFxvihlOJcDWTgfWdwNK6R5w5iQ86R5jdVGnlJ9iYeUXeGwIaV95XUveCqveVUZ0M27vS/uiJscZKIniaMMCRQjAiH8B4joiAbRXmuE72j/wtKPHJuPH6lvXSHvIcd3/clQlRtadVSUxWLIQlJIzYou5CUlrIT1xIT5uQDWa3+z3M1xWmzhNhIv5XgAEAOcyGGJeOyHYAAAAASUVORK5CYII=';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in Route53',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in Route53 Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}

	$("#ses-events").click(function () {
		regions_jsonText = JSON.stringify(selected_regions);
        regions = selected_regions;

		if (value % 2 == 0) {

            if(regions == null){

				swal({
  					title: "Region Not Selected!",
  					text: "Please Select Your Region!!!",
  					icon: "warning",
				});
			}

			if(regions != null) {

                $.ajax({
                    type: 'POST',
                    url: "ses_events/",
                    data: {
                        'regions': regions_jsonText,
                        "csrfmiddlewaretoken": "{{csrf_token}}"
                    },
                    cache: false,
                    async: 'asynchronous',
                    dataType: 'json',
                    success: function (data) {
                        var len = data.ses_data.length;
                        var table_data = '';
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.ses_data[i].EventName + '</td>';
                                table_data += '<td>' + data.ses_data[i].EventTime + '</td>';
                                table_data += '<td>' + data.ses_data[i].UserName + '</td>';
                                table_data += '<td>' + data.ses_data[i].IPAddress + '</td>';
                                table_data += '<td>' + data.ses_data[i].Region + '</td>';
                                if (data.ses_data[i].Name){
                                    table_data += '<td>' + data.ses_data[i].Name + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].Enabled){
                                    table_data += '<td>' + data.ses_data[i].Enabled + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].ScanEnabled){
                                    table_data += '<td>' + data.ses_data[i].ScanEnabled + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].TlsPolicy){
                                    table_data += '<td>' + data.ses_data[i].TlsPolicy + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].TopicArn){
                                    table_data += '<td>' + data.ses_data[i].TopicArn + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].Encoding){
                                    table_data += '<td>' + data.ses_data[i].Encoding + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].Recipients){
                                    table_data += '<td>' + data.ses_data[i].Recipients + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].RuleSetName){
                                    table_data += '<td>' + data.ses_data[i].RuleSetName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].Identity){
                                    table_data += '<td>' + data.ses_data[i].Identity + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].RuleName){
                                    table_data += '<td>' + data.ses_data[i].RuleName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].policy){
                                    table_data += '<td>' + data.ses_data[i].policy + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].PolicyName){
                                    table_data += '<td>' + data.ses_data[i].PolicyName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].Domain){
                                    table_data += '<td>' + data.ses_data[i].Domain + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].DkimTokens){
                                    table_data += '<td>' + data.ses_data[i].DkimTokens + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].DisableEmailNotifications){
                                    table_data += '<td>' + data.ses_data[i].DisableEmailNotifications + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].VerificationToken){
                                    table_data += '<td>' + data.ses_data[i].VerificationToken + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ses_data[i].EmailAddress){
                                    table_data += '<td>' + data.ses_data[i].EmailAddress + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                table_data += '</tr>';
                            }
                        }
                        $('#ses-events-table').DataTable().destroy();
                        $('#ses-events-data').empty();
                        $('#ses-events-data').append(table_data);
                        SESEventsDataDocumentGenerate();
                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function SESEventsDataDocumentGenerate(){
	    $('#ses-events-table').DataTable({

			pageLength: 10,
			responsive: true,
			paging: true,
			autoWidth: true,
			dom: '<"html5buttons"B>lTfgitp',
			retrieve: true,
			saveState: false,
			cache: true,

			processing: true,
			buttons: [{
					extend: 'csvHtml5',
					title: 'All Events Occurs in SES',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in SES',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_SES',
					orientation: 'landscape',
					pageSize: 'A2',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					titleAttr: 'PDF',
					customize: function (doc) {

						doc.content.splice(0, 1);
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';

						doc.pageMargins = [20, 60, 20, 30];
						doc.defaultStyle.fontSize = 7;
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'All Events Occurs in SES',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in SES Summary'
									}
								],
								margin: 20
							}
						});
						doc['footer'] = (function (page, pages) {
							return {
								columns: [{
										alignment: 'left',
										text: ['Summary generated on: ', {
											text: jsDate.toString()
										}, ' For more information contact us or visit www.cloudjournee.com'],

									},
									{
										alignment: 'right',
										text: ['page ', {
											text: page.toString()
										}, ' of ', {
											text: pages.toString()
										}],

									}
								],
								margin: 20
							}
						});
						var objLayout = {};
						objLayout['hLineWidth'] = function (i) {
							return .5;
						};
						objLayout['vLineWidth'] = function (i) {
							return .5;
						};
						objLayout['hLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['vLineColor'] = function (i) {
							return '#aaa';
						};
						objLayout['paddingLeft'] = function (i) {
							return 4;
						};
						objLayout['paddingRight'] = function (i) {
							return 4;
						};
						doc.content[0].layout = objLayout;
					}
				},
			]
		});

	}


});


