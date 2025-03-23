import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Navigation from '../../../src/components/Header/Navigation.vue';
import { ROUTE_NAMES } from '../../../src/router/types';

describe('Navigation', () => {
    it('renders correctly', () => {
        const wrapper = mount(Navigation, {
            slots: {
                default: `
                    <a>Test</a>
                `
            }
        });
        // There are currently only three routes in navigation
        const anchors = wrapper.findAll('a');
        expect(anchors.length).toBe(3);
        anchors.forEach((anchor) => {
            expect(anchor.text()).toBe("Test");
        });
    });

    it('provides the route object correctly', () => {
        const wrapper = mount(Navigation, {
            slots: {
                default: `
                    <template #default="{route}">
                        <div class="test">
                            <span class="test-route-label">{{route.label}}</span>
                            <span class="test-route-name">{{route.routeName}}</span>
                        </div>
                    </template>
                `
            }
        });
        const routeLabels = wrapper.findAll('.test-route-label').map((l) => l.text());
        const routeNames = wrapper.findAll('.test-route-name').map((l) => l.text());
        expect(routeLabels).toEqual(['Houses', 'Spells', 'Elixirs']);
        expect(routeNames).toEqual([ROUTE_NAMES.HOUSES, ROUTE_NAMES.SPELLS, ROUTE_NAMES.ELIXIRS]);
    });
});