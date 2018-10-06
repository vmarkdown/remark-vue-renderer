console.log('main.bundle.js');

const renderer = require('../index');
const unified = require('unified');
const parse = require('remark-parse');
const render = require('remark-render');


const processor = unified()
    .use(parse, {})
    .use(render, {
        key: false,
        renderer: renderer,
        rootClassName: 'markdown-body',
        rootTagName: 'main'
    }).freeze();

let md = require('./demo.md');

// const tokens = processor.parse(md);

// console.log(tokens);
// const file = processor.data('settings').processSync(md);
// const vdom = file.contents;
// console.log(vdom);
const markdown = Vue.extend({
    data() {
        return {
            md: md
        }
    },
    render(h) {
        const file = processor().data('settings', {h:h}).processSync(this.md);
        return file.contents;
    }
});

const app = new Vue({
    el: '#app',
    components: {
        'markdown': markdown
    },
    template: require('text-loader!./container.html'),
    data() {
        return {
            md: md
        }
    },
    watch:{
        md(v){
            // console.log(v);
            this.$refs.preview.md = v;
            // debugger
        }
    }
});