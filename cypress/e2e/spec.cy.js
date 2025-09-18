describe('🪑 Urban Ladder Bookshelves Filter Test', () => {
  it('Filters open-storage bookshelves under ₹15,000 and displays top 3', () => {
    Cypress.on('uncaught:exception', () => false); // Ignore site errors
 
    // Step 1: Visit Urban Ladder Bookshelves page
    cy.visit('https://www.urbanladder.com/');
    cy.viewport(1280, 800);
    cy.wait(5000);
 
    // Step 2: Apply Storage Type filter
    cy.contains('Storage Furniture').click({ force: true });
    cy.contains('Bookshelves').click({ force: true });
    cy.wait(3000);
    cy.contains("Storage Type").click({ force: true });
    cy.contains('Open Storage').click({ force: true });
 
    // Step 3: Open Price Filter
    cy.contains("ALL FILTERS").click({ force: true });
    cy.contains("Price").click({ force: true });
 
   // Step 4: Drag price slider to ₹15,000
const minPrice = 752;
const maxPrice = 122975;
const targetPrice = 15000;
const percent = (targetPrice - minPrice) / (maxPrice - minPrice);
 
cy.get('.customRangeSlider').then($slider => {
  const sliderWidth = $slider[0].getBoundingClientRect().width;
  const clientX = sliderWidth * percent;
 
  cy.get('div.range-slider__thumb[data-upper="true"]')
    .trigger('mousedown', { which: 1, force: true })
    .trigger('mousemove', { clientX: clientX, force: true })
    .trigger('mouseup', { force: true });
});

 
 
    // Step 6: Apply price filter
    cy.contains('Apply Filter').dblclick({ force: true });
 
    // Step 7: Exclude Out of Stock
    cy.contains("Availability").click({ force: true });
    cy.get('.UnrgZ').click({force:true})
    cy.contains('Apply Filter').click({ force: true });
 
    cy.wait(3000);
 
    // Step 8: Extract top 3 product names and prices
    cy.get('.MniCX .HOVM7').each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).find('.XxwSy').invoke('text').then(name => {
          cy.wrap($el).find('.XxwSy + div').invoke('text').then(priceText => {
            const cleaned = priceText.replace(/[^0-9]/g, '');
            const price = parseFloat(cleaned);
 
            if (!isNaN(price) && price < 15000) {
              cy.log(`🪑 Product ${index + 1}: ${name.trim()} - ₹${price}`);
            } else {
              cy.log(`⚠️ Product ${index + 1} is above ₹15,000 or price not found`);
            }
          });
        });
      }
    });
 
 
  });
});