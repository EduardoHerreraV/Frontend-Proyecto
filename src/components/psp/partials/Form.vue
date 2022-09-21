<template>
  <div class="q-gutter-y-md">
    <div class="q-mb-lg">
      <q-card>
        <q-card-section>
          <q-form ref="psp">
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                  v-model="project.name"
                  round
                  outlined
                  label="Nombre"
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                v-model="project.lastname"
                  round
                  outlined
                  label="Apellido Paterno"
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                v-model="project.secondLastname"
                  round
                  outlined
                  label="Apellido Materno"
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
            </div>
          </q-form>
          <br />
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-input
              v-model="project.id"
                round
                outlined
                label="Id"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-8">
              <q-input
              v-model="project.profile"
                round
                outlined
                label="Perfil"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
              />
            </div>
          </div>
            <br />
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-select
              v-model="project.tecnology"
                round
                outlined
                label="Tecnologías"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-8">
              <q-select
              v-model="project.experience"
                round
                outlined
                label="Experiencia"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
              />
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn flat label="Guardar" color="negative" />
            <q-btn flat color="positive" label="Cancelar" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      project:
      {
        name: '',
        lastname: '',
        secondLastname: '',
        id: '',
        profile: '',
        tecnology: '',
        experience: ''
      }
    }
  }
}
</script>
