function showErrorMessage(message = '') {

    if (!message) {
        message = 'Something went wrong. Please try again.';
    }
    $('.popupalertbg').show();
    $('#messageIcon').removeClass('successiconsm');
    $('#messageIcon').addClass('erroriconsm');
    $('#message').html(message);
    setTimeout(function () {
        hideMessageDiv();
    }, 5000);
}

function showSuccessMessage(message) {
    $('.popupalertbg').show();
    $('#messageIcon').removeClass('erroriconsm');
    $('#messageIcon').addClass('successiconsm');
    $('#message').html(message);
    setTimeout(function () {
        hideMessageDiv();
    }, 5000);
}

function hideMessageDiv() {
    $('.popupalertbg').hide();
    $('#messageIcon').removeClass('erroriconsm');
    $('#messageIcon').removeClass('successiconsm');
    $('#message').html('');
}
function showLoader(id) {
    var $this = $('#' + id);
    $this.attr('disabled',true);
    var loadingText = '<i class="loader"></i> loading...';
    if ($this.html() !== loadingText) {
        $this.data('original-text', $this.html());
        $this.html(loadingText);
    }
}

function hideLoader(id) {
    var $this = $('#' + id);
    $this.attr('disabled',false);
    $this.html($this.data('original-text'));
}

function showPageLoader(){
    $('.pageloader').show();
}

function hidePageLoader(){
    $('.pageloader').hide();
}
