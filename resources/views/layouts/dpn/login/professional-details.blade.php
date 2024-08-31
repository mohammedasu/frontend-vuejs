	{{-- <a onclick="navigate('professional-details-sec','basic-details-sec');" href="#" class="backbtn"> Back</a> --}}

	<div class="loginrightinner">
		<h3 class="pb-4 text-center">Professional Details </h3>
		<!--- Form start --->
		<form class="form" id="professionalDetailsForm" name="professionalDetailsForm">
			<label class="labelstyle pt-2">Qualification <span>*</span>
			</label>
			<input type="text" name="qualification" id="qualification" maxlength="100" placeholder="Enter your qualification" required>
			<label class="labelstyle pt-2">Name of University or College <span>*</span></label> 
			<input type="checkbox" class="mb-2" id="other"> Other
			<div class="position-relative">
				<select class="search-select select_professional" name="institute_master_ref_no" id="institute_master_ref_no" required>
					<option value="">Select Name of University or College</option>
				</select>
			</div>
			<input type="text" name="other_institute_name" id="other_institute_name" style="display:none;" placeholder="Enter your institute name">
			<label class="labelstyle pt-2">Experience (in years) <span>*</span>
			</label>
			<input type="text" name="experience" id="experience" maxlength="100" placeholder="Enter your experience"
			maxlength=3 onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
			<label class="labelstyle pt-2">Registration Number</label>
			<input type="text" name="registration_number" id="registration_number" maxlength="100" placeholder="Enter your registration number" required>
			<label class="labelstyle pt-2">Place of Work <span>*</span>
			</label>
			<input type="text" name="place_of_work" id="place_of_work" placeholder="Enter Hospital, Clinic or Institution Name" required>
			<button type="submit" name="btnSaveProfessionalDetails" id="btnSaveProfessionalDetails" class="loaderbtn btnfill btnfull mt-3">Continue</button>
		</form>
		<!--- Form end --->
	</div>
