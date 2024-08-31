{{-- <a onclick="navigate('patient-details-sec','basic-details-sec');" href='#' class="backbtn"> Back</a> --}}

<div class="loginrightinner">
	<h3 class="pb-4 text-center mx-auto">Do you know what you are looking for?</h3>	<!--- Form start --->
	<form class="form" id="patientspecialityForm" name="patientspecialityForm">
		<label class="lablecheckbox"><input type="checkbox" id="showform" value="yes" class="symptoms_checkbox" name="showform" onchange="showhideFormPatient(this.value);" />
			<span class="chkboxspan"></span> I know the symptoms </label>
		<label class="lablecheckbox"><input type="checkbox" id="showform" value="no" class="speciality_checkbox" name="showform" onchange="showhideFormPatient(this.value);" />
			<span class="chkboxspan"></span> I know the speciality </label>

		<div id="div1" style="display:none">
			<h4 class="pb-4 text-center mt-4">Select Symptoms </h4>

			<div class=" d-flex flex-wrap">
				<div id="patientsymptomsList" class="scrollbarpan">
					
				</div>
			</div>

		</div>


		<div id="div2" style="display:none">
			<h4 class="pb-4 text-center mt-4">Select Speciality </h4>
			<div class=" d-flex flex-wrap">
				<div id="patientspecialityList" class="scrollbarpan">
					
				</div>
			</div>
		</div>

		<button type="button" class="loaderbtn btnfill btnfull mt-3" id="btnSavePatientSpeciality" onClick="savePatientDetails();">Continue</button>
	</form>
	<!--- Form end --->
</div>

<script type="text/javascript">
	$("input:checkbox").on('click', function() {
		$('.speciality input').prop("checked", false);
		var $box = $(this);
		if ($box.is(":checked")) {
			var group = "input:checkbox[name='" + $box.attr("name") + "']";
			$(group).prop("checked", false);
			$box.prop("checked", true);
		} else {
			$box.prop("checked", false);
		}
	});

	function showhideFormPatient(showform) {
		if (showform == "yes") {
			document.getElementById("div1").style.display = 'block';
			document.getElementById("div2").style.display = 'none';
		}
		if (showform == "no") {
			document.getElementById("div2").style.display = 'block';
			document.getElementById("div1").style.display = 'none';
		}
	}
</script>