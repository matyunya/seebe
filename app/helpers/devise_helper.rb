# custom devise error message
module DeviseHelper
  def devise_error_messages!
    return '' if (defined?(resource)).nil?
    return '' if resource.errors.empty?

    messages = resource.errors.full_messages.join

    html = <<-HTML
    <div data-alert class="alert-box alert">
      #{messages}
    <a href="#" class="close">&times;</a>
    </div>
    HTML

    html.html_safe
  end
end
