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
  mdiLockOpenVariant,
  mdiLock,
  mdiTextBoxSearch,
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

const companiesPaginated = computed(() =>
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

const goCompany = (id) => {
  router.push("/companie/" + id);
};

const updateCompanyStatus = (id) => {
  adminService.updateCompanyStatus(id);
};

const offerClicked = ref(props.item[0]);

const detailModalActive = ref(false);
const deleteModalActive = ref(false);
const editModalActive = ref(false);
const candidatesModalActive = ref(false);
</script>

<template>
  <div v-if="item.length > 0">
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th>Entreprise</th>
          <th>ID</th>
          <th>Offres</th>
          <th>Score</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(company, index) in companiesPaginated" :key="index">
          <td data-label="name">
            <div class="flex items-center space-x-2">
              <UserAvatarCurrentUser
                v-if="company.logo"
                class="w-8 h-8"
                :avatar="company.logo.image"
                :username="company.name"
              />
              <UserAvatarCurrentUser
                v-else
                class="w-8 h-8"
                avatar="https://imgs.search.brave.com/3XK6-MlkH7b9uIHVr1ErqAq_CR-2ggGOjceCYlr5gfs/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kZWZh/dWx0LWF2YXRhci1w/cm9maWxlLWljb24t/dmVjdG9yLXNvY2lh/bC1tZWRpYS11c2Vy/LXBvcnRyYWl0LTE3/NjI1NjkzNS5qcGc"
                :username="company.name"
              />
              <div>{{ company.name }}</div>
            </div>
          </td>
          <td data-label="id">
            {{ company.id }}
          </td>
          <td data-label="offerscount">
            <div v-if="company.offers" class="flex space-x-2 items-center">
              <div>{{ company.offers.length }}</div>
            </div>
          </td>
          <td data-label="score">
            <div v-if="company.note">{{ company.note }}</div>
            <div v-else>-</div>
          </td>
          <td data-label="status">
            {{ company.accountStatus }}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiTextBoxSearch"
                small
                iconColor="white"
                title="Voir le profil"
                @click="goCompany(company.id)"
              />
              <BaseButton
                v-if="company.accountStatus == 'ACTIVE'"
                color="success"
                :icon="mdiLockOpenVariant"
                small
                iconColor="white"
                title="Bannir l'entreprise"
                @click="updateCompanyStatus(company.id)"
              />
              <BaseButton
                v-if="company.accountStatus == 'BANNED'"
                color="danger"
                :icon="mdiLock"
                small
                iconColor="white"
                title="Débannir l'entreprise"
                @click="updateCompanyStatus(company.id)"
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
    <p>Aucune entreprise n'a été créé</p>
  </div>
</template>
