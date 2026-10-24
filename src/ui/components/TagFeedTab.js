import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class TagFeedTab extends BaseComponent {
  #feedToggle;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#feedToggle = this.page.locator('.feed-toggle');
  }

  #tagTabLink(tagName) {
    return this.#feedToggle.locator('a.nav-link').filter({ hasText: tagName });
  }

  #activeTagTab(tagName) {
    // працює і якщо `active` стоїть на <a>, і якщо на <li>
    return this.#feedToggle
      .locator('a.nav-link.active, li.active > a.nav-link')
      .filter({ hasText: tagName });
  }

  #articlePreview(title) {
    return this.page.locator('.article-preview').filter({ hasText: title });
  }

  async assertTabLinkVisible(tagName) {
    await this.step(`Assert '${tagName}' tag tab is visible`, async () => {
      await expect(this.#tagTabLink(tagName)).toBeVisible();
    });
  }

  async assertTabActive(tagName) {
    await this.step(`Assert '${tagName}' tag tab is active`, async () => {
      await expect(this.#activeTagTab(tagName)).toBeVisible();
    });
  }

  async assertArticleVisible({ title, author, tagName }) {
    await this.step(
      `Assert article '${title}' is visible in the '${tagName}' Tag Feed`,
      async () => {
        const preview = this.#articlePreview(title);
        await expect(preview).toBeVisible();
        await expect(preview).toContainText(author);
        await expect(preview).toContainText(tagName);
      },
    );
  }
}
