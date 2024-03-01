<template>
  <div class="modal">
    <div class="modal__inner">
      <button class="modal__close" @click="onClose">X</button>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('onClose')
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  padding: 15px;
}
.modal__inner {
  margin: auto;
  padding: 15px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  min-width: 50%;
  width: 100%;
  max-width: 700px;
  border-radius: 25px;
  position: relative;
  padding-top: 50px;
}
.modal__close {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
  border: none;
  font-size: 20px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;
}
</style>