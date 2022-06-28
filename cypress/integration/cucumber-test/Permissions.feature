Feature: Permissions

    Scenario: Test project support member permissions
        Given Login to the supporter account
        When Verify supporter email
        And Changing basic account settings
        And Add Alternative Email and remove it
        And Verify supporter permission
        Then Create project and redirect to project page
    
    Scenario: Check project members permissons
        Given Login to the member account
        When Changing basic settings
        And Changing project setting
        Then Invite user to team

    Scenario: Check rebelbase members permissons
        Given Login to the Rebelbase member account
        When Go to setting page
        Then Check Rebelbase member permission

    Scenario: Check public members permissons
        Given Go to project page
        When Verify public member permission
        Then Verify settings permission

    Scenario: Check Hub event member permissons
        Given Login to event member account
        When Verify permission from settings
        And Creating post
        Then Edit post

    Scenario: Check Hub member but not event member permissons
        Given Login to hub member account
        When Go to setting page
        And Verify setting permission
        And Creating post
        And Edit post
        Then Verify permission from event page

    Scenario: Logout members can browse projects, open profile page and can see events details
        Given Go to project page and verify title
        When Go to profile page and verify title
        Then Verify event detail page

    Scenario: Logout members cannot able to see activity,groups,brain,builders,hub,members
        Given Verify Activity page permission
        When Verify brain page permission
        And Verify builder permission
        And Verify hub permission
        Then Verify member permission

    Scenario: User is event member but not a hub member
        Given Login to the event member account
        When Create project
        And Send invitation
        Then Go to setting page
    