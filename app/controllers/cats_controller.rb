class CatsController < ApplicationController

  before_filter :authenticate

  def index
    # a more in-depth report of cat usage (frequency, cohorts)
    # a stream (the squiggly bulgy timeline one) graph of cats would be cool
  end

  def show
    @name = params[:id]
    @records = current_user.records.where("raw ILIKE ?", '%'+@name+'%') 

    @trending_cats = current_user.get_trending_cats[0..7]
    @trending_cats.delete @name

    @cat = current_user.cats.find_or_create_by_name @name

  end

  def update
    if params[:id].match /[0-9]+/
      @cat = current_user.cats.find_by_id params[:id]
    else
      @cat = current_user.cats.find_or_create_by_name params[:id]
    end

    @option = params[:option]
    #@cat[@option] = !@cat[@option]

    if @cat.equalize_then_save
      render text: "success"
    else
      render text: "error"
    end
  end

end
