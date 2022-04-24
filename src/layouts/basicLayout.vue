<template>
  <Layout class="main" style="height: 100%">
    <Header class="header-con">
      <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
      <Button @click="loginOut" type="primary">注销</Button>
    </Header>
    <Layout>
      <Sider ref="sider1" hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
        <side-menu 
          accordion
          ref="sideMenu"
          :active-name="$route.name"
          :collapsed="collapsed"
          @on-select="turnToPage"
          :menu-list="menuList"
        >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
      </Sider>
      <Content class="main-content-con">
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import { getMenuByRouter } from '@/utils/util'
import SideMenu from './side-menu'
import maxLogo from '@/assets/logo.svg'
export default {

  components: {
    SideMenu
  },
  data () {
    return {
      collapsed: false,
      maxLogo: maxLogo
    }
  },
  computed: {
    // $route () {
    //   return this.$route
    // },
    menus () {
      return this.$store.getters.addRouters
    },
    rotateIcon () {
      return [
        { 
          'rotate-icon': this.collapsed
        }
      ]
    }
  },
  created () {
    const routes = this.menus.find(item => item.path === '/') // 获取 path /下的children为生成菜单 用户可自定义

    const menuList = (routes && routes.children) || []
    this.menuList = getMenuByRouter(menuList, [])
  },
  methods: {
    /**
     * 跳转路由
     */
    turnToPage (name) {
      this.$router.push({
        name: name
      })
      console.log(name)
    },
    /**
     * 收缩菜单
     */
    collapsedSider () {
      console.log(this.$refs.sider1)
      this.$refs.sider1.toggleCollapse()
    },
    loginOut () {
      this.$store.dispatch('handleLogOut').then(() => {
        this.$router.push({
          path: '/login'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .header-con {
    color: #fff;
  }
  .left-con {
    width: 200px;
    height: 100%;
  }
  .main-content-con{
    // height: calc(100% - 64px);
    width: calc(100% - 200px);
    overflow: hidden;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }

</style>