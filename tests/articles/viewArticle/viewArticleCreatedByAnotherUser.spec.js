import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/InternalViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('View an article created by another user', async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  const internalViewArticlePage = new InternalViewArticlePage(pages[1], 2);

  await internalViewArticlePage.open(articleWithoutTags.url);

  await internalViewArticlePage.articleContentBlock.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );
  await internalViewArticlePage.articleContentBlock.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await internalViewArticlePage.articleContentBlock.assertArticleAuthorNameIsVisible(
    users[0].username,
  );
});
