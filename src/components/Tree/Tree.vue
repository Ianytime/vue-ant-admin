<template>
    <div>
        <div class="meum">
            <div v-for="(item,index) in dataSource" :key='index' >
                   <div class="flex" @click="sMeumClik(item,index)">
                        <div>
                            <a-icon  v-if="item.children"  :type="item.fold?'minus-square':'plus-square'"  class="fold-icon"/>
                            <a-icon :type="item.icon" v-if="item.icon"/>
                            {{item.title}}
                        </div>
                         <div>
                            {{item.code||'路径'}}
                        </div>
                        <div>
                            <a-icon type="plus" class="mr-10" @click.stop="add(item)"/>
                            <a-icon type="edit" class="mr-10"  @click.stop="edit(item)"/>
                            <a-icon type="delete" @click="dele(item)"/>
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
        add(item){
            this.$emit('add',item)
        },
        edit(item){
            this.$emit('edit',item)
        },
        dele(item){
            this.$emit('dele',item)
        }
    }
})
</script>
<style>
.mr-10{
    margin-right: 10px;
}
.flex{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.meum{
    line-height: 40px;
}
.fold-icon{
    margin-right: 10px;
    font-size: 12px;
}
.children{
    margin-left: 15px;
}
button{
    font-size: 12px;
}
</style>
