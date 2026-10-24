import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class ArticleFeedItem extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  #articlePreview(title) {
    return this.page.locator('.article-preview').filter({ hasText: title });
  }

  async assertVisible({ title, author, tagName }) {
    await this.step(
      `Assert article '${title}' is visible in the feed`,
      async () => {
        const preview = this.#articlePreview(title);
        await expect(preview).toBeVisible();

        if (author) {
          await expect(preview).toContainText(author);
        }
        if (tagName) {
          await expect(preview).toContainText(tagName);
        }
      },
    );
  }

  async assertVisibleWhenAvailable({ title, author, tagName }) {
    await this.step(
      `Assert article '${title}' is visible in the feed after refresh`,
      async () => {
        await expect(async () => {
          await this.page.reload();
          await expect(this.#articlePreview(title)).toBeVisible({
            timeout: 2000,
          });
        }).toPass({ timeout: 25000 });

        await this.assertVisible({ title, author, tagName });
      },
    );
  }

  async assertNotVisible(title) {
    await this.step(
      `Assert article '${title}' is not visible in the feed`,
      async () => {
        await expect(this.#articlePreview(title)).toBeHidden();
      },
    );
  }

  async openArticle(title) {
    await this.step(`Open article '${title}' from the feed`, async () => {
      await this.#articlePreview(title).getByRole('heading').click();
    });
  }

  async openArticleWhenAvailable(title) {
    await this.step(`Open article '${title}' from the feed`, async () => {
      await expect(async () => {
        await this.page.reload();
        await expect(this.#articlePreview(title)).toBeVisible({
          timeout: 2000,
        });
      }).toPass({ timeout: 25000 });

      await this.#articlePreview(title).getByRole('heading').click();
    });
  }
}
