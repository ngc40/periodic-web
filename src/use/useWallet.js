import { ref, onMounted } from 'vue';
import 'web3/dist/web3.min.js';
import ElementABI from '../abi/Element';

export default () => {
  const mint = (tokenId = '') => {
    return new window.web3.eth.Contract(
      ElementABI,
      '0xfedA54678c5Faae298Ed9701B956c586B3BeFD8f',
    ).methods
      .claim(tokenId)
      .send({
        from: window.web3.currentProvider.selectedAddress,
      });
  };

  const chainId = ref('');
  const account = ref('');

  onMounted(async () => {
    chainId.value = await window.ethereum.request({ method: 'eth_chainId' });
    [account.value] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', (accounts) => {
      account.value = accounts[0] || '';
    });
    window.web3 = new Web3(window.ethereum);
  });

  const shortCutOfAccountHash = (hash) => {
    return hash.replace(/^0x\w{4}(.*)\w{4}$/, (match, p1, offset, string) => {
      return string.replace(p1, '...');
    });
  };

  const generatTokenId = () => Math.ceil(Math.random() * 6666) + 1;

  return {
    chainId,
    account,
    mint,

    shortCutOfAccountHash,
    generatTokenId,
  };
};
