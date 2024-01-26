var posts=["2024/01/22/hello-world/","2024/01/22/test/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };