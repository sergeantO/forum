import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';


@Module({ namespaced: true })
class App extends VuexModule {
  public drawer = false
  public articleList = Array.from(new Array(10)).map((e, i) => ({
    id: i + 1,
    src: `https://picsum.photos/300/400?image=${ i + 1 }`,
    title: `article ${ i + 1 }`,
    subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt accusantium laboriosam ullam doloribus blanditiis facilis fugit, minima veniam, ut voluptatibus id temporibus cumque fugiat qui vel perspiciatis adipisci! Quia, at itaque nobis ipsum magni expedita voluptatibus? Tempore, impedit doloribus? Eum numquam, beatae unde neque necessitatibus id error quam labore veniam.',
    tags: ['tag1', 'tag2', 'tag3'],
    path: '/article/' + (i + 1),
  }))

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

  @Action
  public changeDrawerState() {
    this.context.commit('changeDrawer');
  }

  get isOpenDrawer() {
    return this.drawer
  }

  get articles() {
    return this.articleList
  }

}

export default App;
