Feature: Event

  Scenario: Event details can be seen without login to application
    Given Visit rebelbase event page
    When Verify event title
    And Verify competitor is visible
    Then Verify participants

  Scenario: Create event and invite members
    Given Login to rebelbase portal
    When Visit event page
    And Create new event
    And Inviting member to the event
    Then Update event

  Scenario: Add event description, Edit event details, Add post, File upload
    Given Login to the rebelbase portal
    When Go to the event page
    And Add event description
    And Add sponsor and upload file
    And Add post in event
    Then Edit event details

  Scenario: Change project is not allowed during round is in progress
    Given Login to the rebelbase portal
    When Go to the hub event page
    And Check for round is in progress
    Then Select project should not be exist

  Scenario: Judge can edit in bio from event page
    Given Login to the rebel base portal
    When Go to the event page
    And Go to event details page
    Then Edit bio from event details page

  Scenario: Judge accept invitation redirect to welcome page
    Given Login to the rebelbase portal
    When Go to the hub event page
    And Invite judge to the event
    And Login to the invited user account
    Then Accept invitation and redirect to the welcome page

  Scenario: Compititor accept invitation redirect to select project
    Given Login rebelbase portal
    When Go to the event page
    And Invite comititor to the event
    And Login to the user account
    Then Accept invitation and redirect to the select project page

  Scenario: Support accept invitation redirect to welcome resource
    Given Login to the rebelbase portal
    When Go to event page
    And Invite support to the event
    And Login to the invited user account
    Then Accept invitation and redirect to the welcome resource

  Scenario: Delete Event
    Given Login to the rebelbase portal
    When Go to the event page
    And Invite support to event
    Then Delete Event

  Scenario: Create event and send invitation
    Given Login to the rebelbase portal
    When Go to the hub event page
    And Create Event
    And Invite users to the event
    Then Logout to the account

  Scenario: Judge 1 accept event invitation
    Given Login to the Judge 1 account
    When Accept invitation
    And Edit bio
    Then Logout to the account

  Scenario: Judge 2 accept event invitation
    Given Login to the Judge 2 account
    When Accept invitation from judge 2
    And Judge 2 edit bio
    Then Logout to the Judge 2 account

  Scenario: Judge 3 accept event invitation
    Given Login to the Judge 3 account
    When Accept invitation
    And Edit bio
    Then Logout to the account

  Scenario: Compititor 1 accept event invitation
    Given Login to the compititot 1 account
    When Accept invitation
    And Select project
    Then Logout to the account

  Scenario: Change project for event and verify
    Given Login to the compititot account
    When Go to my event page
    And Change project
    Then Logout to the account

  Scenario: Compititor 2 accept event invitation
    Given Login to the compititot 2 account
    When Accept invitation
    And Select project
    Then Logout to the account

  Scenario: Compititor 3 accept event invitation
    Given Login to the compititot 3 account
    When Accept invitation from compititor 3
    And Select projects
    Then Logout to the account

  Scenario: Admin start event round
    Given Login to the Rebelbase portal
    When Go to event details
    And Start round for the event
    Then Logout to the account

  Scenario: Judge 1 score project
    Given Login to the judge 1 account
    When Go to the hub event page
    And Score one project
    And Score second project
    Then Logout to the judge 1 account

  Scenario: Judge 2 score event
    Given Login to the judge 2 account
    When Go to the event page
    And Score first event
    And scoring second event
    Then Logout to account

  Scenario: Judge 3 score event
    Given Login to the judge 3 account
    When Go to event page details
    And Scored first event
    And score second event
    Then Logout to the account

  Scenario: Judge close event round and publish score and winner
    Given Login to the rebel base
    When Go to the hub page event
    And Close round
    And Award winner
    Then Logout to the account

  Scenario: Event Update Notification
    Given Event Detail update and Event Description update
    When Details for Event Name have been updated
    And The location for Event Name has been updated
    And The date and location for Event Name have been updated
    And The details and date for Event Name have been updated
    Then The details, location, and event type for Event Name have been updated