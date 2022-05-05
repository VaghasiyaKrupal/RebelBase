Feature: Login

    Scenario: Email is missing [loginFlowTest]
        Given Visit rebelbase portal
        When Enter only password into textbox
        And Click on login button
        Then Verify email is missing

    Scenario: Password is less than 6 char[loginFlowTest]
        Given Visit rebelbase portal
        When Enter only email into textbox
        And Click on login button
        Then Verify password validation

    Scenario: Invalid login Id or passwd details [loginFlowTest]
        Given Visit rebelbase portal
        When Verify email validation
        Then Verify email or password validation

    Scenario: Autofill email address if exist in url [loginFlowTest]
        Given Visit url
        When Verify email textbox value
        Then Verify validation

    Scenario: Should login and redirect to profile [loginFlowTest]
        Given Login to the rebelbase portal
        When Verify profile url
        Then Verify user redirect to the profile page

    Scenario: Log in, go to profile then logout [loginFlowTest]
        Given Log in to the rebelbase portal
        When Confirm we have logged in successfully
        Then Now we can log out and should redirect to the login page

    Scenario: Log in with different email and try to accept project invitation token [loginFlowTest]
        Given Visit Rebelbase url with email exist in url
        When Verify user is not able to accept invitation
        And Enter password and click on login button
        Then Verify profile url and invitation expired notification

    # # Not getting invalid token notification
    # Scenario: Log in with invalid project invitation token [loginFlowTest]
    #     Given Visit rebelbase portal
    #     When Enter Username, Password and login to account
    #     And Verify landing profile url
    #     Then Should show invalid token notification

    Scenario: Autofill email address if exist in url, log in and accept event invitation [loginFlowTest]
        Given Visit page url with email exist in url
        When Verify emailid is prefilled
        And Enter password and login to account
        Then Verify email notification message

    Scenario: log in with different email and try to accept event invitation token [loginFlowTest]
        Given Login to rebelbase url
        When Enter different email and try to login
        And Verify url from profile
        Then Should invitation expired notification

    Scenario: log in with invalid event invitation token [loginFlowTest]
        Given Visit with existed email in url
        When Enter username, password and login
        Then Should show invitation has expired notification

    Scenario: log in with different email and try to accept hub invitation token [loginFlowTest]
        Given Visit rebel base portal
        When Should show You will not be able to accept the invitation using this email address.
        And Verify user profile url
        Then Should shows invitation has expired in the notification

    # Scenario: log in with invalid hub invitation token [loginFlowTest]
    #     Given Visit product URL
    #     When Login to the user account
    #     And Should redirect to the profile page
    #     Then Verify email varification notification

    Scenario: Show popup message to complete tell-us ,until tell-us is complete
        Given Visit RebelBase URL
        When Sign-up new user account
        And Should redirect to profile page
        And Logout from the account
        And Login to the same account
        Then Should show tell-up about yourself

    Scenario: Fails to access protected resource
        Given Make API request verify response

    Scenario: Autofill email address if exist in url, existing user log in and accept invitation [loginFlowTest]
        Given Login into rebelbase account
        When Invite team member
        And Logout from account
        And Verify token is received
        Then Accept project invitation

    Scenario: Project invitation from support member
        Given login to account
        When Send support member invitation
        And Verify user token
        Then Accept support member invitaion

    Scenario: Autofill email address if exist in url, log in and accept hub invitation [loginFlowTest]
        Given Create new user account
        When Select location for user
        Then Accept new project invitation