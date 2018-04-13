<template>
  <div>
    <el-table :data="tableData" style="width: 100%;" v-show="showTable">
      <el-table-column label="编号" width="80" type="index">
      </el-table-column>
      <el-table-column label="职位名称" prop="job_name">
      </el-table-column>
      <el-table-column label="发布时间" prop="job_date">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="goDelete(scope.$index,scope.row.job_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="100px" class="demo-jobForm" v-show="!showTable">
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="jobForm.name" placeholder="项目经理"></el-input>
      </el-form-item>
      <el-form-item label="职位薪资" prop="salary">
        <el-input v-model="jobForm.salary" placeholder="10k-15k"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="addr">
        <el-input v-model="jobForm.addr" placeholder="北京"></el-input>
      </el-form-item>
      <el-form-item label="工作经验" prop="exp">
        <el-input v-model="jobForm.exp" placeholder="1-3年"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-input v-model="jobForm.edu" placeholder="本科"></el-input>
      </el-form-item>
      <el-form-item label="工作时间" prop="time">
        <el-input v-model="jobForm.time" placeholder="全职"></el-input>
      </el-form-item>
      <el-form-item label="职位描述" prop="info">
        <el-input type="textarea" v-model="jobForm.info" :autosize="{ minRows: 5 }" placeholder="职位信息,任职要求">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('jobForm')">保存</el-button>
        <el-button @click="clearForm('jobForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      // 当前编辑的职位id
      editId: '',
      showTable: true,
      tableData: [],
      jobForm: {
        name: '',
        salary: '',
        addr: '',
        exp: '',
        edu: '',
        time: '',
        info: '',
      },
      rules: {
        name: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        salary: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        addr: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        exp: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        edu: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        time: [
          { required: true, message: ' ', trigger: 'blur' },
        ]
      }
    }
  },
  mounted () {
    this.getJobs()
  },
  methods: {
    // 获取该公司所有职位
    getJobs () {
      axios
        .post('/enter/getjobs', {
          account: localStorage.getItem('en_account')
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.tableData = response.data.msg
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 编辑
    goEdit (row) {
      this.jobForm.name = row.job_name,
        this.jobForm.salary = row.job_salary,
        this.jobForm.addr = row.job_addr,
        this.jobForm.exp = row.job_exp,
        this.jobForm.edu = row.job_edu,
        this.jobForm.time = row.job_time,
        this.jobForm.info = row.job_info,
        this.showTable = false
      this.editId = row.job_id
    },
    // 清空表单
    clearForm (formName) {
      this.$refs[formName].resetFields()
      this.showTable = true
    },
    // 保存
    save (form) {
      console.log(this.jobForm)
      // 弹出确认框
      this.$confirm('确定保存吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveForm(this.jobForm)
      })
    },
    // 确认保存
    saveForm (form) {
      axios
        .post('/enter/updatejob', {
          id: this.editId,
          name: form.name,
          salary: form.salary,
          addr: form.addr,
          exp: form.exp,
          edu: form.edu,
          time: form.time,
          info: form.info
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.showTable = true
            // 重新获取最新职位信息
            this.getJobs()
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除
    goDelete (index, id) {
      // 弹出确认框
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteJob(index, id)
      })
    },
    // 删除职位
    deleteJob (index, id) {
      axios
        .post('/enter/deletejob', {
          id: id
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.tableData.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
