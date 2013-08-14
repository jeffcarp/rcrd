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
      option[:color] = colors[c_i]
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
    @stats['24h'] = Record.where('target > ?', Time.now.utc - 1.day).count
  end

end
