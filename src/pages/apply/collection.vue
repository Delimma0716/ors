<template>
  <div class="list">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-table :data="tableData" style="width: 100%" @row-click="detail">
          <el-table-column type="index" label="编号">
          </el-table-column>
          <el-table-column prop="job_name" label="职位名称">
          </el-table-column>
          <el-table-column prop="en_name" label="公司名称">
          </el-table-column>
          <el-table-column prop="job_salary" label="薪资(k)">
          </el-table-column>
          <el-table-column prop="job_addr" label="工作地点">
          </el-table-column>
          <el-table-column prop="date" label="发布时间">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style>

</style>
