const utils = require('./utils')

const testCases = {
   case1: {
      input: [
         {
            id: '1',
            data: {
               name: 'Sam',
               email: 'sam@gmail.io',
               roles: ['owner'],
               fruit: ['apple'],
               level1: {
                  level2: {
                     level3: true,
                  },
               },
            },
         },
         {
            id: '1',
            data: {
               name: 'Samuel',
               email: 'sam@gmail.io',
               roles: ['owner', 'admin', 'member'],
               fruit: ['apple'],
               level1: {
                  level2: {
                     level3: false,
                  },
               },
            },
         },
      ],
      expect: {
         data: {
            name: 'Sam',
            roles: [],
            level1: {
               level2: {
                  level3: true,
               },
            },
         },
      },
   },
}

describe('Utils Library Functions', () => {
   it('should return object deltas', async () => {
      const results = utils.difference(testCases.case1.input[0], testCases.case1.input[1])
      expect(results).toStrictEqual(testCases.case1.expect)
   })
})
