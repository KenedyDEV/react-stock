import PropTypes from 'prop-types';
import '../styles/box-dashboard.css'

DashboardBox.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number
}

export default function DashboardBox({title, number}){
  return(
    <div className='container'>
      <h4 className='title'>{title}</h4>
      <h1 className='number'>{number}</h1>
    </div>
  )
}