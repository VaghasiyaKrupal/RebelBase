Feature: Hub members different filters

  Scenario: Verify hub admin is visible
    Given Login to the portal
    When Redirect to Hub group member page
    And Verify member page
    Then Verify Hub admin is visible

  Scenario: Verify Hub admin is show when Owners and admin is selected
    Given Login to the Rebelbase portal
    When Go to Hub group member page
    And Verify member page is from Hub
    And Verify Hub admin is present
    Then Verify member is display when Owners and admin is selected

  Scenario: Verify Hub admin is not show when Member's only is selected
    Given Login to Rebelbase portal
    When Go to member page
    And Verify member page
    And Verify Hub is present
    Then Verify Hub admin is not display when Member only is selected

  Scenario: Verify pending invitation
    Given Login to Rebelbase portal
    When Go to member page
    Then Verify pending invitation

  Scenario: Verify default show all short option is selected
    Given Login to Rebelbase portal
    When Go to member page
    Then Verify default show all short option is selected

  Scenario: Resend all invitation
    Given Login to Rebelbase portal
    When Go to member page
    Then Verify resend all has been sent

  Scenario: Resend single invitation
    Given Login to Rebelbase portal
    When Go to member page
    Then Verify resend single invitation has been sent

  Scenario: Delete pending invitation
    Given Login to Rebelbase portal
    When Go to member page
    And Send invitation
    Then Delete pending invitation

  Scenario: Verify placeholder should be decapitalized
    Given Login to Rebelbase portal
    When Go to member page
    And Verify button and placeholder text
    Then Verify button and placeholder text in spanish version