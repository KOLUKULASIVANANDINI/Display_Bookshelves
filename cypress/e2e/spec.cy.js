import urbanLadderPage from '../support/PageObjectModel/bookshelf';
import urbanLadderOasisPage from '../support/PageObjectModel/oasisMenu';

describe('Urban Ladder Bookshelves Filter Test', () => {
  it('Filters open-storage bookshelves under ₹15,000 and displays top 3', () => {
    Cypress.on('uncaught:exception', () => false);

    urbanLadderPage.visitHomePage();
    urbanLadderPage.closePopupIfPresent();
    urbanLadderPage.navigateToBookshelves();
    urbanLadderPage.applyStorageTypeFilter();
    urbanLadderPage.openPriceFilter();
    urbanLadderPage.setPriceSlider();
    urbanLadderPage.applyFilter();
    urbanLadderPage.excludeOutOfStock();
    urbanLadderPage.extractTopProducts();
  });
  
});
