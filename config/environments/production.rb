Rails.application.configure do

  config.cache_classes = true

  config.eager_load = true

  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  config.assets.js_compressor = :uglifier
  config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.serve_static_assets = false
  config.assets.compress = true
  config.assets.digest = true
  config.assets.compile = true

  config.log_level = :debug

  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify
  config.assets.version = 1.6

  config.action_mailer.smtp_settings = {
    address: "smtp.gmail.com",
    port: 587,
    domain: "gmail.com",
    authentication: "plain",
    enable_starttls_auto: true,
    user_name: ENV['GMAIL_USER'],
    password: ENV['GMAIL_PASS']
  }
  # ActionMailer Config
  config.action_mailer.default_url_options = { :host => 'seebe.ru' }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = false


  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false

  config.paperclip_defaults = {
    :storage => :s3,
    :s3_host_name => 's3.eu-central-1.amazonaws.com',
    :path => '/:class/:attachment/:id_partition/:style/:filename',
    :s3_credentials => {
      :bucket => ENV['S3_BUCKET_NAME'],
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
      :region => 'eu-central-1'
    }
  }

end
