<template>
  <div>
    <el-result title="404" subTitle="你訪問的頁面不存在">
      <template slot="icon">
        <el-image :src="emptyImg"></el-image>
      </template>
      <template slot="extra">
        <el-button type="primary" size="medium" @click="$router.push('/')">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      emptyImg: require('@/assets/empty.png')
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
