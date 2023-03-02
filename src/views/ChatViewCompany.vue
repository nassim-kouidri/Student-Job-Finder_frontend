<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import Cookies from "js-cookie";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
import CardBox from "@/components/CardBox.vue";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import { companyService } from "@/_services";
import { mdiSend } from "@mdi/js";

let chatRoomId = "";
const from = localStorage.getItem("nameCompany");
const text = ref("");
const connected = ref({ value: false });
let stompClient = null;
const companyChatRooms = ref();
const messages = ref();
let nameStudent = ref("");
let imageStudent = ref("");

onMounted(() => {
  connect();
});

onBeforeMount(() => {
  companyService
    .getCompanyChatRoom()
    .then((res) => {
      companyChatRooms.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
const getMessagesFromChatRoom = (id) => {
  companyService
    .getChatRoomFromId(id)
    .then((res) => {
      messages.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onBeforeMount(() => {
  getMessagesFromChatRoom();
});

const GenerateChatRoom = (id, name, image) => {
  chatRoomId = id;
  getMessagesFromChatRoom(id);
  connect();
  nameStudent.value = name;
  imageStudent.value = image;
};

onMounted(() => {});

const connect = () => {
  const socket = new SockJS("http://192.168.0.146:8080/chat");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    setConnected(true);
    console.log("Connected:", frame);
    stompClient.subscribe(
      "/topic/" + chatRoomId, //chatRoom id que je recois quand je crée la chatroom dans le bouton de CompanyView
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
    "/app/chat/" + chatRoomId,
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
  <LayoutCompany>
    <SectionMain>
      <CardBox>
        <div class="flex h-[80vh]">
          <div class="w-3/12 bg-white-500 border-r">
            <ul class="flex flex-col px-2 space-y-1 h-[80vh] overflow-y-auto">
              <li
                v-for="chatRoom in companyChatRooms"
                :key="chatRoom.chatRoomId"
                class="p-4 flex space-x-2 bg-slate-100 hover:cursor-pointer"
                @click="
                  GenerateChatRoom(
                    chatRoom.chatRoomId,
                    chatRoom.studentName,
                    chatRoom.studentImage.image
                  )
                "
              >
                <img
                  class="w-12 rounded-full"
                  :src="chatRoom.studentImage.image"
                  alt="avatar"
                />
                <div class="flex flex-col">
                  <div class="text-md">{{ chatRoom.studentName }}</div>
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
              <img :src="imageStudent" class="w-12 h-12 rounded-full" />
              <div class="flex flex-col">
                <h6 class="m-b-0">{{ nameStudent }}</h6>
                <small>Last seen: 2 hours ago</small>
              </div>
            </div>
            <div class="p-4 w-full h-[64vh] overflow-y-auto">
              <ul class="flex flex-col space-y-2">
                <!-- <li class="clearfix"> -->
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
              <ul class="m-b-0">
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
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
