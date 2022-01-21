// TODO add event logging

const functions = require('firebase-functions')

const audit = require('./audit')
const db = require('./db')
const email = require('./email')
const search = require('./search')
const utils = require('./utils')

const sensitiveFields = {
   users: ['password', 'nationalId', 'stateId'],
}

exports.createUser = functions.firestore
   .document('users/{id}')
   .onCreate(async (snap, context) => {
      try {
         const id = context.params.id
         const user = snap.data()

         /**
          * ! Remove all sensitive data
          */
         sensitiveFields.users.forEach((field) => {
            delete user[field]
         })

         //* Creates an audit entry
         audit.save({
            actionId: 'createUser',
            performedBy: user.createdBy ? user.createdBy : '',
            performedOn: id,
            data: user,
            context,
         })

         //* Sends email to newly registered users
         email.sendRegisterResponse({
            to: user.email,
            name: user.name,
         })

         //* Saves user to global search
         search.save({ id, ...user })
      } catch (error) {
         throw new Error(error)
      }
   })

exports.updateUser = functions.firestore
   .document('users/{id}')
   .onUpdate(async (change, context) => {
      try {
         const id = context.params.id
         const userBefore = change.before.data()
         const userNow = change.after.data()
         const diff = utils.difference(userNow, userBefore)

         //* Creates an audit entry
         audit.save({
            actionId: 'updateUser',
            performedBy: userNow.updatedBy,
            performedOn: change.after.id,
            data: diff,
            context,
         })

         //* Saves user to global search
         search.save({ id, ...userNow })
      } catch (error) {
         throw new Error(error)
      }
   })

exports.deleteUser = functions.firestore
   .document('users/{id}')
   .onDelete(async (snap, context) => {
      try {
         const id = context.params.id
         const user = snap.data()

         //* Creates an audit entry
         audit.save({
            actionId: 'deleteUser',
            performedBy: user.updatedBy,
            performedOn: user.id,
            data: user,
            context,
         })

         //* Removes user from global search
         search.delete(user.id)
      } catch (error) {
         throw new Error(error)
      }
   })
