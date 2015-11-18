class SessionController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])

      token = SecureRandom.urlsafe_base64

      session[:session_token] = token
      user.update(session_token: token)
      flash[:message] = "Thank you for logging in!"
      redirect_to application_angular_path
    else
      flash[:message] = "Email / Password combo incorrect!"
      redirect_to root_path
    end

  end

  def destroy
    log_out!
    flash[:message] = ""
    redirect_to root_path
  end

  def current_user
    if session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    else
      @current_user = nil
    end
  end


  private

  def user_params
    return params.require(:user).permit(:email, :password)
  end
end
