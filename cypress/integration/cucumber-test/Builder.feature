Feature: Builders

  Scenario: Empty builder's answer [Builder'sAnswer]
    Given Visit builder answer page
    When Close the notification
    Then Find paragraph from answer

  # Scenario: Builder's answer with some text [Builder'sAnswer]
  #   Given Visit builder answer page
  #   When Close the notification
  #   Then Find Lorem Ipsum from answer
  
  @TEST_CH-749
  Scenario: Save builder's answer with some random text
    Given Visit builder answer page
    When Close the notification
    And Enter builder answer with random text
    Then Click on the save + next button

  @TEST_CH-750
  Scenario: try to redirect to some other page without saving answer
    Given Visit builder topic 4 answer page
    When Close the notification
    And Enter builder answer with random text
    Then Click on MyEvent from side bar

  @TEST_CH-867
  Scenario: try to close browser without saving answer
    Given Visit builder topic 5 answer page
    When Close the notification
    And Enter builder answer with random text
    And Enter video link
    And Save answer and verify location
    Then Verify Notification text

  @TEST_CH-752
  Scenario: Go to review and publish section after saving answer
    Given Visit builder topic 44 answer page
    When Close the notification
    And Enter random answer
    And Save the answer
    And Publish answer
    Then Verify project path

  @TEST_CH-758
  Scenario: should show save answers warning message when moving from builder answer page during answering questions
    Given Visit the rebelbase portal
    When Verify page is loaded successfully
    And Close the notification
    And Go to the builder page
    And Go to answer page
    And Go to direct answer page
    And Enter video url ans save answer
    And Enter Image url and save answer
    Then Enter answer and save it

  @TEST_CH-754
  Scenario: change track on builder page > it should change builders types
    Given Visit builder page on rebelbase portal
    When Verify builder page is loaded
    And Close the notification
    And Switch track from builder page
    Then Verify next track
  
  @TEST_CH-757
  Scenario: change track on project builder page and complete one type of builder answers
    Given Visit builder page on rebel base portal
    When Go to project builder page
    And Change project track
    And Complete answer one type of answer
    And Go to review and publish page and publish answer
    And Re check answer
    Then Re publish the answer