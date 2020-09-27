<template>
  <q-page>
    <div class="row justify-center q-pb-xl">
    <img
      style="width:300px"
      alt="Sedo-Network logo"
      src="~assets/sedo-network-cropped.svg"
    >
    </div>
  <div class="row justify-center q-pt-xl my-font">
    <q-input rounded outlined v-model="text" color="grey" style="width:80vw; max-width: 500px; font-size: 25px">
         <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      text: ''
    }
  }
}
</script>
