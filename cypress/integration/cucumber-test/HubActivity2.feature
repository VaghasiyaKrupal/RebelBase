Feature: Hub Activity
  @TEST_CH-1294
  Scenario: QandA create reply delete
    Given Verify profile page and cookies
    When Go to Activity page
    And Ask question
    And Answer question
    And Reply answer
    And Delete reply from question
    And Delete answer from question
    Then Delete Question
  @TEST_CH-763
  Scenario: Create offer reply and delete
    Given Verify profile page and cookies
    When Go to Activity page
    And Create offer
    And Reply to offer
    And Give Kudos and edit offer
    Then Delete Offer
  # @TEST_CH-764
  # Scenario: Edit role from activity page
  #   Given Verify profile page and cookies
  #   When User at Activity page
  #   And Edit admin role card
  #   And Edit support role card
  #   Then Send invitation
  
  Scenario: Check announcement notification on web application
    Given Verify profile page and cookies
    When Go to Activity page
    And Make announcement for web application
    And Login and give kudos to announcment
    Then Check activity notification for announcement
  
  Scenario: Check Q+A notification on web application
    Given Verify profile page and cookies
    When Go to Activity page
    And Make question for web application
    And Login and give kudos to question
    Then Check activity notification for question
  
  Scenario: Check idea notification on web application
    Given Verify profile page and cookies
    When Go to Activity page
    And Make idea for web application
    And Login and give kudos to idea
    Then Check activity notification for idea
  
  Scenario: Check offer notification on web application
    Given Verify profile page and cookies
    When Go to Activity page
    And Make offer for web application
    And Login and give kudos to Offer
    Then Check activity notification for Offer
  
  Scenario: Check read more button if post have long text
    Given Verify profile page and cookies
    When Go to Activity page
    And Make offer for read more button
  
  Scenario: Check expand button for offer, announcement, and post
    Given Verify profile page and cookies
    When Go to Activity page
    And Check expand button for announcement
    And Check expand button for post
    Then Check expand button for offer