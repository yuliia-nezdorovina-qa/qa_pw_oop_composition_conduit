import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class PopularTags extends BaseComponent {
  #tagList;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#tagList = this.page.locator('.sidebar .tag-list');
  }

  #tagPill(tagName) {
    return this.#tagList
      .locator('.tag-pill')
      .getByText(tagName, { exact: true });
  }

  async assertTagVisible(tagName) {
    await this.step(
      `Assert '${tagName}' tag is visible in the Popular Tags section`,
      async () => {
        await expect(this.#tagPill(tagName)).toBeVisible();
      },
    );
  }

  async clickTag(tagName) {
    await this.step(
      `Click '${tagName}' tag in the Popular Tags section`,
      async () => {
        await this.#tagPill(tagName).click();
      },
    );
  }
}
