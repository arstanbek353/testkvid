<template>
  <main>
    <AppHeader/>
    <div class="container">
      <div class="main-tab">
          <router-link 
            to="/" 
            class="main-tab__item"
          >Go to Home</router-link>
          <router-link 
            to="/tasks" 
            class="main-tab__item"
          >Go to Tasks</router-link>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions } from 'vuex';
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    RouterLink, RouterView, AppHeader
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      fetchGetTasks: 'fetchGetTasks'
    })
  },
  mounted() {
    this.fetchGetTasks()
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1E1E1E;
}
.container {
  max-width: 960px;
  padding: 0 15px;
  margin: 0 auto;
}

.btn {
  padding: 10px 15px;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.btn--danger {
  color: #fff;
  background-color: #fb5a6d;
}
.btn--danger:hover {
  background-color: #FF001F;
}
.btn--primary {
  color: #fff;
  background: #5082f6;
}
.btn--primary:hover {
  background: #4577EF;
}
.btn--secondary {
  color: #000;
  background-color: #D4EACC;
}
.btn--secondary:hover {
  color: #fff;
  background-color: #279600;
}
.btn--active {
  color: #fff;
  background-color: #279600;
}
.select {
  border: none;
  background-color: #F0F0F0;
  height: 35px;
  min-height: auto;
  border-radius: 10px;
  min-width: 100px;
  padding: 0 10px;
}

.tag {
  font-size: 16px;
  padding: 8px 12px;
  background-color: #F0F0F0;
  border-radius: 25px;
}
.tag--low {
  color: #279600;
  background-color: #D4EACC;
}
.tag--medium {
  color: #DF8412;
  background-color: #F9E6D0;
}
.tag--high {
  color: #FF001F;
  background-color: #FFCCD2;
}
.tag--urgent {
  color: #292A2D;
  background-color: #D4D4D5;
}
.main-tab {
  display: flex;
  justify-content: center;
  padding: 5px;
  border-radius: 10px;
}
.main-tab__item {
  padding: 13px 20px;
  min-width: 155px;
  color: #8A8F9B;
  border-radius: 7px;
  text-align: center;
  font-weight: 700;
  text-decoration: none;
}
.main-tab__item.router-link-exact-active {
  background: #4577EF;
  color: #fff;
}
.main-tab__item.router-link-exact-active:hover {
  color: #fff;
}
.main-tab__item:hover {
  color: #000;
}
</style>
