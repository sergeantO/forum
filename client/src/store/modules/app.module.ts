import ArticleService from '@/services/ArticleService';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

type ArticleListType = Array<{
    id: number;
    image: string;
    title: string;
    subtitle: string;
    tags: string[];
    path: string;
    views?: number
}>


@Module({ namespaced: true })
class App extends VuexModule {
  public drawer = false
  public articleList: ArticleListType = []
  public tags: string[] = []
  public errors: string[] = []
  public messages: string[] = []

  @Mutation
  public errorPush(errors: string[]) {
    this.errors = [...this.errors, ...errors]
    console.log(errors)
  }

  @Mutation
  public readingError() {
    const [e, ...errs] = this.errors
    this.errors = errs
  }

  @Mutation
  public changeDrawer() {
    this.drawer = !this.drawer
  }

  @Mutation
  public closeDrawer() {
    this.drawer = false
  }

  @Mutation
  public openDrawer() {
    this.drawer = true
  }

  @Mutation
  public setArticleList(articles: ArticleListType) {
    this.articleList = articles
  }

  @Mutation
  public setTags(tags: string[]) {
    this.tags = tags
  }

  @Action
  public changeDrawerState() {
    this.context.commit('changeDrawer');
  }

  @Action({ rawError: true })
  public getArticles() {
    return ArticleService.getList()
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

  get error() {
    return this.errors[0]
  }

  get isOpenDrawer() {
    return this.drawer
  }

  get articles() {
    if (this.tags.length === 0) {
      return this.articleList
    }

    return this.articleList.filter((article) => {
      return this.tags.some((tag) => {
        return article.tags.includes(tag)
      })
    })
  }

}

export default App;
