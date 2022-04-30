/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }
/*
const path = require("path");
const gmail = require("gmail-tester");

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // ...
  const path = require("path");
  const gmail = require("gmail-tester");
  const email = await gmail.check_inbox(
    path.resolve(__dirname, "credentials.json"), // Assuming credentials.json is in the current directory.
    path.resolve(__dirname, "token.json"), // Look for gmail_token.json in the current directory (if it doesn't exists, it will be created by the script).
    {
      subject: "Activate Your Account", // We are looking for 'Activate Your Account' in the subject of the message.
      from: "info@rebelbase.co", // We are looking for a sender header which is 'no-reply@domain.com'.
      to: "testhubadmin+2@nolej.com", // Which inbox to poll. credentials.json should contain the credentials to it.
      wait_time_sec: 10, // Poll interval (in seconds).
      max_wait_time_sec: 30, // Maximum poll time (in seconds), after which we'll giveup.
      include_body: true
    }
  );
  if (email) {
    console.log("Email was found!");
  } else {
    console.log("Email was not found!");
  }
  };
  */

  /// <reference types="Cypress" />
  const debug = require("debug");
  const path = require("path");
  
  const gmail_tester = require("gmail-tester");
  
  
  module.exports = (on, config) => {
    // on("before:browser:launch", (browser = {}, args) => {
    //   if (browser.name === "chrome") {
    //     args.push("--remote-debugging-port=9221");
    //     return args;
    //   }
    //});
    on("task", {
      "gmail:get-messages": async args => {
        const messages = await gmail_tester.get_messages(
          path.resolve(__dirname, "credentials.json"),
          path.resolve(__dirname, "token.json"),
          args.options
        );
        console.log(messages);
        return messages;
      }
    });
  
    on("task", { "setUserId": (val) => { return (userId = val); }});
  
    on("task", {"getUserId": () => { return userId; }});
  };


const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
