import { createStore } from 'redux'
import {reducer} from '../reducer/index'

// eslint-disable-next-line no-undef
export const store= createStore(reducer)
