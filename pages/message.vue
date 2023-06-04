<template>
    <div class="row">

        <div class="col-8">

            <div v-if="!openMessage" class="card shadow border-light mb-4 messages">

                <div class="d-flex flex-column flex-grow-1 justify-content-center">
                    <div class="fs-4 fw-bold text-body-tertiary align-self-center">No chat selected.</div>
                </div>

            </div>

            <div v-else class="card shadow border-light mb-4 messages">
                <div class="card-header py-3 d-flex flex-row align-items-center">
                    <img :src="getImage(message.participant.photo ? message.participant.photo : 'profile_dummy.png')"
                        class="image-chat" alt="...">

                    <div class="fs-3 fw-bold text-primary pl-3">{{ message.participant.name }}</div>
                </div>

                <div class="card-body pt-0">
                    <div class="d-flex flex-column">
                        <div v-if="message.messages.length == 0" class="chat-box d-flex flex-row justify-content-center">
                            <div class="fs-3 text-body-tertiary align-self-center">There is no message</div>
                        </div>
                        <div v-else-if="$fetchState.pending" class="chat-box d-flex flex-column-reverse">
                            <div class="chats receiver">
                                <div class="message fs-5">Loading messages.</div>
                                <div class="time fs-6 text-body-tertiary text-end">now</div>
                            </div>
                        </div>
                        <div v-else-if="$fetchState.error" class="chat-box d-flex flex-column-reverse">
                            <div class="chats receiver">
                                <div class="message fs-5">Error.</div>
                                <div class="time fs-6 text-body-tertiary text-end">now</div>
                            </div>
                        </div>
                        <div v-else class="chat-box overflow-y-auto d-flex flex-column-reverse">
                            <div v-for="message in message.messages" class="chats" :id="message.sender_id"
                                :class="getReceiverSender(message.sender_id)">
                                <div class="message fs-5">{{ message.message }}</div>
                                <div class="time fs-6 text-body-tertiary text-end">{{ getDate(message.created_at) }}</div>
                            </div>
                        </div>
                        <div class="chat-input">
                            <div class="input-group input-group-lg">
                                <input type="text" class="form-control form-control-lg no-shadow-input"
                                    placeholder="Type a message" aria-describedby="inputChat" v-model="message_text"
                                    @keydown.enter="send_message()">
                                <span class="input-group-text" id="inputChat">
                                    <a href="" @click.prevent="send_message()"><i class="fa-solid fa-paper-plane"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div class="col-4">

            <div v-if="!new_chat" class="card shadow border-light mb-4 messages">
                <div class="card-header py-3 d-flex flex-row justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">
                        My Messages
                    </h6>
                    <button type="button" class="btn btn-primary btn-sm" @click="goNewChat">New Chat</button>
                </div>

                <div v-for="chat in chats" class="d-flex flex-row p-3 border-bottom chats-bg" @click="selectChat(chat)">
                    <div>
                        <img :src="getImage(chat.participants[0].user.photo == null ? 'profile_dummy.png' : chat.participants[0].user.photo)"
                            class="image-message" alt="...">
                    </div>

                    <div class="d-flex flex-column pl-3 justify-content-center w-100">

                        <div class="row justify-content-between align-items-center">
                            <div class="col-9">
                                <div class="fs-4 fw-bold text-truncate">
                                    {{ chat.participants[0].user.name }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="fs-6">
                                    {{ getDate(chat.last_message.created_at) }}
                                </div>
                            </div>
                        </div>

                        <div class="row justify-content-between align-items-center body-w">
                            <div class="col-11">
                                <div class="fs-5 text-body-tertiary text-truncate">
                                    {{ chat.last_message.message }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="card shadow border-light mb-4 messages">
                <div class="card-header py-3 d-flex flex-row justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Send New Message
                    </h6>
                    <button type="button" class="btn btn-primary btn-sm" @click="goChat">Go Back</button>
                </div>

                <div class="border-bottom py-2">
                    <input class="form-control form-control-lg search-input-chat" type="text" placeholder="Search name"
                        v-model="search.name" @input="fetch_users()">
                </div>

                <!-- users -->
                <div class="users">
                    <div v-for="user in users" class="d-flex flex-row p-3 border-bottom chats-bg" @click="selectUser(user)">
                        <div>
                            <img :src="getImage(user.photo ? user.photo : 'profile_dummy.png')" class="image-message"
                                alt="...">
                        </div>

                        <div class="d-flex flex-column pl-3 justify-content-center w-100">
                            <div class="row justify-content-between align-items-center">
                                <div class="col-9">
                                    <div class="fs-4 fw-bold text-truncate">
                                        {{ user.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-between align-items-center body-w">
                                <div class="col-11">
                                    <div class="fs-5 text-body-tertiary text-truncate">
                                        {{ user.role.name }}
                                    </div>
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
    name: 'messages',
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            users: [],
            chats: [],
            message: {
                chat_id: null,
                participant: null,
                messages: []
            },
            openMessage: false,
            new_chat: false,
            search: {
                not_user: this.$auth.user.id,
                name: ''
            },
            message_text: ''
        }
    },
    async fetch() {
        await this.fetch_users()
        await this.fetch_chats()
    },
    mounted() {
        // Attach an event listener to the document
        document.addEventListener("keydown", this.handleKeyDown);
    },
    beforeDestroy() {
        // Remove the event listener when the component is destroyed
        document.removeEventListener("keydown", this.handleKeyDown);
    },
    methods: {
        async fetch_users() {
            await this.$axios.get('get-users', {
                params: {
                    not_user: this.search.not_user,
                    name: this.search.name
                }
            })
                .then(({ data }) => {
                    this.users = data.result.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async fetch_chats() {
            await this.$axios.get('message/chat')
                .then(({ data }) => {
                    this.chats = data.result.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async find_chatId() {
            await this.$axios.get('message/chat', {
                params: {
                    user_id: this.message.participant.id
                }
            })
                .then(({ data }) => {

                    if (data.result != null) {
                        this.message.chat_id = data.result.id

                        this.fetch_messages()
                    } else {
                        this.clearMessage()
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        async fetch_messages() {
            await this.$axios.get('message/messages', {
                params: {
                    chat_id: this.message.chat_id
                }
            })
                .then(({ data }) => {
                    this.message.messages = data.result
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async send_message() {

            if (this.message.chat_id) {
                await this.$axios.post('message/send-message', {
                    message: this.message_text,
                    chat_id: this.message.chat_id,
                    sender_id: this.$auth.user.id
                })
                    .then(() => {
                        this.message_text = ''

                        this.fetch_messages()
                        this.fetch_chats()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                await this.$axios.post('message/new-chat', {
                    message: this.message_text,
                    sender_id: this.$auth.user.id,
                    receiver_id: this.message.participant.id
                })
                    .then(({ data }) => {
                        this.message_text = ''

                        this.message.chat_id = data.result.chat_id

                        this.fetch_messages()
                        this.fetch_chats()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }


        },
        getImage(file) {
            return process.env.BASE_URL + 'storage/photos/' + file
        },
        getDate(date) {
            const annDate = new Date(date)
            const currentTime = new Date()

            const timeDifference = Math.abs(currentTime - annDate)

            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

            if (daysDifference == 1) {
                return 'Yesterday'
            } else if (daysDifference == 0) {

                var hour = annDate.getHours()
                var minute = annDate.getMinutes()

                if (hour < 10) {
                    hour = '0' + String(hour)
                }

                if (minute < 10) {
                    minute = '0' + String(minute)
                }

                return hour + ':' + minute
            }


            return annDate.getDay() + '/' + (annDate.getMonth() + 1) + '/' + annDate.getFullYear();
        },
        goNewChat() {
            this.new_chat = true
        },
        goChat() {
            this.new_chat = false
        },
        selectChat(chat) {
            this.message.participant = chat.participants[0].user

            this.clearMessage()

            this.openMessage = true

            this.find_chatId()
        },
        selectUser(user) {
            this.message.participant = user

            this.clearMessage()

            this.openMessage = true

            this.find_chatId()
        },
        clearMessage() {
            this.message.messages.length = 0
            this.message.chat_id = null
        },
        handleKeyDown(event) {
            // Check if the pressed key is the Escape key
            if (event.key === "Escape") {
                // Call your function
                this.openMessage = false
                this.message.messages.length = 0
                this.message.chat_id = null
            }
        },
        getReceiverSender(sender_id) {
            const id = this.$auth.user.id

            if (sender_id == id) {
                return 'receiver'
            } else {
                return 'sender'
            }
        },
        getImg(file) {

            if (file == null) {
                file = 'profile_dummy.png'
            }

            return process.env.BASE_URL + 'storage/photos/' + file
        }
    }
}
</script>

<style>
.messages {
    height: 50rem;
}

.image-message {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    object-fit: cover;
}

.image-chat {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    object-fit: cover;
}

.title-message {
    width: 20rem;
}

.text-message {
    width: 21rem;
}

.message-number {
    background-color: #23e729 !important;
    border-radius: 1rem !important;
}

.chats-bg {
    background: #ffff;
}

.active {
    background: #efefef !important;
}

.chats-bg:hover {
    background: #efefef;
}

.body-w {
    max-width: 25rem;
}

.chats {
    padding: .75rem 1rem .75rem 1rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
    max-width: 30rem;
    width: fit-content;
}

.message {
    min-width: 8rem;
}

.sender {
    background: #fbfbfb;
}

.receiver {
    background: #d5f9ff;
    align-self: flex-end !important;
}

.chat-box {
    width: 100%;
    height: 38rem;
}

.chat-input {
    width: 100%;
    height: 2.5rem;
}

.search-input-chat {
    border: none !important;
}

.search-input-chat:focus {
    border: none !important;
    box-shadow: none !important;
}

.users::-webkit-scrollbar {
    display: none;
}

.chat-box::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.chat-box .users {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.no-shadow-input {
    border-color: #d1d3e2 !important;
    box-shadow: none !important;
}
</style>