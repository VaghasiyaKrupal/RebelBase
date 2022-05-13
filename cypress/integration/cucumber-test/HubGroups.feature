Feature: Hub Group

  Scenario: Group Overview member
    Given Login using username1 email
    When Verify profile URL and user token
    And Visit Group page
    Then Verify past created groups is exist

  Scenario: Checking group with no schedule members login
    Given Login using username2 email
    When Verify profile URL and user login token
    And Visit Group page
    Then Check group schedule

  Scenario: Create group with schedule
    Given Login using username email
    When Visit Group screen
    And Add group
    And Verify created group
    And Redirect to group page
    Then Search created group and delete it

  Scenario: Checking group with schedule members login
    Given Login sing eventMember email
    When Verify profile and token
    And Go to group page
    Then Verify exist group

  Scenario: Group Overview from Admin
    Given Login to the username email
    When Verify profile and login user token
    And Jump to group page
    Then Verify add group button is visible

  Scenario: Check Group without Schedule from Admin
    Given Login to rebel base portal
    When Verify profile, user token
    And Navigate to group page
    And Verify create group button is visible
    Then Redirect to test dev group

  Scenario: Group with Schedule [Admin]
    Given Login to rebelbase
    When Verify loggedin user token and profile url
    And Visite to group page
    And Verify plush button is visible
    Then Redirect to the test dev group
  @focus
  Scenario: Invite new user to hub from group and create and add project to group
    Given Access rebelbase portal
    When Redirect to group page for devhub
    And Go to test dev group
    And Add member to the group
    And Logout to the account
    And Signup new user
    Then Accept invitation

  Scenario: Duplicate group name
    Given Intercept section blueprint api call
    When Login the rebelbase portal
    And Verify api response
    And Redirected to group page
    And Creating group
    Then Verify alert message

  Scenario: Add builder schedule
    Given Get access on rebelbase portal
    When Visit DevHub group page
    And Go to group and set schedule
    Then Verify schedule is save
  @focus    
  Scenario: Add search and delete member from group
    Given Access to the rebelbase
    When Navigate group page
    And Go to group details page and delete member
    And Adding member to the group
    Then Deleting member from group

  Scenario: Add delete manager in group
    Given Getting access on the rebelbase portal
    When Jumped to group page
    And Add new groups
    And Verifing created group
    And Redirect to created group page
    And Add manager in group
    Then Delete manager from group
  
  Scenario: Invite to user not part of group
    Given Logged in to the rebelbase portal
    When Redirect to group page from DevHub
    And Adding group
    Then Checking for duplicate group name

  Scenario: Deactivate group
    Given Get access Rebelbase portal
    When Redirect the group page
    And Searching for group
    Then Deactivate group

  Scenario: Delete Group
    Given Username login to the rebelbase portal
    When Visit directly to group page
    And Search for group
    Then Delete group