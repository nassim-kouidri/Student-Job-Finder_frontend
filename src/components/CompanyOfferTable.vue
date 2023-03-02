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
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import BaseIcon from "@/components/BaseIcon.vue";

import EditOfferForm from "@/components/EditOfferForm.vue";
import moment from "moment";

import {
  mdiMapMarker,
  mdiAccountMultipleOutline,
  mdiClock,
  mdiBlockHelper,
  mdiCheck,
  mdiFormatListBulleted,
  mdiFileSearch,
  mdiAccountSearch,
  mdiClose,
  mdiAccountDetails,
  mdiBriefcaseSearch,
} from "@mdi/js";
import { companyService } from "../_services/company.service";

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

const offersPaginated = computed(() =>
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

const offerClicked = ref(props.item[0]);

const detailModalActive = ref(false);
const deleteModalActive = ref(false);
const editModalActive = ref(false);
const candidatesModalActive = ref(false);

const isDropdownActive = ref(false);

const deleteOffer = (id) => {
  companyService.closeOffer(id);
};

const offerDoned = (id) => {
  companyService.updateOfferToDone(id);
};

const updateCandidacy = (id) => {
  companyService.progressAdmission(id);
};

const acceptStudent = (id) => {
  companyService.acceptAdmission(id);
};

const rejectStudent = (id) => {
  companyService.rejectAdmission(id);
};

console.log(props.item);
</script>

<template>
  <div v-if="item.length > 0">
    <CardBoxModal
      hasClose
      v-model="detailModalActive"
      :title="offerClicked.title"
    >
      <OfferDetailComponent :item="offerClicked" />
    </CardBoxModal>
    <CardBoxModal
      hasClose
      v-model="candidatesModalActive"
      :title="`Liste des candidats : ${offerClicked.title}`"
    >
      <table v-if="offerClicked.offerCandidacies.length > 0">
        <thead>
          <tr>
            <th>Identité</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(candidate, index) in offerClicked.offerCandidacies"
            :key="index"
          >
            <td data-label="name">
              <div class="flex items-center space-x-2">
                <UserAvatarCurrentUser
                  v-if="candidate.student.image"
                  class="w-8 h-8"
                  :avatar="candidate.student.image.image"
                  :username="candidate.student.name"
                />
                <UserAvatarCurrentUser
                  v-else
                  class="w-8 h-8"
                  avatar="https://imgs.search.brave.com/3XK6-MlkH7b9uIHVr1ErqAq_CR-2ggGOjceCYlr5gfs/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kZWZh/dWx0LWF2YXRhci1w/cm9maWxlLWljb24t/dmVjdG9yLXNvY2lh/bC1tZWRpYS11c2Vy/LXBvcnRyYWl0LTE3/NjI1NjkzNS5qcGc"
                  :username="candidate.student.name"
                />
                <div>
                  {{ candidate.student.fname }}&ensp;{{
                    candidate.student.name
                  }}
                </div>
              </div>
            </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <BaseButtons
                type="justify-start lg:justify-end"
                no-wrap
                class="relative"
              >
                <BaseButton
                  color="info"
                  :icon="mdiAccountDetails"
                  iconColor="white"
                  title="Voir le profil du candidat"
                  small
                  @click="
                    router.push('/company/candidate/' + candidate.student.id);
                    updateCandidacy(candidate);
                  "
                />
                <BaseButton
                  color="success"
                  :icon="mdiCheck"
                  iconColor="white"
                  title="Accepter le candidat"
                  small
                  @click="acceptStudent()"
                />
                <BaseButton
                  color="danger"
                  :icon="mdiClose"
                  iconColor="white"
                  title="Rejetter le candidat"
                  small
                  @click="rejectStudent()"
                />
              </BaseButtons>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-center" v-else>
        <p>Aucun candidat n'a été trouvé...</p>
      </div>
    </CardBoxModal>

    <CardBoxModal
      title="Modification de l'offre"
      v-model="editModalActive"
      is-form
    >
      <EditOfferForm :item="offerClicked" />
    </CardBoxModal>

    <CardBoxModal
      v-model="deleteModalActive"
      title="Êtes-vous sûr de vouloir supprimer cette offre ?"
      hasCancel
      small
    >
      <BaseButton
        type="button"
        color="danger"
        label="Supprimer"
        @click="deleteOffer(offerClicked.id)"
      />
    </CardBoxModal>

    <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
      <span
        v-for="checkedRow in checkedRows"
        :key="checkedRow.id"
        class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
      >
        {{ checkedRow.name }}
      </span>
    </div>

    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th>Intitulé du poste</th>
          <th><BaseIcon :path="mdiMapMarker" /></th>
          <th><BaseIcon :path="mdiAccountMultipleOutline" /></th>
          <th>Début</th>
          <th>Fin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(offer, index) in offersPaginated" :key="index">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, offer)"
          />
          <td data-label="name">
            {{ offer.title }}
          </td>
          <td data-label="location">
            {{ offer.address.city }}
          </td>
          <td data-label="candidates">
            <div class="flex items-center w-28">
              {{ offer.offerCandidacies.length }}
              <BaseButton
                class="ml-4"
                small
                color="info"
                label="Voir candidat(s)"
                @click="
                  candidatesModalActive = true;
                  offerClicked = offer;
                "
              />
            </div>
          </td>
          <td data-label="date">
            {{ formatter(offer.startDate) }}
          </td>
          <td data-label="date">
            {{ formatter(offer.endDate) }}
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiFileSearch"
                iconColor="white"
                small
                @click="
                  detailModalActive = true;
                  offerClicked = offer;
                "
                title="Afficher le détail de l'offre"
              />
              <BaseButton
                color="warning"
                :icon="mdiPencil"
                iconColor="white"
                small
                @click="editModalActive = true"
                title="Modifier l'offre"
              />
              <BaseButton
                color="success"
                :icon="mdiCheck"
                iconColor="white"
                small
                @click="offerDoned(offerClicked.id)"
                title="Terminer l'offre"
              />
              <BaseButton
                color="danger"
                :icon="mdiClose"
                iconColor="white"
                small
                @click="
                  deleteModalActive = true;
                  offerClicked = offer;
                "
                title="Fermer l'offre"
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
    <p>Aucune offre n'a été créée...</p>
  </div>
</template>
