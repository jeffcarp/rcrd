class HomeController < ApplicationController

  def index 
    @num_days = 60  
    @options = []
    @cats = current_user.cats.where('dashboard=?', true).order('name ASC')

    colors = ['96b4fd', '032780', '009942', 'D42627', 'cf0b7b']
    c_i = 0

    @cats.each do |cat|
      option = {}
      option[:name] = cat.name
      cat.color ||= 200
      cat.color = cat.color.to_s
      if cat.color[0] == '#'
        option[:color] = '#'+cat.color
      else
        option[:color] = "hsl(#{cat.color}, 65%, 48%)" 
      end
      option[:days] = current_user.binary_cat_existence(@num_days, cat[:name])
      option[:day_avgs] = cat.day_avgs 
      if option[:day_avgs]
        option[:last_4_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 4.weeks, cat.name)
        option[:last_8_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 8.weeks, cat.name)
        option[:last_16_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 16.weeks, cat.name) 
      end
      @options << option 

      c_i += 1
      if c_i >= colors.size then c_i = 0 end
    end

    @display = []
    row = 1 
    @options.each do |cat|
      column = 1
      cat[:days].each do |key, value|
        clr = '#eee'
        clr = '#'+cat[:color] if value
        @display << {'row' => row, 'col' => column, 'color' => clr}
        column += 1
      end
      row += 1
    end

    @display_json = @display.to_json
  end


  def welcome
  end

  def experimental
    records = Record.all
    @data = {}

    # for each record (assuming 3 cats)
      # for each cat
        # relate to all others

    records.each do |record|
      puts record.inspect 
      cats = record.cats_from_raw_without_mags
      cats.each do |source|
        cats.each do |target|
          break if source == target
          if source < target
            key = source
            value = target
          else
            key = target
            value = source
          end
          next if @data.has_key? key && @data[key] == target
          @data[key] = target
        end  
      end  
    end

    # relate(source, target)
      # relations are always stored alphabetically
        # e.g. swim -> workout
        # not workout -> swim 
      # if source == target, return 
  end

  def about
  end

  def stats 
    @stats = {}
    @stats['1d'] = Record.where('target > ?', Time.now.utc - 1.day).count
    @stats['1w'] = Record.where('target > ?', Time.now.utc - 1.week).count
    @stats['1m'] = Record.where('target > ?', Time.now.utc - 1.month).count
    @stats['1y'] = Record.where('target > ?', Time.now.utc - 1.year).count
  end

end
