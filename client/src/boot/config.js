import Vue from 'vue'

import events from '../modules/events'
import roles from '../modules/roles'
import users from '../modules/users'

const leftMenu = () => {
   let menu = []
   Object.keys(config).map((section) => {
      let menuSection = {
         label: section,
         icon: config[section].icon,
         children: [],
      }
      Object.keys(config[section].children).map((item) => {
         menuSection.children.push({
            name: item,
            label: item,
            icon: config[section].children[item].menu.icon,
            route: config[section].children[item].menu.route,
         })
      })
      menu.push(menuSection)
   })
   return menu
}

const footerMenu = () => {
   let menu = []
   Object.keys(config).map((section) => {
      let menuSection = {
         label: section,
         icon: config[section].icon,
         children: [],
      }
      Object.keys(config[section].children).map((item) => {
         menuSection.children.push({
            name: item,
            label: item,
            icon: config[section].children[item].menu.icon,
            route: config[section].children[item].menu.route,
         })
      })
      menu.push(menuSection)
   })
   return menu
}

const moduleFormActions = (module) => {
   if (config.modules.children[module])
      return config.modules.children[module].form.actions
   if (config.settings.children[module])
      return config.settings.children[module].form.actions
   if (config.account.children[module])
      return config.account.children[module].form.actions
   return false
}

const moduleFields = (module) => {
   if (config.modules.children[module]) return config.modules.children[module].form.fields
   if (config.settings.children[module])
      return config.settings.children[module].form.fields
   if (config.account.children[module]) return config.account.children[module].form.fields
   return false
}

const moduleMenu = (module) => {
   if (config.modules.children[module]) return config.modules.children[module].menu
   if (config.settings.children[module]) return config.settings.children[module].menu
   if (config.account.children[module]) return config.account.children[module].menu
   return false
}

const config = {
   modules: {
      children: {
         users,
         roles,
         events,
      },
   },
   settings: {
      children: {
         subscription: {
            menu: {
               label: 'subscription',
               icon: 'card_membership',
               route: { name: 'subscription' },
            },
         },
         appearance: {
            form: {
               fields: {
                  theme: {
                     type: 'select',
                     options: [
                        {
                           label: 'default',
                           value: {
                              primary: '#384B5E',
                              secondary: '#418FDE',
                              accent: '#f5f5f6',
                              dark: '#1B3D5E',
                              positive: '#57DE35',
                              negative: '#DE5F57',
                              info: '#35DED9',
                              warning: '#DEBF2A',
                           },
                        },
                        {
                           label: 'Cardinals',
                           value: {
                              primary: '#000000',
                              secondary: '#97233f',
                              accent: '#f5f5f6',
                              dark: '#1B3D5E',
                              positive: '#57DE35',
                              negative: '#DE5F57',
                              info: '#35DED9',
                              warning: '#DEBF2A',
                           },
                        },
                        {
                           label: 'Cowboys',
                           value: {
                              primary: '#002244',
                              secondary: '#00338d',
                              accent: '#869397',
                              dark: '#1B3D5E',
                              positive: '#57DE35',
                              negative: '#DE5F57',
                              info: '#35DED9',
                              warning: '#DEBF2A',
                           },
                        },
                        {
                           label: 'Texans',
                           value: {
                              primary: '#03202f',
                              secondary: '#a71930',
                              accent: '#FFFFFF',
                              dark: '#1B3D5E',
                              positive: '#57DE35',
                              negative: '#DE5F57',
                              info: '#35DED9',
                              warning: '#DEBF2A',
                           },
                        },
                     ],
                     default: 'default',
                  },
               },
            },
            menu: {
               label: 'appearance',
               icon: 'palette',
               route: { name: 'appearance' },
            },
         },
         language: {
            menu: {
               label: 'language',
               icon: 'translate',
               route: { name: 'language' },
            },
         },
         about: {
            menu: {
               label: 'about',
               icon: 'info',
               route: { name: 'about' },
            },
         },
      },
      icon: 'settings',
   },

   account: {
      children: {
         profile: {
            menu: {
               label: 'profile',
               icon: 'manage_accounts',
               route: { name: 'profile' },
            },
         },
         featurerequest: {
            menu: {
               label: 'featurerequest',
               icon: 'maps_ugc',
               route: { name: 'featurerequest' },
            },
         },
         reportbug: {
            menu: {
               label: 'reportbug',
               icon: 'report_problem',
               route: { name: 'reportbug' },
            },
         },
         logout: {
            menu: {
               label: 'logout',
               icon: 'logout',
               route: { name: 'logout' },
            },
         },
      },
      icon: 'account_circle',
   },
}

Vue.prototype.$appConfig = {
   config,
   leftMenu: leftMenu(),
   footerMenu: footerMenu(),
   moduleFields: (module) => moduleFields(module),
   moduleFormActions: (module) => moduleFormActions(module),
   moduleMenu: (module) => moduleMenu(module),
}
