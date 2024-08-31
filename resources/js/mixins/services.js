import { profile } from '../path';
import requestMixin from "./request";

export default {
    mixins: [requestMixin],
    props: ["service_master_list"],
    data() {
        return {
            weekDays: ["S", "M", "T", "W", "TH", "F", "SA"],
            shifts: ['morning', 'afternoon', 'evening'],
            doctor_service_ref_no: '',
            service_master_ref_no: ''
        };
    },
    created() {
        this.fetchServiceMasterList();
    },
    methods: {
        fetchServiceMasterList() {
            this.$emit("fetchServiceMasterList");
        },
        addTimeSlots(service_master_ref_no, service_name) {
            $(".timeslotpage").modal("show");
            $(".week").each(function (index) {
                $(this).removeClass("active");
                var elementId = $(this).attr("id");
                $("#div" + elementId).hide();
            });

            $("#S").addClass("active");
            $("#divS").show();

            this.clearModalData();

            $(".modal-title input").attr("id", "chk_service_" + service_master_ref_no);
            $("#service_name").html(service_name);
            $("#service_master_ref_no").val(service_master_ref_no);

            this.fetchServiceDetails(service_master_ref_no);
        },
        async fetchServiceDetails(service_id) {

            this.$store.commit('showLoader', true);

            const response = await this.getRequest(profile.fetchDoctorServiceList + '?service_master_ref_no=' + service_id, this.headerConfig);

            this.doctor_service_ref_no = '';


            if (response.doctor_service_data != null) {

                // Fill speciality details
                var data = response.doctor_service_data;

                this.doctor_service_ref_no = data.doctor_service_ref_no;
                this.service_master_ref_no = data.service_master_ref_no;

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
            this.$store.commit('showLoader', false);
        },
        clearModalData() {

            $(".timeslotpage select").each(function () {
                $(this).val("");
            });

            $(".timeslotpage input").each(function () {
                $(this).val("");
            });

            $("#chk_apply").prop("checked", false);

            $.each(this.weekDays, function (index, v) {
                for (var i = 1; i < 3; i++) {
                    $.each(this.shifts, function (i1, v1) {
                        $("#" + v + "_" + v1 + "_sec_" + i).hide();
                    });
                }
            });
        },
        closeModal() {
            $('.timeslotpage').modal('hide');
            $('#select-services-sec').show();
        },
        selectDay(element) {
            let elementId = '';
            $('.week').each(function () {
                $(this).removeClass('active');
                elementId = $(this).attr('id');
                $('#div' + elementId).hide();
            });

            $(element.target).addClass('active');
            elementId = $(element.target).attr('id');
            $('#div' + elementId).show();

        },
        addRow(event) {

            var event_id = event.target.id.split('_');
            var shift = event_id[4];
            var parent_div = event_id[0];
            var id = parent_div + '_' + shift;

            if ($("#" + id + "_sec_1").is(":visible") && this.validateRow(1, id)) {
                $("#" + id + "_sec_2").show();
                $(event.target).prop('disabled', true);
            }
            else if (this.validateRow(0, id)) {
                $("#" + id + "_sec_1").show();
            }

        },
        validateRow(row_num, id) {
            if ($("#" + id + "_from_time_" + row_num).val() == '' ||
                $("#" + id + "_to_time_" + row_num).val() == '') {
                this.$toast.error('Please add time for exising row');
                return false;
            }
            return true;
        },
        removeRow(event, row_count) {

            var event_id = event.target.id.split('_');
            var shift = event_id[3];
            var parent_div = event_id[0];
            var id = parent_div + "_" + shift;

            $("#" + id + "_sec_" + row_count).hide();
            $("#" + id + "_from_time_" + row_count).val('');
            $("#" + id + "_to_time_" + row_count).val('');
            $("#" + parent_div + "_btn_add_more_" + shift).prop('disabled', false);
        },
        validateTimeRange(event) {

            let _me = this;
            var from_time = event.target.value.split(' ');
            var event_id = event.target.id.split('_');

            var parentDiv = event_id[0];
            var shift = event_id[1];
            var row = event_id[4];

            $('#div' + parentDiv + ' .' + shift + '-from-time').each(function () {

                if (parseInt($(this).val()) == parseInt(from_time[0]) && event.target.id != $(this).attr('id')) {
                    _me.$toast.error('Already selected');
                    event.target.value = '';
                    from_time = '';
                    return;
                }
            });

            if (!this.validateToTime(event)) {
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

        },
        validateToTime(event, j = 0) {
            let _me = this;
            var to_time = event.target.value.split(' ');
            var event_id = event.target.id.split('_');

            var parentDiv = event_id[0];
            var shift = event_id[1];

            var f = '';
            var t = '';
            var flag = true;


            if (j == 1) {
                $('#div' + parentDiv + ' .' + shift + '-to-time').each(function () {

                    //console.log(parseInt($(this).val()) + '-----' + parseInt(to_time[0]));
                    if (parseInt($(this).val()) == parseInt(to_time[0]) && event.target.id != $(this).attr('id')) {
                        _me.$toast.error('Already selected');
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
                        _me.$toast.error('Invalid selection');
                        event.target.value = '';
                        flag = false;
                        break;
                    }
                }
                if (!flag) {
                    return false;
                }
            });
            return flag
        },
        applyTimeSlots() {
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
        },
        async saveServices() {

            var _me = this;

            // Check validation for fees. Fees should not be empty

            //var shifts = ['morning', 'afternoon', 'evening']

            if ($('#fees').val() == '') {
                this.$toast.error('Please add fees');
                return;
            }

            this.$store.commit("showLoader", true);

            var list = {};
            var time_slots = {};
            time_slots['days'] = [];
            var is_time_slot_added = false;

            // Generate time slot json - Start

            $.each(_me.weekDays, function (index, value) {

                time_slots['days'][index] = { 'day': value };

                $.each(_me.shifts, function (is, vs) {

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
                var selected_day = $('#weekmain .active');
                var selected_day_id = selected_day.attr('id');
                var weekday_index = Object.keys(_me.weekDays).find(key => _me.weekDays[key] === selected_day_id);
                console.log(selected_day_id);
                $.each(_me.weekDays, function (i, v) {
                    if (weekday_index != i) {
                        time_slots['days'][i] = { 'day': v };
                         
                        $.each(_me.shifts, function (i1, v1) {
                            time_slots['days'][i][v1] = time_slots['days'][weekday_index][v1];
                        });
                    }
                });
            }
            // Update time slot json if apply for all days checkbox checked - End

            // Add post vlues in list

            if (this.doctor_service_ref_no != '') {
                list.doctor_service_ref_no = this.doctor_service_ref_no;
            }
            list.service_master_ref_no = this.service_master_ref_no;
            list.fees = $('#fees').val();
            list.time_slots = time_slots;
            list.status = 0;
            if ($('#chk_service_' + this.service_master_ref_no).prop("checked")) {
                list.status = 1;
            }

            // Check for mandatory time slot

            if (!is_time_slot_added) {
                this.$toast.error('One time slot is required to add the service');
                this.$store.commit("showLoader", false);
                return;
            }

            // API call for save
            await this.postRequest(profile.saveDoctorServiceDetails, { "service_data": JSON.stringify(list) });

            this.$store.commit("showLoader", false);
            this.$toast.success('Service updated successfully')
        }
    },
};
