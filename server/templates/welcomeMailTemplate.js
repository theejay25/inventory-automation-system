export const welcomemailTemplate = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="
            background-color: #1c1c1c;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
        ">
    <div style="
        background-color: #1a1a1a;
        height:56vh;
        width: 20vw;
        border: 7px solid #333;
    ">
        <nav style="
            height: 10vh;
            padding-top: 1px;
            padding-bottom: 1px;
            border-bottom: 2px solid #333;
        ">
            <h1 style="
                    color: #d1d1d1;
                    font-weight: bold;
                    text-align: center;
                    font-family: sans-serif;
                ">Welcome To The Team
            </h1>
        </nav>

        <div style="
            height: 82%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
            font-family: sans-serif;
            padding-left: 1px;
            padding-right: 1px;
            color: #fff;
            font-size: 15px;
        ">
            <h2>Welcome aboard!</h2>
            <p>Hi there, {email}</p>
            <p>
                We’re thrilled to have you join us! 🚀<br>
                Get ready for a journey filled with learning, collaboration, and a little bit of fun along the way.
            </p>
            <p>
                If you have any questions, don’t hesitate to reach out.<br>
                Let’s make something amazing together!
            </p>
            <p>
                 Cheers,<br>
            <strong>The Team</strong>
            </p>
        </div>
    </div> 
</body>
</html>
`