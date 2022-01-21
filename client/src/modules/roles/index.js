const config = () => {
   return {
      form: {
         actions: {
            create: true,
            update: true,
            delete: true,
            view: true,
         },
         fields: {
            name: {
               type: 'text',
               validate: [],
               default: '',
            },
            description: {
               type: 'text',
               validate: [],
               default: '',
            },
         },
      },
      menu: {
         label: 'roles',
         icon: 'people',
         route: { name: 'roles-list' },
      },
      table: {
         columns: [
            {
               name: 'id',
               field: 'id',
            },
            {
               name: 'name',
               label: 'name',
               required: true,
               field: 'name',
               align: 'left',
               sortable: true,
            },
            {
               name: 'description',
               label: 'description',
               field: 'description',
               align: 'left',
            },
         ],
         visibleColumns: ['name', 'description'],
         key: 'id',
      },
      filterGroupOptions: [{ label: 'noselection', value: null }],
   }
}
export default config()
