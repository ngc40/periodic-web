<template>
  <div class="home">
    <quark-header></quark-header>
    <div class="periodic-table" id="container"></div>
    <div id="menu">
      <input
        type="text"
        v-model="tokenId"
        class="token-id-input"
        placeholder="Input tokenId 1~6666"
      />
      <button class="mint" @click="mintHandler">MINT Element</button>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import usePeriodic from '../use/usePeriodic';
  import useWallet from '../use/useWallet';

  import QuarkHeader from '../components/Header.vue';

  const { removeHandler, init, mintAnimation, initPosition } = usePeriodic();
  const { mint } = useWallet();
  const tokenId = ref('');

  onMounted(() => {
    init();
  });

  onBeforeUnmount(() => {
    removeHandler();
  });

  const mintHandler = () => {
    if (!tokenId.value) return alert('Choose a TokenId');
    if (tokenId.value < 1 || tokenId.value > 6666) return alert('TokenId range in 1~6666');

    mintAnimation();
    mint(tokenId.value)
      .then((res) => {
        if (res.status) {
          tokenId.value = '';
          alert('Mint Success!');
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      })
      .finally(() => {
        initPosition();
      });
  };
</script>

<style lang="less" scoped>
  .home {
    .periodic-table {
      width: 100%;
      min-height: 100vh;
    }
  }
</style>
