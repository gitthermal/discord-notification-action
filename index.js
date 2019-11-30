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
      build_status_color = 0x2cbe4e
    } else {
      build_status_color = 0xcb2431
    }

    const commit_message = github_context.head_commit.message

    console.log("Log commit message");
    console.log(commit_message);

    console.log("Log build status color");
    console.log(build_status_color);

    const data = {
      username: workflow_name,
      avatar_url: "https://i.imgur.com/u6mj8bs.png",
      embeds: [
        {
          title: commit_message,
          url: github_context.head_commit.url,
          author: {
            name: github_context.sender.login,
            icon_url: github_context.sender.avatar_url,
            url: github_context.sender.html_url
          }
        }
      ]
    };

    axios({
      method: "post",
      url: discord_webhook_url,
      responseType: 'json',
      data
    })
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