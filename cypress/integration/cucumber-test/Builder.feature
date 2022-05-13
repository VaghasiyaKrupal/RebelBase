Feature: Builders

  Scenario: Empty builder's answer [Builder'sAnswer]
    Given Visit builder answer page
    When Close the notification
    Then Find paragraph from answer

  # Scenario: Builder's answer with some text [Builder'sAnswer]
  #   Given Visit builder answer page
  #   When Close the notification
  #   Then Find Lorem Ipsum from answer
  
  Scenario: Save builder's answer with some random text [Builder'sAnswer]
    Given Visit builder answer page
    When Close the notification
    And Enter builder answer with random text
    Then Click on the save + next button

  Scenario: try to redirect to some other page without saving answer [Builder'sAnswer]
    Given Visit builder topic 4 answer page
    When Close the notification
    And Enter builder answer with random text
    Then Click on MyEvent from side bar

  Scenario: try to close browser without saving answer [Builder'sAnswer]
    Given Visit builder topic 5 answer page
    When Close the notification
    And Enter builder answer with random text
    And Enter video link
    And Save answer and verify location
    Then Verify Notification text

  Scenario: Go to review and publish section after savng answer [Builder'sAnswer]
    Given Visit builder topic 44 answer page
    When Close the notification
    And Enter random answer
    And Save the answer
    And Publish answer
    Then Verify project path

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

  Scenario: change track on builder page > it should change builders types
    Given Visit builder page on rebelbase portal
    When Verify builder page is loaded
    And Close the notification
    And Switch track from builder page
    Then Verify next track
  
  Scenario: change track on project builder page and complete one type of builder answers
    Given Visit builder page on rebel base portal
    When Go to project builder page
    And Change project track
    And Complete answer one type of answer
    And Go to review and publish page and publish answer
    And Re check answer
    Then Re publish the answer