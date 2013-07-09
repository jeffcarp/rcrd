$('.cat-toggle').click (e) ->
  self = $(this)
  name = $(this).parents('.options').data 'name'
  return if name == 'null'
  $.ajax
    url: '/cats/'+name
    type: 'PUT'
    data:
      option: self.data 'option'
    success: (res) -> window.location = '' 
 




