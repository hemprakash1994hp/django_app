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

                        var events_length = data.events_list.length;
                        console.log(events_length);
//                        var events_datas = document.createElement("div");
                        var data_events = [];
                        var arr = [];
                        var leng = data.route53_list.length;
                        console.log(leng);
                        console.log(data.events_list);
                        console.log(data.route53_list);

                        var route53_data = data.route53_list;

                        for(var i=0;i<leng;i++){
                            var div = document.createElement('div');
                            div.className = "col-lg-3 style1 navy-bg";
                            div.style = "box-shadow: 10px 10px 5px #aaaaaa;margin-right: 10px;float: left;text-align: center;border-radius: 10px 10px 10px 10px;padding-left: 0px;padding-right: 0px;" + route53_data[i];

                            var colum_left = document.createElement('div');
                            colum_left.className = "col-lg-10 text-left";
                            var header_text = document.createElement('h5');
                            header_text.innerHTML = data.route53_list[i][0].EventName;

                            var event_table = document.createElement('a');
                            event_table.id = data.route53_list[i][0].EventName;
                            event_table.className = "small-box-footer text";
                            event_table.style = "font-size: 12px;letter-spacing: 1px;font-variant: all-small-caps;color: black !important;font-weight: 600;";
                            event_table.innerHTML = "More info ";

                            var icon = document.createElement('i');
                            icon.className = "fa fa-arrow-circle-right";
                            icon.style = "color: black !important;";


                            var colum_right = document.createElement('div');
                            colum_right.className = "col-md-2 text-right";
                            var events_count = document.createElement('h2');
                            events_count.id = "events_count";
                            events_count.innerHTML = data.route53_list[i].length;
                            console.log(events_count);
                            colum_right.style = "background-color: white;color: #1ab394;padding: 0;padding-top: 6px;float: right;height: 50px;text-align: center;border: 1px solid;border-top-left-radius: 10px;border-bottom-left-radius: 10px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;"

                            document.getElementById('dynamic_div').appendChild(div);
                            div.appendChild(colum_left);
                            div.appendChild(colum_right);
                            colum_left.append(header_text);
                            colum_right.append(events_count);
                            colum_left.append(event_table);
                            colum_left.appendChild(icon);
//                            console.log(route53_data);
                            var modal = document.getElementById("table-modal");
                            var event_target = document.getElementById(event_table.id);
                            var span = document.getElementsByClassName("close")[0];
                            console.log(modal);
                            console.log(event_target);
                            event_target.onclick  = function() {
                                  modal.style.display = "block";
                                }
                            span.onclick = function() {
                                  modal.style.display = "none";
                                }
//                            CreateHostedZone();
//                            generate_table();
//                            var modal = document.createElement("div");
//                            modal.className = "modal inmodal";
//                            modal.id = "table-modal";
//                            var modal_dialog = document.createElement("div");
//                            modal_dialog.className = "modal-dialog modal-lg";
//                            modal_dialog.style = "padding-top: 150px;";
//                            var modal_content = document.createElement("div");
//                            modal_content.className = "modal-content animated bounceInRight";
//                            var modal_header = document.createElement("div");
//                            modal_header.className = "modal-header";
//                            modal_header.style = "padding: 0px";
//                            button = document.createElement("button");
//                            button.type = "button";
//                            button.className = "close";
//                            button.style = "margin: 5px;";
////                            button.innerHTML = "<span aria-hidden="true">x</span><span class="sr-only">Close</span>";
//                            var modal_body = document.createElement("div");
//                            modal_body.class = "modal-body";
//                            modal_body.style = "padding: 0px";
//                            var ibox_content = document.createElement("div");
//                            ibox_content.className = "ibox-content table-responsive";
//                            ibox_content.id = "table-creation";
//
//                            modal_body.appendChild(ibox_content);
//
//                            modal_header.appendChild(button);
//                            modal_content.appendChild(modal_header);
//                            modal_content.appendChild(modal_body);
//                            modal_dialog.appendChild(modal_content);
//                            modal.appendChild(modal_dialog);
//
//                            var modal_target = document.getElementById("table-modal");
//                            var event_target = document.getElementById(event_table.id);
//                            var span = document.getElementsByClassName("close")[0];
//                            console.log(modal);
//                            console.log(event_target);
//                            event_target.onclick  = function() {
//                                  modal.style.display = "block";
//                                }
//                            span.onclick = function() {
//                                  modal.style.display = "none";
//                                }

                            table_generating(data);

                        }

                        function table_generating(){

                        var col_total = [];
                        for (var p = 0; p < data.route53_list[i].length; p++) {

//                                for (var c = 0; c < myBooks.length; c++) {
                                    for (var key in data.route53_list[i][p]) {
                                        if (col_total.indexOf(key) === -1) {
                                            col_total.push(key);
                                        }
                                    }
                                    console.log(col_total);
                                    var table = document.createElement("table");
                                    table.id = data.route53_list[i][0].EventName + "Table";
                                    table.className = "table table-striped table-bordered table-hover";
                                    var tr = table.insertRow(-1);
                                    for (var q = 0; q < col_total.length; q++) {
                                        var th = document.createElement("th");
                                        th.innerHTML = col_total[q];
                                        tr.appendChild(th);
                                        }

                                    for (var m = 0; m < data.route53_list[i].length; m++) {

                                        tr = table.insertRow(-1);

                                        for (var n = 0; n < col_total.length; n++) {
                                            var tabCell = tr.insertCell(-1);
                                            tabCell.innerHTML = data.route53_list[i][m][col_total[n]];
                                        }
                                    }
//                                    var table_div = document.getElementById(table_creation.id);
//                                    var table_creation = document.getElementById("table-creation");
////                                    var table_creation = document.createElement("div");
////                                    table_creation.id = data.route53_list[i][0].EventName + "Table";
//                                    table_creation.innerHTML = "";
//                                    table_creation.appendChild(table);
//                                    console.log(table);
////                                    table_div.appendChild(table_creation);
////                                    console.log(table_div);
                        }
//                        if(document.getElementById("table-creation") != null){
                        var table_creation = document.getElementById("table-creation");
                        console.log(table_creation);
//                        var table_creation = document.createElement("div");
//                        table_creation.id = data.route53_list[i][0].EventName + "Table";
                        table_creation.innerHTML = "";
                        table_creation.appendChild(table);
//                        }
//                        var table_container = document.getElementById("table-creation")[i];
//                        table_container.append(table_creation);
                        console.log(table);
                        CreateHostedZoneEventsDataDocumentGenerate();
                        }

                        function generate_table() {
                        var table_creation = document.getElementById("table-creation");
                        var tbl = document.createElement("table");
                        tbl.className = "table table-striped table-bordered table-hover";
                        var tblBody = document.createElement("tbody");

                        for (var p = 0; p < data.route53_list[i].length; p++) {
                            var col = [];
//                                for (var c = 0; c < myBooks.length; c++) {
                                    for (var key in data.route53_list[i][p]) {
                                        if (col.indexOf(key) === -1) {
                                            col.push(key);
                                        }
                                    }
                                    console.log(col)
//                                }
                            var row = document.createElement("tr");
                            for (var q = 0; q < data.route53_list[i].length; q++) {
                                var cell_title = document.createElement("th");
                                var cell = document.createElement("td");
                                var column_count = data.route53_list[i][p][Object.keys(data.route53_list[i][p])[q]].length;
//                                console.log(column_count);
//                                var count_data = data.route53_list[i][p].length;
//                                console.log(count_data);
                                var cellText = data.route53_list[i][p][Object.keys(data.route53_list[i][p])[q]];
                                console.log(cellText);
                                cell.append(cellText);
                                row.appendChild(cell);
                            }
                            tblBody.appendChild(row);
                        }
                        tbl.appendChild(tblBody);
                        table_creation.appendChild(tbl);
                        CreateHostedZoneEventsDataDocumentGenerate();
                        }

