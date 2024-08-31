{{-- <a onclick="navigate('student-details-sec','basic-details-sec');" href='#' class="backbtn"> Back</a> --}}

<div class="loginrightinner">
    <h3 class="pb-0 text-center mx-auto">Share your latest <br />educational details</h3>
    <p class="mt-0 text-center">You can add other educational details later from your profile.</p>
    <form name="blankform" id="blankform">
    </form>
    <!--- Form start --->
    <form class="form" id="studenteducationForm" name="studenteducationForm">
        <label class="labelstyle pt-2">Education <span>*</span>
        </label>
        <div class="select-arrow">
            <select class="field-select w-100" id="qualification_level_ref_no" name="qualification_level_ref_no">
                <option>Select your level of education</option>
            </select>
        </div>
        <label class="labelstyle pt-2">Qualification <span>*</span>
            <div class="float-right"><label class="lablecheckbox pxxssmall fnormal">
                    <input type="checkbox" name="pursuing" id="pursuing" onchange="hideEndyear()"> <span
                        class="chkboxspan"></span>
                    Pursuing</label></div>
        </label>
        <input type="text" placeholder="Enter your qualification" name="qualification" id="qualification_student">
        <label class="labelstyle pt-2">Name of University or College <span>*</span></label>
        <input type="checkbox" class="mb-2" id="other_student"> Other
        <div class="position-relative">
            <select class="search-select select_professional" name="institute_master_ref_no_student"
                id="institute_master_ref_no_student" required>
                <option value="">Select Name of University or College</option>
            </select>
        </div>
        <input type="text" name="other_institute_name_student" id="other_institute_name_student" style="display:none;"
            placeholder="Enter your institute name">

        <div class="row">
            <div class="col-sm-6 gender">
                <label class="labelstyle pt-2">Start Year <span>*</span></label>
                <div class="select-arrow">
                    <select class="field-select" name="start_year" id="start_year">
                        {{ $last = date('Y') - 100 }}
                        {{ $now = date('Y') }}
                        <option value="">Select start year</option>
                        @for ($i = $now; $i >= $last; $i--)
                            <option value="{{ $i }}">{{ $i }}</option>
                        @endfor
                    </select>
                </div>
            </div>

            <div class="col-sm-6 gender" id="end_year_div">
                <label class="labelstyle pt-2">End Year <span>*</span></label>
                <div class="select-arrow">
                    <select class="field-select" name="end_year" id="end_year">
                        {{ $last = date('Y') - 100 }}
                        {{ $now = date('Y') + 10 }}
                        <option value="">Select end year</option>
                        @for ($i = $now; $i >= $last; $i--)
                            <option value="{{ $i }}">{{ $i }}</option>
                        @endfor
                    </select>
                </div>
            </div>
        </div>

        <label class="labelstyle pt-2">Description <span>*</span></label>
        <textarea class="textarea" placeholder="Write your description here" rows="2" cols="20" name="description"
            id="description"></textarea>

        <button type="button" class="loaderbtn btnfill btnfull mt-2" id="btnSaveStudentEducation"
            onClick="saveStudentDetails();">Continue</button>

    </form>
    <!--- Form end  --->
</div>
