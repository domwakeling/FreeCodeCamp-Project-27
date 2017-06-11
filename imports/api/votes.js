import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Votes = new Mongo.Collection('votes');

// if (Meteor.isServer) {
//   // This code only runs on the server
//   Meteor.publish('votes', function tasksPublication() {
//     return Votes.find();
//   });
// }

Meteor.methods({

    // 'votes.newPoll'(subject, options) {
    //     const counts = options.map(() => 0);
    //     Votes.insert({
    //         createdBy: Meteor.userId(),
    //         subject: subject,
    //         options: options,
    //         votesCount: counts,
    //         voters: []
    //     });
    // },
    //
    // 'votes.addOption'(pollId, text) {
    //     Votes.update(pollId,
    //         {$addToSet: {options: text}},
    //     );
    //     Votes.update(pollId,
    //         {$push: {votesCount: {$each: [0]}}}
    //     );
    // },
    //
    // 'votes.saveVote'(pollId, chosenIndex) {
    //     // update the count
    //     var incModifier = { $inc: {} };
    //     incModifier.$inc['votesCount.' + chosenIndex] = 1;
    //     Votes.update(pollId, incModifier);
    //
    //     // if there's a logged-in user, add their ID ...
    //     if (Meteor.user()) {
    //         Votes.update(pollId, { $addToSet: { voters: Meteor.userId() } });
    //     }
    // },
    //
    // 'votes.deletePoll'(pollId) {
    //     Votes.remove({_id: pollId});
    // }

});
