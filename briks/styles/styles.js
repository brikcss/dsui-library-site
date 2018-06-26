import jss from 'jss';
import jssPreset from 'jss-preset-default';
// import jssCamelCase from 'jss-camel-case';
// import jssCompose from 'jss-compose';
// import jssUnit from 'jss-default-unit';
// import jssExpand from 'jss-expand';
// import jssExtend from 'jss-extend';
// import jssGlobal from 'jss-global';
// import jssSort from 'jss-props-sort';
// import jssTemplate from 'jss-template';
// import jssNested from 'jss-nested';
// import jssPrefixer from 'jss-vendor-prefixer';

// @todo  Create global stylesheet (inserted in <head>).
// @todo  Create master styles cache (not inserted).

// let styles = jss.use(
// 	jssTemplate(),
// 	jssGlobal(),
// 	jssExtend(),
// 	jssNested(),
// 	jssCompose(),
// 	jssCamelCase(),
// 	jssUnit(),
// 	jssExpand(),
// 	jssSort(),
// 	jssPrefixer()
// );
let styles = jss.setup(jssPreset());

// styles.main = jss.createStyleSheet({}, { meta: 'brikcss', classNamePrefix: 'brik-' });
// styles.main.attach();
styles.sheets = {};

export default styles;
export { jss };
