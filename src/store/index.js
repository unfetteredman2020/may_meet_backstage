import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
// let keys = modulesFiles.keys()s
// console.log('moduleFiles', keys)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  console.log('moduleName', moduleName)
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// console.log('-modules-', modules)
export default new Vuex.Store(modules)