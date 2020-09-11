<template>
  <VueDragResize
    class="element"
    :class="{selected:actived}"
    :isActive="actived"
    @resizing="handleResize"
    @dragging="handleResize"
    :style="elementStyle"
    @clicked="handleClick"
    :x="property.left"
    :y="property.top"
    :w="property.width"
    :h="property.height"
  >
    <div>hello</div>
  </VueDragResize>
</template>

<script>
import VueDragResize from "vue-drag-resize";
export default {
  name: "PageElement",
  props: {
    value: Object,
  },
  components: {
    VueDragResize,
  },
  inject: ["editor"],
  computed: {
    actived() {
      return this.editor.selected == this.value;
    },
    elementStyle() {
      const {
        left = 0,
        top = 0,
        width = 300,
        height = 300,
        roate = 0,
      } = this.value;
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${roate}deg)`,
      };
    },
    property() {
      const {
        left = 0,
        top = 0,
        width = 300,
        height = 300,
        roate = 0,
      } = this.value;
      return {
        left,
        top,
        width,
        height,
      };
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
    handleResize(rect) {
      this.$emit("input", { ...this.value, ...rect });
    },
  },
};
</script>


<style scoped>
.element {
  position: absolute;
}
.element.selected {
  outline: dotted 1px #888;
}
</style>