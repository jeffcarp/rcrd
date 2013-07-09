class Record < ActiveRecord::Base
  belongs_to :user
  attr_accessible :target, :raw, :user_id
  default_scope order 'target DESC'
  validates_presence_of :raw, :user_id, :target

  def time_zone
    if self.raw && self.raw.match("time zone")
      record = self
    else
      target = self.target || Time.now.utc
      record = self.user.records.where("raw LIKE ? AND target < ?", '%time zone%', target).limit(1).first
    end
    if record
      cats = record.cats_from_raw
      cats.delete 'time zone' # not the most elegant thing in the world
      zone_text = cats.first 
      ActiveSupport::TimeZone.new(zone_text) || self.user.default_time_zone
    else
      self.user.default_time_zone
    end
  end

  def local_target
    self.target.in_time_zone(self.time_zone)
  end

  def cats_from_raw
    (self.raw || '').split(/,/).map {|cat| cat.strip}
  end

  def cats_from_raw_without_mags
   cats_from_raw.map {|cat| cat.sub /^\s*\d+\.*\d*\s*/, '' }
  end

  # I believe this should be a method on User
  def self.get_weekly_frequency_since(date, cat)
    records = Record.where("target > ? AND raw LIKE ?", date, '%'+cat+'%').count.to_f
    (records / ((Date.today - date).to_f / 7.0)).round(2)
  end

  def hue
   minutes = self.local_target.strftime('%k').to_f * 60.0
   minutes += self.local_target.strftime('%M').to_f
   (minutes / 1440.0)  * 360.0
  end
end
