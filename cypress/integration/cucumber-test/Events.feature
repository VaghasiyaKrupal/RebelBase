Feature: Event
  @TEST_CH-1279
  Scenario: Event details can be seen without login to application
    Given Visit rebelbase event page
    When Verify event title
    And Verify competitor is visible
    Then Verify participants

  Scenario: Create Assesment type event
    Given Navigate rebelbase and login
    When Visit event page
    And Create Assesment type event
    Then Verify Assesment event title

  Scenario: Create meet-up type event
    Given Navigate rebelbase and login
    When Visit event page
    And Create meet-up type event
    Then Verify meet-up event title

  Scenario: Create compitition type event
    Given Navigate rebelbase and login
    When Visit event page
    And Create compitition type event
    Then Verify compitition event title

  @TEST_CH-868
  Scenario: Create event and invite members
    Given Login to rebelbase portal
    When Visit event page
    And Create new event
    And Inviting member to the event
    Then Update event

  @TEST_CH-869
  Scenario: Add event description, Edit event details, Add post, File upload
    Given Login to the rebelbase portal
    When Go to the event page
    And Add event description
    And Add sponsor and upload file
    And Add post in event
    Then Edit event details

  @TEST_CH-798
  Scenario: Change project is not allowed during round is in progress
    Given Login to the rebelbase portal
    When Go to the hub event page
    And Check for round is in progress
    Then Select project should not be exist

  @TEST_CH-801
  Scenario: Judge can edit in bio from event page
    Given Login to the rebel base portal
    When Go to the event page
    And Go to event details page
    Then Edit bio from event details page

  @TEST_CH-700
  Scenario: Judge accept invitation redirect to welcome page
    Given Login to the rebelbase portal
    When Go to the hub event page
    And Invite judge to the event
    And Login to the invited user account
    Then Accept invitation and redirect to the welcome page

  @TEST_CH-699
  Scenario: Compititor accept invitation redirect to select project
    Given Login rebelbase portal
    When Go to the event page
    And Invite comititor to the event
    And Login to the user account
    Then Accept invitation and redirect to the select project page

  @TEST_CH-701
  Scenario: Support accept invitation redirect to welcome resource
    Given Login to the rebelbase portal
    When Go to event page
    And Invite support to the event
    And Login to the invited user account
    Then Accept invitation and redirect to the welcome resource

  @TEST_CH-1280
  Scenario: Delete Event
    Given Login to the rebelbase portal
    When Go to the event page
    And Invite support to event
    Then Delete Event
  
  @TEST_CH-804
  Scenario: Create event and send invitation
    Given Login to the rebelbase portal
    When Go to the hub event page
    And Create Event
    And Invite users to the event
    Then Logout to the account

  @TEST_CH-1281
  Scenario: Judge 1 accept event invitation
    Given Login to the Judge 1 account
    When Accept invitation
    And Edit bio
    Then Logout to the account

  @TEST_CH-1282
  Scenario: Judge 2 accept event invitation
    Given Login to the Judge 2 account
    When Accept invitation from judge 2
    And Judge 2 edit bio
    Then Logout to the Judge 2 account

  @TEST_CH-1283
  Scenario: Judge 3 accept event invitation
    Given Login to the Judge 3 account
    When Accept invitation
    And Edit bio
    Then Logout to the account

  @TEST_CH-1284
  Scenario: Compititor 1 accept event invitation
    Given Login to the compititot 1 account
    When Accept invitation
    And Select project
    Then Logout to the account

  @TEST_CH-1285
  Scenario: Change project for event and verify
    Given Login to the compititor account
    When Go to my event page
    And Change project
    Then Logout to the account

  @TEST_CH-1286
  Scenario: Compititor 2 accept event invitation
    Given Login to the compititot 2 account
    When Accept invitation
    And Select project
    Then Logout to the account

  @TEST_CH-1287
  Scenario: Compititor 3 accept event invitation
    Given Login to the compititot 3 account
    When Accept invitation from compititor 3
    And Select projects
    Then Logout to the account

  @TEST_CH-1288
  Scenario: Admin start event round
    Given Login to the Rebelbase portal
    When Go to event details
    And Start round for the event
    Then Logout to the account

  @TEST_CH-1289
  Scenario: Judge 1 score project
    Given Login to the judge 1 account
    When Go to the hub event page
    And Score one project
    And Score second project
    Then Logout to the judge 1 account

  @TEST_CH-1290
  Scenario: Judge 2 score event
    Given Login to the judge 2 account
    When Go to the event page
    And Score first event
    And scoring second event
    Then Logout to the account

  @TEST_CH-1291
  Scenario: Judge 3 score event
    Given Login to the judge 3 account
    When Go to event page details
    And Scored first event
    And score second event
    Then Logout to the account

  @TEST_CH-1292
  Scenario: Admin close event round and publish score and winner
    Given Login to the rebel base
    When Go to the hub page event
    And Close round
    And Award winner
    Then Logout to the account

  @TEST_CH-1293
  Scenario: Event Update Notification
    Given Event Detail update and Event Description update
    When Details for Event Name have been updated
    And The location for Event Name has been updated
    And The date and location for Event Name have been updated
    And The details and date for Event Name have been updated
    Then The details, location, and event type for Event Name have been updated

  Scenario: Accept event invitation from web application
    Given Navigate rebel base and login
    When Visit event page
    And Create event for web application
    And Verify event title and invite member
    Then Accept event invitation from web application
 
  Scenario: Check thread notification for the event
    Given Navigate rebel base and login
    When Visit event page
    And Create event for web application
    And Invite all member to the event
    And Accept event invitation from from username1
    And Accept event invitation from from username2
    And Accept event invitation from from otherUser
    And Check notification for the event thread
    And Login to the event member account
    Then Check notification for evenr member when post is created
  
  Scenario: Check notificatin for delete event
    Given Navigate rebel base and login
    When Visit event page
    And Create event for web application
    And Invite member to the event
    And Accept invitation from from username1
    And Delete event
    Then Verify event deletion notification for the member
  
  Scenario: Chech notification when the user update event details
    Given Navigate rebel base and login
    When Visit event page
    And Create event for web application
    And Invite member to the event
    And Accept invitation from invited user account
    And Update event details
    Then Verify event updation notification for the member
 
  Scenario: Update event and check updated details
    Given login to the app
    When Visit event page
    And Create event with full details
    And Update Event details
    And Check event details
    Then Delete created event
 
  Scenario: Signup new user and go to all event page
    Given User is on signup page
    When clicked on signup button and add details
    And User clicks on signup button
    And New User is able to sign up successfully
    And Visit all event page
    And Check alternative email pop-up
    Then Verify Email from received email
  
  Scenario: Decline event invitation
    Given Navigate rebel base and login
    When Visit event page
    And Create event for web application
    And Invite member to the event
    And Decline invitation from invited user account
    Then Delete the same event