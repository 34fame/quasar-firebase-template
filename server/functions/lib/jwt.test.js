const jwt = require('./jwt')

describe('JWT Library Functions', () => {
   it('should return JWT token', async () => {
      const token = await jwt.generate({
         eventId: 'aaa',
         profile: { id: '1', name: 'Troy' },
      })
      expect(token).toBeTruthy()
   })

   it('should validate JWT token', async () => {
      const user = { id: '1', name: 'Troy' }
      const token = await jwt.generate({
         eventId: 'aaa',
         profile: user,
      })
      const profile = jwt.verify(token)
      expect(profile.id).toStrictEqual(user.id)
   })
})
