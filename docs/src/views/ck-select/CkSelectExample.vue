<script setup lang="ts">
import { computed, ref } from 'vue';
import ComponentShower from '@/components/ComponentShower.vue';
// helicopter
const selectedHelicopter = ref('');
const optionsHelicopter = [
  'Bell AH-1 SuperCobra / SeaCobra 1969',
  'Mil Mi-24 ("Hind") 1969',
  'Sikorsky S-67 Blackhawk 1970',
  'Hughes AH-64 Apache',
];
// user
const selectedUser = ref('');
const optionsUser = [
  '',
  'Rubeus Hagrid',
  'Severus Snape',
  'Albus Dumbledore',
  'Minerva McGonagall',
];
// city
const selectedCity = ref('');
const optionsCity = [
  '',
  'Madrid',
  'Osaka',
  'Seúl',
  'Boston',
];

const selectedId = ref(0);
const selectedOption = ref({});
const optionsSoccer = ref([
  'Messi', 'Maradona', 'Enzo Pérez',
]);
const selectedOptionObj = ref({});
const selectedSoccer2 = ref('');
const selectedSoccer3 = ref('Ninguno');
const optionsSoccer2 = computed(() => {
  const list = [...optionsSoccer.value];
  list.unshift('');
  return list;
});
const optionsSoccer3 = computed(() => {
  const list = [...optionsSoccer.value];
  list.unshift('Ninguno');
  return list;
});

const options = ref([
  { id: 1, name: 'Lisandro Dalla Costa' },
  { id: 2, name: 'Germán Hofer' },
  { id: 3, name: 'Alberto piedrabuena' },
  { id: 4, name: 'Jorge Risso' },
  { id: 5, name: 'Ernesto Laprida' },
  { id: 6, name: 'Lautaro Dalla Costa' },
]);
const selectedOptionNestedId = ref(0);
const selectedOptionNested = ref({});
const selectedOptionNested2 = ref({});

const customers = ref([
  { id: 1, address: { id: 1, street: 'Avenida Siempreviva', number: '742', fullAddress: 'Avenida Siempreviva 742' } },
  { id: 2, address: { id: 4, street: 'Privet Drive', number: '4', fullAddress: 'Privet Drive 4' } },
  { id: 3, address: { id: 9, street: 'Baker Street', number: '221B', fullAddress: 'Baker Street 221B' } },
]);
</script>

<template lang="pug">
//- default
ComponentShower(title="Default" noGap)
  //- helicopter
  ck-select(
  v-model="selectedHelicopter"
  notReduce
  label="Helicóptero"
  icon="helicopter"
  :options="optionsHelicopter"
  )

//- icon
ComponentShower(title="Icon" noGap)
  //- helicopter
  ck-select(
  v-model="selectedHelicopter"
  notReduce
  group="left"
  label="Helicóptero"
  icon="helicopter"
  :options="optionsHelicopter"
  )
  //- user
  ck-select(
  v-model="selectedUser"
  notReduce
  group="center"
  label="Usuario"
  icon="user"
  :options="optionsUser"
  )
  //- city
  ck-select(
  v-model="selectedCity"
  notReduce
  group="right"
  label="Ciudad"
  icon="city"
  :options="optionsCity"
  )

ComponentShower(title="Reductors    ")
  div
    div Selected option: {{ selectedOption }}
    ck-select(
    notReduce
    label="El mejor jugador de fútbol"
    v-model="selectedOption"
    :options="optionsSoccer"
    )
  div
    div Selected ID: {{ selectedId }}
    ck-select(
    label="¿Quién es el más lindo?"
    v-model="selectedId"
    :options="options"
    )
  div
    div Selected option obj: {{ selectedOptionObj }}
    ck-select(
    notReduceValue
    label="¿Quién es el más lindo?"
    v-model="selectedOptionObj"
    :options="options"
    )
  div
    div Selected option nested ID: {{ selectedOptionNestedId }}
    ck-select(
    :reduceNameFunction="(customer) => customer.address.fullAddress"
    label="¿Quién es el más lindo?"
    v-model="selectedOptionNestedId"
    :options="customers"
    )
  div
    div Selected option nested: {{ selectedOptionNested }}
    ck-select(
    notReduceValue
    :reduceNameFunction="(customer) => customer.address.fullAddress"
    label="¿Quién es el más lindo?"
    v-model="selectedOptionNested"
    :options="customers"
    )
  div
    div Selected option nested 2: {{ selectedOptionNested2 }}
    ck-select(
    :reduceNameFunction="(customer) => customer.address.fullAddress"
    :reduceValueFunction="(customer) => customer.address"
    label="¿Quién es el más lindo?"
    v-model="selectedOptionNested2"
    :options="customers"
    )
  //- div
  //-   div Selected option: {{ selectedSoccer2 }} | clearable default
  //-   ck-select(
  //-   notReduce
  //-   label="El mejor jugador de fútbol"
  //-   v-model="selectedSoccer2"
  //-   :options="optionsSoccer2"
  //-   )
  //- div
  //-   div Selected option: {{ selectedSoccer3 }} | clearable custom
  //-   ck-select(
  //-   v-model="selectedSoccer3"
  //-   notReduce
  //-   label="El mejor jugador de fútbol"
  //-   clearValue="Ninguno"
  //-   :options="optionsSoccer3"
  //-   )
</template>
