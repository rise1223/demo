<template>
  <div class="nclick">
    <button class="button" @click="handleClick">{{ content }}</button>
    <h2>{{ count }}</h2>
  </div>
</template>

<script>
export default {
  name: 'NClick',
  data () {
    return {
      count: 10
    }
  },
  props: {
    content: {
      default: "click",
      type: String
    }
  },
  methods: {
    handleClick () {
      this.count++
    }
  }
}
</script>

<style scoped>
.nclick {
  margin-top: 50px;
  text-align: center;
}

.button {
  background-color: #4CAF50;
  /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
}

.button:active {
  background-color: #508c52;
}
</style>
