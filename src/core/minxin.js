export default{
    methods: {
        refreshModal(type){
            this.$store.dispatch('modal/open',type)
        }
    },
}