<template>
  <div class="footer">
    <div class="info">
      <img
        width="48"
        src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png"
      />
      <div class="info-content">
        <strong>豆瓣</strong>
      </div>
    </div>
    <div>
      <a
        href="https://www.douban.com/doubanapp/card/log?category=book_home&cid=&action=click_download&ref=http%3A//www.douban.com/doubanapp/app%3Fchannel%3Dcard_book_home%26direct_dl%3D1"
      >去 App Store 免费下载 iOS 客户端</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 50px;
  margin-bottom: 30px;
  padding: 0 0 20px 0;
  text-align: center;
  font-size: 15px;
  a {
    color: #42bd56;
  }
}
.info {
  display: inline-block;
  color: #111;
  margin-bottom: 15px;
  img {
    vertical-align: middle;
    margin-right: 12px;
    float: left;
  }
  .info-content {
    display: inline-block;
    strong {
      font-size: 24px;
      font-weight: normal;
      line-height: 48px;
    }
  }
}
</style>