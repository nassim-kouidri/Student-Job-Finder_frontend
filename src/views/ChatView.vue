<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import Cookies from "js-cookie";
import { companyService } from "@/_services";
import { studentService } from "@/_services";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import _ from "lodash";
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";

import { mdiSend } from "@mdi/js";

// let chatRoom = "";
// if (Cookies.get("chatRoom")) {
//   let chatRoom = JSON.parse(Cookies.get("chatRoom"));
// } else {
//   let chatRoom = "63d25daee0778a60f4953f9d";
// }
let chatRoom = JSON.parse(Cookies.get("chatRoom"));
const from = localStorage.getItem("userName");
const text = ref("");
const connected = ref({ value: false });
let stompClient = null;
let company = ref();
const studentChatRooms = ref();
const messages = ref();

onMounted(() => {
  disconnect();
  connect();
});

onBeforeMount(() => {
  companyService
    .getCompanyById(chatRoom.companyId)
    .then((res) => {
      company.value = res.data;
      company.value.logo = _.isNil(company.value.logo)
        ? (company.value.logo = {
            image:
              "https://thumbs.dreamstime.com/b/blank-purple-violet-paper-texture-background-art-design-ba-blank-purple-violet-paper-texture-background-art-design-117683675.jpg",
          })
        : company.value.logo;
    })
    .catch((err) => console.log(err));
});
onBeforeMount(() => {
  studentService
    .getStudentChatRoom()
    .then((res) => {
      studentChatRooms.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
const getMessagesFromChatRoom = (id) => {
  studentService
    .getChatRoomFromId(id)
    .then((res) => {
      messages.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onBeforeMount(() => {
  getMessagesFromChatRoom(chatRoom.chatRoomId);
});

const connect = () => {
  const socket = new SockJS("http://192.168.0.146:8080/chat");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    setConnected(true);
    console.log("Connected:", frame);
    stompClient.subscribe(
      "/topic/" + chatRoom.chatRoomId, //chatRoom id que je recois quand je crée la chatroom dans le bouton de CompanyView
      (messageOutput) => {
        showMessageOutput(JSON.parse(messageOutput.body));
      }
    );
  });
};

const disconnect = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
  setConnected(false);
  console.log("Disconnected");
};

const sendMessage = () => {
  stompClient.send(
    "/app/chat/" + chatRoom.chatRoomId,
    {},
    JSON.stringify({ from: from, text: text.value })
  );
  text.value = "";
};

const messageOutputList = ref([]);

const showMessageOutput = (messageOutput) => {
  messageOutputList.value.push({
    from: messageOutput.message.from,
    text: messageOutput.message.text,
    timeStamp: messageOutput.timeStamp,
  });
};

function setConnected(value) {
  connected.value.value = value;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <Carbox v-if="company">
        <div class="flex h-[80vh]">
          <div class="w-3/12 bg-white-500 border-r">
            <ul class="flex flex-col px-2 space-y-1 h-[80vh] overflow-y-auto">
              <li
                class="p-4 flex space-x-2 bg-slate-100 hover:cursor-pointer"
                v-for="chatRoom in studentChatRooms"
                :key="chatRoom.chatRoomId"
              >
                <img
                  :src="chatRoom.companyImage.image"
                  alt="avatar"
                  class="w-12 rounded-full"
                />
                <div class="flex flex-col">
                  <div class="text-md">{{ chatRoom.companyName }}</div>
                  <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div class="text-sm text-slate-500">en ligne</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="w-9/12 flex flex-col px-2 items-center">
            <div
              class="flex space-x-2 items-center p-2 h-[10vh] border-b w-full"
            >
              <img
                :src="company.logo.image"
                alt="avatar"
                class="w-12 h-12 rounded-full"
              />

              <div class="flex flex-col">
                <h6 class="m-b-0">{{ company.name }}</h6>
                <small>Last seen: 10 min ago</small>
              </div>
            </div>
            <div class="p-4 w-full h-[64vh] overflow-y-auto">
              <ul class="flex flex-col space-y-2">
                <li
                  class="flex flex-col"
                  v-for="m in messages"
                  :key="m.timeStamp"
                >
                  <!-- <span class="message-data-time">({{ m.timeStamp }})</span> -->
                  <div
                    class="ml-auto max-w-sm flex flex-col"
                    v-if="m.message.from === from"
                  >
                    <span class="text-sm text-slate-400"
                      >({{ m.timeStamp }})
                    </span>
                    <div
                      class="bg-slate-100 rounded-lg p-2 max-w-sm break-words"
                    >
                      {{ m.message.text }}
                    </div>
                  </div>
                  <div class="mr-auto max-w-sm flex flex-col" v-else>
                    <span class="text-sm text-slate-400"
                      >({{ m.timeStamp }})
                    </span>
                    <div
                      class="bg-slate-100 rounded-lg p-2 max-w-sm break-words"
                    >
                      {{ m.message.text }}
                    </div>
                  </div>
                  <!-- <div                    class="message other-message float-right"                    v-if="m.message.from === from"                  >                    test                    {{ m.message.text }}                  </div>                  <div class="message my-message" v-else>                    test                    {{ m.message.text }}                  </div> -->
                </li>
              </ul>
              <ul class="flex flex-col space-y-2">
                <!-- <li class="clearfix">
                      <div class="message-data">
                        <span class="message-data-time">10:12 AM, Today</span>
                      </div>
                      <div class="message other-message float-right">
                        Hi Aiden, how are you? How is the project coming along?
                      </div>
                    </li> -->
                <li
                  class="flex flex-col"
                  v-for="message in messageOutputList"
                  :key="message.timeStamp"
                >
                  <div
                    class="ml-auto max-w-sm flex flex-col"
                    v-if="message.from === from"
                  >
                    <span class="text-sm text-slate-400"
                      >({{ message.timeStamp }})
                    </span>
                    <div
                      class="bg-slate-100 rounded-lg p-2 max-w-sm break-words"
                    >
                      {{ message.text }}
                    </div>
                  </div>
                  <div class="mr-auto max-w-sm flex flex-col" v-else>
                    <span class="text-sm text-slate-400"
                      >({{ message.timeStamp }})
                    </span>
                    <div
                      class="bg-slate-100 rounded-lg p-2 max-w-sm break-words"
                    >
                      {{ message.text }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="flex space-x-2 justify-center w-full">
              <FormControl
                class="w-7/12"
                type="text"
                v-model="text"
                placeholder="Écrivez votre message..."
              />
              <BaseButton
                class="w-26"
                @click="sendMessage"
                :icon="mdiSend"
                color="lightDark"
              />
            </div>
          </div>
        </div>
      </Carbox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style>
body {
  background-color: #f4f7f6;
  margin-top: 20px;
}
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7;
}

.chat-app .chat {
  margin-left: 280px;
  border-left: 1px solid #eaeaea;
}

.people-list {
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px;
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
}

.people-list .chat-list li.active {
  background: #efefef;
}

.people-list .chat-list li .name {
  font-size: 15px;
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%;
}

.people-list img {
  float: left;
  border-radius: 50%;
}

.people-list .about {
  float: left;
  padding-left: 8px;
}

.people-list .status {
  color: #999;
  font-size: 13px;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff;
}

.chat .chat-history ul {
  padding: 0;
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px;
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px;
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative;
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .my-message {
  background: #efefef;
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right;
}

.chat .chat-history .other-message:after {
  border-bottom-color: #e8f1f3;
  left: 93%;
}

.chat .chat-message {
  padding: 20px;
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle;
}

.online {
  color: #86c541;
}

.offline {
  color: #e47297;
}

.me {
  color: #1d8ecd;
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none;
  }
  .chat-app .people-list.open {
    left: 0;
  }
  .chat-app .chat {
    margin: 0;
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
  }
  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto;
  }
}
</style>
