import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Votes = new Mongo.Collection('votes');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('votes', function tasksPublication() {
    return Votes.find();
  });
}

Meteor.methods({

    'votes.howMany'(businessId) {
        var result = Votes.findOne({businessId: businessId});
        if (result && result.going) {
            return result.going.length;
        } else {
            return 0;
        }
    },

    'votes.addOne'(businessId, userId) {
        Votes.update(
            {businessId: businessId},
            {$addToSet: {going: userId}},
            {upsert: true}
        );
    },

    'votes.removeOne'(businessId, userId) {
        Votes.update(
            {businessId: businessId},
            {$pull: {going: userId}},
        );
    }

});
