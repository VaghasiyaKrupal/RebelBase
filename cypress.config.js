const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1536,
  defaultCommandTimeout: 100000,
  scrollBehavior: 'nearest',
  video: true,
  responseTimeout: 300000,
  requestTimeout: 300000,
  runMode: 3,
  env: {
    'section-bluepring':
      'https://core-service.dev.rebelbase.co/api/v2/rebel/challenge-builder/section-blueprints',
    teamMate1:
      'https://core-service.dev.rebelbase.co/api/v2/public/projects/teammates/1511',
    teamMate2:
      'https://core-service.dev.rebelbase.co/api/v2/public/projects/teammates/1024',
    firstName: 'test',
    lastName: 'hubadmin',
    username: 'testhubadmin@rebelbase.co',
    password: 'testtest',
    sanityuser: 'msuryawanshi@rebelbase.co',
    sanitypassword: 'manoj@1234',
    sanityuser1: 'msuryawanshi@rebelbase.co',
    sanitypassword1: 'Akhada@12345',
    invalidEmail: 'testhubadmin@re',
    hub_token:
      'gH6WDtINIjxD1syVvD031pbg0ZnNihZamjhkF6ZkUMDp95DSZK-3yquEVCMI-kI4',
    token1: '-KNHrjgk5WcRka8xnorJ_gck1VXsMWKvSgwusZWHob5Aytar__vppUPVcW6LQd1p',
    token2: 'xWqeN7jF4SANHLNL3ruta_e3ShbtGKUUcY',
    projectinvitation:
      '8W8nXaHI3XR3uiuQsvLGBD6wKd-Q8aFR89z5rndKM8WpApPWtDOavNExiMSRkFu1',
    hubinvitation:
      'UZGxZ2ju0hSiCxfr_iyp3H45pTKcezNj4yzs7btuXzZHJ7Oj5N8EXn7YUrOFZIz5',
    eventinvitation:
      'y1gjPapIDzsjzE5cWqCFQKGs-hSzWuxqDhJn6Fmeba5KbkZeJKVKyZI_ylcdRBgh',
    testProject: 1251,
    pageLoadTimeout: 300000,
    username1: 'testhubadmin+1@rebelbase.co',
    member: 'testhubadmin+2@rebelbase.co',
    username2: 'testhubadmin+3@rebelbase.co',
    otherUser: 'testhubadmin+4@rebelbase.co',
    supporter: 'testhubadmin+5@rebelbase.co',
    eventMember: 'testhubadmin+6@rebelbase.co',
    emailuser: 'rebelbasetesthub@gmail.com',
    groupname: 'cypressautomationgroup',
    hubmemberonly: 'testhubadmin+11@rebelbase.co',
    rebelbasemember: 'rebelbasetesthub+2@gmail.com',
  },
  projectId: '9zvwcb',
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://app.dev.rebelbase.co',
    experimentalSessionAndOrigin: true,
    specPattern: 'cypress/integration/**/*.feature',
  },
})
