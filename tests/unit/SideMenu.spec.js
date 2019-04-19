import { shallowMount } from '@vue/test-utils'
import SideMenu from '@/components/SideMenu.vue'

describe('SideMenu.vue', () => {
  it('renders title from props', () => {
    const msg = 'some title'
    const wrapper = shallowMount(SideMenu, {
      propsData: { title: msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
