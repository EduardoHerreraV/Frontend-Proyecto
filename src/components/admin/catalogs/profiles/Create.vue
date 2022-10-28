<template>
  <div class="q-pa-xl q-gutter-y-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar Permiso
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">Crear registro</div>
        <br>
        <q-form ref="project_form" @submit.prevent="() => {}">
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Nombre del permiso" v-model="form.name" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Codigo del permiso" v-model="form.key" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
          </div>
        </q-form>
          <q-card-actions align="right">
        <q-btn label="Cancelar" flat @click="confirmCancel = true" color="negative" />
        <q-btn label="Guardar" @click="store()" class="btnAccept" flat color="positive"/>
          </q-card-actions>
      </q-card-section>
      <q-dialog v-model="confirmCancel" persistent>
        <q-card>
          <q-card-section class="bg-primary items-center text-white">
            <div class="text-h6">Confirmacion</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row items-center">
            <span class="q-ml-sm">¿Estás seguro de cancelar el registro?</span>
            <br />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="No" color="negative" v-close-popup />
            <q-btn label="Si" @click="$router.push('/matter')" flat color="positive" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>

import * as DataService from 'src/services/admin/Catalogs/Profiles/ProfilesService'
import { notifyError, notifySuccess } from 'src/utils/notify'

export default {
  data () {
    return {
      form: {
        name: '',
        key: ''
      },
      confirmsalir: false,
      confirmCancel: false
    }
  },
  methods: {
    store () {
      const form = { ...this.form }
      this.$q.loading.show()
      DataService.store(form).then(() => {
        notifySuccess('Se creo correctamente el registro')
        this.$router.push('/profiles')
      }).catch((err) => {
        notifyError(err)
      }).finally(() => {
        this.$q.loading.hide()
      })
    }
  }
}

</script>
