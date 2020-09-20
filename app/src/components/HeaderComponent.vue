<template>
  <div class="list my-5">
    <div class="cate" v-for="item of listData" :key="item.title">
      {{item.title}}
      <span>{{item.sub}}</span>
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
.list{
    color: 333;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 2px;
    display: flex;
    justify-content: space-around;
}

.list .cate {
    line-height: 1.2rem;
    padding-left: 0.5rem;
    border-left: 3px solid #000;
}

.list .cate span {
    margin-left: 0.5rem;
    font-size: 1rem;
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