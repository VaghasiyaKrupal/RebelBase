const hubGroupPageSelector = {
    existGroupSelector: '.group-overview__group-wrap article',
    groupScheduleSection: '.group__info--empty',
    groupNameSelector: '[data-testid="group_name"]',
    activeGroupSelector: '.group-overview__group-wrap .group-overview__group--active',
    addMemberButton: '.group__add-members-btn',
    editPenButton: '.edit-pen__btn__group-title',
    setScheduleEditPen: '//a[contains(text(),"set schedule")]',
    memberPlusButton: '.plusSign',
    inviteThemButton: "//button[contains(text(),'Invite them.')]",
    memberSearchTextbox: 'input[placeholder="search for member in "]',
    inviteMemberTextbox: 'input[placeholder="search for member in Dev Hub"]',
    supportRole: '[for="grant_support_field"] > .select-role__name',
    searchMember:'[placeholder="search for  Member"]',
    popupNotes: '.popUp__note',
    firstExistGroup: '.group-overview__title-wrap > h4',
    saveScheduleButton: "//button[contains(text(),'save schedule')]",
    backToGroupButton: '//a[normalize-space()="< back to group"]',
    scheduleFromDate: '[placeholder="MMM DD, YYYY"]',
    scheduleTime: '[placeholder="00:00am"]',
    groupHeading: '.group-overview__title-wrap > h4',
    modelCloseButton: '.ReactModal__Content > .btn-x',
    signupButton: "//button[contains(text(),'Signup')]",
    allowID: '#allowAll',
    pramotionalEmailID: '#promotionalEmails',
    inboxIcon: '[data-testid="DraftsIcon"]',
    acceptButton: "(//button[text()='accept'])[1]",
    skipForNowButton: '//button[normalize-space()="skip for now >"]',
    editPen: "(//span[contains(@class,'edit-pen')])[2]",
    radioCheck: ".clickable__check-round",
    addMenagerButton: "//button[normalize-space()='add managers']",
    editPenManager: '.group__admins > .title-wrap > .edit-pen__btn > .edit-pen',
    editManagerButton: "//h3[normalize-space()='Edit Group Managers']",
    searchManagerTextbox: "input[placeholder='search for Manager']",
    addManagerPlushSign: "//button/span[@class='plusSign']/parent::button",
    projectDeactiveHover: ':nth-child(1) > div.group-overview__title-wrap > div > div > button:nth-child(1)',
    deactivateButton: "//div[@class='ReactModalPortal']//button[contains(text(),'Deactivate')]",
    groupName:'[name="group_name"]',
    addMemberBtn:"//button[contains(text(),'add members')]",
    projectTab:'#hub-user-management-tab-0',
    builderTab:'#hub-user-management-tab-1',
    groupMemberTab:'#hub-user-management-tab-2',
    addMember:'//button[text()="Add Members"]',
    deleteButton:'[data-testid="DeleteOutlineIcon"]',
    newNotification:'.MuiAlert-message',
    inviteMembertoGroup:'[placeholder="Add Hub Members by Email"]'
}
export { hubGroupPageSelector }