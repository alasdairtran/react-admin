import polyglotI18nProvider from '@mochilabs/ra-i18n-polyglot';
import defaultMessages from '@mochilabs/ra-language-english';

export default polyglotI18nProvider(() => defaultMessages, 'en', {
    allowMissing: true,
});
