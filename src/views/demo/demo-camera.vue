<template>
  <div class="demo-camera">
    <div>
　　　　　　<input type="file" accept="image/*" capture="camera">
　　　　　　<input type="file" accept="video/*" capture="camcorder">
　　　　　　<input type="file" accept="audio/*" capture="microphone">
           <input type="file" accept="image/*" multiple>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-camera",
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

<style  scoped>
.demo-camera {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>