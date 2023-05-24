import {url, typesPage, catalogueRoot, cataloguePage, usersPage, documentsPage} from "./constants";
import {enterCredentials, scrollDownThePage, clickButton} from './functions'


describe('Open application', () => {
  it('should open the application', () => {
    cy.visit(url);
  })
})

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('should log in in with correct credentials', () => {
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('should display an error message 404 if incorrect credentials are entered', () => {
    enterCredentials('invalid-login', 'invalid-password')
  });
});

describe('Add new type', () => {
  it('should add new type when user click on button CREATE', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe('Export users', () => {
  beforeEach(() => {
    Cypress.config('chromePreferences', {
      download: {
        default_directory: 'cypress/downloads',
      },
    });
  });

  it('should download the list of users after clicking EXPORT button', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe("Edit document type", () => {
  it("should edit a document type after clicking EDIT button and display the change", () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe('Navigate from one page to another', () => {
  it('should navigate from main page to page Catalogues', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  })
})


describe('Add new catalogue', () => {
  it('should add new catalogue when user click on button CREATE', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe('Change user role', () => {
  it('should change the user role and display it', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')

  })
})

describe('Export documents info', () => {
  beforeEach(() => {
    Cypress.config('chromePreferences', {
      download: {
        default_directory: 'cypress/downloads',
      },
    });
  });

  it('should download the list of all documents and read the downloaded file', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
    });
  });

describe("Create User with USER role", () => {
  it("should create a new user with USER role and display it in list of users", () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe("Create User with incorrect credentials", () => {
  it("should throw an error BAD REQUEST 400 when user sets incorrect password length", () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
  });
});

describe('Swagger POST API', () => {
  it('should successfully create a new document using post method from swagger', () => {
      cy.visit(url);
      enterCredentials('invalid-login', 'invalid-password')
    });
  });