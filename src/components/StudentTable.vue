<script setup>
import { computed, ref } from "vue";
import { mdiEye, mdiPen, mdiPencil, mdiTrashCan } from "@mdi/js";
import { useRouter } from "vue-router";
import CardBoxModal from "@/components/CardBoxModal.vue";
import OfferDetailComponent from "@/components/OfferDetailComponent.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";

import EditOfferForm from "@/components/EditOfferForm.vue";
import moment from "moment";

import { adminService } from "@/_services";

import {
  mdiMapMarker,
  mdiAccountMultipleOutline,
  mdiClock,
  mdiBlockHelper,
  mdiLock,
  mdiLockOpenVariant,
  mdiAccountSearch,
} from "@mdi/js";

const router = useRouter();

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  checkable: Boolean,
});

const usersPaginated = computed(() =>
  props.item.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(props.item.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const formatter = (date) => {
  return moment(String(date)).format("DD/MM/YYYY");
};

const goStudent = (id) => {
  router.push("/admin/student/" + id);
};

const emit = defineEmits();

const updateStudentStatus = (id) => {
  adminService.updateStudentStatus(id);
};

const buttonList = ref([]);

const getButton = (status) => {
  if (status == "ACTIVE") {
    var button = {
      title: "Bannir l'étudiant",
      color: "success",
      icon: mdiLockOpenVariant,
    };
  } else {
    var button = {
      title: "Débannir l'étudiant",
      color: "danger",
      icon: mdiLock,
    };
  }
  return button;
};

const detailModalActive = ref(false);
</script>

<template>
  <div v-if="item.length > 0">
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th>Utilisateur</th>
          <th>ID</th>
          <th>Score</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in usersPaginated" :key="index">
          <td data-label="name">
            <div class="flex items-center space-x-2">
              <UserAvatarCurrentUser
                v-if="user.image"
                class="w-8 h-8"
                :avatar="user.image.image"
                :username="user.fname"
              />
              <UserAvatarCurrentUser
                v-else
                class="w-8 h-8"
                avatar="https://imgs.search.brave.com/3XK6-MlkH7b9uIHVr1ErqAq_CR-2ggGOjceCYlr5gfs/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kZWZh/dWx0LWF2YXRhci1w/cm9maWxlLWljb24t/dmVjdG9yLXNvY2lh/bC1tZWRpYS11c2Vy/LXBvcnRyYWl0LTE3/NjI1NjkzNS5qcGc"
                :username="user.fname"
              />
              <div>{{ user.fname }} {{ user.name }}</div>
            </div>
          </td>
          <td data-label="id">
            {{ user.id }}
          </td>
          <td data-label="score">
            <div v-if="user.note">{{ user.note }}</div>
            <div v-else>-</div>
          </td>
          <td data-label="status">
            {{ user.accountStatus }}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiAccountSearch"
                small
                iconColor="white"
                title="Voir le profil"
                @click="goStudent(user.id)"
              />
              <BaseButton
                :color="getButton(user.accountStatus).color"
                :icon="getButton(user.accountStatus).icon"
                small
                iconColor="white"
                :title="getButton(user.accountStatus).title"
                @click="updateStudentStatus(user.id)"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} sur {{ numPages }}</small>
      </BaseLevel>
    </div>
  </div>
  <div class="flex items-center justify-center" v-else>
    <p>Aucun étudiant n'a été créé</p>
  </div>
</template>
