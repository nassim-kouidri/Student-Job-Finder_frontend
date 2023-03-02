<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { mdiMessagePlus } from "@mdi/js";

import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutCompany from "@/layouts/LayoutCompany.vue";
import Cookies from "js-cookie";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import BaseButton from "@/components/BaseButton.vue";
import { studentService } from "@/_services";

const route = useRoute();
const id = route.params.id;

const studentInfo = ref({});

onMounted(() => {
  studentService
    .getStudentById(id)
    .then((res) => {
      console.log(res);
      studentInfo.value = res.data;
    })
    .catch((err) => console.log(err));
});
</script>

<template>
  <LayoutCompany>
    <SectionMain>
      <CardBox>
        <CardBoxComponentTitle title="Profil du candidat" />
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col items-center">
            <UserAvatarCurrentUser
              v-if="studentInfo.image"
              class="w-48 mb-4"
              :avatar="studentInfo.image.image"
            />
            <UserAvatarCurrentUser
              v-else
              class="w-48 mb-4"
              avatar="https://avatars.dicebear.com/api/personas/your-custom-seed.svg"
            />
            <div class="font-bold">
              {{ studentInfo.fname }} {{ studentInfo.name }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col space-y-2">
              <div class="font-bold">Biographie</div>
              <div>
                {{ studentInfo.biography }}
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="font-bold">Diplôme</div>
              <div>
                {{ studentInfo.level }}
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="font-bold">Secteur</div>
              <div>
                {{ studentInfo.sector }}
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div class="font-bold">Linkedin</div>
              <div>
                {{ studentInfo.linkedin }}
              </div>
            </div>
          </div>

          <div>
            <BaseButton
              label="Contacter"
              color="info"
              :icon="mdiMessagePlus"
              iconColor="white"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutCompany>
</template>
