<template>
    <div class="card o-hidden border-0 shadow-lg" style="margin: 12rem 0">
        <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
                <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div class="col-lg-7">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                        </div>
                        <form class="user" @submit.prevent="userRegister">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                    placeholder="Full Name" required v-model="register.name">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                    placeholder="Email Address" required v-model="register.email">
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="password" class="form-control form-control-user" id="inputPassword"
                                        placeholder="Password" required v-model="register.password">
                                </div>
                                <div class="col-sm-6">
                                    <input type="password" class="form-control form-control-user" id="repeatPassword"
                                        placeholder="Repeat Password" required v-model="register.repeat_password">
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-user btn-block">
                                Register Account
                            </button>
                        </form>
                        <hr>
                        <div class="text-center">
                            <a class="small" href="#">Forgot Password?</a>
                        </div>
                        <div class="text-center">
                            <NuxtLink :to="{ name: 'login' }" class="small">Already have an account? Login!</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            var password = document.getElementById("inputPassword")
                  , confirm_password = document.getElementById("repeatPassword");

                function validatePassword(){
                  if(password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Passwords Don't Match");
                  } else {
                    confirm_password.setCustomValidity('Match');
                  }
                }

                password.onchange = validatePassword;
                confirm_password.onkeyup = validatePassword;
        </script>

    </div>
</template>

<script>
export default {
    auth: 'guest',
    layout: 'form',
    data() {
        return {
            register: {
                name: '',
                email: '',
                password: '',
                repeat_password: ''
            }
        }
    },
    methods: {
        async userRegister() {
            try {
                // Send Registration Data to Server
                const response = await this.$axios.post('/register', this.register)

                // If Successful, Login User
                try {
                    const login = await this.$auth.loginWith('local', {
                        data: {
                            email: this.register.email,
                            password: this.register.password,
                        }
                    })
                    console.log(login)

                } catch (err) {
                    console.log(err)
                }

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },

    }
}
</script>