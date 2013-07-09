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

end
