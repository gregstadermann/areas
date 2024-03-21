'use strict';

const { Broadcast, Logger } = require('ranvier');

module.exports = {
    listeners: {
        spawn: state => function () {
            Broadcast.sayAt(this.room, "A training dummy ambles in.");
            Logger.log(`Spawned training dummy into Room [${this.room.title}]`);
        },
    }
};
