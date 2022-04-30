Feature: Project profile

    Scenario: Test project support member permissions
        Given Login to the rebelbase portal and verify cookies
        When Go to project page
        Then Verify project title

    Scenario: Edit description of project [Project Profile]
        Given Login to rebel base portal and verify cookies
        When Go to project page
        And Verify warning message
        Then Change description

    Scenario: Open logo modal on project page [Project Profile]
        Given Login to rebel base portal and verify cookies
        When Go to project page
        Then Open project logo model

    Scenario: Change logo, add image file on project page [Project Profile]
        Given Login to rebel base portal and verify cookies
        When Go to project page
        And Change project logo
        Then Verify project logo changed successfully

    Scenario: Open backdrop modal on project page [Project Profile]
        Given Login to rebel base portal and verify cookies
        When Go to project page
        Then Verify warning message when no logo selected

    Scenario: C58 Edit about of project page [Project Profile]
        Given Login to rebel base portal and verify cookies
        When Go to project page
        And Clear about field and save it
        And Close about without saving it should show warning
        Then Add data in about field

    Scenario: Other User's should not be able to edit anything on project page [Project Profile]
        Given Login to supporter account
        When Verify profile and cookies
        And Go to project page and verify project title
        Then Verify orther user permission

    Scenario: Supporter's should only be able to edit his title and see setting's page on project page [Project Profile]
        Given Login to supporter account
        When Verify profile and cookies
        And Go to project page and verify project title
        Then Verify title, team and advisors edit permission

    Scenario: Member's should be able to view and edit everything on project page except title of other team meamber's
        Given Login to member account
        When Verify profile url and cookies
        And Go to project page and verify project title
        And Check all the edit pen exist
        And Clear title and change it
        Then Details permission field for all answer is visible

    Scenario: Teammates should be able to see all the builder's [Project Profile]
        Given Login to the rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Verify All the builder's are visible irrespective of permission level's

    Scenario: If user is part of hub then he should  be able to see builder's which have permission level for everyone as well as for hub, events and groups [Project Profile]
        Given Login to event member account
        When Verify profile page and cookies
        And Go to project page and verify project title
        Then Verify permission

    Scenario: If user is part of event then he should  be able to see builder's which have permission level for everyone, for events and for hub, events and groups [Project Profile]
        Given Login to event member account
        When Verify profile
        And Go to project page and verify project title
        Then Verify project permission

    Scenario: Other user's should not be able to see builder's page of project's they are not part of  [Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page
        And Verify title
        Then Go to project's builder page and verify permission

    Scenario: Other user's should only be able to see answer's with permission level for everyone [Project Profile]
        Given Login to rebelbase portal
        When Verify profile, cookies
        And Go to project page and verify project title
        Then Verify permission for project

    Scenario: Logged out user's should not be able to edit anything [Project Profile]
        Given Go to browse page
        When Verify url and href
        Then Verify if any of the edit-pen exist on page

    Scenario: Logged out user's should not be able to edit anything [Project Profile]
        Given Visit project page on Rebelbase portal
        When Verify project title
        Then Verify permission

    Scenario: Logged out user's should not be able to see builder's page [Project Profile]
        Given Login to rebelbase portal
        When Verify profile, logout from account
        And Go to project and verify project title
        Then Go to project's builder page and verify url

    Scenario: Logged out user's should not be able to give kudos and notes and should be redirected to login/signup page [Project Profile]
        Given Visit project page and verify project title
        When Redirect to login when clicked on kudos
        And Show login link when click on notes and redirect to login page
        Then Show sign up link when click on notes and redirect to sign up page

    Scenario: Teammates should not be able to give kudos
        Given Login to team mate member account
        When Verify profile and cookies
        Then Go to project page and give kudos

    Scenario: User's can remove their notes but not other's
        Given Login to rebelbase portal
        When Go to project page
        And Add notes
        Then Delete notes

    Scenario: Check if teammates are properly populated and visible on UI
        Given Verify team mate 1 is properly populate on UI
        When Verify team mate 2 is properly populate on UI
        Then Verify team mate 3 is properly populate on UI

    Scenario: in brief section if we open different business cases it should highlight that section[Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Verify section is highlighting

    Scenario: Change publish setting on project page from my events to others vice versa
        Given Login to the rebelbase portal and verify cookies
        When Go to project page and verify project title
        And Change publish settings on project page from my event to others
        Then Change publish settings on project page from other to my event

    Scenario: Open team member profile from project page[Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Open team member profile from project page

    Scenario: Add team meber from project page by edit project page[Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        And Go to setting page from project page
        Then Invite team member

    Scenario: Resend project invitation from edit project page and from invite member page[Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        And Go to setting page from project page
        And Send a nudge and close model
        Then Resend invitation from setting page

    Scenario: Default project should open when dashboard loads[Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Verify default project is open

    Scenario: Change defualt project and check project profile should open[Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Change default project

    Scenario: Resend project invitation from edit project page [Project Profile]
        Given Login to rebelbase portal and verify cookies
        When Go to project page and verify project title
        Then Resend project invitation from edit project page

    Scenario: Duplicate users in team
        Given Login to rebelbase portal
        When Go to project builder page
        And Go to project page
        Then Check for duplicate email id

    Scenario: Duplicate users in team
        Given Login to rebelbase portal
        When Edit about
        And Add experience
        And Edit experience
        And Edit social media links
        Then Create new project