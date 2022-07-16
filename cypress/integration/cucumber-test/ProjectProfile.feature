Feature: Project profile

    @TEST_CH-718
    Scenario: Login and go to project page
        Given Login to the rebelbase portal and verify cookies
        When Go to project page
        Then Verify project title

    @TEST_CH-719
    Scenario: Edit description of project
        Given Login to rebel base portal and verify cookies
        When Go to project page
        And Verify warning message
        Then Change description

    @TEST_CH-720
    Scenario: Open logo modal on project page
        Given Login to rebel base portal and verify cookies
        When Go to project page
        Then Open project logo model

    @TEST_CH-1303
    Scenario: Change logo, add image file on project page
        Given Login to rebel base portal and verify cookies
        When Go to project page
        And Change project logo
        Then Verify project logo changed successfully

    @TEST_CH-721
    Scenario: Open backdrop modal on project page
        Given Login to rebel base portal and verify cookies
        When Go to project page
        Then Verify warning message when no logo selected

    @TEST_CH-722
    Scenario: Edit about of project page
        Given Login to rebel base portal and verify cookies
        When Go to project page
        And Clear about field and save it
        And Close about without saving it should show warning
        Then Add data in about field

    @TEST_CH-723
    Scenario: Other User's should not be able to edit anything on project page
        Given Login to supporter account
        When Verify profile and cookies
        And Go to project page and verify project title
        Then Verify orther user permission

    @TEST_CH-724
    Scenario: Supporter's should only be able to edit his title and see setting's page on project page
        Given Login to supporter account
        When Verify profile and cookies
        And Go to project page and verify project title
        Then Verify title, team and advisors edit permission

    @TEST_CH-725
    Scenario: Member's should be able to view and edit everything on project page except title of other team meamber's
        Given Login to member account
        When Verify profile url and cookies
        And Go to project page and verify project title
        And Check all the edit pen exist
        And Clear title and change it
        Then Details permission field for all answer is visible

    @TEST_CH-726
    Scenario: Teammates should be able to see all the builder's
        Given Login to the rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Verify All the builder's are visible irrespective of permission level's

    @TEST_CH-727
    Scenario: If user is part of hub then he should be able to see builder's which have permission level for everyone as well as for hub, events and groups
        Given Login to event member account
        When Verify cookies
        And Go to project page and verify project title
        Then Verify permission

    @TEST_CH-728
    Scenario: If user is part of event then he should be able to see builder's which have permission level for everyone, for events and for hub, events and groups
        Given Login to event member account
        When Verify profile
        And Go to project page and verify project title
        Then Verify project permission

    # @TEST_CH-729
    # Scenario: Other user's should not be able to see builder's page of project's they are not part of
    #     Given Login to rebelbase portal and verify cookies
    #     When Go to respective project page
    #     And Verify title
    #     Then Go to project's builder page and verify permission

    @TEST_CH-730
    Scenario: Other user's should only be able to see answer's with permission level for everyone
        Given Login to rebelbase portal
        When Verify profile, cookies
        And Go to project page and verify project title
        Then Verify permission for project

    @TEST_CH-731
    Scenario: Logged out user's should not be able to edit anything
        Given Go to browse page
        When Verify url and href
        Then Verify if any of the edit-pen exist on page

    @TEST_CH-732
    Scenario: Logged out user's should only be able to see builder's with permission level for everyone
        Given Visit project page on Rebelbase portal
        When Verify project title
        Then Verify permission from project page

    @TEST_CH-733
    Scenario: Logged out user's should not be able to see builder's page
        Given Login to rebelbase portal
        When Verify profile, logout from account
        And Go to project and verify project title
        Then Go to project's builder page and verify url

    @TEST_CH-734
    Scenario: Logged out user's should not be able to give kudos and notes and should be redirected to login/signup page
        Given Visit project page and verify project title
        When Redirect to login when clicked on kudos
        And Show login link when click on notes and redirect to login page
        Then Show sign up link when click on notes and redirect to sign up page

    @TEST_CH-735
    Scenario: Teammates should not be able to give kudos
        Given Login to team mate member account
        When Verify profile is as aspected and cookies
        Then Go to project page and give kudos

    @TEST_CH-736
    Scenario: User's can remove their notes but not other's
        Given Login to product portal
        When Go to project page
        And Add notes
        Then Delete notes

    @TEST_CH-737
    Scenario: Check if teammates are properly populated and visible on UI
        Given Verify team mate 1 is properly populate on UI
        When Verify team mate 2 is properly populate on UI
        Then Verify team mate 3 is properly populate on UI

    @TEST_CH-1304
    Scenario: in brief section if we open different business cases it should highlight that section
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Verify section is highlighting

    @TEST_CH-738
    Scenario: Change publish setting on project page from my events to others vice versa
        Given Login to the rebelbase portal and verify cookies
        When Go to project page and verify project title
        And Change publish settings on project page from my event to others
        Then Change publish settings on project page from other to my event

    @TEST_CH-739
    Scenario: Open team member profile from project page
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Open team member profile from project page

    @TEST_CH-740
    Scenario: Add team meber from project page by edit project page
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        And Go to setting page from project page
        Then Invite team member

    @TEST_CH-1305
    Scenario: Resend project invitation from edit project page and from invite member page
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        And Go to setting page from project page
        And Send a nudge and close model
        Then Resend invitation from setting page

    @TEST_CH-742
    Scenario: Default project should open when dashboard loads
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Verify default project is open

    @TEST_CH-743
    Scenario: Change defualt project and check project profile should open
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Change default project

    @TEST_CH-741
    Scenario: Resend project invitation from edit project page
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Resend project invitation from edit project page

    @TEST_CH-1306
    Scenario: Duplicate users in team
        Given Login to rebelbase portal
        When Go to project builder page
        And Go to project page
        Then Check for duplicate email id

    @TEST_CH-692
    Scenario: Profilepage
        Given Login to rebelbase portal
        When Edit about
        And Add experience
        And Edit experience
        And Edit social media links
        Then Create new project

    Scenario: Accpet project invitation from web application
        Given Login and verify cookies
        When Create a project
        And login to the member account
        Then Accept project invitation

    Scenario: Decline project invitation
        Given Login and verify cookies
        When Create a project
        And login to the member account
        Then Decline project invitation

    Scenario: Check support member should not receive notification
        Given Login to username1 account and verify cookies
        When Visit activity page
        And Give kudos and reply to the post
        Then Check support notification in support member account