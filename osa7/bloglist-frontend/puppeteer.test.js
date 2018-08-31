describe('note app', () => {

    it('renders main page', async () => {
      const page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3000')
      const textContent = await page.$eval('body', el => el.textContent)
  
      expect(textContent.includes('Muistiinpanot')).toBe(true)
    })
  
  })
  