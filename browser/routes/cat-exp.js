var API = require('../api')
var bus = require('../bus')()
var Cat = require('../cat')
var ManyMonths = require('../many-months')
var MagGraph = require('../mag-graph')
var React = require('react')
var RecordList = require('../record-list')
var request = require('browser-request')
var TogetherCats = require('../together-cats')
var util = require('../util')
var WeeklyBlocksYears = require('../weekly-blocks-years')

var CatPage = React.createClass({
  getInitialState: function () {
    return {
      last3Records: null
    }
  },

  catNames: function () {
    var catPath = this.props._[0] || ''
    return catPath.split('+').map(decodeURIComponent)
  },

  componentWillMount: function () {
    console.log(this.catNames())

    this.fetchRecords()

  /*
      setTimeout(function () {
        this.refreshRecords()
        this.getContemporaneousCats()

        if (this.props._query && this.props._query.also) {
          this.setState({ alsoName: decodeURIComponent(this.props._query.also) })
          this.refreshAlsoRecords(decodeURIComponent(this.props._query.also))
        }
      }.bind(this), 1)
  */
  },

  fetchRecords: function () {
    API.viewData('last-3-records|run+workout', function (err, data) {
      if (err) return console.error(err)
      this.setState({ last3Records: data.records })
    }.bind(this))
  },

  /*
    getContemporaneousCats: function () {
      var self = this

      API.fetchRecords(function (err, records) {
        if (err) {
          return console.error(err)
        }

        records = records.filter(function (record) {
          return util.catsFromRaw(record.raw).indexOf(self.state.name) !== -1
        })

        var catNumbers = {}

        util.allCats(records).forEach(function (name) {
          if (name === self.state.name) {
            return
          } else if (catNumbers[name]) {
            catNumbers[name] += 1
          } else {
            catNumbers[name] = 1
          }
        })

        var catNumberArray = []
        for (var name in catNumbers) {
          catNumberArray.push({name: name, num: catNumbers[name]})
        }

        catNumberArray.sort(function (a, b) {
          return b.num - a.num
        })

        self.setState({ contemporaneousCatNames: catNumberArray })
      })
    },
  */

  render: function () {
    var records = this.state.records
    /*
        var cats = this.state.contemporaneousCatNames
        var name = this.state.name
        var hue = util.catNameToHue(name)
        var alsoHue = util.catNameToHue(this.state.alsoName)
        var recordDivs = []
        var catElems = []
        var oneYear
    */

    var header = this.catNames().map(function (catName, index) {
      if (index > 0) {
        return <span key={index}>and <Cat name={catName} /></span>
      } else {
        return <Cat name={catName} key={index} />
      }
    })

    return (
    <div>
      <section>
        <h2>{header}</h2>
      </section>
      <section>
        <h2>Last 3 records</h2>
        <RecordList records={this.state.last3Records} loading={this.state.last3Records === null} />
        <div>
          <a href={'/cats/' + this.props._[0] + '/records'}>See all</a>
        </div>
      </section>
    </div>
    )
  /*
          <WeeklyBlocksYears records={records} hue={hue} />
          <section>
            <h2>Commonly seen together</h2>
            <TogetherCats cats={cats} rootCatName={name} totalRootRecords={records.length} />
          </section>
  */
  }
})

module.exports = CatPage
