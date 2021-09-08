<template>
  <header>
    <div class="header-container">
      <div class="wallet">
        {{ shortCutOfAccountHash(account) || 'connect wallet' }}
      </div>
    </div>
  </header>
</template>

<script setup>
  import useWallet from '../use/useWallet';
  const { account, shortCutOfAccountHash } = useWallet();
</script>

<style lang="less" scoped>
  header {
    display: flex;
    position: absolute;
    z-index: 100;
    top: 10px;
    align-items: center;
    width: 100%;

    .header-container {
      display: flex;
      align-items: center;
      max-width: 1530px;
      width: 100%;
      margin: 0 auto;
    }

    .logo {
      width: 80px;
    }

    .wallet {
      background-color: rgba(0, 127, 127, 0.5);
      color: white;
      text-shadow: 0 0 10px rgb(0 255 255 / 95%);
      box-shadow: 0px 0px 12px rgb(0 255 255 / 50%);
      font-size: 20px;
      font-weight: bolder;
      padding: 5px 10px;
      border-radius: 4px;
      flex-shrink: 0;
      margin-left: auto;
      cursor: pointer;
    }
  }
</style>
