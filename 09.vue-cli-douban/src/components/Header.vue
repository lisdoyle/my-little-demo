<template>
  <div class="header">
    <router-link class="title" to="/home">
      <h1>豆瓣</h1>
    </router-link>
    <ul class="nav">
      <li>
        <router-link class="movie" to="/movie">电影</router-link>
      </li>
      <li>
        <router-link class="book" to="/book">图书</router-link>
      </li>
      <li>
        <router-link class="podcast" to="/podcast">广播</router-link>
      </li>
      <li>
        <router-link class="group" to="/group">小组</router-link>
      </li>
      <li>
        <router-link class="search" to="/search">搜索</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 650px;
    padding: 0 18px;
    background: #ffffff;
    border-bottom: 1px solid #f3f3f3;
    margin: 0 auto;
    height: 47px;

    a{
      text-decoration: none;
      font-size: 15px;
      white-space: nowrap; //不换行
    }
    .title{
      flex-grow: 1; //等分剩余空间
      h1{
        font-weight:bold;
        color: #00b600;
        font-size: 20px;
      }
    }
    .nav{
      display: flex;
      justify-content: space-between;
      list-style: none;
      flex-grow: 1;

      .movie{
        color:#2384E8;
      }
      .book{
        color:#9F7860;
      }
      .podcast{
        color:#E4A813;
      }
      .group{
        color:#2AB8CC;
      }
      .search{
        color:#00b600;
      }
    }
  }
</style>