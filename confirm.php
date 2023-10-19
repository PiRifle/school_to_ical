<?php
require dirname(__FILE__) ."/vendor/autoload.php";
use function GuzzleHttp\Psr7\build_query;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
</head>

<body>
    <div class="container">
        <center>
            <h1 style="padding-top: 20px; display: inline-block"><b>Vulcan Optivum To iCal</b></h1>
            <span>by PRFL</span>
        </center>
        <hr>
        <h3>Your plan link is here!</h3>
        <div class="row">
            <div class="two-thirds column"><input type="text" style="width: 100%" class="link"/></div>
            <div class="one-third column"><a class="s_link"><button>Download Plan</button></a></div>
        </div>
    </div>
</body>
<script>
    const url = new URL("<?php echo "generate_calendar.php?".build_query($_POST)?>", window.location);
    // console.log(url)
    document.querySelector(".link").value = url
    document.getElementsByClassName("link")[0].select()
    document.querySelector(".s_link").setAttribute("href", url)
</script>
</html>