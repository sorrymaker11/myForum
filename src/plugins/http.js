import http from '@/api/http'
import Vue from 'vue'

const install=Vue=>{
    if(install.installed){
        return
    }  
    install.installed=true
    Object.defineProperties(Vue.prototype,{
        $api:{
            get(){
                return http
            },
            enumerable:false,
            configurable:false
        }
    })
}

Vue.use(install)