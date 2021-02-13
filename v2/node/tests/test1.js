import { Selector } from 'testcafe';

    const title = Selector('h1');
    const tableRows = Selector('tbody > tr');
    const firstReport = Selector('tbody > tr').withText('1');
    const addReportButton = Selector('a.btn.btn-sm.btn-success.mr-1');
    const userSelect = Selector('select[formControlName="accountId"]');
    const userOption = userSelect.find('option');
    const typeSelect = Selector('select[formControlName="type"]');
    const typeOption = typeSelect.find('option');
    const codeSelect = Selector('select[formControlName="code"]');
    const codeOption = codeSelect.find('option');
    const saveButton = Selector('button[type="submit"]');
    const NetworkReport = Selector('tbody > tr').withText('20');
    const deleteButton = Selector('button[type="delete"]');

fixture('Node Reports')
  .page('http://localhost:4200/report');

test('All Reports', async (t) => {
  // check title, add report button, table rows, and report exists
  await t
    .expect(title.innerText).eql('Reports')
    .expect(addReportButton.innerText).eql('Create Report')
    .expect(tableRows.count).eql(2)
    .expect(firstReport.exists).ok();
});

test('New Report', async (t) => {
    
    // click add report button
    await t
      .click(addReportButton)
      .expect(title.innerText).eql('Create Report');
    // fill out form
    await t
    .click(userSelect)
        .click(userOption.nth(2))
    .click(typeSelect)
        .click(typeOption.nth(1))
    .click(codeSelect)
        .click(codeOption.nth(1))
    .typeText('input[formControlName="reportText"]', '"2nd Test Executed with Sucess"')
      .click(saveButton)
    // check title, add report button, table rows, and report exists
  await t
    .expect(title.innerText).eql('Reports')
    .expect(addReportButton.innerText).eql('Create Report')
    .expect(tableRows.count).eql(3)
    .expect(firstReport.exists).ok();
  });

test('Delete Report', async (t) => {
    // click delete button
    await t
      .click(NetworkReport.find('button[type=Delete]'))
    // check title, table rows, and updated report exists
    await t
    .expect(title.innerText).eql('Reports')
    .expect(tableRows.count).eql(2)
    .expect(firstReport.exists).ok()
    .expect(NetworkReport.exists).notOk();
  });