/////////////////routing all child components/////////////////////
import React, { Component } from 'react'
import { connect } from 'react-redux'
class App extends Component {

  render() {
    const { lang } = this.props;
    return (
      <div className={`${lang == "ar" ? "arabic" : ""}`} dir={`${lang == "ar" ? "rtl" : ""}`} >
        {this.props.children}
      </div>
    )
  } dir
}

// export default App; 

export default connect(store => ({
  lang: store.langchange.lang
})
)(App);