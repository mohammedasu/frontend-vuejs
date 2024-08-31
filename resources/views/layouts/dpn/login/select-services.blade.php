@php
$weekDays = array('S','M','T','W','TH','F','SA');
@endphp
<div class="loginright align-items-start">
	<a onclick="navigate('select-services-sec','select-speciality-sec');" href="#" class="backbtn"> Back</a>
	<!--<a onclick="navigate('select-services-sec','address-details-sec');" href="#" class="skipbtn">Skip</a>-->
	<div class="loginrightinner ">
		<h3 class="pb-4 text-center">Select Services</h3>
		<!--- Form start --->
		<form class="form select-services" id="serviceForm" name="serviceForm">
			<div id="serviceList">
			</div>
			<!--<div class="telemedicine btnaddtmslot"><a href="" class="outlinebtn" data-toggle="modal" data-target="#telmdcnpopup">Select Time Slot</a>
			</div>
			<div class="homevisit btnaddtmslot"><a href="" class="outlinebtn">Select Time Slot</a>
			</div>
			<div class="clinicvisit btnaddtmslot"><a href="" class="outlinebtn">Select Time Slot</a>
			</div>-->

			<button type="button" name="btnSelectService" id="btnSelectService" class="btnfill btnfull mt-2" onclick="continueService()">Continue</button>

		</form>
		<!--- Form end --->
	</div>
</div>

@include('layouts.dpn.login.telemedicine')
