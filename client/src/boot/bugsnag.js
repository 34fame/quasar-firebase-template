import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

Bugsnag.start({
   apiKey: '5816f46480131649278b3247940cd6e2',
   plugins: [new BugsnagPluginVue()],
})

const bugsnagVue = Bugsnag.getPlugin('vue')
bugsnagVue.installVueErrorHandler(Vue)

Bugsnag.notify(new Error('test error'))