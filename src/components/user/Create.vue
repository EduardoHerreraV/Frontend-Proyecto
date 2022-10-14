<template>
  <div class="q-pa-xl q-gutter-y-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar Nuevo Alumno
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
              <q-input square outlined label="Número de matricula" v-model="form.id_number" mask="########" :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-select label="Grupo" outlined v-model="form.group" use-input hide-selected fill-input input-debounce="0" emit-value map-options option-value="id" option-label="name" :options="catalogs.groups" :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select label="Carrera" outlined v-model="form.carrer" use-input hide-selected fill-input input-debounce="0" emit-value map-options option-value="id" option-label="name" :options="catalogs.degrees" :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Usuario" v-model="form.username" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input label="Contraseña" :type="isPwdA ? 'password' : 'text'" v-model="form.password" round outlined :rules="[(val) => !!val || 'Este campo es obligatorio']">
                <template v-slot:append>
                        <q-icon
                          :name="isPwdA ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwdA = !isPwdA"/>
                      </template>
              </q-input>
            </div>
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
      isPwdA: true,
      password: false,
      confirmsalir: false,
      confirmCancel: false
    }
  },
  created () {
    const catalogsConfiguration = { degrees: true, groups: true }
    this.$q.loading.show()
    this.$store.dispatch('catalogs/setCatalogs', { params: catalogsConfiguration }).then(() => {
      this.$q.loading.hide()
    })
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
  },
  computed: {
    catalogs: {
      get () {
        return this.$store.state.catalogs
      },
      set (val) {
        this.$store.commit('catalogs/setCatalogs', val)
      }
    }
  }
}
</script>
