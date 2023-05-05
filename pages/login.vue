<template>
    <!-- Outer Row -->
    <div class="row justify-content-center">

        <div class="col-xl-10 col-lg-12 col-md-9">

            <div class="card o-hidden border-0 shadow-lg" style="margin: 12rem 0;">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                <form class="user" @submit.prevent="userLogin">
                                    <div class="form-group">
                                        <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                            aria-describedby="emailHelp" placeholder="Enter Email Address..." required
                                            v-model="login.email">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" required
                                            v-model="login.password">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-user btn-block">
                                        Login
                                    </button>
                                </form>
                                <hr>
                                <div class="text-center">
                                    <a class="small" href="#">Forgot Password?</a>
                                </div>
                                <div class="text-center">
                                    <NuxtLink class="small" :to="{ name: 'register' }">Create an Account!</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    auth: 'guest',
    layout: 'form',
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
        }
    },
    async fetch() {

        const isLogged = await this.$store.state.auth.loggedIn

        if (isLogged) {
            this.$router.push({ name: 'index' })
        }

    },
    methods: {
        async userLogin() {
            try {
                const response = await this.$auth.loginWith('local', { data: this.login })

                console.log(response)
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>