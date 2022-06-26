import { IS_MAINNET } from 'src/constants'

context('Publication Page', () => {
  before(() => {
    cy.visit(
      `http://localhost:4783/posts/${IS_MAINNET ? '0x0d-0x0f' : '0x15-0x0a'}`
    )
  })

  it('should render publication', () => {
    cy.get('[data-test=publication]')
  })

  it('should render publication timestamp', () => {
    cy.get('[data-test=publication-timestamp]')
  })

  it('should render publication content', () => {
    cy.get('[data-test=publication]')
  })

  it('should render publication comment button', () => {
    cy.get('[data-test=publication-comment]')
  })

  it('should render publication mirror button', () => {
    cy.get('[data-test=publication-mirror]')
  })

  it('should render publication like button', () => {
    cy.get('[data-test=publication-like]')
  })

  it('should render publication comment button', () => {
    cy.get('[data-test=publication-comment]')
  })

  it('should render publication collect', () => {
    cy.get('[data-test=publication-collect]')
  })

  it('should render publication more', () => {
    cy.get('[data-test=publication-more]')
  })

  it('should render publication ipfs hash', () => {
    cy.get('[data-test=ipfs-hash]')
  })

  it('should render publication source', () => {
    cy.get('[data-test=publication-source]')
  })
})

export {}
