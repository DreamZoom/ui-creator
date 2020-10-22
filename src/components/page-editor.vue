<template>
  <div class="editor">
    <div class="tools-bar">
      <div class="title-bar">
        <a-input placeholder="Basic usage" value="大屏编辑" />
      </div>
      <div class="charts-bar">
        <a-button-group>
          <a-button type="primary" icon="font-size" @click="handleAddElement('text')">文字</a-button>
          <a-button type="primary" icon="cloud-download" @click="handleAddElement('image')">图片</a-button>
          <a-button type="primary" icon="cloud-download" @click="handleAddElement('charts')">图表</a-button>
        </a-button-group>
      </div>
      <div class="action-bar">
        <a-button type="primary">预览</a-button>
        <a-button type="primary">保存</a-button>
      </div>
    </div>

    <div class="page-pannel">
      <a-card title="图层"></a-card>
    </div>

    <div class="container-box">
      <div class="container-box-padding">
        <div class="canvas-box" :style="canvasStyle">
          <div class="data-visual-content" :style="pageStyle">
            <page-element
              v-for="(item,index) in page.elements"
              :key="index"
              v-model="page.elements[index]"
              @click="handleSelect(item,index)"
            ></page-element>
          </div>
        </div>
      </div>
    </div>

    <div class="canvas-status">
      <div class="canvas-status-scale">
        <a-row>
          <a-col :span="4">
            <span style="line-height:40px">比例:</span>
          </a-col>
          <a-col :span="20">
            <a-slider v-model="container.scale" :min="0.1" :max="2" :step="0.01" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="property-pannel">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="组件">
          <a-card title="基本属性" v-if="selected">
            <base-editor :value="selected"></base-editor>

            <json-editor></json-editor>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="页面" force-render>Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageEditor",
  data() {
    return {
      page: {
        width: 600,
        height: 400,
        elements: [],
      },
      container: {
        scale: 0.8,
        selectedIndex: -1,
      },
    };
  },
  computed: {
    canvasStyle() {
      return {
        width: this.page.width * this.container.scale + "px",
        height: this.page.height * this.container.scale + "px",
      };
    },
    pageStyle() {
      return {
        width: this.page.width + "px",
        height: this.page.height + "px",
        transform: `scale(${this.container.scale})`,
        "margin-left": `${
          -0.5 * (this.page.width - this.page.width * this.container.scale)
        }px`,
        "margin-top": `${
          -0.5 * (this.page.height - this.page.height * this.container.scale)
        }px`,
      };
    },
    selected() {
      if (
        this.container.selectedIndex < 0 ||
        this.container.selectedIndex > this.page.elements.length
      ) {
        return null;
      }
      return this.page.elements[this.container.selectedIndex];
    },
    scale(){
      return this.container.scale || 1;
    }
  },
  provide: function () {
    return {
      editor: this,
    };
  },
  methods: {
    handleScale(evt) {
      const v = evt.deltaY || 0;
      console.log(v);
      if (v > 0) {
        this.container.scale -= 0.1;
      }
      if (v < 0) {
        this.container.scale += 0.1;
      }
    },
    handleAddElement(type) {
      this.page.elements.push({
        type,
      });
    },
    handleSelect(element,index) {
      this.container.selectedIndex = index;
    },
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ededed;
}

.editor {
  position: relative;
  width: 100%;
  height: 100%;
}
.tools-bar {
  position: absolute;
  height: 60px;
  top: 0px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 5px #ccc;
}
.charts-bar {
  display: inline-block;
  padding: 10px;
  font-size: 20px;
}
.action-bar {
  float: right;
  padding: 10px;
  padding-top: 12px;
}
.title-bar {
  float: left;
  padding: 10px;
  padding-top: 12px;
}
.canvas-box {
  margin: auto;
  position: relative;
}
.container-box {
  position: absolute;
  top: 60px;
  bottom: 40px;
  left: 300px;
  right: 300px;
  overflow: auto;
  background-color: #e5e5e5;
  text-align: center;
}

.container-box-padding {
  padding: 40px;
  margin: auto;
  display: inline-block;
}
.data-visual-content {
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 10px 0;
  background-color: #fff;
}
.property-pannel {
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  bottom: 0px;
  overflow: auto;
}
.page-pannel {
  position: absolute;
  top: 60px;
  left: 0;
  width: 300px;
  bottom: 0px;
  overflow: auto;
}

.canvas-status {
  position: absolute;
  height: 40px;
  left: 300px;
  right: 300px;
  bottom: 0px;
  overflow: auto;
}
.canvas-status-scale {
  width: 300px;
  float: right;
}
</style>