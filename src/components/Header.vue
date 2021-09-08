<template>
  <header>
    <div class="header-container">
      <div class="wallet" @click="connect">
        {{ shortCutOfAccountHash(account) || 'connect wallet' }}
      </div>
    </div>
  </header>
</template>

<script setup>
  import useWallet from '../use/useWallet';
  const { account, shortCutOfAccountHash, connect } = useWallet();
</script>

<style lang="less" scoped>
  header {
    display: flex;
    position: absolute;
    z-index: 200;
    top: 20px;
    align-items: center;
    width: 100%;
    height: 42px;

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
