const RenderFailed = props => {
  const {getDetailsOfJob} = props
  const getDetailsFun = () => {
    getDetailsOfJob()
  }
  return (
    <div className="text-center">
      <img
        className="w-75"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h3>Oops! Something Went Wrong</h3>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={getDetailsFun} className="btn btn-primary">
        Retry
      </button>
    </div>
  )
}

export default RenderFailed
