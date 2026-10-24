import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';
import { ArticleFeedItem } from './ArticleFeedItem';

export class YourFeedTab extends BaseComponent {
  #yourFeedLink;

  constructor(page, userId = 0) {
    super(page, userId);
    this.articleFeedItem = new ArticleFeedItem(this.page, userId);
    this.#yourFeedLink = this.page.getByText('Your Feed');
  }

  async assertTabLinkVisible() {
    await this.step(`Assert 'Your Feed' link is visible`, async () => {
      await expect(this.#yourFeedLink).toBeVisible();
    });
  }
}
