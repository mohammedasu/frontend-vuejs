let doctor_service_ref_no = '';
let weekdays = ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'];

function addRow(event) {

    var event_id = event.target.id.split('_');
    var shift = event_id[4];
    var parent_div = event_id[0];
    var id = parent_div + '_' + shift;

    if ($("#" + id + "_sec_1").is(":visible") && validateRow(1, id)) {
        $("#" + id + "_sec_2").show();
        $(event.target).prop('disabled', true);
    }
    else if (validateRow(0, id)) {
        $("#" + id + "_sec_1").show();
    }

}

function validateRow(row_num, id) {
    if ($("#" + id + "_from_time_" + row_num).val() == '' ||
        $("#" + id + "_to_time_" + row_num).val() == '') {
        alert('Please add time for exising row');
        return false;
    }
    return true;
}

function removeRow(event, row_count) {

    var event_id = event.target.id.split('_');
    var shift = event_id[3];
    var parent_div = event_id[0];
    var id = parent_div + "_" + shift;

    $("#" + id + "_sec_" + row_count).hide();
    $("#" + id + "_from_time_" + row_count).val('');
    $("#" + id + "_to_time_" + row_count).val('');
    $("#" + parent_div + "_btn_add_more_" + shift).prop('disabled', false);
}

function fetchServiceDetails(service_id) {

    showPageLoader();

    var ajax_request = getRequest(api_doctor.fetchdoctorservicelist, { service_master_ref_no: service_id });

    doctor_service_ref_no = '';

    ajax_request.done(function (response) {

        if (response.success == true) {
            if (response.data.doctor_service_data != null) {

                // Fill speciality details
                var data = response.data.doctor_service_data;

                doctor_service_ref_no = data.doctor_service_ref_no;
                $('#fees').val(data.fees);
                if (data.status == 1) {
                    $('#chk_service_' + data.service_master_ref_no).prop('checked', true);
                }
                else {
                    $('#chk_service_' + data.service_master_ref_no).prop('checked', false);
                }

                var a = data.time_slots;
                $.each(a.days, function (i1, v1) {
                    var day = v1.day;
                    $.each(v1, function (i2, v2) {
                        if (i2 !== 'day') {
                            $.each(v2, function (i3, v3) {
                                var time = (v3['time']).split("-");
                                if (i3 >= 1 && i2 == 'morning' && time[0] != '') {
                                    $("#" + day + "_morning_sec_" + i3).show();
                                }
                                if (i3 >= 1 && i2 == 'afternoon') {
                                    $("#" + day + "_afternoon_sec_" + i3).show();
                                }
                                if (i3 >= 1 && i2 == 'evening') {
                                    $("#" + day + "_evening_sec_" + i3).show();
                                }
                                //console.log(day + "--" + time);
                                $("#" + day + "_" + i2 + "_from_time_" + i3).val(time[0]);
                                $("#" + day + "_" + i2 + "_to_time_" + i3).val(time[1]);
                            });
                        }
                    });
                });
            }
            hidePageLoader();
        }
        else {
            showErrorMessage(response.message);
            hidePageLoader();
        }
    });
    ajax_request.fail(function (err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}
function clearModalData() {

    var shift = ['morning', 'afternoon', 'evening'];

    $('.timeslotpage select').each(function () {
        $(this).val('');
    });

    $('.timeslotpage input').each(function () {
        $(this).val('');
    });

    $('#chk_apply').prop('checked',false);

    $.each(weekdays, function (i, v) {
        for (var i = 1; i < 3; i++) {
            $.each(shift, function (i1, v1) {
                $('#' + v + '_' + v1 + '_sec_' + i).hide();
            });
        }
    });
}
function fetchServiceMasterList() {
    showPageLoader();
    var ajax_request = getRequest(api_master.fetchservicemasterlist);

    ajax_request.done(function (response) {

        if (response.success == true) {

            var html = '';
            $.each(response.data.service_data, function (index, value) {
                html += '<div class="checkmain" onClick=addTimeSlots("' + value.service_master_ref_no + '","' + value.service_name + '")>';
                // html += '<input type = "checkbox" name = "timeslot" id = "' + value.service_master_ref_no + '" value = "' + value.service_name + '"/>';
                html += '<label for="' + value.service_master_ref_no + '"><img id="img_' + value.service_master_ref_no + '" src="assets/img/clock.svg"> ' + value.service_name + '</label>';
                html += '</div>';
            });
            $('#serviceList').html(html);
            //fetchServiceDetails();
            hidePageLoader();
        }
        else {
            showErrorMessage(response.message);
            hidePageLoader();
        }
    });
    ajax_request.fail(function (err) {
        showErrorMessage(err.responseJSON.message);
        hidePageLoader();
    });
}
function validateServices() {
    var is_service_cheked = false;
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            is_service_cheked = true;
            console.log($(this).val());
        }
    });
    if (!is_service_cheked) {
        showErrorMessage('Please select atleast one service to continue');
        return;
    }
}

