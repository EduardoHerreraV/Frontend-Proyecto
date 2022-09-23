<template>
  <div class="window-height window-width row justify-center items-center">
    <div class="justify-center items-center">
      <div class="row q-col-gutter-sm text-center">
        <q-form ref="loginForm" class="q-gutter-lg login-form">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div style="width: 300px"></div>
            <q-img spinner-color="white" width="150" />
            <q-img src="~assets/ucad.png" width="150" />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <h5>Ingenieria en Software</h5>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-input
              outlined
              label="Usuario"
              :rules="[(val) => !!val || 'Este campo es requerido']"
              v-model="credentials.username"
              class="userInput"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-input
              outlined
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              :rules="[(val) => !!val || 'Este campo es requerido']"
              v-model="credentials.password"
              class="passwordInput"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-btn
              outline
              rounded
              class="loginBtn"
              color="primary"
              @click="submit()"
              label="Acceder"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
import { notifyError, notifySuccess } from 'src/utils/notify'

export default {
  name: 'Login',
  data () {
    return {
      isPwd: true,
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    isValidEmail (val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Debe ingresar un correo válido'
    },
    sendReload () {
      setTimeout(() => {
        window.location.reload()
      }, 200)
    },
    submit () {
      this.$refs.loginForm.validate().then((valid) => {
        if (valid) {
          this.$q.loading.show()
          const credentials = { ...this.credentials }
          this.$store.dispatch('user/login', credentials).then((res) => {
            this.$q.loading.hide()
            if (res.authenticated) {
              this.$router.push('/')
              notifySuccess('Bienvenido')
            } else {
              this.$q.notify({
                icon: 'error',
                color: 'negative',
                position: 'top-right',
                textColor: 'white',
                message: 'Usuario o contraseña incorrectos'
              })
            }
          })
        } else {
          notifyError('No se han capturado todos los campos obligatorios')
          this.$q.loading.hide()
        }
      })
    }
  }
}
</script>
