const core = require('@actions/core')

async function run() {
  try { 
    const discord_webhook_url = core.getInput('webhook_url', { required: true });

    console.log(discord_webhook_url);

    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    xmlhttp.send(JSON.stringify({
      content: "Hello world!"
    }));

  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()