Feature: Hub Activity
  @TEST_CH-772
  Scenario: Visit Dev Hub
    Given Verify profile and cookies
    When Go to the Activity page
    And Close the notification
    Then Verify Dev Hub
  @TEST_CH-773
  Scenario: Edit Hub Description
    Given Verify profile page and cookies
    When Go to Activity page
    And Change hub title
    Then Change hub description
  # @TEST_CH-774
  # Scenario: Edit Membership
  #   Given Verify profile page and cookies
  #   When Go to Activity
  #   And Edit role
  #   And Edit Membership
  #   Then Verify edited details
  @TEST_CH-775
  Scenario: Make announcement
    Given Verify profile page and cookies
    When Go to Activity pages
    Then Make Announcement
  @TEST_CH-776
  Scenario: Edit announcement
    Given Verify profile page and cookies
    When Visit Activity page
    And Cancel announcement after edit
    Then Save announcement after edit
  @TEST_CH-777
  Scenario: Unstick announcement
    Given Verify profile page and cookies
    When Redirect to Activity page
    Then Make announcement unsticky
  @TEST_CH-778
  Scenario: Make announcement sticky
    Given Verify profile page and cookies
    When Go to Activity pages
    Then Make announcement sticky
  @TEST_CH-779
  Scenario: Delete announcement
    Given Verify profile page and cookies
    When Go to Activity page
    And Verify announcement not deleted
    Then Delete announcement
  @TEST_CH-780
  Scenario: Create a Post
    Given Verify profile page and cookies
    When Go to Activity page
    Then Create post
  @TEST_CH-781
  Scenario: Switch to Post
    Given Verify profile page and cookies
    When Go to Activity page
    Then Go to post page
  @TEST_CH-782
  Scenario: Edit post
    Given Verify profile page and cookies
    When Go to Activity page
    And Verify post is not edit
    Then Edit post
  @TEST_CH-783
  Scenario: Delete post
    Given Verify profile page and cookies
    When Go to Activity page
    And Verify post is not deleted
    Then Delete post
  @TEST_CH-784
  Scenario: Ask a question
    Given Verify profile page and cookies
    When Go to Activity page
    Then Ask a question
  @TEST_CH-785
  Scenario: Edit a question
    Given Verify profile page and cookies
    When Go to Activity page
    And Check cancel edit
    Then Edit a question
  @TEST_CH-786
  Scenario: Redirect to question page
    Given Verify profile page and cookies
    When Go to Activity page
    Then Go to Question page
  @TEST_CH-787
  Scenario: Add answer
    Given Verify profile page and cookies
    When Go to Activity page
    Then Add answer
  @TEST_CH-788
  Scenario: Add reply to answer
    Given Verify profile page and cookies
    When Go to Activity page
    And Reply to answer
    Then Add more reply to answer
  @TEST_CH-789
  Scenario: Delete reply
    Given Verify profile page and cookies
    When Go to Activity page
    Then Delete Replay
  @TEST_CH-790
  Scenario: Add more answer
    Given Verify profile page and cookies
    When Go to Activity page
    Then Add more answer
  @TEST_CH-791
  Scenario: Give upvote to answer
    Given Verify profile page and cookies
    When Go to Activity page
    Then Upvote answer
  