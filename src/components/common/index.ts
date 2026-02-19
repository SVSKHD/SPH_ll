import type { App } from 'vue';

// Common Wrappers
import SphPage from './SphPage.vue';
import SphLayout from './SphLayout.vue';
import SphPageContainer from './SphPageContainer.vue';
import SphCard from './SphCard.vue';
import SphTabs from './SphTabs.vue';
import SphToolbar from './SphToolbar.vue';
import SphToolbarTitle from './SphToolbarTitle.vue';
import SphAvatar from './SphAvatar.vue';

// Other Sph Components
import SphTab from '../SphTab.vue';
import SphHeader from '../layout/SphHeader.vue';
import SphFooter from '../layout/SphFooter.vue';

export default {
    install(app: App) {
        // Register Common Wrappers
        app.component('SphPage', SphPage);
        app.component('SphLayout', SphLayout);
        app.component('SphPageContainer', SphPageContainer);
        app.component('SphCard', SphCard);
        app.component('SphTabs', SphTabs);
        app.component('SphToolbar', SphToolbar);
        app.component('SphToolbarTitle', SphToolbarTitle);
        app.component('SphAvatar', SphAvatar);

        // Register Other Sph Components
        app.component('SphTab', SphTab);
        app.component('SphHeader', SphHeader);
        app.component('SphFooter', SphFooter);
    }
};
