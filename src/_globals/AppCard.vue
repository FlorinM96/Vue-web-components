<template>
  <div class="card">
    <slot>
      <div class="content">
        <slot name="content" />
      </div>
      <div class="buttons">
        <slot name="buttons" />
      </div>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  border: 1px solid #dfdbd6;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  justify-content: flex-end;
  flex-grow: 1;
}
.buttons {
  background: var(--color-primary-200);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.2rem 1.7rem;
}
</style>
