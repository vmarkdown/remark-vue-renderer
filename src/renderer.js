/**
 * react Renderer
 *
 * extend mdast
{
    "type": "heading",
    "depth": 1 <= number <= 6,
    "tagName": "a",
    "parent": parent,
    "properties": {
        "href": "http://alpha.com",
        "id": "bravo",
        "className": ["bravo"],
        "download": true
    },
    "children": []
}
 */

var merge = require('merge');

function props(node, defaultProps) {

    var props = {
        attrs: node.properties || {},
    };

    delete props.attrs.key;

    if(node.properties) {
        if(node.properties.className) {
            props['class'] = node.properties.className;
        }
        // if(node.properties.key) {
        //     props['class'] = node.properties.className;
        // }
    }

    return merge(props, defaultProps);
}


module.exports = {

    root: function(h, node, children, parent, options) {
        // return h(node.tagName||'div', props(node), children);
        var tagName = options.rootTagName || 'div';
        return h(tagName, props(node, {'class':[options.rootClassName]}), children);
    },

    blockquote: function(h, node, children) {
        return h('blockquote', props(node), children);
    },

    heading: function(h, node, children) {
        return h('h'+node.depth, props(node), children);
    },

    thematicBreak : function(h, node) {
        return h('hr', props(node));
    },

    list : function(h, node, children) {
        return h(node.ordered?'ol':'ul', props(node), children);
    },

    listItem : function(h, node, children) {
        if(node.hasOwnProperty('checked') && node.checked !== null) {
            if(children && children.length>0 && children[0].children) {
                children[0].children.unshift(
                    h('input', {
                        'class': ['list-item-checkbox'],
                        attrs: {
                            type: 'checkbox',
                            checked: node.checked,
                            readonly: true,
                            disabled: true,
                        }
                    })
                );
            }
        }
        return h('li', props(node), children);
    },

    paragraph : function(h, node, children) {
        return h(node.tagName||'p', props(node), children);
    },

    table : function(h, node, children) {
        return h('table', props(node), h('tbody',{key:0}, children));
    },

    tableRow : function(h, node, children) {
        return h('tr', props(node), children);
    },

    tableCell : function(h, node, children) {
        return h('td', props(node, {align: node.align}), children);
    },

    strong : function(h, node, children) {
        return h('strong', props(node), children);
    },

    emphasis : function(h, node, children) {
        return h('em', props(node), children);
    },

    break : function(h, node) {
        return h('br', props(node));
    },

    delete : function(h, node, children) {
        return h('del', props(node), children);
    },

    link : function(h, node, children) {
        return h('a', props(node, {
            attrs: {
                // target: '_blank',
                href: node.url,
                title: node.title
            }
        }), children);
    },

    linkReference : function(h, node, children) {
        return h('a', props(node, {
            attrs: {
                href: node.url,
                title: node.title
            }
        }), children);
    },

    definition : function(h, node, children) {
        // return null;
        // return h('div', props(node, {
        //         style: {
        //             height: 0,
        //             visibility: 'hidden'
        //         }
        //     }),
        //     h('a', {
        //         key: 0,
        //         href: node.url,
        //         'data-identifier': node.identifier
        //     }, [
        //         '['+node.identifier+']: ',
        //         node.url
        //     ])
        // );
    },

    image : function(h, node) {
        return h('img', props(node, {
            attrs: {
                src: node.url,
                alt: node.alt,
                title: node.title
            }
        }));
    },

    imageReference: function(h, node, children) {

    },

    text : function(h, node) {
        return h('span', props(node), node.value);
    },

    inlineCode : function(h, node, children) {
        return h('code', props(node), node.value);
    },

    code : function(h, node, children) {
        var className = {};
        node.lang && (className['language-'+node.lang] = true);
        return h('pre', props(node), [
            h('code', {
                'class': className,
                // domProps: {
                //     innerHTML: node.value
                // }
                //className: node.lang?'language-'+node.lang:null
            }, node.value)
        ]);
    },

    yaml : function(h, node, children) {
        return h('pre', props(node), h('code', {
            'class': 'language-yaml'
        }, node.value));
    },

    math : function(h, node, children) {
        return h('p', props(node, {
            domProps: {
                innerHTML: node.value
            }
        }));
    },

    inlineMath : function(h, node, children) {
        return h('span', props(node, {
            domProps: {
                innerHTML: node.value
            }
        }));
    },

    html : function(h, node, children) {
        return h('div', props(node, {
            domProps: {
                innerHTML: node.value
            }
        }));
    },

    footnote : function(h, node, children) {
        return h('span', props(node), children);
    },

    footnoteReference : function(h, node, children) {
        return h('a', props(node, {
            attrs: {
                id: node.ref,
                className: 'footnote-reference',
                href: '#'+node.def
            }
        }), node.value);
    },

    footnoteDefinition : function(h, node, children) {
        return h('div', props(node, {
            attrs: {
                id: node.def,
                className: 'footnote-definition'
            }
        }), children);
    },
};
