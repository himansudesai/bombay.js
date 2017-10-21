import JokesHelper from './jokesHelper';
import AlbumsHelper from './albumsHelper';
import SettingsHelper from './settingsHelper';

const jokesHelper = new JokesHelper();
const albumsHelper = new AlbumsHelper();
const settingsHelper = new SettingsHelper();

let albumsEndpoint;

describe('JavaScript addition operator', function () {

  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  it('does some bugs stuff', function (done) {
    expect(true).toBe(true);
    done();
  })

  it('does end user style testing ui testing', function (done) {
    const conn = bombay.server.connect();
    console.log('conn = ' + conn);

    //albumsEndpoint = bombay.server.configureEndpoint('GET', 'albums');

    conn
    .then( visitJokesPage )
    .then( testJokesPage )
    .then( visitSettingsPage )
    .then( testSettingsPage )
    .then( testAlbumsPage )
    .then( visitJokesPage )
    .then(function() {
      done();
    }).catch(function (err) {
      console.log('++++ Unexpected error in spec.  ' + err + '\nExiting...');
//      expect(err).toBe(undefined);
      done(-1);
    });

  })
})

function visitJokesPage() {
  return bombay.client.visit('/#/jokes');
}

function testJokesPage() {
  return jokesHelper.jokesPageTests();
}

function visitSettingsPage() {
  return bombay.client.visit('/#/settings');
}

function testSettingsPage() {
  return settingsHelper.settingsPageTests();
}

function testAlbumsPage() {
  return albumsHelper.albumsPageTests();
}
