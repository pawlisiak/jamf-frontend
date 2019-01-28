import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewUser from '@/components/pages/NewUser'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component NewUser', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      fetchUserGroupsData: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('is mounted', () => {
    const wrapper = shallowMount(NewUser, { store, localVue })
    expect(wrapper.html()).toContain('<div class="p-NewUser">')
  })
})
