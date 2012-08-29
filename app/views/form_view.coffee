class exports.FormView extends HomeView
	id: 'form-view'

	render: ->
		$(@el).html require('./templates/home')
	this