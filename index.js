const core = require('@actions/core')
const discord_webhook = require('./webhook')

async function run() {
  try { 
    const discord_webhook_url = core.getInput('webhook_url', { required: true });

    console.log(discord_webhook_url);
    discord_webhook(discord_webhook_url)

  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()