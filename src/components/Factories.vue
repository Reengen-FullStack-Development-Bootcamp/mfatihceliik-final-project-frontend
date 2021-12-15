<template>
  <div id="factories" v-if="success">
    <notifications group="foo" position="top left" />
    <div>
      <b-button
        style="float: left; margin-bottom: 5px"
        class="btn btn-warning"
        @click="factoryAddRowDialog"
        >{{ $t("message.addFactory") }}</b-button
      >
      <b-button
        style="float: left; margin-left: 5px"
        class="btn btn-info"
        @click="factoryGetByIdRowDialog"
        >{{ $t("message.findId") }}</b-button
      >
      <b-button
        style="float: left; margin-left: 5px"
        class="btn btn-info"
        @click="factoryGetByNameRowDialog"
        >{{ $t("message.findName") }}</b-button
      >
      <b-button
        style="float: left; margin-left: 5px"
        class="btn btn-info"
        @click="factoryGetDateRangeRowDialog"
        >{{ $t("message.findDateRange") }}</b-button
      >
    </div>

    <div v-if="factoryGetDateRangeDialog" style="margin-bottom: 5px">
      <br />
      <br />
      <div class="card">
        <div class="card-header">
          <b>{{ $t("message.findByMembershipDateRange") }}</b>
        </div>
        <div class="card-body">
          <div style="float: left" class="col-2">
            <input type="date" v-model="membership_date" />
            <b>{{ $t("message.membershipDate") }}</b>
          </div>
          <div style="float: left" class="col-2">
            <input type="date" v-model="membership_expiry_date" />
            <b>{{ $t("message.membershipExpiryDate") }}</b>
          </div>
          <b-button
            class="btn btn-success"
            @click="
              factoryFindByDateRange(membership_date, membership_expiry_date)
            "
            >{{ $t("message.search") }}</b-button
          >
        </div>
      </div>
    </div>

    <div v-if="factoryGetByNameDialog" style="margin-bottom: 5px">
      <br />
      <br />
      <div class="card">
        <div class="card-header">
          <b>{{ $t("message.findByFactoryName") }}</b>
        </div>
        <div class="card-body">
          <div style="float: left" class="col-2">
            <input
              type="text"
              placeholder="Factory name"
              v-model="factoryName"
            />
          </div>
          <b-button
            class="btn btn-success"
            @click="FactoryNameFind(factoryName)"
            >{{ $t("message.search") }}</b-button
          >
        </div>
      </div>
    </div>

    <div v-if="factoryGetByIdDialog" style="margin-bottom: 5px">
      <br />
      <br />
      <div class="card">
        <div class="card-header">
          <b>{{ $t("message.findByFactoryId") }}</b>
        </div>
        <div class="card-body">
          <div style="float: left" class="col-2">
            <input
              type="number"
              min="0"
              placeholder="Factory id"
              v-model="factoryId"
            />
          </div>
          <b-button class="btn btn-success" @click="FactoryIdFind(factoryId)">{{
            $t("message.search")
          }}</b-button>
        </div>
      </div>
    </div>

    <div v-if="FactoryAddDialog">
      <br />
      <br />
      <div class="card" style="margin-bottom: 5px">
        <div class="card-header">
          <b>{{ $t("message.addFactory") }}</b>
        </div>
        <div class="card-body">
          <div class="form-row">
            <div style="float: left" class="col-2">
              <input
                type="text"
                class="form-control"
                placeholder="Factory Name"
                v-model="factory.factory_name"
              />
            </div>
            <div style="float: left; margin-left: 10px" class="col-2">
              <input
                type="text"
                class="form-control"
                placeholder="Number of Employees"
                v-model="factory.number_of_employees"
              />
            </div>
            <div style="float: left; margin-left: 10px" class="col-2">
              <input
                type="text"
                class="form-control"
                placeholder="Membership Date"
                v-model="factory.membership_date"
              />
            </div>
            <div style="float: left; margin-left: 10px" class="col-2">
              <input
                type="text"
                class="form-control"
                placeholder="Membership Expiry Date"
                v-model="factory.membership_expiry_date"
              />
            </div>
          </div>
          <b-button class="btn btn-success" @click="createFactory(factory)">{{
            $t("message.add")
          }}</b-button>
        </div>
      </div>
    </div>

    <table class="table table-dark table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">{{ $t("message.factoryName") }}</th>
          <th scope="col">{{ $t("message.numberOfEmployees") }}</th>
          <th scope="col">{{ $t("message.membershipDate") }}</th>
          <th scope="col">{{ $t("message.membershipExpiryDate") }}</th>
          <th scope="col">{{ $t("message.edit") }}</th>
          <th scope="col">{{ $t("message.delete") }}</th>
          <th scope="col">{{ $t("message.detail") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in factories"
          :key="item.id"
          v-bind:contenteditable="!contentEditable"
        >
          <td>
            <span>{{ item.id }}</span>
          </td>
          <td>
            <span v-if="!contentEditable">{{ item.factory_name }}</span>
            <input
              v-if="contentEditable"
              v-model="item.factory_name"
              size="10"
            />
          </td>
          <td>
            <span v-if="!contentEditable">{{ item.number_of_employees }}</span>
            <input
              v-if="contentEditable"
              v-model="item.number_of_employees"
              size="8"
            />
          </td>
          <td>
            <span v-if="!contentEditable">{{ item.membership_date }}</span>
            <input
              v-if="contentEditable"
              v-model="item.membership_date"
              size="10"
              type="date"
            />
          </td>
          <td>
            <span v-if="!contentEditable">{{
              item.membership_expiry_date
            }}</span>
            <input
              v-if="contentEditable"
              v-model="item.membership_expiry_date"
              size="10"
              type="date"
            />
          </td>
          <td>
            <b-button
              v-if="!contentEditable"
              size="sm"
              @click="editFactoryRow"
              >{{ $t("message.edit") }}</b-button
            >
            <b-button
              v-if="contentEditable"
              class="btn btn-success"
              size="sm"
              @click="updateFactoryRow(item)"
              >{{ $t("message.save") }}</b-button
            >
            <b-button
              v-if="contentEditable"
              style="margin-left: 5px"
              class="btn btn-info"
              size="sm"
              @click="cancelFactoryRow"
              >{{ $t("message.cancel") }}</b-button
            >
          </td>

          <td>
            <b-button
              class="btn btn-danger"
              size="sm"
              @click="deleteFactoryRow(item.id)"
              >{{ $t("message.delete") }}</b-button
            >
          </td>
          <td>
            <b-button
              class="btn btn-info"
              size="sm"
              @click="showFactoryDetail(item)"
              >{{ $t("message.detail") }}</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showFactoryDetailButton">
      <b-button
        style="float: left; margin-bottom: 5px"
        class="btn btn-warning"
        @click="FactoryDetailAddRowDialog"
        >{{ $t("message.addFactoryDetail") }}</b-button
      >
      <b-button
        style="float: left; margin-bottom: 5px; margin-left: 5px"
        class="btn btn-info"
        @click="FactoryDetailGetByIdRowDialog"
        >{{ $t("message.findId") }}</b-button
      >
      <b-button
        style="float: left; margin-bottom: 5px; margin-left: 5px"
        class="btn btn-info"
        @click="factoryDetailGetByDateRangeRowDialog"
        >{{ $t("message.findDateRange") }}</b-button
      >
    </div>

    <div v-if="factoryDetailGetDateRangeDialog" style="margin-bottom: 5px">
      <br />
      <br />
      <div class="card">
        <div class="card-header">
          <b>{{ $t("message.findDateRange") }}</b>
        </div>
        <div class="card-body">
          <div style="float: left" class="col-2">
            <input type="date" min="0" v-model="start_date" />
            <b>{{ $t("message.startDate") }}</b>
          </div>
          <div style="float: left" class="col-2">
            <input type="date" min="0" v-model="end_date" />
            <b>{{ $t("message.endDate") }}</b>
          </div>
          <b-button
            class="btn btn-success"
            @click="factoryDetailFindByDateRange(start_date, end_date)"
            >{{ $t("message.search") }}</b-button
          >
        </div>
      </div>
    </div>

    <div v-if="factoryDetailGetByIdDialog" style="margin-bottom: 5px">
      <br />
      <br />
      <div class="card">
        <div class="card-header">
          <b>{{ $t("message.findId") }}</b>
        </div>
        <div class="card-body">
          <div style="float: left" class="col-2">
            <input
              type="number"
              min="0"
              placeholder="Factory Detail id"
              v-model="factoryDetailId"
            />
          </div>
          <b-button
            class="btn btn-success"
            @click="factoryDetailFindById(factoryDetailId)"
            >{{ $t("message.search") }}</b-button
          >
        </div>
      </div>
    </div>

    <div v-if="FactoryDetailAddDialog">
      <br />
      <br />
      <div class="card" style="margin-bottom: 5px">
        <div class="card-header">
          {{ $t("message.addFactoryDetail") }}
        </div>
        <div class="card-body">
          <div class="form-row">
            <div style="float: left">
              <input
                type="text"
                size="9"
                class="form-control"
                placeholder="Unit Used"
                v-model="factoryDetail.unit_used"
              />
            </div>
            <div style="float: left; margin-left: 10px">
              <input
                type="date"
                class="form-control"
                placeholder="Start Date"
                v-model="factoryDetail.start_date"
              />
            </div>
            <div style="float: left; margin-left: 10px">
              <input
                type="date"
                class="form-control"
                placeholder="End Date"
                v-model="factoryDetail.end_date"
              />
            </div>
            <div style="float: left; margin-left: 10px">
              <input
                type="text"
                size="9"
                class="form-control"
                placeholder="Kilowatt Usage"
                v-model="factoryDetail.kilowatt_usage"
              />
            </div>
            <div style="float: left; margin-left: 10px">
              <input
                type="text"
                size="9"
                class="form-control"
                placeholder="Usage Fee"
                v-model="factoryDetail.usage_fee"
              />
            </div>
            <div style="float: left; margin-left: 10px">
              <input
                type="text"
                size="9"
                class="form-control"
                placeholder="Discounted Price"
                v-model="factoryDetail.discounted_price"
              />
            </div>
          </div>
          <b-button
            style="margin-top: 10px"
            class="btn btn-success"
            @click="createFactoryDetail(factoryDetail)"
            >{{ $t("message.add") }}
          </b-button>
        </div>
      </div>
    </div>

    <div v-if="factoryDetailSuccess">
      <table class="table table-dark table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">{{ $t("message.unitUsed") }}</th>
            <th scope="col">{{ $t("message.startDate") }}</th>
            <th scope="col">{{ $t("message.endDate") }}</th>
            <th scope="col">{{ $t("message.diffDate") }}</th>
            <th scope="col">{{ $t("message.kilowattUsage") }}</th>
            <th scope="col">{{ $t("message.usageFee") }}</th>
            <th scope="col">{{ $t("message.discountedPrice") }}</th>
            <th scope="col">{{ $t("message.edit") }}</th>
            <th scope="col">{{ $t("message.delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in factoryDetails"
            :key="item.id"
            v-bind:contenteditable="contentEditableDetail"
          >
            <td>
              <span>{{ item.id }}</span>
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{ item.unit_used }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.unit_used"
                size="10"
              />
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{ item.start_date }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.start_date"
                type="date"
                size="10"
              />
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{ item.end_date }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.end_date"
                type="date"
                size="10"
              />
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{ item.diff_date }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.diff_date"
                size="10"
                readonly
              />
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{
                item.kilowatt_usage
              }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.kilowatt_usage"
                size="10"
              />
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{ item.usage_fee }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.usage_fee"
                size="10"
              />
            </td>
            <td>
              <span v-if="!contentEditableDetail">{{
                item.discounted_price
              }}</span>
              <input
                v-if="contentEditableDetail"
                v-model="item.discounted_price"
                size="10"
                type="checkbox"
              />
            </td>
            <td>
              <b-button
                size="sm"
                @click="editFactoryDetailRow"
                v-if="!contentEditableDetail"
                >{{ $t("message.edit") }}</b-button
              >
              <b-button
                class="btn btn-success"
                v-if="contentEditableDetail"
                size="sm"
                @click="updateFactoryDetailRow(item)"
                >{{ $t("message.save") }}</b-button
              >
              <b-button
                class="btn btn-info"
                v-if="contentEditableDetail"
                size="sm"
                @click="cancelFactoryDetailRow"
                style="margin-left: 5px"
                >{{ $t("message.cancel") }}</b-button
              >
            </td>
            <td>
              <b-button
                class="btn btn-danger"
                size="sm"
                @click="deleteFactoryDetailRow(item.id)"
                >{{ $t("message.delete") }}</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <b>{{ $t("message.serverError") }}</b>
    <b-spinner class="align-middle"></b-spinner>
  </div>
</template>

<script>
import axios from "./plugins/Axios/axios";

export default {
  name: "Factories",
  data() {
    return {
      token: localStorage.token,
      factories: [],
      factory: {
        factory_name: null,
        number_of_employees: null,
        membership_date: null,
        membership_expiry_date: null,
      },

      FactoryAddDialog: false,
      factoryGetByIdDialog: false,
      factoryGetByNameDialog: false,
      factoryGetDateRangeDialog: false,

      factoryId: null,
      factoryName: null,
      membership_date: null,
      membership_expiry_date: null,

      success: false,
      selected: [],
      contentEditable: false,
      contentEditableDetail: false,

      factoryDetails: [],
      factoryDetail: {
        unit_used: null,
        start_date: null,
        end_date: null,
        kilowatt_usage: null,
        usage_fee: null,
        discounted_price: null,
        factory_id: null,
      },
      showDetails: false,
      showFactoryDetailButton: false,
      factoryDetailSuccess: false,

      FactoryDetailAddDialog: false,
      factoryDetailGetByIdDialog: false,
      factoryDetailGetDateRangeDialog: false,

      factoryDetailId: null,
      start_date: null,
      end_date: null,
    };
  },
  methods: {
    editFactoryRow() {
      this.contentEditable = true;
    },
    cancelFactoryRow() {
      this.contentEditable = false;
    },
    editFactoryDetailRow() {
      this.contentEditableDetail = true;
    },
    cancelFactoryDetailRow() {
      this.contentEditableDetail = false;
    },
    updateFactoryRow(item) {
      //{headers: {'Authorization' : `token ${this.token}`}}
      this.selected = item;
      let id = this.selected.id;
      axios.put("factory/update/" + id, this.selected).then((response) => {
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    updateFactoryDetailRow(item) {
      this.selected = item;
      let id = this.selected.id;
      this.selected.kilowatt_usage = parseFloat(this.selected.kilowatt_usage);
      axios
        .put("factoryDetail/update/" + id, this.selected)
        .then((response) => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "SUCCESS !",
            text: response.data.message,
          });
        });
    },
    factoryAddRowDialog() {
      if (this.FactoryAddDialog == false) this.FactoryAddDialog = true;
      else this.FactoryAddDialog = false;
    },
    FactoryDetailAddRowDialog() {
      if (this.FactoryDetailAddDialog == false)
        this.FactoryDetailAddDialog = true;
      else this.FactoryDetailAddDialog = false;
    },
    showFactoryDetail(item) {
      this.factoryDetail.factory_id = item.id;
      let id = item.id;
      axios.get("factoryDetail/getByFactoryId/" + id).then((response) => {
        this.factoryDetailSuccess = response.data.success;
        this.factoryDetails = response.data.data;
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
      this.showFactoryDetailButton = true;
    },
    createFactory(factory) {
      this.factory = factory;
      axios.post("factory/add", this.factory).then((response) => {
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    createFactoryDetail(factoryDetail) {
      this.factoryDetail = factoryDetail;
      axios.post("factoryDetail/add", this.factoryDetail).then((response) => {
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    deleteFactoryDetailRow(id) {
      axios.delete("factoryDetail/delete/" + id).then((response) => {
        this.$notify({
          group: "foo",
          type: "warn",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    deleteFactoryRow(id) {
      console.log(id);
      axios
        .delete("factory/delete/" + id)
        .then((response) => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "SUCCESS !",
            text: response.data.message,
          });
        })
        .catch(() => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Warning",
            text: "You need to delete all data in other table",
          });
        });
    },
    factoryGetByIdRowDialog() {
      if (this.factoryGetByIdDialog == false) this.factoryGetByIdDialog = true;
      else this.factoryGetByIdDialog = false;
    },
    FactoryIdFind(factoryId) {
      axios.get("factory/getById/" + factoryId).then((response) => {
        this.factories = [];
        this.factories.push(response.data.data);
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    factoryGetByNameRowDialog() {
      if (this.factoryGetByNameDialog == false)
        this.factoryGetByNameDialog = true;
      else this.factoryGetByNameDialog = false;
    },
    FactoryNameFind(findByName) {
      axios.get(`factory/getByName/${findByName}`).then((response) => {
        this.factories = [];
        this.factories.push(response.data.data);
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    factoryGetDateRangeRowDialog() {
      if (this.factoryGetDateRangeDialog == false)
        this.factoryGetDateRangeDialog = true;
      else this.factoryGetDateRangeDialog = false;
    },
    factoryFindByDateRange(membership_date, membership_expiry_date) {
      axios
        .get(
          `factory/getByMembershipDateRange/${membership_date}/${membership_expiry_date}`
        )
        .then((response) => {
          this.factories = [];
          this.factories = response.data.data;
          this.$notify({
            group: "foo",
            type: "success",
            title: "SUCCESS !",
            text: response.data.message,
          });
        });
    },
    FactoryDetailGetByIdRowDialog() {
      if (this.factoryDetailGetByIdDialog == false)
        this.factoryDetailGetByIdDialog = true;
      else this.factoryDetailGetByIdDialog = false;
    },
    factoryDetailFindById(factoryDetailId) {
      axios.get(`factoryDetail/getById/${factoryDetailId}`).then((response) => {
        this.factoryDetails = [];
        this.factoryDetails.push(response.data.data);
        this.$notify({
          group: "foo",
          type: "success",
          title: "SUCCESS !",
          text: response.data.message,
        });
      });
    },
    factoryDetailGetByDateRangeRowDialog() {
      if (this.factoryDetailGetDateRangeDialog == false)
        this.factoryDetailGetDateRangeDialog = true;
      else this.factoryDetailGetDateRangeDialog = false;
    },
    factoryDetailFindByDateRange(start_date, end_date) {
      axios
        .get(`factoryDetail/getByDateRange/${start_date}/${end_date}`)
        .then((response) => {
          this.factoryDetails = [];
          this.factoryDetails = response.data.data;
          this.$notify({
            group: "foo",
            type: "success",
            title: "SUCCESS !",
            text: response.data.message,
          });
        });
    },
  },
  created() {
    axios.get("factory/getAll").then((response) => {
      this.factories = response.data.data;
      this.success = response.data.success;
    });
  },
};
</script>
<style scoped>
#factories {
  margin-top: 10px;
}
</style>