//
//
//                        CreateHostedZone(data);
////                        ChangeResourceRecordSets(data);
//                        console.log(data);

                        function CreateHostedZone(){
                        var len = data.route53_list[i].length;
                        var table_data = '';

                        if (len > 0) {
                            for (var k = 0; k < len; k++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (k + 1) + '</td>';
                                table_data += '<td>' + data.route53_list[i][k].EventName + '</td>';
                                table_data += '<td>' + data.route53_list[i][k].EventTime + '</td>';
                                table_data += '<td>' + data.route53_list[i][k].UserName + '</td>';
                                table_data += '<td>' + data.route53_list[i][k].IPAddress + '</td>';
                                table_data += '<td>' + data.route53_list[i][k].Region + '</td>';
                                if (data.route53_list[i][k].CallerReference){
                                    table_data += '<td>' + data.route53_list[i][k].CallerReference + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].HostedZoneName){
                                    table_data += '<td>' + data.route53_list[i][k].HostedZoneName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].ChangeInfo_Status){
                                    table_data += '<td>' + data.route53_list[i][k].ChangeInfo_Status + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].ChangeInfo_Id){
                                    table_data += '<td>' + data.route53_list[i][k].ChangeInfo_Id + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].ChangeInfo_SubmittedAt){
                                    table_data += '<td>' + data.route53_list[i][k].ChangeInfo_SubmittedAt + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].Location){
                                    table_data += '<td>' + data.route53_list[i][k].Location + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].ResourceRecordSetCount){
                                    table_data += '<td>' + data.route53_list[i][k].ResourceRecordSetCount + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].HostedZone_Id){
                                    table_data += '<td>' + data.route53_list[i][k].HostedZone_Id + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.route53_list[i][k].NameServers){
                                    table_data += '<td>' + data.route53_list[i][k].NameServers + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                table_data += '</tr>';
                            }
                        }
                        $('#CreateHostedZone-events-table').DataTable().destroy();
                        $('#CreateHostedZone-events-data').empty();
                        console.log(len);
                        console.log(table_data);
                        $('#CreateHostedZone_count').empty();
                        $('#CreateHostedZone_count').append(len);
                        $('#CreateHostedZone-events-data').append(table_data);
                        CreateHostedZoneEventsDataDocumentGenerate();
                        }

                        function ChangeResourceRecordSets(){
                        var len = data.ChangeResourceRecordSets.length;
                        var table_data = '';

                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                table_data += '<tr>';
                                table_data += '<td>' + (i + 1) + '</td>';
                                table_data += '<td>' + data.ChangeResourceRecordSets[i].EventName + '</td>';
                                table_data += '<td>' + data.ChangeResourceRecordSets[i].EventTime + '</td>';
                                table_data += '<td>' + data.ChangeResourceRecordSets[i].UserName + '</td>';
                                table_data += '<td>' + data.ChangeResourceRecordSets[i].IPAddress + '</td>';
                                table_data += '<td>' + data.ChangeResourceRecordSets[i].Region + '</td>';
                                if (data.ChangeResourceRecordSets[i].HostedZoneId){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].HostedZoneId + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].Action){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].Action + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ResourceRecordSetType){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ResourceRecordSetType + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ResourceRecordSetTTL){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ResourceRecordSetTTL + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ResourceRecordsValue){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ResourceRecordsValue + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ResourceRecordSetName){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ResourceRecordSetName + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ChangeInfo_Status){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ChangeInfo_Status + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ChangeInfo_Id){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ChangeInfo_Id + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }
                                if (data.ChangeResourceRecordSets[i].ChangeInfo_submittedAt){
                                    table_data += '<td>' + data.ChangeResourceRecordSets[i].ChangeInfo_submittedAt + '</td>';
                                }
                                else{
                                    table_data += '<td>-</td>';
                                }

                                table_data += '</tr>';
                            }
                        }
                        $('#ChangeResourceRecordSets-events-table').DataTable().destroy();
                        $('#ChangeResourceRecordSets-events-data').empty();
                        console.log(len);
                        $('#ChangeResourceRecordSets_count').empty();
                        $('#ChangeResourceRecordSets_count').append(len);

                        $('#ChangeResourceRecordSets-events-data').append(table_data);
                        ChangeResourceRecordSetsEventsDataDocumentGenerate();
                        }

                    },
                    error: function (request, status, error) {
                        console.log("Error: " + error);
                    }
                });
            }
		}
		value++;
	});

	function CreateHostedZoneEventsDataDocumentGenerate(){
	    $('#CreateHostedZone-events-table').DataTable({

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
					title: 'All Events Occurs in CreateHostedZone',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in CreateHostedZone',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_CreateHostedZone',
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
										text: 'All Events Occurs in CreateHostedZone',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in CreateHostedZone Summary'
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

	function ChangeResourceRecordSetsEventsDataDocumentGenerate(){
	    $('#ChangeResourceRecordSets-events-table').DataTable({

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
					title: 'All Events Occurs in ChangeResourceRecordSets',
					footer: true,
				},
				{
					extend: 'excelHtml5',
					title: 'All Events Occurs in ChangeResourceRecordSets',
					footer: true,
				},
				{
					extend: 'pdfHtml5',
					filename: 'All_Events_Occurs_in_ChangeResourceRecordSets',
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
										text: 'All Events Occurs in ChangeResourceRecordSets',
										fontSize: 16,
										margin: [10, 0]
									},
									{
										alignment: 'right',
										fontSize: 12,
										text: 'CloudjourneeOpSec All Events Occurs in ChangeResourceRecordSets Summary'
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


