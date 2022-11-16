<template>
  <div class="q-pa-xl q-gutter-y-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Registrar Perfil
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">Crear Perfil</div>
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
        <template>
            <span style="margin: 30px 0 10px 0">Selecciona los permisos para el perfil </span>
            <q-card class="my-card col-xs-12 col-sm-12 col-md-12">
                <q-card-section>
                    <div class="col-xs-12 col-sm-12 col-md-12" v-for="item in modules" :key="item.id">
                        <q-banner rounded class="bg-grey-3">
                         <q-item-label>Modulo de la aplicación: {{item.name}} </q-item-label>
                        </q-banner>

                        <div class="row ">
                            <div v-for="permission in item.permissions" :key="permission.id" class="col-lg-4 q-pa-sm">
                            <q-checkbox :val="permission.id" v-model="form.permissions" :label="permission.name" />
                            </div>
                        </div>
                    <div class="q-px-sm"></div>
                    <div class="q-pa-md q-gutter-md">
                      <q-linear-progress :key="size" :size="size" :value="progress" color="primary"/>
                    </div>
                    </div>
                </q-card-section>
            </q-card>
        </template>
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
            <q-btn label="Si" @click="$router.push('/profiles')" flat color="positive" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>

import * as DataService from 'src/services/admin/Catalogs/Profiles/ProfilesService'
import * as ModuleService from 'src/services/admin/Catalogs/Modules/ModulesService'
import { notifyError, notifySuccess } from 'src/utils/notify'

export default {
  async created () {
    // get initial data -> modules permissions
    this.$q.loading.show()
    await this.getModules()
    this.$q.loading.hide()
  },
  data () {
    return {
      size: 'xs',
      progress: 1.0,
      modules: [],
      form: {
        name: '',
        key: '',
        permissions: []
      },
      confirmsalir: false,
      confirmCancel: false
    }
  },
  methods: {
    async store () {
      const form = { ...this.form }
      DataService.store(form).then(() => {
        notifySuccess('Se actualizo correctamente el registro')
        this.$router.push('/profiles')
      }).catch(() => {
        notifyError()
      })
    },
    async getModules () {
      await ModuleService.index().then((modules) => {
        this.modules = modules
      }).catch(() => {
        notifyError()
      })
    }
  }
}

</script>
