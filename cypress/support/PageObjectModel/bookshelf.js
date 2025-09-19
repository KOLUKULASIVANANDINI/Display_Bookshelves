class UrbanLadderPage {
  visitHomePage() {
    cy.visit('https://www.urbanladder.com/');
    cy.viewport(1280, 800);
    cy.wait(5000);
  }
 
  closePopupIfPresent() {
    cy.get('body').then($body => {
      if ($body.find('.close-reveal-modal').length) {
        cy.get('.close-reveal-modal').click();
      }
    });
  }
 
  navigateToBookshelves() {
    cy.contains('Storage Furniture').click({ force: true });
    cy.contains('Bookshelves').click({ force: true });
    cy.wait(3000);
  }
 
  applyStorageTypeFilter() {
    cy.contains("Storage Type").click({ force: true });
    cy.contains('Open Storage').click({ force: true });
  }
 
  openPriceFilter() {
    cy.contains("ALL FILTERS").click({ force: true });
    cy.contains("Price").click({ force: true });
  }
 
  setPriceSlider(targetPrice = 15000, minPrice = 752, maxPrice = 122975) {
    const percent = (targetPrice - minPrice) / (maxPrice - minPrice);
 
    cy.get('.customRangeSlider').then($slider => {
      const sliderWidth = $slider[0].getBoundingClientRect().width;
      const clientX = sliderWidth * percent;
 
      cy.get('div.range-slider__thumb[data-upper="true"]')
        .trigger('mousedown', { which: 1, force: true })
        .trigger('mousemove', { clientX: clientX, force: true })
        .trigger('mouseup', { force: true });
    });
  }
 
  applyFilter() {
    cy.contains('Apply Filter').dblclick({ force: true });
  }
 
  excludeOutOfStock() {
    cy.contains("Availability").click({ force: true });
    cy.get('.UnrgZ').click({ force: true });
    cy.contains('Apply Filter').click({ force: true });
    cy.wait(3000);
  }
 
  extractTopProducts(limit = 3, maxPrice = 15000) {
    cy.get('.MniCX .HOVM7').each(($el, index) => {
      if (index < limit) {
        cy.wrap($el).find('.XxwSy').invoke('text').then(name => {
          cy.wrap($el).find('.XxwSy + div').invoke('text').then(priceText => {
            const cleaned = priceText.replace(/[^0-9]/g, '');
            const price = parseFloat(cleaned);
 
            if (!isNaN(price) && price < maxPrice) {
              cy.log(`Product ${index + 1}: ${name.trim()} - ₹${price}`);
            } else {
              cy.log(`Product ${index + 1} is above ₹${maxPrice} or price not found`);
            }
          });
        });
      }
    });
  }
}
 
export default new UrbanLadderPage();