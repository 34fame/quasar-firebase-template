const config = () => {
   return {
      filterGroupOptions: [
         { label: 'noselection', value: '' },
         { label: 'login', value: 'login' },
         { label: 'createuser', value: 'createUser' },
         { label: 'updateuser', value: 'updateUser' },
         { label: 'deleteuser', value: 'deleteUser' },
         { label: 'viewuser', value: 'viewUser' },
      ],
      form: {
         actions: {
            create: false,
            update: false,
            delete: false,
            view: true,
         },
         fields: {
            eventId: {
               type: 'text',
               readonly: true,
            },
            timestamp: {
               type: 'text',
               readonly: true,
            },
         },
      },
      menu: {
         label: 'events',
         icon: 'event_note',
         route: { name: 'events-list' },
      },
      table: {
         columns: [
            {
               name: 'id',
               field: 'id',
            },
            {
               name: 'timestamp',
               label: 'timestamp',
               field: 'timestamp',
               align: 'right',
               sortable: true,
               format: (val, row) => `${new Date(val).toLocaleString()}`,
            },
            {
               name: 'eventId',
               label: 'event',
               required: true,
               field: 'eventId',
               align: 'left',
               sortable: true,
            },
            {
               name: 'actorId',
               label: 'actor',
               required: true,
               field: 'actorId',
               align: 'left',
               sortable: true,
            },
         ],
         visibleColumns: ['eventId', 'timestamp'],
         key: 'id',
      },
   }
}
export default config()
