const puppeteer = require('puppeteer')

const main = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')

    //login page screenshot
    await page.screenshot({ path: 'loginPage.png' })

    //minimize login form
    await page.click('login')
    await page.screenshot({ path: 'minimizedLogin.png' })


    await browser.close()
}

main()