/**
 * POSTCSS FONT VSIZE
 * A postcss plugin to add viewport relative font size with minimum and maximum values
 * version          1.0.0
 * author           Arpad Hegedus <hegedus.arpad@gmail.com>
 */

// load dependencies
let postcss         =   require('postcss'),
    util            =   require('postcss-plugin-utilities');

// export plugin
module.exports = postcss.plugin('postcss-font-vsize', options => {
    return css => {
        css.walkDecls('font-vsize', decl => {
            let parent = decl.parent;
            if(parent.type !== 'atrule' && parent.parent.type !== 'atrule') {
                var o = util.filterObject(postcss.list.comma(decl.value), {
                    size: [util.isSize],
                    min: [util.isSize],
                    max: [util.isSize],
                    fallback: [util.isSize]
                }, {
                    min: '1rem'
                });
                if(o.size && (o.size.indexOf('vw')>0 || o.size.indexOf('vh') > 0)) {
                    let selector = parent.selector;
                        dimension = (o.size.indexOf('vh')>0)? 'height' : 'width';
                        minCalc = util.calc('x/y*100', {x: o.min, y: o.size.replace(/[^0-9\.\-]+/ig,'')});
                        minMedia = `@media (max-${dimension}: ${minCalc}) { ${selector} { font-size: ${o.min} } }`;
                        parent.after(minMedia);
                        if(o.max) {
                            maxCalc = util.calc('x/y*100', {x: o.max, y: o.size.replace(/[^0-9\.\-]+/ig,'')});
                            maxMedia = `@media (min-${dimension}: ${maxCalc}) { ${selector} { font-size: ${o.max} } }`;
                            parent.after(maxMedia);
                        }
                        if(o.fallback) {
                            decl.before(`font-size: ${o.fallback};`);
                        }
                        decl.before(`font-size: ${o.size};`);
                }
            }
            decl.remove();
            if(parent.nodes.length === 0) {
                parent.remove();
            }
        });
    }
});