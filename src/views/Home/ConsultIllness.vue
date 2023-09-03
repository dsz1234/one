<template>
  <div class="consult-page">
    <lgNavBar title="图文问诊"></lgNavBar>
    <div class="top">
      <img src="../../assets//avatar-doctor.svg" alt="" />
      <div class="right">
        <p class="tit">在线医生</p>
        <p class="desc">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cpIcons name="consult-safe"></cpIcons> <span>内容仅医生可见 </span></p>
      </div>
    </div>

    <!-- 收集信息 -->
    <div class="file">
      <van-field
        rows="1"
        type="textarea"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      />
      <div class="item">
        <p>本次患病多久了？</p>
        <cpRadioBtn :options="timeOptions" v-model="form.illnessTime"></cpRadioBtn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cpRadioBtn :options="flagOptions" v-model="form.consultFlag"></cpRadioBtn>
      </div>
      <div class="imgs">
        <van-uploader
          :after-read="onAfterRead"
          @delete="onDeleteImg"
          v-model="fileList"
          max-count="9"
          :max-size="5 * 1024 * 1024"
          upload-icon="photo-o"
          upload-text="上传图片"
        />
        <p class="tip" v-if="form.pictures?.length === 0">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
    </div>
    <div class="btn">
      <van-button :class="{ disabled }" @click="next" type="primary" block round>下一步</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, computed, onMounted } from 'vue'
import lgNavBar from '@/components/lg-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import { IllnessTime } from '@/enums'
import type { IllnessFile, Image } from '@/types/consult'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { uploadImage } from '@/services/consult'
import { useConsultStore } from '@/stores'
import { showConfirmDialog, showToast } from 'vant'
const store = useConsultStore()

const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]

const form = ref<IllnessFile>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
// 上传图片
const fileList = ref<Image[]>([])
const onAfterRead: UploaderAfterRead = (item) => {
  // TODO 上传图片
  // console.log(item)
  if (Array.isArray(item)) return
  if (!item.file) return
  // 开始上传
  item.status = 'uploading'
  item.message = '上传中...'
  uploadImage(item.file)
    .then((res) => {
      // console.log(res)
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      form.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
const onDeleteImg = (item: UploaderFileListItem) => {
  // TODO 删除图片
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)

// 点击下一步
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请选择症状持续时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否已经就诊')
  store.setIllness(form.value)
  router.push('/user/patient?isChange=1')
}

// 回显数据
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复之前填写的病情信息呢？',
      closeOnPopstate: false
    }).then(() => {
      // 确定
      const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
      form.value = { illnessDesc, illnessTime, consultFlag, pictures }
      fileList.value = pictures || []
    })
  }
})
</script>

<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  .top {
    display: flex;
    padding: 15px;
    align-items: center;
    border-bottom: 1px solid var(--cp-bg);
    img {
      width: 52px;
      height: 52px;
    }
    .right {
      margin-left: 15px;
      .tit {
        font-weight: 550;
        font-size: 17px;
      }
      .desc {
        background-color: #f6f7f8;
        padding: 10px;
        font-size: 14px;
        margin-top: 5px;
        color: var(--cp-text3);
      }
      .safe {
        display: flex;
        align-items: center;
        margin-top: 5px;
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
  }
  .file {
    .item {
      padding: 10px 15px;
      p {
        font-size: 14px;
        color: var(--cp-text2);
      }
    }
    .imgs {
      padding: 0 15px;
      display: flex;
      align-items: center;
      .tip {
        font-size: 12px;
        color: var(--cp-tip);
      }
    }
  }
}
.btn {
  padding-top: 30px;
  .van-button {
    font-size: 16px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
}
</style>
