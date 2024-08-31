{{-- <a href="#" onclick="navigate('address-details-sec');" class="backbtn"> Back</a> --}}
<div class="loginrightinner">
    <h3 class="pb-4 text-center change_address_title">Your Address</h3>
    <!--- Form start --->
    <form class="form" name="addressDetailsForm" id="addressDetailsForm">
        <label class="labelstyle pt-2">Address Line 1 <span>*</span>
        </label>
        <input type="text" name="address_1" id="address_1" placeholder="Enter Address Line 1" required>
        <label class="labelstyle pt-2">Address Line 2 <span>*</span>
        </label>
        <input type="text" name="address_2" id="address_2" placeholder="Enter Address Line 2" required>
        <label class="labelstyle pt-2">Landmark <span>*</span>
        </label>
        <input type="text" name="landmark" id="landmark" placeholder="Enter Landmark" required>
        <div class="row">
            <div class="col-sm-6">
                <label class="labelstyle pt-2">Pincode<span>*</span>
                </label>
                <input type="text" name="pincode" id="pincode" placeholder="Enter Pincode" required>
            </div>
            <div class="col-sm-6">
                <label class="labelstyle pt-2">City<span>*</span>
                </label>
                <input type="text" name="city" id="city" placeholder="Enter City" required>
                <input type="hidden" name="lat" id="lat" readonly>
                <input type="hidden" name="lng" id="lng" readonly>
            </div>

        </div>
        <button type="submit" name="btnSaveAddress" id="btnSaveAddress"
            class="loaderbtn btnfill btnfull mt-2">Continue</button>
</div>
</form>
<!--- Form end --->
