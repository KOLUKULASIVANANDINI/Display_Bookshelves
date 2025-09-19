describe('Urban Ladder - Numbered Oasis Section Items', () => {
  it('Logs each Oasis sub-item with sequential numbering', () => {
    Cypress.on('uncaught:exception', () => false);
 
    // Visit homepage
    cy.visit('https://www.urbanladder.com/');
    cy.viewport(1280, 800);
    cy.wait(3000);
 
    // Hover over "New Arrivals" and "Oasis"
    cy.contains('New Arrivals').trigger('mouseover');
    cy.contains('Oasis').trigger('mouseover');
    cy.wait(2000);
 
    // Select and log each item with numbering
    cy.get('.ZDF6_ > :nth-child(1)').each(($el, index) => {
      cy.wrap($el)
        .scrollIntoView()
        .invoke('text')
        .then(text => {
          cy.log(`${index + 1}. ${text.trim()}`);
        });
 
      cy.wait(300); // optional pause for clarity
    });
 
    cy.scrollTo('bottom');
  });
});