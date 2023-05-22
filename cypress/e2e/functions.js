export const scrollDownThePage = () => {
    cy.get('body').then(() => {
        cy.scrollTo('bottom', { duration: 1000 });
    });
}

export const enterCredentials = (login, password) => {
    cy.get('input[name="username"]').type(login)
    cy.get('input[name="password"]').type(password)

    // Submit the login form
    cy.get('button[type="submit"]').click()
}

export const clickButton = (action) => {
    cy.contains(action).click({force: true});
}