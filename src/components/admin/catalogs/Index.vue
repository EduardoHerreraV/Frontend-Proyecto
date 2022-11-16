<template>
  <div class="q-pa-xl q-gutter-y-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Control de Catálogos
        <q-btn @click="confirmsalir = true" round size="sm" color="primary" class="q-ml-sm float-right" icon="arrow_back">
          <q-tooltip>Salir</q-tooltip>
        </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <br>
    <br>
    <br>
    <br>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-4" @click="$router.push('/degree')">
          <q-card class="row items-center justify-between">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Licenciaturas</div>
              <div class="text-caption text-grey">
                Ir a catálogo de Licenciaturas
              </div>
            </q-card-section>
            <q-card-section>
              <q-icon name="person" size="4.1em" color="primary" />
            </q-card-section>
          </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4" @click="$router.push('/groups')">
          <q-card class="row items-center justify-between">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Grupos</div>
              <div class="text-caption text-grey">
                Ir a catálogo de Grupos
              </div>
            </q-card-section>
            <q-card-section>
              <q-icon name="person" size="4.1em" color="primary" />
            </q-card-section>
          </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4" @click="$router.push('/matter')">
          <q-card class="row items-center justify-between">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Materias</div>
              <div class="text-caption text-grey">
                Ir a catálogo de Materias
              </div>
            </q-card-section>
            <q-card-section>
              <q-icon name="person" size="4.1em" color="primary" />
            </q-card-section>
          </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4" @click="$router.push('/profiles')">
          <q-card class="row items-center justify-between">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Perfiles</div>
              <div class="text-caption text-grey">
                Ir a catálogo de Perfiles
              </div>
            </q-card-section>
            <q-card-section>
              <q-icon name="person" size="4.1em" color="primary" />
            </q-card-section>
          </q-card>
      </div>
      <!-- <div class="col-xs-12 col-sm-12 col-md-4" @click="$router.push('/modules')">
          <q-card class="row items-center justify-between">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Módulos</div>
              <div class="text-caption text-grey">
                Ir a catálogo de Módulos
              </div>
            </q-card-section>
            <q-card-section>
              <q-icon name="person" size="4.1em" color="primary" />
            </q-card-section>
          </q-card>
      </div> -->
      <div class="col-xs-12 col-sm-12 col-md-4" @click="$router.push('/user')">
          <q-card class="row items-center justify-between">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Usuarios</div>
              <div class="text-caption text-grey">
                Ir a catálogo de Usuarios
              </div>
            </q-card-section>
            <q-card-section>
              <q-icon name="person" size="4.1em" color="primary" />
            </q-card-section>
          </q-card>
      </div>
    </div>
    <q-dialog v-model="confirmsalir" persistent>
        <q-card>
          <q-card-section class="bg-primary items-center text-white">
            <div class="text-h6">Confirmacion</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >¿Deseas salir?</span
            >
            <br />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="No" color="negative" v-close-popup />
            <q-btn
              flat
              label="Si"
              color="positive"
              v-close-popup
              @click="$router.push('/')"
            />
          </q-card-actions>
          </q-card>
        </q-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      confirmsalir: false
    }
  }
}
</script>
