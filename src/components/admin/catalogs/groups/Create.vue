<template>
  <div class="q-pa-xl q-gutter-y-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar Nuevo Grupo
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
              <q-input label="Nombre del grupo" v-model="form.name" mask="XX##XX" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
          </div>
        </q-form>
          <q-card-actions align="right">
        <q-btn label="Cancelar" flat @click="confirmCancel = true" color="negative"/>
        <q-btn label="Guardar" class="btnAccept" flat color="positive"  @click="store()"/>
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
            <q-btn label="Si" flat color="positive" v-close-popup  @click="$router.push('/user')"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import * as GroupService from 'src/services/admin/Catalogs/Group/GroupService'
import { notifyError, notifySuccess } from 'src/utils/notify'
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
  methods: {
    store () {
      const form = { ...this.form }
      this.$q.loading.show()
      GroupService.store(form).then(() => {
        notifySuccess('Se creo correctamente el registro')
        this.$router.push('/groups')
      }).catch((err) => {
        notifyError(err)
      }).finally(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>
