<template>
  <div>
    <el-table :data="tableData" stripe style="width: 850px">
      <el-table-column prop="Snu" label="学号" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="reality_fans" label="成绩" width="200" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.reality_fans"
            @change="getNum(scope.row)"
            placeholder="请输入成绩"
            class="input-width"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改成绩" placement="top">
            <el-button
              type="primary"
              title="修改成绩"
              size="medium"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.Snu)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改成绩 -->
    <el-dialog title="修改成绩" :visible.sync="dialogFormVisible" width="245px">
      <el-form :model="form" label-position="right" label-width="50px">
        <el-form-item label="成绩">
          <el-input v-model="form.grade" autocomplete="off" class="InputWidth"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form: {},
      dialogFormVisible: false
    };
  },
  created() {
    this.select_student();
  },
  methods: {
    getNum(value) {
      console.log(value);
    },
    showEditDialog(id) {
      console.log(id);
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    async select_student() {
      const tnu = localStorage.getItem("username");
      const { data: res } = await this.$http.get("make_gradeList/" + tnu, {
        Tnu: tnu
      });
      this.tableData = res;
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.input-width {
  width: 120px;
}
.InputWidth {
  width: 100%;
}
</style>
