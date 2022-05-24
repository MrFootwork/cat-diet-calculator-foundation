import Database from '~/model/Database'
import DataProcessorDry from '~/model/DataProcessorDry'
import DataProcessorWet from '~/model/DataProcessorWet'

// FIXME create processor instances

export default class Calculator {
	// FIXME setup all required data
	private _rawData
	private static instance: Calculator
	// FIXME setup model instances

	private constructor() {}

	static getInstance() {
		if (!Calculator.instance) {
			Calculator.instance = new Calculator()
		}
		return Calculator.instance
	}
	// FIXME setter for all input variables

	// FIXME calculate
}
