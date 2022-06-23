<template>
  <div class="jingyingshujuzongbiao">
    <Search />
    <SelectTableColumn />
  </div>
</template>

<script>
import Search from "../commonComponent/searchComponent.vue";
import SelectTableColumn from "../commonComponent/selectTableColumn.vue";
export default {
  props: {},
  components: {
    Search: Search,
    SelectTableColumn: SelectTableColumn,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.jingyingshujuzongbiao {
  box-sizing: border-box;
  /* border: 1px solid red; */
}
</style>
