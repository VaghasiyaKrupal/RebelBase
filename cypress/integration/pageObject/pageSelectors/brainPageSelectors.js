const brainPageSelectors = {
    notificationDismiss: '.notification-dismiss',
    inviteMemberButton: '//span[contains(text(),"Invite Members")]',
    inviteModelTextbox: 'input[placeholder="Add multiple email addresses one at a time"]',
    selectProjectFromModel: '.invite-to-hub__group__label',
    sendInviteButton: "//button[contains(text(),'Send invite')]",
    closeModelButton: "//button[contains(text(),'x')]",
    seeAllLink: "//button[contains(text(),'see all')]",
    sendNudgeButton: ".p-item > div.p-item__links button:nth-child(1)",
    deleteButton: '.p-item > div.p-item__links button:nth-child(2)',
    notification: '.notification',
    inviteMemberButtonInModel: '//div[@aria-label="Hub Pending Invitations Modal"]//span[text()="Invite Members"]',
    feedbackNotification: '.feedback__message'
}
export { brainPageSelectors }