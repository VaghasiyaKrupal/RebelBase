Feature: Settings

    Scenario: Send,snudge delete project invitation from setting page
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