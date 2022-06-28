Feature: Brain Section
  # functionality is now changes
  # @TEST_CH-865
  # Scenario: Send hub invitation from brain page ,delete invitation and resend invitation to user
  #   Given I access the brain section page
  #   When I send hub invitation from brain page
  #   And Send nudge and delete invitation
  #   And Reend invitation
  #   And Resend nudge

  @TEST_CH-866
  Scenario: Navigate through the links using loops
    Given I access the brain section page
    When Close Notification
    And Nevigate to RebelBase Hub 101
    And Nevigate to Projects + Builders
    And Nevigate to Collaboration
    And Nevigate to Invite to Your Hub
    And Nevigate to Groups
    And Nevigate to Events
    # And Nevigate to Onboard Cohorts
    # And Nevigate to Troubleshooting