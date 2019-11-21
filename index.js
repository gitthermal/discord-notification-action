const core = require('@actions/core')
const axios = require('axios')

async function run() {
  try { 
    const discord_webhook_url = core.getInput('webhook_url', { required: true });

    const data = {
      content: "Hello world!"
    };

    axios.post(discord_webhook_url, data)
      .then(function (response) {
        console.log("**Notified!**");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()