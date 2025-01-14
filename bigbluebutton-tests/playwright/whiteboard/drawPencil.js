const { expect } = require('@playwright/test');
const e = require('../core/elements');
const { ELEMENT_WAIT_LONGER_TIME } = require('../core/constants');
const { MultiUsers } = require('../user/multiusers');
const { constructClipObj } = require('../core/util');

class DrawPencil extends MultiUsers {
  constructor(browser, context) {
    super(browser, context);
  }

  async test() {
    await this.modPage.waitForSelector(e.whiteboard, ELEMENT_WAIT_LONGER_TIME);

    const wbBox = await this.modPage.getElementBoundingBox(e.whiteboard);
    const clipObj = constructClipObj(wbBox);
    const screenshotOptions = {
      maxDiffPixels: 1000,
      clip: clipObj,
    };
    
    await this.modPage.waitAndClick(e.wbPencilShape);

    const moveOptions = { steps: 50 }; // to slow down
    await this.modPage.page.mouse.move(wbBox.x + 0.2 * wbBox.width, wbBox.y + 0.2 * wbBox.height);
    await this.modPage.page.mouse.down();
    await this.modPage.page.mouse.move(wbBox.x + 0.4 * wbBox.width, wbBox.y + 0.4 * wbBox.height, moveOptions);
    await this.modPage.page.mouse.move(wbBox.x + 0.6 * wbBox.width, wbBox.y + 0.2 * wbBox.height, moveOptions);
    await this.modPage.page.mouse.move(wbBox.x + 0.8 * wbBox.width, wbBox.y + 0.4 * wbBox.height, moveOptions);
    await this.modPage.page.mouse.up();

    await expect(this.modPage.page).toHaveScreenshot('moderator1-pencil.png', screenshotOptions);

    await expect(this.modPage2.page).toHaveScreenshot('moderator2-pencil.png', screenshotOptions);
  }
}

exports.DrawPencil = DrawPencil;
