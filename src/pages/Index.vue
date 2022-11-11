<template>
  <div class="q-pa-xl">
    <div class="col-auto text-h5 q-mb-xl">
      <q-icon color="primary" name="person" size="4.1em"/>Bienvenido: {{ user.name }} {{ user.last_name }} {{ user.second_last_name }}
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-4">
        <q-card class="row items-center justify-between">
          <img src="~/assets/becarios.jpg" alt="" style="width: 500px;" class="q-mr-lg">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Bolsa de trabajo</div>
            <div class="text-h7 q-mt-sm q-mb-xs">Conoce donde hacer tu servicio social.</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4">
        <q-card class="row items-center justify-between">
          <img src="~/assets/estudiante.jpg" alt="" style="width: 500px;" class="q-mr-lg">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Proximos eventos</div>
            <div class="text-h7 q-mt-sm q-mb-xs">Conoce las actividades que tu universidad te ofrece.</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4">
        <q-card class="row items-center justify-between">
          <img src="~/assets/laboratorio.jpg" alt="" style="width: 500px;" class="q-mr-lg">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Servicios</div>
            <div class="text-h7 q-mt-sm q-mb-xs">Aprovecha al máximo tu estancia con nosotros</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
      <br/>
      <br/>
    <div align="center">
      <iframe width="860" height="515" src="https://www.youtube.com/embed/IoZ4wkvwr3E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
      <br/>
      <br/>
    <div align="center">
      <div class="text-h5 q-mt-sm q-mb-xs">Redes sociales:
        <br/>
        <img src="~/assets/fb.jpg" style="width: 50px;" class="q-mr-lg">
        <img src="~/assets/wt.jpg" style="width: 50px;" class="q-mr-lg">
        <img src="~/assets/instagram.jpg" style="width: 50px;" class="q-mr-lg">
        <img src="~/assets/twitter.jpg" style="width: 50px;" class="q-mr-lg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      title: 'Sistema'
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.information
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
.home-card:hover {
  color: #621132;
}
</style>
