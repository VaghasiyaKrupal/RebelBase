Feature: Hub Activity

  # Scenario: C177 Visit Dev Hub [Hub Activity]
  #   Given Verify profile and cookies
  #   When Go to the Activity page
  #   And Close the notification
  #   Then Verify Dev Hub

  # Scenario: C178 Edit Hub Description[Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Change hub title
  #   Then Change hub description

  Scenario: Edit Membership [Hub Activity]
    Given Verify profile page and cookies
    When Go to Activity
    And Edit role
    And Edit Membership
    Then Verify edited details

  # Scenario: C180 Make announcement [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity pages
  #   Then Make Announcement

  # Scenario: C181 Edit announcement [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Visit Activity page
  #   And Cancel announcement after edit
  #   Then Save announcement after edit

  # Scenario: C182 Unstick announcement [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Redirect to Activity page
  #   Then Make announcement unsticky

  # Scenario: C183 Make announcement sticky [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity pages
  #   Then Make announcement sticky

  # Scenario: C184 Delete announcement [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Verify announcement not deleted
  #   Then Delete announcement

  # Scenario: C185 Create a Post [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Create post

  # Scenario: C186 Switch to Post [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Go to post page

  # Scenario: C187 Edit post [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Verify post is not edit
  #   Then Edit post

  # Scenario: C188 Delete post [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Verify post is not deleted
  #   Then Delete post

  # Scenario: C189 Ask a question [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Ask a question

  # Scenario: C190 Edit a question [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Check cancel edit
  #   Then Edit a question

  # Scenario: C191 Redirect to question page [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Go to Question page

  # Scenario: C192 Add answer [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Add answer

  # Scenario: C193 Add reply to answer [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Reply to answer
  #   Then Add more reply to answer

  # Scenario: C194 Delete reply [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Delete Replay

  # Scenario: C195 Add more answer [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Add more answer

  # Scenario: C196 Give upvote to answer [Hub Activity]
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   Then Upvote answer

  # Scenario: QandA create reply delete
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Ask question
  #   And Answer question
  #   And Reply answer
  #   And Delete reply from question
  #   And Delete answer from question
  #   Then Delete Question

  # Scenario: Create offer reply and delete
  #   Given Verify profile page and cookies
  #   When Go to Activity page
  #   And Create offer
  #   And Reply to offer
  #   And Give Kudos and edit offer
  #   Then Delete Offer

  @focus
  Scenario: Edit role from activity page
    Given Verify profile page and cookies
    When User at Activity page
    And Edit admin role card
    And Edit support role card
    Then Send invitation