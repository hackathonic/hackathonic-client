require('dotenv').config({
  path: `${__dirname}/../../../.env`
});

import { Selector, ClientFunction } from 'testcafe';
import Page from './Page';

const AC_KEY = 'hck:access_token';
const {
  DEV_HOST,
  DEV_PORT,
  TEST_PERSON0_OAUTH_TOKEN
} = process.env;

const setAccessToken = ClientFunction(() => localStorage.setItem(key, value), { dependencies: {
  key: AC_KEY,
  value: TEST_PERSON0_OAUTH_TOKEN
}});

fixture `Example page`
    .page `http://${DEV_HOST}:${DEV_PORT}`
    .beforeEach( async t => await setAccessToken());

const page = new Page();

test('Checks for form after clicking link', async t => {
  await t.click(page.linkToCreationForm)
         .expect(page.creationForm.exists).ok();
});

test('Fill the form and creates a hackathons', async t => {
  await page.fillForm(t, {
    name: 'My test hackathons'
  })
});
