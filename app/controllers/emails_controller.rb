class EmailsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :destroy

  def index
    @emails = Email.all
  end

  def new

  end

  def create
    @email = current_user.emails.new(email_params)

    if @email.save

    else
      flash[:message] = @email.errors.full_messages.to_sentence
    end
    redirect_to application_angular_path
  end

  def show
    respond_to do |format|
      format.html do
        redirect_to application_angular_path
      end

      format.json do
        @email = Email.find(params[:id])
        render 'show.json.jbuilder'
      end
    end
  end

  def destroy
    @email = Email.find(params[:id])

    @email.destroy

  end

  private

  def email_params
    return params.require(:email).permit(:recipient, :body, :password)
  end
end
