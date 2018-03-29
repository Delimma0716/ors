<template>
  <div class="mainBox">
    <div class="search">
      <el-row>
        <el-col :span="14" :offset="4">
          <el-input placeholder="请输入内容" v-model="keyword"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="filter">
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">职位类别</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">类别</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">类别</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">类别</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">行业类别</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">类别</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">类别</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">类别</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">城市</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">城市</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">城市</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">城市</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">更多</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="薪资">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="发布日期">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="...">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="sort">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-radio-group v-model="radio3">
            <el-radio-button label="薪资从高到低"></el-radio-button>
            <el-radio-button label="薪资从低到高"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-radio-group v-model="radio3">
            <el-radio-button label="薪资从高到低"></el-radio-button>
            <el-radio-button label="薪资从低到高"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table :data="tableData" style="width: 100%" @row-click="detail">
            <el-table-column prop="date" label="职位名称">
            </el-table-column>
            <el-table-column prop="name" label="公司名称">
            </el-table-column>
            <el-table-column prop="address" label="薪资">
            </el-table-column>
            <el-table-column prop="address" label="工作地点">
            </el-table-column>
            <el-table-column prop="date" label="发布时间">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </div>
    <div class="page">
      <el-row>
        <el-col :span="16" :offset="8">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      value: '',
      radio3: '上海',
      tableData: [
        {
          date: '111',
          name: '111',
          address: '111'
        }
      ]
    }
  },
  methods: {
    // 显示职位细节
    detail (row, event, column) {
      console.log(row, event, column)
      this.$router.push('/detail')
    }
  }
}
</script>

<style lang="less" scoped>
.mainBox {
  width: 100%;
  position: relative;
  top: 61px;
  left: 0;
  .search {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .filter {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .sort {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .list {
    padding: 20px 0;
  }
  .page {
    padding: 20px 0;
  }
}
</style>



