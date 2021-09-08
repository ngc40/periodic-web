<template>
  <div class="home">
    <quark-header></quark-header>
    <div class="text">
      <p>
        Our elements for Metaverse are chemical elements, that are randomly generated and stored on
        the blockchain. You can combine these elements in arbitrary ways.
      </p>
      <p>
        Using scientific knowledge or your imagination, you can acquire new props by combining those
        elements, and some of these props has magic skills.
      </p>
      <p>With these powerful elements, you can do whatever and go anywhere you want.</p>
    </div>
    <div class="periodic-table" id="container" @click="tableClick($event)"></div>
    <div id="menu">
      <input
        type="text"
        v-model="tokenId"
        class="token-id-input"
        placeholder="Input tokenId 0~6665"
      />
      <button class="mint" @click="mintHandler" :disabled="minting">{{ mintBtnText }}</button>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
  import usePeriodic from '../use/usePeriodic';
  import useWallet from '../use/useWallet';

  import QuarkHeader from '../components/Header.vue';

  const { removeHandler, init, mintAnimation, initPosition } = usePeriodic();
  const { mint, generatTokenId } = useWallet();
  const tokenId = ref('');
  const minting = ref(false);

  onMounted(() => {
    init();
    tokenId.value = generatTokenId();
  });

  onBeforeUnmount(() => {
    removeHandler();
  });

  const mintBtnText = computed(() => (minting.value ? 'Minting...' : 'Mint Element'));

  const mintHandler = () => {
    if (!tokenId.value) return alert('Choose a TokenId');
    if (tokenId.value < 0 || tokenId.value > 6665) return alert('TokenId range is in 0~6665');

    mintAnimation();
    minting.value = true;
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
        minting.value = false;
      });
  };

  const tableClick = ($event) => {
    if ($event.target.className) {
      tokenId.value = generatTokenId();
    }
  };
</script>

<style lang="less" scoped>
  .home {
    .text {
      width: 1000px;
      font-size: 36px;

      p {
        padding: 10px;
        background-color: transparent;
        color: rgba(127, 255, 255, 0.75);
        line-height: 1.4;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.35);
      }
    }
    .periodic-table {
      width: 100%;
      min-height: 100vh;
    }
  }
</style>
