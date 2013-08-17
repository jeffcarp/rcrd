class RecordsController < ApplicationController

  before_filter :authenticate

  helper ApplicationHelper 

  def index
    @records = current_user.records.order('target DESC').limit(40)
  end

  def find
    @cat_name = params[:cat]
    # if this matches an existing cat, redirect there
    # IDEA: compare two searches (esp. in graphs)
    if @cat_name
      @records = current_user.records.where("raw ILIKE ?", '%'+@cat_name+'%') 
      @cohorts = {} # one level of cohort analysis for now
      @records.each do |record|
        record.cats_from_raw_without_mags.each do |cat|
          next if cat == @cat_name
          if !@cohorts[cat]
            @cohorts[cat] = 0
          end 
          @cohorts[cat] += 1
        end
      end 
      #@cohorts.values.sort
    else
      # error: param not found
    end
  end

  def show 
    @record = current_user.records.find params[:id]  
  end

  def new
    @record = current_user.records.new(target: current_user.current_time_zone.now)
    @last_7_days = current_user.records.where('target > ?', Date.today - 7.days)
  end

  def create      
# @record.target = Time.now.utc.strftime('%c') # old shoddy workaround
    @record = current_user.records.new(params[:record])
    if @record.save
      puts @record.inspect
      # Convert target back to UTC
      @record.target = current_user.current_time_zone.local_to_utc @record.target
      @record.save
      flash[:notice] = "Record was successfully created."
      redirect_to action: 'new'
    else        
      flash[:notice] = "Sorry, there was an issue saving your record."
      redirect_to action: 'new'
    end
  end

  def update
    @record = Record.find(params[:id])

    if @record.update_attributes(params[:record])
      flash[:notice] = "Record was successfully updated."
      redirect_to @record
    else
      flash[:notice] = "Record was successfully updated."
      redirect_to @record
    end
  end

  def destroy
    @record = Record.find(params[:id])
    @record.destroy
      flash[:notice] = "Record successfully deleted."
    redirect_to action: 'new'
  end
end
