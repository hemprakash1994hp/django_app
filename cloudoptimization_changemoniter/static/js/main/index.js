$(document).ready(function () {
	$('.demo2').click(function () {
		swal({
			title: "Successfuly AWS Account Added",
			text: "",
			type: "success"
		});
	});
	$('.demo3').click(function () {
		swal({
			title: "Successfuly AWS Keys changed",
			text: "",
			type: "success"
		});
	});
	$('.demo4').click(function () {
		swal({
				title: "Are you sure?",
				text: "Your AWS account will permanently removed from CloudOptimization",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete",
				cancelButtonText: "No, cancel",
				closeOnConfirm: false,
				closeOnCancel: false
			},
			function (isConfirm) {
				if (isConfirm) {
					swal("Deleted!", "Your AWS account has been deleted.", "success");
				} else {
					swal("Cancelled", "Your AWS account is safe :)", "error");
				}
			});
	});

})