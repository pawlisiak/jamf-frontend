<template>

  <div class="p-NewUser">

    <new-user-sidebar
      :steps="steps"
      :activeStep="activeStep"
      class="p-NewUser__sidebar"
    />

    <new-user-form
      ref="form"
      @stepChange="stepChange"
      :model="formModel"
      class="p-NewUser__form"
    />

  </div>

</template>

<script>
import NewUserSidebar from './NewUserSidebar'
import NewUserForm from './NewUserForm'

import { mapActions, mapGetters } from 'vuex'
import { model } from './controls'

export default {
  name: 'NewUser',

  components: {
    NewUserSidebar,
    NewUserForm
  },

  data () {
    return {
      activeStep: 0
    }
  },

  computed: {
    ...mapGetters('NewUser', {
      userGroups: 'getUserGroups'
    }),

    formModel () {
      return model(this)
    },

    steps () {
      let reducedArray = []

      this.formModel.forEach((i) => {
        reducedArray[reducedArray.length] = i.title
      })

      return reducedArray
    }
  },

  methods: {
    ...mapActions('NewUser', {
      fetchUserGroupsData: 'fetchUserGroupsData'
    }),

    stepChange (payload) {
      this.activeStep = payload
    }
  },

  mounted () {
    this.fetchUserGroupsData()
  }
}
</script>

<style lang="scss">
.p-NewUser {
  display: flex;

  @include breakpoint (sm down) {
    flex-direction: column;
  }

  @include breakpoint (lg) {
    align-items: stretch;
  }

  &__sidebar {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;

    ol {
      padding: 0;
      margin: 10x 0;
      list-style: none;

      @include breakpoint (sm down) {
        @media (max-height: 700px) {
          margin: 0;
        }
      }

      > li {
        position: relative;
        padding-left: 28px;
        font-size: 15px;
        line-height: 1em;

        @include breakpoint (sm down) {
          @media (max-height: 700px) {
            display: none;
          }
        }

        &:not(:last-of-type) {
          margin-bottom: 25px;
        }

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: .5em;
          transform: translateY(-50%);
          width: 9px;
          height: 9px;
          background: $color-gray-dark;
          border-radius: 50%;
          transition: background-color .3s;
        }

        &.is-active {
          @include breakpoint (sm down) {
            @media (max-height: 700px) {
              display: block;
              margin: 0;
            }
          }

          &::before {
            background: #7dd96e;
          }
        }
      }
    }

    figure {
      position: absolute;
      left: 20px;
      bottom: 20px;
      width: 120%;
      margin: 0;

      @media (max-height: 600px) {
        display: none
      }

      @include breakpoint (sm down) {
        display: none;
      }

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  &__form {
    flex-grow: 1;
    display: block;
    padding: 40px 25px 25px;

    @include breakpoint (sm down) {
      flex-shrink: 0;
      width: 100%;
    }

    @include breakpoint (lg) {
      flex-shrink: 1;
      width: auto;
    }

    .l-Form {
      height: 100%;
    }
  }
}
</style>
