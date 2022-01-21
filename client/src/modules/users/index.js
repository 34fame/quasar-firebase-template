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
            email: {
               type: 'text',
               validate: [],
               default: '',
            },
            birthdate: {
               type: 'date',
               validate: [],
               default: null,
            },
            role: {
               type: 'radio',
               options: [
                  { label: 'admin', value: 'admin' },
                  { label: 'member', value: 'member' },
               ],
               validate: [],
               default: 'member',
            },
         },
      },
      menu: {
         header: 'modules',
         label: 'users',
         icon: 'person',
         route: { name: 'users-list' },
      },
      table: {
         columns: [
            { name: 'id', field: 'id' },
            {
               name: 'name',
               label: 'name',
               required: true,
               field: 'name',
               align: 'left',
               sortable: true,
            },
            { name: 'email', label: 'email', field: 'email', align: 'left' },
            {
               name: 'birthdate',
               label: 'birthdate',
               field: 'birthdate',
               sortable: true,
            },
         ],
         visibleColumns: ['name', 'email', 'birthdate'],
         key: 'id',
      },
      filterGroupOptions: [{ label: 'noselection', value: null }],
   }
}
export default config()
