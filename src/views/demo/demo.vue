<template>
  <div class="demo">
    
  </div>
</template>

<script>
import $ from 'jquery'
import { FormDataShim, getBlob} from '../../components/camera/compress';
export default {
  name: "demo",
  data() {
    return {
      
    };
  },
  mounted() {
  },
  components: {
     
  }
};
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
iframe {
    height: 462px!important;
}
.me-detail {
  font-size: 28px;
  .detail-title {
    padding-top: 46px;
    margin-bottom: 10px;
    margin-left: 46px;
    font-weight: 600;
    font-size: 28px;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 27px;
      background: #000;
      position: absolute;
      left: -16px;
      bottom: 3px;
    }
  }
  .note-textarea, p {
      text-align: justify;
      padding: 25px 30px;
      line-height: 36px;
      margin-bottom: 20px;
      color: #777;
      width: 100%;
      min-height: 260px;
  }
  .note-textarea {
    box-shadow: 0 0 0 0.013333rem #fa4b31 inset;
    margin: 0 auto;
    width: 92%;
    display: block;
  }
  p {
    border-bottom: 1px solid #dedede;
  }
  .button-wriper {
      width: 100%;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 30px;
      bottom: 120px;
      .login-btn {
        display: block;
        width: 520px;
        height: 78px;
        color: #fff;
        margin: 67px auto 0 auto;
        border-radius: 41.2px;
        background: #fa4b31;
        letter-spacing: 20px;
    }
  }
}
li{list-style-type: none;}
    a,input{outline: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}
    #choose{
      opacity: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1000;
      position: absolute;
      left: 0;
    }
    canvas{width: 100%;border: 1px solid #000000;}
    // #upload{display: block;margin: 10px;height: 60px;text-align: center;line-height: 60px;border: 1px solid;border-radius: 5px;cursor: pointer;}
    .touch{background-color: #ddd;}
    .img-list{
      margin: 10px 5px;
      li {
        display: inline-block;
      }
      .img-list-li {
        width: 200px;
        height: 200px; 
        background-size: 100% 100%; 
        display: inline-block;
        position: relative;
        display: inline-block;
        margin: 30px 0px 20px 30px;
        background: #fff no-repeat center;
        background-size: cover;
        img {
          width: 200px;
          height: 200px;
          margin-top: -20px; 
        }
      }
    }
 
    .puload-btn {
      text-align: center;
      line-height: 200px;
      width: 200px;
      height: 200px; 
      border: 1px solid #fa4b31;
      margin-left: 30px;
      font-size: 50px;
      color: #fa4b31;
      position: relative;
    }
</style>