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
          Datos del Alumno
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
              <q-input label="Nombre del alumno" v-model="form.name" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input square outlined label="Número de matricula" v-model="form.id_number" mask="########" :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Grupo" v-model="form.group" mask="XX##XX" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Carrera" v-model="form.carrer" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Usuario" v-model="form.username" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <!-- <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Contraseña" v-model="form.password" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div> -->
            <!-- <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Confirma Contraseña" v-model="form.password" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div> -->
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Correo electrónico" v-model="form.email" round outlined />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <q-input
                class="email_confirm"
                v-model="form.email_confirm"
                square
                outlined
                label="Confirmar correo electrónico"
              />
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
import { notifySuccess, notifyError } from 'src/utils/notify'
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
        email: '',
        email_confirm: ''
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
        this.$router.push('/user')
        return false
      }).catch((err) => {
        notifyError(err)
      })
    }
  }
}
</script>
