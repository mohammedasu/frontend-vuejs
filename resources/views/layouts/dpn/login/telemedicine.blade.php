
<!-- The Modal Popup Telemedicine Slots start -->
<div class="modal fade timeslotpage" id="timeslotmodal">
    <div class="modal-dialog">
        <div class="modal-content modal-lg">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">
                    <span id="service_name"></span>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeModal();">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="scrollbarpan">
                <div class="modal-body">
                    <form class="form select-timeicon">
                        <div class="d-flex">
                            <div>
                                <label class="labelstyle inlinelable fees">Fees</label>
                            </div>
                            <div>
                                <input type='text' name="fees" id="fees" class="w100" placeholder="Enter Fees" required />
                            </div>
                        </div>
                        <h6>Select Week</h6>
                        <div id="weekmain">
                            @foreach($weekDays as $index=>$day)
                            @if($index == 0)
                            <button type="button" id="{{$day}}" name="{{$day}}" class="week active" onclick="selectDay(this);">{{$day}}</button>
                            @else
                            <button type="button" id="{{$day}}" name="{{$day}}" class="week" onclick="selectDay(this);">{{$day}}</button>
                            @endif
                            @endforeach
                        </div>

                        @foreach($weekDays as $index=>$day)
                        @if($index == 0)
                        <div id="div{{$day}}">
                            @include('layouts.dpn.login.time-slots')
                        </div>
                        @else
                        <div id="div{{$day}}" style="display: none;">
                            @include('layouts.dpn.login.time-slots')
                        </div>
                        @endif
                        @endforeach

                        <input id="service_master_ref_no" type="hidden" />

                        <label class="lablecheckbox" style="margin:0px">
                        <input type="checkbox" name="chk_apply" id="chk_apply" onClick="applyTimeSlots()"> <span class="chkboxspan"></span> Do you want to use same time slots for all days?</label>
                        <button type="button" name="btnSaveService" id="btnSaveService" class="loaderbtn btnfill btnfull mt-3 mb-1" onClick="saveServices($('#service_master_ref_no').val());">Save</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
