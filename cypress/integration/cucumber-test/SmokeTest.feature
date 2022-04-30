Feature: SmokeTest Feature
    @smoketest
    Scenario Outline: Login to app staging rebelbase
        Given User is at the login page
        When User enters username as '<username>' and password as '<password>'
        And User clicks on login button
        Then User is able to successfully login to the Website
        Examples:
            | username                  | password |
            | testhubadmin@rebelbase.co | testtest |
    @smoketest
    Scenario: create project
        Given User is logged in
        When  clicked on + button project and add details
        And User clicks on create project button
        Then User is able to successfully create project

    Scenario: create group
        Given admin User is logged in
        When  clicked on + button and add details
        And User clicks on create group button
        Then User is able to successfully create group

    Scenario: add activity
        Given User is logged in
        When  clicked on add activity button and add details
        And User clicks on post button
        Then User is able to create post

    Scenario: create event
        Given User is logged in
        When  clicked on new event button and add details
        And User clicks on create event button
        Then User is able to successfully create event

    Scenario: Signup application
        Given User is on signup page
        When  clicked on signup button  and add details
        And User clicks on signup button
        Then new User is able to sign up successfully