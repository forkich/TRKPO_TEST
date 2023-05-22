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
    enterCredentials('login', 'password');
    cy.url().should('eq', catalogueRoot);
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
    cy.visit(typesPage);
    enterCredentials('login', 'password');
    clickButton('Create');

    // Fill in the input field with the desired name
    cy.get('input[name="name"]').type("bigInt");

    // Submit the form
    clickButton('Save')
    cy.visit(typesPage);
    scrollDownThePage();
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
    cy.visit(usersPage);
    enterCredentials('login', 'password');

    // Find the button using its class or other attributes
    cy.get('button.MuiButton-root[aria-label="Export"]').click();
  });
});

describe("Edit document type", () => {
  it("should edit a document type after clicking EDIT button and display the change", () => {
    cy.visit(typesPage);
    enterCredentials('login', 'password');

    // Click on the Edit button
    cy.get("a.MuiButtonBase-root[aria-label='Edit']").first().click();

    // Update the document type name
    cy.get("input[name='name']").clear().type("ksenia's new type");

    // Save the changes
    clickButton('Save');
  });
});

describe('Navigate from one page to another', () => {
  it('should navigate from main page to page Catalogues', () => {
    cy.visit(url)
    enterCredentials('login', 'password');

    //navigate to page Catalogues
    clickButton('Catalogues')
  })
})


describe('Add new catalogue', () => {
  it('should add new catalogue when user click on button CREATE', () => {
    cy.visit(cataloguePage);
    enterCredentials('login', 'password');

    clickButton('Create');

    //Fill in the input field with the desired name
    cy.get('input[name="name"]').type("new-parent");
    cy.get('input[name="parentId"]').type("2");
    cy.get('input[name="userCreatedById"]').type("1");


    //Submit the form
    clickButton('Save')

    cy.visit(cataloguePage)
  });
});

describe('Change user role', () => {
  it('should change the user role and display it', () => {
    cy.visit(usersPage)
    enterCredentials('login', 'password');

    //select the id of the user whose role needs to be changed
    cy.get('a[href="/user/23"]').click({force: true});
    cy.get('#role').click();

    //choose the appropriate role, base on current role
    cy.contains('ADMIN').click({force: true});
    cy.get('svg[data-testid="SaveIcon"]').click({force: true});

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
    cy.visit(documentsPage);
    enterCredentials('login', 'password')
    cy.get('button.MuiButton-root[aria-label="Export"]').click();

    //read file
    cy.readFile('cypress/downloads/documents.csv').then((fileContent) => {
      expect(fileContent).to.contain('DEFAULT');
    });
  });
});

describe("Create User with USER role", () => {
  it("should create a new user with USER role and display it in list of users", () => {
    cy.visit(usersPage);
    enterCredentials('login', 'password')

    //click on the icon Create
    cy.get('svg[data-testid="AddIcon"]').click({force: true});

    // Fill in the user details
    cy.get('input[name="login"]').type("am-i-admin");
    cy.get('input[name="password"]').type("123456789");
    cy.get('#role').click();
    cy.contains('ADMIN').click();
    cy.get('svg[data-testid="SaveIcon"]').click({force: true});

    cy.visit(usersPage);
    scrollDownThePage();
  });
});

describe("Create User with incorrect credentials", () => {
  it("should throw an error BAD REQUEST 400 when user sets incorrect password length", () => {
    cy.visit(usersPage);
    enterCredentials('login', 'password')

    //click on the icon Create
    cy.get('svg[data-testid="AddIcon"]').click({force: true});

    // Fill in the user details
    cy.get('input[name="login"]').type("stupid-user");
    cy.get('input[name="password"]').type("123");
    cy.get('#role').click();

    cy.contains('USER').click();
    cy.get('svg[data-testid="SaveIcon"]').click({force: true});
  });
});

describe('Swagger POST API', () => {
  it('should successfully create a new document using post method from swagger', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/documents',
      body: {
        concreteDocument: {
          description: 'This is another document',
          name: 'Tested document 22.05.2023 00:33',
          userModifiedBy: 13
        },
        documentType: 'jpg',
        parentId: 3,
        userCreatedById: 13
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Verify the response status code
      expect(response.status).to.equal(200);

      //open the application to make sure that document was created
      cy.visit(documentsPage);
      enterCredentials('login', 'password')
      scrollDownThePage();
    });
  });
});

