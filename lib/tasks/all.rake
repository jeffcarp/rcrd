task :backup_to_s3 => :environment do
  puts "rake backup_to_s3"
  puts Time.now

  require 'aws/s3'
  
  filename = "rcrd-"+Time.now.utc.strftime('%F')+".dump"
  puts filename
  
  filepath = "/home/jeff/rcrd-backups/"+filename
  puts filepath
  
  if File.exist? filepath
    raise "Backup file already exists"
  end 
  
  %x(pg_dump rcrd -f #{filepath})
  
  AWS::S3::Base.establish_connection!(
    :access_key_id     => ENV['AWS_KEY'],
    :secret_access_key => ENV['AWS_SECRET'] 
  )
  
  AWS::S3::S3Object.store(
    filename,
    open(filepath),
    'pg-backgups-rcrd.org'
  )
end
