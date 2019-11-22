const github = require('@actions/github');
const core = require('@actions/core')
const axios = require('axios')

async function run() {
  try {
    console.log("github.context");
    console.log(github.context);
    const github_context = github.context.payload

    const discord_webhook_url = core.getInput('webhook_url', { required: true });

    const os = core.getInput('os', { required: true });
    const node_version = core.getInput('node_version', { required: true });

    console.log(github_context.head_commit.message.split("\n\n"))

    const data = {
      content: "Hello world!",
      username: "GitHub Actions",
      avatar_url: "https://i.imgur.com/u6mj8bs.png",
      embeds: [
        {
          title: github_context.head_commit.message,
          url: `https://www.github.com/${github_context.repository.organization}/${github_context.repository.name}/commit/${github_context.head_commit.id}`,
          fields: [
            {
              name: "OS",
              value: os
            },
            {
              name: "Node version",
              value: node_version
            }
          ]
        }
      ]
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