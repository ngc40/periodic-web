import { ref, onMounted } from 'vue';
import ElementABI from '../abi/Element';
import detectEthereumProvider from '@metamask/detect-provider';

export default () => {
  const mint = (tokenId = '') => {
    return new window.web3.eth.Contract(ElementABI, import.meta.env.VITE_CONTRACT).methods
      .claim(tokenId)
      .send({
        from: window.web3.currentProvider.selectedAddress,
      });
  };

  const chainId = ref('');
  const account = ref('');

  onMounted(async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      chainId.value = provider.chainId;
      account.value = provider.selectedAddress;
    } else {
      alert('Please Install MetaMask!');
    }

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

  const generatTokenId = () => Math.ceil(Math.random() * 6666);

  return {
    chainId,
    account,
    mint,

    connect: async () => {
      if (account.value) return;
      [account.value] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    },

    shortCutOfAccountHash,
    generatTokenId,
  };
};
