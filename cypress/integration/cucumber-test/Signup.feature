Feature: Sign-up test

    Scenario: Test Enable user to set email interval in settings
        Given Login to the rebel base account
        When Go to setting
        And Change My Activity Updates notification
        And Change Hub Activity Updates notification
        Then Logout from account

    @TEST_CH-930
    Scenario: Sign up and try to accept invalid project invitation token
        Given Signup user with token
        When Try to accept invalid project invitation
        And Verify invitation validation
        Then Logout from account
    @TEST_CH-932
    Scenario: Sign up and try to accept invalid event invitation token
        Given Login to the rebelbase portal
        When Verify profile and cookies
        And Go to event page and send event invitation
        And Sign up user with token
        And Try to accept invalid project invitation
        And Verify invitation validation
        Then Logout from account
    @TEST_CH-934
    Scenario: Sign up and try to accept invalid hub invitation token using link
        Given Sign up user
        When Send invitation
        Then Verify invitation send
    @TEST_CH-936
    Scenario: Autofill email address if exist in url and show warning if user edit email address
        Given Visit autofill email address
        Then Verify invitation is valid
    @TEST_CH-708
    Scenario: Tell-us is empty
        Given Visit rebalbase portal
        When Sign up new user
        Then Verify tell-us is empty
    @TEST_CH-927
    Scenario: Required field is missing
        Given Verify validation on sign-up user
        Then Verify validation on location model

    @TEST_CH-928
    # Getting this project invitation has exxpired
    Scenario: Signup and accept project invitation
        Given Send Project invitation
        When Invite member to the team
        And Verify token from gmail
        And Accepiting project invitations
        Then Tell-us about your self

     @TEST_CH-929
    # user does not have permission to add a team in CypressTestProject01
    Scenario: Sign up with different email and try to accept project invitation token
        Given Sent invitation
        When Verify gmail token
        And Sign-Up
        Then Tell-us is empty
    @TEST_CH-931
    Scenario: Sign up with different email and try to accept event invitation token
        Given Login and verify user token
        When Invite participate to the event
        And Verify email token is sent
        And Create new user account
        Then Fill tell-uup dailog

    Scenario: Sign up with different email and try to accept hub invitation token
        Given New user sign-up
        When Fill-up tell-us dailog
        And login using created user email
        And Sent invitation to user
        Then Verify invitation token

    Scenario: Autofill email address if exist in url [SignUpFlowTest]
        Given Verify email is auto filled into textbox

    Scenario: new user signup and accept event invitation [signUpFlowTest]
        Given login for Invite participant
        When Invite Participant
        And Verify token from sended email
        And Creating new user account
        Then Accept invitation for created user

    Scenario: forget password
        Given forget password
        Then Verify forgot password mail is send