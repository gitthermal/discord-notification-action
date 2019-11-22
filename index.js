const github = require('@actions/github');
const core = require('@actions/core')
const axios = require('axios')

async function run() {
  try {
    const github_context = github.context.payload

    const discord_webhook_url = core.getInput('webhook_url', { required: true });
    const os = core.getInput('os', { required: true });
    const node_version = core.getInput('node_version', { required: true });
    const build_status = core.getInput('build_status');
    const workflow_name = core.getInput('workflow_name', { required: true });

    let build_status_color;
    if (build_status) {
      return build_status_color = 0x2cbe4e;
    } else {
      return build_status_color = 0xcb2431;
    }

    const commit_message = github_context.head_commit.message.split("\n\n")
    const commit_message_title = commit_message[0]
    const commit_message_description = commit_message[1]

    const data = {
      username: workflow_name,
      avatar_url: "https://i.imgur.com/u6mj8bs.png",
      embeds: [
        {
          title: commit_message_title,
          url: github_context.head_commit.url,
          description: !!commit_message_description ? commit_message_description : '',
          author: {
            name: github_context.sender.login,
            icon_url: github_context.sender.avatar_url,
            url: github_context.sender.html_url
          },
          color: !!build_status_color ? build_status_color : 0x202225,
          fields: [
            {
              name: "Branch",
              value: os
            },
            {
              name: "Commit ID",
              value: github_context.head_commit.id
            },
            {
              name: "OS",
              value: os,
              inline: true
            },
            {
              name: "Node version",
              value: node_version
            }
          ],
          timestamp: Date.now(),
          footer: {
            text: 'GitHub Action'
          }
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