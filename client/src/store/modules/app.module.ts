import ArticleService from '@/services/ArticleService';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

type ArticleListType = Array<{
    id: number;
    src: string;
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
            src: article.src || `https://picsum.photos/300/400?image=${ i + 1 }`,
          }
        })

        this.context.commit('setArticleList', articles)
        return Promise.resolve(articles);
      })
  }

  get isOpenDrawer() {
    return this.drawer
  }

  get articles() {
    return this.articleList
  }

}

export default App;
