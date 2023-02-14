<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="postcss">
.container {
  flex-shrink: 0;
  position: relative;
  width: 100%;
  max-width: 1584px;
  padding-right: 72px;
  padding-left: 72px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

@media (min-width: 1801px) {
  .container {
    max-width: 1712px;
    padding-left: 72px;
    padding-right: 72px;
  }
}

@media (max-width: 1300px) {
  .container {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (max-width: 1023px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
