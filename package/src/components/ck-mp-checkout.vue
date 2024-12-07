<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

declare global {
  interface Window {
    MercadoPago?;
  }
}
type PaymentMethod = 'ticket' | 'creditCard' | 'debitCard' | 'mercadoPago';
type CardData = {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  payment_method_option_id: string | null;
  processing_mode: string | null;
  installments: number;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
};

const props = withDefaults(
  defineProps<{
    publicKey: string;
    amount: number;
    paymentMethods?: PaymentMethod[];
  }>(),
  {
    paymentMethods: () => ['creditCard', 'debitCard'],
  },
);

const emit = defineEmits<{
  submit: [formData: CardData];
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
      paymentMethods: props.paymentMethods.reduce((acc, method) => {
        acc[method] = 'all';
        return acc;
      }, {}),
    },
    locale: 'es-AR',
    callbacks: {
      onReady: () => {
        console.log('Payment Brick is ready');
      },
      onSubmit: ({ formData }) => {
        emit('submit', formData);
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
