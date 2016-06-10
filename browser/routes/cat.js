var API = require('../api')
var Cat = require('../cat')
var React = require('react')
var Record = require('../record')
var TogetherCats = require('../together-cats')
var util = require('../util')
var WeeklyBlocksYears = require('../weekly-blocks-years')

var CatPage = React.createClass({
  getInitialState: function () {
    return {
      records: [],
      alsoRecords: [],
      contemporaneousCatNames: [],
      name: '',
      alsoName: ''
    }
  },

  componentWillMount: function () {
    this.setState({ name: decodeURIComponent(this.props.name) })

    setTimeout(function () {
      this.refreshRecords()
      this.getContemporaneousCats()

      if (this.props._query && this.props._query.also) {
        this.setState({ alsoName: decodeURIComponent(this.props._query.also) })
        this.refreshAlsoRecords(decodeURIComponent(this.props._query.also))
      }
    }.bind(this), 1)
  },

  refreshRecords: function () {
    var self = this

    API.last90DaysCached(function (err, records) {
      if (err) {
        return console.error(err)
      }

      var filteredRecords = util.matchingCat(self.state.name, records)

      if (!self.state.records.length) {
        self.setState({ records: filteredRecords })
      }
    })

    API.fetchRecordsWithCat(this.state.name, function (err, records) {
      if (err) {
        return console.error(err)
      }

      self.setState({ records: records })
    })
  },

  refreshAlsoRecords: function (name) {
    API.fetchRecordsWithCat(name, function (err, records) {
      if (err) {
        return console.error(err)
      }

      this.setState({ alsoRecords: records })
    }.bind(this))
  },

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

  render: function () {
    var records = this.state.records
    var cats = this.state.contemporaneousCatNames
    var name = this.state.name
    var hue = util.catNameToHue(name)
    var recordDivs = []

    if (records.length > 0) {
      recordDivs = records.slice(0, 3).map(function (record) {
        return <Record record={record} key={record.id} />
      })
    } else {
      recordDivs = <div className='faded'>'Loading records..'</div>
    }

    var also
    if (this.state.alsoName) {
      also = <span>and <Cat name={this.state.alsoName} /></span>
    }

    return (
      <div>
        <section>
          <h2><Cat name={name} />{also}</h2>
        </section>
        <WeeklyBlocksYears records={records} hue={hue} />
        <section>
          <h2>Last 3 records</h2>
          {recordDivs}
          <div>
            <a href={'/cats/' + name + '/records'}>See all records with <Cat name={name} onClick={null} /></a>
          </div>
        </section>
        <section>
          <h2>Commonly seen together</h2>
          <TogetherCats cats={cats} rootCatName={name} totalRootRecords={records.length} />
        </section>
      </div>
    )
  }
})

module.exports = CatPage
