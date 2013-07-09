#cats = ['swim', 'drink', 'Koret', 'Masters', 'workout', 'run', 'cycle']

# shared variables
selected_sug_index = 0
sug_select_mode = false
raw_so_far = ""
current_cat = ""
current_mag = null

$(document).keydown (e) ->
  switch e.which
    when 37 then move_selection 'left'
    when 39 then move_selection 'right'
    # when 13 then console.log submit_selected_tag()

$(document).ready (e) ->
  $('#cat-input').focus()

$('#cat-input').keyup (e) ->
  $self = $(this)

  switch e.which
    when 37 then return
    when 39 then return
    when 40
      enter_sug_select_mode()
      return

  raw_so_far = $self.val()
  cat_so_far = raw_so_far.split(/,/).pop()

  update_preview(raw_so_far)

  magnitude_match = cat_so_far.match /^\s*\d+/ 
  current_mag = if magnitude_match then magnitude_match[0] else null
  current_cat = cat_so_far.replace /^\s*\d+\s*/, ''

  distances = [] 
  for cat in cats
    distances.push {cat: cat, dist: levenshteinenator(current_cat, cat)}
  distances.sort (a, b) ->
    if a.dist < b.dist
      return -1
    if a.dist > b.dist
      return 1
    return 0
  populate_suggestion_list(current_cat, distances.splice(0, 4), current_mag)

$('#go').click (e) ->
  generate_raw_from_selected_cats()


populate_suggestion_list = (original, suggestions, mag) ->
  return # TEMPORARY HALT
  # holy shit, google has an autocomplete API
  # http://suggestqueries.google.com/complete/search?client=firefox&q=woody%20al
  $guesses = $('.guesses')
  $guesses.html ''
  # first, append what you're writing
  selected_sug_index = 0 
  $.each suggestions, (i, sug) ->
    xclass = if i == 0 then 'selected' else 'unselected'
    if mag
      $guesses.append '<span class="cat mag '+xclass+'"><i>'+mag+'</i><span>'+sug.cat+'</span></span>'
    else
      $guesses.append '<span class="cat '+xclass+'"><span>'+sug.cat+'</span></span>'
  $('.guesses .cat').click (e) -> 
    console.log 'add to or alter cat-input'

generate_raw_from_selected_cats = () ->
  raw = ""
  $('.picked .cat').each (i, cat) ->
    raw += "," if i > 0
    raw += $(cat).text()
  console.log raw

enter_sug_select_mode = () ->
  console.log "enter mode"
  # unfocus cat input
  $('#cat-input').blur() 
  # select current sug 
  $sugs = $('.guesses .cat')
  if $sugs[selected_sug_index]
    $sugs.removeClass 'selected'
    $sugs.addClass 'unselected'
    $($sugs[selected_sug_index]).removeClass 'unselected'
    $($sugs[selected_sug_index]).addClass 'selected'

move_selection = (direction) ->
  
  # get index of currently selected cat
  if direction == 'left'
    desired_index = selected_sug_index - 1
  else if direction == 'right'
    desired_index = selected_sug_index + 1
  
  console.log desired_index
  
  # see if the desired cat exists
  $sugs = $('.guesses .cat')
  if $sugs[desired_index]
    console.log $sugs[desired_index]
    selected_sug_index = desired_index
    # move selected class to that cat
    $sugs.removeClass 'selected'
    $sugs.addClass 'unselected'
    $($sugs[desired_index]).removeClass 'unselected'
    $($sugs[desired_index]).addClass 'selected'

submit_selected_tag = () ->
  selected_tag = $('.guesses .cat')[selected_sug_index]
  if selected_tag
    # COPYING ABOVE CODE FOR NOW
    new_cat = $(selected_tag).find('span').text()
    mag = $(selected_tag).find('i').text()
    $('#cat-input').val('').focus()
    $('.guesses').html ''
    if mag
      $('.picked').append '<span class="cat mag"><i>'+mag+'</i><span>'+new_cat+'</span></span>'
    else
      $('.picked').append '<span class="cat"><span>'+new_cat+'</span></span>'

update_preview = (raw) ->
  raw_cats = raw.split /,/
  $('.preview').html ''
  for cat in raw_cats
    cat = tokenize_cat(cat) 
    xclass = if cat.mag then 'mag' else ''
    xmag = if cat.mag then '<i>'+cat.mag+'</i>' else ''
    $('.preview').append '<span class="cat '+xclass+'">'+xmag+'<span>'+cat.text+'</span></span>'

tokenize_cat = (str) ->
  str = str.trim()  
  magnitude_match = str.match /^\s*\d+/ 
  magnitude = if magnitude_match then magnitude_match[0] else null
  text = str.replace /^\s*\d+\s*/, ''
  return {mag: magnitude, text: text}
