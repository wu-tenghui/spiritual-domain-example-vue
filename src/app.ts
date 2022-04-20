import './app.less';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
    template: require('./app.html'),
})
export default class App extends Vue {

    constructor() {
        super();
    }

}
