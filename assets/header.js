// OrangeNutritiousBackups
// Source: https://stackoverflow.com/a/70488082

/*
Code that includes the header from this file
(doesn't update site icon for some reason)
<header id="header"></header>
<script async src="header.js"></script>
*/

let header = `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Welcome</title>
  <link href="style.css" rel="stylesheet" type="text/css">
  <link href="hey.png" rel="icon">
</head>
`;
document.getElementById("header").innerHTML = header;