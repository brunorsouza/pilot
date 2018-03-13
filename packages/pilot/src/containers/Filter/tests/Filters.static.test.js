import cases from 'jest-in-case'
import moment from 'moment'
import {
  flatten,
  values,
} from 'ramda'

import {
  DateInput,
  Input,
  Button,
  CheckboxGroup,
  CardActions,
} from 'former-kit'

import {
  getDateInputDatesCase,
  getSearchFieldCase,
  getCheckboxGroupCase,
  getSubmitButtonDisabledCase,
  getSubmitButtonColorCase,
  getResetButtonColorCase,
  getSelectedFilterGroupCase,
} from './staticCases'
import { toggleFilterOptions } from './common'

describe('Filters', () => {
  describe('Static tests', () => {
    cases('should have DateInput with correct dates props', (opts) => {
      const dateInputProps = opts.component.find(DateInput).props()
      const { dates: datesProp } = dateInputProps

      expect(datesProp).toHaveProperty('start')
      expect(datesProp).toHaveProperty('end')

      const { start, end } = datesProp

      expect(datesProp).toBeDefined()
      expect(start).toBeInstanceOf(moment)
      expect(end).toBeInstanceOf(moment)

      if (opts.dates) {
        expect(start).toBe(opts.dates.start)
        expect(end).toBe(opts.dates.end)
      }
    }, getDateInputDatesCase())

    cases('should have Input with correct value prop', (opts) => {
      const { value } = opts.component.find(Input).props()

      if (opts.searchValue) {
        expect(value).toBe(opts.searchValue)
      } else {
        expect(value).toBe('')
      }
    }, getSearchFieldCase())

    cases('should have CheckboxGroup with correct values props', ({ component, checkboxGroupLength }) => {
      toggleFilterOptions(component)
      expect(component.find(CheckboxGroup)).toHaveLength(checkboxGroupLength)
      toggleFilterOptions(component)
    }, getCheckboxGroupCase())

    cases('should have submit button with correct disabled prop', (opts) => {
      const submitButton = opts.component
        .find(CardActions)
        .findWhere(node => node.is(Button) && node.prop('type') === 'submit')

      expect(submitButton.props().disabled).toBe(opts.disabled)
    }, getSubmitButtonDisabledCase())

    cases('should have submit button with correct relevance', (opts) => {
      const submitButton = opts.component
        .find(CardActions)
        .find(Button)
        .last()

      expect(submitButton.props().relevance).toBe(opts.buttonRelevance)
    }, getSubmitButtonColorCase())

    cases('should have reset button with correct relevance', (opts) => {
      const resetButton = opts.component
        .find(CardActions)
        .findWhere(node => node.is(Button) && node.prop('type') !== 'submit')

      expect(resetButton.props().relevance).toBe(opts.buttonRelevance)
    }, getResetButtonColorCase())

    cases('should have one item selected in each filterGroup', ({ component, selectedFilters }) => {
      // expand filters section
      toggleFilterOptions(component)

      const selectedCheckboxFilters = component
        .find(CheckboxGroup)
        .find('input[type="checkbox"]')
        .findWhere((node) => {
          if (node.length) {
            return node.props().checked === true
          }
          return false
        })
      const selectedFiltersCount = flatten(values(selectedFilters)).length

      expect(selectedCheckboxFilters.length).toBe(selectedFiltersCount)

      // collapse filters section
      toggleFilterOptions(component)
    }, getSelectedFilterGroupCase())
  })
})
