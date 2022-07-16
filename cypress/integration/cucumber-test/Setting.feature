Feature: Settings

    Scenario: Send, nudge delete project invitation from setting page
        Given Login to rebelbase portal
        When Go to setting page
        Then Send Invitation and nudge

    Scenario: Change project details
        Given Login to rebelbase portal
        When Go to setting page
        And Edit basic project details
        Then Change the title

    Scenario: Language change
        Given Login to the rebelbase portal
        When Expand language
        Then Change language
    
    Scenario: Change email preference and verify
        Given Login to the rebelbase portal
        When Go to setting page
        And Chnage email preference
        And Verify saved email settings
        Then Restore email settings