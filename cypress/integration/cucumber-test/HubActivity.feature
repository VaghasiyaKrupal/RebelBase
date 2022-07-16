Feature: Hub Activity Script

  Background:
    Given Verify dashbboard and cookies - Hub Activity Script
    When Go to Activity page - Hub Activity Script

  @TEST_CH-772
  Scenario: Visit Dev Hub - Hub Activity Script
    Then Verify Dev Hub - Hub Activity Script

  @TEST_CH-773
  Scenario: Edit Hub Description - Hub Activity Script
    And Change hub title - Hub Activity Script
    Then Change hub description - Hub Activity Script

  # @TEST_CH-774
  # Scenario: Edit Membership - Hub Activity Script
  #   And Edit role - Hub Activity Script
  #   And Edit Membership - Hub Activity Script
  #   Then Verify edited details - Hub Activity Script

  @TEST_CH-775
  Scenario: Make announcement - Hub Activity Script
    Then Make Announcement - Hub Activity Script

  @TEST_CH-776
  Scenario: Edit announcement - Hub Activity Script
    And Cancel announcement after edit - Hub Activity Script
    Then Save announcement after edit - Hub Activity Script

  @TEST_CH-777
  Scenario: Unstick announcement - Hub Activity Script
    Then Make announcement unsticky - Hub Activity Script

  @TEST_CH-778
  Scenario: Make announcement sticky - Hub Activity Script
    Then Make announcement sticky - Hub Activity Script

  @TEST_CH-779
  Scenario: Delete announcement - Hub Activity Script
    And Verify announcement not deleted - Hub Activity Script
    Then Delete announcement - Hub Activity Script

  @TEST_CH-780
  Scenario: Create a Post - Hub Activity Script
    Then Create post - Hub Activity Script

  @TEST_CH-781
  Scenario: Switch to Post - Hub Activity Script
    Then Go to post page - Hub Activity Script

  @TEST_CH-782
  Scenario: Edit post - Hub Activity Script
    And Verify post is not edit - Hub Activity Script
    Then Edit post - Hub Activity Script

  @TEST_CH-783
  Scenario: Delete post - Hub Activity Script
    And Verify post is not deleted - Hub Activity Script
    Then Delete post - Hub Activity Script

  @TEST_CH-784
  Scenario: Ask a question - Hub Activity Script
    Then Ask a question - Hub Activity Script

  @TEST_CH-785
  Scenario: Edit a question - Hub Activity Script
    And Check cancel edit - Hub Activity Script
    Then Edit a question - Hub Activity Script

  @TEST_CH-786
  Scenario: Redirect to question page - Hub Activity Script
    Then Go to Question page - Hub Activity Script

  @TEST_CH-787
  Scenario: Add answer - Hub Activity Script
    Then Add answer - Hub Activity Script

  @TEST_CH-788
  Scenario: Add reply to answer - Hub Activity Script
    And Reply to answer - Hub Activity Script
    Then Add more reply to answer - Hub Activity Script

  @TEST_CH-789
  Scenario: Delete reply - Hub Activity Script
    Then Delete Replay - Hub Activity Script

  @TEST_CH-790
  Scenario: Add more answer - Hub Activity Script
    Then Add more answer - Hub Activity Script

  @TEST_CH-791
  Scenario: Give upvote to answer - Hub Activity Script
    Then Upvote answer - Hub Activity Script

  @TEST_CH-1294
  Scenario: QandA create reply delete - Hub Activity Script
    And Ask question - Hub Activity Script
    And Answer question - Hub Activity Script
    And Reply answer - Hub Activity Script
    And Delete reply from question - Hub Activity Script
    And Delete answer from question - Hub Activity Script
    Then Delete Question - Hub Activity Script

  @TEST_CH-763
  Scenario: Create offer reply and delete - Hub Activity Script
    And Create offer - Hub Activity Script
    And Reply to offer - Hub Activity Script
    And Give Kudos and edit offer - Hub Activity Script
    Then Delete Offer - Hub Activity Script

  # @TEST_CH-764
  # Scenario: Edit role from activity page - Hub Activity Script
  #   And Edit admin role card - Hub Activity Script
  #   And Edit support role card - Hub Activity Script
  #   Then Send invitation - Hub Activity Script

  Scenario: Check announcement notification on web application - Hub Activity Script
    And Make announcement for web application - Hub Activity Script
    And Login and give kudos to announcment - Hub Activity Script
    Then Check activity notification for announcement - Hub Activity Script

  Scenario: Check Q+A notification on web application - Hub Activity Script
    And Make question for web application - Hub Activity Script
    And Login and give kudos to question - Hub Activity Script
    Then Check activity notification for question - Hub Activity Script

  Scenario: Check idea notification on web application - Hub Activity Script
    And Make idea for web application - Hub Activity Script
    And Login and give kudos to idea - Hub Activity Script
    Then Check activity notification for idea - Hub Activity Script

  Scenario: Check offer notification on web application - Hub Activity Script
    And Make offer for web application - Hub Activity Script
    And Login and give kudos to Offer - Hub Activity Script
    Then Check activity notification for Offer - Hub Activity Script

  Scenario: Check read more button if post have long text - Hub Activity Script
    Then Make offer for read more button - Hub Activity Script

  Scenario: Check expand button for offer, announcement, and post - Hub Activity Script
    And Check expand button for announcement - Hub Activity Script
    And Check expand button for post - Hub Activity Script
    Then Check expand button for offer - Hub Activity Script

  Scenario: Check notification when hub is not owner of the post - Hub Activity Script
    And Make Post - Hub Activity Script
    And Login and give reply to the post - Hub Activity Script
    Then Check activity notification for post - Hub Activity Script