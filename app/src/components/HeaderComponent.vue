<template>
  <div class="list my-5 d-flex justify-content-around">
    <div class="cate pl-3" v-for="item of listData" :key="item.title">
      {{item.title}}
      <span class="ml-1">{{item.sub}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        { title: "活動視覺設計", sub: "Event Visual Design" },
        { title: "空間繪圖設計", sub: "3D Model & Render" },
        { title: "網頁前端設計", sub: "Web Front-end & Design" }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
    color: 333;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 2px;
    > .cate {
      line-height: 1.2rem;
      border-left: 3px solid #000;
    }
}

@media (max-width: 992px) {
    .list{
        margin-top: 2rem;
        font-size: 14px;
        flex-direction: column;
        text-align: end;
    }

    .list .cate {
        margin-right: 0;
        border-left: 0;
    }

    .list .cate span {
        font-size: 8px;
        display: block;
    }
}

</style>