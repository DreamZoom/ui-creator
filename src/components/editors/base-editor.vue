<template>
  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
    <a-form-item label="位置">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input prefix="X" v-model="element.left" placeholder="横坐标" type="number"></a-input>
        </a-col>
        <a-col :span="12">
          <a-input prefix="Y" v-model="element.top" placeholder="纵坐标" type="number"></a-input>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item label="大小">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input prefix="W" v-model="element.width" placeholder="宽度" type="number"></a-input>
        </a-col>
        <a-col :span="12">
          <a-input prefix="H" v-model="element.height" placeholder="高度" type="number"></a-input>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item label="旋转">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input prefix="W" v-model="element.roate" placeholder="角度" type="number"></a-input>
        </a-col>
        <a-col :span="12">
          
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: "BaseEditor",
  props: {
    element: Object,
  },
  data() {
    return {};
  },
};
</script>