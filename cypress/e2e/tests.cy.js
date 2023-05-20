describe('Open application', () => {
  it('should open the application', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should log in in with correct credentials', () => {
    cy.get('input[name="username"]').type('login');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/catalogue/root');
  });
});

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display an error message 404 if incorrect credentials are entered', () => {
    cy.get('input[name="username"]').type('invalid-username');
    cy.get('input[name="password"]').type('invalid-password');
    cy.get('button[type="submit"]').click();
  });
});

describe('Add new type', () => {
  it('should add new type when user click on button CREATE', () => {
    cy.visit('http://localhost:3000/type'); // Replace with the URL of your React app
    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()
    // Click on the "Create" button to navigate to the create form
    cy.contains("Create").click();

    // Fill in the input field with the desired name
    cy.get('input[name="name"]').type("bigInt");

    // Submit the form
    cy.contains("Save").click();
    cy.visit('http://localhost:3000/type')
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
    cy.visit('http://localhost:3000/user');
    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()

    // Find the button using its class or other attributes
    cy.get('button.MuiButton-root[aria-label="Export"]').click();
  });
});

describe("Edit document type", () => {
  it("should edit a document type after clicking EDIT button and display the change", () => {
    cy.visit("http://localhost:3000/type");

    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()
    // Click on the Edit button
    cy.get("a.MuiButtonBase-root[aria-label='Edit']").first().click();


    // Update the document type name
    cy.get("input[name='name']").clear().type("ksenia");

    // Save the changes
    cy.contains("Save").click();

    // Verify that the document type is updated
    cy.contains("NEW-TYPE").should("exist");

  });
});

describe('Navigate from one page to another', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000')
  })

  it('should navigate from main page to page Catalogues', () => {
    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form and open main page
    cy.get('button[type="submit"]').click()

    //navigate to page Catalogues
    cy.contains('Catalogues').click();
  })
})


describe('Add new catalogue', () => {
  it('should add new catalogue when user click on button CREATE', () => {
    cy.visit('http://localhost:3000/catalogue');
    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()
    // Click on the "Create" button to navigate to the create form
    cy.contains("Create").click();

    // // Fill in the input field with the desired name
    cy.get('input[name="name"]').type("new-parent");
    cy.get('input[name="parentId"]').type("2");
    cy.get('input[name="userCreatedById"]').type("1");
    //
    // // Submit the form
    cy.contains("Save").click({force: true});
    cy.visit('http://localhost:3000/catalogue')
  });
});

describe('Change user role', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/user')
  })

  it('should change the user role and display it', () => {
    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form and open main page
    cy.get('button[type="submit"]').click()

    //select the id of the user whose role needs to be changed
    cy.get('a[href="/user/13"]').click({force: true});
    cy.get('#role').click({force: true});

    //choose the appropriate role, base on current role
    cy.contains('USER').click({force: true});
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
    cy.visit('http://localhost:3000/documents');
    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()

    cy.get('button.MuiButton-root[aria-label="Export"]').click();

    //read file
    cy.readFile('cypress/downloads/documents.csv').then((fileContent) => {
      expect(fileContent).to.contain('DEFAULT');
    });
  });
});

describe("Create User with USER role", () => {
  it("should create a new user with USER role and display it in list of users", () => {
    cy.visit("http://localhost:3000/user");

    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()


    //click on the icon Create
    cy.get('svg[data-testid="AddIcon"]').click({force: true});

    // Fill in the user details
    cy.get('input[name="login"]').type("am-i-admin");
    cy.get('input[name="password"]').type("123456789");
    cy.get('#role').click();
    cy.contains('ADMIN').click();
    cy.get('svg[data-testid="SaveIcon"]').click({force: true});

    cy.visit("http://localhost:3000/user");

  });
});

describe("Create User with incorrect credentials", () => {
  it("should throw an error BAD REQUEST 400 when user sets incorrect password length", () => {
    cy.visit("http://localhost:3000/user");

    // Fill in the login form
    cy.get('input[name="username"]').type('login')
    cy.get('input[name="password"]').type('password')

    // Submit the login form
    cy.get('button[type="submit"]').click()


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