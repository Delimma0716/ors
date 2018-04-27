<template>
  <div class="mainBox">
    <el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="100px">
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="jobForm.name" placeholder="项目经理"></el-input>
      </el-form-item>
      <el-form-item label="职位薪资" prop="salary">
        <el-input v-model.number="jobForm.salary" placeholder="10">
          <template slot="append">k</template>
        </el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="addr">
        <el-cascader expand-trigger="hover" :options="addrOptions" @change="handleChange" separator="-">
        </el-cascader>
      </el-form-item>
      <el-form-item label="工作经验" prop="exp">
        <el-select v-model="jobForm.exp" placeholder="请选择">
          <el-option v-for="item in expOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-select v-model="jobForm.edu" placeholder="请选择">
          <el-option v-for="item in eduOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作时间" prop="time">
        <el-select v-model="jobForm.time" placeholder="请选择">
          <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位描述" prop="info">
        <el-input type="textarea" v-model="jobForm.info" :autosize="{ minRows: 5}" placeholder="职位信息,任职要求">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('jobForm')">立即发布</el-button>
        <el-button @click="clearForm('jobForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { enterCheck } from '@/assets/js/enterUtils'

let CITY = {
  北京: ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "海淀区", "丰台区", "石景山区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "门头沟区", "密云县", "延庆县"],
  天津: ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "北辰区", "津南区", "武清区", "宝坻区", "滨海新区", "静海县", "宁河县", "蓟县"],
  上海: ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明县"],
  重庆: ["渝中区", "大渡口区", "江北区", "南岸区", "北碚区", "渝北区", "巴南区", "长寿区", "双桥区", "沙坪坝区", "万盛区", "万州区", "涪陵区", "黔江区", "永川区", "合川区", "江津区", "九龙坡区", "南川区", "綦江县", "潼南县", "荣昌县", "璧山县", "大足县", "铜梁县", "梁平县", "开县", "忠县", "城口县", "垫江县", "武隆县", "丰都县", "奉节县", "云阳县", "巫溪县", "巫山县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"],
  河北: ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"],
  山西: ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
  辽宁: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  吉林: ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治州"],
  黑龙江: ["哈尔滨", "齐齐哈尔", "鹤岗", "双鸭山", "鸡西", "大庆", "伊春", "牡丹江", "佳木斯", "七台河", "黑河", "绥化", "大兴安岭"],
  江苏: ["南京", "苏州", "无锡", "常州", "镇江", "南通", "泰州", "扬州", "盐城", "连云港", "徐州", "淮安", "宿迁"],
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
  安徽: ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳", "宿州", "巢湖", "六安", "亳州", "池州", "宣城"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
  江西: ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"],
  山东: ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "滨州", "菏泽"],
  河南: ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店"],
  湖北: ["武汉", "黄石", "十堰", "荆州", "宜昌", "襄樊", "鄂州", "荆门", "孝感", "黄冈", "咸宁", "随州", "恩施"],
  湖南: ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西"],
  广东: ["广州", "深圳", "珠海", "汕头", "韶关", "佛山", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"],
  海南: ["海口", "三亚"],
  四川: ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝", "甘孜", "凉山"],
  贵州: ["贵阳", "六盘水", "遵义", "安顺", "铜仁", "毕节", "黔西南", "黔东南", "黔南"],
  云南: ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "德宏", "怒江", "迪庆", "大理", "楚雄", "红河", "文山", "西双版纳"],
  陕西: ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"],
  甘肃: ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "酒泉", "张掖", "庆阳", "平凉", "定西", "陇南", "临夏", "甘南"],
  青海: ["西宁", "海东", "海北", "海南", "黄南", "果洛", "玉树", "海西"],
  内蒙古: ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "锡林郭勒盟", "兴安盟", "阿拉善盟"],
  广西: ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"],
  西藏: ["拉萨", "那曲", "昌都", "林芝", "山南", "日喀则", "阿里"],
  宁夏: ["银川", "石嘴山", "吴忠", "固原", "中卫"],
  新疆维吾尔自治区: ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "和田", "阿克苏", "喀什", "克孜勒苏", "巴音郭楞", "昌吉", "博尔塔拉", "伊犁", "塔城", "阿勒泰"],
  香港: ["香港岛", "九龙东", "九龙西", "新界东", "新界西"],
  澳门: ["澳门半岛", "离岛"],
  台湾: ["台北", "高雄", "基隆", "新竹", "台中", "嘉义", "台南市"]
}

export default {
  data () {
    return {
      jobForm: {
        name: '',
        salary: '',
        addr: '',
        exp: '',
        edu: '',
        time: '',
        info: '',
      },
      // 地点
      addrOptions: [],
      // 经验
      expOptions: [{
        value: '无要求',
        label: '无要求'
      }, {
        value: '1-3年',
        label: '1-3年'
      }, {
        value: '3-5年',
        label: '3-5年'
      }, {
        value: '5-10年',
        label: '5-10年'
      }],
      // 学历
      eduOptions: [{
        value: '无要求',
        label: '无要求'
      }, {
        value: '专科',
        label: '专科'
      }, {
        value: '本科',
        label: '本科'
      }, {
        value: '硕士',
        label: '硕士'
      }],
      // 时间
      timeOptions: [{
        value: '全职',
        label: '全职'
      }, {
        value: '兼职',
        label: '兼职'
      }, {
        value: '实习',
        label: '实习'
      }],
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        salary: [
          { required: true, message: '必填', trigger: 'blur' },
          { type: 'number', message: '必须为数字' }
        ],
        addr: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        exp: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        edu: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '必填', trigger: 'blur' },
        ]
      }
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    // 检查审核状态
    check () {
      enterCheck(localStorage.getItem('en_account'))
        .then(data => {
          if (data.msg === 0) {
            // 弹出确认框
            this.$alert('您还未认证，请先通过企业认证', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.$router.push({ name: '企业认证' })
            })
          } else if (data.msg === 2) {
            // 弹出确认框
            this.$alert('您的认证未通过，请重新上传资料', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.$router.push({ name: '企业认证' })
            })
          } else {
            this.initAddr()
          }
        }, function (error) {
          console.log(error)
        })
    },
    // 初始化地点列表
    initAddr () {
      this.addrOptions = []
      for (let province in CITY) {
        let item = {
          value: province,
          label: province,
          children: []
        }
        for (let city of CITY[province]) {
          let subItem = {
            value: city,
            label: city
          }
          item.children.push(subItem)
        }
        this.addrOptions.push(item)
      }
    },
    // 层级选择器设置值
    handleChange (value) {
      this.jobForm.addr = value[0] + '-' + value[1]
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 弹出确认框
          this.$confirm('确定发布吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.recruit()
          })
        } else {
          return false
        }
      })
    },
    // 清空表单
    clearForm (formName) {
      this.$refs[formName].resetFields()
      this.jobForm.addr = ''
    },
    // 发布职位
    recruit () {
      axios
        .post('/enter/postjob', {
          account: localStorage.getItem('en_account'),
          name: this.jobForm.name,
          salary: this.jobForm.salary,
          addr: this.jobForm.addr,
          exp: this.jobForm.exp,
          edu: this.jobForm.edu,
          time: this.jobForm.time,
          info: this.jobForm.info
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.mainBox {
  position: relative;
  top: 61px;
  left: 0;
  padding: 5% 30%;
}
</style>