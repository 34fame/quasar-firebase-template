describe('My First Test', () => {
   it('Creates a User', () => {
      cy.visit('/secure/users')

      cy.get('th div').first().click()
      // cy.get('[data-cy=delete]').click()

      // cy.get('[data-cy=create]').click()
      // cy.get('[data-cy=name]').type('Troy').should('have.value', 'Troy')
      // cy.get('[data-cy=email]')
      //    .type('troy@morelands.net')
      //    .should('have.value', 'troy@morelands.net')
      // cy.get('[data-cy=icon]').click()
      // cy.get('span').filter('.block').eq(10).click()
      // cy.get('[data-cy=close]').click()
      // cy.get('[data-cy=member]').click()
      // cy.get('[data-cy=save]').click()
      // cy.get('tbody tr td').next().should('have.value', 'Troy')
   })
})
