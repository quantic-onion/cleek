<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

declare global {
  interface Window {
    MercadoPago?;
  }
}

const props = defineProps<{
  publicKey: string;
  amount: number;
}>();

let bricksBuilder;
let paymentBrickController;

function loadMercadoPagoSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.MercadoPago) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load MercadoPago SDK'));
    document.head.appendChild(script);
  });
}
async function renderPaymentBrick(bricksBuilder) {
  const settings = {
    initialization: {
      amount: props.amount,
    },
    customization: {
      paymentMethods: {
        // ticket: 'all', TODO: preparar el back
        creditCard: 'all',
        debitCard: 'all',
        // mercadoPago: 'all', TODO: preparar el back
      },
    },
    callbacks: {
      onReady: () => {
        console.log('Payment Brick is ready');
      },
      onSubmit: ({ formData, additionalData }) => {
        console.log(formData);
        console.log(additionalData);
      },
      onError: (err) => {
        console.error('Error in Payment Brick:', err);
      },
    },
  };
  try {
    paymentBrickController = await bricksBuilder.create('payment', 'paymentBrick_container', settings);
  } catch (err) {
    console.error('Failed to create Payment Brick:', err);
  }
}

onMounted(async () => {
  try {
    await loadMercadoPagoSDK();
    const mp = new window.MercadoPago(props.publicKey);
    bricksBuilder = mp.bricks();
    renderPaymentBrick(bricksBuilder);
  } catch (err) {
    console.error(err.message);
  }
});

onUnmounted(() => {
  if (paymentBrickController) {
    paymentBrickController.unmount();
    paymentBrickController = null;
  }
});
</script>

<template>
  <div>
    <div id="paymentBrick_container"></div>
  </div>
</template>
