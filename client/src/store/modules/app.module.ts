import ArticleService from '@/services/ArticleService';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

type ArticleListType = Array<{
    id: string;
    image: string;
    title: string;
    subtitle: string;
    tags: string[];
    path: string;
    views?: number,
    marked: boolean
}>


@Module({ namespaced: true })
class App extends VuexModule {
  public articleList: ArticleListType = []
  public myArticleList: ArticleListType = []
  public myBookmarks: ArticleListType = []

  public tags: string[] = []
  public popularTags = [
    'Programming',
    'Design',
    'Vue',
    'Vuetify',
  ]

  public errors: string[] = []
  public messages: string[] = []

  @Mutation
  public errorPush(errors: string[]) {
    this.errors = [...this.errors, ...errors]
  }

  @Mutation
  public readingError() {
    const [e, ...errs] = this.errors
    this.errors = errs
  }

  @Mutation
  public deleteArticle(articleId: string) {
    this.myArticleList = this.myArticleList.filter((article) => article.id !== articleId)
  }

  @Mutation
  public setArticleList(articles: ArticleListType) {
    this.articleList = articles
  }

  @Mutation
  public setBookmarks(articles: ArticleListType) {
    this.myBookmarks = articles
  }

  @Mutation
  public setBookmarkStatus(data: {articleId: string, status: boolean}) {
    const bookmark = this.myBookmarks.find((bm) => bm.id === data.articleId)
    if (bookmark) {
      bookmark.marked = data.status
    }

    const article = this.articleList.find((bm) => bm.id === data.articleId)
    if (article) {
      article.marked = data.status
    }
  }

  @Mutation
  public setMyArticles(articles: ArticleListType) {
    this.myArticleList = articles
  }

  @Mutation
  public setTags(tags: string[]) {
    this.tags = tags
  }

  @Action({ rawError: true })
  public getArticles() {
    return ArticleService.getList(this.tags)
      .then((response) => {
        let articles = response.data as Array<{ [key: string]: any }>
        articles = articles.map((article, i) => {
          return {
            ...article,
            path: '/article/' + article.id,
          }
        })

        this.context.commit('setArticleList', articles)
        return Promise.resolve(articles);
      })
  }

  @Action({ rawError: true })
  public getBookmarks() {
    return ArticleService.getBookmarks()
      .then((response) => {
        let articles = response.data as Array<{ [key: string]: any }>
        articles = articles.map((article, i) => {
          return {
            ...article,
            path: '/article/' + article.id,
          }
        })

        this.context.commit('setBookmarks', articles)
        return Promise.resolve(articles);
      })
  }

  @Action({ rawError: true })
  public getMyArticles() {
    return ArticleService.getMy()
      .then((response) => {
        let articles = response.data as Array<{ [key: string]: any }>
        articles = articles.map((article, i) => {
          return {
            ...article,
            path: '/article/' + article.id,
          }
        })

        this.context.commit('setMyArticles', articles)
        return Promise.resolve(articles);
      })
  }

  get error() {
    return this.errors[0]
  }

  get bookmarks() {
    return this.myBookmarks
  }

  get articles() {
    if (this.tags.length === 0) {
      return this.articleList
    }

    return this.articleList.filter((article) => {
      return this.tags
        .map((tag) => tag.toLowerCase())
        .every((tag) => {
          return article.tags
            .map((articleTag) => articleTag.toLowerCase())
            .includes(tag)
        })
    })
  }

  get myArticles() {
    if (this.tags.length === 0) {
      return this.myArticleList
    }

    return this.myArticleList.filter((article) => {
      return this.tags
        .map((tag) => tag.toLowerCase())
        .every((tag) => {
          return article.tags
            .map((articleTag) => articleTag.toLowerCase())
            .includes(tag)
        })
    })
  }

}

export default App;
