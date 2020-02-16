const fs = require('fs');
const webdriverio = require('webdriverio');
const options = require('../wdio.conf');
const client = webdriverio.multiremote(options);

jest.setTimeout(30000);

beforeAll(() => {
  return client.init().url('https://onexsan.github.io/filileeva-ls/admin/#/login');
});

test('На странице есть кнопка авторизации', () => {
  return client
    .isExisting('.btn__auth')
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then(browsers => {
      for (const browserName in browsers) {
        fs.writeFileSync(
          `./screenshots/${browserName}_has_login_button.png`,
          browsers[browserName].value,
          'base64',
        );
      }
    });
});

afterAll(() => {
  return client.end();
});