function saveServices(service_id) {

    // Check validation for fees. Fees should not be empty

    if ($('#fees').val() == '') {
        showErrorMessage('Please add fees');
        return;
    }

    showLoader('btnSaveService');

    var weekdays = ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'];
    var shift = ['morning', 'afternoon', 'evening'];

    var list = {};
    var time_slots = {};
    time_slots['days'] = [];
    var is_time_slot_added = false;

    // Generate time slot json - Start

    $.each(weekdays, function (index, value) {

        time_slots['days'][index] = {};
        time_slots['days'][index] = { 'day': value };
        $.each(shift, function (is, vs) {

            var from_time = [];
            var to_time = [];

            $("#div" + value + " ." + vs + "-from-time").each(function () {
                if ($(this).val() != '') {
                    from_time.push($(this).val());
                }
            });

            $("#div" + value + " ." + vs + "-to-time").each(function () {
                if ($(this).val() != '') {
                    to_time.push($(this).val());
                }
            });

            time_slots['days'][index][vs] = [];

            $.each(from_time, function (itime, vt) {
                if (vt != '' && to_time[itime] != '') {
                    time_slots['days'][index][vs].push({ 'time': vt + "-" + to_time[itime] });
                    is_time_slot_added = true;
                }
            });
        });
    });
    // Generate time slot json - End

    // Update time slot json if apply for all days checkbox checked - Start
    if ($('#chk_apply').prop("checked")) {
        var selected_day = $('.active');
        var selected_day_id = selected_day.attr('id');
        var weekday_index = Object.keys(weekdays).find(key => weekdays[key] === selected_day_id);

        $.each(weekdays, function (i, v) {
            if (weekday_index != i) {
                time_slots['days'][i] = { 'day': v };
                $.each(shift, function (i1, v1) {
                    time_slots['days'][i][v1] = time_slots['days'][weekday_index][v1];
                });
            }
        });
    }
    // Update time slot json if apply for all days checkbox checked - End


    // Add post vlues in list

    if (doctor_service_ref_no != '') {
        list.doctor_service_ref_no = doctor_service_ref_no;
    }
    list.service_master_ref_no = service_id;
    list.fees = $('#fees').val();
    list.time_slots = time_slots;
    list.status = 0;
    if ($('#chk_service_' + service_id).prop("checked")) {
        list.status = 1;
    }


    // Check for mandatory time slot

    if (!is_time_slot_added) {
        showErrorMessage('One time slot is required to add the service');
        hideLoader('btnSaveService');
        return;
    }


    // API call for save
    
    var api = api_doctor.savedoctorservicedetails;

    var ajax_request = postRequest(api, { "service_data": JSON.stringify(list) });

    ajax_request.done(function (response) {

        hideLoader('btnSaveService');

        if (response.success == true) {

            $('#timeslotmodal').modal('hide');
            $('#select-services-sec').show();
            showSuccessMessage(response.message);
        }
        else {
            showErrorMessage(response.message);
        }
    });
    ajax_request.fail(function (err) {
        showErrorMessage(err.responseJSON.message);
        hideLoader('btnSaveService');
    });
}

