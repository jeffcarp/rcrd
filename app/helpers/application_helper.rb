module ApplicationHelper

  # Template macros
  # ===============

  def hue_now
    minutes = Time.now.strftime('%k').to_f * 60.0
    minutes += Time.now.strftime('%M').to_f
    (minutes / 1440.0)  * 360.0
  end

  def style_info(hue)
    str = "background-color: hsl(#{hue}, 65%, 48%);"
    str += "border-bottom: solid 2px hsl(#{hue}, 80%, 20%);"
    str += "text-shadow: 0 -1px 1px hsl(#{hue}, 30%, 0%);"
  end

  def new_style_info(color)
    if color[0] == '#'
      str = "background-color: #{color};"
      str += "border-bottom: solid 1px rgba(1, 1, 1, 0.4);"
      str += "text-shadow: rgba(1, 1, 1, 0.8);"
    elsif (0..255).include? color.to_i
      str = "background-color: hsl(#{color}, 65%, 48%);"
      str += "border-bottom: solid 2px hsl(#{color}, 80%, 20%);"
      str += "text-shadow: 0 -1px 1px hsl(#{color}, 30%, 0%);"
    else
      str = "background-color: hsl(#{hue_now}, 65%, 48%);"
      str += "border-bottom: solid 2px hsl(#{hue_now}, 80%, 20%);"
      str += "text-shadow: 0 -1px 1px hsl(#{hue_now}, 30%, 0%);"
    end
  end

  def bg_color_now 
    "background-color: hsl(#{hue_now}, 65%, 48%);"
  end

  def mag(str)
    str[/^\s*\d+\.*\d*/]  
  end

  def no_mag(str)
    str.gsub(/^\s*\d+\.*\d*\s*/, '')
  end

  def tokenize(str)
    str.gsub(/^\s*\d+\.*\d*\s*/, '').singularize
  end

  def current(controller, action=nil)
    action = params[:action] if !action
    if params[:controller] == controller && params[:action] == action
      "current"
    else
      ""
    end
  end

end
