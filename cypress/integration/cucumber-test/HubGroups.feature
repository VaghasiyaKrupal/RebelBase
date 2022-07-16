Feature: Hub Group
  @TEST_CH-870
  Scenario: Group Overview member - Hub Group Script
    Given Login using username1 email - Hub Group Script
    When Verify profile URL and user token - Hub Group Script
    And Visit Group page - Hub Group Script
    Then Verify past created groups is exist - Hub Group Script
  @TEST_CH-871
  Scenario: Checking group with no schedule members login - Hub Group Script
    Given Login using username2 email - Hub Group Script
    When Verify profile URL and user login token - Hub Group Script
    And Visit Group page - Hub Group Script
    Then Check group schedule - Hub Group Script
  @TEST_CH-827
  Scenario: Create group with schedule - Hub Group Script
    Given Login using username email - Hub Group Script
    When Visit Group screen - Hub Group Script
    And Add group - Hub Group Script
    And Verify created group - Hub Group Script
    And Redirect to group page - Hub Group Script
    Then Search created group and delete it - Hub Group Script
  @TEST_CH-872
  Scenario: Checking group with schedule members login - Hub Group Script
    Given Login using eventMember email - Hub Group Script
    When Verify profile and token - Hub Group Script
    And Go to group page - Hub Group Script
    Then Verify exist group - Hub Group Script
  @TEST_CH-873
  Scenario: Group Overview from Admin - Hub Group Script
    Given Login to the username email - Hub Group Script
    When Verify profile and login user token - Hub Group Script
    And Jump to group page - Hub Group Script
    Then Verify add group button is visible - Hub Group Script
  @TEST_CH-874
  Scenario: Check Group without Schedule from Admin - Hub Group Script
    Given Login to rebel base portal - Hub Group Script
    When Verify profile, user token - Hub Group Script
    And Navigate to group page - Hub Group Script
    And Verify create group button is visible - Hub Group Script
    Then Redirect to test dev group - Hub Group Script
  @TEST_CH-829
  Scenario: Group with Schedule [Admin] - Hub Group Script
    Given Login to rebelbase - Hub Group Script
    When Verify loggedin user token and profile url - Hub Group Script
    And Visite to group page - Hub Group Script
    And Verify plush button is visible - Hub Group Script
    Then Redirect to the test dev group - Hub Group Script
  @TEST_CH-1295
  Scenario: Invite new user to hub from group and create and add project to group - Hub Group Script
    Given Access rebelbase portal - Hub Group Script
    When Redirect to group page for devhub - Hub Group Script
    And Go to test dev group - Hub Group Script
    And Add member to the group - Hub Group Script
    And Logout to the account - Hub Group Script
    And Signup new user - Hub Group Script
    Then Accept invitation - Hub Group Script
  @TEST_CH-1296
  Scenario: Duplicate group name - Hub Group Script
    Given Intercept section blueprint api call - Hub Group Script
    When Login the rebelbase portal - Hub Group Script
    And Verify api response - Hub Group Script
    And Redirected to group page - Hub Group Script
    And Creating group - Hub Group Script
    Then Verify alert message - Hub Group Script
  @TEST_CH-1297
  Scenario: Add builder schedule - Hub Group Script
    Given Get access on rebelbase portal - Hub Group Script
    When Visit DevHub group page - Hub Group Script
    And Go to group and set schedule - Hub Group Script
    Then Verify schedule is save - Hub Group Script
  @TEST_CH-1298
  Scenario: Add search and delete member from group - Hub Group Script
    Given Access to the rebelbase - Hub Group Script
    When Navigate group page - Hub Group Script
    And Go to group details page and delete member - Hub Group Script
    And Adding member to the group - Hub Group Script
    Then Deleting member from group - Hub Group Script
  @TEST_CH-822
  Scenario: Add delete manager in group - Hub Group Script
    Given Getting access on the rebelbase portal - Hub Group Script
    When Jumped to group page - Hub Group Script
    And Add new groups - Hub Group Script
    And Verifing created group - Hub Group Script
    And Redirect to created group page - Hub Group Script
    And Add manager in group - Hub Group Script
    Then Change role to manager and change back to member for group - Hub Group Script
  @TEST_CH-819
  Scenario: Invite to user who is not part of group - Hub Group Script
    Given Logged in to the rebelbase portal - Hub Group Script
    When Redirect to group page from DevHub - Hub Group Script
    And Adding group - Hub Group Script
    Then Checking for duplicate group name - Hub Group Script
  @TEST_CH-823
  Scenario: Deactivate group - Hub Group Script
    Given Get access Rebelbase portal - Hub Group Script
    When Redirect the group page - Hub Group Script
    And Searching for group - Hub Group Script
    Then Deactivate group - Hub Group Script
  @TEST_CH-1299
  Scenario: Delete Group - Hub Group Script
    Given Username login to the rebelbase portal - Hub Group Script
    When Visit directly to group page - Hub Group Script
    And Search for group - Hub Group Script
    Then Delete group - Hub Group Script

  Scenario: create group with members from different hubs and GROUPS and events - Hub Group Script
    Given Login to account - Hub Group Script
    When Visit Group pages - Hub Group Script
    And Adding new groups - Hub Group Script
    And Verify group is created successfully - Hub Group Script
    And Adding members from different hubs and GROUPS and events - Hub Group Script
    Then Delete group after member added successfully - Hub Group Script

  Scenario: Invite user and check invitation on web application - Hub Group Script
    Given Login using hubuser email - Hub Group Script
    When User is on group page - Hub Group Script
    And Create group and verify is created successfully - Hub Group Script
    And Send invitation to user from group - Hub Group Script
    Then Check invitation from web Application - Hub Group Script

  Scenario: Verify the user is logged in to admin account - Hub Group Script
    Given Login to hub admin account - Hub Group Script
    When Navigate to member page - Hub Group Script
    Then Verify user is hub admin - Hub Group Script

  Scenario: Verify the user is logged in to member account - Hub Group Script
    Given Login to hub member account - Hub Group Script
    When Navigate to member page for member account - Hub Group Script
    Then Verify user is member - Hub Group Script

  Scenario: Verify unsuccessful invitation validation if multiple email are there - Hub Group Script
    Given Login to hub admin account - Hub Group Script
    When Navigate to member page for admin account - Hub Group Script
    Then Verify unsuccessful invitation validation if multiple email are there - Hub Group Script

  Scenario: Verify user is automatically added to the Dev hub and group and verify unaccepted invitations card - Hub Group Script
    Given Login to hub admin account - Hub Group Script
    When Navigate to Group page for admin account - Hub Group Script
    And Create group and Invite new user to the group - Hub Group Script
    And Verify token from received email - Hub Group Script

  Scenario: Add member to the group if the user already member of the hub group - Hub Group Script
    Given Login to hub admin account - Hub Group Script
    When Navigate to Group page for admin account - Hub Group Script
    And Create group and add member to the group - Hub Group Script

  Scenario: Verify project tab - Hub Group Script
    Given Login to Rebelbase portal and navigate to group page - Hub Group Script
    When Searching for existing group - Hub Group Script
    And Verify project is appears when the user search using project name and member name - Hub Group Script
    And Verify default sortby is selected - Hub Group Script