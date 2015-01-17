class CatsController < ApplicationController

  before_filter :authenticate

  def index
    # a more in-depth report of cat usage (frequency, cohorts)
    # a stream (the squiggly bulgy timeline one) graph of cats would be cool
    @trending = current_user.get_trending_cats.slice 0, 100
  end

  def show
    @name = params[:id]
    @cat = current_user.cats.find_by_name @name
    if !@cat
      @cat = current_user.cats.create!(:name => @name, :color => 200)
    end
    @all = current_user.records.where("raw ILIKE ?", '%'+@name+'%')
    @all_count = @all.count
    if params[:all]
      @records = @all
    else
      @records = @all.slice(0, 50)
    end
  end

  def new
    @cat = current_user.cats.create(:name => params[:name], :color => 200)
    if @cat.save
      redirect_to "/cats/"+params[:name]+"/edit", notice: "Cat created!"
    else
      redirect_to "/cats/"+params[:name], notice: "Sorry, there was an issue creating your cat."
    end
  end

  def edit
    @cat = current_user.cats.find_by_name params[:id]
  end

  def update
    @cat = current_user.cats.find_by_name params[:id]
    if params[:option]
      option = params[:option]
      @cat[option] = !@cat[option]
      if @cat.save
        render text: "success"
      else
        render text: "error"
      end
    else
      @cat.update_attributes(params[:cat])
      @cat.save
      render :edit
    end

  end

end
