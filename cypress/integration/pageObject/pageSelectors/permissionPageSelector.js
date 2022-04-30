const permissionsPageSelector = {
    selectSetting:'[data-testid=SettingsIcon]',
    selectCypressProject1:'li:nth-child(3) > span:nth-child(1)',
    accountSetting:'li:nth-child(1) > span:nth-child(1)',
    firstnameTextbox:'#first_name',
    lastnameTextbox:'#last_name',
    addEmailButton:"//button[normalize-space()='add email']",
    emailTextbox:'input[name="email_address"]',
    addButton:'//button[text()="add"]',
    removeButton:"//button[contains(text(),'remove')]",
    valueSaveButton:'input[value="Save"]',
    plushButton:'[data-testid="AddIcon"] > path',
    teamMemberTextbox:'.person__role__edit-wrap > input',
    projectStageSelection:'#project_stage',
}
export{permissionsPageSelector}