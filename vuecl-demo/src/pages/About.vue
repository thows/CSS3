<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <button @click="pop()">操作</button>
</template>

<script>
    export default {
      components: {},
      data() {return {}},
      computed: {},
      mounted() {
      
      },
      methods: {
        pop(){
          alert("click")
        }
      }
    }
</script>
