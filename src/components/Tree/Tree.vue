<template>
    <div>
        <div class="meum">
            <div v-for="(item,index) in dataSource" :key='index' >
                   <div class="flex" @click="sMeumClik(item,index)">
                        <div>
                            <a-icon :type="item.icon" v-if="item.icon"/>
                            {{item.title}}
                        </div>
                        <div>
                            <a-dropdown >
                                <a class="btn"><a-icon type="ellipsis" /></a>
                                <a-menu slot="overlay" @click="handleMenuClick($event,item)">
                                    <a-menu-item key="1">新增</a-menu-item>
                                    <a-menu-item key="2">编辑</a-menu-item>
                                    <a-menu-item key="3">移除</a-menu-item>
                                </a-menu>
                            </a-dropdown>
                            <a-icon  v-if="item.children"  :type="item.fold?'up':'down'"  class="fold-icon"/>
                        </div>
                    </div>
                     <div class="children" v-if="item.fold&&item.children">
                        <Tree :dataSource='item.children'></Tree>
                    </div>
                </div>
            </div>
        </div>   
</template>
<script>
export default({
    name:'Tree',
    props: {
        dataSource: {
            type: Array,
            required: true
        },
        openKeys: {
            type: Array,
            default: () => []
        },
        search: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        onSearch(){

        },
        sMeumClik(item,index){
            item.fold = !item.fold
            this.$set(this.dataSource,index,item)
        },
         handleMenuClick(e,item) {
            let key = e.key
            switch (key) {
                case '1':
                    this.$emit('add',item)
                    break;
                case '2':
                    this.$emit('edit',item)
                    break;
                case '3':
                    this.$emit('dele',item)
                    break;
                default:
                    break;
            }
        }
    }
})
</script>
<style>
.flex{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.meum{
    line-height: 40px;
}
.fold-icon{
    margin-left: 10px;
    font-size: 12px;
}
.children{
    margin-left: 15px;
}
</style>
