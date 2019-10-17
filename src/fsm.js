class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config){
            throw new Error()
        }
        this.initial = config.initial;
        this.currentState = config.initial;
        this.previousState = null;
        this.futureState = null;
        this.configStates = config.states;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.configStates[state]){
            throw new Error();
        }
        this.previousState = this.currentState;
        this.currentState = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let nextState = this.configStates[this.currentState]['transitions'][event];
        this.changeState(nextState);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.previousState = this.currentState;
        this.currentState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event){
            return Object.keys(this.configStates);
        }
        const statesArr = []
        for (let item in this.configStates) {
            if(this.configStates[item].transitions[event]){
                statesArr.push(item);
            }
        }
        return statesArr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.previousState){
            return false
        }
        if (this.currentState == this.previousState){
            return false;
        }
        this.futureState = this.currentState;
        this.currentState = this.previousState;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (!this.futureState){
            return false;
        }
        if (this.futureState == this.currentState){
            return false;
        }
        this.currentState = this.futureState;
        return true;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previousState = null;
        this.futureState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
