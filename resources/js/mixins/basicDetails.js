import Datepicker from "vuejs-datepicker";
import Cropper from "cropperjs";

export default {
    props: ["basic_details", "country_codes"],
    components: {
        Datepicker
    },
    data() {
        return {
            selectedFile: "",
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            isInitialized: false,
            cropper: ""
        };
    },
    methods: {
        initCropper() {
            let image = document.getElementById("crop_user_image");
            this.cropper = new Cropper(image, {
                aspectRatio: 16 / 16,
                viewMode: 1,
                dragMode: "move",
                minContainerWidth: 260,
                minContainerHeight: 260,
                responsive: true,
                modal: true
            });
            this.isInitialized = true;
        },
        cropImage() {
            let imgurl = this.cropper.getCroppedCanvas().toDataURL("image/jpg");
            $("#user_image").attr("src", imgurl);
            $("#crop_photo").modal("hide");
            $("#change_photo").modal("hide");
            this.selectedFile = imgurl;
        },
        readURL(event) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();

                var size = parseFloat(
                    event.target.files[0].size / 1024 / 1024
                ).toFixed(2);
                if (size > 20) {
                    showErrorMessage("Maximum allowed size (20MB) exceeded");
                    return;
                }

                reader.onload = function(e) {
                    $("#crop_user_image").attr("src", e.target.result);
                    //$("#user_image").attr("src", e.target.result);
                };
                if (this.isInitialized) {
                    this.cropper.destroy();
                }
                reader.readAsDataURL(event.target.files[0]);
                //this.selectedFile = event.target.files[0];
                setTimeout(this.initCropper, 500);
                $("#change_photo").modal("hide");
                $("#crop_photo").modal("show");
            }
        },
        openImageUpload() {
            if (this.isCameraOpen) {
                this.stopCameraStream(true);
            }
            $("#div_camera").hide();
            $(".camera-shoot").hide();
            $("#pic").trigger("click");
        },
        toggleCamera() {
            this.isCameraOpen = true;
            this.createCameraElement();
        },
        createCameraElement() {
            this.isLoading = true;

            const constraints = (window.constraints = {
                audio: false,
                video: true
            });

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    this.isLoading = false;
                    alert(
                        "May the browser didn't support or there is some errors."
                    );
                });
        },
        takePhoto() {
            if (!this.isPhotoTaken) {
                this.isShotPhoto = true;

                const FLASH_TIMEOUT = 50;

                setTimeout(() => {
                    this.isShotPhoto = false;
                }, FLASH_TIMEOUT);
            }

            this.isPhotoTaken = !this.isPhotoTaken;
            $("#camera").hide();
            $("#canvas").show();

            const context = this.$refs.canvas.getContext("2d");
            context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
            this.stopCameraStream(true);
            $("#change_photo").modal("hide");
            $("#crop_photo").modal("show");
        },
        stopCameraStream(is_captured = false) {
            this.isCameraOpen = false;
            this.isPhotoTaken = false;
            this.isShotPhoto = false;
            let tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
            if (is_captured) {
                this.displayAsImage();
            }
        },
        displayAsImage() {
            var imgURL = document
                .getElementById("photoTaken")
                .toDataURL("image/jpg");
            $("#crop_user_image").attr("src", imgURL);
            if (this.isInitialized == true) {
                this.cropper.destroy();
            }
            +setTimeout(this.initCropper, 500);
            //$("#user_image").attr("src", imgURL);
            //this.selectedFile = imgURL;
        },
        closeModal() {
            if (this.isCameraOpen) {
                this.stopCameraStream(false);
            }
            $("#change_photo").modal("hide");
        },
        saveBasicDetails() {
            this.$emit("saveBasicDetails", this.$refs, this.selectedFile);
        }
    }
};
