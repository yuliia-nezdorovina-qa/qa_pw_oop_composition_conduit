// import { expect } from '../../../common/helpers/pw';
import { BaseViewArticlePage } from './BaseViewArticlePage';
import { AuthorsArticleContentBlock } from '../../components/AuthorsArticleContentBlock';

export class InternalViewArticlePage extends BaseViewArticlePage {
  articleId;

  constructor(page, userId = 0) {
    super(page, userId);
    this.authorsArticleContentBlock = new AuthorsArticleContentBlock(
      this.page,
      userId,
    );
  }
}
