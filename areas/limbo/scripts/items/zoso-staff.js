'use strict';

const { Random } = require('rando-js');

const { Broadcast, Heal } = require('ranvier');

/**
 * Example weapons hit script
 */
module.exports = {
    listeners: {
        hit: state => function (damage, target, finalAmount) {
            if (!damage.attacker || damage.attacker.isNpc) {
                return;
            }
            // Have to be careful in weapons scripts. If you have a weapons script that causes damage and
            // it listens for the 'hit' event you will have to check to make sure that `damage.source
            // !== this` otherwise you could create an infinite loop the weapons's own damage triggering
            // its script

            if (Random.probability(75)) {
                const effect = state.EffectFactory.create(
                    'buff', // specifying the effect type (name of the effect file minus .js)
                    /*
                    a config override, in this case set a duration of 15 seconds instead of the
                    default 30
                    */
                    {
                        duration: 15 * 1000
                    },
                    /*
                    and a state override. In this example we'll override the default 5 strength
                    increase to instead increase the player's strength by 10%
                    */
                    {
                        magnitude: Math.floor(damage.attacker.getAttribute('strength') / 10)
                    }
                );
                effect.attacker = damage.attacker;
                damage.attacker.addEffect(effect);
            }
        }
    }
};
