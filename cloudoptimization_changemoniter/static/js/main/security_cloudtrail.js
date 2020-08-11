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
	$("#enabled-cloudtrail").click(function () {
		regions = JSON.stringify(selected_regions);

		if (value % 2 == 0) {

			$.ajax({
				type: 'GET',
				url: "enabled_cloudtrail",
				data: {
					// 'regions': regions,
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
							table_data += '<td>' + data.cloudtrail_data[i].Name + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].TrailARN + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].S3BucketName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].SnsTopicARN + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].IsMultiRegionTrail + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].HomeRegion + '</td>';
							table_data += '</tr>';
						}
					}
					$('#enabled-cloudtrail-data').empty();
					$('#enabled-cloudtrail-data').append(table_data);
                    enabledCloudtrailDocumentGenerate();
				},
				error: function (request, status, error) {
					console.log("Error: " + error);
				}
			});

		}

		value++;
	});

	function enabledCloudtrailDocumentGenerate(){

	    $('#enabled-cloudtrail-table').DataTable({
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
					title: 'Enabled Trails',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'Enabled Trails',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'Enabled_Trails',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'Enabled Trails',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization Enabled Trails Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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


	$("#enabled-kms-trails").click(function () {
		regions = JSON.stringify(selected_regions);

		if (value % 2 == 0) {

			$.ajax({
				type: 'GET',
				url: "enabled_kms_trails",
				data: {
					// 'regions': regions,
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
							table_data += '<td>' + data.cloudtrail_data[i].Name + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].KMSID + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].CreationDate + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].KeyUsage + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].KeyState + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].Region + '</td>';
							table_data += '</tr>';
						}
					}
					$('#enabled-kms-trails-data').empty();
					$('#enabled-kms-trails-data').append(table_data);
                    enabledKMSTrailsDocumentGenerate();
				},
				error: function (request, status, error) {
					console.log("Error: " + error);
				}
			});

		}

		value++;
	});

    function enabledKMSTrailsDocumentGenerate(){

	    $('#enabled-kms-trails-table').DataTable({
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
					title: 'Enabled KMS Log Trails',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'Enabled KMS Log Trails',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'Enabled_KMS_Log_Trails',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'Enabled KMS Log Trails',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization Enabled KMS Log Trails Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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


    $("#enabled-log-file-validation-trails").click(function () {
		regions = JSON.stringify(selected_regions);

		if (value % 2 == 0) {

			$.ajax({
				type: 'GET',
				url: "enabled_log_file_validation_trails",
				data: {
					// 'regions': regions,
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
							table_data += '<td>' + data.cloudtrail_data[i].Name + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].TrailARN + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].LogFileValidationEnabled + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].S3BucketName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].S3BucketCreationDate + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].HomeRegion + '</td>';
							table_data += '</tr>';
						}
					}
					$('#enabled-log-file-validation-trails-data').empty();
					$('#enabled-log-file-validation-trails-data').append(table_data);
                    enabledLogFileValidationTrailsDocumentGenerate();
				},
				error: function (request, status, error) {
					console.log("Error: " + error);
				}
			});

		}

		value++;
	});

    function enabledLogFileValidationTrailsDocumentGenerate(){

	    $('#enabled-log-file-validation-trails-table').DataTable({
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
					title: 'Enabled Log File Validation Trails',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'Enabled Log File Validation Trails',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'Enabled_Log_File_Validation_Trails',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'Enabled Log File Validation Trails',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization Enabled Log File Validation Trails Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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


     $("#cloudtrail-unathorized-access").click(function () {
		regions = JSON.stringify(selected_regions);

		if (value % 2 == 0) {

			$.ajax({
				type: 'GET',
				url: "cloudtrail_unathorized_access",
				data: {
					'regions': regions,
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
							table_data += '<td>' + data.cloudtrail_data[i].UserName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].EventName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].EventTime + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].UserAgent + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].AccesskeyId + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].Region + '</td>';
							table_data += '<td><a class="ip-location" href="javascript:;">' + data.cloudtrail_data[i].IPAddress + '</a></td>';
							table_data += '</tr>';
						}
					}
					$('#cloudtrail-unathorized-access-data').empty();
					$('#cloudtrail-unathorized-access-data').append(table_data);
                    cloudtrailUnauthorizedAccessDocumentGenerate();
				},
				error: function (request, status, error) {
					console.log("Error: " + error);
				}
			});

		}

		value++;
	});

    function cloudtrailUnauthorizedAccessDocumentGenerate(){

	    $('#cloudtrail-unathorized-access-table').DataTable({
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
					title: 'Trail Unauthorized Access',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'Trail Unauthorized Access',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'Trail_Unauthorized_Access',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'Trail Unauthorized Access',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization Trail Unauthorized Access Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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


	$(document).on("click", ".ip-location", function(e) {
		//var ip_address = $(this).closest("tr").find("td").eq(8).html();
		var ip_address = $(this).closest('td').text();
		$.ajax({
			type: 'GET',
			url: 'ip_location_track',
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
				//ipLocationDocumentGenerate();
			},
			failure: function (response) {
				alert(response);
			},
			error: function (response) {
				alert(response.responseText);
			}
		});
	});

    function ipLocationDocumentGenerate(){

	    $('#ip-tracked-location-table').DataTable({
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
					title: 'IP Location',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'IP Location',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'IP_Location',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'IP Location',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization IP Location Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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

     $("#unauthorized-s3-bucket").click(function () {
		regions = JSON.stringify(selected_regions);

		if (value % 2 == 0) {

			$.ajax({
				type: 'GET',
				url: "unauthorized_s3_bucket",
				data: {
					'regions': regions,
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
							table_data += '<td>' + data.cloudtrail_data[i].UserName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].BucketName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].EventName + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].EventTime + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].UserAgent + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].AccesskeyId + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].Region + '</td>';
							table_data += '<td><a class="ip-location" href="javascript:;">' + data.cloudtrail_data[i].IPAddress + '</a></td>';
							table_data += '</tr>';
						}
					}
					$('#unauthorized-s3-bucket-data').empty();
					$('#unauthorized-s3-bucket-data').append(table_data);
                    unauthorizedS3BucketAccessDocumentGenerate();
				},
				error: function (request, status, error) {
					console.log("Error: " + error);
				}
			});

		}

		value++;
	});

    function unauthorizedS3BucketAccessDocumentGenerate(){

	    $('#unauthorized-s3-bucket-table').DataTable({
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
					title: 'Unauthorized Access To S3 bucket',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'Unauthorized Access To S3 bucket',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'Unauthorized_Access_To_S3_bucket',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'Unauthorized Access To S3 bucket',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization Unauthorized Access To S3 bucket Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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

    $("#enabled-sns").click(function () {
		regions = JSON.stringify(selected_regions);

		if (value % 2 == 0) {

			$.ajax({
				type: 'GET',
				url: "enabled_sns",
				data: {
					// 'regions': regions,
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
							table_data += '<td>' + data.cloudtrail_data[i].Name + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].TrailARN + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].SnsTopicARN + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].IsMultiRegionTrail + '</td>';
							table_data += '<td>' + data.cloudtrail_data[i].HomeRegion + '</td>';
							table_data += '</tr>';
						}
					}
					$('#enabled-sns-data').empty();
					$('#enabled-sns-data').append(table_data);
                    enabledSNSDocumentGenerate();
				},
				error: function (request, status, error) {
					console.log("Error: " + error);
				}
			});

		}

		value++;
	});

    function enabledSNSDocumentGenerate(){

	    $('#enabled-sns-table').DataTable({
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
					title: 'Enabled SNS Notification',
					footer: true
				},
				{
					extend: 'excelHtml5',
					title: 'Enabled SNS Notification',
					footer: true
				},
				{
					extend: 'pdfHtml5',
					//title: 'Inactive EC2 Instances',
					filename: 'Enabled_SNS_Notification',
					orientation: 'portrait',
					pageSize: 'A4',
					footer: true,
					exportOptions: {
						columns: ':visible',
						search: 'applied',
						order: 'applied'
					},
					//text : '<i class="fa fa-file-pdf-o"> PDF</i>',
					titleAttr: 'PDF',
					customize: function (doc) {

						//Remove the title created by datatTables
						doc.content.splice(0, 1);
						//Create a date string that we use in the footer. Format is dd-mm-yyyy
						var now = new Date();
						var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						// Logo converted to base64
						//var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
						// The above call should work, but not when called from codepen.io
						// So we use a online converter and paste the string in.
						// Done on http://codebeautify.org/image-to-base64-converter
						// It's a LONG string scroll down to see the rest of the code !!!
						var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAA4CAYAAAAl63xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4QkEzRDI3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4QkEzRDM3RDExMTFFNkJGQzdENkUyM0Q1ODk1RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NThCQTNEMDdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NThCQTNEMTdEMTExMUU2QkZDN0Q2RTIzRDU4OTVGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtiOzagAABuoSURBVHja7FwJmBXV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';
						// A documentation reference can be found at
						// https://github.com/bpampuch/pdfmake#getting-started
						// Set page margins [left,top,right,bottom] or [horizontal,vertical]
						// or one number for equal spread
						// It's important to create enough space at the top for a header !!!
						doc.pageMargins = [20, 60, 20, 30];
						// Set the font size fot the entire document
						doc.defaultStyle.fontSize = 7;
						// Set the fontsize for the table header
						doc.styles.tableHeader.fontSize = 7;
						doc.styles.tableFooter.fontSize = 7;
						// Create a header object with 3 columns
						// Left side: Logo
						// Middle: brandname
						// Right side: A document title
						doc['header'] = (function () {
							return {
								columns: [{
										image: logo,
										width: 60
									},
									{
										alignment: 'left',
										italics: true,
										text: 'Enabled SNS Notification',
										fontSize: 11,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 8,
										text: 'Cloud Optimization Enabled SNS Notification Summary'
									}
								],
								margin: 20
							}
						});
						// Create a footer object with 2 columns
						// Left side: report creation date
						// Right side: current page and total pages
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
						// Change dataTable layout (Table styling)
						// To use predefined layouts uncomment the line below and comment the custom lines below
						// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
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


