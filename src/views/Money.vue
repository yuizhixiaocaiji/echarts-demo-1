<template >
  <Layout class-prefix="layout" >
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout >
</template >

<script lang="ts" >
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';

const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: Date  // 类 / 构造函数
}
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  recordList: Record[] = [];
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2 = JSON.parse(JSON.stringify(this.record))
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recodeList')
  onRecodeListChange() {
    window.localStorage.setItem('recodeList', JSON.stringify(this.recordList));
  }
}
</script >

<style lang="scss" >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style >