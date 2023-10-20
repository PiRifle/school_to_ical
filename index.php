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
        <center style="margin:80px">
            <h3>Provide your Optivum school plan link</h3>
            <form action="confirm.php" method="POST">
                <div class="row">
                    <input id="input_plan_link" type="text" style="display: block" placeholder="e.g. https://plan.elektryk.opole.pl/" name="plan_url" class="two-thirds column" required>
                    <select id="input_class" style="display: block" class="one-third column" name="class" required>
                    </select>
                </div>
                <h5 id="verify" style="display:none">Verify your plan</h5>
                <div id="preview"></div>
                <button id="submit_plan" type="submit" style="display:none">Get your plan!</button>
            </form>
        </center>
    </div>
</body>
<script>
    let lessonPlan = null;
    const classes = document.querySelector("#input_class");

    async function onPlanInput(e){
        if (!e.target.value) return;
        let url = new URL("api/classes.php", document.location);
        url.searchParams.append("plan_url", e.target.value);
        const res = await fetch(url)
        if (!(res.status > 199 && res.status < 299)) alert("error fetching website, check link before proceeding");
        
        lessonPlan = e.target.value;
        classes.innerHTML = "";
        (await res.json()).forEach(a=>{
            console.log(a)
            const option = document.createElement("option")
            option.value = a
            option.text = a
            classes.appendChild(option)
        })
       
    }

    async function onClassSelect(e){
        if (!e.target.value) return;
        let url = new URL("api/lesson_plan.php", document.location);
        url.searchParams.append("plan_url", lessonPlan);
        url.searchParams.append("class", e.target.value);
        const res = await fetch(url)
        if (!(res.status > 199 && res.status < 299)) alert("error fetching website, check link before proceeding");
        
        document.querySelector("#preview").innerHTML = await res.text()
        document.querySelector("#submit_plan").style.display = "block";
        document.querySelector("#verify").style.display = "block";
        

    }

    document.querySelector("#input_plan_link").addEventListener("blur", onPlanInput)
    document.querySelector("#input_class").addEventListener("change", onClassSelect)
    
</script>
</html>