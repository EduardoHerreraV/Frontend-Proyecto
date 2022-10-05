<template>
  <div class="q-pa-xl q-gutter-y-md">
    <!-- <div class="q-mb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Inicio" to="/" />
        <q-breadcrumbs-el label="Registrar Proyecto" />
      </q-breadcrumbs>
    </div> -->
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar nuevo Alumno
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
              <q-input label="Nombre del alumno" v-model="form.name" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Número de matricula" v-model="form.id_number" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Grupo" v-model="form.group" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Carrera" v-model="form.carrer" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Usuario" v-model="form.username" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Contraseña" v-model="form.password" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <!-- <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Confirma Contraseña" v-model="form.password" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div> -->
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Correo electrónico" v-model="form.email" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
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
          label="Guardar"
          color="positive"
          @click="store()"
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
            <span class="q-ml-sm">¿Estás seguro de cancelar el registro?</span>
            <br />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="No" color="negative" v-close-popup />
            <q-btn
              flat
              label="Si"
              color="positive"
              v-close-popup
              @click="$router.push('/user')"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import * as UserService from 'src/services/UserService'
import { notifyError, notifySuccess } from 'src/utils/notify'
export default {
  data () {
    return {
      form: {
        name: '',
        id_number: '',
        group: '',
        carrer: '',
        username: '',
        password: '',
        email: ''
      },
      confirmsalir: false,
      confirmCancel: false
    }
  },
  methods: {
    store () {
      const form = { ...this.form }
      this.$q.loading.show()
      UserService.store(form).then(() => {
        notifySuccess('Se creo correctamente el registro')
        this.$router.push('/user')
      }).catch((err) => {
        notifyError(err)
      }).finally(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>
