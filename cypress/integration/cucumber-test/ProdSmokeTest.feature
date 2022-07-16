Feature: Product smoke test

    Scenario: login application
        Given Visit Rebelbase production url
        When Accept cookies
        And Login to the rebelbase portal
        Then Verify profile url

    Scenario: Create project
        Given Visit Rebelbase production url
        When Accept cookies
        And Login to the rebelbase portal
        And Visit Create project page through url
        Then Create project

    Scenario: Create Group
        Given Visit Rebelbase production url
        When Accept cookies
        And Login to the rebelbase portal
        And Go to group page
        And Create group
        And Verify group name
        And Visit group page through url
        Then Delete group

    Scenario: Add Activity
        Given Visit Rebelbase production url
        When Accept cookies
        And Login to the rebelbase portal
        And Go to activity page
        Then Create post
    @focus
    Scenario: Create event
        Given Visit Rebelbase production url
        When Accept cookies
        And Login to the rebelbase portal
        And Go to the Event page
        And Create new event
        Then Logout from account and verify URL
    
    Scenario: Signup application and logout
        Given User is on signup page
        When clicked on signup button and add details
        And User clicks on signup button
        And new User is able to sign up successfully
        Then Logout from account and verify URL