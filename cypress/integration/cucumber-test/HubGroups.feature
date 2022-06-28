Feature: Hub Group
  @TEST_CH-870
  Scenario: Group Overview member
    Given Login using username1 email
    When Verify profile URL and user token
    And Visit Group page
    Then Verify past created groups is exist
  @TEST_CH-871
  Scenario: Checking group with no schedule members login
    Given Login using username2 email
    When Verify profile URL and user login token
    And Visit Group page
    Then Check group schedule
  @TEST_CH-827
  Scenario: Create group with schedule
    Given Login using username email
    When Visit Group screen
    And Add group
    And Verify created group
    And Redirect to group page
    Then Search created group and delete it
  @TEST_CH-872
  Scenario: Checking group with schedule members login
    Given Login using eventMember email
    When Verify profile and token
    And Go to group page
    Then Verify exist group
  @TEST_CH-873
  Scenario: Group Overview from Admin
    Given Login to the username email
    When Verify profile and login user token
    And Jump to group page
    Then Verify add group button is visible
  @TEST_CH-874
  Scenario: Check Group without Schedule from Admin
    Given Login to rebel base portal
    When Verify profile, user token
    And Navigate to group page
    And Verify create group button is visible
    Then Redirect to test dev group
  @TEST_CH-829
  Scenario: Group with Schedule [Admin]
    Given Login to rebelbase
    When Verify loggedin user token and profile url
    And Visite to group page
    And Verify plush button is visible
    Then Redirect to the test dev group
  @TEST_CH-1295
  Scenario: Invite new user to hub from group and create and add project to group
    Given Access rebelbase portal
    When Redirect to group page for devhub
    And Go to test dev group
    And Add member to the group
    And Logout to the account
    And Signup new user
    Then Accept invitation
  @TEST_CH-1296
  Scenario: Duplicate group name
    Given Intercept section blueprint api call
    When Login the rebelbase portal
    And Verify api response
    And Redirected to group page
    And Creating group
    Then Verify alert message
  @TEST_CH-1297
  Scenario: Add builder schedule
    Given Get access on rebelbase portal
    When Visit DevHub group page
    And Go to group and set schedule
    Then Verify schedule is save
  @TEST_CH-1298
  Scenario: Add search and delete member from group
    Given Access to the rebelbase
    When Navigate group page
    And Go to group details page and delete member
    And Adding member to the group
    Then Deleting member from group
  @TEST_CH-822
  Scenario: Add delete manager in group
    Given Getting access on the rebelbase portal
    When Jumped to group page
    And Add new groups
    And Verifing created group
    And Redirect to created group page
    And Add manager in group
    Then Delete manager from group
  @TEST_CH-819
  Scenario: Invite to user who is not part of group
    Given Logged in to the rebelbase portal
    When Redirect to group page from DevHub
    And Adding group
    Then Checking for duplicate group name
  @TEST_CH-823
  Scenario: Deactivate group
    Given Get access Rebelbase portal
    When Redirect the group page
    And Searching for group
    Then Deactivate group
  @TEST_CH-1299
  Scenario: Delete Group
    Given Username login to the rebelbase portal
    When Visit directly to group page
    And Search for group
    Then Delete group
  
  Scenario: create group with members from different hubs and GROUPS and events
    Given Login to account
    When Visit Group pages
    And Adding new groups
    And Verify group is created successfully
    And Adding members from different hubs and GROUPS and events
    Then Delete group after member added successfully
  
  Scenario: Invite user and check invitation on web application
    Given Login using hubuser email
    When User is on group page
    And Create group and verify is created successfully
    And Send invitation to user from group
    Then Check invitation from web Application
  
  Scenario: Verify the user is logged in to admin account
    Given Login to hub admin account
    When Navigate to member page
    Then Verify user is hub admin
  
  Scenario: Verify the user is logged in to member account
    Given Login to hub member account
    When Navigate to member page for member account
    Then Verify user is member

  Scenario: Verify unsuccessful invitation validation if multiple email are there
    Given Login to hub admin account
    When Navigate to member page for admin account
    Then Verify unsuccessful invitation validation if multiple email are there
  
  Scenario: Verify user is automatically added to the Dev hub and group
    Given Login to hub admin account
    When Navigate to Group page for admin account
    And Create group and Invite new user to the group
    And Verify token from received email
  
  Scenario: Add member to the group if the user already member of the hub group
    Given Login to hub admin account
    When Navigate to Group page for admin account
    And Create group and add member to the group
  @focus
  Scenario: Verify project tab
    Given Login to Rebelbase portal and navigate to group page
    When Searching for existing group
    And Verify project is appears when the user search using project name and member name
    And Verify default sortby is selected