function addTimeSlots(id, name) {
    $('#timeslotmodal').modal('show');
    $('.week').each(function (index) {
        $(this).removeClass('active');
        var elementId = $(this).attr('id');
        $('#div' + elementId).hide();
    });

    $('#S').addClass('active');
    $('#divS').show();

    clearModalData();

    $('.modal-title input').attr('id', 'chk_service_' + id);
    $('#service_name').html(name);
    $('#service_master_ref_no').val(id);

    fetchServiceDetails(id);
}

function validateTimeRange(event) {

    var from_time = event.target.value.split(' ');
    var event_id = event.target.id.split('_');

    var parentDiv = event_id[0];
    var shift = event_id[1];
    var row = event_id[4];

    $('#div' + parentDiv + ' .' + shift + '-from-time').each(function () {

        if (parseInt($(this).val()) == parseInt(from_time[0]) && event.target.id != $(this).attr('id')) {
            showErrorMessage('Already selected f');
            event.target.value = '';
            from_time = '';
            return;
        }
    });

    if (!validateToTime(event)) {
        return;
    }


    $('#' + parentDiv + '_' + shift + '_to_time_' + row).val('');

    $('#' + parentDiv + '_' + shift + '_to_time_' + row + ' option').each(function () {
        $(this).prop('disabled', false);

        if ($(this).val() != '' && parseInt($(this).val()) <= parseInt(from_time[0])) {
            $(this).prop('disabled', true);
        }
        if (from_time != '') {
            //$(this).prop('selected', true);
        }
    });

}

function validateToTime(event, j = 0) {
    var to_time = event.target.value.split(' ');
    var event_id = event.target.id.split('_');

    var parentDiv = event_id[0];
    var shift = event_id[1];

    var f = '';
    var t = '';
    var flag = true;
    var k = '';


    if (j == 1) {
        $('#div' + parentDiv + ' .' + shift + '-to-time').each(function () {

            //console.log(parseInt($(this).val()) + '-----' + parseInt(to_time[0]));
            if (parseInt($(this).val()) == parseInt(to_time[0]) && event.target.id != $(this).attr('id')) {
                showErrorMessage('Already selected');
                event.target.value = '';
                return false;
            }
        });
    }

    $('#div' + parentDiv + ' .' + shift + '-from-time').each(function () {
        var element_id = $(this).attr('id').split('_');

        if ($(this).val() != '') {
            f = $(this).val().split(' ');
        }

        if ($('#' + parentDiv + '_' + shift + '_to_time_' + element_id[4]).val() != '') {
            t = $('#' + parentDiv + '_' + shift + '_to_time_' + element_id[4]).val().split(' ');
        }

        for (var i = parseInt(f[0]); i < parseInt(t[0]); i++) {
            //console.log(i + '@@' + parseInt(to_time[0]));
            if (i == parseInt(to_time[0]) && parseInt(f[0]) != parseInt(to_time[0])) {
                showErrorMessage('Invalid selection');
                event.target.value = '';
                flag = false;
                return;
            }
        }
        if (!flag) {
            return;
        }
    });
    return flag
}

function selectDay(element) {
    $('.week').each(function () {
        $(this).removeClass('active');
        var elementId = $(this).attr('id');
        $('#div' + elementId).hide();
    });

    $(element).addClass('active');
    elementId = $(element).attr('id');
    $('#div' + elementId).show();

}

function applyTimeSlots() {
    var selected_element = $('.active');
    var disable_flag = false;

    if ($('#chk_apply').prop("checked")) {
        disable_flag = true;
    }

    $('.week').each(function () {
        $(this).removeClass('active');
        var elementId = $(this).attr('id');
        $('#' + elementId).prop('disabled', disable_flag);
    });

    selected_element.prop('disabled', false);
    selected_element.addClass('active');
}

function continueService() {
    //validateServices();
    $('#select-services-sec').hide();
    $('#address-details-sec').show();
    fetchUserAddressDetails();
}
function closeModal() {
    $('#timeslotmodal').modal('hide');
    $('#select-services-sec').show();
}
