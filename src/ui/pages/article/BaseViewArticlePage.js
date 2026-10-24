import { BasePage } from '../BasePage';
import { ArticleContentBlock } from '../../components/ArticleContentBlock';

export class BaseViewArticlePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.articleContentBlock = new ArticleContentBlock(this.page, userId);
  }
}
