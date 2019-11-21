const webhook = (url, data) => {
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader(
    "Content-type",
    "application/json; charset=UTF-8"
  );
  xmlhttp.send(JSON.stringify(data));
}