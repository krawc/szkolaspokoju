describe('SearchScreen', () => {
  it('loads Search', () => {
    cy.visit('/')

    cy.contains('Search').click()

    cy.contains('Search')

    cy.contains('Current Streak')
    cy.contains('0 days')

    cy.contains('Total Sessions')
    cy.contains('0 sessions')

    cy.contains('Time Meditating')
    cy.contains('0 minutes')
  })
})
