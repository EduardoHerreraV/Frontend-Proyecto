<template>
  <div class="q-pa-xl q-gutter-y-md">
<q-card>
  <q-card-section>
    <div class="text-h6">
      Datos del Grupo
    </div>
  </q-card-section>
</q-card>
<q-card>
  <q-card-section>
    <div class="text-h6">Actulizar registro</div>
    <br>
    <q-form ref="project_form" @submit.prevent="() => {}">
      <div class="row q-col-gutter-sm q-mb-md">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-input label="Nombre del grupo" v-model="form.name" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
        </div>
      </div>
    </q-form>
      <q-card-actions align="right">
    <q-btn
      flat
      @click="confirmCancel = true"
      label="Cancelar"
      color="negative"
    />
    <q-btn
    class="btnAccept"
      flat
      label="Actualizar"
      color="positive"
      @click="update()"
    />
      </q-card-actions>
  </q-card-section>
  <q-dialog v-model="confirmCancel" persistent>
    <q-card>
      <q-card-section class="bg-primary items-center text-white">
        <div class="text-h6">Confirmacion</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row items-center">
        <span class="q-ml-sm">¿Estás seguro de cancelar la edicion del registro?</span>
        <br />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="No" color="negative" v-close-popup />
        <q-btn
          flat
          label="Si"
          color="positive"
          v-close-popup
          @click="$router.push('/groups')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</q-card>
</div>
</template>

<script>
import * as UserService from 'src/services/UserService'
import { notifySuccess, notifyError } from 'src/utils/notify'
export default {
  data () {
    return {
      form: {
        name: ''
      },
      confirmsalir: false,
      confirmCancel: false
    }
  },
  created () {
    const { id } = this.$route.params
    this.$store.dispatch('catalogs/setCatalogs').then(() => {
      UserService.edit(id).then((data) => {
        this.form = data
        this.$q.loading.hide()
      }).catch(() => {
        this.$q.loading.hide()
      })
      this.$q.loading.hide()
    })
  },
  methods: {
    update () {
      const form = { ...this.form }
      const { id } = this.$route.params
      UserService.update(form, id).then(() => {
        notifySuccess('Se actualizo correctamente el registro')
        this.$router.push('/groups')
        return false
      }).catch((err) => {
        notifyError(err)
      })
    }
  }
}
</script>
