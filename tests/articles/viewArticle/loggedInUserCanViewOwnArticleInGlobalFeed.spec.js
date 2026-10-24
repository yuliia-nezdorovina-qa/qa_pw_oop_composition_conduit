import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/InternalViewArticlePage';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { GlobalFeedTab } from '../../../src/ui/components/GlobalFeedTab';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithOneTag);
});

test('Logged-in user can view own article in the Global Feed section;', async ({
  articleWithOneTag,
  page,
  user,
}) => {
  const internalViewArticlePage = new InternalViewArticlePage(page);
  const homePage = new InternalHomePage(page);

  await internalViewArticlePage.open(articleWithOneTag.url);
  await internalViewArticlePage.header.clickHomeLink();

  await homePage.globalFeed.assertTabLinkVisible();
  await homePage.globalFeed.open();
  await homePage.globalFeed.articleFeedItem.assertVisible({
    title: articleWithOneTag.title,
    author: user.username,
    tagName: articleWithOneTag.tags[0],
  });
});
