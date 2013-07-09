class CatsController < ApplicationController

  before_filter :authenticate

  def show
    @name = params[:id]
    @records = current_user.records.where("raw ILIKE ?", '%'+@name+'%') 

    @trending_cats = current_user.get_trending_cats[0..7]
    @trending_cats.delete @name

    @cat = current_user.cats.find_or_create_by_name @name

  end

  def update
    @name = params[:id]
    @option = params[:option]

    @cat = current_user.cats.find_or_create_by_name @name
    @cat[@option] = !@cat[@option]

    if @cat.equalize_then_save
      render text: "success"
    else
      render text: "error"
    end

  end

end
