import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/InternalViewArticlePage';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithOneTag);
});

test('Logged-in user can find own article by Tag from the Popular tags section and view in the Tag Feed', async ({
  articleWithOneTag,
  page,
  user,
}) => {
  const internalViewArticlePage = new InternalViewArticlePage(page);
  const homePage = new InternalHomePage(page);
  const tag = articleWithOneTag.tags[0];

  await internalViewArticlePage.open(articleWithOneTag.url);
  await internalViewArticlePage.header.clickHomeLink();

  await homePage.popularTags.assertTagVisible(tag);
  await homePage.popularTags.clickTag(tag);

  await homePage.tagFeed.assertTabLinkVisible(tag);
  await homePage.tagFeed.assertTabActive(tag);
  await homePage.tagFeed.assertArticleVisible({
    title: articleWithOneTag.title,
    author: user.username,
    tagName: tag,
  });
});
