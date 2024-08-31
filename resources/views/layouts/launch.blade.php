<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<title>DocsCampus</title>
	<link rel="icon" href="assets/img/favicon.ico" type="image/x-icon" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />

	<!-- Font CSS -->
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
	<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
<style>
body{ background-color:#fff; margin:0; padding:0px;}
.btnfill {cursor: pointer;display:block;border-radius: 4px;font-family: 'Poppins', sans-serif;font-weight: 600;font-size:2.875rem;padding: .5rem 1rem;margin: 1.5rem auto;
width:560px;color: #fff;box-shadow: 0 0 6px 0 rgb(157 96 212 / 50%);border: solid 2px transparent;background: linear-gradient(180.25deg, #4456a6 0.62%, #6545A5 100%);
background-origin: border-box;box-shadow: none;text-align:center;text-decoration:none;}
.btnfill:hover {color: #4456a6;border: solid 2px #4456a6;background: transparent;
}
</style>

</head>
<body>
	<div class="launch_div" style="display: flex;align-items: center;justify-content: center;height: 100vh;">
		<div>
			<div style="margin:0 auto; display:block; text-align:center;"><img src="assets/img/big-logo.png" alt=""/></div><br><br>
			<a href="javascript:void(0);" class="loaderbtn btnfill btnfull mt-3" id="launch_div">Launch Docscampus</a>
		</div>
	</div>

    <div class="launch_video_div" style="display:none;">
        <video id="vid" width="100%" style="height:98vh;" controls>
            <source src="assets/video/awesome-product-launch.mp4" type="video/mp4">
        </video>
    </div>

    <script>
        $(document).on('click','#launch_div', function() {
            $('.launch_div').hide();
            $('.launch_video_div').show();
            var vid = document.getElementById('vid');
            vid.play();
            if (vid.requestFullScreen) {
                vid.requestFullScreen();
            } else if (vid.webkitRequestFullScreen) {
                vid.webkitRequestFullScreen();
            } else if (vid.mozRequestFullScreen) {
                vid.mozRequestFullScreen();
            }

            setTimeout(() => {
                window.location.href="https://docscampus.com";
            }, 32000);
        });
    </script>
</body>
</html>